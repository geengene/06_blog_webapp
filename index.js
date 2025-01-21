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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
