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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _autoPrefix = require('../utils/autoPrefix');

var _autoPrefix2 = _interopRequireDefault(_autoPrefix);

var _transitions = require('../styles/transitions');

var _transitions2 = _interopRequireDefault(_transitions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SlideInChild = function (_Component) {
  _inherits(SlideInChild, _Component);

  function SlideInChild() {
    _classCallCheck(this, SlideInChild);

    return _possibleConstructorReturn(this, (SlideInChild.__proto__ || Object.getPrototypeOf(SlideInChild)).apply(this, arguments));
  }

  _createClass(SlideInChild, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.enterTimer);
      clearTimeout(this.leaveTimer);
    }
  }, {
    key: 'componentWillEnter',
    value: function componentWillEnter(callback) {
      var style = _reactDom2.default.findDOMNode(this).style;
      var x = this.props.direction === 'left' ? '100%' : this.props.direction === 'right' ? '-100%' : '0';
      var y = this.props.direction === 'up' ? '100%' : this.props.direction === 'down' ? '-100%' : '0';

      style.opacity = '0';
      _autoPrefix2.default.set(style, 'transform', 'translate(' + x + ', ' + y + ')');

      this.enterTimer = setTimeout(callback, this.props.enterDelay);
    }
  }, {
    key: 'componentDidEnter',
    value: function componentDidEnter() {
      var style = _reactDom2.default.findDOMNode(this).style;
      style.opacity = '1';
      _autoPrefix2.default.set(style, 'transform', 'translate(0,0)');
    }
  }, {
    key: 'componentWillLeave',
    value: function componentWillLeave(callback) {
      var style = _reactDom2.default.findDOMNode(this).style;
      var direction = this.props.getLeaveDirection();
      var x = direction === 'left' ? '-100%' : direction === 'right' ? '100%' : '0';
      var y = direction === 'up' ? '-100%' : direction === 'down' ? '100%' : '0';

      style.opacity = '0';
      _autoPrefix2.default.set(style, 'transform', 'translate(' + x + ', ' + y + ')');

      this.leaveTimer = setTimeout(callback, 450);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          appear = _props.appear,
          children = _props.children,
          enter = _props.enter,
          enterDelay = _props.enterDelay,
          exit = _props.exit,
          getLeaveDirection = _props.getLeaveDirection,
          onExited = _props.onExited,
          style = _props.style,
          other = _objectWithoutProperties(_props, ['appear', 'children', 'enter', 'enterDelay', 'exit', 'getLeaveDirection', 'onExited', 'style']);

      var prepareStyles = this.context.muiTheme.prepareStyles;


      var mergedRootStyles = (0, _simpleAssign2.default)({}, {
        position: 'absolute',
        height: '100%',
        width: '100%',
        top: 0,
        left: 0,
        transition: _transitions2.default.easeOut(null, ['transform', 'opacity'])
      }, style);

      return _react2.default.createElement(
        'div',
        _extends({}, other, { style: prepareStyles(mergedRootStyles) }),
        children
      );
    }
  }]);

  return SlideInChild;
}(_react.Component);

