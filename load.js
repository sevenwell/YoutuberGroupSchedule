function printCard(activity) {

    var content = document.getElementById('cardTemplate').content;
    content.querySelector('img').src = activity['snippet']['thumbnails']['medium']['url'];
    content.querySelector('p').textContent = activity['snippet']['title'];
    document.getElementById('board').appendChild(document.importNode(content, true));

}

function requestAPI(id) {
    gapi.client.youtube.activities.list({
      'part': 'snippet',
      'channelId': id
    }).then(function(response) {

      var activities = response.result.items;

      for (var j = 0; j < activities.length; j++) {

        var activity = activities[j];
        if (activity['snippet']['type'] == 'upload') {
            printCard(activity);
        }
    
      }
    });
}

function load() {
    for (let name in channels) {
        requestAPI(channels[name]);
    }
}
