export class Scheduler {
    private elevators: Elevator[];
    private requests: Request[];

    constructor(elevators: Elevator[]) {
        this.elevators = elevators;
        this.requests = [];
    }

    public addRequest(request: Request): void {
        this.requests.push(request);
        this.assignElevator(request);
    }

    private assignElevator(request: Request): void {
        const bestElevator = this.findBestElevator(request);
        if (bestElevator) {
            bestElevator.addRequest(request);
        }
    }

    private findBestElevator(request: Request): Elevator | null {
        let bestElevator: Elevator | null = null;
        let shortestDistance = Infinity;

        for (const elevator of this.elevators) {
            const distance = this.calculateDistance(elevator, request);
            if (distance < shortestDistance && elevator.canServeRequest(request)) {
                shortestDistance = distance;
                bestElevator = elevator;
            }
        }

        return bestElevator;
    }

    private calculateDistance(elevator: Elevator, request: Request): number {
        return Math.abs(elevator.currentFloor - request.originFloor);
    }

    public updateElevatorStates(): void {
        for (const elevator of this.elevators) {
            elevator.updateState();
        }
    }
}