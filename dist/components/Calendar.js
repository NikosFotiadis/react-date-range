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

var _Month = require('./Month.js');

var _Month2 = _interopRequireDefault(_Month);

var _utils = require('../utils');

var _classnames4 = require('classnames');

var _classnames5 = _interopRequireDefault(_classnames4);

var _reactList = require('react-list');

var _reactList2 = _interopRequireDefault(_reactList);

var _rcTimePicker = require('rc-time-picker');

var _rcTimePicker2 = _interopRequireDefault(_rcTimePicker);

require('rc-time-picker/assets/index.css');

var _dateUtils = require('../dateUtils');

var _styles = require('../styles');

var _styles2 = _interopRequireDefault(_styles);

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var months = function months() {
  return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
};

var Calendar = function (_PureComponent) {
  _inherits(Calendar, _PureComponent);

  function Calendar(props, context) {
    _classCallCheck(this, Calendar);

    var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props, context));

    _this.changeShownDate = _this.changeShownDate.bind(_this);
    _this.focusToDate = _this.focusToDate.bind(_this);
    _this.updateShownDate = _this.updateShownDate.bind(_this);
    _this.handleRangeFocusChange = _this.handleRangeFocusChange.bind(_this);
    _this.renderDateDisplay = _this.renderDateDisplay.bind(_this);
    _this.onDragSelectionStart = _this.onDragSelectionStart.bind(_this);
    _this.onDragSelectionEnd = _this.onDragSelectionEnd.bind(_this);
    _this.onDragSelectionMove = _this.onDragSelectionMove.bind(_this);
    _this.renderMonthAndYear = _this.renderMonthAndYear.bind(_this);
    _this.updatePreview = _this.updatePreview.bind(_this);
    _this.estimateMonthSize = _this.estimateMonthSize.bind(_this);
    _this.handleScroll = _this.handleScroll.bind(_this);
    _this.styles = (0, _utils.generateStyles)([_styles2.default, props.classNames]);
    _this.listSizeCache = {};
    _this.state = {
      focusedDate: (0, _utils.calcFocusDate)(null, props),
      drag: {
        status: false,
        range: { startDate: null, endDate: null },
        disablePreview: false
      },
      scrollArea: _this.calcScrollArea(props)
    };
    return _this;
  }

  _createClass(Calendar, [{
    key: 'calcScrollArea',
    value: function calcScrollArea(props) {
      var direction = props.direction,
          months = props.months,
          scroll = props.scroll;

      if (!scroll.enabled) return { enabled: false };

      var longMonthHeight = scroll.longMonthHeight || scroll.monthHeight;
      if (direction === 'vertical') {
        return {
          enabled: true,
          monthHeight: scroll.monthHeight || 220,
          longMonthHeight: longMonthHeight || 260,
          calendarWidth: 'auto',
          calendarHeight: (scroll.calendarHeight || longMonthHeight || 240) * months
        };
      }
      return {
        enabled: true,
        monthWidth: scroll.monthWidth || 332,
        calendarWidth: (scroll.calendarWidth || scroll.monthWidth || 332) * months,
        monthHeight: longMonthHeight || 300,
        calendarHeight: longMonthHeight || 300
      };
    }
  }, {
    key: 'focusToDate',
    value: function focusToDate(date) {
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props;
      var preventUnnecessary = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      if (!props.scroll.enabled) {
        this.setState({ focusedDate: date });
        return;
      }
      var targetMonthIndex = (0, _dateUtils.differenceInCalendarMonths)(date, props.minDate);
      var visibleMonths = this.list.getVisibleRange();
      if (preventUnnecessary && visibleMonths.includes(targetMonthIndex)) return;
      this.list.scrollTo(targetMonthIndex);
      this.setState({ focusedDate: date });
    }
  }, {
    key: 'updateShownDate',
    value: function updateShownDate() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      var newProps = props.scroll.enabled ? _extends({}, props, {
        months: this.list.getVisibleRange().length
      }) : props;
      var newFocus = (0, _utils.calcFocusDate)(this.state.focusedDate, newProps);
      this.focusToDate(newFocus, newProps);
    }
  }, {
    key: 'updatePreview',
    value: function updatePreview(val) {
      if (!val) {
        this.setState({ preview: null });
        return;
      }
      var preview = {
        startDate: val,
        endDate: val,
        color: this.props.color
      };
      this.setState({ preview: preview });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (this.props.scroll.enabled) {
        // prevent react-list's initial render focus problem
        setTimeout(function () {
          return _this2.focusToDate(_this2.state.focusedDate);
        }, 1);
      }
    }

    // eslint-disable-next-line react/no-deprecated

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var propMapper = {
        dateRange: 'ranges',
        date: 'date'
      };
      var targetProp = propMapper[nextProps.displayMode];
      if (JSON.stringify(this.props.scroll) !== JSON.stringify(nextProps.scroll)) {
        this.setState({ scrollArea: this.calcScrollArea(nextProps) });
      }
      if (nextProps[targetProp] !== this.props[targetProp]) {
        this.updateShownDate(nextProps);
      }
    }
  }, {
    key: 'changeShownDate',
    value: function changeShownDate(value) {
      var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'set';

      console.log(': -------------------------------------------');
      console.log('Calendar -> changeShownDate -> value', value);
      console.log(': -------------------------------------------');
      var focusedDate = this.state.focusedDate;
      var _props = this.props,
          onShownDateChange = _props.onShownDateChange,
          minDate = _props.minDate,
          maxDate = _props.maxDate;

      var modeMapper = {
        monthOffset: function monthOffset() {
          return (0, _dateUtils.addMonths)(focusedDate, value);
        },
        setMonth: function setMonth() {
          return (0, _dateUtils.setMonth)(focusedDate, value);
        },
        setYear: function setYear() {
          return (0, _dateUtils.setYear)(focusedDate, value);
        },
        set: function set() {
          return value;
        }
      };
      var newDate = (0, _dateUtils.min)([(0, _dateUtils.max)([modeMapper[mode](), minDate]), maxDate]);
      this.focusToDate(newDate, this.props, false);
      onShownDateChange && onShownDateChange(newDate);
    }
  }, {
    key: 'handleRangeFocusChange',
    value: function handleRangeFocusChange(rangesIndex, rangeItemIndex) {
      this.props.onRangeFocusChange && this.props.onRangeFocusChange([rangesIndex, rangeItemIndex]);
    }
  }, {
    key: 'handleScroll',
    value: function handleScroll() {
      var _props2 = this.props,
          onShownDateChange = _props2.onShownDateChange,
          minDate = _props2.minDate;

      var visibleMonths = this.list.getVisibleRange();
      // prevent scroll jump with wrong visible value
      if (visibleMonths[0] === undefined) return;
      var visibleMonth = (0, _dateUtils.addMonths)(minDate, visibleMonths[0] || 0);
      var isFocusedToDifferent = !(0, _dateUtils.isSameMonth)(visibleMonth, this.state.focusedDate);
      if (isFocusedToDifferent) {
        this.setState({ focusedDate: visibleMonth });
        onShownDateChange && onShownDateChange(visibleMonth);
      }
    }
  }, {
    key: 'renderMonthAndYear',
    value: function renderMonthAndYear(focusedDate, changeShownDate, props) {
      var showMonthArrow = props.showMonthArrow,
          minDate = props.minDate,
          maxDate = props.maxDate,
          showMonthAndYearPickers = props.showMonthAndYearPickers,
          timezone = props.timezone;

      var upperYearLimit = (maxDate || Calendar.defaultProps.maxDate).getFullYear();
      var lowerYearLimit = (minDate || Calendar.defaultProps.minDate).getFullYear();
      var styles = this.styles;
      return _react2.default.createElement(
        'div',
        { onMouseUp: function onMouseUp(e) {
            return e.stopPropagation();
          }, className: styles.monthAndYearWrapper },
        showMonthArrow ? _react2.default.createElement(
          'button',
          {
            type: 'button',
            className: (0, _classnames5.default)(styles.nextPrevButton, styles.prevButton),
            onClick: function onClick() {
              return changeShownDate(-1, 'monthOffset');
            } },
          _react2.default.createElement('i', null)
        ) : null,
        showMonthAndYearPickers ? _react2.default.createElement(
          'span',
          { className: styles.monthAndYearPickers },
          _react2.default.createElement(
            'span',
            { className: styles.monthPicker },
            _react2.default.createElement(
              'select',
              {
                value: focusedDate.getMonth(),
                onChange: function onChange(e) {
                  return changeShownDate(e.target.value, 'setMonth');
                } },
              months().map(function (month, i) {
                return _react2.default.createElement(
                  'option',
                  { key: i, value: i },
                  month
                );
              })
            )
          ),
          _react2.default.createElement('span', { className: styles.monthAndYearDivider }),
          _react2.default.createElement(
            'span',
            { className: styles.yearPicker },
            _react2.default.createElement(
              'select',
              {
                value: focusedDate.getFullYear(),
                onChange: function onChange(e) {
                  return changeShownDate(e.target.value, 'setYear');
                } },
              new Array(upperYearLimit - lowerYearLimit + 1).fill(upperYearLimit).map(function (val, i) {
                var year = val - i;
                return _react2.default.createElement(
                  'option',
                  { key: year, value: year },
                  year
                );
              })
            )
          ),
          _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement(_rcTimePicker2.default, {
              allowEmpty: false,
              showSecond: false,
              onChange: function onChange(value) {
                return changeShownDate(value.toDate());
              },
              value: (0, _momentTimezone2.default)(focusedDate)
            })
          )
        ) : _react2.default.createElement(
          'span',
          { className: styles.monthAndYearPickers },
          months()[focusedDate.getMonth()],
          ' ',
          focusedDate.getFullYear()
        ),
        showMonthArrow ? _react2.default.createElement(
          'button',
          {
            type: 'button',
            className: (0, _classnames5.default)(styles.nextPrevButton, styles.nextButton),
            onClick: function onClick() {
              return changeShownDate(+1, 'monthOffset');
            } },
          _react2.default.createElement('i', null)
        ) : null
      );
    }
  }, {
    key: 'renderWeekdays',
    value: function renderWeekdays() {
      var _this3 = this;

      var now = new Date();
      return _react2.default.createElement(
        'div',
        { className: this.styles.weekDays },
        (0, _dateUtils.eachDayOfInterval)({
          start: (0, _dateUtils.startOfWeek)(now),
          end: (0, _dateUtils.endOfWeek)(now)
        }).map(function (day, i) {
          return _react2.default.createElement(
            'span',
            { className: _this3.styles.weekDay, key: i },
            (0, _dateUtils.format)(day, 'ddd')
          );
        })
      );
    }
  }, {
    key: 'renderDateDisplay',
    value: function renderDateDisplay() {
      var _this4 = this;

      var _props3 = this.props,
          focusedRange = _props3.focusedRange,
          color = _props3.color,
          ranges = _props3.ranges,
          rangeColors = _props3.rangeColors,
          updateRange = _props3.updateRange,
          showTime = _props3.showTime,
          timezone = _props3.timezone;

      var defaultColor = rangeColors[focusedRange[0]] || color;
      var styles = this.styles;
      return _react2.default.createElement(
        'div',
        { className: styles.dateDisplayWrapper },
        ranges.map(function (range, i) {
          if (range.showDateDisplay === false || range.disabled && !range.showDateDisplay) return null;
          return _react2.default.createElement(
            'div',
            {
              className: styles.dateDisplay,
              key: i,
              style: { color: range.color || defaultColor } },
            _react2.default.createElement(
              'span',
              {
                className: (0, _classnames5.default)(styles.dateDisplayItem, _defineProperty({}, styles.dateDisplayItemActive, focusedRange[0] === i && focusedRange[1] === 0)),
                onFocus: function onFocus() {
                  return _this4.handleRangeFocusChange(i, 0);
                } },
              _react2.default.createElement('input', {
                disabled: range.disabled,
                readOnly: true,
                value: _this4.formatDateDisplay(range.startDate, 'Early')
              }),
              showTime ? _react2.default.createElement(
                'span',
                {
                  className: (0, _classnames5.default)(styles.timePickerContainer, _defineProperty({}, styles.timePickerContainerActive, focusedRange[0] === i && focusedRange[1] === 0)) },
                _react2.default.createElement(_rcTimePicker2.default, {
                  allowEmpty: false,
                  showSecond: false,
                  onChange: function onChange(value) {
                    updateRange && updateRange(_extends({}, range, { startDate: value.toDate() }));
                  },
                  clearIcon: function clearIcon() {
                    return _react2.default.createElement(_react2.default.Fragment, null);
                  },
                  value: (0, _momentTimezone2.default)(range.startDate).tz(timezone),
                  use12Hours: true
                })
              ) : _react2.default.createElement(_react2.default.Fragment, null)
            ),
            _react2.default.createElement(
              'span',
              {
                className: (0, _classnames5.default)(styles.dateDisplayItem, _defineProperty({}, styles.dateDisplayItemActive, focusedRange[0] === i && focusedRange[1] === 1)),
                onFocus: function onFocus() {
                  return _this4.handleRangeFocusChange(i, 1);
                } },
              _react2.default.createElement('input', {
                disabled: range.disabled,
                readOnly: true,
                value: _this4.formatDateDisplay(range.endDate, 'Continuous')
              }),
              showTime ? _react2.default.createElement(
                'span',
                { className: styles.timePickerContainer },
                _react2.default.createElement(_rcTimePicker2.default, {
                  allowEmpty: false,
                  showSecond: false,
                  clearIcon: function clearIcon() {
                    return _react2.default.createElement(_react2.default.Fragment, null);
                  },
                  onChange: function onChange(value) {
                    updateRange && updateRange(_extends({}, range, { endDate: value.toDate() }));
                  },
                  value: (0, _momentTimezone2.default)(range.endDate).tz(timezone),
                  use12Hours: true
                })
              ) : _react2.default.createElement(_react2.default.Fragment, null)
            )
          );
        })
      );
    }
  }, {
    key: 'onDragSelectionStart',
    value: function onDragSelectionStart(date) {
      var _props4 = this.props,
          onChange = _props4.onChange,
          dragSelectionEnabled = _props4.dragSelectionEnabled;


      if (dragSelectionEnabled) {
        this.setState({
          drag: {
            status: true,
            range: { startDate: date, endDate: date },
            disablePreview: true
          }
        });
      } else {
        onChange && onChange(date);
      }
    }
  }, {
    key: 'onDragSelectionEnd',
    value: function onDragSelectionEnd(date) {
      var _props5 = this.props,
          updateRange = _props5.updateRange,
          displayMode = _props5.displayMode,
          onChange = _props5.onChange,
          dragSelectionEnabled = _props5.dragSelectionEnabled;


      if (!dragSelectionEnabled) return;

      if (displayMode === 'date' || !this.state.drag.status) {
        onChange && onChange(date.toDate());
        return;
      }
      var newRange = {
        startDate: this.state.drag.range.startDate,
        endDate: date
      };
      if (displayMode !== 'dateRange' || (0, _dateUtils.isSameDay)(newRange.startDate, date)) {
        this.setState({ drag: { status: false, range: {} } }, function () {
          return onChange && onChange(date);
        });
      } else {
        this.setState({ drag: { status: false, range: {} } }, function () {
          updateRange && updateRange(newRange);
        });
      }
    }
  }, {
    key: 'onDragSelectionMove',
    value: function onDragSelectionMove(date) {
      var drag = this.state.drag;

      if (!drag.status || !this.props.dragSelectionEnabled) return;
      this.setState({
        drag: {
          status: drag.status,
          range: { startDate: drag.range.startDate, endDate: date },
          disablePreview: true
        }
      });
    }
  }, {
    key: 'estimateMonthSize',
    value: function estimateMonthSize(index, cache) {
      var _props6 = this.props,
          direction = _props6.direction,
          minDate = _props6.minDate;
      var scrollArea = this.state.scrollArea;

      if (cache) {
        this.listSizeCache = cache;
        if (cache[index]) return cache[index];
      }
      if (direction === 'horizontal') return scrollArea.monthWidth;
      var monthStep = (0, _dateUtils.addMonths)(minDate, index);

      var _getMonthDisplayRange = (0, _utils.getMonthDisplayRange)(monthStep),
          start = _getMonthDisplayRange.start,
          end = _getMonthDisplayRange.end;

      var isLongMonth = (0, _dateUtils.differenceInDays)(end, start) + 1 > 7 * 5;
      return isLongMonth ? scrollArea.longMonthHeight : scrollArea.monthHeight;
    }
  }, {
    key: 'formatDateDisplay',
    value: function formatDateDisplay(date, defaultText) {
      if (!date) return defaultText;
      return (0, _dateUtils.format)(date, this.props.dateDisplayFormat);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var _props7 = this.props,
          showDateDisplay = _props7.showDateDisplay,
          onPreviewChange = _props7.onPreviewChange,
          scroll = _props7.scroll,
          direction = _props7.direction,
          disabledDates = _props7.disabledDates,
          maxDate = _props7.maxDate,
          minDate = _props7.minDate,
          rangeColors = _props7.rangeColors,
          rangeEdgeColors = _props7.rangeEdgeColors,
          color = _props7.color;
      var _state = this.state,
          scrollArea = _state.scrollArea,
          focusedDate = _state.focusedDate;

      var isVertical = direction === 'vertical';
      var navigatorRenderer = this.props.navigatorRenderer || this.renderMonthAndYear;

      var ranges = this.props.ranges.map(function (range, i) {
        return _extends({}, range, {
          color: range.color || rangeColors[i] || color,
          edgeColor: range.edgeColor || rangeEdgeColors[i] || color
        });
      });
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames5.default)(this.styles.calendarWrapper, this.props.className),
          onMouseUp: function onMouseUp() {
            return _this5.setState({ drag: { status: false, range: {} } });
          },
          onMouseLeave: function onMouseLeave() {
            _this5.setState({ drag: { status: false, range: {} } });
          } },
        showDateDisplay && this.renderDateDisplay(),
        navigatorRenderer(focusedDate, this.changeShownDate, this.props),
        scroll.enabled ? _react2.default.createElement(
          'div',
          null,
          isVertical && this.renderWeekdays(),
          _react2.default.createElement(
            'div',
            {
              className: (0, _classnames5.default)(this.styles.infiniteMonths, isVertical ? this.styles.monthsVertical : this.styles.monthsHorizontal),
              onMouseLeave: function onMouseLeave() {
                return onPreviewChange && onPreviewChange();
              },
              style: {
                width: scrollArea.calendarWidth + 11,
                height: scrollArea.calendarHeight + 11
              },
              onScroll: this.handleScroll },
            _react2.default.createElement(_reactList2.default, {
              length: (0, _dateUtils.differenceInCalendarMonths)((0, _dateUtils.endOfMonth)(maxDate), (0, _dateUtils.addDays)((0, _dateUtils.startOfMonth)(minDate), -1)),
              treshold: 500,
              type: 'variable',
              ref: function ref(target) {
                return _this5.list = target;
              },
              itemSizeEstimator: this.estimateMonthSize,
              axis: isVertical ? 'y' : 'x',
              itemRenderer: function itemRenderer(index, key) {
                var monthStep = (0, _dateUtils.addMonths)(minDate, index);
                return _react2.default.createElement(_Month2.default, _extends({}, _this5.props, {
                  onPreviewChange: _this5.props.onPreviewChange || _this5.updatePreview,
                  preview: _this5.props.preview || _this5.state.preview,
                  ranges: ranges,
                  key: key,
                  drag: _this5.state.drag,
                  disabledDates: disabledDates,
                  month: monthStep,
                  onDragSelectionStart: _this5.onDragSelectionStart,
                  onDragSelectionEnd: _this5.onDragSelectionEnd,
                  onDragSelectionMove: _this5.onDragSelectionMove,
                  onMouseLeave: function onMouseLeave() {
                    return onPreviewChange && onPreviewChange();
                  },
                  styles: _this5.styles,
                  style: isVertical ? { height: _this5.estimateMonthSize(index) } : {
                    height: scrollArea.monthHeight,
                    width: _this5.estimateMonthSize(index)
                  },
                  showMonthName: true,
                  showWeekDays: !isVertical
                }));
              }
            })
          )
        ) : _react2.default.createElement(
          'div',
          {
            className: (0, _classnames5.default)(this.styles.months, isVertical ? this.styles.monthsVertical : this.styles.monthsHorizontal) },
          new Array(this.props.months).fill(null).map(function (_, i) {
            var monthStep = (0, _dateUtils.addMonths)(_this5.state.focusedDate, i);
            return _react2.default.createElement(_Month2.default, _extends({}, _this5.props, {
              onPreviewChange: _this5.props.onPreviewChange || _this5.updatePreview,
              preview: _this5.props.preview || _this5.state.preview,
              ranges: ranges,
              key: i,
              drag: _this5.state.drag,
              disabledDates: disabledDates,
              month: monthStep,
              onDragSelectionStart: _this5.onDragSelectionStart,
              onDragSelectionEnd: _this5.onDragSelectionEnd,
              onDragSelectionMove: _this5.onDragSelectionMove,
              onMouseLeave: function onMouseLeave() {
                return onPreviewChange && onPreviewChange();
              },
              styles: _this5.styles,
              showWeekDays: !isVertical || i === 0,
              showMonthName: !isVertical || i > 0
            }));
          })
        )
      );
    }
  }]);

  return Calendar;
}(_react.PureComponent);

