set :css_dir, 'styles'
set :js_dir, 'scripts'
set :images_dir, 'images'
set :build_dir, 'public'

set :markdown, smartypants: true

# Activate and configure extensions
# https://middlemanapp.com/advanced/configuration/#configuring-extensions

activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

activate :directory_indexes

# Layouts
# https://middlemanapp.com/basics/layouts/

# Per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false
page '/.htaccess', layout: false
page '/*.ico', layout: false

page "/talks/*", :layout => "talks"
page "/notes/*", :layout => "notes"

ignore "/talks/slides/*.md*"
ignore "/talks/**/parts/*.md*"
ignore "/talks/**/slides/*.md*"
# With alternative layout
# page '/path/to/file.html', layout: 'other_layout'

# Proxy pages
# https://middlemanapp.com/advanced/dynamic-pages/

# proxy(
#   '/this-page-has-no-template.html',
#   '/template-file.html',
#   locals: {
#     which_fake_page: 'Rendering a fake page with a local variable'
#   },
# )

# Helpers
# Methods defined in the helpers block are available in templates
# https://middlemanapp.com/basics/helper-methods/

require 'middleman-core/renderers/kramdown'

class Middleman::Renderers::MiddlemanKramdownHTML < Kramdown::Converter::Html
  def format_as_block_html(name, attr, body, indent)
    return super unless name =~ /\Ah\d\Z/ && attr['id'].present?
    return super unless scope.current_page.data.fetch(:heading_anchors, true)

    anchor = %{<span class="heading-anchor-wrapper"><span class="heading-anchor"><a href="##{attr['id']}" aria-hidden="true">#</a></span></span>}
    super(name, attr, anchor + body, indent)
  end
end

# Build-specific configuration
# https://middlemanapp.com/advanced/configuration/#environment-specific-settings

# configure :build do
#   activate :minify_css
#   activate :minify_javascript
# end
