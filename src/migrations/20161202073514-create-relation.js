module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('relations', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      user1: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'user_1',
      },
      user2: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'user_2',
      },
      situation: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at',
      },
    });
  },
  down(queryInterface) {
    return queryInterface.dropTable('relations');
  },
};
