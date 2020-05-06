'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultUtils = undefined;
exports.dateTimeFormat = dateTimeFormat;
exports.getYear = getYear;
exports.setYear = setYear;
exports.addDays = addDays;
exports.addMonths = addMonths;
exports.addYears = addYears;
exports.cloneDate = cloneDate;
exports.cloneAsDate = cloneAsDate;
exports.getDaysInMonth = getDaysInMonth;
exports.getFirstDayOfMonth = getFirstDayOfMonth;
exports.getFirstDayOfWeek = getFirstDayOfWeek;
exports.getWeekArray = getWeekArray;
exports.localizedWeekday = localizedWeekday;
exports.formatIso = formatIso;
exports.isEqualDate = isEqualDate;
exports.isEqualDateTime = isEqualDateTime;
exports.isDateBetweenDateTime = isDateBetweenDateTime;
exports.isDateTimeBetweenDateTime = isDateTimeBetweenDateTime;
exports.doesDateBorderDateTime = doesDateBorderDateTime;
exports.dateBordersRange = dateBordersRange;
exports.isDateInRanges = isDateInRanges;
exports.isDateTimeInRanges = isDateTimeInRanges;
exports.isDateTimeInRangesExclusive = isDateTimeInRangesExclusive;
exports.isDateTimeBetweenDateTimeExclusive = isDateTimeBetweenDateTimeExclusive;
exports.closestRangeAfterStart = closestRangeAfterStart;
exports.isBeforeDate = isBeforeDate;
exports.isBeforeDateTime = isBeforeDateTime;
exports.isAfterDate = isAfterDate;
exports.isAfterDateTime = isAfterDateTime;
exports.isBetweenDates = isBetweenDates;
exports.monthDiff = monthDiff;
exports.yearDiff = yearDiff;

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _lodash = require('lodash.sortby');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.find');

