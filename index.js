const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

function generateHtml(searchQuery, path) {
  const url = "https://www.google.com/search?q=";
  const query = searchQuery.split(1);
  const refinedQuery =
    path === "search"
      ? `${url}${query}&num=20`
      : path === "videos"
      ? `${url}${query} youtube ${path}`
      : `${url}${query} latest ${path}&num=20`;
  return refinedQuery;
}

// async function getData(query) {
//   try {
//     await axios.get(query).then((response) => {
//       const html = response.data;
//       const $ = cheerio.load(html);
//       return $;
//     });
//   } catch {
//     return null;
//   }
// }

app.post("/search", async (req, res) => {
  const searchTerm = req.body.searchTerm;
  const path = req.body.path;
  const refinedUrl = generateHtml(searchTerm, path);
  try {
    await axios.get(refinedUrl).then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const data = [];
      const elementSelector = "#main > div> div > div ";
      $(elementSelector, html).each((element, index) => {
        let a = $(index, html).find("a").attr("href");
        let b = $(index, html).find("h3").text();
        if (!a || !b) return;
        let details = {
          title: b,
          link: a,
        };
        try {
          if (Object.keys(data).length > 50) return;
          data.push(details);
        } catch (error) {
          return;
        }
      });
      // console.log(data);
      res.json(data);
    });
  } catch (error) {
    console.error(error);
  }
});

app.post("/news", async (req, res) => {
  const searchTerm = req.body.searchTerm;
  const path = req.body.path;
  const refinedUrl = generateHtml(searchTerm, path);
  try {
    await axios.get(refinedUrl).then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const newsData = [];
      const newsSelector = "#main > div > div > div";
      $(newsSelector, html).each((element, index) => {
        const text = $(index, html).find("a").attr("href");
        const header = $(index, html).find("h3").text();
        if (text && header) {
          try {
            if (Object.keys(newsData).length > 40) return;
            newsData.push({
              description: header,
              url: text,
            });
          } catch (error) {
            return;
          }
        }
      });
      res.json(newsData);
    });
  } catch (error) {
    console.error(error);
  }
});

app.post("/videos", async (req, res) => {
  const searchTerm = req.body.searchTerm;
  const path = req.body.path;
  const refinedUrl = generateHtml(searchTerm, path);
  try {
    await axios.get(refinedUrl).then((response) => {
      const html = response.data;
      const videoData = [];
      const $ = cheerio.load(html);
      const videoSelector = "#main > div > div > div";
      $(videoSelector, html).each((element, index) => {
        if (element > 200) return;
        else {
          const result = $(index, html).find("a").attr("href");
          try {
            if (Object.keys(videoData).length > 20) return;
            if (result) videoData.push({ url: result });
          } catch (err) {
            return;
          }
        }
      });
      // console.log(videoData);
      res.json(videoData);
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/news", async (req, res) => {
  console.log("hi");
});

app.listen(process.env.PORT || 5000, () => console.log("Server running"));
