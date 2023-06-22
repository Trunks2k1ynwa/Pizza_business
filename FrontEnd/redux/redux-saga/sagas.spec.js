import test from 'tape';

import { incrementAsync } from './sagas';

test('incrementAsync Saga test', (assert) => {
  const gen = incrementAsync();
  console.log('🚀 ~ gen:', gen);
  gen.next();
});
