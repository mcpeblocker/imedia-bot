const { Series } = require("../models")

const create = async (data) => {
    const series = new Series(data);
    return await series.save();
};

const getById = async (id) => {
    return await Series.findById(id);
};

const getByName = async (name) => {
    return await Series.findOne({ name });
};

const getCount = async (type = null) => {
    if (!type) {
        return await Series.estimatedDocumentCount();
    };
    return await Series.countDocuments({ type });
};

const getAll = async (type = "movie") => {
    return await Series.find({ type });
};

const deleteById = async (id) => {
    return await Series.findByIdAndDelete(id);
};

module.exports = {
    create,
    getById,
    getCount,
    getAll,
    getByName,
    deleteById
};

