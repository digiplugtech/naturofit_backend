const CustomerService = require("../services/customerService");

exports.createCustomer = async (req, res) => {  
    try {
        const customer = await CustomerService.createCustomer(req.body);
        res.status(201).json({ success: true, message: "Customer created successfully", data: customer });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await CustomerService.getAllCustomers();
        res.status(200).json({ success: true, message: "Customers fetched successfully", count: customers.length, data: customers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getCustomerById = async (req, res) => {
    try {
        const customer = await CustomerService.getCustomerById(req.params.id);
        if (!customer) return res.status(404).json({ success: false, message: "Customer not found" });
        res.status(200).json({ success: true, message: "Customer found successfully", data: customer });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateCustomer = async (req, res) => {
    try {
        const updated = await CustomerService.updateCustomer(req.params.id, req.body);
        if (!updated) return res.status(404).json({ success: false, message: "Customer not found" });
        res.status(200).json({ success: true, message: "Customer updated successfully", data: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });       

    }

};

exports.deleteCustomer = async (req, res) => {
    try {
        const deleted = await CustomerService.deleteCustomer(req.params.id);
        if (!deleted) return res.status(404).json({ success: false, message: "Customer not found" });
        res.status(200).json({ success: true, message: "Customer deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};  
