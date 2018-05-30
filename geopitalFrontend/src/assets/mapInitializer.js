/**
 * Contains logic of application
 * Is at the beginning responsible that the map is initialized correctly
 * and the circles are drawn with the data provided.
 * Then it is responsible that a certain selection from a user is displayed
 * and visualized correctly.
 */

// variables that we need globally that are initialized in a function at one point
var map;
var allHospitalData; // initialized in function mapDrawer, contains all hospital data, must not be changed after it is initialized
var div;
var circles;
var hospitalData = [];
var currentNumAttribute; // numerical attribute that defines the radius of the circles
var currentCatAttribute; // categorical attribute to be displayed in Steckbrief and for filtering
var allCatAttributes = [];
var checkBoxDictionary; // contains all options of categorical attributes with "true" (checked) and "false" (unchecked) values
var svg;
var type;
var selectedHospital;
var filteredHospitals; // contains hospitals filtered according to the selection of the categorical attributes


/**
 * Initializes map with the correct design.
 * Draws circles from the provided data and implements zoom-function for these circles.
 *
 * @param hospitals array, contains general information for each hospital (name, address, coordinates, attributes)
 * @param numAttributes array, contains all numerical attributes a hospital can have (name, value, code)
 * @param catAttributes array, contains all categorical attributes a hospital can have (name, value, code)
 */
var mapDrawer = function(hospitals, numAttributes, catAttributes) {

  //------------------------------------------------------
  // Initialize map

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


  //------------------------------------------------------
  // Initialize data

  // stores initially all data from all hospitals
  allHospitalData = hospitals;

  // sets default numerical attribute (EtMedL)
  currentNumAttribute = numAttributes.find(function ( obj ) {
    return obj.code == "EtMedL";
  });
  // sets default categorical attribute (Typ)
  currentCatAttribute = catAttributes.find(function ( obj ) {
    return obj.code == "RForm";
  });

  // initialize array with "none" so we know that no hospitals have been filtered yet
  filteredHospitals = ["none"];

  // stores categorical attributes that can be displayed in Steckbrief
  allCatAttributes = catAttributes;

  // set default selection to first hospital in list and show it on Steckbrief
  selectedHospital = hospitals[0];
  callCharComponent(selectedHospital);

  // defines hospital types (type attribute) that are displayed as circles, since at first we want all types
  // we give here "none" as none specific types have to be selected (see function initData)
  type = [];
  this.type.push("none");

  // initializes data so we can work with it for the visualisation (see function initData)
  initData(hospitals, type);


  //------------------------------------------------------
  // markers and tooltip with D3

  // add SVG element to leaflet's overlay pane (group layers)
  svg = d3.select(map.getPanes().overlayPane).append("svg").attr('id', 'circleSVG');

  // calculates svg bounds for the first time
  // on the svg-layer we implement the visualisation with D3
  calculateSVGBounds(hospitalData);

  // Define the div for the tooltip (used for mouseover functionality)
  div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0.0);

  // initialize circles on map
  initCircles(hospitalData);

  // adapt Leaflet’s API to fit D3 with custom geometric transformation
  // calculates x and y coordinate in pixels for given coordinates (wgs84)
  function projectPoint(x, y) {
    var point = map.latLngToLayerPoint(new L.LatLng(y, x));
    return point;
  }

  // we have to calculate the width and the height of the svg element.
  // calculate the y max and x max value for all datapoints and add a padding.
  // xmax is width and ymax is height of svg-layer
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
    var maxValue = getMaxValue(hospitalData);
    circles
      .attr("cx", function(d) {return projectPoint(d.longitude, d.latitude).x})
      .attr("cy", function(d) {return projectPoint(d.longitude, d.latitude).y})
      .attr("r", function(d) {return getCircleRadius(d, maxValue)});

    calculateSVGBounds(hospitalData);
    d3.select('#circleSVG').style('visibility', 'visible');
  });
};


/**
 * Stores data in array for displaying it. Builds up array with the important information.
 *
 * @param data array that contains hospital information
 * @param type type (from attributes) of hospitals that should be displayed
 */
