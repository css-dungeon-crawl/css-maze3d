// Generated by CoffeeScript 1.7.1

/*
  Actors on level
 */

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  levelEditor.data.LevelActors = (function(_super) {
    __extends(LevelActors, _super);

    function LevelActors() {
      this.isAnyActorOnCell = __bind(this.isAnyActorOnCell, this);
      this.placeActor = __bind(this.placeActor, this);
      this.init = __bind(this.init, this);
      return LevelActors.__super__.constructor.apply(this, arguments);
    }

    LevelActors.prototype.DT = "levelEditor.data.LevelActors";

    LevelActors.prototype.init = function() {
      LevelActors.__super__.init.apply(this, arguments);
      return this.set("actors", []);
    };

    LevelActors.prototype.placeActor = function(actorpos) {
      if (!this.isAnyActorOnCell(actorpos.cell)) {
        return this.tarray.push("actors", actorpos);
      } else {
        return console.warn(this.DT, "placeActor: Actor already exists on " + actorpos.cell);
      }
    };

    LevelActors.prototype.isAnyActorOnCell = function(cell) {
      return this.get("actors").reduce((function(_this) {
        return function(acc, cur) {
          return dataTypes.WorldCell.isEqual(cur.cell, cell);
        };
      })(this), false);
    };

    return LevelActors;

  })(chms.ard.AbstractReactiveData);

}).call(this);
