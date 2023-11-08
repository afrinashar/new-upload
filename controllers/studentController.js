const Student = require('../models/studentModel');

// Controller actions
const createStudent = async (req, res) => {
  try {

    const student = new Student(req.body);
    await student.save();
    res.status(201).send(student);
  } catch (error) { 
    res.status(400).send(error);
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    res.send(students);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a single student by student_id
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findOne({ student_id: req.params.id });
    if (!student) {
      return res.status(404).json({ success: false, error: 'Student not found' });
    }
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
// Update a student by student_id
const updateStudent = async (req, res) => {
    try {
      const student = await Student.findOneAndUpdate({ student_id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      });
      if (!student) {
        return res.status(404).json({ success: false, error: 'Student not found' });
      }
      res.status(200).json({ success: true, data: student });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  };

  // Delete a student by student_id
const deleteStudent = async (req, res) => {
    try {
      const student = await Student.findOneAndDelete({ student_id: req.params.id });
      if (!student) {
        return res.status(404).json({ success: false, error: 'Student not found' });
      }
      res.status(200).json({ success: true, data: {} });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  };
module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent
};
