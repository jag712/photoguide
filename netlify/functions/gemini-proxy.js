exports.handler = async function(event, context) {
  // CORS 예외 처리 및 POST 요청 검증
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" })
    };
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "서버에 API Key가 설정되지 않았습니다." })
      };
    }

    // 💡 핵심 수정: 프론트엔드가 보낸 완벽한 payload(스키마 등 포함)를 그대로 가져옵니다.
    const payload = JSON.parse(event.body);

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    // 가져온 payload를 가공 없이 통째로 구글 API에 전달합니다.
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload) 
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: data.error?.message || "Google API 통신 에러" })
      };
    }

    // 💡 핵심 수정: 구글의 응답도 프론트엔드가 읽을 수 있도록 원본 그대로 반환합니다.
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(data)
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
