// server.js
import express from "express";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // serve HTML files from "public"

// Contact form endpoint
app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Configure email transporter (Gmail example)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "yourgmail@gmail.com",       // your Gmail
        pass: "your-app-password"          // 🔑 generated app password
      }
    });

    // Mail content
    const mailOptions = {
      from: email,
      to: "yourgmail@gmail.com",           // where you want to receive the emails
      subject: "New Contact Message",
      text: `From: ${name} <${email}>\n\n${message}`
    };

    // Send mail
    await transporter.sendMail(mailOptions);
    res.send("✅ Message sent successfully!");
  } catch (error) {
    console.error(error);
    res.send("❌ Error sending message.");
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
