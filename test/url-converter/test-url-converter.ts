import { parseBskyUrl } from '../../src/utils.js';
import assert from 'assert';

// Test the parseBskyUrl function
console.log('Testing parseBskyUrl function...');

// Test 1: Valid URL
const testUrl1 = 'https://bsky.app/profile/joshuashew.bsky.social/post/3llxkmoufox2l';
const result1 = parseBskyUrl(testUrl1);
assert(result1 !== null, 'Should parse a valid URL');
assert(result1?.handle === 'joshuashew.bsky.social', `Handle should be 'joshuashew.bsky.social', got '${result1?.handle}'`);
assert(result1?.rkey === '3llxkmoufox2l', `rkey should be '3llxkmoufox2l', got '${result1?.rkey}'`);
console.log('✅ Test 1 passed: Valid URL parsed correctly');

// Test 2: URL with @ prefix
const testUrl2 = '@https://bsky.app/profile/joshuashew.bsky.social/post/3llxkmoufox2l';
const result2 = parseBskyUrl(testUrl2);
assert(result2 !== null, 'Should parse a URL with @ prefix');
assert(result2?.handle === 'joshuashew.bsky.social', `Handle should be 'joshuashew.bsky.social', got '${result2?.handle}'`);
assert(result2?.rkey === '3llxkmoufox2l', `rkey should be '3llxkmoufox2l', got '${result2?.rkey}'`);
console.log('✅ Test 2 passed: URL with @ prefix parsed correctly');

// Test 3: URL with whitespace
const testUrl3 = '  https://bsky.app/profile/joshuashew.bsky.social/post/3llxkmoufox2l  ';
const result3 = parseBskyUrl(testUrl3);
assert(result3 !== null, 'Should parse a URL with whitespace');
assert(result3?.handle === 'joshuashew.bsky.social', `Handle should be 'joshuashew.bsky.social', got '${result3?.handle}'`);
assert(result3?.rkey === '3llxkmoufox2l', `rkey should be '3llxkmoufox2l', got '${result3?.rkey}'`);
console.log('✅ Test 3 passed: URL with whitespace parsed correctly');

// Test 4: Invalid URL
const testUrl4 = 'https://example.com/invalid/url';
const result4 = parseBskyUrl(testUrl4);
assert(result4 === null, 'Should return null for an invalid URL');
console.log('✅ Test 4 passed: Invalid URL returns null');

// Test 5: Malformed but recognizable URL
const testUrl5 = 'bsky.app/profile/joshuashew.bsky.social/post/3llxkmoufox2l';
const result5 = parseBskyUrl(testUrl5);
assert(result5 === null, 'Should return null for a malformed URL');
console.log('✅ Test 5 passed: Malformed URL returns null');

console.log('\nAll tests passed!');
