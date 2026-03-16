async function sendMessage(prompt, model) {
  console.log('=== API CALL ===');
  console.log('Model:', model);
  console.log('Environment check:');
  console.log('import.meta.env.DEV:', import.meta.env.DEV);
  
  // Check environment variables for both development and production
  const isDev = import.meta.env.DEV;
  const hfToken = import.meta.env.VITE_HF_TOKEN || import.meta.env.HF_TOKEN;
  const openrouterToken = import.meta.env.VITE_OPENROUTER_API || import.meta.env.OPENROUTER_API;
  
  console.log('isDev:', isDev);
  console.log('HF_TOKEN exists:', !!hfToken);
  console.log('HF_TOKEN length:', hfToken?.length || 0);
  console.log('VITE_HF_TOKEN exists:', !!import.meta.env.VITE_HF_TOKEN);
  console.log('Available env vars:', Object.keys(import.meta.env).filter(key => key.startsWith('VITE_')));
  
  if (model === "GEMMA-3") {
    // Use HuggingFace OpenAI-compatible API route for GEMMA-3
    const serverUrl = isDev ? 'http://localhost:3001' : '';
    console.log('Server URL:', serverUrl);
    
    const response = await fetch(`${serverUrl}/api/gemma3`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt
      })
    });

    const data = await response.json();
    
    if (data.error) {
      console.error('GEMMA-3 API Error:', data.error);
      throw new Error(data.error || "GEMMA-3 API request failed");
    }
    
    return data.response;
  }

  if (model === "LLAMA3.2") {
    // LLAMA-3.2 is currently down due to HuggingFace service issues
    throw new Error("LLAMA-3.2 is currently unavailable due to HuggingFace service issues. Please try using GPT-OSS, GEMMA-3, or LLAMA-3.1 instead.");
  }

  if (model === "LLAMA-3.1") {
    // Use HuggingFace API route for LLAMA-3.1
    const serverUrl = import.meta.env.DEV ? 'http://localhost:3001' : '';
    const response = await fetch(`${serverUrl}/api/llama31`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt
      })
    });

    const data = await response.json();
    
    if (data.error) {
      console.error('LLAMA-3.1 API Error:', data.error);
      throw new Error(data.error || "LLAMA-3.1 API request failed");
    }
    
    return data.response;
  }

  if (model === "QWEN3.5") {
    // Use HuggingFace API route for Qwen3.5
    const serverUrl = import.meta.env.DEV ? 'http://localhost:3001' : '';
    const response = await fetch(`${serverUrl}/api/qwen35`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt
      })
    });

    const data = await response.json();
    
    if (data.error) {
      console.error('Qwen3.5 API Error:', data.error);
      throw new Error(data.error || "Qwen3.5 API request failed");
    }
    
    return data.response;
  }

  if (model === "NEMOTRON-3-SUPER") {
    // Use OpenRouter API route for Nemotron
    const serverUrl = isDev ? 'http://localhost:3001' : '';
    const openrouterToken = import.meta.env.VITE_OPENROUTER_API || import.meta.env.OPENROUTER_API;
    console.log('OPENROUTER_API exists:', !!openrouterToken);
    console.log('OPENROUTER_API length:', openrouterToken?.length || 0);
    
    const response = await fetch(`${serverUrl}/api/nemotron`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openrouterToken}`
      },
      body: JSON.stringify({
        prompt: prompt
      })
    });

    const data = await response.json();
    
    if (data.error) {
      console.error('Nemotron API Error:', data.error);
      throw new Error(data.error || "Nemotron API request failed");
    }
    
    return data.response;
  }

  if (model === "TRINITY-LARGE-PREVIEW") {
    // Use OpenRouter API route for Trinity
    const serverUrl = import.meta.env.DEV ? 'http://localhost:3001' : '';
    const response = await fetch(`${serverUrl}/api/trinity`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt
      })
    });

    const data = await response.json();
    
    if (data.error) {
      console.error('Trinity API Error:', data.error);
      throw new Error(data.error || "Trinity API request failed");
    }
    
    return data.response;
  }

  // Use OpenRouter for other models
  let modelId;
  
  if (model === "GPT-OSS") {
    modelId = "openai/gpt-4o-mini";
  } else {
    throw new Error("Model not supported");
  }

  // Debug: Log all available environment variables
  console.log('Available env vars:', {
    VITE_OPENROUTER_API: import.meta.env.VITE_OPENROUTER_API ? 'SET' : 'NOT SET',
    OPENROUTER_API: import.meta.env.OPENROUTER_API ? 'SET' : 'NOT SET',
    MODE: import.meta.env.MODE,
    PROD: import.meta.env.PROD,
    DEV: import.meta.env.DEV
  });

  // Get API key from environment variables
  const apiKey = import.meta.env.VITE_OPENROUTER_API || import.meta.env.OPENROUTER_API;
  
  if (!apiKey) {
    console.error('API Key Missing - Available env vars:', {
      VITE_OPENROUTER_API: import.meta.env.VITE_OPENROUTER_API,
      OPENROUTER_API: import.meta.env.OPENROUTER_API,
      allEnv: import.meta.env
    });
    throw new Error("API key not found. Please add VITE_OPENROUTER_API to your environment variables.");
  }

  console.log('API Key found, length:', apiKey.length);

  // Direct OpenRouter API call using environment variable
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
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
    console.error('API Error:', data.error);
    throw new Error(data.error.message || "API request failed");
  }
  
  return data.choices[0].message.content;
}

export default sendMessage;
