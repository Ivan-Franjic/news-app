import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import News from "./Pages/News";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Sidebar />
        <Routes>
          <Route path="/" element={<News />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
