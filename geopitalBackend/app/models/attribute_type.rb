class AttributeType < ApplicationRecord
  validates(:code, presence: true, uniqueness: true)
  validates(:category, presence: true, inclusion: { in: %w(string number) })
  validates(:nameDE, presence: true)
  validates(:nameFR, presence: true)
  validates(:nameIT, presence: true)
end
