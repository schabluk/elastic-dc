Sparkline = React.createClass({
  getDefaultProps() {
    return {
      tips: true,
      color: ["#1F77B4", "#E8E8E8"]
    }
  },
  componentDidUpdate() {
    d3.select(this.refs.svg).datum(this.props.datum).call(this.chart)
  },
  componentDidMount() {
    var self = this

    nv.addGraph(function() {
      self.chart = nv.models.stackedAreaChart()

      d3.select(self.refs.svg)
        .datum(self.props.datum)
        .transition()
        .duration(300)
        .call(self.chart)

      nv.utils.windowResize(self.chart.update)

      return self.chart
    })

  },
  render() {
    return (
      <div className="sparkline">
        <svg ref="svg"></svg>
      </div>
    )
  }
})
