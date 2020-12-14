import history from './myHistory';

it('exports a history object', () => {
	expect(typeof history).toBe('object');

	const { length, location, action, listen, block } = history;

	expect(typeof length).toBe('number');

	expect(typeof location).toBe('object');
	expect(typeof location.pathname).not.toBe('undefined');

	expect(typeof action).toBeDefined();
	expect(typeof listen).toBe('function');
	expect(typeof block).toBe('function');
});
