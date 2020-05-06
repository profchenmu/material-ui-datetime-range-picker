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

var _autoPrefix = require('../utils/autoPrefix');

var _autoPrefix2 = _interopRequireDefault(_autoPrefix);

var _transitions = require('../styles/transitions');

var _transitions2 = _interopRequireDefault(_transitions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScaleInChild = function (_Component) {
  _inherits(ScaleInChild, _Component);

  function ScaleInChild() {
    _classCallCheck(this, ScaleInChild);

    return _possibleConstructorReturn(this, (ScaleInChild.__proto__ || Object.getPrototypeOf(ScaleInChild)).apply(this, arguments));
  }

  _createClass(ScaleInChild, [{
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

      style.opacity = '0';
      _autoPrefix2.default.set(style, 'transform', 'scale(' + this.props.minScale + ')');

      this.leaveTimer = setTimeout(callback, 450);
    }
  }, {
    key: 'animate',
    value: function animate() {
      var style = _reactDom2.default.findDOMNode(this).style;

      style.opacity = '1';
      _autoPrefix2.default.set(style, 'transform', 'scale(' + this.props.maxScale + ')');
    }
  }, {
    key: 'initializeAnimation',
    value: function initializeAnimation(callback) {
      var style = _reactDom2.default.findDOMNode(this).style;

      style.opacity = '0';
      _autoPrefix2.default.set(style, 'transform', 'scale(0)');

      this.enterTimer = setTimeout(callback, this.props.enterDelay);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          enterDelay = _props.enterDelay,
          maxScale = _props.maxScale,
          minScale = _props.minScale,
          style = _props.style,
          other = _objectWithoutProperties(_props, ['children', 'enterDelay', 'maxScale', 'minScale', 'style']);

      var prepareStyles = this.context.muiTheme.prepareStyles;


      var mergedRootStyles = (0, _simpleAssign2.default)({}, {
        position: 'absolute',
        height: '100%',
        width: '100%',
        top: 0,
        left: 0,
        transition: _transitions2.default.easeOut(null, ['transform', 'opacity'])
      }, style);

      return _react2.default.createElement(
        'div',
        _extends({}, other, { style: prepareStyles(mergedRootStyles) }),
        children
      );
    }
  }]);

  return ScaleInChild;
}(_react.Component);

