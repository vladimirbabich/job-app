const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true },
    phone: { type: DataTypes.INTEGER, unique: true },
    pass: { type: DataTypes.STRING, unique: true },
});
const Rating = sequelize.define('rating', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    // userId: { type: DataTypes.STRING },
    // ratedUserId: { type: DataTypes.STRING },
    rate: { type: DataTypes.INTEGER },
});
const Job = sequelize.define('job', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    // createdByUserId: { type: DataTypes.STRING },
    // hiredUserId: { type: DataTypes.STRING, unique: true },
    workList: { type: DataTypes.STRING, allowNull: false },
    deadline: { type: DataTypes.DATE },
    // media: { type: DataTypes.ARRAY(DataTypes.DECIMAL) },
    price: { type: DataTypes.STRING },
    workAddress: { type: DataTypes.STRING, allowNull: false },
});
const Media = sequelize.define('media', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    fileName: { type: DataTypes.STRING },
    //jobId: { type: DataTypes.STRING, unique: true },
    url: { type: DataTypes.STRING, unique: true },
});

User.hasMany(Job)
Job.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Job.hasMany(Media)
Media.belongsTo(Job)

module.exports = {
    User,
    Job,
    Media,
    Rating
}