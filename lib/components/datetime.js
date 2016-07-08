'use strict';

var _reactBootstrapDatetimepicker = require('react-bootstrap-datetimepicker');

var _reactBootstrapDatetimepicker2 = _interopRequireDefault(_reactBootstrapDatetimepicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');
var valueMixin = require('./mixins/valueMixin');
var multiMixin = require('./mixins/multiMixin');
var moment = require('moment');


module.exports = React.createClass({
  displayName: 'Datetime',
  mixins: [valueMixin, multiMixin],
  getInitialValue: function getInitialValue() {
    return null;
  },
  onChangeDatetime: function onChangeDatetime(index, value, str) {
    this.setValue(value, index);
  },
  getMode: function getMode(showCalendar, showTime) {
    if (showCalendar && showTime) {
      return undefined;
    } else if (showTime) {
      return 'time';
    } else if (showCalendar) {
      return 'date';
    }
  },
  getSingleElement: function getSingleElement(value, index) {
    var _this = this;

    return React.createElement(_reactBootstrapDatetimepicker2.default, {
      inputProps: { id: this.props.component.key, name: this.props.name, disabled: this.props.readOnly },
      dateTime: value || moment().format('x'),
      defaultText: this.props.component.placeholder,
      mode: this.getMode(this.props.component.enableDate, this.props.component.enableTime),
      onChange: function onChange(value) {
        return _this.onChangeDatetime(index, value);
      }
    });
  }
});