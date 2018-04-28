
var updateMap = function(){

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

}


var mapDrawer = function(data) {

  var map = L.map('mapid').setView([46.818188, 8.227512], 8);

// basic map using OpenStreetMap tiles with costume design using mapbox
  L.tileLayer('https://api.mapbox.com/styles/v1/nathi/cjf8cggx93p3u2qrqrgwoh5nh/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibmF0aGkiLCJhIjoiY2pmOGJ4ZXJmMXMyZDJ4bzRoYWRxbzhteCJ9.x2dbGjsVZTA9HLw6VWaQow', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets'
  }).addTo(map);

  //console.log(data[0].attributes);

  // store coordinates in new array
  var hospitalData = []
  for (var i = 0; i < data.length; i++){
    if(data[i].coordinates != null){
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

      var newCoordinates = {x: longitude, y: latitude, name:hospitalName, EtMedL: sizeAttribute, Typ: typAttribute};
      hospitalData.push(newCoordinates);
    }else{
      continue;
    }
  }


  // get max value of EtMedL attribute
  var maxEtMedL = 0;
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
  //console.log("Max value: " + maxEtMedL);



  // store attributes in new array
  var hospitalAttributes = []
  for (var i = 0; i < data.length; i++){
    var attributes = data[i].attributes;
    hospitalAttributes.push(attributes);
  }

  /**
   * markers and tooltip with D3
   */
    // add SVG element to leaflet's overlay pane (group layers)
  var svg = d3.select(map.getPanes().overlayPane).append("svg").attr('id', 'circleSVG');

// calculates svg bounds when we first open the map
  calculateSVGBounds(hospitalData);

// Define the div for the tooltip
  var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0.0);

    var tooltip = svg
    .append("div")
    .text("a simple tooltip");


// project points using procectPoint() function
  var circles = svg.selectAll('circle')
  //.selectAll("div")
    .data(hospitalData)
    .enter()
    .append('circle')
    .style("fill-opacity", 0.5)
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


/* 
 checkbox sandbox--------------------
 inspiration: https://bl.ocks.org/Lulkafe/c77a36d5efb603e788b03eb749a4a714
 */
  var svg = d3.select("body").append("div").attr("width", 500).attr("height", 300),
        checkBox1 = new d3CheckBox(), // see function d3CheckBox below
        checkBox2 = new d3CheckBox(), // see function d3CheckBox below
        checkBox3 = new d3CheckBox(); // see function d3CheckBox below

    //Just for demonstration
    var txt = svg.append("text").attr("x", 10).attr("y", 80).text("Click checkboxes"),
        update = function () {
            var checked1 = checkBox1.checked(),
                checked2 = checkBox2.checked(),
                checked3 = checkBox3.checked();
            txt.text(checked1 + ", " + checked2 + ", " + checked3);
        };

    //Setting up each check box
    checkBox1.size(40).x(10).y(10).markStrokeWidth(10).boxStrokeWidth(4).checked(true).clickEvent(update);
    checkBox2.size(30).x(70).y(20).rx(5).ry(5).markStrokeWidth(3).boxStrokeWidth(4).checked(true).clickEvent(update);
    checkBox3.x(120).y(30).checked(false).clickEvent(update);

    svg.call(checkBox1);
    svg.call(checkBox2);
    svg.call(checkBox3);
    console.log("checkbox called")
}


function d3CheckBox () {
  var size = 20,
      x = 0,
      y = 0,
      rx = 0,
      ry = 0,
      markStrokeWidth = 3,
      boxStrokeWidth = 3,
      checked = false,
      clickEvent;

  function checkBox (selection) {
      var g = selection.append("g"),
          box = g.append("rect")
          .attr("width", size)
          .attr("height", size)
          .attr("x", x)
          .attr("y", y)
          .attr("rx", rx)
          .attr("ry", ry)
          .style({
              "fill-opacity": 0,
              "stroke-width": boxStrokeWidth,
              "stroke": "black"
          });

      //Data to represent the check mark
      var coordinates = [
          {x: x + (size / 8), y: y + (size / 3)},
          {x: x + (size / 2.2), y: (y + size) - (size / 4)},
          {x: (x + size) - (size / 8), y: (y + (size / 10))}
      ];

      var line = d3.line()
              .x(function(d){ return d.x; })
              .y(function(d){ return d.y; })
              .curve(d3.curveLinear);
              //interpolate("basic");

      var mark = g.append("path")
          .attr("d", line(coordinates))
          .style({
              "stroke-width" : markStrokeWidth,
              "stroke" : "black",
              "fill" : "none",
              "opacity": (checked)? 1 : 0
          });

      g.on("click", function () {
          checked = !checked;
          mark.style("opacity", (checked)? 1 : 0);

          if(clickEvent)
              clickEvent();

          d3.event.stopPropagation();
      });

  }

  checkBox.size = function (val) {
      size = val;
      return checkBox;
  }

  checkBox.x = function (val) {
      x = val;
      return checkBox;
  }

  checkBox.y = function (val) {
      y = val;
      return checkBox;
  }

  checkBox.rx = function (val) {
      rx = val;
      return checkBox;
  }

  checkBox.ry = function (val) {
      ry = val;
      return checkBox;
  }

  checkBox.markStrokeWidth = function (val) {
      markStrokeWidth = val;
      return checkBox;
  }

  checkBox.boxStrokeWidth = function (val) {
      boxStrokeWidth = val;
      return checkBox;
  }

  checkBox.checked = function (val) {

      if(val === undefined) {
          return checked;
      } else {
          checked = val;
          return checkBox;
      }
  }

  checkBox.clickEvent = function (val) {
      clickEvent = val;
      return checkBox;
  }

  return checkBox;
}


// end of checkbox sandbox -------------------------




// functions for coloured markers
function returnColouredMarkers(d)  {
  if (d.Typ == "K111") // Universitätspitäler
          return ('#990000')
        if (d.Typ == "K112") // Zentrumsspitäler
          return ('#769700')
        if (d.Typ == "K121" || d.Typ == "K122" || d.Typ == "K123") // Grundversorgung
          return ('#00978f')
        if (d.Typ == "K211" || d.Typ == "K212") // Psychiatrische Kliniken
          return ('#976700')
        if (d.Typ == "K221") // Rehabilitationskliniken
          return ('#002897')
        if (d.Typ == "K231" || d.Typ == "K232" || d.Typ == "K233" || d.Typ == "K234" || d.Typ == "K235") //Spezialkliniken
          return ('#23042b')
        else
          console.log(d)
          return ('#d633ff');
}

function returnColouredBorders(d) {
  if (d.Typ == "K111") // Universitätspitäler
    return ('#990000')
  if (d.Typ == "K112") // Zentrumsspitäler
    return ('#769700')
  if (d.Typ == "K121" || d.Typ == "K122" || d.Typ == "K123") // Grundversorgung
    return ('#00978f')
  if (d.Typ == "K211" || d.Typ == "K212") // Psychiatrische Kliniken
    return ('#976700')
  if (d.Typ == "K221") // Rehabilitationskliniken
    return ('#002897')
  if (d.Typ == "K231" || d.Typ == "K232" || d.Typ == "K233" || d.Typ == "K234" || d.Typ == "K235") //Spezialkliniken
    return ('#23042b')
  else
    return ('#d633ff');
}