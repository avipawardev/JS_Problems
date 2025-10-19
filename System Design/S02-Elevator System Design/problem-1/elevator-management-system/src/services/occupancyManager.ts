export class OccupancyManager {
    private maxOccupancy: number;
    private currentOccupancy: Map<number, number>; // Maps elevator ID to current occupancy

    constructor(maxOccupancy: number) {
        this.maxOccupancy = maxOccupancy;
        this.currentOccupancy = new Map();
    }

    public requestEntry(elevatorId: number, passengerCount: number): boolean {
        const currentCount = this.currentOccupancy.get(elevatorId) || 0;
        if (currentCount + passengerCount <= this.maxOccupancy) {
            this.currentOccupancy.set(elevatorId, currentCount + passengerCount);
            return true;
        }
        return false; // Deny entry if it exceeds max occupancy
    }

    public requestExit(elevatorId: number, passengerCount: number): boolean {
        const currentCount = this.currentOccupancy.get(elevatorId) || 0;
        if (currentCount - passengerCount >= 0) {
            this.currentOccupancy.set(elevatorId, currentCount - passengerCount);
            return true;
        }
        return false; // Deny exit if it exceeds current occupancy
    }

    public getCurrentOccupancy(elevatorId: number): number {
        return this.currentOccupancy.get(elevatorId) || 0;
    }

    public resetOccupancy(elevatorId: number): void {
        this.currentOccupancy.set(elevatorId, 0);
    }
}