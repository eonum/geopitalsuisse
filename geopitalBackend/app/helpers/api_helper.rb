require 'oj'
module ApiHelper

  def create_json
    max_year = HospitalAttribute.maximum("year")
    hospitals = Hospital.includes(:hospital_attributes).where(:hospital_attributes => {:year => max_year})
    hash = Rails.cache.fetch(Hospital.cache_key(hospitals)) do
      hospitals.as_json(:except => [:created_at, :updated_at], :include => [:hospital_attributes => {:except => [:id, :hospital_id, :created_at, :updated_at]}])
    end
    return Oj.dump(hash)
  end
end
