import { OccupancyManager } from '../../src/services/occupancyManager';
import { Elevator } from '../../src/models/elevator';
import { Passenger } from '../../src/models/passenger';

describe('OccupancyManager', () => {
    let occupancyManager: OccupancyManager;
    let elevator: Elevator;

    beforeEach(() => {
        occupancyManager = new OccupancyManager();
        elevator = new Elevator(1, 0, 'idle', 0, 5); // id, currentFloor, direction, occupancy, capacity
    });

    test('should add a passenger if there is enough capacity', () => {
        const passenger = new Passenger(1, 'waiting'); // id, status
        occupancyManager.addPassenger(elevator, passenger);
        expect(elevator.occupancy).toBe(1);
    });

    test('should not add a passenger if capacity is exceeded', () => {
        elevator.occupancy = 5; // Set to maximum capacity
        const passenger = new Passenger(2, 'waiting');
        occupancyManager.addPassenger(elevator, passenger);
        expect(elevator.occupancy).toBe(5);
    });

    test('should remove a passenger', () => {
        const passenger = new Passenger(1, 'waiting');
        occupancyManager.addPassenger(elevator, passenger);
        occupancyManager.removePassenger(elevator, passenger.id);
        expect(elevator.occupancy).toBe(0);
    });

    test('should not remove a passenger that does not exist', () => {
        const passenger = new Passenger(1, 'waiting');
        occupancyManager.addPassenger(elevator, passenger);
        occupancyManager.removePassenger(elevator, 2); // Non-existent passenger
        expect(elevator.occupancy).toBe(1);
    });

    test('should return the current occupancy', () => {
        expect(occupancyManager.getCurrentOccupancy(elevator)).toBe(0);
        const passenger = new Passenger(1, 'waiting');
        occupancyManager.addPassenger(elevator, passenger);
        expect(occupancyManager.getCurrentOccupancy(elevator)).toBe(1);
    });
});