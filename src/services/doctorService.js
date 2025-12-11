const Doctor = require('../models/Doctor');

exports.createDoctor = async (data) => {
  return await Doctor.create(data);
};

exports.getAllDoctors = async () => {
  return await Doctor.findAll();
};

exports.getDoctorById = async (id) => {
  return await Doctor.findByPk(id);
};

exports.updateDoctor = async (id, data) => {
  const doctor = await Doctor.findByPk(id);
  if (!doctor) return null;
  return await doctor.update(data);
};

exports.deleteDoctor = async (id) => {
  const doctor = await Doctor.findByPk(id);
  if (!doctor) return null;
  await doctor.destroy();
  return true;
};
