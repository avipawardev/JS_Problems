export class Simulator {
    private elevators: Elevator[];
    private requests: Request[];

    constructor(elevators: Elevator[]) {
        this.elevators = elevators;
        this.requests = [];
    }

    public addRequest(request: Request): void {
        this.requests.push(request);
        this.processRequests();
    }

    private processRequests(): void {
        this.requests.forEach(request => {
            const bestElevator = this.findBestElevator(request);
            if (bestElevator) {
                this.moveElevator(bestElevator, request);
            }
        });
        this.requests = [];
    }

    private findBestElevator(request: Request): Elevator | null {
        // Logic to find the best elevator based on current state and request
        return this.elevators[0]; // Placeholder for actual logic
    }

    private moveElevator(elevator: Elevator, request: Request): void {
        // Logic to simulate elevator movement and state transitions
        elevator.moveTo(request.destinationFloor);
    }
}