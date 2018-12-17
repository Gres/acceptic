import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchData } from '../../actions/data'
import Meta from '../Meta/Meta'
import _ from 'lodash'

import { scaleTime } from 'd3-scale'
import { utcDay } from 'd3-time'

import { ChartCanvas, Chart } from 'react-stockcharts'
import { CandlestickSeries } from 'react-stockcharts/lib/series'
import { XAxis, YAxis } from 'react-stockcharts/lib/axes'
import { fitWidth } from 'react-stockcharts/lib/helper'
import { last, timeIntervalBarWidth } from 'react-stockcharts/lib/utils'

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
class ChartWrapper extends Component {
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
    if (_.isEmpty(this.props.series)) {
      return null
    }
    const { type = 'hybrid', series, ratio = 0.6 } = this.props
    const data = _.reverse(series)
    const width = 1000
    const xAccessor = d => d.date
    const xExtents = [
      xAccessor(last(series)),
      xAccessor(series[series.length - 100])
    ]
    return (
      <div className="Chart">
        <h1>Chart</h1>
        <Meta
          information={this.props.information}
          symbol={this.props.symbol}
          lastRefreshed={this.props.lastRefreshed}
          outputSize={this.props.outputSize}
          timeZone={this.props.timeZone}
        />

        <ChartCanvas
          height={400}
          ratio={ratio}
          width={width}
          margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
          type={type}
          seriesName="MSFT"
          data={data}
          xAccessor={xAccessor}
          xScale={scaleTime()}
          xExtents={xExtents}>
          <Chart id={1} yExtents={d => [d.high, d.low]}>
            <XAxis axisAt="bottom" orient="bottom" ticks={6} />
            <YAxis axisAt="left" orient="left" ticks={5} />
            <CandlestickSeries width={timeIntervalBarWidth(utcDay)} />
          </Chart>
        </ChartCanvas>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartWrapper)
