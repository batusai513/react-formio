'use strict';

var React = require('react');
var valueMixin = require('./mixins/valueMixin');
var multiMixin = require('./mixins/multiMixin');
var DateTimePicker = require('react-widgets/lib/DateTimePicker');
var DateTimeField = require('react-bootstrap-datetimepicker');
var momentLocalizer = require('react-widgets/lib/localizers/moment');
var moment = require('moment');
momentLocalizer(moment);

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
    if (showCalendar) {
      return 'date';
    } else if (showTime) {
      return 'time';
    } else if (showCalendar, showTime) {
      return undefined;
    }
  },
  getSingleElement: function getSingleElement(value, index) {
    var _this = this;

    return React.createElement(DateTimeField, {
      inputProps: { id: this.props.component.key, name: this.props.name, disabled: this.props.readOnly },
      dateTime: value,
      defaultText: this.props.component.placeholder,
      mode: this.getMode(this.props.component.enableDate, this.props.component.enableTime),
      onChange: function onChange() {
        return _this.onChangeDatetime(index);
      }
    });
  }
});