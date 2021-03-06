// Generated by CoffeeScript 1.7.1

/*
  UI mode switch button
 */

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  levelEditor.view.UIModeSwitchButton = (function(_super) {
    __extends(UIModeSwitchButton, _super);

    UIModeSwitchButton.VID = "view-leditor-uimodeswitchbutton";

    UIModeSwitchButton.prototype.DT = "levelEditor.view.UIModeSwitchButton";

    function UIModeSwitchButton(el, app) {
      this.el = el;
      this.app = app;
      this.draw = __bind(this.draw, this);
      this.updateValue = __bind(this.updateValue, this);
      UIModeSwitchButton.__super__.constructor.apply(this, arguments);
      console.log(this.DT, "Init.");
      this.dUiModes = this.app.data.get("ui-modes");
      this.mode = this.el.attr("mode");
      if (!this.mode) {
        throw "" + this.DT + ": undefined attr mode!";
      }
      $(this.dUiModes).on(this.dUiModes.s.I_DATA_CHANGED, (function(_this) {
        return function(e) {
          if (e.key === "currentMode") {
            return _this.draw();
          }
        };
      })(this));
      this.el.on("click", this.updateValue);
      this.draw();
    }

    UIModeSwitchButton.prototype.updateValue = function() {
      return this.dUiModes.set("currentMode", this.mode);
    };

    UIModeSwitchButton.prototype.draw = function() {
      if (this.dUiModes.get("currentMode") === this.mode) {
        return this.el.addClass("active");
      } else {
        return this.el.removeClass("active");
      }
    };

    return UIModeSwitchButton;

  })(levelEditor.Object);

}).call(this);
