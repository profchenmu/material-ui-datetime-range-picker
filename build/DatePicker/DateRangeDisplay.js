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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getStyles(props, context, state) {
  var datePicker = context.muiTheme.datePicker;
  var selectedYear = state.selectedYear;

  var isLandscape = props.mode === 'landscape';

  var styles = {
    root: {
      width: isLandscape ? 165 : '100%',
      height: isLandscape ? 330 : 'auto',
      float: isLandscape ? 'left' : 'none',
      fontWeight: 700,
      display: 'inline-block',
      backgroundColor: datePicker.headerColor,
      borderTopLeftRadius: 2,
      borderTopRightRadius: isLandscape ? 0 : 2,
      borderBottomLeftRadius: isLandscape ? 2 : 0,
      color: datePicker.textColor,
      padding: 20,
      boxSizing: 'border-box'
    },
    monthDay: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 20,
      lineHeight: '22px',
      height: props.mode === 'landscape' ? '100%' : 44,
      marginTop: '6px',
      opacity: selectedYear ? 0.7 : 1,
      width: '100%',
      fontWeight: '500'
    },

    trans: {
      transition: _transitions2.default.easeOut(),
      height: '50%'
    },

    endTitle: {
      opacity: props.edit === 'end' ? 1 : 0.7,
      textAlign: 'right',
      cursor: 'pointer'
    },
    startTitle: {
      opacity: props.edit === 'start' ? 1 : 0.7,
      textAlign: 'left',
      cursor: 'pointer'
    },

    endDateTitle: {
      opacity: props.edit === 'end' && !props.displayTime ? 1 : 0.7,
      textAlign: 'right',
      cursor: 'pointer',
      width: '100%'
    },
    startDateTitle: {
      opacity: props.edit === 'start' && !props.displayTime ? 1 : 0.7,
      textAlign: 'left',
      cursor: 'pointer',
      width: '100%'
    },

    endTimeTitle: {
      opacity: props.edit === 'end' && props.displayTime ? 1 : 0.7,
      textAlign: 'right',
      cursor: 'pointer',
      width: '100%'
    },
    startTimeTitle: {
      opacity: props.edit === 'start' && props.displayTime ? 1 : 0.7,
      textAlign: 'left',
      cursor: 'pointer',
      width: '100%'
    },

    month: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 22,
      lineHeight: '24px',
      height: props.mode === 'landscape' ? '100%' : 26,
      transition: _transitions2.default.easeOut(),
      width: '100%',
      fontWeight: '500'
    },

    year: {
      margin: 0,
      fontSize: 16,
      fontWeight: '500',
      lineHeight: '16px',
      height: 16,
      opacity: selectedYear ? 1 : 0.7,
      transition: _transitions2.default.easeOut(),
      marginBottom: 10
    },
    yearTitle: {
      cursor: props.disableYearSelection || selectedYear ? 'default' : 'pointer'
    }
  };

  return styles;
}

