class HospitalLocation < ApplicationRecord
  validates(:name, presence: true, uniqueness: {case_sensitive: false})
  validates(:hospital_id, presence: true)
  belongs_to :hospital
end
