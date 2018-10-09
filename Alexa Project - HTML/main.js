    var config = {
    apiKey: "<API_KEY>",
    authDomain: "<PROJECT_ID>.firebaseapp.com",
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    projectId: "<PROJECT_ID>",
    storageBucket: "<BUCKET>.appspot.com",
    messagingSenderId: "<SENDER_ID>"
  }; 
  firebase.initializeApp(config);

  var myAPIKey = "<INSERT KEY HERE>";


    database = firebase.database();
    var ref = database.ref('/');
    ref.on('value', gotData, errData);

    function gotData(data) {
        var messages = data.val();
        console.log(messages.preference);
        var type = messages.preference;
        getStories(type);

    }
    function errData(err) {
        console.log('Error!');
        console.log(err);
    }

    function getStories(type) {
        var url = 'https://newsapi.org/v2/top-headlines?' + 
        'country=gb&' + 'category=' + type + "&" +
        'apiKey=' + myAPIKey;

        fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
        var articles = myJson.articles;
        var table = document.getElementById("newsstories");

        for (var i = 0; i < articles.length; i++) {
            console.log(articles[i].title);
            var tr = document.createElement("tr");
            var td = document.createElement("td");
            var txt = document.createTextNode(articles[i].title);
            td.appendChild(txt);
            tr.appendChild(td)
            table.appendChild(tr);
            }
        });
    }