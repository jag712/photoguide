// app.js
(() => {
  const data = window.photographyData; // 데이터 접근

  // ---- 상태 ----
  let quizInFlight = false;
  const GHOST_AI_ENDPOINT = "/.netlify/functions/gemini-proxy"; // Netlify Functions 경로

  // ---- DOM ----
  function qs(sel) { return document.querySelector(sel); }
  function qsa(sel) { return Array.from(document.querySelectorAll(sel)); }

  // ---- 렌더러 (예시) ----
  function renderContent(category = 'home', searchTerm = '') {
    const main = qs('#mainContent');
    if (!main) return;

    if (searchTerm) {
      const all = Object.values(data).flat();
      const term = searchTerm.trim().toLowerCase();
      const results = all.filter(item =>
        (item.title || '').toLowerCase().includes(term) ||
        (item.subtitle || '').toLowerCase().includes(term) ||
        (item.desc || '').toLowerCase().includes(term)
      );
      main.innerHTML = renderCards(results, `“${searchTerm}” 검색 결과`);
      return;
    }

    if (category === 'home') {
      main.innerHTML = `<div class="text-xl font-bold">남은 일정</div>`;
      return;
    }

    const list = data[category] || [];
    main.innerHTML = renderCards(list, navTitle(category));
  }

  function renderCards(list, title) {
    const cards = list.map(item => `
      <div class="p-4 bg-white rounded-xl shadow hover:shadow-md transition">
        <div class="text-sm text-gray-500">${item.subtitle || ''}</div>
        <div class="text-lg font-bold">${item.title || ''}</div>
        <div class="mt-2 text-sm text-gray-700">${item.desc || ''}</div>
      </div>
    `).join('');
    return `
      <h2 class="text-2xl font-bold mb-4">${title}</h2>
      <div class="grid md:grid-cols-3 gap-4">${cards}</div>
    `;
  }

  function navTitle(key) {
    const map = {
      visualization: '시각화',
      cms: 'CMS 가이드',
      structure: '카메라 구조와 원리',
      exposure: '노출',
      lens: '렌즈와 광학',
      digital: '디지털',
      film: '필름 현상 인화',
      lighting: '조명과 필터',
      history: '사진사 & 사조',
    };
    return map[key] || '콘텐츠';
  }

  // ---- AI 퀴즈 모달 ----
  function openModal(title, bodyHTML) {
    const overlay = qs('#geminiModal');
    const body = qs('#modalBody');
    const titleEl = qs('#modalTitle');
    if (!overlay || !body || !titleEl) return;

    titleEl.textContent = title || 'Gemini AI';
    body.innerHTML = bodyHTML || '';
    overlay.classList.remove('hidden');
    requestAnimationFrame(() => overlay.classList.remove('opacity-0'));
  }

  function closeModal() {
    const overlay = qs('#geminiModal');
    if (!overlay) return;
    overlay.classList.add('opacity-0');
    overlay.addEventListener('transitionend', () => overlay.classList.add('hidden'), { once: true });
  }

  async function generateQuiz() {
    if (quizInFlight) return;
    quizInFlight = true;

    const active = document.querySelector('.nav-item.active');
    const category = active ? active.dataset.category : 'home';
    const title = active ? active.textContent.trim() : '퀴즈';

    openModal(`${title} 퀴즈`, `
      <div class="flex items-center justify-center py-8">생성 중...</div>
    `);

    try {
      const prompt = `
        너는 사진 학습용 퀴즈 출제기이다.
        카테고리: ${category}.
        데이터 키워드(예시): ${(data[category] || []).slice(0,15).map(v => v.title || '').join(', ')}.
        객관식 5문제(정답 1개), 보기 4개, JSON으로 만들어라.
      `;

      const res = await fetch(GHOST_AI_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      if (!res.ok) throw new Error('AI 요청 실패');
      const payload = await res.json(); // { output: "..." } 형태라고 가정
      const quiz = safeParseJSON(payload.output) || safeParseJSON(payload) || payload;

      qs('#modalBody').innerHTML = renderQuiz(quiz);
    } catch (e) {
      qs('#modalBody').innerHTML = `
        <div class="text-red-600">퀴즈 생성 중 오류: ${e.message}</div>
      `;
    } finally {
      quizInFlight = false;
    }
  }

  function safeParseJSON(text) {
    try { return typeof text === 'string' ? JSON.parse(text) : text; }
    catch (_) {
      const m = String(text).match(/\{[\s\S]*\}/);
      if (m) { try { return JSON.parse(m[0]); } catch {} }
      return null;
    }
  }

  function renderQuiz(quiz) {
    if (!quiz || !Array.isArray(quiz.questions)) {
      return `<div class="text-sm text-gray-600">형식을 인식하지 못했어요. 다시 시도하세요.</div>`;
    }
    return `
      <div class="space-y-4">
        ${quiz.questions.map((q, i) => `
          <div class="p-4 bg-white rounded-xl shadow">
            <div class="font-semibold mb-2">${i+1}. ${q.question}</div>
            <div class="space-y-2">
              ${q.options.map((opt, idx) => `
                <button data-q="${i}" data-a="${idx}" class="answer w-full text-left px-3 py-2 rounded border hover:bg-gray-50">
                  ${String.fromCharCode(65+idx)}. ${opt}
                </button>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function onAnswerClick(e) {
    const btn = e.target.closest('.answer');
    if (!btn) return;
    const qIdx = Number(btn.dataset.q);
    const aIdx = Number(btn.dataset.a);
    // 정답 확인 로직은 AI가 준 정답 인덱스 기준(예: quiz.answers[qIdx] === aIdx)
    // 여기서는 단순 효과만:
    btn.style.animation = 'pulse-correct 300ms ease';
    setTimeout(() => btn.style.animation = '', 320);
  }

  // ---- 이벤트 바인딩 ----
  function bindEvents() {
    // 네비
    qsa('.nav-item').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        qsa('.nav-item').forEach(el => el.classList.remove('active'));
        a.classList.add('active');
        renderContent(a.dataset.category);
      });
    });

    // 검색
    const searchInput = qs('#searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        const s = searchInput.value.trim();
        if (s) {
          qsa('.nav-item').forEach(el => el.classList.remove('active'));
          renderContent(null, s);
        } else {
          qs('#homeLink')?.click();
        }
      });
    }

    // 모달 닫기
    qs('#closeModal')?.addEventListener('click', closeModal);
    qs('#geminiModal')?.addEventListener('click', (e) => {
      if (e.target.id === 'geminiModal') closeModal();
    });

    // 퀴즈 버튼
    qs('#quizBtn')?.addEventListener('click', generateQuiz);

    // 모달 내부 정답 클릭 위임
    qs('#modalBody')?.addEventListener('click', onAnswerClick);
  }

  // ---- 시작 ----
  function init() {
    bindEvents();
    renderContent('home');
  }

  // DOM이 다 만들어진 뒤 실행 (스크립트를 body 끝에 둔 경우에도 안전)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
