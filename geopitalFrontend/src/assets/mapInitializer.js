/**
 * Contains logic of application
 * Is responsible that the map is initialized correctly
 * and the circles are drawn with the data provided.
 */

// variables that we need globally that are initialized in a function at one point
var map;
var allHospitalData; // initialized in function mapDrawer
var div;
var div2;
var circles;
var hospitalData = [];
var maxEtMedL = 0;
var svg;

/**
 * Initializes map with the correct design.
 * Draws circles from the provided data and implements zoom-function for these circles.
 *
 * @param data that sets where and how the hospitals are visualized as circles
 *        contains coordinates, general information and attributes of a hospital
 */
var mapDrawer = function(data) {

  // stores initially all data from all hospitals
  allHospitalData = data;
  console.log("data")
  console.log(allHospitalData)

  //------------------------------------------------------
  // Initialize map and provided data

  // defines map and sets default view when page is loaded
  map = L.map('mapid').setView([46.818188, 8.97512], 8);

  // basic map using OpenStreetMap tiles with custom design using mapbox
  L.tileLayer('https://api.mapbox.com/styles/v1/nathi/cjf8cggx93p3u2qrqrgwoh5nh/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibmF0aGkiLCJhIjoiY2pmOGJ4ZXJmMXMyZDJ4bzRoYWRxbzhteCJ9.x2dbGjsVZTA9HLw6VWaQow', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets'
  }).addTo(map);

  // defines data that is displayed as circles, since at first we want all types we give here "none"
  // as none specific types have to be selected (see function initData)
  var type = [];
  type.push("none");

  // initializes data so we can work with it for the visualisation (see function initData)
  initData(data, type);


  //------------------------------------------------------
  // markers and tooltip with D3

  // add SVG element to leaflet's overlay pane (group layers)
  svg = d3.select(map.getPanes().overlayPane).append("svg").attr('id', 'circleSVG');

  // calculates svg bounds for the first time
  // on the svg-layer we implement the visualisation with D3
  calculateSVGBounds(hospitalData);

  // Define the div for the tooltips (used for mouseover and click functionality)
  div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0.0);

  div2 = d3.select("body").append("div2")
    .attr("class", "tooltip")
    .style("opacity", 0.0);

  // project points using projectPoint() function

  initCircles(hospitalData)

  // adapt Leaflet’s API to fit D3 with custom geometric transformation
  // calculates x and y coordinate in pixels for given coordinates (wgs84)
  function projectPoint(x, y) {
    var point = map.latLngToLayerPoint(new L.LatLng(y, x));
    return point;
  }

  // we have to calculate the width and the height of the svg element.
  // calculate the y max and x max value for all datapoints and add a padding.
  // xmax is width and ymax is height of svg-layer
  // todo: this function has to be changed that the bounds are calculated better
  function calculateSVGBounds(data) {
    var xMax = 0;
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
   var zoomLevel = map.getZoom();
   circles
   .attr("cx", function(d) {return projectPoint(d.x, d.y).x})
   .attr("cy", function(d) {return projectPoint(d.x, d.y).y})
   .attr("r", function(d) {return getCircleRadius(d)})

   calculateSVGBounds(hospitalData);
   d3.select('#circleSVG').style('visibility', 'visible');
  });
};

/**
 * Draws circles on map
 */
var initCircles = function(hospitalData){
  // var zoomLevel = map.getZoom();
  // project points using projectPoint() function
  circles = svg.selectAll('circle')
    .data(hospitalData)
    .enter()
    .append('circle')
    .style("fill-opacity", 0.7)
    .attr("r", function(d){
      return getCircleRadius(d);
    })
    .attr('fill', function(d) {
      return getCircleColour(d);
    })
    .attr('stroke', function(d) {
      return getCircleBorderColour(d);
    })
    .attr("cx", function(d) {
      return projectPoint(d.x, d.y).x;
    })
    .attr("cy", function(d) {
      return projectPoint(d.x, d.y).y;
    })
    .on("mouseover", function(d) {
      return showTooltip(d);
    })
    .on("mouseout", function(d) {
      return removeTooltip(d);
    })
    .on("click", function(d) {
      // return showAttributes(d);
      return callCharComponent(d);
     })
};

