import { Route, Routes } from "react-router";
import CategoriesPage from "../pages/CategoriesPage";
import HomePage from "../pages/HomePage";
import MahsulotlarPage from "../pages/MahsulotlarPage";
import Ijaralar from "../pages/Ijaralar";
import Kitobxonlar from "../pages/Kitobxonlar";
import Kitoblarim from "../pages/Kitoblarim";

function Main() {
  return (
    <div className="w-full h-[85vh] pt-10 pl-2 overflow-auto">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mahsulotlar" element={<MahsulotlarPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/ijaralar" element={<Ijaralar />} />
        <Route path="/kitobxonlar" element={<Kitobxonlar />} />
        <Route path="/kitoblarim" element={<Kitoblarim />} />
      </Routes>
    </div>
  );
}

export default Main;
