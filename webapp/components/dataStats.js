import React from 'react'
import _ from 'underscore'

import BarChart from './charts/bar'

class DataStats extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      beatRate: this.props.beatRate,
      datum: []
    }

    this.beat = this.beat.bind(this)
    this.updateDatum = this.updateDatum.bind(this)
  }
  render() {
    return (
      <BarChart datum={this.state.datum} />
    )
  }
  updateDatum(datum) {
    this.setState({
      datum: datum
    })
  }
  beat() {
    const {es} = this.props

    es.search({
      "index": 'test',
      "type": 'data',
      "body": {
        "size": 0,
        "aggs": {
          "data": {
            "terms": {
              "field": "language_code"
            },
            "aggs": {
              "language_code": {
                "top_hits": {
                  "size": this.props.history,
                  "sort": {
                    "timestamp": "desc"
                  }
                }
              }
            }
          }
        }
      }
    }).then((resp) => {
      // Mapping of ES aggs response to d3js data format
      let datum = resp.aggregations.data.buckets.map((data, series) => {
        let hits = data.language_code.hits.hits
        let values = _.map(hits, (entry, i) => {
          //return [entry._source.timestamp, entry._source.amount]
          return {x: i, y: parseInt(entry._source.amount)}
        })
        return {
          key: data.key,
          //color: this.props.colors[data.key],
          nonStackable: false,//(data.key == "de"),
          values: values
        }
      })
      this.updateDatum(datum)
    }, (err) => {
      //console.log(err)
    })
  }
  componentDidMount() {
    this.beat()
    //this.interval = setInterval(this.beat, this.state.beatRate)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
}

DataStats.defaultProps = {
  beatRate: 5000,
  history: 50
}

DataStats.propTypes = {
  es: React.PropTypes.object.isRequired
}

export default DataStats
