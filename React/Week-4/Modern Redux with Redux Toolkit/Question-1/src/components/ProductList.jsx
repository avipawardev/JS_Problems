import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/cartSlice";

const products = [
  { id: 1, name: "Apple", price: 50 },
  { id: 2, name: "Banana", price: 30 },
  { id: 3, name: "Orange", price: 40 }
];

export default function ProductList() {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Products</h2>
      {products.map(product => (
        <div key={product.id} style={{ marginBottom: "10px" }}>
          {product.name} - ₹{product.price}
          <button
            onClick={() => dispatch(addItem(product))}
            style={{ marginLeft: "10px" }}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
