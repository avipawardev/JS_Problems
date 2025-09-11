const express = require("express");
const router = express.Router();
const vc = require("../controllers/vehicleController");

// Vehicle CRUD
router.post("/vehicles", vc.createVehicle);
router.get("/vehicles", vc.getVehicles);
router.put("/vehicles/:id", vc.updateVehicle);
router.delete("/vehicles/:id", vc.deleteVehicle);

// Trip Operations
router.post("/vehicles/:id/trips", vc.addTrip);
router.put("/vehicles/:id/trips/:tripId", vc.updateTrip);
router.delete("/vehicles/:id/trips/:tripId", vc.deleteTrip);

// Advanced Queries
router.get("/vehicles/long-trips", vc.getLongTrips);
router.get("/vehicles/by-cities", vc.getByStartCities);
router.get("/vehicles/trips-after-2024", vc.getTripsAfterDate);
router.get("/vehicles/cars-trucks", vc.getCarOrTruck);

module.exports = router;
