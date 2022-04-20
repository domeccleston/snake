function range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => i + start);
}

function max(array) {
  return Math.max(...array);
}

function clone(object) {
  return JSON.parse(JSON.stringify(object));
}

const HEIGHT = 40;
const WIDTH = 40;

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Snake {
  constructor(data, length) {
    this.head = new Node(data);
    this.length = length;
    this.direction = "left";
  }

  add(data) {
    const newNode = new Node(data);

    let current;

    if (!this.head) {
      this.head = newNode;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.length++;
  }

  getNewCoords(coords, direction) {
    if (direction === "up") {
      coords.x -= 1;
    } else if (direction === "down") {
      coords.x += 1;
    } else if (direction === "left") {
      coords.y -= 1;
    } else if (direction === "right") {
      coords.y += 1;
    }
    return coords;
  }

  move() {
    let current = this.head.next;
    let prev = clone(this.head);
    this.head.data = this.getNewCoords(this.head.data, this.direction);

    while (current) {
      current.data.x = prev.data.x;
      current.data.y = prev.data.y;
      prev = prev.next;
      current = current.next;
    }
  }

  outOfBounds() {
    if (this.head.data.x < 0 || this.head.data.x > WIDTH) {
      return true;
    }
    if (this.head.data.y < 0 || this.head.data.y > HEIGHT) {
      return true;
    }
  }

  print() {
    let current = this.head;
    while (current) {
      current = current.next;
    }
  }
}

class Food {
  constructor(board) {
    this.x = Math.floor(Math.random() * board.length);
    this.y = Math.floor(Math.random() * board[0].length);
  }
}

class Game {
  constructor() {
    this.timerID = null;
    this.timeouts = [];
    this.ended = false;
    this.interval = 100;
    this.score = 0;
    this.highScore = window.localStorage.getItem("highScore") || 0;
    this.board = this.createBoard();
    this.snake = this.createSnake({ x: 10, y: 10 }, 1);
    this.snake.add({ x: 10, y: 11 });
    this.snake.add({ x: 10, y: 12 });
    this.snake.add({ x: 10, y: 13 });
    this.snake.add({ x: 10, y: 14 });
    this.snake.add({ x: 10, y: 15 });
    this.snake.add({ x: 10, y: 16 });
    this.snake.add({ x: 10, y: 17 });
    this.addFoodToBoard();
    this.addSnakeToBoard();
    this.addListeners();
    this.addGameToWindow();
    this.updateHighScore();
    this.startGame();
  }

  addGameToWindow() {
    if (typeof window !== "undefined") {
      window.game = this;
    }
  }

  addListeners() {
    const keys = {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
    };

    const opposites = {
      up: "down",
      down: "up",
      left: "right",
      right: "left",
    };

    document.addEventListener("keydown", (e) => {
      const key = keys[e.key];
      if (key) {
        if (this.snake.direction !== opposites[key]) {
          this.snake.direction = key;
        }
      }
      if (e.key === " ") {
        this.startGame();
      }
    });
  }

  updateScore() {
    const score = document.querySelector(".score");
    score.innerText = this.score;
  }

  updateHighScore() {
    if (this.score > this.highScore) {
      this.highScore = this.score;
      window.localStorage.setItem("highScore", this.highScore);
    }
    const highScoreEl = document.querySelector(".high-score");
    highScoreEl.innerText = this.highScore;
  }

  startGame() {
    this.paintBoard();
    this.updateScore();
    this.updateHighScore();
    this.removeSnakeFromBoard();
    this.snake.move();
    this.addSnakeToBoard();
    // if (!this.ended) {
    //   console.log(this.interval);
    //   this.timerID = setTimeout(this.startGame.bind(this), this.interval);
    //   this.timeouts.push(this.timerID);
    // }
  }

  gameOver() {
    this.ended = true;
    this.timeouts.forEach((timerId) => clearTimeout(timerId));
    this.updateHighScore();
    this.removeSnakeFromBoard();
    document.querySelector(".game-over").classList.add("flex");
    document.querySelector(".game-over").classList.remove("hidden");
    document
      .querySelector(".game-over-button")
      .addEventListener("click", () => {
        this.restart();
      });
  }

  restart() {
    window.location.reload();
  }

  createSnake(data, length) {
    return new Snake(data, length);
  }

  removeSnakeFromBoard() {
    let current = this.snake.head;
    while (current) {
      this.board[current.data.x][current.data.y] = 0;
      current = current.next;
    }
  }

  addSnakeToBoard() {
    let current = this.snake.head;

    const currentSquare = this.board[current.data.x][current.data.y];

    if (this.snake.outOfBounds()) {
      this.gameOver();
    }

    while (current) {
      if (this.board[current.data.x][current.data.y] === "F") {
        // this.snake.add({ x: current.data.x, y: current.data.y });
        this.score = this.score + 1;
        this.interval = this.interval - 10;
        this.board[current.data.x][current.data.y] = 0;
        this.addFoodToBoard();
      }

    console.log({ currentSquare });

    // if (currentSquare === "S") {
    //   this.gameOver();
    // }

      this.board[current.data.x][current.data.y] = "S";
      current = current.next;
    }
  }

  createBoard(height = HEIGHT, width = 40) {
    const board = [];
    for (const y of range(0, height)) {
      const row = [];
      for (const x of range(0, width)) {
        row.push(0);
      }
      board.push(row);
    }
    return board;
  }

  paintBoard() {
    const board = this.board;
    const height = board.length;
    const width = board[0].length;

    const table = document.createElement("table");
    for (const h of range(0, height - 1)) {
      const row = document.createElement("tr");
      for (const w of range(0, width - 1)) {
        const cell = document.createElement("td");
        cell.classList.add("cell");
        if (board[h][w] === "S") {
          cell.classList.add("snake");
        } else {
          if (board[h][w] === "F") {
            cell.classList.add("food");
          }
        }
        row.appendChild(cell);
      }
      table.appendChild(row);
    }
    const prevTable = document.querySelector("table");
    if (prevTable) document.body.removeChild(prevTable);
    document.body.appendChild(table);
  }

  addFoodToBoard() {
    this.food = new Food(this.board);
    this.board[this.food.x][this.food.y] = "F";
  }
}

new Game();
