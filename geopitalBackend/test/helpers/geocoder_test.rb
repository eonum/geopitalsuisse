require 'test_helper'

class GeocoderTest < ActiveSupport::TestCase

  def setup
    @address = hospitals(:Insel).streetAndNumber + ", " + hospitals(:Insel).zipCodeAndCity
  end

  test "Should return coordinates" do
    @coordinates = Geocoder.coordinates(@address)
    assert @coordinates[0] == 46.9477087
    assert @coordinates[1] == 7.4255497
  end


end