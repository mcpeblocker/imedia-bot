const { Surah } = require("../models")

const create = async (data) => {
    const surah = new Surah(data);
    return await surah.save();
};

const getById = async (id) => {
    return await Surah.findById(id);
};

const getByName = async (name) => {
    return await Surah.findOne({ name });
};

const getCount = async () => {
    return await Surah.estimatedDocumentCount();
};

const getAll = async () => {
    return await Surah.find();
};

const getByAuthor = async (authorId) => {
    return await Surah.find({ author: authorId });
};

const deleteById = async (id) => {
    return await Surah.findByIdAndDelete(id);
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

