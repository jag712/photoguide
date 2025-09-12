const assert = require('assert');
const fs = require('fs');
const vm = require('vm');
const { JSDOM } = require('jsdom');

// Load photography data and verify importance field
const dataSandbox = { module: {}, window: {} };
vm.runInNewContext(
  fs.readFileSync('./photographyData.js', 'utf8') + '\nmodule.exports = photographyData;',
  dataSandbox
);
const data = dataSandbox.module.exports;
global.photographyData = data;
Object.values(data).flat().forEach((item) => {
  assert.ok(
    typeof item.importance === 'number' && item.importance >= 1 && item.importance <= 3,
    'importance should be between 1 and 3'
  );
});

// Setup minimal DOM for renderContent
const dom = new JSDOM('<!DOCTYPE html><div id="mainContent"></div><input id="searchInput"><button id="quizBtn"></button><button id="practiceBtn"></button><div id="geminiModal"></div><div id="modalTitle"></div><div id="modalBody"></div><button id="closeModal"></button>');
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

// Load main.js and stub out side-effect functions
vm.runInThisContext(fs.readFileSync('./main.js', 'utf8'));
global.setupEventListeners = () => {};
global.setupCardFlipListeners = () => {};
global.setupGeminiButtons = () => {};

renderContent('structure');
const html = document.getElementById('mainContent').innerHTML;
assert.ok(html.includes('⭐'), 'star rating should be rendered');

console.log('Tests passed');
