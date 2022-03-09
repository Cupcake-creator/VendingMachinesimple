import React from "react";
import PropTypes from "prop-types";
// import Link from "next/link";


const Products = ({ data }) => {
  return (
    // <Link href="/[category]/[id]" as={`/${data.Category}/${data.id}`}>
    // </Link>
    <>
      <div className="item-content" >
        <img src={data.Img} alt="img" width="100" height="100" />
        <div>{data.Name}</div>
        <div>Price {data.Price} ฿</div>
        <div>InStock {data.Storage} left</div>
      </div>
    </>
  );
};

Products.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    Category: PropTypes.string,
    Img: PropTypes.string,
    Name: PropTypes.string,
    Price: PropTypes.number,
    Storage: PropTypes.number,
  }),
  setproductsdetails: PropTypes.func,
};

export default Products;
