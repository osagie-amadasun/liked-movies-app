import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./constexts/MovieContext";
import MovieCard from "./components/MovieCard";
import Navbar from "./components/Navbar";
import "./css/App.css";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";

function App() {
  return (
    <MovieProvider>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favourites" element={<Favourites />} />
          </Routes>
        </main>
    </MovieProvider>
  );
}

export default App;
