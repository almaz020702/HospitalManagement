require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const router = require("./routes/index");
const app = express();
const PORT = process.env.PORT;
const models = require("./models/models");
const cors = require("cors");
const errorMiddleware = require("./middleware/errorMiddleware");
const fileUpload = require("express-fileupload");
const path = require("path");

app.use(express.json());
app.use(fileUpload({}));
app.use(express.static(path.resolve(__dirname, "static")));
app.use(cors());
app.use("/api", router);
app.use(errorMiddleware);
const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        app.listen(PORT, () => console.log("Server started on port " + PORT));
    } catch (error) {
        console.log(error);
    }
};

start();
