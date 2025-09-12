const assert = require('assert');
const fs = require('fs');
const { JSDOM } = require('jsdom');
const data = require('./photographyData.js');
const { calculateScore } = require('./scoring.js');

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

// navigation should include quiz tab
const html = fs.readFileSync('index.html', 'utf8');
assert.ok(html.includes('data-category="quiz"'), 'Quiz nav item should exist');

// render quiz page and check controls
const dom = new JSDOM(`<!doctype html><html><body>
<nav><a class="nav-item" data-category="quiz"></a></nav>
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
dom.window.eval(fs.readFileSync('photographyData.js', 'utf8'));
dom.window.eval(fs.readFileSync('scoring.js', 'utf8'));
dom.window.eval(fs.readFileSync('main.js', 'utf8'));
dom.window.renderContent('quiz');
assert.ok(dom.window.document.getElementById('quizBtn'));
assert.ok(dom.window.document.getElementById('practiceBtn'));

// encouraging messages
assert.strictEqual(dom.window.getPracticeMessage(95), '대단해요!');
assert.strictEqual(dom.window.getPracticeMessage(75), '좋은 성과예요!');
assert.strictEqual(dom.window.getPracticeMessage(55), '조금만 더 힘내요!');
assert.strictEqual(dom.window.getPracticeMessage(30), '시작이 반이에요!');

console.log('Tests passed');
