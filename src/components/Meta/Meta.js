import React, { PureComponent } from 'react'
import * as PropTypes from 'prop-types'
class Meta extends PureComponent {
  render() {
    return (
      <>
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
      </>
    )
  }
}

Meta.propTypes = {
  information: PropTypes.any,
  symbol: PropTypes.any,
  lastRefreshed: PropTypes.any,
  outputSize: PropTypes.any,
  timeZone: PropTypes.any
}
export default Meta
