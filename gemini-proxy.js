const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async (event) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "GEMINI_API_KEY가 설정되지 않았습니다. Netlify 환경 변수나 로컬 .env에 키를 넣어주세요." }),
    };
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
