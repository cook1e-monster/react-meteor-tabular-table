import React, { Component } from 'react';

import TableBody from './tableBody.js';
import Search from './search.js';
import { Select, Form } from 'semantic-ui-react';
import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';

import 'semantic-ui-css/semantic.min.css';

export default class SmartTable extends Component {
  constructor(props) {
    super(props);

    const defaultStates = {
      name: props.options.collection._name,
      page: 1,
      perPage: 25,
      filters: {},
      fields: {},
      skip: 0,
      sort: {},
      reactive: true,
      debug: false,
    };

    Object.assign(defaultStates, props.options);

    props.options.columns.forEach((column) => {
      if (column.data) Object.assign(defaultStates.fields, { [column.data]: 1 });
    });

    this.state = defaultStates;
  }

  static propTypes = {
    options: PropTypes.object,
  };

  componentWillReceiveProps({ options }) {
    this.setState({ filters: options.filters });
  }

  // == setters ------------------------
  setFilters(filters) {
    this.setState(filters);
  }

  sortBy(sortBy) {
    this.setState(prevState => ({
      sort: { [sortBy]: prevState.sort[sortBy] ? -prevState.sort[sortBy] : -1 },
    }));
  }

  search(query) {
    let filters;
    if (typeof query === 'string') {
      filters = query;
    } else {
      filters = Object.assign({}, this.props.options.filters);
      if (query) Object.assign(filters, query);
    }

    // create empty filter and add props filters
    this.setState({ filters, page: 1 });
  }

  // == render ----------------------------
  render() {
    const {
      name, page, fields, sort, skip, limit, reactive, filters, perPage, debug,
    } = this.state;
    const { collection, title, columns } = this.props.options;

    const options = {
      name,
      fields,
      sort,
      skip: (page - 1) * perPage + skip,
      limit: perPage,
      reactive,
      debug: debug || false,
    };

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="box">
            <div className="box-header with-border">
              {title ? <h3>{title}</h3> : null}

              <div className="row">
                <div className="col-md-3 col-xs-12 col-sm-6 tabular-header">
                  <Form size="large">
                    <Select
                      onChange={(e, data) => {
                        const { value } = data;
                        this.setState({ perPage: Number(value) });
                      }}
                      placeholder="Show entries"
                      options={[{ value: 25, text: 25 }, { value: 50, text: 50 }, { value: 100, text: 100 }]}
                    />
                  </Form>
                </div>

                <div className="col-md-3 col-xs-12 col-sm-6 col-md-offset-6">
                  <Search fields={fields} filters={filters} setSearchFilter={this.search} />
                </div>
              </div>
            </div>

            <div className="box-body">
              <TableBody
                sortBy={this.sortBy}
                collection={collection}
                options={options}
                filters={filters}
                currentPage={page}
                setFilters={this.setFilters}
                columns={columns}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
