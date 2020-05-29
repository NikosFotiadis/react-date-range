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

var _DayCell = require('./DayCell.js');

var _DayCell2 = _interopRequireDefault(_DayCell);

var _dateUtils = require('../dateUtils');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable no-fallthrough */


function renderWeekdays(styles) {
  var now = new Date();
  return _react2.default.createElement(
    'div',
    { className: styles.weekDays },
    (0, _dateUtils.eachDayOfInterval)({
      start: (0, _dateUtils.startOfWeek)(now),
      end: (0, _dateUtils.endOfWeek)(now)
    }).map(function (day, i) {
      return _react2.default.createElement(
        'span',
        { className: styles.weekDay, key: i },
        (0, _dateUtils.format)(day, 'ddd')
      );
    })
  );
}

var Month = function (_Component) {
  _inherits(Month, _Component);

  function Month() {
    _classCallCheck(this, Month);

    return _possibleConstructorReturn(this, (Month.__proto__ || Object.getPrototypeOf(Month)).apply(this, arguments));
  }

  _createClass(Month, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var now = new Date();
      var _props = this.props,
          displayMode = _props.displayMode,
          focusedRange = _props.focusedRange,
          drag = _props.drag,
          styles = _props.styles,
          disabledDates = _props.disabledDates;

      var minDate = this.props.minDate && (0, _dateUtils.startOfDay)(this.props.minDate);
      var maxDate = this.props.maxDate && (0, _dateUtils.endOfDay)(this.props.maxDate);
      var monthDisplay = (0, _utils.getMonthDisplayRange)(this.props.month);
      var ranges = this.props.ranges;
      if (displayMode === 'dateRange' && drag.status) {
        var _drag$range = drag.range,
            startDate = _drag$range.startDate,
            endDate = _drag$range.endDate;

        ranges = ranges.map(function (range, i) {
          if (i !== focusedRange[0]) return range;
          return _extends({}, range, {
            startDate: startDate,
            endDate: endDate
          });
        });
      }

      var showPreview = this.props.showPreview && !drag.disablePreview;
      return _react2.default.createElement(
        'div',
        { className: styles.month, style: this.props.style },
        this.props.showMonthName ? _react2.default.createElement(
          'div',
          { className: styles.monthName },
          _react2.default.createElement(
            'span',
            { className: styles.monthSpanName },
            (0, _dateUtils.format)(this.props.month, this.props.monthDisplayFormat)
          )
        ) : null,
        this.props.showWeekDays && renderWeekdays(styles),
        _react2.default.createElement(
          'div',
          { className: styles.days, onMouseLeave: this.props.onMouseLeave },
          (0, _dateUtils.eachDayOfInterval)({ start: monthDisplay.start, end: monthDisplay.end }).map(function (day, index) {
            var isStartOfMonth = (0, _dateUtils.isSameDay)(day, monthDisplay.startDateOfMonth);
            var isEndOfMonth = (0, _dateUtils.isSameDay)(day, monthDisplay.endDateOfMonth);
            var isOutsideMinMax = minDate && (0, _dateUtils.isBefore)(day, minDate) || maxDate && (0, _dateUtils.isAfter)(day, maxDate);
            var isDisabledSpecifically = disabledDates.some(function (disabledDate) {
              return (0, _dateUtils.isSameDay)(disabledDate, day);
            });
            return _react2.default.createElement(_DayCell2.default, _extends({}, _this2.props, {
              ranges: ranges,
              day: day,
              preview: showPreview ? _this2.props.preview : null,
              isWeekend: (0, _dateUtils.isWeekend)(day),
              isToday: (0, _dateUtils.isSameDay)(day, now),
              isStartOfWeek: (0, _dateUtils.isSameDay)(day, (0, _dateUtils.startOfWeek)(day)),
              isEndOfWeek: (0, _dateUtils.isSameDay)(day, (0, _dateUtils.endOfWeek)(day)),
              isStartOfMonth: isStartOfMonth,
              isEndOfMonth: isEndOfMonth,
              key: index,
              disabled: isOutsideMinMax || isDisabledSpecifically,
              isPassive: !(0, _dateUtils.isWithinInterval)(day, {
                start: monthDisplay.startDateOfMonth,
                end: monthDisplay.endDateOfMonth
              }),
              styles: styles,
              onMouseDown: _this2.props.onDragSelectionStart,
              onMouseUp: _this2.props.onDragSelectionEnd,
              onMouseEnter: _this2.props.onDragSelectionMove,
              dragRange: drag.range,
              drag: drag.status
            }));
          })
        )
      );
    }
  }]);

  return Month;
}(_react.Component);

Month.defaultProps = {};

Month.propTypes = {
  style: _propTypes2.default.object,
  styles: _propTypes2.default.object,
  month: _propTypes2.default.object,
  drag: _propTypes2.default.object,
  disabledDates: _propTypes2.default.array,
  preview: _propTypes2.default.shape({
    startDate: _propTypes2.default.object,
    endDate: _propTypes2.default.object
  }),
  showPreview: _propTypes2.default.bool,
  displayMode: _propTypes2.default.oneOf(['dateRange', 'date']),
  minDate: _propTypes2.default.object,
  maxDate: _propTypes2.default.object,
  ranges: _propTypes2.default.arrayOf(_DayCell.rangeShape),
  focusedRange: _propTypes2.default.arrayOf(_propTypes2.default.number),
  onDragSelectionStart: _propTypes2.default.func,
  onDragSelectionEnd: _propTypes2.default.func,
  onDragSelectionMove: _propTypes2.default.func,
  onMouseLeave: _propTypes2.default.func,
  monthDisplayFormat: _propTypes2.default.string,
  showWeekDays: _propTypes2.default.bool,
  showMonthName: _propTypes2.default.bool
};

exports.default = Month;