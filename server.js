const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false
});

// need routes here

app.use(require("./routes/api.js"));
app.use(require("./routes/view.js"));

    app.listen(PORT, () => {
        console.log(`App running on port ${PORT}!`);
    });