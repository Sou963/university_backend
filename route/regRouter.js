const express = require("express");
const router = express.Router();
const Course = require("../model/course");

// ================= NORMALIZE COURSE PAYLOAD =================
function normalizeCoursePayload(body) {
  const { courseCode, courseTitle, level, credit, prerequisite, studentId, section } = body;

  const prereqList = Array.isArray(prerequisite)
    ? prerequisite
    : typeof prerequisite === "string" && prerequisite.trim() !== ""
      ? prerequisite.split(",").map(p => p.trim()).filter(Boolean)
      : [];

  return {
    studentId,
    courseCode,
    courseTitle,
    level,
    credit: credit === undefined || credit === null || credit === ""
      ? undefined
      : Number(credit),
    prerequisite: prereqList,
    section: section || "A" // default section
  };
}

// ================= ADD COURSE =================
async function addCourse(req, res) {
  try {
    const data = normalizeCoursePayload(req.body);
    const course = new Course(data);

    await course.save();
    res.json({
      message: "Course Added",
      course
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding course",
      error: error.message
    });
  }
}

// ================= ROUTES =================
router.post("/", addCourse);
router.post("/add", addCourse);

router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching courses",
      error: error.message
    });
  }
});

// ================= GET COURSES BY STUDENT =================
router.get("/student/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const courses = await Course.find({ studentId });

    if (courses.length === 0) {
      return res.status(404).json({ message: "No courses found for this student" });
    }

    res.json({
      studentId,
      totalCourses: courses.length,
      courses
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching student courses",
      error: error.message
    });
  }
});

// ================= SEARCH COURSES =================
// Example: /api/courses/search?query=Programming&semester=1st
router.get("/search", async (req, res) => {
  try {
    const { query, semester, section } = req.query;

    // Dynamic filter object
    const filter = {};

    if (query) {
      filter.$or = [
        { courseCode: { $regex: query, $options: "i" } },
        { courseTitle: { $regex: query, $options: "i" } }
      ];
    }

    if (semester) filter.level = semester;
    if (section) filter.section = section;

    const courses = await Course.find(filter);

    if (courses.length === 0) {
      return res.status(404).json({ message: "No courses match your search" });
    }

    res.json({
      total: courses.length,
      courses
    });

  } catch (error) {
    res.status(500).json({
      message: "Error searching courses",
      error: error.message
    });
  }
});

// Update result for a course
router.put("/update-result", async (req, res) => {
  try {
    const { studentId, courseCode, mark, grade, gradePoint } = req.body;

    const course = await Course.findOne({ studentId, courseCode });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.result = { mark, grade, gradePoint };
    await course.save();

    res.json({ message: "Result updated successfully", course });
  } catch (error) {
    res.status(500).json({ message: "Error updating result", error: error.message });
  }
});

module.exports = router;