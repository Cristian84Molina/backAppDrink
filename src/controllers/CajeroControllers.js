const { cajeros } = require("../dbConex");

const createCajeros = async (datos) => {
  const newCajero = await cajeros.create(datos);
  return newCajero;
};

const getAllcajeros = async () => {
    const cajeros = await cajeros.findAll();
    return cajeros;
}

const getCajeroById = async (id) => {
    const cajero = await cajeros.findOne({
        where: {
            id: id
        }
    });
    return cajero;

}
const getCajeroByName = async (name) => {
    const cajero = await cajeros.findOne({
        where: {
            name: name
        }
    });
    return cajero;

}
const deleteCajeroById = async (id) => {
    const deletedRows = await cajeros.destroy({
      where: {
        id: id
      }
    });
    return deletedRows > 0; // Retorna true si se eliminó al menos un registro, false si no se eliminó nada.
  };

module.exports = { createCajeros, getAllcajeros, getCajeroById, getCajeroByName, deleteCajeroById };
