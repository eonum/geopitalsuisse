/**
 * Contains logic of application
 * Is responsible that the map is initialized correctly
 * and the circles are drawn with the data provided.
 */

// variables that we need globally that are initialized in a function at one point
var map;
var allHospitalData; // initialized in function mapDrawer, contains all hospital data, must not be changed after it is initialized
var div;
var div2;
var circles;
var hospitalData = [];
var currentNumAttribute;
var currentCatAttribute;
var allCatAttributes = []
var svg;
var code; // size attribute that defines radius of a circle (default "EdMedL")
//var maxRadius = 0; // maximal value of the size attribute that defines the radius
var type;
var selectedHospital;

// hard code because it does not work yet in maps component
//var defaultNumAttribute = {code:"EtMedL", category:"number", nameDE:"Ertrag aus medizinischen Leistungen und Pflege",
//  nameFR:"Produits des hospitalisations et soins", nameIT: "Ricavi per degenze e cure"};

// var defaultCatAttribute = {code: "Typ", category: "string", nameDE:}
/**
 * Initializes map with the correct design.
 * Draws circles from the provided data and implements zoom-function for these circles.
 *
 * @param data that sets where and how the hospitals are visualized as circles
 *        contains coordinates, general information and attributes of a hospital
 */
var mapDrawer = function(hospitals, numAttributes, catAttributes) {

  console.log("input data in mapDrawer")
  console.log(hospitals)
  console.log(numAttributes)
  console.log(catAttributes)
  console.log("end input data in mapDrawer")


  // stores initially all data from all hospitals and sets the default values
  // of the numerical (EtMedL) and categorical (Typ) attributes
  allHospitalData = hospitals;

  allCatAttributes = catAttributes;


  // set default selection to first hospital in list
  selectedHospital = hospitals[0]

//  document.getElementById('RFormDisplay').innerHTML = "false";

  // document.getElementById('hospitalName').innerHTML = hospitals[0].name;
  // document.getElementById('hospitalAddress').innerHTML = hospitals[0].streetAndNumber + "<br/>"
  // + hospitals[0].zipCodeAndCity;
  // document.getElementById('numericalAttributeName').innerHTML = currentNumAttribute.nameDE;
  // document.getElementById('numericalAttributeValue').innerHTML = sizeResult.value;


console.log("created global variable allHospitalData");
console.log(allHospitalData)


  // TODO: construct something that numAttributes and catAttributes are never null
  // sets default numerical attribute (EtMedL)
  currentNumAttribute = numAttributes.find(function ( obj ) {
    return obj.code == "EtMedL";
  })
  // sets default categorical attribute (Typ)
  currentCatAttribute = catAttributes.find(function ( obj ) {
    return obj.code == "Typ";
  })

  // sets size attribute to the default value (EtMedL)
  // prov. solution TODO: set attribute in maps component
 // setNumAttribute(defaultNumAttribute);
  //setCatAttribute(defaultCatAttribute);
  console.log(getNumAttribute());

  code = getNumAttribute().code;
console.log("code:");
console.log(code);



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

  // defines hospital types that are displayed as circles, since at first we want all types we give here "none"
  // as none specific types have to be selected (see function initData)
  type = [];
  this.type.push("none");

  // initializes data so we can work with it for the visualisation (see function initData)
  initData(hospitals, type, code);
console.log("Data initialized");
console.log(hospitalData);

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
  initCircles(hospitalData);

  // adapt Leaflet’s API to fit D3 with custom geometric transformation
  // calculates x and y coordinate in pixels for given coordinates (wgs84)
  function projectPoint(x, y) {
   // console.log("projectPoint");
   // console.log(x + ":" + y);
    var point = map.latLngToLayerPoint(new L.LatLng(y, x));
    return point;
  }

  // we have to calculate the width and the height of the svg element.
  // calculate the y max and x max value for all datapoints and add a padding.
  // xmax is width and ymax is height of svg-layer
  // todo: this function has to be changed that the bounds are calculated better
  function calculateSVGBounds(hospitals) {
    var xMax = 0;
    var yMax = 0;
    var heightPadding = 100;
    var widthPadding = 300;
    hospitals.forEach(function(d) {
      xMax = Math.max(projectPoint(d.longitude, d.latitude).x, xMax);
      yMax = Math.max(projectPoint(d.longitude, d.latitude).y, yMax);
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
    console.log("we are zooming")
    var maxValue = getMaxValue(hospitalData);
   circles
   .attr("cx", function(d) {return projectPoint(d.longitude, d.latitude).x})
   .attr("cy", function(d) {return projectPoint(d.longitude, d.latitude).y})
   .attr("r", function(d) {return getCircleRadius(d, maxValue)})

   calculateSVGBounds(hospitalData);
   d3.select('#circleSVG').style('visibility', 'visible');
  });
};

/**
 * Draws circles on map
 */
var initCircles = function(hospitalData){

  console.log("---INIT CIRCLES");
  console.log(hospitalData);
  console.log("...end");

  var maxValue = getMaxValue(hospitalData);

  console.log("--------MAXRADIUS-------------")
  console.log(maxValue);

  circles = svg.selectAll('circle')
    .data(hospitalData)
    .enter()
    .append('circle')
    .style("fill-opacity", 0.7)
    .attr("r", function(d){
      return getCircleRadius(d, maxValue);
    })
    .attr('fill', function(d) {
      return getCircleColour(d);
    })
    .attr('stroke', function(d) {
      return getCircleBorderColour(d);
    })
    .attr("cx", function(d) {
      return projectPoint(d.longitude, d.latitude).x;
    })
    .attr("cy", function(d) {
      return projectPoint(d.longitude, d.latitude).y;
    })
    .on("mouseover", function(d) {
      return showTooltip(d);
    })
    .on("mouseout", function(d) {
      return removeTooltip(d);
    })
    .on("click", function(d) {
      return callCharComponent(d);
     })
};

// support the CharacteristicsComponent with necessary data to show in characteristics(Steckbrief)
function callCharComponent(clickedHospital) {
  selectedHospital = clickedHospital;

  var clickedHospitalData = getAllDataForClickedHospital(clickedHospital);


  /*  filters only the current numerical attribute from clicked hospital */
  if (currentNumAttribute != null) {
    var sizeResult = clickedHospitalData.hospital_attributes.find(function( obj ) {
      return obj.code == currentNumAttribute.code;
    });
  } else {
    sizeResult = 0;
  }
  /*  filters only the current categorical attribute from clicked hospital */
  if (currentCatAttribute != null) {
    var catResult = clickedHospitalData.hospital_attributes.find(function ( obj ) {
      return obj.code == currentCatAttribute.code;
    });
  } else {
    catResult = 0;
  }

  console.log("current numattribute")
  console.log(currentNumAttribute)
  console.log("only current attr from clicked hospital SIZERESULT")
  console.log(sizeResult)

  console.log("only current attr from clicked hospital CATRESULT")
  console.log(catResult)

  // displays the name and address of the clickes hospital in characteristics (Steckbrief)
  document.getElementById('hospitalName').innerHTML = clickedHospital.name;
  document.getElementById('hospitalAddress').innerHTML = clickedHospitalData.streetAndNumber + "<br/>"
  + clickedHospitalData.zipCodeAndCity;

  // displays the values of the current numerical and categorical attribute of clicked hospital
  if (sizeResult != null) {
    document.getElementById('numericalAttributeName').innerHTML = currentNumAttribute.nameDE;
    document.getElementById('numericalAttributeValue').innerHTML = sizeResult.value;
  } else {
    document.getElementById('numericalAttributeName').innerHTML = currentNumAttribute.nameDE;
    document.getElementById('numericalAttributeValue').innerHTML = "Keine Daten";
  }

  if (catResult != null) {
    document.getElementById('categoricalAttributeName').innerHTML = currentCatAttribute.nameDE;
    document.getElementById('categoricalAttributeValue').innerHTML = catResult.value;
  } else {
    document.getElementById('categoricalAttributeName').innerHTML = currentCatAttribute.nameDE;
    document.getElementById('categoricalAttributeValue').innerHTML = "Keine Daten";
  }
}

// sets numerical attribute to the current selected in dropdown or to the default value (EtMedL)
function setNumAttribute(attributeArray){
  if(attributeArray!=null){
    this.currentNumAttribute = attributeArray;
  }
}

// gets currently selected numerical attribute
function getNumAttribute(){
  return this.currentNumAttribute;
}

function setCatAttribute(attributeArray){
  if(attributeArray!=null){
    this.currentCatAttribute = attributeArray;
  }
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
var updateMap = function(numUniSp, numZentSp, numGrundVers, numPsychKl, numRehaKl, numSpezKl) {

  var data = allHospitalData;
  code = getNumAttribute().code;

  // remove circles that are already defined so we can initialize them again with other data
  removeCircles();

  // first empty array with hospital data then store only values with the right type
  hospitalData = [];
  type = [];

  // build up data array
  // even numbers of clicks mean that the checkbox is checked and hospitals with that type should be drawn
  if ((numUniSp % 2) === 0) {
    this.type.push("K111");
  }
  if((numZentSp % 2) === 0){
    this.type.push("K112");
  }
  if((numGrundVers % 2) === 0){
    this.type.push("K121", "K122", "K123");
  }
  if((numPsychKl % 2) === 0){
    this.type.push("K211", "K212");
  }
  if((numRehaKl % 2) === 0){
    this.type.push("K221");
  }
  if((numSpezKl % 2) === 0){
    this.type.push("K231", "K232", "K233", "K234", "K235");
  }

  initData(data, this.type, code);

  // draw circles with the data that is build above
  initCircles(hospitalData);
};

/**
 * Stores data in array for displaying it. Builds up array with the important information.
 * TODO: Improve function --> make it possible to select which attributes should be store in array (except for coordinates and name)
 * @param data data from backend (JSON)
 * @param type type of hospitals that should be displayed (improvement)
 * @param code String that defines the size of the circles
 */
function initData(data, type, code){
  console.log("initData");
  console.log(code);


  for (var i = 0; i < data.length; i++){

    // stores name, coordinates (latitude, longitude), size attribute value
    // and type of each hospita in a variable to save in array
    if(data[i].latitude!=null && data[i].longitude!=null){
      var hospitalName = data[i].name;
      var latitude = data[i].latitude;
      var longitude = data[i].longitude;

      // access attributes of hospital
      var attr = data[i].hospital_attributes;

      // filters code attribute and saves it in variable
      var sizeResult = attr.filter(function( obj ) {
        return obj.code == code;
      });

      // saves value of code attribute in variable
      if(sizeResult[0]!=null && sizeResult[0].value!=null){
        var sizeAttribute = Number(sizeResult[0].value);
      }
      var maxValue = 0;


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
            var newCoordinates = {longitude: longitude, latitude: latitude, name:hospitalName, radius: sizeAttribute, Typ: typAttribute};
            hospitalData.push(newCoordinates);
          }
        }
        if(type[j]=="none"){
          var newCoordinates = {longitude: longitude, latitude: latitude, name:hospitalName, radius: sizeAttribute, Typ: typAttribute};
          hospitalData.push(newCoordinates);
        }
      }
    }
  }
}

