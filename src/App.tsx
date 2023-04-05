import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import CategoryPage from "./Pages/CategoryPage/CategoryPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/home" replace={true} />}
          ></Route>
          <Route path="/home" element={<Homepage />}></Route>
          <Route path="/:categoryName" element={<CategoryPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
