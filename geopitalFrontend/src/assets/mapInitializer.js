/**
 * Contains logic of application
 * Is at the beginning responsible that the map is initialized correctly
 * and the circles are drawn with the data provided.
 * Then it is responsible that a certain selection from a user is displayed
 * and visualized correctly.
 */


// variables that we need globally that are initialized in a function at one point
let map;
let allHospitalData; // initialized in function mapDrawer, contains all hospital data, must not be changed after it is initialized
let div;
let circles;
let hospitalData = [];
let currentNumAttribute; // numerical attribute that defines the radius of the circles
let currentCatAttribute; // categorical attribute to be displayed in Steckbrief and for filtering
let allCatAttributes = [];
let checkBoxDictionary; // contains all options of categorical attributes with "true" (checked) and "false" (unchecked) values
let svg;
let type;
let selectedHospital;
let filteredHospitals; // contains hospitals filtered according to the selection of the categorical attributes

const singleClassCategories = ['RForm'];
const multiClassCategories = ['Akt', 'SL', 'WB', 'SA', 'LA'];
/**
 * Initializes map with the correct design.
 * Draws circles from the provided data and implements zoom-function for these circles.
 *
 * @param hospitals array, contains general information for each hospital (name, address, coordinates, attributes)
 * @param numAttributes array, contains all numerical attributes a hospital can have (name, value, code)
 * @param catAttributes array, contains all categorical attributes a hospital can have (name, value, code)
 */
function mapDrawer(hospitals, numAttributes, catAttributes) {

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
    return obj.code === "EtMedL";
  });
  // sets default categorical attribute (Typ)
  currentCatAttribute = catAttributes.find(function ( obj ) {
    return obj.code === "RForm";
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
  type.push("none");

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

  /*
  div.append("h6").attr("id", "hospitalName");


  var table = div.append("table").attr("class", "table table-responsive-md")
    .append("tbody");

  var row1 = table.append("tr");
  row1.append("td").text("Adresse");
  row1.append("td").attr("id", "hospitalAddress");

  var row2 = table.append("tr");
  row2.append("td").attr("id", "numericalAttributeName");
  row2.append("td").attr("id", "numericalAttributeValue");

  var row3 = table.append("tr");
  row3.append("td").attr("id", "categoricalAttributeName");
  row3.append("td").attr("id", "categoricalAttributeValue");
  */

  // initialize circles on map
  initCircles(hospitalData);

  // adapt Leaflet’s API to fit D3 with custom geometric transformation
  // calculates x and y coordinate in pixels for given coordinates (wgs84)
  function projectPoint(x, y) {
    return map.latLngToLayerPoint(new L.LatLng(y, x));
  }

  // we have to calculate the width and the height of the svg element.
  // calculate the y max and x max value for all datapoints and add a padding.
  // xmax is width and ymax is height of svg-layer
  function calculateSVGBounds(hospitals) {
    let xMax = 0;
    let yMax = 0;
    let heightPadding = 100;
    let widthPadding = 300;
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
    let maxValue = getMaxValue(hospitalData);
    circles
      .attr("cx", function(d) {return projectPoint(d.longitude, d.latitude).x})
      .attr("cy", function(d) {return projectPoint(d.longitude, d.latitude).y})
      .attr("r", function(d) {return getCircleRadius(d, maxValue)});

    calculateSVGBounds(hospitalData);
    d3.select('#circleSVG').style('visibility', 'visible');
  });
}


/**
 * Stores data in array for displaying it. Builds up array with the important information.
 *
 * @param data array that contains hospital information
 * @param type type (from attributes) of hospitals that should be displayed
 */
