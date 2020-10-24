const express = require("express");
const Department = require("../models/department");

const router = express.Router();

router
  .get("/", async function (req, res) {
    return res.json(await Department.find({}).exec());
  })
  .get("/:id", async function (req, res) {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send("value provided is not a valid id");
    }

    const department = await Department.findById(id).exec();
    return (
      res.send(department.toJSON()) ||
      res.status(400).send("Department not found")
    );
  })
  .post("/", async function (req, res) {
    const { name } = req.body || {};

    if (!name) return res.status(400).send("Name is required");

    const departmentWithSameName =
      (await Department.find({ name }).exec()).length !== 0;
    if (departmentWithSameName) {
      return res.status(400).send("A department with that name already exists");
    }

    const department = new Department({ name });
    await department.save();
    return res.send(department.toJSON());
  });

module.exports = router;
