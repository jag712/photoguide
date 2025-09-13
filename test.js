const assert = require('assert');
const fs = require('fs');
const { JSDOM } = require('jsdom');
const data = require('./photographyData.js');
const { calculateScore, getPracticeMessage } = require('./scoring.js');

assert.ok(
  data.exposure.some((item) => item.q === '존 시스템 (Zone System)'),
  'Zone System entry should exist in exposure array',
);

assert.strictEqual(calculateScore('Zone System', 'Zone System'), 5);
assert.ok(calculateScore('zone systm', 'Zone System') >= 4);
assert.ok(calculateScore('photo', 'photograph') >= 4);
const partial = calculateScore('Zone', 'Zone System');
assert.ok(partial >= 2 && partial <= 3);
assert.strictEqual(calculateScore('aperture', 'banana'), 1);

// ensure answer_short fields exist
assert.ok(
  data.structure[0].answer_short &&
    data.structure[0].answer_short.length < data.structure[0].a.length,
  'answer_short should be shorter than full answer',
);

// fuzzy matching and synonyms
assert.ok(calculateScore('camra', 'camera') >= 4);
assert.ok(calculateScore('af', 'autofocus') >= 4);
// tests/quiz.test.js
// 모듈은 상단에서 이미 import 되었으므로 재선언을 제거했습니다.

// --- 1) 내비게이션에 퀴즈 탭 존재 확인 ---
const html = fs.readFileSync('index.html', 'utf8');
assert.ok(
  html.includes('data-category="quiz"'),
  'Quiz nav item should exist'
);

// --- 2) 퀴즈 페이지 렌더링 및 컨트롤 확인 ---
const dom = new JSDOM(`<!doctype html><html><body>
<nav><a class="nav-item" data-category="quiz">퀴즈</a></nav>
<input id="searchInput">
<div id="mainContent"></div>
<div id="geminiModal" class="hidden"></div>
<div id="modalTitle"></div>
<div id="modalBody"></div>
<button id="closeModal"></button>
</body></html>`, { runScripts: 'dangerously' });

global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

// 프로젝트 스크립트 로드 (순서 중요: 데이터 → 스코어링 → 메인)
dom.window.eval(fs.readFileSync('photographyData.js', 'utf8'));
dom.window.eval(fs.readFileSync('scoring.js', 'utf8'));
dom.window.eval(fs.readFileSync('main.js', 'utf8'));

// 라우팅으로 퀴즈 페이지 표시
if (typeof dom.window.renderContent === 'function') {
  dom.window.renderContent('quiz');
}

// 버튼 존재 확인
assert.ok(dom.window.document.getElementById('quizBtn'), 'quizBtn should exist on quiz page');
assert.ok(dom.window.document.getElementById('practiceBtn'), 'practiceBtn should exist on quiz page');

// --- 3) 격려 메시지 헬퍼 확인 (호환 이름 포함) ---
const getMsg =
  dom.window.getPracticeMessage ||
  dom.window.getEncouragementMessage ||     // 구버전 호환
  global.getPracticeMessage ||
  global.getEncouragementMessage;

assert.ok(typeof getMsg === 'function', 'getPracticeMessage (or alias) should be available');

// 점수 구간별 메시지 검증
assert.strictEqual(getMsg(95), '대단해요!');
assert.strictEqual(getMsg(75), '좋은 성과예요!');
assert.strictEqual(getMsg(55), '조금만 더 힘내요!');
assert.strictEqual(getMsg(30), '시작이 반이에요!');

console.log('Tests passed');
