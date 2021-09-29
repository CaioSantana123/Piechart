var sales = [
  { product: 'Hoodie', count: 12 },
  { product: 'Jacket', count: 17 },
  { product: 'Snuggie', count: 60 },
];

var pie = d3.pie()
  .value(function (d) { return d.count })

var slices = pie(sales);

var arc = d3.arc()
  .innerRadius(0)
  .outerRadius(60);

// helper that returns a color based on an ID
var color = d3.scaleOrdinal(d3.schemeCategory10);

var svg = d3.select('.graph')
  .append('svg')
  .attr("class", "pie");
var g = svg.append('g')
  .attr('transform', 'translate(200, 75)');

var arcGraph = g.selectAll('path.slice')
  .data(slices)
  .enter();
arcGraph.append('path')
  .attr('class', 'slice')
  .attr('d', arc)
  .attr('fill', function (d) {
    return color(d.data.product);
  })
  .append("title")
  .text(function (d) { return "Eu sou um setor do grafico com valor: " + d.data.count });

arcGraph.append("text")
  .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })
  .attr("dy", "0.35em")
  .text(function (d) { return d.data.count });
// building a legend is as simple as binding
// more elements to the same data. in this case,
// <text> tags
svg.append('g')
  .attr('class', 'legend')
  .selectAll('text')
  .data(slices)
  .enter()
  .append('text')
  .attr('class', 'legenda')
  .text(function (d) { return '- ' + d.data.product; })
  .attr('fill', function (d) { return color(d.data.product); })
  .attr('y', function (d, i) { return 20 * (i + 1); })
  .append("title")
  .text(function (d) { return "Eu sou uma legenda e minha cor representa: " + d.data.product })
