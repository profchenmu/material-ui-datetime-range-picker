'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _transitions = require('../styles/transitions');

var _transitions2 = _interopRequireDefault(_transitions);

var _dateUtils = require('./dateUtils');

var _EnhancedButton = require('../internal/EnhancedButton');

var _EnhancedButton2 = _interopRequireDefault(_EnhancedButton);

var _parseNum = require('parse-num');

var _parseNum2 = _interopRequireDefault(_parseNum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getStyles(props, context, state) {
  var dayButtonSize = props.dayButtonSize,
      calendarDateWidth = props.calendarDateWidth,
      containsBlockedTime = props.containsBlockedTime,
      date = props.date,
      disabled = props.disabled,
      isBetweenDates = props.isBetweenDates,
      isEndDate = props.isEndDate,
      isStartDate = props.isStartDate,
      selected = props.selected;
  var hover = state.hover;
  var _context$muiTheme = context.muiTheme,
      baseTheme = _context$muiTheme.baseTheme,
      datePicker = _context$muiTheme.datePicker;


  var buttonStateSize = (0, _parseNum2.default)(dayButtonSize || '34px');
  var calendarWidth = (0, _parseNum2.default)(calendarDateWidth || '310') - buttonStateSize / 2; // -btn/2 for padding
  var margin = 'auto';

  var spacerRight = 0;
  var spacerLeft = 0;
  var spacerDisplay = 'none';

  var labelColor = baseTheme.palette.textColor;
  var buttonStateOpacity = 0;
  var buttonStateBorderRadius = '50%';
  var buttonStateTransform = 'scale(0)';
  var buttonStateWidth = buttonStateSize;
  var unit = (dayButtonSize || 'px').replace(/[0-9.]/g, '');

  var buttonStateLeft = 0;

  var diff = (calendarWidth - buttonStateSize * 7) / 14;

  if (hover || selected || isBetweenDates) {
    labelColor = datePicker.selectTextColor;
    buttonStateOpacity = selected || isBetweenDates ? 1 : 0.6;
    buttonStateTransform = 'scale(1)';
    if (isEndDate && !isStartDate) {
      buttonStateBorderRadius = '0% 50% 50% 0%';
      buttonStateWidth += diff;
      margin = 'auto auto auto 0';
      buttonStateLeft = diff;
      spacerRight = 'unset';
      spacerDisplay = 'block';
    } else if (isStartDate && !isEndDate) {
      buttonStateBorderRadius = '50% 0% 0% 50%';
      buttonStateWidth += diff;
      margin = 'auto 0 auto auto';
      buttonStateLeft = -diff;
      spacerLeft = 'unset';
      spacerDisplay = 'block';
    } else if (!isEndDate && !isStartDate && isBetweenDates) {
      buttonStateBorderRadius = '0%';
      buttonStateWidth += diff * 2;
      margin = 'auto 0';
    }
  } else if (containsBlockedTime === true || (0, _dateUtils.isEqualDate)(date, new Date())) {
    labelColor = datePicker.color;
  }
  return {
    root: {
      boxSizing: 'border-box',
      fontWeight: '400',
      opacity: disabled && '0.4',
      padding: '0',
      position: 'relative',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated)
      margin: margin,
      minWidth: '' + buttonStateWidth + unit,
      minHeight: '' + buttonStateWidth + unit
    },
    label: {
      color: labelColor,
      fontWeight: '400',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: buttonStateLeft,
      right: 0,
      margin: 'auto',
      lineHeight: '' + buttonStateSize + unit,
      height: '' + buttonStateSize + unit
    },
    buttonState: {
      backgroundColor: datePicker.selectColor,
      borderRadius: buttonStateBorderRadius,
      height: '' + buttonStateSize + unit,
      opacity: buttonStateOpacity,
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: buttonStateLeft,
      right: 0,
      margin: 'auto',
      transform: buttonStateTransform,
      transition: _transitions2.default.easeOut(),
      width: '' + buttonStateWidth + unit
    },
    spacer: {
      width: '' + diff + unit,
      position: 'absolute',
      right: spacerRight,
      left: spacerLeft,
      top: 0,
      bottom: 0,
      height: '' + buttonStateSize + unit,
      backgroundColor: datePicker.selectColor,
      display: spacerDisplay,
      margin: 'auto'
    }
  };
}

