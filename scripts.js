// trigger data load function on page load
$(document).ready(function() {
  getDataForAllChannels();
});

// Set the channels to use in data load
var channels = ["ESL_SC2", "OgamingSC2", "brunofin", "cretetion", "comster404", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];  //

// Call for data from Twitch API
function getDataForAllChannels() {
  channels.forEach(function(channel) {
    // Data from the Channels API
    $.getJSON("https://wind-bow.gomix.me/twitch-api/channels/" + channel + "?callback=?", function(data) {
      var status, url, name, logo;
      if (data.error === "Not Found") {
        status = false;
        url = '';
        name = '<div class="col-md-2">' + channel + '</div>';
        logo = "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F";
      } else {
        status = true;
        url = '<a href="' + data.url + '" target="_blank">';
        name = '<div class="col-md-2">' + data.name + '</div></a>';
        logo = data.logo;
      };
      // Data from the Streams API
      $.getJSON("https://wind-bow.gomix.me/twitch-api/streams/" + channel + "?callback=?", function(streamdata) {
        if (status === false) {
          status = "Not on twitch";
        } else if (streamdata.stream === null) {
          status = "Offline";
        } else {
          url = '<a href="' + streamdata.stream.channel.url + '" target="_blank">';
          status = '<a href="' + streamdata.stream.channel.url + '">' + streamdata.stream.channel.status + '</a>';
        }
        // Build the page from the pulled data
        var html = '<div class="row text-center" id="datarow">' +
          url + '<div class="col-xs-2 col-sm-1"><img src="' +
          logo + '"></div><div class="col-xs-10 col-sm-3">' +
          name + '</div><div class="col-xs-10 col-sm-8"">' +
          status + '</div></div>';
        document.getElementById("rows").innerHTML += html;
      });
    });
  });
};
