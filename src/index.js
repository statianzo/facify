const React = require('react');

const facify = (fn, context) => {
  class FacifyWrapper extends React.Component {
    constructor() {
      super(...arguments);
      this.state = {
        result: null
      };
    }

    componentWillMount() {
      const args = [...this.props.args, (...result) => {
        this.setState({result});
      }];
      fn.apply(context, args);
    }

    render() {
      if (!this.props.children || this.state.result === null) return null;
      return this.props.children.apply(null, this.state.result);
    }

  }

  FacifyWrapper.displayName = fn.name ? `Facify(${fn.name})` : `Facify`;
  FacifyWrapper.defaultProps = {
    args: []
  };

  return FacifyWrapper;
};

module.exports = facify;
