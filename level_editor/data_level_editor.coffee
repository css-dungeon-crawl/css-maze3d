###
  Main editor data file
###

class levelEditor.data.Editor extends chms.ard.AbstractReactiveData

  DT: "levelEditor.data.Editor"

  constructor: ->
    super
    console.log @DT, "Init."

    @logicUpdateSelectedCellOnModeChanged()

  init: =>
    super

    @set "ui-modes", new levelEditor.data.UiModes()

    @set "level-cells", new levelEditor.data.LevelCells()

    @set "level-actors",  new levelEditor.data.LevelActors()

    @set "selected-cell", null


  # section: Logic

  logicUpdateSelectedCellOnModeChanged: =>
    $(@.get("ui-modes"))
      .asEventStream(@.s.I_DATA_CHANGED)
      .filter((v)-> v.key == "currentMode")
      .filter((v)=> v.value != @.get("ui-modes").s.MODE_SELECT)
      .onValue => @setIfUnequal "selected-cell", null


  # section: Helpers

  # @return {Boolean}
  isCellSelectedWithActor: =>
    s = @get("selected-cell")
    s? && @get("level-actors").getActorOnCell(s)?
