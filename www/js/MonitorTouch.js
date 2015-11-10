
var PositionChange = function () {
    this.x = 0;
    this.y = 0;
    var _this = this;

    this.SetChange = function (x, y) {
        _this.x = _this.x + x;
        _this.y = _this.y + y;

        if (Math.pow(_this.x, 2) > Math.pow(_this.y, 2)) {
            if (_this.x < 0) {
                return this.Direction.Left;
            }
            return this.Direction.Right;
        } else {
            if (_this.y < 0) {
                return this.Direction.Up;
            }
            return this.Direction.Down;
        }
    }
   
    return this;
}

PositionChange.Direction = {
    Up: -4,
    Down: 4,
    Left: -1,
    Right: 1
}
PositionChange.prototype.Direction = PositionChange.Direction;


MonitorTouch = function () {

    var _this = this;
    this._pos = { x: 0, y: 0 };
    this._change = new PositionChange();

    this.Setup = function (e) {
        if (e.type === Events.Type.TouchStart) {

            _this._pos = { x: e.touches[0].pageX, y: e.touches[0].pageY }
            _this._change.x = 0;
            _this._change.y = 0;
        }
        return e;
    };

    this.Move = function (e) {
        if (e.type === Events.Type.TouchMove) {
            e.touches[0].movementX = e.touches[0].pageX - _this._pos.x;
            e.touches[0].movementY = e.touches[0].pageY - _this._pos.y;
            _pos = { x: e.touches[0].pageX, y: e.touches[0].pageY }
            e.direction = _this._change.SetChange(e.touches[0].movementX, e.touches[0].movementY);
        }
        return e;
    }

    this.Use = function (e) {
        return e.target.getAttribute('data-id');
    }
    this.MapToIndex = function (e) {
       return {
                index: parseInt(e.target.getAttribute('data-index')),
                direction : e.direction
            }
    }
    
    this.IsEqual = function (o, n) {
        return o.direction === n.direction && o.target.id === n.target.id;
    }

    return this;
}






