import { useState, useEffect } from "react";
import db from "../config/firebase";
import firebase from '../config/firebase'

export default function ManagerHistoryContent() {
  const [collections, setCollections] = useState([]);

  const HeadTable = [
    "Index",
    "Time",
    " Product Name",
    "Product Price",
    "Customer input",
    "Exchange",
  ];
  const History_Ref = db.collection("History");

  useEffect(() => {
    History_Ref.get().then((snap) => {
      const INPUT = [];
      snap.docs.map((doc) => {
          console.log(doc.Time(seconds))
        INPUT.push({ id: doc.id, ...doc.data() });
      });
      console.log(INPUT);
      setCollections(INPUT);
    });
  }, []);

  if (!collections) {
    return (
      <div className="container-content">Loading......................</div>
    );
  }

  return (
    <>
      <div className="stock-content">
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
                <td>{doc.Time}</td>
                <td>{doc.Products_Name}</td>
                <td>{doc.Products_Price} ฿</td>
                <td>{doc.Customer_input} ฿</td>
                <td>{doc.Exchange} ฿</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
