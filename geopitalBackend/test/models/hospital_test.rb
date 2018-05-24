require 'test_helper'

class HospitalTest < ActiveSupport::TestCase
  
  def setup
  	@hospital = hospitals(:Insel)
  end

  test "hospital should be valid" do
  	assert @hospital.valid?
  end

  test "name should be present" do
  	@hospital.name = ""
  	assert_not @hospital.valid?
  end

  test "name should be unique" do
    @hospital_duplicate = hospitals(:Linde)
    @hospital_duplicate.name = @hospital.name.upcase
    assert_not @hospital_duplicate.valid?
  end

  test "destroy all hospital locations when destroying hospital" do
    test = false
    begin
      @hospital.destroy
      @hospital_location = hospital_locations(:InselOne)
    rescue Exception => e
      test = true
    end
    assert test
  end

  test "destroy all hospital attributes when destroying hospital" do
    test = false
    begin
      @hospital.destroy
      @hospital_attribute = hospital_attributes(:KTInsel16)
    rescue Exception => e
      test = true
    end
    assert test
  end

end
