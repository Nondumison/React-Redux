import { loadState, saveState } from './localStorage';

const state = {
	foo: 'bar',
	baz: 'qux',
};

beforeAll(() => {
	localStorage.clear();
});

afterAll(() => {
	localStorage.clear();
});

it('exports loadState & saveState', () => {
	expect(typeof loadState).toBe('function');
	expect(typeof saveState).toBe('function');
});

it('saves an object as a JSON string', () => {
	saveState(state);
	expect(localStorage.getItem('state')).toBe(JSON.stringify(state));
});

it('returns an object', () => {
	const loadedState = loadState();
	expect(loadedState).toMatchObject(state);
});
