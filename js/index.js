$.getJSON(
  "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json",
  function(x) {
    
  var data=x.monthlyVariance;
    
  var baseTemp = x.baseTemperature;
  
    
	

		// finds the lowest and highest values of variance from base temp
		// will be used to determine color of rectangle
		// increasing the min and max for a wider range
		var colorDomain = d3.extent(data.map(function(each) {
      return baseTemp + each.variance;
    }));
    var margin = { top: 40, right: 20, bottom: 30, left: 40 },
        width = 1060 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var colors = ["#5D2EE8", "#2F9EEE", "#2FC8EE", "#2DD91A", "#CBF22C", "#F2CE2C", "#F06E1D", "#E61717"];
		var colorRange = d3.scaleQuantile().domain(colorDomain).range(colors);
    
    var svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var years=[]
    
    var h=460
    
   for(var i=0;i<data.length;i++){
     years.push(data[i].year)
   }
   
     var chart = d3
    .select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr(
      "transform",
      "translate(" + margin.left + 500 + "," + margin.top + 100 + ")"
    );
   
    var x=d3
    .scaleLinear()
    .domain([1753,2015])
    .range([0, width ]);
    
   
    
    var xAxis=d3.axisBottom()
    .scale(x)
    .ticks(25)
    
    
    svg
      .append('g')
      .call(xAxis)
    
    .attr(
      "transform",
      "translate(40,"+ h +")"
    );
    
  	var yScale = d3.scaleLinear().domain([months]).range([0, height]);
   var yAxis = svg.append("g")
						.attr("class", "y axis")
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
						.selectAll("text")
						.data(months)
						.enter()
						.append("text")
						.text(function(d) { return d; })
						.attr("x", 0)
						.attr("y", function(d, i) { return (i+1) * 35})
						.attr("text-anchor", "end")
   ;
    
    
    
    
   
    
  
    
    var rectWidth = (width/(2015-1753));
   
    
    svg
      .selectAll(".heatBars")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bars")
      .attr("width","2px")
      .attr("height","32px")
     .attr("x", function(d) {
							return rectWidth * (d.year - 1753);
						})
		.attr("y", function(d) {
							return (d.month) *32;
						})
   
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .style("fill", function(each) {
							return colorRange(baseTemp + each.variance);
						});
  
    
   
   
    
    
    
  })