Calendar.defaultProps = {
  showMonthArrow: true,
  showMonthAndYearPickers: true,
  disabledDates: [],
  classNames: {},
  ranges: [],
  focusedRange: [0, 0],
  dateDisplayFormat: 'MMM D, YYYY',
  monthDisplayFormat: 'MMM YYYY',
  showDateDisplay: true,
  showPreview: true,
  displayMode: 'date',
  months: 1,
  color: '#1dbbbc',
  scroll: {
    enabled: false
  },
  direction: 'vertical',
  maxDate: (0, _dateUtils.addYears)(new Date(), 20),
  minDate: (0, _dateUtils.addYears)(new Date(), -100),
  rangeColors: ['#1dbbbc', '#3ecf8e', '#fed14c'],
  rangeEdgeColors: ['#1dbbbc', '#3ecf8e', '#fed14c'],
  dragSelectionEnabled: true
};

Calendar.propTypes = {
  showMonthArrow: _propTypes2.default.bool,
  showMonthAndYearPickers: _propTypes2.default.bool,
  disabledDates: _propTypes2.default.array,
  minDate: _propTypes2.default.object,
  maxDate: _propTypes2.default.object,
  date: _propTypes2.default.object,
  onChange: _propTypes2.default.func,
  onPreviewChange: _propTypes2.default.func,
  onRangeFocusChange: _propTypes2.default.func,
  classNames: _propTypes2.default.object,
  shownDate: _propTypes2.default.object,
  onShownDateChange: _propTypes2.default.func,
  ranges: _propTypes2.default.arrayOf(_DayCell.rangeShape),
  preview: _propTypes2.default.shape({
    startDate: _propTypes2.default.object,
    endDate: _propTypes2.default.object,
    color: _propTypes2.default.string
  }),
  dateDisplayFormat: _propTypes2.default.string,
  monthDisplayFormat: _propTypes2.default.string,
  focusedRange: _propTypes2.default.arrayOf(_propTypes2.default.number),
  initialFocusedRange: _propTypes2.default.arrayOf(_propTypes2.default.number),
  months: _propTypes2.default.number,
  className: _propTypes2.default.string,
  showDateDisplay: _propTypes2.default.bool,
  showPreview: _propTypes2.default.bool,
  displayMode: _propTypes2.default.oneOf(['dateRange', 'date']),
  color: _propTypes2.default.string,
  updateRange: _propTypes2.default.func,
  scroll: _propTypes2.default.shape({
    enabled: _propTypes2.default.bool,
    monthHeight: _propTypes2.default.number,
    longMonthHeight: _propTypes2.default.number,
    monthWidth: _propTypes2.default.number,
    calendarWidth: _propTypes2.default.number,
    calendarHeight: _propTypes2.default.number
  }),
  direction: _propTypes2.default.oneOf(['vertical', 'horizontal']),
  navigatorRenderer: _propTypes2.default.func,
  rangeColors: _propTypes2.default.arrayOf(_propTypes2.default.string),
  rangeEdgeColors: _propTypes2.default.arrayOf(_propTypes2.default.string),
  dragSelectionEnabled: _propTypes2.default.bool,
  showTime: _propTypes2.default.bool,
  timezone: _propTypes2.default.string
};

exports.default = Calendar;