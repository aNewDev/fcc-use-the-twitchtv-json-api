//
$(document).ready(function() {
  getDataForAllChannels();
});

var channels = ["esl_sc2", "comster404", "freecodecamp", "Brawlhalla"];  //

function getDataForAllChannels() {
  channels.forEach(function(channel) {
    $.getJSON("https://wind-bow.gomix.me/twitch-api/channels/" + channel + "?callback=?", function(data) {
      console.log(data);
      var status, url, name, logo;
      if (data.error === "Not Found") {
        status = false;
        url = "https://twitch.tv";
        name = channel;
        logo = "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F";
      } else {
        status = true;
        url = data.url;
        name = data.name;
        logo = data.logo;
      };
      $.getJSON("https://wind-bow.gomix.me/twitch-api/streams/" + channel + "?callback=?", function(streamdata) {
        console.log(streamdata);
        if (status === false) {
          status = "Not a known twitch channel";
        } else if (streamdata.stream === null) {
          status = "Not currently broadcasting";
        } else {
          console.log(streamdata.stream.channel);
          url = streamdata.stream.channel.url;
          status = '<a href="' + url + '">' + streamdata.stream.channel.status + '</a>';

        }
        var html = '<div class="row text-center"><div class="col-md-3"></div><a href="' +
          url + '" target="_blank"><div class="col-md-1"><img src="' +
          logo + '"></div><div class="col-md-2">' +
          name + '</div></a><div class="col-md-3">' +
          status + '</div><div class="col-md-3"></div></div>';
        document.getElementById("chicken").innerHTML += html;
      });
    });
  });
};

/*

*/
