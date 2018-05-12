// Use the request package to send a GET request
var request = require("request");
var uploadUrl = "http://localhost:3000/mvc/upload";


describe("Testing upload", function(){
    // Tests /mvc/upload body
    describe("body", function(){
        it("", function(done){
            request.get(uploadUrl, function(error, response, body){
                expect(response.statusCode).toEqual(200);
                //expect(body).toEqual();
                done();
            });
        });
    });
    // Tests upload method
    describe("file", function(){
       it("", function(done){
           request.get(uploadUrl, function(error, response, body){
               done();
           });
       });
    });

});