var DateRangeDisplay = function (_Component) {
  _inherits(DateRangeDisplay, _Component);

  function DateRangeDisplay() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DateRangeDisplay);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DateRangeDisplay.__proto__ || Object.getPrototypeOf(DateRangeDisplay)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      selectedYear: false,
      transitionDirection: 'up'
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DateRangeDisplay, [{
    key: 'UNSAFE_componentWillMount',
    value: function UNSAFE_componentWillMount() {
      if (!this.props.monthDaySelected) {
        this.setState({ selectedYear: true });
      }
    }
  }, {
    key: 'UNSAFE_componentWillReceiveProps',
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (nextProps.start.selectedDate !== this.props.start.selectedDate) {
        var direction = nextProps.start.selectedDate > this.props.start.selectedDate ? 'up' : 'down';
        this.setState({
          transitionDirection: direction
        });
      }

      if (nextProps.end.selectedDate !== this.props.end.selectedDate) {
        var _direction = nextProps.end.selectedDate > this.props.end.selectedDate ? 'up' : 'down';
        this.setState({
          transitionDirection: _direction
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          DateTimeFormat = _props.DateTimeFormat,
          disableYearSelection = _props.disableYearSelection,
          displayTime = _props.displayTime,
          locale = _props.locale,
          mode = _props.mode,
          monthDaySelected = _props.monthDaySelected,
          onTouchTapMonthDay = _props.onTouchTapMonthDay,
          onTouchTapYear = _props.onTouchTapYear,
          onTouchTapMenu = _props.onTouchTapMenu,
          end = _props.end,
          edit = _props.edit,
          start = _props.start,
          style = _props.style,
          other = _objectWithoutProperties(_props, ['DateTimeFormat', 'disableYearSelection', 'displayTime', 'locale', 'mode', 'monthDaySelected', 'onTouchTapMonthDay', 'onTouchTapYear', 'onTouchTapMenu', 'end', 'edit', 'start', 'style']);

      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context, this.state);

      var selectedStartDate = this.props.start.selectedDate;
      var selectedEndDate = this.props.end.selectedDate;

      var startDate = new DateTimeFormat(locale, {
        month: 'short',
        weekday: 'short',
        day: '2-digit'
      }).format(selectedStartDate);

      var startTime = selectedStartDate.toLocaleString(locale, { hour: 'numeric', hour12: true });

      var endDate = new DateTimeFormat(locale, {
        month: 'short',
        weekday: 'short',
        day: '2-digit'
      }).format(selectedEndDate);

      var endTime = selectedEndDate.toLocaleString(locale, { hour: 'numeric', hour12: true });

      return _react2.default.createElement(
        'div',
        _extends({}, other, { style: prepareStyles(styles.root, style) }),
        _react2.default.createElement(
          'div',
          { style: styles.month },
          _react2.default.createElement(
            'div',
            { style: styles.startTitle },
            'Pick Up'
          ),
          _react2.default.createElement(
            'div',
            { style: styles.endTitle },
            'Drop Off'
          )
        ),
        _react2.default.createElement(
          'div',
          { style: styles.monthDay },
          _react2.default.createElement(
            'div',
            { key: 'start-' + startDate, style: { position: 'unset', width: '50%', top: 'unset', left: 'unset' } },
            _react2.default.createElement(
              'div',
              { onClick: onTouchTapMenu.bind(this, 'start', false), style: styles.startDateTitle },
              startDate
            ),
            _react2.default.createElement(
              'div',
              { onClick: onTouchTapMenu.bind(this, 'start', true), style: styles.startTimeTitle },
              startTime
            )
          ),
          _react2.default.createElement(
            'div',
            { key: 'end-' + endDate, style: { position: 'unset', width: '50%', top: 'unset', left: 'unset' } },
            _react2.default.createElement(
              'div',
              { onClick: onTouchTapMenu.bind(this, 'end', false), style: styles.endDateTitle },
              endDate
            ),
            _react2.default.createElement(
              'div',
              { onClick: onTouchTapMenu.bind(this, 'end', true), style: styles.endTimeTitle },
              endTime
            )
          )
        )
      );
    }
  }]);

  return DateRangeDisplay;
}(_react.Component);

