var map;
var div;
var circles;
var hospitalData = [];
var maxEtMedL = 0;
var hospitalAttributes = [];
var svg;
var numUniSp = 0;
var numZentSp = 0;
var numGrundVers = 0;
var numPsychKl = 0;
var numRehaKl = 0;
var numSpezKl = 0;

/**
 * Draws circles on map
 */
var initCircles = function(hospitalData){


  // project points using projectPoint() function
  circles = svg.selectAll('circle')
  //.selectAll("div")
    .data(hospitalData)
    .enter()
    .append('circle')
    .style("fill-opacity", 0.7)
    // radius range: 2.5, 3, 3.5, 4, 4.5
    .attr("r", function(d){
      // radius range: 2.5, 3, 3.5, 4, 4.5 better?
      // now: range from 2 to 6
      //console.log(d.EtMedL*(1/maxEtMedL)*10 + 2);
      if(d.EtMedL*(1/maxEtMedL)*10 + 4 > 10){
        return 10;
      }
      else{
        return (d.EtMedL*(1/maxEtMedL)*10 + 4);
      }})
    .attr('fill', function(d) {
      return returnColouredMarkers(d);
    })
    .attr('stroke', function(d) {
      return returnColouredBorders(d);
    })
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
    });

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
    calculateSVGBounds(hospitalData);
    circles
      .attr("cx", function(d) {return projectPoint(d.x, d.y).x})
      .attr("cy", function(d) {return projectPoint(d.x, d.y).y})
  });
}

var removeCircles = function(){
  if(svg!=null && svg.selectAll!=null){
    svg.selectAll('circle').remove();
  }
};

/**
 * Updates map with new data
 * TODO: Split function so that circles are drawn in separate function
 * @param data
 * @param type
 * @param num: number of times checkbox was pressed --> since default is checked, even numbers (0,2,4,6)
 *             mean that this type should be displayed
 */
var updateMap = function(data, type, numUniSp, numZentSp, numGrundVers, numPsychKl, numRehaKl, numSpezKl) {

  removeCircles();

  // first empty array with hospital data then store only values with the right type
  hospitalData = [];
  //initData(data, type, num);
  //console.log(hospitalData);

  // even numbers of clicks draw the markers
  if ((numUniSp % 2) === 0) {
    //console.log('uni');
    initData(data, ["K111"]);
  // uneven numbers of clicks remove the markers
  }
  if((numZentSp % 2) === 0){
    initData(data, ["K112"]);
    //console.log('zent');
  }
  if((numGrundVers % 2) === 0){
    //console.log('grund');
    initData(data, ["K121", "K122", "K123"]);
  }
  if((numPsychKl % 2) === 0){
    //console.log('psych');
    initData(data, ["K211", "K212"]);
  }
  if((numRehaKl % 2) === 0){
    initData(data, ["K221"]);
    //console.log('reha');
  }
  if((numSpezKl % 2) === 0){
    //console.log('spez');
    initData(data, ["K231", "K232", "K233", "K234", "K235"]);
  }
  initCircles(hospitalData);
};

/**
 * Initializes map for the first time
 * @param data
 */
var mapDrawer = function(data) {

  map = L.map('mapid').setView([46.818188, 8.227512], 8);

// basic map using OpenStreetMap tiles with costume design using mapbox
  L.tileLayer('https://api.mapbox.com/styles/v1/nathi/cjf8cggx93p3u2qrqrgwoh5nh/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibmF0aGkiLCJhIjoiY2pmOGJ4ZXJmMXMyZDJ4bzRoYWRxbzhteCJ9.x2dbGjsVZTA9HLw6VWaQow', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets'
  }).addTo(map);

  var type = [];
  type.push("none");
  var num = 0;
  initData(data, type);

  /**
   * markers and tooltip with D3
   */
    // add SVG element to leaflet's overlay pane (group layers)
  svg = d3.select(map.getPanes().overlayPane).append("svg").attr('id', 'circleSVG');

// calculates svg bounds when we first open the map
  calculateSVGBounds(hospitalData);

// Define the div for the tooltip
  div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0.0);

    var tooltip = svg
    .append("div")
    .text("a simple tooltip");


