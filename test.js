const assert = require('assert');
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

console.log('Tests passed');
