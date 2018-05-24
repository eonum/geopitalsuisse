require 'test_helper'

class HospitalsControllerTest < ActionDispatch::IntegrationTest

  setup do
    @id = hospitals(:Insel).id
  end

  test "should get index" do
    get hospitals_index_url
    assert_response :success
  end

  test "should return hospital with params id" do
    get hospitals_details_path(id: @id)
    assert_response :success
  end

end
