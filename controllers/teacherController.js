const Teacher = require('../models/teacherModel');

// Controller actions
const createTeacher = async (req, res) => {
  try {

    const teacher = new Teacher(req.body,{_id: new mongoose.Types.ObjectId()});
    await teacher.save();
    res.status(201).send(teacher);
  } catch (error) { 
    res.status(400).send(error);
  }
};

const getAllTeachers = async (req, res) => {
  const { page = 1, limit = 10, sortBy = 'title', searchTerm = '' } = req.query;
  const query = {};
  if (searchTerm) {
    query.title = { $regex: searchTerm, $options: 'i' };
  }
  try {
    const teacher = await Teacher.find({})
    .sort(sortBy)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const count = await teacher.countDocuments(query);
    res.send({teacher,
      totalPages: Math.ceil(count / limit),
    currentPage: page,});
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a single Teacher by Teacher_id
const getTeacherById = async (req, res) => {
 
  try { 
   // let id=_id
    const teacher = await Teacher.findOne({ _id: id ,teacher: req.params.id });
    if (!teacher) {
      return res.status(404).json({ success: false, error: 'Teacher not found' });
    }
    res.status(200).json({ success: true, data: teacher });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
// Update a Teacher by Teacher_id
const updateTeacher = async (req, res) => {
    try {
      const teacher = await Teacher.findOneAndUpdate({ _id: id, teacher: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      });
      if (!teacher) {
        return res.status(404).json({ success: false, error: error &&  'Teacher not found' });
      }
      res.status(200).json({ success: true, data: teacher });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  };

  // Delete a teacher by Teacher_id
const deleteTeacher = async (req, res) => {
    try {
      const teacher = await Teacher.findOneAndDelete({ _id: id, teacher: req.params.id });
      if (!teacher) {
        return res.status(404).json({ success: false, error: error && 'Teacher not found' });
      }
      res.status(200).json({ success: true, data: {} });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  };
module.exports = {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher
};
