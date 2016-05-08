import React from 'react'
import d3 from 'd3'
import nvd3 from 'nvd3'
import moment from 'moment'

import './area.css'

class AreaChart extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {

    nvd3.addGraph(() => {
      this.chart = nvd3.models.stackedAreaChart()
        .x((d) => { return d[0] })
        .y((d) => { return d[1] })
        .showYAxis(false)
        .showXAxis(false)
        .showLegend(false)
        .showControls(false)
        .clipEdge(false)
        .margin({"left":0,"right":0,"top":5,"bottom":0})
        .color(this.props.color)
        //.height(50)
        //.width(280) // 100% when not set

      this.chart.tooltip.enabled(this.props.tooltip)

      // Format x-axis labels with custom function.
      // https://github.com/mbostock/d3/wiki/Time-Formatting
      this.chart.xAxis.tickFormat((d) => {
        return moment(d).fromNow()
      })
      this.chart.yAxis.tickFormat(d3.format(',.0f'))

      d3.select(this.refs.svg)
        .datum(this.props.datum)
        .transition()
        .duration(300)
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
      <div className="area-chart">
        <svg ref="svg"></svg>
      </div>
    )
  }
}

AreaChart.defaultProps = {
  title: 'Usage History',
  tips: true,
  color: ["#1F77B4", "#E8E8E8"],
  legend: [{key: "legend"}]
}

AreaChart.propTypes = {
}

export default AreaChart
