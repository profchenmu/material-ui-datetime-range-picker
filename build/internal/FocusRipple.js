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

var _shallowEqual = require('recompose/shallowEqual');

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _autoPrefix = require('../utils/autoPrefix');

var _autoPrefix2 = _interopRequireDefault(_autoPrefix);

var _transitions = require('../styles/transitions');

var _transitions2 = _interopRequireDefault(_transitions);

var _ScaleIn = require('./ScaleIn');

var _ScaleIn2 = _interopRequireDefault(_ScaleIn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var pulsateDuration = 750;

var FocusRipple = function (_Component) {
  _inherits(FocusRipple, _Component);

  function FocusRipple() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FocusRipple);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FocusRipple.__proto__ || Object.getPrototypeOf(FocusRipple)).call.apply(_ref, [this].concat(args))), _this), _this.pulsate = function () {
      var innerCircle = _reactDom2.default.findDOMNode(_this.refs.innerCircle);
      if (!innerCircle) return;

      var startScale = 'scale(1)';
      var endScale = 'scale(0.85)';
      var currentScale = innerCircle.style.transform || startScale;
      var nextScale = currentScale === startScale ? endScale : startScale;

      _autoPrefix2.default.set(innerCircle.style, 'transform', nextScale);
      _this.timeout = setTimeout(_this.pulsate, pulsateDuration);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FocusRipple, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.show) {
        this.setRippleSize();
        this.pulsate();
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _shallowEqual2.default)(this.props, nextProps) || !(0, _shallowEqual2.default)(this.state, nextState);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.show) {
        this.setRippleSize();
        this.pulsate();
      } else {
        if (this.timeout) clearTimeout(this.timeout);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.timeout);
    }
  }, {
    key: 'getRippleElement',
    value: function getRippleElement(props) {
      var color = props.color,
          innerStyle = props.innerStyle,
          opacity = props.opacity;
      var _context$muiTheme = this.context.muiTheme,
          prepareStyles = _context$muiTheme.prepareStyles,
          ripple = _context$muiTheme.ripple;


      var innerStyles = (0, _simpleAssign2.default)({
        position: 'absolute',
        height: '100%',
        width: '100%',
        borderRadius: '50%',
        opacity: opacity ? opacity : 0.16,
        backgroundColor: color || ripple.color,
        transition: _transitions2.default.easeOut(pulsateDuration + 'ms', 'transform', null, _transitions2.default.easeInOutFunction)
      }, innerStyle);

      return _react2.default.createElement('div', { ref: 'innerCircle', style: prepareStyles((0, _simpleAssign2.default)({}, innerStyles)) });
    }
  }, {
    key: 'setRippleSize',
    value: function setRippleSize() {
      var el = _reactDom2.default.findDOMNode(this.refs.innerCircle);
      var height = el.offsetHeight;
      var width = el.offsetWidth;
      var size = Math.max(height, width);

      var oldTop = 0;
      // For browsers that don't support endsWith()
      if (el.style.top.indexOf('px', el.style.top.length - 2) !== -1) {
        oldTop = parseInt(el.style.top);
      }
      el.style.height = size + 'px';
      el.style.top = height / 2 - size / 2 + oldTop + 'px';
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          show = _props.show,
          style = _props.style;


      var mergedRootStyles = (0, _simpleAssign2.default)({
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0
      }, style);

      var ripple = show ? this.getRippleElement(this.props) : null;

      return _react2.default.createElement(
        _ScaleIn2.default,
        {
          maxScale: 0.85,
          style: mergedRootStyles
        },
        ripple
      );
    }
  }]);

  return FocusRipple;
}(_react.Component);

