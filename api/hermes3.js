import { OpenRouter } from "@openrouter/sdk";

const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API
});

export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  try {
    // SDK call
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

    res.status(200).json({ response });

  } catch (err) {

    console.warn("SDK failed, falling back to direct API", err);

    // Fallback to direct API
    try {
      const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "nousresearch/hermes-3-llama-3.1-405b:free",
          messages: [{ role: "user", content: prompt }]
        })
      });
      const data = await r.json();
      const response = data.choices?.[0]?.message?.content || "No response";
      res.status(200).json({ response });

    } catch (err2) {
      console.error("Direct API also failed", err2);
      res.status(500).json({ response: "Hermes-3 not available" });
    }

  }
}
