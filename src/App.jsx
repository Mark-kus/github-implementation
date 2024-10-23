/* eslint-disable react/prop-types */
import { useState } from "react";

import Card from "./components/Card/Card.jsx";
import Search from "./components/Search/Search.jsx";

import "./App.css";

export default function App() {

  const [data, setData] = useState(null)

  return (
    <>
      {data ?
        <Card resource={data} />
        : <Search setData={setData} />}
    </>
  )
}