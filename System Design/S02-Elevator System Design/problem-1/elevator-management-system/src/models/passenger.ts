export class Passenger {
    weight: number;
    status: 'waiting' | 'in_elevator' | 'arrived';

    constructor(weight: number) {
        this.weight = weight;
        this.status = 'waiting';
    }

    boardElevator() {
        this.status = 'in_elevator';
    }

    arrive() {
        this.status = 'arrived';
    }
}