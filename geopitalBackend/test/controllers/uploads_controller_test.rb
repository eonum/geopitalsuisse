require 'test_helper'

class UploadsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get uploads_index_url
    assert_response :success
  end

  test "should get new" do
    get uploads_new_url
    assert_response :success
  end

  test "should get create and then destroy" do
    get uploads_create_path(upload: {name: "test", attachment: 'files/kzp16_daten.xls'})
    assert_redirected_to(:controller => "uploads")
    id = Upload.find_by_name("test").id
    get uploads_destroy_path(id: id)
    assert_redirected_to(:controller => "uploads")
  end

end