function initData(data, type){

  // initially empty array to be filled up with hospitals to be displayed on map
  hospitalData = [];

  for (var i = 0; i < data.length; i++){

    // stores name, coordinates (latitude, longitude), size attribute value
    // and type of each hospital in a variable to save in array
    if(data[i].name!=null && data[i].latitude!=null && data[i].longitude!=null){
      var hospitalName = data[i].name;
      var latitude = data[i].latitude;
      var longitude = data[i].longitude;

      // access attributes of hospital
      var attr = data[i].hospital_attributes;

      // filters code attribute and saves it in variable
      var sizeResult = attr.filter(function( obj ) {
        return obj.code == currentNumAttribute.code;
      });

      // saves value of code attribute in variable
      if(sizeResult[0]!=null && sizeResult[0].value!=null){
        var sizeAttribute = Number(sizeResult[0].value);
      } else {
        continue;
      }

      // filters type attribute and saves it in variable
      var typResult = attr.filter(function ( obj ) {
        return obj.code == "Typ";
      });

      // saves value of type attribute in variable
      if(typResult[0]!=null && typResult[0].value!=null){
        var typAttribute = String(typResult[0].value);
      } else {
        continue;
      }

      // store only hospitals with right attribute type in array
      // type "none" stands for default value (all hospitals)
      for(var j = 0; j < type.length; j++){
        if(type[j]!="none"){
          if(typAttribute==type[j]){
            var basicInformation = {longitude: longitude, latitude: latitude, name:hospitalName, radius: sizeAttribute, Typ: typAttribute};
            hospitalData.push(basicInformation);
          }
        }
        if(type[j]=="none"){
          var basicInformation = {longitude: longitude, latitude: latitude, name:hospitalName, radius: sizeAttribute, Typ: typAttribute};
          hospitalData.push(basicInformation);
        }
      }
    }
  }
}


/**
 * Draws circles on svg layer on map
 *
 * @param hospitalData data that is visualized as circles (with x- and y-coordinates and radius r)
 */
