import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaUserAlt,
  FaIdBadge,
} from "react-icons/fa";
import axios from "axios";
// import { a } from "framer-motion/client";
import { NavLink, Link, useParams } from "react-router-dom";
const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://employee-crude-api-axios.onrender.com/employees" // رابط API في بيئة الإنتاج
    : "http://localhost:8000/employees"; // رابط API في بيئة التطوير
const Employees = ({
  schowVid,
  data,
  funschowVid,
  deletEmployee,
  setDataGlobal,
}) => {
  const [btnval, setBtnval] = useState("Add");
  const [tSearch, setTSearch] = useState([]);

  const myform = useRef();
  const txtmot = useRef();
  const btnn = useRef();
  const h1 = useRef();
  const txtId = useRef();
  const txtName = useRef();
  const txtAge = useRef();
  const txtPosition = useRef();
  const txtPhoto = useRef();
  const txtCity = useRef();
  const txtDepid = useRef();
  const txtDepname = useRef();

  const charger = async (empl) => {
    setTSearch([]);
    txtId.current.value = empl.id;
    txtName.current.value = empl.name;
    txtAge.current.value = empl.age;
    txtPosition.current.value = empl.position;
    txtCity.current.value = empl.city;
    txtDepid.current.value = empl.department.id;
    txtDepname.current.value = empl.department.name;
    txtId.current.readOnly = true;
    setBtnval("Modifier");
    h1.current.innerHTML = "Modifier <br/> Employee :";

    // kanakhedo lpath dyal taswira
    const imagePath = `./employeeImgempl/${empl.photo}`;
    //  fetch bach ka takhod lobject kaml( photo ) mn path
    // const response = await fetch(imagePath);
    // console.log(response);

    // hadi katerd img form dyal blobli hiya Binary  Large Object  (des chiffers) li kat3awnk hna
    //  bach tkhedm b photo dyalk bla ma t3awd t installiha
    const imgBlob = new Blob();
    console.log(imgBlob);
    // hadi katsayb object file ela asas object  blob
    const file = new File([imgBlob], empl.photo, {
      type: "image/jpeg",
      lastModified: new Date().getTime(),
    });
    console.log(file);
    // hna kangado object kay3awna nhato file dyalna f input
    let container = new DataTransfer();
    console.log(container);
    // hna kandkhlo l file
    container.items.add(file);
    console.log(container);
    // hna kanhto had object container f input dyalna as aDfeaultValue
    txtPhoto.current.files = container.files;
    console.log(txtPhoto.current.files);

    //------------------------------------------- machi darori ykon blob 3amer lmohim gha ykon lobjet blob o file kaygad file  ------------
  };

  const funAddEmp = async () => {
    if (
      txtId.current.value &&
      txtName.current.value &&
      txtAge.current.value &&
      txtPosition.current.value &&
      txtPhoto.current.files[0] &&
      txtCity.current.value &&
      txtDepid.current.value &&
      txtDepname.current.value
    ) {
      const idExist = data.find((e) => e.id == txtId.current.value);

      const employee = {
        id: txtId.current.value,
        name: txtName.current.value,
        age: txtAge.current.value,
        position: txtPosition.current.value,
        photo: txtPhoto.current.files[0].name,
        city: txtCity.current.value,
        department: {
          id: txtDepid.current.value,
          name: txtDepname.current.value,
        },
      };

      if (btnval === "Add") {
        if (idExist) {
          alert("This employee's ID already exists. Please enter another ID.");
          return false;
        }
        // Add new employee
        await axios.post(apiUrl, employee);
        setDataGlobal(employee);
        alert("Added successfully!");
      } else {
        // Update existing employee
        await axios.put(
          `${apiUrl}/${employee.id}`,

          employee
        );
        setDataGlobal(employee, "edit");
        setBtnval("Add");
        h1.current.innerHTML = "Add <br/> Employee :";
        txtId.current.readOnly = false;
        alert("Updated successfully!");
      }
      myform.current.reset();
    } else {
      alert(
        "Please fill in all fields (verify the existence of the image) !!!"
      );
    }
  };

  const SSearch = (ev) => {
    const searchTerm = ev.target.value.toLowerCase();
    const nTable = data.filter(
      (e) =>
        e.id.toString().includes(searchTerm) ||
        e.name.includes(searchTerm) ||
        e.age.toString().includes(searchTerm) ||
        e.position.includes(searchTerm) ||
        e.city.includes(searchTerm) ||
        e.department.id.toString().includes(searchTerm) ||
        e.department.name.includes(searchTerm)
    );

    setTSearch(nTable);
    console.log(nTable);
  };

  const handlerCharger = (id) => {
    setTSearch([]);
    funschowVid(true);
    axios.get(`${apiUrl}/${id}`).then((res) => {
      charger(res.data);
    });
  };

  return (
    <div className="relative h-screen">
      <div className="h-full flex flex-col justify-start translate-y-20 items-center text-center px-8">
        {!schowVid ? (
          <>
            {/* <Loader /> */}
            <List
              SSearch={SSearch}
              tSearch={tSearch}
              dataE={data}
              funschowVid={funschowVid}
              deletEmployee={deletEmployee}
              handlerCharger={handlerCharger}
            />
          </>
        ) : (
          <AlertAdd
            btnval={btnval}
            funAddEmp={funAddEmp}
            funschowVid={funschowVid}
            myform={myform}
            btnn={btnn}
            h1={h1}
            txtId={txtId}
            txtName={txtName}
            txtAge={txtAge}
            txtPosition={txtPosition}
            txtPhoto={txtPhoto}
            txtCity={txtCity}
            txtDepid={txtDepid}
            txtDepname={txtDepname}
            handlerCharger={handlerCharger}
          />
        )}
      </div>
    </div>
  );
};

