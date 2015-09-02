// Generated by CoffeeScript 1.7.1

/*
  Actor  position data type
 */

(function() {
  dataTypes.ActorPosition = {
    get: (function(_this) {
      return function(entity, cell, dir) {
        return {
          actor: entity,
          cell: cell,
          dir: dir,
          id: entity.id
        };
      };
    })(this)
  };

}).call(this);