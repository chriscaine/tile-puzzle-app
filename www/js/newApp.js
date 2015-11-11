
var Game = function (el) {
    this.wrapper = document.getElementById(el);
    var _this = this;
    this.Slide = function (e) {
        var tile = _this[e.index];
        if (tile) {
            var newIndex = tile.Index + e.direction;
            if (!_this.GetTileWithAttrValue('Index', newIndex) && _this.InRange(newIndex)) {
                _this[e.index].Move(e.direction);
                console.log('isComplete?', _this.Check());
            };
        }
    }
    return this;
}
Game.prototype.GetTileWithAttrValue = function (attr, val) {
    for (var key in this) {
        if (this[key][attr] === val) {
            return this[key];
        }
    }
    return false;
}
Game.prototype.Create = function () {
    for (var i = 1; i < 16; i += 1) {
        this[i] = new Tile(i);
        this.wrapper.appendChild(this[i].GetElement());
    }
}

Game.prototype.Check = function () {
    console.log('check', this);
    var result = true;
    for (var key in this) {
        if (!isNaN(key)) {
            result = this[key].IsHome() && result;
        }
    }
    (document.getElementsByClassName('tick'))[0].style.visibility = result ? 'visible' : 'hidden';
    return result;
}

Game.prototype.Shuffle = function () {
    var sortArr = [];
    for (var i = 1; i < 16; i += 1) {
        sortArr.push(i);
    }
    sortArr.sort(function () { return 0.5 - Math.random(); });
    for (var key in tiles) {
        if (!isNaN(key)) {
            this[key].SetIndex(sortArr[parseInt(key) - 1]);
        }
    }
}
Game.prototype.Complete = function () {
    for (var key in tiles) {
        if (!isNaN(key)) {
            this[key].SetIndex(this[key].Home);
        }
    }
}

Game.prototype.InRange = function (i) {
    return i > 0 && i < 17;
}






var tiles = new Game('puzzle-wrapper');

tiles.Create();
//tiles.Shuffle();

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

touchMove.onValue(tiles.Slide);
