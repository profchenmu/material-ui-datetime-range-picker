'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dateUtils = require('./dateUtils');

var _DayButton = require('./DayButton');

var _DayButton2 = _interopRequireDefault(_DayButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    fontWeight: 400,
    height: 228,
    lineHeight: 2,
    position: 'relative',
    textAlign: 'center',
    MozPaddingStart: 0
  },
  week: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 34,
    marginBottom: 2
  }
};

var RangeCalendarMonth = function (_Component) {
  _inherits(RangeCalendarMonth, _Component);

  function RangeCalendarMonth() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, RangeCalendarMonth);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RangeCalendarMonth.__proto__ || Object.getPrototypeOf(RangeCalendarMonth)).call.apply(_ref, [this].concat(args))), _this), _this.handleTouchTapDay = function (event, date) {
      if (_this.props.onTouchTapDay) {
        _this.props.onTouchTapDay(event, date);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RangeCalendarMonth, [{
    key: 'isSelectedDateDisabled',
    value: function isSelectedDateDisabled() {
      return this.selectedDateDisabled;
    }
  }, {
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
    key: 'disableDaysForBlockedDateTimeRanges',
    value: function disableDaysForBlockedDateTimeRanges(day) {
      var ranges = this.props.blockedDateTimeRanges;
      if (this.props.edit === 'start') {
        return (0, _dateUtils.isBeforeDate)(day, new Date()) || (0, _dateUtils.isDateInRanges)(ranges, day);
      } else {
        var selectedStartDate = this.props.start.selectedDate;
        var closestRange = (0, _dateUtils.closestRangeAfterStart)(ranges, selectedStartDate);

        if (closestRange) {
          return (0, _dateUtils.isBeforeDate)(day, selectedStartDate) || (0, _dateUtils.isAfterDate)(day, closestRange.start);
        } else {
          return (0, _dateUtils.isBeforeDate)(day, selectedStartDate);
        }
      }
    }
  }, {
    key: 'shouldDisableDate',
    value: function shouldDisableDate(day) {
      if (day === null) return false;
      var disabled = !(0, _dateUtils.isBetweenDates)(day, this.getMinDate(), this.getMaxDate());
      if (!disabled && this.props.start.selectedDate && this.props.edit === 'end' && (0, _dateUtils.isBeforeDate)(day, this.props.start.selectedDate)) disabled = true;
      if (!disabled) disabled = this.disableDaysForBlockedDateTimeRanges(day);
      if (!disabled && this.props[this.props.edit].shouldDisableDate) disabled = this.props[this.props.edit].shouldDisableDate(day, this.props.start.selectedDate);

      return disabled;
    }
  }, {
    key: 'hasBlockedTime',
    value: function hasBlockedTime(day) {
      var ranges = this.props.blockedDateTimeRanges;
      if (day === null) return false;
      return (0, _dateUtils.dateBordersRange)(ranges, day);
    }
  }, {
    key: 'dateInRange',
    value: function dateInRange(day) {
      var _props = this.props,
          end = _props.end,
          start = _props.start;

      if (day && start.selectedDate && end.selectedDate) {
        return (0, _dateUtils.isBetweenDates)(day, start.selectedDate, end.selectedDate);
      }
      return false;
    }
  }, {
    key: 'getWeekElements',
    value: function getWeekElements() {
      var _this2 = this;

      var _props2 = this.props,
          edit = _props2.edit,
          start = _props2.start;

      var weekArray = this.props.utils.getWeekArray(this.props[edit].displayDate ? this.props[edit].displayDate : start.displayDate, this.props.firstDayOfWeek);

      return weekArray.map(function (week, i) {
        return _react2.default.createElement(
          'div',
          { key: i, style: styles.week },
          _this2.getDayElements(week, i)
        );
      }, this);
    }
  }, {
    key: 'getDayElements',
    value: function getDayElements(week, i) {
      var _this3 = this;

      var _props3 = this.props,
          DateTimeFormat = _props3.DateTimeFormat,
          blockedDateTimeRanges = _props3.blockedDateTimeRanges,
          calendarDateWidth = _props3.calendarDateWidth,
          dayButtonSize = _props3.dayButtonSize,
          edit = _props3.edit,
          end = _props3.end,
          locale = _props3.locale,
          start = _props3.start;


      return week.map(function (day, j) {
        var isStartDate = (0, _dateUtils.isEqualDate)(_this3.props.start.selectedDate, day);
        var isEndDate = (0, _dateUtils.isEqualDate)(_this3.props.end.selectedDate, day) || isStartDate && !_this3.props.end.selectedDate;
        var isSameDate = isStartDate || isEndDate;
        var disabled = _this3.shouldDisableDate(day);
        var selected = !disabled && isSameDate;
        var isBetweenDates = _this3.dateInRange(day);
        var containsBlockedTime = _this3.hasBlockedTime(day);

        if (isSameDate) {
          _this3.selectedDateDisabled = disabled;
        }
        return _react2.default.createElement(_DayButton2.default, {
          DateTimeFormat: DateTimeFormat,
          locale: locale,
          calendarDateWidth: calendarDateWidth,
          date: day,
          dayButtonSize: dayButtonSize,
          disabled: disabled,
          isBetweenDates: isBetweenDates,
          containsBlockedTime: containsBlockedTime,
          isEndDate: isEndDate,
          isStartDate: isStartDate,
          key: 'db' + (i + j),
          onClick: _this3.handleTouchTapDay.bind(_this3),
          selected: selected
        });
      }, this);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: styles.root },
        this.getWeekElements()
      );
    }
  }]);

  return RangeCalendarMonth;
}(_react.Component);

