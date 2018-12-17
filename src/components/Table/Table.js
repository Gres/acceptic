import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchData } from '../../actions/data'
import Meta from '../Meta/Meta'
import _ from 'lodash'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

const mapStateToProps = state => ({
  information: _.get(state, 'data.meta.information', ''),
  symbol: _.get(state, 'data.meta.symbol', ''),
  lastRefreshed: _.get(state, 'data.meta.lastRefreshed', ''),
  outputSize: _.get(state, 'data.meta.outputSize', ''),
  timeZone: _.get(state, 'data.meta.timeZone', ''),
  series: _.get(state, 'data.series', []),
  hasErrored: state.itemsHasErrored,
  isLoading: state.itemsIsLoading
})
const mapDispatchToProps = dispatch => ({
  fetchData: url => dispatch(fetchData(url))
})
class Table extends Component {
  componentDidMount() {
    this.props.fetchData(
      'https://www.alphavantage.co/query?apikey=demo&function=TIME_SERIES_DAILY_ADJUSTED&symbol=MSFT'
    )
  }
  render() {
    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the data</p>
    }

    if (this.props.isLoading) {
      return <p>Loading…</p>
    }
    return (
      <div className="Table">
        <h1>Table</h1>
        <Meta
          information={this.props.information}
          symbol={this.props.symbol}
          lastRefreshed={this.props.lastRefreshed}
          outputSize={this.props.outputSize}
          timeZone={this.props.timeZone}
        />
        <ReactTable
          data={this.props.series}
          columns={[
            {
              Header: 'date',
              accessor: 'dateStr'
            },
            {
              Header: 'open',
              accessor: 'open'
            },
            {
              Header: 'high',
              accessor: 'high'
            },
            {
              Header: 'low',
              accessor: 'low'
            },
            {
              Header: 'close',
              accessor: 'close'
            },
            {
              Header: 'adjustedClose',
              accessor: 'adjustedClose'
            },
            {
              Header: 'volume',
              accessor: 'volume'
            },
            {
              Header: 'dividendAmount',
              accessor: 'dividendAmount'
            }
          ]}
          defaultSorted={[
            {
              id: 'dateStr',
              desc: true
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table)
