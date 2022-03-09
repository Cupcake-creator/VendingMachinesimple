import { useState, useEffect } from "react";
import db from "../../config/firebase";
import Link from "next/link";
import { useRouter } from "next/router";

const CartContent = () => {
  const [content, setContent] = useState(null);

  const router = useRouter();

  const Product_Ref = db.collection("Products").doc(router.query.id);

  useEffect(() => {
    Product_Ref.get().then((result) => {
      setContent(result.data());
    });    
  }, []);

  if (!content) {
    return <h2>Loading....</h2>;
  }
  return (
    <div>
      <div> You got {content.Name}</div>
      <div>{content.Price}</div> 
      <div>{content.Storage} left</div>

      <Link href="/">
        <a>Back</a>
      </Link>
    </div>
    // <>

    // </>
  );
};

export default CartContent;
