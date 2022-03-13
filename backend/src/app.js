const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
const alert = require("alert");
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");

require("./db/conn");
const Contact = require("./models/contacts");
const Contactus = require("./models/contacts");
const Register = require("./models/registers");
const Userdata = require("./models/registers");
// const { ENGINE_METHOD_DSA } = require("constants");
// const Contact = require("./models/contacts");
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partial_path = path.join(__dirname, "../templates/partials");
// console.log(static_path);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partial_path);

const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.get("/", (req, res) => {
    res.render("index");
});
app.get("/Trips/goa.html", (req, res) => {
    res.sendFile("goa.html", { root: static_path });
});
app.get("/Trips/delhi.html", (req, res) => {
    res.sendFile("delhi.html", { root: static_path });
});
app.get("/Trips/dwarka.html", (req, res) => {
    res.sendFile("dwarka.html", { root: static_path });
});
app.get("/Trips/jodhpur.html", (req, res) => {
    res.sendFile("jodhpur.html", { root: static_path });
});
app.get("/Trips/kutch.html", (req, res) => {
    res.sendFile("kutch.html", { root: static_path });
});
app.get("/Trips/lonavala.html", (req, res) => {
    res.sendFile("lonavala.html", { root: static_path });
});
app.get("/Trips/matheran.html", (req, res) => {
    res.sendFile("matheran.html", { root: static_path });
});
app.get("/Trips/Mountabu.html", (req, res) => {
    res.sendFile("Mountabu.html", { root: static_path });
});
app.get("/Trips/mumbai.html", (req, res) => {
    res.sendFile("mumbai.html", { root: static_path });
});
app.get("/Trips/paris.html", (req, res) => {
    res.sendFile("paris.html", { root: static_path });
});
app.get("/Trips/saputara.html", (req, res) => {
    res.sendFile("saputara.html", { root: static_path });
});
app.get("/Trips/thailand.html", (req, res) => {
    res.sendFile("thailand.html", { root: static_path });
});
app.get("/Trips/srinagar-gulmarg.html", (req, res) => {
    res.sendFile("srinagar-gulmarg.html.html", { root: static_path });
});
app.get("/Trips/mumbai.html", (req, res) => {
    res.sendFile("mumbai.html", { root: static_path });
});
app.get("/Trips/jaipur.html", (req, res) => {
    res.sendFile("jaipur.html", { root: static_path });
});
app.get("/Trips/gangtok.html", (req, res) => {
    res.sendFile("gangtok.html", { root: static_path });
});
app.get("/Trips/darjiling.html", (req, res) => {
    res.sendFile("darjiling.html", { root: static_path });
});

app.get("/register.html", (req, res) => {
    res.render("register");
});
app.get("/signup.html", (req, res) => {
    res.render("signup");
    // alert("you are sucessfully signup,now login")
});

//create a new user in our database
app.post("/", async (req, res) => {
    try {
        const Email = req.body.email;
        // console.log(Email);/
        if (!Userdata.findOne({ Email })) {
            res.send("user already exist,try with new email");
        }
        else {
            const password = req.body.password;
            const cpassword = req.body.confirmpassword;
            if (password === cpassword) {
                const registerUser = new Register({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    phone: req.body.phone,
                    //confirmpassword: req.body.confirmpassword,
                });
                const registered = await registerUser.save();
                res.status(201).render("index1");
            } else {
                res.render("signup");
            }
        }
    } catch (error) {
        res.status(400).send(error);
    }
}
);
//login check
app.get("/login.html", (req, res) => {
    res.render("login");
});
app.get("/contact.html", (req, res) => {
    res.render("contact");
});
app.get("/Trips/Trips.html", (req, res) => {
    res.render("Trips");
    // res.sendFile("Trips.html", { root: static_path });
});
app.post("/contact", async (req, res) => {
    try {
        const feedback = new Contact({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message,
        });
        const feed = await feedback.save();
        // alert("your feedback is submitted")
        res.status(201).render("index");
    } catch (error) {
        res.status(400).send(error);
    }
});

app.post("/user", async (req, res) => {
    try {
        const password = req.body.password;
        const email = req.body.email;
        const user = await Userdata.findOne({ email });
        const isMatching = await bcrypt.compare(password, user.password);
        if (isMatching) {
            res.status(201).render("index1");
        } else {
            res.send("invalid login details");
        }
    } catch (error) {
        res.status(400).send(error);
    }
});
app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
});