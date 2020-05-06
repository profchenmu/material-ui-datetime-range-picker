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

var _reactEventListener = require('react-event-listener');

var _reactEventListener2 = _interopRequireDefault(_reactEventListener);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _DateRangeDisplay = require('./DateRangeDisplay');

var _DateRangeDisplay2 = _interopRequireDefault(_DateRangeDisplay);

var _DateRangeStatusDisplay = require('./DateRangeStatusDisplay');

var _DateRangeStatusDisplay2 = _interopRequireDefault(_DateRangeStatusDisplay);

var _RangeCalendar = require('./RangeCalendar');

var _RangeCalendar2 = _interopRequireDefault(_RangeCalendar);

var _Dialog = require('@material-ui/core/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _Popover = require('@material-ui/core/Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _reactAddonsUpdate = require('react-addons-update');

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

var _dateUtils = require('./dateUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateRangePickerDialog = function (_Component) {
  _inherits(DateRangePickerDialog, _Component);

  function DateRangePickerDialog(props) {
    _classCallCheck(this, DateRangePickerDialog);

    var _this = _possibleConstructorReturn(this, (DateRangePickerDialog.__proto__ || Object.getPrototypeOf(DateRangePickerDialog)).call(this, props));

    _this.state = {
      allRefs: {
        endDate: null,
        endTime: null,
        startDate: null,
        startTime: null
      },
      anchorEl: null,
      edit: 'start',
      displayTime: false,
      end: {
        displayDate: undefined,
        displayMonthDay: undefined,
        maxDate: undefined,
        minDate: undefined,
        selectedDate: undefined,
        shouldDisableDate: undefined
      },
      open: false,
      start: {
        displayDate: undefined,
        displayMonthDay: undefined,
        maxDate: undefined,
        minDate: undefined,
        selectedDate: undefined,
        shouldDisableDate: undefined
      }
    };

    _this.show = function (showRef, startEnd, dateTime, allRefs) {
      if (_this.props.onShow && !_this.state.open) {
        _this.props.onShow();
      }
      _this.setState({
        allRefs: allRefs,
        anchorEl: showRef,
        edit: startEnd,
        displayTime: dateTime === 'time'
      }, function () {
        _this.setState({
          open: true
        });
      });
    };

    _this.reset = function () {
      _this.setState({
        allRefs: {
          endDate: null,
          endTime: null,
          startDate: null,
          startTime: null
        },
        anchorEl: null,
        edit: 'start',
        displayTime: false,
        end: {
          displayDate: _this.props.utils.getFirstDayOfMonth(_this.props.initialEndDate),
          maxDate: _this.props.end ? _this.props.end.maxDate : undefined,
          minDate: _this.props.end ? _this.props.end.minDate : undefined,
          selectedDate: _this.props.initialEndDate,
          shouldDisableDate: _this.props.end ? _this.props.end.shouldDisableDate : undefined
        },
        open: false,
        start: {
          displayDate: _this.props.utils.getFirstDayOfMonth(_this.props.initialStartDate),
          maxDate: _this.props.start ? _this.props.start.maxDate : undefined,
          minDate: _this.props.start ? _this.props.start.minDate : undefined,
          selectedDate: _this.props.initialStartDate,
          shouldDisableDate: _this.props.start ? _this.props.start.shouldDisableDate : undefined
        }
      });
    };

    _this.dismiss = function () {
      if (_this.props.onDismiss && _this.state.open) {
        if (_this.state.start.selectedDate && _this.state.end.selectedDate && !(0, _dateUtils.isEqualDateTime)(_this.state.start.selectedDate, _this.state.end.selectedDate)) {
          _this.props.onDismiss({
            start: _this.state.start.selectedDate,
            end: _this.state.end.selectedDate
          });
        } else {
          _this.props.onDismiss({
            start: null,
            end: null
          });
        }
      }
      _this.setState({
        // edit: 'start',
        // displayTime: false,
        open: false
      });
    };

    _this.handleTouchTapDay = function (event, date) {
      var newState = _this.setSelectedDate(date);
      var _this$state = _this.state,
          allRefs = _this$state.allRefs,
          edit = _this$state.edit;

      var keepOpen = false;
      if (!_this.props.autoOpenField) {
        newState = (0, _reactAddonsUpdate2.default)(newState, {
          open: { $set: false }
        });
      } else {
        newState = (0, _reactAddonsUpdate2.default)(newState, {
          displayTime: { $set: true },
          anchorEl: { $set: edit === 'start' ? allRefs.startTime : allRefs.endTime }
        });
        keepOpen = true;
      }
      _this.setState(newState, function () {
        _this.props.onAccept({
          start: newState.start.selectedDate,
          end: newState.end.selectedDate
        }, keepOpen);
        _this.popover.current.updatePosition();
      });
    };

    _this.handleTouchTapHour = function (hour) {
      var edit = _this.state.edit;

      var newState = _this.setSelectedTime(hour);
      var keepOpen = false;

      if (!_this.props.autoOpenField) {
        newState = (0, _reactAddonsUpdate2.default)(newState, {
          open: { $set: false }
        });
      } else {
        if (edit === 'start') {
          newState = (0, _reactAddonsUpdate2.default)(newState, {
            displayTime: { $set: false },
            edit: { $set: 'end' }
          });
          keepOpen = true;
        } else {
          newState = (0, _reactAddonsUpdate2.default)(newState, {
            open: { $set: false }
          });
        }
      }

      _this.setState(newState);
      _this.props.onAccept({
        start: newState.start.selectedDate,
        end: newState.end.selectedDate
      }, keepOpen);
    };

    _this.handleTouchTapCancel = function () {
      _this.dismiss();
    };

    _this.handleRequestClose = function () {
      _this.dismiss();
    };

    _this.handleTouchTapOk = function () {
      // should return an object with start and end dates
      if (_this.props.onAccept) {
        _this.props.onAccept({
          start: _this.state.start.selectedDate,
          end: _this.state.end.selectedDate
        });
      }
      _this.setState({
        open: false
      });
    };

    _this.handleWindowKeyUp = function (event) {
      switch ((0, _keycode2.default)(event)) {
        case 'enter':
          _this.handleTouchTapOk();
          break;
      }
    };

    _this.handleMonthChange = function (months) {
      var _this$state2 = _this.state,
          edit = _this$state2.edit,
          start = _this$state2.start;

      var direction = months >= 0 ? 'left' : 'right';
      _this.setState(_defineProperty({}, _this.state.edit, {
        transitionDirection: direction,
        displayDate: _this.props.utils.addMonths(_this.state[edit].displayDate ? _this.state[edit].displayDate : start.displayDate, months),
        selectedDate: _this.state[edit].selectedDate ? _this.state[edit].selectedDate : start.selectedDate,
        shouldDisableDate: _this.state[edit].shouldDisableDate ? _this.state[edit].shouldDisableDate : start.shouldDisableDate
      }));
    };

    _this.handleTouchTapMenu = function (edit, displayTime) {
      _this.setState({
        edit: edit ? edit : _this.props.edit,
        displayTime: displayTime ? displayTime : _this.props.displayTime
      });
    };

    _this.handleTouchTapYear = function (event, year) {
      _this.setSelectedDate(_this.props.utils.setYear(_this.state.selectedDate, year), event);
      _this.handleTouchTapDateDisplayMonthDay();
    };

    _this.handleTouchTapDateDisplayMonthDay = function () {
      var newState = (0, _reactAddonsUpdate2.default)(_this.state, _defineProperty({}, _this.state.edit, {
        displayMonthDay: { $set: true }
      }));
      _this.setState(newState);
    };

    _this.popover = _react2.default.createRef();
    return _this;
  }

  _createClass(DateRangePickerDialog, [{
    key: 'UNSAFE_componentWillMount',
    value: function UNSAFE_componentWillMount() {
      this.setState({
        end: {
          displayDate: this.props.utils.getFirstDayOfMonth(this.props.initialEndDate),
          maxDate: this.props.end ? this.props.end.maxDate : undefined,
          minDate: this.props.end ? this.props.end.minDate : undefined,
          selectedDate: this.props.initialEndDate,
          shouldDisableDate: this.props.end ? this.props.end.shouldDisableDate : undefined
        },
        start: {
          displayDate: this.props.utils.getFirstDayOfMonth(this.props.initialStartDate),
          maxDate: this.props.start ? this.props.start.maxDate : undefined,
          minDate: this.props.start ? this.props.start.minDate : undefined,
          selectedDate: this.props.initialStartDate,
          shouldDisableDate: this.props.start ? this.props.start.shouldDisableDate : undefined
        }
      });
    }
  }, {
    key: 'getMinDate',
    value: function getMinDate() {
      return this.state[this.state.edit].minDate || this.props.utils.addYears(new Date(), -100);
    }
  }, {
    key: 'getMaxDate',
    value: function getMaxDate() {
      return this.state[this.state.edit].maxDate || this.props.utils.addYears(new Date(), 100);
    }
  }, {
    key: 'setDisplayDate',
    value: function setDisplayDate(date, newSelectedDate) {
      var newDisplayDate = this.props.utils.getFirstDayOfMonth(date);
      var newSelectedEndDate = (0, _dateUtils.cloneDate)(newSelectedDate);
      newSelectedEndDate.setTime(newSelectedEndDate.getTime() + 1 * 60 * 60 * 1000);
      if (newDisplayDate !== this.state[this.state.edit].displayDate) {
        var direction = newDisplayDate > this.state[this.state.edit].displayDate ? 'left' : 'right';
        var newState = (0, _reactAddonsUpdate2.default)(this.state, _defineProperty({}, this.state.edit, {
          displayDate: { $set: newDisplayDate },
          transitionDirection: { $set: direction },
          selectedDate: { $set: newSelectedDate || this.state[this.state.edit].selectedDate }
        }));
        if (this.state.edit === 'start' && this.state.end.selectedDate && ((0, _dateUtils.isAfterDateTime)(newSelectedDate, this.state.end.selectedDate) || (0, _dateUtils.isEqualDateTime)(newSelectedDate, this.state.end.selectedDate) || this.blockedRangeOverlaps(newSelectedDate))) {
          newState = (0, _reactAddonsUpdate2.default)(newState, {
            end: {
              displayDate: { $set: undefined },
              // displayDate: {$set: newDisplayDate},
              transitionDirection: { $set: direction },
              selectedDate: { $set: undefined }
              // selectedDate: {$set: newSelectedEndDate || this.state[this.state.edit].selectedDate},
            }
          });
        }
        // if (this.props.autoOpenField) {
        //   newState = update(newState, {
        //     displayTime: {$set: true},
        //   })
        // }
        return newState;
      }
      return this.state;
    }
  }, {
    key: 'blockedRangeOverlaps',
    value: function blockedRangeOverlaps(adjustedDate) {
      var closestRange = (0, _dateUtils.closestRangeAfterStart)(this.props.blockedDateTimeRanges, adjustedDate);
      var endDate = this.state.end.selectedDate;
      return endDate && closestRange && (0, _dateUtils.isAfterDateTime)(endDate, closestRange.start);
    }
  }, {
    key: 'setSelectedDate',
    value: function setSelectedDate(date) {
      var adjustedDate = date;
      var newState = void 0;
      var minDate = this.getMinDate();
      var maxDate = this.getMaxDate();
      var _state = this.state,
          edit = _state.edit,
          start = _state.start;

      if ((0, _dateUtils.isBeforeDateTime)(date, minDate)) {
        adjustedDate = minDate;
      } else if ((0, _dateUtils.isAfterDateTime)(date, maxDate)) {
        adjustedDate = maxDate;
      }

      adjustedDate = this.firstAvailableTime(adjustedDate);

      if (edit === 'end' && (0, _dateUtils.isBeforeDateTime)(adjustedDate, start.selectedDate)) {
        adjustedDate = new Date(start.selectedDate.getTime());
      }
      var adjustedEndDate = (0, _dateUtils.cloneDate)(adjustedDate);
      adjustedEndDate.setTime(adjustedEndDate.getTime() + 1 * 60 * 60 * 1000);

      var newDisplayDate = this.props.utils.getFirstDayOfMonth(adjustedDate);
      if (newDisplayDate !== this.state[this.state.edit].displayDate) {
        newState = this.setDisplayDate(newDisplayDate, adjustedDate);
      } else {
        newState = (0, _reactAddonsUpdate2.default)(this.state, _defineProperty({}, this.state.edit, {
          selectedDate: { $set: adjustedDate }
        }));
        if (this.state.edit === 'start' && this.state.end.selectedDate && ((0, _dateUtils.isAfterDateTime)(adjustedDate, this.state.end.selectedDate) || (0, _dateUtils.isEqualDateTime)(adjustedDate, this.state.end.selectedDate) || this.blockedRangeOverlaps(adjustedDate))) {
          newState = (0, _reactAddonsUpdate2.default)(newState, {
            end: {
              selectedDate: { $set: undefined }
              // selectedDate: {$set: adjustedEndDate},
            }
          });
        }
      }
      if (this.props.autoOpenField) {
        newState = (0, _reactAddonsUpdate2.default)(newState, {
          displayTime: { $set: true }
        });
      }
      // newState = update(newState, {
      //   displayTime: {$set: true},
      // });
      return newState;
    }
  }, {
    key: 'firstAvailableTime',
    value: function firstAvailableTime(dateToCheck) {
      var hoursInDay = 24;
      var blockedDateTimeRanges = this.props.blockedDateTimeRanges;
      var _state2 = this.state,
          edit = _state2.edit,
          start = _state2.start;

      var adjustedDate = (0, _dateUtils.cloneDate)(dateToCheck);

      for (var hour = 0; hour < hoursInDay; hour++) {
        adjustedDate.setHours(hour, 0, 0, 0);
        if (edit === 'start') {
          if (!(0, _dateUtils.isBeforeDateTime)(adjustedDate, new Date()) && !(0, _dateUtils.isDateTimeInRanges)(blockedDateTimeRanges, adjustedDate)) {
            return adjustedDate;
          }
        } else {
          var selectedStartDate = start.selectedDate;
          var closestRange = (0, _dateUtils.closestRangeAfterStart)(blockedDateTimeRanges, selectedStartDate);

          if (closestRange) {
            if (!(0, _dateUtils.isEqualDateTime)(start.selectedDate, adjustedDate) && !(0, _dateUtils.isBeforeDateTime)(adjustedDate, selectedStartDate) && !(0, _dateUtils.isAfterDateTime)(adjustedDate, closestRange.start)) {
              return adjustedDate;
            }
          } else {
            if (!(0, _dateUtils.isEqualDateTime)(start.selectedDate, adjustedDate) && !(0, _dateUtils.isBeforeDateTime)(adjustedDate, selectedStartDate)) {
              return adjustedDate;
            }
          }
        }
      }
      return adjustedDate;
    }
  }, {
    key: 'getTimeElements',
    value: function getTimeElements(styles) {
      var _this2 = this;

      var hourArray = [];
      var hoursInDay = 24;
      for (var i = 0; i < hoursInDay; i++) {
        hourArray.push(i);
      }

      return hourArray.map(function (hour, i) {
        return _react2.default.createElement(
          'div',
          { key: i, style: styles.hour },
          _this2.getHourElement(hour)
        );
      }, this);
    }
  }, {
    key: 'setSelectedTime',
    value: function setSelectedTime(hour) {
      var mode = this.state.edit === 'start' ? 'end' : 'start';
      var adjustedDate = (0, _dateUtils.cloneDate)(this.state[this.state.edit].selectedDate);
      adjustedDate.setHours(hour, 0, 0, 0);
      var adjustedEndDate = (0, _dateUtils.cloneDate)(adjustedDate);
      adjustedEndDate.setTime(adjustedEndDate.getTime() + 1 * 60 * 60 * 1000);

      var newState = (0, _reactAddonsUpdate2.default)(this.state, _defineProperty({}, this.state.edit, {
        selectedDate: { $set: adjustedDate }
      }));

      if (this.state.edit === 'start' && this.state.end.selectedDate && adjustedDate > this.state.end.selectedDate) {
        newState = (0, _reactAddonsUpdate2.default)(newState, {
          end: {
            selectedDate: { $set: undefined }
            // selectedDate: {$set: adjustedEndDate},
          }
        });
      }

      if (this.props.autoOpenField) {
        newState = (0, _reactAddonsUpdate2.default)(newState, {
          displayTime: {
            $set: false
          },
          edit: {
            $set: mode
          }
        });
      }
      return newState;
    }
  }, {
    key: 'setEditMode',
    value: function setEditMode(mode) {
      if (!mode) {
        mode = this.state.edit === 'start' ? 'end' : 'start';
      }
      var newState = (0, _reactAddonsUpdate2.default)(this.state, {
        edit: { $set: mode }
      });
      this.setState(newState);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          DateTimeFormat = _props.DateTimeFormat,
          autoOk = _props.autoOk,
          autoOpenField = _props.autoOpenField,
          blockedDateTimeRanges = _props.blockedDateTimeRanges,
          calendarDateWidth = _props.calendarDateWidth,
          calendarTimeWidth = _props.calendarTimeWidth,
          cancelLabel = _props.cancelLabel,
          container = _props.container,
          dayButtonSize = _props.dayButtonSize,
          displayTime = _props.displayTime,
          edit = _props.edit,
          endLabel = _props.endLabel,
          showCalendarDate = _props.showCalendarDate,
          showCalendarStatus = _props.showCalendarStatus,
          initialStartDate = _props.initialStartDate,
          initialEndDate = _props.initialEndDate,
          firstDayOfWeek = _props.firstDayOfWeek,
          locale = _props.locale,
          mode = _props.mode,
          okLabel = _props.okLabel,
          onAccept = _props.onAccept,
          onUpdate = _props.onUpdate,
          onDismiss = _props.onDismiss,
          onShow = _props.onShow,
          startLabel = _props.startLabel,
          style = _props.style,
          utils = _props.utils,
          other = _objectWithoutProperties(_props, ['DateTimeFormat', 'autoOk', 'autoOpenField', 'blockedDateTimeRanges', 'calendarDateWidth', 'calendarTimeWidth', 'cancelLabel', 'container', 'dayButtonSize', 'displayTime', 'edit', 'endLabel', 'showCalendarDate', 'showCalendarStatus', 'initialStartDate', 'initialEndDate', 'firstDayOfWeek', 'locale', 'mode', 'okLabel', 'onAccept', 'onUpdate', 'onDismiss', 'onShow', 'startLabel', 'style', 'utils']);

      var _state3 = this.state,
          allRefs = _state3.allRefs,
          open = _state3.open;


      var newAnchorEl = this.state.anchorEl;
      if (this.state.edit === 'start') {
        newAnchorEl = this.state.displayTime ? allRefs.startTime : allRefs.startDate;
      } else {
        newAnchorEl = this.state.displayTime ? allRefs.endTime : allRefs.endDate;
      }

      var content = _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement(_reactEventListener2.default, {
          target: 'window',
          onKeyUp: this.handleWindowKeyUp
        }),
        showCalendarDate && _react2.default.createElement(_DateRangeDisplay2.default, {
          DateTimeFormat: DateTimeFormat,
          disableYearSelection: true,
          displayTime: this.state.displayTime,
          onTouchTapMonthDay: this.handleTouchTapDateDisplayMonthDay,
          onTouchTapYear: this.handleTouchTapDateDisplayYear,
          onTouchTapMenu: this.handleTouchTapMenu.bind(this),
          locale: locale,
          monthDaySelected: true,
          mode: this.props.mode,
          end: this.state.end,
          edit: this.state.edit,
          start: this.state.start
        }),
        showCalendarStatus && _react2.default.createElement(_DateRangeStatusDisplay2.default, {
          displayTime: this.state.displayTime,
          edit: this.state.edit,
          endLabel: endLabel,
          mode: this.props.mode,
          startLabel: startLabel
        }),
        _react2.default.createElement(_RangeCalendar2.default, {
          autoOk: autoOk,
          blockedDateTimeRanges: blockedDateTimeRanges,
          DateTimeFormat: DateTimeFormat,
          calendarDateWidth: calendarDateWidth,
          calendarTimeWidth: calendarTimeWidth,
          cancelLabel: cancelLabel,
          disableYearSelection: true,
          displayTime: this.state.displayTime,
          dayButtonSize: dayButtonSize,
          firstDayOfWeek: firstDayOfWeek,
          locale: locale,
          onTouchTapDay: this.handleTouchTapDay.bind(this),
          onTouchTapHour: this.handleTouchTapHour.bind(this),
          mode: mode,
          open: open,
          ref: 'startCalendar',
          onTouchTapCancel: this.handleTouchTapCancel,
          onTouchTapOk: this.handleTouchTapOk,
          okLabel: okLabel,
          openToYearSelection: false,
          edit: this.state.edit,
          end: this.state.end,
          start: this.state.start,
          setSelectedDate: this.setSelectedDate.bind(this),
          onMonthChange: this.handleMonthChange,
          utils: utils
        })
      );

      return _react2.default.createElement(
        'div',
        _extends({}, other, { ref: 'root' }),
        container === 'inline' ? _react2.default.createElement(
          _Popover2.default,
          {
            action: this.popover,
            anchorEl: newAnchorEl || this.refs.root,
            anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
            transformOrigin: { horizontal: 'left', vertical: 'top' },
            ref: 'dialog',
            open: open,
            onClose: this.handleRequestClose
          },
          content
        ) : _react2.default.createElement(
          _Dialog2.default,
          {
            ref: 'dialog',
            open: open,
            onClose: this.handleRequestClose
          },
          content
        )
      );
    }
  }]);

  return DateRangePickerDialog;
}(_react.Component);

