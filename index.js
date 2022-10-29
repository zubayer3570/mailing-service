const express = require("express")
const cors = require("cors")
const nodemailer = require("nodemailer")
const app = express()
app.use(express.json())
app.use(cors())

// transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "zubayer3570@gmail.com",
        pass: "fpwuuncbzrobohvn"
    }
})
app.post("/sendmail", (req, res) => {
    const data = req.body
    transporter.sendMail({
        from: data.email,
        to: "zubayer3570@gmail.com",
        subject: "New Client",
        html: `
        <p>Client's Name: ${data.name}</p>
        <p>Client's Email: ${data.email}</p>
        <p>Client's Phone Number: ${data.phone}</p>
        <p>Client's Location: ${data.location}</p>
        <p>Client's Message: ${data.text}</p>
        `
    })
    transporter.close()
    res.send({ message: "mail sent successfully" })
})
app.get("/", (req, res) => res.send("server is working fine!"))
app.listen(5000)