include LocationsHelper

class LocationsController < ApplicationController

  def parse
    upload = Upload.find(params[:id])
    data = Spreadsheet.open 'public'+upload.attachment_url
    sheet = data.worksheet params[:sheet]
    returns = read_and_store_locations(sheet)
    @locs = returns[0]
    @errors = returns[1]
  end
end
