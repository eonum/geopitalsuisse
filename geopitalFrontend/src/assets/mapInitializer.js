// temporary solution with convertion of dataformat (for dummy data with degree and stuff)
var coordinateConverter = function(degreeMinuteSecondString){
  var degree = Number(degreeMinuteSecondString.split("°")[0]);
  var minutes = Number(degreeMinuteSecondString.split("°")[1].split("'")[0]);
  var seconds = Number(degreeMinuteSecondString.split("°")[1].split("'")[1].split(".")[0]);
  var latitude = degree + (minutes + seconds/60.0)/60.0
  return latitude;
};





var mapDrawer = function(data) {


  // convert shitty format to good format
  // and store coordinates in new object
  var hospitalCoordinates = []
  for (var i = 0; i < data.length; i++){
    if(data[i].coordinates != null){
      var hospitalName = data[i].name;
      var latitude = data[i].coordinates.latitude.slice(0,-1);
      var longitude = data[i].coordinates.longitude.slice(0,-1);
      var newCoordinates = {x: longitude, y: latitude, name:hospitalName};
      hospitalCoordinates.push(newCoordinates);
    }else{
     //console.log(i);
     //console.log(data[i]);
      continue;
    }
  }

  /**
   * build map with OpenStreetMap and Mapbox
   */
    // create new basic map
  var test = document.getElementById('mapid');
  var map = L.map('mapid').setView([46.818188, 8.227512], 8);

// basic map using OpenStreetMap tiles with costume design using mapbox
  L.tileLayer('https://api.mapbox.com/styles/v1/nathi/cjf8cggx93p3u2qrqrgwoh5nh/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibmF0aGkiLCJhIjoiY2pmOGJ4ZXJmMXMyZDJ4bzRoYWRxbzhteCJ9.x2dbGjsVZTA9HLw6VWaQow', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets'
  }).addTo(map);


  /**
   * test data for the hospitals
   */
/*   var testData = [
    {x: 7.425471000000016, y: 46.947142},
    {x: 8.547388899999987, y: 47.3795461},
    {x: 9.388304000000062, y: 47.429348},
    {x: 8.295154400000001, y: 47.05875549999999},
    {x: 7.58587, y: 47.561557},
    {x: 8.059350999999992, y: 47.388479},
    {x: 8.953260999999998, y: 46.0176793},
  ] */


  /**
   * trying markers with leaflet
   */

  //var latlng = L.latLng(47.212213, 7.755064);

// draws marker as circle, zoom good, popup disappears
  // var circle = L.circleMarker(latlng,{
  //   color: 'red',
  //   fillColor: '#f03',
  //   fillOpacity: 0.5,
  //   radius: 10
  // }).addTo(map);

// draws a customizable circle on map, zoom weird
  /*var circle = L.circle([47.212213, 7.755064], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 1000
  }).addTo(map);*/

// popup at beginning but circle not clickable
  //circle.bindPopup("I am a circle.");

  // default marker in leaflet with popup
  // L.marker([46.947142, 7.425471000000016]).addTo(map)
  //  .bindPopup('A pretty CSS3 popup.<br> Easily customizable.');

// test data for the hospitals
  var testData = [
    {x: 7.425471000000016, y: 46.947142, name: 'Inselspital', city: '3010 Bern'},
    {x: 8.547388899999987, y: 47.3795461, name: 'Universitätsspital Zürich', city: '8091 Zürich'},
    {x: 9.388304000000062, y: 47.429348, name: 'Kantonsspital St.Gallen', city: '9007 St.Gallen'},
    {x: 8.295154400000001, y: 47.05875549999999},
    {x: 7.58587, y: 47.561557},
    {x: 8.059350999999992, y: 47.388479},
    {x: 8.953260999999998, y: 46.0176793},
  ];




  /**
   * markers with D3
   */
    // add SVG element to leaflet's overlay pane (group layers)
  var svg = d3.select(map.getPanes().overlayPane).append("svg").attr('id', 'circleSVG');

// calculates svg bounds when we first open the map
  calculateSVGBounds(testData);

 /* var div = svg
    .attr('class', 'tooltip')
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .text(testData.name + "<br/>" + testData.city); */
  // console.log("create div")
  // var div = svg.append("div")
  //   .attr("class", "tooltip")
  //   .style("opacity", 0.9);

    // console.log(div);

// Define the div for the tooltip
  var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

    var tooltip = svg
    .append("div")
    .text("a simple tooltip");
/*
    d3.csv("data", function(error, data) {
      data.forEach(function(d) {
          d.name = d.name;
          d.address = d.address;
      }); */

      // d3.select("body")
      // .selectAll("div")
      //   .data(data)
      // .enter().append("div")
      //   .style("width", function(d) { return x(d) + "px"; })
      //   .text(function(d) { return d; })
      //   .on("mouseover", function(d){tooltip.text(d); return tooltip.style("visibility", "visible");})
      //     .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
      //     .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

// project points using procectPoint() function
  var circles = svg.selectAll('circle')
    //.selectAll("div")
    .data(hospitalCoordinates)
    .enter()
    .append('circle')
    //.append('div')
    .attr("r", 4)
    .attr('fill', '#990000') // crimson red
    //.attr('fill','#d633ff') // purple
    .attr("cx", function(d) {return projectPoint(d.x, d.y).x})
    .attr("cy", function(d) {return projectPoint(d.x, d.y).y})
    .on("mouseover", function(d) {
      div.transition()
        .duration(1)
        .style("opacity", .98);
        div	.html(d.name)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 0) + "px");
    })
     .on("mouseout", function(d) {
       div.transition()
           .duration(500)
           .style("opacity", 0);
     })

    // .on("mouseover", function(){return div.style("visibility", "visible");})
    // .on("mouseout", function(){return div.style("visibility", "hidden");});


// adapt Leaflet’s API to fit D3 with custom geometric transformation
// calculates x and y coordinate in pixels for given coordinates (wgs84)
  function projectPoint(x, y) {
    var point = map.latLngToLayerPoint(new L.LatLng(y, x));
    return point;
  }

// we have to calculate the width and the height of the svg element.
// calculate the y max and x max value for all datapoints and add a padding. xmax is width and ymax is height of svg
// todo: this function has to be changed that the bounds are calculated better
  function calculateSVGBounds(data) {
    var xMin = 1000000;
    var xMax = 0;
    var yMin = 1000000;
    var yMax = 0;
    var heightPadding = 100;
    var widthPadding = 300;
    data.forEach(function(d) {
      xMax = Math.max(projectPoint(d.x, d.y).x, xMax);
      yMax = Math.max(projectPoint(d.x, d.y).y, yMax);
    });
    svg
      .style("left", 0)
      .style("width", xMax + widthPadding)
      .style("top", 0)
      .style("height", yMax + heightPadding);
  }

// makes points invisible when user starts zooming
  map.on('zoomstart', function () {
    d3.select('#circleSVG').style('visibility', 'hidden');
  });


// makes points visible again after user has finished zooming
  map.on('zoomend', function() {
    d3.select('#circleSVG').style('visibility', 'visible');
    calculateSVGBounds(hospitalCoordinates);
    circles
      .attr("cx", function(d) {return projectPoint(d.x, d.y).x})
      .attr("cy", function(d) {return projectPoint(d.x, d.y).y})
  });

}
