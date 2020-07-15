const express = require("express"),
  bodyParser = require("body-parser"),
  connectDB = require("../config/db"),
  passport = require("passport"),
  cors = require("cors"),
  parseurl = require("parseurl");

let app = express(),
  session = require("express-session"),
  userRoutes = require("../routes/users.routes"),
  courseRoutes = require("../routes/courses.routes"),
  roleRoutes = require("../routes/roles.routes"),
  multerRoutes = require("../routes/multer.routes"),
  db = connectDB(),
  sess = {
    //SESSION CONFIG
    secret: process.env.KEY_SESSION,
    resave: false,
    saveUninitialized: true,
    name: "sessionID",
    cookie: {
      httpOnly: false,
      maxAge: parseInt(process.env.TIME),
    },
  },
  corsOptions = {
    origin: "http://localhost:4200",
    optionsSuccessStatus: 200,
  };

app.use(
  bodyParser.urlencoded({
    extended: false, //CONSULTAR QUE ES EXTENDED TRUE
  })
);
app.use(bodyParser.json());

//Cors configuration
app.use(cors(corsOptions));

//Session
app.use(session(sess));

//Passport
app.use(passport.initialize());
app.use(passport.session());

//Session examples to verificate
app.use((req, res, next) => {
  if (!req.session.views) {
    req.session.views = {};
  }
  let pathname = parseurl(req).pathname;
  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1;
  next();
});

app.get("/", (req, res) => {
  res.send(
    `Your session: ${req.sessionID}, number of visits: ${req.session.views["/"]} times`
  );
});

//Routes
app.use("/api", userRoutes);
app.use("/api", courseRoutes);
app.use("/api", roleRoutes);
app.use("/api", multerRoutes);

module.exports = app;
