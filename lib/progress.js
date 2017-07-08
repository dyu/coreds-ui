// converted from https://github.com/djyde/ToProgress
// This files exists because the original impl used arguments.callee, 
// which is not allwed strict mode
function mergeFrom(src, target) {
    for (var _i = 0, _a = Object.keys(src); _i < _a.length; _i++) {
        var i = _a[_i];
        if (undefined === target[i])
            target[i] = src[i];
    }
    return target;
}
function applyStyle(el /*Element*/, style_map) {
    var style = el.style;
    for (var _i = 0, _a = Object.keys(style_map); _i < _a.length; _i++) {
        var i = _a[_i];
        style[i] = style_map[i];
    }
    return el;
}
function resolveTransitionEvent() {
    var el = document.createElement("fakeelement");
    var transitions = {
        "transition": "transitionend",
        "OTransition": "oTransitionEnd",
        "MozTransition": "transitionend",
        "WebkitTransition": "webkitTransitionEnd"
    };
    for (var _i = 0, _a = Object.keys(transitions); _i < _a.length; _i++) {
        var i = _a[_i];
        if (undefined !== el.style[i])
            return transitions[i];
    }
    return undefined;
}
var TRANSITION_EVENT = resolveTransitionEvent();
var ToProgress = (function () {
    function ToProgress(opts, parentEl, id) {
        this.progress = 0;
        this.options = {
            color: '#0080FF',
            height: '2px',
            duration: 0.2
        };
        var options = mergeFrom(opts, this.options), parent = parentEl || document.body, d = options.duration, od = this.opapacity_duration = d * 3;
        this.el = applyStyle(document.createElement('div'), {
            'position': parentEl ? 'relative' : 'fixed',
            'top': '0',
            'left': '0',
            'right': '0',
            'background-color': options.color,
            'height': options.height,
            'width': '0%',
            'transition': 'width ' + d + 's' + ', opacity ' + od + 's',
            '-moz-transition': 'width ' + d + 's' + ', opacity ' + od + 's',
            '-webkit-transition': 'width ' + d + 's' + ', opacity ' + od + 's'
        });
        if (id)
            this.el.id = id;
        parent.appendChild(this.el);
        if (TRANSITION_EVENT)
            this.listen$$ = this.listen.bind(this);
    }
    ToProgress.prototype.show = function () {
        this.el.style.opacity = '1';
    };
    ToProgress.prototype.hide = function () {
        this.el.style.opacity = '0';
    };
    ToProgress.prototype.transit = function () {
        this.el.style.width = this.progress + '%';
    };
    ToProgress.prototype.setProgress = function (progress, callback) {
        this.show();
        if (progress > 100) {
            this.progress = 100;
        }
        else if (progress < 0) {
            this.progress = 0;
        }
        else {
            this.progress = progress;
        }
        this.transit();
        callback && callback();
    };
    ToProgress.prototype.increase = function (val, callback) {
        this.show();
        this.setProgress(this.progress + val, callback);
    };
    ToProgress.prototype.decrease = function (val, callback) {
        this.show();
        this.setProgress(this.progress - val, callback);
    };
    ToProgress.prototype.reset = function (callback) {
        this.progress = 0;
        this.transit();
        callback && callback();
    };
    ToProgress.prototype.listen = function (e) {
        this.reset();
        this.el.removeEventListener(e.type, this.listen$$key);
    };
    ToProgress.prototype.finish = function (callback) {
        this.setProgress(100, callback);
        this.hide();
        if (TRANSITION_EVENT)
            this.listen$$key = this.el.addEventListener(TRANSITION_EVENT, this.listen$$);
    };
    return ToProgress;
}());
export { ToProgress };
//# sourceMappingURL=progress.js.map