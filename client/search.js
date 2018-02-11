import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { search } from './search-helper.js';

export default class Search extends Component {
  static propTypes = {
    fields: PropTypes.object,
    filters: PropTypes.object,
    setSearchFilter: PropTypes.func,
  };

  static defaultProps = {
    fields: {},
    filters: {},
    setSearchFilter() {},
  };

  __fields = _.keys(this.props.fields);

  state = { query: '' };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });

    let query;
    if (value !== '') query = search(this.__fields, value);

    this.props.setSearchFilter(query);
  };

  render() {
    const { query } = this.state;

    return (
      <Form size="large">
        <Form.Input width={16} placeholder="Search ..." name="query" value={query} onChange={this.handleChange} />
      </Form>
    );
  }
}
