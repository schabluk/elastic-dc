import React from 'react'
import _ from 'underscore'

import UsagePie from './charts/usagepie'

import './node.css'

class NodeStats extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      beatRate: this.props.beatRate,
      datum: {
        mem: [],
        cpu: []
      }
    }

    this.beat = this.beat.bind(this)
    this.updateDatum = this.updateDatum.bind(this)
  }
  render() {
    if(_.isEmpty(this.state.datum.mem) || _.isEmpty(this.state.datum.cpu)) {
      return (
        <li className="list-group-item"><small>No stats</small></li>
      )
    }
    return (
      <li className="list-group-item container-fluid">
        <div className="row">
          <div className="col-xs-6" style={{paddingRight: '3px'}}>
            <UsagePie
              title="CPU"
              datum={this.state.datum.cpu}
              color={["#FF9933", "#f4f4f4"]}
              legend={[{key: "used"}, {key: "idle"}]} />
          </div>
          <div className="col-xs-6" style={{paddingLeft: '3px'}}>
            <UsagePie
              title="MEM"
              datum={this.state.datum.mem}
              color={["#5B98C3", "#f4f4f4"]}
              legend={[{key: "usage"}, {key: "free"}]}  />
              </div>
        </div>
      </li>
    )
  }
  updateDatum(stat) {
    this.setState({
      datum: {
        cpu: [{
          "label": "used", "value": stat.os.cpu_percent
        }, {
          "label": "idle", "value": (100 - stat.os.cpu_percent)
        }],
        mem: [{
          "label": "used", "value": stat.os.mem.used_percent
        }, {
          "label": "idle", "value": stat.os.mem.free_percent
        }]
      }
    })
  }
  beat() {
    const {es} = this.props

    es.search({
      "index": 'nodes',
      "type": 'stats',
      "body": {
        "size": 0,
        "query": {
          "filtered": {
            "filter": {
              "range": {
                "timestamp": {
                  "gt": "now-24h"
                }
              }
            }
          }
        },
        "aggs": {
          "nodes": {
            "terms": {
              "field": "name"
            },
            "aggs": {
              "history": {
                "top_hits": {
                  "size": this.props.history,
                  "sort": {
                    "timestamp": "desc"
                  },
                  "_source": {
                    "include": [
                      "name", "attributes", "timestamp", "os", "fs"
                    ]
                  }
                }
              }
            }
          }
        }
      }
    }).then((resp) => {
      let node = _.first(resp.aggregations.nodes.buckets)
      let hist = node.history.hits.hits
      let stat = _.first(hist)._source // latest value

      this.updateDatum(stat)
    }, (err) => {
      console.log(err)
    })
  }
  componentDidMount() {
    this.beat()
    this.interval = setInterval(this.beat, this.state.beatRate)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
}

NodeStats.defaultProps = {
  beatRate: 5000,
  history: 60
}

NodeStats.propTypes = {
  es: React.PropTypes.object.isRequired
}

export default NodeStats
