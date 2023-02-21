import { getArgs } from './args';

describe('getArgs', () => {
	test('returns an empty object when there are no arguments', () => {
		expect(getArgs([])).toEqual({});
	});

	test('returns an object with the correct keys and values when there are arguments', () => {
		const args = ['node', 'index.js', '-a', 'foo', '-b', '-c'];
		const expected = { a: 'foo', b: true, c: true };
		expect(getArgs(args)).toEqual(expected);
	});

	test('returns an object with the correct keys and values when an argument has no value', () => {
		const args = ['node', 'index.js', '-a', '-b', '-c'];
		const expected = { a: true, b: true, c: true };
		expect(getArgs(args)).toEqual(expected);
	});
});
