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

var _SlideInChild = require('./SlideInChild');

var _SlideInChild2 = _interopRequireDefault(_SlideInChild);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SlideIn = function (_Component) {
  _inherits(SlideIn, _Component);

  function SlideIn() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SlideIn);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SlideIn.__proto__ || Object.getPrototypeOf(SlideIn)).call.apply(_ref, [this].concat(args))), _this), _this.getLeaveDirection = function () {
      return _this.props.direction;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SlideIn, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          enterDelay = _props.enterDelay,
          children = _props.children,
          childStyle = _props.childStyle,
          direction = _props.direction,
          style = _props.style,
          other = _objectWithoutProperties(_props, ['enterDelay', 'children', 'childStyle', 'direction', 'style']);

      var prepareStyles = this.context.muiTheme.prepareStyles;


      var mergedRootStyles = (0, _simpleAssign2.default)({}, {
        position: 'relative',
        overflow: 'hidden',
        height: '100%'
      }, style);

      var newChildren = _react2.default.Children.map(children, function (child) {
        return _react2.default.createElement(
          _SlideInChild2.default,
          {
            key: child.key,
            direction: direction,
            enterDelay: enterDelay,
            getLeaveDirection: _this2.getLeaveDirection,
            style: childStyle
          },
          child
        );
      }, this);

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

  return SlideIn;
}(_react.Component);

