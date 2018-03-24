// Use the request package to send a GET request
var request = require("request");
var baseUrl = "http://localhost:3000/";
const server = require('../app');

// Gives a short description to the tested feature
describe("geopital-backend server", function(){
    // Test on geopital-backend server whether it is returning status OK
    describe("GET /", function(){
        it("returns status code 200", function(done){
            request.get(baseUrl, function(error, response, body){
                expect(response.statusCode).toBe(200);
                done();
            });
        });

        it("returns Hello World", function(done) {
            request.get(baseUrl, function(error, response, body) {
                expect(body).toBe("Hello World");
                server.closeServer();
                done();
            });
        });
    });
});