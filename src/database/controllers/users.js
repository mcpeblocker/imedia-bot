const { User } = require("../models")

const create = async (data) => {
    const user = new User(data);
    return await user.save();
};

const getByUserId = async (id) => {
    return await User.findOne({ userId: id });
};

const getCount = async () => {
    return await User.estimatedDocumentCount();
};

const getAll = async () => {
    return await User.find();
};

const setStatus = async (userId, isActive) => {
    return await User.findOneAndUpdate({ userId }, { $set: { isActive }});
};

module.exports = {
    create,
    getByUserId,
    getCount,
    getAll,
    setStatus
};

