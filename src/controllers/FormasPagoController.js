const {formaspago} = require('../dbConex');

const createFormaspago = async (datos) => {
    const {
    name,
    active} = datos;
    if (!name ||!active) { throw new Error('Datos faltantes') }
    const newFormaspago = await formaspago.create(
        datos
    );
    return newFormaspago;
};

const getFormasPago = async() => {
   const array = await formaspago.findAll();
   return array;
};

module.exports = { createFormaspago, getFormasPago };