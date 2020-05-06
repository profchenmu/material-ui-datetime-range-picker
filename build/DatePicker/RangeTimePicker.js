'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _MenuItem = require('@material-ui/core/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _dateUtils = require('./dateUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RangeTimePicker = function (_Component) {
  _inherits(RangeTimePicker, _Component);

  function RangeTimePicker() {
    _classCallCheck(this, RangeTimePicker);

    return _possibleConstructorReturn(this, (RangeTimePicker.__proto__ || Object.getPrototypeOf(RangeTimePicker)).apply(this, arguments));
  }

  _createClass(RangeTimePicker, [{
    key: 'getStyles',
    value: function getStyles() {
      var datePicker = this.context.muiTheme.datePicker;

      return {
        root: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          fontWeight: 400,
          height: 228,
          lineHeight: 2,
          position: 'relative',
          textAlign: 'center',
          MozPaddingStart: 0,
          overflowY: 'scroll'
        },
        hour: {
          height: 34,
          marginBottom: 2
        },
        blockedTimeMessage: {
          color: datePicker.color,
          fontWeight: 'bold',
          height: 48,
          lineHeight: 3
        }
      };
    }
  }, {
    key: 'shouldDisableTime',
    value: function shouldDisableTime(hour) {
      var _props = this.props,
          blockedDateTimeRanges = _props.blockedDateTimeRanges,
          edit = _props.edit,
          start = _props.start;

      var selectedDate = this.props[edit].selectedDate;
      var adjustedDate = (0, _dateUtils.cloneDate)(selectedDate);
      adjustedDate.setHours(hour, 0, 0, 0);

      if (edit === 'start') {
        return (0, _dateUtils.isBeforeDateTime)(adjustedDate, new Date()) || (0, _dateUtils.isDateTimeInRanges)(blockedDateTimeRanges, adjustedDate);
      } else {
        var selectedStartDate = start.selectedDate;
        var closestRange = (0, _dateUtils.closestRangeAfterStart)(blockedDateTimeRanges, selectedStartDate);

        if (closestRange) {
          return (0, _dateUtils.isEqualDateTime)(start.selectedDate, adjustedDate) || (0, _dateUtils.isBeforeDateTime)(adjustedDate, selectedStartDate) || (0, _dateUtils.isAfterDateTime)(adjustedDate, closestRange.start);
        } else {
          return (0, _dateUtils.isEqualDateTime)(start.selectedDate, adjustedDate) || (0, _dateUtils.isBeforeDateTime)(adjustedDate, selectedStartDate);
        }
      }
    }
  }, {
    key: 'hasBlockedTime',
    value: function hasBlockedTime() {
      var _props2 = this.props,
          blockedDateTimeRanges = _props2.blockedDateTimeRanges,
          edit = _props2.edit;

      var selectedDate = this.props[edit].selectedDate;
      if (selectedDate === null) return false;
      return (0, _dateUtils.dateBordersRange)(blockedDateTimeRanges, selectedDate);
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
          { ref: 'hour' + hour, key: i, style: styles.hour },
          _this2.getHourElement(hour)
        );
      }, this);
    }
  }, {
    key: 'getHourElement',
    value: function getHourElement(hour) {
      var _props3 = this.props,
          edit = _props3.edit,
          end = _props3.end,
          locale = _props3.locale,
          start = _props3.start;


      var date = new Date();
      date.setHours(hour, 0, 0, 0);
      var formattedDate = date.toLocaleString(locale, { hour: 'numeric', hour12: true });

      return _react2.default.createElement(
        _MenuItem2.default,
        {
          disabled: this.shouldDisableTime(hour),
          onClick: this.props.onTouchTapHour.bind(this, hour)
        },
        formattedDate
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var styles = this.getStyles();
      setTimeout(function () {
        var hour = _reactDom2.default.findDOMNode(_this3.refs.hour12);
        if (hour) {
          hour.scrollIntoView(true);
        }
      }, 0);
      return _react2.default.createElement(
        'div',
        { style: styles.root },
        this.hasBlockedTime() && _react2.default.createElement(
          'div',
          { style: styles.blockedTimeMessage },
          'This day contains other reservations'
        ),
        this.getTimeElements(styles)
      );
    }
  }]);

  return RangeTimePicker;
}(_react.Component);

