// temporary solution with convertion of dataformat (for dummy data with degree and stuff)
var coordinateConverter = function(degreeMinuteSecondString){
  var degree = Number(degreeMinuteSecondString.split("°")[0]);
  var minutes = Number(degreeMinuteSecondString.split("°")[1].split("'")[0]);
  var seconds = Number(degreeMinuteSecondString.split("°")[1].split("'")[1].split(".")[0]);
  var latitude = degree + (minutes + seconds/60.0)/60.0
  return latitude;
};


var mapDrawer = function(data) {

  // store coordinates in new array
  var hospitalCoordinates = []
  for (var i = 0; i < data.length; i++){
    if(data[i].coordinates != null){
      var hospitalName = data[i].name;
      var latitude = data[i].coordinates.latitude;
      var longitude = data[i].coordinates.longitude;
      var newCoordinates = {x: longitude, y: latitude, name:hospitalName};
      hospitalCoordinates.push(newCoordinates);
    }else{
      continue;
    }
  }

  // store attributes in new array
  var hospitalAttributes = []
  for (var i = 0; i < data.length; i++){
    var attributes = data[i].attributes;
    hospitalAttributes.push(attributes);
  }

  // store only attribute "EtMedL" for size of hospital in new array
var sizeAttribute = []
for (var i = 0; i < data.length; i++){
  var att = data[i].attributes
  var result = att.filter(function( obj ) {
    return obj.code == "EtMedL";
  });
  sizeAttribute.push(result);
}
console.log("**************************")
console.log("sizeAttributes (EtMedL):");
console.log(sizeAttribute);
console.log("sample values from array:");
console.log(sizeAttribute[1][0].value);
console.log(sizeAttribute[0][0].value);
console.log(sizeAttribute[287][0].value);
//console.log(sizeAttribute[288][0].value); not defined!
//maybe the loop over sizeAttributes need to be length-1?
console.log(sizeAttribute.length);
console.log("**************************")


//sizeAttribute[288][0].value); not defined!
//maybe the loop over sizeAttributes need to be length-1?
// it's crashing anyway (cannot read "value" of undefined)
// idea would be: getting one array with just the values,
// order the values and split the array in three or four parts
// (like creating a size range) for different size of marker

// var orderedSizeAttributes = []
// for (var i = 0; i < sizeAttribute.length-1; i++){
//   if(sizeAttribute[i][0].value != null){
//    var onlySize = sizeAttribute[i][0].value;
//    orderedSizeAttributes.push(onlySize);

// missing: sorting and splitting the array
//   }else{
//      continue;
//    }
// }

  /**
   * Converts 2-dim array that contains numbers in string format into
   * a 1-dim array that contains numbers in ascending order.
   */
  function orderArray(attributes){
    var orderedSizeAttributes = [];
    for (var i = 0; i < attributes.length-1; i++){
      if(attributes[i][0]!=null){
        var value = attributes[i][0].value;
        orderedSizeAttributes.push(value);
      }
    }
    return orderedSizeAttributes.sort(function(a, b){return a-b});
  }

  // Get only values in ascending order for EtMedL-attribute
  // min value of EtMedL: 75268
  // max value of EtMedL: 1104189684
  var orderedArray = orderArray(sizeAttribute);
  console.log(orderedArray);


  // splits array in 4 categories with equal range
  // defines max value of each category
  // TODO: display markers in different categories differently
  var cat1 = [];
  var cat2 = [];
  var cat3 = [];
  var cat4 = [];

  var num = Math.round(orderedArray.length/4 + 1);
  var maxCat1 = orderedArray[num-1];
  var maxCat2 = orderedArray[(2*num)-1];
  var maxCat3 = orderedArray[(3*num)-1];
  var maxCat4 = 0;

  for(var i=0; i< orderedArray.length; i++){
    if(orderedArray[(4*num)-i] != null){
      maxCat4 = orderedArray[(4*num)-i];
      break;
    }
  }

  for(var i = 0; i< num; i++){
    var value = orderedArray[i];
    cat1.push(value)
  }
  for(var i = num; i< 2*num; i++){
    var value = orderedArray[i];
    cat2.push(value);
  }
  for(var i = 2*num; i< 3*num; i++){
    var value = orderedArray[i];
    cat3.push(value);
  }
  for(var i = 3*num; i< 4*num; i++){
    if(orderedArray[i]!=null){
      var value = orderedArray[i];
      cat4.push(value);
    }
    else{
      continue;
    }
  }
  console.log("Array category 1: " + cat1);
  console.log("Array category 2: " + cat2);
  console.log("Array category 3: " + cat3);
  console.log("Array category 4: " + cat4);
  console.log("Max value category 1: " + maxCat1);
  console.log("Max value category 2: " + maxCat2);
  console.log("Max value category 3: " + maxCat3);
  console.log("Max value category 4: " + maxCat4);

  /*for(var i = 0; i < orderedArray.length-1; i++){
    if (orderedArray[i]>100000000 ){
      var value = orderedArray[i];
      cat1.push(value);
    }
    else if (orderedArray[i]> 1000000){
      var value = orderedArray[i];
      cat2.push(value);
    }
    else if (orderedArray[i]> 100000){
      var value = orderedArray[i];
      cat3.push(value);
    }
    else{
      var value = orderedArray[i];
      cat4.push(value);
    }
  }*/


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

// test data for the hospitals
/*   var testData = [
    {x: 7.425471000000016, y: 46.947142, name: 'Inselspital', city: '3010 Bern'},
    {x: 8.547388899999987, y: 47.3795461, name: 'Universitätsspital Zürich', city: '8091 Zürich'},
    {x: 9.388304000000062, y: 47.429348, name: 'Kantonsspital St.Gallen', city: '9007 St.Gallen'},
    {x: 8.295154400000001, y: 47.05875549999999},
    {x: 7.58587, y: 47.561557},
    {x: 8.059350999999992, y: 47.388479},
    {x: 8.953260999999998, y: 46.0176793},
  ]; */


  /**
   * markers and tooltip with D3
   */
    // add SVG element to leaflet's overlay pane (group layers)
  var svg = d3.select(map.getPanes().overlayPane).append("svg").attr('id', 'circleSVG');

// calculates svg bounds when we first open the map
  calculateSVGBounds(hospitalCoordinates);

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
     });

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
