import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { MovieProvider } from "./constexts/MovieContext";
import MovieCard from "./components/MovieCard";
import Navbar from "./components/Navbar";
import "./css/App.css";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";

// Component to handle 404.html redirects from GitHub Pages
function RedirectHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Handle GitHub Pages 404.html redirect format: /repo-name/?/path
    const searchParams = new URLSearchParams(location.search);
    const redirectPath = searchParams.get("/");
    
    if (redirectPath) {
      // Clean up the path (replace ~and~ with &)
      const cleanPath = redirectPath.replace(/~and~/g, "&");
      // Remove leading slash if present (basename handles it)
      const path = cleanPath.startsWith("/") ? cleanPath.slice(1) : cleanPath;
      // Navigate to the correct path without page reload
      navigate(path + location.hash, { replace: true });
    }
  }, [location.search, navigate, location.hash]);

  return null;
}

function App() {
  return (
    <MovieProvider>
        <RedirectHandler />
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
