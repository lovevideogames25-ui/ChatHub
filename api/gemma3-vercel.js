export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  try {
    console.log("GEMMA-3 Vercel Function:", prompt);

    if (!process.env.HF_TOKEN) {
      console.error("HF_TOKEN not configured in Vercel environment");
      return res.status(500).json({ response: "HF_TOKEN not configured" });
    }

    const OpenAI = require("openai");
    
    const client = new OpenAI({
      baseURL: "https://router.huggingface.co/v1",
      apiKey: process.env.HF_TOKEN
    });

    const messages = [
      {
        role: "user",
        content: [{ type: "text", text: prompt }]
      }
    ];

    // Try different model names
    let completion;
    try {
      completion = await client.chat.completions.create({
        model: "google/gemma-3-27b-it",
        messages
      });
    } catch (err1) {
      console.log("First model failed, trying alternative...");
      try {
        completion = await client.chat.completions.create({
          model: "google/gemma-3-27b-it:featherless-ai",
          messages
        });
      } catch (err2) {
        console.log("Second model failed, trying basic gemma...");
        completion = await client.chat.completions.create({
          model: "google/gemma-3-27b-it:free",
          messages
        });
      }
    }

    const response = completion.choices?.[0]?.message || "No response";

    res.status(200).json({ response });

  } catch (err) {
    console.error("GEMMA-3 Vercel Function Error:", err);
    res.status(500).json({ response: `GEMMA-3 error: ${err.message}` });
  }
}
