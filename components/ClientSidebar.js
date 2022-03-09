import { useState, useEffect } from "react";
import db from "../config/firebase";
import Category from "../components/Category";
import PropTypes from "prop-types";

const ClientSidebar = ({ setvalbtn }) => {
  const [kinddata, setkinddatas] = useState([]);
  useEffect(() => {
    db.collection("Kinds")
      .get()
      .then((snap) => {
        const INPUT = [];
        snap.docs.map((doc) => {
          INPUT.push({ id: doc.id, ...doc.data() });
        });
        console.log(INPUT);
        setkinddatas(INPUT);
      });
  }, []);

  return (
    <div className="sidebar-content">
      <Category
        data={{ Name: "All" }}
        onClick={() => {
          setvalbtn("");
        }}
      />

      {kinddata.map((doc) => (
        <Category
          data={doc}
          onClick={() => {
            setvalbtn(doc.Name);
          }}
          key={doc.id}
        />
      ))}
    </div>
  );
};

ClientSidebar.propTypes = {
  setvalbtn: PropTypes.func,
};

export default ClientSidebar;
