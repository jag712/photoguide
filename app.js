// This file contains the main application logic and depends on data.js and style.css.

// --- 전역 변수 ---
const mainContent = document.getElementById('mainContent');
const navLinks = document.querySelectorAll('.nav-item, #homeLink');
const searchInput = document.getElementById('searchInput');
const quizBtn = document.getElementById('quizBtn');
const geminiModal = document.getElementById('geminiModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const closeModal = document.getElementById('closeModal');

let charts = {};
let currentQuizData = null;
let currentQuestionIndex = 0;
let score = 0;

// --- 함수 영역 ---
function createCalendar(year, month, events = {}) {
    const today = new Date();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() + 1 === month;
    const todayDate = isCurrentMonth ? today.getDate() : -1;

    const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const date = new Date(year, month - 1, 1);
    const firstDay = date.getDay();
    const daysInMonth = new Date(year, month, 0).getDate();
    
    let html = `<div class="content-card p-6 w-full max-w-4xl mx-auto mb-8"><h3 class="text-xl font-bold text-center mb-4">${year}년 ${monthNames[month-1]}</h3><div class="grid grid-cols-7 gap-1 text-center text-sm font-semibold text-gray-600">${days.map(day => `<div class="${day === '일' ? 'text-red-500' : (day === '토' ? 'text-blue-500' : '')}">${day}</div>`).join('')}</div><div class="grid grid-cols-7 gap-1 mt-2">`;
    
    for (let i = 0; i < firstDay; i++) {
        html += `<div></div>`;
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
        const currentDayOfWeek = new Date(year, month - 1, day).getDay();
        const dayEvents = events[day] || [];
        let eventHtml = dayEvents.map(e => `<div class="text-white p-1 rounded-md ${e.color || 'bg-blue-500'} mb-1 truncate" title="${e.title}">${e.title}</div>`).join('');
        let dayClass = '';
        
        if (currentDayOfWeek === 0 || dayEvents.some(e => e.isHoliday)) {
            dayClass = 'text-red-500';
        } else if (currentDayOfWeek === 6) {
            dayClass = 'text-blue-500';
        }
        
        // 오늘 날짜인지 확인하여 'today' 클래스 추가
        if (day === todayDate) {
            dayClass += ' today-text'; // 텍스트 색상을 위한 클래스
            // 셀 자체에 배경색을 주기 위해 부모 div에 'today' 클래스 추가
            html += `<div class="border p-2 h-28 flex flex-col ${dayEvents.length > 0 ? 'bg-gray-50' : ''} today"><span class="font-bold ${dayClass}">${day}</span><div class="text-xs mt-1 text-left overflow-y-auto">${eventHtml}</div></div>`;
        } else {
            html += `<div class="border p-2 h-28 flex flex-col ${dayEvents.length > 0 ? 'bg-gray-50' : ''}"><span class="font-bold ${dayClass}">${day}</span><div class="text-xs mt-1 text-left overflow-y-auto">${eventHtml}</div></div>`;
        }
    }
    html += `</div></div>`;
    return html;
}

/**
 * =================================================================
 * Gemini AI API 호출 및 모달 제어 공통 함수
 * =================================================================
 */
const PROXY_URL = '/.netlify/functions/gemini-proxy'; 

function showModal() {
    modalBody.innerHTML = `<div class="flex items-center justify-center h-40"><div class="loader"></div></div>`;
    geminiModal.classList.remove('hidden');
    setTimeout(() => {
        geminiModal.classList.remove('opacity-0');
        geminiModal.querySelector('.modal-content').classList.remove('scale-95');
    }, 10);
}

function hideModal() {
    geminiModal.classList.add('opacity-0');
    geminiModal.querySelector('.modal-content').classList.add('scale-95');
    setTimeout(() => {
        geminiModal.classList.add('hidden');
    }, 300);
}

async function callGemini(prompt, useSchema = false) {
    showLoadingModal(); // 수정된 부분
    try {
        // ... 기존 로직은 동일
        const payload = {
            // ...
        };
        const response = await fetch(PROXY_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error(`Proxy call failed. Status: ${response.status}`);
        const result = await response.json();
        let text = result.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) throw new Error("No content received from API.");
        text = text.trim();
        if (text.startsWith('```json') && text.endsWith('```')) {
            text = text.substring(7, text.length - 3).trim();
        }
        return text;
    } catch (error) {
        console.error("Gemini proxy call error:", error);
        modalBody.innerHTML = `<p class="text-red-500">AI 기능을 호출하는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.</p>`;
        return null; // 오류 발생 시 null 반환
    }
}
function showLoadingModal() {
    modalBody.innerHTML = `<div class="flex items-center justify-center h-40"><div class="loader"></div></div>`;
    geminiModal.classList.remove('hidden');
    setTimeout(() => {
        geminiModal.classList.remove('opacity-0');
        geminiModal.querySelector('.modal-content').classList.remove('scale-95');
    }, 10);
}
    
/**
 * =================================================================
 * 기능 1: AI 퀴즈 생성
 * =================================================================
 */
async function generateQuiz() {
    const activeLink = document.querySelector('.nav-item.active');
    const category = activeLink ? activeLink.dataset.category : 'all';
    const categoryName = activeLink ? activeLink.textContent : '전체';
    modalTitle.textContent = `${categoryName} 퀴즈`;
    let contentForQuiz = [];
    if (['home', 'visualization', 'all', 'cms'].includes(category) || !photographyData[category]) {
        Object.values(photographyData).forEach(cat => contentForQuiz.push(...cat));
    } else {
        contentForQuiz = photographyData[category];
    }
    const shuffledTerms = contentForQuiz.sort(() => 0.5 - Math.random());
    const topics = shuffledTerms.slice(0, 15).map(item => item.q).join(', ');
    const prompt = `다음 사진학 주제들을 바탕으로 객관식 퀴즈 5개를 생성해줘: ${topics}. 각 질문은 4개의 선택지를 가져야 하고, 그 중 하나만 정답이어야 해. 질문의 난이도는 '아주 쉬운 문제 1개', '보통 문제 2개', '어려운 문제 2개'로 구성해줘. 질문, 선택지, 정답을 JSON 형식으로 반환해줘.`;
    const responseText = await callGemini(prompt, true);
    try {
        let parsedData = JSON.parse(responseText);
        if (parsedData && Array.isArray(parsedData.questions) && parsedData.questions.length > 0) {
            currentQuizData = parsedData;
            currentQuestionIndex = 0;
            score = 0;
            displayQuizQuestion();
        } else {
            throw new Error("Invalid quiz format received.");
        }
    } catch (e) {
        console.error("Quiz parsing error:", e);
        modalBody.innerHTML = `<p class="text-red-500">퀴즈를 생성하는 데 실패했습니다. AI가 유효한 퀴즈 형식을 반환하지 못했습니다.</p>`;
    }
}
async function getAIAnswer(type, question) {
  const cacheKey = `ai_${type}_${question}`;
  const cached = localStorage.getItem(cacheKey);

  if (cached) return JSON.parse(cached);

  const response = await fetch("/.netlify/functions/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, question })
  });
  const data = await response.json();

  localStorage.setItem(cacheKey, JSON.stringify(data));
  return data;
}

