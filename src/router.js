const express = require("express");
const Container = require("../container/productos.js");

const router = express.Router();
const container = new Container();

router.get("/", (req, res) => {
    const productos = container.getAll();
    res.send(productos);
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    const product = container.getById(parseInt(id));
    res.send(product);
});

router.post("/", (req, res) => {
    const obj = req.body;
    const newProduct = container.create(obj);
    res.send(newProduct);
});

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const obj = req.body;
    const updatedProduct = container.updateById(parseInt(id), obj);
    res.send(updatedProduct);
});

router.delete('/:id', (req, res) => {
    const id = req.params.id; // get id from params
    const producto = container.getById(id); // get product by id
    if (producto) {
        container.delete(id); // delete product
        res.json(producto); // return product
    } else {
        res.json({ error: 'producto no encontrado' }); // return error
    }
});

module.exports = router;