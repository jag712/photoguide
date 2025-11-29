// 이 파일은 프로젝트의 'netlify/functions' 폴더 안에 'gemini-proxy.js'라는 이름으로 저장해야 합니다.
// 이 서버리스 함수는 클라이언트(브라우저) 대신 Gemini API를 안전하게 호출하는 중계 서버 역할을 합니다.

// Node.js 환경에서 fetch를 사용하기 위해 'node-fetch'가 필요할 수 있습니다.
// Netlify는 기본적으로 fetch를 지원합니다.
// 만약 로컬 테스트 시 에러가 발생하면 `npm install node-fetch`를 실행하세요.

exports.handler = async function(event) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const geminiApiKey = process.env.GEMINI_API_KEY;
        if (!geminiApiKey) {
            throw new Error("Gemini API key is not set in environment variables.");
        }
        
        const requestBody = JSON.parse(event.body);
        
        // 클라이언트 요청에서 model을 지정할 수 있도록 필드를 추출합니다.
        // 클라이언트 요청에 model이 없다면 기본값으로 gemini-2.5-flash를 사용합니다.
        const modelName = requestBody.model || 'gemini-2.5-flash'; 
        
        // API 요청 시 body에서 model 필드는 제거합니다.
        const { model, ...apiRequestBody } = requestBody;

        // API URL에 동적으로 modelName을 적용합니다.
        const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${geminiApiKey}`;

        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(apiRequestBody) // model 필드가 제거된 body를 전달
        });

        // ... (나머지 에러 처리 및 응답 반환 로직은 동일)
        if (!response.ok) {
            const errorBody = await response.text();
            return {
                statusCode: response.status,
                body: `Error from Gemini API: ${errorBody}`
            };
        }

        const data = await response.json();

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
