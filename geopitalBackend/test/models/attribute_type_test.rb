require 'test_helper'

class AttributeTypeTest < ActiveSupport::TestCase
  def setup
    @attribute_type = attribute_types(:KT)
  end

  test "hospital attribute should be valid" do
    assert @attribute_type.valid?
  end

  test "code should be present" do
    @attribute_type.code = ""
    assert_not @attribute_type.valid?
  end

  test "nameDE should be present" do
    @attribute_type.nameDE = ""
    assert_not @attribute_type.valid?
  end

  test "nameFR should be present" do
    @attribute_type.nameFR = ""
    assert_not @attribute_type.valid?
  end

  test "nameIT should be present" do
    @attribute_type.nameIT = ""
    assert_not @attribute_type.valid?
  end

  test "category should be present with value string or number" do
    @attribute_type.category = ""
    assert_not @attribute_type.valid?
    @attribute_type.category = "hallo"
    assert_not @attribute_type.valid?
    @attribute_type.category = "string"
    assert @attribute_type.valid?
    @attribute_type.category = "number"
    assert @attribute_type.valid?
  end

  test "code should be unique" do
    attribute_type_duplicate = attribute_types(:Ops)
    attribute_type_duplicate.code = @attribute_type.code.downcase
    assert attribute_type_duplicate.valid?
    attribute_type_duplicate.code = @attribute_type.code
    assert_not attribute_type_duplicate.valid?
  end
end
