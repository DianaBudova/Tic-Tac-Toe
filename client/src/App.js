import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth.js";
import CreateAccount from "./pages/CreateAccount.js";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/creating-account" element={<CreateAccount />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
