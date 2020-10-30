const admin = require("firebase-admin"); // gives access to the service account
const twilio = require("./twilio");

module.exports = function (req, res) {
  if (!req.body.phone) {
    return res.status(422).send({ error: "You must provide a phone number" });
  }

  const phone = String(req.body.phone).replace(/[^\d]/g, "");

  // const phone = req.body.phone.replace(/[^\d]/g, '').toString();

  admin
    .auth()
    .getUser(phone)
    .then(() => {
      const code = Math.floor(Math.random() * 8999 + 1000);

      twilio.messages.create(
        {
          body: "Your code is " + code,
          to: phone,
          //  you can't use phone numbers from your real account
          // as the 'From' number in requests made with your test credentials.

          // So we use the number below which we got from Twilio

          from: "+13158401053",
        },
        (err) => {
          if (err) {
            return res.status(422).send(err);
          }
          //if error then doesn't get further
          admin
            .database()
            .ref("users/" + phone)
            .update({ code: code, codeValid: true }, () => {
              res.send({ success: true });
            });
        }
      );
      // So
      return null;
    })

    .catch((err) => res.status(422).send({ error: err }));
};