var _lodash4 = _interopRequireDefault(_lodash3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dayAbbreviation = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
var dayList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var monthLongList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function dateTimeFormat(locale, options) {
  process.env.NODE_ENV !== "production" ? (0, _warning2.default)(locale === 'en-US', 'Material-UI: The ' + locale + ' locale is not supported by the built-in DateTimeFormat.\n  Use the `DateTimeFormat` prop to supply an alternative implementation.') : void 0;

  this.format = function (date) {
    if (options.month === 'short' && options.weekday === 'short' && options.day === '2-digit') {
      return dayList[date.getDay()] + ', ' + monthList[date.getMonth()] + ' ' + date.getDate();
    } else if (options.year === 'numeric' && options.month === 'numeric' && options.day === 'numeric') {
      return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
    } else if (options.year === 'numeric' && options.month === 'long') {
      return monthLongList[date.getMonth()] + ' ' + date.getFullYear();
    } else if (options.weekday === 'narrow') {
      return dayAbbreviation[date.getDay()];
    } else if (options.year === 'numeric') {
      return date.getFullYear().toString();
    } else if (options.day === 'numeric') {
      return date.getDate();
    } else {
      process.env.NODE_ENV !== "production" ? (0, _warning2.default)(false, 'Material-UI: Wrong usage of DateTimeFormat') : void 0;
    }
  };
}

function getYear(d) {
  return d.getFullYear();
}

function setYear(d, year) {
  var newDate = cloneDate(d);
  newDate.setFullYear(year);
  return newDate;
}

function addDays(d, days) {
  var newDate = cloneDate(d);
  newDate.setDate(d.getDate() + days);
  return newDate;
}

function addMonths(d, months) {
  var newDate = cloneDate(d);
  newDate.setMonth(d.getMonth() + months);
  return newDate;
}

function addYears(d, years) {
  var newDate = cloneDate(d);
  newDate.setFullYear(d.getFullYear() + years);
  return newDate;
}

function cloneDate(d) {
  return new Date(d.getTime());
}

function cloneAsDate(d) {
  var clonedDate = cloneDate(d);
  clonedDate.setHours(0, 0, 0, 0);
  return clonedDate;
}

function getDaysInMonth(d) {
  var resultDate = getFirstDayOfMonth(d);

  resultDate.setMonth(resultDate.getMonth() + 1);
  resultDate.setDate(resultDate.getDate() - 1);

  return resultDate.getDate();
}

function getFirstDayOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function getFirstDayOfWeek() {
  var now = new Date();
  return new Date(now.setDate(now.getDate() - now.getDay()));
}

function getWeekArray(d, firstDayOfWeek) {
  var dayArray = [];
  var daysInMonth = getDaysInMonth(d);
  var weekArray = [];
  var week = [];

  for (var i = 1; i <= daysInMonth; i++) {
    dayArray.push(new Date(d.getFullYear(), d.getMonth(), i));
  }

  var addWeek = function addWeek(week) {
    var emptyDays = 7 - week.length;
    for (var _i = 0; _i < emptyDays; ++_i) {
      week[weekArray.length ? 'push' : 'unshift'](null);
    }
    weekArray.push(week);
  };

  dayArray.forEach(function (day) {
    if (week.length > 0 && day.getDay() === firstDayOfWeek) {
      addWeek(week);
      week = [];
    }
    week.push(day);
    if (dayArray.indexOf(day) === dayArray.length - 1) {
      addWeek(week);
    }
  });

  return weekArray;
}

function localizedWeekday(DateTimeFormat, locale, day, firstDayOfWeek) {
  var weekdayFormatter = new DateTimeFormat(locale, { weekday: 'narrow' });
  var firstDayDate = getFirstDayOfWeek();

  return weekdayFormatter.format(addDays(firstDayDate, day + firstDayOfWeek));
}

// Convert date to ISO 8601 (YYYY-MM-DD) date string, accounting for current timezone
function formatIso(date) {
  return new Date(date.toDateString() + ' 12:00:00 +0000').toISOString().substring(0, 10);
}

function isEqualDate(d1, d2) {
  return d1 && d2 && d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
}

function isEqualDateTime(d1, d2) {
  return d1 && d2 && d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate() && d1.getHours() === d2.getHours();
}

function isDateBetweenDateTime(dateToCheck, startDate, endDate) {
  var startOfDate = new Date(dateToCheck.getTime()).setHours(0, 0, 0, 0);
  var endOfDate = new Date(dateToCheck.getTime()).setHours(23, 59, 59, 999);
  var start = new Date(startDate);
  var end = new Date(endDate);
  return !(startOfDate < start.getTime()) && !(endOfDate > end.getTime());
}

function isDateTimeBetweenDateTime(dateToCheck, startDate, endDate) {
  var date = new Date(dateToCheck.getTime());
  var start = new Date(startDate);
  var end = new Date(endDate);
  return date >= start.getTime() && date <= end.getTime();
  // return (!(date < start.getTime()) && !(date > end.getTime()));
}

function doesDateBorderDateTime(dateToCheck, startDate, endDate) {
  var date = new Date(dateToCheck.getTime());
  var startOfStart = new Date(startDate.getTime()).setHours(0, 0, 0, 0);
  var endOfEnd = new Date(endDate.getTime()).setHours(23, 59, 59, 999);
  return startOfStart <= date && date <= endOfEnd;
}

function dateBordersRange(ranges, day) {
  var bordersRange = false;
  if (ranges) {
    ranges.forEach(function (range) {
      if (doesDateBorderDateTime(day, range.start, range.end)) {
        bordersRange = true;
      }
    });
  }
  return bordersRange;
}

function isDateInRanges(ranges, day) {
  var inRange = false;
  if (ranges) {
    ranges.forEach(function (range) {
      if (isDateBetweenDateTime(day, range.start, range.end)) {
        inRange = true;
      }
    });
  }
  return inRange;
}

function isDateTimeInRanges(ranges, day) {
  var inRange = false;
  if (ranges) {
    ranges.forEach(function (range) {
      if (isDateTimeBetweenDateTime(day, range.start, range.end)) {
        inRange = true;
      }
    });
  }
  return inRange;
}

function isDateTimeInRangesExclusive(ranges, day) {
  var inRange = false;
  if (ranges) {
    ranges.forEach(function (range) {
      if (isDateTimeBetweenDateTimeExclusive(day, range.start, range.end)) {
        inRange = true;
      }
    });
  }
  return inRange;
}

function isDateTimeBetweenDateTimeExclusive(dateToCheck, startDate, endDate) {
  var date = new Date(dateToCheck.getTime());
  var start = new Date(startDate);
  var end = new Date(endDate);
  return date > start.getTime() && date < end.getTime();
  // return (!(date < start.getTime()) && !(date > end.getTime()));
}

function closestRangeAfterStart(ranges, start) {
  if (ranges && start) {
    ranges = (0, _lodash2.default)(ranges, function (range) {
      return range.start.getTime();
    });
    return (0, _lodash4.default)(ranges, function (range) {
      return range.start.getTime() > start.getTime();
    });
  }
  return null;
}

function isBeforeDate(d1, d2) {
  var date1 = cloneAsDate(d1);
  var date2 = cloneAsDate(d2);

  return date1.getTime() < date2.getTime();
}

function isBeforeDateTime(d1, d2) {
  return d1.getTime() < d2.getTime();
}

function isAfterDate(d1, d2) {
  var date1 = cloneAsDate(d1);
  var date2 = cloneAsDate(d2);

  return date1.getTime() > date2.getTime();
}

function isAfterDateTime(d1, d2) {
  return d1.getTime() > d2.getTime();
}

function isBetweenDates(dateToCheck, startDate, endDate) {
  return !isBeforeDate(dateToCheck, startDate) && !isAfterDate(dateToCheck, endDate);
}

function monthDiff(d1, d2) {
  var m = void 0;
  m = (d1.getFullYear() - d2.getFullYear()) * 12;
  m += d1.getMonth();
  m -= d2.getMonth();
  return m;
}

function yearDiff(d1, d2) {
  return ~~(monthDiff(d1, d2) / 12);
}

var defaultUtils = exports.defaultUtils = {
  getYear: getYear,
  setYear: setYear,
  addDays: addDays,
  addMonths: addMonths,
  addYears: addYears,
  getFirstDayOfMonth: getFirstDayOfMonth,
  getWeekArray: getWeekArray,
  monthDiff: monthDiff
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9EYXRlUGlja2VyL2RhdGVVdGlscy5qcyJdLCJuYW1lcyI6WyJkYXRlVGltZUZvcm1hdCIsImdldFllYXIiLCJzZXRZZWFyIiwiYWRkRGF5cyIsImFkZE1vbnRocyIsImFkZFllYXJzIiwiY2xvbmVEYXRlIiwiY2xvbmVBc0RhdGUiLCJnZXREYXlzSW5Nb250aCIsImdldEZpcnN0RGF5T2ZNb250aCIsImdldEZpcnN0RGF5T2ZXZWVrIiwiZ2V0V2Vla0FycmF5IiwibG9jYWxpemVkV2Vla2RheSIsImZvcm1hdElzbyIsImlzRXF1YWxEYXRlIiwiaXNFcXVhbERhdGVUaW1lIiwiaXNEYXRlQmV0d2VlbkRhdGVUaW1lIiwiaXNEYXRlVGltZUJldHdlZW5EYXRlVGltZSIsImRvZXNEYXRlQm9yZGVyRGF0ZVRpbWUiLCJkYXRlQm9yZGVyc1JhbmdlIiwiaXNEYXRlSW5SYW5nZXMiLCJpc0RhdGVUaW1lSW5SYW5nZXMiLCJpc0RhdGVUaW1lSW5SYW5nZXNFeGNsdXNpdmUiLCJpc0RhdGVUaW1lQmV0d2VlbkRhdGVUaW1lRXhjbHVzaXZlIiwiY2xvc2VzdFJhbmdlQWZ0ZXJTdGFydCIsImlzQmVmb3JlRGF0ZSIsImlzQmVmb3JlRGF0ZVRpbWUiLCJpc0FmdGVyRGF0ZSIsImlzQWZ0ZXJEYXRlVGltZSIsImlzQmV0d2VlbkRhdGVzIiwibW9udGhEaWZmIiwieWVhckRpZmYiLCJkYXlBYmJyZXZpYXRpb24iLCJkYXlMaXN0IiwibW9udGhMaXN0IiwibW9udGhMb25nTGlzdCIsImxvY2FsZSIsIm9wdGlvbnMiLCJmb3JtYXQiLCJkYXRlIiwibW9udGgiLCJ3ZWVrZGF5IiwiZGF5IiwiZ2V0RGF5IiwiZ2V0TW9udGgiLCJnZXREYXRlIiwieWVhciIsImdldEZ1bGxZZWFyIiwidG9TdHJpbmciLCJkIiwibmV3RGF0ZSIsInNldEZ1bGxZZWFyIiwiZGF5cyIsInNldERhdGUiLCJtb250aHMiLCJzZXRNb250aCIsInllYXJzIiwiRGF0ZSIsImdldFRpbWUiLCJjbG9uZWREYXRlIiwic2V0SG91cnMiLCJyZXN1bHREYXRlIiwibm93IiwiZmlyc3REYXlPZldlZWsiLCJkYXlBcnJheSIsImRheXNJbk1vbnRoIiwid2Vla0FycmF5Iiwid2VlayIsImkiLCJwdXNoIiwiYWRkV2VlayIsImVtcHR5RGF5cyIsImxlbmd0aCIsImZvckVhY2giLCJpbmRleE9mIiwiRGF0ZVRpbWVGb3JtYXQiLCJ3ZWVrZGF5Rm9ybWF0dGVyIiwiZmlyc3REYXlEYXRlIiwidG9EYXRlU3RyaW5nIiwidG9JU09TdHJpbmciLCJzdWJzdHJpbmciLCJkMSIsImQyIiwiZ2V0SG91cnMiLCJkYXRlVG9DaGVjayIsInN0YXJ0RGF0ZSIsImVuZERhdGUiLCJzdGFydE9mRGF0ZSIsImVuZE9mRGF0ZSIsInN0YXJ0IiwiZW5kIiwic3RhcnRPZlN0YXJ0IiwiZW5kT2ZFbmQiLCJyYW5nZXMiLCJib3JkZXJzUmFuZ2UiLCJyYW5nZSIsImluUmFuZ2UiLCJkYXRlMSIsImRhdGUyIiwibSIsImRlZmF1bHRVdGlscyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O1FBV2dCQSxjLEdBQUFBLGM7UUF1QkFDLE8sR0FBQUEsTztRQUlBQyxPLEdBQUFBLE87UUFNQUMsTyxHQUFBQSxPO1FBTUFDLFMsR0FBQUEsUztRQU1BQyxRLEdBQUFBLFE7UUFNQUMsUyxHQUFBQSxTO1FBSUFDLFcsR0FBQUEsVztRQU1BQyxjLEdBQUFBLGM7UUFTQUMsa0IsR0FBQUEsa0I7UUFJQUMsaUIsR0FBQUEsaUI7UUFLQUMsWSxHQUFBQSxZO1FBZ0NBQyxnQixHQUFBQSxnQjtRQVFBQyxTLEdBQUFBLFM7UUFJQUMsVyxHQUFBQSxXO1FBT0FDLGUsR0FBQUEsZTtRQVFBQyxxQixHQUFBQSxxQjtRQVFBQyx5QixHQUFBQSx5QjtRQVFBQyxzQixHQUFBQSxzQjtRQU9BQyxnQixHQUFBQSxnQjtRQVlBQyxjLEdBQUFBLGM7UUFZQUMsa0IsR0FBQUEsa0I7UUFZQUMsMkIsR0FBQUEsMkI7UUFZQUMsa0MsR0FBQUEsa0M7UUFRQUMsc0IsR0FBQUEs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dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3YXJuaW5nIGZyb20gJ3dhcm5pbmcnO1xuaW1wb3J0IHNvcnRCeSBmcm9tICdsb2Rhc2guc29ydGJ5JztcbmltcG9ydCBmaW5kIGZyb20gJ2xvZGFzaC5maW5kJztcblxuY29uc3QgZGF5QWJicmV2aWF0aW9uID0gWydTJywgJ00nLCAnVCcsICdXJywgJ1QnLCAnRicsICdTJ107XG5jb25zdCBkYXlMaXN0ID0gWydTdW4nLCAnTW9uJywgJ1R1ZScsICdXZWQnLCAnVGh1JywgJ0ZyaScsICdTYXQnXTtcbmNvbnN0IG1vbnRoTGlzdCA9IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW4nLCAnSnVsJywgJ0F1ZycsICdTZXAnLFxuICAnT2N0JywgJ05vdicsICdEZWMnXTtcbmNvbnN0IG1vbnRoTG9uZ0xpc3QgPSBbJ0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLFxuICAnSnVseScsICdBdWd1c3QnLCAnU2VwdGVtYmVyJywgJ09jdG9iZXInLCAnTm92ZW1iZXInLCAnRGVjZW1iZXInXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGRhdGVUaW1lRm9ybWF0KGxvY2FsZSwgb3B0aW9ucykge1xuICB3YXJuaW5nKGxvY2FsZSA9PT0gJ2VuLVVTJywgYE1hdGVyaWFsLVVJOiBUaGUgJHtsb2NhbGV9IGxvY2FsZSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBidWlsdC1pbiBEYXRlVGltZUZvcm1hdC5cbiAgVXNlIHRoZSBcXGBEYXRlVGltZUZvcm1hdFxcYCBwcm9wIHRvIHN1cHBseSBhbiBhbHRlcm5hdGl2ZSBpbXBsZW1lbnRhdGlvbi5gKTtcblxuICB0aGlzLmZvcm1hdCA9IGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBpZiAob3B0aW9ucy5tb250aCA9PT0gJ3Nob3J0JyAmJiBvcHRpb25zLndlZWtkYXkgPT09ICdzaG9ydCcgJiYgb3B0aW9ucy5kYXkgPT09ICcyLWRpZ2l0Jykge1xuICAgICAgcmV0dXJuIGAke2RheUxpc3RbZGF0ZS5nZXREYXkoKV19LCAke21vbnRoTGlzdFtkYXRlLmdldE1vbnRoKCldfSAke2RhdGUuZ2V0RGF0ZSgpfWA7XG4gICAgfSBlbHNlIGlmIChvcHRpb25zLnllYXIgPT09ICdudW1lcmljJyAmJiBvcHRpb25zLm1vbnRoID09PSAnbnVtZXJpYycgJiYgb3B0aW9ucy5kYXkgPT09ICdudW1lcmljJykge1xuICAgICAgcmV0dXJuIGAke2RhdGUuZ2V0TW9udGgoKSArIDF9LyR7ZGF0ZS5nZXREYXRlKCl9LyR7ZGF0ZS5nZXRGdWxsWWVhcigpfWA7XG4gICAgfSBlbHNlIGlmIChvcHRpb25zLnllYXIgPT09ICdudW1lcmljJyAmJiBvcHRpb25zLm1vbnRoID09PSAnbG9uZycpIHtcbiAgICAgIHJldHVybiBgJHttb250aExvbmdMaXN0W2RhdGUuZ2V0TW9udGgoKV19ICR7ZGF0ZS5nZXRGdWxsWWVhcigpfWA7XG4gICAgfSBlbHNlIGlmIChvcHRpb25zLndlZWtkYXkgPT09ICduYXJyb3cnKSB7XG4gICAgICByZXR1cm4gZGF5QWJicmV2aWF0aW9uW2RhdGUuZ2V0RGF5KCldO1xuICAgIH0gZWxzZSBpZiAob3B0aW9ucy55ZWFyID09PSAnbnVtZXJpYycpIHtcbiAgICAgIHJldHVybiBkYXRlLmdldEZ1bGxZZWFyKCkudG9TdHJpbmcoKTtcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMuZGF5ID09PSAnbnVtZXJpYycpIHtcbiAgICAgIHJldHVybiBkYXRlLmdldERhdGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2FybmluZyhmYWxzZSwgJ01hdGVyaWFsLVVJOiBXcm9uZyB1c2FnZSBvZiBEYXRlVGltZUZvcm1hdCcpO1xuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFllYXIoZCkge1xuICByZXR1cm4gZC5nZXRGdWxsWWVhcigpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0WWVhcihkLCB5ZWFyKSB7XG4gIGNvbnN0IG5ld0RhdGUgPSBjbG9uZURhdGUoZCk7XG4gIG5ld0RhdGUuc2V0RnVsbFllYXIoeWVhcik7XG4gIHJldHVybiBuZXdEYXRlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkRGF5cyhkLCBkYXlzKSB7XG4gIGNvbnN0IG5ld0RhdGUgPSBjbG9uZURhdGUoZCk7XG4gIG5ld0RhdGUuc2V0RGF0ZShkLmdldERhdGUoKSArIGRheXMpO1xuICByZXR1cm4gbmV3RGF0ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZE1vbnRocyhkLCBtb250aHMpIHtcbiAgY29uc3QgbmV3RGF0ZSA9IGNsb25lRGF0ZShkKTtcbiAgbmV3RGF0ZS5zZXRNb250aChkLmdldE1vbnRoKCkgKyBtb250aHMpO1xuICByZXR1cm4gbmV3RGF0ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFllYXJzKGQsIHllYXJzKSB7XG4gIGNvbnN0IG5ld0RhdGUgPSBjbG9uZURhdGUoZCk7XG4gIG5ld0RhdGUuc2V0RnVsbFllYXIoZC5nZXRGdWxsWWVhcigpICsgeWVhcnMpO1xuICByZXR1cm4gbmV3RGF0ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb25lRGF0ZShkKSB7XG4gIHJldHVybiBuZXcgRGF0ZShkLmdldFRpbWUoKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9uZUFzRGF0ZShkKSB7XG4gIGNvbnN0IGNsb25lZERhdGUgPSBjbG9uZURhdGUoZCk7XG4gIGNsb25lZERhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gIHJldHVybiBjbG9uZWREYXRlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF5c0luTW9udGgoZCkge1xuICBjb25zdCByZXN1bHREYXRlID0gZ2V0Rmlyc3REYXlPZk1vbnRoKGQpO1xuXG4gIHJlc3VsdERhdGUuc2V0TW9udGgocmVzdWx0RGF0ZS5nZXRNb250aCgpICsgMSk7XG4gIHJlc3VsdERhdGUuc2V0RGF0ZShyZXN1bHREYXRlLmdldERhdGUoKSAtIDEpO1xuXG4gIHJldHVybiByZXN1bHREYXRlLmdldERhdGUoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEZpcnN0RGF5T2ZNb250aChkKSB7XG4gIHJldHVybiBuZXcgRGF0ZShkLmdldEZ1bGxZZWFyKCksIGQuZ2V0TW9udGgoKSwgMSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRGaXJzdERheU9mV2VlaygpIHtcbiAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgcmV0dXJuIG5ldyBEYXRlKG5vdy5zZXREYXRlKG5vdy5nZXREYXRlKCkgLSBub3cuZ2V0RGF5KCkpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFdlZWtBcnJheShkLCBmaXJzdERheU9mV2Vlaykge1xuICBjb25zdCBkYXlBcnJheSA9IFtdO1xuICBjb25zdCBkYXlzSW5Nb250aCA9IGdldERheXNJbk1vbnRoKGQpO1xuICBjb25zdCB3ZWVrQXJyYXkgPSBbXTtcbiAgbGV0IHdlZWsgPSBbXTtcblxuICBmb3IgKGxldCBpID0gMTsgaSA8PSBkYXlzSW5Nb250aDsgaSsrKSB7XG4gICAgZGF5QXJyYXkucHVzaChuZXcgRGF0ZShkLmdldEZ1bGxZZWFyKCksIGQuZ2V0TW9udGgoKSwgaSkpO1xuICB9XG5cbiAgY29uc3QgYWRkV2VlayA9ICh3ZWVrKSA9PiB7XG4gICAgY29uc3QgZW1wdHlEYXlzID0gNyAtIHdlZWsubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZW1wdHlEYXlzOyArK2kpIHtcbiAgICAgIHdlZWtbd2Vla0FycmF5Lmxlbmd0aCA/ICdwdXNoJyA6ICd1bnNoaWZ0J10obnVsbCk7XG4gICAgfVxuICAgIHdlZWtBcnJheS5wdXNoKHdlZWspO1xuICB9O1xuXG4gIGRheUFycmF5LmZvckVhY2goKGRheSkgPT4ge1xuICAgIGlmICh3ZWVrLmxlbmd0aCA+IDAgJiYgZGF5LmdldERheSgpID09PSBmaXJzdERheU9mV2Vlaykge1xuICAgICAgYWRkV2Vlayh3ZWVrKTtcbiAgICAgIHdlZWsgPSBbXTtcbiAgICB9XG4gICAgd2Vlay5wdXNoKGRheSk7XG4gICAgaWYgKGRheUFycmF5LmluZGV4T2YoZGF5KSA9PT0gZGF5QXJyYXkubGVuZ3RoIC0gMSkge1xuICAgICAgYWRkV2Vlayh3ZWVrKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiB3ZWVrQXJyYXk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2NhbGl6ZWRXZWVrZGF5KERhdGVUaW1lRm9ybWF0LCBsb2NhbGUsIGRheSwgZmlyc3REYXlPZldlZWspIHtcbiAgY29uc3Qgd2Vla2RheUZvcm1hdHRlciA9IG5ldyBEYXRlVGltZUZvcm1hdChsb2NhbGUsIHt3ZWVrZGF5OiAnbmFycm93J30pO1xuICBjb25zdCBmaXJzdERheURhdGUgPSBnZXRGaXJzdERheU9mV2VlaygpO1xuXG4gIHJldHVybiB3ZWVrZGF5Rm9ybWF0dGVyLmZvcm1hdChhZGREYXlzKGZpcnN0RGF5RGF0ZSwgZGF5ICsgZmlyc3REYXlPZldlZWspKTtcbn1cblxuLy8gQ29udmVydCBkYXRlIHRvIElTTyA4NjAxIChZWVlZLU1NLUREKSBkYXRlIHN0cmluZywgYWNjb3VudGluZyBmb3IgY3VycmVudCB0aW1lem9uZVxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdElzbyhkYXRlKSB7XG4gIHJldHVybiAobmV3IERhdGUoYCR7ZGF0ZS50b0RhdGVTdHJpbmcoKX0gMTI6MDA6MDAgKzAwMDBgKSkudG9JU09TdHJpbmcoKS5zdWJzdHJpbmcoMCwgMTApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNFcXVhbERhdGUoZDEsIGQyKSB7XG4gIHJldHVybiBkMSAmJiBkMiAmJlxuICAgIChkMS5nZXRGdWxsWWVhcigpID09PSBkMi5nZXRGdWxsWWVhcigpKSAmJlxuICAgIChkMS5nZXRNb250aCgpID09PSBkMi5nZXRNb250aCgpKSAmJlxuICAgIChkMS5nZXREYXRlKCkgPT09IGQyLmdldERhdGUoKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VxdWFsRGF0ZVRpbWUoZDEsIGQyKSB7XG4gIHJldHVybiBkMSAmJiBkMiAmJlxuICAgIChkMS5nZXRGdWxsWWVhcigpID09PSBkMi5nZXRGdWxsWWVhcigpKSAmJlxuICAgIChkMS5nZXRNb250aCgpID09PSBkMi5nZXRNb250aCgpKSAmJlxuICAgIChkMS5nZXREYXRlKCkgPT09IGQyLmdldERhdGUoKSkgJiZcbiAgICAoZDEuZ2V0SG91cnMoKSA9PT0gZDIuZ2V0SG91cnMoKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RhdGVCZXR3ZWVuRGF0ZVRpbWUoZGF0ZVRvQ2hlY2ssIHN0YXJ0RGF0ZSwgZW5kRGF0ZSkge1xuICBjb25zdCBzdGFydE9mRGF0ZSA9IChuZXcgRGF0ZShkYXRlVG9DaGVjay5nZXRUaW1lKCkpKS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgY29uc3QgZW5kT2ZEYXRlID0gKG5ldyBEYXRlKGRhdGVUb0NoZWNrLmdldFRpbWUoKSkpLnNldEhvdXJzKDIzLCA1OSwgNTksIDk5OSk7XG4gIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUoc3RhcnREYXRlKTtcbiAgY29uc3QgZW5kID0gbmV3IERhdGUoZW5kRGF0ZSk7XG4gIHJldHVybiAoIShzdGFydE9mRGF0ZSA8IHN0YXJ0LmdldFRpbWUoKSkgJiYgIShlbmRPZkRhdGUgPiBlbmQuZ2V0VGltZSgpKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RhdGVUaW1lQmV0d2VlbkRhdGVUaW1lKGRhdGVUb0NoZWNrLCBzdGFydERhdGUsIGVuZERhdGUpIHtcbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGRhdGVUb0NoZWNrLmdldFRpbWUoKSk7XG4gIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUoc3RhcnREYXRlKTtcbiAgY29uc3QgZW5kID0gbmV3IERhdGUoZW5kRGF0ZSk7XG4gIHJldHVybiAoZGF0ZSA+PSBzdGFydC5nZXRUaW1lKCkgJiYgZGF0ZSA8PSBlbmQuZ2V0VGltZSgpKTtcbiAgLy8gcmV0dXJuICghKGRhdGUgPCBzdGFydC5nZXRUaW1lKCkpICYmICEoZGF0ZSA+IGVuZC5nZXRUaW1lKCkpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRvZXNEYXRlQm9yZGVyRGF0ZVRpbWUoZGF0ZVRvQ2hlY2ssIHN0YXJ0RGF0ZSwgZW5kRGF0ZSkge1xuICBjb25zdCBkYXRlID0gbmV3IERhdGUoZGF0ZVRvQ2hlY2suZ2V0VGltZSgpKTtcbiAgY29uc3Qgc3RhcnRPZlN0YXJ0ID0gKG5ldyBEYXRlKHN0YXJ0RGF0ZS5nZXRUaW1lKCkpKS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgY29uc3QgZW5kT2ZFbmQgPSAobmV3IERhdGUoZW5kRGF0ZS5nZXRUaW1lKCkpKS5zZXRIb3VycygyMywgNTksIDU5LCA5OTkpO1xuICByZXR1cm4gKHN0YXJ0T2ZTdGFydCA8PSBkYXRlICYmIGRhdGUgPD0gZW5kT2ZFbmQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGF0ZUJvcmRlcnNSYW5nZShyYW5nZXMsIGRheSkge1xuICBsZXQgYm9yZGVyc1JhbmdlID0gZmFsc2U7XG4gIGlmIChyYW5nZXMpIHtcbiAgICByYW5nZXMuZm9yRWFjaCgocmFuZ2UpID0+IHtcbiAgICAgIGlmIChkb2VzRGF0ZUJvcmRlckRhdGVUaW1lKGRheSwgcmFuZ2Uuc3RhcnQsIHJhbmdlLmVuZCkpIHtcbiAgICAgICAgYm9yZGVyc1JhbmdlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICByZXR1cm4gYm9yZGVyc1JhbmdlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEYXRlSW5SYW5nZXMocmFuZ2VzLCBkYXkpIHtcbiAgbGV0IGluUmFuZ2UgPSBmYWxzZTtcbiAgaWYgKHJhbmdlcykge1xuICAgIHJhbmdlcy5mb3JFYWNoKChyYW5nZSkgPT4ge1xuICAgICAgaWYgKGlzRGF0ZUJldHdlZW5EYXRlVGltZShkYXksIHJhbmdlLnN0YXJ0LCByYW5nZS5lbmQpKSB7XG4gICAgICAgIGluUmFuZ2UgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHJldHVybiBpblJhbmdlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEYXRlVGltZUluUmFuZ2VzKHJhbmdlcywgZGF5KSB7XG4gIGxldCBpblJhbmdlID0gZmFsc2U7XG4gIGlmIChyYW5nZXMpIHtcbiAgICByYW5nZXMuZm9yRWFjaCgocmFuZ2UpID0+IHtcbiAgICAgIGlmIChpc0RhdGVUaW1lQmV0d2VlbkRhdGVUaW1lKGRheSwgcmFuZ2Uuc3RhcnQsIHJhbmdlLmVuZCkpIHtcbiAgICAgICAgaW5SYW5nZSA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIGluUmFuZ2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RhdGVUaW1lSW5SYW5nZXNFeGNsdXNpdmUocmFuZ2VzLCBkYXkpIHtcbiAgbGV0IGluUmFuZ2UgPSBmYWxzZTtcbiAgaWYgKHJhbmdlcykge1xuICAgIHJhbmdlcy5mb3JFYWNoKChyYW5nZSkgPT4ge1xuICAgICAgaWYgKGlzRGF0ZVRpbWVCZXR3ZWVuRGF0ZVRpbWVFeGNsdXNpdmUoZGF5LCByYW5nZS5zdGFydCwgcmFuZ2UuZW5kKSkge1xuICAgICAgICBpblJhbmdlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICByZXR1cm4gaW5SYW5nZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGF0ZVRpbWVCZXR3ZWVuRGF0ZVRpbWVFeGNsdXNpdmUoZGF0ZVRvQ2hlY2ssIHN0YXJ0RGF0ZSwgZW5kRGF0ZSkge1xuICBjb25zdCBkYXRlID0gbmV3IERhdGUoZGF0ZVRvQ2hlY2suZ2V0VGltZSgpKTtcbiAgY29uc3Qgc3RhcnQgPSBuZXcgRGF0ZShzdGFydERhdGUpO1xuICBjb25zdCBlbmQgPSBuZXcgRGF0ZShlbmREYXRlKTtcbiAgcmV0dXJuIChkYXRlID4gc3RhcnQuZ2V0VGltZSgpICYmIGRhdGUgPCBlbmQuZ2V0VGltZSgpKTtcbiAgLy8gcmV0dXJuICghKGRhdGUgPCBzdGFydC5nZXRUaW1lKCkpICYmICEoZGF0ZSA+IGVuZC5nZXRUaW1lKCkpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb3Nlc3RSYW5nZUFmdGVyU3RhcnQocmFuZ2VzLCBzdGFydCkge1xuICBpZiAocmFuZ2VzICYmIHN0YXJ0KSB7XG4gICAgcmFuZ2VzID0gc29ydEJ5KHJhbmdlcywgKHJhbmdlKSA9PiB7XG4gICAgICByZXR1cm4gcmFuZ2Uuc3RhcnQuZ2V0VGltZSgpO1xuICAgIH0pO1xuICAgIHJldHVybiBmaW5kKHJhbmdlcywgKHJhbmdlKSA9PiB7XG4gICAgICByZXR1cm4gcmFuZ2Uuc3RhcnQuZ2V0VGltZSgpID4gc3RhcnQuZ2V0VGltZSgpO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNCZWZvcmVEYXRlKGQxLCBkMikge1xuICBjb25zdCBkYXRlMSA9IGNsb25lQXNEYXRlKGQxKTtcbiAgY29uc3QgZGF0ZTIgPSBjbG9uZUFzRGF0ZShkMik7XG5cbiAgcmV0dXJuIChkYXRlMS5nZXRUaW1lKCkgPCBkYXRlMi5nZXRUaW1lKCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNCZWZvcmVEYXRlVGltZShkMSwgZDIpIHtcbiAgcmV0dXJuIChkMS5nZXRUaW1lKCkgPCBkMi5nZXRUaW1lKCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNBZnRlckRhdGUoZDEsIGQyKSB7XG4gIGNvbnN0IGRhdGUxID0gY2xvbmVBc0RhdGUoZDEpO1xuICBjb25zdCBkYXRlMiA9IGNsb25lQXNEYXRlKGQyKTtcblxuICByZXR1cm4gKGRhdGUxLmdldFRpbWUoKSA+IGRhdGUyLmdldFRpbWUoKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0FmdGVyRGF0ZVRpbWUoZDEsIGQyKSB7XG4gIHJldHVybiAoZDEuZ2V0VGltZSgpID4gZDIuZ2V0VGltZSgpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQmV0d2VlbkRhdGVzKGRhdGVUb0NoZWNrLCBzdGFydERhdGUsIGVuZERhdGUpIHtcbiAgcmV0dXJuICghKGlzQmVmb3JlRGF0ZShkYXRlVG9DaGVjaywgc3RhcnREYXRlKSkgJiZcbiAgICAgICAgICAhKGlzQWZ0ZXJEYXRlKGRhdGVUb0NoZWNrLCBlbmREYXRlKSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbW9udGhEaWZmKGQxLCBkMikge1xuICBsZXQgbTtcbiAgbSA9IChkMS5nZXRGdWxsWWVhcigpIC0gZDIuZ2V0RnVsbFllYXIoKSkgKiAxMjtcbiAgbSArPSBkMS5nZXRNb250aCgpO1xuICBtIC09IGQyLmdldE1vbnRoKCk7XG4gIHJldHVybiBtO1xufVxuXG5leHBvcnQgZnVuY3Rpb24geWVhckRpZmYoZDEsIGQyKSB7XG4gIHJldHVybiB+fihtb250aERpZmYoZDEsIGQyKSAvIDEyKTtcbn1cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRVdGlscyA9IHtcbiAgZ2V0WWVhcixcbiAgc2V0WWVhcixcbiAgYWRkRGF5cyxcbiAgYWRkTW9udGhzLFxuICBhZGRZZWFycyxcbiAgZ2V0Rmlyc3REYXlPZk1vbnRoLFxuICBnZXRXZWVrQXJyYXksXG4gIG1vbnRoRGlmZixcbn07XG4iXX0=