require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module RemoteKick
  class Application < Rails::Application
    # config.eager_load_paths += %W(#{config.root}/lib)
    # config.autoload_paths << Rails.root.join('lib')
    # config.autoload_paths << Rails.root.join('lib/notifier')
    config.generators do |generate|
          generate.assets false
          generate.helper false
          generate.test_framework  :mini_test, spec: true, fixture: false
        end
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.

  end
end
