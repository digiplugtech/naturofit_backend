const requestIp = require('request-ip');
const useragent = require('useragent');

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
  console.log(`[Tracking] IP: ${clientIp} | OS: ${agent.os} | Browser: ${agent.toAgent()}`);

  next();
};

module.exports = trackUserActivity;
