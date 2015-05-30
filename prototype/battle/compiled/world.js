// Generated by CoffeeScript 1.7.1

/*
  World class
 */

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.World = (function() {
    World.prototype.DT = "World";

    World.prototype.E_NONEXISTENT_CELL = new Error("Non-existent cell");

    World.prototype.I_UPDATED = "updated";

    function World(level) {
      this.reactUpdated = __bind(this.reactUpdated, this);
      this.findEntityAt = __bind(this.findEntityAt, this);
      this.getNextCellFor = __bind(this.getNextCellFor, this);
      this.position = __bind(this.position, this);
      this.actorTurn = __bind(this.actorTurn, this);
      this.timeStateUpdated = __bind(this.timeStateUpdated, this);
      this.createTime = __bind(this.createTime, this);
      this.addEntity = __bind(this.addEntity, this);
      this.level = $.extend({}, level);
      this.entities = [];
      this.createTime();
    }

    World.prototype.addEntity = function(entity) {
      return this.entities.push(entity);
    };

    World.prototype.ROUND_STATE_START = "round state start";

    World.prototype.ROUND_STATE_MOVE = "round state move";

    World.prototype.ROUND_STATE_END = "round state end";

    World.prototype.roundState = void 0;

    World.prototype.createTime = function() {
      this.roundState = this.ROUND_STATE_START;
      return this.timeStateUpdated();
    };

    World.prototype.timeStateUpdated = function() {
      console.log("TIME STATE UPDATED", this.roundState);
      switch (this.roundState) {
        case this.ROUND_STATE_START:
          this.roundState = this.ROUND_STATE_MOVE;
          return this.timeStateUpdated();
        case this.ROUND_STATE_MOVE:
          return this.actorTurn(this.entities.slice(0));
        case this.ROUND_STATE_END:
          this.roundState = this.ROUND_STATE_START;
          return this.timeStateUpdated();
      }
    };

    World.prototype.TURN_TIME = 10000;

    World.prototype.TURN_AFTERTIME = 500;

    World.prototype.actorTurn = function(actors) {
      var completed, p, turnTimeout;
      if (actors.length === 0) {
        return setTimeout(((function(_this) {
          return function() {
            _this.roundState = _this.ROUND_STATE_END;
            return _this.timeStateUpdated();
          };
        })(this)), this.TURN_AFTERTIME);
      } else {
        p = actors[0];
        completed = (function(_this) {
          return function() {
            p.turnEnded();
            clearTimeout(turnTimeout);
            return _this.actorTurn(actors.slice(1));
          };
        })(this);
        turnTimeout = setTimeout(p.noop, this.TURN_TIME);
        $(p).one(p.I_ACTION_COMPLETED, completed);
        return p.act();
      }
    };

    World.prototype.position = function(entity, coord) {
      var cc;
      cc = utils.getCellIndex(coord.x, coord.y);
      if (this.level[cc] != null) {
        return coord;
      } else {
        console.error(this.DT, "World does not have a cell at a given coord " + cc);
        return entity.currentPosition;
      }
    };

    World.prototype.getNextCellFor = function(entity) {
      var cc, d, pos, v;
      pos = $.extend({}, entity.currentPosition);
      if (["n", "w"].indexOf(pos.d) !== -1) {
        v = -1;
      } else {
        v = 1;
      }
      if (["n", "s"].indexOf(pos.d) !== -1) {
        d = "y";
      } else {
        d = "x";
      }
      pos[d] += v;
      cc = utils.getCellIndex(pos.x, pos.y);
      if (this.level[cc] != null) {
        return {
          x: pos.x,
          y: pos.y
        };
      } else {
        console.error(this.DT, "World does not have a cell at a given coord " + cc);
        return null;
      }
    };

    World.prototype.findEntityAt = function(pos) {
      var c, entity, _i, _len, _ref;
      _ref = this.entities;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entity = _ref[_i];
        c = entity.currentPosition;
        if (c.x === pos.x && c.y === pos.y) {
          return entity;
        }
      }
      return null;
    };

    World.prototype.reactUpdated = function() {
      return $(this).trigger(this.I_UPDATED);
    };

    return World;

  })();

}).call(this);
