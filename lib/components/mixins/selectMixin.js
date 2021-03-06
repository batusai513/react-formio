'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var React = require('react');
var DropdownList = require('react-widgets/lib/DropdownList');
var Multiselect = require('react-widgets/lib/Multiselect');

function defineTransformerOutsideStrictMode() {
  var safeGlobalName = '____formioSelectMixinGetTransformer';
  var globalObject = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {};

  /* We are essentially doing this, but because we're in strict mode by default in all babeled
   * modules, we need to escape it
   *
   * //string-replace callback, called for every match in the template.
   * function transform (_, expression) {
   *  //bring the properties of 'props' into local scope so that the expression can reference them
   *  with (props) {
   *    return eval(expression); //evaluate the expression.
   *  }
   * }
   */

  //This escapes strict mode.
  (1, eval)('function ' + safeGlobalName + ' (props) { return function (_, exp) { with(props) { return eval(exp); } } }');

  var ret = eval(safeGlobalName);

  //cleanup
  delete globalObject[safeGlobalName];

  return ret;
}

var getTransformer = defineTransformerOutsideStrictMode();

module.exports = {
  getInitialState: function getInitialState() {
    return {
      selectItems: [],
      searchTerm: ''
    };
  },
  valueField: function valueField() {
    var valueField = this.props.component.valueProperty || 'value';
    if (typeof this.getValueField === 'function') {
      valueField = this.getValueField();
    }
    return valueField;
  },
  textField: function textField() {
    var textField = 'label';
    if (typeof this.getTextField === 'function') {
      textField = this.getTextField();
    }
    return textField;
  },
  onChangeSelect: function onChangeSelect(value) {
    if (Array.isArray(value) && this.valueField()) {
      value.forEach(function (val, index) {
        value[index] = val[this.valueField()];
      }.bind(this));
    } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && this.valueField()) {
      value = value[this.valueField()];
    }
    this.setValue(value);
  },
  onSearch: function onSearch(text) {
    this.setState({
      searchTerm: text
    });
    if (typeof this.doSearch === 'function' && text) {
      this.doSearch(text);
    }
  },
  itemComponent: function itemComponent() {
    var template = this.props.component.template;
    if (!template) {
      return null;
    }

    //helper function to render raw html under a react element.
    function raw(html) {
      return { dangerouslySetInnerHTML: { __html: html } };
    }

    return React.createClass({
      render: function render() {
        var props = this.props;

        var transform = getTransformer(props);

        if (props.item) {
          //find all {{ }} expression blocks and then replace the blocks with their evaluation.
          //Then render the markup raw under this react element
          return React.createElement('div', raw(template.replace(/\{\s*\{([^\}]*)\}\s*\}/gm, transform)));
        }

        return React.createElement('span');
      }
    });
  },
  getElements: function getElements() {
    var Element = this.props.component.multiple ? Multiselect : DropdownList;
    var classLabel = 'control-label' + (this.props.component.validate && this.props.component.validate.required ? ' field-required' : '');
    var inputLabel = this.props.component.label && !this.props.component.hideLabel ? React.createElement(
      'label',
      { htmlFor: this.props.component.key, className: classLabel },
      this.props.component.label
    ) : '';
    var requiredInline = !this.props.component.label && this.props.component.validate && this.props.component.validate.required ? React.createElement('span', { className: 'glyphicon glyphicon-asterisk form-control-feedback field-required-inline', 'aria-hidden': 'true' }) : '';
    var className = this.props.component.prefix || this.props.component.suffix ? 'input-group' : '';
    var filter;
    if (typeof this.doSearch === 'function') {
      filter = function filter(dataItem, searchTerm) {
        return true;
      };
    } else {
      filter = 'contains';
    }
    return React.createElement(
      'div',
      null,
      inputLabel,
      ' ',
      requiredInline,
      React.createElement(
        'div',
        { className: className },
        React.createElement(Element, {
          data: this.state.selectItems,
          valueField: this.valueField(),
          textField: this.textField(),
          suggest: true,
          filter: filter,
          value: this.state.value,
          searchTerm: this.state.searchTerm,
          onSearch: this.onSearch,
          onChange: this.onChangeSelect,
          valueComponent: this.itemComponent(),
          itemComponent: this.itemComponent()
        })
      )
    );
  }
};