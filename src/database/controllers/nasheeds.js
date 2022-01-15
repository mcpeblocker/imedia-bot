const { Nasheed } = require("../models")

const create = async (data) => {
    const nasheed = new Nasheed(data);
    return await nasheed.save();
};

const getById = async (id) => {
    return await Nasheed.findById(id);
};

const getByName = async (name) => {
    return await Nasheed.findOne({ name });
};

const getCount = async () => {
    return await Nasheed.estimatedDocumentCount();
};

const getAll = async () => {
    return await Nasheed.find();
};

const getByAuthor = async (authorId) => {
    return await Nasheed.find({ author: authorId });
};

const deleteById = async (id) => {
    return await Nasheed.findByIdAndDelete(id);
};

module.exports = {
    create,
    getById,
    getCount,
    getAll,
    getByAuthor,
    getByName,
    deleteById
};

