const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  phone: { type: DataTypes.STRING, unique: true },
  pass: { type: DataTypes.STRING },
  createdAt: { type: DataTypes.DATE },
  updatedAt: { type: DataTypes.DATE },
  avgRating: { type: DataTypes.FLOAT, defaultValue: -1.0 },
  photo: { type: DataTypes.TEXT },
  about: { type: DataTypes.TEXT }
});

const Skill = sequelize.define('skill', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true },
});

const Job = sequelize.define('job', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  hiredUserId: { type: DataTypes.INTEGER },
  workAddress: { type: DataTypes.STRING, allowNull: false },
  workList: { type: DataTypes.TEXT, allowNull: false },
  deadline: { type: DataTypes.DATE },
  price: { type: DataTypes.INTEGER },
  createdAt: { type: DataTypes.DATE },
  updatedAt: { type: DataTypes.DATE },
  status: { type: DataTypes.STRING, defaultValue: 'pending' },
  //other statuses: 'waitClientResponse', 'inWork', 'done'
});

const Media = sequelize.define('media', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  fileName: { type: DataTypes.STRING, unique: true },
  originalName: { type: DataTypes.TEXT },

});

const Rating = sequelize.define('rating', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rate: { type: DataTypes.INTEGER },
  ratedJobId: { type: DataTypes.INTEGER },
  ratedUserId: { type: DataTypes.INTEGER },
});

const UserSkill = sequelize.define('user_skill', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }

});

User.hasMany(Job)
Job.belongsTo(User)

User.belongsToMany(Skill, { through: UserSkill })
Skill.belongsToMany(User, { through: UserSkill })

User.hasMany(Rating)
Rating.belongsTo(User)

Job.hasMany(Media)
Media.belongsTo(Job, { foreignKey: 'jobId' })

module.exports = {
  User,
  Skill,
  Job,
  Media,
  Rating,
  UserSkill,
}