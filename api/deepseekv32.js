import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.VITE_HF_TOKEN || process.env.HF_TOKEN
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
    console.log("DEEPSEEK-V3.2 API call with prompt:", prompt);
    console.log("HF_TOKEN exists:", !!process.env.HF_TOKEN);
    console.log("HF_TOKEN length:", process.env.HF_TOKEN?.length || 0);

    const completion = await client.chat.completions.create({
      model: "deepseek-ai/DeepSeek-V3.2:novita",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    });

    const response = completion.choices?.[0]?.message?.content || "No response";
    console.log("DEEPSEEK-V3.2 SDK response:", response);

    res.status(200).json({ response });

  } catch (err) {

    console.warn("SDK failed, trying direct API", err);

    try {

      const r = await fetch(
        "https://router.huggingface.co/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.VITE_HF_TOKEN || process.env.HF_TOKEN}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "deepseek-ai/DeepSeek-V3.2:novita",
            messages: [
              { role: "user", content: prompt }
            ]
          })
        }
      );

      const data = await r.json();
      console.log("DEEPSEEK-V3.2 direct API response:", data);

      const response = data?.choices?.[0]?.message?.content || "No response";

      res.status(200).json({ response });

    } catch (err2) {

      console.error("Direct API also failed", err2);

      res.status(500).json({
        response: "DEEPSEEK-V3.2 not available"
      });

    }

  }
}
