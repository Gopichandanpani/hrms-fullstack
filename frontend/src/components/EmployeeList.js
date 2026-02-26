import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import api from "../api"; // adjust path if needed

function EmployeeList({ employees, refreshEmployees }) {
  const handleDelete = async (id) => {
    try {
      await api.delete(`/employees/${id}/`);
      refreshEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  if (!employees.length) {
    return <Typography>No employees added yet.</Typography>;
  }

  return (
    <Paper sx={{ p: 2, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Employees
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Employee ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Department</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {employees.map((emp) => (
            <TableRow key={emp.id}>
              <TableCell>{emp.employee_id}</TableCell>
              <TableCell>{emp.name}</TableCell>
              <TableCell>{emp.email}</TableCell>
              <TableCell>{emp.department}</TableCell>
              <TableCell align="right">
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(emp.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default EmployeeList;