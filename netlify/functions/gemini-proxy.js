// Netlify Functions 서버리스 환경에서 실행되는 Gemini API 프록시입니다.
// 브라우저에서 직접 Gemini API 키를 노출하지 않도록 중계 역할을 합니다.

const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async function (event) {
  // POST 요청만 허용합니다.
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Gemini API key is not set in environment variables.");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // 공개적으로 사용 가능한 경량 모델을 사용합니다.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const { contents, generationConfig } = JSON.parse(event.body);

    const normalizedContents = contents.map((item) => ({
      role: item.role || "user",
      parts: item.parts,
    }));

    const request = {
      contents: normalizedContents,
      ...(generationConfig && { generationConfig }),
    };

    const result = await model.generateContent(request);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result.response),
    };
  } catch (error) {
    console.error("Proxy Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
