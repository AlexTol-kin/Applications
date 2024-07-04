const express = require("express");
const chalk = require("chalk");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { addApplication, getApplication } = require("./notes.controller");
const { loginUser } = require("./user.controller");

const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.json());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/login", async (req, res) => {
  res.render("login", {
    title: "Express App",
    error: undefined,
  });
});

app.post("/login", async (req, res) => {
  try {
    const user = await loginUser(req.body.email, req.body.password);
    if (user) {
      res.redirect("/");
    }
  } catch (e) {
    res.render("login", {
      title: "Express App",
      error: e.message,
    });
  }
});

app.get("/application", async (req, res) => {
  res.render("application", {
    title: "Express App",
    created: false,
    error: undefined,
  });
});

app.post("/application", async (req, res) => {
  try {
    await addApplication(req.body.patient, req.body.phone, req.body.title);
    res.render("application", {
      title: "Заявки с формы",
      created: true,
      error: false,
    });
  } catch (error) {
    console.log(error.message);
    res.render("application", {
      title: "Заявки с формы",
      error: error.message,
    });
  }
});

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Заявки с формы",
    notes: await getApplication(),
    created: false,
    error: false,
  });
});

app.post("/", async (req, res) => {
  try {
    await addNote(req.body.title, req.user.email);
    res.render("index", {
      title: "Заявки с формы",
      notes: await getApplication(),
      userEmail: req.user.email,
      created: true,
      error: false,
    });
  } catch (e) {
    console.error("Creating error", e);
    res.render("index", {
      title: "Заявки с формы",
      notes: await getApplication(),
      userEmail: req.user.email,
      created: false,
      error: true,
    });
  }
});

mongoose
  .connect(
    "mongodb+srv://cashaqwertty:LqMsGbTNRcs80mtR@cluster0.tqfhvza.mongodb.net/applications?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(chalk.green(`Server has been started on port ${port}...`));
    });
  });
