
Object.prototype.tileWithAttr = function (attr, val) {
    for (var key in this) {
        if (this[key][attr] === val) {
            return this[key];
        }
    }
    return false;
}
var tiles = {};
var wrapper = document.getElementById('puzzle-wrapper');
function createTiles() {
    for (var i = 1; i < 16; i += 1) {
        tiles[i] = new Tile(i);
        wrapper.appendChild(tiles[i].GetElement());
    }
}
var shuffle = function () {
    var sortArr = [];
    for (var i = 1; i < 16; i += 1) {
        sortArr.push(i);
    }
    sortArr.sort(function () { return 0.5 - Math.random(); });
    console.log(sortArr);
    for (var key in tiles) {
        if (!isNaN(key)) {
            tiles[key].SetIndex(sortArr[parseInt(key)-1]);
            console.log(tiles[key]);
        }
        

    }

}


    createTiles();
   // shuffle();
    console.log(tiles);
    var inRange = function (i) {
        return i > 0 && i < 17;
    }

var Slide = function (e) {
    console.log(e, tiles[e.index]);

    var tile = tiles[e.index];
    var newIndex = tile.Index + e.direction;
    if (!tiles.tileWithAttr('Index', newIndex) && inRange(newIndex)) {
        tiles[e.index].Move(e.direction);
    };
    // get tile by Home (original index)

    // check if new position is clear

    // move tile

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
                            //   .skip(4)
                            //   .skipDuplicates(monitorTouch.IsEqual)
                               //.filter(events.PreventDefault)
                               //.filter(monitorTouch.Use)
                               .map(monitorTouch.MapToIndex);     // events.Bus.filter(Events.ByEventType(Events.Type.TouchMove));

touchMove.onValue(Slide);
