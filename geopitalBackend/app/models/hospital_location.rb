class HospitalLocation < ApplicationRecord
  validates(:name, presence: true, uniqueness: {scope: [:streetAndNumber, :zipCodeAndCity]})
  validates(:hospital_id, presence: true)
  belongs_to :hospital
end
