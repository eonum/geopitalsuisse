// Use the request package to send a GET request
var request = require("request");
var publicDummyUrl = "http://localhost:3000/api/hospital/public/dummy";
var dummy1Url = "http://localhost:3000/api/hospital/0/dummy";
var dummy2Url = "http://localhost:3000/api/hospital/1/dummy";
var dummy3Url = "http://localhost:3000/api/hospital/2/dummy";

// Tests apis
describe("Testing api,", function(){
    describe("dummy with id =", function(){

        // Test /public/dummy hospitals
        it("public", function(done){
            request.get(publicDummyUrl, function(error, response, body){
                expect(response.statusCode).toEqual(200);
                expect(body).toEqual('{"status":200,"data":[{"name":"Inselspital","address":{"street":"Freiburgstrasse","streetNumber":"8","plz":"3010","city":"Bern"},"coordinates":{"latitude":"46°56\'52.7N","longitude":"7°25\'29.2E"}},{"name":"Unispital Zürich","address":{"street":"Rämisstrasse","streetNumber":"100","plz":"8091","city":"Zürich"},"coordinates":{"latitude":"47°22\'36.4N","longitude":"8°33\'03.8E"}},{"name":"Unispital Basel","address":{"street":"Spitalstrasse","streetNumber":"21","plz":"4031","city":"Basel"},"coordinates":{"latitude":"47°33\'44.3N","longitude":"7°34\'59.7E"}}]}');
                done();
            });
        });

        // Testing dummy with id = 0
        it("0", function(done){
            request.get(dummy1Url, function(error, response, body){
                expect(response.statusCode).toEqual(200);
                expect(body).toEqual('{"status":200,"data":{"name":"Inselspital","address":{"street":"Freiburgstrasse","streetNumber":"8","plz":"3010","city":"Bern"},"coordinates":{"latitude":"46°56\'52.7N","longitude":"7°25\'29.2E"},"attributes":[{"name":"Anzahl Fälle","value":78410},{"name":"Anzahl Ärzte","value":200},{"name":"Personalkosten","value":2123123}]}}');
                done();
            });
        });

        // Testing dummy with id = 1
        it("1", function(done){
            request.get(dummy2Url, function(error, response, body){
                expect(response.statusCode).toEqual(200);
                expect(body).toEqual('{"status":200,"data":{"name":"Unispital Zürich","address":{"street":"Rämisstrasse","streetNumber":"100","plz":"8091","city":"Zürich"},"coordinates":{"latitude":"47°22\'36.4N","longitude":"8°33\'03.8E"},"attributes":[{"name":"Anzahl Fälle","value":91238},{"name":"Anzahl Ärzte","value":351},{"name":"Personalkosten","value":4556456}]}}');
                done();
           });
        });

        // Testing dummy with id = 2
        it("2", function(done){
            request.get(dummy3Url, function(error, response, body){
                expect(response.statusCode).toEqual(200);
                expect(body).toEqual('{"status":200,"data":{"name":"Unispital Basel","address":{"street":"Spitalstrasse","streetNumber":"21","plz":"4031","city":"Basel"},"coordinates":{"latitude":"47°33\'44.3N","longitude":"7°34\'59.7E"},"attributes":[{"name":"Anzahl Fälle","value":10123},{"name":"Anzahl Ärzte","value":100},{"name":"Personalkosten","value":1234351}]}}');
                done();
            });
        });
    });
});