function displayQuizQuestion() {
    const q = currentQuizData.questions[currentQuestionIndex];
    const optionsHtml = q.options.map(option => `<div class="quiz-option p-4 rounded-lg cursor-pointer mb-2" data-option="${option.replace(/"/g, '&quot;')}">${option}</div>`).join('');
    
    modalBody.innerHTML = `
        <div class="mb-4">
            <p class="text-sm text-gray-500">문제 ${currentQuestionIndex + 1} / ${currentQuizData.questions.length}</p>
            <p class="text-lg font-semibold mt-1">${q.question}</p>
        </div>
        <div id="quizOptions">${optionsHtml}</div>
        <div id="quizResult" class="mt-4"></div>
        <div class="flex justify-end mt-4">
            <button id="nextQuestionBtn" class="bg-gray-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-800 hidden">다음 문제</button>
        </div>`;

    modalBody.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', e => {
            // 다른 옵션의 'selected' 클래스 제거
            modalBody.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
            // 현재 클릭한 옵션에 'selected' 클래스 추가
            e.currentTarget.classList.add('selected');
            checkQuizAnswer();
        });
    });

    document.getElementById('nextQuestionBtn').addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuizData.questions.length) {
            displayQuizQuestion();
        } else {
            displayQuizFinalScore();
        }
    });
}

function checkQuizAnswer() {
    const selectedOptionEl = modalBody.querySelector('.quiz-option.selected');
    if (!selectedOptionEl) return;

    const selectedAnswer = selectedOptionEl.dataset.option;
    const correctAnswer = currentQuizData.questions[currentQuestionIndex].answer;
    
    // 모든 옵션 클릭 비활성화
    modalBody.querySelectorAll('.quiz-option').forEach(opt => {
        opt.style.pointerEvents = 'none';
        if (opt.dataset.option === correctAnswer) {
            opt.classList.add('correct');
        } else if (opt.classList.contains('selected')) {
            opt.classList.add('incorrect');
        }
    });

    // 정답/오답 텍스트 표시
    if (selectedAnswer === correctAnswer) {
        score++;
        modalBody.querySelector('#quizResult').innerHTML = `<p class="text-green-600 font-semibold">정답입니다! 🎉</p>`;
    } else {
        modalBody.querySelector('#quizResult').innerHTML = `<p class="text-red-600 font-semibold">오답입니다. 정답은 "<span class="font-bold">${correctAnswer}</span>" 입니다. 😔</p>`;
    }

    // 다음 문제 버튼 표시
    document.getElementById('nextQuestionBtn').classList.remove('hidden');
}

function displayQuizFinalScore() {
    modalBody.innerHTML = `<div class="text-center"><h2 class="text-2xl font-bold mb-4">퀴즈 완료!</h2><p class="text-lg">총 ${currentQuizData.questions.length}문제 중 <span class="font-bold text-xl text-gray-800">${score}</span>문제를 맞혔습니다.</p><button id="restartQuizBtn" class="mt-6 bg-gray-700 text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-800">다시 풀기</button></div>`;
    document.getElementById('restartQuizBtn').addEventListener('click', generateQuiz);
}

// 아코디언 UI를 위한 이벤트 리스너 (시각화, CMS 페이지용)
function setupEventListeners() {
    document.querySelectorAll('.question').forEach(q => {
        q.addEventListener('click', (e) => {
            const questionDiv = e.currentTarget;
            const answer = questionDiv.nextElementSibling;
            const isAlreadyOpen = answer.classList.contains('open');

            document.querySelectorAll('.answer.open').forEach(openAnswer => {
                if (openAnswer !== answer) {
                    openAnswer.classList.remove('open');
                    openAnswer.previousElementSibling.classList.remove('open');
                }
            });
            
            if (!isAlreadyOpen) {
                questionDiv.classList.add('open');
                answer.classList.add('open');
            } else {
                questionDiv.classList.remove('open');
                answer.classList.remove('open');
            }
        });
    });
}

function createChart(canvasId, label, data, backgroundColor, borderColor) {
    const ctx = document.getElementById(canvasId)?.getContext('2d');
    if (!ctx) return;
    if (charts[canvasId]) { charts[canvasId].destroy(); }
    charts[canvasId] = new Chart(ctx, { type: 'bar', data: { labels: data.map(item => item.label), datasets: [{ label: label, data: data.map(item => item.value), backgroundColor: backgroundColor, borderColor: borderColor, borderWidth: 1 }] }, options: { maintainAspectRatio: false, scales: { y: { display: false }, x: { grid: { display: false }, ticks: { font: { size: 10 }, autoSkip: true, maxTicksLimit: 15 } } }, plugins: { legend: { display: false }, tooltip: { displayColors: false, callbacks: { label: (context) => data[context.dataIndex].desc || '' } } } } });
}

