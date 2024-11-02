import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function Departments({ data }) {
  const [db, setDb] = useState({
    departments: [],
    Table2: [],
    schowt2: false,
  });

  useEffect(() => {
    const updatedDepartments = data.employees
      .map((e) => e.department)
      .sort((a, b) => a.id - b.id);
    setDb({ departments: updatedDepartments });
  }, [data.employees]);

  console.log(db.departments);
  const getEmployeesByDep = (id) => {
    const tableEmpByDep = data.employees.filter((e) => e.department.id == id);
    setDb({ ...db, Table2: tableEmpByDep, schowt2: true });
  };

  return (
    <div className="relative h-screen">
      <div className="h-full flex flex-col justify-start mt-10 items-center text-center px-8">
        <motion.h1
          className="text-5xl md:text-7xl text-white font-bold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          All <span className="text-blue-500">Departments!</span>
        </motion.h1>

        <motion.p
          className="mt-4 text-md text-gray-300 max-w-[80%] leading-relaxed"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.7 }}
        >
          Discover all your departments and see the employees working in each.
        </motion.p>

        {/* Animated Table */}
        <motion.table
          className="mt-8 w-full max-w-3xl border-collapse bg-white shadow-lg rounded-lg overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
        >
          <thead>
            <tr className="bg-blue-500 text-white text-center">
              <th className="px-6 py-3 font-semibold uppercase text-sm ">#</th>
              <th className="px-6 py-3 font-semibold uppercase text-sm ">
                Department Name
              </th>
            </tr>
          </thead>
          <tbody>
            {db.departments.map((department, index) => (
              <motion.tr
                key={index}
                onClick={() => getEmployeesByDep(department.id)}
                className="hover:bg-gray-100 transition duration-300 ease-in-out cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <td className="px-6 py-4 border-b border-gray-200">
                  {department.id}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {department.name}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
        {db.schowt2 && (
          <motion.table className="mt-8 w-full max-w-3xl border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
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
              </tr>
            </thead>
            <tbody>
              {db.Table2.map((e, i) => {
                return (
                  <tr className="hover:bg-gray-100 transition duration-300 ease-in-out cursor-pointer">
                    <td className="px-6 py-4 border-b border-gray-200">
                      {" "}
                      <img
                        src={`/employeeImg/${e.photo}`}
                        alt={e.photo}
                        className="w-[32px] rounded-full"
                      />{" "}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      {" "}
                      {e.id}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      {" "}
                      {e.name}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      {" "}
                      {e.position}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      {" "}
                      {e.department.name}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </motion.table>
        )}
      </div>
    </div>
  );
}

export default Departments;
