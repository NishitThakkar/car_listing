const express = require("express")
const app = express();
const cors = require("cors")
const dotenv = require("dotenv").config()
const bodyParser = require("body-parser")
const passport = require("passport")
const expressSession = require("express-session")
const cookieParser = require("cookie-parser")
const PORT = process.env.PORT || 7000
const User = require("./model/user")

const connectDB = require("./db")
connectDB()

app.use(cors())
app.use(bodyParser.json())
app.use("/car", require("./routes/car"))
app.use("/user", require("./routes/user"))
app.use(expressSession({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use("/uploads", express.static('uploads'));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    await User.findById(id, function (err, user) {
        done(err, user);
    });
});



app.listen(PORT, () => {
    console.log(`Server connected at port: ${process.env.PORT}`);
})

