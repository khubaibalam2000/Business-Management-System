import "./App.css";
import SideBar from "./components/Sidebar/SideBar";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes, useLocation } from "react-router";
import { useEffect, useState } from "react";
// import Particles from 'tsparticles';
import { AnimatePresence,AnimateSharedLayout,  motion } from "framer-motion";
// import { AnimatedRoutes, RouteTransition} from "animation";

import Homepage from "./pages/Homepage"
import KPI from "./pages/KPI";
import CRM from "./pages/CRM";
import EmployeesView from "./pages/Employees/EmployeesView";
import Recruitment from "./pages/Employees/Recruitment";
import Termination from "./pages/Employees/Termination";
import Trainings from "./pages/Employees/Trainings";
import Productions from "./pages/Inventory/Productions";
import Batches from "./pages/Inventory/Batches";
import Banner from "./components/Banner";
import Loader from "./components/Loader";
import Order from "./pages/Order";
import Saved from "./pages/Saved";
import Payroll from "./pages/Payroll";
import Setting from "./pages/Setting";
function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loading
      ? document.querySelector("body").classList.add("loading")
      : document.querySelector("body").classList.remove("loading");
  }, [loading]);
  return (
       <SideBar> 
        <Routes >
          <Route path="/KPI" element={<KPI />} />
          <Route path="/CRM" element={<CRM />} />
          <Route path="/hrms/employees" element={<EmployeesView />} />
          <Route path="/hrms/hiring" element={<Recruitment />} />
          <Route path="/hrms/termination" element={<Termination />} />
          <Route path="/hrms/trainings" element={<Trainings />} />
          <Route path="/inventory/productions" element={<Productions />} />
          <Route path="/inventory/batches" element={<Batches />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="" element={<Homepage />} />

          <Route path="*" element={<> not found</>} />
          <Route path="/saved" element={<Saved />} />
        </Routes>
        </SideBar>
  );
}

export default App;