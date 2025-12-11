const CustomerService = require("../services/customerService");
const requestIp = require('request-ip');
const useragent = require('useragent');
const logger = require('../config/logger'); // Import logger

const trackUserActivity = (req, res, next) => {
  // 1. Get Client IP
  const clientIp = requestIp.getClientIp(req); 

  // 2. Parse User Agent (Browser, OS, Device)
  const agent = useragent.parse(req.headers['user-agent']);
  
  // Attach data to the request object so controllers can use it
  req.tracking = {
    ip: clientIp,
    browser: agent.toAgent(),       // e.g. "Chrome 50.0.2661"
    os: agent.os.toString(),        // e.g. "Windows 10.0.0"
    device: agent.device.toString() // e.g. "iPhone" or "Other"
  };

  // Optional: Log it immediately (or save to DB here)
  logger.info(`[Tracking] IP: ${clientIp} | OS: ${agent.os} | Browser: ${agent.toAgent()}`);

  next();
};

exports.createCustomer = async (req, res) => {  
    try {
        logger.info(`Creating new customer: ${req.body.email}`); // Log info
        // Merge body data with tracking data
        const customerData = {
            ...req.body,
            ipAddress: req.tracking.ip,
            deviceInfo: `${req.tracking.os} - ${req.tracking.browser}`
        };

        const customer = await CustomerService.createCustomer(customerData);
        res.status(201).json({ success: true, message: "Customer created successfully", data: customer });
    } catch (error) {
        logger.error(`Error creating customer: ${error.message}`); // Log error
        res.status(400).json({ success: false, message: error.message });
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
