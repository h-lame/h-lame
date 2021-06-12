require 'middleman-core/profiling'
if ARGV.include? '--profile'
  Middleman::Profiling.profiler = Middleman::Profiling::RubyProfProfiler.new
end
# Middleman::Profiling.start

require "middleman-core/load_paths"
Middleman.setup_load_paths

require 'dotenv'
::Dotenv.load

require 'middleman-core'
require 'middleman-core/logger'

require "middleman-core/load_paths"
Middleman.setup_load_paths

app = ::Middleman::Application.new do
  config[:environment] = (ENV['MM_ENV'] || ENV['RACK_ENV'] || 'development').to_sym
  #::Middleman::Logger.singleton(0, false)
end

require './helpers/resource_helpers'

app.extend ResourceHelpers

require "middleman-core/util/data"

def write_resource(resource, frontmatter, content)
  ::File.write(resource.source_file, %Q{#{frontmatter.deep_stringify_keys.to_yaml(line_width: 60)}---\n#{content}})
end

publish_time = Time.now.utc.iso8601

app.notes.each do |note_resource|
  frontmatter, content = ::Middleman::Util::Data.parse(note_resource.file_descriptor, app.config[:frontmatter_delims])
  if frontmatter[:published_at].nil?
    frontmatter[:published_at] = publish_time
    write_resource(note_resource, frontmatter, content)
    puts "Publishing #{note_resource.destination_path} at #{publish_time}"
  end
end
