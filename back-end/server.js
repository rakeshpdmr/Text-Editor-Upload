const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dbConfig = require("./config/config.js");
const UserRoute = require("./routes/user.js");
const cors = require("cors");


// creates new express application
const app = express();


app.use(
  cors({
    origin: '*'
  })
);



// making server port 3000 to listen
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Parses the text as json
app.use(bodyParser.json());

// connecting route to the app
app.use("/user", UserRoute);

mongoose.Promise = global.Promise;

// moongoose connection with specified url
//In summary, the code attempts to connect to a MongoDB database using Mongoose, and based on the result, it logs appropriate messages to the console.
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database Connected Successfully!!");
  })
  .catch((err) => {
    console.log("Could not connect to the database", err);
    process.exit();
  });

// app.get('/'): This line specifies that the defined route will handle GET requests to the root URL ("/"). The app object is an instance of Express that represents your application.
// (req, res) => { ... }: This is an arrow function that serves as the callback function for the defined route. It takes two parameters: req (short for request) represents the HTTP request made by the client, and res (short for response) represents the server's response to the client.
app.get("/", (req, res) => {
  res.json({ message: "Hello Crud Node Express" });
});
