module.exports = function(sequelize, DataTypes) {
  const Task = sequelize.define("Task", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    claimed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    assignedTo: {
      type: INTEGER,
      allowNull: true
    }
  });

  db.Subscription.belongsTo(db.User, {
    as: 'creator',
    foreignKey: 'creatorId'
  });
  
  db.Subscription.belongsTo(db.User, {
    as: 'subscriber',
    foreignKey: 'subscriberId'
  });

  Task.associate = function(models) {
    Task.belongsTo(models.User, {
      as: "creator",
      foreignKey: "creatorId"
    });
  };

  Task.associate = function(models) {
    Task.belongsTo(models.User, {
      as: "assignee",
      foreignKey: "assigneeId"
    });
  };
  return Task;
};