/**
 * Updates the current numerical attribute for characteristics (Steckbrief)
 * and initializes the change of circles' radius according to the chosen
 * numerical attribute
 * TODO: calculate new circle radius for current numerical attribute, visualisation not good yet (maybe calculateRadius better?)
 * @param numericalAttribute selected numerical Attribute from Dropdown1
 */
var updateCircleRadius = function(numericalAttribute) {
  currentNumAttribute = numericalAttribute;
  code = numericalAttribute.code;
  // console.log("num attribute in mapinit");
  // console.log(currentNumAttribute);
  // console.log("----------------------------");
  // console.log(getNumAttribute().nameDE);


  removeCircles();
  hospitalData = [];
  initData(allHospitalData, this.type, getNumAttribute().code);
  initCircles(hospitalData);
  callCharComponent(selectedHospital);
};

/**
 * Updates the current categorical attribute for characteristics (Steckbrief)
 * and initializes the change of markers' shapes according to the chosen
 * categorial attribute
 * TODO: new markers shape for current categorial attribute
 * @param categoricalAttribute selected categorical Attribute from Dropdown2
 */
var updateCircleShape = function(categoricalAttribute) {
  currentCatAttribute = categoricalAttribute;
  console.log("cat attribute in mapinit");
  console.log(currentCatAttribute);
  // console.log(selectedHospital)
  callCharComponent(selectedHospital);
  updateCatOptions(categoricalAttribute);
};