// project points using projectPoint() function
  circles = svg.selectAll('circle')
  //.selectAll("div")
    .data(hospitalData)
    .enter()
    .append('circle')
    .style("fill-opacity", 0.7)
    // radius range: 2.5, 3, 3.5, 4, 4.5
    .attr("r", function(d){
      // radius range: 2.5, 3, 3.5, 4, 4.5 better?
      // now: range from 2 to 6
        //console.log(d.EtMedL*(1/maxEtMedL)*10 + 2);
        if(d.EtMedL*(1/maxEtMedL)*10 + 4 > 10){
          return 10;
        }
        else{
          return (d.EtMedL*(1/maxEtMedL)*10 + 4);
        }})
        .attr('fill', function(d) {
         return returnColouredMarkers(d);
        })
        .attr('stroke', function(d) {
          return returnColouredBorders(d);
        })
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
    });

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
    calculateSVGBounds(hospitalData);
    circles
      .attr("cx", function(d) {return projectPoint(d.x, d.y).x})
      .attr("cy", function(d) {return projectPoint(d.x, d.y).y})
  });
};

/**
 * Stores data in array for displaying it.
 * TODO: Build array with correct type, maybe split into a second function
 * @param data
 * @param type
 */
function initData(data, type){
  // store coordinates in new array
  for (var i = 0; i < data.length; i++){
    if(data[i].coordinates != null && data[i].coordinates.latitude!=null && data[i].coordinates.longitude!=null){
      var hospitalName = data[i].name;
      var latitude = data[i].coordinates.latitude;
      var longitude = data[i].coordinates.longitude;

      var attr = data[i].attributes;
      var sizeResult = attr.filter(function( obj ) {
        return obj.code == "EtMedL";
      });
      if(sizeResult[0]!=null && sizeResult[0].value!=null){
        var sizeAttribute = Number(sizeResult[0].value);
      }

      var typResult = attr.filter(function ( obj ) {
        return obj.code == "Typ";
      });
      var typAttribute = String(typResult[0].value)
      //console.log(typAttribute);

      for(var j = 0; j < type.length; j++){
        // store only hospitals with right attribute type in array
        if(type[j]!="none"){
          if(typAttribute==type[j]){
            var newCoordinates = {x: longitude, y: latitude, name:hospitalName, EtMedL: sizeAttribute, Typ: typAttribute};
            hospitalData.push(newCoordinates);
          }
        }
        if(type[j]=="none"){
          var newCoordinates = {x: longitude, y: latitude, name:hospitalName, EtMedL: sizeAttribute, Typ: typAttribute};
          hospitalData.push(newCoordinates);
        }
      }
    }
  }

  // get max value of EtMedL attribute
  for(var i=0; i<hospitalData.length; i++){
    if(hospitalData[i]!=null && hospitalData[i].EtMedL!=null){
      if(hospitalData[i].EtMedL>maxEtMedL){
        maxEtMedL = hospitalData[i].EtMedL;
      }
      else{
        continue;
      }
    }
  }

  // store attributes in new array
  for (var i = 0; i < data.length; i++){
    var attributes = data[i].attributes;
    hospitalAttributes.push(attributes);
  }
}

//------------------------------------------------------
// outsourced functions

// functions for coloured markers
function returnColouredMarkers(d)  {
  if (d.Typ == "K111") // Universitätspitäler
          return ('#a82a2a')
        if (d.Typ == "K112") // Zentrumsspitäler
          return ('#a89f2a')
        if (d.Typ == "K121" || d.Typ == "K122" || d.Typ == "K123") // Grundversorgung
          return ('#2ca82a')
        if (d.Typ == "K211" || d.Typ == "K212") // Psychiatrische Kliniken
          return ('#2a8ea8')
        if (d.Typ == "K221") // Rehabilitationskliniken
          return ('#2c2aa8')
        if (d.Typ == "K231" || d.Typ == "K232" || d.Typ == "K233" || d.Typ == "K234" || d.Typ == "K235") //Spezialkliniken
          return ('#772aa8')
        else
          console.log(d)
          return ('#d633ff');
}

function returnColouredBorders(d) {
  if (d.Typ == "K111") // Universitätspitäler
    return ('#a82a2a')
  if (d.Typ == "K112") // Zentrumsspitäler
    return ('#a89f2a')
  if (d.Typ == "K121" || d.Typ == "K122" || d.Typ == "K123") // Grundversorgung
    return ('#2ca82a')
  if (d.Typ == "K211" || d.Typ == "K212") // Psychiatrische Kliniken
    return ('#2a8ea8')
  if (d.Typ == "K221") // Rehabilitationskliniken
    return ('#2c2aa8')
  if (d.Typ == "K231" || d.Typ == "K232" || d.Typ == "K233" || d.Typ == "K234" || d.Typ == "K235") //Spezialkliniken
    return ('#772aa8')
  else
    return ('#d633ff');
}