var DayButton = function (_Component) {
  _inherits(DayButton, _Component);

  function DayButton() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DayButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DayButton.__proto__ || Object.getPrototypeOf(DayButton)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      hover: false
    }, _this.handleMouseEnter = function () {
      if (!_this.props.disabled) {
        _this.setState({ hover: true });
      }
    }, _this.handleMouseLeave = function () {
      if (!_this.props.disabled) {
        _this.setState({ hover: false });
      }
    }, _this.handleTouchTap = function (event) {
      if (!_this.props.disabled && _this.props.onClick) {
        _this.props.onClick(event, _this.props.date);
      }
    }, _this.handleKeyboardFocus = function (event, keyboardFocused) {
      if (!_this.props.disabled && _this.props.onKeyboardFocus) {
        _this.props.onKeyboardFocus(event, keyboardFocused, _this.props.date);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DayButton, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          containsBlockedTime = _props.containsBlockedTime,
          DateTimeFormat = _props.DateTimeFormat,
          calendarDateWidth = _props.calendarDateWidth,
          date = _props.date,
          dayButtonSize = _props.dayButtonSize,
          disabled = _props.disabled,
          isBetweenDates = _props.isBetweenDates,
          isEndDate = _props.isEndDate,
          isStartDate = _props.isStartDate,
          locale = _props.locale,
          onClick = _props.onClick,
          selected = _props.selected,
          other = _objectWithoutProperties(_props, ['containsBlockedTime', 'DateTimeFormat', 'calendarDateWidth', 'date', 'dayButtonSize', 'disabled', 'isBetweenDates', 'isEndDate', 'isStartDate', 'locale', 'onClick', 'selected']);

      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context, this.state);

      return date ? _react2.default.createElement(
        _EnhancedButton2.default,
        _extends({}, other, {
          disabled: disabled,
          disableFocusRipple: true,
          disableTouchRipple: true,
          onKeyboardFocus: this.handleKeyboardFocus,
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave,
          onClick: this.handleTouchTap,
          style: styles.root
        }),
        _react2.default.createElement('div', { style: prepareStyles(styles.buttonState) }),
        _react2.default.createElement(
          'span',
          { style: prepareStyles(styles.label) },
          new DateTimeFormat(locale, {
            day: 'numeric'
          }).format(date)
        ),
        _react2.default.createElement('div', { style: prepareStyles(styles.spacer) })
      ) : _react2.default.createElement('span', { style: prepareStyles(styles.root) });
    }
  }]);

  return DayButton;
}(_react.Component);

