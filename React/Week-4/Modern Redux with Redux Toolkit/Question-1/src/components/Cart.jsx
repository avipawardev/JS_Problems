import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "../redux/cartSlice";

export default function Cart() {
  const { items, total } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Cart</h2>
      {items.length === 0 && <p>Cart is empty</p>}
      {items.map(item => (
        <div key={item.id} style={{ marginBottom: "10px" }}>
          {item.name} - ₹{item.price}
          <button
            onClick={() => dispatch(removeItem(item.id))}
            style={{ marginLeft: "10px" }}
          >
            Remove
          </button>
        </div>
      ))}
      <h3>Total: ₹{total}</h3>
    </div>
  );
}
