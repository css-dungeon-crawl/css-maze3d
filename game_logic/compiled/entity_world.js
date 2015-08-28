// Generated by CoffeeScript 1.7.1

/*
  World entity
 */

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  gameLogic.entities.World = (function(_super) {
    __extends(World, _super);

    World.prototype.DT = "gameLogic.entities.World";

    function World(app) {
      this.app = app;
      this.assureCellNonEmpty = __bind(this.assureCellNonEmpty, this);
      this.assureCellEmpty = __bind(this.assureCellEmpty, this);
      this.assureCellExistance = __bind(this.assureCellExistance, this);
      this.removeCharacter = __bind(this.removeCharacter, this);
      this.moveCharacter = __bind(this.moveCharacter, this);
      this.placeCharacter = __bind(this.placeCharacter, this);
      this.load = __bind(this.load, this);
      World.__super__.constructor.apply(this, arguments);
      console.log(this.DT, "Init world.");
      this.data = new gameLogic.data.World();
    }

    World.prototype.load = function(level) {
      this.data.set("level", dataTypes.Matrix2d.createFromLevelObject(level));
      return this.data.set("characters", new dataTypes.EntityMatrix2d());
    };

    World.E_NON_EMPTY_CELL = new Error("You are trying perform action on non empty cell!");

    World.E_EMPTY_CELL = new Error("You are trying permorm action on empty cell!");

    World.E_NONEXISTENT_CELL = new Error("Cell does not exists at the given level!");

    World.prototype.placeCharacter = function(cell, char) {
      this.assureCellExistance(cell);
      this.assureCellEmpty(cell);
      return this.data.get("characters").putData(cell, char);
    };

    World.prototype.moveCharacter = function(fromCell, toCell, char) {
      this.assureCellExistance(toCell);
      this.assureCellEmpty(toCell);
      this.data.get("characters").removeData(fromCell);
      return this.data.get("characters").putData(toCell, char);
    };

    World.prototype.removeCharacter = function(cell, char) {
      this.assureCellExistance(cell);
      this.assureCellNonEmpty(cell);
      return this.data.get("characters").removeData(cell);
    };

    World.prototype.assureCellExistance = function(cell) {
      if (!this.data.get("level").isCellContainsData(cell)) {
        throw this.s.E_NONEXISTENT_CELL;
      }
    };

    World.prototype.assureCellEmpty = function(cell) {
      if (this.data.get("characters").isCellContainsData(cell)) {
        throw this.s.E_NON_EMPTY_CELL;
      }
    };

    World.prototype.assureCellNonEmpty = function(cell) {
      if (!this.data.get("characters").isCellContainsData(cell)) {
        throw this.s.E_EMPTY_CELL;
      }
    };

    return World;

  })(gameLogic.Object);

}).call(this);
