---
layout: false
---
xml.instruct!
xml.feed xmlns: 'http://www.w3.org/2005/Atom', 'xml:lang' => 'en-GB' do |x_feed|
  x_feed.title 'h-notes'
  x_feed.link href: 'http://h-lame.com/notes/', rel: "alternate", type: "text/html"
  x_feed.link href: 'http://h-lame.com/notes/index.atom', rel: 'self'
  x_feed.updated(published_date_for_schema(notes.first, if_missing: Time.now.utc))
  x_feed.id 'tag:h-lame.com,2021:/notes'
  x_feed.author do |x_author|
    x_author.name 'Murray Steele'
  end
  notes.each do |note|
    xml.entry do |x_entry|
      x_entry.title page_title(note), type: 'html'
      x_entry.link href: URI.join('http://h-lame.com', url_for(note)), rel: "alternate", type: "text/html"
      x_entry.id "tag:h-lame.com,2021:#{url_for(note)}"
      x_entry.published(published_date_for_schema(note)) unless note.data[:published_at].nil?
      x_entry.summary page_description(note), type: 'html'
      x_entry.content note.render(layout: false), type: 'html'
    end
  end
end
