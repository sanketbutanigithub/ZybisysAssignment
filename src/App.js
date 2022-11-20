import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Card(props) {
  return (
    <div className="column">
      <div className="card">
        <img src={props.image} alt="" />
        <h3>{props.title}</h3>
        <p>{props.description}</p>
        <p className="price">
          &#36;
          {props.price}
        </p>
      </div>
    </div>
  );
}

function App() {
  const [data, setData] = useState([]);
  const [filter, setFIlter] = useState("");

  async function getData() {
    const res = await axios.get("https://fakestoreapi.com/products");
    const resdata = await res.data;
    setData(resdata);
  }

  useEffect(function () {
    getData();
  }, []);

  return (
    <>
      <button
        onClick={function () {
          setFIlter("ltoh");
        }}
      >
        low to high
      </button>
      <button
        onClick={function () {
          setFIlter("htol");
        }}
      >
        high to low
      </button>
      <div className="row col">
        {filter === "ltoh"
          ? data
              .sort((a, b) => (a.price > b.price ? 1 : -1))
              .map((val) => {
                return Card(val);
              })
          : filter === "htol"
          ? data
              .sort((a, b) => (a.price < b.price ? 1 : -1))
              .map((val) => {
                return Card(val);
              })
          : data.map((val) => {
              return Card(val);
            })}
      </div>
    </>
  );
}

export default App;
