const readline = require('readline');

class TicTacToe {
    constructor() {
        this.board = [['_', '_', '_'], ['_', '_', '_'], ['_', '_', '_']];
        this.players = [];
        this.currentPlayer = 0;
        this.gameOver = false;
        this.lockedCenter = null;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    displayBoard() {
        console.log('\n  1 2 3');
        this.board.forEach((row, i) => {
            console.log(`${String.fromCharCode(65 + i)} ${row.join(' ')}`);
        });
        console.log();
    }

    parseMove(move) {
        if (move.length !== 2) throw new Error('Invalid format');
        const row = move[0].toUpperCase().charCodeAt(0) - 65;
        const col = parseInt(move[1]) - 1;
        if (row < 0 || row > 2 || col < 0 || col > 2) throw new Error('Out of bounds');
        return [row, col];
    }

    checkDiagonalLock(player) {
        const symbol = this.players[player].symbol;
        const corners = [[0,0], [2,2], [0,2], [2,0]];
        
        if ((this.board[0][0] === symbol && this.board[2][2] === symbol) ||
            (this.board[0][2] === symbol && this.board[2][0] === symbol)) {
            if (this.board[1][1] === '_') {
                this.lockedCenter = player;
            }
        }
    }

    makeMove(move) {
        const [row, col] = this.parseMove(move);
        
        if (this.board[row][col] !== '_') {
            throw new Error('Cell already occupied');
        }

        if (row === 1 && col === 1 && this.lockedCenter !== null && this.lockedCenter !== this.currentPlayer) {
            throw new Error('Center cell is locked for opponent');
        }

        this.board[row][col] = this.players[this.currentPlayer].symbol;
        this.checkDiagonalLock(this.currentPlayer);
        
        if (this.checkWin()) {
            this.gameOver = true;
            return `${this.players[this.currentPlayer].name} wins!`;
        }
        
        if (this.checkDraw()) {
            this.gameOver = true;
            return "It's a draw!";
        }

        this.currentPlayer = 1 - this.currentPlayer;
        return null;
    }

    checkWin() {
        const symbol = this.players[this.currentPlayer].symbol;
        
        // Check rows and columns
        for (let i = 0; i < 3; i++) {
            if (this.board[i].every(cell => cell === symbol) ||
                this.board.every(row => row[i] === symbol)) {
                return true;
            }
        }
        
        // Check diagonals
        return (this.board[0][0] === symbol && this.board[1][1] === symbol && this.board[2][2] === symbol) ||
               (this.board[0][2] === symbol && this.board[1][1] === symbol && this.board[2][0] === symbol);
    }

    checkDraw() {
        return this.board.every(row => row.every(cell => cell !== '_'));
    }

    async getPlayerInfo() {
        for (let i = 0; i < 2; i++) {
            const name = await this.question(`Player ${i + 1}, enter your name: `);
            let symbol;
            
            while (true) {
                symbol = await this.question(`${name}, enter your symbol: `);
                if (symbol === '_') {
                    console.log('Error: Cannot use _ as symbol');
                    continue;
                }
                if (this.players.some(p => p.symbol === symbol)) {
                    console.log('Error: Symbol already taken');
                    continue;
                }
                break;
            }
            
            this.players.push({ name, symbol });
        }
    }

    question(prompt) {
        return new Promise(resolve => this.rl.question(prompt, resolve));
    }

    async playGame() {
        console.log('Welcome to Tic-Tac-Toe with Diagonal Lock!');
        
        await this.getPlayerInfo();
        
        while (!this.gameOver) {
            this.displayBoard();
            const currentPlayerInfo = this.players[this.currentPlayer];
            
            try {
                const move = await this.question(`${currentPlayerInfo.name} (${currentPlayerInfo.symbol}), enter your move (e.g., A1): `);
                const result = this.makeMove(move);
                
                if (result) {
                    this.displayBoard();
                    console.log(result);
                    break;
                }
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }
        }
        
        this.rl.close();
    }
}

const game = new TicTacToe();
game.playGame();