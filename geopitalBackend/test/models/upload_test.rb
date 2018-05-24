require 'test_helper'

class UploadTest < ActiveSupport::TestCase
  def setup
    @upload = Upload.new(name: "upload", attachment: 'files/kzp16_daten.xls')
  end

  test "upload should be vaild" do
    assert @upload.valid?
  end

  test "name should be present" do
    @upload.name = ""
    assert_not @upload.valid?
  end
end