// 퀴즈 카드 플립을 위한 이벤트 리스너
function setupCardFlipListeners() {
    const cards = document.querySelectorAll('.quiz-card');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.gemini-btn')) {
                return;
            }
            const wasFlipped = card.classList.contains('is-flipped');
            cards.forEach(c => c.classList.remove('is-flipped'));
            if (!wasFlipped) {
                card.classList.add('is-flipped');
            }
        });
    });
}
function renderContent(category, searchTerm = '') {
    let html = '';
    if (category === 'home') {
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1

        const eventsForSept = {};
        (calendarEvents[9] || []).forEach(e => { (eventsForSept[e.day] = eventsForSept[e.day] || []).push({ ...e }); });
        const eventsForOct = {};
        (calendarEvents[10] || []).forEach(e => { (eventsForOct[e.day] = eventsForOct[e.day] || []).push({ ...e }); });

        html = `<div class="content-card p-6 md:p-8 mb-6 text-center"><h2 class="text-3xl font-bold text-gray-800 mb-2">주요 학사 일정 ✨</h2><p class="text-gray-600">중요한 입시 일정을 확인하세요.</p></div>`;
        html += createCalendar(currentYear, 9, eventsForSept);
        html += createCalendar(currentYear, 10, eventsForOct);
    } else if (category === 'visualization') {
        const visualizationContent = [
            {
                q: "노출의 이해: 조리개와 셔터 속도",
                a: `
                <p class="text-sm text-gray-600 mb-6">노출의 세 가지 요소 중 조리개와 셔터 속도의 관계를 시각적으로 확인해 보세요. 각 막대 위로 마우스를 올리면 해당 설정 값에 대한 설명을 볼 수 있습니다.</p>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <div class="flex justify-center items-center mb-4">
                            <h3 class="text-xl font-bold text-center mr-4">조리개 (Aperture)</h3>
                            <div class="flex rounded-lg bg-gray-200 p-1 text-sm">
                                <button class="stop-btn active px-3 py-1 rounded-md" data-chart="aperture" data-stop="fullStop">1 스톱</button>
                                <button class="stop-btn px-3 py-1 rounded-md" data-chart="aperture" data-stop="thirdStop">1/3 스톱</button>
                            </div>
                        </div>
                        <div class="chart-container"><canvas id="apertureChart"></canvas></div>
                        <div class="text-xs text-gray-500 mt-4 p-2 bg-gray-50 rounded-md">
                            <p>• <strong>심도와 빛의 양:</strong> 조리개 값(f-number)이 낮을수록 배경이 흐려지고(얕은 심도), 빛을 많이 받아들입니다.</p>
                            <p>• <strong>회절:</strong> 일반적으로 f/16 이상으로 조이면 심도는 깊어지지만, 빛의 회절 현상으로 이미지의 선명도가 저하될 수 있습니다.</p>
                            <p>• <strong>사용 범위:</strong> 소형/중형 카메라는 보통 f/22까지, 대형 카메라는 f/64나 f/128까지 사용하기도 합니다.</p>
                        </div>
                    </div>
                    <div>
                        <div class="flex justify-center items-center mb-4">
                            <h3 class="text-xl font-bold text-center mr-4">셔터 속도 (Shutter Speed)</h3>
                            <div class="flex rounded-lg bg-gray-200 p-1 text-sm">
                                <button class="stop-btn active px-3 py-1 rounded-md" data-chart="shutter" data-stop="fullStop">1 스톱</button>
                                <button class="stop-btn px-3 py-1 rounded-md" data-chart="shutter" data-stop="thirdStop">1/3 스톱</button>
                            </div>
                        </div>
                        <div class="chart-container"><canvas id="shutterChart"></canvas></div>
                       <div class="text-xs text-gray-500 mt-4 p-2 bg-gray-50 rounded-md">
                            <p>• <strong>움직임 표현:</strong> 셔터 속도가 느릴수록 움직임이 흐릿하게(Motion Blur) 표현되고, 빠를수록 움직임이 정지됩니다.</p>
                            <p>• <strong>카메라 흔들림:</strong> 일반적으로 '1/초점거리'초 보다 느린 속도에서는 삼각대 없이는 사진이 흔들리기 쉽습니다.</p>
                       </div>
                    </div>
                </div>`
            },
            {
                q: "필름 특성곡선 (Characteristic Curve)",
                a: `
                    <div class="relative w-full max-w-4xl mx-auto mb-4" style="height: 450px;">
                        <svg class="absolute w-full h-full" viewBox="0 0 450 300">
                            <rect x="260" y="10" width="20" height="2" fill="#059669"></rect><text x="285" y="15" font-size="10">저감도 (ISO 100) 필름 (고대비)</text>
                            <rect x="260" y="20" width="20" height="2" fill="#DB2777"></rect><text x="285" y="25" font-size="10">고감도 (ISO 400) 필름 (저대비)</text>
                            <line x1="60" y1="250" x2="420" y2="250" stroke="#cbd5e1" stroke-width="1"></line><line x1="60" y1="50" x2="60" y2="250" stroke="#cbd5e1" stroke-width="1"></line>
                            <text x="50" y="255" font-size="10" text-anchor="end">0.0</text><line x1="55" y1="250" x2="60" y2="250" stroke="#9ca3af" stroke-width="1"></line>
                            <text x="50" y="205" font-size="10" text-anchor="end">0.5</text><line x1="55" y1="200" x2="420" y2="200" stroke="#e5e7eb" stroke-width="0.5"></line>
                            <text x="50" y="155" font-size="10" text-anchor="end">1.0</text><line x1="55" y1="150" x2="420" y2="150" stroke="#e5e7eb" stroke-width="0.5"></line>
                            <text x="50" y="105" font-size="10" text-anchor="end">1.5</text><line x1="55" y1="100" x2="420" y2="100" stroke="#e5e7eb" stroke-width="0.5"></line>
                            <text x="50" y="55" font-size="10" text-anchor="end">2.0</text><line x1="55" y1="50" x2="60" y2="50" stroke="#9ca3af" stroke-width="1"></line>
                            <text x="120" y="265" font-size="10" text-anchor="middle">-2.0</text><line x1="120" y1="250" x2="120" y2="245" stroke="#9ca3af" stroke-width="1"></line>
                            <text x="195" y="265" font-size="10" text-anchor="middle">-1.0</text><line x1="195" y1="250" x2="195" y2="245" stroke="#9ca3af" stroke-width="1"></line>
                            <text x="270" y="265" font-size="10" text-anchor="middle">0.0</text><line x1="270" y1="250" x2="270" y2="245" stroke="#9ca3af" stroke-width="1"></line>
                            <text x="345" y="265" font-size="10" text-anchor="middle">1.0</text><line x1="345" y1="250" x2="345" y2="245" stroke="#9ca3af" stroke-width="1"></line>
                            <text x="420" y="290" font-size="10" text-anchor="end">노광량 (Log Exposure) →</text><text x="20" y="50" font-size="10" text-anchor="middle" transform="rotate(-90 20,50)">농도 (Density) →</text>
                            <path d="M 120 240 Q 150 230, 190 180 T 320 70 L 360 60" stroke="#DB2777" stroke-width="2.5" fill="none"></path>
                            <path d="M 190 240 Q 220 230, 250 150 T 340 55 L 380 50" stroke="#059669" stroke-width="2.5" fill="none"></path>
                        </svg>
                    </div>
                    <div class="mt-6 space-y-4 text-sm text-gray-700 leading-relaxed">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="bg-pink-50 p-3 rounded-lg border border-pink-200"><h4 class="font-bold text-pink-800">고감도 필름 (예: ISO 400)</h4><p class="mt-1 text-xs">적은 빛(낮은 노광량)에도 빠르게 반응하여 곡선이 왼쪽에 위치합니다. 일반적으로 관용도가 넓고 입자가 거칠며, 콘트라스트가 부드러운(낮은 감마) 특성을 가집니다.</p></div><div class="bg-green-50 p-3 rounded-lg border border-green-200"><h4 class="font-bold text-green-800">저감도 필름 (예: ISO 100)</h4><p class="mt-1 text-xs">많은 빛(높은 노광량)이 필요하므로 곡선이 오른쪽에 위치합니다. 일반적으로 입자가 곱고 해상력이 높으며, 콘트라스트가 강한(높은 감마) 특성을 보입니다.</p></div></div>
                        <div class="pt-4 border-t">
                            <div class="space-y-3">
                                <div><h4 class="font-semibold text-gray-800">① 베이스+포그 농도 (Base+Fog)</h4><p class="mt-1">빛에 전혀 노출되지 않아도 필름 자체의 지지체(Base)가 가진 최소한의 농도와, 현상 과정에서 화학적으로 발생하는 포그(Fog)가 더해진 초기 농도입니다. 그래프에서 곡선이 시작되는 가장 낮은 높이에 해당합니다.</p></div>
                                <div><h4 class="font-semibold text-gray-800">② 발끝 부분 (Toe)</h4><p class="mt-1">이미지의 가장 어두운 영역(섀도우)의 정보를 담는 부분입니다. 곡선이 누워있어 노광량이 변해도 농도 변화가 적기 때문에, 이 영역의 계조 표현은 압축되어 콘트라스트가 낮습니다.</p></div>
                                <div><h4 class="font-semibold text-gray-800">③ 직선부 (Straight-line)</h4><p class="mt-1">이미지의 중간 톤(Mid-tone)을 담당하는 가장 중요한 영역입니다. 노광량의 변화와 농도의 변화가 정비례 관계를 가져, 가장 풍부하고 정확한 계조를 표현합니다. 이 직선의 기울기가 사진의 콘트라스트를 결정합니다.</p></div>
                                <div><h4 class="font-semibold text-gray-800">④ 어깨 부분 (Shoulder)</h4><p class="mt-1">이미지의 가장 밝은 영역(하이라이트) 정보를 담습니다. 곡선이 다시 눕기 시작하며 노광량이 증가해도 농도 변화가 둔해집니다. 하이라이트의 계조가 압축되어 표현됩니다.</p></div>
                                <div><h4 class="font-semibold text-gray-800">⑤ 최대 농도 (D-max)</h4><p class="mt-1">해당 필름과 현상 조건에서 얻을 수 있는 가장 높은 농도값입니다. 이 이상 노광을 주어도 농도는 더 이상 증가하지 않습니다.</p></div>
                                <div><h4 class="font-semibold text-gray-800">⑥ 솔라리제이션 (Solarization)</h4><p class="mt-1">극심한 과다 노광이 발생했을 때 오히려 농도가 다시 감소하는 현상입니다. 이로 인해 이미지의 밝고 어두움이 반전되어 독특한 시각 효과를 만들어냅니다.</p></div>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t mt-4">
                                    <div><h4 class="font-semibold text-gray-800">감마 (Gamma, γ)</h4><p class="mt-1">특성곡선의 직선부 기울기만을 측정한 값으로, 필름의 순수한 콘트라스트 특성을 나타냅니다. 일반적인 흑백 필름의 **표준 감마는 약 0.6**이며, 감마값이 높을수록 고대비(High Contrast) 필름입니다.</p></div>
                                    <div><h4 class="font-semibold text-gray-800">콘트라스트 인덱스 (Contrast Index, C.I)</h4><p class="mt-1">발끝 부분(Toe)과 직선부 일부를 포함한, 실제 사진에서 유효하게 사용되는 영역의 평균 기울기입니다. 감마보다 더 실용적인 콘트라스트 지표로 활용됩니다.</p></div>
                                </div>
                            </div>
                        </div>
                    </div>`
            },
            {
                q: "존 시스템 (Zone System)",
                a: `
                    <p class="text-sm text-gray-600 mb-6 text-center max-w-2xl mx-auto">안셀 아담스가 창시한 톤 재현 이론으로, 장면의 밝기를 순수한 검정(Zone 0)부터 순수한 흰색(Zone X)까지 11단계로 나누어 예측하고 제어하는 시스템입니다. 이를 통해 촬영자는 최종 결과물을 미리 상상하고 정확한 노출을 결정할 수 있습니다.</p>
                    <div class="grid grid-cols-6 md:grid-cols-11 gap-2 text-xs font-medium">
                        <div class="zone-block flex flex-col items-center justify-between p-2 rounded-lg bg-[#1a1a1a] text-white"><div class="text-2xl font-bold">0</div><div class="border-t border-gray-600 pt-1 mt-1 text-center leading-tight w-full">순수 검정<br>무질감</div></div>
                        <div class="zone-block flex flex-col items-center justify-between p-2 rounded-lg bg-[#2d2d2d] text-white"><div class="text-2xl font-bold">I</div><div class="border-t border-gray-500 pt-1 mt-1 text-center leading-tight w-full">거의 검정<br>최소 질감</div></div>
                        <div class="zone-block flex flex-col items-center justify-between p-2 rounded-lg bg-[#404040] text-white"><div class="text-2xl font-bold">II</div><div class="border-t border-gray-400 pt-1 mt-1 text-center leading-tight w-full">어두운 섀도우<br>질감 시작</div></div>
                        <div class="zone-block flex flex-col items-center justify-between p-2 rounded-lg bg-[#535353] text-white"><div class="text-2xl font-bold">III</div><div class="border-t border-gray-300 pt-1 mt-1 text-center leading-tight w-full">평균 어두운 톤<br>디테일 있음</div></div>
                        <div class="zone-block flex flex-col items-center justify-between p-2 rounded-lg bg-[#666666] text-white"><div class="text-2xl font-bold">IV</div><div class="border-t border-gray-200 pt-1 mt-1 text-center leading-tight w-full">어두운 피부톤<br>짙은 그림자</div></div>
                        <div class="zone-block flex flex-col items-center justify-between p-2 rounded-lg bg-[#7a7a7a] text-white"><div class="text-2xl font-bold">V</div><div class="border-t border-gray-100 pt-1 mt-1 text-center leading-tight w-full">18% 중간 회색<br>평균 피부톤</div></div>
                        <div class="zone-block flex flex-col items-center justify-between p-2 rounded-lg bg-[#8d8d8d] text-gray-800"><div class="text-2xl font-bold">VI</div><div class="border-t border-gray-400 pt-1 mt-1 text-center leading-tight w-full">밝은 피부톤<br>하늘 질감</div></div>
                        <div class="zone-block flex flex-col items-center justify-between p-2 rounded-lg bg-[#a0a0a0] text-gray-800"><div class="text-2xl font-bold">VII</div><div class="border-t border-gray-500 pt-1 mt-1 text-center leading-tight w-full">밝은 톤<br>질감 표현 한계</div></div>
                        <div class="zone-block flex flex-col items-center justify-between p-2 rounded-lg bg-[#b3b3b3] text-gray-800"><div class="text-2xl font-bold">VIII</div><div class="border-t border-gray-600 pt-1 mt-1 text-center leading-tight w-full">흰색에 가까움<br>약한 디테일</div></div>
                        <div class="zone-block flex flex-col items-center justify-between p-2 rounded-lg bg-[#c6c6c6] text-gray-800"><div class="text-2xl font-bold">IX</div><div class="border-t border-gray-700 pt-1 mt-1 text-center leading-tight w-full">순백색 질감<br>디테일 없음</div></div>
                        <div class="zone-block flex flex-col items-center justify-between p-2 rounded-lg bg-[#e0e0e0] text-gray-800"><div class="text-2xl font-bold">X</div><div class="border-t border-gray-700 pt-1 mt-1 text-center leading-tight w-full">순수 흰색<br>무질감</div></div>
                    </div>`
            }
        ];

        html = visualizationContent.map((item) => `
            <div class="content-card mb-4">
                <div class="question p-6 flex justify-between items-center">
                    <h3 class="text-lg font-bold text-gray-800">${item.q}</h3>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="answer border-t border-gray-200">
                    <div class="p-6">${item.a}</div>
                </div>
            </div>
        `).join('');

    } else if (category === 'cms') {
        html = `
             <div class="max-w-4xl mx-auto">
                 <header class="text-center mb-8">
                     <h1 class="text-3xl md:text-4xl font-bold text-gray-800">디지털 색 관리 시스템(CMS) 이해하기</h1>
                     <p class="text-gray-600 mt-2">카메라부터 모니터, 프린터까지 모든 장비에서 일관된 색상을 유지하는 방법</p>
                 </header>
                 <div class="content-card mb-4">
                     <div class="question p-6 flex justify-between items-center">
                         <h3 class="text-lg font-bold text-gray-800">1. 색 관리 시스템(CMS)이란?</h3>
                         <i class="fas fa-chevron-down"></i>
                     </div>
                     <div class="answer border-t border-gray-200">
                         <div class="p-6">
                             <div class="text-center text-sm text-gray-600 mb-6">카메라, 모니터, 프린터 등 서로 다른 장비들이 각자의 방식으로 색을 표현하기 때문에 발생하는 색상 차이를 최소화하고, 원본의 색을 모든 장비에서 일관되게 보이도록 관리하는 과정입니다.</div>
                             <div class="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-4 text-center">
                                 <div class="diagram-item"><div class="w-24 h-24 bg-gradient-to-br from-red-500 to-yellow-400 rounded-full flex items-center justify-center text-white font-bold mb-2 shadow-lg">현실</div><p class="text-sm font-semibold">원본 색상</p><p class="text-xs text-gray-500">실제 세상의 색</p></div>
                                 <i class="fas fa-arrow-right text-2xl text-gray-400 hidden md:block"></i><i class="fas fa-arrow-down text-2xl text-gray-400 md:hidden"></i>
                                 <div class="diagram-item"><div class="diagram-icon-box"><i class="fas fa-camera text-4xl text-blue-600"></i><div class="profile-tag bg-blue-100 text-blue-800">입력 프로파일</div></div><p class="text-sm font-semibold">촬영 (색상 정의)</p><p class="text-xs text-gray-500">(sRGB, AdobeRGB)</p></div>
                                 <i class="fas fa-arrow-right text-2xl text-gray-400 hidden md:block"></i><i class="fas fa-arrow-down text-2xl text-gray-400 md:hidden"></i>
                                 <div class="diagram-item"><div class="diagram-icon-box"><i class="fas fa-desktop text-4xl text-green-600"></i><div class="profile-tag bg-green-100 text-green-800">작업/모니터 프로파일</div></div><p class="text-sm font-semibold">편집 (색상 확인)</p><p class="text-xs text-gray-500">(모니터 프로파일)</p></div>
                                 <i class="fas fa-arrow-right text-2xl text-gray-400 hidden md:block"></i><i class="fas fa-arrow-down text-2xl text-gray-400 md:hidden"></i>
                                 <div class="diagram-item"><div class="diagram-icon-box"><i class="fas fa-print text-4xl text-purple-600"></i><div class="profile-tag bg-purple-100 text-purple-800">출력 프로파일</div></div><p class="text-sm font-semibold">출력 (색상 재현)</p><p class="text-xs text-gray-500">(프린터/용지 프로파일)</p></div>
                             </div>
                         </div>
                     </div>
                 </div>
                 <div class="content-card mb-4">
                     <div class="question p-6 flex justify-between items-center">
                         <h3 class="text-lg font-bold text-gray-800">2. 색 공간(Color Space)의 종류</h3>
                         <i class="fas fa-chevron-down"></i>
                     </div>
                     <div class="answer border-t border-gray-200">
                         <div class="p-6 space-y-6">
                             <p class="text-sm text-gray-600">색 공간은 색상을 수학적으로 표현하는 모델입니다. CMS에서는 이들을 크게 '장치 독립적인 공간'과 '장치 의존적인 공간'으로 나눕니다.</p>
                             <div class="grid md:grid-cols-2 gap-6">
                                 <div class="bg-gray-50 p-4 rounded-lg border"><h4 class="font-bold text-gray-700 flex items-center"><i class="fas fa-globe mr-2 text-sky-500"></i>장치 독립 색 공간 (PCS)</h4><p class="text-sm text-gray-600 mt-2">특정 장비에 구애받지 않는 절대적인 기준 색 공간입니다. 모든 색상 변환의 '중간 다리' 또는 '번역기' 역할을 합니다. 대표적으로 CIELAB, CIEXYZ가 있습니다.</p></div>
                                 <div class="bg-gray-50 p-4 rounded-lg border"><h4 class="font-bold text-gray-700 flex items-center"><i class="fas fa-cogs mr-2 text-amber-500"></i>장치 의존 색 공간 (ICC Profile)</h4><p class="text-sm text-gray-600 mt-2">카메라, 모니터, 프린터 등 특정 장비가 표현할 수 있는 색상의 범위(Gamut)와 특징을 정의한 데이터 파일입니다.</p></div>
                             </div>
                             <div>
                                 <h5 class="font-semibold text-md text-gray-800 mb-2">ICC 프로파일의 세부 종류</h5>
                                 <div class="space-y-3">
                                     <div class="bg-blue-50 p-3 rounded-md border border-blue-200"><p class="font-semibold text-blue-800">범용 (Standard)</p><p class="text-xs text-blue-700">sRGB, Adobe RGB (1998) 처럼 국제 표준으로 널리 사용되는 프로파일입니다. 웹, 일반 사진 등 대부분의 작업에서 기준으로 사용됩니다.<br><span class="font-medium text-gray-600">예: sRGB IEC61966-2.1, AdobeRGB1998.icc</span></p></div>
                                     <div class="bg-green-50 p-3 rounded-md border border-green-200"><p class="font-semibold text-green-800">제네릭 (Generic)</p><p class="text-xs text-green-700">모니터나 프린터 제조사에서 특정 모델을 위해 제공하는 기본 프로파일입니다. 어느 정도 정확하지만, 개별 장비의 미세한 차이나 노후화는 반영하지 못합니다.<br><span class="font-medium text-gray-600">예: DELL U2723QE.icc, EPSON Stylus Pro 7900 Premium Luster.icc</span></p></div>
                                     <div class="bg-yellow-50 p-3 rounded-md border border-yellow-200"><p class="font-semibold text-yellow-800">커스텀 (Custom)</p><p class="text-xs text-yellow-700">캘리브레이션 장비(계측기)를 사용하여 현재 내가 사용하는 장비의 상태를 직접 측정하여 생성한, 가장 정확한 맞춤형 프로파일입니다.<br><span class="font-medium text-gray-600">예: My_U2723QE_D65_120cd_231026.icc</span></p></div>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
                 <div class="content-card mb-4">
                     <div class="question p-6 flex justify-between items-center">
                         <h3 class="text-lg font-bold text-gray-800">3. 주요 작업별 색 공간(Color Space) 예시</h3>
                         <i class="fas fa-chevron-down"></i>
                     </div>
                     <div class="answer border-t border-gray-200">
                         <div class="p-6 space-y-4">
                             <p class="text-sm text-gray-600">작업 목적(웹, 인쇄, 영상 등)에 따라 각기 다른 표준 색 공간이 사용되며, 이들은 모두 아래의 장치 독립 색 공간을 기준으로 변환됩니다.</p>
                             <div class="grid md:grid-cols-2 gap-4">
                                 <div class="bg-gray-50 p-4 rounded-lg border"><h4 class="font-bold text-gray-700 flex items-center mb-2"><i class="fas fa-image mr-2 text-rose-500"></i>RGB (사진/웹/디스플레이)</h4><ul class="space-y-2 text-xs text-gray-600"><li><strong class="font-semibold text-gray-800">sRGB:</strong> 웹 표준. 대부분의 모니터, 스마트폰, 일반 디지털 카메라의 기본 색 공간으로 가장 범용성이 높습니다.</li><li><strong class="font-semibold text-gray-800">Adobe RGB (1998):</strong> sRGB보다 녹색, 청록색 표현 범위가 넓어 인쇄를 염두에 둔 사진 작업에 유리합니다.</li><li><strong class="font-semibold text-gray-800">Display P3:</strong> Apple 기기(아이폰, 맥북 등)에서 표준으로 사용하며, sRGB보다 넓은 색역을 가집니다. 디지털 시네마 표준(DCI-P3)에 기반합니다.</li><li><strong class="font-semibold text-gray-800">ProPhoto RGB:</strong> 매우 넓은 색역을 가져 디지털 카메라가 기록하는 대부분의 색을 포함합니다. 후보정 시 색 손실을 최소화하기 위해 전문가들이 16비트 환경에서 사용합니다.</li></ul></div>
                                 <div class="bg-gray-50 p-4 rounded-lg border"><h4 class="font-bold text-gray-700 flex items-center mb-2"><i class="fas fa-print mr-2 text-cyan-500"></i>CMYK (인쇄)</h4><ul class="space-y-2 text-xs text-gray-600"><li><strong class="font-semibold text-gray-800">U.S. Web Coated (SWOP) v2:</strong> 북미 지역의 잡지, 카탈로그 등 코팅 용지 웹 오프셋 인쇄 표준입니다.</li><li><strong class="font-semibold text-gray-800">ISO Coated v2 (ECI):</strong> 유럽 지역의 코팅 용지 인쇄 표준으로 널리 사용됩니다.</li><li><strong class="font-semibold text-gray-800">Japan Color 2001 Coated:</strong> 일본의 인쇄 표준 색 공간입니다.</li></ul></div>
                                 <div class="bg-gray-50 p-4 rounded-lg border"><h4 class="font-bold text-gray-700 flex items-center mb-2"><i class="fas fa-film mr-2 text-indigo-500"></i>영상 (Video)</h4><ul class="space-y-2 text-xs text-gray-600"><li><strong class="font-semibold text-gray-800">Rec. 709:</strong> HDTV 방송의 표준 색 공간입니다. 색역 크기는 sRGB와 거의 동일합니다.</li><li><strong class="font-semibold text-gray-800">Rec. 2020:</strong> UHDTV(4K, 8K)를 위한 표준으로, Rec. 709보다 훨씬 넓은 색역을 가집니다.</li></ul></div>
                                 <div class="bg-gray-50 p-4 rounded-lg border"><h4 class="font-bold text-gray-700 flex items-center mb-2"><i class="fas fa-adjust mr-2 text-gray-500"></i>흑백 (Grayscale)</h4><ul class="space-y-2 text-xs text-gray-600"><li><strong class="font-semibold text-gray-800">Gray Gamma 2.2:</strong> 감마 2.2를 기준으로 하는 일반적인 흑백 표준입니다.</li><li><strong class="font-semibold text-gray-800">Dot Gain (망점 이득):</strong> 인쇄 시 잉크가 종이에 번지는 현상을 미리 계산에 넣은 프로파일입니다. (예: Dot Gain 15%)</li></ul></div>
                                 <div class="bg-gray-50 p-4 rounded-lg border md:col-span-2"><h4 class="font-bold text-gray-700 flex items-center mb-2"><i class="fas fa-globe mr-2 text-sky-500"></i>기준: 장치 독립 색 공간 (PCS)</h4><ul class="space-y-2 text-xs text-gray-600"><li><strong class="font-semibold text-gray-800">CIELAB (L*a*b*):</strong> 인간의 시각 체계와 가장 유사하게 색을 표현하는 공간입니다. L*(명도), a*(빨강-초록), b*(노랑-파랑)의 3가지 요소로 색을 정의하며, CMS에서 색상 변환의 핵심 기준점으로 사용됩니다.</li><li><strong class="font-semibold text-gray-800">CIEXYZ:</strong> 인간이 지각할 수 있는 모든 색상을 3개의 가상 원색(X, Y, Z) 값으로 표현하는 최초의 수학적 색 공간입니다. 다른 모든 색 공간을 정의하고 비교하는 근간이 됩니다.</li></ul></div>
                             </div>
                         </div>
                     </div>
                 </div>
                 <div class="content-card mb-4">
                     <div class="question p-6 flex justify-between items-center">
                         <h3 class="text-lg font-bold text-gray-800">4. 캘리브레이션 vs. 프로파일링</h3>
                         <i class="fas fa-chevron-down"></i>
                     </div>
                     <div class="answer border-t border-gray-200">
                         <div class="p-6 space-y-4">
                             <p class="text-sm text-gray-600">두 용어는 자주 혼용되지만 의미가 다릅니다. 캘리브레이션이 선행되어야 정확한 프로파일링이 가능합니다.</p>
                             <div class="flex flex-col md:flex-row items-stretch justify-center gap-6">
                                 <div class="w-full md:w-1/2 bg-indigo-50 p-4 rounded-lg border border-indigo-200 text-center"><i class="fas fa-sliders-h text-3xl text-indigo-500 mb-2"></i><h4 class="font-bold text-indigo-800">캘리브레이션 (Calibration)</h4><p class="text-sm text-indigo-700 mt-2">장비를 미리 정해진 <span class="font-semibold">표준 상태(밝기, 색온도, 감마 등)로 조정</span>하는 과정입니다. 일관된 결과물을 얻기 위한 사전 준비 작업입니다.</p></div>
                                 <div class="w-full md:w-1/2 bg-teal-50 p-4 rounded-lg border border-teal-200 text-center"><i class="fas fa-ruler-combined text-3xl text-teal-500 mb-2"></i><h4 class="font-bold text-teal-800">프로파일링 (Profiling)</h4><p class="text-sm text-teal-700 mt-2">캘리브레이션 된 장비가 색상을 어떻게 표현하는지 <span class="font-semibold">정확히 측정하여 그 특성을 파일(ICC Profile)로 기록</span>하는 과정입니다.</p></div>
                             </div>
                             <div class="mt-4 pt-4 border-t"><h5 class="font-semibold text-md text-gray-800 mb-2">각 장비의 캘리브레이션 & 프로파일링</h5><p class="text-sm text-gray-600 mb-2"><span class="font-semibold text-gray-700">모니터:</span> 전용 센서(계측기)를 모니터에 부착하여 목표한 밝기(Luminance), 백색점(White Point), 감마(Gamma) 값에 맞도록 조정한 후, 측정된 색상 표현 특성을 모니터 프로파일로 저장합니다.</p><p class="text-sm text-gray-600"><span class="font-semibold text-gray-700">프린터:</span> 특정 프린터, 잉크, 용지 조합으로 정해진 색상 패치를 인쇄하고, 분광측색계(Spectrophotometer)로 각 패치의 색상을 정밀하게 측정하여 해당 조합에 맞는 프린터 프로파일을 생성합니다.</p></div>
                         </div>
                     </div>
                 </div>
             </div>`;
    } else {
        // --- 퀴즈 카드 그리드 렌더링 로직 ---
        let itemsToRender = [];
        if (searchTerm) {
            const jamoSearch = (typeof Jamo !== 'undefined') ? Jamo.jamo(searchTerm.toLowerCase()) : '';
            const allData = Object.values(photographyData).flat();
            itemsToRender = allData.filter(item => item && item.q && (item.q.toLowerCase().includes(searchTerm.toLowerCase()) || item.a.toLowerCase().includes(searchTerm.toLowerCase()) || (jamoSearch && Jamo.jamo(item.q.toLowerCase()).includes(jamoSearch))));
        } else {
            itemsToRender = photographyData[category] || [];
        }

        if (itemsToRender.length > 0) {
            const cardsHtml = itemsToRender.map((item) => `
                <div class="quiz-card">
                    <div class="quiz-card-inner">
                        <div class="quiz-card-front">
                            <h3 class="quiz-card-question">${item.q}</h3>
                        </div>
                        <div class="quiz-card-back">
                            <div class="quiz-card-answer-text">
                                <p>${item.a.replace(/\n/g, '<br>')}</p>
                            </div>
                            <div class="mt-4 flex flex-wrap gap-2 justify-center">
                                <button class="gemini-btn text-xs font-semibold py-1 px-3 rounded-full" data-action="explain" data-q="${item.q.replace(/"/g, '&quot;')}" data-a="${item.a.replace(/"/g, '&quot;')}">✨ 쉽게 설명</button>
                                <button class="gemini-btn text-xs font-semibold py-1 px-3 rounded-full" data-action="deepen" data-q="${item.q.replace(/"/g, '&quot;')}" data-a="${item.a.replace(/"/g, '&quot;')}">✨ 깊이 알아보기</button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
            html = `<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">${cardsHtml}</div>`;
        } else {
            const categoryTitle = document.querySelector(`[data-category="${category}"]`)?.textContent || "콘텐츠";
            html = `<div class="content-card p-8 text-center"><h2 class="text-2xl font-bold text-gray-800 mb-4">검색 결과 없음 😢</h2><p class="text-gray-600">'<span id="search-term">${searchTerm}</span>'에 대한 검색 결과를 찾을 수 없습니다.</p><p class="mt-4 text-sm text-gray-500">오타를 확인하시거나 다른 검색어로 다시 시도해 보세요.</p></div>`;
        }
    }
    mainContent.innerHTML = html;
    
    if (category === 'visualization' || category === 'cms') {
        setupEventListeners();
    } else if (category !== 'home') {
        setupCardFlipListeners();
    }
    
    setupGeminiButtons(); 
    
    if (category === 'visualization') {
        setTimeout(() => {
            const updateChart = (chartName, stopType) => { const data = visualizationData[chartName][stopType]; const color = chartName === 'aperture' ? ['rgba(75, 192, 192, 0.6)', 'rgba(75, 192, 192, 1)'] : ['rgba(255, 159, 64, 0.6)', 'rgba(255, 159, 64, 1)']; createChart(`${chartName}Chart`, chartName, data, color[0], color[1]); };
            updateChart('aperture', 'fullStop');
            updateChart('shutter', 'fullStop');
            document.querySelectorAll('.stop-btn').forEach(button => { button.addEventListener('click', (e) => { const chart = e.target.dataset.chart; const stop = e.target.dataset.stop; document.querySelectorAll(`[data-chart="${chart}"]`).forEach(btn => btn.classList.remove('active')); e.target.classList.add('active'); updateChart(chart, stop); }); });
        }, 0);
    }
}
function handleNavClick(e) {
    e.preventDefault();
    const targetLink = e.target.closest('a');
    if (!targetLink) return;
    const category = targetLink.dataset.category;
    searchInput.value = '';
    document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
    targetLink.classList.add('active');
    renderContent(category);
}

document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', handleNavClick));
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value;
    if (searchTerm.length > 0) {
        document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
        renderContent(null, searchTerm);
    } else {
        // If search is cleared, click the first nav item (home)
        const activeOrHomeLink = document.querySelector('.nav-item.active') || document.querySelector('[data-category="home"]');
        if (activeOrHomeLink) {
            activeOrHomeLink.click();
        }
    }
});

