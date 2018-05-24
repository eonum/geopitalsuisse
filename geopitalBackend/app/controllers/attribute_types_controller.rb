include AttributeTypesHelper

class AttributeTypesController < ApplicationController
  def index
    @types = AttributeType.all
  end

  def parse
    upload = Upload.find(params[:id])
    data = Spreadsheet.open 'public'+upload.attachment_url
    sheet = data.worksheet params[:sheet]
    @types = read_and_store_attribute_types(sheet)
  end
end
