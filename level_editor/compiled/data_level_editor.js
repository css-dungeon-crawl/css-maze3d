// Generated by CoffeeScript 1.7.1

/*
  Main editor data file
 */

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  levelEditor.data.Editor = (function(_super) {
    __extends(Editor, _super);

    Editor.prototype.DT = "levelEditor.data.Editor";

    function Editor() {
      this.init = __bind(this.init, this);
      Editor.__super__.constructor.apply(this, arguments);
      console.log(this.DT, "Init.");
    }

    Editor.prototype.init = function() {
      return Editor.__super__.init.apply(this, arguments);
    };

    return Editor;

  })(chms.ard.AbstractReactiveData);

}).call(this);
