import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN
});

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt, image_url } = req.body;

  try {
    console.log("GEMMA-3 request:", prompt);

    const messages = [
      {
        role: "user",
        content: [
          { type: "text", text: prompt },
          ...(image_url ? [{ type: "image_url", image_url: { url: image_url } }] : [])
        ]
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

    console.error("HuggingFace GEMMA-3 failed", err);
    res.status(500).json({ response: `GEMMA-3 error: ${err.message}` });

  }

}