function updateCatOptions (categoricalAttribute) {

  console.log("####################")

  // hide all categorical attributes
  for(var i = 0; i<allCatAttributes.length; i++){
    hideAllOptions(allCatAttributes[i].code);
  }

  // only display the selected one
  toggleOptions(categoricalAttribute.code);

  // change the category title accordingly
  document.getElementById('catTitle').innerHTML = categoricalAttribute.nameDE;



  console.log("####################")



  // document.getElementById('catName').innerHTML = categoricalAttribute.nameDE;
  // if (categoricalAttribute.code == "LA") {
  //   document.getElementById('catOpt1').innerHTML = "Stationär";
  //   document.getElementById('catOpt2').innerHTML = "Ambulant, Stationär";
  // }
  // if (categoricalAttribute.code == "SL") {
  //   document.getElementById('catOpt1').innerHTML = "IPS";
  //   document.getElementById('catOpt2').innerHTML = "NF";
  //   document.getElementById('catOpt3').innerHTML = "NF, IPS";
  // }
}

function toggleOptions(inputCode){
  try{
    var x = document.getElementById(inputCode);

    if(x.style.display == "none"){
      x.style.display = "block"
    } else {
      x.style.display = "none";
    }
  } catch(err) {
    //console.log("could not toggle code " + inputCode);
    return
  }
}