SlideIn.propTypes = {
  childStyle: _propTypes2.default.object,
  children: _propTypes2.default.node,
  direction: _propTypes2.default.oneOf(['left', 'right', 'up', 'down']),
  enterDelay: _propTypes2.default.number,
  style: _propTypes2.default.object
};
SlideIn.defaultProps = {
  enterDelay: 0,
  direction: 'left'
};
SlideIn.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
exports.default = SlideIn;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbnRlcm5hbC9TbGlkZUluLmpzIl0sIm5hbWVzIjpbIlNsaWRlSW4iLCJnZXRMZWF2ZURpcmVjdGlvbiIsInByb3BzIiwiZGlyZWN0aW9uIiwiZW50ZXJEZWxheSIsImNoaWxkcmVuIiwiY2hpbGRTdHlsZSIsInN0eWxlIiwib3RoZXIiLCJwcmVwYXJlU3R5bGVzIiwiY29udGV4dCIsIm11aVRoZW1lIiwibWVyZ2VkUm9vdFN0eWxlcyIsInBvc2l0aW9uIiwib3ZlcmZsb3ciLCJoZWlnaHQiLCJuZXdDaGlsZHJlbiIsIlJlYWN0IiwiQ2hpbGRyZW4iLCJtYXAiLCJjaGlsZCIsImtleSIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsIm9iamVjdCIsIm5vZGUiLCJvbmVPZiIsIm51bWJlciIsImRlZmF1bHRQcm9wcyIsImNvbnRleHRUeXBlcyIsImlzUmVxdWlyZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRU1BLE87Ozs7Ozs7Ozs7Ozs7O3dMQWtCSkMsaUIsR0FBb0IsWUFBTTtBQUN4QixhQUFPLE1BQUtDLEtBQUwsQ0FBV0MsU0FBbEI7QUFDRCxLOzs7Ozs2QkFFUTtBQUFBOztBQUFBLG1CQVFILEtBQUtELEtBUkY7QUFBQSxVQUVMRSxVQUZLLFVBRUxBLFVBRks7QUFBQSxVQUdMQyxRQUhLLFVBR0xBLFFBSEs7QUFBQSxVQUlMQyxVQUpLLFVBSUxBLFVBSks7QUFBQSxVQUtMSCxTQUxLLFVBS0xBLFNBTEs7QUFBQSxVQU1MSSxLQU5LLFVBTUxBLEtBTks7QUFBQSxVQU9GQyxLQVBFOztBQUFBLFVBVUFDLGFBVkEsR0FVaUIsS0FBS0MsT0FBTCxDQUFhQyxRQVY5QixDQVVBRixhQVZBOzs7QUFZUCxVQUFNRyxtQkFBbUIsNEJBQWMsRUFBZCxFQUFrQjtBQUN6Q0Msa0JBQVUsVUFEK0I7QUFFekNDLGtCQUFVLFFBRitCO0FBR3pDQyxnQkFBUTtBQUhpQyxPQUFsQixFQUl0QlIsS0FKc0IsQ0FBekI7O0FBTUEsVUFBTVMsY0FBY0MsZ0JBQU1DLFFBQU4sQ0FBZUMsR0FBZixDQUFtQmQsUUFBbkIsRUFBNkIsVUFBQ2UsS0FBRCxFQUFXO0FBQzFELGVBQ0U7QUFBQyxnQ0FBRDtBQUFBO0FBQ0UsaUJBQUtBLE1BQU1DLEdBRGI7QUFFRSx1QkFBV2xCLFNBRmI7QUFHRSx3QkFBWUMsVUFIZDtBQUlFLCtCQUFtQixPQUFLSCxpQkFKMUI7QUFLRSxtQkFBT0s7QUFMVDtBQU9HYztBQVBILFNBREY7QUFXRCxPQVptQixFQVlqQixJQVppQixDQUFwQjs7QUFjQSxhQUNFO0FBQUMsaUNBQUQ7QUFBQSxxQkFDTVosS0FETjtBQUVFLGlCQUFPQyxjQUFjRyxnQkFBZCxDQUZUO0FBR0UscUJBQVU7QUFIWjtBQUtHSTtBQUxILE9BREY7QUFTRDs7OztFQS9EbUJNLGdCOztBQUFoQnRCLE8sQ0FDR3VCLFMsR0FBWTtBQUNqQmpCLGNBQVlrQixvQkFBVUMsTUFETDtBQUVqQnBCLFlBQVVtQixvQkFBVUUsSUFGSDtBQUdqQnZCLGFBQVdxQixvQkFBVUcsS0FBVixDQUFnQixDQUFDLE1BQUQsRUFBUyxPQUFULEVBQWtCLElBQWxCLEVBQXdCLE1BQXhCLENBQWhCLENBSE07QUFJakJ2QixjQUFZb0Isb0JBQVVJLE1BSkw7QUFLakJyQixTQUFPaUIsb0JBQVVDO0FBTEEsQztBQURmekIsTyxDQVNHNkIsWSxHQUFlO0FBQ3BCekIsY0FBWSxDQURRO0FBRXBCRCxhQUFXO0FBRlMsQztBQVRsQkgsTyxDQWNHOEIsWSxHQUFlO0FBQ3BCbkIsWUFBVWEsb0JBQVVDLE1BQVYsQ0FBaUJNO0FBRFAsQztrQkFvRFQvQixPIiwiZmlsZSI6IlNsaWRlSW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgUmVhY3RUcmFuc2l0aW9uR3JvdXAgZnJvbSAncmVhY3QtdHJhbnNpdGlvbi1ncm91cC9UcmFuc2l0aW9uR3JvdXAnO1xuaW1wb3J0IFNsaWRlSW5DaGlsZCBmcm9tICcuL1NsaWRlSW5DaGlsZCc7XG5cbmNsYXNzIFNsaWRlSW4gZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNoaWxkU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuICAgIGRpcmVjdGlvbjogUHJvcFR5cGVzLm9uZU9mKFsnbGVmdCcsICdyaWdodCcsICd1cCcsICdkb3duJ10pLFxuICAgIGVudGVyRGVsYXk6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgc3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBlbnRlckRlbGF5OiAwLFxuICAgIGRpcmVjdGlvbjogJ2xlZnQnLFxuICB9O1xuXG4gIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgbXVpVGhlbWU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgfTtcblxuICBnZXRMZWF2ZURpcmVjdGlvbiA9ICgpID0+IHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5kaXJlY3Rpb247XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGVudGVyRGVsYXksXG4gICAgICBjaGlsZHJlbixcbiAgICAgIGNoaWxkU3R5bGUsXG4gICAgICBkaXJlY3Rpb24sXG4gICAgICBzdHlsZSxcbiAgICAgIC4uLm90aGVyXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCB7cHJlcGFyZVN0eWxlc30gPSB0aGlzLmNvbnRleHQubXVpVGhlbWU7XG5cbiAgICBjb25zdCBtZXJnZWRSb290U3R5bGVzID0gT2JqZWN0LmFzc2lnbih7fSwge1xuICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICB9LCBzdHlsZSk7XG5cbiAgICBjb25zdCBuZXdDaGlsZHJlbiA9IFJlYWN0LkNoaWxkcmVuLm1hcChjaGlsZHJlbiwgKGNoaWxkKSA9PiB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8U2xpZGVJbkNoaWxkXG4gICAgICAgICAga2V5PXtjaGlsZC5rZXl9XG4gICAgICAgICAgZGlyZWN0aW9uPXtkaXJlY3Rpb259XG4gICAgICAgICAgZW50ZXJEZWxheT17ZW50ZXJEZWxheX1cbiAgICAgICAgICBnZXRMZWF2ZURpcmVjdGlvbj17dGhpcy5nZXRMZWF2ZURpcmVjdGlvbn1cbiAgICAgICAgICBzdHlsZT17Y2hpbGRTdHlsZX1cbiAgICAgICAgPlxuICAgICAgICAgIHtjaGlsZH1cbiAgICAgICAgPC9TbGlkZUluQ2hpbGQ+XG4gICAgICApO1xuICAgIH0sIHRoaXMpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxSZWFjdFRyYW5zaXRpb25Hcm91cFxuICAgICAgICB7Li4ub3RoZXJ9XG4gICAgICAgIHN0eWxlPXtwcmVwYXJlU3R5bGVzKG1lcmdlZFJvb3RTdHlsZXMpfVxuICAgICAgICBjb21wb25lbnQ9XCJkaXZcIlxuICAgICAgPlxuICAgICAgICB7bmV3Q2hpbGRyZW59XG4gICAgICA8L1JlYWN0VHJhbnNpdGlvbkdyb3VwPlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2xpZGVJbjtcbiJdfQ==