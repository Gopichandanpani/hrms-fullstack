import React, { useEffect, useState } from "react";
import API from "../services/api";
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Box,
} from "@mui/material";

function Dashboard({ employees }) {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("attendance/")
      .then((res) => {
        setAttendance(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getPresentCount = (empId) => {
    return attendance.filter(
      (rec) => rec.employee === empId && rec.status === "Present"
    ).length;
  };

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        HRMS Dashboard
      </Typography>

      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Employee Present Summary
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
          <CircularProgress />
        </Box>
      ) : employees.length === 0 ? (
        <Typography color="text.secondary">
          No employees found.
        </Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Employee ID</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Department</strong></TableCell>
              <TableCell align="center">
                <strong>Total Present Days</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {employees.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell>{emp.employee_id}</TableCell>
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.department}</TableCell>
                <TableCell align="center">
                  {getPresentCount(emp.id)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
}

export default Dashboard;