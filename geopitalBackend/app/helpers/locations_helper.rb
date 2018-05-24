module LocationsHelper

  def read_and_store_locations(sheet)
    @legend = sheet.row(0)
    @hospitals = Array.new
    @locs = Array.new
    @errors = Array.new
    j = 1
    while j < sheet.rows.length
      @location = sheet.row(j)
      @LocationData = Hash.new
      i = 0
      while i < @legend.length
        @LocationData.store(@legend[i], @location[i])
        i += 1
      end
      @hospital = Hospital.where(name: @LocationData["Inst"]).first
      if @hospital == nil
        @errors << 'Not found ' + @LocationData["Inst"]
      else
        if !(@hospital.streetAndNumber == (@LocationData["Adr_Standort"]))
          @locs << @hospital.hospital_locations.create(name: @LocationData["Standort"], kanton: @LocationData["KT"], streetAndNumber: @LocationData["Adr_Standort"], zipCodeAndCity: @LocationData["Ort_Standort"], la: @LocationData["LA"])
        end
      end
      j += 1
    end
    return [@locs, @errors]
  end

end
