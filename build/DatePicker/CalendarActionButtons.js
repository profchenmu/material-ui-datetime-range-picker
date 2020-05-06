'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _styles = require('@material-ui/core/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var useStyles = (0, _styles.makeStyles)({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 0,
    maxHeight: 48,
    padding: 0
  },
  flatButtons: {
    fontsize: 14,
    margin: '4px 8px 8px 0px',
    maxHeight: 36,
    minWidth: 64,
    padding: 0
  }
});

var CalendarActionButton = function (_Component) {
  _inherits(CalendarActionButton, _Component);

  function CalendarActionButton() {
    _classCallCheck(this, CalendarActionButton);

    return _possibleConstructorReturn(this, (CalendarActionButton.__proto__ || Object.getPrototypeOf(CalendarActionButton)).apply(this, arguments));
  }

  _createClass(CalendarActionButton, [{
    key: 'render',
    value: function render() {
      var classes = useStyles();
      var _props = this.props,
          cancelLabel = _props.cancelLabel,
          okLabel = _props.okLabel;


      return _react2.default.createElement(
        'div',
        { style: classes.root },
        _react2.default.createElement(
          _Button2.default,
          {
            onClick: this.props.onTouchTapCancel,
            primary: true,
            style: classes.flatButtons
          },
          cancelLabel
        ),
        !this.props.autoOk && _react2.default.createElement(
          _Button2.default,
          {
            disabled: this.refs.calendar !== undefined && this.refs.calendar.isSelectedDateDisabled(),

            onClick: this.props.onTouchTapOk,
            primary: true,
            style: classes.flatButtons
          },
          okLabel
        )
      );
    }
  }]);

  return CalendarActionButton;
}(_react.Component);

