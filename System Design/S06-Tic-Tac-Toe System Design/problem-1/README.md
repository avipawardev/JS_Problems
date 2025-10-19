# Tic-Tac-Toe with Diagonal Lock

## How to Run
```bash
node tic-tac-toe.js
# or
npm start
```

## Game Rules
- 3x3 grid with rows A-C and columns 1-3
- Players register with unique names and symbols
- **Diagonal Lock**: If a player marks both diagonal corners (A1+C3 or A3+C1), center B2 locks for opponent
- Win by getting 3 in a row/column/diagonal
- Input format: A1, B2, C3, etc.

## Example
```
Player 1: X marks A1, then C3 → B2 locks for Player 1 only
Player 2: O cannot play B2 (error shown)
```