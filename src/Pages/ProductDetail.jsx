import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../data/product";
import { set } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  useEffect(
    () => {
      const foundProduct = getProductById(id);
      if (!foundProduct) {
        navigate("/not-found");
        return;
      }
      setProduct(foundProduct);
    },
    { id },
  );
  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <div className="page">
      <div className="container">
        <div className="product-detail">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-detail-content">
            <h1>{product.name}</h1>
            <p className="product-detail-price">${product.price.toFixed(2)}</p>
            <p className="product-detail-description">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
