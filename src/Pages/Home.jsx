import { get } from "react-hook-form";
import { getProducts } from "../data/product";
import ProductCard from "../components/productCard";
export default function Home() {
  const products = getProducts();
  return (
    <div className="page">
      <div className="home-hero">
        <h1>Welcome to ShopHub</h1>
        <p className="home-subtitles">
          Discover amazing products at unbeatable prices!
        </p>
      </div>
      <div className="container">
        <h2 className="page-title">Our Products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
