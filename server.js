const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

// ---------- CONFIG START ----------
const API_KEY = "YOUR_API_KEY"; 
const ENDPOINT = "https://au-syd.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29";
const MAX_TOKENS = 500;
const MIN_TOKENS = 50;
const MODEL_ID = "ibm/granite-13b-instruct-v2";
// ---------- CONFIG END ------------

app.post("/summarize", async (req, res) => {
  const { text } = req.body;
  if (!text || text.trim().length < 10) {
    return res.status(400).json({ error: "Please provide longer text." });
  }

  try {
    const response = await axios.post(
      ENDPOINT,
      {
        model_id: MODEL_ID,
        input: text,
        parameters: {
          max_new_tokens: MAX_TOKENS,
          min_new_tokens: MIN_TOKENS,
          temperature: 0.3,
          decoding_method: "greedy"
        }
      },
      {
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const generated = response.data?.results?.[0]?.generated_text;
    if(!generated) throw new Error("No summary returned");
    res.json({ summary: generated.trim() });
  } catch (err) {
    console.error("Summarization error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to summarize." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend listening on http://localhost:${PORT}`);
});
