import "./App.css";
import { List } from "./components/List/List";
import { Routes, Route } from "react-router-dom";
import { Favorite } from "./components/Favorite/Favorite";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1 id="titleHeading">Users Data Management</h1>
              <List></List>
            </>
          }
        ></Route>
        <Route path="/favorite" element={<Favorite></Favorite>}></Route>
        <Route path="*" element={<h1>404 Page Not Found</h1>}></Route>
      </Routes>
    </div>
  );
}

export default App;
