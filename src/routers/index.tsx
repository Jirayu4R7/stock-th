import { Route, Routes } from "react-router-dom";
import Layout from "../layouts";
import Home from "../pages/Home";
import NoMatch from "../pages/NoMatch";

export default function index() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}
