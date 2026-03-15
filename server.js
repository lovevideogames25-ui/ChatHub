import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OpenRouter } from "@openrouter/sdk";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API
});

const hfClient = new OpenAI({
  apiKey: process.env.HF_TOKEN,
  baseURL: "https://router.huggingface.co/v1",
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
  const { prompt, image } = req.body;

  try {
    console.log("Making Gemma-3 HF API call with prompt:", prompt);
    console.log("HF Token exists:", !!process.env.HF_TOKEN);

    const completion = await hfClient.chat.completions.create({
      model: "google/gemma-3-27b-it:featherless-ai",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt
            },
            image
              ? {
                  type: "image_url",
                  image_url: { url: image }
                }
              : null
          ].filter(Boolean)
        }
      ]
    });

    const response =
      completion.choices?.[0]?.message?.content || "No response";

    console.log("Gemma-3 HF API Response:", response);
    res.status(200).json({ response });

  } catch (err) {
    console.error("Gemma-3 HF Full error:", err);
    res.status(500).json({
      response: "Gemma-3 not available"
    });
  }
});

app.post("/api/llama32", async (req, res) => {
  const { prompt } = req.body;

  try {
    console.log("Making Llama-3.2 HF API call with prompt:", prompt);
    console.log("HF Token exists:", !!process.env.HF_TOKEN);

    const response = await fetch("https://router.huggingface.co/v1/models/HuggingFaceH4/zephyr-7b-beta/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 500,
        temperature: 0.7
      })
    });

    const data = await response.json();
    console.log("Llama-3.2 HF API Response:", data);

    if (data.error) {
      throw new Error(data.error);
    }

    const responseText = data.choices?.[0]?.text || "No response";
    res.status(200).json({ response: responseText });

  } catch (err) {
    console.error("Llama-3.2 HF Full error:", err);
    res.status(500).json({
      response: "Llama-3.2 not available"
    });
  }
});

app.post("/api/llama31", async (req, res) => {
  const { prompt } = req.body;

  try {
    console.log("Making Llama-3.1 HF API call with prompt:", prompt);
    console.log("HF Token exists:", !!process.env.HF_TOKEN);

    const completion = await hfClient.chat.completions.create({
      model: "meta-llama/Llama-3.1-8B-Instruct:novita",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    });

    const response =
      completion.choices?.[0]?.message?.content || "No response";

    console.log("Llama-3.1 HF API Response:", response);
    res.status(200).json({ response });

  } catch (err) {
    console.error("Llama-3.1 HF Full error:", err);
    res.status(500).json({
      response: "Llama-3.1 not available"
    });
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

app.post("/api/qwen35", async (req, res) => {
  const { prompt, image } = req.body;

  try {
    console.log("Making Qwen3.5 HF API call with prompt:", prompt);
    console.log("HF Token exists:", !!process.env.HF_TOKEN);

    const completion = await hfClient.chat.completions.create({
      model: "Qwen/Qwen3.5-9B:together",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt
            },
            image
              ? {
                  type: "image_url",
                  image_url: { url: image }
                }
              : null
          ].filter(Boolean)
        }
      ]
    });

    const response =
      completion.choices?.[0]?.message?.content || "No response";

    console.log("Qwen3.5 HF API Response:", response);
    res.status(200).json({
      warning: "⚠️ THINKING MODEL: THIS MODEL IS A THINKING MODEL SO IT MIGHT TAKE A LONG TIME",
      response
    });

  } catch (err) {
    console.error("Qwen3.5 HF Full error:", err);
    res.status(500).json({
      response: "Qwen3.5 not available"
    });
  }
});

app.post("/api/nemotron", async (req, res) => {
  const { prompt } = req.body;

  try {
    console.log("Making Nemotron OpenRouter API call with prompt:", prompt);
    console.log("OpenRouter API Key exists:", !!process.env.OPENROUTER_API);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3001",
        "X-Title": "ChatHub"
      },
      body: JSON.stringify({
        model: "nvidia/nemotron-3-super-120b-a12b:free",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    const data = await response.json();
    console.log("Nemotron OpenRouter API Response:", data);

    if (data.error) {
      throw new Error(data.error);
    }

    const responseText = data.choices?.[0]?.message?.content || "No response";
    res.status(200).json({ response: responseText });

  } catch (err) {
    console.error("Nemotron OpenRouter Full error:", err);
    res.status(500).json({
      response: "Nemotron not available"
    });
  }
});

app.post("/api/hermes3", async (req, res) => {
  const { prompt } = req.body;

  try {
    console.log("Making Hermes-3 OpenRouter API call with prompt:", prompt);
    console.log("OpenRouter API Key exists:", !!process.env.OPENROUTER_API);

    // Try SDK first
    try {
      const stream = await openrouter.chat.send({
        model: "nousresearch/hermes-3-llama-3.1-405b:free",
        messages: [
          { role: "user", content: prompt }
        ],
        stream: true
      });

      let response = "";
      for await (const chunk of stream) {
        const content = chunk.choices?.[0]?.delta?.content;
        if (content) response += content;
      }

      console.log("Hermes-3 SDK Response:", response);
      res.status(200).json({ response });

    } catch (sdkErr) {
      console.warn("SDK failed, falling back to direct API", sdkErr);

      // Fallback to direct API
      const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3001",
          "X-Title": "ChatHub"
        },
        body: JSON.stringify({
          model: "nousresearch/hermes-3-llama-3.1-405b:free",
          messages: [{ role: "user", content: prompt }]
        })
      });
      const data = await r.json();
      const response = data.choices?.[0]?.message?.content || "No response";
      
      console.log("Hermes-3 Direct API Response:", response);
      res.status(200).json({ response });
    }

  } catch (err) {
    console.error("Hermes-3 Full error:", err);
    res.status(500).json({
      response: "Hermes-3 not available"
    });
  }
});

app.post("/api/trinity", async (req, res) => {
  const { prompt } = req.body;

  try {
    console.log("Making Trinity OpenRouter API call with prompt:", prompt);
    console.log("OpenRouter API Key exists:", !!process.env.OPENROUTER_API);

    // Try SDK first
    try {
      const stream = await openrouter.chat.send({
        model: "arcee-ai/trinity-large-preview:free",
        messages: [
          { role: "user", content: prompt }
        ],
        stream: true
      });

      let response = "";
      for await (const chunk of stream) {
        const content = chunk.choices?.[0]?.delta?.content;
        if (content) response += content;
      }

      console.log("Trinity SDK Response:", response);
      res.status(200).json({ response });

    } catch (sdkErr) {
      console.warn("SDK failed, falling back to direct API", sdkErr);

      // Fallback to direct API
      const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3001",
          "X-Title": "ChatHub"
        },
        body: JSON.stringify({
          model: "arcee-ai/trinity-large-preview:free",
          messages: [{ role: "user", content: prompt }]
        })
      });

      const data = await r.json();
      const response = data.choices?.[0]?.message?.content || "No response";
      
      console.log("Trinity Direct API Response:", response);
      res.status(200).json({ response });
    }

  } catch (err) {
    console.error("Trinity Full error:", err);
    res.status(500).json({
      response: "TRINITY-LARGE-PREVIEW not available"
    });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