function hideAllOptions(inputCode){
  try{
    var x = document.getElementById(inputCode);
    x.style.display = "none";
  }catch(err){
    return;
  }
}


//------------------------------------------------------
// outsourced functions for initCircles

/**
 * Gives markers different radius according to the numerical attribute
 * @param d data which is displayed as a circle
 * @returns {number} radius of the marker (according numerical attribute)
 */
function getCircleRadius(d, maxValue) {
  var zoomLevel = map.getZoom();
  if (!d.radius) {
    return 0; // circles without data have radius 0
  } else {
    return (Math.sqrt(d.radius/maxValue)*10+5)*zoomLevel*zoomLevel/100;
  }
}

/**
 * Returns the maximal value of the chosen numerical attribute
 * @param hospitalData data which is displayed as a circle
 * @returns {number} maximal radius of the chosen attribute
 */
function getMaxValue(hospitalData) {
  var maxValue = 0;
  // get max value of radius attribute (to calculate radius of circles)
  for(var i=0; i<hospitalData.length; i++){
    if(hospitalData[i]!=null && hospitalData[i].radius!=null){
      if(hospitalData[i].radius>maxValue){
        maxValue = hospitalData[i].radius;
      }
      else{
        continue;
      }
    }
  }
  return maxValue;
}

/**
 * Gives markers different color according to its type attribute
 * @param d data which is displayed as a circle
 * @returns {string} color of the marker (according to type)
 */
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
