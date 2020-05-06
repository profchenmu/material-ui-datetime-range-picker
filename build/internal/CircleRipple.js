'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _simpleAssign = require('simple-assign');

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _shallowEqual = require('recompose/shallowEqual');

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _autoPrefix = require('../utils/autoPrefix');

var _autoPrefix2 = _interopRequireDefault(_autoPrefix);

var _transitions = require('../styles/transitions');

var _transitions2 = _interopRequireDefault(_transitions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CircleRipple = function (_Component) {
  _inherits(CircleRipple, _Component);

  function CircleRipple() {
    _classCallCheck(this, CircleRipple);

    return _possibleConstructorReturn(this, (CircleRipple.__proto__ || Object.getPrototypeOf(CircleRipple)).apply(this, arguments));
  }

  _createClass(CircleRipple, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return !(0, _shallowEqual2.default)(this.props, nextProps);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.enterTimer);
      clearTimeout(this.leaveTimer);
    }
  }, {
    key: 'componentWillAppear',
    value: function componentWillAppear(callback) {
      this.initializeAnimation(callback);
    }
  }, {
    key: 'componentWillEnter',
    value: function componentWillEnter(callback) {
      this.initializeAnimation(callback);
    }
  }, {
    key: 'componentDidAppear',
    value: function componentDidAppear() {
      this.animate();
    }
  }, {
    key: 'componentDidEnter',
    value: function componentDidEnter() {
      this.animate();
    }
  }, {
    key: 'componentWillLeave',
    value: function componentWillLeave(callback) {
      var style = _reactDom2.default.findDOMNode(this).style;
      style.opacity = 0;
      // If the animation is aborted, remove from the DOM immediately
      var removeAfter = this.props.aborted ? 0 : 2000;
      this.enterTimer = setTimeout(callback, removeAfter);
    }
  }, {
    key: 'animate',
    value: function animate() {
      var style = _reactDom2.default.findDOMNode(this).style;
      var transitionValue = _transitions2.default.easeOut('2s', 'opacity') + ', ' + _transitions2.default.easeOut('1s', 'transform');
      _autoPrefix2.default.set(style, 'transition', transitionValue);
      _autoPrefix2.default.set(style, 'transform', 'scale(1)');
    }
  }, {
    key: 'initializeAnimation',
    value: function initializeAnimation(callback) {
      var style = _reactDom2.default.findDOMNode(this).style;
      style.opacity = this.props.opacity;
      _autoPrefix2.default.set(style, 'transform', 'scale(0)');
      this.leaveTimer = setTimeout(callback, 0);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          aborted = _props.aborted,
          color = _props.color,
          opacity = _props.opacity,
          style = _props.style,
          touchGenerated = _props.touchGenerated,
          other = _objectWithoutProperties(_props, ['aborted', 'color', 'opacity', 'style', 'touchGenerated']);

      var prepareStyles = this.context.muiTheme.prepareStyles;


      var mergedStyles = (0, _simpleAssign2.default)({
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        borderRadius: '50%',
        backgroundColor: color
      }, style);

      return _react2.default.createElement('div', _extends({}, other, { style: prepareStyles(mergedStyles) }));
    }
  }]);

  return CircleRipple;
}(_react.Component);

