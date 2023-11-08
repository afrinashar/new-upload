const express = require('express');
const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  
} = require('../controllers/studentController');

const router = express.Router();

router.route('/').post(createStudent).get(getAllStudents);
router.route('/:id').get(getStudentById).put(updateStudent).delete(deleteStudent);


module.exports = router;
