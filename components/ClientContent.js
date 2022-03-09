import { useState, useEffect } from "react";
import db from "../config/firebase";
import Products from "./Products";
import PropTypes from "prop-types";
import ModalBuying from "../components/ModalBuying";


const ClientContent = (Btnval) => {
  // const router = useRouter();
  // const ref = db.collection("Products").doc();

  const [collections, setCollections] = useState([]);

  useEffect(() => {
    db.collection("Products")
      .where("Storage", "!=", 0)
      .onSnapshot((snap) => {
        const INPUT = [];
        snap.docs.map((doc) => {
          INPUT.push({ id: doc.id, ...doc.data() });
        });
        setCollections(INPUT);
      });
  }, []);

  if (!collections) {
    return (
      <div className="container-content">Loading......................</div>
    );
  }



  const [Modaltoggle, setModaltoggle] = useState(false);
  const [Modaldata, setModaldata] = useState(null);


  return (
    <>
      <div className="container-content">
        {collections
          .filter((item) => {
            if (Btnval.valbtn) {
              return item.Category === Btnval.valbtn;
            } else {
              return item;
            }
          })
          .map((doc) => (
            <div
              key={doc.id}
              onClick={() => {
                setModaltoggle(true);
                setModaldata(doc);
                console.log(!Modaltoggle);
                console.log(doc);
              }}
            >
              <Products data={doc} />
            </div>
          ))}
      </div>

      <ModalBuying
        open={Modaltoggle}
        data={Modaldata}
        onClose={() => setModaltoggle(false)}
      />
    </>
  );
};

ClientContent.propTypes = {
  Btnval: PropTypes.string,
};

export default ClientContent;
