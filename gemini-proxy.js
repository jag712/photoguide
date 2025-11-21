const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async (event) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: 'API Key not configured.' };
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  // Gemini API 모델명이 업데이트되면서 더 이상 사용되지 않는 값으로 인해 오류가 발생할 수 있어
  // 안정적으로 제공되는 최신 플래시 모델로 교체합니다.
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
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
