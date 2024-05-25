// Naming Conventions similar to MDN
// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

const Blog = require("../models/blog");

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => console.log(err));
};

const blog_details = (req, res) => {
  const id = req.params.id;
  console.log("ID:", id);
  Blog.findById(id)
    .then((result) => {
      if (!result) {
        // Handle case where no blog is found for the provided ID
        // Redirect or respond as needed
        res.redirect("/blogs");
      } else {
        res.render("details", { title: "Blog Details", blog: result });
      }
    })
    .catch((err) => {
      res.status(404).render("404", { title: "Blog not found" });
    });
};

const blog_create_get = (req, res) => {
  res.render("create", { title: "Create a New Blog" });
};

const blog_create_post = (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    snippet: req.body.snippet,
    body: req.body.body,
  });
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => console.log(err));
};

const blog_delete = (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => console.log(err));
};

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete
};
