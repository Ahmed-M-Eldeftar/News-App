const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const partialPath = path.join(__dirname, "../templetes/partials");
const request = require("request");
const port = process.env.port || 3000;
const url =
  "https://newsapi.org/v2/everything?q=tesla&from=2022-08-12&sortBy=publishedAt&apiKey=2f303a27f415474b90582ccb7ea1e9a1";

const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templetes/views"));
hbs.registerPartials(partialPath);
let news;
app.get("/", (req, res) => {
  request({ url, json: true }, (error, response) => {
    if (error) {
      console.log("Error has occured");
    } else {
      news = response.body.articles;
      res.render("index", {
        isShow: false,
        news,
      });
    }
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
  });
});
app.get("/news", (req, res) => {
  res.send(news);
});
app.listen(port, () => {
  console.log("App listening on port " + port);
});
