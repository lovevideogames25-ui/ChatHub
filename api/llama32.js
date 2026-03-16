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
    console.log("LLAMA-3.2 API call with prompt:", prompt);
    const apiKey = process.env.VITE_REPLICATE_API || process.env.REPLICATE_API;
    console.log("Replicate API key exists:", !!apiKey);
    console.log("Replicate API key length:", apiKey?.length || 0);

    // Use Replicate API with proper Llama 3.2 model
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Authorization": `Token ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        version: "meta/meta-llama-3.2-3b:5c11ba722650525b0ab1a877d1fde44c5dab7445072e9e8e1a6a47ec2026a4d4",
        input: {
          prompt: `<|begin_of_text|>
<|start_header_id|>system<|end_header_id|>
You are a helpful assistant.
<|eot_id|>
<|start_header_id|>user<|end_header_id|>
${prompt}
<|eot_id|>
<|start_header_id|>assistant<|end_header_id|>
`,
          max_tokens: 1000,
          temperature: 0.7,
          stream: true
        }
      })
    });

    if (!response.ok) {
      console.error("Replicate API error:", response.status, response.statusText);
      const errorText = await response.text();
      console.error("Error details:", errorText);
      throw new Error(`Replicate API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("Replicate response:", data);

    if (data.error) {
      console.error("Replicate API returned error:", data.error);
      throw new Error(`Replicate error: ${data.error}`);
    }

    // Handle streaming response
    if (data.urls && data.urls.stream) {
      console.log("Starting stream processing...");
      try {
        const streamResponse = await fetch(data.urls.stream, {
          headers: {
            "Authorization": `Token ${apiKey}`
          }
        });

        if (!streamResponse.ok) {
          console.error("Stream fetch error:", streamResponse.status);
          throw new Error(`Stream error: ${streamResponse.status}`);
        }

        let output = "";
        const reader = streamResponse.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value);
          const lines = chunk.split('\n').filter(line => line.trim());
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const eventData = JSON.parse(line.slice(6));
                if (eventData.event === 'output') {
                  output += eventData.data;
                  console.log("Stream chunk received:", eventData.data);
                }
              } catch (e) {
                console.log("Stream parsing error:", e);
              }
            }
          }
        }

        console.log("LLAMA-3.2 final output:", output);
        if (output.trim()) {
          res.status(200).json({ response: output });
        } else {
          res.status(200).json({ response: "LLAMA-3.2 returned empty response. Please try again." });
        }
      } catch (streamError) {
        console.error("Stream processing error:", streamError);
        throw new Error(`Stream processing failed: ${streamError.message}`);
      }
    } else {
      // Fallback for non-streaming response
      const responseText = data.output || "No response";
      console.log("LLAMA-3.2 response:", responseText);
      res.status(200).json({ response: responseText });
    }

  } catch (err) {
    console.error("LLAMA-3.2 API error:", err);
    const errorMessage = err.message || "Unknown error occurred";
    console.error("Full error details:", {
      name: err.name,
      message: err.message,
      stack: err.stack
    });
    res.status(500).json({
      response: `LLAMA-3.2 API error: ${errorMessage}. Please check your REPLICATE_API_TOKEN environment variable.`
    });
  }
}
