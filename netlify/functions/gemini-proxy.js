// 이 파일은 프로젝트의 'netlify/functions' 폴더 안에 'gemini-proxy.js'라는 이름으로 저장해야 합니다.
// 이 서버리스 함수는 클라이언트(브라우저) 대신 Gemini API를 안전하게 호출하는 중계 서버 역할을 합니다.

// Node.js 환경에서 fetch를 사용하기 위해 'node-fetch'가 필요할 수 있습니다.
// Netlify는 기본적으로 fetch를 지원합니다.
// 만약 로컬 테스트 시 에러가 발생하면 `npm install node-fetch`를 실행하세요.

exports.handler = async function(event) {
  // POST 요청만 허용합니다.
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // Netlify 환경 변수에서 API 키를 안전하게 불러옵니다.
    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (!geminiApiKey) {
      throw new Error("Gemini API key is not set in environment variables.");
    }
    
    // Gemini API가 갱신되면서 이전 프리뷰 모델이 제공되지 않아 오류가 발생할 수 있으므로
    // 안정적으로 제공되는 최신 플래시 모델로 교체합니다.
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`;

    // 클라이언트로부터 받은 요청 본문을 그대로 사용합니다.
    const requestBody = JSON.parse(event.body);

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody) // 클라이언트의 payload를 그대로 전달
    });

    if (!response.ok) {
      const errorBody = await response.text();
      // Gemini API에서 받은 에러를 클라이언트에 전달합니다.
      return {
        statusCode: response.status,
        body: `Error from Gemini API: ${errorBody}`
      };
    }

    const data = await response.json();

    // 성공적인 응답을 클라이언트에 전달합니다.
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };

  } catch (error) {
    console.error('Proxy Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
