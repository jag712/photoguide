// 클라이언트 대신 Gemini API를 호출하는 Netlify Functions 프록시입니다.
// 최신 안정 모델(gemini-1.5-flash-latest)을 사용하도록 갱신했습니다.

const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Gemini API key is not set in environment variables." }),
    };
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const { contents, generationConfig } = JSON.parse(event.body || "{}");

    if (!contents) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Request body must include contents." }),
      };
    }

    const request = { contents };
    if (generationConfig) {
      request.generationConfig = generationConfig;
    }

    const result = await model.generateContent(request);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result.response),
    };
  } catch (error) {
    console.error("Gemini proxy error:", error);
    const message = error?.message || "Failed to call Gemini API.";
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: message }),
    };
  }
};
