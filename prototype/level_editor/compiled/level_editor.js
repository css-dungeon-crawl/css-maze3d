// Generated by CoffeeScript 1.7.1
(function() {
  var centerGrid, desectAll, getCenterGridX, getCenterGridY, positionGrid, renderGrid;

  renderGrid = function(size) {
    var cols, container, i, ii, j, rows, startAt, xy;
    startAt = Date.now();
    rows = '';
    i = 0;
    while (i < size) {
      ii = i.toString();
      cols = '';
      j = 0;
      while (j < size) {
        xy = 'x=\'' + j + '\' y=\'' + ii + '\'';
        cols += '<div class=\'grid__col\' cell ' + xy + '></div>';
        j++;
      }
      rows += '<div class=\'grid__row\'>' + cols + '</div>';
      i++;
    }
    container = '<div class=\'grid\'>' + rows + '</div>';
    levelEditorEl.append(container);
    console.log('Ended by', Date.now() - startAt);
    return levelEditorEl.find('.grid');
  };

  getCenterGridX = function() {
    return -Math.round(grid.width() / 2);
  };

  getCenterGridY = function() {
    return -Math.round(grid.height() / 2);
  };

  positionGrid = function() {
    grid.css({
      top: gX,
      left: gY
    });
  };

  window.getXYfromCell = function(cell) {
    return {
      x: parseInt(cell.attr('x')),
      y: parseInt(cell.attr('y'))
    };
  };

  window.getIndex = function(x, y) {
    return x + 'x' + y;
  };

  window.makeCell = function(x, y) {
    return {
      x: x,
      y: y
    };
  };

  centerGrid = function() {
    window.gX = getCenterGridX();
    window.gY = getCenterGridY();
    positionGrid();
  };

  window.drawLevel = function() {
    var cell, coords, index, _results;
    console.log("Draw level", window.level);
    levelEditorEl.find(".level-cell").removeClass("level-cell");
    _results = [];
    for (index in level) {
      cell = level[index];
      coords = index.split("x");
      _results.push(levelEditorEl.find("[x='" + coords[0] + "'][y='" + coords[1] + "']").addClass("level-cell"));
    }
    return _results;
  };

  desectAll = function() {
    return grid.find('[cell]').removeClass("-selected");
  };

  $(function() {
    window.level = {};
    window.levelEditorEl = $('#level-editor');
    window.grid = renderGrid(100);
    centerGrid();
    $(document).on("keyup", function(e) {
      var KEY_CODE_D;
      switch (e.which) {
        case (KEY_CODE_D = 68):
          return desectAll();
      }
    });
    grid.find('[cell]').on('click', function(e) {
      var ci, el, isSelected, xy;
      el = $(e.target);
      console.log('Click on', el, e);
      xy = getXYfromCell(el);
      ci = getIndex(xy.x, xy.y);
      isSelected = el.hasClass("-selected");
      if (!e.shiftKey) {
        desectAll();
      }
      if (isSelected) {
        return el.removeClass("-selected");
      } else {
        return el.addClass("-selected");
      }
    });
    return new window.FacesEditor($("[widget-faces-editor]"));
  });

}).call(this);
