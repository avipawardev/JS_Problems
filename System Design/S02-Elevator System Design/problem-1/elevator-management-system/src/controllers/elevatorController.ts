class ElevatorController {
    constructor(elevatorService, occupancyManager) {
        this.elevatorService = elevatorService;
        this.occupancyManager = occupancyManager;
    }

    requestElevator(req, res) {
        const { originatingFloor, destinationFloor } = req.body;
        const request = this.elevatorService.createRequest(originatingFloor, destinationFloor);
        const assignedElevator = this.elevatorService.assignElevator(request);

        if (assignedElevator) {
            res.status(200).json({
                message: 'Elevator assigned successfully',
                elevatorId: assignedElevator.id,
                currentFloor: assignedElevator.currentFloor,
            });
        } else {
            res.status(503).json({ message: 'No available elevators at the moment' });
        }
    }

    updateElevatorState(req, res) {
        const { elevatorId, newState } = req.body;
        const updatedElevator = this.elevatorService.updateElevatorState(elevatorId, newState);

        if (updatedElevator) {
            res.status(200).json({
                message: 'Elevator state updated successfully',
                elevatorId: updatedElevator.id,
                newState: updatedElevator.state,
            });
        } else {
            res.status(404).json({ message: 'Elevator not found' });
        }
    }

    getElevatorStatus(req, res) {
        const { elevatorId } = req.params;
        const elevatorStatus = this.elevatorService.getElevatorStatus(elevatorId);

        if (elevatorStatus) {
            res.status(200).json(elevatorStatus);
        } else {
            res.status(404).json({ message: 'Elevator not found' });
        }
    }
}

export default ElevatorController;