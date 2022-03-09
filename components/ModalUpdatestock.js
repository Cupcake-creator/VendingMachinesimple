import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import db from "../config/firebase";
import { useRouter } from "next/router";
import PropTypes from "prop-types";


export default function ModalUpdatestock({ open, data, onClose }) {
  const router = useRouter();
  const [isBrowser, setIsBrowser] = useState(false);
  const Product_Ref = db.collection("Products");
  const Category_Ref = db.collection("Kinds");
  const { register, handleSubmit, errors, reset } = useForm();

  const [categorydata, setcategorydata] = useState([]);

  useEffect(() => {
    setIsBrowser(true);
    Category_Ref.get().then((snap) => {
      const INPUT = [];
      snap.docs.map((doc) => {
        INPUT.push({ id: doc.id, ...doc.data() });
      });
      console.log(INPUT);
      setcategorydata(INPUT);
    });
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  function onSubmitForm(val) {
    Product_Ref.doc(data.id)
      .update(val)
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }

  if (!open) {
    return null;
  } else if (isBrowser) {
    return (
      <>
        <div className="Modal-Overlay">
          <div className="Modal-container">
            <div className="Modal-container-Header">
              <div>Updating phase</div>
              <button className="Exit-button" onClick={handleCloseClick}>
                X
              </button>
            </div>
            <div className="Modal-UpdateStock-Content">
              <form
                className="form-Update-stock"
                onSubmit={handleSubmit(onSubmitForm)}
                onReset={reset}
              >
                <label>Product Name:</label>
                <input
                  type="text"
                  defaultValue={data.Name}
                  name="Name"
                  ref={register}
                />
                <label>Product Category:</label>
                <select
                  name="Category"
                  defaultValue={data.Category}
                  ref={register}
                >
                  {categorydata.map((doc, index) => (
                    <option value={doc.Name} key={index}>
                      {doc.Name}
                    </option>
                  ))}
                </select>
                <label>Product Price:</label>
                <input
                  type="number"
                  defaultValue={data.Price}
                  name="Price"
                  min={0}
                  ref={register}
                />
                <label>Product Storage:</label>
                <input
                  type="number"
                  defaultValue={data.Storage}
                  name="Storage"
                  min={0}
                  ref={register}
                />
                <label>Product Image Link:</label>
                <input
                  type="text"
                  defaultValue={data.Img}
                  name="Img"
                  ref={register}
                />

                <div className="Modal-container-Footer">
                  <input type="submit" value="Submit" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

ModalUpdatestock.propTypes = {
  open: PropTypes.bool,
  data: PropTypes.shape({
    id: PropTypes.string,
    Category: PropTypes.string,
    Img: PropTypes.string,
    Name: PropTypes.string,
    Price: PropTypes.number,
    Storage: PropTypes.number,
  }),
  onClose: PropTypes.func,
};
