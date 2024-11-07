import "./App.css";
import { motion } from "framer-motion";
import Employees, { Employee } from "./Employees.jsx";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { useState, useEffect, useParams } from "react";
import axios from "axios";
import Departments from "./Departments";
import Preloader from './proLoader';

const App = () => {
  useEffect(async () => {
    await axios
      .get("http://localhost:8000/employees")
      .then((res) => setData({ ...data, employees: res.data }));
  }, []);
  const [data, setData] = useState({
    schowVid: false,
    employees: [
      // {
      //   id: "5",
      //   name: "FAYSAL",
      //   age: "",
      //   position: "",
      //   photo: "",
      //   city: "",
      //   department: {
      //     id: "",
      //     name: "",
      //     location: "",
      //   },
      // },
    ],
  });

  const setDataGlobal = (dataaa, edit) => {
    if (edit === "edit") {
      // Finde den Index des zu bearbeitenden Mitarbeiters
      const updatedEmployees = data.employees.map((e) =>
        e.id === dataaa.id ? dataaa : e,
      );

      // Erstelle den neuen Zustand
      const newState = { ...data, employees: updatedEmployees };

      // Aktualisiere den Zustand mit setData
      setData(newState);

      // Optional: Prüfe den neuen Zustand
      console.log(newState);
    } else {
      setData({ ...data, employees: [...data.employees, dataaa] });
    }
  };
  const deletEmployee = (id, name) => {
    return confirm("you want delete " + name + " are you sure ??")
      ? axios.delete(`http://localhost:8000/employees/${id}`).then((res) => {
          setData({
            ...data,
            employees: data.employees.filter((x) => x.id !== id),
          });
        })
      : "";
  };

  const funschowVid = (val) => {
    setData({
      ...data,
      schowVid: val,
    });
  };

  return (
    <BrowserRouter>
      <div className="relative h-screen bg-black">
        <header>
          <Nav />
        </header>
        <Routes>
          <Route path="/" element={<Hero />} />
          
          <Route path="/employees">
            <Route
              index
              element={
                <>
                <Preloader/>
                <Employees
                  schowVid={data.schowVid}
                  data={data.employees}
                  funschowVid={funschowVid}
                  deletEmployee={deletEmployee}
                  setData={setData}
                  setDataGlobal={setDataGlobal}
                /></>
              }
            />
            <Route
              path="employee/:id"
              element={<Employee data={data.employees} />}
            />
          </Route>
          <Route
            path="/departments"
            element={<Departments data={data} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

const Nav = () => {
  return (
    <nav className="sticky w-full flex items-center justify-between px-8 py-4 bg-opacity-50">
      <div className="text-white text-2xl font-bold">
        Ges<span className="text-blue-500">Emp</span>
      </div>
      <ul className="flex space-x-8 text-white">
        <li className="hover:text-blue-500 cursor-pointer transition-colors">
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li className="hover:text-blue-500 cursor-pointer transition-colors">
          <NavLink to={"/employees"}>Employees</NavLink>
        </li>
        <li className="hover:text-blue-500 cursor-pointer transition-colors">
          <NavLink to={"/departments"}>Departments</NavLink>
        </li>
        {/* <li className="hover:text-blue-500 cursor-pointer transition-colors">
          Reports
        </li> */}
      </ul>
    </nav>
  );
};
const Hero = () => {
  return (
    <div className="relative h-screen ">
      <motion.video
        src="./vid120.mp4"
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      ></motion.video>

      <div className="h-full flex flex-col justify-center items-center text-center px-8">
        {/* <div> */}
        <motion.h1
          className="text-5xl md:text-7xl text-white font-bold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          Welcome to Employee{" "}
          <span className="text-blue-500">Management ! </span>
        </motion.h1>
        <motion.p
          className="mt-4  text-md text-gray-300 max-w-[80%]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.7 }}
        >
          This platform allows you to efficiently manage employee information,
          view department details, and generate insightful reports. Get started
          by navigating to the Employee Directory.
        </motion.p>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.9 }}
        >
          <NavLink
            to={"/employees"}
            className="px-6 py-3 text-lg bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-400 transition-colors"
          >
            Get Started
          </NavLink>
        </motion.div>
      </div>
    </div>
  );
};

export default App;
