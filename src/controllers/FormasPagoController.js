const {formaspago} = require('../dbConex');

const createFormaspago = async (datos) => {
    const {
    name,
    active,
    maneja_ctabanco} = datos;
    if (!name ||!active ||!maneja_ctabanco) { throw new Error('Datos faltantes') }
    const newFormaspago = await formaspago.create({
        name,
        active,
        maneja_ctabanco
    });
    return newFormaspago;
};

const getFormasPago = async() => {
   const array = await formaspago.findAll();
   return array;
};

module.exports = { createFormaspago, getFormasPago };