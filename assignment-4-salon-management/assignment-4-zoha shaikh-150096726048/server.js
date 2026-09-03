require("dotenv").config();

const express = require("express");

const loggerMiddleware = require("./middleware/loggerMiddleware");

const authRoutes = require("./routes/authRoutes");
const salonRoutes = require("./routes/salonRoutes");
const serviceRoutes = require("./routes/serviceRoutes");

const app = express();


app.use(express.json());

app.use(loggerMiddleware);

app.get("/", (req, res) => {
    res.status(200).send("Welcome to Salon APIs");
});


app.use("/", authRoutes);

app.use("/salons", salonRoutes);

app.use("/services", serviceRoutes);


app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});


app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        message: "Internal server error"
    });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
