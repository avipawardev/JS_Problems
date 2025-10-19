import express from 'express';
import { createServer } from 'http';
import { App } from './app';

const app = new App();
const server = createServer(app.getExpressApp());

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Elevator Management System is running on http://localhost:${PORT}`);
});