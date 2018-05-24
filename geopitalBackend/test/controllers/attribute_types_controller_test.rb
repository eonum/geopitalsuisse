require 'test_helper'

class AttributeTypesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get attribute_types_index_url
    assert_response :success
  end
end
