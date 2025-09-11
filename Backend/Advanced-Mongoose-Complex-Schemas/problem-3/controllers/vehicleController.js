const Vehicle = require("../models/Vehicle");

// ========== Vehicle CRUD ==========

// Create Vehicle
exports.createVehicle = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json(vehicle);
  } catch (err) {
    next(err);
  }
};

// Get All Vehicles
exports.getVehicles = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    next(err);
  }
};

// Update Vehicle
exports.updateVehicle = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    res.json(vehicle);
  } catch (err) {
    next(err);
  }
};

// Delete Vehicle
exports.deleteVehicle = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    res.json({ message: "Vehicle deleted" });
  } catch (err) {
    next(err);
  }
};

// ========== Trip Operations ==========

// Add Trip
exports.addTrip = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    vehicle.trips.push(req.body);
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (err) {
    next(err);
  }
};

// Update Trip
exports.updateTrip = async (req, res, next) => {
  try {
    const { id, tripId } = req.params;
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    const trip = vehicle.trips.id(tripId);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    Object.assign(trip, req.body);
    await vehicle.save();
    res.json(vehicle);
  } catch (err) {
    next(err);
  }
};

// Delete Trip
exports.deleteTrip = async (req, res, next) => {
  try {
    const { id, tripId } = req.params;
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    const trip = vehicle.trips.id(tripId);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    trip.remove();
    await vehicle.save();
    res.json({ message: "Trip deleted", vehicle });
  } catch (err) {
    next(err);
  }
};

// ========== Advanced Queries ==========

// Vehicles with trip > 200 km
exports.getLongTrips = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find({ "trips.distance": { $gt: 200 } });
    res.json(vehicles);
  } catch (err) {
    next(err);
  }
};

// Vehicles with trip from Delhi, Mumbai, or Bangalore
exports.getByStartCities = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find({
      "trips.startLocation": { $in: ["Delhi", "Mumbai", "Bangalore"] },
    });
    res.json(vehicles);
  } catch (err) {
    next(err);
  }
};

// Vehicles with trips after Jan 1, 2024
exports.getTripsAfterDate = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find({
      "trips.startTime": { $gte: new Date("2024-01-01") },
    });
    res.json(vehicles);
  } catch (err) {
    next(err);
  }
};

// Vehicles that are car or truck
exports.getCarOrTruck = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find({ type: { $in: ["car", "truck"] } });
    res.json(vehicles);
  } catch (err) {
    next(err);
  }
};
