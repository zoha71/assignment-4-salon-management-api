const {
    getAllSalons,
    getSalonById,
    createSalon,
    updateSalon,
    deleteSalon,
    getTopSalons,
    getSalonsByCity
} = require("../models/salonModel");

const {
    getServicesBySalon
} = require("../models/serviceModel");


const getSalons = async (req, res) => {
    try {
        const salons = await getAllSalons();

        res.status(200).json(salons);

    } catch (error) {
        console.error("Get salons error:", error);

        res.status(500).json({
            message: "Failed to fetch salons"
        });
    }
};


const getSalon = async (req, res) => {
    try {
        const { id } = req.params;

        const salon = await getSalonById(id);

        if (!salon) {
            return res.status(404).json({
                message: "Salon not found"
            });
        }

        res.status(200).json(salon);

    } catch (error) {
        console.error("Get salon error:", error);

        res.status(500).json({
            message: "Failed to fetch salon"
        });
    }
};


const addSalon = async (req, res) => {
    try {
        const {
            name,
            city,
            address,
            rating
        } = req.body;

        if (!name || !city || !address || rating === undefined) {
            return res.status(400).json({
                message: "Name, city, address and rating are required"
            });
        }

        if (isNaN(rating) || rating < 0 || rating > 5) {
            return res.status(400).json({
                message: "Rating must be between 0 and 5"
            });
        }

        const salon = await createSalon({
            name,
            city,
            address,
            rating: Number(rating)
        });

        res.status(201).json({
            message: "Salon created successfully",
            salon
        });

    } catch (error) {
        console.error("Create salon error:", error);

        res.status(500).json({
            message: "Failed to create salon"
        });
    }
};


const editSalon = async (req, res) => {
    try {
        const { id } = req.params;

        const existingSalon = await getSalonById(id);

        if (!existingSalon) {
            return res.status(404).json({
                message: "Salon not found"
            });
        }

        const {
            name,
            city,
            address,
            rating
        } = req.body;

        if (!name || !city || !address || rating === undefined) {
            return res.status(400).json({
                message: "Name, city, address and rating are required"
            });
        }

        if (isNaN(rating) || rating < 0 || rating > 5) {
            return res.status(400).json({
                message: "Rating must be between 0 and 5"
            });
        }

        const updatedSalon = await updateSalon(id, {
            name,
            city,
            address,
            rating: Number(rating)
        });

        res.status(200).json({
            message: "Salon updated successfully",
            salon: updatedSalon
        });

    } catch (error) {
        console.error("Update salon error:", error);

        res.status(500).json({
            message: "Failed to update salon"
        });
    }
};


const removeSalon = async (req, res) => {
    try {
        const { id } = req.params;

        const existingSalon = await getSalonById(id);

        if (!existingSalon) {
            return res.status(404).json({
                message: "Salon not found"
            });
        }

        await deleteSalon(id);

        res.status(200).json({
            message: "Salon deleted successfully"
        });

    } catch (error) {
        console.error("Delete salon error:", error);

        res.status(500).json({
            message: "Failed to delete salon"
        });
    }
};

const getTop = async (req, res) => {
    try {
        const salons = await getTopSalons();

        res.status(200).json(salons);

    } catch (error) {
        console.error("Top salons error:", error);

        res.status(500).json({
            message: "Failed to fetch top salons"
        });
    }
};


// GET /salons/city/:city
const getByCity = async (req, res) => {
    try {
        const { city } = req.params;

        if (!city) {
            return res.status(400).json({
                message: "City is required"
            });
        }

        const salons = await getSalonsByCity(city);

        res.status(200).json(salons);

    } catch (error) {
        console.error("City filter error:", error);

        res.status(500).json({
            message: "Failed to fetch salons by city"
        });
    }
};


const getSalonServices = async (req, res) => {
    try {
        const { id } = req.params;

        const salon = await getSalonById(id);

        if (!salon) {
            return res.status(404).json({
                message: "Salon not found"
            });
        }

        const services = await getServicesBySalon(id);

        res.status(200).json(services);

    } catch (error) {
        console.error("Get salon services error:", error);

        res.status(500).json({
            message: "Failed to fetch salon services"
        });
    }
};


module.exports = {
    getSalons,
    getSalon,
    addSalon,
    editSalon,
    removeSalon,
    getTop,
    getByCity,
    getSalonServices
};