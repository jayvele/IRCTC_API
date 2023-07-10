require("dotenv").config()

const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router")
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: true }) 

app.use(jsonParser);
app.use("/api/users", jsonParser, userRouter) 



app.listen(process.env.APP_PORT, () => {
    console.log("Server running", process.env.APP_PORT);
});