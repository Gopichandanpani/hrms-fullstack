import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Stack,
} from "@mui/material";
import API from "../services/api";

function EmployeeForm({ refreshEmployees }) {
  const [formData, setFormData] = useState({
    employee_id: "",
    name: "",
    email: "",
    department: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    API.post("employees/", formData)
      .then(() => {
        refreshEmployees();
        setFormData({
          employee_id: "",
          name: "",
          email: "",
          department: "",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Add Employee
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Employee ID"
          name="employee_id"
          value={formData.employee_id}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          fullWidth
        />

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Employee"}
        </Button>
      </Stack>
    </Paper>
  );
}

export default EmployeeForm;