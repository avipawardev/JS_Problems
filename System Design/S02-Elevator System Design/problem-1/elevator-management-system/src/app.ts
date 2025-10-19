import express from 'express';
import { ElevatorController } from './controllers/elevatorController';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const elevatorController = new ElevatorController();

app.post('/elevator/request', elevatorController.handleRequest.bind(elevatorController));
app.get('/elevator/status', elevatorController.getStatus.bind(elevatorController));

app.listen(port, () => {
    console.log(`Elevator Management System is running on http://localhost:${port}`);
});