import Ember from 'ember';

export default Ember.Component.extend({
  labelColor: function() {
    return this.get("tileObj.team");
  }.property("tileObj.team", "tileObj.x", "tileObj.y"),
  label: function() {
    return this.get("tileObj.piece");
  }.property("tileObj.piece", "tileObj.x", "tileObj.y"),
  occupied: function() {
    let controller = this.get('targetObject'),
        currentTurn = controller.get("currentTurn");

    if (!controller.get("picked")){
      return Boolean(this.get("tileObj.piece") && this.get("tileObj.team") === currentTurn);
    }
  }.property("tileObj.piece", "targetObject.picked", "targetObject.movingTile.x", "targetObject.movingTile.y"),
  occupiedVal: function() {
    if (this.get("occupied")) {
      return "occupied";
    }
  }.property("tileObj.piece", "targetObject.picked"),
  selectedVal: function() {
    if (this.get("selected")) {
      return "selected";
    }
  }.property("selected", "targetObject.movingTile.selected"),
  actions: {
    select: function() {
      let controller = this.get('targetObject'),
          board = controller.get("model"),
          obj = this.get('tileObj'),
          picked = controller.get("picked");

      if (picked) {
        let movedSpot = controller.get("movingTile");
        let movedTile = movedSpot.get("tileObj");
        if (movedTile.team === obj.team && movedTile.x === obj.x && movedTile.y === obj.y){
          return ;
        }
        if (movedTile.team !== obj.team){
          if (obj.piece === "o") {
            obj.setPiece(board, obj.team);
          } else if (obj.piece === "t" || obj.piece === "T") {
            console.log("GAME OVER");
          }
          if (obj.team === "white"){
            controller.blackKills.pushObject(obj.piece);
          } else {
            controller.whiteKills.pushObject(obj.piece);
          }
        }
        movedSpot.set("selected", false);
        movedTile.set("x", obj.x);
        movedTile.set("y", obj.y);
        obj.set("team", movedTile.team);
        if (obj.color === "white" || (movedTile.get('piece') === "T" || movedTile.get('piece') === "t")){
          obj.set("piece", movedTile.get("piece"));
        } else {
          obj.releasePiece(board, movedTile.get("piece"));
          obj.set("piece", "o");
        }
        movedTile.set("piece", "");
        controller.set("movingTile", undefined);
        controller.set("picked", false);
        controller.takeTurn();

      } else if (this.get("occupied")){
        controller.set("movingTile", this);
        controller.set("picked", true);
        this.set("selected", true);
        if (obj.piece === "o"){
          obj.setPiece(board, this.get("tileObj.team"));
        }
        controller.toFEN(obj.team);
      }
    }
  }
});
