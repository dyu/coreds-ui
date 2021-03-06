export declare const UA: string, // browser sniffing from vuejs
isIE9: boolean | "";
export declare const enum Keys {
    BACKSPACE = 8,
    ENTER = 13,
    ESCAPE = 27,
    LEFT = 37,
    UP = 38,
    RIGHT = 39,
    DOWN = 40
}
export declare function setPopup(p: any): void;
export declare function getPopup(): any;
/**
 * Returns true if the popup is visible.
 */
export declare function visiblePopup(popup: any): boolean;
export declare function hidePopup(popup: any): boolean;
export declare function showPopup(popup: any, contentEl: any, positionEl: any): void;
export interface LazyEl {
    id: string;
    el: any;
}
export declare function focus(id: string): void;
export declare function bindFocus(id: string): any;
export declare function setClass(el: any, cls: string): void;
export declare function hasClass(el: Element, cls: string): boolean;
/**
 * For IE9 compat: when both class and :class are present
 * getAttribute('class') returns wrong value...
 *
 * @param {Element} el
 * @return {String}
 */
export declare function addClass(el: any, cls: string): boolean;
export declare function removeClass(el: Element, cls: string): boolean;
export declare function toggleClass(el: Element, cls: string): boolean;
export declare function isInput(el: Element): boolean;
export declare function findupClass(el: any, cls: string, limit: number): Element | null;
export declare function getLastChildElement(el: any): any;
export declare function getFirstChildElement(el: any): any;
export declare function resolveRelativeElement(el: any, str: string): any;
export declare function chainResolveRelativeElement(el: Element, array: string[], i: number): any;
export declare function resolveElement(el: Element, value: any, vm?: any): any;
export declare function resolveElementArray(el: any, value: any, selectFromParent: boolean, vm?: any): any;
export declare function fireEvent(el: any, type: string): void;
export declare function getAbsoluteLeft(el: any): number;
export declare function getAbsoluteTop(el: any): number;
export declare function positionTo(relativeTarget: any, popup: any): void;
export declare function popTo(relativeTarget: any, popup: any): void;
export declare function debounce(func: any, wait: number, immediate?: boolean): any;
