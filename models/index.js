const User = require('./User');
const Posting = require('./Post');

User.hasMany(Posting,{
    foreignkey: 'user_id',
    onDelete: 'CASCADE'
});

Posting.belongsTo(User,{
    foreignkey:'user_id'
});

module.exports = {User,Posting};