function initData(data, type) {
  // initially empty array to be filled up with hospitals to be displayed on map
  hospitalData = [];

  for (let i = 0; i < data.length; i++) {

    // stores name, coordinates (latitude, longitude), size attribute value
    // and type of each hospital in a variable to save in array
    if(data[i].name !== null && data[i].latitude !== null && data[i].longitude !== null) {
      let hospitalName = data[i].name;
      let latitude = data[i].latitude;
      let longitude = data[i].longitude;


      // access attributes of hospital
      let attr = data[i].hospital_attributes;
      let sizeAttribute;
      let typAttribute;

      // filters code attribute and saves it in variable
      let sizeResult = attr.filter(function( obj ) {
        return obj.code === currentNumAttribute.code;
      });

      if (sizeResult == null || sizeResult[0] == null ||sizeResult[0].value == null) {
        continue;
      } else {
        sizeAttribute = Number(sizeResult[0].value);
      }

      // filters type attribute and saves it in variable
      let typResult = attr.filter(function ( obj ) {
        return obj.code === "Typ";
      });

      if (typResult == null || typResult[0] == null || typResult[0].value == null) {
        typResult = null;
      } else {
        typAttribute = String(typResult[0].value);
      }


      // store only hospitals with right attribute type in array
      // type "none" stands for default value (all hospitals)
      let basicInformation;
      for(let j = 0; j < type.length; j++) {
        if(type[j] !== "none") {
          if(typAttribute === type[j]) {
            basicInformation = {longitude: longitude, latitude: latitude, name:hospitalName, radius: sizeAttribute, Typ: typAttribute};
            hospitalData.push(basicInformation);
          }
        }
        if(type[j] === "none") {
          basicInformation = {longitude: longitude, latitude: latitude, name:hospitalName, radius: sizeAttribute, Typ: typAttribute};
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
function initCircles(hospitalData) {

  // get maximal value of radius to calculate radius of circles
  let maxValue = getMaxValue(hospitalData);

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
    .on("mouseover", function (d) {
      return showTooltip(d);
    })
    .on("mouseout", function () {
      return removeTooltip();
    })
    .on("click", function(d) {
      return callCharComponent(d);
     })
}


// support the CharacteristicsComponent with necessary data to show in characteristics(Steckbrief)
function callCharComponent(clickedHospital) {
  selectedHospital = clickedHospital;

  let clickedHospitalData = getAllDataForClickedHospital(clickedHospital);
  let sizeResult = {};
  let catResult = {};

  /*  filters only the current numerical attribute from clicked hospital */
  if (currentNumAttribute !== null) {
    sizeResult = clickedHospitalData.hospital_attributes.find(function( obj ) {
      return obj.code === currentNumAttribute.code;
    });
  }

  if (currentNumAttribute === null || sizeResult == null) {
    sizeResult = null;
  }

  /*  filters only the current categorical attribute from clicked hospital */
  if (currentCatAttribute !== null) {
    catResult = clickedHospitalData.hospital_attributes.find(function ( obj ) {
      return obj.code === currentCatAttribute.code;
    });
  }

  if (currentCatAttribute === null || catResult == null) {
    catResult = null;
  }

  // displays the name and address of the clicked hospital in characteristics (Steckbrief)
  document.getElementById('hospitalName').innerHTML = clickedHospital.name;
  if (clickedHospitalData.streetAndNumber !== '') {
    document.getElementById('hospitalAddress').innerHTML = clickedHospitalData.streetAndNumber + "<br/>"
    + clickedHospitalData.zipCodeAndCity;
  } else {
    document.getElementById('hospitalAddress').innerHTML = "" + clickedHospitalData.zipCodeAndCity;
  }

  // displays the values of the current numerical and categorical attribute of clicked hospital
  if (sizeResult !== null) {
    document.getElementById('numericalAttributeName').innerHTML = currentNumAttribute.nameDE;
    document.getElementById('numericalAttributeValue').innerHTML = formatValues(currentNumAttribute, sizeResult.value);
  } else {
    document.getElementById('numericalAttributeName').innerHTML = currentNumAttribute.nameDE;
    document.getElementById('numericalAttributeValue').innerHTML = "Keine Daten";
  }

  if (catResult !== null) {
    document.getElementById('categoricalAttributeName').innerHTML = currentCatAttribute.nameDE;
    document.getElementById('categoricalAttributeValue').innerHTML = catResult.value;
  } else {
    document.getElementById('categoricalAttributeName').innerHTML = currentCatAttribute.nameDE;
    document.getElementById('categoricalAttributeValue').innerHTML = "Keine Daten";
  }
}

function formatValues(attribute, value) {
  if (attribute.nameDE.includes("Anteil")) {
    if (parseFloat(value) > 1) {
      return parseFloat(value / 100).toLocaleString('de-CH', { style: 'percent', minimumFractionDigits: 3})
    } else {
      return parseFloat(value).toLocaleString('de-CH', { style: 'percent', minimumFractionDigits: 3})
    }
  } else {
    return parseFloat(value).toLocaleString('de-CH', { maximumFractionDigits: 3})
  }
}

// adapt Leaflet’s API to fit D3 with custom geometric transformation
// calculates x and y coordinate in pixels for given coordinates (wgs84)
function projectPoint(x, y) {
  return map.latLngToLayerPoint(new L.LatLng(y, x));
}


/**
 * Removes circles and all attributes that has been assigned to them.
 */
function removeCircles() {
  if(svg !== null && svg.selectAll !== null) {
    svg.selectAll('circle').remove();
  }
}


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
function updateMap(numUniSp, numZentSp, numGrundVers, numPsychKl, numRehaKl, numSpezKl) {

  let data;

  // use only filtered hospitals (categorical attributes) but only if a filter is active
  console.log('filteredHospitals', filteredHospitals, filteredHospitals[0])
  if(filteredHospitals[0] !== "none") {
    data = filteredHospitals;
  } else {
    data = allHospitalData;
  }

  // remove circles that are already defined so we can initialize them again with other data
  removeCircles();

  // first empty type
  type = [];

  // build up data array
  // odd numbers of clicks mean that the checkbox is checked and hospitals with that type should be drawn
  if ((numUniSp % 2) === 1) {
    type.push("K111");
  }
  if((numZentSp % 2) === 1) {
    type.push("K112");
  }
  if((numGrundVers % 2) === 1) {
    type.push("K121", "K122", "K123");
  }
  if((numPsychKl % 2) === 1) {
    type.push("K211", "K212");
  }
  if((numRehaKl % 2) === 1) {
    type.push("K221");
  }
  if((numSpezKl % 2) === 1) {
    type.push("K231", "K232", "K233", "K234", "K235");
  }

  initData(data, type);

  // draw circles with the data that is build above
  initCircles(hospitalData);
}


/**
 * Updates the current numerical attribute for characteristics (Steckbrief)
 * and initializes the change of circles' radius according to the chosen
 * numerical attribute
 * @param numericalAttribute selected numerical Attribute from Dropdown1
 */
function updateCircleRadius(numericalAttribute) {
  currentNumAttribute = numericalAttribute;

  let data;
  if(filteredHospitals[0] !== "none") {
    data = filteredHospitals;
  } else {
    data = allHospitalData;
  }

  removeCircles();
  initData(data, type);
  initCircles(hospitalData);
  callCharComponent(selectedHospital);
}

/**
 * Updates the current categorical attribute and the characteristics of the
 * selected hospital (Steckbrief), resets the previous selection of filter options
 * and shows the new options for the selected categorical attribute
 * @param categoricalAttribute selected categorical Attribute from Dropdown1
 */
function showCatOptions(categoricalAttribute) {
  currentCatAttribute = categoricalAttribute;
  callCharComponent(selectedHospital);

  // reset selection when changing the category
  resetCheckBoxes();

  updateCatOptions(categoricalAttribute);
  filteredHospitals = ["none"];
  removeCircles();
  initData(allHospitalData, type);
  initCircles(hospitalData);
}

/**
 * Resets the deactivated options on a categorical attribute when the category changes.
 * Checks all checkboxes grafically and fills up the checkbox-dictionary with "true"
 * for all options
 */
function resetCheckBoxes() {

  // mark all graphical checkboxes as "checked"
  let allContainers = document.getElementsByName('checkbox');
  for (let i = 0; i<allContainers.length; i++) {
    allContainers[i].checked = false
  }

  // update the check box dictionary accordingly to true for all values
  for (let key in checkBoxDictionary) {
    for (let innerKey in checkBoxDictionary[key]) {
      checkBoxDictionary[key][innerKey] = false
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
  for(let i = 0; i<allCatAttributes.length; i++) {
    hideAllOptions(allCatAttributes[i].code);
  }
  // only display the selected one
  toggleOptions(categoricalAttribute.code);
}

/**
 * Displays only the options for the selected categorical attribute
 * @param inputCode selected categorical Attribute from Dropdown1
 */
function toggleOptions(inputCode) {
  try {
    let x = document.getElementById(inputCode);

    if(x.style.display === "none") {
      x.style.display = "block"
    } else {
      x.style.display = "none";
    }
  } catch(err) {
  }
}

/**
 * Hides all options of all categorical attributes before displaying
 * the default or the selected one
 */
function hideAllOptions(inputCode) {
  try {
    let x = document.getElementById(inputCode);
    x.style.display = "none";
  } catch(err){
  }
}

/**
 * Initially stores the dictionary with all options as "true" (checked) as global variable,
 * @param allDict the dictionary of all options activated from categorial-attributes.component
 */
function setDefaultOptionSelection(allDict) {
  checkBoxDictionary = allDict;
}

/**
 * Initializes the dataset for displaying only the hospitals according to the
 * selected options from the categorical attributes.
 * @param category the categorical attribute
 * @param code the code of the selected/deselected option
 */

function updateCirclesFromSelection(category, code) {

  // toggle dictionary entry of selected/deselected checkbox, described by category and code
  checkBoxDictionary[category][code] = !checkBoxDictionary[category][code];

  // update the dataset of hospitals who match to the selected options
  // filteredHospitals = filter(allHospitalData, checkBoxDictionary);
  filteredHospitals = newFilter(allHospitalData, checkBoxDictionary)
  initData(filteredHospitals, type);

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
function filter(hospitalDataToFilter, allDict) {
  let filteredHospitalData = [];

  // consider all hospitals to be eligable
  for (let i = 0; i < hospitalDataToFilter.length; i++) {
    let skip = true;
    // loop over all attributes of the i-th hospital
    for (let j = 0; j < hospitalDataToFilter[i].hospital_attributes.length; j++) {

      let currentCode = hospitalDataToFilter[i].hospital_attributes[j].code;
      let checkPerformed = false;

      // check only the attributes who are the current selected attribute
      // and who are part of the categorical attributes (in allDict)
      if((currentCode === currentCatAttribute.code)  && (currentCode in allDict)) {

        let checkedAttributes = [];
        for (let key in allDict[currentCode]) {
          if (allDict[currentCode][key]) {
            checkedAttributes.push(key)
          }
        }


        if (checkedAttributes.length === 0) {
          skip = false;
          checkPerformed = true;
          break;
        }

        if (singleClassCategories.indexOf(currentCatAttribute.code) >= 0) {
          for (let key = 0; key < checkedAttributes.length; key++) {
            if (hospitalDataToFilter[i].hospital_attributes[j].value.includes(checkedAttributes[key])) {
              skip = false;
              checkPerformed = true;
              break;
            }
          }
          checkPerformed = true;
        } else if (multiClassCategories.indexOf(currentCatAttribute.code) >= 0) {
          let containsEverySelectedKey = true;

          for (let key = 0; key < checkedAttributes.length; key++) {
            if (!hospitalDataToFilter[i].hospital_attributes[j].value.includes(checkedAttributes[key])) {
              containsEverySelectedKey = false;
            }
          }

          if (containsEverySelectedKey) {
            skip = false;
          }

          checkPerformed = true;
        }


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
    if(!skip) {
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
 * @param maxValue
 * @returns {number} radius of the marker (according numerical attribute)
 */
function getCircleRadius(d, maxValue) {
  let zoomLevel = map.getZoom();
  if (d.radius === 0) {
    return 3*zoomLevel*zoomLevel/100; // circles with value 0 have radius 3
  } else {
    return ((d.radius/maxValue)*40+5)*zoomLevel*zoomLevel/100;
  }
}

/**
 * Returns the maximal value of the chosen numerical attribute
 * @param hospitalData data which is displayed as a circle
 * @returns {number} maximal radius of the chosen attribute
 */
function getMaxValue(hospitalData) {
  let maxValue = 0;
  // get max value of radius attribute (to calculate radius of circles)
  for(let i=0; i<hospitalData.length; i++){
    if(hospitalData[i] !== null && hospitalData[i].radius !== null){
      if(hospitalData[i].radius>maxValue){
        maxValue = hospitalData[i].radius;
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
  if (d.Typ === "K111") // Universitätspitäler
    return ('#a82a2a');
  if (d.Typ === "K112") // Zentrumsspitäler
    return ('#a89f2a');
  if (d.Typ === "K121" || d.Typ === "K122" || d.Typ === "K123") // Grundversorgung
    return ('#2ca82a');
  if (d.Typ === "K211" || d.Typ === "K212") // Psychiatrische Kliniken
    return ('#2a8ea8');
  if (d.Typ === "K221") // Rehabilitationskliniken
    return ('#2c2aa8');
  if (d.Typ === "K231" || d.Typ === "K232" || d.Typ === "K233" || d.Typ === "K234" || d.Typ === "K235") //Spezialkliniken
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
  if (d.Typ === "K111") // Universitätspitäler
    return ('#a82a2a');
  if (d.Typ === "K112") // Zentrumsspitäler
    return ('#a89f2a');
  if (d.Typ === "K121" || d.Typ === "K122" || d.Typ === "K123") // Grundversorgung
    return ('#2ca82a');
  if (d.Typ === "K211" || d.Typ === "K212") // Psychiatrische Kliniken
    return ('#2a8ea8');
  if (d.Typ === "K221") // Rehabilitationskliniken
    return ('#2c2aa8');
  if (d.Typ === "K231" || d.Typ === "K232" || d.Typ === "K233" || d.Typ === "K234" || d.Typ === "K235") //Spezialkliniken
    return ('#772aa8');
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
     .style("left", d3.event.pageX + "px")
     .style("top", d3.event.pageY + "px");
}


 /**
  * Let's the tooltip disappear when hovering out of a marker
  */
function removeTooltip() {
  div.transition()
        .duration(500)
        .style("opacity", 0);
}

/*
function initTooltipData(clickedHospital) {
  selectedHospital = clickedHospital;

  let clickedHospitalData = getAllDataForClickedHospital(clickedHospital);

  //  filters only the current numerical attribute from clicked hospital
  if (currentNumAttribute != null) {
    let sizeResult = clickedHospitalData.hospital_attributes.find(function( obj ) {
      return obj.code == currentNumAttribute.code;
    });
  } else {
    sizeResult = 0;
  }

  // filters only the current categorical attribute from clicked hospital
  if (currentCatAttribute != null) {
    let catResult = clickedHospitalData.hospital_attributes.find(function ( obj ) {
      return obj.code == currentCatAttribute.code;
    });
  } else {
    catResult = 0;
  }

  d3.select("#hospitalName").text(clickedHospital.name);
  if (clickedHospitalData.streetAndNumber != null) {
    d3.select('#hospitalAddress').text(clickedHospitalData.streetAndNumber + "<br/>"
      + clickedHospitalData.zipCodeAndCity)
  } else {
    d3.select('#hospitalAddress').text("" + clickedHospitalData.zipCodeAndCity);
  }


  // displays the values of the current numerical and categorical attribute of clicked hospital
  d3.select('#numericalAttributeName').text(currentNumAttribute.nameDE)
  if (sizeResult != null) {
    d3.select('#numericalAttributeValue').text(formatValues(currentNumAttribute, sizeResult.value))
  } else {
    d3.select('#numericalAttributeValue').text("Keine Daten")
  }

  d3.select('#categoricalAttributeName').text(currentCatAttribute.nameDE)

  if (catResult != null) {
    d3.select('#categoricalAttributeValue').text(catResult.valueE)
  } else {
    d3.select('#categoricalAttributeValue').text("Keine Daten")
  }
}
*/

//------------------------------------------------------
// get and setter methods

// sets numerical attribute to the currently selected in dropdown
function setNumAttribute(attributeArray) {
  if(attributeArray !== null) {
    currentNumAttribute = attributeArray;
  }
}

// gets currently selected numerical attribute
function getNumAttribute() {
  return currentNumAttribute;
}

function setCatAttribute(attributeArray) {
  if(attributeArray !== null) {
    currentCatAttribute = attributeArray;
  }
}

// returns an array with all data of the clicked hospital
function getAllDataForClickedHospital(clickedHospital) {
  // finds array according to clickedHospital
  return allHospitalData.find(function( obj ) {
    return obj.name === clickedHospital.name;
  });
}


