'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactEventListener = require('react-event-listener');

var _reactEventListener2 = _interopRequireDefault(_reactEventListener);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _transitions = require('../styles/transitions');

var _transitions2 = _interopRequireDefault(_transitions);

var _RangeCalendarMonth = require('./RangeCalendarMonth');

var _RangeCalendarMonth2 = _interopRequireDefault(_RangeCalendarMonth);

var _CalendarToolbar = require('./CalendarToolbar');

var _CalendarToolbar2 = _interopRequireDefault(_CalendarToolbar);

var _RangeTimePicker = require('./RangeTimePicker');

var _RangeTimePicker2 = _interopRequireDefault(_RangeTimePicker);

var _SlideIn = require('../internal/SlideIn');

var _SlideIn2 = _interopRequireDefault(_SlideIn);

var _parseNum = require('parse-num');

var _parseNum2 = _interopRequireDefault(_parseNum);

var _dateUtils = require('./dateUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var daysArray = [].concat(_toConsumableArray(Array(7)));

var RangeCalendar = function (_Component) {
  _inherits(RangeCalendar, _Component);

  function RangeCalendar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, RangeCalendar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RangeCalendar.__proto__ || Object.getPrototypeOf(RangeCalendar)).call.apply(_ref, [this].concat(args))), _this), _this.calendarRefs = {}, _this.handleWindowKeyDown = function (event) {
      if (_this.props.open) {
        switch ((0, _keycode2.default)(event)) {
          case 'up':
            if (event.altKey && event.shiftKey) {
              _this.addSelectedYears(-1);
            } else if (event.shiftKey) {
              _this.addSelectedMonths(-1);
            } else {
              _this.addSelectedDays(-7);
            }
            break;

          case 'down':
            if (event.altKey && event.shiftKey) {
              _this.addSelectedYears(1);
            } else if (event.shiftKey) {
              _this.addSelectedMonths(1);
            } else {
              _this.addSelectedDays(7);
            }
            break;

          case 'right':
            if (event.altKey && event.shiftKey) {
              _this.addSelectedYears(1);
            } else if (event.shiftKey) {
              _this.addSelectedMonths(1);
            } else {
              _this.addSelectedDays(1);
            }
            break;

          case 'left':
            if (event.altKey && event.shiftKey) {
              _this.addSelectedYears(-1);
            } else if (event.shiftKey) {
              _this.addSelectedMonths(-1);
            } else {
              _this.addSelectedDays(-1);
            }
            break;
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RangeCalendar, [{
    key: 'getMinDate',
    value: function getMinDate() {
      return this.props[this.props.edit].minDate || this.props.utils.addYears(new Date(), -100);
    }
  }, {
    key: 'getMaxDate',
    value: function getMaxDate() {
      return this.props[this.props.edit].maxDate || this.props.utils.addYears(new Date(), 100);
    }
  }, {
    key: 'getSelectedDate',
    value: function getSelectedDate() {
      return this.props[this.props.edit].selectedDate;
    }
  }, {
    key: 'isSelectedDateDisabled',
    value: function isSelectedDateDisabled() {
      if (this.calendarRefs.calendar) {
        return this.calendarRefs.calendar.isSelectedDateDisabled();
      } else {
        return false;
      }
    }
  }, {
    key: 'addSelectedDays',
    value: function addSelectedDays(days) {
      this.props.setSelectedDate(this.props.utils.addDays(this.props[this.props.edit].selectedDate, days));
    }
  }, {
    key: 'addSelectedMonths',
    value: function addSelectedMonths(months) {
      this.props.setSelectedDate(this.props.utils.addMonths(this.props[this.props.edit].selectedDate, months));
    }
  }, {
    key: 'addSelectedYears',
    value: function addSelectedYears(years) {
      this.props.setSelectedDate(this.props.utils.addYears(this.props[this.props.edit].selectedDate, years));
    }
  }, {
    key: 'getToolbarInteractions',
    value: function getToolbarInteractions() {
      var _props = this.props,
          edit = _props.edit,
          end = _props.end,
          start = _props.start;

      if (edit === 'end' && !end.displayDate) {
        return {
          prevMonth: this.props.utils.monthDiff(start.displayDate, this.getMinDate()) > 0,
          nextMonth: this.props.utils.monthDiff(start.displayDate, this.getMaxDate()) < 0
        };
      } else {
        return {
          prevMonth: this.props.utils.monthDiff(this.props[this.props.edit].displayDate, this.getMinDate()) > 0,
          nextMonth: this.props.utils.monthDiff(this.props[this.props.edit].displayDate, this.getMaxDate()) < 0
        };
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var prepareStyles = this.context.muiTheme.prepareStyles;

      var toolbarInteractions = this.getToolbarInteractions();
      var calendarTextColor = this.context.muiTheme.datePicker.calendarTextColor;
      var _props2 = this.props,
          blockedDateTimeRanges = _props2.blockedDateTimeRanges,
          calendarDateWidth = _props2.calendarDateWidth,
          calendarTimeWidth = _props2.calendarTimeWidth,
          cancelLabel = _props2.cancelLabel,
          DateTimeFormat = _props2.DateTimeFormat,
          dayButtonSize = _props2.dayButtonSize,
          displayTime = _props2.displayTime,
          edit = _props2.edit,
          end = _props2.end,
          firstDayOfWeek = _props2.firstDayOfWeek,
          locale = _props2.locale,
          okLabel = _props2.okLabel,
          onTouchTapCancel = _props2.onTouchTapCancel,
          onTouchTapOk = _props2.onTouchTapOk,
          start = _props2.start,
          utils = _props2.utils;


      var width = displayTime ? calendarTimeWidth || '125px' : calendarDateWidth || '310px';
      var buttonStateSize = (0, _parseNum2.default)(dayButtonSize || '34px');
      var unit = (dayButtonSize || 'px').replace(/[0-9.]/g, '');

      var styles = {
        root: {
          color: calendarTextColor,
          userSelect: 'none',
          width: width
        },
        calendar: {
          display: 'flex',
          flexDirection: 'column'
        },
        calendarContainer: {
          display: 'flex',
          alignContent: 'space-between',
          justifyContent: 'space-between',
          flexDirection: 'column',
          fontSize: 12,
          fontWeight: 400,
          padding: '0px ' + buttonStateSize / 4 + unit,
          transition: _transitions2.default.easeOut()
        },
        yearContainer: {
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          height: 272,
          marginTop: 10,
          overflow: 'hidden',
          width: calendarDateWidth || '310px'
        },
        weekTitle: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          fontWeight: '500',
          height: 20,
          lineHeight: '15px',
          opacity: '0.5',
          textAlign: 'center'
        },
        weekTitleDay: {
          margin: 'auto',
          minWidth: dayButtonSize || '34px',
          minHeight: dayButtonSize || '34px'
        },
        transitionSlide: {
          height: 214
        }
      };

      var weekTitleDayStyle = prepareStyles(styles.weekTitleDay);

      return _react2.default.createElement(
        'div',
        { style: prepareStyles(styles.root) },
        _react2.default.createElement(_reactEventListener2.default, {
          target: 'window',
          onKeyDown: this.handleWindowKeyDown
        }),
        _react2.default.createElement(
          'div',
          { style: prepareStyles(styles.calendar) },
          !displayTime && _react2.default.createElement(
            'div',
            { style: prepareStyles(styles.calendarContainer) },
            _react2.default.createElement(_CalendarToolbar2.default, {
              DateTimeFormat: DateTimeFormat,
              locale: locale,
              displayDate: this.props[edit].displayDate ? this.props[edit].displayDate : start.displayDate,
              onMonthChange: this.props.onMonthChange,
              prevMonth: toolbarInteractions.prevMonth,
              nextMonth: toolbarInteractions.nextMonth
            }),
            _react2.default.createElement(
              'div',
              { style: prepareStyles(styles.weekTitle) },
              daysArray.map(function (event, i) {
                return _react2.default.createElement(
                  'span',
                  { key: i, style: weekTitleDayStyle },
                  (0, _dateUtils.localizedWeekday)(DateTimeFormat, locale, i, firstDayOfWeek)
                );
              })
            ),
            _react2.default.createElement(
              _SlideIn2.default,
              { direction: this.props[edit].transitionDirection, style: styles.transitionSlide },
              _react2.default.createElement(_RangeCalendarMonth2.default, {
                blockedDateTimeRanges: blockedDateTimeRanges,
                DateTimeFormat: DateTimeFormat,
                calendarDateWidth: calendarDateWidth,
                edit: edit,
                end: end,
                dayButtonSize: dayButtonSize,
                displayDate: this.props[edit].displayDate ? this.props[edit].displayDate : start.displayDate,
                firstDayOfWeek: this.props.firstDayOfWeek,
                key: this.props[edit].displayDate ? this.props[edit].displayDate.toDateString() : start.displayDate.toDateString(),
                locale: locale,
                onTouchTapDay: this.props.onTouchTapDay.bind(this),
                ref: function ref(_ref2) {
                  return _this2.calendarRefs.calendar = _ref2;
                },
                start: start,
                utils: utils
              })
            )
          ),
          displayTime && _react2.default.createElement(_RangeTimePicker2.default, {
            blockedDateTimeRanges: blockedDateTimeRanges,
            edit: edit,
            end: end,
            locale: locale,
            onTouchTapHour: this.props.onTouchTapHour.bind(this),
            start: start,
            utils: utils
          })
        )
      );
    }
  }]);

  return RangeCalendar;
}(_react.Component);

RangeCalendar.propTypes = {
  DateTimeFormat: _propTypes2.default.func.isRequired,
  autoOk: _propTypes2.default.bool,
  blockedDateTimeRanges: _propTypes2.default.array,
  calendarDateWidth: _propTypes2.default.string,
  calendarTimeWidth: _propTypes2.default.string,
  cancelLabel: _propTypes2.default.node,
  dayButtonSize: _propTypes2.default.string,
  disableYearSelection: _propTypes2.default.bool,
  displayTime: _propTypes2.default.bool,
  edit: _propTypes2.default.string.isRequired,
  end: _propTypes2.default.object.isRequired,
  firstDayOfWeek: _propTypes2.default.number,
  initialDate: _propTypes2.default.object,
  locale: _propTypes2.default.string.isRequired,
  mode: _propTypes2.default.oneOf(['portrait', 'landscape']),
  okLabel: _propTypes2.default.node,
  onMonthChange: _propTypes2.default.func,
  onTouchTapCancel: _propTypes2.default.func,
  onTouchTapDay: _propTypes2.default.func,
  onTouchTapHour: _propTypes2.default.func,
  onTouchTapOk: _propTypes2.default.func,
  open: _propTypes2.default.bool,
  openToYearSelection: _propTypes2.default.bool,
  setSelectedDate: _propTypes2.default.func.isRequired,
  start: _propTypes2.default.object.isRequired,
  utils: _propTypes2.default.object
};
RangeCalendar.defaultProps = {
  DateTimeFormat: _dateUtils.dateTimeFormat,
  disableYearSelection: false,
  displayTime: false,
  locale: 'en-US',
  utils: _dateUtils.defaultUtils
};
RangeCalendar.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
exports.default = RangeCalendar;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9EYXRlUGlja2VyL1JhbmdlQ2FsZW5kYXIuanMiXSwibmFtZXMiOlsiZGF5c0FycmF5IiwiQXJyYXkiLCJSYW5nZUNhbGVuZGFyIiwiY2FsZW5kYXJSZWZzIiwiaGFuZGxlV2luZG93S2V5RG93biIsImV2ZW50IiwicHJvcHMiLCJvcGVuIiwiYWx0S2V5Iiwic2hpZnRLZXkiLCJhZGRTZWxlY3RlZFllYXJzIiwiYWRkU2VsZWN0ZWRNb250aHMiLCJhZGRTZWxlY3RlZERheXMiLCJlZGl0IiwibWluRGF0ZSIsInV0aWxzIiwiYWRkWWVhcnMiLCJEYXRlIiwibWF4RGF0ZSIsInNlbGVjdGVkRGF0ZSIsImNhbGVuZGFyIiwiaXNTZWxlY3RlZERhdGVEaXNhYmxlZCIsImRheXMiLCJzZXRTZWxlY3RlZERhdGUiLCJhZGREYXlzIiwibW9udGhzIiwiYWRkTW9udGhzIiwieWVhcnMiLCJlbmQiLCJzdGFydCIsImRpc3BsYXlEYXRlIiwicHJldk1vbnRoIiwibW9udGhEaWZmIiwiZ2V0TWluRGF0ZSIsIm5leHRNb250aCIsImdldE1heERhdGUiLCJwcmVwYXJlU3R5bGVzIiwiY29udGV4dCIsIm11aVRoZW1lIiwidG9vbGJhckludGVyYWN0aW9ucyIsImdldFRvb2xiYXJJbnRlcmFjdGlvbnMiLCJjYWxlbmRhclRleHRDb2xvciIsImRhdGVQaWNrZXIiLCJibG9ja2VkRGF0ZVRpbWVSYW5nZXMiLCJjYWxlbmRhckRhdGVXaWR0aCIsImNhbGVuZGFyVGltZVdpZHRoIiwiY2FuY2VsTGFiZWwiLCJEYXRlVGltZUZvcm1hdCIsImRheUJ1dHRvblNpemUiLCJkaXNwbGF5VGltZSIsImZpcnN0RGF5T2ZXZWVrIiwibG9jYWxlIiwib2tMYWJlbCIsIm9uVG91Y2hUYXBDYW5jZWwiLCJvblRvdWNoVGFwT2siLCJ3aWR0aCIsImJ1dHRvblN0YXRlU2l6ZSIsInVuaXQiLCJyZXBsYWNlIiwic3R5bGVzIiwicm9vdCIsImNvbG9yIiwidXNlclNlbGVjdCIsImRpc3BsYXkiLCJmbGV4RGlyZWN0aW9uIiwiY2FsZW5kYXJDb250YWluZXIiLCJhbGlnbkNvbnRlbnQiLCJqdXN0aWZ5Q29udGVudCIsImZvbnRTaXplIiwiZm9udFdlaWdodCIsInBhZGRpbmciLCJ0cmFuc2l0aW9uIiwidHJhbnNpdGlvbnMiLCJlYXNlT3V0IiwieWVhckNvbnRhaW5lciIsImhlaWdodCIsIm1hcmdpblRvcCIsIm92ZXJmbG93Iiwid2Vla1RpdGxlIiwibGluZUhlaWdodCIsIm9wYWNpdHkiLCJ0ZXh0QWxpZ24iLCJ3ZWVrVGl0bGVEYXkiLCJtYXJnaW4iLCJtaW5XaWR0aCIsIm1pbkhlaWdodCIsInRyYW5zaXRpb25TbGlkZSIsIndlZWtUaXRsZURheVN0eWxlIiwib25Nb250aENoYW5nZSIsIm1hcCIsImkiLCJ0cmFuc2l0aW9uRGlyZWN0aW9uIiwidG9EYXRlU3RyaW5nIiwib25Ub3VjaFRhcERheSIsImJpbmQiLCJyZWYiLCJvblRvdWNoVGFwSG91ciIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsImZ1bmMiLCJpc1JlcXVpcmVkIiwiYXV0b09rIiwiYm9vbCIsImFycmF5Iiwic3RyaW5nIiwibm9kZSIsImRpc2FibGVZZWFyU2VsZWN0aW9uIiwib2JqZWN0IiwibnVtYmVyIiwiaW5pdGlhbERhdGUiLCJtb2RlIiwib25lT2YiLCJvcGVuVG9ZZWFyU2VsZWN0aW9uIiwiZGVmYXVsdFByb3BzIiwiZGF0ZVRpbWVGb3JtYXQiLCJkZWZhdWx0VXRpbHMiLCJjb250ZXh0VHlwZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0FBTUEsSUFBTUEseUNBQWdCQyxNQUFNLENBQU4sQ0FBaEIsRUFBTjs7SUFFTUMsYTs7Ozs7Ozs7Ozs7Ozs7b01BMENKQyxZLEdBQWUsRSxRQWlEZkMsbUIsR0FBc0IsVUFB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QWU7QUFDcEIvRSxZQUFVNkQsb0JBQVVTLE1BQVYsQ0FBaUJQO0FBRFAsQztrQkErT1RuRyxhIiwiZmlsZSI6IlJhbmdlQ2FsZW5kYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgRXZlbnRMaXN0ZW5lciBmcm9tICdyZWFjdC1ldmVudC1saXN0ZW5lcic7XG5pbXBvcnQga2V5Y29kZSBmcm9tICdrZXljb2RlJztcbmltcG9ydCB0cmFuc2l0aW9ucyBmcm9tICcuLi9zdHlsZXMvdHJhbnNpdGlvbnMnO1xuaW1wb3J0IFJhbmdlQ2FsZW5kYXJNb250aCBmcm9tICcuL1JhbmdlQ2FsZW5kYXJNb250aCc7XG5pbXBvcnQgQ2FsZW5kYXJUb29sYmFyIGZyb20gJy4vQ2FsZW5kYXJUb29sYmFyJztcbmltcG9ydCBSYW5nZVRpbWVQaWNrZXIgZnJvbSAnLi9SYW5nZVRpbWVQaWNrZXInO1xuaW1wb3J0IFNsaWRlSW5UcmFuc2l0aW9uR3JvdXAgZnJvbSAnLi4vaW50ZXJuYWwvU2xpZGVJbic7XG5pbXBvcnQgcGFyc2VOdW0gZnJvbSAncGFyc2UtbnVtJztcblxuaW1wb3J0IHtcbiAgZGVmYXVsdFV0aWxzLFxuICBkYXRlVGltZUZvcm1hdCxcbiAgbG9jYWxpemVkV2Vla2RheSxcbn0gZnJvbSAnLi9kYXRlVXRpbHMnO1xuXG5jb25zdCBkYXlzQXJyYXkgPSBbLi4uQXJyYXkoNyldO1xuXG5jbGFzcyBSYW5nZUNhbGVuZGFyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBEYXRlVGltZUZvcm1hdDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBhdXRvT2s6IFByb3BUeXBlcy5ib29sLFxuICAgIGJsb2NrZWREYXRlVGltZVJhbmdlczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGNhbGVuZGFyRGF0ZVdpZHRoOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNhbGVuZGFyVGltZVdpZHRoOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNhbmNlbExhYmVsOiBQcm9wVHlwZXMubm9kZSxcbiAgICBkYXlCdXR0b25TaXplOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRpc2FibGVZZWFyU2VsZWN0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkaXNwbGF5VGltZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgZWRpdDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGVuZDogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIGZpcnN0RGF5T2ZXZWVrOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGluaXRpYWxEYXRlOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIGxvY2FsZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIG1vZGU6IFByb3BUeXBlcy5vbmVPZihbJ3BvcnRyYWl0JywgJ2xhbmRzY2FwZSddKSxcbiAgICBva0xhYmVsOiBQcm9wVHlwZXMubm9kZSxcbiAgICBvbk1vbnRoQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblRvdWNoVGFwQ2FuY2VsOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblRvdWNoVGFwRGF5OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblRvdWNoVGFwSG91cjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25Ub3VjaFRhcE9rOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvcGVuOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvcGVuVG9ZZWFyU2VsZWN0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZXRTZWxlY3RlZERhdGU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgc3RhcnQ6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICB1dGlsczogUHJvcFR5cGVzLm9iamVjdCxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIERhdGVUaW1lRm9ybWF0OiBkYXRlVGltZUZvcm1hdCxcbiAgICBkaXNhYmxlWWVhclNlbGVjdGlvbjogZmFsc2UsXG4gICAgZGlzcGxheVRpbWU6IGZhbHNlLFxuICAgIGxvY2FsZTogJ2VuLVVTJyxcbiAgICB1dGlsczogZGVmYXVsdFV0aWxzLFxuICB9O1xuXG4gIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgbXVpVGhlbWU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgfTtcblxuICBjYWxlbmRhclJlZnMgPSB7fTtcblxuICBnZXRNaW5EYXRlKCkge1xuICAgIHJldHVybiB0aGlzLnByb3BzW3RoaXMucHJvcHMuZWRpdF0ubWluRGF0ZSB8fCB0aGlzLnByb3BzLnV0aWxzLmFkZFllYXJzKG5ldyBEYXRlKCksIC0xMDApO1xuICB9XG5cbiAgZ2V0TWF4RGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wc1t0aGlzLnByb3BzLmVkaXRdLm1heERhdGUgfHwgdGhpcy5wcm9wcy51dGlscy5hZGRZZWFycyhuZXcgRGF0ZSgpLCAxMDApO1xuICB9XG5cbiAgZ2V0U2VsZWN0ZWREYXRlKCkge1xuICAgIHJldHVybiB0aGlzLnByb3BzW3RoaXMucHJvcHMuZWRpdF0uc2VsZWN0ZWREYXRlO1xuICB9XG5cbiAgaXNTZWxlY3RlZERhdGVEaXNhYmxlZCgpIHtcbiAgICBpZiAodGhpcy5jYWxlbmRhclJlZnMuY2FsZW5kYXIpIHtcbiAgICAgIHJldHVybiB0aGlzLmNhbGVuZGFyUmVmcy5jYWxlbmRhci5pc1NlbGVjdGVkRGF0ZURpc2FibGVkKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBhZGRTZWxlY3RlZERheXMoZGF5cykge1xuICAgIHRoaXMucHJvcHMuc2V0U2VsZWN0ZWREYXRlKHRoaXMucHJvcHMudXRpbHMuYWRkRGF5cyh0aGlzLnByb3BzW3RoaXMucHJvcHMuZWRpdF0uc2VsZWN0ZWREYXRlLCBkYXlzKSk7XG4gIH1cblxuICBhZGRTZWxlY3RlZE1vbnRocyhtb250aHMpIHtcbiAgICB0aGlzLnByb3BzLnNldFNlbGVjdGVkRGF0ZSh0aGlzLnByb3BzLnV0aWxzLmFkZE1vbnRocyh0aGlzLnByb3BzW3RoaXMucHJvcHMuZWRpdF0uc2VsZWN0ZWREYXRlLCBtb250aHMpKTtcbiAgfVxuXG4gIGFkZFNlbGVjdGVkWWVhcnMoeWVhcnMpIHtcbiAgICB0aGlzLnByb3BzLnNldFNlbGVjdGVkRGF0ZSh0aGlzLnByb3BzLnV0aWxzLmFkZFllYXJzKHRoaXMucHJvcHNbdGhpcy5wcm9wcy5lZGl0XS5zZWxlY3RlZERhdGUsIHllYXJzKSk7XG4gIH1cblxuICBnZXRUb29sYmFySW50ZXJhY3Rpb25zKCkge1xuICAgIGNvbnN0IHtlZGl0LCBlbmQsIHN0YXJ0fSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKGVkaXQgPT09ICdlbmQnICYmICFlbmQuZGlzcGxheURhdGUpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHByZXZNb250aDogdGhpcy5wcm9wcy51dGlscy5tb250aERpZmYoc3RhcnQuZGlzcGxheURhdGUsIHRoaXMuZ2V0TWluRGF0ZSgpKSA+IDAsXG4gICAgICAgIG5leHRNb250aDogdGhpcy5wcm9wcy51dGlscy5tb250aERpZmYoc3RhcnQuZGlzcGxheURhdGUsIHRoaXMuZ2V0TWF4RGF0ZSgpKSA8IDAsXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwcmV2TW9udGg6IHRoaXMucHJvcHMudXRpbHMubW9udGhEaWZmKHRoaXMucHJvcHNbdGhpcy5wcm9wcy5lZGl0XS5kaXNwbGF5RGF0ZSwgdGhpcy5nZXRNaW5EYXRlKCkpID4gMCxcbiAgICAgICAgbmV4dE1vbnRoOiB0aGlzLnByb3BzLnV0aWxzLm1vbnRoRGlmZih0aGlzLnByb3BzW3RoaXMucHJvcHMuZWRpdF0uZGlzcGxheURhdGUsIHRoaXMuZ2V0TWF4RGF0ZSgpKSA8IDAsXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVdpbmRvd0tleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vcGVuKSB7XG4gICAgICBzd2l0Y2ggKGtleWNvZGUoZXZlbnQpKSB7XG4gICAgICAgIGNhc2UgJ3VwJzpcbiAgICAgICAgICBpZiAoZXZlbnQuYWx0S2V5ICYmIGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICB0aGlzLmFkZFNlbGVjdGVkWWVhcnMoLTEpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkU2VsZWN0ZWRNb250aHMoLTEpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFkZFNlbGVjdGVkRGF5cygtNyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ2Rvd24nOlxuICAgICAgICAgIGlmIChldmVudC5hbHRLZXkgJiYgZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkU2VsZWN0ZWRZZWFycygxKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICB0aGlzLmFkZFNlbGVjdGVkTW9udGhzKDEpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFkZFNlbGVjdGVkRGF5cyg3KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgIGlmIChldmVudC5hbHRLZXkgJiYgZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkU2VsZWN0ZWRZZWFycygxKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICB0aGlzLmFkZFNlbGVjdGVkTW9udGhzKDEpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFkZFNlbGVjdGVkRGF5cygxKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgaWYgKGV2ZW50LmFsdEtleSAmJiBldmVudC5zaGlmdEtleSkge1xuICAgICAgICAgICAgdGhpcy5hZGRTZWxlY3RlZFllYXJzKC0xKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICB0aGlzLmFkZFNlbGVjdGVkTW9udGhzKC0xKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hZGRTZWxlY3RlZERheXMoLTEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtwcmVwYXJlU3R5bGVzfSA9IHRoaXMuY29udGV4dC5tdWlUaGVtZTtcbiAgICBjb25zdCB0b29sYmFySW50ZXJhY3Rpb25zID0gdGhpcy5nZXRUb29sYmFySW50ZXJhY3Rpb25zKCk7XG4gICAgY29uc3Qge2NhbGVuZGFyVGV4dENvbG9yfSA9IHRoaXMuY29udGV4dC5tdWlUaGVtZS5kYXRlUGlja2VyO1xuICAgIGNvbnN0IHtcbiAgICAgIGJsb2NrZWREYXRlVGltZVJhbmdlcyxcbiAgICAgIGNhbGVuZGFyRGF0ZVdpZHRoLFxuICAgICAgY2FsZW5kYXJUaW1lV2lkdGgsXG4gICAgICBjYW5jZWxMYWJlbCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgRGF0ZVRpbWVGb3JtYXQsXG4gICAgICBkYXlCdXR0b25TaXplLFxuICAgICAgZGlzcGxheVRpbWUsXG4gICAgICBlZGl0LFxuICAgICAgZW5kLFxuICAgICAgZmlyc3REYXlPZldlZWssXG4gICAgICBsb2NhbGUsXG4gICAgICBva0xhYmVsLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICBvblRvdWNoVGFwQ2FuY2VsLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICBvblRvdWNoVGFwT2ssIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIHN0YXJ0LFxuICAgICAgdXRpbHMsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCB3aWR0aCA9IChkaXNwbGF5VGltZSA/IChjYWxlbmRhclRpbWVXaWR0aCB8fCAnMTI1cHgnKSA6IChjYWxlbmRhckRhdGVXaWR0aCB8fCAnMzEwcHgnKSk7XG4gICAgY29uc3QgYnV0dG9uU3RhdGVTaXplID0gcGFyc2VOdW0oZGF5QnV0dG9uU2l6ZSB8fCAnMzRweCcpO1xuICAgIGNvbnN0IHVuaXQgPSAoZGF5QnV0dG9uU2l6ZSB8fCAncHgnKS5yZXBsYWNlKC9bMC05Ll0vZywgJycpO1xuXG4gICAgY29uc3Qgc3R5bGVzID0ge1xuICAgICAgcm9vdDoge1xuICAgICAgICBjb2xvcjogY2FsZW5kYXJUZXh0Q29sb3IsXG4gICAgICAgIHVzZXJTZWxlY3Q6ICdub25lJyxcbiAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgfSxcbiAgICAgIGNhbGVuZGFyOiB7XG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXG4gICAgICB9LFxuICAgICAgY2FsZW5kYXJDb250YWluZXI6IHtcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICBhbGlnbkNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcbiAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcbiAgICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXG4gICAgICAgIGZvbnRTaXplOiAxMixcbiAgICAgICAgZm9udFdlaWdodDogNDAwLFxuICAgICAgICBwYWRkaW5nOiBgMHB4ICR7YnV0dG9uU3RhdGVTaXplIC8gNH0ke3VuaXR9YCxcbiAgICAgICAgdHJhbnNpdGlvbjogdHJhbnNpdGlvbnMuZWFzZU91dCgpLFxuICAgICAgfSxcbiAgICAgIHllYXJDb250YWluZXI6IHtcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLFxuICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgICAgaGVpZ2h0OiAyNzIsXG4gICAgICAgIG1hcmdpblRvcDogMTAsXG4gICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgd2lkdGg6IChjYWxlbmRhckRhdGVXaWR0aCB8fCAnMzEwcHgnKSxcbiAgICAgIH0sXG4gICAgICB3ZWVrVGl0bGU6IHtcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICBmbGV4RGlyZWN0aW9uOiAncm93JyxcbiAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcbiAgICAgICAgZm9udFdlaWdodDogJzUwMCcsXG4gICAgICAgIGhlaWdodDogMjAsXG4gICAgICAgIGxpbmVIZWlnaHQ6ICcxNXB4JyxcbiAgICAgICAgb3BhY2l0eTogJzAuNScsXG4gICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICB9LFxuICAgICAgd2Vla1RpdGxlRGF5OiB7XG4gICAgICAgIG1hcmdpbjogJ2F1dG8nLFxuICAgICAgICBtaW5XaWR0aDogZGF5QnV0dG9uU2l6ZSB8fCAnMzRweCcsXG4gICAgICAgIG1pbkhlaWdodDogZGF5QnV0dG9uU2l6ZSB8fCAnMzRweCcsXG4gICAgICB9LFxuICAgICAgdHJhbnNpdGlvblNsaWRlOiB7XG4gICAgICAgIGhlaWdodDogMjE0LFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgY29uc3Qgd2Vla1RpdGxlRGF5U3R5bGUgPSBwcmVwYXJlU3R5bGVzKHN0eWxlcy53ZWVrVGl0bGVEYXkpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgc3R5bGU9e3ByZXBhcmVTdHlsZXMoc3R5bGVzLnJvb3QpfT5cbiAgICAgICAgPEV2ZW50TGlzdGVuZXJcbiAgICAgICAgICB0YXJnZXQ9XCJ3aW5kb3dcIlxuICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVXaW5kb3dLZXlEb3dufVxuICAgICAgICAvPlxuICAgICAgICA8ZGl2IHN0eWxlPXtwcmVwYXJlU3R5bGVzKHN0eWxlcy5jYWxlbmRhcil9PlxuICAgICAgICAgIHshZGlzcGxheVRpbWUgJiZcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3ByZXBhcmVTdHlsZXMoc3R5bGVzLmNhbGVuZGFyQ29udGFpbmVyKX0+XG4gICAgICAgICAgICAgIDxDYWxlbmRhclRvb2xiYXJcbiAgICAgICAgICAgICAgICBEYXRlVGltZUZvcm1hdD17RGF0ZVRpbWVGb3JtYXR9XG4gICAgICAgICAgICAgICAgbG9jYWxlPXtsb2NhbGV9XG4gICAgICAgICAgICAgICAgZGlzcGxheURhdGU9eyh0aGlzLnByb3BzW2VkaXRdLmRpc3BsYXlEYXRlID8gdGhpcy5wcm9wc1tlZGl0XS5kaXNwbGF5RGF0ZSA6IHN0YXJ0LmRpc3BsYXlEYXRlKX1cbiAgICAgICAgICAgICAgICBvbk1vbnRoQ2hhbmdlPXt0aGlzLnByb3BzLm9uTW9udGhDaGFuZ2V9XG4gICAgICAgICAgICAgICAgcHJldk1vbnRoPXt0b29sYmFySW50ZXJhY3Rpb25zLnByZXZNb250aH1cbiAgICAgICAgICAgICAgICBuZXh0TW9udGg9e3Rvb2xiYXJJbnRlcmFjdGlvbnMubmV4dE1vbnRofVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtwcmVwYXJlU3R5bGVzKHN0eWxlcy53ZWVrVGl0bGUpfT5cbiAgICAgICAgICAgICAgICB7ZGF5c0FycmF5Lm1hcCgoZXZlbnQsIGkpID0+IChcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGtleT17aX0gc3R5bGU9e3dlZWtUaXRsZURheVN0eWxlfT5cbiAgICAgICAgICAgICAgICAgICAge2xvY2FsaXplZFdlZWtkYXkoRGF0ZVRpbWVGb3JtYXQsIGxvY2FsZSwgaSwgZmlyc3REYXlPZldlZWspfVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPFNsaWRlSW5UcmFuc2l0aW9uR3JvdXAgZGlyZWN0aW9uPXt0aGlzLnByb3BzW2VkaXRdLnRyYW5zaXRpb25EaXJlY3Rpb259IHN0eWxlPXtzdHlsZXMudHJhbnNpdGlvblNsaWRlfT5cbiAgICAgICAgICAgICAgICA8UmFuZ2VDYWxlbmRhck1vbnRoXG4gICAgICAgICAgICAgICAgICBibG9ja2VkRGF0ZVRpbWVSYW5nZXM9e2Jsb2NrZWREYXRlVGltZVJhbmdlc31cbiAgICAgICAgICAgICAgICAgIERhdGVUaW1lRm9ybWF0PXtEYXRlVGltZUZvcm1hdH1cbiAgICAgICAgICAgICAgICAgIGNhbGVuZGFyRGF0ZVdpZHRoPXtjYWxlbmRhckRhdGVXaWR0aH1cbiAgICAgICAgICAgICAgICAgIGVkaXQ9e2VkaXR9XG4gICAgICAgICAgICAgICAgICBlbmQ9e2VuZH1cbiAgICAgICAgICAgICAgICAgIGRheUJ1dHRvblNpemU9e2RheUJ1dHRvblNpemV9XG4gICAgICAgICAgICAgICAgICBkaXNwbGF5RGF0ZT17KHRoaXMucHJvcHNbZWRpdF0uZGlzcGxheURhdGUgPyB0aGlzLnByb3BzW2VkaXRdLmRpc3BsYXlEYXRlIDogc3RhcnQuZGlzcGxheURhdGUpfVxuICAgICAgICAgICAgICAgICAgZmlyc3REYXlPZldlZWs9e3RoaXMucHJvcHMuZmlyc3REYXlPZldlZWt9XG4gICAgICAgICAgICAgICAgICBrZXk9eyh0aGlzLnByb3BzW2VkaXRdLmRpc3BsYXlEYXRlID9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wc1tlZGl0XS5kaXNwbGF5RGF0ZS50b0RhdGVTdHJpbmcoKSA6IHN0YXJ0LmRpc3BsYXlEYXRlLnRvRGF0ZVN0cmluZygpKX1cbiAgICAgICAgICAgICAgICAgIGxvY2FsZT17bG9jYWxlfVxuICAgICAgICAgICAgICAgICAgb25Ub3VjaFRhcERheT17dGhpcy5wcm9wcy5vblRvdWNoVGFwRGF5LmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICByZWY9eyhyZWYpID0+IHRoaXMuY2FsZW5kYXJSZWZzLmNhbGVuZGFyID0gcmVmfVxuICAgICAgICAgICAgICAgICAgc3RhcnQ9e3N0YXJ0fVxuICAgICAgICAgICAgICAgICAgdXRpbHM9e3V0aWxzfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvU2xpZGVJblRyYW5zaXRpb25Hcm91cD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIH1cbiAgICAgICAgICB7ZGlzcGxheVRpbWUgJiZcbiAgICAgICAgICAgIDxSYW5nZVRpbWVQaWNrZXJcbiAgICAgICAgICAgICAgYmxvY2tlZERhdGVUaW1lUmFuZ2VzPXtibG9ja2VkRGF0ZVRpbWVSYW5nZXN9XG4gICAgICAgICAgICAgIGVkaXQ9e2VkaXR9XG4gICAgICAgICAgICAgIGVuZD17ZW5kfVxuICAgICAgICAgICAgICBsb2NhbGU9e2xvY2FsZX1cbiAgICAgICAgICAgICAgb25Ub3VjaFRhcEhvdXI9e3RoaXMucHJvcHMub25Ub3VjaFRhcEhvdXIuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgc3RhcnQ9e3N0YXJ0fVxuICAgICAgICAgICAgICB1dGlscz17dXRpbHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJhbmdlQ2FsZW5kYXI7XG4iXX0=