Template.main.onCreated(function() {
  this.subscribe('reports');
});

Template.main.helpers({
  stations: function () {
    return currentStations();
  },
  currentLine: function() {
    return currentLine();
  },
  noReports: function() {
    return numReports(currentLine()) === 0;
  },
  numReports: function() {
    return numReports(currentLine());
  },
  lineColor: function() {
    var line = currentLine();

    if (line.indexOf("M1") > -1) {
      return "blue-line";
    }

    if (line.indexOf("M2") > -1) {
      return "red-line";
    }
  },
  isFav: function() {
    var line = currentLine();
    return Session.get('fav ' + line);
  }
});

Template.main.events = {
  'click .fav': function(event) {
    var count = Session.get('favs count') || 0;
    var favid = 'fav ' + currentLine();
    var toggle = Session.get(favid) ? false : true;
    Session.setPersistent(favid, toggle);
    if (toggle) {
      Session.setPersistent('favs count', count + 1);
      Materialize.toast('Dodano do ulubionych.', 2000);
    } else {
      Session.setPersistent('favs count', count - 1);
      Materialize.toast('Usunięto z ulubionych.', 2000);
    }
  }
};

Template.main.rendered = function() {
  setInterval(function(){
    var currentTime = moment().zone("+01:00").format("H:mm");
    $('#current-time').text(currentTime);
  }, 1000);
};
