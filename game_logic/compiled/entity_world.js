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
      this.load = __bind(this.load, this);
      World.__super__.constructor.apply(this, arguments);
      console.log(this.DT, "Init world.");
      this.data = new gameLogic.data.World();
    }

    World.prototype.load = function(level) {
      level = utils.serializers.Level.serializeObjectToWorldTree(level);
      return this.data.set("level", level);
    };

    return World;

  })(gameLogic.Object);

}).call(this);
