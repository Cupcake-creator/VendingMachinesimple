import { useState, useEffect } from "react";
import db from "../config/firebase";
import ModalUpdatestock from "../components/ModalUpdatestock";
import ModalnewProducts from "../components/ModalnewProducts";

export default function ManagerStockContent() {
  const [collections, setCollections] = useState([]);

  const HeadTable = ["Index", "Img", "Name", "Price", "Storage"];
  const Product_Ref = db.collection("Products");

  useEffect(() => {
    db.collection("Products").orderBy("Name").onSnapshot((snap) => {
      const INPUT = [];
      snap.docs.map((doc) => {
        INPUT.push({ id: doc.id, ...doc.data() });
      });
      setCollections(INPUT);
    });
  }, []);

  const [Modalupdate_stocktoggle, setModaltupdate_stockoggle] = useState(false);
  const [Modaldata, setModaldata] = useState(null);

  const [ModalnewProducttoggle, setModalnewProducttoggle] = useState(false);

  function handleDelete(val) {
    const Confirm_data = confirm("Do you really want to Delete " + val.Name);
    if (Confirm_data) {
        Product_Ref.doc(val.id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        alert(val.Name + "successfully Deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
    }
    
  }

  if (!collections) {
    return (
      <div className="container-content">Loading......................</div>
    );
  }

  return (
    <>
      <div className="stock-content">
        <button
          onClick={() => {
            setModalnewProducttoggle(true);
          }}
        >
          New Products
        </button>
        <table className="Stock-table">
          <thead>
            <tr>
              {HeadTable.map((name) => (
                <th key={name}>{name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {collections.map((doc, index) => (
              <tr key={doc.id} className="stock-items">
                <td>{index + 1}</td>
                <td>
                  <img
                    src={doc.Img}
                    alt="img-product"
                    width="50px"
                    height="50px"
                  />
                </td>
                <td>{doc.Name}</td>
                <td>{doc.Price}</td>
                <td>{doc.Storage}</td>
                <td>
                  <button
                    onClick={() => {
                      setModaltupdate_stockoggle(true);
                      setModaldata(doc);
                    }}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      handleDelete(doc);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ModalUpdatestock
        open={Modalupdate_stocktoggle}
        data={Modaldata}
        onClose={() => setModaltupdate_stockoggle(false)}
      />
      <ModalnewProducts
        open={ModalnewProducttoggle}
        onClose={() => setModalnewProducttoggle(false)}
      />
    </>
  );
}
