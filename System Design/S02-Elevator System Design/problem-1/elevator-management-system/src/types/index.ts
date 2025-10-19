export interface Elevator {
    id: string;
    currentFloor: number;
    direction: 'up' | 'down' | null;
    occupancy: number;
    capacity: number;
    state: ElevatorState;
}

export interface Request {
    id: string;
    originatingFloor: number;
    destinationFloor: number;
}

export interface Passenger {
    id: string;
    weight: number;
    status: 'waiting' | 'inElevator' | 'arrived';
}

export enum ElevatorState {
    Moving,
    OpenDoor,
    CloseDoor,
    Idle
}

export interface OccupancyManager {
    checkOccupancy(elevator: Elevator): boolean;
    addPassenger(elevator: Elevator, passenger: Passenger): void;
    removePassenger(elevator: Elevator, passenger: Passenger): void;
}