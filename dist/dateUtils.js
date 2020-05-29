'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isWithinInterval = exports.eachDayOfInterval = exports.isWeekend = exports.isAfter = exports.isBefore = exports.setYear = exports.setMonth = exports.format = exports.max = exports.min = exports.differenceInDays = exports.differenceInCalendarYears = exports.differenceInCalendarMonths = exports.differenceInCalendarWeeks = exports.differenceInCalendarDays = exports.isSameYear = exports.isSameMonth = exports.isSameWeek = exports.isSameDay = exports.endOfMonth = exports.startOfMonth = exports.endOfWeek = exports.startOfWeek = exports.endOfDay = exports.startOfDay = exports.areIntervalsOverlapping = exports.addYears = exports.addMonths = exports.addWeeks = exports.addDays = exports.timezoneManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TimezoneManager = function () {
  function TimezoneManager() {
    _classCallCheck(this, TimezoneManager);

    this.timezone = _momentTimezone2.default.tz.guess();
  }

  _createClass(TimezoneManager, [{
    key: 'setTimezone',
    value: function setTimezone(timezone) {
      this.timezone = timezone;
    }
  }, {
    key: 'getTimezone',
    value: function getTimezone() {
      return this.timezone;
    }
  }]);

  return TimezoneManager;
}();

var timezoneManager = exports.timezoneManager = new TimezoneManager();

var addDays = exports.addDays = function addDays(date, day) {
  return (0, _momentTimezone2.default)(date).tz(timezoneManager.getTimezone()).add(day, 'day').toDate();
};

var addWeeks = exports.addWeeks = function addWeeks(date, week) {
  return (0, _momentTimezone2.default)(date).tz(timezoneManager.getTimezone()).add(week, 'week').toDate();
};

var addMonths = exports.addMonths = function addMonths(date, month) {
  return (0, _momentTimezone2.default)(date).tz(timezoneManager.getTimezone()).add(month, 'month').toDate();
};

var addYears = exports.addYears = function addYears(date, year) {
  return (0, _momentTimezone2.default)(date).tz(timezoneManager.getTimezone()).add(year, 'year').toDate();
};

var areIntervalsOverlapping = exports.areIntervalsOverlapping = function areIntervalsOverlapping(interval1, interval2) {
  return interval1.start <= interval2.start && interval1.end <= interval2.end || interval2.start <= interval1.start && interval2.end <= interval1.end || interval1.start <= interval2.start && interval1.end >= interval2.end || interval2.start <= interval1.start && interval2.end >= interval1.end;
};

var startOfDay = exports.startOfDay = function startOfDay(date) {
  return (0, _momentTimezone2.default)(date).tz(timezoneManager.getTimezone()).startOf('day').toDate();
};

var endOfDay = exports.endOfDay = function endOfDay(date) {
  return (0, _momentTimezone2.default)(date).tz(timezoneManager.getTimezone()).endOf('day').toDate();
};

var startOfWeek = exports.startOfWeek = function startOfWeek(date) {
  return (0, _momentTimezone2.default)(date).tz(timezoneManager.getTimezone()).startOf('week').toDate();
};

var endOfWeek = exports.endOfWeek = function endOfWeek(date) {
  return (0, _momentTimezone2.default)(date).tz(timezoneManager.getTimezone()).endOf('week').toDate();
};

var startOfMonth = exports.startOfMonth = function startOfMonth(date) {
  return (0, _momentTimezone2.default)(date).tz(timezoneManager.getTimezone()).startOf('month').toDate();
};

var endOfMonth = exports.endOfMonth = function endOfMonth(date) {
  return (0, _momentTimezone2.default)(date).tz(timezoneManager.getTimezone()).endOf('month').toDate();
};

var isSameDay = exports.isSameDay = function isSameDay(date1, date2) {
  return (0, _momentTimezone2.default)(date1).tz(timezoneManager.getTimezone()).isSame((0, _momentTimezone2.default)(date2).tz(timezoneManager.getTimezone()), 'day');
};