const Employee = ({ data }) => {
  let { id } = useParams();
  let employee = data.find((p) => p.id === id);
  // console.log(employee);
  return (
    <div
      className="flex flex-col items-center p-8 max-w-sm mx-auto bg-gradient-to-b
     from-blue-50 to-white shadow-lg rounded-2xl transition duration-300 hover:shadow-2xl"
    >
      <motion.div
        className="relative flex items-center justify-center mb-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.img
          src={`/employeeImg/${employee.photo}`}
          alt={employee.name}
          className="w-36 h-36 rounded-full object-cover shadow-lg transition-transform duration-500 hover:scale-105"
        />
        <span className="absolute bottom-2 right-2 bg-blue-600 text-white text-xs rounded-full px-2 py-1 font-semibold shadow-md">
          ID: {employee.id}
        </span>
      </motion.div>

      <motion.h2
        className="text-2xl font-bold text-gray-800 mb-1"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {employee.name}
      </motion.h2>
      <p className="text-blue-700 font-medium flex items-center gap-2 mb-4">
        <FaBriefcase className="text-blue-500" /> {employee.position}
      </p>

      {/* City and Age */}
      <div className="text-gray-600 flex flex-col items-center text-center mb-4 space-y-1">
        <p className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-blue-400" /> {employee.city}
        </p>
        <p className="flex items-center gap-2">
          <FaUserAlt className="text-blue-400" /> Age: {employee.age}
        </p>
      </div>

      {/* Department Information */}
      <div className="w-full bg-blue-100 p-4 rounded-xl flex flex-col items-center shadow-sm">
        <div className="text-blue-800 font-semibold mb-1 flex items-center gap-2">
          <FaIdBadge className="text-blue-500" /> Department:{" "}
          {employee.department.name}
        </div>
        <div className="text-blue-600 text-sm font-semibold">
          Department ID: {employee.department.id}
        </div>
      </div>
    </div>
  );
};

