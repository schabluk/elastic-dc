import React from 'react'
import d3 from 'd3'
import nvd3 from 'nvd3'
import _ from 'underscore'

import './bullet.css'

class BulletChart extends React.Component {
  constructor(props) {
    super(props)

    console.log(props)

    this.bytesToSize = this.bytesToSize.bind(this)
  }
  bytesToSize(bytes) {
    if (bytes === 0) return '0 Byte'
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
    return Math.round(bytes / Math.pow(1024, i), 2)
  }
  componentDidMount() {
    var data = this.props.data

    var marker = data.total_in_bytes * 90 / 100 // 90%

    _.extend(this.props.chart, {
      //title: this.props.title,
      //subtitle: this.props.subtitle,
      ranges: [
        Math.round(this.bytesToSize(data.total_in_bytes)*0.6),
        Math.round(this.bytesToSize(data.total_in_bytes)*0.3),
        this.bytesToSize(data.total_in_bytes)
      ],
      measures: [
        this.bytesToSize(data.total_in_bytes)-this.bytesToSize(data.free_in_bytes)
      ],
      markers: [
        this.bytesToSize(marker)
      ]
    })

    var levels = {
      "primary": '#337ab7',
      "info":    '#5cb85c',
      "warning": '#f0ad4e',
      "error":   '#d9534f'
    }

    var color = levels[this.props.level]
    var width = 300,
      height = 40,
      margin = {top: 0, right: 0, bottom: 3, left: 0}

    nvd3.addGraph(() => {
      this.chart = nvd3.models.bulletChart()
      //this.chart.width(width - margin.right - margin.left)
      this.chart.height(height - margin.top - margin.bottom)
      this.chart.margin(margin)
      this.chart.tooltip.enabled(this.props.tips)
      this.chart.color(color)

      let svg = d3.select(this.refs.svg)
        .datum(this.props.chart)
        .transition()
        .duration(300)
        .call(this.chart)

      nvd3.utils.windowResize(this.chart.update)

      return this.chart
    })
  }
  render() {
    return (
      <div className="bullet-chart">
        <svg ref="svg"></svg>
      </div>
    )
  }
}

BulletChart.defaultProps = {
  title: 'title',
  subtitle: 'subtitle',
  level: 'primary',
  tips: true,
  chart: {
    "ranges":[100,200,300], //Minimum, mean and maximum values.
    "measures":[220], //Value representing current measurement (the thick blue line in the example)
    //"markers":[250], //Place a marker on the chart (the white triangle marker)
    "markerLabels":['Alert point (90%):'],
    "rangeLabels":['Medium:','Low:','Total capacity:'],
    "measureLabels":['Current usage']
  }
}

BulletChart.propTypes = {
}

export default BulletChart
