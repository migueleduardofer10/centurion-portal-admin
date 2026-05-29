import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
const { SearchBar } = Search;

var products = [
  {
    id: '399272253',
    customer: 'Rachel Schwartz',
    shipTo: 'NY',
    basePrice: '$255,000',
    purchasedPrice: '$255,000',
    status: 'Performing',
    action: ''
  },
  {
    id: '399252111',
    customer: 'Adrian Monarrez',
    shipTo: 'MA',
    basePrice: '$206,250',
    purchasedPrice: '$206,250',
    status: 'Performing',
    action: ''
  },
  {
    id: '399222774',
    customer: 'Chris Nguyen',
    shipTo: 'MA',
    basePrice: '$204,750',
    purchasedPrice: '$0',
    status: 'Paid Off',
    action: ''
  },
  {
    id: '399154441',
    customer: 'Efrain Herrera',
    shipTo: 'CA',
    basePrice: '$581,250',
    purchasedPrice: '$0',
    status: 'Paid Off',
    action: ''
  },
];

const columns = [
  {
    dataField: 'id',
    text: 'Loan Account',
    sort: true
  }, {
    dataField: 'customer',
    text: 'Borrower Name',
    sort: true
  }, {
    dataField: 'shipTo',
    text: 'State',
    sort: true
  }, {
    dataField: 'basePrice',
    text: 'Original Balance',
    sort: true
  }, {
    dataField: 'purchasedPrice',
    text: 'Principal Balance',
    sort: true
  }, {
    dataField: 'status',
    text: 'Status',
    sort: true,
    formatter: (cellContent, row) => {
      if (cellContent === 'On hold') {
        return (
          <label className="badge badge-info">On hold</label>
        );
      } else if (cellContent === 'Paid Off' ) {
        return (
          <label className="badge badge-danger">Paid Off</label>
        );
      } else if (cellContent === 'Performing') {
        return (
          <label className="badge badge-success">Performing</label>
        );
      } else if (cellContent === 'Open') {
        return (
          <label className="badge badge-warning">Open</label>
        );
      }
    }
  }, {
    dataField: 'action',
    text: 'Action',
    sort: false,
    formatter: () => {
      return (
        <div>
          <button className="btn btn-light">
            <i className="mdi mdi-eye-outline text-primary"></i>View
          </button>
          <button className="btn btn-light">
                  <i className="mdi mdi-format-list-bulleted-type"></i>Add To Board
          </button>
        </div>
      );
    }
  }
];

const defaultSorted = [{
  dataField: 'id',
  order: 'desc'
}];

export class Orders extends Component {
  render() {
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title">
            Loans
          </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Portfolio</a></li>
              <li className="breadcrumb-item active" aria-current="page">Loans</li>
            </ol>
          </nav>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Loans</h4>
                <div className="row mb-4">
                  <div className="col-12">
                    <div className="alert alert-warning" role="alert">
                        <strong>Heads up!</strong> This alert needs your attention, but it's not super important.
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <ToolkitProvider
                      keyField="id"
                      bootstrap4
                      data={ products }
                      columns={ columns }
                      search
                    >
                      {
                        props => (
                          <div>
                            <div className="d-flex align-items-center">
                              <p className="mb-2 mr-2">Search in table:</p>
                              <SearchBar { ...props.searchProps } />
                            </div>
                            <BootstrapTable
                              defaultSorted={ defaultSorted }
                              pagination={ paginationFactory() }
                              { ...props.baseProps }
                              wrapperClasses="orders-table table-responsive"
                            />
                          </div>
                        )
                      }
                    </ToolkitProvider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Orders