ScaleInChild.propTypes = {
  children: _propTypes2.default.node,
  enterDelay: _propTypes2.default.number,
  maxScale: _propTypes2.default.number,
  minScale: _propTypes2.default.number,
  style: _propTypes2.default.object
};
ScaleInChild.defaultProps = {
  enterDelay: 0,
  maxScale: 1,
  minScale: 0
};
ScaleInChild.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
exports.default = ScaleInChild;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbnRlcm5hbC9TY2FsZUluQ2hpbGQuanMiXSwibmFtZXMiOlsiU2NhbGVJbkNoaWxkIiwiY2xlYXJUaW1lb3V0IiwiZW50ZXJUaW1lciIsImxlYXZlVGltZXIiLCJjYWxsYmFjayIsImluaXRpYWxpemVBbmltYXRpb24iLCJhbmltYXRlIiwic3R5bGUiLCJSZWFjdERPTSIsImZpbmRET01Ob2RlIiwib3BhY2l0eSIsImF1dG9QcmVmaXgiLCJzZXQiLCJwcm9wcyIsIm1pblNjYWxlIiwic2V0VGltZW91dCIsIm1heFNjYWxlIiwiZW50ZXJEZWxheSIsImNoaWxkcmVuIiwib3RoZXIiLCJwcmVwYXJlU3R5bGVzIiwiY29udGV4dCIsIm11aVRoZW1lIiwibWVyZ2VkUm9vdFN0eWxlcyIsInBvc2l0aW9uIiwiaGVpZ2h0Iiwid2lkdGgiLCJ0b3AiLCJsZWZ0IiwidHJhbnNpdGlvbiIsInRyYW5zaXRpb25zIiwiZWFzZU91dCIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsIm5vZGUiLCJudW1iZXIiLCJvYmplY3QiLCJkZWZhdWx0UHJvcHMiLCJjb250ZXh0VHlwZXMiLCJpc1JlcXVpcmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRU1BLFk7Ozs7Ozs7Ozs7OzJDQW1CbUI7QUFDckJDLG1CQUFhLEtBQUtDLFVBQWxCO0FBQ0FELG1CQUFhLEtBQUtFLFVBQWxCO0FBQ0Q7Ozt3Q0FFbUJDLFEsRUFBVTtBQUM1QixXQUFLQyxtQkFBTCxDQUF5QkQsUUFBekI7QUFDRDs7O3VDQUVrQkEsUSxFQUFVO0FBQzNCLFdBQUtDLG1CQUFMLENBQXlCRCxRQUF6QjtBQUNEOzs7eUNBRW9CO0FBQ25CLFdBQUtFLE9BQUw7QUFDRDs7O3dDQUVtQjtBQUNsQixXQUFLQSxPQUFMO0FBQ0Q7Ozt1Q0FFa0JGLFEsRUFBVTtBQUMzQixVQUFNRyxRQUFRQyxtQkFBU0MsV0FBVCxDQUFxQixJQUFyQixFQUEyQkYsS0FBekM7O0FBRUFBLFlBQU1HLE9BQU4sR0FBZ0IsR0FBaEI7QUFDQUMsMkJBQVdDLEdBQVgsQ0FBZUwsS0FBZixFQUFzQixXQUF0QixhQUE0QyxLQUFLTSxLQUFMLENBQVdDLFFBQXZEOztBQUVBLFdBQUtYLFVBQUwsR0FBa0JZLFdBQVdYLFFBQVgsRUFBcUIsR0FBckIsQ0FBbEI7QUFDRDs7OzhCQUVTO0FBQ1IsVUFBTUcsUUFBUUMsbUJBQVNDLFdBQVQsQ0FBcUIsSUFBckIsRUFBMkJGLEtBQXpDOztBQUVBQSxZQUFNRyxPQUFOLEdBQWdCLEdBQWhCO0FBQ0FDLDJCQUFXQyxHQUFYLENBQWVMLEtBQWYsRUFBc0IsV0FBdEIsYUFBNEMsS0FBS00sS0FBTCxDQUFXRyxRQUF2RDtBQUNEOzs7d0NBRW1CWixRLEVBQVU7QUFDNUIsVUFBTUcsUUFBUUMsbUJBQVNDLFdBQVQsQ0FBcUIsSUFBckIsRUFBMkJGLEtBQXpDOztBQUVBQSxZQUFNRyxPQUFOLEdBQWdCLEdBQWhCO0FBQ0FDLDJCQUFXQyxHQUFYLENBQWVMLEtBQWYsRUFBc0IsV0FBdEIsRUFBbUMsVUFBbkM7O0FBRUEsV0FBS0wsVUFBTCxHQUFrQmEsV0FBV1gsUUFBWCxFQUFxQixLQUFLUyxLQUFMLENBQVdJLFVBQWhDLENBQWxCO0FBQ0Q7Ozs2QkFFUTtBQUFBLG1CQVFILEtBQUtKLEtBUkY7QUFBQSxVQUVMSyxRQUZLLFVBRUxBLFFBRks7QUFBQSxVQUdMRCxVQUhLLFVBR0xBLFVBSEs7QUFBQSxVQUlMRCxRQUpLLFVBSUxBLFFBSks7QUFBQSxVQUtMRixRQUxLLFVBS0xBLFFBTEs7QUFBQSxVQU1MUCxLQU5LLFVBTUxBLEtBTks7QUFBQSxVQU9GWSxLQVBFOztBQUFBLFVBVUFDLGFBVkEsR0FVaUIsS0FBS0MsT0FBTCxDQUFhQyxRQVY5QixDQVVBRixhQVZBOzs7QUFZUCxVQUFNRyxtQkFBbUIsNEJBQWMsRUFBZCxFQUFrQjtBQUN6Q0Msa0JBQVUsVUFEK0I7QUFFekNDLGdCQUFRLE1BRmlDO0FBR3pDQyxlQUFPLE1BSGtDO0FBSXpDQyxhQUFLLENBSm9DO0FBS3pDQyxjQUFNLENBTG1DO0FBTXpDQyxvQkFBWUMsc0JBQVlDLE9BQVosQ0FBb0IsSUFBcEIsRUFBMEIsQ0FBQyxXQUFELEVBQWMsU0FBZCxDQUExQjtBQU42QixPQUFsQixFQU90QnhCLEtBUHNCLENBQXpCOztBQVNBLGFBQ0U7QUFBQTtBQUFBLHFCQUFTWSxLQUFULElBQWdCLE9BQU9DLGNBQWNHLGdCQUFkLENBQXZCO0FBQ0dMO0FBREgsT0FERjtBQUtEOzs7O0VBM0Z3QmMsZ0I7O0FBQXJCaEMsWSxDQUNHaUMsUyxHQUFZO0FBQ2pCZixZQUFVZ0Isb0JBQVVDLElBREg7QUFFakJsQixjQUFZaUIsb0JBQVVFLE1BRkw7QUFHakJwQixZQUFVa0Isb0JBQVVFLE1BSEg7QUFJakJ0QixZQUFVb0Isb0JBQVVFLE1BSkg7QUFLakI3QixTQUFPMkIsb0JBQVVHO0FBTEEsQztBQURmckMsWSxDQVNHc0MsWSxHQUFlO0FBQ3BCckIsY0FBWSxDQURRO0FBRXBCRCxZQUFVLENBRlU7QUFHcEJGLFlBQVU7QUFIVSxDO0FBVGxCZCxZLENBZUd1QyxZLEdBQWU7QUFDcEJqQixZQUFVWSxvQkFBVUcsTUFBVixDQUFpQkc7QUFEUCxDO2tCQStFVHhDLFkiLCJmaWxlIjoiU2NhbGVJbkNoaWxkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgYXV0b1ByZWZpeCBmcm9tICcuLi91dGlscy9hdXRvUHJlZml4JztcbmltcG9ydCB0cmFuc2l0aW9ucyBmcm9tICcuLi9zdHlsZXMvdHJhbnNpdGlvbnMnO1xuXG5jbGFzcyBTY2FsZUluQ2hpbGQgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcbiAgICBlbnRlckRlbGF5OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG1heFNjYWxlOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG1pblNjYWxlOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgZW50ZXJEZWxheTogMCxcbiAgICBtYXhTY2FsZTogMSxcbiAgICBtaW5TY2FsZTogMCxcbiAgfTtcblxuICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgIG11aVRoZW1lOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIH07XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuZW50ZXJUaW1lcik7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMubGVhdmVUaW1lcik7XG4gIH1cblxuICBjb21wb25lbnRXaWxsQXBwZWFyKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5pbml0aWFsaXplQW5pbWF0aW9uKGNhbGxiYWNrKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxFbnRlcihjYWxsYmFjaykge1xuICAgIHRoaXMuaW5pdGlhbGl6ZUFuaW1hdGlvbihjYWxsYmFjayk7XG4gIH1cblxuICBjb21wb25lbnREaWRBcHBlYXIoKSB7XG4gICAgdGhpcy5hbmltYXRlKCk7XG4gIH1cblxuICBjb21wb25lbnREaWRFbnRlcigpIHtcbiAgICB0aGlzLmFuaW1hdGUoKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxMZWF2ZShjYWxsYmFjaykge1xuICAgIGNvbnN0IHN0eWxlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcykuc3R5bGU7XG5cbiAgICBzdHlsZS5vcGFjaXR5ID0gJzAnO1xuICAgIGF1dG9QcmVmaXguc2V0KHN0eWxlLCAndHJhbnNmb3JtJywgYHNjYWxlKCR7dGhpcy5wcm9wcy5taW5TY2FsZX0pYCk7XG5cbiAgICB0aGlzLmxlYXZlVGltZXIgPSBzZXRUaW1lb3V0KGNhbGxiYWNrLCA0NTApO1xuICB9XG5cbiAgYW5pbWF0ZSgpIHtcbiAgICBjb25zdCBzdHlsZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpLnN0eWxlO1xuXG4gICAgc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICBhdXRvUHJlZml4LnNldChzdHlsZSwgJ3RyYW5zZm9ybScsIGBzY2FsZSgke3RoaXMucHJvcHMubWF4U2NhbGV9KWApO1xuICB9XG5cbiAgaW5pdGlhbGl6ZUFuaW1hdGlvbihjYWxsYmFjaykge1xuICAgIGNvbnN0IHN0eWxlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcykuc3R5bGU7XG5cbiAgICBzdHlsZS5vcGFjaXR5ID0gJzAnO1xuICAgIGF1dG9QcmVmaXguc2V0KHN0eWxlLCAndHJhbnNmb3JtJywgJ3NjYWxlKDApJyk7XG5cbiAgICB0aGlzLmVudGVyVGltZXIgPSBzZXRUaW1lb3V0KGNhbGxiYWNrLCB0aGlzLnByb3BzLmVudGVyRGVsYXkpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgZW50ZXJEZWxheSwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgbWF4U2NhbGUsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIG1pblNjYWxlLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICBzdHlsZSxcbiAgICAgIC4uLm90aGVyXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCB7cHJlcGFyZVN0eWxlc30gPSB0aGlzLmNvbnRleHQubXVpVGhlbWU7XG5cbiAgICBjb25zdCBtZXJnZWRSb290U3R5bGVzID0gT2JqZWN0LmFzc2lnbih7fSwge1xuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICB0b3A6IDAsXG4gICAgICBsZWZ0OiAwLFxuICAgICAgdHJhbnNpdGlvbjogdHJhbnNpdGlvbnMuZWFzZU91dChudWxsLCBbJ3RyYW5zZm9ybScsICdvcGFjaXR5J10pLFxuICAgIH0sIHN0eWxlKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHsuLi5vdGhlcn0gc3R5bGU9e3ByZXBhcmVTdHlsZXMobWVyZ2VkUm9vdFN0eWxlcyl9PlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNjYWxlSW5DaGlsZDtcbiJdfQ==