CircleRipple.propTypes = {
  aborted: _propTypes2.default.bool,
  color: _propTypes2.default.string,
  opacity: _propTypes2.default.number,
  style: _propTypes2.default.object,
  touchGenerated: _propTypes2.default.bool
};
CircleRipple.defaultProps = {
  opacity: 0.1,
  aborted: false
};
CircleRipple.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
exports.default = CircleRipple;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbnRlcm5hbC9DaXJjbGVSaXBwbGUuanMiXSwibmFtZXMiOlsiQ2lyY2xlUmlwcGxlIiwibmV4dFByb3BzIiwicHJvcHMiLCJjbGVhclRpbWVvdXQiLCJlbnRlclRpbWVyIiwibGVhdmVUaW1lciIsImNhbGxiYWNrIiwiaW5pdGlhbGl6ZUFuaW1hdGlvbiIsImFuaW1hdGUiLCJzdHlsZSIsIlJlYWN0RE9NIiwiZmluZERPTU5vZGUiLCJvcGFjaXR5IiwicmVtb3ZlQWZ0ZXIiLCJhYm9ydGVkIiwic2V0VGltZW91dCIsInRyYW5zaXRpb25WYWx1ZSIsInRyYW5zaXRpb25zIiwiZWFzZU91dCIsImF1dG9QcmVmaXgiLCJzZXQiLCJjb2xvciIsInRvdWNoR2VuZXJhdGVkIiwib3RoZXIiLCJwcmVwYXJlU3R5bGVzIiwiY29udGV4dCIsIm11aVRoZW1lIiwibWVyZ2VkU3R5bGVzIiwicG9zaXRpb24iLCJ0b3AiLCJsZWZ0IiwiaGVpZ2h0Iiwid2lkdGgiLCJib3JkZXJSYWRpdXMiLCJiYWNrZ3JvdW5kQ29sb3IiLCJDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJib29sIiwic3RyaW5nIiwibnVtYmVyIiwib2JqZWN0IiwiZGVmYXVsdFByb3BzIiwiY29udGV4dFR5cGVzIiwiaXNSZXF1aXJlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRU1BLFk7Ozs7Ozs7Ozs7OzBDQWtCa0JDLFMsRUFBVztBQUMvQixhQUFPLENBQUMsNEJBQWEsS0FBS0MsS0FBbEIsRUFBeUJELFNBQXpCLENBQVI7QUFDRDs7OzJDQUVzQjtBQUNyQkUsbUJBQWEsS0FBS0MsVUFBbEI7QUFDQUQsbUJBQWEsS0FBS0UsVUFBbEI7QUFDRDs7O3dDQUVtQkMsUSxFQUFVO0FBQzVCLFdBQUtDLG1CQUFMLENBQXlCRCxRQUF6QjtBQUNEOzs7dUNBRWtCQSxRLEVBQVU7QUFDM0IsV0FBS0MsbUJBQUwsQ0FBeUJELFFBQXpCO0FBQ0Q7Ozt5Q0FFb0I7QUFDbkIsV0FBS0UsT0FBTDtBQUNEOzs7d0NBRW1CO0FBQ2xCLFdBQUtBLE9BQUw7QUFDRDs7O3VDQUVrQkYsUSxFQUFVO0FBQzNCLFVBQU1HLFFBQVFDLG1CQUFTQyxXQUFULENBQXFCLElBQXJCLEVBQTJCRixLQUF6QztBQUNBQSxZQUFNRyxPQUFOLEdBQWdCLENBQWhCO0FBQ0E7QUFDQSxVQUFNQyxjQUFjLEtBQUtYLEtBQUwsQ0FBV1ksT0FBWCxHQUFxQixDQUFyQixHQUF5QixJQUE3QztBQUNBLFdBQUtWLFVBQUwsR0FBa0JXLFdBQVdULFFBQVgsRUFBcUJPLFdBQXJCLENBQWxCO0FBQ0Q7Ozs4QkFFUztBQUNSLFVBQU1KLFFBQVFDLG1CQUFTQyxXQUFULENBQXFCLElBQXJCLEVBQTJCRixLQUF6QztBQUNBLFVBQU1PLGtCQUFxQkMsc0JBQVlDLE9BQVosQ0FBb0IsSUFBcEIsRUFBMEIsU0FBMUIsQ0FBckIsVUFDSkQsc0JBQVlDLE9BQVosQ0FBb0IsSUFBcEIsRUFBMEIsV0FBMUIsQ0FERjtBQUVBQywyQkFBV0MsR0FBWCxDQUFlWCxLQUFmLEVBQXNCLFlBQXRCLEVBQW9DTyxlQUFwQztBQUNBRywyQkFBV0MsR0FBWCxDQUFlWCxLQUFmLEVBQXNCLFdBQXRCLEVBQW1DLFVBQW5DO0FBQ0Q7Ozt3Q0FFbUJILFEsRUFBVTtBQUM1QixVQUFNRyxRQUFRQyxtQkFBU0MsV0FBVCxDQUFxQixJQUFyQixFQUEyQkYsS0FBekM7QUFDQUEsWUFBTUcsT0FBTixHQUFnQixLQUFLVixLQUFMLENBQVdVLE9BQTNCO0FBQ0FPLDJCQUFXQyxHQUFYLENBQWVYLEtBQWYsRUFBc0IsV0FBdEIsRUFBbUMsVUFBbkM7QUFDQSxXQUFLSixVQUFMLEdBQWtCVSxXQUFXVCxRQUFYLEVBQXFCLENBQXJCLENBQWxCO0FBQ0Q7Ozs2QkFFUTtBQUFBLG1CQVFILEtBQUtKLEtBUkY7QUFBQSxVQUVMWSxPQUZLLFVBRUxBLE9BRks7QUFBQSxVQUdMTyxLQUhLLFVBR0xBLEtBSEs7QUFBQSxVQUlMVCxPQUpLLFVBSUxBLE9BSks7QUFBQSxVQUtMSCxLQUxLLFVBS0xBLEtBTEs7QUFBQSxVQU1MYSxjQU5LLFVBTUxBLGNBTks7QUFBQSxVQU9GQyxLQVBFOztBQUFBLFVBVUFDLGFBVkEsR0FVaUIsS0FBS0MsT0FBTCxDQUFhQyxRQVY5QixDQVVBRixhQVZBOzs7QUFZUCxVQUFNRyxlQUFlLDRCQUFjO0FBQ2pDQyxrQkFBVSxVQUR1QjtBQUVqQ0MsYUFBSyxDQUY0QjtBQUdqQ0MsY0FBTSxDQUgyQjtBQUlqQ0MsZ0JBQVEsTUFKeUI7QUFLakNDLGVBQU8sTUFMMEI7QUFNakNDLHNCQUFjLEtBTm1CO0FBT2pDQyx5QkFBaUJiO0FBUGdCLE9BQWQsRUFRbEJaLEtBUmtCLENBQXJCOztBQVVBLGFBQ0Usa0RBQVNjLEtBQVQsSUFBZ0IsT0FBT0MsY0FBY0csWUFBZCxDQUF2QixJQURGO0FBR0Q7Ozs7RUEzRndCUSxnQjs7QUFBckJuQyxZLENBQ0dvQyxTLEdBQVk7QUFDakJ0QixXQUFTdUIsb0JBQVVDLElBREY7QUFFakJqQixTQUFPZ0Isb0JBQVVFLE1BRkE7QUFHakIzQixXQUFTeUIsb0JBQVVHLE1BSEY7QUFJakIvQixTQUFPNEIsb0JBQVVJLE1BSkE7QUFLakJuQixrQkFBZ0JlLG9CQUFVQztBQUxULEM7QUFEZnRDLFksQ0FTRzBDLFksR0FBZTtBQUNwQjlCLFdBQVMsR0FEVztBQUVwQkUsV0FBUztBQUZXLEM7QUFUbEJkLFksQ0FjRzJDLFksR0FBZTtBQUNwQmpCLFlBQVVXLG9CQUFVSSxNQUFWLENBQWlCRztBQURQLEM7a0JBZ0ZUNUMsWSIsImZpbGUiOiJDaXJjbGVSaXBwbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBzaGFsbG93RXF1YWwgZnJvbSAncmVjb21wb3NlL3NoYWxsb3dFcXVhbCc7XG5pbXBvcnQgYXV0b1ByZWZpeCBmcm9tICcuLi91dGlscy9hdXRvUHJlZml4JztcbmltcG9ydCB0cmFuc2l0aW9ucyBmcm9tICcuLi9zdHlsZXMvdHJhbnNpdGlvbnMnO1xuXG5jbGFzcyBDaXJjbGVSaXBwbGUgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGFib3J0ZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGNvbG9yOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9wYWNpdHk6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgc3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgdG91Y2hHZW5lcmF0ZWQ6IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgb3BhY2l0eTogMC4xLFxuICAgIGFib3J0ZWQ6IGZhbHNlLFxuICB9O1xuXG4gIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgbXVpVGhlbWU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgfTtcblxuICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzKSB7XG4gICAgcmV0dXJuICFzaGFsbG93RXF1YWwodGhpcy5wcm9wcywgbmV4dFByb3BzKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmVudGVyVGltZXIpO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmxlYXZlVGltZXIpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbEFwcGVhcihjYWxsYmFjaykge1xuICAgIHRoaXMuaW5pdGlhbGl6ZUFuaW1hdGlvbihjYWxsYmFjayk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsRW50ZXIoY2FsbGJhY2spIHtcbiAgICB0aGlzLmluaXRpYWxpemVBbmltYXRpb24oY2FsbGJhY2spO1xuICB9XG5cbiAgY29tcG9uZW50RGlkQXBwZWFyKCkge1xuICAgIHRoaXMuYW5pbWF0ZSgpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkRW50ZXIoKSB7XG4gICAgdGhpcy5hbmltYXRlKCk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsTGVhdmUoY2FsbGJhY2spIHtcbiAgICBjb25zdCBzdHlsZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpLnN0eWxlO1xuICAgIHN0eWxlLm9wYWNpdHkgPSAwO1xuICAgIC8vIElmIHRoZSBhbmltYXRpb24gaXMgYWJvcnRlZCwgcmVtb3ZlIGZyb20gdGhlIERPTSBpbW1lZGlhdGVseVxuICAgIGNvbnN0IHJlbW92ZUFmdGVyID0gdGhpcy5wcm9wcy5hYm9ydGVkID8gMCA6IDIwMDA7XG4gICAgdGhpcy5lbnRlclRpbWVyID0gc2V0VGltZW91dChjYWxsYmFjaywgcmVtb3ZlQWZ0ZXIpO1xuICB9XG5cbiAgYW5pbWF0ZSgpIHtcbiAgICBjb25zdCBzdHlsZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpLnN0eWxlO1xuICAgIGNvbnN0IHRyYW5zaXRpb25WYWx1ZSA9IGAke3RyYW5zaXRpb25zLmVhc2VPdXQoJzJzJywgJ29wYWNpdHknKX0sICR7XG4gICAgICB0cmFuc2l0aW9ucy5lYXNlT3V0KCcxcycsICd0cmFuc2Zvcm0nKX1gO1xuICAgIGF1dG9QcmVmaXguc2V0KHN0eWxlLCAndHJhbnNpdGlvbicsIHRyYW5zaXRpb25WYWx1ZSk7XG4gICAgYXV0b1ByZWZpeC5zZXQoc3R5bGUsICd0cmFuc2Zvcm0nLCAnc2NhbGUoMSknKTtcbiAgfVxuXG4gIGluaXRpYWxpemVBbmltYXRpb24oY2FsbGJhY2spIHtcbiAgICBjb25zdCBzdHlsZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpLnN0eWxlO1xuICAgIHN0eWxlLm9wYWNpdHkgPSB0aGlzLnByb3BzLm9wYWNpdHk7XG4gICAgYXV0b1ByZWZpeC5zZXQoc3R5bGUsICd0cmFuc2Zvcm0nLCAnc2NhbGUoMCknKTtcbiAgICB0aGlzLmxlYXZlVGltZXIgPSBzZXRUaW1lb3V0KGNhbGxiYWNrLCAwKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBhYm9ydGVkLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICBjb2xvcixcbiAgICAgIG9wYWNpdHksIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIHN0eWxlLFxuICAgICAgdG91Y2hHZW5lcmF0ZWQsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIC4uLm90aGVyXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCB7cHJlcGFyZVN0eWxlc30gPSB0aGlzLmNvbnRleHQubXVpVGhlbWU7XG5cbiAgICBjb25zdCBtZXJnZWRTdHlsZXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgdG9wOiAwLFxuICAgICAgbGVmdDogMCxcbiAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgIGJvcmRlclJhZGl1czogJzUwJScsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yLFxuICAgIH0sIHN0eWxlKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHsuLi5vdGhlcn0gc3R5bGU9e3ByZXBhcmVTdHlsZXMobWVyZ2VkU3R5bGVzKX0gLz5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENpcmNsZVJpcHBsZTtcbiJdfQ==