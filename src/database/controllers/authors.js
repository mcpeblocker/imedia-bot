const { Author } = require("../models")

const create = async (data) => {
    const author = new Author(data);
    return await author.save();
};

const getById = async (id) => {
    return await Author.findById(id);
};

const getByName = async (name) => {
    return await Author.findOne({ name });
};

const getCount = async (type = null) => {
    if (!type) {
        return await Author.estimatedDocumentCount();
    };
    return await Author.countDocuments({ type });
};

const getAll = async (type = "nasheed") => {
    return await Author.find({ type });
};

const deleteById = async (id) => {
    return await Author.findByIdAndDelete(id);
};

module.exports = {
    create,
    getById,
    getCount,
    getAll,
    getByName,
    deleteById
};

