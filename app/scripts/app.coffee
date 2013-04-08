exports ? window).worldmap = {}

defaultFill =
  fill           : '#f00'
  'stroke-width' : 0

$ ->

  $.ajax
    url      : 'images/world.svg'
    dataType : 'xml'
    success  : (doc)->
      R = new Raphael 'paper', '100%', '100%'
      $(doc).find('path').each ()->
        path = $(this)
        id   = path.attr 'id'
        str  = path.attr 'd'
        worldmap[id] = R.path str
        worldmap[id].attr defaultFill

      run()

  randomColor = ->
    pattern = '0123456789ABCDEF'.split ''
    color   = '#'
    for i in [1..3]
      color += pattern[Math.round(Math.random() * pattern.length)]
    color

  (exports ? window).run = ->
    for name, path of worldmap
      path.animate
        fill : randomColor()
      , 1000

    setTimeout run, 2000


