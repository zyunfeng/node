// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';
const common = require('../common');
const assert = require('assert');

// the default behavior, return an Array "tuple" of numbers
const tuple = process.hrtime();

// validate the default behavior
validateTuple(tuple);

// validate that passing an existing tuple returns another valid tuple
validateTuple(process.hrtime(tuple));

// test that only an Array may be passed to process.hrtime()
assert.throws(() => {
  process.hrtime(1);
}, common.expectsError({
  code: 'ERR_INVALID_ARG_TYPE',
  type: TypeError,
  message: 'The "time" argument must be of type Array. Received type number'
}));
assert.throws(() => {
  process.hrtime([]);
}, common.expectsError({
  code: 'ERR_INVALID_ARRAY_LENGTH',
  type: TypeError,
  message: 'The "time" array must have a length of 2. Received length 0'
}));
assert.throws(() => {
  process.hrtime([1]);
}, common.expectsError({
  code: 'ERR_INVALID_ARRAY_LENGTH',
  type: TypeError,
  message: 'The "time" array must have a length of 2. Received length 1'
}));
assert.throws(() => {
  process.hrtime([1, 2, 3]);
}, common.expectsError({
  code: 'ERR_INVALID_ARRAY_LENGTH',
  type: TypeError,
  message: 'The "time" array must have a length of 2. Received length 3'
}));

function validateTuple(tuple) {
  assert(Array.isArray(tuple));
  assert.strictEqual(tuple.length, 2);
  assert(Number.isInteger(tuple[0]));
  assert(Number.isInteger(tuple[1]));
}

const diff = process.hrtime([0, 1e9 - 1]);
assert(diff[1] >= 0);  // https://github.com/nodejs/node/issues/4751
