// Use the request package to send a GET request
var request = require("request");
var baseUrl = "http://localhost:3000/mvc";

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
        it("returns /mvc body", function(done) {
            request.get(baseUrl, function(error, response, body) {
                expect(body).toEqual('<!DOCTYPE html><html lang="en"><head><title>Geopital Suisse Management</title><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script><link rel="stylesheet" href="/stylesheets/style.css"></head><body><div class="container-fluid"><div class="row"><div class="col-sm-2"><ul class="sidebar-nav"><li> <a href="/mvc">Home</a></li><li> <a href="/mvc/hospitals">See hospitals</a></li><li> <a href="/mvc/create">Create hospital</a></li><li> <a href="/api/geopital">See DummyData for Frontend</a></li><li> <a href="/api/hospital">See DummyData from MongoDB</a></li><li><a href="/mvc/upload">Upload xlsx data file</a></li></ul></div><div class="col-sm-10"><h1>Geopital Suisse Management</h1><p>Welcome to Geopital Suisse Management</p><h1>Hospitals</h1><ul><li><strong>Hospitals:</strong> 2</li></ul></div></div></div></body></html>');
                done();
            });
        });
    });
});