var React = require('react');
var valueMixin = require('./mixins/valueMixin');
var multiMixin = require('./mixins/multiMixin');
var moment = require('moment');
import DateTimeField from 'react-bootstrap-datetimepicker';

module.exports = React.createClass({
  displayName: 'Datetime',
  mixins: [valueMixin, multiMixin],
  getInitialValue: function() {
    return null;
  },
  onChangeDatetime: function(index, value, str) {
    this.setValue(value, index);
  },
  getMode: function(showCalendar, showTime) {
    if (showCalendar) {
      return 'date';
    }
    else if (showTime) {
      return 'time';
    }
    else if (showCalendar, showTime) {
      return undefined;
    }
  },
  getSingleElement: function(value, index) {
    return (
        <DateTimeField
          inputProps={{id: this.props.component.key, name: this.props.name, disabled: this.props.readOnly}}
          dateTime={value || moment().format('x')}
          defaultText={this.props.component.placeholder}
          mode={this.getMode(this.props.component.enableDate, this.props.component.enableTime)}
          onChange={(value) => this.onChangeDatetime(index, value)}
        />
    );
  }
});
