// Generated by CoffeeScript 1.7.1

/*
  Actor's data
 */

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  gameLogic.data.Actor = (function(_super) {
    __extends(Actor, _super);

    Actor.prototype.DT = "gameLogic.data.Actor";

    function Actor() {
      this.init = __bind(this.init, this);
      Actor.__super__.constructor.apply(this, arguments);
      console.log(this.DT, "Init.");
    }

    Actor.prototype.init = function() {
      Actor.__super__.init.apply(this, arguments);
      this.set("inCharge", false);
      this.set("maxHealth", 0);
      return this.set("currentHealth", 0);
    };

    return Actor;

  })(chms.ard.AbstractReactiveData);

}).call(this);
