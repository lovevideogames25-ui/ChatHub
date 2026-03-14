async function sendMessage(prompt, model) {
  let url;
  
  if (model === "GPT-OSS") {
    url = "http://localhost:3001/api/gptoss";
  } else if (model === "GEMMA-3") {
    url = "http://localhost:3001/api/gemma3";
  } else if (model === "LLAMA3.2") {
    url = "http://localhost:3001/api/llama33";
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