var isSameWeek = exports.isSameWeek = function isSameWeek(date1, date2) {
  return (0, _momentTimezone2.default)(date1).tz(timezoneManager.getTimezone()).isSame((0, _momentTimezone2.default)(date2).tz(timezoneManager.getTimezone()), 'week');
};

var isSameMonth = exports.isSameMonth = function isSameMonth(date1, date2) {
  return (0, _momentTimezone2.default)(date1).tz(timezoneManager.getTimezone()).isSame((0, _momentTimezone2.default)(date2).tz(timezoneManager.getTimezone()), 'month');
};

var isSameYear = exports.isSameYear = function isSameYear(date1, date2) {
  return (0, _momentTimezone2.default)(date1).tz(timezoneManager.getTimezone()).isSame((0, _momentTimezone2.default)(date2).tz(timezoneManager.getTimezone()), 'year');
};

var differenceInCalendarDays = exports.differenceInCalendarDays = function differenceInCalendarDays(date1, date2) {
  return (0, _momentTimezone2.default)(date1).tz(timezoneManager.getTimezone()).isSame((0, _momentTimezone2.default)(date2).tz(timezoneManager.getTimezone()), 'day');
};

var differenceInCalendarWeeks = exports.differenceInCalendarWeeks = function differenceInCalendarWeeks(date1, date2) {
  return (0, _momentTimezone2.default)(date1).tz(timezoneManager.getTimezone()).isSame((0, _momentTimezone2.default)(date2).tz(timezoneManager.getTimezone()), 'week');
};

var differenceInCalendarMonths = exports.differenceInCalendarMonths = function differenceInCalendarMonths(date1, date2) {
  return (0, _momentTimezone2.default)(date1).tz(timezoneManager.getTimezone()).isSame((0, _momentTimezone2.default)(date2).tz(timezoneManager.getTimezone()), 'month');
};

var differenceInCalendarYears = exports.differenceInCalendarYears = function differenceInCalendarYears(date1, date2) {
  return (0, _momentTimezone2.default)(date1).tz(timezoneManager.getTimezone()).isSame((0, _momentTimezone2.default)(date2).tz(timezoneManager.getTimezone()), 'year');
};

var differenceInDays = exports.differenceInDays = function differenceInDays() {
  return differenceInCalendarDays.apply(undefined, arguments);
};

var min = exports.min = function min(array) {
  var min = Infinity;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = array[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var date = _step.value;

      if (min > date) {
        min = date;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return min;
};

var max = exports.max = function max(array) {
  var max = -Infinity;
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = array[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var date = _step2.value;

      if (max < date) {
        max = date;
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return max;
};

var format = exports.format = function format(date, _format) {
  return (0, _momentTimezone2.default)(date).tz(timezoneManager.getTimezone()).format(_format);
};

var setMonth = exports.setMonth = function setMonth(date, value) {
  return (0, _momentTimezone2.default)(date).tz(timezoneManager.getTimezone()).month(value).toDate();
};

var setYear = exports.setYear = function setYear(date, value) {
  return (0, _momentTimezone2.default)(date).tz(timezoneManager.getTimezone()).year(value).toDate();
};

var isBefore = exports.isBefore = function isBefore(date1, date2) {
  return date1 < date2;
};

var isAfter = exports.isAfter = function isAfter(date1, date2) {
  return date1 > date2;
};

var isWeekend = exports.isWeekend = function isWeekend(date) {
  var day = (0, _momentTimezone2.default)(date).tz(timezoneManager.getTimezone()).day();
  return day === 6 || day === 0;
};

var eachDayOfInterval = exports.eachDayOfInterval = function eachDayOfInterval(range) {
  var days = [];
  var startDate = (0, _momentTimezone2.default)(range.start).tz(timezoneManager.getTimezone()).startOf('day');
  var endDate = (0, _momentTimezone2.default)(range.end).tz(timezoneManager.getTimezone()).startOf('day');
  while (startDate <= endDate) {
    days.push((0, _momentTimezone2.default)(startDate).tz(timezoneManager.getTimezone()).startOf('day'));
    startDate.add(1, 'day');
  }

  return days;
};

var isWithinInterval = exports.isWithinInterval = function isWithinInterval(date, range) {
  return range.start <= date && date <= range.end;
};