require 'rails_helper'

RSpec.describe 'Home features' do

  it 'loads content' do
    visit ('/')
    expect(page).to have_content('Remote working. On caffeine.')
  end

end