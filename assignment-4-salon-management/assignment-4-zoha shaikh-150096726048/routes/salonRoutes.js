const express = require("express");

const {
    getSalons,
    getSalon,
    addSalon,
    editSalon,
    removeSalon,
    getTop,
    getByCity,
    getSalonServices
} = require("../controllers/salonController");

const {
    addService
} = require("../controllers/serviceController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/top", getTop);

router.get("/city/:city", getByCity);

router.get("/", getSalons);

router.get("/:id/services", getSalonServices);

router.get("/:id", getSalon);

router.post("/", authMiddleware, addSalon);

router.put("/:id", authMiddleware, editSalon);

router.delete("/:id", authMiddleware, removeSalon);

router.post(
    "/:id/services",
    authMiddleware,
    addService
);

module.exports = router;