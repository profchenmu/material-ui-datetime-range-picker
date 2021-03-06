'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {

  easeOutFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
  easeInOutFunction: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',

  easeOut: function easeOut(duration, property, delay, easeFunction) {
    easeFunction = easeFunction || this.easeOutFunction;

    if (property && Object.prototype.toString.call(property) === '[object Array]') {
      var transitions = '';
      for (var i = 0; i < property.length; i++) {
        if (transitions) transitions += ',';
        transitions += this.create(duration, property[i], delay, easeFunction);
      }

      return transitions;
    } else {
      return this.create(duration, property, delay, easeFunction);
    }
  },
  create: function create(duration, property, delay, easeFunction) {
    duration = duration || '450ms';
    property = property || 'all';
    delay = delay || '0ms';
    easeFunction = easeFunction || 'linear';

    return property + ' ' + duration + ' ' + easeFunction + ' ' + delay;
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHlsZXMvdHJhbnNpdGlvbnMuanMiXSwibmFtZXMiOlsiZWFzZU91dEZ1bmN0aW9uIiwiZWFzZUluT3V0RnVuY3Rpb24iLCJlYXNlT3V0IiwiZHVyYXRpb24iLCJwcm9wZXJ0eSIsImRlbGF5IiwiZWFzZUZ1bmN0aW9uIiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJjYWxsIiwidHJhbnNpdGlvbnMiLCJpIiwibGVuZ3RoIiwiY3JlYXRlIl0sIm1hcHBpbmdzIjoiOzs7OztrQkFBZTs7QUFFYkEsbUJBQWlCLGdDQUZKO0FBR2JDLHFCQUFtQix1Q0FITjs7QUFLYkMsU0FMYSxtQkFLTEMsUUFMSyxFQUtLQyxRQUxMLEVBS2VDLEtBTGYsRUFLc0JDLFlBTHRCLEVBS29DO0FBQy9DQSxtQkFBZUEsZ0JBQWdCLEtBQUtOLGVBQXBDOztBQUVBLFFBQUlJLFlBQVlHLE9BQU9DLFNBQVAsQ0FBaUJDLFFBQWpCLENBQTBCQyxJQUExQixDQUErQk4sUUFBL0IsTUFBNkMsZ0JBQTdELEVBQStFO0FBQzdFLFVBQUlPLGNBQWMsRUFBbEI7QUFDQSxXQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSVIsU0FBU1MsTUFBN0IsRUFBcUNELEdBQXJDLEVBQTBDO0FBQ3hDLFlBQUlELFdBQUosRUFBaUJBLGVBQWUsR0FBZjtBQUNqQkEsdUJBQWUsS0FBS0csTUFBTCxDQUFZWCxRQUFaLEVBQXNCQyxTQUFTUSxDQUFULENBQXRCLEVBQW1DUCxLQUFuQyxFQUEwQ0MsWUFBMUMsQ0FBZjtBQUNEOztBQUVELGFBQU9LLFdBQVA7QUFDRCxLQVJELE1BUU87QUFDTCxhQUFPLEtBQUtHLE1BQUwsQ0FBWVgsUUFBWixFQUFzQkMsUUFBdEIsRUFBZ0NDLEtBQWhDLEVBQXVDQyxZQUF2QyxDQUFQO0FBQ0Q7QUFDRixHQW5CWTtBQXFCYlEsUUFyQmEsa0JBcUJOWCxRQXJCTSxFQXFCSUMsUUFyQkosRUFxQmNDLEtBckJkLEVBcUJxQkMsWUFyQnJCLEVBcUJtQztBQUM5Q0gsZUFBV0EsWUFBWSxPQUF2QjtBQUNBQyxlQUFXQSxZQUFZLEtBQXZCO0FBQ0FDLFlBQVFBLFNBQVMsS0FBakI7QUFDQUMsbUJBQWVBLGdCQUFnQixRQUEvQjs7QUFFQSxXQUFVRixRQUFWLFNBQXNCRCxRQUF0QixTQUFrQ0csWUFBbEMsU0FBa0RELEtBQWxEO0FBQ0Q7QUE1QlksQyIsImZpbGUiOiJ0cmFuc2l0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcblxuICBlYXNlT3V0RnVuY3Rpb246ICdjdWJpYy1iZXppZXIoMC4yMywgMSwgMC4zMiwgMSknLFxuICBlYXNlSW5PdXRGdW5jdGlvbjogJ2N1YmljLWJlemllcigwLjQ0NSwgMC4wNSwgMC41NSwgMC45NSknLFxuXG4gIGVhc2VPdXQoZHVyYXRpb24sIHByb3BlcnR5LCBkZWxheSwgZWFzZUZ1bmN0aW9uKSB7XG4gICAgZWFzZUZ1bmN0aW9uID0gZWFzZUZ1bmN0aW9uIHx8IHRoaXMuZWFzZU91dEZ1bmN0aW9uO1xuXG4gICAgaWYgKHByb3BlcnR5ICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwcm9wZXJ0eSkgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgIGxldCB0cmFuc2l0aW9ucyA9ICcnO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wZXJ0eS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodHJhbnNpdGlvbnMpIHRyYW5zaXRpb25zICs9ICcsJztcbiAgICAgICAgdHJhbnNpdGlvbnMgKz0gdGhpcy5jcmVhdGUoZHVyYXRpb24sIHByb3BlcnR5W2ldLCBkZWxheSwgZWFzZUZ1bmN0aW9uKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRyYW5zaXRpb25zO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5jcmVhdGUoZHVyYXRpb24sIHByb3BlcnR5LCBkZWxheSwgZWFzZUZ1bmN0aW9uKTtcbiAgICB9XG4gIH0sXG5cbiAgY3JlYXRlKGR1cmF0aW9uLCBwcm9wZXJ0eSwgZGVsYXksIGVhc2VGdW5jdGlvbikge1xuICAgIGR1cmF0aW9uID0gZHVyYXRpb24gfHwgJzQ1MG1zJztcbiAgICBwcm9wZXJ0eSA9IHByb3BlcnR5IHx8ICdhbGwnO1xuICAgIGRlbGF5ID0gZGVsYXkgfHwgJzBtcyc7XG4gICAgZWFzZUZ1bmN0aW9uID0gZWFzZUZ1bmN0aW9uIHx8ICdsaW5lYXInO1xuXG4gICAgcmV0dXJuIGAke3Byb3BlcnR5fSAke2R1cmF0aW9ufSAke2Vhc2VGdW5jdGlvbn0gJHtkZWxheX1gO1xuICB9LFxufTtcbiJdfQ==