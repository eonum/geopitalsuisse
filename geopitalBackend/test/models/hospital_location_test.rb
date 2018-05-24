require 'test_helper'

class HospitalLocationTest < ActiveSupport::TestCase
  def setup
    @hospital_location = hospital_locations(:InselOne)
  end

  test "hospital location should be valid" do
    assert @hospital_location.valid?
  end

  test "name should be present" do
    @hospital_location.name = ""
    assert_not @hospital_location.valid?
  end

  test "reference to hospital should be present" do
    @hospital_location.hospital_id = nil
    assert_not @hospital_location.valid?
  end

  test "name should be unique" do
    @hospital_location_duplicate = hospital_locations(:InselTwo)
    @hospital_location_duplicate.name = @hospital_location.name.upcase
    assert_not @hospital_location_duplicate.valid?
  end
end
