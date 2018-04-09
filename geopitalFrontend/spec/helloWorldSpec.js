
var request = require("request");
var base_url = "http://localhost:4200";


describe("Frontend Server", function(){

  describe("/GET", function(){
    it("returns status 200", function(){
      request.get(base_url, function(error, response, body){
        expect(response.statusCode).toBe(200);
        done();
      });

    });

  });

});
