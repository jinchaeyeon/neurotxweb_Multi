export default function getRealTimeChart(notuseTrans) {
  const d3 = document.createElement("script");
  d3.src = "https://d3js.org/d3.v4.min.js";
  d3.async = true;
  var chart_width = "100%";

  var margin = { top: 20, right: 20, bottom: 20, left: 70 },
    width = chart_width,
    height = 90,
    duration = 1000,
    color = d3.schemeCategory10;

  function chart(selection) {
    selection.each(function (data) {
      data = ["x"].map(function (c) {
        return {
          label: c,
          values: data.map(function (d) {
            return { time: d.time, value: d.x };
          }),
        };
      });

      var t = d3.transition().duration(duration).ease(d3.easeLinear),
        x = d3
          .scaleLinear()
          .rangeRound([0, width - margin.left - margin.right]),
        y = d3
          .scaleLinear()
          .rangeRound([height - margin.top - margin.bottom, 0]),
        z = d3.scaleOrdinal(color);

      var xMin = d3.min(data, function (c) {
        return d3.min(c.values, function (d) {
          return d.time;
        });
      });
      var xMax = d3.max(data, function (c) {
        return d3.max(c.values, function (d) {
          return d.time;
        });
      });

      x.domain([xMin, xMax]);

      var y_minV = d3.min(data, function (c) {
        return d3.min(c.values, function (d) {
          return d.value;
        });
      });
      var y_maxV = d3.max(data, function (c) {
        return d3.max(c.values, function (d) {
          return d.value;
        });
      });

      y_maxV = y_maxV + (y_maxV - y_minV) / 100;
      y_minV = y_minV - (y_maxV - y_minV) / 100;

      y.domain([y_minV, y_maxV]);
      z.domain(
        data.map(function (c) {
          return c.label;
        })
      );

      var line = d3
        .line()
        .x(function (d) {
          return x(d.time);
        })
        .y(function (d) {
          return y(d.value);
        });

      var svg = d3.select(this).selectAll("svg").data([data]);
      var gEnter = svg.enter().append("svg").append("g");
      gEnter.append("g").attr("class", "axis x");
      gEnter.append("g").attr("class", "axis y");
      gEnter
        .append("defs")
        .append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width - margin.left - margin.right)
        .attr("height", height - margin.top - margin.bottom);
      gEnter
        .append("g")
        .attr("class", "lines")
        .attr("clip-path", "url(#clip)")
        .selectAll(".data")
        .data(data)
        .enter()
        .append("path")
        .attr("class", "data");

      var legendEnter = gEnter
        .append("g")
        .attr("class", "legend")
        .attr(
          "transform",
          "translate(" + (width - margin.right - margin.left - 125) + ",25)"
        );

      legendEnter
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("y", function (d, i) {
          return i * 20 + 20;
        })
        .attr("x", 5)
        .attr("fill", function (d) {
          return z(d.label);
        });

      var svg = selection.select("svg");
      svg.attr("width", width).attr("height", height);
      var g = svg
        .select("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      if (y_maxV - y_minV > 0 && y_maxV - y_minV < 1 && y_maxV < 1) {
        var p = Math.max(
          0,
          d3.precisionRound((y_maxV - y_minV) / 10, y_maxV) - 1
        );
        g.select("g.axis.y")
          .transition(t)
          .attr("class", "axis y")
          .call(d3.axisLeft(y).tickFormat(d3.format("." + p + "e")));
      } else {
        g.select("g.axis.y")
          .transition(t)
          .attr("class", "axis y")
          .call(d3.axisLeft(y));
      }

      g.select("defs clipPath rect")
        .transition(t)
        .attr("width", width - margin.left - margin.right)
        .attr("height", height - margin.top - margin.right);

      if (notuseTrans) {
        g.selectAll("g path.data")
          .data(data)
          .style("stroke", "#fff")
          .style("stroke-width", 1)
          .style("fill", "none")
          .transition()
          .duration(duration * 10)
          .ease(d3.easeLinear)
          .on("start", tick);
      } else {
        g.selectAll("g path.data")
          .data(data)
          .style("stroke", "#fff")
          .style("stroke-width", 1)
          .style("fill", "none")
          .transition()
          .duration(duration)
          .ease(d3.easeLinear)
          .on("start", tick);
      }

      var text_x = 5;
      if (y_maxV - y_minV < 1) text_x = -75;

      g.selectAll("g .legend text")
        .data(data)
        .attr("x", text_x)
        .text(function (d) {
          if (d.label.toUpperCase() == "X") {
            if (y_maxV - y_minV < 1)
              return "Last Value" + ": " + d.values[d.values.length - 1].value;
            else
              return (
                "Last Value" +
                ": " +
                d.values[d.values.length - 1].value.toFixed(3)
              );
          }
        });

      function tick() {
        d3.select(this)
          .attr("d", function (d) {
            return line(d.values);
          })
          .attr("transform", null);

        var xMinLess = xMin - duration / 10;
        d3.active(this)
          .attr("transform", "translate(" + x(xMinLess) + ",0)")
          .transition()
          .on("start", tick);
      }
      function stop() {
        d3.interrupt(d3.select(this));
      }
    });
  }

  chart.margin = function (_) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  };

  chart.width = function (_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function (_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.color = function (_) {
    if (!arguments.length) return color;
    color = _;
    return chart;
  };

  chart.duration = function (_) {
    if (!arguments.length) return duration;
    duration = _;
    return chart;
  };

  return chart;
}
