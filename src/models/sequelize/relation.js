exports = module.exports = (sequelize, DataTypes) => {
  const Relation = sequelize.define('Relation', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    user1: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'user_1',
    },
    user2: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'user_2',
    },
    situation: {
      // 1: connected
      // 2: 1_block_2
      // 3: 2_block_1
      allowNull: false,
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  }, {
    tableName: 'relations',
  });
  return Relation;
};