function setupGeminiButtons() {
    document.querySelectorAll('.gemini-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const action = e.target.dataset.action;
            const question = e.target.dataset.q;
            const answer = e.target.dataset.a;

            // 캐시 키 생성: "action-question" 형태로 만듭니다.
            const cacheKey = `${action}-${question}`;

            modalTitle.textContent = `"${question}" ${action === 'explain' ? '쉽게 이해하기' : '깊이 알아보기'}`;

            // 캐시된 데이터가 있는지 확인
            const cachedResponse = localStorage.getItem(cacheKey);
            if (cachedResponse) {
                console.log('캐시된 답변을 사용합니다.');
                modalBody.innerHTML = `<p>${cachedResponse.replace(/\n/g, '<br>')}</p>`;
                showModal();
                return; // API 호출 없이 바로 종료
            }

            let prompt = '';
            if (action === 'explain') {
                prompt = `사진학 용어인 "${question}"에 대해 핵심만 짚어 입시생이 면접 시험에서 바로 활용할 수 있도록 간결하게 설명해줘. 설명: ${answer}`;
            } else if (action === 'deepen') {
                prompt = `사진학 개념인 "${question}"에 대해 더 깊이 알고 싶어. 다음 기본 설명을 바탕으로, 관련된 심화 개념, 역사적 배경, 또는 실전 촬영 팁을 포함하여 전문가 수준의 추가 정보를 제공해줘. 단 800자 내외로. 설명: ${answer}`;
            }

            if (prompt) {
                const responseText = await callGemini(prompt, false);
                modalBody.innerHTML = `<p>${responseText.replace(/\n/g, '<br>')}</p>`;

                // 새로운 답변을 로컬 스토리지에 캐시합니다.
                localStorage.setItem(cacheKey, responseText);
            }
        });
    });
}

function handleNavClick(e) {
    e.preventDefault();
    const targetLink = e.target.closest('a');
    if (!targetLink) return;
    const category = targetLink.dataset.category;
    searchInput.value = '';
    document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
    targetLink.classList.add('active');
    renderContent(category);
}

document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', handleNavClick));
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value;
    if (searchTerm.length > 0) {
        document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
        renderContent(null, searchTerm);
    } else {
        const activeOrHomeLink = document.querySelector('.nav-item.active') || document.querySelector('[data-category="home"]');
        if (activeOrHomeLink) {
            activeOrHomeLink.click();
        }
    }
});

// AI 퀴즈 생성 버튼 이벤트
quizBtn.addEventListener('click', generateQuiz);

// 모달 닫기 이벤트
closeModal.addEventListener('click', hideModal);
geminiModal.addEventListener('click', (e) => {
    if (e.target === geminiModal) hideModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && !geminiModal.classList.contains('hidden')) hideModal();
});

// 초기 화면 로드
renderContent('home');
