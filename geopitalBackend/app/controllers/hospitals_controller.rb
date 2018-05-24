include HospitalsHelper

class HospitalsController < ApplicationController

  def index
    @hospitals = Hospital.all
  end

  def details
    @hospital = Hospital.find(params[:id])
  end

  def coords_single
    @hospital = Hospital.find(params[:id])
    error= get_coordinates(@hospital)
    @message = error == nil ? @message = 'Geocoding successfull' : error
  end

  def edit
    @hospital = Hospital.find(params[:id])
  end

  def delete
    if Hospital.destroy(params[:id])
      render 'deleted'
    else
      render 'edit'
    end
  end


  def parse
    upload = Upload.find(params[:id])
    sheet_name = params[:sheet]
    data = Spreadsheet.open 'public'+upload.attachment_url
    sheet = data.worksheet sheet_name
    @hosps = read_and_store_hospitals(sheet, sheet_name)
  end

  def coords
    @hospitals = Hospital.where(latitude: nil)
    @errors = Array.new
    @hospitals.each do |hospital|
      @errors << get_coordinates(hospital)
      hospital.hospital_locations.each do |loc|
        @errors << get_coordinates(loc)
      end
    end
  end
end
