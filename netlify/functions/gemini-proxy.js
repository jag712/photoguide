// 이 파일은 프로젝트의 'netlify/functions' 폴더 안에 'gemini-proxy.js'라는 이름으로 저장해야 합니다.
// 이 서버리스 함수는 클라이언트(브라우저) 대신 Gemini API를 안전하게 호출하는 중계 서버 역할을 합니다.

// Node.js 환경에서 fetch를 사용하기 위해 'node-fetch'가 필요할 수 있습니다.
// Netlify는 기본적으로 fetch를 지원합니다.
// 만약 로컬 테스트 시 에러가 발생하면 `npm install node-fetch`를 실행하세요.

const DEFAULT_MODEL = process.env.GEMINI_MODEL || "gemini-1.5-flash";

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

    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${DEFAULT_MODEL}:generateContent?key=${geminiApiKey}`;

    // 클라이언트로부터 받은 요청 본문을 그대로 사용합니다.
    const requestBody = JSON.parse(event.body);

    if (!requestBody || !requestBody.contents) {
      throw new Error("Request body must include contents for the Gemini API.");
    }

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody) // 클라이언트의 payload를 그대로 전달
    });

    if (!response.ok) {
      const rawError = await response.text();
      let details = rawError;
      try {
        const parsed = JSON.parse(rawError);
        details = parsed.error?.message || rawError;
      } catch (parseError) {
        // ignore JSON parse errors and use the raw message instead
      }

      console.error('Gemini API error:', response.status, details);

      return {
        statusCode: response.status,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: 'Gemini API request failed.',
          status: response.status,
          details,
          model: DEFAULT_MODEL,
        }),
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
    const message = error instanceof Error ? error.message : 'Unknown error';
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: message, model: DEFAULT_MODEL }),
    };
  }
};
