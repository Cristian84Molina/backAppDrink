require('dotenv').config();
const express = require("express");
const router = express();
const routes = require('./src/routes/indexRoutes');
const morgan = require("morgan");
const {conn} = require('./src/dbConex');
const port = process.env.PORT_SERVER
const cookieParser = require("cookie-parser");
const cors = require('cors'); 
const bodyParser = require("body-parser");

router.use(cors()) 
router.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
router.use(bodyParser.json({ limit: "50mb" }));

//midleweares
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(morgan("dev"));
router.use(cookieParser());
router.use(routes);



conn.sync({ alter: true })
  .then(() => {
    console.log("Database synchronized successfully");
    router.listen(port, () => {
      console.log(`Server Running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

