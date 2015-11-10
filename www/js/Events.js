
var Events = function () {
    this.Bus = new Bacon.Bus();
    var _this = this;
    function addEvents(e) {
        _this.Bus.push(e);
    }
    function cancel(e) {
        if (e.preventDefault) { e.preventDefault(); }
        return false;
    }
    // Allow file drops on page
    document.addEventListener('dragover', cancel);
    document.addEventListener('dragenter', cancel);
    for (var key in this.Type) {

        try {
            document.addEventListener(this.Type[key], addEvents);
        } catch (ex) {
            console.error(ex);
        }
    }
    return this;
}
Events.prototype.HasTouchEvents = function () {
    return window.ontouchstart !== undefined;
}
Events.prototype.ByTargetId = function (id) {
    var _id = id;
    return function (e) {
        return e.target.getAttribute && e.target.getAttribute('id') === _id;
    }
}
Events.prototype.NotInput = function (e) {
    return !(e.path[0].tagName && (e.path[0].tagName === 'INPUT' || e.path[0].tagName === 'TEXTAREA'));
}
Events.prototype.ChildOf = function (selector) {
    var _selector = selector;
    var _type;
    if (_selector.indexOf('.') === 0) {
        _type = 'class';
        _selector = _selector.replace(/./, '');
    } else if (_selector.indexOf('#') === 0) {
        _type = 'id';
        _selector = _selector.replace(/#/, '');
    } else {
        _type = 'tag';
    }

    if (_type === 'tag') {
        return function (e) {
            if (!e.path) {
                var path = [];
                var node = e.target;
                while (node != document.body) {
                    path.push(node);
                    node = node.parentNode;
                }
                e.path = path;
            }
            var max = e.path.length;
            for (var i = 0; i < max; i += 1) {
                if (e.path[i].tagName && e.path[i].tagName === selector) {
                    return true;
                }
            }
        }
    } else {
        return function (e) {
            if (!e.path) {
                var path = [];
                var node = e.target;
                while (node != document.body) {
                    path.push(node);
                    node = node.parentNode;
                }
                e.path = path;
            }
            var max = e.path.length;
            for (var i = 0; i < max; i += 1) {
                if (e.path[i].getAttribute) {
                    if (e.path[i].getAttribute(_type) === _selector) {
                        return true;
                    }
                }
            }
        }
    }
}
Events.prototype.ByPointCount = function (count) {
    var _c = count;
    return function (e) { return e.targetTouches.length === _c; }
}
Events.prototype.ByEventType = function (type) {
    var _t = type;
    return function (e) {
        return e.type === type;
    }
}
Events.prototype.WithMouseClick = function (e) {
    return e.buttons === 1;
}
Events.prototype.IsArrowKey = function (e) {
    return e.which >= 37 && e.which <= 40;
}
Events.prototype.To = function (property) {
    var _p = property;
    return function (e) { return e[_p]; }
}
Events.prototype.PreventDefault = function (e) {
    e.preventDefault();
    return e;
}
Events.Type = {
    MouseDown: 'mousedown',
    MouseUp: 'mouseup',
    MouseEnter: 'mouseenter',
    MouseLeave: 'mouseleave',
    MouseMove: 'mousemove',
    MouseOver: 'mouseover',
    MouseOut: 'mouseout',
    Click: 'click',
    Change: 'change',
    KeyDown: 'keydown',
    KeyPress: 'keypress',
    KeyUp: 'keyup',
    Drop: 'drop',
    TouchStart: 'touchstart',
    TouchMove: 'touchmove',
    TouchEnd: 'touchend',
    TouchCancel: 'touchcancel'
}

Events.Keys = {
    BackSpace: 8,
    Tab: 9,
    Enter: 13,
    Esc: 27,
    PageUp: 33,
    PageDwn: 34,
    End: 35,
    Home: 36,
    Left: 37,
    Up: 38,
    Right: 39,
    Dwn: 40,
    Ins: 45,
    Del: 46,
    NumLock: 144
}

Events.prototype.Type = Events.Type;
Events.prototype.Keys = Events.Keys;

Events.prototype.CreateEventStream = function (element, evtType) {
    return element.asEventStream(evtType);
}
Events.prototype.NewBus = function () {
    return new Bacon.Bus();
}

