const express = require("express");
const router = express.Router();
const Registration = require("../model/result");


// GET REGISTRATION SUBJECTS
router.get("/:id", async (req, res) => {
  try {

    console.log("Searching:", req.params.id);

    const data = await Registration.findOne({
      semesterRegistrationId: req.params.id
    });

    if (!data) {
      return res.status(404).json({
        message: "Registration not found",
        id: req.params.id
      });
    }

    res.json(data);

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
      error: error.message
    });

  }
});

// UPDATE RESULT (MARK + GRADE)
router.put("/update-result", async (req, res) => {

  try {

    const { semesterRegistrationId, courseCode, mark, grade, gradePoint } = req.body;

    const result = await Registration.updateOne(
      {
        semesterRegistrationId: semesterRegistrationId,
        "subjects.courseCode": courseCode
      },
      {
        $set: {
          "subjects.$.mark": mark,
          "subjects.$.grade": grade,
          "subjects.$.gradePoint": gradePoint
        }
      }
    );

    res.json({
      message: "Result Updated",
      result
    });

  } catch (error) {

    res.status(500).json({
      message: "Error updating result",
      error: error.message
    });

  }

});

module.exports = router;