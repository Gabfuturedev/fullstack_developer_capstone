import LoginPanel from "./components/Login/Login"
import Home from "./components/Home/Home"
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPanel />} />
    </Routes>
  );
}
export default App;
