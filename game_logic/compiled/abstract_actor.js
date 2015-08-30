// Generated by CoffeeScript 1.7.1

/*
  Abstract actor
 */

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  gameLogic.actors.AbstractActor = (function(_super) {
    __extends(AbstractActor, _super);

    AbstractActor.UID_KEY = "actor";

    function AbstractActor(app) {
      this.app = app;
      this.getMoveDimensionAndVector = __bind(this.getMoveDimensionAndVector, this);
      this.getActorPosition = __bind(this.getActorPosition, this);
      this.assureActorExists = __bind(this.assureActorExists, this);
      this.assureActorInCharge = __bind(this.assureActorInCharge, this);
      this.reactActionCompleted = __bind(this.reactActionCompleted, this);
      this.actionTurnAntiClockwise = __bind(this.actionTurnAntiClockwise, this);
      this.actionTurnClockwise = __bind(this.actionTurnClockwise, this);
      this.actionStrafeRight = __bind(this.actionStrafeRight, this);
      this.actionStrafeLeft = __bind(this.actionStrafeLeft, this);
      this.actionMoveBackward = __bind(this.actionMoveBackward, this);
      this.actionMoveForward = __bind(this.actionMoveForward, this);
      this.actionMove = __bind(this.actionMove, this);
      this.performMove = __bind(this.performMove, this);
      this.act = __bind(this.act, this);
      this.actionNoop = __bind(this.actionNoop, this);
      this.performAction = __bind(this.performAction, this);
      this.turnEnded = __bind(this.turnEnded, this);
      this.turnStart = __bind(this.turnStart, this);
      AbstractActor.__super__.constructor.apply(this, arguments);
      this.id = chms.utils.Uniq.gen(this.s.UID_KEY);
      this.data = new gameLogic.data.Actor();
      $(this.data).asEventStream(this.data.s.I_DATA_CHANGED).filter((function(_this) {
        return function(v) {
          return v.key === "inCharge";
        };
      })(this)).onValue(this.act);
    }

    AbstractActor.prototype.turnStart = function() {
      return this.data.set("inCharge", true);
    };

    AbstractActor.prototype.turnEnded = function() {
      return this.data.set("inCharge", false);
    };

    AbstractActor.prototype.performAction = function(action) {
      this.assureActorInCharge();
      return action();
    };

    AbstractActor.prototype.actionNoop = function() {
      return this.performAction(this.reactActionCompleted);
    };

    AbstractActor.prototype.act = function() {};

    AbstractActor.prototype.performMove = function(move) {
      this.assureActorExists();
      return this.performAction(move);
    };

    AbstractActor.prototype.actionMove = function(forward) {
      if (forward == null) {
        forward = true;
      }
      return this.performMove((function(_this) {
        return function() {
          var dv, newPos, pos;
          pos = _this.getActorPosition();
          dv = _this.getMoveDimensionAndVector(pos.cell, pos.dir, forward);
          newPos = [pos.cell[0], pos.cell[1]];
          newPos[dv.dim] += dv.vector;
          return _this.app.world.moveActor(_this, newPos);
        };
      })(this));
    };

    AbstractActor.prototype.actionMoveForward = function() {
      return this.actionMove();
    };

    AbstractActor.prototype.actionMoveBackward = function() {
      return this.actionMove(false);
    };

    AbstractActor.prototype.actionStrafeLeft = function() {
      return this.performMove((function(_this) {
        return function() {};
      })(this));
    };

    AbstractActor.prototype.actionStrafeRight = function() {
      return this.performMove((function(_this) {
        return function() {};
      })(this));
    };

    AbstractActor.prototype.actionTurnClockwise = function() {
      return this.performMove((function(_this) {
        return function() {};
      })(this));
    };

    AbstractActor.prototype.actionTurnAntiClockwise = function() {
      return this.performMove((function(_this) {
        return function() {};
      })(this));
    };

    AbstractActor.I_ACTION_COMPLETED = "action_completed";

    AbstractActor.prototype.reactActionCompleted = function() {
      return $(this).trigger(this.s.I_ACTION_COMPLETED);
    };

    AbstractActor.E_ACTOR_NOT_IN_CHARGE = new Error("Actor does not in charge!");

    AbstractActor.prototype.assureActorInCharge = function() {
      if (!this.data.get("inCharge")) {
        throw this.s.E_ACTOR_NOT_IN_CHARGE;
      }
    };

    AbstractActor.prototype.assureActorExists = function() {
      return this.app.world.assureActorExists(this);
    };

    AbstractActor.prototype.getActorPosition = function() {
      return this.app.world.getActorPosition(this);
    };

    AbstractActor.prototype.getMoveDimensionAndVector = function(cell, direction, forward) {
      var dim, vector, wd;
      if (forward == null) {
        forward = true;
      }
      wd = dataTypes.WorldDirection;
      if (direction === wd.N || direction === wd.S) {
        dim = 1;
      } else {
        dim = 0;
      }
      if (direction === wd.N || direction === wd.E) {
        vector = +1;
      } else {
        vector = -1;
      }
      if (!forward) {
        vector *= -1;
      }
      return {
        dim: dim,
        vector: vector
      };
    };

    return AbstractActor;

  })(gameLogic.Object);

}).call(this);
