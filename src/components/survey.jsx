var React = require('react');
var valueMixin = require('./mixins/valueMixin.jsx');

module.exports = React.createClass({
  displayName: 'Survey',
  mixins: [valueMixin],
  getInitialValue: function() {
    return {};
  },
  onChangeRadiod: function(answersData, questionsData) {
    var value = this.state.value;
    value[questionsData] = answersData;
    this.setState({
      value: value
    });
    this.props.onChange(this);
  },
  generateAnswerCell: function(questionsData, inputType) {
    var cellData = [];
    cellData.push(
      this.props.component.values.map(function(answersData, index) {
        if (inputType === 'label') {
          return (
            <td className=" formio-table-content-centered">
              {answersData.label}
            </td>
          );
        }
        else {
          return (
            <td key={index} className=" formio-table-content-centered">
              <input
                type="radio"
                checked={this.state.value[questionsData.value] === answersData.value ? true : false}
                onChange={this.onChangeRadiod.bind(null, answersData.value, questionsData.value)}
              >
              </input>
            </td>
          );
        }
      }.bind(this))
    );
    return cellData;
  },
  getElements: function() {
    var header = this.props.component.label ? this.props.component.label : '';
    var tableClasses = 'table';
    tableClasses += ' table-striped';
    tableClasses += ' table-bordered';
    tableClasses += ' table-hover';
    tableClasses += ' table-condensed';

    var required = (this.props.component.validate.required ? 'field-required' : '');
    var key = (this.props.component.key) ? this.props.component.key : this.props.component.type ;
    var firstRowKey = key + 'firstRow';
    return (
      <div className="table-responsive" key={key}>
        {header}
        <table className={tableClasses}>
          <tbody>
          <tr key={firstRowKey}>
            <td key="blankCell"></td>
            {this.generateAnswerCell(null, 'label')}
          </tr>
          {this.props.component.questions.map(function(questionsData, index) {
            return (
              <tr key={index}>
                <td key={index}>
                  <label className={required}>
                    {questionsData.label}
                  </label>
                </td>
                {this.generateAnswerCell(questionsData, 'radio')}
              </tr>
            );
          }.bind(this))}
          </tbody>
        </table>
      </div>
    );
  }
});