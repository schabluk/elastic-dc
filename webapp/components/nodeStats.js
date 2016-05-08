import React from 'react'
import _ from 'underscore'

import UsagePie from './charts/usagepie'
import AreaChart from './charts/area'
import BulletChart from './charts/bullet'

import './node.css'

class NodeStats extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      beatRate: this.props.beatRate,
      datum: {
        mem: [],
        cpu: []
      },
      histm: {
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
      <div className="container-fluid" style={{paddingBottom: '0px'}}>
        <div className="row">
          <div className="col-xs-6 chart" style={{paddingRight: '3px'}}>
            <UsagePie
              title="CPU"
              datum={this.state.datum.cpu}
              color={["#FF9933", "#f4f4f4"]}
              legend={[{key: "used"}, {key: "idle"}]} />
          </div>
          <div className="col-xs-6 chart" style={{paddingLeft: '3px'}}>
            <UsagePie
              title="MEM"
              datum={this.state.datum.mem}
              color={["#5B98C3", "#f4f4f4"]}
              legend={[{key: "usage"}, {key: "free"}]}  />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 chart" style={{padding: '3px'}}>
            <small>CPU</small>
            <AreaChart
              color={["#FF9933", "#E8E8E8"]}
              datum={this.state.histm.cpu} />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 chart" style={{padding: '3px'}}>
            <small>Memory</small>
            <AreaChart
              color={["#1F77B4", "#E8E8E8"]}
              datum={this.state.histm.mem} />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 chart" style={{padding: '3px'}}>
            <small>Storage</small>
            <BulletChart data={this.state.disk} title="Storage" />
          </div>
        </div>
      </div>
    )
  }
  updateDatum(stat, hist, disk) {
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
      },
      histm: {
        cpu: [{
          "key" : "Used" ,
          "values" : _.map(hist, (entry, i) => {
            return [entry._source.timestamp, entry._source.os.cpu_percent]
          })
        }],
        mem: [{
          "key" : "Used" ,
          "values" : _.map(hist, (entry, i) => {
            return [entry._source.timestamp, entry._source.os.mem.used_percent]
          })
        }]
      },
      disk: disk
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
      let stat = _.first(hist)._source
      let disk = _.first(stat.fs.data)

      this.updateDatum(stat, hist, disk)

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
