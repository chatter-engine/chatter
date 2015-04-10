$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "chatter/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "chatter"
  s.version     = Chatter::VERSION
  s.authors     = ["Abdul Hameed","Ashwin Kumar","Venkatraman"]
  s.email       = ["venkatka@outlook.com","rmahameed005@gmail.com","ashwinscongo@gmail.com"]
  s.homepage    = "http://github.com/chatter-engine/chatter"
  s.summary     = "Get Instant-Chat up and running in your Rails application"
  s.description = <<-EOF
    Chatter is an engine that can be mounted to any Rails(>=3.0) application
    to get Instant-Chat feature. The engine uses Redis for its conversation model
    and websocket-rails for handling real-time conversations.
    EOF

  s.files = Dir["{app,config,db,lib}/**/*"] + ["MIT-LICENSE", "Rakefile", "README.rdoc"]
  s.test_files = Dir["test/**/*"]

  s.add_dependency "rails", ">= 3.0.0"
  s.add_dependency "websocket-rails"

end
