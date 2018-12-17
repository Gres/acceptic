import _ from 'lodash'
import { timeParse } from 'd3-time-format'
export const DATA_HAS_ERRORED = 'DATA_HAS_ERRORED'
export const DATA_IS_LOADING = 'DATA_IS_LOADING'
export const DATA_FETCH_DATA_SUCCESS = 'DATA_FETCH_DATA_SUCCESS'

export const dataHasErrored = hasErrored => ({
  type: DATA_HAS_ERRORED,
  hasErrored
})

export const dataIsLoading = isLoading => ({
  type: DATA_IS_LOADING,
  isLoading
})

export const dataSuccessFetch = data => ({
  type: DATA_FETCH_DATA_SUCCESS,
  ...data
})
export const dataProccess = data => {
  let seriesObj = _.get(data, ['Time Series (Daily)'], {})
  const series = Object.keys(seriesObj).map(k => {
    const parseDate = timeParse('%Y-%m-%d')
    seriesObj[k] = _.mapKeys(seriesObj[k], (value, key) => {
      let newkey = _.camelCase(key.substring(key.length, 2))
      return newkey
    })
    seriesObj[k].date = parseDate(k)
    seriesObj[k].dateStr = k
    seriesObj[k].open = +seriesObj[k].open
    seriesObj[k].high = +seriesObj[k].high
    seriesObj[k].low = +seriesObj[k].low
    seriesObj[k].close = +seriesObj[k].close
    seriesObj[k].volume = +seriesObj[k].volume
    return seriesObj[k]
  })
  return {
    meta: {
      information: _.get(data, ['Meta Data', '1. Information'], ''),
      symbol: _.get(data, ['Meta Data', '2. Symbol'], ''),
      lastRefreshed: _.get(data, ['Meta Data', '3. Last Refreshed'], {}),
      outputSize: _.get(data, ['Meta Data', '4. Output Size'], {}),
      timeZone: _.get(data, ['Meta Data', '5. Time Zone'], {})
    },
    series
  }
}

export const fetchData = url => dispatch => {
  dispatch(dataIsLoading(true))
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText)
      }

      dispatch(dataIsLoading(false))

      return response
    })
    .then(response => response.json())
    .then(data => {
      return dispatch(dataSuccessFetch(dataProccess(data)))
    })
    .catch(() => dispatch(dataHasErrored(true)))
}
