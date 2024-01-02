require("dotenv").config();
const { Sequelize, Model } = require("sequelize");
const { DB_DEPLOY } = process.env;

//cargamos los modelos
const lineasModel = require("./models/Lineas");
const productosModel = require("./models/Productos");
const cajerosModel = require("./models/Cajeros");
const comandasModel = require("./models/Comandas");
const itemComandasModel = require("./models/ItemComandas");
const formaspagoModels = require("./models/FormasPago");
const cuentasbancariasModels = require("./models/CuentasBancarias");
const detaformaspagoModels = require("./models/DetaFormasPago");
const cierrecajaModels = require("./models/CierreCaja");
const transaccionesModels = require("./models/Transacciones");

/* const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_BASE} = process.env;


 const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_BASE}`,
    { logging: false, native: false }
  ); */

  const sequelize = new Sequelize(process.env.DB_DEPLOY, {
    logging: false,
    native: false,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Puedes necesitar ajustar esto dependiendo de tu configuración de PostgreSQL
      },
    },
  });
  

lineasModel(sequelize);
productosModel(sequelize);
cajerosModel(sequelize);
comandasModel(sequelize);
itemComandasModel(sequelize);
formaspagoModels(sequelize);
cuentasbancariasModels(sequelize);
detaformaspagoModels(sequelize);
cierrecajaModels(sequelize);
transaccionesModels(sequelize);

const {
  lineas,
  cajeros,
  comandas,
  itemcomandas,
  formaspago,
  cuentasbancarias,
  detaformaspago,
  cierrecaja,
  transacciones,
  productos,
} = sequelize.models;

//definimos las relaciones
lineas.hasMany(productos, { foreignKey: "linea_id", sourceKey: "id" });
productos.belongsTo(lineas, { foreignKey: "linea_id", targetKey: "id" });

cajeros.hasMany(comandas, { foreignKey: "cajero_id", sourceKey: "id" });
comandas.belongsTo(cajeros, { foreignKey: "cajero_id", targetKey: "id" });

comandas.hasMany(itemcomandas, { foreignKey: "comanda_id", sourceKey: "id" });
itemcomandas.belongsTo(comandas, { foreignKey: "comanda_id", targetKey: "id" });
itemcomandas.belongsTo(productos, {
  foreignKey: "producto_id",
  targetKey: "id",
});
itemcomandas.belongsTo(cajeros, { foreignKey: "cajero_id", targetKey: "id" });

comandas.hasMany(detaformaspago, { foreignKey: "comanda_id", sourceKey: "id" });
detaformaspago.belongsTo(comandas, {
  foreignKey: "comanda_id",
  targetKey: "id",
});
detaformaspago.belongsTo(formaspago, {
  foreignKey: "formapago_id",
  targetKey: "id",
});
detaformaspago.belongsTo(cuentasbancarias, {
  foreignKey: "ctabancaria_id",
  targetKey: "id",
});
detaformaspago.belongsTo(cajeros, { foreignKey: "cajero_id", targetKey: "id" });

cajeros.hasMany(cierrecaja, { foreignKey: "cajero_id", sourceKey: "id" });
cierrecaja.belongsTo(cajeros, { foreignKey: "cajero_id", targetKey: "id" });

cajeros.hasMany(transacciones, { foreignKey: "cajero_id", sourceKey: "id" });
transacciones.belongsTo(cajeros, { foreignKey: "cajero_id", targetKey: "id" });
transacciones.belongsTo(cuentasbancarias, {
  foreignKey: "ctabancaria_id",
  targetKey: "id",
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Conexion Exitosa");
  } catch (error) {
    console.log("Error de conexion", error);
  }
}

testConnection();

module.exports = {
  lineas,
  productos,
  comandas,
  cajeros,
  itemcomandas,
  formaspago,
  cuentasbancarias,
  detaformaspago,
  transacciones,
  conn: sequelize,
};
