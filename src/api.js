async function sendMessage(prompt, model) {
  let url;
  
  // Always use serverless functions for Vercel deployment
  if (model === "GPT-OSS") {
    url = "/api/gptoss";
  } else if (model === "GEMMA-3") {
    url = "/api/gemma3";
  } else if (model === "LLAMA3.2") {
    url = "/api/llama33";
  } else {
    throw new Error("Model not supported");
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ prompt })
  });

  const data = await res.json();
  
  if (data.error) {
    throw new Error(data.error);
  }
  
  return data.response;
}

export default sendMessage;
