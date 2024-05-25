const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

// Connnect to Database
const dbURI =
  "mongodb+srv://node-user:node123@cluster0.6kgr38e.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(3000, () => {
      console.log("Server listening on port 3000");
    });
  })
  .catch((err) => console.error(err));

// Register view engine
app.set("view engine", "ejs");

// middleware and static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// mongoose and mongo sandbox routes
/*app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "Fake Title 1",
    snippet: "Fake Snippet 1",
    body: "Fake Body 1",
  });
  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});*/

// Home page
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

// Blog Routes
app.use("/blogs", blogRoutes);

// About Page
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// 404 Page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

// Listen for requests on the server goto line 13-14


