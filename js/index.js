


$.getJSON(
  "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json",
  function(x) {
    
    console.log("red")
    
  var data=x.monthlyVariance;
    
  var baseTemp = x.baseTemperature;
  
    
	

		// finds the lowest and highest values of variance from base temp
		// will be used to determine color of rectangle
		// increasing the min and max for a wider range
		var colorDomain = d3.extent(data.map(function(each) {
      return baseTemp + each.variance;
    }));
    var margin = { top: 20, right: 20, bottom: 30, left: 40 },
        width = 1060 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    //var colors = ["#5D2EE8", "#2F9EEE", "#2FC8EE", "#2DD91A", "#CBF22C", "#F2CE2C", "#F06E1D", "#E61717"];
    var colors = ["#5e4fa2", "#3288bd", "#66c2a5", "#abdda4", "#e6f598", "#ffffbf", "#fee08b", "#fdae61", "#f46d43", "#d53e4f", "#9e0142"];
		
    var colorRange = d3.scaleQuantile().domain(colorDomain).range(colors);
    
    var svg = d3
    .select("#map")
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
    .range([0, width -20]);
    
   
    
    var xAxis=d3.axisBottom()
    .scale(x)
    .ticks(27)
    
    
    svg
      .append('g')
    .attr('class','x axis')
      .call(xAxis)
    
    .attr(
      "transform",
      "translate(40,"+ (h-20) +")"
    );
    
//     label for x axis
    svg.append("text") 
    .attr('class','label')
      .attr("transform",
            "translate(525," + 480 + ")")
      .style("text-anchor", "middle")
      .text("Minutes Behind Fastest Time");
    
    
    
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
    
//     label for y axis
    svg.append("text")
    .attr("class","label")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",20 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Months");  
    
     var chart = d3.select(".chart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left+500 + "," + margin.top+100 + ")");
    
//     getMonths
  
    
    
    function getMonths(y){
      return months[y]
    }
    
     var tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
    
    






    
    

    // tooltip mouseover event handler
    var tipMouseover = function(data) {
     
      
      //var color = colorScale(d.manufacturer);
      var color = "black";
      var html =
        "<span><strong><i>" +  data.year +" - " +getMonths(data.month-1)   +"</i></strong></span><br/>" +
          "<span class='tip'><strong> <i>" + ((baseTemp + data.variance).toFixed(2))+"</i></strong></span><br />"+ 
         "<span class='tip'><strong><i> " +  data.variance +"</i></strong></span>"
          ;

      tooltip
        .html(html)
        .style("left", d3.event.pageX + 15 + "px")
        .style("top", d3.event.pageY - 28 + "px")
        .transition()
        .duration(200) // ms
        .style("opacity", 0.9); // started as 0!
    };
    // tooltip mouseout event handler
    var tipMouseout = function(data) {
     
      tooltip
        .transition()
        .duration(300) // ms
        .style("opacity", 0); // don't care about position!
    };
 
    
    
   
    
  
    
    var rectWidth = (width/(2015-1753));
   
    
    svg
      .selectAll(".heatBars")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bars")
      .attr("width","3px")
      .attr("height","32px")
     .attr("x", function(d) {
							return rectWidth * (d.year - 1753);
						})
		.attr("y", function(d) {
							return (d.month) *32;
						})
    .on("mouseover", tipMouseover)
    .on("mouseout", tipMouseout)
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .style("fill", function(each,i) {
							return colorRange(baseTemp + each.variance);
						});
  
    
   
   
    
    
    
  })


var color =  ["#5e4fa2", "#3288bd", "#66c2a5", "#abdda4", "#e6f598", "#ffffbf", "#fee08b", "#fdae61", "#f46d43", "#d53e4f", "#9e0142"];

var ordinal =d3.scaleOrdinal()
  .domain(["0", "2.7", "3.9", "5", "6.1","7.2","8.3","10.5","11.6","12.7"])
  .range(color);

var svg = d3.select("#legend");

svg.append("g")
  .attr("class", "legendLinear")
  .attr("transform", "translate(20,20)");

var legendLinear = d3.legendColor()
  .shapeWidth(45)
.shapeHeight(23)
  .cells(10)
  .orient('horizontal')
  .scale(ordinal)
.shapePadding(0);


svg.select(".legendLinear")
  .call(legendLinear);