export class ElevatorService {
    private elevators: Elevator[];
    private occupancyManager: OccupancyManager;

    constructor(elevators: Elevator[], occupancyManager: OccupancyManager) {
        this.elevators = elevators;
        this.occupancyManager = occupancyManager;
    }

    public requestElevator(request: Request): Elevator | null {
        const availableElevator = this.findAvailableElevator(request);
        if (availableElevator) {
            this.assignElevator(availableElevator, request);
            return availableElevator;
        }
        return null;
    }

    private findAvailableElevator(request: Request): Elevator | null {
        return this.elevators.find(elevator => 
            this.occupancyManager.canAccommodate(elevator, request) && elevator.isIdle()
        ) || null;
    }

    private assignElevator(elevator: Elevator, request: Request): void {
        elevator.addRequest(request);
        elevator.moveTo(request.originFloor);
    }

    public updateElevatorState(elevatorId: number, state: State): void {
        const elevator = this.elevators.find(e => e.id === elevatorId);
        if (elevator) {
            elevator.setState(state);
        }
    }
}