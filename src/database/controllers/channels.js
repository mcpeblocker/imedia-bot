const { Channel } = require("../models")

const create = async (data) => {
    const channel = new Channel(data);
    return await channel.save();
};

const getById = async (id) => {
    return await Channel.findById(id);
};

const getCount = async () => {
    return await Channel.estimatedDocumentCount();
};

const getAll = async () => {
    return await Channel.find();
};

const deleteById = async (id) => {
    return await Channel.findByIdAndDelete(id);
};

module.exports = {
    create,
    getById,
    getCount,
    getAll,
    deleteById
};

