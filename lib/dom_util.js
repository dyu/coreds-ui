export var UA = window.navigator.userAgent.toLowerCase(), // browser sniffing from vuejs
//isIE = UA && UA.indexOf('trident') > 0,
isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var hasClassList = 'classList' in document.documentElement, createEvent = document['createEvent'], createEventObject = document['createEventObject'];
var popup_;
export function setPopup(p) {
    if (p && popup_ === undefined)
        popup_ = p;
}
function newPopup(el) {
    return {
        visible: function () {
            return hasClass(el, 'active');
        },
        hide: function () {
            return removeClass(el, 'active');
        },
        show: function (contentEl, positionEl) {
            var style = el.style;
            style.visibility = 'hidden';
            el.replaceChild(contentEl, el.firstChild);
            addClass(el, 'active');
            positionTo(positionEl, el);
            style.visibility = 'visible';
        }
    };
}
export function getPopup() {
    return popup_ || (popup_ = newPopup(document.getElementById('popup')));
}
/**
 * Returns true if the popup is visible.
 */
export function visiblePopup(popup) {
    return popup_.visible();
}
export function hidePopup(popup) {
    return popup_.hide();
}
export function showPopup(popup, contentEl, positionEl) {
    popup_.show(contentEl, positionEl);
}
export function focus(id) {
    var el = document.getElementById(id);
    if (el)
        el.focus();
}
function bFocus() {
    var el = this.el;
    if (el || (el === undefined && (this.el = el = document.getElementById(this.id))))
        el.focus();
}
export function bindFocus(id) {
    return bFocus.bind({ id: id, el: undefined });
}
export function setClass(el, cls) {
    if (isIE9 && !/svg$/.test(el.namespaceURI)) {
        el.className = cls;
    }
    else {
        el.setAttribute('class', cls);
    }
}
function containsClass(className, cls) {
    return -1 !== (' ' + className + ' ').indexOf(' ' + cls + ' ');
}
export function hasClass(el, cls) {
    return hasClassList ? el.classList.contains(cls) : containsClass(el.className, cls);
}
/**
 * For IE9 compat: when both class and :class are present
 * getAttribute('class') returns wrong value...
 *
 * @param {Element} el
 * @return {String}
 */
