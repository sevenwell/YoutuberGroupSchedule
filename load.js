function printCard(video, status) {

    var content = document.getElementById('card').content;
    content.querySelector('a').href = 'https://www.youtube.com/watch?v=' + video['id']['videoId'];
    content.querySelector('a').textContent = video['snippet']['channelTitle'] + '　' + video['snippet']['title'];
    content.querySelector('img').src = video['snippet']['thumbnails']['default']['url'];
    document.getElementById(status).appendChild(document.importNode(content, true));

}

function requestAPI(id) {
    gapi.client.youtube.search.list({
      'part': 'snippet',
      'channelId': id,
      'order': 'date'
    }).then(function(response) {

      var videos = response.result.items;

      for (var j = 0; j < videos.length; j++) {

        var video = videos[j];
        var status = video['snippet']['liveBroadcastContent'];
        if (status != 'none') {
            printCard(video, status);
        }
    
      }
    });
}

function load() {
    for (let name in channels) {
        requestAPI(channels[name]);
    }
}
