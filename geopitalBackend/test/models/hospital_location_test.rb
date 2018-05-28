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

  test "name, streetAndNumber and zipCodeAndCity should be unique" do
    hospital_location_duplicate = hospital_locations(:InselTwo)
    assert hospital_location_duplicate.valid?
    hospital_location_duplicate.name = @hospital_location.name
    hospital_location_duplicate.streetAndNumber = "New street and number"
    assert hospital_location_duplicate.valid?
    hospital_location_duplicate.streetAndNumber = @hospital_location.streetAndNumber
    hospital_location_duplicate.zipCodeAndCity = "New zip code and city"
    assert hospital_location_duplicate.valid?
    hospital_location_duplicate.zipCodeAndCity = @hospital_location.zipCodeAndCity
    assert_not hospital_location_duplicate.valid?
  end
end
