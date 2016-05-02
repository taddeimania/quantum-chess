import Ember from 'ember';

export default Ember.Controller.extend({
  pieceMap: {
    "o": "p",
    "t": "k",
    "u": "r",
    "v": "b",
    "w": "n",
    "x": "p",
    "O": "p",
    "T": "k",
    "U": "r",
    "V": "b",
    "W": "n",
    "X": "p",
    undefined: "_",
    "": "_"
  },
  players: Ember.A(["white", "black"]),
  turnCounter: 0,
  whiteKills: Ember.A([]),
  blackKills: Ember.A([]),
  toFEN: function(teamName) {
    let matrix = this.get("model").tiles,
        pieces = [],
        team = teamName[0];
    matrix.forEach((row) => {
      let pieceRow = [];
      row.forEach((pieceObj) => {
        let piece = pieceObj.get("piece"),
            pieceToPush = "";
        pieceToPush = this.pieceMap[piece];
        if (pieceObj.get("team") === "white") {
          pieceToPush = pieceToPush.toUpperCase();
        }
        pieceRow.push(pieceToPush);
      });
      pieces.push(pieceRow);
    });
    pieces.map((row) => {
      let emptyCount = 0
      let x = row.reduce((total, cur) => {
        if (cur === "_"){
          emptyCount += 1;
        } else {
          return total + cur;
        }
      });
      console.log("O")
      console.log(x)
    })
  },
  takeTurn: function() {
    this.set("turnCounter", this.get("turnCounter") + 1);
  },
  currentTurn: function() {
    return this.get("players")[this.turnCounter % 2];
  }.property("turnCounter")
});
