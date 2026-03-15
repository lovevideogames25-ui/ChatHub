import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.HF_TOKEN,
  baseURL: "https://router.huggingface.co/v1",
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

  const { prompt, image } = req.body;

  try {
    const completion = await client.chat.completions.create({
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

    res.status(200).json({
      warning: "⚠️ THINKING MODEL: THIS MODEL IS A THINKING MODEL SO IT MIGHT TAKE A LONG TIME",
      response
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      response: "Qwen3.5 not available"
    });
  }
}
