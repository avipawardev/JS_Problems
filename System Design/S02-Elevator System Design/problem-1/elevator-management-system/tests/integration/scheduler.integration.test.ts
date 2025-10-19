import { Scheduler } from '../../src/services/scheduler';
import { Elevator } from '../../src/models/elevator';
import { Request } from '../../src/models/request';

describe('Scheduler Integration Tests', () => {
    let scheduler: Scheduler;
    let elevators: Elevator[];

    beforeEach(() => {
        elevators = [
            new Elevator(1, 0, 'idle', 0),
            new Elevator(2, 5, 'idle', 0),
            new Elevator(3, 10, 'idle', 0),
        ];
        scheduler = new Scheduler(elevators);
    });

    test('should assign the closest elevator to a request', () => {
        const request = new Request(2, 8);
        const assignedElevator = scheduler.assignElevator(request);

        expect(assignedElevator.id).toBe(2);
    });

    test('should handle multiple requests and assign elevators correctly', () => {
        const request1 = new Request(0, 5);
        const request2 = new Request(3, 10);
        const request3 = new Request(1, 8);

        scheduler.assignElevator(request1);
        scheduler.assignElevator(request2);
        const assignedElevator3 = scheduler.assignElevator(request3);

        expect(assignedElevator3.id).toBe(1);
    });

    test('should not assign an elevator that is already occupied', () => {
        const request1 = new Request(0, 5);
        const request2 = new Request(1, 8);

        scheduler.assignElevator(request1);
        const assignedElevator2 = scheduler.assignElevator(request2);

        expect(assignedElevator2).toBeUndefined();
    });
});