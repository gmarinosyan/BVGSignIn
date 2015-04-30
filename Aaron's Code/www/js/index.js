var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function logIn(){
    <!-- Implement finding username and password from server -->

    var tempUsername = "bJoe";
    var tempPassword = "bJoeRocks";

    var inputUsername = document.getElementById("username").value;
    var inputPassword = document.getElementById("password").value;

    if (inputUsername == tempUsername && inputPassword == tempPassword){
        window.alert("LogIn Complete!!");
        window.location.replace("#OutOrIn");
        document.getElementById("username").value = null;
        document.getElementById("password").value = null;
    }

    else if (inputUsername != tempUsername){
        window.alert("Username Incorrect or Doesn't Exist");
        document.getElementById("username").value = null;
        document.getElementById("password").value = null;
    }

    else if (inputUsername == tempUsername && inputPassword != tempPassword){
        window.alert("Password is Incorrect");
        document.getElementById("password").value = null;
    }
}

function logOut(){
    window.alert("Logged Out!!");
    window.location.replace("#LogIn");
}
