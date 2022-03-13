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
    res.render("index")
});
app.get("/Trips/goa.html", (req, res) => {
    res.sendFile('goa.html', { root: static_path })
});

app.get("/register.html", (req, res) => {
    res.render("register");
});
app.get("/signup.html", (req, res) => {
    res.render("signup");
    // alert("you are sucessfully signup,now login")
});

//create a new user in our database
app.post("/", urlencodedParser, [
    check('email', "Email is invalid")
        .normalizeEmail(),
    check('password', "Password should be greater than 8 character")
        .isLength({ min: 8 })
        .isAlphanumeric(),
    check('phone', "phone number is not valid")
        .isMobilePhone()
], async (req, res) => {
    try {
        // const errors = validationResult(req)
        // if (!errors.isEmpty()) {
        //     const alert = errors.array();
        //     res.render("register", {
        //         alert
        //     })
        // }
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        if (password === cpassword) {
            const registerUser = new Register({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone,
                //confirmpassword: req.body.confirmpassword,
            })
            const registered = await registerUser.save();

            res.status(201).render("index");
        } else {
            res.send("password is not matching");
        }
    } catch (error) {
        res.status(400).send(error);
    }
})
//login check
app.get("/login.html", (req, res) => {
    res.render("login");
})
app.get("/contact.html", (req, res) => {
    res.render("contact");
})
app.get("/Trips/Trips.html", (req, res) => {
    res.render("Trips");
})
app.post("/contact", async (req, res) => {
    try {
        const feedback = new Contact({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message,
        })
        const feed = await feedback.save();
        // alert("your feedback is submitted")
        res.status(201).render("index");
    } catch (error) {
        res.status(400).send(error);
    }
})

app.post("/user", async (req, res) => {
    try {
        const password = req.body.password;
        const email = req.body.email;
        const user = await Userdata.findOne({ email })
        const isMatching = await bcrypt.compare(password, user.password);
        if (isMatching) {
            res.status(201).render("index");
        } else {
            res.send("invalid login details");
        }
    } catch (error) {
        res.status(400).send(error);
    }
})
app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})