DateRangePickerDialog.propTypes = {
  DateTimeFormat: _propTypes2.default.func,
  autoOk: _propTypes2.default.bool,
  autoOpenField: _propTypes2.default.bool,
  blockedDateTimeRanges: _propTypes2.default.array,
  calendarDateWidth: _propTypes2.default.string,
  calendarTimeWidth: _propTypes2.default.string,
  cancelLabel: _propTypes2.default.node,
  container: _propTypes2.default.oneOf(['dialog', 'inline']),
  dayButtonSize: _propTypes2.default.string,
  displayTime: _propTypes2.default.bool,
  edit: _propTypes2.default.string,
  end: _propTypes2.default.object,
  endLabel: _propTypes2.default.string,
  firstDayOfWeek: _propTypes2.default.number,
  initialEndDate: _propTypes2.default.object,
  initialStartDate: _propTypes2.default.object,
  locale: _propTypes2.default.string,
  mode: _propTypes2.default.oneOf(['portrait', 'landscape']),
  okLabel: _propTypes2.default.node,
  onAccept: _propTypes2.default.func,
  onDismiss: _propTypes2.default.func,
  onShow: _propTypes2.default.func,
  onUpdate: _propTypes2.default.func,
  open: _propTypes2.default.bool,
  showCalendarDate: _propTypes2.default.bool,
  showCalendarStatus: _propTypes2.default.bool,
  start: _propTypes2.default.object,
  startLabel: _propTypes2.default.string,
  style: _propTypes2.default.object,
  utils: _propTypes2.default.object
};
DateRangePickerDialog.defaultProps = {
  DateTimeFormat: _dateUtils.dateTimeFormat,
  cancelLabel: 'Cancel',
  container: 'dialog',
  initialEndDate: new Date(),
  initialStartDate: new Date(),
  locale: 'en-US',
  okLabel: 'OK',
  utils: _dateUtils.defaultUtils
};
DateRangePickerDialog.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
exports.default = DateRangePickerDialog;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9EYXRlUGlja2VyL0RhdGVSYW5nZVBpY2tlckRpYWxvZy5qcyJdLCJuYW1lcyI6WyJEYXRlUmFuZ2VQaWNrZXJEaWFsb2ciLCJwcm9wcyIsInN0YXRlIiwiYWxsUmVmcyIsImVuZERhdGUiLCJlbmRUaW1lIiwic3RhcnREYXRlIiwic3RhcnRUaW1lIiwiYW5jaG9yRWwiLCJlZGl0IiwiZGlzcGxheVRpbWUiLCJlbmQiLCJkaXNwbGF5RGF0ZSIsInVuZGVmaW5lZCIsImRpc3BsYXlNb250aERheSIsIm1heERhdGUiLCJtaW5EYXRlIiwic2VsZWN0ZWREYXRlIiwic2hvdWxkRGlzYWJsZURhdGUiLCJvcGVuIiwic3RhcnQiLCJzaG93Iiwic2hvd1JlZiIsInN0YXJ0RW5kIiwiZGF0ZVRpbWUiLCJvblNob3ciLCJzZXRTdGF0ZSIsInJlc2V0IiwidXRpbHMiLCJnZXRGaXJzdERheU9mTW9udGgiLCJpbml0aWFsRW5kRGF0ZSIsImluaXRpYWxTdGFydERhdGUiLCJkaXNtaXNzIiwib25EaXNtaXNzIiwiaGFuZGxlVG91Y2hUYXBEYXkiLCJldmVudCIsImRhdGUiLCJuZXdTdGF0ZSIsInNldFNlbGVjdGVkRGF0ZSIsImtlZXBPcGVuIiwiYXV0b09wZW5GaWVsZCIsIiRzZXQiLCJvbkFjY2VwdCIsInBvcG92ZXIiLCJjdXJyZW50IiwidXBkYXRlUG9zaXRpb24iLCJoYW5kbGVUb3VjaFRhcEhvdXIiLCJob3VyIiwic2V0U2VsZWN0ZWRUaW1lIiwiaGFuZGxlVG91Y2hUYXBDYW5jZWwiLCJoYW5kbGVSZXF1ZXN0Q2xvc2UiLCJoYW5kbGVUb3VjaFRhcE9rIiwiaGFuZGxlV2luZG93S2V5VXAiLCJoYW5kbGVNb250aENoYW5nZSIsIm1vbnRocyIsImRpcmVjdGlvbiIsInRyYW5zaXRpb25EaXJlY3Rpb24iLCJhZGRNb250aHMiLCJoYW5kbGVUb3VjaFRhcE1lbnUiLCJoYW5kbGVUb3VjaFRhcFllYXIiLCJ5ZWFyIiwic2V0WWVhciIsImhhbmRsZVRvdWNoVGFwRGF0ZURpc3BsYXlNb250aERheSIsIlJlYWN0IiwiY3JlYXRlUmVmIiwiYWRkWWVhcnMiLCJEYXRlIiwibmV3U2VsZWN0ZWREYXRlIiwibmV3RGlzcGxheURhdGUiLCJuZXdTZWxlY3RlZEVuZERhdGUiLCJzZXRUaW1lIiwiZ2V0VGltZSIsImJsb2NrZWRSYW5nZU92ZXJsYXBzIiwiYWRqdXN0ZWREYXRlIiwiY2xvc2VzdFJhbmdlIiwiYmxvY2tlZERhdGVUaW1lUmFuZ2VzIiwiZ2V0TWluRGF0ZSIsImdldE1heERhdGUiLCJmaXJzdEF2YWlsYWJsZVRpbWUiLCJhZGp1c3RlZEVuZERhdGUiLCJzZXREaXNwbGF5RGF0ZSIsImRhdGVUb0NoZWNrIiwiaG91cnNJbkRheSIsInNldEhvdXJzIiwic2VsZWN0ZWRTdGFydERhdGUiLCJzdHlsZXMiLCJob3VyQXJyYXkiLCJpIiwicHVzaCIsIm1hcCIsImdldEhvdXJFbGVtZW50IiwibW9kZSIsIkRhdGVUaW1lRm9ybWF0IiwiYXV0b09rIiwiY2FsZW5kYXJEYXRlV2lkdGgiLCJjYWxlbmRhclRpbWVXaWR0aCIsImNhbmNlbExhYmVsIiwiY29udGFpbmVyIiwiZGF5QnV0dG9uU2l6ZSIsImVuZExhYmVsIiwic2hvd0NhbGVuZGFyRGF0ZSIsInNob3dDYWxlbmRhclN0YXR1cyIsImZpcnN0RGF5T2ZXZWVrIiwibG9jYWxlIiwib2tMYWJlbCIsIm9uVXBkYXRlIiwic3RhcnRMYWJlbCIsInN0eWxlIiwib3RoZXIiLCJuZXdBbmNob3JFbCIsImNvbnRlbnQiLCJoYW5kbGVUb3VjaFRhcERhdGVEaXNwbGF5WWVhciIsImJpbmQiLCJyZWZzIiwicm9vdCIsImhvcml6b250YWwiLCJ2ZXJ0aWNhbCIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsImZ1bmMiLCJib29sIiwiYXJyYXkiLCJzdHJpbmciLCJub2RlIiwib25lT2YiLCJvYmplY3QiLCJudW1iZXIiLCJkZWZhdWx0UHJvcHMiLCJkYXRlVGltZUZvcm1hdCIsImRlZmF1bHRVdGlscyIsImNvbnRleHRUeXBlcyIsIm11aVRoZW1lIiwiaXNSZXF1aXJlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0lBV01BLHFCOzs7QUFrREosaUNBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSw4SUFDWEEsS0FEVzs7QUFBQSxVQUtuQkMsS0FMbUIsR0FLWDtBQUNOQyxlQUFTO0FBQ1BDLGlCQUFTLElBREY7QUFFUEMsaUJBQVMsSUFGRjtBQUdQQyxtQkFBVyxJQUhKO0FBSVBDLG1CQUFXO0FBSkosT0FESDtBQU9OQyxnQkFBVSxJQVBKO0FBUU5DLFlBQU0sT0FSQTtBQVNOQyxtQkFBYSxLQVRQO0FBVU5DLFdBQUs7QUFDSEMscUJBQWFDLFNBRFY7QUFFSEMseUJBQWlCRCxTQUZkO0FBR0hFLGlCQUFTRixTQUhOO0FBSUhHLGlCQUFTSCxTQUpOO0FBS0hJLHNCQUFjSixTQUxYO0FBTUhLLDJCQUFtQkw7QUFOaEIsT0FWQztBQWtCTk0sWUFBTSxLQWxCQTtBQW1CTkMsYUFBTztBQUNMUixxQkFBYUMsU0FEUjtBQUVMQyx5QkFBaUJELFNBRlo7QUFHTEUsaUJBQVNGLFNBSEo7QUFJTEcsaUJBQVNILFNBSko7QUFLTEksc0JBQWNKLFNBTFQ7QUFNTEssMkJBQW1CTDtBQU5kO0FBbkJELEtBTFc7O0FBQUEsVUE2UG5CUSxJQTdQbUIsR0E2UFosVUFBQ0MsT0FBRCxFQUFVQyxRQUFWLEVBQW9CQyxRQUFwQixFQUE4QnJCLE9BQTlCLEVBQTBDO0FBQy9DLFVBQUksTUFBS0YsS0FBTCxDQUFXd0IsTUFBWCxJQUFxQixDQUFDLE1BQUt2QixLQUFMLENBQVdpQixJQUFyQyxFQUEyQztBQUN6QyxjQUFLbEIsS0FBTCxDQUFXd0IsTUFBWDtBQUNEO0FBQ0QsWUFBS0MsUUFBTCxDQUFjO0FBQ1p2QixpQkFBU0EsT0FERztBQUVaSyxrQkFBVWMsT0FGRTtBQUdaYixjQUFNYyxRQUhNO0FBSVpiLHFCQUFjYyxhQUFhO0FBSmYsT0FBZCxFQUtHLFlBQU07QUFDUCxjQUFLRSxRQUFMLENBQWM7QUFDWlAsZ0JBQU07QUFETSxTQUFkO0FBR0QsT0FURDtBQVVELEtBM1FrQjs7QUFBQSxVQTZRbkJRLEtBN1FtQixHQTZRWCxZQUFNO0FBQ1osWUFBS0QsUUFBTCxDQUFjO0FBQ1p2QixpQkFBUztBQUNQQyxtQkFBUyxJQURGO0FBRVBDLG1CQUFTLElBRkY7QUFHUEMscUJBQVcsSUFISjtBQUlQQyxxQkFBVztBQUpKLFNBREc7QUFPWkMsa0JBQVUsSUFQRTtBQVFaQyxjQUFNLE9BUk07QUFTWkMscUJBQWEsS0FURDtBQVVaQyxhQUFLO0FBQ0hDLHVCQUFhLE1BQUtYLEtBQUwsQ0FBVzJCLEtBQVgsQ0FBaUJDLGtCQUFqQixDQUFvQyxNQUFLNUIsS0FBTCxDQUFXNkIsY0FBL0MsQ0FEVjtBQUVIZixtQkFBVSxNQUFLZCxLQUFMLENBQVdVLEdBQVgsR0FBaUIsTUFBS1YsS0FBTCxDQUFXVSxHQUFYLENBQWVJLE9BQWhDLEdBQTBDRixTQUZqRDtBQUdIRyxtQkFBVSxNQUFLZixLQUFMLENBQVdVLEdBQVgsR0FBaUIsTUFBS1YsS0FBTCxDQUFXVSxHQUFYLENBQWVLLE9BQWhDLEdBQTBDSCxTQUhqRDtBQUlISSx3QkFBYyxNQUFLaEIsS0FBTCxDQUFXNkIsY0FKdEI7QUFLSFosNkJBQW9CLE1BQUtqQixLQUFMLENBQVdVLEdBQVgsR0FBaUIsTUFBS1YsS0FBTCxDQUFXVSxHQUFYLENBQWVPLGlCQUFoQyxHQUFvREw7QUFMckUsU0FWTztBQWlCWk0sY0FBTSxLQWpCTTtBQWtCWkMsZUFBTztBQUNMUix1QkFBYSxNQUFLWCxLQUFMLENBQVcyQixLQUFYLENBQWlCQyxrQkFBakIsQ0FBb0MsTUFBSzVCLEtBQUwsQ0FBVzhCLGdCQUEvQyxDQURSO0FBRUxoQixtQkFBVSxNQUFLZCxLQUFMLENBQVdtQixLQUFYLEdBQW1CLE1BQUtuQixLQUFMLENBQVdtQixLQUFYLENBQWlCTCxPQUFwQyxHQUE4Q0YsU0FGbkQ7QUFHTEcsbUJBQVUsTUFBS2YsS0FBTCxDQUFXbUIsS0FBWCxHQUFtQixNQUFLbkIsS0FBTCxDQUFXbUIsS0FBWCxDQUFpQkosT0FBcEMsR0FBOENILFNBSG5EO0FBSUxJLHdCQUFjLE1BQUtoQixLQUFMLENBQVc4QixnQkFKcEI7QUFLTGIsNkJBQW9CLE1BQUtqQixLQUFMLENBQVdtQixLQUFYLEdBQW1CLE1BQUtuQixLQUFMLENBQVdtQixLQUFYLENBQWlCRixpQkFBcEMsR0FBd0RMO0FBTHZFO0FBbEJLLE9BQWQ7QUEwQkQsS0F4U2tCOztBQUFBLFVBMFNuQm1CLE9BMVNtQixHQTBTVCxZQUFNO0FBQ2QsVUFBSSxNQUFLL0IsS0FBTCxDQUFXZ0MsU0FBWCxJQUF3QixNQUFLL0IsS0FBTCxDQUFXaUIsSUFBdkMsRUFBNkM7QUFDM0MsWUFBSSxNQUFLakIsS0FBTCxDQUFXa0IsS0FBWCxDQUFpQkgsWUFBakIsSUFBaUMsTUFBS2YsS0FBTCxDQUFXUyxHQUFYLENBQWVNLFlBQWhELElBQ0EsQ0FBQyxnQ0FBZ0IsTUFBS2YsS0FBTCxDQUFXa0IsS0FBWCxDQUFpQkgsWUFBakMsRUFBK0MsTUFBS2YsS0FBTCxDQUFXUyxHQUFYLENBQWVNLFlBQTlELENBREwsRUFDa0Y7QUFDaEYsZ0JBQUtoQixLQUFMLENBQVdnQyxTQUFYLENBQXFCO0FBQ25CYixtQkFBTyxNQUFLbEIsS0FBTCxDQUFXa0IsS0FBWCxDQUFpQkgsWUFETDtBQUVuQk4saUJBQUssTUFBS1QsS0FBTCxDQUFXUyxHQUFYLENBQWVNO0FBRkQsV0FBckI7QUFJRCxTQU5ELE1BTU87QUFDTCxnQkFBS2hCLEtBQUwsQ0FBV2dDLFNBQVgsQ0FBcUI7QUFDbkJiLG1CQUFPLElBRFk7QUFFbkJULGlCQUFLO0FBRmMsV0FBckI7QUFJRDtBQUNGO0FBQ0QsWUFBS2UsUUFBTCxDQUFjO0FBQ1o7QUFDQTtBQUNBUCxjQUFNO0FBSE0sT0FBZDtBQUtELEtBOVRrQjs7QUFBQSxVQWdVbkJlLGlCQWhVbUIsR0FnVUMsVUFBQ0MsS0FBRCxFQUFRQyxJQUFSLEVBQWlCO0FBQ25DLFVBQUlDLFdBQVcsTUFBS0MsZUFBTCxDQUFxQkYsSUFBckIsQ0FBZjtBQURtQyx3QkFFWCxNQUFLbEMsS0FGTTtBQUFBLFVBRTVCQyxPQUY0QixlQUU1QkEsT0FGNEI7QUFBQSxVQUVuQk0sSUFGbUIsZUFFbkJBLElBRm1COztBQUduQyxVQUFJOEIsV0FBVyxLQUFmO0FBQ0EsVUFBSSxDQUFDLE1BQUt0QyxLQUFMLENBQVd1QyxhQUFoQixFQUErQjtBQUM3QkgsbUJBQVcsaUNBQU9BLFFBQVAsRUFBaUI7QUFDMUJsQixnQkFBTSxFQUFDc0IsTUFBTSxLQUFQO0FBRG9CLFNBQWpCLENBQVg7QUFHRCxPQUpELE1BSU87QUFDTEosbUJBQVcsaUNBQU9BLFFBQVAsRUFBaUI7QUFDMUIzQix1QkFBYSxFQUFDK0IsTUFBTSxJQUFQLEVBRGE7QUFFMUJqQyxvQkFBVSxFQUFDaUMsTUFBT2hDLFNBQVMsT0FBVCxHQUFtQk4sUUFBUUksU0FBM0IsR0FBdUNKLFFBQVFFLE9BQXZEO0FBRmdCLFNBQWpCLENBQVg7QUFJQWtDLG1CQUFXLElBQVg7QUFDRDtBQUNELFlBQUtiLFFBQUwsQ0FBY1csUUFBZCxFQUF3QixZQUFNO0FBQzVCLGNBQUtwQyxLQUFMLENBQVd5QyxRQUFYLENBQW9CO0FBQ2xCdEIsaUJBQU9pQixTQUFTakIsS0FBVCxDQUFlSCxZQURKO0FBRWxCTixlQUFLMEIsU0FBUzFCLEdBQVQsQ0FBYU07QUFGQSxTQUFwQixFQUdHc0IsUUFISDtBQUlBLGNBQUtJLE9BQUwsQ0FBYUMsT0FBYixDQUFxQkMsY0FBckI7QUFDRCxPQU5EO0FBT0QsS0F0VmtCOztBQUFBLFVBd1ZuQkMsa0JBeFZtQixHQXdWRSxVQUFDQyxJQUFELEVBQVU7QUFBQSxVQUN0QnRDLElBRHNCLEdBQ2QsTUFBS1AsS0FEUyxDQUN0Qk8sSUFEc0I7O0FBRTdCLFVBQUk0QixXQUFXLE1BQUtXLGVBQUwsQ0FBcUJELElBQXJCLENBQWY7QUFDQSxVQUFJUixXQUFXLEtBQWY7O0FBRUEsVUFBSSxDQUFDLE1BQUt0QyxLQUFMLENBQVd1QyxhQUFoQixFQUErQjtBQUM3QkgsbUJBQVcsaUNBQU9BLFFBQVAsRUFBaUI7QUFDMUJsQixnQkFBTSxFQUFDc0IsTUFBTSxLQUFQO0FBRG9CLFNBQWpCLENBQVg7QUFHRCxPQUpELE1BSU87QUFDTCxZQUFJaEMsU0FBUyxPQUFiLEVBQXNCO0FBQ3BCNEIscUJBQVcsaUNBQU9BLFFBQVAsRUFBaUI7QUFDMUIzQix5QkFBYSxFQUFDK0IsTUFBTSxLQUFQLEVBRGE7QUFFMUJoQyxrQkFBTSxFQUFDZ0MsTUFBTSxLQUFQO0FBRm9CLFdBQWpCLENBQVg7QUFJQUYscUJBQVcsSUFBWDtBQUNELFNBTkQsTUFNTztBQUNMRixxQkFBVyxpQ0FBT0EsUUFBUCxFQUFpQjtBQUMxQmxCLGtCQUFNLEVBQUNzQixNQUFNLEtBQVA7QUFEb0IsV0FBakIsQ0FBWDtBQUdEO0FBQ0Y7O0FBRUQsWUFBS2YsUUFBTCxDQUFjVyxRQUFkO0FBQ0EsWUFBS3BDLEtBQUwsQ0FBV3lDLFFBQVgsQ0FBb0I7QUFDbEJ0QixlQUFPaUIsU0FBU2pCLEtBQVQsQ0FBZUgsWUFESjtBQUVsQk4sYUFBSzBCLFNBQVMxQixHQUFULENBQWFNO0FBRkEsT0FBcEIsRUFHR3NCLFFBSEg7QUFJRCxLQXBYa0I7O0FBQUEsVUFzWG5CVSxvQkF0WG1CLEdBc1hJLFlBQU07QUFDM0IsWUFBS2pCLE9BQUw7QUFDRCxLQXhYa0I7O0FBQUEsVUEwWG5Ca0Isa0JBMVhtQixHQTBYRSxZQUFNO0FBQ3pCLFlBQUtsQixPQUFMO0FBQ0QsS0E1WGtCOztBQUFBLFVBOFhuQm1CLGdCQTlYbUIsR0E4WEEsWUFBTTtBQUN2QjtBQUNBLFVBQUksTUFBS2xELEtBQUwsQ0FBV3lDLFFBQWYsRUFBeUI7QUFDdkIsY0FBS3pDLEtBQUwsQ0FBV3lDLFFBQVgsQ0FBb0I7QUFDbEJ0QixpQkFBTyxNQUFLbEIsS0FBTCxDQUFXa0IsS0FBWCxDQUFpQkgsWUFETjtBQUVsQk4sZUFBSyxNQUFLVCxLQUFMLENBQVdTLEdBQVgsQ0FBZU07QUFGRixTQUFwQjtBQUlEO0FBQ0QsWUFBS1MsUUFBTCxDQUFjO0FBQ1pQLGNBQU07QUFETSxPQUFkO0FBR0QsS0F6WWtCOztBQUFBLFVBMlluQmlDLGlCQTNZbUIsR0EyWUMsVUFBQ2pCLEtBQUQsRUFBVztBQUM3QixjQUFRLHVCQUFRQSxLQUFSLENBQVI7QUFDRSxhQUFLLE9BQUw7QUFDRSxnQkFBS2dCLGdCQUFMO0FBQ0E7QUFISjtBQUtELEtBalprQjs7QUFBQSxVQW1abkJFLGlCQW5abUIsR0FtWkMsVUFBQ0MsTUFBRCxFQUFZO0FBQUEseUJBQ1IsTUFBS3BELEtBREc7QUFBQSxVQUN2Qk8sSUFEdUIsZ0JBQ3ZCQSxJQUR1QjtBQUFBLFVBQ2pCVyxLQURpQixnQkFDakJBLEtBRGlCOztBQUU5QixVQUFNbUMsWUFBWUQsVUFBVSxDQUFWLEdBQWMsTUFBZCxHQUF1QixPQUF6QztBQUNBLFlBQUs1QixRQUFMLHFCQUNHLE1BQUt4QixLQUFMLENBQVdPLElBRGQsRUFDcUI7QUFDakIrQyw2QkFBcUJELFNBREo7QUFFakIzQyxxQkFBYSxNQUFLWCxLQUFMLENBQVcyQixLQUFYLENBQWlCNkIsU0FBakIsQ0FDVixNQUFLdkQsS0FBTCxDQUFXTyxJQUFYLEVBQWlCRyxXQUFqQixHQUErQixNQUFLVixLQUFMLENBQVdPLElBQVgsRUFBaUJHLFdBQWhELEdBQThEUSxNQUFNUixXQUQxRCxFQUN3RTBDLE1BRHhFLENBRkk7QUFJakJyQyxzQkFBZSxNQUFLZixLQUFMLENBQVdPLElBQVgsRUFBaUJRLFlBQWpCLEdBQWdDLE1BQUtmLEtBQUwsQ0FBV08sSUFBWCxFQUFpQlEsWUFBakQsR0FBZ0VHLE1BQU1ILFlBSnBFO0FBS2pCQywyQkFBb0IsTUFBS2hCLEtBQUwsQ0FBV08sSUFBWCxFQUFpQlMsaUJBQWpCLEdBQ2xCLE1BQUtoQixLQUFMLENBQVdPLElBQVgsRUFBaUJTLGlCQURDLEdBQ21CRSxNQUFNRjtBQU41QixPQURyQjtBQVVELEtBaGFrQjs7QUFBQSxVQWthbkJ3QyxrQkFsYW1CLEdBa2FFLFVBQUNqRCxJQUFELEVBQU9DLFdBQVAsRUFBdUI7QUFDMUMsWUFBS2dCLFFBQUwsQ0FBYztBQUNaakIsY0FBT0EsT0FBT0EsSUFBUCxHQUFjLE1BQUtSLEtBQUwsQ0FBV1EsSUFEcEI7QUFFWkMscUJBQWNBLGNBQWNBLFdBQWQsR0FBNEIsTUFBS1QsS0FBTCxDQUFXUztBQUZ6QyxPQUFkO0FBSUQsS0F2YWtCOztBQUFBLFVBeWFuQmlELGtCQXphbUIsR0F5YUUsVUFBQ3hCLEtBQUQsRUFBUXlCLElBQVIsRUFBaUI7QUFDcEMsWUFBS3RCLGVBQUwsQ0FBcUIsTUFBS3JDLEtBQUwsQ0FBVzJCLEtBQVgsQ0FBaUJpQyxPQUFqQixDQUF5QixNQUFLM0QsS0FBTCxDQUFXZSxZQUFwQyxFQUFrRDJDLElBQWxELENBQXJCLEVBQThFekIsS0FBOUU7QUFDQSxZQUFLMkIsaUNBQUw7QUFDRCxLQTVha0I7O0FBQUEsVUE4YW5CQSxpQ0E5YW1CLEdBOGFpQixZQUFNO0FBQ3hDLFVBQU16QixXQUFXLGlDQUFPLE1BQUtuQyxLQUFaLHNCQUNkLE1BQUtBLEtBQUwsQ0FBV08sSUFERyxFQUNJO0FBQ2pCSyx5QkFBaUIsRUFBQzJCLE1BQU0sSUFBUDtBQURBLE9BREosRUFBakI7QUFLQSxZQUFLZixRQUFMLENBQWNXLFFBQWQ7QUFDRCxLQXJia0I7O0FBRWpCLFVBQUtNLE9BQUwsR0FBZW9CLGdCQUFNQyxTQUFOLEVBQWY7QUFGaUI7QUFHbEI7Ozs7Z0RBK0IyQjtBQUMxQixXQUFLdEMsUUFBTCxDQUFjO0FBQ1pmLGFBQUs7QUFDSEMsdUJBQWEsS0FBS1gsS0FBTCxDQUFXMkIsS0FBWCxDQUFpQkMsa0JBQWpCLENBQW9DLEtBQUs1QixLQUFMLENBQVc2QixjQUEvQyxDQURWO0FBRUhmLG1CQUFVLEtBQUtkLEtBQUwsQ0FBV1UsR0FBWCxHQUFpQixLQUFLVixLQUFMLENBQVdVLEdBQVgsQ0FBZUksT0FBaEMsR0FBMENGLFNBRmpEO0FBR0hHLG1CQUFVLEtBQUtmLEtBQUwsQ0FBV1UsR0FBWCxHQUFpQixLQUFLVixLQUFMLENBQVdVLEdBQVgsQ0FBZUssT0FBaEMsR0FBMENILFNBSGpEO0FBSUhJLHdCQUFjLEtBQUtoQixLQUFMLENBQVc2QixjQUp0QjtBQUtIWiw2QkFBb0IsS0FBS2pCLEtBQUwsQ0FBV1UsR0FBWCxHQUFpQixLQUFLVixLQUFMLENBQVdVLEdBQVgsQ0FBZU8saUJBQWhDLEdBQW9ETDtBQUxyRSxTQURPO0FBUVpPLGVBQU87QUFDTFIsdUJBQWEsS0FBS1gsS0FBTCxDQUFXMkIsS0FBWCxDQUFpQkMsa0JBQWpCLENBQW9DLEtBQUs1QixLQUFMLENBQVc4QixnQkFBL0MsQ0FEUjtBQUVMaEIsbUJBQVUsS0FBS2QsS0FBTCxDQUFXbUIsS0FBWCxHQUFtQixLQUFLbkIsS0FBTCxDQUFXbUIsS0FBWCxDQUFpQkwsT0FBcEMsR0FBOENGLFNBRm5EO0FBR0xHLG1CQUFVLEtBQUtmLEtBQUwsQ0FBV21CLEtBQVgsR0FBbUIsS0FBS25CLEtBQUwsQ0FBV21CLEtBQVgsQ0FBaUJKLE9BQXBDLEdBQThDSCxTQUhuRDtBQUlMSSx3QkFBYyxLQUFLaEIsS0FBTCxDQUFXOEIsZ0JBSnBCO0FBS0xiLDZCQUFvQixLQUFLakIsS0FBTCxDQUFXbUIsS0FBWCxHQUFtQixLQUFLbkIsS0FBTCxDQUFXbUIsS0FBWCxDQUFpQkYsaUJBQXBDLEdBQXdETDtBQUx2RTtBQVJLLE9BQWQ7QUFnQkQ7OztpQ0FFWTtBQUNYLGFBQU8sS0FBS1gsS0FBTCxDQUFXLEtBQUtBLEtBQUwsQ0FBV08sSUFBdEIsRUFBNEJPLE9BQTVCLElBQXVDLEtBQUtmLEtBQUwsQ0FBVzJCLEtBQVgsQ0FBaUJxQyxRQUFqQixDQUEwQixJQUFJQyxJQUFKLEVBQTFCLEVBQXNDLENBQUMsR0FBdkMsQ0FBOUM7QUFDRDs7O2lDQUVZO0FBQ1gsYUFBTyxLQUFLaEUsS0FBTCxDQUFXLEtBQUtBLEtBQUwsQ0FBV08sSUFBdEIsRUFBNEJNLE9BQTVCLElBQXVDLEtBQUtkLEtBQUwsQ0FBVzJCLEtBQVgsQ0FBaUJxQyxRQUFqQixDQUEwQixJQUFJQyxJQUFKLEVBQTFCLEVBQXNDLEdBQXRDLENBQTlDO0FBQ0Q7OzttQ0FFYzlCLEksRUFBTStCLGUsRUFBaUI7QUFDcEMsVUFBTUMsaUJBQWlCLEtBQUtuRSxLQUFMLENBQVcyQixLQUFYLENBQWlCQyxrQkFBakIsQ0FBb0NPLElBQXBDLENBQXZCO0FBQ0EsVUFBTWlDLHFCQUFxQiwwQkFBVUYsZUFBVixDQUEzQjtBQUNBRSx5QkFBbUJDLE9BQW5CLENBQTJCRCxtQkFBbUJFLE9BQW5CLEtBQStCLElBQUksRUFBSixHQUFTLEVBQVQsR0FBYyxJQUF4RTtBQUNBLFVBQUlILG1CQUFtQixLQUFLbEUsS0FBTCxDQUFXLEtBQUtBLEtBQUwsQ0FBV08sSUFBdEIsRUFBNEJHLFdBQW5ELEVBQWdFO0FBQzlELFlBQU0yQyxZQUFZYSxpQkFBaUIsS0FBS2xFLEtBQUwsQ0FBVyxLQUFLQSxLQUFMLENBQVdPLElBQXRCLEVBQTRCRyxXQUE3QyxHQUEyRCxNQUEzRCxHQUFvRSxPQUF0RjtBQUNBLFlBQUl5QixXQUFXLGlDQUFPLEtBQUtuQyxLQUFaLHNCQUNaLEtBQUtBLEtBQUwsQ0FBV08sSUFEQyxFQUNNO0FBQ2pCRyx1QkFBYSxFQUFDNkIsTUFBTTJCLGNBQVAsRUFESTtBQUVqQlosK0JBQXFCLEVBQUNmLE1BQU1jLFNBQVAsRUFGSjtBQUdqQnRDLHdCQUFjLEVBQUN3QixNQUFNMEIsbUJBQW1CLEtBQUtqRSxLQUFMLENBQVcsS0FBS0EsS0FBTCxDQUFXTyxJQUF0QixFQUE0QlEsWUFBdEQ7QUFIRyxTQUROLEVBQWY7QUFPQSxZQUFJLEtBQUtmLEtBQUwsQ0FBV08sSUFBWCxLQUFvQixPQUFwQixJQUErQixLQUFLUCxLQUFMLENBQVdTLEdBQVgsQ0FBZU0sWUFBOUMsS0FDRCxnQ0FBZ0JrRCxlQUFoQixFQUFpQyxLQUFLakUsS0FBTCxDQUFXUyxHQUFYLENBQWVNLFlBQWhELEtBQ0QsZ0NBQWdCa0QsZUFBaEIsRUFBaUMsS0FBS2pFLEtBQUwsQ0FBV1MsR0FBWCxDQUFlTSxZQUFoRCxDQURDLElBRUQsS0FBS3VELG9CQUFMLENBQTBCTCxlQUExQixDQUhFLENBQUosRUFHK0M7QUFDN0M5QixxQkFBVyxpQ0FBT0EsUUFBUCxFQUFpQjtBQUMxQjFCLGlCQUFLO0FBQ0hDLDJCQUFhLEVBQUM2QixNQUFNNUIsU0FBUCxFQURWO0FBRUg7QUFDQTJDLG1DQUFxQixFQUFDZixNQUFNYyxTQUFQLEVBSGxCO0FBSUh0Qyw0QkFBYyxFQUFDd0IsTUFBTTVCLFNBQVA7QUFDZDtBQUxHO0FBRHFCLFdBQWpCLENBQVg7QUFTRDtBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFPd0IsUUFBUDtBQUNEO0FBQ0QsYUFBTyxLQUFLbkMsS0FBWjtBQUNEOzs7eUNBRW9CdUUsWSxFQUFjO0FBQ2pDLFVBQU1DLGVBQWUsdUNBQXVCLEtBQUt6RSxLQUFMLENBQVcwRSxxQkFBbEMsRUFBeURGLFlBQXpELENBQXJCO0FBQ0EsVUFBTXJFLFVBQVUsS0FBS0YsS0FBTCxDQUFXUyxHQUFYLENBQWVNLFlBQS9CO0FBQ0EsYUFBUWIsV0FBV3NFLFlBQVgsSUFBMkIsZ0NBQWdCdEUsT0FBaEIsRUFBeUJzRSxhQUFhdEQsS0FBdEMsQ0FBbkM7QUFDRDs7O29DQUVlZ0IsSSxFQUFNO0FBQ3BCLFVBQUlxQyxlQUFlckMsSUFBbkI7QUFDQSxVQUFJQyxpQkFBSjtBQUNBLFVBQU1yQixVQUFVLEtBQUs0RCxVQUFMLEVBQWhCO0FBQ0EsVUFBTTdELFVBQVUsS0FBSzhELFVBQUwsRUFBaEI7QUFKb0IsbUJBS0UsS0FBSzNFLEtBTFA7QUFBQSxVQUtiTyxJQUxhLFVBS2JBLElBTGE7QUFBQSxVQUtQVyxLQUxPLFVBS1BBLEtBTE87O0FBTXBCLFVBQUksaUNBQWlCZ0IsSUFBakIsRUFBdUJwQixPQUF2QixDQUFKLEVBQXFDO0FBQ25DeUQsdUJBQWV6RCxPQUFmO0FBQ0QsT0FGRCxNQUVPLElBQUksZ0NBQWdCb0IsSUFBaEIsRUFBc0JyQixPQUF0QixDQUFKLEVBQW9DO0FBQ3pDMEQsdUJBQWUxRCxPQUFmO0FBQ0Q7O0FBRUQwRCxxQkFBZSxLQUFLSyxrQkFBTCxDQUF3QkwsWUFBeEIsQ0FBZjs7QUFFQSxVQUFJaEUsU0FBUyxLQUFULElBQWtCLGlDQUFpQmdFLFlBQWpCLEVBQStCckQsTUFBTUgsWUFBckMsQ0FBdEIsRUFBMEU7QUFDeEV3RCx1QkFBZSxJQUFJUCxJQUFKLENBQVM5QyxNQUFNSCxZQUFOLENBQW1Cc0QsT0FBbkIsRUFBVCxDQUFmO0FBQ0Q7QUFDRCxVQUFNUSxrQkFBa0IsMEJBQVVOLFlBQVYsQ0FBeEI7QUFDQU0sc0JBQWdCVCxPQUFoQixDQUF3QlMsZ0JBQWdCUixPQUFoQixLQUE0QixJQUFJLEVBQUosR0FBUyxFQUFULEdBQWMsSUFBbEU7O0FBRUEsVUFBTUgsaUJBQWlCLEtBQUtuRSxLQUFMLENBQVcyQixLQUFYLENBQWlCQyxrQkFBakIsQ0FBb0M0QyxZQUFwQyxDQUF2QjtBQUNBLFVBQUlMLG1CQUFtQixLQUFLbEUsS0FBTCxDQUFXLEtBQUtBLEtBQUwsQ0FBV08sSUFBdEIsRUFBNEJHLFdBQW5ELEVBQWdFO0FBQzlEeUIsbUJBQVcsS0FBSzJDLGNBQUwsQ0FBb0JaLGNBQXBCLEVBQW9DSyxZQUFwQyxDQUFYO0FBQ0QsT0FGRCxNQUVPO0FBQ0xwQyxtQkFBVyxpQ0FBTyxLQUFLbkMsS0FBWixzQkFDUixLQUFLQSxLQUFMLENBQVdPLElBREgsRUFDVTtBQUNqQlEsd0JBQWMsRUFBQ3dCLE1BQU1nQyxZQUFQO0FBREcsU0FEVixFQUFYO0FBS0EsWUFBSSxLQUFLdkUsS0FBTCxDQUFXTyxJQUFYLEtBQW9CLE9BQXBCLElBQStCLEtBQUtQLEtBQUwsQ0FBV1MsR0FBWCxDQUFlTSxZQUE5QyxLQUNELGdDQUFnQndELFlBQWhCLEVBQThCLEtBQUt2RSxLQUFMLENBQVdTLEdBQVgsQ0FBZU0sWUFBN0MsS0FDRCxnQ0FBZ0J3RCxZQUFoQixFQUE4QixLQUFLdkUsS0FBTCxDQUFXUyxHQUFYLENBQWVNLFlBQTdDLENBREMsSUFFRCxLQUFLdUQsb0JBQUwsQ0FBMEJDLFlBQTFCLENBSEUsQ0FBSixFQUc0QztBQUMxQ3BDLHFCQUFXLGlDQUFPQSxRQUFQLEVBQWlCO0FBQzFCMUIsaUJBQUs7QUFDSE0sNEJBQWMsRUFBQ3dCLE1BQU01QixTQUFQO0FBQ2Q7QUFGRztBQURxQixXQUFqQixDQUFYO0FBTUQ7QUFDRjtBQUNELFVBQUksS0FBS1osS0FBTCxDQUFXdUMsYUFBZixFQUE4QjtBQUM1QkgsbUJBQVcsaUNBQU9BLFFBQVAsRUFBaUI7QUFDMUIzQix1QkFBYSxFQUFDK0IsTUFBTSxJQUFQO0FBRGEsU0FBakIsQ0FBWDtBQUdEO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsYUFBT0osUUFBUDtBQUNEOzs7dUNBRWtCNEMsVyxFQUFhO0FBQzlCLFVBQU1DLGFBQWEsRUFBbkI7QUFEOEIsVUFFdkJQLHFCQUZ1QixHQUVFLEtBQUsxRSxLQUZQLENBRXZCMEUscUJBRnVCO0FBQUEsb0JBR1IsS0FBS3pFLEtBSEc7QUFBQSxVQUd2Qk8sSUFIdUIsV0FHdkJBLElBSHVCO0FBQUEsVUFHakJXLEtBSGlCLFdBR2pCQSxLQUhpQjs7QUFJOUIsVUFBTXFELGVBQWUsMEJBQVVRLFdBQVYsQ0FBckI7O0FBRUEsV0FBSyxJQUFJbEMsT0FBTyxDQUFoQixFQUFtQkEsT0FBT21DLFVBQTFCLEVBQXNDbkMsTUFBdEMsRUFBOEM7QUFDNUMwQixxQkFBYVUsUUFBYixDQUFzQnBDLElBQXRCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDO0FBQ0EsWUFBSXRDLFNBQVMsT0FBYixFQUFzQjtBQUNwQixjQUFJLENBQUMsaUNBQWlCZ0UsWUFBakIsRUFBK0IsSUFBSVAsSUFBSixFQUEvQixDQUFELElBQStDLENBQUMsbUNBQW1CUyxxQkFBbkIsRUFBMENGLFlBQTFDLENBQXBELEVBQTZHO0FBQzNHLG1CQUFPQSxZQUFQO0FBQ0Q7QUFDRixTQUpELE1BSU87QUFDTCxjQUFNVyxvQkFBb0JoRSxNQUFNSCxZQUFoQztBQUNBLGNBQU15RCxlQUFlLHVDQUF1QkMscUJBQXZCLEVBQThDUyxpQkFBOUMsQ0FBckI7O0FBRUEsY0FBSVYsWUFBSixFQUFrQjtBQUNoQixnQkFBSSxDQUFDLGdDQUFnQnRELE1BQU1ILFlBQXRCLEVBQW9Dd0QsWUFBcEMsQ0FBRCxJQUNHLENBQUMsaUNBQWlCQSxZQUFqQixFQUErQlcsaUJBQS9CLENBREosSUFFRyxDQUFDLGdDQUFnQlgsWUFBaEIsRUFBOEJDLGFBQWF0RCxLQUEzQyxDQUZSLEVBRTJEO0FBQ3pELHFCQUFPcUQsWUFBUDtBQUNEO0FBQ0YsV0FORCxNQU1PO0FBQ0wsZ0JBQUksQ0FBQyxnQ0FBZ0JyRCxNQUFNSCxZQUF0QixFQUFvQ3dELFlBQXBDLENBQUQsSUFDRyxDQUFDLGlDQUFpQkEsWUFBakIsRUFBK0JXLGlCQUEvQixDQURSLEVBQzJEO0FBQ3pELHFCQUFPWCxZQUFQO0FBQ0Q7QUFDRjtBQUNGO0FBQ0Y7QUFDRCxhQUFPQSxZQUFQO0FBQ0Q7OztvQ0FFZVksTSxFQUFRO0FBQUE7O0FBQ3RCLFVBQU1DLFlBQVksRUFBbEI7QUFDQSxVQUFNSixhQUFhLEVBQW5CO0FBQ0EsV0FBSyxJQUFJSyxJQUFJLENBQWIsRUFBZ0JBLElBQUlMLFVBQXBCLEVBQWdDSyxHQUFoQyxFQUFxQztBQUNuQ0Qsa0JBQVVFLElBQVYsQ0FBZUQsQ0FBZjtBQUNEOztBQUVELGFBQU9ELFVBQVVHLEdBQVYsQ0FBYyxVQUFDMUMsSUFBRCxFQUFPd0MsQ0FBUCxFQUFhO0FBQ2hDLGVBQ0U7QUFBQTtBQUFBLFlBQUssS0FBS0EsQ0FBVixFQUFhLE9BQU9GLE9BQU90QyxJQUEzQjtBQUNHLGlCQUFLMkMsY0FBTCxDQUFvQjNDLElBQXBCO0FBREgsU0FERjtBQUtELE9BTk0sRUFNSixJQU5JLENBQVA7QUFPRDs7O29DQUVlQSxJLEVBQU07QUFDcEIsVUFBTTRDLE9BQVEsS0FBS3pGLEtBQUwsQ0FBV08sSUFBWCxLQUFvQixPQUFwQixHQUE4QixLQUE5QixHQUFzQyxPQUFwRDtBQUNBLFVBQU1nRSxlQUFlLDBCQUFVLEtBQUt2RSxLQUFMLENBQVcsS0FBS0EsS0FBTCxDQUFXTyxJQUF0QixFQUE0QlEsWUFBdEMsQ0FBckI7QUFDQXdELG1CQUFhVSxRQUFiLENBQXNCcEMsSUFBdEIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEM7QUFDQSxVQUFNZ0Msa0JBQWtCLDBCQUFVTixZQUFWLENBQXhCO0FBQ0FNLHNCQUFnQlQsT0FBaEIsQ0FBd0JTLGdCQUFnQlIsT0FBaEIsS0FBNEIsSUFBSSxFQUFKLEdBQVMsRUFBVCxHQUFjLElBQWxFOztBQUVBLFVBQUlsQyxXQUFXLGlDQUFPLEtBQUtuQyxLQUFaLHNCQUdaLEtBQUtBLEtBQUwsQ0FBV08sSUFIQyxFQUdNO0FBQ2pCUSxzQkFBYyxFQUFDd0IsTUFBTWdDLFlBQVA7QUFERyxPQUhOLEVBQWY7O0FBU0EsVUFBSSxLQUFLdkUsS0FBTCxDQUFXTyxJQUFYLEtBQW9CLE9BQXBCLElBQStCLEtBQUtQLEtBQUwsQ0FBV1MsR0FBWCxDQUFlTSxZQUE5QyxJQUE4RHdELGVBQWUsS0FBS3ZFLEtBQUwsQ0FBV1MsR0FBWCxDQUFlTSxZQUFoRyxFQUE4RztBQUM1R29CLG1CQUFXLGlDQUFPQSxRQUFQLEVBQWlCO0FBQzFCMUIsZUFBSztBQUNITSwwQkFBYyxFQUFDd0IsTUFBTTVCLFNBQVA7QUFDZDtBQUZHO0FBRHFCLFNBQWpCLENBQVg7QUFNRDs7QUFFRCxVQUFJLEtBQUtaLEtBQUwsQ0FBV3VDLGFBQWYsRUFBOEI7QUFDNUJILG1CQUFXLGlDQUFPQSxRQUFQLEVBQWlCO0FBQzFCM0IsdUJBQWE7QUFDWCtCLGtCQUFNO0FBREssV0FEYTtBQUkxQmhDLGdCQUFNO0FBQ0pnQyxrQkFBTWtEO0FBREY7QUFKb0IsU0FBakIsQ0FBWDtBQVFEO0FBQ0QsYUFBT3RELFFBQVA7QUFDRDs7O2dDQUVXc0QsSSxFQUFNO0FBQ2hCLFVBQUksQ0FBQ0EsSUFBTCxFQUFXO0FBQ1RBLGVBQVEsS0FBS3pGLEtBQUwsQ0FBV08sSUFBWCxLQUFvQixPQUFwQixHQUE4QixLQUE5QixHQUFzQyxPQUE5QztBQUNEO0FBQ0QsVUFBTTRCLFdBQVcsaUNBQU8sS0FBS25DLEtBQVosRUFBbUI7QUFDbENPLGNBQU0sRUFBQ2dDLE1BQU1rRCxJQUFQO0FBRDRCLE9BQW5CLENBQWpCO0FBR0EsV0FBS2pFLFFBQUwsQ0FBY1csUUFBZDtBQUNEOzs7NkJBNExRO0FBQUEsbUJBOEJILEtBQUtwQyxLQTlCRjtBQUFBLFVBRUwyRixjQUZLLFVBRUxBLGNBRks7QUFBQSxVQUdMQyxNQUhLLFVBR0xBLE1BSEs7QUFBQSxVQUlMckQsYUFKSyxVQUlMQSxhQUpLO0FBQUEsVUFLTG1DLHFCQUxLLFVBS0xBLHFCQUxLO0FBQUEsVUFNTG1CLGlCQU5LLFVBTUxBLGlCQU5LO0FBQUEsVUFPTEMsaUJBUEssVUFPTEEsaUJBUEs7QUFBQSxVQVFMQyxXQVJLLFVBUUxBLFdBUks7QUFBQSxVQVNMQyxTQVRLLFVBU0xBLFNBVEs7QUFBQSxVQVVMQyxhQVZLLFVBVUxBLGFBVks7QUFBQSxVQVdMeEYsV0FYSyxVQVdMQSxXQVhLO0FBQUEsVUFZTEQsSUFaSyxVQVlMQSxJQVpLO0FBQUEsVUFhTDBGLFFBYkssVUFhTEEsUUFiSztBQUFBLFVBY0xDLGdCQWRLLFVBY0xBLGdCQWRLO0FBQUEsVUFlTEMsa0JBZkssVUFlTEEsa0JBZks7QUFBQSxVQWdCTHRFLGdCQWhCSyxVQWdCTEEsZ0JBaEJLO0FBQUEsVUFpQkxELGNBakJLLFVBaUJMQSxjQWpCSztBQUFBLFVBa0JMd0UsY0FsQkssVUFrQkxBLGNBbEJLO0FBQUEsVUFtQkxDLE1BbkJLLFVBbUJMQSxNQW5CSztBQUFBLFVBb0JMWixJQXBCSyxVQW9CTEEsSUFwQks7QUFBQSxVQXFCTGEsT0FyQkssVUFxQkxBLE9BckJLO0FBQUEsVUFzQkw5RCxRQXRCSyxVQXNCTEEsUUF0Qks7QUFBQSxVQXVCTCtELFFBdkJLLFVBdUJMQSxRQXZCSztBQUFBLFVBd0JMeEUsU0F4QkssVUF3QkxBLFNBeEJLO0FBQUEsVUF5QkxSLE1BekJLLFVBeUJMQSxNQXpCSztBQUFBLFVBMEJMaUYsVUExQkssVUEwQkxBLFVBMUJLO0FBQUEsVUEyQkxDLEtBM0JLLFVBMkJMQSxLQTNCSztBQUFBLFVBNEJML0UsS0E1QkssVUE0QkxBLEtBNUJLO0FBQUEsVUE2QkZnRixLQTdCRTs7QUFBQSxvQkFnQ2lCLEtBQUsxRyxLQWhDdEI7QUFBQSxVQWdDQUMsT0FoQ0EsV0FnQ0FBLE9BaENBO0FBQUEsVUFnQ1NnQixJQWhDVCxXQWdDU0EsSUFoQ1Q7OztBQWtDUCxVQUFJMEYsY0FBYyxLQUFLM0csS0FBTCxDQUFXTSxRQUE3QjtBQUNBLFVBQUksS0FBS04sS0FBTCxDQUFXTyxJQUFYLEtBQW9CLE9BQXhCLEVBQWlDO0FBQy9Cb0csc0JBQWUsS0FBSzNHLEtBQUwsQ0FBV1EsV0FBWCxHQUF5QlAsUUFBUUksU0FBakMsR0FBNkNKLFFBQVFHLFNBQXBFO0FBQ0QsT0FGRCxNQUVPO0FBQ0x1RyxzQkFBZSxLQUFLM0csS0FBTCxDQUFXUSxXQUFYLEdBQXlCUCxRQUFRRSxPQUFqQyxHQUEyQ0YsUUFBUUMsT0FBbEU7QUFDRDs7QUFFRCxVQUFNMEcsVUFDSjtBQUFBO0FBQUE7QUFDRSxzQ0FBQyw0QkFBRDtBQUNFLGtCQUFPLFFBRFQ7QUFFRSxtQkFBUyxLQUFLMUQ7QUFGaEIsVUFERjtBQU1HZ0QsNEJBQ0MsOEJBQUMsMEJBQUQ7QUFDRSwwQkFBZ0JSLGNBRGxCO0FBRUUsZ0NBQXNCLElBRnhCO0FBR0UsdUJBQWEsS0FBSzFGLEtBQUwsQ0FBV1EsV0FIMUI7QUFJRSw4QkFBb0IsS0FBS29ELGlDQUozQjtBQUtFLDBCQUFnQixLQUFLaUQsNkJBTHZCO0FBTUUsMEJBQWdCLEtBQUtyRCxrQkFBTCxDQUF3QnNELElBQXhCLENBQTZCLElBQTdCLENBTmxCO0FBT0Usa0JBQVFULE1BUFY7QUFRRSw0QkFBa0IsSUFScEI7QUFTRSxnQkFBTSxLQUFLdEcsS0FBTCxDQUFXMEYsSUFUbkI7QUFVRSxlQUFLLEtBQUt6RixLQUFMLENBQVdTLEdBVmxCO0FBV0UsZ0JBQU0sS0FBS1QsS0FBTCxDQUFXTyxJQVhuQjtBQVlFLGlCQUFPLEtBQUtQLEtBQUwsQ0FBV2tCO0FBWnBCLFVBUEo7QUF1QkdpRiw4QkFDQyw4QkFBQyxnQ0FBRDtBQUNFLHVCQUFhLEtBQUtuRyxLQUFMLENBQVdRLFdBRDFCO0FBRUUsZ0JBQU0sS0FBS1IsS0FBTCxDQUFXTyxJQUZuQjtBQUdFLG9CQUFVMEYsUUFIWjtBQUlFLGdCQUFNLEtBQUtsRyxLQUFMLENBQVcwRixJQUpuQjtBQUtFLHNCQUFZZTtBQUxkLFVBeEJKO0FBaUNFLHNDQUFDLHVCQUFEO0FBQ0Usa0JBQVFiLE1BRFY7QUFFRSxpQ0FBdUJsQixxQkFGekI7QUFHRSwwQkFBZ0JpQixjQUhsQjtBQUlFLDZCQUFtQkUsaUJBSnJCO0FBS0UsNkJBQW1CQyxpQkFMckI7QUFNRSx1QkFBYUMsV0FOZjtBQU9FLGdDQUFzQixJQVB4QjtBQVFFLHVCQUFhLEtBQUs5RixLQUFMLENBQVdRLFdBUjFCO0FBU0UseUJBQWV3RixhQVRqQjtBQVVFLDBCQUFnQkksY0FWbEI7QUFXRSxrQkFBUUMsTUFYVjtBQVlFLHlCQUFlLEtBQUtyRSxpQkFBTCxDQUF1QjhFLElBQXZCLENBQTRCLElBQTVCLENBWmpCO0FBYUUsMEJBQWdCLEtBQUtsRSxrQkFBTCxDQUF3QmtFLElBQXhCLENBQTZCLElBQTdCLENBYmxCO0FBY0UsZ0JBQU1yQixJQWRSO0FBZUUsZ0JBQU14RSxJQWZSO0FBZ0JFLGVBQUksZUFoQk47QUFpQkUsNEJBQWtCLEtBQUs4QixvQkFqQnpCO0FBa0JFLHdCQUFjLEtBQUtFLGdCQWxCckI7QUFtQkUsbUJBQVNxRCxPQW5CWDtBQW9CRSwrQkFBcUIsS0FwQnZCO0FBcUJFLGdCQUFNLEtBQUt0RyxLQUFMLENBQVdPLElBckJuQjtBQXNCRSxlQUFLLEtBQUtQLEtBQUwsQ0FBV1MsR0F0QmxCO0FBdUJFLGlCQUFPLEtBQUtULEtBQUwsQ0FBV2tCLEtBdkJwQjtBQXdCRSwyQkFBaUIsS0FBS2tCLGVBQUwsQ0FBcUIwRSxJQUFyQixDQUEwQixJQUExQixDQXhCbkI7QUF5QkUseUJBQWUsS0FBSzNELGlCQXpCdEI7QUEwQkUsaUJBQU96QjtBQTFCVDtBQWpDRixPQURGOztBQWlFQSxhQUNFO0FBQUE7QUFBQSxxQkFBU2dGLEtBQVQsSUFBZ0IsS0FBSSxNQUFwQjtBQUNHWCxzQkFBYyxRQUFkLEdBQ0M7QUFBQywyQkFBRDtBQUFBO0FBQ0Usb0JBQVEsS0FBS3RELE9BRGY7QUFFRSxzQkFBVWtFLGVBQWUsS0FBS0ksSUFBTCxDQUFVQyxJQUZyQztBQUdFLDBCQUFjLEVBQUNDLFlBQVksTUFBYixFQUFxQkMsVUFBVSxRQUEvQixFQUhoQjtBQUlFLDZCQUFpQixFQUFDRCxZQUFZLE1BQWIsRUFBcUJDLFVBQVUsS0FBL0IsRUFKbkI7QUFLRSxpQkFBSSxRQUxOO0FBTUUsa0JBQU1qRyxJQU5SO0FBT0UscUJBQVMsS0FBSytCO0FBUGhCO0FBU0c0RDtBQVRILFNBREQsR0FZQztBQUFDLDBCQUFEO0FBQUE7QUFDRSxpQkFBSSxRQUROO0FBRUUsa0JBQU0zRixJQUZSO0FBR0UscUJBQVMsS0FBSytCO0FBSGhCO0FBS0c0RDtBQUxIO0FBYkosT0FERjtBQXdCRDs7OztFQTNtQmlDTyxnQjs7QUFBOUJySCxxQixDQUVHc0gsUyxHQUFZO0FBQ2pCMUIsa0JBQWdCMkIsb0JBQVVDLElBRFQ7QUFFakIzQixVQUFRMEIsb0JBQVVFLElBRkQ7QUFHakJqRixpQkFBZStFLG9CQUFVRSxJQUhSO0FBSWpCOUMseUJBQXVCNEMsb0JBQVVHLEtBSmhCO0FBS2pCNUIscUJBQW1CeUIsb0JBQVVJLE1BTFo7QUFNakI1QixxQkFBbUJ3QixvQkFBVUksTUFOWjtBQU9qQjNCLGVBQWF1QixvQkFBVUssSUFQTjtBQVFqQjNCLGFBQVdzQixvQkFBVU0sS0FBVixDQUFnQixDQUFDLFFBQUQsRUFBVyxRQUFYLENBQWhCLENBUk07QUFTakIzQixpQkFBZXFCLG9CQUFVSSxNQVRSO0FBVWpCakgsZUFBYTZHLG9CQUFVRSxJQVZOO0FBV2pCaEgsUUFBTThHLG9CQUFVSSxNQVhDO0FBWWpCaEgsT0FBSzRHLG9CQUFVTyxNQVpFO0FBYWpCM0IsWUFBVW9CLG9CQUFVSSxNQWJIO0FBY2pCckIsa0JBQWdCaUIsb0JBQVVRLE1BZFQ7QUFlakJqRyxrQkFBZ0J5RixvQkFBVU8sTUFmVDtBQWdCakIvRixvQkFBa0J3RixvQkFBVU8sTUFoQlg7QUFpQmpCdkIsVUFBUWdCLG9CQUFVSSxNQWpCRDtBQWtCakJoQyxRQUFNNEIsb0JBQVVNLEtBQVYsQ0FBZ0IsQ0FBQyxVQUFELEVBQWEsV0FBYixDQUFoQixDQWxCVztBQW1CakJyQixXQUFTZSxvQkFBVUssSUFuQkY7QUFvQmpCbEYsWUFBVTZFLG9CQUFVQyxJQXBCSDtBQXFCakJ2RixhQUFXc0Ysb0JBQVVDLElBckJKO0FBc0JqQi9GLFVBQVE4RixvQkFBVUMsSUF0QkQ7QUF1QmpCZixZQUFVYyxvQkFBVUMsSUF2Qkg7QUF3QmpCckcsUUFBTW9HLG9CQUFVRSxJQXhCQztBQXlCakJyQixvQkFBa0JtQixvQkFBVUUsSUF6Qlg7QUEwQmpCcEIsc0JBQW9Ca0Isb0JBQVVFLElBMUJiO0FBMkJqQnJHLFNBQU9tRyxvQkFBVU8sTUEzQkE7QUE0QmpCcEIsY0FBWWEsb0JBQVVJLE1BNUJMO0FBNkJqQmhCLFNBQU9ZLG9CQUFVTyxNQTdCQTtBQThCakJsRyxTQUFPMkYsb0JBQVVPO0FBOUJBLEM7QUFGZjlILHFCLENBbUNHZ0ksWSxHQUFlO0FBQ3BCcEMsa0JBQWdCcUMseUJBREk7QUFFcEJqQyxlQUFhLFFBRk87QUFHcEJDLGFBQVcsUUFIUztBQUlwQm5FLGtCQUFnQixJQUFJb0MsSUFBSixFQUpJO0FBS3BCbkMsb0JBQWtCLElBQUltQyxJQUFKLEVBTEU7QUFNcEJxQyxVQUFRLE9BTlk7QUFPcEJDLFdBQVMsSUFQVztBQVFwQjVFLFNBQU9zRztBQVJhLEM7QUFuQ2xCbEkscUIsQ0E4Q0dtSSxZLEdBQWU7QUFDcEJDLFlBQVViLG9CQUFVTyxNQUFWLENBQWlCTztBQURQLEM7a0JBZ2tCVHJJLHFCIiwiZmlsZSI6IkRhdGVSYW5nZVBpY2tlckRpYWxvZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBFdmVudExpc3RlbmVyIGZyb20gJ3JlYWN0LWV2ZW50LWxpc3RlbmVyJztcbmltcG9ydCBrZXljb2RlIGZyb20gJ2tleWNvZGUnO1xuaW1wb3J0IERhdGVSYW5nZURpc3BsYXkgZnJvbSAnLi9EYXRlUmFuZ2VEaXNwbGF5JztcbmltcG9ydCBEYXRlUmFuZ2VTdGF0dXNEaXNwbGF5IGZyb20gJy4vRGF0ZVJhbmdlU3RhdHVzRGlzcGxheSc7XG5pbXBvcnQgUmFuZ2VDYWxlbmRhciBmcm9tICcuL1JhbmdlQ2FsZW5kYXInO1xuaW1wb3J0IERpYWxvZyBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9EaWFsb2cnO1xuaW1wb3J0IFBvcG92ZXIgZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvUG9wb3Zlcic7XG5pbXBvcnQgdXBkYXRlIGZyb20gJ3JlYWN0LWFkZG9ucy11cGRhdGUnO1xuXG5pbXBvcnQge1xuICBjbG9uZURhdGUsXG4gIGRlZmF1bHRVdGlscyxcbiAgZGF0ZVRpbWVGb3JtYXQsXG4gIGlzQWZ0ZXJEYXRlVGltZSxcbiAgaXNCZWZvcmVEYXRlVGltZSxcbiAgaXNEYXRlVGltZUluUmFuZ2VzLFxuICBpc0VxdWFsRGF0ZVRpbWUsXG4gIGNsb3Nlc3RSYW5nZUFmdGVyU3RhcnQsXG59IGZyb20gJy4vZGF0ZVV0aWxzJztcblxuY2xhc3MgRGF0ZVJhbmdlUGlja2VyRGlhbG9nIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIERhdGVUaW1lRm9ybWF0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBhdXRvT2s6IFByb3BUeXBlcy5ib29sLFxuICAgIGF1dG9PcGVuRmllbGQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGJsb2NrZWREYXRlVGltZVJhbmdlczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGNhbGVuZGFyRGF0ZVdpZHRoOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNhbGVuZGFyVGltZVdpZHRoOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNhbmNlbExhYmVsOiBQcm9wVHlwZXMubm9kZSxcbiAgICBjb250YWluZXI6IFByb3BUeXBlcy5vbmVPZihbJ2RpYWxvZycsICdpbmxpbmUnXSksXG4gICAgZGF5QnV0dG9uU2l6ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkaXNwbGF5VGltZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgZWRpdDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBlbmQ6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgZW5kTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZmlyc3REYXlPZldlZWs6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgaW5pdGlhbEVuZERhdGU6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgaW5pdGlhbFN0YXJ0RGF0ZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbW9kZTogUHJvcFR5cGVzLm9uZU9mKFsncG9ydHJhaXQnLCAnbGFuZHNjYXBlJ10pLFxuICAgIG9rTGFiZWw6IFByb3BUeXBlcy5ub2RlLFxuICAgIG9uQWNjZXB0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkRpc21pc3M6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uU2hvdzogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25VcGRhdGU6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9wZW46IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dDYWxlbmRhckRhdGU6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dDYWxlbmRhclN0YXR1czogUHJvcFR5cGVzLmJvb2wsXG4gICAgc3RhcnQ6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgc3RhcnRMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgICB1dGlsczogUHJvcFR5cGVzLm9iamVjdCxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIERhdGVUaW1lRm9ybWF0OiBkYXRlVGltZUZvcm1hdCxcbiAgICBjYW5jZWxMYWJlbDogJ0NhbmNlbCcsXG4gICAgY29udGFpbmVyOiAnZGlhbG9nJyxcbiAgICBpbml0aWFsRW5kRGF0ZTogbmV3IERhdGUoKSxcbiAgICBpbml0aWFsU3RhcnREYXRlOiBuZXcgRGF0ZSgpLFxuICAgIGxvY2FsZTogJ2VuLVVTJyxcbiAgICBva0xhYmVsOiAnT0snLFxuICAgIHV0aWxzOiBkZWZhdWx0VXRpbHMsXG4gIH07XG5cbiAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICBtdWlUaGVtZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMucG9wb3ZlciA9IFJlYWN0LmNyZWF0ZVJlZigpO1xuICB9XG5cbiAgc3RhdGUgPSB7XG4gICAgYWxsUmVmczoge1xuICAgICAgZW5kRGF0ZTogbnVsbCxcbiAgICAgIGVuZFRpbWU6IG51bGwsXG4gICAgICBzdGFydERhdGU6IG51bGwsXG4gICAgICBzdGFydFRpbWU6IG51bGwsXG4gICAgfSxcbiAgICBhbmNob3JFbDogbnVsbCxcbiAgICBlZGl0OiAnc3RhcnQnLFxuICAgIGRpc3BsYXlUaW1lOiBmYWxzZSxcbiAgICBlbmQ6IHtcbiAgICAgIGRpc3BsYXlEYXRlOiB1bmRlZmluZWQsXG4gICAgICBkaXNwbGF5TW9udGhEYXk6IHVuZGVmaW5lZCxcbiAgICAgIG1heERhdGU6IHVuZGVmaW5lZCxcbiAgICAgIG1pbkRhdGU6IHVuZGVmaW5lZCxcbiAgICAgIHNlbGVjdGVkRGF0ZTogdW5kZWZpbmVkLFxuICAgICAgc2hvdWxkRGlzYWJsZURhdGU6IHVuZGVmaW5lZCxcbiAgICB9LFxuICAgIG9wZW46IGZhbHNlLFxuICAgIHN0YXJ0OiB7XG4gICAgICBkaXNwbGF5RGF0ZTogdW5kZWZpbmVkLFxuICAgICAgZGlzcGxheU1vbnRoRGF5OiB1bmRlZmluZWQsXG4gICAgICBtYXhEYXRlOiB1bmRlZmluZWQsXG4gICAgICBtaW5EYXRlOiB1bmRlZmluZWQsXG4gICAgICBzZWxlY3RlZERhdGU6IHVuZGVmaW5lZCxcbiAgICAgIHNob3VsZERpc2FibGVEYXRlOiB1bmRlZmluZWQsXG4gICAgfSxcbiAgfTtcblxuICBVTlNBRkVfY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZW5kOiB7XG4gICAgICAgIGRpc3BsYXlEYXRlOiB0aGlzLnByb3BzLnV0aWxzLmdldEZpcnN0RGF5T2ZNb250aCh0aGlzLnByb3BzLmluaXRpYWxFbmREYXRlKSxcbiAgICAgICAgbWF4RGF0ZTogKHRoaXMucHJvcHMuZW5kID8gdGhpcy5wcm9wcy5lbmQubWF4RGF0ZSA6IHVuZGVmaW5lZCksXG4gICAgICAgIG1pbkRhdGU6ICh0aGlzLnByb3BzLmVuZCA/IHRoaXMucHJvcHMuZW5kLm1pbkRhdGUgOiB1bmRlZmluZWQpLFxuICAgICAgICBzZWxlY3RlZERhdGU6IHRoaXMucHJvcHMuaW5pdGlhbEVuZERhdGUsXG4gICAgICAgIHNob3VsZERpc2FibGVEYXRlOiAodGhpcy5wcm9wcy5lbmQgPyB0aGlzLnByb3BzLmVuZC5zaG91bGREaXNhYmxlRGF0ZSA6IHVuZGVmaW5lZCksXG4gICAgICB9LFxuICAgICAgc3RhcnQ6IHtcbiAgICAgICAgZGlzcGxheURhdGU6IHRoaXMucHJvcHMudXRpbHMuZ2V0Rmlyc3REYXlPZk1vbnRoKHRoaXMucHJvcHMuaW5pdGlhbFN0YXJ0RGF0ZSksXG4gICAgICAgIG1heERhdGU6ICh0aGlzLnByb3BzLnN0YXJ0ID8gdGhpcy5wcm9wcy5zdGFydC5tYXhEYXRlIDogdW5kZWZpbmVkKSxcbiAgICAgICAgbWluRGF0ZTogKHRoaXMucHJvcHMuc3RhcnQgPyB0aGlzLnByb3BzLnN0YXJ0Lm1pbkRhdGUgOiB1bmRlZmluZWQpLFxuICAgICAgICBzZWxlY3RlZERhdGU6IHRoaXMucHJvcHMuaW5pdGlhbFN0YXJ0RGF0ZSxcbiAgICAgICAgc2hvdWxkRGlzYWJsZURhdGU6ICh0aGlzLnByb3BzLnN0YXJ0ID8gdGhpcy5wcm9wcy5zdGFydC5zaG91bGREaXNhYmxlRGF0ZSA6IHVuZGVmaW5lZCksXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0TWluRGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZVt0aGlzLnN0YXRlLmVkaXRdLm1pbkRhdGUgfHwgdGhpcy5wcm9wcy51dGlscy5hZGRZZWFycyhuZXcgRGF0ZSgpLCAtMTAwKTtcbiAgfVxuXG4gIGdldE1heERhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGVbdGhpcy5zdGF0ZS5lZGl0XS5tYXhEYXRlIHx8IHRoaXMucHJvcHMudXRpbHMuYWRkWWVhcnMobmV3IERhdGUoKSwgMTAwKTtcbiAgfVxuXG4gIHNldERpc3BsYXlEYXRlKGRhdGUsIG5ld1NlbGVjdGVkRGF0ZSkge1xuICAgIGNvbnN0IG5ld0Rpc3BsYXlEYXRlID0gdGhpcy5wcm9wcy51dGlscy5nZXRGaXJzdERheU9mTW9udGgoZGF0ZSk7XG4gICAgY29uc3QgbmV3U2VsZWN0ZWRFbmREYXRlID0gY2xvbmVEYXRlKG5ld1NlbGVjdGVkRGF0ZSk7XG4gICAgbmV3U2VsZWN0ZWRFbmREYXRlLnNldFRpbWUobmV3U2VsZWN0ZWRFbmREYXRlLmdldFRpbWUoKSArIDEgKiA2MCAqIDYwICogMTAwMCk7XG4gICAgaWYgKG5ld0Rpc3BsYXlEYXRlICE9PSB0aGlzLnN0YXRlW3RoaXMuc3RhdGUuZWRpdF0uZGlzcGxheURhdGUpIHtcbiAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IG5ld0Rpc3BsYXlEYXRlID4gdGhpcy5zdGF0ZVt0aGlzLnN0YXRlLmVkaXRdLmRpc3BsYXlEYXRlID8gJ2xlZnQnIDogJ3JpZ2h0JztcbiAgICAgIGxldCBuZXdTdGF0ZSA9IHVwZGF0ZSh0aGlzLnN0YXRlLCB7XG4gICAgICAgIFt0aGlzLnN0YXRlLmVkaXRdOiB7XG4gICAgICAgICAgZGlzcGxheURhdGU6IHskc2V0OiBuZXdEaXNwbGF5RGF0ZX0sXG4gICAgICAgICAgdHJhbnNpdGlvbkRpcmVjdGlvbjogeyRzZXQ6IGRpcmVjdGlvbn0sXG4gICAgICAgICAgc2VsZWN0ZWREYXRlOiB7JHNldDogbmV3U2VsZWN0ZWREYXRlIHx8IHRoaXMuc3RhdGVbdGhpcy5zdGF0ZS5lZGl0XS5zZWxlY3RlZERhdGV9LFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICBpZiAodGhpcy5zdGF0ZS5lZGl0ID09PSAnc3RhcnQnICYmIHRoaXMuc3RhdGUuZW5kLnNlbGVjdGVkRGF0ZSAmJlxuICAgICAgICAoaXNBZnRlckRhdGVUaW1lKG5ld1NlbGVjdGVkRGF0ZSwgdGhpcy5zdGF0ZS5lbmQuc2VsZWN0ZWREYXRlKSB8fFxuICAgICAgICBpc0VxdWFsRGF0ZVRpbWUobmV3U2VsZWN0ZWREYXRlLCB0aGlzLnN0YXRlLmVuZC5zZWxlY3RlZERhdGUpIHx8XG4gICAgICAgIHRoaXMuYmxvY2tlZFJhbmdlT3ZlcmxhcHMobmV3U2VsZWN0ZWREYXRlKSkpIHtcbiAgICAgICAgbmV3U3RhdGUgPSB1cGRhdGUobmV3U3RhdGUsIHtcbiAgICAgICAgICBlbmQ6IHtcbiAgICAgICAgICAgIGRpc3BsYXlEYXRlOiB7JHNldDogdW5kZWZpbmVkfSxcbiAgICAgICAgICAgIC8vIGRpc3BsYXlEYXRlOiB7JHNldDogbmV3RGlzcGxheURhdGV9LFxuICAgICAgICAgICAgdHJhbnNpdGlvbkRpcmVjdGlvbjogeyRzZXQ6IGRpcmVjdGlvbn0sXG4gICAgICAgICAgICBzZWxlY3RlZERhdGU6IHskc2V0OiB1bmRlZmluZWR9LFxuICAgICAgICAgICAgLy8gc2VsZWN0ZWREYXRlOiB7JHNldDogbmV3U2VsZWN0ZWRFbmREYXRlIHx8IHRoaXMuc3RhdGVbdGhpcy5zdGF0ZS5lZGl0XS5zZWxlY3RlZERhdGV9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgLy8gaWYgKHRoaXMucHJvcHMuYXV0b09wZW5GaWVsZCkge1xuICAgICAgLy8gICBuZXdTdGF0ZSA9IHVwZGF0ZShuZXdTdGF0ZSwge1xuICAgICAgLy8gICAgIGRpc3BsYXlUaW1lOiB7JHNldDogdHJ1ZX0sXG4gICAgICAvLyAgIH0pXG4gICAgICAvLyB9XG4gICAgICByZXR1cm4gbmV3U3RhdGU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnN0YXRlO1xuICB9XG5cbiAgYmxvY2tlZFJhbmdlT3ZlcmxhcHMoYWRqdXN0ZWREYXRlKSB7XG4gICAgY29uc3QgY2xvc2VzdFJhbmdlID0gY2xvc2VzdFJhbmdlQWZ0ZXJTdGFydCh0aGlzLnByb3BzLmJsb2NrZWREYXRlVGltZVJhbmdlcywgYWRqdXN0ZWREYXRlKTtcbiAgICBjb25zdCBlbmREYXRlID0gdGhpcy5zdGF0ZS5lbmQuc2VsZWN0ZWREYXRlO1xuICAgIHJldHVybiAoZW5kRGF0ZSAmJiBjbG9zZXN0UmFuZ2UgJiYgaXNBZnRlckRhdGVUaW1lKGVuZERhdGUsIGNsb3Nlc3RSYW5nZS5zdGFydCkpO1xuICB9XG5cbiAgc2V0U2VsZWN0ZWREYXRlKGRhdGUpIHtcbiAgICBsZXQgYWRqdXN0ZWREYXRlID0gZGF0ZTtcbiAgICBsZXQgbmV3U3RhdGU7XG4gICAgY29uc3QgbWluRGF0ZSA9IHRoaXMuZ2V0TWluRGF0ZSgpO1xuICAgIGNvbnN0IG1heERhdGUgPSB0aGlzLmdldE1heERhdGUoKTtcbiAgICBjb25zdCB7ZWRpdCwgc3RhcnR9ID0gdGhpcy5zdGF0ZTtcbiAgICBpZiAoaXNCZWZvcmVEYXRlVGltZShkYXRlLCBtaW5EYXRlKSkge1xuICAgICAgYWRqdXN0ZWREYXRlID0gbWluRGF0ZTtcbiAgICB9IGVsc2UgaWYgKGlzQWZ0ZXJEYXRlVGltZShkYXRlLCBtYXhEYXRlKSkge1xuICAgICAgYWRqdXN0ZWREYXRlID0gbWF4RGF0ZTtcbiAgICB9XG5cbiAgICBhZGp1c3RlZERhdGUgPSB0aGlzLmZpcnN0QXZhaWxhYmxlVGltZShhZGp1c3RlZERhdGUpO1xuXG4gICAgaWYgKGVkaXQgPT09ICdlbmQnICYmIGlzQmVmb3JlRGF0ZVRpbWUoYWRqdXN0ZWREYXRlLCBzdGFydC5zZWxlY3RlZERhdGUpKSB7XG4gICAgICBhZGp1c3RlZERhdGUgPSBuZXcgRGF0ZShzdGFydC5zZWxlY3RlZERhdGUuZ2V0VGltZSgpKTtcbiAgICB9XG4gICAgY29uc3QgYWRqdXN0ZWRFbmREYXRlID0gY2xvbmVEYXRlKGFkanVzdGVkRGF0ZSk7XG4gICAgYWRqdXN0ZWRFbmREYXRlLnNldFRpbWUoYWRqdXN0ZWRFbmREYXRlLmdldFRpbWUoKSArIDEgKiA2MCAqIDYwICogMTAwMCk7XG5cbiAgICBjb25zdCBuZXdEaXNwbGF5RGF0ZSA9IHRoaXMucHJvcHMudXRpbHMuZ2V0Rmlyc3REYXlPZk1vbnRoKGFkanVzdGVkRGF0ZSk7XG4gICAgaWYgKG5ld0Rpc3BsYXlEYXRlICE9PSB0aGlzLnN0YXRlW3RoaXMuc3RhdGUuZWRpdF0uZGlzcGxheURhdGUpIHtcbiAgICAgIG5ld1N0YXRlID0gdGhpcy5zZXREaXNwbGF5RGF0ZShuZXdEaXNwbGF5RGF0ZSwgYWRqdXN0ZWREYXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3U3RhdGUgPSB1cGRhdGUodGhpcy5zdGF0ZSwge1xuICAgICAgICBbdGhpcy5zdGF0ZS5lZGl0XToge1xuICAgICAgICAgIHNlbGVjdGVkRGF0ZTogeyRzZXQ6IGFkanVzdGVkRGF0ZX0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIGlmICh0aGlzLnN0YXRlLmVkaXQgPT09ICdzdGFydCcgJiYgdGhpcy5zdGF0ZS5lbmQuc2VsZWN0ZWREYXRlICYmXG4gICAgICAgIChpc0FmdGVyRGF0ZVRpbWUoYWRqdXN0ZWREYXRlLCB0aGlzLnN0YXRlLmVuZC5zZWxlY3RlZERhdGUpIHx8XG4gICAgICAgIGlzRXF1YWxEYXRlVGltZShhZGp1c3RlZERhdGUsIHRoaXMuc3RhdGUuZW5kLnNlbGVjdGVkRGF0ZSkgfHxcbiAgICAgICAgdGhpcy5ibG9ja2VkUmFuZ2VPdmVybGFwcyhhZGp1c3RlZERhdGUpKSkge1xuICAgICAgICBuZXdTdGF0ZSA9IHVwZGF0ZShuZXdTdGF0ZSwge1xuICAgICAgICAgIGVuZDoge1xuICAgICAgICAgICAgc2VsZWN0ZWREYXRlOiB7JHNldDogdW5kZWZpbmVkfSxcbiAgICAgICAgICAgIC8vIHNlbGVjdGVkRGF0ZTogeyRzZXQ6IGFkanVzdGVkRW5kRGF0ZX0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLmF1dG9PcGVuRmllbGQpIHtcbiAgICAgIG5ld1N0YXRlID0gdXBkYXRlKG5ld1N0YXRlLCB7XG4gICAgICAgIGRpc3BsYXlUaW1lOiB7JHNldDogdHJ1ZX0sXG4gICAgICB9KTtcbiAgICB9XG4gICAgLy8gbmV3U3RhdGUgPSB1cGRhdGUobmV3U3RhdGUsIHtcbiAgICAvLyAgIGRpc3BsYXlUaW1lOiB7JHNldDogdHJ1ZX0sXG4gICAgLy8gfSk7XG4gICAgcmV0dXJuIG5ld1N0YXRlO1xuICB9XG5cbiAgZmlyc3RBdmFpbGFibGVUaW1lKGRhdGVUb0NoZWNrKSB7XG4gICAgY29uc3QgaG91cnNJbkRheSA9IDI0O1xuICAgIGNvbnN0IHtibG9ja2VkRGF0ZVRpbWVSYW5nZXN9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7ZWRpdCwgc3RhcnR9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBhZGp1c3RlZERhdGUgPSBjbG9uZURhdGUoZGF0ZVRvQ2hlY2spO1xuXG4gICAgZm9yIChsZXQgaG91ciA9IDA7IGhvdXIgPCBob3Vyc0luRGF5OyBob3VyKyspIHtcbiAgICAgIGFkanVzdGVkRGF0ZS5zZXRIb3Vycyhob3VyLCAwLCAwLCAwKTtcbiAgICAgIGlmIChlZGl0ID09PSAnc3RhcnQnKSB7XG4gICAgICAgIGlmICghaXNCZWZvcmVEYXRlVGltZShhZGp1c3RlZERhdGUsIG5ldyBEYXRlKCkpICYmICFpc0RhdGVUaW1lSW5SYW5nZXMoYmxvY2tlZERhdGVUaW1lUmFuZ2VzLCBhZGp1c3RlZERhdGUpKSB7XG4gICAgICAgICAgcmV0dXJuIGFkanVzdGVkRGF0ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRTdGFydERhdGUgPSBzdGFydC5zZWxlY3RlZERhdGU7XG4gICAgICAgIGNvbnN0IGNsb3Nlc3RSYW5nZSA9IGNsb3Nlc3RSYW5nZUFmdGVyU3RhcnQoYmxvY2tlZERhdGVUaW1lUmFuZ2VzLCBzZWxlY3RlZFN0YXJ0RGF0ZSk7XG5cbiAgICAgICAgaWYgKGNsb3Nlc3RSYW5nZSkge1xuICAgICAgICAgIGlmICghaXNFcXVhbERhdGVUaW1lKHN0YXJ0LnNlbGVjdGVkRGF0ZSwgYWRqdXN0ZWREYXRlKSAmJlxuICAgICAgICAgICAgICAgICAhaXNCZWZvcmVEYXRlVGltZShhZGp1c3RlZERhdGUsIHNlbGVjdGVkU3RhcnREYXRlKSAmJlxuICAgICAgICAgICAgICAgICAhaXNBZnRlckRhdGVUaW1lKGFkanVzdGVkRGF0ZSwgY2xvc2VzdFJhbmdlLnN0YXJ0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGFkanVzdGVkRGF0ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKCFpc0VxdWFsRGF0ZVRpbWUoc3RhcnQuc2VsZWN0ZWREYXRlLCBhZGp1c3RlZERhdGUpICYmXG4gICAgICAgICAgICAgICAgICFpc0JlZm9yZURhdGVUaW1lKGFkanVzdGVkRGF0ZSwgc2VsZWN0ZWRTdGFydERhdGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gYWRqdXN0ZWREYXRlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYWRqdXN0ZWREYXRlO1xuICB9XG5cbiAgZ2V0VGltZUVsZW1lbnRzKHN0eWxlcykge1xuICAgIGNvbnN0IGhvdXJBcnJheSA9IFtdO1xuICAgIGNvbnN0IGhvdXJzSW5EYXkgPSAyNDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhvdXJzSW5EYXk7IGkrKykge1xuICAgICAgaG91ckFycmF5LnB1c2goaSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGhvdXJBcnJheS5tYXAoKGhvdXIsIGkpID0+IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYga2V5PXtpfSBzdHlsZT17c3R5bGVzLmhvdXJ9PlxuICAgICAgICAgIHt0aGlzLmdldEhvdXJFbGVtZW50KGhvdXIpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfSwgdGhpcyk7XG4gIH1cblxuICBzZXRTZWxlY3RlZFRpbWUoaG91cikge1xuICAgIGNvbnN0IG1vZGUgPSAodGhpcy5zdGF0ZS5lZGl0ID09PSAnc3RhcnQnID8gJ2VuZCcgOiAnc3RhcnQnKTtcbiAgICBjb25zdCBhZGp1c3RlZERhdGUgPSBjbG9uZURhdGUodGhpcy5zdGF0ZVt0aGlzLnN0YXRlLmVkaXRdLnNlbGVjdGVkRGF0ZSk7XG4gICAgYWRqdXN0ZWREYXRlLnNldEhvdXJzKGhvdXIsIDAsIDAsIDApO1xuICAgIGNvbnN0IGFkanVzdGVkRW5kRGF0ZSA9IGNsb25lRGF0ZShhZGp1c3RlZERhdGUpO1xuICAgIGFkanVzdGVkRW5kRGF0ZS5zZXRUaW1lKGFkanVzdGVkRW5kRGF0ZS5nZXRUaW1lKCkgKyAxICogNjAgKiA2MCAqIDEwMDApO1xuXG4gICAgbGV0IG5ld1N0YXRlID0gdXBkYXRlKHRoaXMuc3RhdGUsIHtcbiAgICAgIC8vIGRpc3BsYXlUaW1lOiB7JHNldDogZmFsc2V9LFxuICAgICAgLy8gZWRpdDogeyRzZXQ6IG1vZGV9LFxuICAgICAgW3RoaXMuc3RhdGUuZWRpdF06IHtcbiAgICAgICAgc2VsZWN0ZWREYXRlOiB7JHNldDogYWRqdXN0ZWREYXRlfSxcbiAgICAgIH0sXG4gICAgfSk7XG5cblxuICAgIGlmICh0aGlzLnN0YXRlLmVkaXQgPT09ICdzdGFydCcgJiYgdGhpcy5zdGF0ZS5lbmQuc2VsZWN0ZWREYXRlICYmIGFkanVzdGVkRGF0ZSA+IHRoaXMuc3RhdGUuZW5kLnNlbGVjdGVkRGF0ZSkge1xuICAgICAgbmV3U3RhdGUgPSB1cGRhdGUobmV3U3RhdGUsIHtcbiAgICAgICAgZW5kOiB7XG4gICAgICAgICAgc2VsZWN0ZWREYXRlOiB7JHNldDogdW5kZWZpbmVkfSxcbiAgICAgICAgICAvLyBzZWxlY3RlZERhdGU6IHskc2V0OiBhZGp1c3RlZEVuZERhdGV9LFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMuYXV0b09wZW5GaWVsZCkge1xuICAgICAgbmV3U3RhdGUgPSB1cGRhdGUobmV3U3RhdGUsIHtcbiAgICAgICAgZGlzcGxheVRpbWU6IHtcbiAgICAgICAgICAkc2V0OiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgICAgZWRpdDoge1xuICAgICAgICAgICRzZXQ6IG1vZGUsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld1N0YXRlO1xuICB9XG5cbiAgc2V0RWRpdE1vZGUobW9kZSkge1xuICAgIGlmICghbW9kZSkge1xuICAgICAgbW9kZSA9ICh0aGlzLnN0YXRlLmVkaXQgPT09ICdzdGFydCcgPyAnZW5kJyA6ICdzdGFydCcpO1xuICAgIH1cbiAgICBjb25zdCBuZXdTdGF0ZSA9IHVwZGF0ZSh0aGlzLnN0YXRlLCB7XG4gICAgICBlZGl0OiB7JHNldDogbW9kZX0sXG4gICAgfSk7XG4gICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XG4gIH1cblxuICBzaG93ID0gKHNob3dSZWYsIHN0YXJ0RW5kLCBkYXRlVGltZSwgYWxsUmVmcykgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uU2hvdyAmJiAhdGhpcy5zdGF0ZS5vcGVuKSB7XG4gICAgICB0aGlzLnByb3BzLm9uU2hvdygpO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGFsbFJlZnM6IGFsbFJlZnMsXG4gICAgICBhbmNob3JFbDogc2hvd1JlZixcbiAgICAgIGVkaXQ6IHN0YXJ0RW5kLFxuICAgICAgZGlzcGxheVRpbWU6IChkYXRlVGltZSA9PT0gJ3RpbWUnKSxcbiAgICB9LCAoKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgb3BlbjogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIHJlc2V0ID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgYWxsUmVmczoge1xuICAgICAgICBlbmREYXRlOiBudWxsLFxuICAgICAgICBlbmRUaW1lOiBudWxsLFxuICAgICAgICBzdGFydERhdGU6IG51bGwsXG4gICAgICAgIHN0YXJ0VGltZTogbnVsbCxcbiAgICAgIH0sXG4gICAgICBhbmNob3JFbDogbnVsbCxcbiAgICAgIGVkaXQ6ICdzdGFydCcsXG4gICAgICBkaXNwbGF5VGltZTogZmFsc2UsXG4gICAgICBlbmQ6IHtcbiAgICAgICAgZGlzcGxheURhdGU6IHRoaXMucHJvcHMudXRpbHMuZ2V0Rmlyc3REYXlPZk1vbnRoKHRoaXMucHJvcHMuaW5pdGlhbEVuZERhdGUpLFxuICAgICAgICBtYXhEYXRlOiAodGhpcy5wcm9wcy5lbmQgPyB0aGlzLnByb3BzLmVuZC5tYXhEYXRlIDogdW5kZWZpbmVkKSxcbiAgICAgICAgbWluRGF0ZTogKHRoaXMucHJvcHMuZW5kID8gdGhpcy5wcm9wcy5lbmQubWluRGF0ZSA6IHVuZGVmaW5lZCksXG4gICAgICAgIHNlbGVjdGVkRGF0ZTogdGhpcy5wcm9wcy5pbml0aWFsRW5kRGF0ZSxcbiAgICAgICAgc2hvdWxkRGlzYWJsZURhdGU6ICh0aGlzLnByb3BzLmVuZCA/IHRoaXMucHJvcHMuZW5kLnNob3VsZERpc2FibGVEYXRlIDogdW5kZWZpbmVkKSxcbiAgICAgIH0sXG4gICAgICBvcGVuOiBmYWxzZSxcbiAgICAgIHN0YXJ0OiB7XG4gICAgICAgIGRpc3BsYXlEYXRlOiB0aGlzLnByb3BzLnV0aWxzLmdldEZpcnN0RGF5T2ZNb250aCh0aGlzLnByb3BzLmluaXRpYWxTdGFydERhdGUpLFxuICAgICAgICBtYXhEYXRlOiAodGhpcy5wcm9wcy5zdGFydCA/IHRoaXMucHJvcHMuc3RhcnQubWF4RGF0ZSA6IHVuZGVmaW5lZCksXG4gICAgICAgIG1pbkRhdGU6ICh0aGlzLnByb3BzLnN0YXJ0ID8gdGhpcy5wcm9wcy5zdGFydC5taW5EYXRlIDogdW5kZWZpbmVkKSxcbiAgICAgICAgc2VsZWN0ZWREYXRlOiB0aGlzLnByb3BzLmluaXRpYWxTdGFydERhdGUsXG4gICAgICAgIHNob3VsZERpc2FibGVEYXRlOiAodGhpcy5wcm9wcy5zdGFydCA/IHRoaXMucHJvcHMuc3RhcnQuc2hvdWxkRGlzYWJsZURhdGUgOiB1bmRlZmluZWQpLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIGRpc21pc3MgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25EaXNtaXNzICYmIHRoaXMuc3RhdGUub3Blbikge1xuICAgICAgaWYgKHRoaXMuc3RhdGUuc3RhcnQuc2VsZWN0ZWREYXRlICYmIHRoaXMuc3RhdGUuZW5kLnNlbGVjdGVkRGF0ZSAmJlxuICAgICAgICAgICFpc0VxdWFsRGF0ZVRpbWUodGhpcy5zdGF0ZS5zdGFydC5zZWxlY3RlZERhdGUsIHRoaXMuc3RhdGUuZW5kLnNlbGVjdGVkRGF0ZSkpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkRpc21pc3Moe1xuICAgICAgICAgIHN0YXJ0OiB0aGlzLnN0YXRlLnN0YXJ0LnNlbGVjdGVkRGF0ZSxcbiAgICAgICAgICBlbmQ6IHRoaXMuc3RhdGUuZW5kLnNlbGVjdGVkRGF0ZSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnByb3BzLm9uRGlzbWlzcyh7XG4gICAgICAgICAgc3RhcnQ6IG51bGwsXG4gICAgICAgICAgZW5kOiBudWxsLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAvLyBlZGl0OiAnc3RhcnQnLFxuICAgICAgLy8gZGlzcGxheVRpbWU6IGZhbHNlLFxuICAgICAgb3BlbjogZmFsc2UsXG4gICAgfSk7XG4gIH07XG5cbiAgaGFuZGxlVG91Y2hUYXBEYXkgPSAoZXZlbnQsIGRhdGUpID0+IHtcbiAgICBsZXQgbmV3U3RhdGUgPSB0aGlzLnNldFNlbGVjdGVkRGF0ZShkYXRlKTtcbiAgICBjb25zdCB7YWxsUmVmcywgZWRpdH0gPSB0aGlzLnN0YXRlO1xuICAgIGxldCBrZWVwT3BlbiA9IGZhbHNlO1xuICAgIGlmICghdGhpcy5wcm9wcy5hdXRvT3BlbkZpZWxkKSB7XG4gICAgICBuZXdTdGF0ZSA9IHVwZGF0ZShuZXdTdGF0ZSwge1xuICAgICAgICBvcGVuOiB7JHNldDogZmFsc2V9LFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld1N0YXRlID0gdXBkYXRlKG5ld1N0YXRlLCB7XG4gICAgICAgIGRpc3BsYXlUaW1lOiB7JHNldDogdHJ1ZX0sXG4gICAgICAgIGFuY2hvckVsOiB7JHNldDogKGVkaXQgPT09ICdzdGFydCcgPyBhbGxSZWZzLnN0YXJ0VGltZSA6IGFsbFJlZnMuZW5kVGltZSl9LFxuICAgICAgfSk7XG4gICAgICBrZWVwT3BlbiA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUsICgpID0+IHtcbiAgICAgIHRoaXMucHJvcHMub25BY2NlcHQoe1xuICAgICAgICBzdGFydDogbmV3U3RhdGUuc3RhcnQuc2VsZWN0ZWREYXRlLFxuICAgICAgICBlbmQ6IG5ld1N0YXRlLmVuZC5zZWxlY3RlZERhdGUsXG4gICAgICB9LCBrZWVwT3Blbik7XG4gICAgICB0aGlzLnBvcG92ZXIuY3VycmVudC51cGRhdGVQb3NpdGlvbigpO1xuICAgIH0pO1xuICB9O1xuXG4gIGhhbmRsZVRvdWNoVGFwSG91ciA9IChob3VyKSA9PiB7XG4gICAgY29uc3Qge2VkaXR9ID0gdGhpcy5zdGF0ZTtcbiAgICBsZXQgbmV3U3RhdGUgPSB0aGlzLnNldFNlbGVjdGVkVGltZShob3VyKTtcbiAgICBsZXQga2VlcE9wZW4gPSBmYWxzZTtcblxuICAgIGlmICghdGhpcy5wcm9wcy5hdXRvT3BlbkZpZWxkKSB7XG4gICAgICBuZXdTdGF0ZSA9IHVwZGF0ZShuZXdTdGF0ZSwge1xuICAgICAgICBvcGVuOiB7JHNldDogZmFsc2V9LFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChlZGl0ID09PSAnc3RhcnQnKSB7XG4gICAgICAgIG5ld1N0YXRlID0gdXBkYXRlKG5ld1N0YXRlLCB7XG4gICAgICAgICAgZGlzcGxheVRpbWU6IHskc2V0OiBmYWxzZX0sXG4gICAgICAgICAgZWRpdDogeyRzZXQ6ICdlbmQnfSxcbiAgICAgICAgfSk7XG4gICAgICAgIGtlZXBPcGVuID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld1N0YXRlID0gdXBkYXRlKG5ld1N0YXRlLCB7XG4gICAgICAgICAgb3BlbjogeyRzZXQ6IGZhbHNlfSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XG4gICAgdGhpcy5wcm9wcy5vbkFjY2VwdCh7XG4gICAgICBzdGFydDogbmV3U3RhdGUuc3RhcnQuc2VsZWN0ZWREYXRlLFxuICAgICAgZW5kOiBuZXdTdGF0ZS5lbmQuc2VsZWN0ZWREYXRlLFxuICAgIH0sIGtlZXBPcGVuKTtcbiAgfTtcblxuICBoYW5kbGVUb3VjaFRhcENhbmNlbCA9ICgpID0+IHtcbiAgICB0aGlzLmRpc21pc3MoKTtcbiAgfTtcblxuICBoYW5kbGVSZXF1ZXN0Q2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy5kaXNtaXNzKCk7XG4gIH07XG5cbiAgaGFuZGxlVG91Y2hUYXBPayA9ICgpID0+IHtcbiAgICAvLyBzaG91bGQgcmV0dXJuIGFuIG9iamVjdCB3aXRoIHN0YXJ0IGFuZCBlbmQgZGF0ZXNcbiAgICBpZiAodGhpcy5wcm9wcy5vbkFjY2VwdCkge1xuICAgICAgdGhpcy5wcm9wcy5vbkFjY2VwdCh7XG4gICAgICAgIHN0YXJ0OiB0aGlzLnN0YXRlLnN0YXJ0LnNlbGVjdGVkRGF0ZSxcbiAgICAgICAgZW5kOiB0aGlzLnN0YXRlLmVuZC5zZWxlY3RlZERhdGUsXG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBvcGVuOiBmYWxzZSxcbiAgICB9KTtcbiAgfTtcblxuICBoYW5kbGVXaW5kb3dLZXlVcCA9IChldmVudCkgPT4ge1xuICAgIHN3aXRjaCAoa2V5Y29kZShldmVudCkpIHtcbiAgICAgIGNhc2UgJ2VudGVyJzpcbiAgICAgICAgdGhpcy5oYW5kbGVUb3VjaFRhcE9rKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVNb250aENoYW5nZSA9IChtb250aHMpID0+IHtcbiAgICBjb25zdCB7ZWRpdCwgc3RhcnR9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBkaXJlY3Rpb24gPSBtb250aHMgPj0gMCA/ICdsZWZ0JyA6ICdyaWdodCc7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBbdGhpcy5zdGF0ZS5lZGl0XToge1xuICAgICAgICB0cmFuc2l0aW9uRGlyZWN0aW9uOiBkaXJlY3Rpb24sXG4gICAgICAgIGRpc3BsYXlEYXRlOiB0aGlzLnByb3BzLnV0aWxzLmFkZE1vbnRocyhcbiAgICAgICAgICAodGhpcy5zdGF0ZVtlZGl0XS5kaXNwbGF5RGF0ZSA/IHRoaXMuc3RhdGVbZWRpdF0uZGlzcGxheURhdGUgOiBzdGFydC5kaXNwbGF5RGF0ZSksIG1vbnRocyksXG4gICAgICAgIHNlbGVjdGVkRGF0ZTogKHRoaXMuc3RhdGVbZWRpdF0uc2VsZWN0ZWREYXRlID8gdGhpcy5zdGF0ZVtlZGl0XS5zZWxlY3RlZERhdGUgOiBzdGFydC5zZWxlY3RlZERhdGUpLFxuICAgICAgICBzaG91bGREaXNhYmxlRGF0ZTogKHRoaXMuc3RhdGVbZWRpdF0uc2hvdWxkRGlzYWJsZURhdGUgP1xuICAgICAgICAgIHRoaXMuc3RhdGVbZWRpdF0uc2hvdWxkRGlzYWJsZURhdGUgOiBzdGFydC5zaG91bGREaXNhYmxlRGF0ZSksXG4gICAgICB9LFxuICAgIH0pO1xuICB9O1xuXG4gIGhhbmRsZVRvdWNoVGFwTWVudSA9IChlZGl0LCBkaXNwbGF5VGltZSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZWRpdDogKGVkaXQgPyBlZGl0IDogdGhpcy5wcm9wcy5lZGl0KSxcbiAgICAgIGRpc3BsYXlUaW1lOiAoZGlzcGxheVRpbWUgPyBkaXNwbGF5VGltZSA6IHRoaXMucHJvcHMuZGlzcGxheVRpbWUpLFxuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlVG91Y2hUYXBZZWFyID0gKGV2ZW50LCB5ZWFyKSA9PiB7XG4gICAgdGhpcy5zZXRTZWxlY3RlZERhdGUodGhpcy5wcm9wcy51dGlscy5zZXRZZWFyKHRoaXMuc3RhdGUuc2VsZWN0ZWREYXRlLCB5ZWFyKSwgZXZlbnQpO1xuICAgIHRoaXMuaGFuZGxlVG91Y2hUYXBEYXRlRGlzcGxheU1vbnRoRGF5KCk7XG4gIH07XG5cbiAgaGFuZGxlVG91Y2hUYXBEYXRlRGlzcGxheU1vbnRoRGF5ID0gKCkgPT4ge1xuICAgIGNvbnN0IG5ld1N0YXRlID0gdXBkYXRlKHRoaXMuc3RhdGUsIHtcbiAgICAgIFt0aGlzLnN0YXRlLmVkaXRdOiB7XG4gICAgICAgIGRpc3BsYXlNb250aERheTogeyRzZXQ6IHRydWV9LFxuICAgICAgfSxcbiAgICB9KTtcbiAgICB0aGlzLnNldFN0YXRlKG5ld1N0YXRlKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgRGF0ZVRpbWVGb3JtYXQsXG4gICAgICBhdXRvT2ssXG4gICAgICBhdXRvT3BlbkZpZWxkLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICBibG9ja2VkRGF0ZVRpbWVSYW5nZXMsXG4gICAgICBjYWxlbmRhckRhdGVXaWR0aCxcbiAgICAgIGNhbGVuZGFyVGltZVdpZHRoLFxuICAgICAgY2FuY2VsTGFiZWwsXG4gICAgICBjb250YWluZXIsXG4gICAgICBkYXlCdXR0b25TaXplLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICBkaXNwbGF5VGltZSwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgZWRpdCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgZW5kTGFiZWwsXG4gICAgICBzaG93Q2FsZW5kYXJEYXRlLFxuICAgICAgc2hvd0NhbGVuZGFyU3RhdHVzLFxuICAgICAgaW5pdGlhbFN0YXJ0RGF0ZSwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgaW5pdGlhbEVuZERhdGUsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIGZpcnN0RGF5T2ZXZWVrLFxuICAgICAgbG9jYWxlLFxuICAgICAgbW9kZSxcbiAgICAgIG9rTGFiZWwsXG4gICAgICBvbkFjY2VwdCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgb25VcGRhdGUsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIG9uRGlzbWlzcywgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgb25TaG93LCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICBzdGFydExhYmVsLFxuICAgICAgc3R5bGUsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIHV0aWxzLFxuICAgICAgLi4ub3RoZXJcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHthbGxSZWZzLCBvcGVufSA9IHRoaXMuc3RhdGU7XG5cbiAgICBsZXQgbmV3QW5jaG9yRWwgPSB0aGlzLnN0YXRlLmFuY2hvckVsO1xuICAgIGlmICh0aGlzLnN0YXRlLmVkaXQgPT09ICdzdGFydCcpIHtcbiAgICAgIG5ld0FuY2hvckVsID0gKHRoaXMuc3RhdGUuZGlzcGxheVRpbWUgPyBhbGxSZWZzLnN0YXJ0VGltZSA6IGFsbFJlZnMuc3RhcnREYXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3QW5jaG9yRWwgPSAodGhpcy5zdGF0ZS5kaXNwbGF5VGltZSA/IGFsbFJlZnMuZW5kVGltZSA6IGFsbFJlZnMuZW5kRGF0ZSk7XG4gICAgfVxuXG4gICAgY29uc3QgY29udGVudCA9IChcbiAgICAgIDxzcGFuPlxuICAgICAgICA8RXZlbnRMaXN0ZW5lclxuICAgICAgICAgIHRhcmdldD1cIndpbmRvd1wiXG4gICAgICAgICAgb25LZXlVcD17dGhpcy5oYW5kbGVXaW5kb3dLZXlVcH1cbiAgICAgICAgLz5cblxuICAgICAgICB7c2hvd0NhbGVuZGFyRGF0ZSAmJlxuICAgICAgICAgIDxEYXRlUmFuZ2VEaXNwbGF5XG4gICAgICAgICAgICBEYXRlVGltZUZvcm1hdD17RGF0ZVRpbWVGb3JtYXR9XG4gICAgICAgICAgICBkaXNhYmxlWWVhclNlbGVjdGlvbj17dHJ1ZX1cbiAgICAgICAgICAgIGRpc3BsYXlUaW1lPXt0aGlzLnN0YXRlLmRpc3BsYXlUaW1lfVxuICAgICAgICAgICAgb25Ub3VjaFRhcE1vbnRoRGF5PXt0aGlzLmhhbmRsZVRvdWNoVGFwRGF0ZURpc3BsYXlNb250aERheX1cbiAgICAgICAgICAgIG9uVG91Y2hUYXBZZWFyPXt0aGlzLmhhbmRsZVRvdWNoVGFwRGF0ZURpc3BsYXlZZWFyfVxuICAgICAgICAgICAgb25Ub3VjaFRhcE1lbnU9e3RoaXMuaGFuZGxlVG91Y2hUYXBNZW51LmJpbmQodGhpcyl9XG4gICAgICAgICAgICBsb2NhbGU9e2xvY2FsZX1cbiAgICAgICAgICAgIG1vbnRoRGF5U2VsZWN0ZWQ9e3RydWV9XG4gICAgICAgICAgICBtb2RlPXt0aGlzLnByb3BzLm1vZGV9XG4gICAgICAgICAgICBlbmQ9e3RoaXMuc3RhdGUuZW5kfVxuICAgICAgICAgICAgZWRpdD17dGhpcy5zdGF0ZS5lZGl0fVxuICAgICAgICAgICAgc3RhcnQ9e3RoaXMuc3RhdGUuc3RhcnR9XG4gICAgICAgICAgLz5cbiAgICAgICAgfVxuXG4gICAgICAgIHtzaG93Q2FsZW5kYXJTdGF0dXMgJiZcbiAgICAgICAgICA8RGF0ZVJhbmdlU3RhdHVzRGlzcGxheVxuICAgICAgICAgICAgZGlzcGxheVRpbWU9e3RoaXMuc3RhdGUuZGlzcGxheVRpbWV9XG4gICAgICAgICAgICBlZGl0PXt0aGlzLnN0YXRlLmVkaXR9XG4gICAgICAgICAgICBlbmRMYWJlbD17ZW5kTGFiZWx9XG4gICAgICAgICAgICBtb2RlPXt0aGlzLnByb3BzLm1vZGV9XG4gICAgICAgICAgICBzdGFydExhYmVsPXtzdGFydExhYmVsfVxuICAgICAgICAgIC8+XG4gICAgICAgIH1cblxuICAgICAgICA8UmFuZ2VDYWxlbmRhclxuICAgICAgICAgIGF1dG9Paz17YXV0b09rfVxuICAgICAgICAgIGJsb2NrZWREYXRlVGltZVJhbmdlcz17YmxvY2tlZERhdGVUaW1lUmFuZ2VzfVxuICAgICAgICAgIERhdGVUaW1lRm9ybWF0PXtEYXRlVGltZUZvcm1hdH1cbiAgICAgICAgICBjYWxlbmRhckRhdGVXaWR0aD17Y2FsZW5kYXJEYXRlV2lkdGh9XG4gICAgICAgICAgY2FsZW5kYXJUaW1lV2lkdGg9e2NhbGVuZGFyVGltZVdpZHRofVxuICAgICAgICAgIGNhbmNlbExhYmVsPXtjYW5jZWxMYWJlbH1cbiAgICAgICAgICBkaXNhYmxlWWVhclNlbGVjdGlvbj17dHJ1ZX1cbiAgICAgICAgICBkaXNwbGF5VGltZT17dGhpcy5zdGF0ZS5kaXNwbGF5VGltZX1cbiAgICAgICAgICBkYXlCdXR0b25TaXplPXtkYXlCdXR0b25TaXplfVxuICAgICAgICAgIGZpcnN0RGF5T2ZXZWVrPXtmaXJzdERheU9mV2Vla31cbiAgICAgICAgICBsb2NhbGU9e2xvY2FsZX1cbiAgICAgICAgICBvblRvdWNoVGFwRGF5PXt0aGlzLmhhbmRsZVRvdWNoVGFwRGF5LmJpbmQodGhpcyl9XG4gICAgICAgICAgb25Ub3VjaFRhcEhvdXI9e3RoaXMuaGFuZGxlVG91Y2hUYXBIb3VyLmJpbmQodGhpcyl9XG4gICAgICAgICAgbW9kZT17bW9kZX1cbiAgICAgICAgICBvcGVuPXtvcGVufVxuICAgICAgICAgIHJlZj1cInN0YXJ0Q2FsZW5kYXJcIlxuICAgICAgICAgIG9uVG91Y2hUYXBDYW5jZWw9e3RoaXMuaGFuZGxlVG91Y2hUYXBDYW5jZWx9XG4gICAgICAgICAgb25Ub3VjaFRhcE9rPXt0aGlzLmhhbmRsZVRvdWNoVGFwT2t9XG4gICAgICAgICAgb2tMYWJlbD17b2tMYWJlbH1cbiAgICAgICAgICBvcGVuVG9ZZWFyU2VsZWN0aW9uPXtmYWxzZX1cbiAgICAgICAgICBlZGl0PXt0aGlzLnN0YXRlLmVkaXR9XG4gICAgICAgICAgZW5kPXt0aGlzLnN0YXRlLmVuZH1cbiAgICAgICAgICBzdGFydD17dGhpcy5zdGF0ZS5zdGFydH1cbiAgICAgICAgICBzZXRTZWxlY3RlZERhdGU9e3RoaXMuc2V0U2VsZWN0ZWREYXRlLmJpbmQodGhpcyl9XG4gICAgICAgICAgb25Nb250aENoYW5nZT17dGhpcy5oYW5kbGVNb250aENoYW5nZX1cbiAgICAgICAgICB1dGlscz17dXRpbHN9XG4gICAgICAgIC8+XG4gICAgICA8L3NwYW4+XG4gICAgKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHsuLi5vdGhlcn0gcmVmPVwicm9vdFwiPlxuICAgICAgICB7Y29udGFpbmVyID09PSAnaW5saW5lJyA/XG4gICAgICAgICAgPFBvcG92ZXJcbiAgICAgICAgICAgIGFjdGlvbj17dGhpcy5wb3BvdmVyfVxuICAgICAgICAgICAgYW5jaG9yRWw9e25ld0FuY2hvckVsIHx8IHRoaXMucmVmcy5yb290fVxuICAgICAgICAgICAgYW5jaG9yT3JpZ2luPXt7aG9yaXpvbnRhbDogJ2xlZnQnLCB2ZXJ0aWNhbDogJ2JvdHRvbSd9fVxuICAgICAgICAgICAgdHJhbnNmb3JtT3JpZ2luPXt7aG9yaXpvbnRhbDogJ2xlZnQnLCB2ZXJ0aWNhbDogJ3RvcCd9fVxuICAgICAgICAgICAgcmVmPVwiZGlhbG9nXCJcbiAgICAgICAgICAgIG9wZW49e29wZW59XG4gICAgICAgICAgICBvbkNsb3NlPXt0aGlzLmhhbmRsZVJlcXVlc3RDbG9zZX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7Y29udGVudH1cbiAgICAgICAgICA8L1BvcG92ZXI+IDpcbiAgICAgICAgICA8RGlhbG9nXG4gICAgICAgICAgICByZWY9XCJkaWFsb2dcIlxuICAgICAgICAgICAgb3Blbj17b3Blbn1cbiAgICAgICAgICAgIG9uQ2xvc2U9e3RoaXMuaGFuZGxlUmVxdWVzdENsb3NlfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtjb250ZW50fVxuICAgICAgICAgIDwvRGlhbG9nPlxuICAgICAgICB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERhdGVSYW5nZVBpY2tlckRpYWxvZztcbiJdfQ==