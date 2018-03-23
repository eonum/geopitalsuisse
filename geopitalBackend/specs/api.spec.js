// use the request package to send a GET request
var request = require("request");
var baseUrl = "http://localhost:3000/"

// Gives a short description to the tested feature
describe("geopital-backend server", function(){
    // test on geopital-backend server whether it is returning status OK
    describe("GET /", function(){
        it("returns status code 200", function(){
            request.get(baseUrl, function(error, response){
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });

});