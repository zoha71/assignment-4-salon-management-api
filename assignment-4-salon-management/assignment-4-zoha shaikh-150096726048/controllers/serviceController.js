const {
    getServiceById,
    createService,
    updateService,
    deleteService,
    getAvailableServices
} = require("../models/serviceModel");

const {
    getSalonById
} = require("../models/salonModel");


const addService = async (req, res) => {
    try {
        const salonId = req.params.id;

        const {
            serviceName,
            price,
            duration,
            isAvailable
        } = req.body;

        const salon = await getSalonById(salonId);

        if (!salon) {
            return res.status(404).json({
                message: "Salon not found"
            });
        }

        if (!serviceName || price === undefined || !duration) {
            return res.status(400).json({
                message: "Service name, price and duration are required"
            });
        }

        if (isNaN(price) || Number(price) < 0) {
            return res.status(400).json({
                message: "Price must be a valid positive number"
            });
        }

        if (
            isAvailable !== undefined &&
            typeof isAvailable !== "boolean"
        ) {
            return res.status(400).json({
                message: "isAvailable must be a boolean"
            });
        }

        const service = await createService({
            salonId,
            serviceName,
            price: Number(price),
            duration,
            isAvailable:
                isAvailable === undefined
                    ? true
                    : isAvailable
        });

        res.status(201).json({
            message: "Service created successfully",
            service
        });

    } catch (error) {
        console.error("Create service error:", error);

        res.status(500).json({
            message: "Failed to create service"
        });
    }
};


const editService = async (req, res) => {
    try {
        const { id } = req.params;

        const existingService = await getServiceById(id);

        if (!existingService) {
            return res.status(404).json({
                message: "Service not found"
            });
        }

        const {
            serviceName,
            price,
            duration,
            isAvailable
        } = req.body;

        if (!serviceName || price === undefined || !duration) {
            return res.status(400).json({
                message: "Service name, price and duration are required"
            });
        }

        if (isNaN(price) || Number(price) < 0) {
            return res.status(400).json({
                message: "Price must be a valid positive number"
            });
        }

        if (typeof isAvailable !== "boolean") {
            return res.status(400).json({
                message: "isAvailable must be a boolean"
            });
        }

        const updatedService = await updateService(id, {
            serviceName,
            price: Number(price),
            duration,
            isAvailable
        });

        res.status(200).json({
            message: "Service updated successfully",
            service: updatedService
        });

    } catch (error) {
        console.error("Update service error:", error);

        res.status(500).json({
            message: "Failed to update service"
        });
    }
};


const removeService = async (req, res) => {
    try {
        const { id } = req.params;

        const existingService = await getServiceById(id);

        if (!existingService) {
            return res.status(404).json({
                message: "Service not found"
            });
        }

        await deleteService(id);

        res.status(200).json({
            message: "Service deleted successfully"
        });

    } catch (error) {
        console.error("Delete service error:", error);

        res.status(500).json({
            message: "Failed to delete service"
        });
    }
};


const getAvailable = async (req, res) => {
    try {
        const services = await getAvailableServices();

        res.status(200).json(services);

    } catch (error) {
        console.error("Available services error:", error);

        res.status(500).json({
            message: "Failed to fetch available services"
        });
    }
};


module.exports = {
    addService,
    editService,
    removeService,
    getAvailable
};