const twilio = require("twilio");

const accountSid = "AC547a7c67ad75d1e904bbde429edf8a11";
const authToken = "9f6fcbcb8eff3efb7f71ff24fe0683b3";

module.exports = new twilio.Twilio(accountSid, authToken);
