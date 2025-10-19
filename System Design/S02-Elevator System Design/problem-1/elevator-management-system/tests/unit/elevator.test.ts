import { Elevator } from '../../src/models/elevator';
import { State } from '../../src/models/state';

describe('Elevator', () => {
    let elevator: Elevator;

    beforeEach(() => {
        elevator = new Elevator(1, 0, State.CLOSE_DOOR, 0);
    });

    test('should initialize with correct properties', () => {
        expect(elevator.id).toBe(1);
        expect(elevator.currentFloor).toBe(0);
        expect(elevator.state).toBe(State.CLOSE_DOOR);
        expect(elevator.occupancy).toBe(0);
    });

    test('should move to the correct floor', () => {
        elevator.move(3);
        expect(elevator.currentFloor).toBe(3);
        expect(elevator.state).toBe(State.MOVING);
    });

    test('should open door when arriving at the destination', () => {
        elevator.move(2);
        elevator.arrive();
        expect(elevator.state).toBe(State.OPEN_DOOR);
    });

    test('should close door after a delay', () => {
        elevator.move(2);
        elevator.arrive();
        elevator.closeDoor();
        expect(elevator.state).toBe(State.CLOSE_DOOR);
    });

    test('should update occupancy correctly', () => {
        elevator.updateOccupancy(3);
        expect(elevator.occupancy).toBe(3);
    });

    test('should not exceed maximum occupancy', () => {
        elevator.updateOccupancy(11); // Assuming max occupancy is 10
        expect(elevator.occupancy).toBe(10);
    });
});