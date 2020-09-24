import deepFreeze from 'deep-freeze';
import voteReducer from './reducer';

describe('voteReducer', () => {
  const initialState = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'NOT_VALID',
    };

    const newState = voteReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test('good is incremented', () => {
    const action = {
      type: 'GOOD',
    };
    const state = initialState;

    deepFreeze(state);
    const newState = voteReducer(state, action);
    expect(newState).toEqual({
      good: 1,
      neutral: 0,
      bad: 0,
    });
  });

  test('neutral is incremented', () => {
    const action = {
      type: 'NEUTRAL',
    };
    const state = initialState;

    deepFreeze(state);
    const newState = voteReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      neutral: 1,
      bad: 0,
    });
  });

  test('bad is incremented', () => {
    const action = {
      type: 'BAD',
    };
    const state = initialState;

    deepFreeze(state);
    const newState = voteReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      neutral: 0,
      bad: 1,
    });
  });

  test('zero is reset all values to value 0', () => {
    const action = {
      type: 'ZERO',
    };
    const state = { good: 1, neutral: 2, bad: 3 };

    deepFreeze(state);
    const newState = voteReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  });
});
