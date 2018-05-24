require 'test_helper'
include AttributeTypesHelper

class AttributeTypesHelperTest < ActionDispatch::IntegrationTest

  test "should store attribute types from excel" do
    sheet_name = "Kennzahlen"
    data = Spreadsheet.open  Rails.root.join("test/fixtures/files/kzp16_daten.xls")
    sheet = data.worksheet sheet_name

    read_and_store_attribute_types(sheet)
    assert_nil AttributeType.find_by_code("Amb")
    assert_nil AttributeType.find_by_code("Stat")
    assert_nil AttributeType.find_by_code("Amb, Stat")
    assert_nil AttributeType.find_by_code("Inst, Adr, Ort")
    assert AttributeType.find_by_code("AnzStand").category == "number"
    assert AttributeType.find_by_code("KT").category == "string"

  end

end