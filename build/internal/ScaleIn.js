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

var _TransitionGroup = require('react-transition-group/TransitionGroup');

var _TransitionGroup2 = _interopRequireDefault(_TransitionGroup);

var _ScaleInChild = require('./ScaleInChild');

var _ScaleInChild2 = _interopRequireDefault(_ScaleInChild);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScaleIn = function (_Component) {
  _inherits(ScaleIn, _Component);

  function ScaleIn() {
    _classCallCheck(this, ScaleIn);

    return _possibleConstructorReturn(this, (ScaleIn.__proto__ || Object.getPrototypeOf(ScaleIn)).apply(this, arguments));
  }

  _createClass(ScaleIn, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          childStyle = _props.childStyle,
          enterDelay = _props.enterDelay,
          maxScale = _props.maxScale,
          minScale = _props.minScale,
          style = _props.style,
          other = _objectWithoutProperties(_props, ['children', 'childStyle', 'enterDelay', 'maxScale', 'minScale', 'style']);

      var prepareStyles = this.context.muiTheme.prepareStyles;


      var mergedRootStyles = (0, _simpleAssign2.default)({}, {
        position: 'relative',
        height: '100%'
      }, style);

      var newChildren = _react2.default.Children.map(children, function (child) {
        return _react2.default.createElement(
          _ScaleInChild2.default,
          {
            key: child.key,
            enterDelay: enterDelay,
            maxScale: maxScale,
            minScale: minScale,
            style: childStyle
          },
          child
        );
      });

      return _react2.default.createElement(
        _TransitionGroup2.default,
        _extends({}, other, {
          style: prepareStyles(mergedRootStyles),
          component: 'div'
        }),
        newChildren
      );
    }
  }]);

  return ScaleIn;
}(_react.Component);

