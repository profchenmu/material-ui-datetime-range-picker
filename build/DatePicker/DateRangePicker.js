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

var _dateUtils = require('./dateUtils');

var _DateRangePickerDialog = require('./DateRangePickerDialog');

var _DateRangePickerDialog2 = _interopRequireDefault(_DateRangePickerDialog);

var _SvgIcon = require('@material-ui/core/SvgIcon');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import getMuiTheme from 'material-ui/styles/getMuiTheme';

var DateRangePicker = function (_Component) {
  _inherits(DateRangePicker, _Component);

  function DateRangePicker() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DateRangePicker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DateRangePicker.__proto__ || Object.getPrototypeOf(DateRangePicker)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      dialogVisible: false,
      startDate: undefined,
      endDate: undefined,
      selectedStartDate: undefined,
      selectedEndDate: undefined
    }, _this.handleAccept = function (dates, keepOpen) {
      if (!_this.isControlled()) {
        _this.setState({
          startDate: dates.start,
          endDate: dates.end,
          dialogVisible: keepOpen || false,
          selectedStartDate: dates.start,
          selectedEndDate: dates.end
        });
        if (_this.props.onChange) {
          _this.props.onChange(null, dates);
        }
      } else {
        _this.setState({
          dialogVisible: keepOpen || false
        });
        if (_this.props.onChange) {
          _this.props.onChange(null, dates);
        }
      }
    }, _this.handleUpdate = function (dates) {
      _this.setState({
        selectedStartDate: dates.start,
        selectedEndDate: dates.end
      });
    }, _this.handleShow = function () {
      _this.setState({
        dialogVisible: true
      });
      if (_this.props.onShow) _this.props.onShow();
    }, _this.handleDismiss = function (dates) {
      _this.setState({
        selectedStartDate: undefined,
        selectedEndDate: undefined,
        dialogVisible: false
      });
      if (_this.props.onDismiss) _this.props.onDismiss(null, dates);
    }, _this.handleFocus = function (event) {
      event.target.blur();
      if (_this.props.onFocus) {
        _this.props.onFocus(event);
      }
    }, _this.handleTouchTap = function (showRef, startEnd, dateTime, disabled, event) {
      if (!disabled) {
        if (_this.props.onClick) {
          _this.props.onClick(event);
        }

        if (!_this.props.disabled) {
          setTimeout(function () {
            _this.openDialog(showRef, startEnd, dateTime);
          }, 0);
        }
      }
    }, _this.formatDate = function (date) {
      if (_this.props.locale) {
        var DateTimeFormat = _this.props.DateTimeFormat || _dateUtils.dateTimeFormat;
        return new DateTimeFormat(_this.props.locale, {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric'
        }).format(date);
      } else {
        return (0, _dateUtils.formatIso)(date);
      }
    }, _this.dropdownArrow = function (disabled) {
      var layout = _this.props.layout;

      var style = {
        fill: disabled ? '#a2a2a2' : '#757575',
        width: '10px', height: '6px',
        marginRight: '10px'
      };
      return layout !== 'single' && _react2.default.createElement(
        _SvgIcon2.default,
        { viewBox: '3064 -23442 10 6', style: style },
        _react2.default.createElement('path', {
          d: 'M23.07,10a.707.707,0,0,1-.479-.19.684.684,0,0,1,0-.949L26.485,5,22.591,1.139a.684.684,0,0,1,0-.949.7.7,0,0,1,.957,0L28.4,5,23.549,9.81A.652.652,0,0,1,23.07,10Z' // eslint-disable-line max-len
          , transform: 'translate(3074 -23464.4) rotate(90)'
        })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DateRangePicker, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        muiTheme: this.getTheme()
      };
    }
  }, {
    key: 'getTheme',
    value: function getTheme() {
      return this.context.muiTheme;
    }
  }, {
    key: 'UNSAFE_componentWillMount',
    value: function UNSAFE_componentWillMount() {
      var newDates = this.getControlledDate();
      if (this.isControlled() && newDates) {
        this.setState({
          startDate: newDates.start,
          endDate: newDates.end
        });
      } else {
        this.setState({
          startDate: undefined,
          endDate: undefined
        });
      }
    }
  }, {
    key: 'UNSAFE_componentWillReceiveProps',
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (this.isControlled()) {
        var newDates = this.getControlledDate(nextProps);
        if (newDates) {
          if (newDates.start && newDates.end && !(0, _dateUtils.isEqualDateTime)(this.state.startDate, newDates.start) || !(0, _dateUtils.isEqualDateTime)(this.state.endDate, newDates.end) || !(0, _dateUtils.isEqualDateTime)(this.state.selectedStartDate, newDates.start) || !(0, _dateUtils.isEqualDateTime)(this.state.selectedEndDate, newDates.end)) {
            this.setState({
              startDate: newDates.start,
              endDate: newDates.end,
              selectedStartDate: newDates.start,
              selectedEndDate: newDates.end
            });
          }
        } else if (this.props.value && this.props.value.start && this.props.value.end && nextProps.value && !nextProps.value.start && !nextProps.value.end) {
          this.setState({
            dialogStartDate: new Date(),
            dialogEndDate: new Date(),
            dialogVisible: false,
            startDate: undefined,
            endDate: undefined,
            selectedStartDate: undefined,
            selectedEndDate: undefined
          }, this.refs.dialogWindow.reset.bind(this));
        }
      }
    }
  }, {
    key: 'getDates',
    value: function getDates() {
      return {
        startDate: this.state.startDate,
        endDate: this.state.endDate
      };
    }

    /**
     * Open the date-picker dialog programmatically from a parent.
     */

  }, {
    key: 'openDialog',
    value: function openDialog(showRef, startEnd, dateTime) {
      /**
       * if the date is not selected then set it to new date
       * (get the current system date while doing so)
       * else set it to the currently selected date
       */
      var allRefs = {
        startDate: this.refs.startdatefield,
        startTime: this.refs.starttimefield,
        endDate: this.refs.enddatefield,
        endTime: this.refs.endtimefield
      };
      if (!this.state.dialogVisible) {
        if (this.state.startDate !== undefined && this.state.endDate !== undefined) {
          this.setState({
            dialogStartDate: this.getDates().startDate,
            dialogEndDate: this.getDates().endDate,
            selectedStartDate: undefined,
            selectedEndDate: undefined
          }, this.refs.dialogWindow.show.bind(this, showRef, startEnd, dateTime, allRefs));
        } else {
          this.setState({
            dialogStartDate: new Date(),
            dialogEndDate: new Date(),
            selectedStartDate: undefined,
            selectedEndDate: undefined
          }, this.refs.dialogWindow.show.bind(this, showRef, startEnd, dateTime, allRefs));
        }
      }
    }

    /**
     * Alias for `openDialog()` for an api consistent with TextField.
     */
    // focus() {
    //   this.openDialog();
    // }

  }, {
    key: 'isControlled',
    value: function isControlled() {
      return this.props.hasOwnProperty('value');
    }
  }, {
    key: 'getControlledDate',
    value: function getControlledDate() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      if (props.value && (props.value.start instanceof Date || props.value.end instanceof Date)) {
        return props.value;
      }
    }
  }, {
    key: 'formatDateForDisplay',
    value: function formatDateForDisplay(date, label) {
      if (date instanceof Date) {
        if (this.props.locale) {
          return new Intl.DateTimeFormat(this.props.locale, {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
          }).format(date);
        } else {
          return new Intl.DateTimeFormat('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
          }).format(date);
        }
      } else {
        return label;
      }
    }
  }, {
    key: 'formatTimeForDisplay',
    value: function formatTimeForDisplay(date, label) {
      if (date instanceof Date) {
        if (this.props.locale) {
          return new Intl.DateTimeFormat(this.props.locale, {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          }).format(date);
        } else {
          return new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          }).format(date);
        }
      } else {
        return label;
      }
    }
  }, {
    key: 'divider',
    value: function divider() {
      var layout = this.props.layout;

      return layout === 'single' && _react2.default.createElement(
        'span',
        { style: { margin: 'auto 10px', color: '#757575' } },
        '-'
      );
    }
  }, {
    key: 'timeStyle',
    value: function timeStyle(disabled) {
      var layout = this.props.layout;

      return _extends({
        height: '38px',
        lineHeight: '38px',
        paddingLeft: layout !== 'single' ? '10px' : '5px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        color: '#757575'
      }, layout !== 'single' ? {
        width: '99px',
        border: '1px solid #e5e5e5'
      } : {});
    }
  }, {
    key: 'dateStyle',
    value: function dateStyle(disabled) {
      var layout = this.props.layout;

      return _extends({
        height: '38px',
        lineHeight: '38px',
        paddingLeft: layout === 'single' ? '0px' : '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        color: '#757575'
      }, layout !== 'single' ? {
        width: '117px',
        border: '1px solid #e5e5e5'
      } : {});
    }
  }, {
    key: 'getStyles',
    value: function getStyles() {
      var layout = this.props.layout;

      return {
        textField: {
          display: 'flex',
          justifyContent: layout !== 'single' ? 'space-between' : 'flex-start',
          alignItems: 'center',
          flexWrap: layout === 'single' ? 'nowrap' : 'wrap'
        },
        endContainer: _extends({
          display: 'flex',
          justifyContent: 'space-between'
        }, layout !== 'single' ? {
          width: '100%'
        } : {}),
        startContainer: _extends({
          display: 'flex',
          justifyContent: 'space-between'
        }, layout !== 'single' ? {
          width: '100%',
          marginBottom: '16px'
        } : {})
      };
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
          className = _props.className,
          container = _props.container,
          dayButtonSize = _props.dayButtonSize,
          display = _props.display,
          end = _props.end,
          endLabel = _props.endLabel,
          endLabelDate = _props.endLabelDate,
          endLabelTime = _props.endLabelTime,
          firstDayOfWeek = _props.firstDayOfWeek,
          formatDisplay = _props.formatDisplay,
          layout = _props.layout,
          locale = _props.locale,
          mode = _props.mode,
          okLabel = _props.okLabel,
          onDismiss = _props.onDismiss,
          onFocus = _props.onFocus,
          onShow = _props.onShow,
          onClick = _props.onClick,
          showCalendarDate = _props.showCalendarDate,
          showCalendarStatus = _props.showCalendarStatus,
          start = _props.start,
          startLabel = _props.startLabel,
          startLabelDate = _props.startLabelDate,
          startLabelTime = _props.startLabelTime,
          style = _props.style,
          textFieldStyle = _props.textFieldStyle,
          utils = _props.utils,
          other = _objectWithoutProperties(_props, ['DateTimeFormat', 'autoOk', 'autoOpenField', 'blockedDateTimeRanges', 'calendarDateWidth', 'calendarTimeWidth', 'cancelLabel', 'className', 'container', 'dayButtonSize', 'display', 'end', 'endLabel', 'endLabelDate', 'endLabelTime', 'firstDayOfWeek', 'formatDisplay', 'layout', 'locale', 'mode', 'okLabel', 'onDismiss', 'onFocus', 'onShow', 'onClick', 'showCalendarDate', 'showCalendarStatus', 'start', 'startLabel', 'startLabelDate', 'startLabelTime', 'style', 'textFieldStyle', 'utils']);

      var _getTheme = this.getTheme(),
          prepareStyles = _getTheme.prepareStyles;

      var styles = this.getStyles();

      var _state = this.state,
          selectedStartDate = _state.selectedStartDate,
          selectedEndDate = _state.selectedEndDate,
          startDate = _state.startDate,
          endDate = _state.endDate;


      var starting = selectedStartDate ? selectedStartDate : startDate;
      var ending = selectedEndDate ? selectedEndDate : endDate;
      var formattedStartDate = this.formatDateForDisplay(starting, startLabelDate);
      var formattedStartTime = this.formatTimeForDisplay(starting, startLabelTime);
      var formattedEndDate = this.formatDateForDisplay(ending, endLabelDate);
      var formattedEndTime = this.formatTimeForDisplay(ending, endLabelTime);

      var startInfo = {
        dateRef: 'startdatefield',
        onClickDate: this.handleTouchTap.bind(this, this.refs.startdatefield, 'start', 'date', false),
        formattedDate: formattedStartDate,
        timeRef: 'starttimefield',
        onClickTime: this.handleTouchTap.bind(this, this.refs.starttimefield, 'start', 'time', formattedStartDate === startLabelDate),
        formattedTime: formattedStartTime
      };

      var endInfo = {
        dateRef: 'enddatefield',
        onClickDate: this.handleTouchTap.bind(this, this.refs.enddatefield, 'end', 'date', formattedStartDate === startLabelDate),
        formattedDate: formattedEndDate,
        timeRef: 'endtimefield',
        onClickTime: this.handleTouchTap.bind(this, this.refs.endtimefield, 'end', 'time', formattedEndDate === endLabelDate),
        formattedTime: formattedEndTime
      };

      return _react2.default.createElement(
        'div',
        { className: className, style: prepareStyles((0, _simpleAssign2.default)({}, style)) },
        display ? display(startInfo, endInfo, this.handleFocus) : _react2.default.createElement(
          'div',
          { style: (0, _simpleAssign2.default)({}, styles.textField, textFieldStyle) },
          layout !== 'single' && _react2.default.createElement(
            'div',
            { style: { width: '100%', fontWeight: 'semibold', marginBottom: '5px', fontSize: '15px' } },
            'Pick Up'
          ),
          _react2.default.createElement(
            'div',
            { style: styles.startContainer },
            _react2.default.createElement(
              'div',
              {
                style: this.dateStyle(),
                ref: 'startdatefield',
                onFocus: this.handleFocus,
                onClick: this.handleTouchTap.bind(this, this.refs.startdatefield, 'start', 'date', false)
              },
              _react2.default.createElement(
                'span',
                null,
                formattedStartDate
              ),
              layout === 'single' && formattedStartDate !== startLabelDate && _react2.default.createElement(
                'span',
                null,
                ','
              ),
              this.dropdownArrow()
            ),
            _react2.default.createElement(
              'div',
              {
                style: this.timeStyle(formattedStartDate === startLabelDate),
                ref: 'starttimefield',
                onFocus: this.handleFocus,
                onClick: this.handleTouchTap.bind(this, this.refs.starttimefield, 'start', 'time', formattedStartDate === startLabelDate)
              },
              _react2.default.createElement(
                'span',
                null,
                formattedStartTime
              ),
              this.dropdownArrow()
            )
          ),
          this.divider(),
          layout !== 'single' && _react2.default.createElement(
            'div',
            { style: { width: '100%', fontWeight: 'semibold', marginBottom: '5px', fontSize: '15px' } },
            'Drop Off'
          ),
          _react2.default.createElement(
            'div',
            { style: styles.endContainer },
            _react2.default.createElement(
              'div',
              {
                style: this.dateStyle(formattedStartDate === startLabelDate),
                ref: 'enddatefield',
                onFocus: this.handleFocus,
                onClick: this.handleTouchTap.bind(this, this.refs.enddatefield, 'end', 'date', formattedStartDate === startLabelDate)
              },
              _react2.default.createElement(
                'span',
                null,
                formattedEndDate
              ),
              layout === 'single' && formattedEndDate !== endLabelDate && _react2.default.createElement(
                'span',
                null,
                ','
              ),
              this.dropdownArrow()
            ),
            _react2.default.createElement(
              'div',
              {
                style: this.timeStyle(formattedEndDate === endLabelDate),
                ref: 'endtimefield',
                onFocus: this.handleFocus,
                onClick: this.handleTouchTap.bind(this, this.refs.endtimefield, 'end', 'time', formattedEndDate === endLabelDate)
              },
              _react2.default.createElement(
                'span',
                null,
                formattedEndTime
              ),
              this.dropdownArrow()
            )
          )
        ),
        _react2.default.createElement(_DateRangePickerDialog2.default, {
          DateTimeFormat: DateTimeFormat,
          autoOk: autoOk,
          autoOpenField: autoOpenField,
          blockedDateTimeRanges: blockedDateTimeRanges,
          calendarDateWidth: calendarDateWidth,
          calendarTimeWidth: calendarTimeWidth,
          cancelLabel: cancelLabel,
          container: container,
          dayButtonSize: dayButtonSize,
          end: end,
          endLabel: endLabel,
          firstDayOfWeek: firstDayOfWeek,
          initialStartDate: this.state.dialogStartDate,
          initialEndDate: this.state.dialogEndDate,
          locale: locale,
          showCalendarDate: showCalendarDate,
          showCalendarStatus: showCalendarStatus,
          mode: mode,
          okLabel: okLabel,
          onAccept: this.handleAccept,
          onUpdate: this.handleUpdate,
          onShow: this.handleShow,
          onDismiss: this.handleDismiss,
          ref: 'dialogWindow',
          start: start,
          startLabel: startLabel,
          utils: utils
        })
      );
    }
  }]);

  return DateRangePicker;
}(_react.Component);

