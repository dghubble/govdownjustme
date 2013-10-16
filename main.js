$(document).ready(function() {
        
  var get_tip = function() {
    var tips = [
      "Try disconnecting power from your government and giving it to the people.",
      "Your government may require a reboot and clean install.",
      "Did you try turning your government off and back on again?",
      "Your government may have been corrupted during recent operations. Please replace it.",
      "If your government hasn't been passing bills lately, it may be in deadlock.",
      "Odds are it's either a denial of service attack or a random and senseless act of system administration."
    ];
    var tip = tips[Math.floor(Math.random()*tips.length)];
    return tip;
  };

  var as_object = function(array) {
    var o = {};
    array.forEach(function(key) {
      o[key] = "";
    })
    return o;
  };

  var as_adjectival = function(country) {
    if (country in country_to_adjectival) {
      return country_to_adjectival[country];
    } else {
      return false
    }
  }

  $.getJSON('http://api.wipmania.com/jsonp?callback=?', function (data) {
    var down = ["United States"]
    var country = data.address.country
    
    if (country in as_object(down)) {
      // User government is down.

      if (as_adjectival(country)) {
        // found adjective form (e.g. United Kingdom -> British)
        $("#container p.message").html("It's not just you! The <a target='_blank' href='http://www.google.com/search?q=" + country + "'>" + as_adjectival(country) + "</a> government looks down from here.");
      } else {
        $("#container p.message").html("It's not just you! Your government looks down from here.");
      };
      // Tips for when your government is down.
      $("#container p.tip").html("Random Tip: " + get_tip());

    } else {
      // User government is not down.
      if (as_adjectival(country)) {
        $("#container p.message").html("It's just you. The <a target='_blank' href='http://www.google.com/search?q=" + country + "'>" + as_adjectival(country) + "</a> government is still up!");
      } else {
        $("#container p.message").html("It's just you. Your government is still up!");
      } 
    }
  });
});
