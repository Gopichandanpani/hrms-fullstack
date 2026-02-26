import React, { useEffect, useState } from "react";
import API from "./services/api";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./components/Dashboard";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import Attendance from "./components/Attendance";

function App() {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = () => {
    API.get("employees/")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <MainLayout>
      <Dashboard employees={employees} />
      <EmployeeForm refreshEmployees={fetchEmployees} />
      <EmployeeList
        employees={employees}
        refreshEmployees={fetchEmployees}
      />
      <Attendance employees={employees} />
    </MainLayout>
  );
}

export default App;