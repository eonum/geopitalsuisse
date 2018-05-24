require 'test_helper'

class HospitalAttributeTest < ActiveSupport::TestCase
  def setup
    @hospital_attribute = hospital_attributes(:KTInsel16)
  end

  test "hospital attribute should be valid" do
    assert @hospital_attribute.valid?
  end

  test "code should be present" do
    @hospital_attribute.code = ""
    assert_not @hospital_attribute.valid?
  end

  test "year should be present" do
    @hospital_attribute.year = ""
    assert_not @hospital_attribute.valid?
  end
  test "value should be present" do
    @hospital_attribute.value = ""
    assert_not @hospital_attribute.valid?
  end

  test "reference to hospital should be present" do
    @hospital_attribute.hospital_id = nil
    assert_not @hospital_attribute.valid?
  end

  test "code, year and hospital_id should be unique" do
    hospital_attribute_duplicate = hospital_attributes(:OpsInsel16)
    hospital_attribute_duplicate.code = @hospital_attribute.code
    hospital_attribute_duplicate.year = @hospital_attribute.year
    hospital_attribute_duplicate.hospital_id = @hospital_attribute.hospital_id
    assert_not hospital_attribute_duplicate.valid?
  end
end
