'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _SlideIn = require('../internal/SlideIn');

var _SlideIn2 = _interopRequireDefault(_SlideIn);

var _ChevronLeft = require('@material-ui/icons/ChevronLeft');

var _ChevronLeft2 = _interopRequireDefault(_ChevronLeft);

var _ChevronRight = require('@material-ui/icons/ChevronRight');

var _ChevronRight2 = _interopRequireDefault(_ChevronRight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'inherit',
    height: 48
  },
  titleDiv: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    width: 'calc(100% - 96px)'
  },
  titleText: {
    height: 'inherit',
    paddingTop: 12
  }
};

var CalendarToolbar = function (_Component) {
  _inherits(CalendarToolbar, _Component);

  function CalendarToolbar(props) {
    _classCallCheck(this, CalendarToolbar);

    var _this = _possibleConstructorReturn(this, (CalendarToolbar.__proto__ || Object.getPrototypeOf(CalendarToolbar)).call(this, props));

    _this.handleTouchTapPrevMonth = function () {
      if (_this.props.onMonthChange) {
        _this.props.onMonthChange(-1);
      }
    };

    _this.handleTouchTapNextMonth = function () {
      if (_this.props.onMonthChange) {
        _this.props.onMonthChange(1);
      }
    };

    _this.state = {
      transitionDirection: 'up'
    };
    return _this;
  }

  _createClass(CalendarToolbar, [{
    key: 'UNSAFE_componentWillReceiveProps',
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (nextProps.displayDate !== this.props.displayDate) {
        var direction = nextProps.displayDate > this.props.displayDate ? 'left' : 'right';
        this.setState({
          transitionDirection: direction
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          DateTimeFormat = _props.DateTimeFormat,
          locale = _props.locale,
          displayDate = _props.displayDate;


      var dateTimeFormatted = new DateTimeFormat(locale, {
        month: 'long',
        year: 'numeric'
      }).format(displayDate);

      return _react2.default.createElement(
        'div',
        { style: styles.root },
        _react2.default.createElement(
          _IconButton2.default,
          {
            disabled: !this.props.prevMonth,
            onClick: this.handleTouchTapPrevMonth
          },
          _react2.default.createElement(_ChevronLeft2.default, null)
        ),
        _react2.default.createElement(
          _SlideIn2.default,
          {
            direction: this.state.transitionDirection,
            style: styles.titleDiv
          },
          _react2.default.createElement(
            'div',
            { key: dateTimeFormatted, style: styles.titleText },
            dateTimeFormatted
          )
        ),
        _react2.default.createElement(
          _IconButton2.default,
          {
            disabled: !this.props.nextMonth,
            onClick: this.handleTouchTapNextMonth
          },
          _react2.default.createElement(_ChevronRight2.default, null)
        )
      );
    }
  }]);

  return CalendarToolbar;
}(_react.Component);

CalendarToolbar.propTypes = {
  DateTimeFormat: _propTypes2.default.func.isRequired,
  displayDate: _propTypes2.default.object.isRequired,
  locale: _propTypes2.default.string.isRequired,
  nextMonth: _propTypes2.default.bool,
  onMonthChange: _propTypes2.default.func,
  prevMonth: _propTypes2.default.bool
};
CalendarToolbar.defaultProps = {
  nextMonth: true,
  prevMonth: true
};
exports.default = CalendarToolbar;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9EYXRlUGlja2VyL0NhbGVuZGFyVG9vbGJhci5qcyJdLCJuYW1lcyI6WyJzdHlsZXMiLCJyb290IiwiZGlzcGxheSIsImp1c3RpZnlDb250ZW50IiwiYmFja2dyb3VuZENvbG9yIiwiaGVpZ2h0IiwidGl0bGVEaXYiLCJmb250U2l6ZSIsImZvbnRXZWlnaHQiLCJ0ZXh0QWxpZ24iLCJ3aWR0aCIsInRpdGxlVGV4dCIsInBhZGRpbmdUb3AiLCJDYWxlbmRhclRvb2xiYXIiLCJwcm9wcyIsImhhbmRsZVRvdWNoVGFwUHJldk1vbnRoIiwib25Nb250aENoYW5nZSIsImhhbmRsZVRvdWNoVGFwTmV4dE1vbnRoIiwic3RhdGUiLCJ0cmFuc2l0aW9uRGlyZWN0aW9uIiwibmV4dFByb3BzIiwiZGlzcGxheURhdGUiLCJkaXJlY3Rpb24iLCJzZXRTdGF0ZSIsIkRhdGVUaW1lRm9ybWF0IiwibG9jYWxlIiwiZGF0ZVRpbWVGb3JtYXR0ZWQiLCJtb250aCIsInllYXIiLCJmb3JtYXQiLCJwcmV2TW9udGgiLCJuZXh0TW9udGgiLCJDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJmdW5jIiwiaXNSZXF1aXJlZCIsIm9iamVjdCIsInN0cmluZyIsImJvb2wiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxTQUFTO0FBQ2JDLFFBQU07QUFDSkMsYUFBUyxNQURMO0FBRUpDLG9CQUFnQixlQUZaO0FBR0pDLHFCQUFpQixTQUhiO0FBSUpDLFlBQVE7QUFKSixHQURPO0FBT2JDLFlBQVU7QUFDUkMsY0FBVSxFQURGO0FBRVJDLGdCQUFZLEtBRko7QUFHUkMsZUFBVyxRQUhIO0FBSVJDLFdBQU87QUFKQyxHQVBHO0FBYWJDLGFBQVc7QUFDVE4sWUFBUSxTQURDO0FBRVRPLGdCQUFZO0FBRkg7QUFiRSxDQUFmOztJQW1CTUMsZTs7O0FBZUosMkJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxrSUFDWEEsS0FEVzs7QUFBQSxVQWdCbkJDLHVCQWhCbUIsR0FnQk8sWUFBTTtBQUM5QixVQUFJLE1BQUtELEtBQUwsQ0FBV0UsYUFBZixFQUE4QjtBQUM1QixjQUFLRixLQUFMLENBQVdFLGFBQVgsQ0FBeUIsQ0FBQyxDQUExQjtBQUNEO0FBQ0YsS0FwQmtCOztBQUFBLFVBc0JuQkMsdUJBdEJtQixHQXNCTyxZQUFNO0FBQzlCLFVBQUksTUFBS0gsS0FBTCxDQUFXRSxhQUFmLEVBQThCO0FBQzVCLGNBQUtGLEtBQUwsQ0FBV0UsYUFBWCxDQUF5QixDQUF6QjtBQUNEO0FBQ0YsS0ExQmtCOztBQUVqQixVQUFLRSxLQUFMLEdBQWE7QUFDWEMsMkJBQXFCO0FBRFYsS0FBYjtBQUZpQjtBQUtsQjs7OztxREFFZ0NDLFMsRUFBVztBQUMxQyxVQUFJQSxVQUFVQyxXQUFWLEtBQTBCLEtBQUtQLEtBQUwsQ0FBV08sV0FBekMsRUFBc0Q7QUFDcEQsWUFBTUMsWUFBWUYsVUFBVUMsV0FBVixHQUF3QixLQUFLUCxLQUFMLENBQVdPLFdBQW5DLEdBQWlELE1BQWpELEdBQTBELE9BQTVFO0FBQ0EsYUFBS0UsUUFBTCxDQUFjO0FBQ1pKLCtCQUFxQkc7QUFEVCxTQUFkO0FBR0Q7QUFDRjs7OzZCQWNRO0FBQUEsbUJBQ3VDLEtBQUtSLEtBRDVDO0FBQUEsVUFDQVUsY0FEQSxVQUNBQSxjQURBO0FBQUEsVUFDZ0JDLE1BRGhCLFVBQ2dCQSxNQURoQjtBQUFBLFVBQ3dCSixXQUR4QixVQUN3QkEsV0FEeEI7OztBQUdQLFVBQU1LLG9CQUFvQixJQUFJRixjQUFKLENBQW1CQyxNQUFuQixFQUEyQjtBQUNuREUsZUFBTyxNQUQ0QztBQUVuREMsY0FBTTtBQUY2QyxPQUEzQixFQUd2QkMsTUFIdUIsQ0FHaEJSLFdBSGdCLENBQTFCOztBQU1BLGFBQ0U7QUFBQTtBQUFBLFVBQUssT0FBT3JCLE9BQU9DLElBQW5CO0FBQ0U7QUFBQyw4QkFBRDtBQUFBO0FBQ0Usc0JBQVUsQ0FBQyxLQUFLYSxLQUFMLENBQVdnQixTQUR4QjtBQUVFLHFCQUFTLEtBQUtmO0FBRmhCO0FBSUUsd0NBQUMscUJBQUQ7QUFKRixTQURGO0FBT0U7QUFBQywyQkFBRDtBQUFBO0FBQ0UsdUJBQVcsS0FBS0csS0FBTCxDQUFXQyxtQkFEeEI7QUFFRSxtQkFBT25CLE9BQU9NO0FBRmhCO0FBSUU7QUFBQTtBQUFBLGNBQUssS0FBS29CLGlCQUFWLEVBQTZCLE9BQU8xQixPQUFPVyxTQUEzQztBQUNHZTtBQURIO0FBSkYsU0FQRjtBQWVFO0FBQUMsOEJBQUQ7QUFBQTtBQUNFLHNCQUFVLENBQUMsS0FBS1osS0FBTCxDQUFXaUIsU0FEeEI7QUFFRSxxQkFBUyxLQUFLZDtBQUZoQjtBQUlFLHdDQUFDLHNCQUFEO0FBSkY7QUFmRixPQURGO0FBd0JEOzs7O0VBNUUyQmUsZ0I7O0FBQXhCbkIsZSxDQUNHb0IsUyxHQUFZO0FBQ2pCVCxrQkFBZ0JVLG9CQUFVQyxJQUFWLENBQWVDLFVBRGQ7QUFFakJmLGVBQWFhLG9CQUFVRyxNQUFWLENBQWlCRCxVQUZiO0FBR2pCWCxVQUFRUyxvQkFBVUksTUFBVixDQUFpQkYsVUFIUjtBQUlqQkwsYUFBV0csb0JBQVVLLElBSko7QUFLakJ2QixpQkFBZWtCLG9CQUFVQyxJQUxSO0FBTWpCTCxhQUFXSSxvQkFBVUs7QUFOSixDO0FBRGYxQixlLENBVUcyQixZLEdBQWU7QUFDcEJULGFBQVcsSUFEUztBQUVwQkQsYUFBVztBQUZTLEM7a0JBcUVUakIsZSIsImZpbGUiOiJDYWxlbmRhclRvb2xiYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgSWNvbkJ1dHRvbiBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9JY29uQnV0dG9uJztcbmltcG9ydCBTbGlkZUluVHJhbnNpdGlvbkdyb3VwIGZyb20gJy4uL2ludGVybmFsL1NsaWRlSW4nO1xuaW1wb3J0IENoZXZyb25MZWZ0IGZyb20gJ0BtYXRlcmlhbC11aS9pY29ucy9DaGV2cm9uTGVmdCc7XG5pbXBvcnQgQ2hldnJvblJpZ2h0IGZyb20gJ0BtYXRlcmlhbC11aS9pY29ucy9DaGV2cm9uUmlnaHQnO1xuXG5jb25zdCBzdHlsZXMgPSB7XG4gIHJvb3Q6IHtcbiAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcbiAgICBiYWNrZ3JvdW5kQ29sb3I6ICdpbmhlcml0JyxcbiAgICBoZWlnaHQ6IDQ4LFxuICB9LFxuICB0aXRsZURpdjoge1xuICAgIGZvbnRTaXplOiAxNCxcbiAgICBmb250V2VpZ2h0OiAnNTAwJyxcbiAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgIHdpZHRoOiAnY2FsYygxMDAlIC0gOTZweCknLFxuICB9LFxuICB0aXRsZVRleHQ6IHtcbiAgICBoZWlnaHQ6ICdpbmhlcml0JyxcbiAgICBwYWRkaW5nVG9wOiAxMixcbiAgfSxcbn07XG5cbmNsYXNzIENhbGVuZGFyVG9vbGJhciBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgRGF0ZVRpbWVGb3JtYXQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgZGlzcGxheURhdGU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBuZXh0TW9udGg6IFByb3BUeXBlcy5ib29sLFxuICAgIG9uTW9udGhDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIHByZXZNb250aDogUHJvcFR5cGVzLmJvb2wsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBuZXh0TW9udGg6IHRydWUsXG4gICAgcHJldk1vbnRoOiB0cnVlLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB0cmFuc2l0aW9uRGlyZWN0aW9uOiAndXAnLFxuICAgIH07XG4gIH1cblxuICBVTlNBRkVfY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBpZiAobmV4dFByb3BzLmRpc3BsYXlEYXRlICE9PSB0aGlzLnByb3BzLmRpc3BsYXlEYXRlKSB7XG4gICAgICBjb25zdCBkaXJlY3Rpb24gPSBuZXh0UHJvcHMuZGlzcGxheURhdGUgPiB0aGlzLnByb3BzLmRpc3BsYXlEYXRlID8gJ2xlZnQnIDogJ3JpZ2h0JztcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICB0cmFuc2l0aW9uRGlyZWN0aW9uOiBkaXJlY3Rpb24sXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVUb3VjaFRhcFByZXZNb250aCA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbk1vbnRoQ2hhbmdlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uTW9udGhDaGFuZ2UoLTEpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVUb3VjaFRhcE5leHRNb250aCA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbk1vbnRoQ2hhbmdlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uTW9udGhDaGFuZ2UoMSk7XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7RGF0ZVRpbWVGb3JtYXQsIGxvY2FsZSwgZGlzcGxheURhdGV9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IGRhdGVUaW1lRm9ybWF0dGVkID0gbmV3IERhdGVUaW1lRm9ybWF0KGxvY2FsZSwge1xuICAgICAgbW9udGg6ICdsb25nJyxcbiAgICAgIHllYXI6ICdudW1lcmljJyxcbiAgICB9KS5mb3JtYXQoZGlzcGxheURhdGUpO1xuXG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLnJvb3R9PlxuICAgICAgICA8SWNvbkJ1dHRvblxuICAgICAgICAgIGRpc2FibGVkPXshdGhpcy5wcm9wcy5wcmV2TW9udGh9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVUb3VjaFRhcFByZXZNb250aH1cbiAgICAgICAgPlxuICAgICAgICAgIDxDaGV2cm9uTGVmdCAvPlxuICAgICAgICA8L0ljb25CdXR0b24+XG4gICAgICAgIDxTbGlkZUluVHJhbnNpdGlvbkdyb3VwXG4gICAgICAgICAgZGlyZWN0aW9uPXt0aGlzLnN0YXRlLnRyYW5zaXRpb25EaXJlY3Rpb259XG4gICAgICAgICAgc3R5bGU9e3N0eWxlcy50aXRsZURpdn1cbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYga2V5PXtkYXRlVGltZUZvcm1hdHRlZH0gc3R5bGU9e3N0eWxlcy50aXRsZVRleHR9PlxuICAgICAgICAgICAge2RhdGVUaW1lRm9ybWF0dGVkfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L1NsaWRlSW5UcmFuc2l0aW9uR3JvdXA+XG4gICAgICAgIDxJY29uQnV0dG9uXG4gICAgICAgICAgZGlzYWJsZWQ9eyF0aGlzLnByb3BzLm5leHRNb250aH1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZVRvdWNoVGFwTmV4dE1vbnRofVxuICAgICAgICA+XG4gICAgICAgICAgPENoZXZyb25SaWdodCAvPlxuICAgICAgICA8L0ljb25CdXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENhbGVuZGFyVG9vbGJhcjtcbiJdfQ==