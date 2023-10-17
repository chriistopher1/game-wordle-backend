const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors()); // Enable CORS

const IGDB_API_URL = "https://api.igdb.com/v4/games";
const IGDB_API_KEY = "hki89ixvivxp5s953946t9y7k98myr";

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://game-wordle-app.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Clickedbutton, Userid, Bookid");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/fetchRandomGame", async (req, res) => {
  try {
    // Generate a random offset to select a random game
    const randomOffset = Math.floor(Math.random() * 1000); // Adjust the number based on the number of games in your dataset

    console.log(randomOffset);

    // Make a request to the IGDB API to fetch a random game
    const response = await axios({
      method: "POST",
      url: IGDB_API_URL,
      headers: {
        "Client-ID": IGDB_API_KEY,
        Authorization: "Bearer mbpzemqosg31cqh4ssygdjfm7c3cno",
        Accept: "application/json",
      },
      data: `fields name,cover.url; where cover.url!=null; limit 1; offset ${randomOffset}; where rating >85;`,
    });

    // Forward the response to the client
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching random game:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
