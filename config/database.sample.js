module.exports = {
  development: {
    username: 'username',
    password: 'password',
    database: 'codeg',
    host: '127.0.0.1',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    migrationStorageTableName: 'sequelize_meta',
    seederStorageTableName: 'sequelize_data',
  },
  test: {
    username: 'username',
    password: 'password',
    database: 'codeg_test',
    host: '127.0.0.1',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    migrationStorageTableName: 'sequelize_meta',
    seederStorageTableName: 'sequelize_data',
  },
};
