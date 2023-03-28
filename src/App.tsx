import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import News from "./Pages/News";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Sidebar />
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/home" replace={true} />}
          ></Route>
          <Route path="/home" element={<News />}></Route>
          <Route path="/:categoryName" element={<News />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
