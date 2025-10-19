export class MovementEngine {
    private elevators: Elevator[];

    constructor(elevators: Elevator[]) {
        this.elevators = elevators;
    }

    public moveElevator(elevatorId: number, targetFloor: number): void {
        const elevator = this.elevators.find(e => e.id === elevatorId);
        if (!elevator) {
            throw new Error(`Elevator with ID ${elevatorId} not found.`);
        }

        if (elevator.currentFloor === targetFloor) {
            console.log(`Elevator ${elevatorId} is already on floor ${targetFloor}.`);
            return;
        }

        const direction = targetFloor > elevator.currentFloor ? 'up' : 'down';
        console.log(`Moving elevator ${elevatorId} ${direction} to floor ${targetFloor}.`);

        elevator.currentFloor = targetFloor;
        elevator.state = 'Moving';
        this.updateElevatorState(elevator);
    }

    private updateElevatorState(elevator: Elevator): void {
        // Simulate state transition logic
        setTimeout(() => {
            elevator.state = 'Idle';
            console.log(`Elevator ${elevator.id} has arrived at floor ${elevator.currentFloor} and is now idle.`);
        }, 1000); // Simulate time taken to move
    }
}