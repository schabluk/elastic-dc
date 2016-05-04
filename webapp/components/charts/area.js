AreaChart = React.createClass({
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
        .x(function(d) { return d[0] })   //We can modify the data accessor functions...
        .y(function(d) { return d[1] })   //...in case your data is formatted differently.
        .showYAxis(false)
        .showXAxis(false)
        .showLegend(false)
        .showControls(false)
        .clipEdge(false)
        .margin({"left":0,"right":0,"top":5,"bottom":0})
        .color(self.props.color)
        //.height(50)
        .width(280) // 100% when not set

      // Format x-axis labels with custom function.
      // https://github.com/mbostock/d3/wiki/Time-Formatting
      self.chart.xAxis.tickFormat(function(d) {
         return moment(d).fromNow()
      })
      self.chart.yAxis.tickFormat(d3.format(',.0f'))

      d3.select(self.refs.svg)
        .datum(self.props.datum)
        .transition()
        .duration(300)
        .call(self.chart)

      //nv.utils.windowResize(self.chart.update)

      return self.chart
    })

  },
  render() {
    return (
      <div className="area-chart">
        <svg ref="svg"></svg>
      </div>
    )
  }
})
