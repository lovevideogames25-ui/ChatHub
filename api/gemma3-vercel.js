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

    // Use fetch instead of OpenAI SDK for PHP runtime compatibility
    const response = await fetch("https://router.huggingface.co/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "google/gemma-3-27b-it",
        messages: [
          {
            role: "user",
            content: [{ type: "text", text: prompt }]
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      })
    });

    const data = await response.json();

    // Try different approaches if first fails
    let finalResponse;
    if (data.error) {
      console.log("First model failed, trying alternative...");
      try {
        const altResponse = await fetch("https://router.huggingface.co/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.HF_TOKEN}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "google/gemma-3-27b-it:featherless-ai",
            messages: [
              {
                role: "user",
                content: [{ type: "text", text: prompt }]
              }
            ],
            max_tokens: 1000,
            temperature: 0.7
          })
        });
        
        const altData = await altResponse.json();
        if (!altData.error) {
          finalResponse = altData.choices?.[0]?.message || "No response";
        } else {
          throw new Error("Both model attempts failed");
        }
      } catch (altErr) {
        console.log("Alternative also failed:", altErr);
        finalResponse = "GEMMA-3 service temporarily unavailable";
      }
    } else {
      finalResponse = data.choices?.[0]?.message || "No response";
    }

    res.status(200).json({ response: finalResponse });

  } catch (err) {
    console.error("GEMMA-3 Vercel Function Error:", err);
    res.status(500).json({ response: `GEMMA-3 error: ${err.message}` });
  }
}
