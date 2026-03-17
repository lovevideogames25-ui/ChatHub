import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OpenRouter } from "@openrouter/sdk";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API
});

app.post("/api/gptoss", async (req, res) => {
  const { prompt } = req.body;

  try {
    console.log("Making API call with prompt:", prompt);
    console.log("API Key exists:", !!process.env.OPENROUTER_API);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    const data = await response.json();
    console.log("API Response:", data);

    if (data.error) {
      throw new Error(data.error.message);
    }

    res.json({ response: data.choices[0].message.content });

  } catch (err) {
    console.error("Full error:", err);
    res.status(500).json({ error: "GPT-OSS failed", details: err.message });
  }
});

app.post("/api/gemma3", async (req, res) => {
  const { prompt } = req.body;

  try {
    console.log("Making Gemma-3 API call with prompt:", prompt);
    console.log("API Key exists:", !!process.env.OPENROUTER_API);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "google/gemma-3-27b-it:free",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    const data = await response.json();
    console.log("Gemma-3 API Response:", data);

    if (data.error) {
      throw new Error(data.error.message);
    }

    res.json({ response: data.choices[0].message.content });

  } catch (err) {
    console.error("Gemma-3 Full error:", err);
    res.status(500).json({ error: "Gemma-3 failed", details: err.message });
  }
});

app.post("/api/qwen3", async (req, res) => {
  const { prompt } = req.body;

  try {
    console.log("Making Qwen3 API call with prompt:", prompt);
    console.log("API Key exists:", !!process.env.OPENROUTER_API);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "qwen/qwen-2.5-7b-instruct:free",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    const data = await response.json();
    console.log("Qwen3 API Response:", data);

    if (data.error) {
      throw new Error(data.error.message);
    }

    res.json({ response: data.choices[0].message.content });

  } catch (err) {
    console.error("Qwen3 Full error:", err);
    res.status(500).json({ error: "Qwen3 failed", details: err.message });
  }
});

app.post("/api/llama33", async (req, res) => {
  const { prompt } = req.body;

  try {
    console.log("Making LLaMA 3.2 API call with prompt:", prompt);
    console.log("API Key exists:", !!process.env.OPENROUTER_API);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.2-3b-instruct:free",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    const data = await response.json();
    console.log("LLaMA 3.2 API Response:", data);

    if (data.error) {
      throw new Error(data.error.message);
    }

    res.json({ response: data.choices[0].message.content });

  } catch (err) {
    console.error("LLaMA 3.2 Full error:", err);
    res.status(500).json({ error: "LLaMA failed", details: err.message });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
