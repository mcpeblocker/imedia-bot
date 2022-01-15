const { Movie } = require("../models")

const create = async (data) => {
    const movie = new Movie(data);
    return await movie.save();
};

const getById = async (id) => {
    return await Movie.findById(id);
};

const getByName = async (name) => {
    return await Movie.findOne({ name });
};

const getCount = async () => {
    return await Movie.estimatedDocumentCount();
};

const getAll = async () => {
    return await Movie.find();
};

const getBySeries = async (seriesId) => {
    return await Movie.find({ series: seriesId });
}

const deleteById = async (id) => {
    return await Movie.findByIdAndDelete(id);
};

module.exports = {
    create,
    getById,
    getCount,
    getAll,
    getBySeries,
    getByName,
    deleteById
};

