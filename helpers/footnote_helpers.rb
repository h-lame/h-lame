module FootnoteHelpers
  def footnotes(&block)
    content_for(:footnotes, &block)
  end

  def footnote_reference(number)
    concat_content %{<a id="fn-#{number}-return" href="#fn-#{number}"><sup>#{number}</sup></a>}
  end
  alias :fnrf :footnote_reference

  def footnote_definition(number, &block)
    footnote = capture_html(&block)

    concat_content %{<a id="fn-#{number}"><sup>#{number}.</sup></a> #{footnote} <a href="#fn-#{number}-return"><sup>⏎</sup></a>}
  end
  alias :fndf :footnote_definition
end
