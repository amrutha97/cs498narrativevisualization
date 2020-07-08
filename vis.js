// --------------------------------------------------------------------------------// 
// D3 Code for CS 498 Final Project - By Amrutha Gujjar
// --------------------------------------------------------------------------------// 

// --------------------------------------------------------------------------------// 
// SETUP --------------------------------------------------------------------------//
// --------------------------------------------------------------------------------// 

// Retrieve the scenes
var scene1 = d3.select('#scene1')
var scene2 = d3.select('#scene2')
var scene3 = d3.select('#scene3')

// constants
var width = 900
var height = 900

var margin = { top: 10, right: 100, bottom: 50, left: 50 },
    width = 1000 - margin.left - margin.right,
    height = 1000 - margin.top - margin.bottom;

// axis definition
var x = d3.scaleBand()
    .domain([10, 20, 30, 40, 50])
    .range([0, width]);

var y = d3.scaleLinear()
    .domain([0, 45])
    .range([height, 0]);

var xAxis = d3.axisBottom()
    .scale(x)
    .ticks(5);

var yAxis = d3.axisLeft()
    .scale(y)
    .ticks(5);

// axis appends

scene1.append("g")
    .attr("transform", "translate(50,960)")
    .attr("class", "axis")
    .call(xAxis);

scene1.append("g")
    .attr("transform", "translate(50,20)")
    .attr("class", "axis")
    .call(yAxis);

scene2.append("g")
    .attr("transform", "translate(50,360)")
    .attr("class", "axis")
    .call(xAxis);

scene3.append("g")
    .attr("transform", "translate(50,960)")
    .attr("class", "axis")
    .call(xAxis);

scene3.append("g")
    .attr("transform", "translate(50,20)")
    .attr("class", "axis")
    .call(yAxis);

// axis labels
scene1.append('text')
    .attr('x', -500)
    .attr('y', 15)
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .text('Y Axis Label -- TODO')

scene1.append('text')
    .attr('x', 500)
    .attr('y', 990)
    .attr('text-anchor', 'middle')
    .text('X Axis Label -- TODO')

scene2.append('text')
    .attr('x', 500)
    .attr('y', 390)
    .attr('text-anchor', 'middle')
    .text('Average Highway MPG')

scene3.append('text')
    .attr('x', -500)
    .attr('y', 15)
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .text('Y Axis Label -- TODO')

scene3.append('text')
    .attr('x', 500)
    .attr('y', 990)
    .attr('text-anchor', 'middle')
    .text('X Axis Label -- TODO')

// --------------------------------------------------------------------------------// 
// SCENE ONE ----------------------------------------------------------------------//
// --------------------------------------------------------------------------------// 

async function load() {
    d3.csv("https://flunky.github.io/cars2017.csv").then(function (d) {

        var histogram = d3.histogram()
            .value(function (d) { return d.Make; })   // I need to give the vector of value
            .domain(x.domain())  // then the domain of the graphic
        // .thresholds(x.ticks(70)); // then the numbers of bins

        var bins = histogram(d);

        // scene1.selectAll("rect")
        //     .data(bins)
        //     .enter()
        //     .append("rect")
        //     .attr("x", 1)
        //     .attr("transform", function (d) { return "translate(" + x(d.AverageHighwayMPG) + "," + y(d.AverageHighwayMPG) + ")"; })
        //     .attr("width", function (d) { return x(d.AverageHighwayMPG) - x(d.AverageHighwayMPG) - 1; })
        //     .attr("height", function (d) { return height - y(d.AverageHighwayMPG); })
        //     .style("fill", function (d) { return myColor(d) })
    })

}

load()

// --------------------------------------------------------------------------------// 
// SCENE TWO ----------------------------------------------------------------------//
// --------------------------------------------------------------------------------// 

var keys_cyls = ["2", "4", "6", "8", "10", "12"]
var myColor = d3.scaleOrdinal()
    .domain(keys_cyls)
    .range(["yellowgreen", "green", "blue", "purple", "orange", "red"]);

var tooltip = d3.select("body").append("div")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "black")
    .style("border-radius", "5px")
    .style("padding", "15px")
    .style("color", "white")

// Legend
var size = 20
scene2.selectAll("legend")
    .data(keys_cyls)
    .enter()
    .append("rect")
    .attr("x", 100)
    .attr("y", function (d, i) { return 200 + i * (size + 5) })
    .attr("width", size)
    .attr("height", size)
    .style("fill", function (d) { return myColor(d) })
    .on("mouseover", function (d) { highlight(d) })
    .on("mouseleave", function (d) { noHighlight(d) })

scene2.selectAll("labels")
    .data(keys_cyls)
    .enter()
    .append("text")
    .attr("x", 100 + size * 1.2)
    .attr("y", function (d, i) { return 200 + i * (size + 5) + (size / 2) })
    .style("fill", function (d) { return myColor(d) })
    .text(function (d) { return d })
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")
    .on("mouseover", highlight)
    .on("mouseleave", noHighlight)

scene2.append('rect')
    .attr("x", 300)
    .attr("y", 200)
    .attr("width", 500)
    .attr("height", 30)
    .style("fill", 'lightgray')

scene2.append('text')
    .attr("x", 310)
    .attr("y", 220)
    .attr("width", 60)
    .attr("height", 20)
    .style("fill", 'black')
    .text("Fewer engineer cylinders are largely correlated with better mileage.")
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")

var highlight = function (d) {
    scene2.selectAll(".datapt").style("opacity", .05)
    scene2.selectAll(".a" + d).style("opacity", 1)
}

var noHighlight = function (d) {
    d3.selectAll(".datapt").style("opacity", 1)
}

async function init() {
    d3.csv("https://flunky.github.io/cars2017.csv").then(function (d) {
        scene2.selectAll("p")
            .append("g")
            .data(d)
            .enter()
            .append("circle")
            .attr("class", function (d) { return "datapt " + "a" + d.EngineCylinders })
            .attr("cx", function (d) { return d.AverageHighwayMPG * 20 })
            .attr("cy", function (d) { return 300 })
            .attr("r", function (d) { return d.AverageHighwayMPG / 2 })
            .attr("fill", function (d) {
                return myColor(d.EngineCylinders)
            })
            .on("mouseover", function (d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html(d.Make)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
    })
}

// --------------------------------------------------------------------------------// 
// SCENE THREE --------------------------------------------------------------------//
// --------------------------------------------------------------------------------// 

// Reference: https://www.d3-graph-gallery.com/graph/connectedscatter_select.html