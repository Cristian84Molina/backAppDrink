const { Router } = require('express');
const { createCtaBancaria, getCtaBancaria } = require("../controllers/CtabancariasController");
const server = Router();

server.post("/", async (req, res) => {
  const datos = req.body;
  try {
    const result = await createCtaBancaria(datos);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

server.get('/', async(req, res) => {
   try {
      const result = await getCtaBancaria();
      res.status(200).json(result);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

module.exports = server;