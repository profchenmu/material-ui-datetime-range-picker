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

var _dateUtils = require('./dateUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RangeCalendarActionButton = function (_Component) {
  _inherits(RangeCalendarActionButton, _Component);

  function RangeCalendarActionButton() {
    _classCallCheck(this, RangeCalendarActionButton);

    return _possibleConstructorReturn(this, (RangeCalendarActionButton.__proto__ || Object.getPrototypeOf(RangeCalendarActionButton)).apply(this, arguments));
  }

  _createClass(RangeCalendarActionButton, [{
    key: 'shouldDisableOkay',
    value: function shouldDisableOkay() {
      var _props = this.props,
          blockedDateTimeRanges = _props.blockedDateTimeRanges,
          end = _props.end,
          start = _props.start;

      return (0, _dateUtils.isEqualDateTime)(start.selectedDate, end.selectedDate) || (0, _dateUtils.isBeforeDateTime)(start.selectedDate, new Date()) || (0, _dateUtils.isBeforeDateTime)(end.selectedDate, start.selectedDate) || (0, _dateUtils.isDateTimeInRangesExclusive)(blockedDateTimeRanges, end.selectedDate) || (0, _dateUtils.isDateTimeInRangesExclusive)(blockedDateTimeRanges, start.selectedDate);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          cancelLabel = _props2.cancelLabel,
          okLabel = _props2.okLabel;


      var styles = {
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
      };

      return _react2.default.createElement(
        'div',
        { style: styles.root },
        _react2.default.createElement(
          _Button2.default,
          {
            onClick: this.props.onTouchTapCancel,
            primary: true,
            style: styles.flatButtons
          },
          cancelLabel
        ),
        _react2.default.createElement(
          _Button2.default,
          {
            disabled: this.shouldDisableOkay(),
            onClick: this.props.onTouchTapOk,
            primary: true,
            style: styles.flatButtons
          },
          okLabel
        )
      );
    }
  }]);

  return RangeCalendarActionButton;
}(_react.Component);

