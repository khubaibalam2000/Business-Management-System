import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser, FaHouseUser, FaUserTie } from "react-icons/fa";
import { SiBookmeter } from "react-icons/si";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { MdEmojiPeople, MdInventory, MdProductionQuantityLimits, MdOutlineHotelClass } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import { RiErrorWarningFill } from "react-icons/ri";
import { CgPerformance } from "react-icons/cg";
import { GoGlobe } from "react-icons/go";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
const routes = [
  {
    path: "/KPI",
    name: "KPI",
    icon: <CgPerformance />,
  },
  {
    path: "/crm",
    name: "CRM",
    icon: <FaHouseUser />,
  },
  {
    path: "/hrms",
    name: "HRMS",
    icon: <GoGlobe />,
    subRoutes: [
      {
        path: "/hrms/employees",
        name: "Employees Record ",
        icon: <FaUserTie />,
      },
      {
        path: "/hrms/hiring",
        name: "Hiring",
        icon: <MdEmojiPeople />,
      },
      {
        path: "/hrms/termination",
        name: "Termination",
        icon: <RiErrorWarningFill />,
      },
      {
        path: "/hrms/trainings",
        name: "Trainings",
        icon: <GiTeacher />,
      },
    ],
  },
  {
    path: "/inventory",
    name: "Inventory",
    icon: <MdInventory />,
    exact: true,
    subRoutes: [
      {
        path: "/inventory/productions",
        name: "Productions ",
        icon: <MdProductionQuantityLimits />,
      },
      {
        path: "/inventory/batches",
        name: "Batches",
        icon: <MdOutlineHotelClass />,
      },
    ],
  },
  {
    path: "/payroll",
    name: "Payroll",
    icon: <FaHouseUser />,
    exact: true,
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "250px" : "60px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  Megnum
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          <div className="search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div>
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
