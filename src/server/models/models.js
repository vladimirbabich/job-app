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
  photo: { type: DataTypes.STRING },

});
const Rating = sequelize.define('rating', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  ratedUserId: { type: DataTypes.INTEGER },
  rate: { type: DataTypes.INTEGER },
});
const Job = sequelize.define('job', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  hiredUserId: { type: DataTypes.INTEGER },
  workAddress: { type: DataTypes.STRING, allowNull: false },
  workList: { type: DataTypes.STRING, allowNull: false },
  deadline: { type: DataTypes.DATE },
  price: { type: DataTypes.STRING },
  createdAt: { type: DataTypes.DATE },
  updatedAt: { type: DataTypes.DATE },
  status: { type: DataTypes.STRING, defaultValue: 'pending' },
  //other statuses: 'waitClientResponse', 'inWork', 'done'
});
const Media = sequelize.define('media', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  fileName: { type: DataTypes.STRING, unique: true },
  originalName: { type: DataTypes.STRING },

});

User.hasMany(Job)
Job.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Job.hasMany(Media)
Media.belongsTo(Job, { foreignKey: 'jobId' })

module.exports = {
  User,
  Job,
  Media,
  Rating
}