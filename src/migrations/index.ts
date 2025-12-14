import * as migration_20251213_234533 from './20251213_234533';
import * as migration_20251214_230841 from './20251214_230841';

export const migrations = [
  {
    up: migration_20251213_234533.up,
    down: migration_20251213_234533.down,
    name: '20251213_234533',
  },
  {
    up: migration_20251214_230841.up,
    down: migration_20251214_230841.down,
    name: '20251214_230841'
  },
];