DateRangeDisplay.propTypes = {
  DateTimeFormat: _propTypes2.default.func.isRequired,
  disableYearSelection: _propTypes2.default.bool,
  displayTime: _propTypes2.default.bool,
  edit: _propTypes2.default.string,
  end: _propTypes2.default.object,
  locale: _propTypes2.default.string.isRequired,
  mode: _propTypes2.default.oneOf(['portrait', 'landscape']),
  monthDaySelected: _propTypes2.default.bool,
  onTouchTapMenu: _propTypes2.default.func,
  onTouchTapMonthDay: _propTypes2.default.func,
  onTouchTapYear: _propTypes2.default.func,
  start: _propTypes2.default.object,
  style: _propTypes2.default.object
};
DateRangeDisplay.defaultProps = {
  monthDaySelected: true
};
DateRangeDisplay.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
exports.default = DateRangeDisplay;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9EYXRlUGlja2VyL0RhdGVSYW5nZURpc3BsYXkuanMiXSwibmFtZXMiOlsiZ2V0U3R5bGVzIiwicHJvcHMiLCJjb250ZXh0Iiwic3RhdGUiLCJkYXRlUGlja2VyIiwibXVpVGhlbWUiLCJzZWxlY3RlZFllYXIiLCJpc0xhbmRzY2FwZSIsIm1vZGUiLCJzdHlsZXMiLCJyb290Iiwid2lkdGgiLCJoZWlnaHQiLCJmbG9hdCIsImZvbnRXZWlnaHQiLCJkaXNwbGF5IiwiYmFja2dyb3VuZENvbG9yIiwiaGVhZGVyQ29sb3IiLCJib3JkZXJUb3BMZWZ0UmFkaXVzIiwiYm9yZGVyVG9wUmlnaHRSYWRpdXMiLCJib3JkZXJCb3R0b21MZWZ0UmFkaXVzIiwiY29sb3IiLCJ0ZXh0Q29sb3IiLCJwYWRkaW5nIiwiYm94U2l6aW5nIiwibW9udGhEYXkiLCJqdXN0aWZ5Q29udGVudCIsImZvbnRTaXplIiwibGluZUhlaWdodCIsIm1hcmdpblRvcCIsIm9wYWNpdHkiLCJ0cmFucyIsInRyYW5zaXRpb24iLCJ0cmFuc2l0aW9ucyIsImVhc2VPdXQiLCJlbmRUaXRsZSIsImVkaXQiLCJ0ZXh0QWxpZ24iLCJjdXJzb3IiLCJzdGFydFRpdGxlIiwiZW5kRGF0ZVRpdGxlIiwiZGlzcGxheVRpbWUiLCJzdGFydERhdGVUaXRsZSIsImVuZFRpbWVUaXRsZSIsInN0YXJ0VGltZVRpdGxlIiwibW9udGgiLCJ5ZWFyIiwibWFyZ2luIiwibWFyZ2luQm90dG9tIiwieWVhclRpdGxlIiwiZGlzYWJsZVllYXJTZWxlY3Rpb24iLCJEYXRlUmFuZ2VEaXNwbGF5IiwidHJhbnNpdGlvbkRpcmVjdGlvbiIsIm1vbnRoRGF5U2VsZWN0ZWQiLCJzZXRTdGF0ZSIsIm5leHRQcm9wcyIsInN0YXJ0Iiwic2VsZWN0ZWREYXRlIiwiZGlyZWN0aW9uIiwiZW5kIiwiRGF0ZVRpbWVGb3JtYXQiLCJsb2NhbGUiLCJvblRvdWNoVGFwTW9udGhEYXkiLCJvblRvdWNoVGFwWWVhciIsIm9uVG91Y2hUYXBNZW51Iiwic3R5bGUiLCJvdGhlciIsInByZXBhcmVTdHlsZXMiLCJzZWxlY3RlZFN0YXJ0RGF0ZSIsInNlbGVjdGVkRW5kRGF0ZSIsInN0YXJ0RGF0ZSIsIndlZWtkYXkiLCJkYXkiLCJmb3JtYXQiLCJzdGFydFRpbWUiLCJ0b0xvY2FsZVN0cmluZyIsImhvdXIiLCJob3VyMTIiLCJlbmREYXRlIiwiZW5kVGltZSIsInBvc2l0aW9uIiwidG9wIiwibGVmdCIsImJpbmQiLCJDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJmdW5jIiwiaXNSZXF1aXJlZCIsImJvb2wiLCJzdHJpbmciLCJvYmplY3QiLCJvbmVPZiIsImRlZmF1bHRQcm9wcyIsImNvbnRleHRUeXBlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFQSxTQUFTQSxTQUFULENBQW1CQyxLQUFuQixFQUEwQkMsT0FBMUIsRUFBbUNDLEtBQW5DLEVBQTBDO0FBQUEsTUFDakNDLFVBRGlDLEdBQ25CRixRQUFRRyxRQURXLENBQ2pDRCxVQURpQztBQUFBLE1BRWpDRSxZQUZpQyxHQUVqQkgsS0FGaUIsQ0FFakNHLFlBRmlDOztBQUd4QyxNQUFNQyxjQUFjTixNQUFNTyxJQUFOLEtBQWUsV0FBbkM7O0FBRUEsTUFBTUMsU0FBUztBQUNiQyxVQUFNO0FBQ0pDLGFBQU9KLGNBQWMsR0FBZCxHQUFvQixNQUR2QjtBQUVKSyxjQUFRTCxjQUFjLEdBQWQsR0FBb0IsTUFGeEI7QUFHSk0sYUFBT04sY0FBYyxNQUFkLEdBQXVCLE1BSDFCO0FBSUpPLGtCQUFZLEdBSlI7QUFLSkMsZUFBUyxjQUxMO0FBTUpDLHVCQUFpQlosV0FBV2EsV0FOeEI7QUFPSkMsMkJBQXFCLENBUGpCO0FBUUpDLDRCQUFzQlosY0FBYyxDQUFkLEdBQWtCLENBUnBDO0FBU0phLDhCQUF3QmIsY0FBYyxDQUFkLEdBQWtCLENBVHRDO0FBVUpjLGFBQU9qQixXQUFXa0IsU0FWZDtBQVdKQyxlQUFT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QyxZQUFwRTtBQUNHb0M7QUFESDtBQUpGO0FBVkY7QUFQRixPQURGO0FBNkJEOzs7O0VBekg0QkssZ0I7O0FBQXpCakMsZ0IsQ0FDR2tDLFMsR0FBWTtBQUNqQnpCLGtCQUFnQjBCLG9CQUFVQyxJQUFWLENBQWVDLFVBRGQ7QUFFakJ0Qyx3QkFBc0JvQyxvQkFBVUcsSUFGZjtBQUdqQmhELGVBQWE2QyxvQkFBVUcsSUFITjtBQUlqQnJELFFBQU1rRCxvQkFBVUksTUFKQztBQUtqQi9CLE9BQUsyQixvQkFBVUssTUFMRTtBQU1qQjlCLFVBQVF5QixvQkFBVUksTUFBVixDQUFpQkYsVUFOUjtBQU9qQmhGLFFBQU04RSxvQkFBVU0sS0FBVixDQUFnQixDQUFDLFVBQUQsRUFBYSxXQUFiLENBQWhCLENBUFc7QUFRakJ2QyxvQkFBa0JpQyxvQkFBVUcsSUFSWDtBQVNqQnpCLGtCQUFnQnNCLG9CQUFVQyxJQVRUO0FBVWpCekIsc0JBQW9Cd0Isb0JBQVVDLElBVmI7QUFXakJ4QixrQkFBZ0J1QixvQkFBVUMsSUFYVDtBQVlqQi9CLFNBQU84QixvQkFBVUssTUFaQTtBQWFqQjFCLFNBQU9xQixvQkFBVUs7QUFiQSxDO0FBRGZ4QyxnQixDQWlCRzBDLFksR0FBZTtBQUNwQnhDLG9CQUFrQjtBQURFLEM7QUFqQmxCRixnQixDQXFCRzJDLFksR0FBZTtBQUNwQnpGLFlBQVVpRixvQkFBVUssTUFBVixDQUFpQkg7QUFEUCxDO2tCQXVHVHJDLGdCIiwiZmlsZSI6IkRhdGVSYW5nZURpc3BsYXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgdHJhbnNpdGlvbnMgZnJvbSAnLi4vc3R5bGVzL3RyYW5zaXRpb25zJztcblxuZnVuY3Rpb24gZ2V0U3R5bGVzKHByb3BzLCBjb250ZXh0LCBzdGF0ZSkge1xuICBjb25zdCB7ZGF0ZVBpY2tlcn0gPSBjb250ZXh0Lm11aVRoZW1lO1xuICBjb25zdCB7c2VsZWN0ZWRZZWFyfSA9IHN0YXRlO1xuICBjb25zdCBpc0xhbmRzY2FwZSA9IHByb3BzLm1vZGUgPT09ICdsYW5kc2NhcGUnO1xuXG4gIGNvbnN0IHN0eWxlcyA9IHtcbiAgICByb290OiB7XG4gICAgICB3aWR0aDogaXNMYW5kc2NhcGUgPyAxNjUgOiAnMTAwJScsXG4gICAgICBoZWlnaHQ6IGlzTGFuZHNjYXBlID8gMzMwIDogJ2F1dG8nLFxuICAgICAgZmxvYXQ6IGlzTGFuZHNjYXBlID8gJ2xlZnQnIDogJ25vbmUnLFxuICAgICAgZm9udFdlaWdodDogNzAwLFxuICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IGRhdGVQaWNrZXIuaGVhZGVyQ29sb3IsXG4gICAgICBib3JkZXJUb3BMZWZ0UmFkaXVzOiAyLFxuICAgICAgYm9yZGVyVG9wUmlnaHRSYWRpdXM6IGlzTGFuZHNjYXBlID8gMCA6IDIsXG4gICAgICBib3JkZXJCb3R0b21MZWZ0UmFkaXVzOiBpc0xhbmRzY2FwZSA/IDIgOiAwLFxuICAgICAgY29sb3I6IGRhdGVQaWNrZXIudGV4dENvbG9yLFxuICAgICAgcGFkZGluZzogMjAsXG4gICAgICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgICB9LFxuICAgIG1vbnRoRGF5OiB7XG4gICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLFxuICAgICAgZm9udFNpemU6IDIwLFxuICAgICAgbGluZUhlaWdodDogJzIycHgnLFxuICAgICAgaGVpZ2h0OiBwcm9wcy5tb2RlID09PSAnbGFuZHNjYXBlJyA/ICcxMDAlJyA6IDQ0LFxuICAgICAgbWFyZ2luVG9wOiAnNnB4JyxcbiAgICAgIG9wYWNpdHk6IHNlbGVjdGVkWWVhciA/IDAuNyA6IDEsXG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgZm9udFdlaWdodDogJzUwMCcsXG4gICAgfSxcblxuICAgIHRyYW5zOiB7XG4gICAgICB0cmFuc2l0aW9uOiB0cmFuc2l0aW9ucy5lYXNlT3V0KCksXG4gICAgICBoZWlnaHQ6ICc1MCUnLFxuICAgIH0sXG5cbiAgICBlbmRUaXRsZToge1xuICAgICAgb3BhY2l0eTogcHJvcHMuZWRpdCA9PT0gJ2VuZCcgPyAxIDogMC43LFxuICAgICAgdGV4dEFsaWduOiAncmlnaHQnLFxuICAgICAgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgfSxcbiAgICBzdGFydFRpdGxlOiB7XG4gICAgICBvcGFjaXR5OiBwcm9wcy5lZGl0ID09PSAnc3RhcnQnID8gMSA6IDAuNyxcbiAgICAgIHRleHRBbGlnbjogJ2xlZnQnLFxuICAgICAgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgfSxcblxuICAgIGVuZERhdGVUaXRsZToge1xuICAgICAgb3BhY2l0eTogcHJvcHMuZWRpdCA9PT0gJ2VuZCcgJiYgIXByb3BzLmRpc3BsYXlUaW1lID8gMSA6IDAuNyxcbiAgICAgIHRleHRBbGlnbjogJ3JpZ2h0JyxcbiAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICB9LFxuICAgIHN0YXJ0RGF0ZVRpdGxlOiB7XG4gICAgICBvcGFjaXR5OiBwcm9wcy5lZGl0ID09PSAnc3RhcnQnICYmICFwcm9wcy5kaXNwbGF5VGltZSA/IDEgOiAwLjcsXG4gICAgICB0ZXh0QWxpZ246ICdsZWZ0JyxcbiAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICB9LFxuXG4gICAgZW5kVGltZVRpdGxlOiB7XG4gICAgICBvcGFjaXR5OiBwcm9wcy5lZGl0ID09PSAnZW5kJyAmJiBwcm9wcy5kaXNwbGF5VGltZSA/IDEgOiAwLjcsXG4gICAgICB0ZXh0QWxpZ246ICdyaWdodCcsXG4gICAgICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgfSxcbiAgICBzdGFydFRpbWVUaXRsZToge1xuICAgICAgb3BhY2l0eTogcHJvcHMuZWRpdCA9PT0gJ3N0YXJ0JyAmJiBwcm9wcy5kaXNwbGF5VGltZSA/IDEgOiAwLjcsXG4gICAgICB0ZXh0QWxpZ246ICdsZWZ0JyxcbiAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICB9LFxuXG4gICAgbW9udGg6IHtcbiAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsXG4gICAgICBmb250U2l6ZTogMjIsXG4gICAgICBsaW5lSGVpZ2h0OiAnMjRweCcsXG4gICAgICBoZWlnaHQ6IHByb3BzLm1vZGUgPT09ICdsYW5kc2NhcGUnID8gJzEwMCUnIDogMjYsXG4gICAgICB0cmFuc2l0aW9uOiB0cmFuc2l0aW9ucy5lYXNlT3V0KCksXG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgZm9udFdlaWdodDogJzUwMCcsXG4gICAgfSxcblxuXG4gICAgeWVhcjoge1xuICAgICAgbWFyZ2luOiAwLFxuICAgICAgZm9udFNpemU6IDE2LFxuICAgICAgZm9udFdlaWdodDogJzUwMCcsXG4gICAgICBsaW5lSGVpZ2h0OiAnMTZweCcsXG4gICAgICBoZWlnaHQ6IDE2LFxuICAgICAgb3BhY2l0eTogc2VsZWN0ZWRZZWFyID8gMSA6IDAuNyxcbiAgICAgIHRyYW5zaXRpb246IHRyYW5zaXRpb25zLmVhc2VPdXQoKSxcbiAgICAgIG1hcmdpbkJvdHRvbTogMTAsXG4gICAgfSxcbiAgICB5ZWFyVGl0bGU6IHtcbiAgICAgIGN1cnNvcjogcHJvcHMuZGlzYWJsZVllYXJTZWxlY3Rpb24gfHwgc2VsZWN0ZWRZZWFyID8gJ2RlZmF1bHQnIDogJ3BvaW50ZXInLFxuICAgIH0sXG4gIH07XG5cbiAgcmV0dXJuIHN0eWxlcztcbn1cblxuY2xhc3MgRGF0ZVJhbmdlRGlzcGxheSBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgRGF0ZVRpbWVGb3JtYXQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgZGlzYWJsZVllYXJTZWxlY3Rpb246IFByb3BUeXBlcy5ib29sLFxuICAgIGRpc3BsYXlUaW1lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBlZGl0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGVuZDogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBtb2RlOiBQcm9wVHlwZXMub25lT2YoWydwb3J0cmFpdCcsICdsYW5kc2NhcGUnXSksXG4gICAgbW9udGhEYXlTZWxlY3RlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25Ub3VjaFRhcE1lbnU6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uVG91Y2hUYXBNb250aERheTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25Ub3VjaFRhcFllYXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIHN0YXJ0OiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIHN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgbW9udGhEYXlTZWxlY3RlZDogdHJ1ZSxcbiAgfTtcblxuICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgIG11aVRoZW1lOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIH07XG5cbiAgc3RhdGUgPSB7XG4gICAgc2VsZWN0ZWRZZWFyOiBmYWxzZSxcbiAgICB0cmFuc2l0aW9uRGlyZWN0aW9uOiAndXAnLFxuICB9O1xuXG4gIFVOU0FGRV9jb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgaWYgKCF0aGlzLnByb3BzLm1vbnRoRGF5U2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkWWVhcjogdHJ1ZX0pO1xuICAgIH1cbiAgfVxuXG4gIFVOU0FGRV9jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIGlmIChuZXh0UHJvcHMuc3RhcnQuc2VsZWN0ZWREYXRlICE9PSB0aGlzLnByb3BzLnN0YXJ0LnNlbGVjdGVkRGF0ZSkge1xuICAgICAgY29uc3QgZGlyZWN0aW9uID0gbmV4dFByb3BzLnN0YXJ0LnNlbGVjdGVkRGF0ZSA+IHRoaXMucHJvcHMuc3RhcnQuc2VsZWN0ZWREYXRlID8gJ3VwJyA6ICdkb3duJztcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICB0cmFuc2l0aW9uRGlyZWN0aW9uOiBkaXJlY3Rpb24sXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAobmV4dFByb3BzLmVuZC5zZWxlY3RlZERhdGUgIT09IHRoaXMucHJvcHMuZW5kLnNlbGVjdGVkRGF0ZSkge1xuICAgICAgY29uc3QgZGlyZWN0aW9uID0gbmV4dFByb3BzLmVuZC5zZWxlY3RlZERhdGUgPiB0aGlzLnByb3BzLmVuZC5zZWxlY3RlZERhdGUgPyAndXAnIDogJ2Rvd24nO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHRyYW5zaXRpb25EaXJlY3Rpb246IGRpcmVjdGlvbixcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBEYXRlVGltZUZvcm1hdCxcbiAgICAgIGRpc2FibGVZZWFyU2VsZWN0aW9uLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICBkaXNwbGF5VGltZSwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgbG9jYWxlLFxuICAgICAgbW9kZSwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgbW9udGhEYXlTZWxlY3RlZCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgb25Ub3VjaFRhcE1vbnRoRGF5LCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICBvblRvdWNoVGFwWWVhciwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgb25Ub3VjaFRhcE1lbnUsXG4gICAgICBlbmQsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIGVkaXQsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIHN0YXJ0LCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICBzdHlsZSxcbiAgICAgIC4uLm90aGVyXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCB7cHJlcGFyZVN0eWxlc30gPSB0aGlzLmNvbnRleHQubXVpVGhlbWU7XG4gICAgY29uc3Qgc3R5bGVzID0gZ2V0U3R5bGVzKHRoaXMucHJvcHMsIHRoaXMuY29udGV4dCwgdGhpcy5zdGF0ZSk7XG5cbiAgICBjb25zdCBzZWxlY3RlZFN0YXJ0RGF0ZSA9IHRoaXMucHJvcHMuc3RhcnQuc2VsZWN0ZWREYXRlO1xuICAgIGNvbnN0IHNlbGVjdGVkRW5kRGF0ZSA9IHRoaXMucHJvcHMuZW5kLnNlbGVjdGVkRGF0ZTtcblxuICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IG5ldyBEYXRlVGltZUZvcm1hdChsb2NhbGUsIHtcbiAgICAgIG1vbnRoOiAnc2hvcnQnLFxuICAgICAgd2Vla2RheTogJ3Nob3J0JyxcbiAgICAgIGRheTogJzItZGlnaXQnLFxuICAgIH0pLmZvcm1hdChzZWxlY3RlZFN0YXJ0RGF0ZSk7XG5cbiAgICBjb25zdCBzdGFydFRpbWUgPSBzZWxlY3RlZFN0YXJ0RGF0ZS50b0xvY2FsZVN0cmluZyhsb2NhbGUsIHtob3VyOiAnbnVtZXJpYycsIGhvdXIxMjogdHJ1ZX0pO1xuXG4gICAgY29uc3QgZW5kRGF0ZSA9IG5ldyBEYXRlVGltZUZvcm1hdChsb2NhbGUsIHtcbiAgICAgIG1vbnRoOiAnc2hvcnQnLFxuICAgICAgd2Vla2RheTogJ3Nob3J0JyxcbiAgICAgIGRheTogJzItZGlnaXQnLFxuICAgIH0pLmZvcm1hdChzZWxlY3RlZEVuZERhdGUpO1xuXG4gICAgY29uc3QgZW5kVGltZSA9IHNlbGVjdGVkRW5kRGF0ZS50b0xvY2FsZVN0cmluZyhsb2NhbGUsIHtob3VyOiAnbnVtZXJpYycsIGhvdXIxMjogdHJ1ZX0pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgey4uLm90aGVyfSBzdHlsZT17cHJlcGFyZVN0eWxlcyhzdHlsZXMucm9vdCwgc3R5bGUpfT5cblxuICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubW9udGh9PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5zdGFydFRpdGxlfT5QaWNrIFVwPC9kaXY+XG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVuZFRpdGxlfT5Ecm9wIE9mZjwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubW9udGhEYXl9PlxuICAgICAgICAgIDxkaXYga2V5PXtgc3RhcnQtJHtzdGFydERhdGV9YH0gc3R5bGU9e3twb3NpdGlvbjogJ3Vuc2V0Jywgd2lkdGg6ICc1MCUnLCB0b3A6ICd1bnNldCcsIGxlZnQ6ICd1bnNldCd9fT5cbiAgICAgICAgICAgIDxkaXYgb25DbGljaz17b25Ub3VjaFRhcE1lbnUuYmluZCh0aGlzLCAnc3RhcnQnLCBmYWxzZSl9IHN0eWxlPXtzdHlsZXMuc3RhcnREYXRlVGl0bGV9PlxuICAgICAgICAgICAgICB7c3RhcnREYXRlfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IG9uQ2xpY2s9e29uVG91Y2hUYXBNZW51LmJpbmQodGhpcywgJ3N0YXJ0JywgdHJ1ZSl9IHN0eWxlPXtzdHlsZXMuc3RhcnRUaW1lVGl0bGV9PlxuICAgICAgICAgICAgICB7c3RhcnRUaW1lfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGtleT17YGVuZC0ke2VuZERhdGV9YH0gc3R5bGU9e3twb3NpdGlvbjogJ3Vuc2V0Jywgd2lkdGg6ICc1MCUnLCB0b3A6ICd1bnNldCcsIGxlZnQ6ICd1bnNldCd9fT5cbiAgICAgICAgICAgIDxkaXYgb25DbGljaz17b25Ub3VjaFRhcE1lbnUuYmluZCh0aGlzLCAnZW5kJywgZmFsc2UpfSBzdHlsZT17c3R5bGVzLmVuZERhdGVUaXRsZX0+XG4gICAgICAgICAgICAgIHtlbmREYXRlfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IG9uQ2xpY2s9e29uVG91Y2hUYXBNZW51LmJpbmQodGhpcywgJ2VuZCcsIHRydWUpfSBzdHlsZT17c3R5bGVzLmVuZFRpbWVUaXRsZX0+XG4gICAgICAgICAgICAgIHtlbmRUaW1lfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEYXRlUmFuZ2VEaXNwbGF5O1xuIl19