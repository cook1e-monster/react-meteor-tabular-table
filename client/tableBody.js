import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Paginator from './paginator.js';
import { Table, Loader, Dimmer } from 'semantic-ui-react';

class TableBody extends Component {
  handlePage = (value) => {
    this.props.setFilters({ page: value });
  };

  __renderColumn(val, item, doc) {
    if (item.render && typeof item.render === 'function') return item.render(val, item, doc);
    return typeof val !== 'boolean' ? val : '';
  }

  render() {
    const { documents, columns, options, loading } = this.props;

    return (
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            {columns.map((item, key) => {
              let icon = !options.sort[item.data] || options.sort[item.data] === 1 ? 'down' : 'up';

              return (
                <Table.HeaderCell
                  onClick={() => {
                    if (item && item.data) this.props.sortBy(item.data);
                  }}
                  key={key}
                  className="pointer">
                  <p>
                    {item.title}

                    {item.data ? (
                      <span className="pull-right-container">
                        <i className={`fa fa-angle-${icon}`} />
                      </span>
                    ) : null}
                  </p>
                </Table.HeaderCell>
              );
            })}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {loading || documents.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={columns.length}>
                {loading ? (
                  <Dimmer active inverted>
                    <Loader />
                  </Dimmer>
                ) : (
                  <p className="text-center">Table is Empty</p>
                )}
              </Table.Cell>
            </Table.Row>
          ) : (
            documents.map((column, key) => {
              return (
                <Table.Row key={key}>
                  {columns.map((item, key) => {
                    return <Table.Cell key={key}>{this.__renderColumn(column[item.data], item, column)}</Table.Cell>;
                  })}
                </Table.Row>
              );
            })
          )}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan={columns.length}>
              <p>
                <i>Total documents {this.props.totalItems}</i>
              </p>
              {documents.length > 0 && this.props.pagination.totalPages > 1 ? (
                <Paginator pagination={this.props.pagination} handlePage={this.handlePage} />
              ) : null}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }
}

export default withTracker(({ collection, filters, options, currentPage, setFilter }) => {
  const subscriptionName = options.name || collection._name;
  const handlerSubscription = Meteor.subscribe(subscriptionName, filters, options);

  var documents = [];

  if (handlerSubscription.ready()) {
    let query = { [`sub_${handlerSubscription.subscriptionId}`]: 1 };
    let optionsFind = { fields: options.fields, sort: options.sort };

    documents = collection.find(query, optionsFind).fetch();
  }

  const totalItems = Counts.get(`sub_count_${handlerSubscription.subscriptionId}`) || 0;
  let totalPages = Math.ceil(totalItems / options.limit || 1);
  if (currentPage > 1 && totalItems <= options.limit * currentPage) currentPage = totalPages;

  return {
    loading: !handlerSubscription.ready(),
    pagination: { totalPages, currentPage, limit: options.limit },
    totalItems,
    documents
  };
})(TableBody);
