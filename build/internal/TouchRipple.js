'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _simpleAssign = require('simple-assign');

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _TransitionGroup = require('react-transition-group/TransitionGroup');

var _TransitionGroup2 = _interopRequireDefault(_TransitionGroup);

var _dom = require('../utils/dom');

var _dom2 = _interopRequireDefault(_dom);

var _CircleRipple = require('./CircleRipple');

var _CircleRipple2 = _interopRequireDefault(_CircleRipple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

// Remove the first element of the array
var shift = function shift(_ref) {
  var _ref2 = _toArray(_ref),
      newArray = _ref2.slice(1);

  return newArray;
};

var TouchRipple = function (_Component) {
  _inherits(TouchRipple, _Component);

  function TouchRipple(props, context) {
    _classCallCheck(this, TouchRipple);

    // Touch start produces a mouse down event for compat reasons. To avoid
    // showing ripples twice we skip showing a ripple for the first mouse down
    // after a touch start. Note we don't store ignoreNextMouseDown in this.state
    // to avoid re-rendering when we change it.
    var _this = _possibleConstructorReturn(this, (TouchRipple.__proto__ || Object.getPrototypeOf(TouchRipple)).call(this, props, context));

    _this.handleMouseDown = function (event) {
      // only listen to left clicks
      if (event.button === 0) {
        _this.start(event, false);
      }
    };

    _this.handleMouseUp = function () {
      _this.end();
    };

    _this.handleMouseLeave = function () {
      _this.end();
    };

    _this.handleTouchStart = function (event) {
      event.stopPropagation();
      // If the user is swiping (not just tapping), save the position so we can
      // abort ripples if the user appears to be scrolling.
      if (_this.props.abortOnScroll && event.touches) {
        _this.startListeningForScrollAbort(event);
        _this.startTime = Date.now();
      }
      _this.start(event, true);
    };

    _this.handleTouchEnd = function () {
      _this.end();
    };

    _this.handleTouchMove = function (event) {
      // Stop trying to abort if we're already 300ms into the animation
      var timeSinceStart = Math.abs(Date.now() - _this.startTime);
      if (timeSinceStart > 300) {
        _this.stopListeningForScrollAbort();
        return;
      }

      // If the user is scrolling...
      var deltaY = Math.abs(event.touches[0].clientY - _this.firstTouchY);
      var deltaX = Math.abs(event.touches[0].clientX - _this.firstTouchX);
      // Call it a scroll after an arbitrary 6px (feels reasonable in testing)
      if (deltaY > 6 || deltaX > 6) {
        var currentRipples = _this.state.ripples;
        var ripple = currentRipples[0];
        // This clone will replace the ripple in ReactTransitionGroup with a
        // version that will disappear immediately when removed from the DOM
        var abortedRipple = _react2.default.cloneElement(ripple, { aborted: true });
        // Remove the old ripple and replace it with the new updated one
        currentRipples = shift(currentRipples);
        currentRipples = [].concat(_toConsumableArray(currentRipples), [abortedRipple]);
        _this.setState({ ripples: currentRipples }, function () {
          // Call end after we've set the ripple to abort otherwise the setState
          // in end() merges with this and the ripple abort fails
          _this.end();
        });
      }
    };

    _this.ignoreNextMouseDown = false;

    _this.state = {
      // This prop allows us to only render the ReactTransitionGroup
      // on the first click of the component, making the inital render faster.
      hasRipples: false,
      nextKey: 0,
      ripples: []
    };
    return _this;
  }

  _createClass(TouchRipple, [{
    key: 'start',
    value: function start(event, isRippleTouchGenerated) {
      var theme = this.context.muiTheme.ripple;

      if (this.ignoreNextMouseDown && !isRippleTouchGenerated) {
        this.ignoreNextMouseDown = false;
        return;
      }

      var ripples = this.state.ripples;

      // Add a ripple to the ripples array
      ripples = [].concat(_toConsumableArray(ripples), [_react2.default.createElement(_CircleRipple2.default, {
        key: this.state.nextKey,
        style: !this.props.centerRipple ? this.getRippleStyle(event) : {},
        color: this.props.color || theme.color,
        opacity: this.props.opacity,
        touchGenerated: isRippleTouchGenerated
      })]);

      this.ignoreNextMouseDown = isRippleTouchGenerated;
      this.setState({
        hasRipples: true,
        nextKey: this.state.nextKey + 1,
        ripples: ripples
      });
    }
  }, {
    key: 'end',
    value: function end() {
      var currentRipples = this.state.ripples;
      this.setState({
        ripples: shift(currentRipples)
      });
      if (this.props.abortOnScroll) {
        this.stopListeningForScrollAbort();
      }
    }

    // Check if the user seems to be scrolling and abort the animation if so

  }, {
    key: 'startListeningForScrollAbort',
    value: function startListeningForScrollAbort(event) {
      this.firstTouchY = event.touches[0].clientY;
      this.firstTouchX = event.touches[0].clientX;
      // Note that when scolling Chrome throttles this event to every 200ms
      // Also note we don't listen for scroll events directly as there's no general
      // way to cover cases like scrolling within containers on the page
      document.body.addEventListener('touchmove', this.handleTouchMove);
    }
  }, {
    key: 'stopListeningForScrollAbort',
    value: function stopListeningForScrollAbort() {
      document.body.removeEventListener('touchmove', this.handleTouchMove);
    }
  }, {
    key: 'getRippleStyle',
    value: function getRippleStyle(event) {
      var el = _reactDom2.default.findDOMNode(this);
      var elHeight = el.offsetHeight;
      var elWidth = el.offsetWidth;
      var offset = _dom2.default.offset(el);
      var isTouchEvent = event.touches && event.touches.length;
      var pageX = isTouchEvent ? event.touches[0].pageX : event.pageX;
      var pageY = isTouchEvent ? event.touches[0].pageY : event.pageY;
      var pointerX = pageX - offset.left;
      var pointerY = pageY - offset.top;
      var topLeftDiag = this.calcDiag(pointerX, pointerY);
      var topRightDiag = this.calcDiag(elWidth - pointerX, pointerY);
      var botRightDiag = this.calcDiag(elWidth - pointerX, elHeight - pointerY);
      var botLeftDiag = this.calcDiag(pointerX, elHeight - pointerY);
      var rippleRadius = Math.max(topLeftDiag, topRightDiag, botRightDiag, botLeftDiag);
      var rippleSize = rippleRadius * 2;
      var left = pointerX - rippleRadius;
      var top = pointerY - rippleRadius;

      return {
        directionInvariant: true,
        height: rippleSize,
        width: rippleSize,
        top: top,
        left: left
      };
    }
  }, {
    key: 'calcDiag',
    value: function calcDiag(a, b) {
      return Math.sqrt(a * a + b * b);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          style = _props.style;
      var _state = this.state,
          hasRipples = _state.hasRipples,
          ripples = _state.ripples;
      var prepareStyles = this.context.muiTheme.prepareStyles;


      var rippleGroup = void 0;

      if (hasRipples) {
        var mergedStyles = (0, _simpleAssign2.default)({
          height: '100%',
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 1 // This is also needed so that ripples do not bleed past a parent border radius.
        }, style);

        rippleGroup = _react2.default.createElement(
          _TransitionGroup2.default,
          { style: prepareStyles(mergedStyles) },
          ripples
        );
      }

      return _react2.default.createElement(
        'div',
        {
          onMouseUp: this.handleMouseUp,
          onMouseDown: this.handleMouseDown,
          onMouseLeave: this.handleMouseLeave,
          onTouchStart: this.handleTouchStart,
          onTouchEnd: this.handleTouchEnd
        },
        rippleGroup,
        children
      );
    }
  }]);

  return TouchRipple;
}(_react.Component);

TouchRipple.propTypes = {
  abortOnScroll: _propTypes2.default.bool,
  centerRipple: _propTypes2.default.bool,
  children: _propTypes2.default.node,
  color: _propTypes2.default.string,
  opacity: _propTypes2.default.number,
  style: _propTypes2.default.object
};
TouchRipple.defaultProps = {
  abortOnScroll: true
};
TouchRipple.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
exports.default = TouchRipple;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbnRlcm5hbC9Ub3VjaFJpcHBsZS5qcyJdLCJuYW1lcyI6WyJzaGlmdCIsIm5ld0FycmF5IiwiVG91Y2hSaXBwbGUiLCJwcm9wcyIsImNvbnRleHQiLCJoYW5kbGVNb3VzZURvd24iLCJldmVudCIsImJ1dHRvbiIsInN0YXJ0IiwiaGFuZGxlTW91c2VVcCIsImVuZCIsImhhbmRsZU1vdXNlTGVhdmUiLCJoYW5kbGVUb3VjaFN0YXJ0Iiwic3RvcFByb3BhZ2F0aW9uIiwiYWJvcnRPblNjcm9sbCIsInRvdWNoZXMiLCJzdGFydExpc3RlbmluZ0ZvclNjcm9sbEFib3J0Iiwic3RhcnRUaW1lIiwiRGF0ZSIsIm5vdyIsImhhbmRsZVRvdWNoRW5kIiwiaGFuZGxlVG91Y2hNb3ZlIiwidGltZVNpbmNlU3RhcnQiLCJNYXRoIiwiYWJzIiwic3RvcExpc3RlbmluZ0ZvclNjcm9sbEFib3J0IiwiZGVsdGFZIiwiY2xpZW50WSIsImZpcnN0VG91Y2hZIiwiZGVsdGFYIiwiY2xpZW50WCIsImZpcnN0VG91Y2hYIiwiY3VycmVudFJpcHBsZXMiLCJzdGF0ZSIsInJpcHBsZXMiLCJyaXBwbGUiLCJhYm9ydGVkUmlwcGxlIiwiUmVhY3QiLCJjbG9uZUVsZW1lbnQiLCJhYm9ydGVkIiwic2V0U3RhdGUiLCJpZ25vcmVOZXh0TW91c2VEb3duIiwiaGFzUmlwcGxlcyIsIm5leHRLZXkiLCJpc1JpcHBsZVRvdWNoR2VuZXJhdGVkIiwidGhlbWUiLCJtdWlUaGVtZSIsImNlbnRlclJpcHBsZSIsImdldFJpcHBsZVN0eWxlIiwiY29sb3IiLCJvcGFjaXR5IiwiZG9jdW1lbnQiLCJib2R5IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJlbCIsIlJlYWN0RE9NIiwiZmluZERPTU5vZGUiLCJlbEhlaWdodCIsIm9mZnNldEhlaWdodCIsImVsV2lkdGgiLCJvZmZzZXRXaWR0aCIsIm9mZnNldCIsIkRvbSIsImlzVG91Y2hFdmVudCIsImxlbmd0aCIsInBhZ2VYIiwicGFnZVkiLCJwb2ludGVyWCIsImxlZnQiLCJwb2ludGVyWSIsInRvcCIsInRvcExlZnREaWFnIiwiY2FsY0RpYWciLCJ0b3BSaWdodERpYWciLCJib3RSaWdodERpYWciLCJib3RMZWZ0RGlhZyIsInJpcHBsZVJhZGl1cyIsIm1heCIsInJpcHBsZVNpemUiLCJkaXJlY3Rpb25JbnZhcmlhbnQiLCJoZWlnaHQiLCJ3aWR0aCIsImEiLCJiIiwic3FydCIsImNoaWxkcmVuIiwic3R5bGUiLCJwcmVwYXJlU3R5bGVzIiwicmlwcGxlR3JvdXAiLCJtZXJnZWRTdHlsZXMiLCJwb3NpdGlvbiIsIm92ZXJmbG93IiwicG9pbnRlckV2ZW50cyIsInpJbmRleCIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsImJvb2wiLCJub2RlIiwic3RyaW5nIiwibnVtYmVyIiwib2JqZWN0IiwiZGVmYXVsdFByb3BzIiwiY29udGV4dFR5cGVzIiwiaXNSZXF1aXJlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7QUFDQSxJQUFNQSxRQUFRLFNBQVJBLEtBQVE7QUFBQTtBQUFBLE1BQU9DLFFBQVA7O0FBQUEsU0FBcUJBLFFBQXJCO0FBQUEsQ0FBZDs7SUFFTUMsVzs7O0FBa0JKLHVCQUFZQyxLQUFaLEVBQW1CQyxPQUFuQixFQUE0QjtBQUFBOztBQUUxQjtBQUNBO0FBQ0E7QUFDQTtBQUwwQiwwSEFDcEJELEtBRG9CLEVBQ2JDLE9BRGE7O0FBQUEsVUF3RDVCQyxlQXhENEIsR0F3RFYsVUFBQ0MsS0FBRCxFQUFXO0FBQzNCO0FBQ0EsVUFBSUEsTUFBTUMsTUFBTixLQUFpQixDQUFyQixFQUF3QjtBQUN0QixjQUFLQyxLQUFMLENBQVdGLEtBQVgsRUFBa0IsS0FBbEI7QUFDRDtBQUNGLEtBN0QyQjs7QUFBQSxVQStENUJHLGFBL0Q0QixHQStEWixZQUFNO0FBQ3BC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VUssTUFBVixDQUFpQkc7QUFEUCxDO2tCQWdOVHZHLFciLCJmaWxlIjoiVG91Y2hSaXBwbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBSZWFjdFRyYW5zaXRpb25Hcm91cCBmcm9tICdyZWFjdC10cmFuc2l0aW9uLWdyb3VwL1RyYW5zaXRpb25Hcm91cCc7XG5pbXBvcnQgRG9tIGZyb20gJy4uL3V0aWxzL2RvbSc7XG5pbXBvcnQgQ2lyY2xlUmlwcGxlIGZyb20gJy4vQ2lyY2xlUmlwcGxlJztcblxuLy8gUmVtb3ZlIHRoZSBmaXJzdCBlbGVtZW50IG9mIHRoZSBhcnJheVxuY29uc3Qgc2hpZnQgPSAoWywgLi4ubmV3QXJyYXldKSA9PiBuZXdBcnJheTtcblxuY2xhc3MgVG91Y2hSaXBwbGUgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGFib3J0T25TY3JvbGw6IFByb3BUeXBlcy5ib29sLFxuICAgIGNlbnRlclJpcHBsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuICAgIGNvbG9yOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9wYWNpdHk6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgc3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBhYm9ydE9uU2Nyb2xsOiB0cnVlLFxuICB9O1xuXG4gIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgbXVpVGhlbWU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcywgY29udGV4dCkge1xuICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KTtcbiAgICAvLyBUb3VjaCBzdGFydCBwcm9kdWNlcyBhIG1vdXNlIGRvd24gZXZlbnQgZm9yIGNvbXBhdCByZWFzb25zLiBUbyBhdm9pZFxuICAgIC8vIHNob3dpbmcgcmlwcGxlcyB0d2ljZSB3ZSBza2lwIHNob3dpbmcgYSByaXBwbGUgZm9yIHRoZSBmaXJzdCBtb3VzZSBkb3duXG4gICAgLy8gYWZ0ZXIgYSB0b3VjaCBzdGFydC4gTm90ZSB3ZSBkb24ndCBzdG9yZSBpZ25vcmVOZXh0TW91c2VEb3duIGluIHRoaXMuc3RhdGVcbiAgICAvLyB0byBhdm9pZCByZS1yZW5kZXJpbmcgd2hlbiB3ZSBjaGFuZ2UgaXQuXG4gICAgdGhpcy5pZ25vcmVOZXh0TW91c2VEb3duID0gZmFsc2U7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgLy8gVGhpcyBwcm9wIGFsbG93cyB1cyB0byBvbmx5IHJlbmRlciB0aGUgUmVhY3RUcmFuc2l0aW9uR3JvdXBcbiAgICAgIC8vIG9uIHRoZSBmaXJzdCBjbGljayBvZiB0aGUgY29tcG9uZW50LCBtYWtpbmcgdGhlIGluaXRhbCByZW5kZXIgZmFzdGVyLlxuICAgICAgaGFzUmlwcGxlczogZmFsc2UsXG4gICAgICBuZXh0S2V5OiAwLFxuICAgICAgcmlwcGxlczogW10sXG4gICAgfTtcbiAgfVxuXG4gIHN0YXJ0KGV2ZW50LCBpc1JpcHBsZVRvdWNoR2VuZXJhdGVkKSB7XG4gICAgY29uc3QgdGhlbWUgPSB0aGlzLmNvbnRleHQubXVpVGhlbWUucmlwcGxlO1xuXG4gICAgaWYgKHRoaXMuaWdub3JlTmV4dE1vdXNlRG93biAmJiAhaXNSaXBwbGVUb3VjaEdlbmVyYXRlZCkge1xuICAgICAgdGhpcy5pZ25vcmVOZXh0TW91c2VEb3duID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHJpcHBsZXMgPSB0aGlzLnN0YXRlLnJpcHBsZXM7XG5cbiAgICAvLyBBZGQgYSByaXBwbGUgdG8gdGhlIHJpcHBsZXMgYXJyYXlcbiAgICByaXBwbGVzID0gWy4uLnJpcHBsZXMsIChcbiAgICAgIDxDaXJjbGVSaXBwbGVcbiAgICAgICAga2V5PXt0aGlzLnN0YXRlLm5leHRLZXl9XG4gICAgICAgIHN0eWxlPXshdGhpcy5wcm9wcy5jZW50ZXJSaXBwbGUgPyB0aGlzLmdldFJpcHBsZVN0eWxlKGV2ZW50KSA6IHt9fVxuICAgICAgICBjb2xvcj17dGhpcy5wcm9wcy5jb2xvciB8fCB0aGVtZS5jb2xvcn1cbiAgICAgICAgb3BhY2l0eT17dGhpcy5wcm9wcy5vcGFjaXR5fVxuICAgICAgICB0b3VjaEdlbmVyYXRlZD17aXNSaXBwbGVUb3VjaEdlbmVyYXRlZH1cbiAgICAgIC8+XG4gICAgKV07XG5cbiAgICB0aGlzLmlnbm9yZU5leHRNb3VzZURvd24gPSBpc1JpcHBsZVRvdWNoR2VuZXJhdGVkO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgaGFzUmlwcGxlczogdHJ1ZSxcbiAgICAgIG5leHRLZXk6IHRoaXMuc3RhdGUubmV4dEtleSArIDEsXG4gICAgICByaXBwbGVzOiByaXBwbGVzLFxuICAgIH0pO1xuICB9XG5cbiAgZW5kKCkge1xuICAgIGNvbnN0IGN1cnJlbnRSaXBwbGVzID0gdGhpcy5zdGF0ZS5yaXBwbGVzO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcmlwcGxlczogc2hpZnQoY3VycmVudFJpcHBsZXMpLFxuICAgIH0pO1xuICAgIGlmICh0aGlzLnByb3BzLmFib3J0T25TY3JvbGwpIHtcbiAgICAgIHRoaXMuc3RvcExpc3RlbmluZ0ZvclNjcm9sbEFib3J0KCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlTW91c2VEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgLy8gb25seSBsaXN0ZW4gdG8gbGVmdCBjbGlja3NcbiAgICBpZiAoZXZlbnQuYnV0dG9uID09PSAwKSB7XG4gICAgICB0aGlzLnN0YXJ0KGV2ZW50LCBmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZU1vdXNlVXAgPSAoKSA9PiB7XG4gICAgdGhpcy5lbmQoKTtcbiAgfTtcblxuICBoYW5kbGVNb3VzZUxlYXZlID0gKCkgPT4ge1xuICAgIHRoaXMuZW5kKCk7XG4gIH07XG5cbiAgaGFuZGxlVG91Y2hTdGFydCA9IChldmVudCkgPT4ge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIC8vIElmIHRoZSB1c2VyIGlzIHN3aXBpbmcgKG5vdCBqdXN0IHRhcHBpbmcpLCBzYXZlIHRoZSBwb3NpdGlvbiBzbyB3ZSBjYW5cbiAgICAvLyBhYm9ydCByaXBwbGVzIGlmIHRoZSB1c2VyIGFwcGVhcnMgdG8gYmUgc2Nyb2xsaW5nLlxuICAgIGlmICh0aGlzLnByb3BzLmFib3J0T25TY3JvbGwgJiYgZXZlbnQudG91Y2hlcykge1xuICAgICAgdGhpcy5zdGFydExpc3RlbmluZ0ZvclNjcm9sbEFib3J0KGV2ZW50KTtcbiAgICAgIHRoaXMuc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICB9XG4gICAgdGhpcy5zdGFydChldmVudCwgdHJ1ZSk7XG4gIH07XG5cbiAgaGFuZGxlVG91Y2hFbmQgPSAoKSA9PiB7XG4gICAgdGhpcy5lbmQoKTtcbiAgfTtcblxuICAvLyBDaGVjayBpZiB0aGUgdXNlciBzZWVtcyB0byBiZSBzY3JvbGxpbmcgYW5kIGFib3J0IHRoZSBhbmltYXRpb24gaWYgc29cbiAgaGFuZGxlVG91Y2hNb3ZlID0gKGV2ZW50KSA9PiB7XG4gICAgLy8gU3RvcCB0cnlpbmcgdG8gYWJvcnQgaWYgd2UncmUgYWxyZWFkeSAzMDBtcyBpbnRvIHRoZSBhbmltYXRpb25cbiAgICBjb25zdCB0aW1lU2luY2VTdGFydCA9IE1hdGguYWJzKERhdGUubm93KCkgLSB0aGlzLnN0YXJ0VGltZSk7XG4gICAgaWYgKHRpbWVTaW5jZVN0YXJ0ID4gMzAwKSB7XG4gICAgICB0aGlzLnN0b3BMaXN0ZW5pbmdGb3JTY3JvbGxBYm9ydCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIElmIHRoZSB1c2VyIGlzIHNjcm9sbGluZy4uLlxuICAgIGNvbnN0IGRlbHRhWSA9IE1hdGguYWJzKGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WSAtIHRoaXMuZmlyc3RUb3VjaFkpO1xuICAgIGNvbnN0IGRlbHRhWCA9IE1hdGguYWJzKGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WCAtIHRoaXMuZmlyc3RUb3VjaFgpO1xuICAgIC8vIENhbGwgaXQgYSBzY3JvbGwgYWZ0ZXIgYW4gYXJiaXRyYXJ5IDZweCAoZmVlbHMgcmVhc29uYWJsZSBpbiB0ZXN0aW5nKVxuICAgIGlmIChkZWx0YVkgPiA2IHx8IGRlbHRhWCA+IDYpIHtcbiAgICAgIGxldCBjdXJyZW50UmlwcGxlcyA9IHRoaXMuc3RhdGUucmlwcGxlcztcbiAgICAgIGNvbnN0IHJpcHBsZSA9IGN1cnJlbnRSaXBwbGVzWzBdO1xuICAgICAgLy8gVGhpcyBjbG9uZSB3aWxsIHJlcGxhY2UgdGhlIHJpcHBsZSBpbiBSZWFjdFRyYW5zaXRpb25Hcm91cCB3aXRoIGFcbiAgICAgIC8vIHZlcnNpb24gdGhhdCB3aWxsIGRpc2FwcGVhciBpbW1lZGlhdGVseSB3aGVuIHJlbW92ZWQgZnJvbSB0aGUgRE9NXG4gICAgICBjb25zdCBhYm9ydGVkUmlwcGxlID0gUmVhY3QuY2xvbmVFbGVtZW50KHJpcHBsZSwge2Fib3J0ZWQ6IHRydWV9KTtcbiAgICAgIC8vIFJlbW92ZSB0aGUgb2xkIHJpcHBsZSBhbmQgcmVwbGFjZSBpdCB3aXRoIHRoZSBuZXcgdXBkYXRlZCBvbmVcbiAgICAgIGN1cnJlbnRSaXBwbGVzID0gc2hpZnQoY3VycmVudFJpcHBsZXMpO1xuICAgICAgY3VycmVudFJpcHBsZXMgPSBbLi4uY3VycmVudFJpcHBsZXMsIGFib3J0ZWRSaXBwbGVdO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7cmlwcGxlczogY3VycmVudFJpcHBsZXN9LCAoKSA9PiB7XG4gICAgICAgIC8vIENhbGwgZW5kIGFmdGVyIHdlJ3ZlIHNldCB0aGUgcmlwcGxlIHRvIGFib3J0IG90aGVyd2lzZSB0aGUgc2V0U3RhdGVcbiAgICAgICAgLy8gaW4gZW5kKCkgbWVyZ2VzIHdpdGggdGhpcyBhbmQgdGhlIHJpcHBsZSBhYm9ydCBmYWlsc1xuICAgICAgICB0aGlzLmVuZCgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIHN0YXJ0TGlzdGVuaW5nRm9yU2Nyb2xsQWJvcnQoZXZlbnQpIHtcbiAgICB0aGlzLmZpcnN0VG91Y2hZID0gZXZlbnQudG91Y2hlc1swXS5jbGllbnRZO1xuICAgIHRoaXMuZmlyc3RUb3VjaFggPSBldmVudC50b3VjaGVzWzBdLmNsaWVudFg7XG4gICAgLy8gTm90ZSB0aGF0IHdoZW4gc2NvbGxpbmcgQ2hyb21lIHRocm90dGxlcyB0aGlzIGV2ZW50IHRvIGV2ZXJ5IDIwMG1zXG4gICAgLy8gQWxzbyBub3RlIHdlIGRvbid0IGxpc3RlbiBmb3Igc2Nyb2xsIGV2ZW50cyBkaXJlY3RseSBhcyB0aGVyZSdzIG5vIGdlbmVyYWxcbiAgICAvLyB3YXkgdG8gY292ZXIgY2FzZXMgbGlrZSBzY3JvbGxpbmcgd2l0aGluIGNvbnRhaW5lcnMgb24gdGhlIHBhZ2VcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuaGFuZGxlVG91Y2hNb3ZlKTtcbiAgfVxuXG4gIHN0b3BMaXN0ZW5pbmdGb3JTY3JvbGxBYm9ydCgpIHtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuaGFuZGxlVG91Y2hNb3ZlKTtcbiAgfVxuXG4gIGdldFJpcHBsZVN0eWxlKGV2ZW50KSB7XG4gICAgY29uc3QgZWwgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKTtcbiAgICBjb25zdCBlbEhlaWdodCA9IGVsLm9mZnNldEhlaWdodDtcbiAgICBjb25zdCBlbFdpZHRoID0gZWwub2Zmc2V0V2lkdGg7XG4gICAgY29uc3Qgb2Zmc2V0ID0gRG9tLm9mZnNldChlbCk7XG4gICAgY29uc3QgaXNUb3VjaEV2ZW50ID0gZXZlbnQudG91Y2hlcyAmJiBldmVudC50b3VjaGVzLmxlbmd0aDtcbiAgICBjb25zdCBwYWdlWCA9IGlzVG91Y2hFdmVudCA/IGV2ZW50LnRvdWNoZXNbMF0ucGFnZVggOiBldmVudC5wYWdlWDtcbiAgICBjb25zdCBwYWdlWSA9IGlzVG91Y2hFdmVudCA/IGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkgOiBldmVudC5wYWdlWTtcbiAgICBjb25zdCBwb2ludGVyWCA9IHBhZ2VYIC0gb2Zmc2V0LmxlZnQ7XG4gICAgY29uc3QgcG9pbnRlclkgPSBwYWdlWSAtIG9mZnNldC50b3A7XG4gICAgY29uc3QgdG9wTGVmdERpYWcgPSB0aGlzLmNhbGNEaWFnKHBvaW50ZXJYLCBwb2ludGVyWSk7XG4gICAgY29uc3QgdG9wUmlnaHREaWFnID0gdGhpcy5jYWxjRGlhZyhlbFdpZHRoIC0gcG9pbnRlclgsIHBvaW50ZXJZKTtcbiAgICBjb25zdCBib3RSaWdodERpYWcgPSB0aGlzLmNhbGNEaWFnKGVsV2lkdGggLSBwb2ludGVyWCwgZWxIZWlnaHQgLSBwb2ludGVyWSk7XG4gICAgY29uc3QgYm90TGVmdERpYWcgPSB0aGlzLmNhbGNEaWFnKHBvaW50ZXJYLCBlbEhlaWdodCAtIHBvaW50ZXJZKTtcbiAgICBjb25zdCByaXBwbGVSYWRpdXMgPSBNYXRoLm1heChcbiAgICAgIHRvcExlZnREaWFnLCB0b3BSaWdodERpYWcsIGJvdFJpZ2h0RGlhZywgYm90TGVmdERpYWdcbiAgICApO1xuICAgIGNvbnN0IHJpcHBsZVNpemUgPSByaXBwbGVSYWRpdXMgKiAyO1xuICAgIGNvbnN0IGxlZnQgPSBwb2ludGVyWCAtIHJpcHBsZVJhZGl1cztcbiAgICBjb25zdCB0b3AgPSBwb2ludGVyWSAtIHJpcHBsZVJhZGl1cztcblxuICAgIHJldHVybiB7XG4gICAgICBkaXJlY3Rpb25JbnZhcmlhbnQ6IHRydWUsXG4gICAgICBoZWlnaHQ6IHJpcHBsZVNpemUsXG4gICAgICB3aWR0aDogcmlwcGxlU2l6ZSxcbiAgICAgIHRvcDogdG9wLFxuICAgICAgbGVmdDogbGVmdCxcbiAgICB9O1xuICB9XG5cbiAgY2FsY0RpYWcoYSwgYikge1xuICAgIHJldHVybiBNYXRoLnNxcnQoKGEgKiBhKSArIChiICogYikpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtjaGlsZHJlbiwgc3R5bGV9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7aGFzUmlwcGxlcywgcmlwcGxlc30gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHtwcmVwYXJlU3R5bGVzfSA9IHRoaXMuY29udGV4dC5tdWlUaGVtZTtcblxuICAgIGxldCByaXBwbGVHcm91cDtcblxuICAgIGlmIChoYXNSaXBwbGVzKSB7XG4gICAgICBjb25zdCBtZXJnZWRTdHlsZXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICB0b3A6IDAsXG4gICAgICAgIGxlZnQ6IDAsXG4gICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgcG9pbnRlckV2ZW50czogJ25vbmUnLFxuICAgICAgICB6SW5kZXg6IDEsIC8vIFRoaXMgaXMgYWxzbyBuZWVkZWQgc28gdGhhdCByaXBwbGVzIGRvIG5vdCBibGVlZCBwYXN0IGEgcGFyZW50IGJvcmRlciByYWRpdXMuXG4gICAgICB9LCBzdHlsZSk7XG5cbiAgICAgIHJpcHBsZUdyb3VwID0gKFxuICAgICAgICA8UmVhY3RUcmFuc2l0aW9uR3JvdXAgc3R5bGU9e3ByZXBhcmVTdHlsZXMobWVyZ2VkU3R5bGVzKX0+XG4gICAgICAgICAge3JpcHBsZXN9XG4gICAgICAgIDwvUmVhY3RUcmFuc2l0aW9uR3JvdXA+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIG9uTW91c2VVcD17dGhpcy5oYW5kbGVNb3VzZVVwfVxuICAgICAgICBvbk1vdXNlRG93bj17dGhpcy5oYW5kbGVNb3VzZURvd259XG4gICAgICAgIG9uTW91c2VMZWF2ZT17dGhpcy5oYW5kbGVNb3VzZUxlYXZlfVxuICAgICAgICBvblRvdWNoU3RhcnQ9e3RoaXMuaGFuZGxlVG91Y2hTdGFydH1cbiAgICAgICAgb25Ub3VjaEVuZD17dGhpcy5oYW5kbGVUb3VjaEVuZH1cbiAgICAgID5cbiAgICAgICAge3JpcHBsZUdyb3VwfVxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRvdWNoUmlwcGxlO1xuIl19