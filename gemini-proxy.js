const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async (event) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (event.httpMethod === "GET") {
    if (!apiKey) {
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ok: false, message: "API Key not configured." })
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true, message: "Gemini proxy is reachable." })
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { Allow: "GET, POST" },
      body: "Method Not Allowed"
    };
  }

  if (!apiKey) {
    return { statusCode: 500, body: 'API Key not configured.' };
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  try {
    const { contents, generationConfig } = JSON.parse(event.body);
    const request = {
      contents,
      ...(generationConfig && { generationConfig })
    };
    const result = await model.generateContent(request);
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=86400, s-maxage=86400"
      },
      body: JSON.stringify(result.response)
    };
  } catch (error) {
    console.error("API call error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate content.' })
    };
  }
};
