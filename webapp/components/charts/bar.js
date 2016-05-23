import React from 'react'
import d3 from 'd3'
import nvd3 from 'nvd3'
import moment from 'moment'

import './bar.css'

class BarChart extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    nvd3.addGraph(() => {
      this.chart = nvd3.models.multiBarChart()
        .stacked(true)
        .showLegend(true)
        .showControls(false)
        .margin({"left":50,"right":10,"top":10,"bottom":20})
        .groupSpacing(0.05)
        .height(this.props.height)
        .clipEdge(true)
        //.rotateLabels(-45)

      this.chart.xAxis.tickFormat(d3.format(',f'))
      this.chart.yAxis.tickFormat(d3.format(',.1f'))

      d3.select(this.refs.svg)
        .datum(this.props.datum)
        .transition()
        .duration(1000)
        .call(this.chart)

      nvd3.utils.windowResize(this.chart.update)

      return this.chart
    })
  }
  componentDidUpdate() {
    d3.select(this.refs.svg).datum(this.props.datum).call(this.chart)
  }
  render() {
    return (
      <div className="bar-chart" style={{height: this.props.height}}>
        <svg ref="svg"></svg>
      </div>
    )
  }
}

BarChart.defaultProps = {
  height: 200,
  tips: true,
  color: ["#1F77B4", "#E8E8E8"],
  datum: BarChart.stream_layers
}

BarChart.propTypes = {
}

  /* Inspired by Lee Byron's test data generator. */
BarChart.stream_layers = (n, m, o) => {
  o = 0
  function bump(a) {
    var x = 1 / (.1 + Math.random()),
      y = 2 * Math.random() - .5,
      z = 10 / (.1 + Math.random())
    for (var i = 0; i < m; i++) {
      var w = (i / m - y) * z
      a[i] += x * Math.exp(-w * w)
    }
  }
  return d3.range(n).map(function() {
    var a = [], i
    for (i = 0; i < m; i++) a[i] = o + o * Math.random()
    for (i = 0; i < 5; i++) bump(a)
    return a.map(this.stream_index)
  })
}

BarChart.stream_index = (d, i) => {
  return {x: i, y: Math.max(0, d)}
}

export default BarChart
