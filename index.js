import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];

app.get("/", (req, res) => {
  res.render("index.ejs", { posts });
});

app.post("/", (req, res) => {
  res.render("submit.ejs");
});

app.get("/submit", (req, res) => {
  res.render("submit.ejs");
});

app.post("/submit", (req, res) => {
  const { Title, Subheader, paragraph } = req.body;
  posts.push({ title: Title, subheader: Subheader, paragraph });
  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  console.log(req.params);
  const postId = req.params.id;
  const post = posts[postId];
  res.render("edit.ejs", { post, postId });
});

app.post("/edit/:id", (req, res) => {
  const postId = req.params.id;
  const { title, subheader, paragraph } = req.body;
  posts[postId] = { title, subheader, paragraph };
  res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  console.log(req.params);
  const postId = req.params.id;
  posts.splice(postId, 1);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
