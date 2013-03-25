(function() {
  var defaultFill;

  (typeof exports !== "undefined" && exports !== null ? exports : window).worldmap = {};

  defaultFill = {
    fill: '#f00',
    'stroke-width': 0
  };

  $(function() {
    var randomColor;
    $.ajax({
      url: 'images/world.svg',
      dataType: 'xml',
      success: function(doc) {
        var R;
        R = new Raphael('paper', "100%", "100%");
        $(doc).find('path').each(function() {
          var id, path, str;
          path = $(this);
          id = path.attr('id');
          str = path.attr('d');
          worldmap[id] = R.path(str);
          return worldmap[id].attr(defaultFill);
        });
        return run();
      }
    });
    randomColor = function() {
      var color, i, pattern, _i;
      pattern = '0123456789ABCDEF'.split('');
      color = '#';
      for (i = _i = 1; _i <= 3; i = ++_i) {
        color += pattern[Math.round(Math.random() * pattern.length)];
      }
      return color;
    };
    return (typeof exports !== "undefined" && exports !== null ? exports : window).run = function() {
      var name, path;
      for (name in worldmap) {
        path = worldmap[name];
        path.animate({
          fill: randomColor()
        }, 1000);
      }
      return setTimeout(run, 2000);
    };
  });

}).call(this);
