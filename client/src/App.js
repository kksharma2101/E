import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
// import Dashboard from "./pages/user/Dashboard";
// import PrivateRoutes from "./components/routes/PrivateRoute";
import ForgotPassword from "./pages/auth/ForgotPassword";
// import AdminRoute from "./components/routes/AdminRoute";
// import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />

        {/* <Route path="/dashboard" element={<PrivateRoutes />}>
          <Route path="user" element={<Dashboard />} />
        </Route> */}

        {/* <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
        </Route> */}

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/policy" element={<Policy />} />

        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
