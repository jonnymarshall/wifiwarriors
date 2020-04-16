class Review < ApplicationRecord
  belongs_to :user
  belongs_to :venue
  has_many :review_photos, dependent: :destroy
  counter_culture :venue, column_name: 'average_review_rating', delta_column: 'rating'

  validates_numericality_of :rating, greater_than_or_equal_to: 0, less_than_or_equal_to: 4
  validates_numericality_of :plug_sockets, greater_than_or_equal_to: 0, less_than_or_equal_to: 2, allow_blank: true
  validates_numericality_of :comfort, greater_than_or_equal_to: 0, less_than_or_equal_to: 2, allow_blank: true
  validates_numericality_of :busyness, greater_than_or_equal_to: 0, less_than_or_equal_to: 2, allow_blank: true
  validates_numericality_of :upload_speed, greater_than_or_equal_to: 0, less_than_or_equal_to: 1000, allow_blank: true
  validates_numericality_of :download_speed, greater_than_or_equal_to: 0, less_than_or_equal_to: 1000, allow_blank: true
  validates_numericality_of :ping, greater_than_or_equal_to: 0, less_than_or_equal_to: 1000, allow_blank: true
  # validates_uniqueness_of :user_id, :scope => :venue_id
  accepts_nested_attributes_for :review_photos
  after_create :update_venue_values

  private

  def update_venue_values
    venue.update_values(self)
  end
end