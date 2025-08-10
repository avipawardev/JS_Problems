import React, { useReducer } from "react";

const initialState = {
  name: "Punam",
  establishment_year: "2025",
  address: {
    building: "1234",
    street: "ABCD",
    city: "abcd",
    state: "abcd",
    pincode: "1234",
    landmark: "abcd",
  },
  courses_offered: []
};

function reducer(state, action) {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "establishment_year":
      return { ...state, establishment_year: action.payload };
    case "address":
      return { 
        ...state, 
        address: { ...state.address, [action.field]: action.payload } 
      };
    case "courses_offered":
      return { ...state, courses_offered: action.payload.split(",") }; // CSV to array
    case "reset":
      return initialState;
    default:
      throw new Error("invalid action type");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("College Data:", state);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>College Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="College Name"
          value={state.name}
          onChange={(e) => dispatch({ type: "name", payload: e.target.value })}
        />
        <input
          placeholder="Establishment Year"
          value={state.establishment_year}
          onChange={(e) => dispatch({ type: "establishment_year", payload: e.target.value })}
        />

        <input
          placeholder="Building"
          value={state.address.building}
          onChange={(e) =>
            dispatch({ type: "address", field: "building", payload: e.target.value })
          }
        />
        <input
          placeholder="Street"
          value={state.address.street}
          onChange={(e) =>
            dispatch({ type: "address", field: "street", payload: e.target.value })
          }
        />
        <input
          placeholder="City"
          value={state.address.city}
          onChange={(e) =>
            dispatch({ type: "address", field: "city", payload: e.target.value })
          }
        />
        <input
          placeholder="State"
          value={state.address.state}
          onChange={(e) =>
            dispatch({ type: "address", field: "state", payload: e.target.value })
          }
        />
        <input
          placeholder="Pincode"
          value={state.address.pincode}
          onChange={(e) =>
            dispatch({ type: "address", field: "pincode", payload: e.target.value })
          }
        />
        <input
          placeholder="Landmark"
          value={state.address.landmark}
          onChange={(e) =>
            dispatch({ type: "address", field: "landmark", payload: e.target.value })
          }
        />

        <input
          placeholder="Courses (comma separated)"
          value={state.courses_offered.join(",")}
          onChange={(e) => dispatch({ type: "courses_offered", payload: e.target.value })}
        />

        <br />
        <button type="submit">Submit</button>
        <button type="button" onClick={() => dispatch({ type: "reset" })}>
          Reset
        </button>
      </form>

      <hr />
      <h3>Preview:</h3>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}
