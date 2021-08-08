import express from "express";
import dotenv from "dotenv";

import bodyParser from "body-parser";
import cors from "cors";

import apiRoutes from "./src/routes/api";
import adminRoutes from "./src/routes/admin";
import apiMiddleware from "./src/middleware/apiAuth";
import adminMiddleware from "./src/middleware/adminAuth";
import errorHandler from "./src/middleware/errorHandler";
const path = require("path");
dotenv.config();
require("./src/config/sequelize");

global.__basedir = __dirname + "/";
global.__locationdir = __dirname;

const app = express();
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.use(cors());
app.use(bodyParser.json());
// app.use("/api", apiMiddleware, apiRoutes);
app.use("/api", apiRoutes);
app.use("/api/admin", apiMiddleware, adminMiddleware, adminRoutes);
app.use(errorHandler);
app.use("/images/", express.static(path.join(__dirname, "src/public/images")));

module.exports = app;