function callCharComponent(clickedHospital) {
  // console.log("clickedHospital");
  // console.log(clickedHospital);
  var clickedHospitalData = getAllDataForClickedHospital(clickedHospital);
  // console.log("data for clickedHospital");
  // console.log(clickedHospitalData);
  // console.log("data-code-array")
  // console.log(clickedHospitalData.hospital_attributes[0].code)
  // console.log(clickedHospitalData.hospital_attributes[1].code)
  document.getElementById('hospitalName').innerHTML = clickedHospital.name;
  // document.getElementById('hospitalAddress').innerHTML = clickedHospitalData.streetAndNumber + "<br/>" 
  // + clickedHospitalData.zipCodeAndCity;

  // temporary hardcoded version, to be exchanged with loop (see below)
  document.getElementById("hospitalAttrCode0").innerHTML = clickedHospitalData.hospital_attributes[0].code;
  document.getElementById("hospitalAttrValue0").innerHTML = clickedHospitalData.hospital_attributes[0].value;
  document.getElementById("hospitalAttrCode1").innerHTML = clickedHospitalData.hospital_attributes[1].code;
  document.getElementById("hospitalAttrValue1").innerHTML = clickedHospitalData.hospital_attributes[1].value;
  document.getElementById("hospitalAttrCode2").innerHTML = clickedHospitalData.hospital_attributes[2].code;
  document.getElementById("hospitalAttrValue2").innerHTML = clickedHospitalData.hospital_attributes[2].value;
  document.getElementById("hospitalAttrCode3").innerHTML = clickedHospitalData.hospital_attributes[3].code;
  document.getElementById("hospitalAttrValue3").innerHTML = clickedHospitalData.hospital_attributes[3].value;

  /* under construction: loop for all attributes */
  //var hospitalAttIds = builIdArray(clickedHospitalData.hospital_attributes);
  // console.log("hospitalattr for loop");
  // console.log(hospitalAttIds);

  // for(var i=0; i<2; i++) {
  //   // pick the first element of code-names for loop through getElementById
  //   var hospitalAttrCode = hospitalAttIds.slice(0,1);  
  //   console.log("hospitalattrcode i: ")
  //   console.log(hospitalAttrCode);
 
    //var hospitalAttrCode = "hospitalAttrCode";
    // var hospitalAttrValue = "hospitalAttrValue";
    // document.getElementById(hospitalAttrCode).innerHTML = clickedHospitalData.hospital_attributes[i].code;
    // document.getElementById(hospitalAttrValue).innerHTML = clickedHospitalData.hospital_attributes[0].value;
    // // remove first element of code-names
    // hospitalAttIds.shift();

  // }
  

}

// returns an array with all data of the clicked hospital
function getAllDataForClickedHospital(clickedHospital) {
  var attr = allHospitalData;
  // finds array according to clickedHospital
  var attrResult = attr.find(function( obj ) {
    return obj.name == clickedHospital.name;
  });
  return attrResult;
}

// returns an array with an id-array for the loop through getElementById
function builIdArray(hospitalAttributes) {
  var idArray = [];
  var count;
  for (var i=0; i<hospitalAttributes.length; i++) {
    count = i;
    var id = 'hospitalAttrCode' + i;
    idArray.push(id);
  }
  return idArray;
}


// adapt Leaflet’s API to fit D3 with custom geometric transformation
// calculates x and y coordinate in pixels for given coordinates (wgs84)
function projectPoint(x, y) {
  var point = map.latLngToLayerPoint(new L.LatLng(y, x));
  return point;
}


/**
 * Removes circles and all attributes that has been assigned to them.
 */
var removeCircles = function(){
  if(svg!=null && svg.selectAll!=null){
    svg.selectAll('circle').remove();
  }
};


/**
 * Updates map with new data
 * TODO: better implementation with type and not hardcoding
 * @param data data that contains all the information of the hospitals (from backend)
 * @param type describes type of hospital that should be shown
 * For the next parameters: number of times checkbox was pressed
 * --> since default is checked, even numbers (0,2,4,6) mean that this type should be displayed
 * @param numUniSp
 * @param numZentSp
 * @param numGrundVers
 * @param numPsychKl
 * @param numRehaKl
 * @param numSpezKl
 */
