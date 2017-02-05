//
$(document).ready(function() {
  getDataForAllChannels();
});

var channels = ["freecodecamp"];  //, "esl_sc2","comster404"

function getDataForAllChannels() {
  channels.forEach(function(channel) {
    $.getJSON("https://wind-bow.gomix.me/twitch-api/channels/" + channel + "?callback=?", function(data) {
      console.log(data);
      console.log(channel);
      var status, url, name, logo;
      if (data.error === "Not Found") {
        status = false;
        url = "https://twitch.tv";
        name = "Not found";
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
          status = streamdata.stream;
        }
        var html = '<div class="row text-center"><div class="col-md-3"></div><div class="col-md-1"><img src="' +
            logo + '"></div><div class="col-md-2"><a href="' +
            url + '" target="_blank">' +
            name + '</a></div><div class="col-md-3">' +
            status + '</div><div class="col-md-3"></div></div>';
        document.getElementById("row").innerHTML = html;
      });
    });
  });
};

/*

*/
