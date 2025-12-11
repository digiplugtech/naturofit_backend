const express = require('express');
const router = express.Router();
const upload = require("../middlewares/upload.middleware");
const doctorController = require('../controllers/doctorController');

router.post(
    "/",
    upload.fields([
      { name: "certificate_file", maxCount: 1 },
      { name: "profile_photo", maxCount: 1 }
    ]),
    doctorController.createDoctor
  );

router.get('/', doctorController.getAllDoctors);
router.get('/:id', doctorController.getDoctorById);
router.put(
  "/:id",
  upload.fields([
    { name: "certificate_file", maxCount: 1 },
    { name: "profile_photo", maxCount: 1 }
  ]),
  doctorController.updateDoctor
);
router.delete('/:id', doctorController.deleteDoctor);

module.exports = router;
