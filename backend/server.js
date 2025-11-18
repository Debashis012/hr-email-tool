const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
  const { name, email, position, status } = req.body;

  let message = "";

  if (status === "selected") {
    message = `Dear ${name},

We are pleased to inform you that you have been selected for the ${position} role.

Please reply to confirm your acceptance.

Best regards,
HR Team`;
  } else {
    message = `Dear ${name},

Thank you for applying for the ${position} position.

We regret to inform you that we are moving forward with other candidates.

Best regards,
HR Team`;
  }

  // Email SMTP Config
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "debasiskr1234@gmail.com",
      pass: "doea bqxw xvbe zevd"
    }
  });

  try {
    await transporter.sendMail({
      from: `"HR Team 👥" <YOUR_EMAIL@gmail.com>`,
      to: email,
      subject: "Regarding Your Job Application",
      text: message
    });

    res.json({ message: "Email sent successfully!" });
  } catch (err) {
    res.json({ message: "Failed to send email", error: err.message });
  }
});

app.listen(5000, () => console.log("Backend Server Running at http://localhost:5000"));
