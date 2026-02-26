import React, { useState } from "react";
import API from "../services/api";
import {
  Paper,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Box,
  Alert,
} from "@mui/material";

function Attendance({ employees }) {
  const [markData, setMarkData] = useState({
    employee: "",
    date: "",
    status: "Present",
  });

  const [viewEmployee, setViewEmployee] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ---------------- MARK ----------------
  const handleMarkSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await API.post("attendance/", markData);
      alert("Attendance Marked Successfully");
      setMarkData({ ...markData, date: "" });
    } catch (err) {
      setError("Attendance already marked for this date.");
    }
  };

  // ---------------- VIEW ----------------
  const handleView = async () => {
    if (!viewEmployee) return;

    setLoading(true);
    setError("");

    try {
      const res = await API.get("attendance/");
      const filtered = res.data
        .filter((rec) => rec.employee === parseInt(viewEmployee))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      setRecords(filtered);
    } catch {
      setError("Failed to fetch attendance.");
    }

    setLoading(false);
  };

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Attendance Management
      </Typography>

      <Grid container spacing={4}>
        {/* ---------------- MARK SECTION ---------------- */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Mark Attendance
          </Typography>

          <Box component="form" onSubmit={handleMarkSubmit}>
            <TextField
              select
              label="Select Employee"
              fullWidth
              margin="normal"
              value={markData.employee}
              onChange={(e) =>
                setMarkData({ ...markData, employee: e.target.value })
              }
              required
            >
              {employees.map((emp) => (
                <MenuItem key={emp.id} value={emp.id}>
                  {emp.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              type="date"
              label="Date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={markData.date}
              onChange={(e) =>
                setMarkData({ ...markData, date: e.target.value })
              }
              required
            />

            <TextField
              select
              label="Status"
              fullWidth
              margin="normal"
              value={markData.status}
              onChange={(e) =>
                setMarkData({ ...markData, status: e.target.value })
              }
            >
              <MenuItem value="Present">Present</MenuItem>
              <MenuItem value="Absent">Absent</MenuItem>
            </TextField>

            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              type="submit"
            >
              Mark Attendance
            </Button>
          </Box>
        </Grid>

        {/* ---------------- VIEW SECTION ---------------- */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            View Attendance
          </Typography>

          <TextField
            select
            label="Select Employee"
            fullWidth
            margin="normal"
            value={viewEmployee}
            onChange={(e) => setViewEmployee(e.target.value)}
          >
            {employees.map((emp) => (
              <MenuItem key={emp.id} value={emp.id}>
                {emp.name}
              </MenuItem>
            ))}
          </TextField>

          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleView}
          >
            View Records
          </Button>

          {loading && (
            <Box sx={{ textAlign: "center", mt: 3 }}>
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {!loading && records.length > 0 && (
            <Table sx={{ mt: 3 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {records.map((rec) => (
                  <TableRow key={rec.id}>
                    <TableCell>{rec.date}</TableCell>
                    <TableCell>{rec.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {!loading && viewEmployee && records.length === 0 && (
            <Typography sx={{ mt: 2 }} color="text.secondary">
              No attendance records found.
            </Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Attendance;