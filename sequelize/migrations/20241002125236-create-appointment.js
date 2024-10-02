'use strict';

const tableName = 'appointments';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface
      .createTable(tableName, {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        date: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        time: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        duration: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        slot: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      })
      .then(() => {
        return queryInterface.addIndex(tableName, ['date', 'time'], {
          name: 'index_date_time',
        });
      });
  },

  async down(queryInterface) {
    return queryInterface
      .removeIndex(tableName, 'index_date_time')
      .then(() => queryInterface.dropTable(tableName));
  },
};
