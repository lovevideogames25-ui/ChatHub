import { OpenRouter } from "@openrouter/sdk";

const openrouter = new OpenRouter({
  apiKey: process.env.VITE_OPENROUTER_API || process.env.OPENROUTER_API
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
    console.log("Trinity API call with prompt:", prompt);
    const apiKey = process.env.VITE_OPENROUTER_API || process.env.OPENROUTER_API;
    console.log("API Key exists:", !!apiKey);
    console.log("API Key length:", apiKey?.length || 0);

    // Try different Trinity model names
    const modelNames = [
      "arcee-ai/trinity-large-preview:free",
      "arcee-ai/trinity-large-preview",
      "arcee/trinity-large-preview:free",
      "arcee/trinity-large-preview"
    ];

    let response = null;
    let workingModel = null;

    for (const modelName of modelNames) {
      console.log(`Trying model: ${modelName}`);
      
      try {
        const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://chathubai.vercel.app",
            "X-Title": "ChatHub"
          },
          body: JSON.stringify({
            model: modelName,
            messages: [{ role: "user", content: prompt }],
            max_tokens: 1000,
            temperature: 0.7
          })
        });

        const data = await r.json();
        console.log(`Response for ${modelName}:`, data);
        console.log(`Status for ${modelName}:`, r.status);

        if (data.choices && data.choices[0] && data.choices[0].message) {
          response = data.choices[0].message.content;
          workingModel = modelName;
          console.log(`Success with model: ${modelName}`);
          break;
        } else if (data.error) {
          console.log(`Error with ${modelName}:`, data.error);
          continue;
        }
      } catch (err) {
        console.log(`Failed to call ${modelName}:`, err);
        continue;
      }
    }

    if (response) {
      console.log(`Final Trinity response from ${workingModel}:`, response);
      res.status(200).json({ response });
    } else {
      console.log("All Trinity models failed");
      res.status(500).json({ response: "TRINITY-LARGE-PREVIEW not available - all model variants failed" });
    }

  } catch (err) {
    console.error("Trinity API completely failed", err);
    res.status(500).json({ response: "TRINITY-LARGE-PREVIEW not available" });
  }
}
