import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";

const Products = ({ data, onClick }) => {
  return (
    <>
      <div className="item-sidebar" onClick={onClick}>
        <div>{data.Name}</div>
      </div>
    </>
  );
};

Products.propTypes = {
  data: PropTypes.shape({
    Name: PropTypes.string,
  }),
  onClick: PropTypes.func,
};

export default Products;
