require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const router = require("./routes/index");
const app = express();
const http = require("http").Server(app);
const PORT = process.env.PORT;
const models = require("./models/models");
const cors = require("cors");
const errorMiddleware = require("./middleware/errorMiddleware");
const fileUpload = require("express-fileupload");
const path = require("path");
const messageService = require("./service/messageService");
const ApiError = require("./exceptions/apiError");
const jwt = require("jsonwebtoken");
const io = require("socket.io")(http);

app.use(express.json());
app.use(fileUpload({}));
app.use(express.static(path.resolve(__dirname, "static")));
app.use(cors());
app.use("/api", router);
app.use(errorMiddleware);



io.on("connection", function (socket) {
    socket.join(`${socket.user.id}`)
    console.log("A user connected ",socket.user);
    socket.on("chat_message", (data) => {
        
        console.log(socket.id);
        messageService.create(data);
        socket.to()
    });
    
    //Whenever someone disconnects this piece of code executed
    socket.on("disconnect", function () {
        console.log("A user disconnected");
    });
});

io.use((socket, next) => {
    try {
        
    } catch (error) {
        
    }
    console.log("kek");
    const authorizationHeader = socket.handshake.headers.authorization;
    if (!authorizationHeader) {
        next(ApiError.BadRequest("No header"));
    }
    const token = authorizationHeader.split(" ")[1];
    if (!token) {
        return next(ApiError.BadRequest("No token"));
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    socket.user = decoded;
    next();
});

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        http.listen(PORT, () => console.log("Server started on port " + PORT));
    } catch (error) {
        console.log(error);
    }
};

start();
