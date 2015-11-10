
var Tile = function (index) {
    this._tileSize = 70;
    this.Home = index;
    this.Index = index;
    this._element = $('<div />', { 'class': 'tile', 'data-index' : index });
    // set up image position
    this._getColumn = function() {
        return this.Index % 4 === 0  ? 4 : this.Index % 4;
    }
    
    this._getRow = function() {
        return Math.ceil(this.Index / 4);
    }
    this._getPos = function (val) {
        return (val * this._tileSize) - 70; 
    }
    this._getBgPos = function (val) {
        return this._getPos(val) * -1;
    }

    this._element.css('background-position', this._getBgPos(this._getColumn()) + 'px ' + this._getBgPos(this._getRow()) + 'px').text(this.Index);
    this.SetPositionFromIndex();
    return this;
}

Tile.prototype.GetElement = function () {
    return this._element;
}
Tile.prototype.Direction = {
    Up: -4,
    Down: 4,
    Left: -1,
    Right: 1
}
Tile.prototype.Move = function (direction, tiles) {
    var newIndex = this.Index + direction;
 //   if (tiles.findByIndex(newIndex) === -1) {
    this.SetIndex(newIndex);
   // }
}
Tile.prototype.SetIndex = function (i) {
    this.Index = i;
    this.SetPositionFromIndex();
}

Tile.prototype.SetPositionFromIndex = function () {
    this._element.css({
        left: this._getPos(this._getColumn()),
        top: this._getPos(this._getRow())
    });
}