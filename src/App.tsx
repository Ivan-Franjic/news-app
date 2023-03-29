import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import News from "./Pages/News";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
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
