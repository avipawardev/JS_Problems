import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTearm, setSearchTearm] = useState("");
  let perPageData = 10;

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch("https://jsonplaceholder.typicode.com/todos");
      let data = await response.json();
      console.log(data);
      setTodos(data);
      setFilteredData(data);
    };
    fetchData();
  }, []);

  function filterData() {
    const filtered = todos.filter((ele) =>
      ele.title.toLowerCase().includes(searchTearm.toLowerCase())
    );
    setFilteredData(filtered);
  }

  useEffect(() => {
    filterData();
  }, [searchTearm]);

  let totalPages = Math.ceil(todos.length / perPageData);
  return (
    <>
      <div>
        <input onChange={(e) => setSearchTearm(e.target.value)} type="text" />
        {todos ? (
          filteredData
            .slice(page * perPageData - perPageData, page * perPageData)
            .map((ele) => (
              <div>
                <p>{ele.id}</p>
                <h2>{ele.title}</h2>
              </div>
            ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <button disabled={page == 1} onClick={() => setPage((prev) => prev - 1)}>
        Prev
      </button>
      {[...Array(totalPages)].map((_, i) => (
        <button
          style={{ backgroundColor: i + 1 == page ? "green" : "" }}
          className={page === i + 1 ? "paginationSelected" : ""}
          onClick={() => setPage(i + 1)}
          key={i}
        >
          {i + 1}
        </button>
      ))}
      <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
    </>
  );
}

export default App;
