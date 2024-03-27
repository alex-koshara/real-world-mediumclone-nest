import ormconfig from '@app/ormconfig';

const ormSeedConfig = {
  ...ormconfig,
  migrations: ['src/seeds/*.ts'],
};

export default ormSeedConfig;
