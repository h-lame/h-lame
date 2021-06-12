#!/usr/bin/env ruby

# This script should be installed at web webhook URL specified
# in github actions

require "cgi"
require "json"
require 'fileutils'

begin
  cgi = CGI.new
  params = JSON.parse(cgi.params['payload'].first) rescue nil
  response = nil
  raise "Failed to parse payload:\n\n#{cgi.params.inspect}" if params.nil?

  passed = params['state'] == 'success'
  on_master = params['ref'] == 'refs/heads/dynamic'

  if passed && on_master
    TAR_URL = "https://github.com/h-lame/h-lame.com/releases/download/deploy/h-lame.com.tar.bz2"
    BASE_DIR = "/home/hlame/sites/h-lame.com/www.deploy/"
    TMP_FILE = "/tmp/h-lame.com.tar.bz2"

    NEW_RELEASE = File.join(BASE_DIR, "releases", Time.now.strftime('%Y%m%d%H%M%S'))
    OLDEST_RELEASE = Dir[File.join(BASE_DIR, "releases", "*")].sort.first
    CURRENT_SYMLINK = File.join(BASE_DIR, "current")

    # Download the archive
    `curl -L -o #{TMP_FILE} #{TAR_URL}`

    # Create the new release directory
    FileUtils.mkdir_p(NEW_RELEASE)

    # Extract the archive to the new release directory
    `tar xjvf #{TMP_FILE} -C #{NEW_RELEASE}`

    # Update the symlink
    `ln -fsn #{NEW_RELEASE} #{CURRENT_SYMLINK}`

    # Remove the oldest release
    FileUtils.rm_rf(OLDEST_RELEASE) if Dir[File.join(BASE_DIR, "releases", "*")].size > 10

    response = "OK deploying #{File.basename(NEW_RELEASE)} from #{params['branch'].inspect}, by #{params['actor'].inspect}"
  else
    response = "Not deploying; passed = #{passed.inspect}, branch = #{params['branch'].inspect}, by #{params['actor'].inspect}"
  end

  puts "HTTP-Version: HTTP/1.0 200 OK"
  puts
  puts response
rescue => e
  puts "HTTP-Version: HTTP/1.0 500 Internal Error"
  puts
  puts "Problem: #{e.messages}"
  puts
  puts e.backtrace
end

exit(0)
