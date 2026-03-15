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
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://chathub.vercel.app",
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
    
    if (data.error) {
      console.error(data.error);
      throw new Error(data.error);
    }

    const responseText = data.choices?.[0]?.message?.content || "No response";
    res.status(200).json({ response: responseText });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      response: "Nemotron not available"
    });
  }
}
