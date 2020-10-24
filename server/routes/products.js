const express = require("express");
const Product = require("../models/product");
const Department = require("../models/department");

const router = express.Router();

router
  .get("/", async function (req, res) {
    return res.json(await Product.find({}).exec());
  })
  .get("/:id", async function (req, res) {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send("value provided is not a valid id");
    }

    const product = await Product.findById(id).exec();
    return (
      res.send(product.toJSON()) || res.status(400).send("Product not found")
    );
  })
  .post("/", async function (req, res) {
    const { name, price, department_id } = req.body || {};

    if (!name || !price || !department_id)
      return res
        .status(400)
        .send("Name, price and department_id are required");

    if (!department_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res
        .status(400)
        .send("value provided for department_id is not a valid id");
    }

    const departmentDoesntExist = !(await Department.findById(
      department_id
    ).exec());
    if (departmentDoesntExist)
      return res.status(400).send("department doesn't exist");

    const productWithSameName =
      (await Product.find({ name }).exec()).length !== 0;
    if (productWithSameName) {
      return res.status(400).send("A product with that name already exists");
    }

    const product = new Product({ name, price, department_id });
    await product.save();
    return res.send(product.toJSON());
  });

module.exports = router;