var updateMap = function(data, type, numUniSp, numZentSp, numGrundVers, numPsychKl, numRehaKl, numSpezKl) {

  // remove circles that are already defined so we can initialize them again with other data
  removeCircles();

  // first empty array with hospital data then store only values with the right type
  hospitalData = [];

  // build up data array
  // even numbers of clicks mean that the checkbox is checked and hospitals with that type should be drawn
  if ((numUniSp % 2) === 0) {
    initData(data, ["K111"]);
  }
  if((numZentSp % 2) === 0){
    initData(data, ["K112"]);
  }
  if((numGrundVers % 2) === 0){
    initData(data, ["K121", "K122", "K123"]);
  }
  if((numPsychKl % 2) === 0){
    initData(data, ["K211", "K212"]);
  }
  if((numRehaKl % 2) === 0){
    initData(data, ["K221"]);
  }
  if((numSpezKl % 2) === 0){
    initData(data, ["K231", "K232", "K233", "K234", "K235"]);
  }

  // draw circles with the data that is build above
  initCircles(hospitalData);
};

/**
 * Stores data in array for displaying it. Builds up array with the important information.
 * TODO: Improve function --> make it possible to select which attributes should be store in array (except for coordinates and name)
 * @param data data from backend (JSON)
 * @param type type of hospitals that should be displayed (improvement)
 */
function initData(data, type){

  for (var i = 0; i < data.length; i++){

    // stores name, coordinates (latitude, longitude), EtMedL attribute value
    // and type of each hospita in a variable to save in array
    if(data[i].latitude!=null && data[i].longitude!=null){
      var hospitalName = data[i].name;
      var latitude = data[i].latitude;
      var longitude = data[i].longitude;

      // access attributes of hospital
      var attr = data[i].hospital_attributes;

      // filters EtMedL attribute and saves it in variable
      var sizeResult = attr.filter(function( obj ) {
        return obj.code == "EtMedL";
      });
      // saves value of EtMedL attribute in variable
      if(sizeResult[0]!=null && sizeResult[0].value!=null){
        var sizeAttribute = Number(sizeResult[0].value);
      }

      // filters type attribute and saves it in variable
      var typResult = attr.filter(function ( obj ) {
        return obj.code == "Typ";
      });
      // saves value of type attribute in variable
      if(typResult[0]!=null && typResult[0].value!=null){
        var typAttribute = String(typResult[0].value);
      }

      // store only hospitals with right attribute type in array
      // type "none" stands for default value (all hospitals)
      for(var j = 0; j < type.length; j++){
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

  // get max value of EtMedL attribute (to calculate radius of circles)
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
}


//------------------------------------------------------
// outsourced functions for initCircles

// /**
//  * Gives markers different radius according to the numerical attribute
//  * @param d data which is displayed as a circle
//  * @returns {number} radius of the marker (according numerical attribute)
//  */
function getCircleRadius(d) {
  var zoomLevel = map.getZoom();
  if(d.EtMedL*(1/maxEtMedL)*10 + 4 > 10){
    return 10*zoomLevel*zoomLevel/100;
  }
  else{
    return (d.EtMedL*(1/maxEtMedL)*10 + 4)*zoomLevel*zoomLevel/100;
  }
}

// /**
//  * Gives markers different color according to its type attribute
//  * @param d data which is displayed as a circle
//  * @returns {string} color of the marker (according to type)
//  */
function getCircleColour(d)  {
  if (d.Typ == "K111") // Universitätspitäler
    return ('#a82a2a');
  if (d.Typ == "K112") // Zentrumsspitäler
    return ('#a89f2a');
  if (d.Typ == "K121" || d.Typ == "K122" || d.Typ == "K123") // Grundversorgung
    return ('#2ca82a');
  if (d.Typ == "K211" || d.Typ == "K212") // Psychiatrische Kliniken
    return ('#2a8ea8');
  if (d.Typ == "K221") // Rehabilitationskliniken
    return ('#2c2aa8');
  if (d.Typ == "K231" || d.Typ == "K232" || d.Typ == "K233" || d.Typ == "K234" || d.Typ == "K235") //Spezialkliniken
    return ('#772aa8');
  else
    return ('#d633ff');
}

// /**
//  * Gives markers different border color according to its type attribute
//  * @param d data which is displayed as a circle
//  * @returns {string} color of the border of the marker (according to type)
//  */
function getCircleBorderColour(d) {
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


// /**
//  * Displays tooltip when hovering over a marker
//  * @param d data which is displayed as a circle
//  */
function showTooltip(d) {
  div.transition()
        .duration(1)
        .style("opacity", .98);
      div.html(d.name)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 0) + "px");
}

// /**
//  * Let's the tooltip disappear when hovering out of a marker
//  * @param d data which is displayed as a circle
//  */
function removeTooltip(d) {
  div.transition()
        .duration(500)
        .style("opacity", 0);
}
