// Generated by CoffeeScript 1.7.1

/*
  2d matrix with entities.

  All entities in matrix must have id attribute.
 */

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  dataTypes.EntityMatrix2d = (function(_super) {
    __extends(EntityMatrix2d, _super);

    EntityMatrix2d.prototype.DT = "dataTypes.EntityMatrix2d";

    function EntityMatrix2d() {
      this.getEntities = __bind(this.getEntities, this);
      this.getDataByEntity = __bind(this.getDataByEntity, this);
      this.removeData = __bind(this.removeData, this);
      this.putData = __bind(this.putData, this);
      this.init = __bind(this.init, this);
      EntityMatrix2d.__super__.constructor.apply(this, arguments);
    }

    EntityMatrix2d.prototype.init = function() {
      EntityMatrix2d.__super__.init.apply(this, arguments);
      return this.set("entityToCoords", {});
    };

    EntityMatrix2d.prototype.putData = function(cell, entity) {
      EntityMatrix2d.__super__.putData.apply(this, arguments);
      return this.tobject.set("entityToCoords", entity.id.toString(), entity);
    };

    EntityMatrix2d.prototype.removeData = function(cell) {
      var d;
      d = this.getData(cell);
      this.tobject["delete"]("entityToCoords", d.id.toString());
      return EntityMatrix2d.__super__.removeData.apply(this, arguments);
    };

    EntityMatrix2d.prototype.getDataByEntity = function(entity) {
      return this.tobject.get("entityToCoords", entity.id.toString());
    };

    EntityMatrix2d.prototype.getEntities = function() {
      var collection, entity, id, _ref;
      collection = [];
      _ref = this.get("entityToCoords");
      for (id in _ref) {
        entity = _ref[id];
        collection.push(entity);
      }
      return collection;
    };

    EntityMatrix2d.createFromLevelObject = function(lobj) {
      return null;
    };

    return EntityMatrix2d;

  })(dataTypes.Matrix2d);

}).call(this);
