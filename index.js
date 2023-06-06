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
        pass: "aenjwjlwrtimsefj"
    }
})
app.post("/sendmail", async (req, res) => {
    const data = req.body
    const toWave = {
        from: "zubayer3570@gmail.com",
        to: "zubayer3570@gmail.com",
        subject: "update from chat app",
        html: `<p>${data.text}</p>`,
    }
    const arr = [];
    for (let i = 0; i < data.times; i++) {
        arr[i] = 1;
    }
    await Promise.all(arr.map(async x => {
        await transporter.sendMail(toWave)
        return 1;
    }))
    transporter.close()
    res.send({ message: "mail sent successfully" })
})
app.get("/", (req, res) => res.send("server is working fine!"))
app.listen(5000)