DayButton.propTypes = {
  DateTimeFormat: _propTypes2.default.func.isRequired,
  calendarDateWidth: _propTypes2.default.string,
  containsBlockedTime: _propTypes2.default.bool,
  date: _propTypes2.default.object,
  dayButtonSize: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  isBetweenDates: _propTypes2.default.bool,
  isEndDate: _propTypes2.default.bool,
  isStartDate: _propTypes2.default.bool,
  locale: _propTypes2.default.string.isRequired,
  onClick: _propTypes2.default.func,
  onKeyboardFocus: _propTypes2.default.func,
  selected: _propTypes2.default.bool

};
DayButton.defaultProps = {
  selected: false,
  disabled: false
};
DayButton.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
exports.default = DayButton;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9EYXRlUGlja2VyL0RheUJ1dHRvbi5qcyJdLCJuYW1lcyI6WyJnZXRTdHlsZXMiLCJwcm9wcyIsImNvbnRleHQiLCJzdGF0ZSIsImRheUJ1dHRvblNpemUiLCJjYWxlbmRhckRhdGVXaWR0aCIsImNvbnRhaW5zQmxvY2tlZFRpbWUiLCJkYXRlIiwiZGlzYWJsZWQiLCJpc0JldHdlZW5EYXRlcyIsImlzRW5kRGF0ZSIsImlzU3RhcnREYXRlIiwic2VsZWN0ZWQiLCJob3ZlciIsIm11aVRoZW1lIiwiYmFzZVRoZW1lIiwiZGF0ZVBpY2tlciIsImJ1dHRvblN0YXRlU2l6ZSIsImNhbGVuZGFyV2lkdGgiLCJtYXJnaW4iLCJzcGFjZXJSaWdodCIsInNwYWNlckxlZnQiLCJzcGFjZXJEaXNwbGF5IiwibGFiZWxDb2xvciIsInBhbGV0dGUiLCJ0ZXh0Q29sb3IiLCJidXR0b25TdGF0ZU9wYWNpdHkiLCJidXR0b25TdGF0ZUJvcmRlclJhZGl1cyIsImJ1dHRvblN0YXRlVHJhbnNmb3JtIiwiYnV0dG9uU3RhdGVXaWR0aCIsInVuaXQiLCJyZXBsYWNlIiwiYnV0dG9uU3RhdGVMZWZ0IiwiZGlmZiIsInNlbGVjdFRleHRDb2xvciIsIkRhdGUiLCJjb2xvciIsInJvb3QiLCJib3hTaXppbmciLCJmb250V2VpZ2h0Iiwib3BhY2l0eSIsInBhZGRpbmciLCJwb3NpdGlvbiIsIldlYmtpdFRhcEhpZ2hsaWdodENvbG9yIiwibWluV2lkdGgiLCJtaW5IZWlnaHQiLCJsYWJlbCIsInRvcCIsImJvdHRvbSIsImxlZnQiLCJyaWdodCIsImxpbmVIZWlnaHQiLCJoZWlnaHQiLCJidXR0b25TdGF0ZSIsImJhY2tncm91bmRDb2xvciIsInNlbGVjdENvbG9yIiwiYm9yZGVyUmFkaXVzIiwidHJhbnNmb3JtIiwidHJhbnNpdGlvbiIsIlRyYW5zaXRpb24iLCJlYXNlT3V0Iiwid2lkdGgiLCJzcGFjZXIiLCJkaXNwbGF5IiwiRGF5QnV0dG9uIiwiaGFuZGxlTW91c2VFbnRlciIsInNldFN0YXRlIiwiaGFuZGxlTW91c2VMZWF2ZSIsImhhbmRsZVRvdWNoVGFwIiwiZXZlbnQiLCJvbkNsaWNrIiwiaGFuZGxlS2V5Ym9hcmRGb2N1cyIsImtleWJvYXJkRm9jdXNlZCIsIm9uS2V5Ym9hcmRGb2N1cyIsIkRhdGVUaW1lRm9ybWF0IiwibG9jYWxlIiwib3RoZXIiLCJwcmVwYXJlU3R5bGVzIiwic3R5bGVzIiwiZGF5IiwiZm9ybWF0IiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwiZnVuYyIsImlzUmVxdWlyZWQiLCJzdHJpbmciLCJib29sIiwib2JqZWN0IiwiZGVmYXVsdFByb3BzIiwiY29udGV4dFR5cGVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFQSxTQUFTQSxTQUFULENBQW1CQyxLQUFuQixFQUEwQkMsT0FBMUIsRUFBbUNDLEtBQW5DLEVBQTBDO0FBQUEsTUFFdENDLGFBRnNDLEdBV3BDSCxLQVhvQyxDQUV0Q0csYUFGc0M7QUFBQSxNQUd0Q0MsaUJBSHNDLEdBV3BDSixLQVhvQyxDQUd0Q0ksaUJBSHNDO0FBQUEsTUFJdENDLG1CQUpzQyxHQVdwQ0wsS0FYb0MsQ0FJdENLLG1CQUpzQztBQUFBLE1BS3RDQyxJQUxzQyxHQVdwQ04sS0FYb0MsQ0FLdENNLElBTHNDO0FBQUEsTUFNdENDLFFBTnNDLEdBV3BDUCxLQVhvQyxDQU10Q08sUUFOc0M7QUFBQSxNQU90Q0MsY0FQc0MsR0FXcENSLEtBWG9DLENBT3RDUSxjQVBzQztBQUFBLE1BUXRDQyxTQVJzQyxHQVdwQ1QsS0FYb0MsQ0FRdENTLFNBUnNDO0FBQUEsTUFTdENDLFdBVHNDLEdBV3BDVixLQVhvQyxDQVN0Q1UsV0FUc0M7QUFBQSxNQVV0Q0MsUUFWc0MsR0FXcENYLEtBWG9DLENBVXRDVyxRQVZzQztBQUFBLE1BWWpDQyxLQVppQyxHQVl4QlYsS0Fad0IsQ0FZakNVLEtBWmlDO0FB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cEI3RSxZQUFVLEtBRFU7QUFFcEJKLFlBQVU7QUFGVSxDO0FBbEJsQndELFMsQ0F1QkcwQixZLEdBQWU7QUFDcEI1RSxZQUFVcUUsb0JBQVVLLE1BQVYsQ0FBaUJIO0FBRFAsQztrQkE4RVRyQixTIiwiZmlsZSI6IkRheUJ1dHRvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBUcmFuc2l0aW9uIGZyb20gJy4uL3N0eWxlcy90cmFuc2l0aW9ucyc7XG5pbXBvcnQge2lzRXF1YWxEYXRlfSBmcm9tICcuL2RhdGVVdGlscyc7XG5pbXBvcnQgRW5oYW5jZWRCdXR0b24gZnJvbSAnLi4vaW50ZXJuYWwvRW5oYW5jZWRCdXR0b24nO1xuaW1wb3J0IHBhcnNlTnVtIGZyb20gJ3BhcnNlLW51bSc7XG5cbmZ1bmN0aW9uIGdldFN0eWxlcyhwcm9wcywgY29udGV4dCwgc3RhdGUpIHtcbiAgY29uc3Qge1xuICAgIGRheUJ1dHRvblNpemUsXG4gICAgY2FsZW5kYXJEYXRlV2lkdGgsXG4gICAgY29udGFpbnNCbG9ja2VkVGltZSxcbiAgICBkYXRlLFxuICAgIGRpc2FibGVkLFxuICAgIGlzQmV0d2VlbkRhdGVzLFxuICAgIGlzRW5kRGF0ZSxcbiAgICBpc1N0YXJ0RGF0ZSxcbiAgICBzZWxlY3RlZCxcbiAgfSA9IHByb3BzO1xuICBjb25zdCB7aG92ZXJ9ID0gc3RhdGU7XG4gIGNvbnN0IHtiYXNlVGhlbWUsIGRhdGVQaWNrZXJ9ID0gY29udGV4dC5tdWlUaGVtZTtcblxuICBjb25zdCBidXR0b25TdGF0ZVNpemUgPSBwYXJzZU51bShkYXlCdXR0b25TaXplIHx8ICczNHB4Jyk7XG4gIGNvbnN0IGNhbGVuZGFyV2lkdGggPSBwYXJzZU51bShjYWxlbmRhckRhdGVXaWR0aCB8fCAnMzEwJykgLSAoYnV0dG9uU3RhdGVTaXplIC8gMik7IC8vIC1idG4vMiBmb3IgcGFkZGluZ1xuICBsZXQgbWFyZ2luID0gJ2F1dG8nO1xuXG4gIGxldCBzcGFjZXJSaWdodCA9IDA7XG4gIGxldCBzcGFjZXJMZWZ0ID0gMDtcbiAgbGV0IHNwYWNlckRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgbGV0IGxhYmVsQ29sb3IgPSBiYXNlVGhlbWUucGFsZXR0ZS50ZXh0Q29sb3I7XG4gIGxldCBidXR0b25TdGF0ZU9wYWNpdHkgPSAwO1xuICBsZXQgYnV0dG9uU3RhdGVCb3JkZXJSYWRpdXMgPSAnNTAlJztcbiAgbGV0IGJ1dHRvblN0YXRlVHJhbnNmb3JtID0gJ3NjYWxlKDApJztcbiAgbGV0IGJ1dHRvblN0YXRlV2lkdGggPSBidXR0b25TdGF0ZVNpemU7XG4gIGNvbnN0IHVuaXQgPSAoZGF5QnV0dG9uU2l6ZSB8fCAncHgnKS5yZXBsYWNlKC9bMC05Ll0vZywgJycpO1xuXG4gIGxldCBidXR0b25TdGF0ZUxlZnQgPSAwO1xuXG4gIGNvbnN0IGRpZmYgPSAoY2FsZW5kYXJXaWR0aCAtIGJ1dHRvblN0YXRlU2l6ZSAqIDcpIC8gMTQ7XG5cbiAgaWYgKGhvdmVyIHx8IHNlbGVjdGVkIHx8IGlzQmV0d2VlbkRhdGVzKSB7XG4gICAgbGFiZWxDb2xvciA9IGRhdGVQaWNrZXIuc2VsZWN0VGV4dENvbG9yO1xuICAgIGJ1dHRvblN0YXRlT3BhY2l0eSA9IChzZWxlY3RlZCB8fCBpc0JldHdlZW5EYXRlcykgPyAxIDogMC42O1xuICAgIGJ1dHRvblN0YXRlVHJhbnNmb3JtID0gJ3NjYWxlKDEpJztcbiAgICBpZiAoaXNFbmREYXRlICYmICFpc1N0YXJ0RGF0ZSkge1xuICAgICAgYnV0dG9uU3RhdGVCb3JkZXJSYWRpdXMgPSAnMCUgNTAlIDUwJSAwJSc7XG4gICAgICBidXR0b25TdGF0ZVdpZHRoICs9IGRpZmY7XG4gICAgICBtYXJnaW4gPSAnYXV0byBhdXRvIGF1dG8gMCc7XG4gICAgICBidXR0b25TdGF0ZUxlZnQgPSBkaWZmO1xuICAgICAgc3BhY2VyUmlnaHQgPSAndW5zZXQnO1xuICAgICAgc3BhY2VyRGlzcGxheSA9ICdibG9jayc7XG4gICAgfSBlbHNlIGlmIChpc1N0YXJ0RGF0ZSAmJiAhaXNFbmREYXRlKSB7XG4gICAgICBidXR0b25TdGF0ZUJvcmRlclJhZGl1cyA9ICc1MCUgMCUgMCUgNTAlJztcbiAgICAgIGJ1dHRvblN0YXRlV2lkdGggKz0gZGlmZjtcbiAgICAgIG1hcmdpbiA9ICdhdXRvIDAgYXV0byBhdXRvJztcbiAgICAgIGJ1dHRvblN0YXRlTGVmdCA9IC1kaWZmO1xuICAgICAgc3BhY2VyTGVmdCA9ICd1bnNldCc7XG4gICAgICBzcGFjZXJEaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9IGVsc2UgaWYgKCFpc0VuZERhdGUgJiYgIWlzU3RhcnREYXRlICYmIGlzQmV0d2VlbkRhdGVzKSB7XG4gICAgICBidXR0b25TdGF0ZUJvcmRlclJhZGl1cyA9ICcwJSc7XG4gICAgICBidXR0b25TdGF0ZVdpZHRoICs9IChkaWZmICogMik7XG4gICAgICBtYXJnaW4gPSAnYXV0byAwJztcbiAgICB9XG4gIH0gZWxzZSBpZiAoY29udGFpbnNCbG9ja2VkVGltZSA9PT0gdHJ1ZSB8fCBpc0VxdWFsRGF0ZShkYXRlLCBuZXcgRGF0ZSgpKSkge1xuICAgIGxhYmVsQ29sb3IgPSBkYXRlUGlja2VyLmNvbG9yO1xuICB9XG4gIHJldHVybiB7XG4gICAgcm9vdDoge1xuICAgICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG4gICAgICBmb250V2VpZ2h0OiAnNDAwJyxcbiAgICAgIG9wYWNpdHk6IGRpc2FibGVkICYmICcwLjQnLFxuICAgICAgcGFkZGluZzogJzAnLFxuICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICBXZWJraXRUYXBIaWdobGlnaHRDb2xvcjogJ3JnYmEoMCwwLDAsMCknLCAvLyBSZW1vdmUgbW9iaWxlIGNvbG9yIGZsYXNoaW5nIChkZXByZWNhdGVkKVxuICAgICAgbWFyZ2luOiBtYXJnaW4sXG4gICAgICBtaW5XaWR0aDogYCR7YnV0dG9uU3RhdGVXaWR0aH0ke3VuaXR9YCxcbiAgICAgIG1pbkhlaWdodDogYCR7YnV0dG9uU3RhdGVXaWR0aH0ke3VuaXR9YCxcbiAgICB9LFxuICAgIGxhYmVsOiB7XG4gICAgICBjb2xvcjogbGFiZWxDb2xvcixcbiAgICAgIGZvbnRXZWlnaHQ6ICc0MDAnLFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICB0b3A6IDAsXG4gICAgICBib3R0b206IDAsXG4gICAgICBsZWZ0OiBidXR0b25TdGF0ZUxlZnQsXG4gICAgICByaWdodDogMCxcbiAgICAgIG1hcmdpbjogJ2F1dG8nLFxuICAgICAgbGluZUhlaWdodDogYCR7YnV0dG9uU3RhdGVTaXplfSR7dW5pdH1gLFxuICAgICAgaGVpZ2h0OiBgJHtidXR0b25TdGF0ZVNpemV9JHt1bml0fWAsXG4gICAgfSxcbiAgICBidXR0b25TdGF0ZToge1xuICAgICAgYmFja2dyb3VuZENvbG9yOiBkYXRlUGlja2VyLnNlbGVjdENvbG9yLFxuICAgICAgYm9yZGVyUmFkaXVzOiBidXR0b25TdGF0ZUJvcmRlclJhZGl1cyxcbiAgICAgIGhlaWdodDogYCR7YnV0dG9uU3RhdGVTaXplfSR7dW5pdH1gLFxuICAgICAgb3BhY2l0eTogYnV0dG9uU3RhdGVPcGFjaXR5LFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICB0b3A6IDAsXG4gICAgICBib3R0b206IDAsXG4gICAgICBsZWZ0OiBidXR0b25TdGF0ZUxlZnQsXG4gICAgICByaWdodDogMCxcbiAgICAgIG1hcmdpbjogJ2F1dG8nLFxuICAgICAgdHJhbnNmb3JtOiBidXR0b25TdGF0ZVRyYW5zZm9ybSxcbiAgICAgIHRyYW5zaXRpb246IFRyYW5zaXRpb24uZWFzZU91dCgpLFxuICAgICAgd2lkdGg6IGAke2J1dHRvblN0YXRlV2lkdGh9JHt1bml0fWAsXG4gICAgfSxcbiAgICBzcGFjZXI6IHtcbiAgICAgIHdpZHRoOiBgJHtkaWZmfSR7dW5pdH1gLFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICByaWdodDogc3BhY2VyUmlnaHQsXG4gICAgICBsZWZ0OiBzcGFjZXJMZWZ0LFxuICAgICAgdG9wOiAwLFxuICAgICAgYm90dG9tOiAwLFxuICAgICAgaGVpZ2h0OiBgJHtidXR0b25TdGF0ZVNpemV9JHt1bml0fWAsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IGRhdGVQaWNrZXIuc2VsZWN0Q29sb3IsXG4gICAgICBkaXNwbGF5OiBzcGFjZXJEaXNwbGF5LFxuICAgICAgbWFyZ2luOiAnYXV0bycsXG4gICAgfSxcbiAgfTtcbn1cblxuY2xhc3MgRGF5QnV0dG9uIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBEYXRlVGltZUZvcm1hdDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBjYWxlbmRhckRhdGVXaWR0aDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjb250YWluc0Jsb2NrZWRUaW1lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkYXRlOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIGRheUJ1dHRvblNpemU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGlzQmV0d2VlbkRhdGVzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBpc0VuZERhdGU6IFByb3BUeXBlcy5ib29sLFxuICAgIGlzU3RhcnREYXRlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbktleWJvYXJkRm9jdXM6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNlbGVjdGVkOiBQcm9wVHlwZXMuYm9vbCxcblxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgfTtcblxuICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgIG11aVRoZW1lOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIH07XG5cbiAgc3RhdGUgPSB7XG4gICAgaG92ZXI6IGZhbHNlLFxuICB9O1xuXG4gIGhhbmRsZU1vdXNlRW50ZXIgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtob3ZlcjogdHJ1ZX0pO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVNb3VzZUxlYXZlID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7aG92ZXI6IGZhbHNlfSk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZVRvdWNoVGFwID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmRpc2FibGVkICYmIHRoaXMucHJvcHMub25DbGljaykge1xuICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrKGV2ZW50LCB0aGlzLnByb3BzLmRhdGUpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVLZXlib2FyZEZvY3VzID0gKGV2ZW50LCBrZXlib2FyZEZvY3VzZWQpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuZGlzYWJsZWQgJiYgdGhpcy5wcm9wcy5vbktleWJvYXJkRm9jdXMpIHtcbiAgICAgIHRoaXMucHJvcHMub25LZXlib2FyZEZvY3VzKGV2ZW50LCBrZXlib2FyZEZvY3VzZWQsIHRoaXMucHJvcHMuZGF0ZSk7XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBjb250YWluc0Jsb2NrZWRUaW1lLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICBEYXRlVGltZUZvcm1hdCxcbiAgICAgIGNhbGVuZGFyRGF0ZVdpZHRoLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICBkYXRlLFxuICAgICAgZGF5QnV0dG9uU2l6ZSwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgZGlzYWJsZWQsXG4gICAgICBpc0JldHdlZW5EYXRlcywgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgaXNFbmREYXRlLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICBpc1N0YXJ0RGF0ZSwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgbG9jYWxlLFxuICAgICAgb25DbGljaywgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgc2VsZWN0ZWQsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIC4uLm90aGVyXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCB7cHJlcGFyZVN0eWxlc30gPSB0aGlzLmNvbnRleHQubXVpVGhlbWU7XG4gICAgY29uc3Qgc3R5bGVzID0gZ2V0U3R5bGVzKHRoaXMucHJvcHMsIHRoaXMuY29udGV4dCwgdGhpcy5zdGF0ZSk7XG5cbiAgICByZXR1cm4gZGF0ZSA/IChcbiAgICAgIDxFbmhhbmNlZEJ1dHRvblxuICAgICAgICB7Li4ub3RoZXJ9XG4gICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgZGlzYWJsZUZvY3VzUmlwcGxlPXt0cnVlfVxuICAgICAgICBkaXNhYmxlVG91Y2hSaXBwbGU9e3RydWV9XG4gICAgICAgIG9uS2V5Ym9hcmRGb2N1cz17dGhpcy5oYW5kbGVLZXlib2FyZEZvY3VzfVxuICAgICAgICBvbk1vdXNlRW50ZXI9e3RoaXMuaGFuZGxlTW91c2VFbnRlcn1cbiAgICAgICAgb25Nb3VzZUxlYXZlPXt0aGlzLmhhbmRsZU1vdXNlTGVhdmV9XG4gICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlVG91Y2hUYXB9XG4gICAgICAgIHN0eWxlPXtzdHlsZXMucm9vdH1cbiAgICAgID5cbiAgICAgICAgPGRpdiBzdHlsZT17cHJlcGFyZVN0eWxlcyhzdHlsZXMuYnV0dG9uU3RhdGUpfSAvPlxuICAgICAgICA8c3BhbiBzdHlsZT17cHJlcGFyZVN0eWxlcyhzdHlsZXMubGFiZWwpfT5cbiAgICAgICAgICB7bmV3IERhdGVUaW1lRm9ybWF0KGxvY2FsZSwge1xuICAgICAgICAgICAgZGF5OiAnbnVtZXJpYycsXG4gICAgICAgICAgfSkuZm9ybWF0KGRhdGUpfVxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIDxkaXYgc3R5bGU9e3ByZXBhcmVTdHlsZXMoc3R5bGVzLnNwYWNlcil9IC8+XG4gICAgICA8L0VuaGFuY2VkQnV0dG9uPlxuICAgICkgOiAoXG4gICAgICA8c3BhbiBzdHlsZT17cHJlcGFyZVN0eWxlcyhzdHlsZXMucm9vdCl9IC8+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEYXlCdXR0b247XG4iXX0=