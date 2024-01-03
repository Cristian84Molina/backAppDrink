const {cuentasbancarias} = require('../dbConex');


const createCtaBancaria = async (datos) => {
    const {
    numero,
    banco,
active} = datos;
    if (!banco ||!active) { throw new Error('Datos faltantes') }
    const newCtabco = await cuentasbancarias.create(
        datos
    );
    return newCtabco;
};

const getCtaBancaria = async() => {
   const array = await cuentasbancarias.findAll();
   return array;
};

module.exports = { createCtaBancaria, getCtaBancaria };