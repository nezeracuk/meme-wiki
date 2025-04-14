import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MemeTable from "./components/MemeTable";
import MemeList from "./components/MemeList";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto py-6">
          <Routes>
            <Route path="/" element={<MemeTable />} />
            <Route path="/list" element={<MemeList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
