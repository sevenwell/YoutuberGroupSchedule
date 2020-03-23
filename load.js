function printCard(activity) {

    var content = document.getElementById('cardTemplate').content;
    content.querySelector('a').href = "https://www.youtube.com/watch?v=" + activity['contentDetails']['upload']['videoId'];
    content.querySelector('img').src = activity['snippet']['thumbnails']['medium']['url'];
    content.querySelector('p').textContent = activity['snippet']['title'];
    document.getElementById('videos').appendChild(document.importNode(content, true));

}

function requestAPI(channel) {

    gapi.client.youtube.activities.list({
      'part': 'snippet,contentDetails',
      'channelId': channel['id']
    }).then(function(response) {

      var activities = response.result.items;

      for (var j = 0; j < activities.length; j++) {
        var activity = activities[j];
        if (activity['snippet']['type'] == 'upload') {
            printCard(activity);
            break;
        }
      }

    });
}

function load() {
    for (var i = 0; i < channels.length; i++) {
        requestAPI(channels[i]);
    }
}
