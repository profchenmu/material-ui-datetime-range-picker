'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  once: function once(el, type, callback) {
    var typeArray = type ? type.split(' ') : [];
    var recursiveFunction = function recursiveFunction(event) {
      event.target.removeEventListener(event.type, recursiveFunction);
      return callback(event);
    };

    for (var i = typeArray.length - 1; i >= 0; i--) {
      this.on(el, typeArray[i], recursiveFunction);
    }
  },
  on: function on(el, type, callback) {
    if (el.addEventListener) {
      el.addEventListener(type, callback);
    } else {
      // IE8+ Support
      el.attachEvent('on' + type, function () {
        callback.call(el);
      });
    }
  },
  off: function off(el, type, callback) {
    if (el.removeEventListener) {
      el.removeEventListener(type, callback);
    } else {
      // IE8+ Support
      el.detachEvent('on' + type, callback);
    }
  },
  isKeyboard: function isKeyboard(event) {
    return ['keydown', 'keypress', 'keyup'].indexOf(event.type) !== -1;
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9ldmVudHMuanMiXSwibmFtZXMiOlsib25jZSIsImVsIiwidHlwZSIsImNhbGxiYWNrIiwidHlwZUFycmF5Iiwic3BsaXQiLCJyZWN1cnNpdmVGdW5jdGlvbiIsImV2ZW50IiwidGFyZ2V0IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImkiLCJsZW5ndGgiLCJvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJhdHRhY2hFdmVudCIsImNhbGwiLCJvZmYiLCJkZXRhY2hFdmVudCIsImlzS2V5Ym9hcmQiLCJpbmRleE9mIl0sIm1hcHBpbmdzIjoiOzs7OztrQkFBZTtBQUViQSxNQUZhLGdCQUVSQyxFQUZRLEVBRUpDLElBRkksRUFFRUMsUUFGRixFQUVZO0FBQ3ZCLFFBQU1DLFlBQVlGLE9BQU9BLEtBQUtHLEtBQUwsQ0FBVyxHQUFYLENBQVAsR0FBeUIsRUFBM0M7QUFDQSxRQUFNQyxvQkFBb0IsU0FBcEJBLGlCQUFvQixDQUFDQyxLQUFELEVBQVc7QUFDbkNBLFlBQU1DLE1BQU4sQ0FBYUMsbUJBQWIsQ0FBaUNGLE1BQU1MLElBQXZDLEVBQTZDSSxpQkFBN0M7QUFDQSxhQUFPSCxTQUFTSSxLQUFULENBQVA7QUFDRCxLQUhEOztBQUtBLFNBQUssSUFBSUcsSUFBSU4sVUFBVU8sTUFBVixHQUFtQixDQUFoQyxFQUFtQ0QsS0FBSyxDQUF4QyxFQUEyQ0EsR0FBM0MsRUFBZ0Q7QUFDOUMsV0FBS0UsRUFBTCxDQUFRWCxFQUFSLEVBQVlHLFVBQVVNLENBQVYsQ0FBWixFQUEwQkosaUJBQTFCO0FBQ0Q7QUFDRixHQVpZO0FBY2JNLElBZGEsY0FjVlgsRUFkVSxFQWNOQyxJQWRNLEVBY0FDLFFBZEEsRUFjVTtBQUNyQixRQUFJRixHQUFHWSxnQkFBUCxFQUF5QjtBQUN2QlosU0FBR1ksZ0JBQUgsQ0FBb0JYLElBQXBCLEVBQTBCQyxRQUExQjtBQUNELEtBRkQsTUFFTztBQUNMO0FBQ0FGLFNBQUdhLFdBQUgsUUFBb0JaLElBQXBCLEVBQTRCLFlBQU07QUFDaENDLGlCQUFTWSxJQUFULENBQWNkLEVBQWQ7QUFDRCxPQUZEO0FBR0Q7QUFDRixHQXZCWTtBQXlCYmUsS0F6QmEsZUF5QlRmLEVBekJTLEVBeUJMQyxJQXpCSyxFQXlCQ0MsUUF6QkQsRUF5Qlc7QUFDdEIsUUFBSUYsR0FBR1EsbUJBQVAsRUFBNEI7QUFDMUJSLFNBQUdRLG1CQUFILENBQXVCUCxJQUF2QixFQUE2QkMsUUFBN0I7QUFDRCxLQUZELE1BRU87QUFDTDtBQUNBRixTQUFHZ0IsV0FBSCxRQUFvQmYsSUFBcEIsRUFBNEJDLFFBQTVCO0FBQ0Q7QUFDRixHQWhDWTtBQWtDYmUsWUFsQ2Esc0JBa0NGWCxLQWxDRSxFQWtDSztBQUNoQixXQUFPLENBQ0wsU0FESyxFQUVMLFVBRkssRUFHTCxPQUhLLEVBSUxZLE9BSkssQ0FJR1osTUFBTUwsSUFKVCxNQUltQixDQUFDLENBSjNCO0FBS0Q7QUF4Q1ksQyIsImZpbGUiOiJldmVudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG5cbiAgb25jZShlbCwgdHlwZSwgY2FsbGJhY2spIHtcbiAgICBjb25zdCB0eXBlQXJyYXkgPSB0eXBlID8gdHlwZS5zcGxpdCgnICcpIDogW107XG4gICAgY29uc3QgcmVjdXJzaXZlRnVuY3Rpb24gPSAoZXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LnR5cGUsIHJlY3Vyc2l2ZUZ1bmN0aW9uKTtcbiAgICAgIHJldHVybiBjYWxsYmFjayhldmVudCk7XG4gICAgfTtcblxuICAgIGZvciAobGV0IGkgPSB0eXBlQXJyYXkubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHRoaXMub24oZWwsIHR5cGVBcnJheVtpXSwgcmVjdXJzaXZlRnVuY3Rpb24pO1xuICAgIH1cbiAgfSxcblxuICBvbihlbCwgdHlwZSwgY2FsbGJhY2spIHtcbiAgICBpZiAoZWwuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBjYWxsYmFjayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElFOCsgU3VwcG9ydFxuICAgICAgZWwuYXR0YWNoRXZlbnQoYG9uJHt0eXBlfWAsICgpID0+IHtcbiAgICAgICAgY2FsbGJhY2suY2FsbChlbCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgb2ZmKGVsLCB0eXBlLCBjYWxsYmFjaykge1xuICAgIGlmIChlbC5yZW1vdmVFdmVudExpc3RlbmVyKSB7XG4gICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGNhbGxiYWNrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSUU4KyBTdXBwb3J0XG4gICAgICBlbC5kZXRhY2hFdmVudChgb24ke3R5cGV9YCwgY2FsbGJhY2spO1xuICAgIH1cbiAgfSxcblxuICBpc0tleWJvYXJkKGV2ZW50KSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdrZXlkb3duJyxcbiAgICAgICdrZXlwcmVzcycsXG4gICAgICAna2V5dXAnLFxuICAgIF0uaW5kZXhPZihldmVudC50eXBlKSAhPT0gLTE7XG4gIH0sXG59O1xuIl19