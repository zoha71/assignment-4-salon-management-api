const express = require("express");

const {
    editService,
    removeService,
    getAvailable
} = require("../controllers/serviceController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/available", getAvailable);

router.put("/:id", authMiddleware, editService);

router.delete("/:id", authMiddleware, removeService);

module.exports = router;