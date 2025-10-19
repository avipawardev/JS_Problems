export class State {
    static MovingState = 'MOVING';
    static OpenDoor = 'OPEN_DOOR';
    static CloseDoor = 'CLOSE_DOOR';

    private currentState: string;

    constructor(initialState: string) {
        this.currentState = initialState;
    }

    public getCurrentState(): string {
        return this.currentState;
    }

    public setCurrentState(newState: string): void {
        this.currentState = newState;
    }

    public isMoving(): boolean {
        return this.currentState === State.MovingState;
    }

    public isDoorOpen(): boolean {
        return this.currentState === State.OpenDoor;
    }

    public isDoorClosed(): boolean {
        return this.currentState === State.CloseDoor;
    }
}