import React from 'react'
import d3 from 'd3'
import nvd3 from 'nvd3'

import './usagepie.css'

class UsagePie extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {

    nvd3.addGraph(() => {
      this.chart = nvd3.models.pieChart()
          .x(function(d) { return d.label })
          .y(function(d) { return d.value })
          .showLabels(true)
      this.chart.tooltip.enabled(false)
      this.chart.color(this.props.color)
      this.chart.showLegend(false)
      //this.chart.legendPosition("bottom")
      this.chart.labelType(function(d, i, values) {
        return values.value
      })
      this.chart.growOnHover(false)
      this.chart.duration(1000)
      this.chart.donut(true)
      this.chart.donutRatio(0.3)
      this.chart.labelsOutside(false)
      this.chart.margin({"left":5,"right":5,"top":5,"bottom":5})
      this.chart.title(this.props.title)

      d3.select(this.refs.svg)
        .datum(this.props.datum)
        .transition()
        .duration(350)
        .call(this.chart)

      //nvd3.utils.windowResize(this.chart.update)

      return this.chart
    })
  }
  componentDidUpdate() {
    !this.chart || d3.select(this.refs.svg).datum(this.props.datum).call(this.chart)
  }
  render() {
    return (
      <svg ref="svg"></svg>
    )
  }
}

UsagePie.defaultProps = {
  title: 'Usage Chart',
  tips: true,
  color: ["#66ccff", "#f4f4f4", "#33CCCC"],
  legend: [{key: "legend"}]
}

UsagePie.propTypes = {
}

export default UsagePie
