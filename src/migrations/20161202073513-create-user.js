module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      messengerId: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'messenger_id',
      },
      name: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      relation: {
        allowNull: true,
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
    return queryInterface.dropTable('users');
  },
};
