const assert = require('assert');
const data = require('./photographyData.js');

assert.ok(
  data.exposure.some((item) => item.q === '존 시스템 (Zone System)'),
  'Zone System entry should exist in exposure array'
);

console.log('Tests passed');
