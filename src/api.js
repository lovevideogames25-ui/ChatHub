async function sendMessage(prompt, model) {
  let modelId;
  
  if (model === "GPT-OSS") {
    modelId = "openai/gpt-4o-mini";
  } else if (model === "GEMMA-3") {
    modelId = "google/gemma-3-27b-it:free";
  } else if (model === "LLAMA3.2") {
    modelId = "meta-llama/llama-3.2-3b-instruct:free";
  } else {
    throw new Error("Model not supported");
  }

  // Direct OpenRouter API call using environment variable
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API}`,
      "Content-Type": "application/json",
      "HTTP-Referer": `https://${import.meta.env.VITE_SITE_URL || 'chat-hub-ai.vercel.app'}`,
      "X-Title": "ChatHub"
    },
    body: JSON.stringify({
      model: modelId,
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await response.json();
  
  if (data.error) {
    throw new Error(data.error.message || "API request failed");
  }
  
  return data.choices[0].message.content;
}

export default sendMessage;