CalendarActionButton.propTypes = {
  autoOk: _propTypes2.default.bool,
  cancelLabel: _propTypes2.default.node,
  okLabel: _propTypes2.default.node,
  onTouchTapCancel: _propTypes2.default.func,
  onTouchTapOk: _propTypes2.default.func
};
exports.default = CalendarActionButton;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9EYXRlUGlja2VyL0NhbGVuZGFyQWN0aW9uQnV0dG9ucy5qcyJdLCJuYW1lcyI6WyJ1c2VTdHlsZXMiLCJyb290IiwiZGlzcGxheSIsImZsZXhEaXJlY3Rpb24iLCJqdXN0aWZ5Q29udGVudCIsIm1hcmdpbiIsIm1heEhlaWdodCIsInBhZGRpbmciLCJmbGF0QnV0dG9ucyIsImZvbnRzaXplIiwibWluV2lkdGgiLCJDYWxlbmRhckFjdGlvbkJ1dHRvbiIsImNsYXNzZXMiLCJwcm9wcyIsImNhbmNlbExhYmVsIiwib2tMYWJlbCIsIm9uVG91Y2hUYXBDYW5jZWwiLCJhdXRvT2siLCJyZWZzIiwiY2FsZW5kYXIiLCJ1bmRlZmluZWQiLCJpc1NlbGVjdGVkRGF0ZURpc2FibGVkIiwib25Ub3VjaFRhcE9rIiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwiYm9vbCIsIm5vZGUiLCJmdW5jIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsWUFBWSx3QkFBVztBQUMzQkMsUUFBTTtBQUNKQyxhQUFTLE1BREw7QUFFSkMsbUJBQWUsS0FGWDtBQUdKQyxvQkFBZ0IsVUFIWjtBQUlKQyxZQUFRLENBSko7QUFLSkMsZUFBVyxFQUxQO0FBTUpDLGFBQVM7QUFOTCxHQURxQjtBQVMzQkMsZUFBYTtBQUNYQyxjQUFVLEVBREM7QUFFWEosWUFBUSxpQkFGRztBQUdYQyxlQUFXLEVBSEE7QUFJWEksY0FBVSxFQUpDO0FBS1hILGFBQVM7QUFMRTtBQVRjLENBQVgsQ0FBbEI7O0lBa0JNSSxvQjs7Ozs7Ozs7Ozs7NkJBU0s7QUFDUCxVQUFNQyxVQUFVWixXQUFoQjtBQURPLG1CQUV3QixLQUFLYSxLQUY3QjtBQUFBLFVBRUFDLFdBRkEsVUFFQUEsV0FGQTtBQUFBLFVBRWFDLE9BRmIsVUFFYUEsT0FGYjs7O0FBSVAsYUFDRTtBQUFBO0FBQUEsVUFBSyxPQUFPSCxRQUFRWCxJQUFwQjtBQUNFO0FBQUMsMEJBQUQ7QUFBQTtBQUNFLHFCQUFTLEtBQUtZLEtBQUwsQ0FBV0csZ0JBRHRCO0FBRUUscUJBQVMsSUFGWDtBQUdFLG1CQUFPSixRQUFRSjtBQUhqQjtBQUtHTTtBQUxILFNBREY7QUFRRyxTQUFDLEtBQUtELEtBQUwsQ0FBV0ksTUFBWixJQUNDO0FBQUMsMEJBQUQ7QUFBQTtBQUNFLHNCQUFVLEtBQUtDLElBQUwsQ0FBVUMsUUFBVixLQUF1QkMsU0FBdkIsSUFBb0MsS0FBS0YsSUFBTCxDQUFVQyxRQUFWLENBQW1CRSxzQkFBbkIsRUFEaEQ7O0FBR0UscUJBQVMsS0FBS1IsS0FBTCxDQUFXUyxZQUh0QjtBQUlFLHFCQUFTLElBSlg7QUFLRSxtQkFBT1YsUUFBUUo7QUFMakI7QUFPR087QUFQSDtBQVRKLE9BREY7QUFzQkQ7Ozs7RUFuQ2dDUSxnQjs7QUFBN0JaLG9CLENBQ0dhLFMsR0FBWTtBQUNqQlAsVUFBUVEsb0JBQVVDLElBREQ7QUFFakJaLGVBQWFXLG9CQUFVRSxJQUZOO0FBR2pCWixXQUFTVSxvQkFBVUUsSUFIRjtBQUlqQlgsb0JBQWtCUyxvQkFBVUcsSUFKWDtBQUtqQk4sZ0JBQWNHLG9CQUFVRztBQUxQLEM7a0JBcUNOakIsb0IiLCJmaWxlIjoiQ2FsZW5kYXJBY3Rpb25CdXR0b25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEJ1dHRvbiBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9CdXR0b24nO1xuaW1wb3J0IHttYWtlU3R5bGVzfSBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9zdHlsZXMnO1xuXG5jb25zdCB1c2VTdHlsZXMgPSBtYWtlU3R5bGVzKHtcbiAgcm9vdDoge1xuICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICBmbGV4RGlyZWN0aW9uOiAncm93JyxcbiAgICBqdXN0aWZ5Q29udGVudDogJ2ZsZXgtZW5kJyxcbiAgICBtYXJnaW46IDAsXG4gICAgbWF4SGVpZ2h0OiA0OCxcbiAgICBwYWRkaW5nOiAwLFxuICB9LFxuICBmbGF0QnV0dG9uczoge1xuICAgIGZvbnRzaXplOiAxNCxcbiAgICBtYXJnaW46ICc0cHggOHB4IDhweCAwcHgnLFxuICAgIG1heEhlaWdodDogMzYsXG4gICAgbWluV2lkdGg6IDY0LFxuICAgIHBhZGRpbmc6IDAsXG4gIH0sXG59KTtcblxuY2xhc3MgQ2FsZW5kYXJBY3Rpb25CdXR0b24gZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGF1dG9PazogUHJvcFR5cGVzLmJvb2wsXG4gICAgY2FuY2VsTGFiZWw6IFByb3BUeXBlcy5ub2RlLFxuICAgIG9rTGFiZWw6IFByb3BUeXBlcy5ub2RlLFxuICAgIG9uVG91Y2hUYXBDYW5jZWw6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uVG91Y2hUYXBPazogUHJvcFR5cGVzLmZ1bmMsXG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGNsYXNzZXMgPSB1c2VTdHlsZXMoKTtcbiAgICBjb25zdCB7Y2FuY2VsTGFiZWwsIG9rTGFiZWx9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXtjbGFzc2VzLnJvb3R9ID5cbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25Ub3VjaFRhcENhbmNlbH1cbiAgICAgICAgICBwcmltYXJ5PXt0cnVlfVxuICAgICAgICAgIHN0eWxlPXtjbGFzc2VzLmZsYXRCdXR0b25zfVxuICAgICAgICA+XG4gICAgICAgICAge2NhbmNlbExhYmVsfVxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgeyF0aGlzLnByb3BzLmF1dG9PayAmJlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLnJlZnMuY2FsZW5kYXIgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnJlZnMuY2FsZW5kYXIuaXNTZWxlY3RlZERhdGVEaXNhYmxlZCgpfVxuXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLm9uVG91Y2hUYXBPa31cbiAgICAgICAgICAgIHByaW1hcnk9e3RydWV9XG4gICAgICAgICAgICBzdHlsZT17Y2xhc3Nlcy5mbGF0QnV0dG9uc31cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7b2tMYWJlbH1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYWxlbmRhckFjdGlvbkJ1dHRvbjtcbiJdfQ==