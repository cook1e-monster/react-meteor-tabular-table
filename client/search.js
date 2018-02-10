import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';

function search(fields, query) {
  let re = /(\w+)([ ]?:[ ]?)(\w+)/i;
  let r = re.exec(query);

  if (r && r.length === 4) {
    let q = r[3] === 'true' || r[3] === 'false' ? `{"${r[1]}": ${r[3]}}` : `{"${r[1]}": "${r[3]}"}`;
    return JSON.parse(q);
  } else {
    let search = fields.map((field) => {
      return { [field]: { $regex: query, $options: 'i' } };
    });

    return { $or: search };
  }
}

export default class Search extends Component {
  static propTypes = {
    fields: PropTypes.object,
    filters: PropTypes.object,
    setSearchFilter: PropTypes.func
  };

  __fields = _.keys(this.props.fields);

  state = { query: '' };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });

    let query = null;

    if (value !== '') {
      query = search(this.__fields, value);
    }

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
