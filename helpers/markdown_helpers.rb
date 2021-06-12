module MarkdownHelpers
  def markdown(inline: false, strip_tags: false, &block)
    raise ArgumentError, "Missing block" unless block_given?
    content = capture_html(&block)

    concat markdown_render(content, inline: inline, strip_tags: strip_tags)
  end

  def markdown_render(content, inline: false, strip_tags: false)
    context = @app.template_context_class.new(@app, {}, {layout: false})

    rendered = ['erb', 'md'].reduce(content) do |rendered, template|
      content_renderer = ::Middleman::FileRenderer.new(@app, "inline_markdown_snippet.#{template}")
      content_renderer.render({}, {template_body: rendered, layout: false}, context)
    end
    rendered = rendered.gsub('<p>', '').gsub("</p>", '').gsub("\n", '') if inline
    rendered = strip_tags(rendered) if strip_tags
    rendered
  end
end
