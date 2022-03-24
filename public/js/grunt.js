const app = {
    player: {
      x: 0,
      y: 0,
      direction: 'right'
    },
  
    targetCell : {
      x: 5,
      y: 3
    },
  
    gameOver : false,
  
    drawBoard: () => {
      let board = document.getElementById('board');
      for (let currentLine = 0; currentLine < 4; currentLine++) {
        let line = document.createElement('div');
        line.className = 'line';
  
        for (let currentColumn = 0; currentColumn < 6; currentColumn++) {
          let cell = document.createElement('div');
          cell.className = 'cell';
          if (currentColumn == app.targetCell.x && currentLine == app.targetCell.y) {
            cell.className += " targetCell";
          }
  
          // joueur
          if (currentColumn == app.player.x && currentLine == app.player.y) {
            let playerCell = document.createElement('div');
            playerCell.className = 'player';
            playerCell.className += ' '+app.player.direction;
            cell.appendChild(playerCell);
          }
          line.appendChild(cell);
        }
        
        board.appendChild(line);
      }
      app.isGameOver();
    },
  
    clearBoard: () => {
      let board = document.getElementById('board');
      while(board.firstChild) {
        board.firstChild.remove();
      }
      
    },
  
    redrawBoard: () => {
      app.clearBoard();
      app.drawBoard();
    },
  
    turnRight: () => {
      if (app.gameOver) {
        return;
      }
  
      switch ( app.player.direction) {
        case 'right':
          app.player.direction = 'down';
          break;
        case 'down':
          app.player.direction = 'left';
          break;
        case 'left':
          app.player.direction = 'up';
          break;
        case 'up':
          app.player.direction = 'right';
          break;
        default:
          console.log('Impossible de faire tourner le joueur.');
          return;
      }
      app.redrawBoard();
    },
  
    turnLeft: () => {
      if (app.gameOver) {
        return;
      }
  
      switch ( app.player.direction) {
        case 'right':
          app.player.direction = 'up';
          break;
        case 'down':
          app.player.direction = 'right';
          break;
        case 'left':
          app.player.direction = 'down';
          break;
        case 'up':
          app.player.direction = 'left';
          break;
        default:
          console.log('Impossible de faire tourner le joueur.');
          return;
      }
      app.redrawBoard();
    },
  
    moveForward: () => {
      if (app.gameOver) {
        return;
      }
  
      switch (app.player.direction) {
        case 'right':
          if (app.player.x >= 5) {
            console.log("Impossible d'avancer. Limite de la grille atteinte.");
          } else {
            app.player.x += 1;
          }
          break;
        case 'down':
          if (app.player.y >= 3) {
            console.log("Impossible d'avancer. Limite de la grille atteinte.");
          } else {
            app.player.y += 1;
          }
          break;
        case 'left':
          if (app.player.x <= 0) {
            console.log("Impossible d'avancer. Limite de la grille atteinte.");
          } else {
            app.player.x -= 1;
          }
          break;
        case 'up':
          if (app.player.y <= 0) {
            console.log("Impossible d'avancer. Limite de la grille atteinte.");
          } else {
            app.player.y -= 1;
          }
          break;
        default:
          console.log('Impossible de faire avancer le joueur.');
          return;
      }
      app.redrawBoard();
    },
  
    listenKeyboardEvents: () => {
      document.addEventListener('keyup', (event) => {
        switch( event.keyCode ) {
          case 37: // left
            app.turnLeft();
            break;
          case 38: // up
            app.moveForward();
            break;
          case 39: // right
            app.turnRight();
            break;
        }
      });
    },
    isGameOver: () => {
      if (app.player.x == app.targetCell.x && app.player.y == app.targetCell.y) {
        alert('Victoire !');
        app.gameOver = true;
      }
    },
  
    init: function () {
      app.drawBoard();
      app.listenKeyboardEvents();
    }
  };
  
  document.addEventListener('DOMContentLoaded', app.init);