import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import db from "../config/firebase";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

export default function ModalnewProducts({ open, data, onClose }) {
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
    Product_Ref.add({
      Name: val.Name,
      Price: Number(val.Price),
      Storage: Number(val.Storage),
      Img: val.Img,
      Category: val.Category,
    })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        alert(val.Name + " was Added !");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    onClose();
  }

  if (!open) {
    return null;
  } else if (isBrowser) {
    return (
      <>
        <div className="Modal-Overlay">
          <div className="Modal-container">
            <div className="Modal-container-Header">
              <div>Insert New Product phase</div>
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
                <input type="text" defaultValue="" name="Name" ref={register} />
                <label>Product Category:</label>
                <select name="Category" defaultValue="" ref={register}>
                  {categorydata.map((doc, index) => (
                    <option value={doc.Name} key={index}>
                      {doc.Name}
                    </option>
                  ))}
                </select>
                <label>Product Price:</label>
                <input
                  type="number"
                  defaultValue=""
                  name="Price"
                  ref={register}
                />
                <label>Product Storage:</label>
                <input
                  type="number"
                  defaultValue=""
                  name="Storage"
                  ref={register}
                />
                <label>Product Image Link:</label>
                <input type="text" defaultValue="" name="Img" ref={register} />

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

ModalnewProducts.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