ScaleIn.propTypes = {
  childStyle: _propTypes2.default.object,
  children: _propTypes2.default.node,
  enterDelay: _propTypes2.default.number,
  maxScale: _propTypes2.default.number,
  minScale: _propTypes2.default.number,
  /**
   * Override the inline-styles of the root element.
   */
  style: _propTypes2.default.object
};
ScaleIn.defaultProps = {
  enterDelay: 0
};
ScaleIn.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
exports.default = ScaleIn;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbnRlcm5hbC9TY2FsZUluLmpzIl0sIm5hbWVzIjpbIlNjYWxlSW4iLCJwcm9wcyIsImNoaWxkcmVuIiwiY2hpbGRTdHlsZSIsImVudGVyRGVsYXkiLCJtYXhTY2FsZSIsIm1pblNjYWxlIiwic3R5bGUiLCJvdGhlciIsInByZXBhcmVTdHlsZXMiLCJjb250ZXh0IiwibXVpVGhlbWUiLCJtZXJnZWRSb290U3R5bGVzIiwicG9zaXRpb24iLCJoZWlnaHQiLCJuZXdDaGlsZHJlbiIsIlJlYWN0IiwiQ2hpbGRyZW4iLCJtYXAiLCJjaGlsZCIsImtleSIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsIm9iamVjdCIsIm5vZGUiLCJudW1iZXIiLCJkZWZhdWx0UHJvcHMiLCJjb250ZXh0VHlwZXMiLCJpc1JlcXVpcmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVNQSxPOzs7Ozs7Ozs7Ozs2QkFxQks7QUFBQSxtQkFTSCxLQUFLQyxLQVRGO0FBQUEsVUFFTEMsUUFGSyxVQUVMQSxRQUZLO0FBQUEsVUFHTEMsVUFISyxVQUdMQSxVQUhLO0FBQUEsVUFJTEMsVUFKSyxVQUlMQSxVQUpLO0FBQUEsVUFLTEMsUUFMSyxVQUtMQSxRQUxLO0FBQUEsVUFNTEMsUUFOSyxVQU1MQSxRQU5LO0FBQUEsVUFPTEMsS0FQSyxVQU9MQSxLQVBLO0FBQUEsVUFRRkMsS0FSRTs7QUFBQSxVQVdBQyxhQVhBLEdBV2lCLEtBQUtDLE9BQUwsQ0FBYUMsUUFYOUIsQ0FXQUYsYUFYQTs7O0FBYVAsVUFBTUcsbUJBQW1CLDRCQUFjLEVBQWQsRUFBa0I7QUFDekNDLGtCQUFVLFVBRCtCO0FBRXpDQyxnQkFBUTtBQUZpQyxPQUFsQixFQUd0QlAsS0FIc0IsQ0FBekI7O0FBS0EsVUFBTVEsY0FBY0MsZ0JBQU1DLFFBQU4sQ0FBZUMsR0FBZixDQUFtQmhCLFFBQW5CLEVBQTZCLFVBQUNpQixLQUFELEVBQVc7QUFDMUQsZUFDRTtBQUFDLGdDQUFEO0FBQUE7QUFDRSxpQkFBS0EsTUFBTUMsR0FEYjtBQUVFLHdCQUFZaEIsVUFGZDtBQUdFLHNCQUFVQyxRQUhaO0FBSUUsc0JBQVVDLFFBSlo7QUFLRSxtQkFBT0g7QUFMVDtBQU9HZ0I7QUFQSCxTQURGO0FBV0QsT0FabUIsQ0FBcEI7O0FBY0EsYUFDRTtBQUFDLGlDQUFEO0FBQUEscUJBQ01YLEtBRE47QUFFRSxpQkFBT0MsY0FBY0csZ0JBQWQsQ0FGVDtBQUdFLHFCQUFVO0FBSFo7QUFLR0c7QUFMSCxPQURGO0FBU0Q7Ozs7RUE5RG1CTSxnQjs7QUFBaEJyQixPLENBQ0dzQixTLEdBQVk7QUFDakJuQixjQUFZb0Isb0JBQVVDLE1BREw7QUFFakJ0QixZQUFVcUIsb0JBQVVFLElBRkg7QUFHakJyQixjQUFZbUIsb0JBQVVHLE1BSEw7QUFJakJyQixZQUFVa0Isb0JBQVVHLE1BSkg7QUFLakJwQixZQUFVaUIsb0JBQVVHLE1BTEg7QUFNakI7OztBQUdBbkIsU0FBT2dCLG9CQUFVQztBQVRBLEM7QUFEZnhCLE8sQ0FhRzJCLFksR0FBZTtBQUNwQnZCLGNBQVk7QUFEUSxDO0FBYmxCSixPLENBaUJHNEIsWSxHQUFlO0FBQ3BCakIsWUFBVVksb0JBQVVDLE1BQVYsQ0FBaUJLO0FBRFAsQztrQkFnRFQ3QixPIiwiZmlsZSI6IlNjYWxlSW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgUmVhY3RUcmFuc2l0aW9uR3JvdXAgZnJvbSAncmVhY3QtdHJhbnNpdGlvbi1ncm91cC9UcmFuc2l0aW9uR3JvdXAnO1xuaW1wb3J0IFNjYWxlSW5DaGlsZCBmcm9tICcuL1NjYWxlSW5DaGlsZCc7XG5cbmNsYXNzIFNjYWxlSW4gZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNoaWxkU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuICAgIGVudGVyRGVsYXk6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgbWF4U2NhbGU6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgbWluU2NhbGU6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhlIGlubGluZS1zdHlsZXMgb2YgdGhlIHJvb3QgZWxlbWVudC5cbiAgICAgKi9cbiAgICBzdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGVudGVyRGVsYXk6IDAsXG4gIH07XG5cbiAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICBtdWlUaGVtZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBjaGlsZHJlbixcbiAgICAgIGNoaWxkU3R5bGUsXG4gICAgICBlbnRlckRlbGF5LFxuICAgICAgbWF4U2NhbGUsXG4gICAgICBtaW5TY2FsZSxcbiAgICAgIHN0eWxlLFxuICAgICAgLi4ub3RoZXJcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHtwcmVwYXJlU3R5bGVzfSA9IHRoaXMuY29udGV4dC5tdWlUaGVtZTtcblxuICAgIGNvbnN0IG1lcmdlZFJvb3RTdHlsZXMgPSBPYmplY3QuYXNzaWduKHt9LCB7XG4gICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgIH0sIHN0eWxlKTtcblxuICAgIGNvbnN0IG5ld0NoaWxkcmVuID0gUmVhY3QuQ2hpbGRyZW4ubWFwKGNoaWxkcmVuLCAoY2hpbGQpID0+IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxTY2FsZUluQ2hpbGRcbiAgICAgICAgICBrZXk9e2NoaWxkLmtleX1cbiAgICAgICAgICBlbnRlckRlbGF5PXtlbnRlckRlbGF5fVxuICAgICAgICAgIG1heFNjYWxlPXttYXhTY2FsZX1cbiAgICAgICAgICBtaW5TY2FsZT17bWluU2NhbGV9XG4gICAgICAgICAgc3R5bGU9e2NoaWxkU3R5bGV9XG4gICAgICAgID5cbiAgICAgICAgICB7Y2hpbGR9XG4gICAgICAgIDwvU2NhbGVJbkNoaWxkPlxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHJldHVybiAoXG4gICAgICA8UmVhY3RUcmFuc2l0aW9uR3JvdXBcbiAgICAgICAgey4uLm90aGVyfVxuICAgICAgICBzdHlsZT17cHJlcGFyZVN0eWxlcyhtZXJnZWRSb290U3R5bGVzKX1cbiAgICAgICAgY29tcG9uZW50PVwiZGl2XCJcbiAgICAgID5cbiAgICAgICAge25ld0NoaWxkcmVufVxuICAgICAgPC9SZWFjdFRyYW5zaXRpb25Hcm91cD5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNjYWxlSW47XG4iXX0=