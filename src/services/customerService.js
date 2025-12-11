const { sequelize } = require("../config/db");
const { Customer, trackUserActivity }= require("../models/Customer");



exports.createCustomer = async (payload) => {
    return await Customer.create(payload);
};

exports.getAllCustomers = async () => {
    return await Customer.findAll();
};

exports.getCustomerById = async (id) => {
    return await Customer.findByPk(id);
};

exports.updateCustomer = async (id, payload) => {
    const customer = await Customer.findByPk(id);
    if (!customer) return null;

    await customer.update(payload);
    return customer;
};

exports.deleteCustomer = async (id) => {
    const customer = await Customer.findByPk(id);
    if (!customer) return null;
  
    await customer.destroy();
    return true;
};