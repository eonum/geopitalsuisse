require 'test_helper'
include HospitalsHelper

class HospitalsHelperTest < ActionDispatch::IntegrationTest

  test "should get coordinates for hospital" do
    hospital = hospitals(:NoCoords)
    get_coordinates(hospital)
    updatedHospital = hospitals(:NoCoords)
    assert_not_nil updatedHospital.latitude
    assert_not_nil updatedHospital.longitude
  end

  test "should store hospitals from excel" do
    sheet_name = "KZ2016_KZP16"
    data = Spreadsheet.open  Rails.root.join("test/fixtures/files/kzp16_daten.xls")
    sheet = data.worksheet sheet_name

    hosps = read_and_store_hospitals(sheet, sheet_name)
    hospital = Hospital.find_by_name("RehaClinic Baden")
    assert hosps.count == 2
    assert_not_nil hospital
    assert_not_nil HospitalAttribute.where(:hospital_id => hospital.id, :year => 2016)
  end

end