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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getStyles(props) {
  var isLandscape = props.mode === 'landscape';

  var styles = {
    label: {
      marginRight: '5px',
      textTransform: 'capitalize',
      fontWeight: 'bold',
      whiteSpace: 'nowrap',
      overflowX: 'hidden',
      textOverflow: 'ellipsis'
    },
    root: {
      width: isLandscape ? 165 : '100%',
      height: isLandscape ? 330 : 'auto',
      float: isLandscape ? 'left' : 'none',
      fontWeight: 700,
      display: 'inline-block',
      borderTopLeftRadius: 2,
      borderTopRightRadius: isLandscape ? 0 : 2,
      borderBottomLeftRadius: isLandscape ? 2 : 0,
      color: '#757575',
      padding: 10,
      borderBottom: '1px solid #e0e0e0',
      boxSizing: 'border-box',
      textAlign: 'center'
    },
    text: {
      fontSize: 16,
      height: props.mode === 'landscape' ? '100%' : 16,
      width: '100%',
      fontWeight: '500'
    }
  };

  return styles;
}

var DateRangeStatusDisplay = function (_Component) {
  _inherits(DateRangeStatusDisplay, _Component);

  function DateRangeStatusDisplay() {
    _classCallCheck(this, DateRangeStatusDisplay);

    return _possibleConstructorReturn(this, (DateRangeStatusDisplay.__proto__ || Object.getPrototypeOf(DateRangeStatusDisplay)).apply(this, arguments));
  }

  _createClass(DateRangeStatusDisplay, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          displayTime = _props.displayTime,
          edit = _props.edit,
          endLabel = _props.endLabel,
          mode = _props.mode,
          startLabel = _props.startLabel,
          style = _props.style,
          other = _objectWithoutProperties(_props, ['displayTime', 'edit', 'endLabel', 'mode', 'startLabel', 'style']);

      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context);
      var status = !displayTime ? 'Date' : 'Time';
      var label = edit === 'start' ? startLabel : endLabel;
      var defaultLabel = edit === 'start' ? 'pick up' : 'drop off';
      return _react2.default.createElement(
        'div',
        _extends({}, other, { style: prepareStyles(styles.root, style) }),
        _react2.default.createElement(
          'div',
          { style: styles.text },
          _react2.default.createElement(
            'div',
            { style: styles.label },
            label ? label + ' ' + status : defaultLabel + ' ' + status
          )
        )
      );
    }
  }]);

  return DateRangeStatusDisplay;
}(_react.Component);

