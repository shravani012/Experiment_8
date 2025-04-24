const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory "database"
let students = [];
let idCounter = 1;

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Student Management API');
});

// 1. GET /students - Fetch all student records
app.get('/students', (req, res) => {
  res.json(students);
});

// 2. GET /students/:id - Fetch a specific student by ID
app.get('/students/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ message: 'Student not found' });
  res.json(student);
});

// 3. POST /students - Add a new student
app.post('/students', (req, res) => {
  const { name, email, course } = req.body;
  if (!name || !email || !course) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const newStudent = { id: idCounter++, name, email, course };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// 4. PUT /students/:id - Update existing student details
app.put('/students/:id', (req, res) => {
  const { name, email, course } = req.body;
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ message: 'Student not found' });

  student.name = name || student.name;
  student.email = email || student.email;
  student.course = course || student.course;

  res.json(student);
});

// 5. DELETE /students/:id - Remove a student record
app.delete('/students/:id', (req, res) => {
  const index = students.findIndex(s => s.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Student not found' });

  const removed = students.splice(index, 1);
  res.json({ message: 'Student deleted', student: removed[0] });
});

app.listen(PORT, () => {
  console.log(`Student Management API is running on http://localhost:${PORT}`);
});
