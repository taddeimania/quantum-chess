import Ember from 'ember';

export default Ember.Object.extend({
  getPiecesColor: function(color) {
    return color === "black" ? "blackPieces" : "whitePieces";
  },
  getPieces: function(board, color) {
    return board.get(this.getPiecesColor(color));
  },
  getRandomPiece: function(board, color) {
    let array = this.getPieces(board, color);
    return array[Math.floor(Math.random()*array.length)];
  },
  setPiece: function(board, color) {
    let arrayName = this.getPiecesColor(color);
    let array = this.getPieces(board, color);
    let randomPiece = this.getRandomPiece(board, color);
    var index = array.indexOf(randomPiece);
    if (index >= 0) {
      array.splice( index, 1 );
    }
    this.set("piece", randomPiece);
    board.setPieces(arrayName, array);
  },
  releasePiece: function(board, piece) {
    let color = this.get("team");
    let arrayName = this.getPiecesColor(color);
    let array = this.getPieces(board, color);
    array.push(piece);
    board.setPieces(arrayName, array);
  }
});
