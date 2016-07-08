import React, { Component } from "react";
import ReactDOM from "react-dom";
import Formio from "react-formio";

console.warn(Formio);

class Basic extends Component {

  render() {
    return (
        <Formio src="https://cuhqoldzmguzcun.form.io/registerpacient" />
      );
   }
}

ReactDOM.render(React.createFactory(Basic)(), document.getElementById("example"));