const AlertAdd = ({
  funAddEmp,
  funschowVid,
  myform,
  btnn,
  h1,
  txtId,
  txtName,
  txtAge,
  txtPosition,
  txtPhoto,
  txtCity,
  txtDepid,
  txtDepname,
  btnval,
}) => {
  const [active, setActive] = useState(false);

  return (
    <div className="relative b w-full h-full translate-y-[-70px] ">
      <motion.img
        src="./img/bg.png"
        className="absolute  inset-0 w-full h-full object-cover z-[-15] rounded-[50px] "
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1 }}
        autoPlay
      ></motion.img>
      {active && (
        <motion.video
          src="./vid2.mp4"
          muted
          className="absolute  inset-0 w-full h-full object-cover z-[-15] rounded-[50px] "
          // initial={{ opacity: 0, scale: 0.3 }}
          // animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0 }}
          autoPlay
        ></motion.video>
      )}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute right-[50px] z-50  cursor-pointer font-extrabold text-[42px]  text-red-400 hover:text-red-600"
        onClick={() => funschowVid(false)}
      >
        X
      </motion.p>
      <div className="flex flex-row justify-between  ">
        <motion.h1
          className="text-2xl md:text-7xl  text-white font-bold text-start m-4 "
          initial={{ opacity: 0, y: -50 }}
          ref={h1}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Add <br />
          Employee :
        </motion.h1>
        <motion.form
          ref={myform}
          onClick={() => setActive(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="w-[39%] text-2xl md:text-7xl text-white font-bold myform"
        >
          <table className="text-left   text-black">
            <tbody>
              <tr>
                <td className="pr-[-30px]">
                  <label
                    htmlFor="id"
                    className="text-sm font-medium text-gray-700"
                  >
                    ID
                  </label>
                </td>
                <td>
                  <input
                    type="number"
                    id="id"
                    ref={txtId}
                    className="w-full border border-gray-300 rounded-md text-black p-1"
                  />
                </td>
              </tr>

              <tr>
                <td className="pr-[-30px]">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    id="name"
                    ref={txtName}
                    className="w-full border border-gray-300 rounded-md text-black p-1"
                  />
                </td>
              </tr>

              <tr>
                <td className="pr-[-30px]">
                  <label
                    htmlFor="age"
                    className="text-sm font-medium text-gray-700"
                  >
                    Age
                  </label>
                </td>
                <td>
                  <input
                    type="number"
                    id="age"
                    ref={txtAge}
                    className="w-full border border-gray-300 rounded-md text-black p-1"
                  />
                </td>
              </tr>

              <tr>
                <td className="pr-[-30px]">
                  <label
                    htmlFor="position"
                    className="text-sm font-medium text-gray-700"
                  >
                    Position
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    id="position"
                    ref={txtPosition}
                    className="w-full border border-gray-300 rounded-md text-black p-1"
                  />
                </td>
              </tr>

              <tr>
                <td className="pr-[-30px]">
                  <label
                    htmlFor="photo"
                    className="text-sm font-medium text-gray-700"
                  >
                    Photo
                  </label>
                </td>
                <td>
                  <input
                    type="file"
                    accept="image/*"
                    id="photo"
                    ref={txtPhoto}
                    className="w-full border border-gray-300 rounded-md text-black cursor-pointer py-1 px-2"
                  />
                </td>
              </tr>

              <tr>
                <td className="pr-[-30px]">
                  <label
                    htmlFor="city"
                    className="text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    id="city"
                    ref={txtCity}
                    className="w-full border border-gray-300 rounded-md text-black p-1"
                  />
                </td>
              </tr>

              <tr>
                <td className="pr-[-30px]">
                  <label
                    htmlFor="departmentid"
                    className="text-sm font-medium text-gray-700"
                  >
                    Department ID
                  </label>
                </td>
                <td>
                  <input
                    type="number"
                    id="departmentid"
                    ref={txtDepid}
                    className="w-full border border-gray-300 rounded-md text-black p-1"
                  />
                </td>
              </tr>

              <tr>
                <td className="pr-[-30px]">
                  <label
                    htmlFor="departmentname"
                    className="text-sm font-medium text-gray-700"
                  >
                    Department Name
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    id="departmentname"
                    ref={txtDepname}
                    className="w-full border border-gray-300 rounded-md text-black p-1"
                  />
                </td>
              </tr>

              <tr>
                <td colSpan="2" className="text-center">
                  <input
                    type="button"
                    ref={btnn}
                    value={btnval}
                    onClick={() => {
                      funAddEmp();
                    }}
                    className="w-15 h-8 text-[16px] mt-15 bg-blue-500 text-white px-2 rounded-md hover:bg-blue-600"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </motion.form>
      </div>
    </div>
  );
};
const List = ({
  SSearch,
  tSearch,
  dataE,
  funschowVid,
  deletEmployee,
  handlerCharger,
}) => {
  let dataEE = dataE;
  let t = tSearch.length > 0 ? tSearch : dataEE;
  return (
    <div class="relative shadow-md sm:rounded-lg w-[90%] flex flex-col justify-center items-center ">
      <motion.h1
        className="text-5xl md:text-7xl text-white font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        Table <span className="text-blue-500">Employee ! </span>
      </motion.h1>
      <motion.p
        className=" text-sm text-gray-300 max-w-[80%] mb-10 mt-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.7 }}
      >
        THere you can find a comprehensive list of all employees. Use the search
        bar to find a specific employee .
        <a
          onClick={() => funschowVid(true)}
          className="text-cyan-100 underline cursor-help "
        >
          are you want Add ?
        </a>
      </motion.p>

      <motion.input
        placeholder="Search by id,name,..."
        className="px-9 py-3 rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.7 }}
        type="text"
        onInput={(e) => SSearch(e)}
      />

      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.9 }}
      ></motion.div>
      <motion.table
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        class="w-full mb-[70px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              photo
            </th>
            <th scope="col" class="px-6 py-3">
              id
            </th>
            <th scope="col" class="px-6 py-3">
              name
            </th>
            <th scope="col" class="px-6 py-3">
              position
            </th>

            <th scope="col" class="px-6 py-3">
              department
            </th>
            <th scope="col" class="px-6 py-3">
              action
            </th>
          </tr>
        </thead>
        <tbody>
          {t.map((e, i) => {
            return (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="px-6 py-4">
                  <Link to={"employee/" + e.id}>
                    {" "}
                    <img
                      src={`/employeeImg/${e.photo}`}
                      alt={e.photo}
                      className="w-[32px] rounded-full"
                    />{" "}
                  </Link>
                </td>
                <td class="px-6 py-4">
                  {" "}
                  <Link to={"employee/" + e.id}>{e.id} </Link>
                </td>
                <td class="px-6 py-4">
                  {" "}
                  <Link to={"employee/" + e.id}>{e.name} </Link>
                </td>
                <td class="px-6 py-4">
                  {" "}
                  <Link to={"employee/" + e.id}>{e.position} </Link>
                </td>
                <td class="px-6 py-4">
                  {" "}
                  <Link to={"employee/" + e.id}>{e.department.name} </Link>
                </td>
                <td class="px-6 py-4">
                  <a
                    onClick={() => deletEmployee(e.id, e.name)}
                    class="font-medium text-blue-600 dark:text-red-500 hover:underline"
                  >
                    Delet
                  </a>
                  /
                  <a
                    onClick={() => handlerCharger(e.id)}
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </motion.table>
    </div>
  );
};
// function Loader() {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 200);

//     return () => clearTimeout(timer);
//   }, []);

//   if (!loading) return null;

//   return (
//     <div style={styles.loaderOverlay}>
//       {" "}
//       <div style={styles.loader}>Loading...</div>
//     </div>
//   );
// }
// const styles = {
//   loaderOverlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: "100%",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     display: "flex",
//     backgroundColor: "black",
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 100,
//   },
//   loader: {
//     color: "#fff",
//     fontSize: "24px",
//   },
// };

export default Employees;
export { Employee };
