
let allHospitals; // initialized in function mapDrawer, contains all hospital data, must not be changed after it is initialized
let modifiedHospitals = [];
let xCoordinateNumAttribute; // numerical attribute that defines the radius of the circles
let yCoordinateNumAttribute; // categorical attribute to be displayed in Steckbrief and for filtering
let allNumAttributes = [];


function drawGraph(hospitals, numAttributes) {

  allHospitals = hospitals;
  allNumAttributes = numAttributes;

  xCoordinateNumAttribute = numAttributes.find(function ( obj ) {
    return obj.code === "AnzStand";
  });

  yCoordinateNumAttribute = numAttributes.find(function ( obj ) {
    return obj.code === "PtageStatMST";
  });

  let margin = {
      top: 100,
      right: 100,
      bottom: 100,
      left: 100
    },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  // setup fill color
  let cValue = function(d) { return getCircleColour(d);};
  // let color = d3.scale.category10();

  // setup x
  let xScale = d3.scale.linear().range([0, width]);
  let xAxis = d3.svg.axis().scale(xScale).orient("bottom");
  let xValue = function (d) { return d.x };
  let xMap = function (d) { return xScale(xValue(d)) };

  // setup y
  let yScale = d3.scale.linear().range([height, 0]);
  let yAxis = d3.svg.axis().scale(yScale).orient("left");
  let yValue = function (d) { return d.y };
  let yMap = function (d) { return yScale(yValue(d))};

  // add the graph canvas to the body of the webpage
  let svg = d3.select("#graph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("background-color", "white")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  // add the tooltip area to the webpage
  let tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);


  initScatterPlotData(allHospitals);
  let data = modifiedHospitals;

  /*
  let line = d3.svg.line()
    .x(function(d) {
      return x(d.x);
    })
    .y(function(d) {
      return y(d.yhat);
    });
  */

  xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
  yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);

  // x-axis
  svg.append("g")
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
  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("class", "label")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text(yCoordinateNumAttribute.nameDE);

  // draw dots
  svg.selectAll(".dot")
    .data(data)
    .enter().append("circle")
    .attr("class", "dot")
    .attr("r", 3.5)
    .attr("cx", xMap)
    .attr("cy", yMap)
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


  /*
  svg.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);


  function create_data(nsamples) {
    let x = [];
    let y = [];
    let n = nsamples;
    let x_mean = 0;
    let y_mean = 0;
    let term1 = 0;
    let term2 = 0;
    let noise_factor = 100;
    let noise = 0;
    // create x and y values
    for (let i = 0; i < n; i++) {
      noise = noise_factor * Math.random();
      noise *= Math.round(Math.random()) == 1 ? 1 : -1;
      y.push(i / 5 + noise);
      x.push(i + 1);
      x_mean += x[i]
      y_mean += y[i]
    }
    // calculate mean x and y
    x_mean /= n;
    y_mean /= n;
    // calculate coefficients
    let xr = 0;
    let yr = 0;
    for (i = 0; i < x.length; i++) {
      xr = x[i] - x_mean;
      yr = y[i] - y_mean;
      term1 += xr * yr;
      term2 += xr * xr;
    }
    let b1 = term1 / term2;
    let b0 = y_mean - (b1 * x_mean);
    // perform regression
    yhat = [];
    // fit line using coeffs
    for (i = 0; i < x.length; i++) {
      yhat.push(b0 + (x[i] * b1));
    }
    let data = [];
    for (i = 0; i < y.length; i++) {
      data.push({
        "yhat": yhat[i],
        "y": y[i],
        "x": x[i]
      })
    }
    return (data);
  }
  */
}


function initScatterPlotData(data) {
  // initially empty array to be filled up with hospitals to be displayed on map
  modifiedHospitals = [];

  for (let i = 0; i < data.length; i++) {

    let hospitalName = data[i].name;
    let attr = data[i].hospital_attributes;
    let xCoordValue;
    let yCoordValue;
    let type;

    // get value for x coord
    let xCoord = attr.filter(function( obj ) {
      return obj.code === xCoordinateNumAttribute.code;
    });

    if (xCoord == null || xCoord[0] == null || xCoord[0].value == null) {
      continue;
    } else {
      xCoordValue = Number(xCoord[0].value);
    }

    // get value for y coord
    let yCoord = attr.filter(function( obj ) {
      return obj.code === yCoordinateNumAttribute.code;
    });

    if (yCoord == null || yCoord[0] == null || yCoord[0].value == null) {
      continue;
    } else {
      yCoordValue = Number(yCoord[0].value);
    }

    // filters type attribute and saves it in variable
    let typResult = attr.filter(function ( obj ) {
      return obj.code === "Typ";
    });

    if (typResult == null || typResult[0] == null || typResult[0].value == null) {
      typResult = null;
    } else {
      type = String(typResult[0].value);
    }

    modifiedHospitals.push({name: hospitalName, x: xCoordValue, y: yCoordValue, Typ: type});

  }
}
