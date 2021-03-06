// Generated by CoffeeScript 1.7.1

/*
  Time data
 */

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  gameLogic.data.Time = (function(_super) {
    __extends(Time, _super);

    Time.prototype.DT = "gameLogic.data.Time";

    Time.ROUND_STATE_START = "start";

    Time.ROUND_STATE_TURN = "turn";

    Time.ROUND_STATE_END = "end";

    function Time() {
      this.set = __bind(this.set, this);
      this.setInitialValues = __bind(this.setInitialValues, this);
      this.init = __bind(this.init, this);
      Time.__super__.constructor.apply(this, arguments);
      console.log(this.DT, "Init.");
    }

    Time.prototype.init = function() {
      Time.__super__.init.apply(this, arguments);
      this.set("state", null);
      this.set("roundNumber", 0);
      return this.set("actorsMoveQueue", []);
    };

    Time.prototype.setInitialValues = function() {
      this.set("state", this.s.ROUND_STATE_START);
      return this.set("roundNumber", 1);
    };

    Time.E_NOT_ALL_ACTORS_PERFOMED_ACTION = "Some actors does not perform action in a given round.";

    Time.prototype.set = function(key) {
      if (key === "state" && (this.get("actorsMoveQueue") != null) && this.get("actorsMoveQueue").length > 0) {
        throw this.s.E_NOT_ALL_ACTORS_PERFOMED_ACTION;
      }
      return Time.__super__.set.apply(this, arguments);
    };

    return Time;

  })(chms.ard.AbstractReactiveData);

}).call(this);
