import fetch from "node-fetch";

const generateWithHF = async (prompt) => {
  const response = await fetch(
    "https://router.huggingface.co/hf-inference/models/google/flan-t5-large",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: `Write a simple blog in plain text on this topic: ${prompt}`,
      }),
    }
  );

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  if (!Array.isArray(data)) {
    throw new Error("Invalid response from Hugging Face API");
  }

  return data[0].generated_text;
};

export default generateWithHF;
