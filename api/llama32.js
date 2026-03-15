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
    const response = await fetch("https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 500,
          temperature: 0.7,
          do_sample: true,
          return_full_text: false
        }
      })
    });

    const data = await response.json();
    
    if (data.error) {
      console.error(data.error);
      throw new Error(data.error);
    }

    // Handle different response formats from HuggingFace
    let responseText = "No response";
    if (Array.isArray(data) && data.length > 0 && data[0].generated_text) {
      responseText = data[0].generated_text;
    } else if (data.generated_text) {
      responseText = data.generated_text;
    }

    res.status(200).json({ response: responseText });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      response: "Llama-3.2 not available"
    });
  }
}
