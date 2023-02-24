
const ReactEvents = {
    pointerdown: 'onPointerDown',
    pointermove: 'onPointerMove',
    pointerup: 'onPointerUp',
    pointercancel: 'onPointerCancel',
    pointerleave: 'onPointerLeave',
  
    touchstart: 'onTouchStart',
    touchmove: 'onTouchMove',
    touchend: 'onTouchEnd',
    touchcancel: 'onTouchCancel',
    touchleave: 'onTouchLeave',
  
    mousedown: 'onMouseDown',
    mousemove: 'onMouseMove',
    mouseup: 'onMouseUp',
    mousecancel: 'onBlur',
    mouseleave: 'onMouseLeave'
  };
  
  const hasTouch = 'ontouchstart' in window;
  const hasPointer = !!(window.PointerEvent || window.MSPointerEvent);
  export const downEvent = hasPointer ? 'pointerdown' : (hasTouch ? 'touchstart' : 'mousedown');
  export const moveEvent = hasPointer ? 'pointermove' : (hasTouch ? 'touchmove' : 'mousemove');
  export const upEvent = hasPointer ? 'pointerup' : (hasTouch ? 'touchend' : 'mouseup');
  export const cancelEvent = hasPointer ? 'pointercancel' : (hasTouch ? 'touchcancel' : 'blur');
  export const leaveEvent = hasPointer ? 'pointerleave' : (hasTouch ? 'touchleave' : 'mouseleave');
  
  export const reactDownEvent = ReactEvents[downEvent];
  export const reactMoveEvent = ReactEvents[moveEvent];
  export const reactUpEvent = ReactEvents[upEvent];
  export const reactCancelEvent = ReactEvents[cancelEvent];
  export const reactLeaveEvent = ReactEvents[leaveEvent];
  
  /**
   * 检测pointer事件是否多指
   */
  const pointerEvents = new Set();
  if (hasPointer) {
    function addEvent(e) {
      pointerEvents.add(e);
    }
  
    function clearEvent() {
      pointerEvents.clear();
    }
  
    window.addEventListener(downEvent, addEvent, true);
    window.addEventListener(upEvent, clearEvent, true);
    window.addEventListener(cancelEvent, clearEvent, true);
    window.addEventListener(leaveEvent, clearEvent, true);
  }
  
  export const hasMultiplePointer = function (e) {
    if (hasPointer && e instanceof window.PointerEvent) {
      if (Array.from(pointerEvents).length > 1) {
        return true;
      }
    } else if (e.touches && e.touches.length > 1) {
      return true;
    } else if (e.changedTouches && e.changedTouches.length > 1) {
      return true;
    }
    return false;
  };

const preventFunc = (e) => {
  e.preventDefault();
}

/**
 * 阻止触摸移动时页面随着滑动
 * @returns Object
 */
export const preventDefaultMove = function () {
  if ("ontouchmove" in document) {
    document.addEventListener("touchmove", preventFunc, {
      passive: false
    });
  } else {
    return null;
  }
  const cancel = function () {
    document.removeEventListener("touchmove", preventFunc, {
      passive: false
    });
  }
  return { cancel }
}

/**
 * 判断事件是否为鼠标触发
 * @param {Event} e 
 * @returns 
 */
export const isMouseEvent = function(e) {
  if (e.type.indexOf('mouse') === 0) {
    return true;
  }
  if (e.type.indexOf('pointer') === 0 && e.pointerType === 'mouse') {
    return true;
  }
  return false;
}

/**
 * 判断事件是否为触摸触发
 * @param { Event } e 
 * @returns Boolean
 */
export const isTouchEvent = function(e) {
  if (e.type.indexOf('touch') === 0) {
    return true;
  }

  if (e.type.indexOf('pointer') === 0 && e.pointerType === 'touch') {
    return true;
  }
  return false;
}
