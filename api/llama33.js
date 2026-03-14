export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      res.status(400).json({ error: 'Prompt is required' });
      return;
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API}`,
        "Content-Type": "application/json",
        "HTTP-Referer": `https://${process.env.VERCEL_URL || 'chat-hub-ai.vercel.app'}`,
        "X-Title": "ChatHub"
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.2-3b-instruct:free",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();

    if (data.error) {
      console.error("LLaMA 3.2 Error:", data.error);
      res.status(500).json({ error: "LLaMA 3.2 failed", details: data.error.message });
      return;
    }

    res.json({ response: data.choices[0].message.content });

  } catch (error) {
    console.error("LLaMA 3.2 Full error:", error);
    res.status(500).json({ error: "LLaMA 3.2 failed", details: error.message });
  }
}