RangeCalendarMonth.propTypes = {
  DateTimeFormat: _propTypes2.default.func.isRequired,
  autoOk: _propTypes2.default.bool,
  blockedDateTimeRanges: _propTypes2.default.array,
  calendarDateWidth: _propTypes2.default.string,
  dayButtonSize: _propTypes2.default.string,
  displayDate: _propTypes2.default.object.isRequired,
  edit: _propTypes2.default.string.isRequired,
  end: _propTypes2.default.object.isRequired,
  firstDayOfWeek: _propTypes2.default.number,
  locale: _propTypes2.default.string.isRequired,
  onTouchTapDay: _propTypes2.default.func,
  start: _propTypes2.default.object.isRequired,
  utils: _propTypes2.default.object.isRequired
};
exports.default = RangeCalendarMonth;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9EYXRlUGlja2VyL1JhbmdlQ2FsZW5kYXJNb250aC5qcyJdLCJuYW1lcyI6WyJzdHlsZXMiLCJyb290IiwiZGlzcGxheSIsImZsZXhEaXJlY3Rpb24iLCJqdXN0aWZ5Q29udGVudCIsImZvbnRXZWlnaHQiLCJoZWlnaHQiLCJsaW5lSGVpZ2h0IiwicG9zaXRpb24iLCJ0ZXh0QWxpZ24iLCJNb3pQYWRkaW5nU3RhcnQiLCJ3ZWVrIiwibWFyZ2luQm90dG9tIiwiUmFuZ2VDYWxlbmRhck1vbnRoIiwiaGFuZGxlVG91Y2hUYXBEYXkiLCJldmVudCIsImRhdGUiLCJwcm9wcyIsIm9uVG91Y2hUYXBEYXkiLCJzZWxlY3RlZERhdGVEaXNhYmxlZCIsImVkaXQiLCJtaW5EYXRlIiwidXRpbHMiLCJhZGRZZWFycyIsIkRhdGUiLCJtYXhEYXRlIiwiZGF5IiwicmFuZ2VzIiwiYmxvY2tlZERhdGVUaW1lUmFuZ2VzIiwic2VsZWN0ZWRTdGFydERhdGUiLCJzdGFydCIsInNlbGVjdGVkRGF0ZSIsImNsb3Nlc3RSYW5nZSIsImRpc2FibGVkIiwiZ2V0TWluRGF0ZSIsImdldE1heERhdGUiLCJkaXNhYmxlRGF5c0ZvckJsb2NrZWREYXRlVGltZVJhbmdlcyIsInNob3VsZERpc2FibGVEYXRlIiwiZW5kIiwid2Vla0FycmF5IiwiZ2V0V2Vla0FycmF5IiwiZGlzcGxheURhdGUiLCJmaXJzdERheU9mV2VlayIsIm1hcCIsImkiLCJnZXREYXlFbGVtZW50cyIsIkRhdGVUaW1lRm9ybWF0IiwiY2FsZW5kYXJEYXRlV2lkdGgiLCJkYXlCdXR0b25TaXplIiwibG9jYWxlIiwiaiIsImlzU3RhcnREYXRlIiwiaXNFbmREYXRlIiwiaXNTYW1lRGF0ZSIsInNlbGVjdGVkIiwiaXNCZXR3ZWVuRGF0ZXMiLCJkYXRlSW5SYW5nZSIsImNvbnRhaW5zQmxvY2tlZFRpbWUiLCJoYXNCbG9ja2VkVGltZSIsImJpbmQiLCJnZXRXZWVrRWxlbWVudHMiLCJDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJmdW5jIiwiaXNSZXF1aXJlZCIsImF1dG9PayIsImJvb2wiLCJhcnJheSIsInN0cmluZyIsIm9iamVjdCIsIm51bWJlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztBQVNBLElBQU1BLFNBQVM7QUFDYkMsUUFBTTtBQUNKQyxhQUFTLE1BREw7QUFFSkMsbUJBQWUsUUFGWDtBQUdKQyxvQkFBZ0IsWUFIWjtBQUlKQyxnQkFBWSxHQUpSO0FBS0pDLFlBQVEsR0FMSjtBQU1KQyxnQkFBWSxDQU5SO0FBT0pDLGNBQVUsVUFQTjtBQVFKQyxlQUFXLFFBUlA7QUFTSkMscUJBQWlCO0FBVGIsR0FETztBQVliQyxRQUFNO0FBQ0pULGFBQVMsTUFETDtBQUVKQyxtQkFBZSxLQUZYO0FBR0pDLG9CQUFnQixjQUhaO0FBSUpFLFlBQVEsRUFKSjtBQUtKTSxrQkFBYztBQUxWO0FBWk8sQ0FBZjs7SUFxQk1DLGtCOzs7Ozs7Ozs7Ozs7Ozs4TUFxQkpDLGlCLEdBQW9CLFVBQUNDLEtBQUQsRUFBUUMsSUFBUixFQUFpQjtBQUNuQyxVQUFJLE1BQUtDLEtBQUwsQ0FBV0MsYUFBZixFQUE4QjtBQUM1QixjQUFLRCxLQUFMLENBQVdDLGFBQVgsQ0FBeUJILEtBQXpCLEVBQWdDQyxJQUFoQztBQUNEO0FBQ0YsSzs7Ozs7NkNBUndCO0FBQ3ZCLGFBQU8sS0FBS0csb0JBQVo7QUFDRDs7O2lDQVFZO0FBQ1gsYUFBTyxLQUFLRixLQUFMLENBQVcsS0FBS0EsS0FBTCxDQUFXRyxJQUF0QixFQUE0QkMsT0FBNUIsSUFBdUMsS0FBS0osS0FBTCxDQUFXSyxLQUFYLENBQWlCQyxRQUFqQixDQUEwQixJQUFJQyxJQUFKLEVBQTFCLEVBQXNDLENBQUMsR0FBdkMsQ0FBOUM7QUFDRDs7O2lDQUVZO0FBQ1gsYUFBTyxLQUFLUCxLQUFMLENBQVcsS0FBS0EsS0FBTCxDQUFXRyxJQUF0QixFQUE0QkssT0FBNUIsSUFBdUMsS0FBS1IsS0FB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O0FBUWpCM0IsT0FBS3lCLG9CQUFVTyxNQUFWLENBQWlCTCxVQVJMO0FBU2pCdkIsa0JBQWdCcUIsb0JBQVVRLE1BVFQ7QUFVakJ0QixVQUFRYyxvQkFBVU0sTUFBVixDQUFpQkosVUFWUjtBQVdqQi9DLGlCQUFlNkMsb0JBQVVDLElBWFI7QUFZakJsQyxTQUFPaUMsb0JBQVVPLE1BQVYsQ0FBaUJMLFVBWlA7QUFhakIzQyxTQUFPeUMsb0JBQVVPLE1BQVYsQ0FBaUJMO0FBYlAsQztrQkFtSk5wRCxrQiIsImZpbGUiOiJSYW5nZUNhbGVuZGFyTW9udGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQge2RhdGVCb3JkZXJzUmFuZ2UsIGlzQmV0d2VlbkRhdGVzLCBpc0VxdWFsRGF0ZX0gZnJvbSAnLi9kYXRlVXRpbHMnO1xuaW1wb3J0IERheUJ1dHRvbiBmcm9tICcuL0RheUJ1dHRvbic7XG5cbmltcG9ydCB7XG4gIGNsb3Nlc3RSYW5nZUFmdGVyU3RhcnQsXG4gIGlzQWZ0ZXJEYXRlLFxuICBpc0JlZm9yZURhdGUsXG4gIGlzRGF0ZUluUmFuZ2VzLFxufSBmcm9tICcuL2RhdGVVdGlscyc7XG5cbmNvbnN0IHN0eWxlcyA9IHtcbiAgcm9vdDoge1xuICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICBqdXN0aWZ5Q29udGVudDogJ2ZsZXgtc3RhcnQnLFxuICAgIGZvbnRXZWlnaHQ6IDQwMCxcbiAgICBoZWlnaHQ6IDIyOCxcbiAgICBsaW5lSGVpZ2h0OiAyLFxuICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgTW96UGFkZGluZ1N0YXJ0OiAwLFxuICB9LFxuICB3ZWVrOiB7XG4gICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgIGZsZXhEaXJlY3Rpb246ICdyb3cnLFxuICAgIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYXJvdW5kJyxcbiAgICBoZWlnaHQ6IDM0LFxuICAgIG1hcmdpbkJvdHRvbTogMixcbiAgfSxcbn07XG5cbmNsYXNzIFJhbmdlQ2FsZW5kYXJNb250aCBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgRGF0ZVRpbWVGb3JtYXQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgYXV0b09rOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBibG9ja2VkRGF0ZVRpbWVSYW5nZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBjYWxlbmRhckRhdGVXaWR0aDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkYXlCdXR0b25TaXplOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRpc3BsYXlEYXRlOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgZWRpdDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGVuZDogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIGZpcnN0RGF5T2ZXZWVrOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGxvY2FsZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIG9uVG91Y2hUYXBEYXk6IFByb3BUeXBlcy5mdW5jLFxuICAgIHN0YXJ0OiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgdXRpbHM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgfTtcblxuICBpc1NlbGVjdGVkRGF0ZURpc2FibGVkKCkge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkRGF0ZURpc2FibGVkO1xuICB9XG5cbiAgaGFuZGxlVG91Y2hUYXBEYXkgPSAoZXZlbnQsIGRhdGUpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vblRvdWNoVGFwRGF5KSB7XG4gICAgICB0aGlzLnByb3BzLm9uVG91Y2hUYXBEYXkoZXZlbnQsIGRhdGUpO1xuICAgIH1cbiAgfTtcblxuICBnZXRNaW5EYXRlKCkge1xuICAgIHJldHVybiB0aGlzLnByb3BzW3RoaXMucHJvcHMuZWRpdF0ubWluRGF0ZSB8fCB0aGlzLnByb3BzLnV0aWxzLmFkZFllYXJzKG5ldyBEYXRlKCksIC0xMDApO1xuICB9XG5cbiAgZ2V0TWF4RGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wc1t0aGlzLnByb3BzLmVkaXRdLm1heERhdGUgfHwgdGhpcy5wcm9wcy51dGlscy5hZGRZZWFycyhuZXcgRGF0ZSgpLCAxMDApO1xuICB9XG5cbiAgZGlzYWJsZURheXNGb3JCbG9ja2VkRGF0ZVRpbWVSYW5nZXMoZGF5KSB7XG4gICAgY29uc3QgcmFuZ2VzID0gdGhpcy5wcm9wcy5ibG9ja2VkRGF0ZVRpbWVSYW5nZXM7XG4gICAgaWYgKHRoaXMucHJvcHMuZWRpdCA9PT0gJ3N0YXJ0Jykge1xuICAgICAgcmV0dXJuIChpc0JlZm9yZURhdGUoZGF5LCBuZXcgRGF0ZSgpKSB8fCBpc0RhdGVJblJhbmdlcyhyYW5nZXMsIGRheSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzZWxlY3RlZFN0YXJ0RGF0ZSA9IHRoaXMucHJvcHMuc3RhcnQuc2VsZWN0ZWREYXRlO1xuICAgICAgY29uc3QgY2xvc2VzdFJhbmdlID0gY2xvc2VzdFJhbmdlQWZ0ZXJTdGFydChyYW5nZXMsIHNlbGVjdGVkU3RhcnREYXRlKTtcblxuICAgICAgaWYgKGNsb3Nlc3RSYW5nZSkge1xuICAgICAgICByZXR1cm4gaXNCZWZvcmVEYXRlKGRheSwgc2VsZWN0ZWRTdGFydERhdGUpIHx8IGlzQWZ0ZXJEYXRlKGRheSwgY2xvc2VzdFJhbmdlLnN0YXJ0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpc0JlZm9yZURhdGUoZGF5LCBzZWxlY3RlZFN0YXJ0RGF0ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2hvdWxkRGlzYWJsZURhdGUoZGF5KSB7XG4gICAgaWYgKGRheSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuICAgIGxldCBkaXNhYmxlZCA9ICFpc0JldHdlZW5EYXRlcyhkYXksIHRoaXMuZ2V0TWluRGF0ZSgpLCB0aGlzLmdldE1heERhdGUoKSk7XG4gICAgaWYgKCFkaXNhYmxlZCAmJiB0aGlzLnByb3BzLnN0YXJ0LnNlbGVjdGVkRGF0ZSAmJiB0aGlzLnByb3BzLmVkaXQgPT09ICdlbmQnICYmXG4gICAgICBpc0JlZm9yZURhdGUoZGF5LCB0aGlzLnByb3BzLnN0YXJ0LnNlbGVjdGVkRGF0ZSkpIGRpc2FibGVkID0gdHJ1ZTtcbiAgICBpZiAoIWRpc2FibGVkKSBkaXNhYmxlZCA9IHRoaXMuZGlzYWJsZURheXNGb3JCbG9ja2VkRGF0ZVRpbWVSYW5nZXMoZGF5KTtcbiAgICBpZiAoIWRpc2FibGVkICYmIHRoaXMucHJvcHNbdGhpcy5wcm9wcy5lZGl0XS5zaG91bGREaXNhYmxlRGF0ZSlcbiAgICAgIGRpc2FibGVkID0gdGhpcy5wcm9wc1t0aGlzLnByb3BzLmVkaXRdLnNob3VsZERpc2FibGVEYXRlKGRheSwgdGhpcy5wcm9wcy5zdGFydC5zZWxlY3RlZERhdGUpO1xuXG4gICAgcmV0dXJuIGRpc2FibGVkO1xuICB9XG5cbiAgaGFzQmxvY2tlZFRpbWUoZGF5KSB7XG4gICAgY29uc3QgcmFuZ2VzID0gdGhpcy5wcm9wcy5ibG9ja2VkRGF0ZVRpbWVSYW5nZXM7XG4gICAgaWYgKGRheSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBkYXRlQm9yZGVyc1JhbmdlKHJhbmdlcywgZGF5KTtcbiAgfVxuXG4gIGRhdGVJblJhbmdlKGRheSkge1xuICAgIGNvbnN0IHtcbiAgICAgIGVuZCxcbiAgICAgIHN0YXJ0LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChkYXkgJiYgc3RhcnQuc2VsZWN0ZWREYXRlICYmIGVuZC5zZWxlY3RlZERhdGUpIHtcbiAgICAgIHJldHVybiBpc0JldHdlZW5EYXRlcyhkYXksIHN0YXJ0LnNlbGVjdGVkRGF0ZSwgZW5kLnNlbGVjdGVkRGF0ZSk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldFdlZWtFbGVtZW50cygpIHtcbiAgICBjb25zdCB7ZWRpdCwgc3RhcnR9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB3ZWVrQXJyYXkgPSB0aGlzLnByb3BzLnV0aWxzLmdldFdlZWtBcnJheSgodGhpcy5wcm9wc1tlZGl0XS5kaXNwbGF5RGF0ZSA/XG4gICAgICB0aGlzLnByb3BzW2VkaXRdLmRpc3BsYXlEYXRlIDogc3RhcnQuZGlzcGxheURhdGUpLCB0aGlzLnByb3BzLmZpcnN0RGF5T2ZXZWVrKTtcblxuICAgIHJldHVybiB3ZWVrQXJyYXkubWFwKCh3ZWVrLCBpKSA9PiB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGtleT17aX0gc3R5bGU9e3N0eWxlcy53ZWVrfT5cbiAgICAgICAgICB7dGhpcy5nZXREYXlFbGVtZW50cyh3ZWVrLCBpKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH0sIHRoaXMpO1xuICB9XG5cbiAgZ2V0RGF5RWxlbWVudHMod2VlaywgaSkge1xuICAgIGNvbnN0IHtcbiAgICAgIERhdGVUaW1lRm9ybWF0LFxuICAgICAgYmxvY2tlZERhdGVUaW1lUmFuZ2VzLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICBjYWxlbmRhckRhdGVXaWR0aCxcbiAgICAgIGRheUJ1dHRvblNpemUsXG4gICAgICBlZGl0LCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICBlbmQsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIGxvY2FsZSxcbiAgICAgIHN0YXJ0LCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gd2Vlay5tYXAoKGRheSwgaikgPT4ge1xuICAgICAgY29uc3QgaXNTdGFydERhdGUgPSBpc0VxdWFsRGF0ZSh0aGlzLnByb3BzLnN0YXJ0LnNlbGVjdGVkRGF0ZSwgZGF5KTtcbiAgICAgIGNvbnN0IGlzRW5kRGF0ZSA9IChpc0VxdWFsRGF0ZSh0aGlzLnByb3BzLmVuZC5zZWxlY3RlZERhdGUsIGRheSkgfHxcbiAgICAgICAgKGlzU3RhcnREYXRlICYmICF0aGlzLnByb3BzLmVuZC5zZWxlY3RlZERhdGUpKTtcbiAgICAgIGNvbnN0IGlzU2FtZURhdGUgPSAoaXNTdGFydERhdGUgfHwgaXNFbmREYXRlKTtcbiAgICAgIGNvbnN0IGRpc2FibGVkID0gdGhpcy5zaG91bGREaXNhYmxlRGF0ZShkYXkpO1xuICAgICAgY29uc3Qgc2VsZWN0ZWQgPSAhZGlzYWJsZWQgJiYgaXNTYW1lRGF0ZTtcbiAgICAgIGNvbnN0IGlzQmV0d2VlbkRhdGVzID0gdGhpcy5kYXRlSW5SYW5nZShkYXkpO1xuICAgICAgY29uc3QgY29udGFpbnNCbG9ja2VkVGltZSA9IHRoaXMuaGFzQmxvY2tlZFRpbWUoZGF5KTtcblxuICAgICAgaWYgKGlzU2FtZURhdGUpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZERhdGVEaXNhYmxlZCA9IGRpc2FibGVkO1xuICAgICAgfVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPERheUJ1dHRvblxuICAgICAgICAgIERhdGVUaW1lRm9ybWF0PXtEYXRlVGltZUZvcm1hdH1cbiAgICAgICAgICBsb2NhbGU9e2xvY2FsZX1cbiAgICAgICAgICBjYWxlbmRhckRhdGVXaWR0aD17Y2FsZW5kYXJEYXRlV2lkdGh9XG4gICAgICAgICAgZGF0ZT17ZGF5fVxuICAgICAgICAgIGRheUJ1dHRvblNpemU9e2RheUJ1dHRvblNpemV9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIGlzQmV0d2VlbkRhdGVzPXtpc0JldHdlZW5EYXRlc31cbiAgICAgICAgICBjb250YWluc0Jsb2NrZWRUaW1lPXtjb250YWluc0Jsb2NrZWRUaW1lfVxuICAgICAgICAgIGlzRW5kRGF0ZT17aXNFbmREYXRlfVxuICAgICAgICAgIGlzU3RhcnREYXRlPXtpc1N0YXJ0RGF0ZX1cbiAgICAgICAgICBrZXk9e2BkYiR7KGkgKyBqKX1gfVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlVG91Y2hUYXBEYXkuYmluZCh0aGlzKX1cbiAgICAgICAgICBzZWxlY3RlZD17c2VsZWN0ZWR9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH0sIHRoaXMpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMucm9vdH0+XG4gICAgICAgIHt0aGlzLmdldFdlZWtFbGVtZW50cygpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSYW5nZUNhbGVuZGFyTW9udGg7XG4iXX0=