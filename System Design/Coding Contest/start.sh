#!/bin/bash

echo "🚀 Starting TaskFlow Pro..."

# Kill any existing processes
lsof -ti:5000 | xargs kill -9 2>/dev/null || true
lsof -ti:5173 | xargs kill -9 2>/dev/null || true

echo "📦 Installing dependencies..."

# Install server dependencies
cd server
npm install
echo "✅ Server dependencies installed"

# Install client dependencies  
cd ../client
npm install
echo "✅ Client dependencies installed"

echo "🎯 Starting servers..."

# Start backend in background
cd ../server
npm run dev &
SERVER_PID=$!

# Wait a moment for server to start
sleep 3

# Start frontend
cd ../client
npm run dev &
CLIENT_PID=$!

echo "🎉 TaskFlow Pro is running!"
echo "📊 Backend: http://localhost:5000"
echo "🌐 Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for user to stop
wait