DateRangePicker.propTypes = {
  /**
   * Constructor for date formatting for the specified `locale`.
   * The constructor must follow this specification: ECMAScript Internationalization API 1.0 (ECMA-402).
   * `Intl.DateTimeFormat` is supported by most modern browsers, see http://caniuse.com/#search=intl,
   * otherwise https://github.com/andyearnshaw/Intl.js is a good polyfill.
   *
   * By default, a built-in `DateTimeFormat` is used which supports the 'en-US' `locale`.
   */
  DateTimeFormat: _propTypes2.default.func,
  /**
   * If true, automatically accept and close the picker on select a date.
   */
  autoOk: _propTypes2.default.bool,
  /**
   * If true, automatically open the next datetime element
   */
  autoOpenField: _propTypes2.default.bool,
  /**
   * Used to block datetime ranges on the date range picker
   */
  blockedDateTimeRanges: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    /**
     * The end datetime of a blocked range
     */
    end: _propTypes2.default.object,
    /**
     * The start datetime of a blocked range
     */
    start: _propTypes2.default.object
  })),
  /**
   * Override the default width of the calendar when displaying days.
   */
  calendarDateWidth: _propTypes2.default.string,
  /**
   * Override the default width of the calendar when displaying times.
   */
  calendarTimeWidth: _propTypes2.default.string,
  /**
   * Override the default text of the 'Cancel' button.
   */
  cancelLabel: _propTypes2.default.node,
  /**
   * The css class name of the root element.
   */
  className: _propTypes2.default.string,
  /**
   * Used to control how the Date Picker will be displayed when the input field is focused.
   * `dialog` (default) displays the DatePicker as a dialog with a modal.
   * `inline` displays the DatePicker below the input field (similar to auto complete).
   */
  container: _propTypes2.default.oneOf(['dialog', 'inline']),
  /**
   * Override the default size of day buttons.
   */
  dayButtonSize: _propTypes2.default.string,
  /**
   * Disables the DatePicker.
   */
  disabled: _propTypes2.default.bool,
  /**
   * Custom display function for date time fields.
   */
  display: _propTypes2.default.func,
  /**
   * This is the container for attributes and methods specific to the 'end' calendar.
   */
  end: _propTypes2.default.shape({
    /**
     * This is the initial date value of the component.
     * If either `value` or `valueLink` is provided they will override this
     * prop with `value` taking precedence.
     */
    defaultDate: _propTypes2.default.object,
    /**
     * The ending of a range of valid dates. The range includes the endDate.
     * The default value is current date + 100 years.
     */
    maxDate: _propTypes2.default.object,
    /**
     * The beginning of a range of valid dates. The range includes the startDate.
     * The default value is current date - 100 years.
     */
    minDate: _propTypes2.default.object,
    /**
     * Callback function used to determine if a day's entry should be disabled on the calendar.
     *
     * @param {object} day Date object of a day.
     * @returns {boolean} Indicates whether the day should be disabled.
     */
    shouldDisableDate: _propTypes2.default.func
  }),
  /**
   * Override the default text of the 'End' label.
   */
  endLabel: _propTypes2.default.string,
  /**
   * Override the default text of the 'End' label for dates.
   */
  endLabelDate: _propTypes2.default.string,
  /**
   * Override the default text of the 'End' label for times.
   */
  endLabelTime: _propTypes2.default.string,
  /**
   * Used to change the first day of week. It varies from
   * Saturday to Monday between different locales.
   * The allowed range is 0 (Sunday) to 6 (Saturday).
   * The default is `1`, Monday, as per ISO 8601.
   */
  firstDayOfWeek: _propTypes2.default.number,
  /**
   * Override the default display formatting.
   */
  formatDisplay: _propTypes2.default.func,
  /**
   * Determines if the component will show multiple boxes and the behavior
   * when a user interacts with it.
   */
  layout: _propTypes2.default.string,
  /**
   * Locale used for formatting the `DatePicker` date strings. Other than for 'en-US', you
   * must provide a `DateTimeFormat` that supports the chosen `locale`.
   */
  locale: _propTypes2.default.string,
  /**
   * Tells the component to display the picker in portrait or landscape mode.
   */
  mode: _propTypes2.default.oneOf(['portrait', 'landscape']),
  /**
   * Override the default text of the 'OK' button.
   */
  okLabel: _propTypes2.default.node,
  /**
   * Callback function that is fired when the date value changes.
   *
   * @param {null} null Since there is no particular event associated with the change,
   * the first argument will always be null.
   * @param {object} date The new date.
   */
  onChange: _propTypes2.default.func,
  /**
   * Callback function that is fired when a touch tap event occurs on the Date Picker's `TextField`.
   *
   * @param {object} event TouchTap event targeting the `TextField`.
   */
  onClick: _propTypes2.default.func,
  /**
   * Callback function that is fired when the Date Picker's dialog is dismissed.
   *
   * @param {null} null Since there is no particular event associated with the dismiss,
   * the first argument will always be null.
   * @param {object} date The new date or null dates.
   */
  onDismiss: _propTypes2.default.func,
  /**
   * Callback function that is fired when the Date Picker's `TextField` gains focus.
   */
  onFocus: _propTypes2.default.func,
  /**
   * Callback function that is fired when the Date Picker's dialog is shown.
   */
  onShow: _propTypes2.default.func,
  /**
   * Shows the calendar date/time display. Defaults to false.
   */
  showCalendarDate: _propTypes2.default.bool,
  /**
   * Shows the current step in the date/time selection. Defaults to false.
   */
  showCalendarStatus: _propTypes2.default.bool,
  /**
   * This is the container for attributes and methods specific to the 'start' calendar.
   */
  start: _propTypes2.default.shape({
    /**
     * This is the initial date value of the component.
     * If either `value` or `valueLink` is provided they will override this
     * prop with `value` taking precedence.
     */
    defaultDate: _propTypes2.default.object,
    /**
     * The ending of a range of valid dates. The range includes the endDate.
     * The default value is current date + 100 years.
     */
    maxDate: _propTypes2.default.object,
    /**
     * The beginning of a range of valid dates. The range includes the startDate.
     * The default value is current date - 100 years.
     */
    minDate: _propTypes2.default.object,
    /**
     * Callback function used to determine if a day's entry should be disabled on the calendar.
     *
     * @param {object} day Date object of a day.
     * @returns {boolean} Indicates whether the day should be disabled.
     */
    shouldDisableDate: _propTypes2.default.func
  }),
  /**
   * Override the default text of the 'Start' label.
   */
  startLabel: _propTypes2.default.string,
  /**
   * Override the default text of the 'Start' label for dates.
   */
  startLabelDate: _propTypes2.default.string,
  /**
   * Override the default text of the 'Start' label for times.
   */
  startLabelTime: _propTypes2.default.string,
  /**
   * Override the inline-styles of the root element.
   */
  style: _propTypes2.default.object,
  /**
   * Override the inline-styles of DatePicker's TextField element.
   */
  textFieldStyle: _propTypes2.default.object,
  /**
   * This object should contain methods needed to build the calendar system.
   *
   * Useful for building a custom calendar system. Refer to the
   * [source code](https://github.com/callemall/material-ui/blob/master/src/DatePicker/dateUtils.js)
   * and an [example implementation](https://github.com/alitaheri/material-ui-persian-date-picker-utils)
   * for more information.
   */
  utils: _propTypes2.default.object,
  /**
   * Sets the date for the Date Picker programmatically.
   */
  value: _propTypes2.default.shape({
    /**
     * The end date
     */
    end: _propTypes2.default.object,
    /**
     * The start date
     */
    start: _propTypes2.default.object
  })
};
DateRangePicker.defaultProps = {
  autoOk: false,
  container: 'dialog',
  disabled: false,
  endLabel: 'End',
  endLabelDate: 'Date',
  endLabelTime: 'Time',
  firstDayOfWeek: 1,
  startLabel: 'Start',
  startLabelDate: 'Date',
  startLabelTime: 'Time',
  style: {}
};
DateRangePicker.contextTypes = {
  muiTheme: _propTypes2.default.object
};
DateRangePicker.childContextTypes = {
  muiTheme: _propTypes2.default.object
};
exports.default = DateRangePicker;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9EYXRlUGlja2VyL0RhdGVSYW5nZVBpY2tlci5qcyJdLCJuYW1lcyI6WyJEYXRlUmFuZ2VQaWNrZXIiLCJzdGF0ZSIsImRpYWxvZ1Zpc2libGUiLCJzdGFydERhdGUiLCJ1bmRlZmluZWQiLCJlbmREYXRlIiwic2VsZWN0ZWRTdGFydERhdGUiLCJzZWxlY3RlZEVuZERhdGUiLCJoYW5kbGVBY2NlcHQiLCJkYXRlcyIsImtlZXBPcGVuIiwiaXNDb250cm9sbGVkIiwic2V0U3RhdGUiLCJzdGFydCIsImVuZCIsInByb3BzIiwib25DaGFuZ2UiLCJoYW5kbGVVcGRhdGUiLCJoYW5kbGVTaG93Iiwib25TaG93IiwiaGFuZGxlRGlzbWlzcyIsIm9uRGlzbWlzcyIsImhhbmRsZUZvY3VzIiwiZXZlbnQiLCJ0YXJnZXQiLCJibHVyIiwib25Gb2N1cyIsImhhbmRsZVRvdWNoVGFwIiwic2hvd1JlZiIsInN0YXJ0RW5kIiwiZGF0ZVRpbWUiLCJkaXNhYmxlZCIsIm9uQ2xpY2siLCJzZXRUaW1lb3V0Iiwib3BlbkRpYWxvZyIsImZvcm1hdERhdGUiLCJkYXRlIiwibG9jYWxlIiwiRGF0ZVRpbWVGb3JtYXQiLCJkYXRlVGltZUZvcm1hdCIsImRheSIsIm1vbnRoIiwieWVhciIsImZvcm1hdCIsImRyb3Bkb3duQXJyb3ciLCJsYXlvdXQiLCJzdHlsZSIsImZpbGwiLCJ3aWR0aCIsImhlaWdodCIsIm1hcmdpblJpZ2h0IiwibXVpVGhlbWUiLCJnZXRUaGVtZSIsImNvbnRleHQiLCJuZXdEYXRlcyIsImdldENvbnRyb2xsZWREYXRlIiwibmV4dFByb3BzIiwidmFsdWUiLCJkaWFsb2dTdGFydERhdGUiLCJEYXRlIiwiZGlhbG9nRW5kRGF0ZSIsInJlZnMiLCJkaWFsb2dXaW5kb3ciLCJyZXNldCIsImJpbmQiLCJhbGxSZWZzIiwic3RhcnRkYXRlZmllbGQiLCJzdGFydFRpbWUiLCJzdGFydHRpbWVmaWVsZCIsImVuZGRhdGVmaWVsZCIsImVuZFRpbWUiLCJlbmR0aW1lZmllbGQiLCJnZXREYXRlcyIsInNob3ciLCJoYXNPd25Qcm9wZXJ0eSIsImxhYmVsIiwiSW50bCIsImhvdXIiLCJtaW51dGUiLCJob3VyMTIiLCJtYXJnaW4iLCJjb2xvciIsImxpbmVIZWlnaHQiLCJwYWRkaW5nTGVmdCIsImRpc3BsYXkiLCJqdXN0aWZ5Q29udGVudCIsImFsaWduSXRlbXMiLCJjdXJzb3IiLCJib3JkZXIiLCJ0ZXh0RmllbGQiLCJmbGV4V3JhcCIsImVuZENvbnRhaW5lciIsInN0YXJ0Q29udGFpbmVyIiwibWFyZ2luQm90dG9tIiwiYXV0b09rIiwiYXV0b09wZW5GaWVsZCIsImJsb2NrZWREYXRlVGltZVJhbmdlcyIsImNhbGVuZGFyRGF0ZVdpZHRoIiwiY2FsZW5kYXJUaW1lV2lkdGgiLCJjYW5jZWxMYWJlbCIsImNsYXNzTmFtZSIsImNvbnRhaW5lciIsImRheUJ1dHRvblNpemUiLCJlbmRMYWJlbCIsImVuZExhYmVsRGF0ZSIsImVuZExhYmVsVGltZSIsImZpcnN0RGF5T2ZXZWVrIiwiZm9ybWF0RGlzcGxheSIsIm1vZGUiLCJva0xhYmVsIiwic2hvd0NhbGVuZGFyRGF0ZSIsInNob3dDYWxlbmRhclN0YXR1cyIsInN0YXJ0TGFiZWwiLCJzdGFydExhYmVsRGF0ZSIsInN0YXJ0TGFiZWxUaW1lIiwidGV4dEZpZWxkU3R5bGUiLCJ1dGlscyIsIm90aGVyIiwicHJlcGFyZVN0eWxlcyIsInN0eWxlcyIsImdldFN0eWxlcyIsInN0YXJ0aW5nIiwiZW5kaW5nIiwiZm9ybWF0dGVkU3RhcnREYXRlIiwiZm9ybWF0RGF0ZUZvckRpc3BsYXkiLCJmb3JtYXR0ZWRTdGFydFRpbWUiLCJmb3JtYXRUaW1lRm9yRGlzcGxheSIsImZvcm1hdHRlZEVuZERhdGUiLCJmb3JtYXR0ZWRFbmRUaW1lIiwic3RhcnRJbmZvIiwiZGF0ZVJlZiIsIm9uQ2xpY2tEYXRlIiwiZm9ybWF0dGVkRGF0ZSIsInRpbWVSZWYiLCJvbkNsaWNrVGltZSIsImZvcm1hdHRlZFRpbWUiLCJlbmRJbmZvIiwiZm9udFdlaWdodCIsImZvbnRTaXplIiwiZGF0ZVN0eWxlIiwidGltZVN0eWxlIiwiZGl2aWRlciIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsImZ1bmMiLCJib29sIiwiYXJyYXlPZiIsInNoYXBlIiwib2JqZWN0Iiwic3RyaW5nIiwibm9kZSIsIm9uZU9mIiwiZGVmYXVsdERhdGUiLCJtYXhEYXRlIiwibWluRGF0ZSIsInNob3VsZERpc2FibGVEYXRlIiwibnVtYmVyIiwiZGVmYXVsdFByb3BzIiwiY29udGV4dFR5cGVzIiwiY2hpbGRDb250ZXh0VHlwZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUdBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUFKQTs7SUFNTUEsZTs7Ozs7Ozs7Ozs7Ozs7d01BNlFKQyxLLEdBQVE7QUFDTkMscUJBQWUsS0FEVDtBQUVOQyxpQkFBV0MsU0FGTDtBQUdOQyxlQUFTRCxTQUhIO0FBSU5FLHlCQUFtQkYsU0FKYjtBQUtORyx1QkFBaUJIO0FBTFgsSyxRQStHUkksWSxHQUFlLFVBQUNDLEtBQUQsRUFBUUMsUUFBUixFQUFxQjtBQUNsQyxVQUFJLENBQUMsTUFBS0MsWUFBTCxFQUFMLEVBQTBCO0FBQ3hCLGNBQUtDLFFBQUwsQ0FBYztBQUNaVCxxQkFBV00sTUFBTUksS0FETDtBQUVaUixtQkFBU0ksTUFBTUssR0FGSDtBQUdaWix5QkFBZ0JRLFlBQVksS0FIaEI7QUFJWkosNkJBQW1CRyxNQUFNSSxLQUpiO0FBS1pOLDJCQUFpQkUsTUFBTUs7QUFMWCxTQUFkO0FBT0EsWUFBSSxNQUFLQyxLQUFMLENBQVdDLFFBQWYsRUFBeUI7QUFDdkIsZ0JBQUtELEtBQUwsQ0FBV0MsUUFBWCxDQUFvQixJQUFwQixFQUEwQlAsS0FBMUI7QUFDRDtBQUNGLE9BWEQsTUFXTztBQUNMLGNBQUtHLFFBQUwsQ0FBYztBQUNaVix5QkFBZ0JRLFlBQVk7QUFEaEIsU0FBZDtBQUdBLFlBQUksTUFBS0ssS0FBTCxDQUFXQyxR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SixlLENBdVBHOEosWSxHQUFlO0FBQ3BCaEUsVUFBUSxLQURZO0FBRXBCTyxhQUFXLFFBRlM7QUFHcEJ0RSxZQUFVLEtBSFU7QUFJcEJ3RSxZQUFVLEtBSlU7QUFLcEJDLGdCQUFjLE1BTE07QUFNcEJDLGdCQUFjLE1BTk07QUFPcEJDLGtCQUFnQixDQVBJO0FBUXBCTSxjQUFZLE9BUlE7QUFTcEJDLGtCQUFnQixNQVRJO0FBVXBCQyxrQkFBZ0IsTUFWSTtBQVdwQnBFLFNBQU87QUFYYSxDO0FBdlBsQjlDLGUsQ0FxUUcrSixZLEdBQWU7QUFDcEI1RyxZQUFVNkYsb0JBQVVLO0FBREEsQztBQXJRbEJySixlLENBeVFHZ0ssaUIsR0FBb0I7QUFDekI3RyxZQUFVNkYsb0JBQVVLO0FBREssQztrQkEwZ0JkckosZSIsImZpbGUiOiJEYXRlUmFuZ2VQaWNrZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbi8vIGltcG9ydCBnZXRNdWlUaGVtZSBmcm9tICdtYXRlcmlhbC11aS9zdHlsZXMvZ2V0TXVpVGhlbWUnO1xuXG5pbXBvcnQgeyBkYXRlVGltZUZvcm1hdCwgZm9ybWF0SXNvLCBpc0VxdWFsRGF0ZVRpbWUgfSBmcm9tICcuL2RhdGVVdGlscyc7XG5pbXBvcnQgRGF0ZVJhbmdlUGlja2VyRGlhbG9nIGZyb20gJy4vRGF0ZVJhbmdlUGlja2VyRGlhbG9nJztcbmltcG9ydCBTdmdJY29uIGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL1N2Z0ljb24nO1xuXG5jbGFzcyBEYXRlUmFuZ2VQaWNrZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yIGZvciBkYXRlIGZvcm1hdHRpbmcgZm9yIHRoZSBzcGVjaWZpZWQgYGxvY2FsZWAuXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIG11c3QgZm9sbG93IHRoaXMgc3BlY2lmaWNhdGlvbjogRUNNQVNjcmlwdCBJbnRlcm5hdGlvbmFsaXphdGlvbiBBUEkgMS4wIChFQ01BLTQwMikuXG4gICAgICogYEludGwuRGF0ZVRpbWVGb3JtYXRgIGlzIHN1cHBvcnRlZCBieSBtb3N0IG1vZGVybiBicm93c2Vycywgc2VlIGh0dHA6Ly9jYW5pdXNlLmNvbS8jc2VhcmNoPWludGwsXG4gICAgICogb3RoZXJ3aXNlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmR5ZWFybnNoYXcvSW50bC5qcyBpcyBhIGdvb2QgcG9seWZpbGwuXG4gICAgICpcbiAgICAgKiBCeSBkZWZhdWx0LCBhIGJ1aWx0LWluIGBEYXRlVGltZUZvcm1hdGAgaXMgdXNlZCB3aGljaCBzdXBwb3J0cyB0aGUgJ2VuLVVTJyBgbG9jYWxlYC5cbiAgICAgKi9cbiAgICBEYXRlVGltZUZvcm1hdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgLyoqXG4gICAgICogSWYgdHJ1ZSwgYXV0b21hdGljYWxseSBhY2NlcHQgYW5kIGNsb3NlIHRoZSBwaWNrZXIgb24gc2VsZWN0IGEgZGF0ZS5cbiAgICAgKi9cbiAgICBhdXRvT2s6IFByb3BUeXBlcy5ib29sLFxuICAgIC8qKlxuICAgICAqIElmIHRydWUsIGF1dG9tYXRpY2FsbHkgb3BlbiB0aGUgbmV4dCBkYXRldGltZSBlbGVtZW50XG4gICAgICovXG4gICAgYXV0b09wZW5GaWVsZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgLyoqXG4gICAgICogVXNlZCB0byBibG9jayBkYXRldGltZSByYW5nZXMgb24gdGhlIGRhdGUgcmFuZ2UgcGlja2VyXG4gICAgICovXG4gICAgYmxvY2tlZERhdGVUaW1lUmFuZ2VzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZW5kIGRhdGV0aW1lIG9mIGEgYmxvY2tlZCByYW5nZVxuICAgICAgICAgKi9cbiAgICAgICAgZW5kOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHN0YXJ0IGRhdGV0aW1lIG9mIGEgYmxvY2tlZCByYW5nZVxuICAgICAgICAgKi9cbiAgICAgICAgc3RhcnQ6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICB9KVxuICAgICksXG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhlIGRlZmF1bHQgd2lkdGggb2YgdGhlIGNhbGVuZGFyIHdoZW4gZGlzcGxheWluZyBkYXlzLlxuICAgICAqL1xuICAgIGNhbGVuZGFyRGF0ZVdpZHRoOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoZSBkZWZhdWx0IHdpZHRoIG9mIHRoZSBjYWxlbmRhciB3aGVuIGRpc3BsYXlpbmcgdGltZXMuXG4gICAgICovXG4gICAgY2FsZW5kYXJUaW1lV2lkdGg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhlIGRlZmF1bHQgdGV4dCBvZiB0aGUgJ0NhbmNlbCcgYnV0dG9uLlxuICAgICAqL1xuICAgIGNhbmNlbExhYmVsOiBQcm9wVHlwZXMubm9kZSxcbiAgICAvKipcbiAgICAgKiBUaGUgY3NzIGNsYXNzIG5hbWUgb2YgdGhlIHJvb3QgZWxlbWVudC5cbiAgICAgKi9cbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgLyoqXG4gICAgICogVXNlZCB0byBjb250cm9sIGhvdyB0aGUgRGF0ZSBQaWNrZXIgd2lsbCBiZSBkaXNwbGF5ZWQgd2hlbiB0aGUgaW5wdXQgZmllbGQgaXMgZm9jdXNlZC5cbiAgICAgKiBgZGlhbG9nYCAoZGVmYXVsdCkgZGlzcGxheXMgdGhlIERhdGVQaWNrZXIgYXMgYSBkaWFsb2cgd2l0aCBhIG1vZGFsLlxuICAgICAqIGBpbmxpbmVgIGRpc3BsYXlzIHRoZSBEYXRlUGlja2VyIGJlbG93IHRoZSBpbnB1dCBmaWVsZCAoc2ltaWxhciB0byBhdXRvIGNvbXBsZXRlKS5cbiAgICAgKi9cbiAgICBjb250YWluZXI6IFByb3BUeXBlcy5vbmVPZihbJ2RpYWxvZycsICdpbmxpbmUnXSksXG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhlIGRlZmF1bHQgc2l6ZSBvZiBkYXkgYnV0dG9ucy5cbiAgICAgKi9cbiAgICBkYXlCdXR0b25TaXplOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIC8qKlxuICAgICAqIERpc2FibGVzIHRoZSBEYXRlUGlja2VyLlxuICAgICAqL1xuICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAvKipcbiAgICAgKiBDdXN0b20gZGlzcGxheSBmdW5jdGlvbiBmb3IgZGF0ZSB0aW1lIGZpZWxkcy5cbiAgICAgKi9cbiAgICBkaXNwbGF5OiBQcm9wVHlwZXMuZnVuYyxcbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIHRoZSBjb250YWluZXIgZm9yIGF0dHJpYnV0ZXMgYW5kIG1ldGhvZHMgc3BlY2lmaWMgdG8gdGhlICdlbmQnIGNhbGVuZGFyLlxuICAgICAqL1xuICAgIGVuZDogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIC8qKlxuICAgICAgICogVGhpcyBpcyB0aGUgaW5pdGlhbCBkYXRlIHZhbHVlIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICAgKiBJZiBlaXRoZXIgYHZhbHVlYCBvciBgdmFsdWVMaW5rYCBpcyBwcm92aWRlZCB0aGV5IHdpbGwgb3ZlcnJpZGUgdGhpc1xuICAgICAgICogcHJvcCB3aXRoIGB2YWx1ZWAgdGFraW5nIHByZWNlZGVuY2UuXG4gICAgICAgKi9cbiAgICAgIGRlZmF1bHREYXRlOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgLyoqXG4gICAgICAgKiBUaGUgZW5kaW5nIG9mIGEgcmFuZ2Ugb2YgdmFsaWQgZGF0ZXMuIFRoZSByYW5nZSBpbmNsdWRlcyB0aGUgZW5kRGF0ZS5cbiAgICAgICAqIFRoZSBkZWZhdWx0IHZhbHVlIGlzIGN1cnJlbnQgZGF0ZSArIDEwMCB5ZWFycy5cbiAgICAgICAqL1xuICAgICAgbWF4RGF0ZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgIC8qKlxuICAgICAgICogVGhlIGJlZ2lubmluZyBvZiBhIHJhbmdlIG9mIHZhbGlkIGRhdGVzLiBUaGUgcmFuZ2UgaW5jbHVkZXMgdGhlIHN0YXJ0RGF0ZS5cbiAgICAgICAqIFRoZSBkZWZhdWx0IHZhbHVlIGlzIGN1cnJlbnQgZGF0ZSAtIDEwMCB5ZWFycy5cbiAgICAgICAqL1xuICAgICAgbWluRGF0ZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgIC8qKlxuICAgICAgICogQ2FsbGJhY2sgZnVuY3Rpb24gdXNlZCB0byBkZXRlcm1pbmUgaWYgYSBkYXkncyBlbnRyeSBzaG91bGQgYmUgZGlzYWJsZWQgb24gdGhlIGNhbGVuZGFyLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBkYXkgRGF0ZSBvYmplY3Qgb2YgYSBkYXkuXG4gICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGRheSBzaG91bGQgYmUgZGlzYWJsZWQuXG4gICAgICAgKi9cbiAgICAgIHNob3VsZERpc2FibGVEYXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB9KSxcbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGUgZGVmYXVsdCB0ZXh0IG9mIHRoZSAnRW5kJyBsYWJlbC5cbiAgICAgKi9cbiAgICBlbmRMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGUgZGVmYXVsdCB0ZXh0IG9mIHRoZSAnRW5kJyBsYWJlbCBmb3IgZGF0ZXMuXG4gICAgICovXG4gICAgZW5kTGFiZWxEYXRlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoZSBkZWZhdWx0IHRleHQgb2YgdGhlICdFbmQnIGxhYmVsIGZvciB0aW1lcy5cbiAgICAgKi9cbiAgICBlbmRMYWJlbFRpbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgLyoqXG4gICAgICogVXNlZCB0byBjaGFuZ2UgdGhlIGZpcnN0IGRheSBvZiB3ZWVrLiBJdCB2YXJpZXMgZnJvbVxuICAgICAqIFNhdHVyZGF5IHRvIE1vbmRheSBiZXR3ZWVuIGRpZmZlcmVudCBsb2NhbGVzLlxuICAgICAqIFRoZSBhbGxvd2VkIHJhbmdlIGlzIDAgKFN1bmRheSkgdG8gNiAoU2F0dXJkYXkpLlxuICAgICAqIFRoZSBkZWZhdWx0IGlzIGAxYCwgTW9uZGF5LCBhcyBwZXIgSVNPIDg2MDEuXG4gICAgICovXG4gICAgZmlyc3REYXlPZldlZWs6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhlIGRlZmF1bHQgZGlzcGxheSBmb3JtYXR0aW5nLlxuICAgICAqL1xuICAgIGZvcm1hdERpc3BsYXk6IFByb3BUeXBlcy5mdW5jLFxuICAgIC8qKlxuICAgICAqIERldGVybWluZXMgaWYgdGhlIGNvbXBvbmVudCB3aWxsIHNob3cgbXVsdGlwbGUgYm94ZXMgYW5kIHRoZSBiZWhhdmlvclxuICAgICAqIHdoZW4gYSB1c2VyIGludGVyYWN0cyB3aXRoIGl0LlxuICAgICAqL1xuICAgIGxheW91dDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAvKipcbiAgICAgKiBMb2NhbGUgdXNlZCBmb3IgZm9ybWF0dGluZyB0aGUgYERhdGVQaWNrZXJgIGRhdGUgc3RyaW5ncy4gT3RoZXIgdGhhbiBmb3IgJ2VuLVVTJywgeW91XG4gICAgICogbXVzdCBwcm92aWRlIGEgYERhdGVUaW1lRm9ybWF0YCB0aGF0IHN1cHBvcnRzIHRoZSBjaG9zZW4gYGxvY2FsZWAuXG4gICAgICovXG4gICAgbG9jYWxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIC8qKlxuICAgICAqIFRlbGxzIHRoZSBjb21wb25lbnQgdG8gZGlzcGxheSB0aGUgcGlja2VyIGluIHBvcnRyYWl0IG9yIGxhbmRzY2FwZSBtb2RlLlxuICAgICAqL1xuICAgIG1vZGU6IFByb3BUeXBlcy5vbmVPZihbJ3BvcnRyYWl0JywgJ2xhbmRzY2FwZSddKSxcbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGUgZGVmYXVsdCB0ZXh0IG9mIHRoZSAnT0snIGJ1dHRvbi5cbiAgICAgKi9cbiAgICBva0xhYmVsOiBQcm9wVHlwZXMubm9kZSxcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayBmdW5jdGlvbiB0aGF0IGlzIGZpcmVkIHdoZW4gdGhlIGRhdGUgdmFsdWUgY2hhbmdlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7bnVsbH0gbnVsbCBTaW5jZSB0aGVyZSBpcyBubyBwYXJ0aWN1bGFyIGV2ZW50IGFzc29jaWF0ZWQgd2l0aCB0aGUgY2hhbmdlLFxuICAgICAqIHRoZSBmaXJzdCBhcmd1bWVudCB3aWxsIGFsd2F5cyBiZSBudWxsLlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBkYXRlIFRoZSBuZXcgZGF0ZS5cbiAgICAgKi9cbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBpcyBmaXJlZCB3aGVuIGEgdG91Y2ggdGFwIGV2ZW50IG9jY3VycyBvbiB0aGUgRGF0ZSBQaWNrZXIncyBgVGV4dEZpZWxkYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudCBUb3VjaFRhcCBldmVudCB0YXJnZXRpbmcgdGhlIGBUZXh0RmllbGRgLlxuICAgICAqL1xuICAgIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgaXMgZmlyZWQgd2hlbiB0aGUgRGF0ZSBQaWNrZXIncyBkaWFsb2cgaXMgZGlzbWlzc2VkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtudWxsfSBudWxsIFNpbmNlIHRoZXJlIGlzIG5vIHBhcnRpY3VsYXIgZXZlbnQgYXNzb2NpYXRlZCB3aXRoIHRoZSBkaXNtaXNzLFxuICAgICAqIHRoZSBmaXJzdCBhcmd1bWVudCB3aWxsIGFsd2F5cyBiZSBudWxsLlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBkYXRlIFRoZSBuZXcgZGF0ZSBvciBudWxsIGRhdGVzLlxuICAgICAqL1xuICAgIG9uRGlzbWlzczogUHJvcFR5cGVzLmZ1bmMsXG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBpcyBmaXJlZCB3aGVuIHRoZSBEYXRlIFBpY2tlcidzIGBUZXh0RmllbGRgIGdhaW5zIGZvY3VzLlxuICAgICAqL1xuICAgIG9uRm9jdXM6IFByb3BUeXBlcy5mdW5jLFxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgaXMgZmlyZWQgd2hlbiB0aGUgRGF0ZSBQaWNrZXIncyBkaWFsb2cgaXMgc2hvd24uXG4gICAgICovXG4gICAgb25TaG93OiBQcm9wVHlwZXMuZnVuYyxcbiAgICAvKipcbiAgICAgKiBTaG93cyB0aGUgY2FsZW5kYXIgZGF0ZS90aW1lIGRpc3BsYXkuIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgICAqL1xuICAgIHNob3dDYWxlbmRhckRhdGU6IFByb3BUeXBlcy5ib29sLFxuICAgIC8qKlxuICAgICAqIFNob3dzIHRoZSBjdXJyZW50IHN0ZXAgaW4gdGhlIGRhdGUvdGltZSBzZWxlY3Rpb24uIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgICAqL1xuICAgIHNob3dDYWxlbmRhclN0YXR1czogUHJvcFR5cGVzLmJvb2wsXG4gICAgLyoqXG4gICAgICogVGhpcyBpcyB0aGUgY29udGFpbmVyIGZvciBhdHRyaWJ1dGVzIGFuZCBtZXRob2RzIHNwZWNpZmljIHRvIHRoZSAnc3RhcnQnIGNhbGVuZGFyLlxuICAgICAqL1xuICAgIHN0YXJ0OiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgLyoqXG4gICAgICAgKiBUaGlzIGlzIHRoZSBpbml0aWFsIGRhdGUgdmFsdWUgb2YgdGhlIGNvbXBvbmVudC5cbiAgICAgICAqIElmIGVpdGhlciBgdmFsdWVgIG9yIGB2YWx1ZUxpbmtgIGlzIHByb3ZpZGVkIHRoZXkgd2lsbCBvdmVycmlkZSB0aGlzXG4gICAgICAgKiBwcm9wIHdpdGggYHZhbHVlYCB0YWtpbmcgcHJlY2VkZW5jZS5cbiAgICAgICAqL1xuICAgICAgZGVmYXVsdERhdGU6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAvKipcbiAgICAgICAqIFRoZSBlbmRpbmcgb2YgYSByYW5nZSBvZiB2YWxpZCBkYXRlcy4gVGhlIHJhbmdlIGluY2x1ZGVzIHRoZSBlbmREYXRlLlxuICAgICAgICogVGhlIGRlZmF1bHQgdmFsdWUgaXMgY3VycmVudCBkYXRlICsgMTAwIHllYXJzLlxuICAgICAgICovXG4gICAgICBtYXhEYXRlOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgLyoqXG4gICAgICAgKiBUaGUgYmVnaW5uaW5nIG9mIGEgcmFuZ2Ugb2YgdmFsaWQgZGF0ZXMuIFRoZSByYW5nZSBpbmNsdWRlcyB0aGUgc3RhcnREYXRlLlxuICAgICAgICogVGhlIGRlZmF1bHQgdmFsdWUgaXMgY3VycmVudCBkYXRlIC0gMTAwIHllYXJzLlxuICAgICAgICovXG4gICAgICBtaW5EYXRlOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgLyoqXG4gICAgICAgKiBDYWxsYmFjayBmdW5jdGlvbiB1c2VkIHRvIGRldGVybWluZSBpZiBhIGRheSdzIGVudHJ5IHNob3VsZCBiZSBkaXNhYmxlZCBvbiB0aGUgY2FsZW5kYXIuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IGRheSBEYXRlIG9iamVjdCBvZiBhIGRheS5cbiAgICAgICAqIEByZXR1cm5zIHtib29sZWFufSBJbmRpY2F0ZXMgd2hldGhlciB0aGUgZGF5IHNob3VsZCBiZSBkaXNhYmxlZC5cbiAgICAgICAqL1xuICAgICAgc2hvdWxkRGlzYWJsZURhdGU6IFByb3BUeXBlcy5mdW5jLFxuICAgIH0pLFxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoZSBkZWZhdWx0IHRleHQgb2YgdGhlICdTdGFydCcgbGFiZWwuXG4gICAgICovXG4gICAgc3RhcnRMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGUgZGVmYXVsdCB0ZXh0IG9mIHRoZSAnU3RhcnQnIGxhYmVsIGZvciBkYXRlcy5cbiAgICAgKi9cbiAgICBzdGFydExhYmVsRGF0ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGUgZGVmYXVsdCB0ZXh0IG9mIHRoZSAnU3RhcnQnIGxhYmVsIGZvciB0aW1lcy5cbiAgICAgKi9cbiAgICBzdGFydExhYmVsVGltZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGUgaW5saW5lLXN0eWxlcyBvZiB0aGUgcm9vdCBlbGVtZW50LlxuICAgICAqL1xuICAgIHN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoZSBpbmxpbmUtc3R5bGVzIG9mIERhdGVQaWNrZXIncyBUZXh0RmllbGQgZWxlbWVudC5cbiAgICAgKi9cbiAgICB0ZXh0RmllbGRTdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAvKipcbiAgICAgKiBUaGlzIG9iamVjdCBzaG91bGQgY29udGFpbiBtZXRob2RzIG5lZWRlZCB0byBidWlsZCB0aGUgY2FsZW5kYXIgc3lzdGVtLlxuICAgICAqXG4gICAgICogVXNlZnVsIGZvciBidWlsZGluZyBhIGN1c3RvbSBjYWxlbmRhciBzeXN0ZW0uIFJlZmVyIHRvIHRoZVxuICAgICAqIFtzb3VyY2UgY29kZV0oaHR0cHM6Ly9naXRodWIuY29tL2NhbGxlbWFsbC9tYXRlcmlhbC11aS9ibG9iL21hc3Rlci9zcmMvRGF0ZVBpY2tlci9kYXRlVXRpbHMuanMpXG4gICAgICogYW5kIGFuIFtleGFtcGxlIGltcGxlbWVudGF0aW9uXShodHRwczovL2dpdGh1Yi5jb20vYWxpdGFoZXJpL21hdGVyaWFsLXVpLXBlcnNpYW4tZGF0ZS1waWNrZXItdXRpbHMpXG4gICAgICogZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gICAgICovXG4gICAgdXRpbHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgZGF0ZSBmb3IgdGhlIERhdGUgUGlja2VyIHByb2dyYW1tYXRpY2FsbHkuXG4gICAgICovXG4gICAgdmFsdWU6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAvKipcbiAgICAgICAqIFRoZSBlbmQgZGF0ZVxuICAgICAgICovXG4gICAgICBlbmQ6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAvKipcbiAgICAgICAqIFRoZSBzdGFydCBkYXRlXG4gICAgICAgKi9cbiAgICAgIHN0YXJ0OiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIH0pLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgYXV0b09rOiBmYWxzZSxcbiAgICBjb250YWluZXI6ICdkaWFsb2cnLFxuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICBlbmRMYWJlbDogJ0VuZCcsXG4gICAgZW5kTGFiZWxEYXRlOiAnRGF0ZScsXG4gICAgZW5kTGFiZWxUaW1lOiAnVGltZScsXG4gICAgZmlyc3REYXlPZldlZWs6IDEsXG4gICAgc3RhcnRMYWJlbDogJ1N0YXJ0JyxcbiAgICBzdGFydExhYmVsRGF0ZTogJ0RhdGUnLFxuICAgIHN0YXJ0TGFiZWxUaW1lOiAnVGltZScsXG4gICAgc3R5bGU6IHt9LFxuICB9O1xuXG4gIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgbXVpVGhlbWU6IFByb3BUeXBlcy5vYmplY3QsXG4gIH07XG5cbiAgc3RhdGljIGNoaWxkQ29udGV4dFR5cGVzID0ge1xuICAgIG11aVRoZW1lOiBQcm9wVHlwZXMub2JqZWN0LFxuICB9O1xuXG4gIHN0YXRlID0ge1xuICAgIGRpYWxvZ1Zpc2libGU6IGZhbHNlLFxuICAgIHN0YXJ0RGF0ZTogdW5kZWZpbmVkLFxuICAgIGVuZERhdGU6IHVuZGVmaW5lZCxcbiAgICBzZWxlY3RlZFN0YXJ0RGF0ZTogdW5kZWZpbmVkLFxuICAgIHNlbGVjdGVkRW5kRGF0ZTogdW5kZWZpbmVkLFxuICB9O1xuXG4gIGdldENoaWxkQ29udGV4dCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbXVpVGhlbWU6IHRoaXMuZ2V0VGhlbWUoKSxcbiAgICB9O1xuICB9XG5cbiAgZ2V0VGhlbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGV4dC5tdWlUaGVtZTtcbiAgfVxuXG4gIFVOU0FGRV9jb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgY29uc3QgbmV3RGF0ZXMgPSB0aGlzLmdldENvbnRyb2xsZWREYXRlKCk7XG4gICAgaWYgKHRoaXMuaXNDb250cm9sbGVkKCkgJiYgbmV3RGF0ZXMpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBzdGFydERhdGU6IG5ld0RhdGVzLnN0YXJ0LFxuICAgICAgICBlbmREYXRlOiBuZXdEYXRlcy5lbmQsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHN0YXJ0RGF0ZTogdW5kZWZpbmVkLFxuICAgICAgICBlbmREYXRlOiB1bmRlZmluZWQsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBVTlNBRkVfY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBpZiAodGhpcy5pc0NvbnRyb2xsZWQoKSkge1xuICAgICAgY29uc3QgbmV3RGF0ZXMgPSB0aGlzLmdldENvbnRyb2xsZWREYXRlKG5leHRQcm9wcyk7XG4gICAgICBpZiAobmV3RGF0ZXMpIHtcbiAgICAgICAgaWYgKG5ld0RhdGVzLnN0YXJ0ICYmIG5ld0RhdGVzLmVuZCAmJiAhaXNFcXVhbERhdGVUaW1lKHRoaXMuc3RhdGUuc3RhcnREYXRlLCBuZXdEYXRlcy5zdGFydCkgfHxcbiAgICAgICAgICAhaXNFcXVhbERhdGVUaW1lKHRoaXMuc3RhdGUuZW5kRGF0ZSwgbmV3RGF0ZXMuZW5kKSB8fFxuICAgICAgICAgICFpc0VxdWFsRGF0ZVRpbWUodGhpcy5zdGF0ZS5zZWxlY3RlZFN0YXJ0RGF0ZSwgbmV3RGF0ZXMuc3RhcnQpIHx8XG4gICAgICAgICAgIWlzRXF1YWxEYXRlVGltZSh0aGlzLnN0YXRlLnNlbGVjdGVkRW5kRGF0ZSwgbmV3RGF0ZXMuZW5kKSkge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc3RhcnREYXRlOiBuZXdEYXRlcy5zdGFydCxcbiAgICAgICAgICAgIGVuZERhdGU6IG5ld0RhdGVzLmVuZCxcbiAgICAgICAgICAgIHNlbGVjdGVkU3RhcnREYXRlOiBuZXdEYXRlcy5zdGFydCxcbiAgICAgICAgICAgIHNlbGVjdGVkRW5kRGF0ZTogbmV3RGF0ZXMuZW5kLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMudmFsdWUgJiYgdGhpcy5wcm9wcy52YWx1ZS5zdGFydCAmJiB0aGlzLnByb3BzLnZhbHVlLmVuZCAmJlxuICAgICAgICBuZXh0UHJvcHMudmFsdWUgJiYgIW5leHRQcm9wcy52YWx1ZS5zdGFydCAmJiAhbmV4dFByb3BzLnZhbHVlLmVuZCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBkaWFsb2dTdGFydERhdGU6IG5ldyBEYXRlKCksXG4gICAgICAgICAgZGlhbG9nRW5kRGF0ZTogbmV3IERhdGUoKSxcbiAgICAgICAgICBkaWFsb2dWaXNpYmxlOiBmYWxzZSxcbiAgICAgICAgICBzdGFydERhdGU6IHVuZGVmaW5lZCxcbiAgICAgICAgICBlbmREYXRlOiB1bmRlZmluZWQsXG4gICAgICAgICAgc2VsZWN0ZWRTdGFydERhdGU6IHVuZGVmaW5lZCxcbiAgICAgICAgICBzZWxlY3RlZEVuZERhdGU6IHVuZGVmaW5lZCxcbiAgICAgICAgfSwgdGhpcy5yZWZzLmRpYWxvZ1dpbmRvdy5yZXNldC5iaW5kKHRoaXMpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXREYXRlcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhcnREYXRlOiB0aGlzLnN0YXRlLnN0YXJ0RGF0ZSxcbiAgICAgIGVuZERhdGU6IHRoaXMuc3RhdGUuZW5kRGF0ZSxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIE9wZW4gdGhlIGRhdGUtcGlja2VyIGRpYWxvZyBwcm9ncmFtbWF0aWNhbGx5IGZyb20gYSBwYXJlbnQuXG4gICAqL1xuICBvcGVuRGlhbG9nKHNob3dSZWYsIHN0YXJ0RW5kLCBkYXRlVGltZSkge1xuICAgIC8qKlxuICAgICAqIGlmIHRoZSBkYXRlIGlzIG5vdCBzZWxlY3RlZCB0aGVuIHNldCBpdCB0byBuZXcgZGF0ZVxuICAgICAqIChnZXQgdGhlIGN1cnJlbnQgc3lzdGVtIGRhdGUgd2hpbGUgZG9pbmcgc28pXG4gICAgICogZWxzZSBzZXQgaXQgdG8gdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBkYXRlXG4gICAgICovXG4gICAgY29uc3QgYWxsUmVmcyA9IHtcbiAgICAgIHN0YXJ0RGF0ZTogdGhpcy5yZWZzLnN0YXJ0ZGF0ZWZpZWxkLFxuICAgICAgc3RhcnRUaW1lOiB0aGlzLnJlZnMuc3RhcnR0aW1lZmllbGQsXG4gICAgICBlbmREYXRlOiB0aGlzLnJlZnMuZW5kZGF0ZWZpZWxkLFxuICAgICAgZW5kVGltZTogdGhpcy5yZWZzLmVuZHRpbWVmaWVsZCxcbiAgICB9O1xuICAgIGlmICghdGhpcy5zdGF0ZS5kaWFsb2dWaXNpYmxlKSB7XG4gICAgICBpZiAodGhpcy5zdGF0ZS5zdGFydERhdGUgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnN0YXRlLmVuZERhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBkaWFsb2dTdGFydERhdGU6IHRoaXMuZ2V0RGF0ZXMoKS5zdGFydERhdGUsXG4gICAgICAgICAgZGlhbG9nRW5kRGF0ZTogdGhpcy5nZXREYXRlcygpLmVuZERhdGUsXG4gICAgICAgICAgc2VsZWN0ZWRTdGFydERhdGU6IHVuZGVmaW5lZCxcbiAgICAgICAgICBzZWxlY3RlZEVuZERhdGU6IHVuZGVmaW5lZCxcbiAgICAgICAgfSwgdGhpcy5yZWZzLmRpYWxvZ1dpbmRvdy5zaG93LmJpbmQodGhpcywgc2hvd1JlZiwgc3RhcnRFbmQsIGRhdGVUaW1lLCBhbGxSZWZzKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBkaWFsb2dTdGFydERhdGU6IG5ldyBEYXRlKCksXG4gICAgICAgICAgZGlhbG9nRW5kRGF0ZTogbmV3IERhdGUoKSxcbiAgICAgICAgICBzZWxlY3RlZFN0YXJ0RGF0ZTogdW5kZWZpbmVkLFxuICAgICAgICAgIHNlbGVjdGVkRW5kRGF0ZTogdW5kZWZpbmVkLFxuICAgICAgICB9LCB0aGlzLnJlZnMuZGlhbG9nV2luZG93LnNob3cuYmluZCh0aGlzLCBzaG93UmVmLCBzdGFydEVuZCwgZGF0ZVRpbWUsIGFsbFJlZnMpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWxpYXMgZm9yIGBvcGVuRGlhbG9nKClgIGZvciBhbiBhcGkgY29uc2lzdGVudCB3aXRoIFRleHRGaWVsZC5cbiAgICovXG4gIC8vIGZvY3VzKCkge1xuICAvLyAgIHRoaXMub3BlbkRpYWxvZygpO1xuICAvLyB9XG5cbiAgaGFuZGxlQWNjZXB0ID0gKGRhdGVzLCBrZWVwT3BlbikgPT4ge1xuICAgIGlmICghdGhpcy5pc0NvbnRyb2xsZWQoKSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHN0YXJ0RGF0ZTogZGF0ZXMuc3RhcnQsXG4gICAgICAgIGVuZERhdGU6IGRhdGVzLmVuZCxcbiAgICAgICAgZGlhbG9nVmlzaWJsZTogKGtlZXBPcGVuIHx8IGZhbHNlKSxcbiAgICAgICAgc2VsZWN0ZWRTdGFydERhdGU6IGRhdGVzLnN0YXJ0LFxuICAgICAgICBzZWxlY3RlZEVuZERhdGU6IGRhdGVzLmVuZCxcbiAgICAgIH0pO1xuICAgICAgaWYgKHRoaXMucHJvcHMub25DaGFuZ2UpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShudWxsLCBkYXRlcyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBkaWFsb2dWaXNpYmxlOiAoa2VlcE9wZW4gfHwgZmFsc2UpLFxuICAgICAgfSk7XG4gICAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKG51bGwsIGRhdGVzKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlVXBkYXRlID0gKGRhdGVzKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZWxlY3RlZFN0YXJ0RGF0ZTogZGF0ZXMuc3RhcnQsXG4gICAgICBzZWxlY3RlZEVuZERhdGU6IGRhdGVzLmVuZCxcbiAgICB9KTtcbiAgfTtcblxuICBoYW5kbGVTaG93ID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZGlhbG9nVmlzaWJsZTogdHJ1ZSxcbiAgICB9KTtcbiAgICBpZiAodGhpcy5wcm9wcy5vblNob3cpXG4gICAgICB0aGlzLnByb3BzLm9uU2hvdygpO1xuICB9O1xuXG4gIGhhbmRsZURpc21pc3MgPSAoZGF0ZXMpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlbGVjdGVkU3RhcnREYXRlOiB1bmRlZmluZWQsXG4gICAgICBzZWxlY3RlZEVuZERhdGU6IHVuZGVmaW5lZCxcbiAgICAgIGRpYWxvZ1Zpc2libGU6IGZhbHNlLFxuICAgIH0pO1xuICAgIGlmICh0aGlzLnByb3BzLm9uRGlzbWlzcylcbiAgICAgIHRoaXMucHJvcHMub25EaXNtaXNzKG51bGwsIGRhdGVzKTtcbiAgfTtcblxuICBoYW5kbGVGb2N1cyA9IChldmVudCkgPT4ge1xuICAgIGV2ZW50LnRhcmdldC5ibHVyKCk7XG4gICAgaWYgKHRoaXMucHJvcHMub25Gb2N1cykge1xuICAgICAgdGhpcy5wcm9wcy5vbkZvY3VzKGV2ZW50KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlVG91Y2hUYXAgPSAoc2hvd1JlZiwgc3RhcnRFbmQsIGRhdGVUaW1lLCBkaXNhYmxlZCwgZXZlbnQpID0+IHtcbiAgICBpZiAoIWRpc2FibGVkKSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5vbkNsaWNrKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25DbGljayhldmVudCk7XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5wcm9wcy5kaXNhYmxlZCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLm9wZW5EaWFsb2coc2hvd1JlZiwgc3RhcnRFbmQsIGRhdGVUaW1lKTtcbiAgICAgICAgfSwgMCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGlzQ29udHJvbGxlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKTtcbiAgfVxuXG4gIGdldENvbnRyb2xsZWREYXRlKHByb3BzID0gdGhpcy5wcm9wcykge1xuICAgIGlmIChwcm9wcy52YWx1ZSAmJiAocHJvcHMudmFsdWUuc3RhcnQgaW5zdGFuY2VvZiBEYXRlIHx8IHByb3BzLnZhbHVlLmVuZCBpbnN0YW5jZW9mIERhdGUpKSB7XG4gICAgICByZXR1cm4gcHJvcHMudmFsdWU7XG4gICAgfVxuICB9XG5cbiAgZm9ybWF0RGF0ZUZvckRpc3BsYXkoZGF0ZSwgbGFiZWwpIHtcbiAgICBpZiAoZGF0ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLmxvY2FsZSkge1xuICAgICAgICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy5wcm9wcy5sb2NhbGUsIHtcbiAgICAgICAgICBkYXk6ICcyLWRpZ2l0JyxcbiAgICAgICAgICBtb250aDogJzItZGlnaXQnLFxuICAgICAgICAgIHllYXI6ICcyLWRpZ2l0JyxcbiAgICAgICAgfSkuZm9ybWF0KGRhdGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KCdlbi1VUycsIHtcbiAgICAgICAgICBkYXk6ICcyLWRpZ2l0JyxcbiAgICAgICAgICBtb250aDogJzItZGlnaXQnLFxuICAgICAgICAgIHllYXI6ICcyLWRpZ2l0JyxcbiAgICAgICAgfSkuZm9ybWF0KGRhdGUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbGFiZWw7XG4gICAgfVxuICB9XG5cbiAgZm9ybWF0VGltZUZvckRpc3BsYXkoZGF0ZSwgbGFiZWwpIHtcbiAgICBpZiAoZGF0ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLmxvY2FsZSkge1xuICAgICAgICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy5wcm9wcy5sb2NhbGUsIHtcbiAgICAgICAgICBob3VyOiAnMi1kaWdpdCcsXG4gICAgICAgICAgbWludXRlOiAnMi1kaWdpdCcsXG4gICAgICAgICAgaG91cjEyOiB0cnVlLFxuICAgICAgICB9KS5mb3JtYXQoZGF0ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQoJ2VuLVVTJywge1xuICAgICAgICAgIGhvdXI6ICcyLWRpZ2l0JyxcbiAgICAgICAgICBtaW51dGU6ICcyLWRpZ2l0JyxcbiAgICAgICAgICBob3VyMTI6IHRydWUsXG4gICAgICAgIH0pLmZvcm1hdChkYXRlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGxhYmVsO1xuICAgIH1cbiAgfVxuXG4gIGZvcm1hdERhdGUgPSAoZGF0ZSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmxvY2FsZSkge1xuICAgICAgY29uc3QgRGF0ZVRpbWVGb3JtYXQgPSB0aGlzLnByb3BzLkRhdGVUaW1lRm9ybWF0IHx8IGRhdGVUaW1lRm9ybWF0O1xuICAgICAgcmV0dXJuIG5ldyBEYXRlVGltZUZvcm1hdCh0aGlzLnByb3BzLmxvY2FsZSwge1xuICAgICAgICBkYXk6ICdudW1lcmljJyxcbiAgICAgICAgbW9udGg6ICdudW1lcmljJyxcbiAgICAgICAgeWVhcjogJ251bWVyaWMnLFxuICAgICAgfSkuZm9ybWF0KGRhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZm9ybWF0SXNvKGRhdGUpO1xuICAgIH1cbiAgfTtcblxuICBkcm9wZG93bkFycm93ID0gKGRpc2FibGVkKSA9PiB7XG4gICAgY29uc3QgeyBsYXlvdXQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc3R5bGUgPSB7XG4gICAgICBmaWxsOiAoZGlzYWJsZWQgPyAnI2EyYTJhMicgOiAnIzc1NzU3NScpLFxuICAgICAgd2lkdGg6ICcxMHB4JywgaGVpZ2h0OiAnNnB4JyxcbiAgICAgIG1hcmdpblJpZ2h0OiAnMTBweCcsXG4gICAgfTtcbiAgICByZXR1cm4gKGxheW91dCAhPT0gJ3NpbmdsZScgJiZcbiAgICAgIDxTdmdJY29uIHZpZXdCb3g9XCIzMDY0IC0yMzQ0MiAxMCA2XCIgc3R5bGU9e3N0eWxlfT5cbiAgICAgICAgPHBhdGhcbiAgICAgICAgICBkPVwiTTIzLjA3LDEwYS43MDcuNzA3LDAsMCwxLS40NzktLjE5LjY4NC42ODQsMCwwLDEsMC0uOTQ5TDI2LjQ4NSw1LDIyLjU5MSwxLjEzOWEuNjg0LjY4NCwwLDAsMSwwLS45NDkuNy43LDAsMCwxLC45NTcsMEwyOC40LDUsMjMuNTQ5LDkuODFBLjY1Mi42NTIsMCwwLDEsMjMuMDcsMTBaXCIgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbWF4LWxlblxuICAgICAgICAgIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgzMDc0IC0yMzQ2NC40KSByb3RhdGUoOTApXCJcbiAgICAgICAgLz5cbiAgICAgIDwvU3ZnSWNvbj5cbiAgICApO1xuICB9O1xuXG4gIGRpdmlkZXIoKSB7XG4gICAgY29uc3QgeyBsYXlvdXQgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChsYXlvdXQgPT09ICdzaW5nbGUnICYmXG4gICAgICA8c3BhbiBzdHlsZT17eyBtYXJnaW46ICdhdXRvIDEwcHgnLCBjb2xvcjogJyM3NTc1NzUnIH19Pi08L3NwYW4+XG4gICAgKTtcbiAgfVxuXG4gIHRpbWVTdHlsZShkaXNhYmxlZCkge1xuICAgIGNvbnN0IHsgbGF5b3V0IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiB7XG4gICAgICBoZWlnaHQ6ICczOHB4JyxcbiAgICAgIGxpbmVIZWlnaHQ6ICczOHB4JyxcbiAgICAgIHBhZGRpbmdMZWZ0OiAobGF5b3V0ICE9PSAnc2luZ2xlJyA/ICcxMHB4JyA6ICc1cHgnKSxcbiAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsXG4gICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgIGN1cnNvcjogKGRpc2FibGVkID8gJ25vdC1hbGxvd2VkJyA6ICdwb2ludGVyJyksXG4gICAgICBjb2xvcjogJyM3NTc1NzUnLFxuICAgICAgLi4uKGxheW91dCAhPT0gJ3NpbmdsZScgP1xuICAgICAgICB7XG4gICAgICAgICAgd2lkdGg6ICc5OXB4JyxcbiAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgI2U1ZTVlNScsXG4gICAgICAgIH0gOiB7fSksXG4gICAgfTtcbiAgfVxuXG4gIGRhdGVTdHlsZShkaXNhYmxlZCkge1xuICAgIGNvbnN0IHsgbGF5b3V0IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiB7XG4gICAgICBoZWlnaHQ6ICczOHB4JyxcbiAgICAgIGxpbmVIZWlnaHQ6ICczOHB4JyxcbiAgICAgIHBhZGRpbmdMZWZ0OiAobGF5b3V0ID09PSAnc2luZ2xlJyA/ICcwcHgnIDogJzEwcHgnKSxcbiAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsXG4gICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgIGN1cnNvcjogKGRpc2FibGVkID8gJ25vdC1hbGxvd2VkJyA6ICdwb2ludGVyJyksXG4gICAgICBjb2xvcjogJyM3NTc1NzUnLFxuICAgICAgLi4uKGxheW91dCAhPT0gJ3NpbmdsZScgP1xuICAgICAgICB7XG4gICAgICAgICAgd2lkdGg6ICcxMTdweCcsXG4gICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNlNWU1ZTUnLFxuICAgICAgICB9IDoge30pLFxuICAgIH07XG4gIH1cblxuICBnZXRTdHlsZXMoKSB7XG4gICAgY29uc3QgeyBsYXlvdXQgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRleHRGaWVsZDoge1xuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIGp1c3RpZnlDb250ZW50OiAobGF5b3V0ICE9PSAnc2luZ2xlJyA/ICdzcGFjZS1iZXR3ZWVuJyA6ICdmbGV4LXN0YXJ0JyksXG4gICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICBmbGV4V3JhcDogKGxheW91dCA9PT0gJ3NpbmdsZScgPyAnbm93cmFwJyA6ICd3cmFwJyksXG4gICAgICB9LFxuICAgICAgZW5kQ29udGFpbmVyOiB7XG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcbiAgICAgICAgLi4uKGxheW91dCAhPT0gJ3NpbmdsZScgP1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgfSA6IHt9KSxcbiAgICAgIH0sXG4gICAgICBzdGFydENvbnRhaW5lcjoge1xuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsXG4gICAgICAgIC4uLihsYXlvdXQgIT09ICdzaW5nbGUnID9cbiAgICAgICAgICB7XG4gICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnMTZweCcsXG4gICAgICAgICAgfSA6IHt9KSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBEYXRlVGltZUZvcm1hdCxcbiAgICAgIGF1dG9PayxcbiAgICAgIGF1dG9PcGVuRmllbGQsXG4gICAgICBibG9ja2VkRGF0ZVRpbWVSYW5nZXMsXG4gICAgICBjYWxlbmRhckRhdGVXaWR0aCxcbiAgICAgIGNhbGVuZGFyVGltZVdpZHRoLFxuICAgICAgY2FuY2VsTGFiZWwsXG4gICAgICBjbGFzc05hbWUsXG4gICAgICBjb250YWluZXIsXG4gICAgICBkYXlCdXR0b25TaXplLFxuICAgICAgZGlzcGxheSxcbiAgICAgIGVuZCxcbiAgICAgIGVuZExhYmVsLFxuICAgICAgZW5kTGFiZWxEYXRlLFxuICAgICAgZW5kTGFiZWxUaW1lLFxuICAgICAgZmlyc3REYXlPZldlZWssXG4gICAgICBmb3JtYXREaXNwbGF5LCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICBsYXlvdXQsXG4gICAgICBsb2NhbGUsXG4gICAgICBtb2RlLFxuICAgICAgb2tMYWJlbCxcbiAgICAgIG9uRGlzbWlzcywgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgb25Gb2N1cywgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgb25TaG93LCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICBvbkNsaWNrLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICBzaG93Q2FsZW5kYXJEYXRlLFxuICAgICAgc2hvd0NhbGVuZGFyU3RhdHVzLFxuICAgICAgc3RhcnQsXG4gICAgICBzdGFydExhYmVsLFxuICAgICAgc3RhcnRMYWJlbERhdGUsXG4gICAgICBzdGFydExhYmVsVGltZSxcbiAgICAgIHN0eWxlLFxuICAgICAgdGV4dEZpZWxkU3R5bGUsXG4gICAgICB1dGlscyxcbiAgICAgIC4uLm90aGVyIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuXG4gICAgY29uc3QgeyBwcmVwYXJlU3R5bGVzIH0gPSB0aGlzLmdldFRoZW1lKCk7XG4gICAgY29uc3Qgc3R5bGVzID0gdGhpcy5nZXRTdHlsZXMoKTtcblxuICAgIGNvbnN0IHsgc2VsZWN0ZWRTdGFydERhdGUsIHNlbGVjdGVkRW5kRGF0ZSwgc3RhcnREYXRlLCBlbmREYXRlIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgY29uc3Qgc3RhcnRpbmcgPSAoc2VsZWN0ZWRTdGFydERhdGUgPyBzZWxlY3RlZFN0YXJ0RGF0ZSA6IHN0YXJ0RGF0ZSk7XG4gICAgY29uc3QgZW5kaW5nID0gKHNlbGVjdGVkRW5kRGF0ZSA/IHNlbGVjdGVkRW5kRGF0ZSA6IGVuZERhdGUpO1xuICAgIGNvbnN0IGZvcm1hdHRlZFN0YXJ0RGF0ZSA9IHRoaXMuZm9ybWF0RGF0ZUZvckRpc3BsYXkoc3RhcnRpbmcsIHN0YXJ0TGFiZWxEYXRlKTtcbiAgICBjb25zdCBmb3JtYXR0ZWRTdGFydFRpbWUgPSB0aGlzLmZvcm1hdFRpbWVGb3JEaXNwbGF5KHN0YXJ0aW5nLCBzdGFydExhYmVsVGltZSk7XG4gICAgY29uc3QgZm9ybWF0dGVkRW5kRGF0ZSA9IHRoaXMuZm9ybWF0RGF0ZUZvckRpc3BsYXkoZW5kaW5nLCBlbmRMYWJlbERhdGUpO1xuICAgIGNvbnN0IGZvcm1hdHRlZEVuZFRpbWUgPSB0aGlzLmZvcm1hdFRpbWVGb3JEaXNwbGF5KGVuZGluZywgZW5kTGFiZWxUaW1lKTtcblxuICAgIGNvbnN0IHN0YXJ0SW5mbyA9IHtcbiAgICAgIGRhdGVSZWY6ICdzdGFydGRhdGVmaWVsZCcsXG4gICAgICBvbkNsaWNrRGF0ZTogdGhpcy5oYW5kbGVUb3VjaFRhcC5iaW5kKHRoaXMsXG4gICAgICAgIHRoaXMucmVmcy5zdGFydGRhdGVmaWVsZCxcbiAgICAgICAgJ3N0YXJ0JyxcbiAgICAgICAgJ2RhdGUnLFxuICAgICAgICBmYWxzZSksXG4gICAgICBmb3JtYXR0ZWREYXRlOiBmb3JtYXR0ZWRTdGFydERhdGUsXG4gICAgICB0aW1lUmVmOiAnc3RhcnR0aW1lZmllbGQnLFxuICAgICAgb25DbGlja1RpbWU6IHRoaXMuaGFuZGxlVG91Y2hUYXAuYmluZCh0aGlzLFxuICAgICAgICB0aGlzLnJlZnMuc3RhcnR0aW1lZmllbGQsXG4gICAgICAgICdzdGFydCcsXG4gICAgICAgICd0aW1lJyxcbiAgICAgICAgKGZvcm1hdHRlZFN0YXJ0RGF0ZSA9PT0gc3RhcnRMYWJlbERhdGUpKSxcbiAgICAgIGZvcm1hdHRlZFRpbWU6IGZvcm1hdHRlZFN0YXJ0VGltZSxcbiAgICB9O1xuXG4gICAgY29uc3QgZW5kSW5mbyA9IHtcbiAgICAgIGRhdGVSZWY6ICdlbmRkYXRlZmllbGQnLFxuICAgICAgb25DbGlja0RhdGU6IHRoaXMuaGFuZGxlVG91Y2hUYXAuYmluZCh0aGlzLFxuICAgICAgICB0aGlzLnJlZnMuZW5kZGF0ZWZpZWxkLFxuICAgICAgICAnZW5kJyxcbiAgICAgICAgJ2RhdGUnLFxuICAgICAgICAoZm9ybWF0dGVkU3RhcnREYXRlID09PSBzdGFydExhYmVsRGF0ZSkpLFxuICAgICAgZm9ybWF0dGVkRGF0ZTogZm9ybWF0dGVkRW5kRGF0ZSxcbiAgICAgIHRpbWVSZWY6ICdlbmR0aW1lZmllbGQnLFxuICAgICAgb25DbGlja1RpbWU6IHRoaXMuaGFuZGxlVG91Y2hUYXAuYmluZCh0aGlzLFxuICAgICAgICB0aGlzLnJlZnMuZW5kdGltZWZpZWxkLFxuICAgICAgICAnZW5kJyxcbiAgICAgICAgJ3RpbWUnLFxuICAgICAgICAoZm9ybWF0dGVkRW5kRGF0ZSA9PT0gZW5kTGFiZWxEYXRlKSksXG4gICAgICBmb3JtYXR0ZWRUaW1lOiBmb3JtYXR0ZWRFbmRUaW1lLFxuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZX0gc3R5bGU9e3ByZXBhcmVTdHlsZXMoT2JqZWN0LmFzc2lnbih7fSwgc3R5bGUpKX0+XG4gICAgICAgIHtkaXNwbGF5ID9cblxuICAgICAgICAgIGRpc3BsYXkoc3RhcnRJbmZvLCBlbmRJbmZvLCB0aGlzLmhhbmRsZUZvY3VzKSA6XG5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXtPYmplY3QuYXNzaWduKHt9LCBzdHlsZXMudGV4dEZpZWxkLCB0ZXh0RmllbGRTdHlsZSl9PlxuICAgICAgICAgICAge2xheW91dCAhPT0gJ3NpbmdsZScgJiZcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBmb250V2VpZ2h0OiAnc2VtaWJvbGQnLCBtYXJnaW5Cb3R0b206ICc1cHgnLCBmb250U2l6ZTogJzE1cHgnIH19PlBpY2sgVXA8L2Rpdj5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5zdGFydENvbnRhaW5lcn0+XG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBzdHlsZT17dGhpcy5kYXRlU3R5bGUoKX1cbiAgICAgICAgICAgICAgICByZWY9XCJzdGFydGRhdGVmaWVsZFwiXG4gICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5oYW5kbGVGb2N1c31cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZVRvdWNoVGFwLmJpbmQodGhpcywgdGhpcy5yZWZzLnN0YXJ0ZGF0ZWZpZWxkLCAnc3RhcnQnLCAnZGF0ZScsIGZhbHNlKX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxzcGFuPntmb3JtYXR0ZWRTdGFydERhdGV9PC9zcGFuPlxuICAgICAgICAgICAgICAgIHtsYXlvdXQgPT09ICdzaW5nbGUnICYmIGZvcm1hdHRlZFN0YXJ0RGF0ZSAhPT0gc3RhcnRMYWJlbERhdGUgJiZcbiAgICAgICAgICAgICAgICAgIDxzcGFuPiw8L3NwYW4+XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHt0aGlzLmRyb3Bkb3duQXJyb3coKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBzdHlsZT17dGhpcy50aW1lU3R5bGUoZm9ybWF0dGVkU3RhcnREYXRlID09PSBzdGFydExhYmVsRGF0ZSl9XG4gICAgICAgICAgICAgICAgcmVmPVwic3RhcnR0aW1lZmllbGRcIlxuICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMuaGFuZGxlRm9jdXN9XG4gICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVUb3VjaFRhcC5iaW5kKHRoaXMsXG4gICAgICAgICAgICAgICAgICB0aGlzLnJlZnMuc3RhcnR0aW1lZmllbGQsICdzdGFydCcsICd0aW1lJywgKGZvcm1hdHRlZFN0YXJ0RGF0ZSA9PT0gc3RhcnRMYWJlbERhdGUpKX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxzcGFuPntmb3JtYXR0ZWRTdGFydFRpbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgIHt0aGlzLmRyb3Bkb3duQXJyb3coKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHt0aGlzLmRpdmlkZXIoKX1cbiAgICAgICAgICAgIHtsYXlvdXQgIT09ICdzaW5nbGUnICYmXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgZm9udFdlaWdodDogJ3NlbWlib2xkJywgbWFyZ2luQm90dG9tOiAnNXB4JywgZm9udFNpemU6ICcxNXB4JyB9fT5Ecm9wIE9mZjwvZGl2PlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVuZENvbnRhaW5lcn0+XG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBzdHlsZT17dGhpcy5kYXRlU3R5bGUoZm9ybWF0dGVkU3RhcnREYXRlID09PSBzdGFydExhYmVsRGF0ZSl9XG4gICAgICAgICAgICAgICAgcmVmPVwiZW5kZGF0ZWZpZWxkXCJcbiAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZUZvY3VzfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlVG91Y2hUYXAuYmluZCh0aGlzLFxuICAgICAgICAgICAgICAgICAgdGhpcy5yZWZzLmVuZGRhdGVmaWVsZCwgJ2VuZCcsICdkYXRlJywgKGZvcm1hdHRlZFN0YXJ0RGF0ZSA9PT0gc3RhcnRMYWJlbERhdGUpKX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxzcGFuPntmb3JtYXR0ZWRFbmREYXRlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICB7bGF5b3V0ID09PSAnc2luZ2xlJyAmJiBmb3JtYXR0ZWRFbmREYXRlICE9PSBlbmRMYWJlbERhdGUgJiZcbiAgICAgICAgICAgICAgICAgIDxzcGFuPiw8L3NwYW4+XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHt0aGlzLmRyb3Bkb3duQXJyb3coKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBzdHlsZT17dGhpcy50aW1lU3R5bGUoZm9ybWF0dGVkRW5kRGF0ZSA9PT0gZW5kTGFiZWxEYXRlKX1cbiAgICAgICAgICAgICAgICByZWY9XCJlbmR0aW1lZmllbGRcIlxuICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMuaGFuZGxlRm9jdXN9XG4gICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVUb3VjaFRhcC5iaW5kKHRoaXMsXG4gICAgICAgICAgICAgICAgICB0aGlzLnJlZnMuZW5kdGltZWZpZWxkLCAnZW5kJywgJ3RpbWUnLCAoZm9ybWF0dGVkRW5kRGF0ZSA9PT0gZW5kTGFiZWxEYXRlKSl9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c3Bhbj57Zm9ybWF0dGVkRW5kVGltZX08L3NwYW4+XG4gICAgICAgICAgICAgICAge3RoaXMuZHJvcGRvd25BcnJvdygpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICAgIDxEYXRlUmFuZ2VQaWNrZXJEaWFsb2dcbiAgICAgICAgICBEYXRlVGltZUZvcm1hdD17RGF0ZVRpbWVGb3JtYXR9XG4gICAgICAgICAgYXV0b09rPXthdXRvT2t9XG4gICAgICAgICAgYXV0b09wZW5GaWVsZD17YXV0b09wZW5GaWVsZH1cbiAgICAgICAgICBibG9ja2VkRGF0ZVRpbWVSYW5nZXM9e2Jsb2NrZWREYXRlVGltZVJhbmdlc31cbiAgICAgICAgICBjYWxlbmRhckRhdGVXaWR0aD17Y2FsZW5kYXJEYXRlV2lkdGh9XG4gICAgICAgICAgY2FsZW5kYXJUaW1lV2lkdGg9e2NhbGVuZGFyVGltZVdpZHRofVxuICAgICAgICAgIGNhbmNlbExhYmVsPXtjYW5jZWxMYWJlbH1cbiAgICAgICAgICBjb250YWluZXI9e2NvbnRhaW5lcn1cbiAgICAgICAgICBkYXlCdXR0b25TaXplPXtkYXlCdXR0b25TaXplfVxuICAgICAgICAgIGVuZD17ZW5kfVxuICAgICAgICAgIGVuZExhYmVsPXtlbmRMYWJlbH1cbiAgICAgICAgICBmaXJzdERheU9mV2Vlaz17Zmlyc3REYXlPZldlZWt9XG4gICAgICAgICAgaW5pdGlhbFN0YXJ0RGF0ZT17dGhpcy5zdGF0ZS5kaWFsb2dTdGFydERhdGV9XG4gICAgICAgICAgaW5pdGlhbEVuZERhdGU9e3RoaXMuc3RhdGUuZGlhbG9nRW5kRGF0ZX1cbiAgICAgICAgICBsb2NhbGU9e2xvY2FsZX1cbiAgICAgICAgICBzaG93Q2FsZW5kYXJEYXRlPXtzaG93Q2FsZW5kYXJEYXRlfVxuICAgICAgICAgIHNob3dDYWxlbmRhclN0YXR1cz17c2hvd0NhbGVuZGFyU3RhdHVzfVxuICAgICAgICAgIG1vZGU9e21vZGV9XG4gICAgICAgICAgb2tMYWJlbD17b2tMYWJlbH1cbiAgICAgICAgICBvbkFjY2VwdD17dGhpcy5oYW5kbGVBY2NlcHR9XG4gICAgICAgICAgb25VcGRhdGU9e3RoaXMuaGFuZGxlVXBkYXRlfVxuICAgICAgICAgIG9uU2hvdz17dGhpcy5oYW5kbGVTaG93fVxuICAgICAgICAgIG9uRGlzbWlzcz17dGhpcy5oYW5kbGVEaXNtaXNzfVxuICAgICAgICAgIHJlZj1cImRpYWxvZ1dpbmRvd1wiXG4gICAgICAgICAgc3RhcnQ9e3N0YXJ0fVxuICAgICAgICAgIHN0YXJ0TGFiZWw9e3N0YXJ0TGFiZWx9XG4gICAgICAgICAgdXRpbHM9e3V0aWxzfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEYXRlUmFuZ2VQaWNrZXI7XG4iXX0=