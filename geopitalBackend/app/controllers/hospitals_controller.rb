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
    error = get_coordinates(@hospital)
    @message =  case error
         when true
           "Geocoding successfull"
         when false
           "Validation and saving of hospital failed"
         else
           error
         end
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
      error = get_coordinates(hospital)
      case error
      when true
      when false
        @errors << "Validation and saving of hospital failed"
      else
        @errors << error
      end
      hospital.hospital_locations.each do |loc|
        error = get_coordinates(loc)
        case error
        when true
        when false
          @errors << "Validation and saving of location failed"
        else
          @errors << error
        end
      end
    end
  end
end
