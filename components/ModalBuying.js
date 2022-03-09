import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import db from "../config/firebase";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import firebase from "firebase";

export default function ModalBuying({ open, data, onClose }) {
  const router = useRouter();
  const [isBrowser, setIsBrowser] = useState(false);

  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues: {
      oneBaht: 0,
      twoBaht: 0,
      fiveBaht: 0,
      tenBaht: 0,
      twentyBaht: 0,
      fiftyBaht: 0,
      hundredBaht: 0,
    },
  });

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const Form_src = [
    { id: "oneBaht", short_phrase: "1฿" },
    { id: "twoBaht", short_phrase: "2฿" },
    { id: "fiveBaht", short_phrase: "5฿" },
    { id: "tenBaht", short_phrase: "10฿" },
    { id: "twentyBaht", short_phrase: "20฿" },
    { id: "fiftyBaht", short_phrase: "50฿" },
    { id: "hundredBaht", short_phrase: "100฿" },
  ];

  console.log(data);
  const Product_Ref = db.collection("Products");
  const History_Ref = db.collection("History");

  function onSubmitForm(val) {
    const one = Number(val.oneBaht);
    const two = 2 * Number(val.twoBaht);
    const five = 5 * Number(val.fiveBaht);
    const ten = 10 * Number(val.tenBaht);
    const twenty = 20 * Number(val.twentyBaht);
    const fifty = 50 * Number(val.fiftyBaht);
    const hundred = 100 * Number(val.hundredBaht);
    const INPUT_Total_baht = [
      one,
      two,
      five,
      ten,
      twenty,
      fifty,
      hundred,
    ].reduce(function (acc, val) {
      return acc + val;
    }, 0);
    const Change = INPUT_Total_baht - data.Price;

    console.log(INPUT_Total_baht);
    console.log("Change", Change);

    if (Change >= 0) {
      Product_Ref.doc(data.id)
        .update({
          Storage: data.Storage - 1,
        })
        .then(() => {
          console.log("Document successfully updated!");
          History_Ref.add({
            Time: firebase.firestore.FieldValue.serverTimestamp(),
            Products_id: data.id,
            Products_Name: data.Name,
            Products_Price: data.Price,
            Customer_input: INPUT_Total_baht,
            Exchange: Change,
          })
            .then((docRef) => {
              console.log("Document written with ID: ", docRef.id);
              alert("Your Change is : " + Change);
              alert("You got " + data.Name + " Please get the item");
            })
            .catch((error) => {
              console.error("Error adding document: ", error);
            });
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });

      router.reload();
    } else {
      alert("Your money is not Enough to pay it");
    }
  }

  if (!open) {
    return null;
  } else if (isBrowser) {
    return (
      <>
        <div className="Modal-Overlay">
          <div className="Modal-container">
            <div className="Modal-container-Header">
              <div>Buying phase</div>
              <button className="Exit-button" onClick={handleCloseClick}>
                X
              </button>
            </div>
            <div className="Modal-container-Content">
              <img src={data.Img} alt="img" width="300" height="300" />
              <div className="modal-description">
                <div>Name: {data.Name} </div>
                <div>Price: {data.Price} ฿</div>
              </div>
            </div>
            <form
              className="formInput-money"
              onSubmit={handleSubmit(onSubmitForm)}
              onReset={reset}
            >
              {Form_src.map((doc) => (
                <div key={doc.id} className="Input-items">
                  <div>{doc.short_phrase}</div>
                  <input
                    id={doc.id}
                    type="number"
                    min={0}
                    name={doc.id}
                    ref={register}
                  />
                </div>
              ))}
              <div className="Modal-container-Footer">
                <input type="submit" value="Confirm Buying" />
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

ModalBuying.propTypes = {
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
