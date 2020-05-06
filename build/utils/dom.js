"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  isDescendant: function isDescendant(parent, child) {
    var node = child.parentNode;

    while (node !== null) {
      if (node === parent) return true;
      node = node.parentNode;
    }

    return false;
  },
  offset: function offset(el) {
    var rect = el.getBoundingClientRect();
    return {
      top: rect.top + document.body.scrollTop,
      left: rect.left + document.body.scrollLeft
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9kb20uanMiXSwibmFtZXMiOlsiaXNEZXNjZW5kYW50IiwicGFyZW50IiwiY2hpbGQiLCJub2RlIiwicGFyZW50Tm9kZSIsIm9mZnNldCIsImVsIiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInRvcCIsImRvY3VtZW50IiwiYm9keSIsInNjcm9sbFRvcCIsImxlZnQiLCJzY3JvbGxMZWZ0Il0sIm1hcHBpbmdzIjoiOzs7OztrQkFBZTtBQUViQSxjQUZhLHdCQUVBQyxNQUZBLEVBRVFDLEtBRlIsRUFFZTtBQUMxQixRQUFJQyxPQUFPRCxNQUFNRSxVQUFqQjs7QUFFQSxXQUFPRCxTQUFTLElBQWhCLEVBQXNCO0FBQ3BCLFVBQUlBLFNBQVNGLE1BQWIsRUFBcUIsT0FBTyxJQUFQO0FBQ3JCRSxhQUFPQSxLQUFLQyxVQUFaO0FBQ0Q7O0FBRUQsV0FBTyxLQUFQO0FBQ0QsR0FYWTtBQWFiQyxRQWJhLGtCQWFOQyxFQWJNLEVBYUY7QUFDVCxRQUFNQyxPQUFPRCxHQUFHRSxxQkFBSCxFQUFiO0FBQ0EsV0FBTztBQUNMQyxXQUFLRixLQUFLRSxHQUFMLEdBQVdDLFNBQVNDLElBQVQsQ0FBY0MsU0FEekI7QUFFTEMsWUFBTU4sS0FBS00sSUFBTCxHQUFZSCxTQUFTQyxJQUFULENBQWNHO0FBRjNCLEtBQVA7QUFJRDtBQW5CWSxDIiwiZmlsZSI6ImRvbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcblxuICBpc0Rlc2NlbmRhbnQocGFyZW50LCBjaGlsZCkge1xuICAgIGxldCBub2RlID0gY2hpbGQucGFyZW50Tm9kZTtcblxuICAgIHdoaWxlIChub2RlICE9PSBudWxsKSB7XG4gICAgICBpZiAobm9kZSA9PT0gcGFyZW50KSByZXR1cm4gdHJ1ZTtcbiAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuXG4gIG9mZnNldChlbCkge1xuICAgIGNvbnN0IHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICByZXR1cm4ge1xuICAgICAgdG9wOiByZWN0LnRvcCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wLFxuICAgICAgbGVmdDogcmVjdC5sZWZ0ICsgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0LFxuICAgIH07XG4gIH0sXG5cbn07XG4iXX0=