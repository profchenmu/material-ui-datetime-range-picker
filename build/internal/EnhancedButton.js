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

var _events = require('../utils/events');

var _events2 = _interopRequireDefault(_events);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _FocusRipple = require('./FocusRipple');

var _FocusRipple2 = _interopRequireDefault(_FocusRipple);

var _TouchRipple = require('./TouchRipple');

var _TouchRipple2 = _interopRequireDefault(_TouchRipple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styleInjected = false;
var listening = false;
var tabPressed = false;

function injectStyle() {
  if (!styleInjected) {
    // Remove inner padding and border in Firefox 4+.
    var style = document.createElement('style');
    style.innerHTML = '\n      button::-moz-focus-inner,\n      input::-moz-focus-inner {\n        border: 0;\n        padding: 0;\n      }\n    ';

    document.body.appendChild(style);
    styleInjected = true;
  }
}

function listenForTabPresses() {
  if (!listening) {
    _events2.default.on(window, 'keydown', function (event) {
      tabPressed = (0, _keycode2.default)(event) === 'tab';
    });
    listening = true;
  }
}

var EnhancedButton = function (_Component) {
  _inherits(EnhancedButton, _Component);

  function EnhancedButton() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, EnhancedButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EnhancedButton.__proto__ || Object.getPrototypeOf(EnhancedButton)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isKeyboardFocused: false
    }, _this.handleKeyDown = function (event) {
      if (!_this.props.disabled && !_this.props.disableKeyboardFocus) {
        if ((0, _keycode2.default)(event) === 'enter' && _this.state.isKeyboardFocused) {
          _this.handleTouchTap(event);
        }
        if ((0, _keycode2.default)(event) === 'esc' && _this.state.isKeyboardFocused) {
          _this.removeKeyboardFocus(event);
        }
      }
      _this.props.onKeyDown(event);
    }, _this.handleKeyUp = function (event) {
      if (!_this.props.disabled && !_this.props.disableKeyboardFocus) {
        if ((0, _keycode2.default)(event) === 'space' && _this.state.isKeyboardFocused) {
          _this.handleTouchTap(event);
        }
      }
      _this.props.onKeyUp(event);
    }, _this.handleBlur = function (event) {
      _this.cancelFocusTimeout();
      _this.removeKeyboardFocus(event);
      _this.props.onBlur(event);
    }, _this.handleFocus = function (event) {
      if (event) event.persist();
      if (!_this.props.disabled && !_this.props.disableKeyboardFocus) {
        // setTimeout is needed because the focus event fires first
        // Wait so that we can capture if this was a keyboard focus
        // or touch focus
        _this.focusTimeout = setTimeout(function () {
          if (tabPressed) {
            _this.setKeyboardFocus(event);
            tabPressed = false;
          }
        }, 150);

        _this.props.onFocus(event);
      }
    }, _this.handleTouchTap = function (event) {
      _this.cancelFocusTimeout();
      if (!_this.props.disabled) {
        tabPressed = false;
        _this.removeKeyboardFocus(event);
        _this.props.onClick(event);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(EnhancedButton, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          disabled = _props.disabled,
          disableKeyboardFocus = _props.disableKeyboardFocus,
          keyboardFocused = _props.keyboardFocused;

      if (!disabled && keyboardFocused && !disableKeyboardFocus) {
        this.setState({ isKeyboardFocused: true });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      injectStyle();
      listenForTabPresses();
      if (this.state.isKeyboardFocused) {
        this.button.focus();
        this.props.onKeyboardFocus(null, true);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ((nextProps.disabled || nextProps.disableKeyboardFocus) && this.state.isKeyboardFocused) {
        this.setState({ isKeyboardFocused: false });
        if (nextProps.onKeyboardFocus) {
          nextProps.onKeyboardFocus(null, false);
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.focusTimeout) {
        clearTimeout(this.focusTimeout);
      }
    }
  }, {
    key: 'isKeyboardFocused',
    value: function isKeyboardFocused() {
      return this.state.isKeyboardFocused;
    }
  }, {
    key: 'removeKeyboardFocus',
    value: function removeKeyboardFocus(event) {
      if (this.state.isKeyboardFocused) {
        this.setState({ isKeyboardFocused: false });
        this.props.onKeyboardFocus(event, false);
      }
    }
  }, {
    key: 'setKeyboardFocus',
    value: function setKeyboardFocus(event) {
      if (!this.state.isKeyboardFocused) {
        this.setState({ isKeyboardFocused: true });
        this.props.onKeyboardFocus(event, true);
      }
    }
  }, {
    key: 'cancelFocusTimeout',
    value: function cancelFocusTimeout() {
      if (this.focusTimeout) {
        clearTimeout(this.focusTimeout);
        this.focusTimeout = null;
      }
    }
  }, {
    key: 'createButtonChildren',
    value: function createButtonChildren() {
      var _props2 = this.props,
          centerRipple = _props2.centerRipple,
          children = _props2.children,
          disabled = _props2.disabled,
          disableFocusRipple = _props2.disableFocusRipple,
          disableKeyboardFocus = _props2.disableKeyboardFocus,
          disableTouchRipple = _props2.disableTouchRipple,
          focusRippleColor = _props2.focusRippleColor,
          focusRippleOpacity = _props2.focusRippleOpacity,
          touchRippleColor = _props2.touchRippleColor,
          touchRippleOpacity = _props2.touchRippleOpacity;
      var isKeyboardFocused = this.state.isKeyboardFocused;

      // Focus Ripple

      var focusRipple = isKeyboardFocused && !disabled && !disableFocusRipple && !disableKeyboardFocus ? _react2.default.createElement(_FocusRipple2.default, {
        color: focusRippleColor,
        opacity: focusRippleOpacity,
        show: isKeyboardFocused,
        style: {
          overflow: 'hidden'
        },
        key: 'focusRipple'
      }) : undefined;

      // Touch Ripple
      var touchRipple = !disabled && !disableTouchRipple ? _react2.default.createElement(
        _TouchRipple2.default,
        {
          centerRipple: centerRipple,
          color: touchRippleColor,
          opacity: touchRippleOpacity,
          key: 'touchRipple'
        },
        children
      ) : undefined;

      return [focusRipple, touchRipple, touchRipple ? undefined : children];
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props3 = this.props,
          centerRipple = _props3.centerRipple,
          children = _props3.children,
          containerElement = _props3.containerElement,
          disabled = _props3.disabled,
          disableFocusRipple = _props3.disableFocusRipple,
          disableKeyboardFocus = _props3.disableKeyboardFocus,
          disableTouchRipple = _props3.disableTouchRipple,
          focusRippleColor = _props3.focusRippleColor,
          focusRippleOpacity = _props3.focusRippleOpacity,
          href = _props3.href,
          keyboardFocused = _props3.keyboardFocused,
          touchRippleColor = _props3.touchRippleColor,
          touchRippleOpacity = _props3.touchRippleOpacity,
          onBlur = _props3.onBlur,
          onClick = _props3.onClick,
          onFocus = _props3.onFocus,
          onKeyUp = _props3.onKeyUp,
          onKeyDown = _props3.onKeyDown,
          onKeyboardFocus = _props3.onKeyboardFocus,
          style = _props3.style,
          tabIndex = _props3.tabIndex,
          type = _props3.type,
          other = _objectWithoutProperties(_props3, ['centerRipple', 'children', 'containerElement', 'disabled', 'disableFocusRipple', 'disableKeyboardFocus', 'disableTouchRipple', 'focusRippleColor', 'focusRippleOpacity', 'href', 'keyboardFocused', 'touchRippleColor', 'touchRippleOpacity', 'onBlur', 'onClick', 'onFocus', 'onKeyUp', 'onKeyDown', 'onKeyboardFocus', 'style', 'tabIndex', 'type']);

      var _context$muiTheme = this.context.muiTheme,
          prepareStyles = _context$muiTheme.prepareStyles,
          enhancedButton = _context$muiTheme.enhancedButton;


      var mergedStyles = (0, _simpleAssign2.default)({
        border: 10,
        boxSizing: 'border-box',
        display: 'inline-block',
        fontFamily: this.context.muiTheme.baseTheme.fontFamily,
        WebkitTapHighlightColor: enhancedButton.tapHighlightColor, // Remove mobile color flashing (deprecated)
        cursor: disabled ? 'default' : 'pointer',
        textDecoration: 'none',
        margin: 0,
        padding: 0,
        outline: 'none',
        fontSize: 'inherit',
        fontWeight: 'inherit',
        position: 'relative', // This is needed so that ripples do not bleed past border radius.
        verticalAlign: href ? 'middle' : null
      }, style);

      // Passing both background:none & backgroundColor can break due to object iteration order
      if (!mergedStyles.backgroundColor && !mergedStyles.background) {
        mergedStyles.background = 'none';
      }

      if (disabled && href) {
        return _react2.default.createElement(
          'span',
          _extends({}, other, {
            style: mergedStyles
          }),
          children
        );
      }

      var buttonProps = _extends({}, other, {
        style: prepareStyles(mergedStyles),
        ref: function ref(node) {
          return _this2.button = node;
        },
        disabled: disabled,
        onBlur: this.handleBlur,
        onFocus: this.handleFocus,
        onKeyUp: this.handleKeyUp,
        onKeyDown: this.handleKeyDown,
        onClick: this.handleTouchTap,
        tabIndex: disabled || disableKeyboardFocus ? -1 : tabIndex
      });

      if (href) buttonProps.href = href;

      var buttonChildren = this.createButtonChildren();

      if (_react2.default.isValidElement(containerElement)) {
        return _react2.default.cloneElement(containerElement, buttonProps, buttonChildren);
      }

      if (!href && containerElement === 'button') {
        buttonProps.type = type;
      }

      return _react2.default.createElement(href ? 'a' : containerElement, buttonProps, buttonChildren);
    }
  }]);

  return EnhancedButton;
}(_react.Component);

EnhancedButton.propTypes = {
  centerRipple: _propTypes2.default.bool,
  children: _propTypes2.default.node,
  containerElement: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
  disableFocusRipple: _propTypes2.default.bool,
  disableKeyboardFocus: _propTypes2.default.bool,
  disableTouchRipple: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  focusRippleColor: _propTypes2.default.string,
  focusRippleOpacity: _propTypes2.default.number,
  href: _propTypes2.default.string,
  keyboardFocused: _propTypes2.default.bool,
  onBlur: _propTypes2.default.func,
  onClick: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  onKeyDown: _propTypes2.default.func,
  onKeyUp: _propTypes2.default.func,
  onKeyboardFocus: _propTypes2.default.func,
  style: _propTypes2.default.object,
  tabIndex: _propTypes2.default.number,
  touchRippleColor: _propTypes2.default.string,
  touchRippleOpacity: _propTypes2.default.number,
  type: _propTypes2.default.string
};
EnhancedButton.defaultProps = {
  containerElement: 'button',
  onBlur: function onBlur() {},
  onClick: function onClick() {},
  onFocus: function onFocus() {},
  onKeyDown: function onKeyDown() {},
  onKeyUp: function onKeyUp() {},
  onKeyboardFocus: function onKeyboardFocus() {},
  tabIndex: 0,
  type: 'button'
};
EnhancedButton.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
exports.default = EnhancedButton;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbnRlcm5hbC9FbmhhbmNlZEJ1dHRvbi5qcyJdLCJuYW1lcyI6WyJzdHlsZUluamVjdGVkIiwibGlzdGVuaW5nIiwidGFiUHJlc3NlZCIsImluamVjdFN0eWxlIiwic3R5bGUiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJsaXN0ZW5Gb3JUYWJQcmVzc2VzIiwiRXZlbnRzIiwib24iLCJ3aW5kb3ciLCJldmVudCIsIkVuaGFuY2VkQnV0dG9uIiwic3RhdGUiLCJpc0tleWJvYXJkRm9jdXNlZCIsImhhbmRsZUtleURvd24iLCJwcm9wcyIsImRpc2FibGVkIiwiZGlzYWJsZUtleWJvYXJkRm9jdXMiLCJoYW5kbGVUb3VjaFRhcCIsInJlbW92ZUtleWJvYXJkRm9jdXMiLCJvbktleURvd24iLCJoYW5kbGVLZXlVcCIsIm9uS2V5VXAiLCJoYW5kbGVCbHVyIiwiY2FuY2VsRm9jdXNUaW1lb3V0Iiwib25CbHVyIiwiaGFuZGxlRm9jdXMiLCJwZXJzaXN0IiwiZm9jdXNUaW1lb3V0Iiwic2V0VGltZW91dCIsInNldEtleWJvYXJkRm9jdXMiLCJvbkZvY3VzIiwib25DbGljayIsImtleWJvYXJkRm9jdXNlZCIsInNldFN0YXRlIiwiYnV0dG9uIiwiZm9jdXMiLCJvbktleWJvYXJkRm9jdXMiLCJuZXh0UHJvcHMiLCJjbGVhclRpbWVvdXQiLCJjZW50ZXJSaXBwbGUiLCJjaGlsZHJlbiIsImRpc2FibGVGb2N1c1JpcHBsZSIsImRpc2FibGVUb3VjaFJpcHBsZSIsImZvY3VzUmlwcGxlQ29sb3IiLCJmb2N1c1JpcHBsZU9wYWNpdHkiLCJ0b3VjaFJpcHBsZUNvbG9yIiwidG91Y2hSaXBwbGVPcGFjaXR5IiwiZm9jdXNSaXBwbGUiLCJvdmVyZmxvdyIsInVuZGVmaW5lZCIsInRvdWNoUmlwcGxlIiwiY29udGFpbmVyRWxlbWVudCIsImhyZWYiLCJ0YWJJbmRleCIsInR5cGUiLCJvdGhlciIsImNvbnRleHQiLCJtdWlUaGVtZSIsInByZXBhcmVTdHlsZXMiLCJlbmhhbmNlZEJ1dHRvbiIsIm1lcmdlZFN0eWxlcyIsImJvcmRlciIsImJveFNpemluZyIsImRpc3BsYXkiLCJmb250RmFtaWx5IiwiYmFzZVRoZW1lIiwiV2Via2l0VGFwSGlnaGxpZ2h0Q29sb3IiLCJ0YXBIaWdobGlnaHRDb2xvciIsImN1cnNvciIsInRleHREZWNvcmF0aW9uIiwibWFyZ2luIiwicGFkZGluZyIsIm91dGxpbmUiLCJmb250U2l6ZSIsImZvbnRXZWlnaHQiLCJwb3NpdGlvbiIsInZlcnRpY2FsQWxpZ24iLCJiYWNrZ3JvdW5kQ29sb3IiLCJiYWNrZ3JvdW5kIiwiYnV0dG9uUHJvcHMiLCJyZWYiLCJub2RlIiwiYnV0dG9uQ2hpbGRyZW4iLCJjcmVhdGVCdXR0b25DaGlsZHJlbiIsIlJlYWN0IiwiaXNWYWxpZEVsZW1lbnQiLCJjbG9uZUVsZW1lbnQiLCJDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJib29sIiwib25lT2ZUeXBlIiwic3RyaW5nIiwiZWxlbWVudCIsIm51bWJlciIsImZ1bmMiLCJvYmplY3QiLCJkZWZhdWx0UHJvcHMiLCJjb250ZXh0VHlwZXMiLCJpc1JlcXVpcmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxnQkFBZ0IsS0FBcEI7QUFDQSxJQUFJQyxZQUFZLEtBQWhCO0FBQ0EsSUFBSUMsYUFBYSxLQUFqQjs7QUFFQSxTQUFTQyxXQUFULEdBQXVCO0FBQ3JCLE1BQUksQ0FBQ0gsYUFBTCxFQUFvQjtBQUNsQjtBQUNBLFFBQU1JLFFBQVFDLFNBQVNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBZDtBQUNBRixVQUFNRyxTQUFOOztBQVFBRixhQUFTRyxJQUFULENBQWNDLFdBQWQsQ0FBMEJMLEtBQTFCO0FBQ0FKLG9CQUFnQixJQUFoQjtBQUNEO0FB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QVdzRSxvQkFBVU0sSUFsQko7QUFtQmpCMUUsV0FBU29FLG9CQUFVTSxJQW5CRjtBQW9CakIzRCxtQkFBaUJxRCxvQkFBVU0sSUFwQlY7QUFxQmpCaEcsU0FBTzBGLG9CQUFVTyxNQXJCQTtBQXNCakIzQyxZQUFVb0Msb0JBQVVLLE1BdEJIO0FBdUJqQmpELG9CQUFrQjRDLG9CQUFVRyxNQXZCWDtBQXdCakI5QyxzQkFBb0IyQyxvQkFBVUssTUF4QmI7QUF5QmpCeEMsUUFBTW1DLG9CQUFVRztBQXpCQyxDO0FBRGZsRixjLENBNkJHdUYsWSxHQUFlO0FBQ3BCOUMsb0JBQWtCLFFBREU7QUFFcEIzQixVQUFRLGtCQUFNLENBQUUsQ0FGSTtBQUdwQk8sV0FBUyxtQkFBTSxDQUFFLENBSEc7QUFJcEJELFdBQVMsbUJBQU0sQ0FBRSxDQUpHO0FBS3BCWCxhQUFXLHFCQUFNLENBQUUsQ0FMQztBQU1wQkUsV0FBUyxtQkFBTSxDQUFFLENBTkc7QUFPcEJlLG1CQUFpQiwyQkFBTSxDQUFFLENBUEw7QUFRcEJpQixZQUFVLENBUlU7QUFTcEJDLFFBQU07QUFUYyxDO0FBN0JsQjVDLGMsQ0F5Q0d3RixZLEdBQWU7QUFDcEJ6QyxZQUFVZ0Msb0JBQVVPLE1BQVYsQ0FBaUJHO0FBRFAsQztrQkFvUVR6RixjIiwiZmlsZSI6IkVuaGFuY2VkQnV0dG9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEV2ZW50cyBmcm9tICcuLi91dGlscy9ldmVudHMnO1xuaW1wb3J0IGtleWNvZGUgZnJvbSAna2V5Y29kZSc7XG5pbXBvcnQgRm9jdXNSaXBwbGUgZnJvbSAnLi9Gb2N1c1JpcHBsZSc7XG5pbXBvcnQgVG91Y2hSaXBwbGUgZnJvbSAnLi9Ub3VjaFJpcHBsZSc7XG5cbmxldCBzdHlsZUluamVjdGVkID0gZmFsc2U7XG5sZXQgbGlzdGVuaW5nID0gZmFsc2U7XG5sZXQgdGFiUHJlc3NlZCA9IGZhbHNlO1xuXG5mdW5jdGlvbiBpbmplY3RTdHlsZSgpIHtcbiAgaWYgKCFzdHlsZUluamVjdGVkKSB7XG4gICAgLy8gUmVtb3ZlIGlubmVyIHBhZGRpbmcgYW5kIGJvcmRlciBpbiBGaXJlZm94IDQrLlxuICAgIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBzdHlsZS5pbm5lckhUTUwgPSBgXG4gICAgICBidXR0b246Oi1tb3otZm9jdXMtaW5uZXIsXG4gICAgICBpbnB1dDo6LW1vei1mb2N1cy1pbm5lciB7XG4gICAgICAgIGJvcmRlcjogMDtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICAgIH1cbiAgICBgO1xuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgc3R5bGVJbmplY3RlZCA9IHRydWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gbGlzdGVuRm9yVGFiUHJlc3NlcygpIHtcbiAgaWYgKCFsaXN0ZW5pbmcpIHtcbiAgICBFdmVudHMub24od2luZG93LCAna2V5ZG93bicsIChldmVudCkgPT4ge1xuICAgICAgdGFiUHJlc3NlZCA9IGtleWNvZGUoZXZlbnQpID09PSAndGFiJztcbiAgICB9KTtcbiAgICBsaXN0ZW5pbmcgPSB0cnVlO1xuICB9XG59XG5cbmNsYXNzIEVuaGFuY2VkQnV0dG9uIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjZW50ZXJSaXBwbGU6IFByb3BUeXBlcy5ib29sLFxuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcbiAgICBjb250YWluZXJFbGVtZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMuZWxlbWVudCxcbiAgICBdKSxcbiAgICBkaXNhYmxlRm9jdXNSaXBwbGU6IFByb3BUeXBlcy5ib29sLFxuICAgIGRpc2FibGVLZXlib2FyZEZvY3VzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkaXNhYmxlVG91Y2hSaXBwbGU6IFByb3BUeXBlcy5ib29sLFxuICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBmb2N1c1JpcHBsZUNvbG9yOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGZvY3VzUmlwcGxlT3BhY2l0eTogUHJvcFR5cGVzLm51bWJlcixcbiAgICBocmVmOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGtleWJvYXJkRm9jdXNlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25CbHVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkZvY3VzOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uS2V5VXA6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uS2V5Ym9hcmRGb2N1czogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgdGFiSW5kZXg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgdG91Y2hSaXBwbGVDb2xvcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0b3VjaFJpcHBsZU9wYWNpdHk6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgdHlwZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGNvbnRhaW5lckVsZW1lbnQ6ICdidXR0b24nLFxuICAgIG9uQmx1cjogKCkgPT4ge30sXG4gICAgb25DbGljazogKCkgPT4ge30sXG4gICAgb25Gb2N1czogKCkgPT4ge30sXG4gICAgb25LZXlEb3duOiAoKSA9PiB7fSxcbiAgICBvbktleVVwOiAoKSA9PiB7fSxcbiAgICBvbktleWJvYXJkRm9jdXM6ICgpID0+IHt9LFxuICAgIHRhYkluZGV4OiAwLFxuICAgIHR5cGU6ICdidXR0b24nLFxuICB9O1xuXG4gIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgbXVpVGhlbWU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgfTtcblxuICBzdGF0ZSA9IHtcbiAgICBpc0tleWJvYXJkRm9jdXNlZDogZmFsc2UsXG4gIH07XG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIGNvbnN0IHtkaXNhYmxlZCwgZGlzYWJsZUtleWJvYXJkRm9jdXMsIGtleWJvYXJkRm9jdXNlZH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghZGlzYWJsZWQgJiYga2V5Ym9hcmRGb2N1c2VkICYmICFkaXNhYmxlS2V5Ym9hcmRGb2N1cykge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNLZXlib2FyZEZvY3VzZWQ6IHRydWV9KTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBpbmplY3RTdHlsZSgpO1xuICAgIGxpc3RlbkZvclRhYlByZXNzZXMoKTtcbiAgICBpZiAodGhpcy5zdGF0ZS5pc0tleWJvYXJkRm9jdXNlZCkge1xuICAgICAgdGhpcy5idXR0b24uZm9jdXMoKTtcbiAgICAgIHRoaXMucHJvcHMub25LZXlib2FyZEZvY3VzKG51bGwsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgaWYgKChuZXh0UHJvcHMuZGlzYWJsZWQgfHwgbmV4dFByb3BzLmRpc2FibGVLZXlib2FyZEZvY3VzKSAmJlxuICAgICAgdGhpcy5zdGF0ZS5pc0tleWJvYXJkRm9jdXNlZCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNLZXlib2FyZEZvY3VzZWQ6IGZhbHNlfSk7XG4gICAgICBpZiAobmV4dFByb3BzLm9uS2V5Ym9hcmRGb2N1cykge1xuICAgICAgICBuZXh0UHJvcHMub25LZXlib2FyZEZvY3VzKG51bGwsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBpZiAodGhpcy5mb2N1c1RpbWVvdXQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmZvY3VzVGltZW91dCk7XG4gICAgfVxuICB9XG5cbiAgaXNLZXlib2FyZEZvY3VzZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuaXNLZXlib2FyZEZvY3VzZWQ7XG4gIH1cblxuICByZW1vdmVLZXlib2FyZEZvY3VzKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMuc3RhdGUuaXNLZXlib2FyZEZvY3VzZWQpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2lzS2V5Ym9hcmRGb2N1c2VkOiBmYWxzZX0pO1xuICAgICAgdGhpcy5wcm9wcy5vbktleWJvYXJkRm9jdXMoZXZlbnQsIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBzZXRLZXlib2FyZEZvY3VzKGV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLnN0YXRlLmlzS2V5Ym9hcmRGb2N1c2VkKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtpc0tleWJvYXJkRm9jdXNlZDogdHJ1ZX0pO1xuICAgICAgdGhpcy5wcm9wcy5vbktleWJvYXJkRm9jdXMoZXZlbnQsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGNhbmNlbEZvY3VzVGltZW91dCgpIHtcbiAgICBpZiAodGhpcy5mb2N1c1RpbWVvdXQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmZvY3VzVGltZW91dCk7XG4gICAgICB0aGlzLmZvY3VzVGltZW91dCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlQnV0dG9uQ2hpbGRyZW4oKSB7XG4gICAgY29uc3Qge1xuICAgICAgY2VudGVyUmlwcGxlLFxuICAgICAgY2hpbGRyZW4sXG4gICAgICBkaXNhYmxlZCxcbiAgICAgIGRpc2FibGVGb2N1c1JpcHBsZSxcbiAgICAgIGRpc2FibGVLZXlib2FyZEZvY3VzLFxuICAgICAgZGlzYWJsZVRvdWNoUmlwcGxlLFxuICAgICAgZm9jdXNSaXBwbGVDb2xvcixcbiAgICAgIGZvY3VzUmlwcGxlT3BhY2l0eSxcbiAgICAgIHRvdWNoUmlwcGxlQ29sb3IsXG4gICAgICB0b3VjaFJpcHBsZU9wYWNpdHksXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge2lzS2V5Ym9hcmRGb2N1c2VkfSA9IHRoaXMuc3RhdGU7XG5cbiAgICAvLyBGb2N1cyBSaXBwbGVcbiAgICBjb25zdCBmb2N1c1JpcHBsZSA9IGlzS2V5Ym9hcmRGb2N1c2VkICYmICFkaXNhYmxlZCAmJiAhZGlzYWJsZUZvY3VzUmlwcGxlICYmICFkaXNhYmxlS2V5Ym9hcmRGb2N1cyA/IChcbiAgICAgIDxGb2N1c1JpcHBsZVxuICAgICAgICBjb2xvcj17Zm9jdXNSaXBwbGVDb2xvcn1cbiAgICAgICAgb3BhY2l0eT17Zm9jdXNSaXBwbGVPcGFjaXR5fVxuICAgICAgICBzaG93PXtpc0tleWJvYXJkRm9jdXNlZH1cbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgIH19XG4gICAgICAgIGtleT1cImZvY3VzUmlwcGxlXCJcbiAgICAgIC8+XG4gICAgKSA6IHVuZGVmaW5lZDtcblxuICAgIC8vIFRvdWNoIFJpcHBsZVxuICAgIGNvbnN0IHRvdWNoUmlwcGxlID0gIWRpc2FibGVkICYmICFkaXNhYmxlVG91Y2hSaXBwbGUgPyAoXG4gICAgICA8VG91Y2hSaXBwbGVcbiAgICAgICAgY2VudGVyUmlwcGxlPXtjZW50ZXJSaXBwbGV9XG4gICAgICAgIGNvbG9yPXt0b3VjaFJpcHBsZUNvbG9yfVxuICAgICAgICBvcGFjaXR5PXt0b3VjaFJpcHBsZU9wYWNpdHl9XG4gICAgICAgIGtleT1cInRvdWNoUmlwcGxlXCJcbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9Ub3VjaFJpcHBsZT5cbiAgICApIDogdW5kZWZpbmVkO1xuXG4gICAgcmV0dXJuIFtcbiAgICAgIGZvY3VzUmlwcGxlLFxuICAgICAgdG91Y2hSaXBwbGUsXG4gICAgICB0b3VjaFJpcHBsZSA/IHVuZGVmaW5lZCA6IGNoaWxkcmVuLFxuICAgIF07XG4gIH1cblxuICBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmRpc2FibGVkICYmICF0aGlzLnByb3BzLmRpc2FibGVLZXlib2FyZEZvY3VzKSB7XG4gICAgICBpZiAoa2V5Y29kZShldmVudCkgPT09ICdlbnRlcicgJiYgdGhpcy5zdGF0ZS5pc0tleWJvYXJkRm9jdXNlZCkge1xuICAgICAgICB0aGlzLmhhbmRsZVRvdWNoVGFwKGV2ZW50KTtcbiAgICAgIH1cbiAgICAgIGlmIChrZXljb2RlKGV2ZW50KSA9PT0gJ2VzYycgJiYgdGhpcy5zdGF0ZS5pc0tleWJvYXJkRm9jdXNlZCkge1xuICAgICAgICB0aGlzLnJlbW92ZUtleWJvYXJkRm9jdXMoZXZlbnQpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gIH07XG5cbiAgaGFuZGxlS2V5VXAgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuZGlzYWJsZWQgJiYgIXRoaXMucHJvcHMuZGlzYWJsZUtleWJvYXJkRm9jdXMpIHtcbiAgICAgIGlmIChrZXljb2RlKGV2ZW50KSA9PT0gJ3NwYWNlJyAmJiB0aGlzLnN0YXRlLmlzS2V5Ym9hcmRGb2N1c2VkKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlVG91Y2hUYXAoZXZlbnQpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnByb3BzLm9uS2V5VXAoZXZlbnQpO1xuICB9O1xuXG4gIGhhbmRsZUJsdXIgPSAoZXZlbnQpID0+IHtcbiAgICB0aGlzLmNhbmNlbEZvY3VzVGltZW91dCgpO1xuICAgIHRoaXMucmVtb3ZlS2V5Ym9hcmRGb2N1cyhldmVudCk7XG4gICAgdGhpcy5wcm9wcy5vbkJsdXIoZXZlbnQpO1xuICB9O1xuXG4gIGhhbmRsZUZvY3VzID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKGV2ZW50KSBldmVudC5wZXJzaXN0KCk7XG4gICAgaWYgKCF0aGlzLnByb3BzLmRpc2FibGVkICYmICF0aGlzLnByb3BzLmRpc2FibGVLZXlib2FyZEZvY3VzKSB7XG4gICAgICAvLyBzZXRUaW1lb3V0IGlzIG5lZWRlZCBiZWNhdXNlIHRoZSBmb2N1cyBldmVudCBmaXJlcyBmaXJzdFxuICAgICAgLy8gV2FpdCBzbyB0aGF0IHdlIGNhbiBjYXB0dXJlIGlmIHRoaXMgd2FzIGEga2V5Ym9hcmQgZm9jdXNcbiAgICAgIC8vIG9yIHRvdWNoIGZvY3VzXG4gICAgICB0aGlzLmZvY3VzVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAodGFiUHJlc3NlZCkge1xuICAgICAgICAgIHRoaXMuc2V0S2V5Ym9hcmRGb2N1cyhldmVudCk7XG4gICAgICAgICAgdGFiUHJlc3NlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9LCAxNTApO1xuXG4gICAgICB0aGlzLnByb3BzLm9uRm9jdXMoZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVUb3VjaFRhcCA9IChldmVudCkgPT4ge1xuICAgIHRoaXMuY2FuY2VsRm9jdXNUaW1lb3V0KCk7XG4gICAgaWYgKCF0aGlzLnByb3BzLmRpc2FibGVkKSB7XG4gICAgICB0YWJQcmVzc2VkID0gZmFsc2U7XG4gICAgICB0aGlzLnJlbW92ZUtleWJvYXJkRm9jdXMoZXZlbnQpO1xuICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICB9XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNlbnRlclJpcHBsZSwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgY2hpbGRyZW4sXG4gICAgICBjb250YWluZXJFbGVtZW50LFxuICAgICAgZGlzYWJsZWQsXG4gICAgICBkaXNhYmxlRm9jdXNSaXBwbGUsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIGRpc2FibGVLZXlib2FyZEZvY3VzLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICBkaXNhYmxlVG91Y2hSaXBwbGUsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIGZvY3VzUmlwcGxlQ29sb3IsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIGZvY3VzUmlwcGxlT3BhY2l0eSwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgaHJlZixcbiAgICAgIGtleWJvYXJkRm9jdXNlZCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgdG91Y2hSaXBwbGVDb2xvciwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgdG91Y2hSaXBwbGVPcGFjaXR5LCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICBvbkJsdXIsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIG9uQ2xpY2ssIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIG9uRm9jdXMsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIG9uS2V5VXAsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIG9uS2V5RG93biwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgb25LZXlib2FyZEZvY3VzLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICBzdHlsZSxcbiAgICAgIHRhYkluZGV4LFxuICAgICAgdHlwZSxcbiAgICAgIC4uLm90aGVyXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCB7XG4gICAgICBwcmVwYXJlU3R5bGVzLFxuICAgICAgZW5oYW5jZWRCdXR0b24sXG4gICAgfSA9IHRoaXMuY29udGV4dC5tdWlUaGVtZTtcblxuICAgIGNvbnN0IG1lcmdlZFN0eWxlcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgYm9yZGVyOiAxMCxcbiAgICAgIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICBmb250RmFtaWx5OiB0aGlzLmNvbnRleHQubXVpVGhlbWUuYmFzZVRoZW1lLmZvbnRGYW1pbHksXG4gICAgICBXZWJraXRUYXBIaWdobGlnaHRDb2xvcjogZW5oYW5jZWRCdXR0b24udGFwSGlnaGxpZ2h0Q29sb3IsIC8vIFJlbW92ZSBtb2JpbGUgY29sb3IgZmxhc2hpbmcgKGRlcHJlY2F0ZWQpXG4gICAgICBjdXJzb3I6IGRpc2FibGVkID8gJ2RlZmF1bHQnIDogJ3BvaW50ZXInLFxuICAgICAgdGV4dERlY29yYXRpb246ICdub25lJyxcbiAgICAgIG1hcmdpbjogMCxcbiAgICAgIHBhZGRpbmc6IDAsXG4gICAgICBvdXRsaW5lOiAnbm9uZScsXG4gICAgICBmb250U2l6ZTogJ2luaGVyaXQnLFxuICAgICAgZm9udFdlaWdodDogJ2luaGVyaXQnLFxuICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsIC8vIFRoaXMgaXMgbmVlZGVkIHNvIHRoYXQgcmlwcGxlcyBkbyBub3QgYmxlZWQgcGFzdCBib3JkZXIgcmFkaXVzLlxuICAgICAgdmVydGljYWxBbGlnbjogaHJlZiA/ICdtaWRkbGUnIDogbnVsbCxcbiAgICB9LCBzdHlsZSk7XG5cblxuICAgIC8vIFBhc3NpbmcgYm90aCBiYWNrZ3JvdW5kOm5vbmUgJiBiYWNrZ3JvdW5kQ29sb3IgY2FuIGJyZWFrIGR1ZSB0byBvYmplY3QgaXRlcmF0aW9uIG9yZGVyXG4gICAgaWYgKCFtZXJnZWRTdHlsZXMuYmFja2dyb3VuZENvbG9yICYmICFtZXJnZWRTdHlsZXMuYmFja2dyb3VuZCkge1xuICAgICAgbWVyZ2VkU3R5bGVzLmJhY2tncm91bmQgPSAnbm9uZSc7XG4gICAgfVxuXG4gICAgaWYgKGRpc2FibGVkICYmIGhyZWYpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxzcGFuXG4gICAgICAgICAgey4uLm90aGVyfVxuICAgICAgICAgIHN0eWxlPXttZXJnZWRTdHlsZXN9XG4gICAgICAgID5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgYnV0dG9uUHJvcHMgPSB7XG4gICAgICAuLi5vdGhlcixcbiAgICAgIHN0eWxlOiBwcmVwYXJlU3R5bGVzKG1lcmdlZFN0eWxlcyksXG4gICAgICByZWY6IChub2RlKSA9PiB0aGlzLmJ1dHRvbiA9IG5vZGUsXG4gICAgICBkaXNhYmxlZDogZGlzYWJsZWQsXG4gICAgICBvbkJsdXI6IHRoaXMuaGFuZGxlQmx1cixcbiAgICAgIG9uRm9jdXM6IHRoaXMuaGFuZGxlRm9jdXMsXG4gICAgICBvbktleVVwOiB0aGlzLmhhbmRsZUtleVVwLFxuICAgICAgb25LZXlEb3duOiB0aGlzLmhhbmRsZUtleURvd24sXG4gICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZVRvdWNoVGFwLFxuICAgICAgdGFiSW5kZXg6IGRpc2FibGVkIHx8IGRpc2FibGVLZXlib2FyZEZvY3VzID8gLTEgOiB0YWJJbmRleCxcbiAgICB9O1xuXG4gICAgaWYgKGhyZWYpIGJ1dHRvblByb3BzLmhyZWYgPSBocmVmO1xuXG4gICAgY29uc3QgYnV0dG9uQ2hpbGRyZW4gPSB0aGlzLmNyZWF0ZUJ1dHRvbkNoaWxkcmVuKCk7XG5cbiAgICBpZiAoUmVhY3QuaXNWYWxpZEVsZW1lbnQoY29udGFpbmVyRWxlbWVudCkpIHtcbiAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY29udGFpbmVyRWxlbWVudCwgYnV0dG9uUHJvcHMsIGJ1dHRvbkNoaWxkcmVuKTtcbiAgICB9XG5cbiAgICBpZiAoIWhyZWYgJiYgY29udGFpbmVyRWxlbWVudCA9PT0gJ2J1dHRvbicpIHtcbiAgICAgIGJ1dHRvblByb3BzLnR5cGUgPSB0eXBlO1xuICAgIH1cblxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KGhyZWYgPyAnYScgOiBjb250YWluZXJFbGVtZW50LCBidXR0b25Qcm9wcywgYnV0dG9uQ2hpbGRyZW4pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVuaGFuY2VkQnV0dG9uO1xuIl19