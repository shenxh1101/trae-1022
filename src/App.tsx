import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import RestaurantDetail from "@/pages/RestaurantDetail";
import Menu from "@/pages/Menu";
import Favorites from "@/pages/Favorites";
import DiningPlan from "@/pages/DiningPlan";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
          <Route path="/restaurant/:id/menu" element={<Menu />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/plan" element={<DiningPlan />} />
        </Routes>
      </Layout>
    </Router>
  );
}
