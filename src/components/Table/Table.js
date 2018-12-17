import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchData } from '../../actions/data'
import _ from 'lodash'
const mapStateToProps = state => ({
  information: _.get(state, 'data.meta.information', ''),
  symbol: _.get(state, 'data.meta.symbol', ''),
  lastRefreshed: _.get(state, 'data.meta.lastRefreshed', ''),
  outputSize: _.get(state, 'data.meta.outputSize', ''),
  timeZone: _.get(state, 'data.meta.timeZone', ''),
  // series: state.data.
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
        <dl>
          <dt>Information</dt>
          <dd>{this.props.information}</dd>
        </dl>
        <dl>
          <dt>Symbol</dt>
          <dd>{this.props.symbol}</dd>
        </dl>
        <dl>
          <dt>Last refreshed</dt>
          <dd>{this.props.lastRefreshed}</dd>
        </dl>
        <dl>
          <dt>Output Size</dt>
          <dd>{this.props.outputSize}</dd>
        </dl>
        <dl>
          <dt>TimeZone</dt>
          <dd>{this.props.timeZone}</dd>
        </dl>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table)
