# Code Review 30.4.18

## Code Smells Backend

Consider style guide: https://github.com/airbnb/javascript

### General 

  - Way too few good documentation. 
  - Keyword `let` is outdated and should not be used, use either `const` for variables which will not change or `let` for dynamically changing variables.

### File: `geopitalBackend/controllers/hospital.controller.js

#### Issue 1
```ecmascript 6
_this = this
// 
// Use the proper keyword to define variables. 
// 
const _this = this
```

### File: `geopitalBackend/controllers/init.controller.js`

#### Issue 2
```ecmascript 6
insertHospitals =  async function (res){
  ...
}
//
// Use proper function definitions.
//
async function insertHospitals(res){
  ...
}
```

#### Issue 3
```ecmascript 6
doInsertHospitals =  async function (res){
  ...
}
//
// Use proper function definitions.
//
async function doInsertHospitals(res){
  ...
}
```

#### Issue 4
```ecmascript 6
doAttributeTypes =  async function (res){
  ...
}
//
// Use proper function definitions.
//
async function doAttributeTypes(res){
  ...
}
```

### File: `geopitalBackend/controllers/upload.controller.js`

#### Issue 5
```ecmascript 6
_this = this
// 
// Use the proper keyword to define variables. 
// 
const _this = this
```

#### Issue 6
```ecmascript 6
saveUpload = async function(fileName, req){
...
}
//
// Use proper function definitions.
//
async function saveUpload(fileName, req){
...
}
```

### File: `geopitalBackend/services/attribute.service.js`

#### Issue 7
```ecmascript 6
saveAttributeType = async function(group, attributeType) {
...
}
//
// Use proper function definitions.
//
async function saveAttributeType(fileName, req){
...
}
```

### File: `geopitalBackend/services/geocoding.service.js`

#### Issue 8
```ecmascript 6
var savedCoordinates = coordinates.save();
//
// Remove the declaration of the unused 'savedCoordinates' variable.
//
coordinates.save();
```

#### Issue 9
```ecmascript 6
var savedHospital = hospital.save();
//
// Remove the declaration of the unused 'savedHospital' variable.
//
hospital.save();
```

### File: `geopitalBackend/services/hospital.service.js`

#### Issue 10
```ecmascript 6
_this = this
// 
// Use the proper keyword to define variables. 
// 
const _this = this
```

#### Issue 10
Remove this useless assignment to local variable "list".
```ecmascript 6
exports.getHospitals = async function(){
    try {
      Hospital.find().populate('address').exec(function (err, hospitals){
        if (err){return next(err);}
        ...
        var list = hospitals;
      });
      return list;
        // Return the hospital list returned by the mongoose promise

    } catch (e) {

        // return a Error message describing the reason
        throw Error('Error while Paginating Hospital')
    }
};
```

### File: `geopitalBackend/services/upload.service.js`

#### Issue 11
Use the proper keyword to define variables. 
```ecmascript 6
_this = this
// 
// Use the proper keyword to define variables. 
// 
const _this = this
```

#### Issue 12
```ecmascript 6
hospitalCreateWithAttributes = async function(data, types) {
...
}
//
// Use proper function definitions.
//
async function hospitalCreateWithAttributes(data, types) {
...
}
```

#### Issue 13
```ecmascript 6
extractStreet = function(address){
...
}
//
// Use proper function definitions.
//
function extractStreet(address) {
...
}
```

#### Issue 14
```ecmascript 6
extractCity = function(zipCity){
...
}
//
// Use proper function definitions.
//
function extractCity(zipCity) {
...
}
```

## Code Smells Frontend

Consider style guide: https://angular.io/guide/styleguide

### File: `geopitalFrontend/src/assets/mapInitializer.js`

#### Issue 15
Remove this useless assignment to local variable "test".
Remove the declaration of the unused 'test' variable.
```typescript
var test = document.getElementById('mapid');
```

#### Issue 16
Remove this useless assignment to local variable "tooltip".
Remove the declaration of the unused 'tooltip' variable.
```typescript
var tooltip = svg
    .append("div")
    .text("a simple tooltip");
```


#### Issue 17
Remove this useless assignment to local variable "xMin".
Remove the declaration of the unused 'xMin' variable.
```typescript
var xMin = 1000000;
```


#### Issue 18
Remove this useless assignment to local variable "yMin".
Remove the declaration of the unused 'yMin' variable.
```typescript
var yMin = 1000000;
```




