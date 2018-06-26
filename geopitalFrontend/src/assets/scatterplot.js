let allHospitals;
let modifiedHospitals = [];
let xCoordinateNumAttribute;
let yCoordinateNumAttribute;
let allNumAttributes = [];
let allXCoordValues = [];
let allYCoordValues = [];
let sumOfXValues = 0;
let sumOfYValues = 0;
let graphSvg;
let tooltip;

const width = window.innerWidth / 3;
const height = width / 1.5;
const margin = { top: 20, right: 100, bottom: 20, left: 100 };

const xScale = d3.scale.linear().range([0, width]);
const yScale = d3.scale.linear().range([height, 0]);

const xAxis = d3.svg.axis().scale(xScale).orient("bottom");
const yAxis = d3.svg.axis().scale(yScale).orient("left");

function drawGraph(hospitals, numAttributes) {

  allHospitals = hospitals;
  allNumAttributes = numAttributes;

  xCoordinateNumAttribute = numAttributes.find(function ( obj ) {
    return obj.code === "AnzStand";
  });

  yCoordinateNumAttribute = numAttributes.find(function ( obj ) {
    return obj.code === "PtageStatMST";
  });

  // add the graph canvas to the body of the webpage
  initializeGraph();

  // add the tooltip area to the webpage
  initializeTooltip();

  // modify data
  initScatterPlotData();

  // calculate Line of Best Fit (Least Square Method)
  calculateBestFitLine();

  // scale axes so they do not overlap
  scale(modifiedHospitals);

  // draw x and y axis
  drawAxes();

  // draw a dot for every hospital
  drawDots(modifiedHospitals);

  // draw regression line
  drawLine(modifiedHospitals);
}

function initializeGraph() {
  graphSvg = d3.select("#graph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("background-color", "white")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
}

function initializeTooltip() {
  tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
}

function scale(data) {
  xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
  yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);
}

function drawAxes() {
  // x-axis
  graphSvg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .append("text")
    .attr("class", "label")
    .attr("x", width)
    .attr("y", -6)
    .style("text-anchor", "end")
    .text(xCoordinateNumAttribute.nameDE);

  // y-axis
  graphSvg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("class", "label")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text(yCoordinateNumAttribute.nameDE);
}

function drawLine(data) {
  let line = d3.svg.line()
    .x(function(d) { return xScale(d.x); })
    .y(function(d) { return yScale(d.yhat); });

  graphSvg.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);
}

function drawDots(data) {
  graphSvg.selectAll(".dot")
    .data(data)
    .enter().append("circle")
    .attr("class", "dot")
    .attr("r", 3.5)
    .attr("cx", function (d) { return xScale(xValue(d)) })
    .attr("cy", function (d) { return yScale(yValue(d)) })
    .style("fill", function(d) {
      return cValue(d);
    })
    .on("mouseover", function(d) {
      tooltip.transition()
        .duration(200)
        .style("opacity", .9);
      tooltip.html(d.name + "<br/> (" + xValue(d)
        + ", " + yValue(d) + ")")
        .style("left", (d3.event.pageX + 5) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function(d) {
      tooltip.transition()
        .duration(500)
        .style("opacity", 0);
    });
}

function cValue(d) { return getCircleColour(d); }

function xValue(d) { return d.x }

function yValue(d) { return d.y }

function initScatterPlotData() {
  modifiedHospitals = [];

  for (let i = 0; i < allHospitals.length; i++) {

    let hospitalName = allHospitals[i].name;
    let attr = allHospitals[i].hospital_attributes;
    let xCoordValue;
    let yCoordValue;
    let type;

    if (hospitalName === 'Ganze Schweiz') { continue; }

    // get value for x coord
    let xCoord = attr.filter(function( obj ) {
      return obj.code === xCoordinateNumAttribute.code;
    });

    if (xCoord == null || xCoord[0] == null || xCoord[0].value == null) {
      continue;
    } else {
      xCoordValue = Number(xCoord[0].value);
      sumOfXValues += xCoordValue;
      allXCoordValues.push(xCoordValue)
    }

    // get value for y coord
    let yCoord = attr.filter(function( obj ) {
      return obj.code === yCoordinateNumAttribute.code;
    });

    if (yCoord == null || yCoord[0] == null || yCoord[0].value == null) {
      continue;
    } else {
      yCoordValue = Number(yCoord[0].value);
      sumOfYValues += yCoordValue;
      allYCoordValues.push(yCoordValue);
    }

    let typResult = attr.filter(function ( obj ) {
      return obj.code === "Typ";
    });

    if (typResult == null || typResult[0] == null || typResult[0].value == null) {
      typResult = null;
    } else {
      type = String(typResult[0].value);
    }

    modifiedHospitals.push({name: hospitalName, x: xCoordValue, y: yCoordValue, Typ: type, yhat: null});

  }
}

function calculateBestFitLine() {
  let xMean = sumOfXValues / modifiedHospitals.length;
  let yMean = sumOfYValues / modifiedHospitals.length;

  let term1 = 0;
  let term2 = 0;
  let yhat = [];

  // calculate coefficients
  let xr = 0;
  let yr = 0;
  for (let i = 0; i < modifiedHospitals.length; i++) {
    xr = (allXCoordValues[i] - xMean);
    yr = (allYCoordValues[i] - yMean);
    term1 += (xr * yr);
    term2 += (xr * xr);
  }

  let m = (term1 / term2);
  let y_intercept = (yMean - (m * xMean));

  // perform regression
  for (let i = 0; i < modifiedHospitals.length; i++) {
    modifiedHospitals[i].yhat = Math.floor((y_intercept + (allXCoordValues[i] * m)))
  }
}

function updateXCoordinateNumAttribute(attribute) {
  if (attribute !== null) {
    xCoordinateNumAttribute = attribute;
    updateGraph();
  }
}

function updateYCoordinateNumAttribute(attribute) {
  if (attribute !== null) {
    yCoordinateNumAttribute = attribute;
    updateGraph();
  }
}

function removeExistingGraph() {
  if(graphSvg !== null && graphSvg.selectAll !== null) {
    graphSvg.selectAll('.dot').remove();
    graphSvg.selectAll('g').remove();
    graphSvg.selectAll('path').remove();
  }
}

function updateGraph() {
  // delete everything
  removeExistingGraph();
  // add the tooltip area to the webpage
  initializeTooltip();

  // modify data
  initScatterPlotData();

  // calculate Line of Best Fit (Least Square Method)
  calculateBestFitLine();

  // scale axes so they do not overlap
  scale(modifiedHospitals);

  // draw x and y axis
  drawAxes();

  // draw a dot for every hospital
  drawDots(modifiedHospitals);

  // draw regression line
  drawLine(modifiedHospitals);
}
