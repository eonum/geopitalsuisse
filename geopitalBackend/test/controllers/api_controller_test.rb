require 'test_helper'

class ApiControllerTest < ActionDispatch::IntegrationTest
  test "should get attributeTypes" do
    get api_attributeTypes_url
    parsed_json = ActiveSupport::JSON.decode(@response.body)
    assert parsed_json["attribute_types_string"][0]["code"] == "LA"
    assert parsed_json["attribute_types_number"][0]["code"] == "Ops"
    assert_response :success
  end

  test "should return all hospitals in json format" do
    get api_hospitals_url
    parsed_json = ActiveSupport::JSON.decode(@response.body)
    assert parsed_json[0]["name"] == "Inselspital"
    assert parsed_json[0]["hospital_attributes"][0]["code"] == "Ops"
    #get upload_path(id: 345)
    #response.body
  end

end