SlideInChild.propTypes = {
  appear: _propTypes2.default.func,
  children: _propTypes2.default.node,
  direction: _propTypes2.default.string,
  enter: _propTypes2.default.func,
  enterDelay: _propTypes2.default.number,
  exit: _propTypes2.default.func,
  // This callback is needed bacause the direction could change when leaving the DOM
  getLeaveDirection: _propTypes2.default.func.isRequired,
  onExited: _propTypes2.default.func,
  style: _propTypes2.default.object
};
SlideInChild.defaultProps = {
  enterDelay: 0
};
SlideInChild.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
exports.default = SlideInChild;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbnRlcm5hbC9TbGlkZUluQ2hpbGQuanMiXSwibmFtZXMiOlsiU2xpZGVJbkNoaWxkIiwiY2xlYXJUaW1lb3V0IiwiZW50ZXJUaW1lciIsImxlYXZlVGltZXIiLCJjYWxsYmFjayIsInN0eWxlIiwiUmVhY3RET00iLCJmaW5kRE9NTm9kZSIsIngiLCJwcm9wcyIsImRpcmVjdGlvbiIsInkiLCJvcGFjaXR5IiwiYXV0b1ByZWZpeCIsInNldCIsInNldFRpbWVvdXQiLCJlbnRlckRlbGF5IiwiZ2V0TGVhdmVEaXJlY3Rpb24iLCJhcHBlYXIiLCJjaGlsZHJlbiIsImVudGVyIiwiZXhpdCIsIm9uRXhpdGVkIiwib3RoZXIiLCJwcmVwYXJlU3R5bGVzIiwiY29udGV4dCIsIm11aVRoZW1lIiwibWVyZ2VkUm9vdFN0eWxlcyIsInBvc2l0aW9uIiwiaGVpZ2h0Iiwid2lkdGgiLCJ0b3AiLCJsZWZ0IiwidHJhbnNpdGlvbiIsInRyYW5zaXRpb25zIiwiZWFzZU91dCIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsImZ1bmMiLCJub2RlIiwic3RyaW5nIiwibnVtYmVyIiwiaXNSZXF1aXJlZCIsIm9iamVjdCIsImRlZmF1bHRQcm9wcyIsImNvbnRleHRUeXBlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVNQSxZOzs7Ozs7Ozs7OzsyQ0FzQm1CO0FBQ3JCQyxtQkFBYSxLQUFLQyxVQUFsQjtBQUNBRCxtQkFBYSxLQUFLRSxVQUFsQjtBQUNEOzs7dUNBRWtCQyxRLEVBQVU7QUFDM0IsVUFBTUMsUUFBUUMsbUJBQVNDLFdBQVQsQ0FBcUIsSUFBckIsRUFBMkJGLEtBQXpDO0FBQ0EsVUFBTUcsSUFBSSxLQUFLQyxLQUFMLENBQVdDLFNBQVgsS0FBeUIsTUFBekIsR0FBa0MsTUFBbEMsR0FDUixLQUFLRCxLQUFMLENBQVdDLFNBQVgs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UmpCO0FBU2pCckIsWUFBVWdCLG9CQUFVQyxJQVRIO0FBVWpCbEMsU0FBT2lDLG9CQUFVTTtBQVZBLEM7QUFEZjVDLFksQ0FjRzZDLFksR0FBZTtBQUNwQjdCLGNBQVk7QUFEUSxDO0FBZGxCaEIsWSxDQWtCRzhDLFksR0FBZTtBQUNwQnBCLFlBQVVZLG9CQUFVTSxNQUFWLENBQWlCRDtBQURQLEM7a0JBMEVUM0MsWSIsImZpbGUiOiJTbGlkZUluQ2hpbGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBhdXRvUHJlZml4IGZyb20gJy4uL3V0aWxzL2F1dG9QcmVmaXgnO1xuaW1wb3J0IHRyYW5zaXRpb25zIGZyb20gJy4uL3N0eWxlcy90cmFuc2l0aW9ucyc7XG5cbmNsYXNzIFNsaWRlSW5DaGlsZCBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgYXBwZWFyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgZGlyZWN0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGVudGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBlbnRlckRlbGF5OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGV4aXQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIC8vIFRoaXMgY2FsbGJhY2sgaXMgbmVlZGVkIGJhY2F1c2UgdGhlIGRpcmVjdGlvbiBjb3VsZCBjaGFuZ2Ugd2hlbiBsZWF2aW5nIHRoZSBET01cbiAgICBnZXRMZWF2ZURpcmVjdGlvbjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvbkV4aXRlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBlbnRlckRlbGF5OiAwLFxuICB9O1xuXG4gIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgbXVpVGhlbWU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgfTtcblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5lbnRlclRpbWVyKTtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5sZWF2ZVRpbWVyKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxFbnRlcihjYWxsYmFjaykge1xuICAgIGNvbnN0IHN0eWxlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcykuc3R5bGU7XG4gICAgY29uc3QgeCA9IHRoaXMucHJvcHMuZGlyZWN0aW9uID09PSAnbGVmdCcgPyAnMTAwJScgOlxuICAgICAgdGhpcy5wcm9wcy5kaXJlY3Rpb24gPT09ICdyaWdodCcgPyAnLTEwMCUnIDogJzAnO1xuICAgIGNvbnN0IHkgPSB0aGlzLnByb3BzLmRpcmVjdGlvbiA9PT0gJ3VwJyA/ICcxMDAlJyA6XG4gICAgICB0aGlzLnByb3BzLmRpcmVjdGlvbiA9PT0gJ2Rvd24nID8gJy0xMDAlJyA6ICcwJztcblxuICAgIHN0eWxlLm9wYWNpdHkgPSAnMCc7XG4gICAgYXV0b1ByZWZpeC5zZXQoc3R5bGUsICd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKCR7eH0sICR7eX0pYCk7XG5cbiAgICB0aGlzLmVudGVyVGltZXIgPSBzZXRUaW1lb3V0KGNhbGxiYWNrLCB0aGlzLnByb3BzLmVudGVyRGVsYXkpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkRW50ZXIoKSB7XG4gICAgY29uc3Qgc3R5bGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKS5zdHlsZTtcbiAgICBzdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgIGF1dG9QcmVmaXguc2V0KHN0eWxlLCAndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgwLDApJyk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsTGVhdmUoY2FsbGJhY2spIHtcbiAgICBjb25zdCBzdHlsZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpLnN0eWxlO1xuICAgIGNvbnN0IGRpcmVjdGlvbiA9IHRoaXMucHJvcHMuZ2V0TGVhdmVEaXJlY3Rpb24oKTtcbiAgICBjb25zdCB4ID0gZGlyZWN0aW9uID09PSAnbGVmdCcgPyAnLTEwMCUnIDpcbiAgICAgIGRpcmVjdGlvbiA9PT0gJ3JpZ2h0JyA/ICcxMDAlJyA6ICcwJztcbiAgICBjb25zdCB5ID0gZGlyZWN0aW9uID09PSAndXAnID8gJy0xMDAlJyA6XG4gICAgICBkaXJlY3Rpb24gPT09ICdkb3duJyA/ICcxMDAlJyA6ICcwJztcblxuICAgIHN0eWxlLm9wYWNpdHkgPSAnMCc7XG4gICAgYXV0b1ByZWZpeC5zZXQoc3R5bGUsICd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKCR7eH0sICR7eX0pYCk7XG5cbiAgICB0aGlzLmxlYXZlVGltZXIgPSBzZXRUaW1lb3V0KGNhbGxiYWNrLCA0NTApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGFwcGVhciwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgY2hpbGRyZW4sXG4gICAgICBlbnRlciwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgZW50ZXJEZWxheSwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgZXhpdCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgZ2V0TGVhdmVEaXJlY3Rpb24sIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIG9uRXhpdGVkLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICBzdHlsZSxcbiAgICAgIC4uLm90aGVyXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCB7cHJlcGFyZVN0eWxlc30gPSB0aGlzLmNvbnRleHQubXVpVGhlbWU7XG5cbiAgICBjb25zdCBtZXJnZWRSb290U3R5bGVzID0gT2JqZWN0LmFzc2lnbih7fSwge1xuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICB0b3A6IDAsXG4gICAgICBsZWZ0OiAwLFxuICAgICAgdHJhbnNpdGlvbjogdHJhbnNpdGlvbnMuZWFzZU91dChudWxsLCBbJ3RyYW5zZm9ybScsICdvcGFjaXR5J10pLFxuICAgIH0sIHN0eWxlKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHsuLi5vdGhlcn0gc3R5bGU9e3ByZXBhcmVTdHlsZXMobWVyZ2VkUm9vdFN0eWxlcyl9PlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNsaWRlSW5DaGlsZDtcbiJdfQ==