RangeTimePicker.propTypes = {
  blockedDateTimeRanges: _propTypes2.default.array,
  edit: _propTypes2.default.string.isRequired,
  end: _propTypes2.default.object.isRequired,
  locale: _propTypes2.default.string.isRequired,
  onTouchTapHour: _propTypes2.default.func.isRequired,
  start: _propTypes2.default.object.isRequired,
  utils: _propTypes2.default.object.isRequired
};
RangeTimePicker.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
exports.default = RangeTimePicker;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9EYXRlUGlja2VyL1JhbmdlVGltZVBpY2tlci5qcyJdLCJuYW1lcyI6WyJSYW5nZVRpbWVQaWNrZXIiLCJkYXRlUGlja2VyIiwiY29udGV4dCIsIm11aVRoZW1lIiwicm9vdCIsImRpc3BsYXkiLCJmbGV4RGlyZWN0aW9uIiwianVzdGlmeUNvbnRlbnQiLCJmb250V2VpZ2h0IiwiaGVpZ2h0IiwibGluZUhlaWdodCIsInBvc2l0aW9uIiwidGV4dEFsaWduIiwiTW96UGFkZGluZ1N0YXJ0Iiwib3ZlcmZsb3dZIiwiaG91ciIsIm1hcmdpbkJvdHRvbSIsImJsb2NrZWRUaW1lTWVzc2FnZSIsImNvbG9yIiwicHJvcHMiLCJibG9ja2VkRGF0ZVRpbWVSYW5nZXMiLCJlZGl0Iiwic3RhcnQiLCJzZWxlY3RlZERhdGUiLCJhZGp1c3RlZERhdGUiLCJzZXRIb3VycyIsIkRhdGUiLCJzZWxlY3RlZFN0YXJ0RGF0ZSIsImNsb3Nlc3RSYW5nZSIsInN0eWxlcyIsImhvdXJBcnJheSIsImhvdXJzSW5EYXkiLCJpIiwicHVzaCIsIm1hcCIsImdldEhvdXJFbGVtZW50IiwiZW5kIiwibG9jYWxlIiwiZGF0ZSIsImZvcm1hdHRlZERhdGUiLCJ0b0xvY2FsZVN0cmluZyIsImhvdXIxMiIsInNob3VsZERpc2FibGVUaW1lIiwib25Ub3VjaFRhcEhvdXIiLCJiaW5kIiwiZ2V0U3R5bGVzIiwic2V0VGltZW91dCIsIlJlYWN0RE9NIiwiZmluZERPTU5vZGUiLCJyZWZzIiwic2Nyb2xsSW50b1ZpZXciLCJoYXNCbG9ja2VkVGltZSIsImdldFRpbWVFbGVtZW50cyIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsImFycmF5Iiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsIm9iamVjdCIsImZ1bmMiLCJ1dGlscyIsImNvbnRleHRUeXBlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7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Ozs7O0VBOUgyQndCLGdCOztBQUF4QnJELGUsQ0FDR3NELFMsR0FBWTtBQUNqQmxDLHlCQUF1Qm1DLG9CQUFVQyxLQURoQjtBQUVqQm5DLFFBQU1rQyxvQkFBVUUsTUFBVixDQUFpQkMsVUFGTjtBQUdqQnRCLE9BQUttQixvQkFBVUksTUFBVixDQUFpQkQsVUFITDtBQUlqQnJCLFVBQVFrQixvQkFBVUUsTUFBVixDQUFpQkMsVUFKUjtBQUtqQmYsa0JBQWdCWSxvQkFBVUssSUFBVixDQUFlRixVQUxkO0FBTWpCcEMsU0FBT2lDLG9CQUFVSSxNQUFWLENBQWlCRCxVQU5QO0FBT2pCRyxTQUFPTixvQkFBVUksTUFBVixDQUFpQkQ7QUFQUCxDO0FBRGYxRCxlLENBV0c4RCxZLEdBQWU7QUFDcEIzRCxZQUFVb0Qsb0JBQVVJLE1BQVYsQ0FBaUJEO0FBRFAsQztrQkFzSFQxRCxlIiwiZmlsZSI6IlJhbmdlVGltZVBpY2tlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBNZW51SXRlbSBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9NZW51SXRlbSc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcblxuaW1wb3J0IHtcbiAgY2xvbmVEYXRlLFxuICBjbG9zZXN0UmFuZ2VBZnRlclN0YXJ0LFxuICBkYXRlQm9yZGVyc1JhbmdlLFxuICBpc0FmdGVyRGF0ZVRpbWUsXG4gIGlzQmVmb3JlRGF0ZVRpbWUsXG4gIGlzRGF0ZVRpbWVJblJhbmdlcyxcbiAgaXNFcXVhbERhdGVUaW1lLFxufSBmcm9tICcuL2RhdGVVdGlscyc7XG5cbmNsYXNzIFJhbmdlVGltZVBpY2tlciBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgYmxvY2tlZERhdGVUaW1lUmFuZ2VzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgZWRpdDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGVuZDogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIGxvY2FsZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIG9uVG91Y2hUYXBIb3VyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHN0YXJ0OiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgdXRpbHM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgfTtcblxuICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgIG11aVRoZW1lOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIH07XG5cbiAgZ2V0U3R5bGVzKCkge1xuICAgIGNvbnN0IHtkYXRlUGlja2VyfSA9IHRoaXMuY29udGV4dC5tdWlUaGVtZTtcbiAgICByZXR1cm4ge1xuICAgICAgcm9vdDoge1xuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2ZsZXgtc3RhcnQnLFxuICAgICAgICBmb250V2VpZ2h0OiA0MDAsXG4gICAgICAgIGhlaWdodDogMjI4LFxuICAgICAgICBsaW5lSGVpZ2h0OiAyLFxuICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgTW96UGFkZGluZ1N0YXJ0OiAwLFxuICAgICAgICBvdmVyZmxvd1k6ICdzY3JvbGwnLFxuICAgICAgfSxcbiAgICAgIGhvdXI6IHtcbiAgICAgICAgaGVpZ2h0OiAzNCxcbiAgICAgICAgbWFyZ2luQm90dG9tOiAyLFxuICAgICAgfSxcbiAgICAgIGJsb2NrZWRUaW1lTWVzc2FnZToge1xuICAgICAgICBjb2xvcjogZGF0ZVBpY2tlci5jb2xvcixcbiAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxuICAgICAgICBoZWlnaHQ6IDQ4LFxuICAgICAgICBsaW5lSGVpZ2h0OiAzLFxuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgc2hvdWxkRGlzYWJsZVRpbWUoaG91cikge1xuICAgIGNvbnN0IHtibG9ja2VkRGF0ZVRpbWVSYW5nZXMsIGVkaXQsIHN0YXJ0fSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2VsZWN0ZWREYXRlID0gdGhpcy5wcm9wc1tlZGl0XS5zZWxlY3RlZERhdGU7XG4gICAgY29uc3QgYWRqdXN0ZWREYXRlID0gY2xvbmVEYXRlKHNlbGVjdGVkRGF0ZSk7XG4gICAgYWRqdXN0ZWREYXRlLnNldEhvdXJzKGhvdXIsIDAsIDAsIDApO1xuXG4gICAgaWYgKGVkaXQgPT09ICdzdGFydCcpIHtcbiAgICAgIHJldHVybiAoaXNCZWZvcmVEYXRlVGltZShhZGp1c3RlZERhdGUsIG5ldyBEYXRlKCkpIHx8IGlzRGF0ZVRpbWVJblJhbmdlcyhibG9ja2VkRGF0ZVRpbWVSYW5nZXMsIGFkanVzdGVkRGF0ZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzZWxlY3RlZFN0YXJ0RGF0ZSA9IHN0YXJ0LnNlbGVjdGVkRGF0ZTtcbiAgICAgIGNvbnN0IGNsb3Nlc3RSYW5nZSA9IGNsb3Nlc3RSYW5nZUFmdGVyU3RhcnQoYmxvY2tlZERhdGVUaW1lUmFuZ2VzLCBzZWxlY3RlZFN0YXJ0RGF0ZSk7XG5cbiAgICAgIGlmIChjbG9zZXN0UmFuZ2UpIHtcbiAgICAgICAgcmV0dXJuIGlzRXF1YWxEYXRlVGltZShzdGFydC5zZWxlY3RlZERhdGUsIGFkanVzdGVkRGF0ZSkgfHxcbiAgICAgICAgICAgICAgIGlzQmVmb3JlRGF0ZVRpbWUoYWRqdXN0ZWREYXRlLCBzZWxlY3RlZFN0YXJ0RGF0ZSkgfHxcbiAgICAgICAgICAgICAgIGlzQWZ0ZXJEYXRlVGltZShhZGp1c3RlZERhdGUsIGNsb3Nlc3RSYW5nZS5zdGFydCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gaXNFcXVhbERhdGVUaW1lKHN0YXJ0LnNlbGVjdGVkRGF0ZSwgYWRqdXN0ZWREYXRlKSB8fFxuICAgICAgICAgICAgICAgaXNCZWZvcmVEYXRlVGltZShhZGp1c3RlZERhdGUsIHNlbGVjdGVkU3RhcnREYXRlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYXNCbG9ja2VkVGltZSgpIHtcbiAgICBjb25zdCB7YmxvY2tlZERhdGVUaW1lUmFuZ2VzLCBlZGl0fSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2VsZWN0ZWREYXRlID0gdGhpcy5wcm9wc1tlZGl0XS5zZWxlY3RlZERhdGU7XG4gICAgaWYgKHNlbGVjdGVkRGF0ZSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBkYXRlQm9yZGVyc1JhbmdlKGJsb2NrZWREYXRlVGltZVJhbmdlcywgc2VsZWN0ZWREYXRlKTtcbiAgfVxuXG4gIGdldFRpbWVFbGVtZW50cyhzdHlsZXMpIHtcbiAgICBjb25zdCBob3VyQXJyYXkgPSBbXTtcbiAgICBjb25zdCBob3Vyc0luRGF5ID0gMjQ7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBob3Vyc0luRGF5OyBpKyspIHtcbiAgICAgIGhvdXJBcnJheS5wdXNoKGkpO1xuICAgIH1cblxuICAgIHJldHVybiBob3VyQXJyYXkubWFwKChob3VyLCBpKSA9PiB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IHJlZj17YGhvdXIke2hvdXJ9YH0ga2V5PXtpfSBzdHlsZT17c3R5bGVzLmhvdXJ9PlxuICAgICAgICAgIHt0aGlzLmdldEhvdXJFbGVtZW50KGhvdXIpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfSwgdGhpcyk7XG4gIH1cblxuICBnZXRIb3VyRWxlbWVudChob3VyKSB7XG4gICAgY29uc3Qge1xuICAgICAgZWRpdCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgZW5kLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICBsb2NhbGUsXG4gICAgICBzdGFydCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgZGF0ZS5zZXRIb3Vycyhob3VyLCAwLCAwLCAwKTtcbiAgICBjb25zdCBmb3JtYXR0ZWREYXRlID0gZGF0ZS50b0xvY2FsZVN0cmluZyhsb2NhbGUsIHtob3VyOiAnbnVtZXJpYycsIGhvdXIxMjogdHJ1ZX0pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxNZW51SXRlbVxuICAgICAgICBkaXNhYmxlZD17dGhpcy5zaG91bGREaXNhYmxlVGltZShob3VyKX1cbiAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5vblRvdWNoVGFwSG91ci5iaW5kKHRoaXMsIGhvdXIpfVxuICAgICAgPlxuICAgICAgICB7Zm9ybWF0dGVkRGF0ZX1cbiAgICAgIDwvTWVudUl0ZW0+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBzdHlsZXMgPSB0aGlzLmdldFN0eWxlcygpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29uc3QgaG91ciA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5ob3VyMTIpO1xuICAgICAgaWYgKGhvdXIpIHtcbiAgICAgICAgaG91ci5zY3JvbGxJbnRvVmlldyh0cnVlKTtcbiAgICAgIH1cbiAgICB9LCAwKTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLnJvb3R9PlxuICAgICAgICB7dGhpcy5oYXNCbG9ja2VkVGltZSgpICYmXG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmJsb2NrZWRUaW1lTWVzc2FnZX0+VGhpcyBkYXkgY29udGFpbnMgb3RoZXIgcmVzZXJ2YXRpb25zPC9kaXY+fVxuICAgICAgICB7dGhpcy5nZXRUaW1lRWxlbWVudHMoc3R5bGVzKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmFuZ2VUaW1lUGlja2VyO1xuIl19