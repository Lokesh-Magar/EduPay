'use client'
import { useEffect, useState } from "react";
import { createTheme } from "@mui/material/styles";
import { Button, Card, CardContent, Grid, Link, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import axios from "axios";

type Student = {
  id: string;
  username: string;
  email: string;
  createdAt: string;
};

const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  // Fetch students data on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('/student/fetchStudents');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudents();
  }, []);

  // Handle opening the edit dialog with the selected student data
  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setEditOpen(true);
  };

  // Handle form submission to update student data
  const handleEditSubmit = async () => {
    if (!editingStudent) return;

    const { id, username, email } = editingStudent;

    // Validation
    if (!username || !email) {
      alert("All fields are required.");
      return;
    }

    if (!email.includes('@')) {
      alert("Please provide a valid email.");
      return;
    }

    try {
      // Make the PUT request to update the student information
      const response = await axios.put(`/student/update/${id}`, editingStudent);

      alert("Student updated successfully!");

      // Update the local state to reflect the changes
      setStudents(prevStudents =>
        prevStudents.map(student =>
          student.id === id ? { ...student, username, email } : student
        )
      );

      setEditOpen(false);
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Failed to update student. Please try again.");
    }
  };

  // Handle deleting a student
  const handleDelete = async (studentId: string) => {
    try {
      await axios.delete(`/student/delete/${studentId}`);
      setStudents(students.filter((student) => student.id !== studentId));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  // Handle closing the edit dialog
  const handleEditClose = () => {
    setEditOpen(false);
    setEditingStudent(null);
  };

  // Handle changes in input fields (username, email)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Student) => {
    if (editingStudent) {
      setEditingStudent({
        ...editingStudent,
        [field]: e.target.value,
      });
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#1976d2",
      },
    },
  });

  return (
    <>
      <div className="flex">
        <Typography variant="h6" component="h3">
          Student List
        </Typography>
        <nav style={{ marginLeft: "auto" }}>
          <Typography
            variant="h6"
            component="h3"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Link href="/dashboard" style={{ marginRight: "10px" ,color:'black',textDecoration:'none'}}>
              Dashboard
            </Link>
            <span style={{ marginRight: "20px" }}>|</span>
            <Link href="/dashboard/students/studentList" style={{ color:'black',textDecoration:'none'}}>Student List</Link>
          </Typography>
        </nav>
      </div>

      <div className="flex" style={{ display: "flex" }}>
        <div className="feesList mt-7 mx-6" style={{ flex: 1 }}>
          <Card sx={{ width: "102%", height: "105%" }}>
            <CardContent>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="h6"
                  component="h3"
                  style={{ flex: 1, marginRight: "16%" }}
                >
                  All Students
                </Typography>
              </div>

              <div style={{ marginTop: "20px" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                    
                      <th
                        style={{
                          padding: "8px",
                          textAlign: "left",
                          backgroundColor: "lightgray",
                        }}
                      >
                        <span>SN</span>
                      </th>
                      <th
                        style={{
                          padding: "8px",
                          textAlign: "left",
                          backgroundColor: "lightgray",
                        }}
                      >
                        <span>Full Name</span>
                      </th>
                      <th
                        style={{
                          padding: "8px",
                          textAlign: "left",
                          backgroundColor: "lightgray",
                        }}
                      >
                        <span>Email</span>
                      </th>
                      <th
                        style={{
                          padding: "8px",
                          textAlign: "left",
                          backgroundColor: "lightgray",
                        }}
                      >
                        <span>Phone</span>
                      </th>
                      <th
                        style={{
                          padding: "8px",
                          textAlign: "left",
                          backgroundColor: "lightgray",
                        }}
                      >
                        <span>Address</span>
                      </th>
                      <th
                        style={{
                          padding: "8px",
                          textAlign: "left",
                          backgroundColor: "lightgray",
                        }}
                      >
                        <span>Gender</span>
                      </th>
                      <th
                        style={{
                          padding: "8px",
                          textAlign: "left",
                          backgroundColor: "lightgray",
                        }}
                      >
                        <span>Class</span>
                      </th>
                      <th
                        style={{
                          padding: "8px",
                          textAlign: "left",
                          backgroundColor: "lightgray",
                        }}
                      >
                        <span>Registered At (M/D/Y)</span>
                      </th>
                      <th
                        style={{
                          padding: "8px",
                          textAlign: "left",
                          backgroundColor: "lightgray",
                          borderRadius: "0 5px 5px 0",
                        }}
                      >
                        {/* <span>Actions</span> */}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student,index) => (
                      <tr key={student.id} style={{ borderBottom: "1px solid #ddd" }}>
                        <td style={{ padding: "8px" }}>{index+1}</td>
                        <td style={{ padding: "8px" }}>{student.fullname}</td>
                        <td style={{ padding: "8px" }}>{student.email}</td>
                        <td style={{ padding: "8px" }}>{student.phone}</td>
                        <td style={{ padding: "8px" }}>{student.address}</td>

                        <td style={{ padding: "8px" }}>{student.gender}</td>
                        <td style={{ padding: "8px" }}>{student.studylevel}</td>
                        <td style={{ padding: "8px" }}>{new Date(student.createdAt).toLocaleDateString()}</td>
                        <td style={{ padding: "5px" }}>
                          {/* <Button
                            variant="outlined"
                            size="small"
                            style={{ borderRadius: "20px" }}
                            onClick={() => handleEdit(student)}
                          >
                            EDIT
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            style={{ borderRadius: "20px" }}
                            onClick={() => handleDelete(student.id)}
                          >
                            DELETE
                          </Button> */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Student Dialog */}
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent>
          <TextField
            label="Username"
            value={editingStudent?.username || ''}
            onChange={(e) => handleInputChange(e, 'username')}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            value={editingStudent?.email || ''}
            onChange={(e) => handleInputChange(e, 'email')}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button
            onClick={handleEditSubmit} // Call the function directly here
            color="primary"
            variant="contained"
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StudentList;