/*function getClass (el) {
    let className = el.className
    return typeof className !== 'object' ? className : (className.baseVal || '')
}*/
//export const { addClass } = Vue.util
export function addClass(el, cls) {
    var added = false, target, existing;
    if (hasClassList) {
        target = el.classList;
        existing = target.length;
        target.add(cls);
        added = existing !== target.length;
    }
    else if (!containsClass(target = el.className, cls)) {
        setClass(el, target + ' ' + cls);
        added = true;
    }
    return added;
}
export function removeClass(el, cls) {
    var removed = false, target, existing;
    if (hasClassList) {
        target = el.classList;
        existing = target.length;
        target.remove(cls);
        removed = existing !== target.length;
        removed && existing === 1 && el.removeAttribute('class');
    }
    else {
        target = ' ' + cls + ' ';
        existing = ' ' + el.className + ' ';
        while (-1 !== existing.indexOf(target)) {
            existing = existing.replace(target, ' ');
            removed = true;
        }
        removed && setClass(el, existing.trim());
    }
    return removed;
}
export function toggleClass(el, cls) {
    var removed = false, target, existing, className;
    if (hasClassList) {
        target = el.classList;
        existing = target.length;
        target.remove(cls);
        removed = existing !== target.length;
        if (!removed) {
            target.add(cls);
        }
        else if (existing === 1) {
            el.removeAttribute('class');
        }
    }
    else {
        className = el.className;
        target = ' ' + cls + ' ';
        existing = ' ' + className + ' ';
        while (-1 !== existing.indexOf(target)) {
            existing = existing.replace(target, ' ');
            removed = true;
        }
        setClass(el, removed ? existing.trim() : className + ' ' + cls);
    }
    return !removed;
}
export function isInput(el) {
    var tag = el.tagName;
    return tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA';
}
export function findupClass(el, cls, limit) {
    if (hasClassList) {
        do {
            if (el.classList.contains(cls))
                return el;
            el = el.parentElement;
        } while (--limit > 0);
    }
    else {
        do {
            if (el.className.indexOf(cls) !== -1)
                return el;
            el = el.parentElement;
        } while (--limit > 0);
    }
    return null;
}
export function getLastChildElement(el) {
    return el.childElementCount ? el.children[el.childElementCount - 1] : null;
}
export function getFirstChildElement(el) {
    return el.childElementCount ? el.children[0] : null;
    /*var child = el.firstChild;
    while (child && child.nodeType != 1)
        child = child.nextSibling;
    return child;*/
}
export function resolveRelativeElement(el, str) {
    var startIdx = str.charAt(0) === '-' ? 1 : 0, dotIdx = str.indexOf('.' /*, startIdx*/), i;
    if (dotIdx === startIdx) {
        // siblings
        i = parseInt(str.substring(dotIdx + 1), 10);
        if (startIdx === 0) {
            while (i--)
                el = el.nextElementSibling;
        }
        else {
            while (i--)
                el = el.previousElementSibling;
        }
        return el;
    }
    i = parseInt(dotIdx === -1 ? str : str.substring(startIdx, dotIdx), 10);
    while (i--)
        el = el.parentElement;
    if (dotIdx === -1)
        return el;
    i = parseInt(str.substring(dotIdx + 1), 10);
    if (startIdx) {
        // negative, so start from bottom
        el = el.lastElementChild;
        while (i--)
            el = el.previousElementSibling;
    }
    else {
        el = el.firstElementChild;
        while (i--)
            el = el.nextElementSibling;
    }
    return el;
}
// TODO optimize: parseInt is not necessary if the length is 1 (simply deduct 48)
export function chainResolveRelativeElement(el, array, i) {
    for (var l = array.length; i < l; i++)
        el = resolveRelativeElement(el, array[i]);
    return el;
}
export function resolveElement(el, value, vm) {
    // check for '$' prefix
    if (!isNaN(value) || (vm && 36 === value.charCodeAt(0) && !isNaN(value = vm[value.substring(1)])))
        return resolveRelativeElement(el, value);
    else if (value.indexOf('__') !== -1)
        return chainResolveRelativeElement(el, value.split('__'), 0);
    else
        return document.getElementById(value);
}
export function resolveElementArray(el, value, selectFromParent, vm) {
    if (Array.isArray(value)) {
        return !value[0] ?
            [chainResolveRelativeElement(el, value, 1)] :
            value.map(function (item) { return resolveElement(el, item, vm); });
    }
    else if (!isNaN(value))
        return [resolveRelativeElement(el, value)];
    else if (value.indexOf('__') !== -1)
        return [chainResolveRelativeElement(el, value.split('__'), 0)];
    else if (selectFromParent)
        return el.parentElement.querySelectorAll(value);
    else
        return el.querySelectorAll(value);
}
export function fireEvent(el, type) {
    if (createEvent) {
        var ev = document.createEvent("HTMLEvents");
        ev.initEvent(type, true, true); // type,bubbling,cancelable
        el.dispatchEvent(ev);
        return;
    }
    if (createEventObject) {
        // IE
        el.fireEvent('on' + type, document['createEventObject']());
        return;
    }
    throw new Error('Could not create an event.');
}
export function getAbsoluteLeft(el) {
    var left = 0, curr = el;
    // This intentionally excludes body which has a null offsetParent.    
    while (curr.offsetParent) {
        left -= curr.scrollLeft;
        curr = curr.parentNode;
    }
    while (el) {
        left += el.offsetLeft;
        el = el.offsetParent;
    }
    return left;
}
export function getAbsoluteTop(el) {
    var top = 0, curr = el;
    // This intentionally excludes body which has a null offsetParent.    
    while (curr.offsetParent) {
        top -= curr.scrollTop;
        curr = curr.parentNode;
    }
    while (el) {
        top += el.offsetTop;
        el = el.offsetParent;
    }
    return top;
}
export function positionTo(relativeTarget, popup) {
    // Calculate left position for the popup. The computation for
    // the left position is bidi-sensitive.
    var offsetWidth = popup.offsetWidth || 0, offsetHeight = popup.offsetHeight || 0, textBoxOffsetWidth = relativeTarget.offsetWidth || 0, 
    // Compute the difference between the popup's width and the
    // textbox's width
    offsetWidthDiff = offsetWidth - textBoxOffsetWidth, left = getAbsoluteLeft(relativeTarget);
    /*if (LocaleInfo.getCurrentLocale().isRTL()) { // RTL case

        var textBoxAbsoluteLeft = relativeTarget.getAbsoluteLeft();

        // Right-align the popup. Note that this computation is
        // valid in the case where offsetWidthDiff is negative.
        left = textBoxAbsoluteLeft - offsetWidthDiff;

        // If the suggestion popup is not as wide as the text box, always
        // align to the right edge of the text box. Otherwise, figure out whether
        // to right-align or left-align the popup.
        if (offsetWidthDiff > 0) {

        // Make sure scrolling is taken into account, since
        // box.getAbsoluteLeft() takes scrolling into account.
        var windowRight = Window.getClientWidth() + Window.getScrollLeft();
        var windowLeft = Window.getScrollLeft();

        // Compute the left value for the right edge of the textbox
        var textBoxLeftValForRightEdge = textBoxAbsoluteLeft
            + textBoxOffsetWidth;

        // Distance from the right edge of the text box to the right edge
        // of the window
        var distanceToWindowRight = windowRight - textBoxLeftValForRightEdge;

        // Distance from the right edge of the text box to the left edge of the
        // window
        var distanceFromWindowLeft = textBoxLeftValForRightEdge - windowLeft;

        // If there is not enough space for the overflow of the popup's
        // width to the right of the text box and there IS enough space for the
        // overflow to the right of the text box, then left-align the popup.
        // However, if there is not enough space on either side, stick with
        // right-alignment.
        if (distanceFromWindowLeft < offsetWidth
            && distanceToWindowRight >= offsetWidthDiff) {
            // Align with the left edge of the text box.
            left = textBoxAbsoluteLeft;
        }
        }
    } else { // LTR case*/
    // Left-align the popup.
    // TODO this was moved to variable initialization
    //left = relativeTarget.getAbsoluteLeft();
    // If the suggestion popup is not as wide as the text box, always align to
    // the left edge of the text box. Otherwise, figure out whether to
    // left-align or right-align the popup.
    if (offsetWidthDiff > 0) {
        // Make sure scrolling is taken into account, since
        // box.getAbsoluteLeft() takes scrolling into account.
        var windowLeft = document['scrollLeft'] || 0, windowRight = windowLeft + (document['clientWidth'] || 0), 
        // Distance from the left edge of the text box to the right edge
        // of the window
        distanceToWindowRight = windowRight - left, 
        // Distance from the left edge of the text box to the left edge of the
        // window
        distanceFromWindowLeft = left - windowLeft;
        // If there is not enough space for the overflow of the popup's
        // width to the right of hte text box, and there IS enough space for the
        // overflow to the left of the text box, then right-align the popup.
        // However, if there is not enough space on either side, then stick with
        // left-alignment.
        if (distanceToWindowRight < offsetWidth && distanceFromWindowLeft >= offsetWidthDiff) {
            // Align with the right edge of the text box.
            left -= offsetWidthDiff;
        }
    }
    //}
    // Calculate top position for the popup
    var top = getAbsoluteTop(relativeTarget), 
    // Make sure scrolling is taken into account, since
    // box.getAbsoluteTop() takes scrolling into account.
    windowTop = document.documentElement.scrollTop || 0, windowBottom = windowTop + document.documentElement.clientHeight, 
    // Distance from the top edge of the window to the top edge of the
    // text box
    distanceFromWindowTop = top - windowTop, 
    // Distance from the bottom edge of the window to the bottom edge of
    // the text box
    rtOffsetHeight = relativeTarget.offsetHeight || 0, distanceToWindowBottom = windowBottom - (top + rtOffsetHeight);
    // If there is not enough space for the popup's height below the text
    // box and there IS enough space for the popup's height above the text
    // box, then then position the popup above the text box. However, if there
    // is not enough space on either side, then stick with displaying the
    // popup below the text box.
    if (distanceToWindowBottom < offsetHeight && distanceFromWindowTop >= offsetHeight) {
        top -= offsetHeight;
    }
    else {
        // Position above the text box
        top += rtOffsetHeight;
    }
    popup.style.left = left + 'px';
    popup.style.top = top + 'px';
}
export function popTo(relativeTarget, popup) {
    popup.style.visibility = 'hidden';
    positionTo(relativeTarget, popup);
    popup.style.visibility = 'visible';
}
export function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate)
                func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow)
            func.apply(context, args);
    };
}
//# sourceMappingURL=dom_util.js.map