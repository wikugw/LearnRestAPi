const express   = require("express");
const mongoose  = require("mongoose");
const app       = express();
require("dotenv").config();

const PORT = process.env.port || 3000

// connect to mongodb atlas
mongoose.connect(
    process.env.MONGO_URL,
    {useNewUrlParser:true}
).then(() => {
    console.log("connected to mongoo database");
}).catch(error => {
    console.log("Error on database ", error)
});

// start server
app.listen(PORT,() => {
    console.log("Server started at PORT ", PORT);
});