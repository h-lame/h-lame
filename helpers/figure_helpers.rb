module FigureHelpers
  def audio_figure(src:, &block)
    concat_content %{<figure>
  <audio controls class="example-graphic" src="#{src}"></audio>
  <figcaption>#{markdown_render(capture_html(&block))}</figcaption>
</figure>
}
  end

  def img_figure(src:, &block)
    concat_content %{<figure>
  <img class="example-graphic" src="#{src}">
  <figcaption>#{markdown_render(capture_html(&block))}</figcaption>
</figure>
}
  end
end
