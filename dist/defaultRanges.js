'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultInputRanges = exports.defaultStaticRanges = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.createStaticRanges = createStaticRanges;

var _dateUtils = require('./dateUtils');

var defineds = {
  startOfWeek: (0, _dateUtils.startOfWeek)(new Date()),
  endOfWeek: (0, _dateUtils.endOfWeek)(new Date()),
  startOfLastWeek: (0, _dateUtils.startOfWeek)((0, _dateUtils.addDays)(new Date(), -7)),
  endOfLastWeek: (0, _dateUtils.endOfWeek)((0, _dateUtils.addDays)(new Date(), -7)),
  startOfToday: (0, _dateUtils.startOfDay)(new Date()),
  endOfToday: (0, _dateUtils.endOfDay)(new Date()),
  startOfYesterday: (0, _dateUtils.startOfDay)((0, _dateUtils.addDays)(new Date(), -1)),
  endOfYesterday: (0, _dateUtils.endOfDay)((0, _dateUtils.addDays)(new Date(), -1)),
  startOfMonth: (0, _dateUtils.startOfMonth)(new Date()),
  endOfMonth: (0, _dateUtils.endOfMonth)(new Date()),
  startOfLastMonth: (0, _dateUtils.startOfMonth)((0, _dateUtils.addMonths)(new Date(), -1)),
  endOfLastMonth: (0, _dateUtils.endOfMonth)((0, _dateUtils.addMonths)(new Date(), -1))
};

var staticRangeHandler = {
  range: {},
  isSelected: function isSelected(range) {
    var definedRange = this.range();
    return (0, _dateUtils.isSameDay)(range.startDate, definedRange.startDate) && (0, _dateUtils.isSameDay)(range.endDate, definedRange.endDate);
  }
};

function createStaticRanges(ranges) {
  return ranges.map(function (range) {
    return _extends({}, staticRangeHandler, range);
  });
}

var defaultStaticRanges = exports.defaultStaticRanges = createStaticRanges([{
  label: 'Today',
  range: function range() {
    return {
      startDate: defineds.startOfToday,
      endDate: defineds.endOfToday
    };
  }
}, {
  label: 'Yesterday',
  range: function range() {
    return {
      startDate: defineds.startOfYesterday,
      endDate: defineds.endOfYesterday
    };
  }
}, {
  label: 'This Week',
  range: function range() {
    return {
      startDate: defineds.startOfWeek,
      endDate: defineds.endOfWeek
    };
  }
}, {
  label: 'Last Week',
  range: function range() {
    return {
      startDate: defineds.startOfLastWeek,
      endDate: defineds.endOfLastWeek
    };
  }
}, {
  label: 'This Month',
  range: function range() {
    return {
      startDate: defineds.startOfMonth,
      endDate: defineds.endOfMonth
    };
  }
}, {
  label: 'Last Month',
  range: function range() {
    return {
      startDate: defineds.startOfLastMonth,
      endDate: defineds.endOfLastMonth
    };
  }
}]);

var defaultInputRanges = exports.defaultInputRanges = [{
  label: 'days up to today',
  range: function range(value) {
    return {
      startDate: (0, _dateUtils.addDays)(defineds.startOfToday, (Math.max(Number(value), 1) - 1) * -1),
      endDate: defineds.endOfToday
    };
  },
  getCurrentValue: function getCurrentValue(range) {
    if (!(0, _dateUtils.isSameDay)(range.endDate, defineds.endOfToday)) return '-';
    if (!range.startDate) return '∞';
    return (0, _dateUtils.differenceInCalendarDays)(defineds.endOfToday, range.startDate) + 1;
  }
}, {
  label: 'days starting today',
  range: function range(value) {
    var today = new Date();
    return {
      startDate: today,
      endDate: (0, _dateUtils.addDays)(today, Math.max(Number(value), 1) - 1)
    };
  },
  getCurrentValue: function getCurrentValue(range) {
    if (!(0, _dateUtils.isSameDay)(range.startDate, defineds.startOfToday)) return '-';
    if (!range.endDate) return '∞';
    return (0, _dateUtils.differenceInCalendarDays)(range.endDate, defineds.startOfToday) + 1;
  }
}];