import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Beranda from "./pages/Beranda";
import Kategori from "./pages/Kategori";
import TambahKategori from "./pages/TambahKategori";
import EditKategori from "./pages/EditKategori";
import Movies from "./pages/Movies";
import TambahMovies from "./pages/TambahMovies";
import EditMovies from "./pages/EditMovies";
import Login from "./pages/Login";

function App(){
  return(
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Beranda />}/>
          <Route path="/Kategori" element={<Kategori />}/>
          <Route path="/Kategori/tambah" element={<TambahKategori />}/>
          <Route path="/Kategori/edit/:id" element={<EditKategori />}/>
          <Route path="/Movies" element={<Movies />}/>
          <Route path="/Movie/tambah" element={<TambahMovies />}/>
          <Route path="/Movie/edit/:id" element={<EditMovies />}/>
        </Routes>
      </main>
      <Footer />
    </>
  )
}
export default App;