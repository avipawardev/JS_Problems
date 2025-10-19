# Elevator Management System

## Overview
The Elevator Management System is designed to efficiently manage multiple elevators in a building, handling passenger requests and simulating elevator movements. The system implements occupancy logic to ensure that elevators do not exceed their capacity while providing real-time updates on their status.

## Features
- **Multiple Elevator Management**: Supports multiple elevators operating simultaneously.
- **Occupancy Logic**: Ensures elevators do not exceed their maximum capacity.
- **Request Handling**: Manages passenger requests for elevator services.
- **Movement Simulation**: Simulates the movement of elevators between floors.
- **State Transitions**: Handles various states of elevators, including moving, door opening, and door closing.

## Project Structure
```
elevator-management-system
├── src
│   ├── index.ts
│   ├── app.ts
│   ├── controllers
│   │   └── elevatorController.ts
│   ├── services
│   │   ├── elevatorService.ts
│   │   ├── scheduler.ts
│   │   └── occupancyManager.ts
│   ├── models
│   │   ├── elevator.ts
│   │   ├── request.ts
│   │   ├── passenger.ts
│   │   └── state.ts
│   ├── simulator
│   │   ├── simulator.ts
│   │   └── movementEngine.ts
│   ├── events
│   │   └── eventBus.ts
│   ├── utils
│   │   └── logger.ts
│   └── types
│       └── index.ts
├── tests
│   ├── unit
│   │   ├── elevator.test.ts
│   │   └── occupancyManager.test.ts
│   └── integration
│       └── scheduler.integration.test.ts
├── package.json
├── tsconfig.json
├── jest.config.js
├── .eslintrc.js
└── README.md
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd elevator-management-system
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage
To start the application, run:
```
npm start
```

## Testing
To run the tests, use:
```
npm test
```

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.