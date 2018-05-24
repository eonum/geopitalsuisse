class Hospital < ApplicationRecord
	validates(:name, presence: true, uniqueness: {case_sensitive: false})
	has_many :hospital_locations, :dependent => :destroy
	has_many :hospital_attributes, :dependent => :destroy

	def self.cache_key(hospitals)
		{
				serializer: 'hospitals',
		 		stat_record: hospitals.maximum(:updated_at)
		}
	end
end
