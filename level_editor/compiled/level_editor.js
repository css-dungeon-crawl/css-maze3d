// Generated by CoffeeScript 1.7.1

/*
  Main level editor app class
 */

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  levelEditor.App = (function(_super) {
    __extends(App, _super);

    App.ATTR_NAME = "app-level-editor";

    App.prototype.DT = "levelEditor.App";

    function App(el) {
      this.el = el;
      App.__super__.constructor.apply(this, arguments);
      console.log(this.DT, "Init.");
      this.data = new levelEditor.data.Editor();
      new levelEditor.modules.Hotkeys(this);
      new levelEditor.view.Grid(this);
      new levelEditor.view.ModalSource(this.el.find("[" + levelEditor.view.ModalSource.VID + "]"), this);
      this.el.find("[" + levelEditor.view.UIModeSwitchButton.VID + "]").each((function(_this) {
        return function(i, v) {
          return new levelEditor.view.UIModeSwitchButton($(v), _this);
        };
      })(this));
    }

    App.init = function() {
      return $(function() {
        return new levelEditor.App($("[app-level-editor]"));
      });
    };

    return App;

  })(levelEditor.Object);

}).call(this);
