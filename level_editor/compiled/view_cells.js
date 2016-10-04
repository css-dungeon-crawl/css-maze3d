// Generated by CoffeeScript 1.7.1

/*
  Cells of the grid
 */

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  levelEditor.view.Cells = (function(_super) {
    __extends(Cells, _super);

    Cells.prototype.DT = "levelEditor.view.Cells";

    function Cells(grid, app) {
      this.grid = grid;
      this.app = app;
      this.redrawLevel = __bind(this.redrawLevel, this);
      this.drawActorCellState = __bind(this.drawActorCellState, this);
      this.drawSelectedCellState = __bind(this.drawSelectedCellState, this);
      this.drawCellState = __bind(this.drawCellState, this);
      this.initRender = __bind(this.initRender, this);
      this.interactionGridClick = __bind(this.interactionGridClick, this);
      this.initState = __bind(this.initState, this);
      Cells.__super__.constructor.apply(this, arguments);
      console.log(this.DT, "Init.");
      this.dUIModes = this.app.data.get("ui-modes");
      this.dLevelCells = this.app.data.get("level-cells");
      this.dLevelActors = this.app.data.get("level-actors");
      this.initState();
      this.initRender();
      this.drawSelectedCellState();
      this.interactionGridClick();
    }

    Cells.prototype.initState = function() {
      return this.state = new chms.ard.AbstractReactiveData();
    };

    Cells.prototype.interactionGridClick = function() {
      var stream;
      stream = this.grid.asEventStream("click").map((function(_this) {
        return function(v) {
          return {
            el: $(v.target),
            altKey: v.altKey
          };
        };
      })(this)).filter((function(_this) {
        return function(v) {
          return v.el.attr("cell") != null;
        };
      })(this)).map((function(_this) {
        return function(v) {
          return {
            cell: _this.s.getCellXYByEl(v.el),
            altKey: v.altKey
          };
        };
      })(this));
      stream.filter((function(_this) {
        return function() {
          return _this.dUIModes.get("currentMode") === _this.dUIModes.s.MODE_SELECT;
        };
      })(this)).filter((function(_this) {
        return function(v) {
          return _this.dLevelCells.isCellBelongs(v.cell);
        };
      })(this)).onValue((function(_this) {
        return function(v) {
          return _this.app.data.setIfUnequal("selected-cell", v.cell);
        };
      })(this));
      stream.filter((function(_this) {
        return function() {
          return _this.dUIModes.get("currentMode") === _this.dUIModes.s.MODE_DESTROY;
        };
      })(this)).filter((function(_this) {
        return function(v) {
          return _this.dLevelCells.isCellBelongs(v.cell);
        };
      })(this)).onValue((function(_this) {
        return function(v) {
          return _this.dLevelCells.removeCell(v.cell);
        };
      })(this));
      return stream.filter((function(_this) {
        return function() {
          return _this.dUIModes.get("currentMode") === _this.dUIModes.s.MODE_BUILD;
        };
      })(this)).filter((function(_this) {
        return function(v) {
          return !_this.dLevelCells.isCellBelongs(v.cell);
        };
      })(this)).onValue((function(_this) {
        return function(v) {
          return _this.dLevelCells.addCell(v.cell);
        };
      })(this));
    };

    Cells.prototype.initRender = function() {
      var imp, _i, _len, _ref;
      _ref = [this.dLevelCells.tarray.s.I_DATA_INSERTED, this.dLevelCells.tarray.s.I_DATA_DELETED];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        imp = _ref[_i];
        $(this.dLevelCells).asEventStream(imp).filter((function(_this) {
          return function(v) {
            return v.key === "levelCells";
          };
        })(this)).onValue((function(_this) {
          return function(v) {
            if (v.type === _this.dLevelCells.tarray.s.I_DATA_INSERTED) {
              return _this.drawCellState(v.inserted);
            } else {
              return _this.drawCellState(v.deleted);
            }
          };
        })(this));
      }
      $(this.dLevelCells).asEventStream(this.dLevelCells.s.I_DATA_CHANGED).filter((function(_this) {
        return function(v) {
          return (v.extraData != null) && v.extraData[_this.dLevelCells.FLAG_LEVEL_LOADED] === true;
        };
      })(this)).onValue(this.redrawLevel);
      $(this.app.data).asEventStream(this.app.data.s.I_DATA_CHANGED).filter(function(v) {
        return v.key === "selected-cell";
      }).onValue(this.drawSelectedCellState);
      return $(this.dLevelActors).asEventStream(this.app.data.tarray.s.I_DATA_INSERTED).filter(function(v) {
        return v.key === "actors";
      }).onValue((function(_this) {
        return function(v) {
          var actor;
          actor = v.inserted;
          return _this.drawActorCellState(actor.cell);
        };
      })(this));
    };

    Cells.prototype.drawCellState = function(cell) {
      var el;
      console.log(this.DT, "Draw cell state", cell);
      el = this.s.getCellByXY(cell, this.grid);
      if (this.dLevelCells.isCellBelongs(cell)) {
        return el.addClass("level-cell");
      } else {
        return el.removeClass("level-cell");
      }
    };

    Cells.prototype.drawSelectedCellState = function() {
      var el, selected;
      this.grid.find("[cell].-selected").removeClass("-selected");
      if ((selected = this.app.data.get("selected-cell")) != null) {
        el = this.s.getCellByXY(selected, this.grid);
        return el.addClass("-selected");
      }
    };

    Cells.prototype.drawActorCellState = function(cell) {
      var actor, cl, cprefix, el;
      actor = this.dLevelActors.getActorOnCell(cell);
      el = this.s.getCellByXY(cell, this.grid);
      el.toggleClass("actor-cell", actor != null);
      cprefix = "-actor-direction-";
      cl = Handy.jqRemoveClassByPart(el, cprefix);
      return el.attr({
        "class": cl + " " + cprefix + actor.dir.toLowerCase()
      });
    };

    Cells.prototype.redrawLevel = function() {
      var cell, _i, _len, _ref, _results;
      this.grid.find("[cell].level-cell").removeClass("level-cell");
      _ref = this.dLevelCells.get("levelCells");
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cell = _ref[_i];
        _results.push(this.drawCellState(cell));
      }
      return _results;
    };

    Cells.getCellXYByEl = function(el) {
      return dataTypes.Pos.get(parseInt(el.attr("x")), parseInt(el.attr("y")));
    };

    Cells.getCellByXY = function(cell, grid) {
      return grid.find("[cell][x=" + cell[0] + "][y=" + cell[1] + "]");
    };

    return Cells;

  })(levelEditor.Object);

}).call(this);