RangeCalendarActionButton.propTypes = {
  autoOk: _propTypes2.default.bool,
  blockedDateTimeRanges: _propTypes2.default.array,
  cancelLabel: _propTypes2.default.node,
  end: _propTypes2.default.object.isRequired,
  okLabel: _propTypes2.default.node,
  onTouchTapCancel: _propTypes2.default.func,
  onTouchTapOk: _propTypes2.default.func,
  start: _propTypes2.default.object.isRequired
};
exports.default = RangeCalendarActionButton;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9EYXRlUGlja2VyL1JhbmdlQ2FsZW5kYXJBY3Rpb25CdXR0b25zLmpzIl0sIm5hbWVzIjpbIlJhbmdlQ2FsZW5kYXJBY3Rpb25CdXR0b24iLCJwcm9wcyIsImJsb2NrZWREYXRlVGltZVJhbmdlcyIsImVuZCIsInN0YXJ0Iiwic2VsZWN0ZWREYXRlIiwiRGF0ZSIsImNhbmNlbExhYmVsIiwib2tMYWJlbCIsInN0eWxlcyIsInJvb3QiLCJkaXNwbGF5IiwiZmxleERpcmVjdGlvbiIsImp1c3RpZnlDb250ZW50IiwibWFyZ2luIiwibWF4SGVpZ2h0IiwicGFkZGluZyIsImZsYXRCdXR0b25zIiwiZm9udHNpemUiLCJtaW5XaWR0aCIsIm9uVG91Y2hUYXBDYW5jZWwiLCJzaG91bGREaXNhYmxlT2theSIsIm9uVG91Y2hUYXBPayIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsImF1dG9PayIsIlByb3BUeXBlcyIsImJvb2wiLCJhcnJheSIsIm5vZGUiLCJvYmplY3QiLCJpc1JlcXVpcmVkIiwiZnVuYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7OztJQU1NQSx5Qjs7Ozs7Ozs7Ozs7d0NBWWdCO0FBQUEsbUJBQzBCLEtBQUtDLEtBRC9CO0FBQUEsVUFDWEMscUJBRFcsVUFDWEEscUJBRFc7QUFBQSxVQUNZQyxHQURaLFVBQ1lBLEdBRFo7QUFBQSxVQUNpQkMsS0FEakIsVUFDaUJBLEtBRGpCOztBQUVsQixhQUFRLGdDQUFnQkEsTUFBTUMsWUFBdEIsRUFBb0NGLElBQUlFLFlBQXhDLEtBQ0EsaUNBQWlCRCxNQUFNQyxZQUF2QixFQUFxQyxJQUFJQyxJQUFKLEVBQXJDLENBREEsSUFFQSxpQ0FBaUJILElBQUlFLFlBQXJCLEVBQW1DRCxNQUFNQyxZQUF6QyxDQUZBLElBR0EsNENBQTRCSCxxQkFBNUIsRUFBbURDLElBQUlFLFlBQXZELENBSEEsSUFJQSw0Q0FBNEJILHFCQUE1QixFQUFtREUsTUFBTUMsWUFBekQsQ0FKUjtBQUtEOzs7NkJBRVE7QUFBQSxvQkFDd0IsS0FBS0osS0FEN0I7QUFBQSxVQUNBTSxXQURBLFdBQ0FBLFdBREE7QUFBQSxVQUNhQyxPQURiLFdBQ2FBLE9BRGI7OztBQUdQLFVBQU1DLFNBQVM7QUFDYkMsY0FBTTtBQUNKQyxtQkFBUyxNQURMO0FBRUpDLHlCQUFlLEtBRlg7QUFHSkMsMEJBQWdCLFVBSFo7QUFJSkMsa0JBQVEsQ0FKSjtBQUtKQyxxQkFBVyxFQUxQO0FBTUpDLG1CQUFTO0FBTkwsU0FETztBQVNiQyxxQkFBYTtBQUNYQyxvQkFBVSxFQURDO0FBRVhKLGtCQUFRLGlCQUZHO0FBR1hDLHFCQUFXLEVBSEE7QUFJWEksb0JBQVUsRUFKQztBQUtYSCxtQkFBUztBQUxFO0FBVEEsT0FBZjs7QUFrQkEsYUFDRTtBQUFBO0FBQUEsVUFBSyxPQUFPUCxPQUFPQyxJQUFuQjtBQUNFO0FBQUMsMEJBQUQ7QUFBQTtBQUNFLHFCQUFTLEtBQUtULEtBQUwsQ0FBV21CLGdCQUR0QjtBQUVFLHFCQUFTLElBRlg7QUFHRSxtQkFBT1gsT0FBT1E7QUFIaEI7QUFLR1Y7QUFMSCxTQURGO0FBUUU7QUFBQywwQkFBRDtBQUFBO0FBQ0Usc0JBQVUsS0FBS2MsaUJBQUwsRUFEWjtBQUVFLHFCQUFTLEtBQUtwQixLQUFMLENBQVdxQixZQUZ0QjtBQUdFLHFCQUFTLElBSFg7QUFJRSxtQkFBT2IsT0FBT1E7QUFKaEI7QUFNR1Q7QUFOSDtBQVJGLE9BREY7QUFtQkQ7Ozs7RUE3RHFDZSxnQjs7QUFBbEN2Qix5QixDQUNHd0IsUyxHQUFZO0FBQ2pCQyxVQUFRQyxvQkFBVUMsSUFERDtBQUVqQnpCLHlCQUF1QndCLG9CQUFVRSxLQUZoQjtBQUdqQnJCLGVBQWFtQixvQkFBVUcsSUFITjtBQUlqQjFCLE9BQUt1QixvQkFBVUksTUFBVixDQUFpQkMsVUFKTDtBQUtqQnZCLFdBQVNrQixvQkFBVUcsSUFMRjtBQU1qQlQsb0JBQWtCTSxvQkFBVU0sSUFOWDtBQU9qQlYsZ0JBQWNJLG9CQUFVTSxJQVBQO0FBUWpCNUIsU0FBT3NCLG9CQUFVSSxNQUFWLENBQWlCQztBQVJQLEM7a0JBK0ROL0IseUIiLCJmaWxlIjoiUmFuZ2VDYWxlbmRhckFjdGlvbkJ1dHRvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgQnV0dG9uIGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL0J1dHRvbic7XG5cbmltcG9ydCB7XG4gIGlzQmVmb3JlRGF0ZVRpbWUsXG4gIGlzRGF0ZVRpbWVJblJhbmdlc0V4Y2x1c2l2ZSxcbiAgaXNFcXVhbERhdGVUaW1lLFxufSBmcm9tICcuL2RhdGVVdGlscyc7XG5cbmNsYXNzIFJhbmdlQ2FsZW5kYXJBY3Rpb25CdXR0b24gZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGF1dG9PazogUHJvcFR5cGVzLmJvb2wsXG4gICAgYmxvY2tlZERhdGVUaW1lUmFuZ2VzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgY2FuY2VsTGFiZWw6IFByb3BUeXBlcy5ub2RlLFxuICAgIGVuZDogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIG9rTGFiZWw6IFByb3BUeXBlcy5ub2RlLFxuICAgIG9uVG91Y2hUYXBDYW5jZWw6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uVG91Y2hUYXBPazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc3RhcnQ6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgfTtcblxuICBzaG91bGREaXNhYmxlT2theSgpIHtcbiAgICBjb25zdCB7YmxvY2tlZERhdGVUaW1lUmFuZ2VzLCBlbmQsIHN0YXJ0fSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChpc0VxdWFsRGF0ZVRpbWUoc3RhcnQuc2VsZWN0ZWREYXRlLCBlbmQuc2VsZWN0ZWREYXRlKSB8fFxuICAgICAgICAgICAgaXNCZWZvcmVEYXRlVGltZShzdGFydC5zZWxlY3RlZERhdGUsIG5ldyBEYXRlKCkpIHx8XG4gICAgICAgICAgICBpc0JlZm9yZURhdGVUaW1lKGVuZC5zZWxlY3RlZERhdGUsIHN0YXJ0LnNlbGVjdGVkRGF0ZSkgfHxcbiAgICAgICAgICAgIGlzRGF0ZVRpbWVJblJhbmdlc0V4Y2x1c2l2ZShibG9ja2VkRGF0ZVRpbWVSYW5nZXMsIGVuZC5zZWxlY3RlZERhdGUpIHx8XG4gICAgICAgICAgICBpc0RhdGVUaW1lSW5SYW5nZXNFeGNsdXNpdmUoYmxvY2tlZERhdGVUaW1lUmFuZ2VzLCBzdGFydC5zZWxlY3RlZERhdGUpKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7Y2FuY2VsTGFiZWwsIG9rTGFiZWx9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHN0eWxlcyA9IHtcbiAgICAgIHJvb3Q6IHtcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICBmbGV4RGlyZWN0aW9uOiAncm93JyxcbiAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdmbGV4LWVuZCcsXG4gICAgICAgIG1hcmdpbjogMCxcbiAgICAgICAgbWF4SGVpZ2h0OiA0OCxcbiAgICAgICAgcGFkZGluZzogMCxcbiAgICAgIH0sXG4gICAgICBmbGF0QnV0dG9uczoge1xuICAgICAgICBmb250c2l6ZTogMTQsXG4gICAgICAgIG1hcmdpbjogJzRweCA4cHggOHB4IDBweCcsXG4gICAgICAgIG1heEhlaWdodDogMzYsXG4gICAgICAgIG1pbldpZHRoOiA2NCxcbiAgICAgICAgcGFkZGluZzogMCxcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMucm9vdH0gPlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5vblRvdWNoVGFwQ2FuY2VsfVxuICAgICAgICAgIHByaW1hcnk9e3RydWV9XG4gICAgICAgICAgc3R5bGU9e3N0eWxlcy5mbGF0QnV0dG9uc31cbiAgICAgICAgPlxuICAgICAgICAgIHtjYW5jZWxMYWJlbH1cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBkaXNhYmxlZD17dGhpcy5zaG91bGREaXNhYmxlT2theSgpfVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25Ub3VjaFRhcE9rfVxuICAgICAgICAgIHByaW1hcnk9e3RydWV9XG4gICAgICAgICAgc3R5bGU9e3N0eWxlcy5mbGF0QnV0dG9uc31cbiAgICAgICAgPlxuICAgICAgICAgIHtva0xhYmVsfVxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmFuZ2VDYWxlbmRhckFjdGlvbkJ1dHRvbjtcbiJdfQ==