Array.prototype.indexOfAttr = function (attr, val) {
    for (var i = 0; i < this.length; i += 1) {
        if (this[i][attr] === val) {
            return i;
        }
    }
    return -1;
}
var tiles = [];

function createTiles() {
    for (var i = 0; i < 15; i+=1) {
        tiles.push(new Tile(i+1));
        tiles[i].GetElement().appendTo('#puzzle-wrapper');
    }
}
var shuffle = function () {
    var sortArr = [];
    for (var i = 1; i < 16; i += 1) {
        sortArr.push(i);
        console.log(i);
    }
    sortArr.sort(function () { return 0.5 - Math.random(); });
    console.log(sortArr);
    for (i = 0; i < sortArr.length; i += 1) {
        tiles[i].SetIndex(sortArr[i]);
    }

}

createTiles();
shuffle();

var Slide = function (e) {
    console.log(e, tiles[e.index]);
    if (tiles[e.index]) {

    
        var newIndex = tiles[e.index].Index + e.direction;
        if (tiles.indexOfAttr('Index', newIndex) > -1) {
            tiles[e.index - 1].Move(e.direction);
        }
    }
    // test if complete
    // store positions
}



// Collect Events
/* Start crop - mouse down */
var events = new Events();
var monitorTouch = new MonitorTouch();
var touchStart = events.Bus.filter(events.ByEventType(events.Type.TouchStart));

var touchMove = events.Bus.map(monitorTouch.Setup)
                               .map(monitorTouch.Move)
                               .filter(events.ByEventType(events.Type.TouchMove))
                               .skip(4)
                               .skipDuplicates(monitorTouch.IsEqual)
                               //.filter(events.PreventDefault)
                               //.filter(monitorTouch.Use)
                               .map(monitorTouch.MapToIndex);     // events.Bus.filter(Events.ByEventType(Events.Type.TouchMove));

touchMove.onValue(Slide);