FocusRipple.propTypes = {
  color: _propTypes2.default.string,
  innerStyle: _propTypes2.default.object,
  opacity: _propTypes2.default.number,
  show: _propTypes2.default.bool,
  style: _propTypes2.default.object
};
FocusRipple.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
exports.default = FocusRipple;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbnRlcm5hbC9Gb2N1c1JpcHBsZS5qcyJdLCJuYW1lcyI6WyJwdWxzYXRlRHVyYXRpb24iLCJGb2N1c1JpcHBsZSIsInB1bHNhdGUiLCJpbm5lckNpcmNsZSIsIlJlYWN0RE9NIiwiZmluZERPTU5vZGUiLCJyZWZzIiwic3RhcnRTY2FsZSIsImVuZFNjYWxlIiwiY3VycmVudFNjYWxlIiwic3R5bGUiLCJ0cmFuc2Zvcm0iLCJuZXh0U2NhbGUiLCJhdXRvUHJlZml4Iiwic2V0IiwidGltZW91dCIsInNldFRpbWVvdXQiLCJwcm9wcyIsInNob3ciLCJzZXRSaXBwbGVTaXplIiwibmV4dFByb3BzIiwibmV4dFN0YXRlIiwic3RhdGUiLCJjbGVhclRpbWVvdXQiLCJjb2xvciIsImlubmVyU3R5bGUiLCJvcGFjaXR5IiwiY29udGV4dCIsIm11aVRoZW1lIiwicHJlcGFyZVN0eWxlcyIsInJpcHBsZSIsImlubmVyU3R5bGVzIiwicG9zaXRpb24iLCJoZWlnaHQiLCJ3aWR0aCIsImJvcmRlclJhZGl1cyIsImJhY2tncm91bmRDb2xvciIsInRyYW5zaXRpb24iLCJ0cmFuc2l0aW9ucyIsImVhc2VPdXQiLCJlYXNlSW5PdXRGdW5jdGlvbiIsImVsIiwib2Zmc2V0SGVpZ2h0Iiwib2Zmc2V0V2lkdGgiLCJzaXplIiwiTWF0aCIsIm1heCIsIm9sZFRvcCIsInRvcCIsImluZGV4T2YiLCJsZW5ndGgiLCJwYXJzZUludCIsIm1lcmdlZFJvb3RTdHlsZXMiLCJsZWZ0IiwiZ2V0UmlwcGxlRWxlbWVudCIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsInN0cmluZyIsIm9iamVjdCIsIm51bWJlciIsImJvb2wiLCJjb250ZXh0VHlwZXMiLCJpc1JlcXVpcmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEs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b20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBzaGFsbG93RXF1YWwgZnJvbSAncmVjb21wb3NlL3NoYWxsb3dFcXVhbCc7XG5pbXBvcnQgYXV0b1ByZWZpeCBmcm9tICcuLi91dGlscy9hdXRvUHJlZml4JztcbmltcG9ydCB0cmFuc2l0aW9ucyBmcm9tICcuLi9zdHlsZXMvdHJhbnNpdGlvbnMnO1xuaW1wb3J0IFNjYWxlSW4gZnJvbSAnLi9TY2FsZUluJztcblxuY29uc3QgcHVsc2F0ZUR1cmF0aW9uID0gNzUwO1xuXG5jbGFzcyBGb2N1c1JpcHBsZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgY29sb3I6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaW5uZXJTdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBvcGFjaXR5OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHNob3c6IFByb3BUeXBlcy5ib29sLFxuICAgIHN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICB9O1xuXG4gIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgbXVpVGhlbWU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgfTtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG93KSB7XG4gICAgICB0aGlzLnNldFJpcHBsZVNpemUoKTtcbiAgICAgIHRoaXMucHVsc2F0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgIHJldHVybiAoXG4gICAgICAhc2hhbGxvd0VxdWFsKHRoaXMucHJvcHMsIG5leHRQcm9wcykgfHxcbiAgICAgICFzaGFsbG93RXF1YWwodGhpcy5zdGF0ZSwgbmV4dFN0YXRlKVxuICAgICk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvdykge1xuICAgICAgdGhpcy5zZXRSaXBwbGVTaXplKCk7XG4gICAgICB0aGlzLnB1bHNhdGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMudGltZW91dCkgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gIH1cblxuICBnZXRSaXBwbGVFbGVtZW50KHByb3BzKSB7XG4gICAgY29uc3Qge1xuICAgICAgY29sb3IsXG4gICAgICBpbm5lclN0eWxlLFxuICAgICAgb3BhY2l0eSxcbiAgICB9ID0gcHJvcHM7XG5cbiAgICBjb25zdCB7cHJlcGFyZVN0eWxlcywgcmlwcGxlfSA9IHRoaXMuY29udGV4dC5tdWlUaGVtZTtcblxuICAgIGNvbnN0IGlubmVyU3R5bGVzID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgIGJvcmRlclJhZGl1czogJzUwJScsXG4gICAgICBvcGFjaXR5OiBvcGFjaXR5ID8gb3BhY2l0eSA6IDAuMTYsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yIHx8IHJpcHBsZS5jb2xvcixcbiAgICAgIHRyYW5zaXRpb246IHRyYW5zaXRpb25zLmVhc2VPdXQoYCR7cHVsc2F0ZUR1cmF0aW9ufW1zYCwgJ3RyYW5zZm9ybScsIG51bGwsIHRyYW5zaXRpb25zLmVhc2VJbk91dEZ1bmN0aW9uKSxcbiAgICB9LCBpbm5lclN0eWxlKTtcblxuICAgIHJldHVybiA8ZGl2IHJlZj1cImlubmVyQ2lyY2xlXCIgc3R5bGU9e3ByZXBhcmVTdHlsZXMoT2JqZWN0LmFzc2lnbih7fSwgaW5uZXJTdHlsZXMpKX0gLz47XG4gIH1cblxuICBwdWxzYXRlID0gKCkgPT4ge1xuICAgIGNvbnN0IGlubmVyQ2lyY2xlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLmlubmVyQ2lyY2xlKTtcbiAgICBpZiAoIWlubmVyQ2lyY2xlKSByZXR1cm47XG5cbiAgICBjb25zdCBzdGFydFNjYWxlID0gJ3NjYWxlKDEpJztcbiAgICBjb25zdCBlbmRTY2FsZSA9ICdzY2FsZSgwLjg1KSc7XG4gICAgY29uc3QgY3VycmVudFNjYWxlID0gaW5uZXJDaXJjbGUuc3R5bGUudHJhbnNmb3JtIHx8IHN0YXJ0U2NhbGU7XG4gICAgY29uc3QgbmV4dFNjYWxlID0gY3VycmVudFNjYWxlID09PSBzdGFydFNjYWxlID8gZW5kU2NhbGUgOiBzdGFydFNjYWxlO1xuXG4gICAgYXV0b1ByZWZpeC5zZXQoaW5uZXJDaXJjbGUuc3R5bGUsICd0cmFuc2Zvcm0nLCBuZXh0U2NhbGUpO1xuICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQodGhpcy5wdWxzYXRlLCBwdWxzYXRlRHVyYXRpb24pO1xuICB9O1xuXG4gIHNldFJpcHBsZVNpemUoKSB7XG4gICAgY29uc3QgZWwgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuaW5uZXJDaXJjbGUpO1xuICAgIGNvbnN0IGhlaWdodCA9IGVsLm9mZnNldEhlaWdodDtcbiAgICBjb25zdCB3aWR0aCA9IGVsLm9mZnNldFdpZHRoO1xuICAgIGNvbnN0IHNpemUgPSBNYXRoLm1heChoZWlnaHQsIHdpZHRoKTtcblxuICAgIGxldCBvbGRUb3AgPSAwO1xuICAgIC8vIEZvciBicm93c2VycyB0aGF0IGRvbid0IHN1cHBvcnQgZW5kc1dpdGgoKVxuICAgIGlmIChlbC5zdHlsZS50b3AuaW5kZXhPZigncHgnLCBlbC5zdHlsZS50b3AubGVuZ3RoIC0gMikgIT09IC0xKSB7XG4gICAgICBvbGRUb3AgPSBwYXJzZUludChlbC5zdHlsZS50b3ApO1xuICAgIH1cbiAgICBlbC5zdHlsZS5oZWlnaHQgPSBgJHtzaXplfXB4YDtcbiAgICBlbC5zdHlsZS50b3AgPSBgJHsoaGVpZ2h0IC8gMikgLSAoc2l6ZSAvIDIgKSArIG9sZFRvcH1weGA7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgc2hvdyxcbiAgICAgIHN0eWxlLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgbWVyZ2VkUm9vdFN0eWxlcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICB0b3A6IDAsXG4gICAgICBsZWZ0OiAwLFxuICAgIH0sIHN0eWxlKTtcblxuICAgIGNvbnN0IHJpcHBsZSA9IHNob3cgPyB0aGlzLmdldFJpcHBsZUVsZW1lbnQodGhpcy5wcm9wcykgOiBudWxsO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxTY2FsZUluXG4gICAgICAgIG1heFNjYWxlPXswLjg1fVxuICAgICAgICBzdHlsZT17bWVyZ2VkUm9vdFN0eWxlc31cbiAgICAgID5cbiAgICAgICAge3JpcHBsZX1cbiAgICAgIDwvU2NhbGVJbj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEZvY3VzUmlwcGxlO1xuIl19