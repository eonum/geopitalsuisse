// Use the request package to send a GET request
var request = require("request");
var baseUrl = "http://localhost:3000/mvc/";
var server = require("../app");

// Gives a short description to the tested feature
describe("geopital-backend server", function(){
    // Test on geopital-backend server whether it is returning status OK
    describe("GET /", function(){
        it("returns status code 200", function(done){
            request.get(baseUrl, function(error, response){
                expect(response.statusCode).toEqual(200);
                done();
            });
        });

        // Supposed to fail, needed for understanding
        it("returns /mvc page", function(done) {
            request.get(baseUrl, function(error, response, body) {
                expect(body).toEqual();
                done();
            });
        });
    });
});