var initCircles = function(hospitalData){

  // get maximal value of radius to calculate radius of circles
  var maxValue = getMaxValue(hospitalData);

  // define circles
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

  // displays the name and address of the clicked hospital in characteristics (Steckbrief)
  document.getElementById('hospitalName').innerHTML = clickedHospital.name;
  if (clickedHospitalData.streetAndNumber != null) {
    document.getElementById('hospitalAddress').innerHTML = clickedHospitalData.streetAndNumber + "<br/>"
    + clickedHospitalData.zipCodeAndCity;
  } else {
    document.getElementById('hospitalAddress').innerHTML = "" + clickedHospitalData.zipCodeAndCity;
  }


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
 *
 * For the next parameters: number of times checkbox was pressed
 * --> since default is checked, even numbers (0,2,4,6, ...) mean that this type should be displayed
 * @param numUniSp
 * @param numZentSp
 * @param numGrundVers
 * @param numPsychKl
 * @param numRehaKl
 * @param numSpezKl
 */
var updateMap = function(numUniSp, numZentSp, numGrundVers, numPsychKl, numRehaKl, numSpezKl) {

  var data;

  // use only filtered hospitals (categorical attributes) but only if a filter is active
  if(filteredHospitals[0]!="none"){
    data = filteredHospitals;
  }
  else{
    data = allHospitalData;
  }

  // remove circles that are already defined so we can initialize them again with other data
  removeCircles();

  // first empty type
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

  initData(data, this.type);

  // draw circles with the data that is build above
  initCircles(hospitalData);
};


/**
 * Updates the current numerical attribute for characteristics (Steckbrief)
 * and initializes the change of circles' radius according to the chosen
 * numerical attribute
 * @param numericalAttribute selected numerical Attribute from Dropdown1
 */
var updateCircleRadius = function(numericalAttribute) {
  currentNumAttribute = numericalAttribute;

  var data;
  if(filteredHospitals[0]!="none"){
    data = filteredHospitals;
  }
  else{
    data = allHospitalData;
  }

  removeCircles();
  initData(data, this.type);
  initCircles(hospitalData);
  callCharComponent(selectedHospital);
};

/**
 * Updates the current categorical attribute and the characteristics of the
 * selected hospital (Steckbrief), resets the previous selection of filter options
 * and shows the new options for the selected categorical attribute
 * @param categoricalAttribute selected categorical Attribute from Dropdown1
 */
var showCatOptions = function(categoricalAttribute) {
  currentCatAttribute = categoricalAttribute;
  callCharComponent(selectedHospital);

  // reset selection when changing the category
  resetCheckBoxes();

  updateCatOptions(categoricalAttribute);
  filteredHospitals = ["none"];
  removeCircles();
  initData(allHospitalData, this.type);
  initCircles(hospitalData);
};

/**
 * Resets the deactivated options on a categorical attribute when the category changes.
 * Checks all checkboxes grafically and fills up the checkbox-dictionary with "true"
 * for all options
 */
function resetCheckBoxes(){

  // mark all graphical checkboxes as "checked"
  var allContainers = document.getElementsByName('checkbox');
  for (var i = 0; i<allContainers.length; i++){
    allContainers[i].checked = true
  }

  // update the check box dictionary accordingly to true for all values
  for (var key in checkBoxDictionary){
    for (var innerKey in checkBoxDictionary[key]){
      checkBoxDictionary[key][innerKey] = true
    }
  }
}


/**
 * Displays the options according to the chosen categorical attribute
 * on the menu (categorical-attributes)
 * @param categoricalAttribute selected categorical Attribute from Dropdown1
 */
function updateCatOptions(categoricalAttribute) {

  // hide all categorical attributes
  for(var i = 0; i<allCatAttributes.length; i++){
    hideAllOptions(allCatAttributes[i].code);
  }
  // only display the selected one
  toggleOptions(categoricalAttribute.code);

  // change the category title accordingly
  document.getElementById('catTitle').innerHTML = categoricalAttribute.nameDE;
}

/**
 * Displays only the options for the selected categorical attribute
 * @param inputCode selected categorical Attribute from Dropdown1
 */
function toggleOptions(inputCode){
  try{
    var x = document.getElementById(inputCode);

    if(x.style.display == "none"){
      x.style.display = "block"
    } else {
      x.style.display = "none";
    }
  } catch(err) {
    return
  }
}

/**
 * Hides all options of all categorical attributes before displaying
 * the default or the selected one
 */
function hideAllOptions(inputCode){
  try{
    var x = document.getElementById(inputCode);
    x.style.display = "none";
  }catch(err){
    return;
  }
}

/**
 * Initially stores the dictionary with all options as "true" (checked) as global variable,
 * @param allDict the dictionary of all options activated from categorial-attributes.component
 */
function setDefaultOptionSelection(AllDict) {
  checkBoxDictionary = AllDict;
}

/**
 * Initializes the dataset for displaying only the hospitals according to the
 * selected options from the categorical attributes.
 * @param category the categorical attribute
 * @param code the code of the selected/deselected option
 */

function updateCirclesFromSelection(category, code){

  // toggle dictionary entry of selected/deselected checkbox, described by category and code
  checkBoxDictionary[category][code] = !checkBoxDictionary[category][code]

  // update the dataset of hospitals who match to the selected options
  filteredHospitals = filter(allHospitalData, checkBoxDictionary);
  initData(filteredHospitals, this.type);

  //update circles accordingly
  removeCircles();
  initCircles(hospitalData);
}

/**
 * Filters all hospitals who contains one of the selected (true) options
 * from the categorical attribute.
 * @param hospitalDataToFilter all hospitals to filter according the selected options
 * @param allDict the dictionary of the activated/deactivated options
 */
function filter(hospitalDataToFilter, allDict){
   var filteredHospitalData = [];

   // consider all hospitals to be eligable
   for (var i = 0; i < hospitalDataToFilter.length; i++){
      var skip = true;
      // loop over all attributes of the i-th hospital
      for (var j = 0; j < hospitalDataToFilter[i].hospital_attributes.length; j++){

        var currentCode = hospitalDataToFilter[i].hospital_attributes[j].code;
        var checkPerformed = false;
        // check only the attributes who are the current selected attribute
        // and who are part of the categorical attributes (in allDict)
        if((currentCode == currentCatAttribute.code)  && (currentCode in allDict)){
          for (var key in allDict[currentCode]){
          // keep hospital if checkbox(dictionary) entry is true and contained in hospital attribute
           if(allDict[currentCode][key] &&
              hospitalDataToFilter[i].hospital_attributes[j].value.includes(key)){
                skip = false;
                checkPerformed = true;
                break;
            } else {
                // checkbox entry is false or hospital doesn't contain the value
                continue;
            }
          }
        checkPerformed = true;
        } else {
          // attribute is not part of the filter dictionary
          continue;
        }
        // if we checked the currentCatAttribute we are done
        if(checkPerformed){
          break;
        }
      }
      // if skip is true, we don't add the hospital and continue with the next
      if(skip){
        continue;
      } else {
      // we don't skip the hospital and add it to the selection
        filteredHospitalData.push(hospitalDataToFilter[i]);
      }
    }
    return filteredHospitalData;
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
  if (d.radius == 0) {
    return 3*zoomLevel*zoomLevel/100; // circles with value 0 have radius 3
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

 /**
  * Gives markers different border color according to its type attribute
  * @param d data which is displayed as a circle
  * @returns {string} color of the border of the marker (according to type)
  */
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


 /**
  * Displays tooltip when hovering over a marker
  * @param d data which is displayed as a circle
  */
function showTooltip(d) {
  div.transition()
        .duration(1)
        .style("opacity", .98);
      div.html(d.name)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 0) + "px");
}

 /**
  * Let's the tooltip disappear when hovering out of a marker
  * @param d data which is displayed as a circle
  */
function removeTooltip(d) {
  div.transition()
        .duration(500)
        .style("opacity", 0);
}


//------------------------------------------------------
// get and setter methods

// sets numerical attribute to the currently selected in dropdown
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