DateRangeStatusDisplay.propTypes = {
  displayTime: _propTypes2.default.bool,
  edit: _propTypes2.default.string,
  endLabel: _propTypes2.default.string,
  mode: _propTypes2.default.oneOf(['portrait', 'landscape']),
  startLabel: _propTypes2.default.string,
  style: _propTypes2.default.object
};
DateRangeStatusDisplay.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
exports.default = DateRangeStatusDisplay;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9EYXRlUGlja2VyL0RhdGVSYW5nZVN0YXR1c0Rpc3BsYXkuanMiXSwibmFtZXMiOlsiZ2V0U3R5bGVzIiwicHJvcHMiLCJpc0xhbmRzY2FwZSIsIm1vZGUiLCJzdHlsZXMiLCJsYWJlbCIsIm1hcmdpblJpZ2h0IiwidGV4dFRyYW5zZm9ybSIsImZvbnRXZWlnaHQiLCJ3aGl0ZVNwYWNlIiwib3ZlcmZsb3dYIiwidGV4dE92ZXJmbG93Iiwicm9vdCIsIndpZHRoIiwiaGVpZ2h0IiwiZmxvYXQiLCJkaXNwbGF5IiwiYm9yZGVyVG9wTGVmdFJhZGl1cyIsImJvcmRlclRvcFJpZ2h0UmFkaXVzIiwiYm9yZGVyQm90dG9tTGVmdFJhZGl1cyIsImNvbG9yIiwicGFkZGluZyIsImJvcmRlckJvdHRvbSIsImJveFNpemluZyIsInRleHRBbGlnbiIsInRleHQiLCJmb250U2l6ZSIsIkRhdGVSYW5nZVN0YXR1c0Rpc3BsYXkiLCJkaXNwbGF5VGltZSIsImVkaXQiLCJlbmRMYWJlbCIsInN0YXJ0TGFiZWwiLCJzdHlsZSIsIm90aGVyIiwicHJlcGFyZVN0eWxlcyIsImNvbnRleHQiLCJtdWlUaGVtZSIsInN0YXR1cyIsImRlZmF1bHRMYWJlbCIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsImJvb2wiLCJzdHJpbmciLCJvbmVPZiIsIm9iamVjdCIsImNvbnRleHRUeXBlcyIsImlzUmVxdWlyZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUVBLFNBQVNBLFNBQVQsQ0FBbUJDLEtBQW5CLEVBQTBCO0FBQ3hCLE1BQU1DLGNBQWNELE1BQU1FLElBQU4sS0FBZSxXQUFuQzs7QUFFQSxNQUFNQyxTQUFTO0FBQ2JDLFdBQU87QUFDTEMsbUJBQWEsS0FEUjtBQUVMQyxxQkFBZSxZQUZWO0FBR0xDLGtCQUFZLE1BSFA7QUFJTEMsa0JBQVksUUFKUDtBQUtMQyxpQkFBVyxRQUxOO0FBTUxDLG9CQUFjO0FBTlQsS0FETTtBQVNiQyxVQUFNO0FBQ0pDLGFBQU9YLGNBQWMsR0FBZCxHQUFvQixNQUR2QjtBQUVKWSxjQUFRWixjQUFjLEdBQWQsR0FBb0IsTUFGeEI7QUFHSmEsYUFBT2IsY0FBYyxNQUFkLEdBQXVCLE1BSDFCO0FBSUpNLGtCQUFZLEdBSlI7QUFLSlEsZUFBUyxjQUxMO0FBTUpDLDJCQUFxQixDQU5qQjtBQU9KQyw0QkFBc0JoQixjQUFjLENBQWQsR0FBa0IsQ0FQcEM7QUFRSmlCLDhCQUF3QmpCLGNBQWMsQ0FBZCxHQUFrQixDQVJ0QztBQVNKa0IsYUFBTyxTQVRIO0FBVUpDLGVBQVMsRUFWTDtBQVdKQyxvQkFBYyxtQkFYVjtBQVlKQyxpQkFBVyxZQVpQO0FBYUpDLGlCQUFXO0FBYlAsS0FUTztBQXdCYkMsVUFBTTtBQUNKQyxnQkFBVSxFQUROO0FBRUpaLGNBQVFiLE1BQU1FLElBQU4sS0FBZSxXQUFmLEdBQTZCLE1BQTdCLEdBQXNDLEVBRjFDO0FBR0pVLGFBQU8sTUFISDtBQUlKTCxrQkFBWTtBQUpSO0FBeEJPLEdBQWY7O0FBZ0NBLFNBQU9KLE1BQVA7QUFDRDs7SUFFS3VCLHNCOzs7Ozs7Ozs7Ozs2QkFjSztBQUFBLG1CQVNILEtBQUsxQixLQVRGO0FBQUEsVUFFTDJCLFdBRkssVUFFTEEsV0FGSztBQUFBLFVBR0xDLElBSEssVUFHTEEsSUFISztBQUFBLFVBSUxDLFFBSkssVUFJTEEsUUFKSztBQUFBLFVBS0wzQixJQUxLLFVBS0xBLElBTEs7QUFBQSxVQU1MNEIsVUFOSyxVQU1MQSxVQU5LO0FBQUEsVUFPTEMsS0FQSyxVQU9MQSxLQVBLO0FBQUEsVUFRRkMsS0FSRTs7QUFBQSxVQVdBQyxhQVhBLEdBV2lCLEtBQUtDLE9BQUwsQ0FBYUMsUUFYOUIsQ0FXQUYsYUFYQTs7QUFZUCxVQUFNOUIsU0FBU0osVUFBVSxLQUFLQyxLQUFmLEVBQXNCLEtBQUtrQyxPQUEzQixDQUFmO0FBQ0EsVUFBTUUsU0FBVSxDQUFDVCxXQUFELEdBQWUsTUFBZixHQUF3QixNQUF4QztBQUNBLFVBQU12QixRQUFTd0IsU0FBUyxPQUFULEdBQW1CRSxVQUFuQixHQUFnQ0QsUUFBL0M7QUFDQSxVQUFNUSxlQUFnQlQsU0FBUyxPQUFULEdBQW1CLFNBQW5CLEdBQStCLFVBQXJEO0FBQ0EsYUFDRTtBQUFBO0FBQUEscUJBQVNJLEtBQVQsSUFBZ0IsT0FBT0MsY0FBYzlCLE9BQU9RLElBQXJCLEVBQTJCb0IsS0FBM0IsQ0FBdkI7QUFFRTtBQUFBO0FBQUEsWUFBSyxPQUFPNUIsT0FBT3FCLElBQW5CO0FBQ0U7QUFBQTtBQUFBLGNBQUssT0FBT3JCLE9BQU9DLEtBQW5CO0FBQ0lBLG9CQUFXQSxLQUFYLFNBQW9CZ0MsTUFBcEIsR0FBa0NDLFlBQWxDLFNBQWtERDtBQUR0RDtBQURGO0FBRkYsT0FERjtBQVdEOzs7O0VBekNrQ0UsZ0I7O0FBQS9CWixzQixDQUNHYSxTLEdBQVk7QUFDakJaLGVBQWFhLG9CQUFVQyxJQUROO0FBRWpCYixRQUFNWSxvQkFBVUUsTUFGQztBQUdqQmIsWUFBVVcsb0JBQVVFLE1BSEg7QUFJakJ4QyxRQUFNc0Msb0JBQVVHLEtBQVYsQ0FBZ0IsQ0FBQyxVQUFELEVBQWEsV0FBYixDQUFoQixDQUpXO0FBS2pCYixjQUFZVSxvQkFBVUUsTUFMTDtBQU1qQlgsU0FBT1Msb0JBQVVJO0FBTkEsQztBQURmbEIsc0IsQ0FVR21CLFksR0FBZTtBQUNwQlYsWUFBVUssb0JBQVVJLE1BQVYsQ0FBaUJFO0FBRFAsQztrQkFrQ1RwQixzQiIsImZpbGUiOiJEYXRlUmFuZ2VTdGF0dXNEaXNwbGF5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5mdW5jdGlvbiBnZXRTdHlsZXMocHJvcHMpIHtcbiAgY29uc3QgaXNMYW5kc2NhcGUgPSBwcm9wcy5tb2RlID09PSAnbGFuZHNjYXBlJztcblxuICBjb25zdCBzdHlsZXMgPSB7XG4gICAgbGFiZWw6IHtcbiAgICAgIG1hcmdpblJpZ2h0OiAnNXB4JyxcbiAgICAgIHRleHRUcmFuc2Zvcm06ICdjYXBpdGFsaXplJyxcbiAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICAgICAgb3ZlcmZsb3dYOiAnaGlkZGVuJyxcbiAgICAgIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJyxcbiAgICB9LFxuICAgIHJvb3Q6IHtcbiAgICAgIHdpZHRoOiBpc0xhbmRzY2FwZSA/IDE2NSA6ICcxMDAlJyxcbiAgICAgIGhlaWdodDogaXNMYW5kc2NhcGUgPyAzMzAgOiAnYXV0bycsXG4gICAgICBmbG9hdDogaXNMYW5kc2NhcGUgPyAnbGVmdCcgOiAnbm9uZScsXG4gICAgICBmb250V2VpZ2h0OiA3MDAsXG4gICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgIGJvcmRlclRvcExlZnRSYWRpdXM6IDIsXG4gICAgICBib3JkZXJUb3BSaWdodFJhZGl1czogaXNMYW5kc2NhcGUgPyAwIDogMixcbiAgICAgIGJvcmRlckJvdHRvbUxlZnRSYWRpdXM6IGlzTGFuZHNjYXBlID8gMiA6IDAsXG4gICAgICBjb2xvcjogJyM3NTc1NzUnLFxuICAgICAgcGFkZGluZzogMTAsXG4gICAgICBib3JkZXJCb3R0b206ICcxcHggc29saWQgI2UwZTBlMCcsXG4gICAgICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgfSxcbiAgICB0ZXh0OiB7XG4gICAgICBmb250U2l6ZTogMTYsXG4gICAgICBoZWlnaHQ6IHByb3BzLm1vZGUgPT09ICdsYW5kc2NhcGUnID8gJzEwMCUnIDogMTYsXG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgZm9udFdlaWdodDogJzUwMCcsXG4gICAgfSxcbiAgfTtcblxuICByZXR1cm4gc3R5bGVzO1xufVxuXG5jbGFzcyBEYXRlUmFuZ2VTdGF0dXNEaXNwbGF5IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBkaXNwbGF5VGltZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgZWRpdDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBlbmRMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtb2RlOiBQcm9wVHlwZXMub25lT2YoWydwb3J0cmFpdCcsICdsYW5kc2NhcGUnXSksXG4gICAgc3RhcnRMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgfTtcblxuICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgIG11aVRoZW1lOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGRpc3BsYXlUaW1lLFxuICAgICAgZWRpdCxcbiAgICAgIGVuZExhYmVsLFxuICAgICAgbW9kZSwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgc3RhcnRMYWJlbCxcbiAgICAgIHN0eWxlLFxuICAgICAgLi4ub3RoZXJcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHtwcmVwYXJlU3R5bGVzfSA9IHRoaXMuY29udGV4dC5tdWlUaGVtZTtcbiAgICBjb25zdCBzdHlsZXMgPSBnZXRTdHlsZXModGhpcy5wcm9wcywgdGhpcy5jb250ZXh0KTtcbiAgICBjb25zdCBzdGF0dXMgPSAoIWRpc3BsYXlUaW1lID8gJ0RhdGUnIDogJ1RpbWUnKTtcbiAgICBjb25zdCBsYWJlbCA9IChlZGl0ID09PSAnc3RhcnQnID8gc3RhcnRMYWJlbCA6IGVuZExhYmVsKTtcbiAgICBjb25zdCBkZWZhdWx0TGFiZWwgPSAoZWRpdCA9PT0gJ3N0YXJ0JyA/ICdwaWNrIHVwJyA6ICdkcm9wIG9mZicpO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHsuLi5vdGhlcn0gc3R5bGU9e3ByZXBhcmVTdHlsZXMoc3R5bGVzLnJvb3QsIHN0eWxlKX0+XG5cbiAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLnRleHR9PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5sYWJlbH0+XG4gICAgICAgICAgICB7KGxhYmVsID8gYCR7bGFiZWx9ICR7c3RhdHVzfWAgOiBgJHtkZWZhdWx0TGFiZWx9ICR7c3RhdHVzfWApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEYXRlUmFuZ2VTdGF0dXNEaXNwbGF5O1xuIl19