import Ember from 'ember';
import Board from '../models/board';
import Tile from '../models/tile';

export default Ember.Route.extend({
  model() {
    let colors = ["white", "black"],
        size = 8,
        tiles = Ember.A([]),
        board = Board.create({}),
        rows = [0, 1, 6, 7],
        cols = [0, 1, 2, 4, 5, 6, 7];

    for (let j = 0 ; j < size ; j++) {
      let tileRow = Ember.A([]);
      let start = j % 2;
      for (let i = 0 ; i < size ; i++) {
        let color = colors[(i + start) % 2];
        let tile = Tile.create({
          color: color,
          x: j,
          y: i
        });
        tileRow.pushObject(tile);
      }
      tiles.push(tileRow);
    }

    board.tiles = tiles;
    rows.forEach((x) => {
      cols.forEach((y) => {
        board.setTile(x, y, "o");
      });
    });
    [0, 1].forEach((row) => {
      board.tiles[row].forEach((tile) => {
        tile.team = "black";
      });
    });
    [6, 7].forEach((row) => {
      board.tiles[row].forEach((tile) => {
        tile.team = "white";
      });
    });
    board.setTile(0, 3, "t");
    board.setTile(1, 3, "o");
    board.setTile(7, 3, "t");
    board.setTile(6, 3, "o");
    return board;
  }
});
