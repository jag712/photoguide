
exports.handler = async function(event, context) {
  // CORS 예외 처리 및 POST 요청 검증
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" })
    };
  }

  try {
    // Netlify 대시보드에 등록한 환경 변수에서 키를 가져옵니다.
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "서버에 API Key가 설정되지 않았습니다. Netlify 설정을 확인하세요." })
      };
    }

    // 클라이언트로부터 전달받은 프롬프트 추출
    const { prompt } = JSON.parse(event.body);

    // Google AI Studio 공식 무료 티어 API 엔드포인트 (gemini-1.5-flash)
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    const data = await response.json();

    // 구글 API 단에서 에러를 반환한 경우 처리
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: data.error?.message || "Google API 통신 에러" })
      };
    }

    // 제미나이의 텍스트 응답 추출
    const aiResponse = data.candidates[0].content.parts[0].text;

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*" // 필요한 경우 CORS 허용
      },
      body: JSON.stringify({ reply: aiResponse })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
