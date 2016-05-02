import Ember from 'ember';

export default Ember.Object.extend({
  whitePieces: Ember.A(["X", "X", "X", "X", "X", "X", "X", "X", "U", "U", "W", "W", "V", "V", "S"]),
  blackPieces: Ember.A(["x", "x", "x", "x", "x", "x", "x", "x", "u", "u", "w", "w", "v", "v", "s"]),
  setPieces: function(color, array) {
    this.set(color, array);
  },
  setVal: function(x, y, key, val) {
    let tileMatch = this.get("tiles")[x].find((tile) => {
      return tile.get("y") === y;
    });
    tileMatch.set(key, val);
  },
  setTile: function(x, y, piece) {
    this.setVal(x, y, "piece", piece);
  }
});

