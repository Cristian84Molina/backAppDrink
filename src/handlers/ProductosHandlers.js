const { Router } = require('express');
const {getProductosAll, getProductosxLinea,
       addProducto, getProductosById,
       updateProducto} = require('../controllers/ProductosControllers');
const server = Router();

server.get('/', async(req, res) => {
   try {
       const result = await getProductosAll();
       res.status(200).json(result);
   } catch (error) {
       res.status(500).json({message: error.message});
   }
});

server.get('/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const result = await getProductosById(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

server.get('/linea/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const result = await getProductosxLinea(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});
 

server.post('/', async(req, res) => {
    const datos = req.body;
    try {
        const result = await addProducto(datos);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message: error.message});  
    };
});

server.put('/:id', async(req, res) => {
    const datos = req.body;   
    const {id} = req.params;
    try {
        const result = await updateProducto(datos, id);
        res.status(200).json(result); 
    } catch (error) {
        res.status(500).json({message: error.message});         
    };
});

module.exports = server;