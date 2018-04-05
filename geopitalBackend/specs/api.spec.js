// Use the request package to send a GET request
var request = require("request");
var publicDummyUrl = "http://localhost:3000/api/hospital/public/dummy";
var dummy1Url = "http://localhost:3000/api/hospital/1/dummy";
var dummy2Url = "http://localhost:3000/api/hospital/2/dummy";
var dummy3Url = "http://localhost:3000/api/hospital/3/dummy";

// Tests apis
describe("api", function(){
    describe("all dummies and dummies with id", function(){

        // Test /public/dummy hospitals
        it("returns all dummies in public", function(done){
            request.get(publicDummyUrl, function(error, response, body){
                done();
            });
        });

        // Testing dummy with id = 1
        it("returns dummy with id = 1", function(done){
            request.get(dummy1Url, function(error, response, body){
                done();
            });
        });

        // Testing dummy with id = 2
        it("returns dummy with id = 2", function(done){
            request.get(dummy2Url, function(error, response, body){
                done();
           });
        });

        // Testing dummy with id = 3
        it("returns dummy with id = 3", function(done){
            request.get(dummy3Url, function(error, response, body){
                done();
            });
        });
    });
});