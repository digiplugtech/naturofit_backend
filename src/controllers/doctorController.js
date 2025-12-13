const doctorService = require('../services/doctorService');

exports.createDoctor = async (req, res) => {
  try {
    let spec = req.body.specialization;
    
    // If it's an array, join it into a string
    if (Array.isArray(spec)) {
      spec = spec.join(','); 
    }
    
    // Or if it comes as a stringified JSON "[...]" from multipart/form-data
    // try {
    //    const parsed = JSON.parse(spec);
    //    if (Array.isArray(parsed)) spec = parsed.join(',');
    // } catch(e) {}

    const doctorData = {
      ...req.body,
      specialization: spec, // Save as "Homeopathy,Naturopathy"
      certificateUrl: req.files?.certificate_file ? req.files.certificate_file[0].path : null,
      profilePhotoUrl: req.files?.profile_photo ? req.files.profile_photo[0].path : null
    };

    // 2. Pass the FULL doctorData to the service
    const doctor = await doctorService.createDoctor(doctorData);

    res.status(201).json({ success: true, message: "Doctor created successfully", data: doctor });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorService.getAllDoctors();
    res.status(200).json({ success: true, message: "Doctors fetched successfully", count: doctors.length, data: doctors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await doctorService.getDoctorById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }
    res.status(200).json({ success: true, message: "Doctor found successfully", data: doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateDoctor = async (req, res) => {
  try {
    if (req.files?.certificate_file) {
      doctor.certificateUrl = req.files["certificate_file"][0].path;
    }
    if (req.files?.profile_photo) {
      doctor.profilePhotoUrl = req.files["profile_photo"][0].path;
    }

    if (doctor.specialization) {
      doctor.specialization = req.body.specialization;
    }
    
    const updatedDoctor = await doctorService.updateDoctor(req.params.id, req.body);
    if (!updatedDoctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }
    res.status(200).json({ success: true, message: "Doctor updated successfully", data: updatedDoctor });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    const success = await doctorService.deleteDoctor(req.params.id);
    if (!success) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }
    res.status(200).json({ success: true, message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
