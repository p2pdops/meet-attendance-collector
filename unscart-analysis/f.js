// console.log("START FETCH");

let winloc = window.location.href;
let autodata = {
  uid: String,
  url: String,
  website: String,
  term: String,
  loc: String,
  date: String,
  ip: String,
  extensionName: "GoogleMeetAttendance",
};
let affliate = {
  URL: String,
};

affliate.URL = winloc;
autodata.url = winloc;
websiteFetch();
searchFetch();
locationFetch();
dateFetch();
uniqueIdFetch();
sendData();

function websiteFetch() {
  if (winloc.indexOf("aliexpress") > -1) {
    // affliate.rootname = "aliexpress";
    autodata.website = "aliexpress";
  } else if (winloc.indexOf("www.") > -1) {
    let pos, newStr;
    pos = winloc.indexOf("www.");
    newStr = winloc.slice(pos + 4);
    pos = newStr.indexOf(".");
    newStr = newStr.slice(0, pos);
    //console.log(newStr);
    if (newStr == "makemytrip") {
      if (winloc.indexOf("flights") > -1) {
        // affliate.rootname = "mmt flights";
        autodata.website = newStr;
      } else if (winloc.indexOf("hotels") > -1) {
        // affliate.rootname = "mmt hotels";
        autodata.website = newStr;
      } else if (winloc.indexOf("domestic") > -1) {
        // affliate.rootname = "mmt domestic";
        autodata.website = newStr;
      }
    } else {
      autodata.website = newStr;
      if (newStr == "flipkart") {
        // if (winloc.indexOf("checkout") > -1) affliate.rootname = newStr;
        // else affliate.rootname = "";
      }

      // affliate.rootname = newStr;
    }
  } else if (winloc.indexOf("//") > -1) {
    let pos, newStr;
    pos = winloc.indexOf("//");
    newStr = winloc.slice(pos + 2);
    pos = newStr.indexOf(".");
    newStr = newStr.slice(0, pos);
    //console.log(newStr);
    autodata.website = newStr;
    // affliate.rootname = newStr;
  } else {
    autodata.website = "";
    // affliate.rootname = "";
  }
}

function searchFetch() {
  let pos, newStr;
  if (winloc.indexOf("q=") > -1) {
    pos = winloc.indexOf("q=");
    newStr = winloc.slice(pos + 2);
    pos = newStr.indexOf("&");
    newStr = newStr.slice(0, pos);
    autodata.term = newStr;
    return;
    //console.log(newStr);
  } else if (winloc.indexOf("&field-keywords=") > -1) {
    pos = winloc.indexOf("&field-keywords=");
    newStr = winloc.slice(pos + 16);
    if (newStr.indexOf("&") > -1) {
      pos = newStr.indexOf("&");
    } else pos = newStr.length;
    newStr = newStr.slice(0, pos);
    autodata.term = newStr;
    return;
  } else autodata.term = "";
}

function locationFetch() {
  var location;
  if (winloc.indexOf("google") > -1) {
    if (!!document.getElementById("swml-loc")) {
      location = document.getElementById("swml-loc").innerHTML;
      if (!location.length) {
        //console.log("inside");
        window.requestAnimationFrame(locationFetch);
      } else {
        location = document.getElementById("swml-loc").innerHTML;
        autodata.loc = location;
        //console.log("done");
      }
    }
  } else autodata.loc = "";
}

function dateFetch() {
  var datefetch = Date();
  autodata.date = datefetch;
}
function getRandomToken() {
  // E.g. 8 * 32 = 256 bits token
  var randomPool = new Uint8Array(32);
  crypto.getRandomValues(randomPool);
  var hex = "";
  for (var i = 0; i < randomPool.length; ++i) {
    hex += randomPool[i].toString(16);
  }
  // E.g. db18458e2782b2b77e36769c569e263a53885a9944dd0a861e5064eac16f1a
  return hex;
}

function uniqueIdFetch() {
  chrome.storage.sync.get("userid", function (items) {
    var userid = items.userid;
    autodata.uid = userid;
    // console.log(userid);
    if (userid) {
      autodata.uid = userid;
    } else {
      userid = getRandomToken();
      chrome.storage.sync.set({ userid: userid }, function () {
        autodata.uid = userid;
      });
    }
  });
}

function sendData() {
  if (!!autodata.uid) {
    if (!(autodata.uid.length > 1)) {
      window.requestAnimationFrame(sendData);
    } else {
      if (false) {
        // console.log("location = " + autodata.loc.length);
        if (!(autodata.loc.length > 1)) {
          window.requestAnimationFrame(sendData);
        } else {
          chrome.storage.sync.set(
            { autodata: autodata, affliate: affliate },
            function () {
              chrome.runtime.sendMessage({ ready: "ready" });
              // console.log(autodata);
            }
          );
        }
      } else {
        chrome.storage.sync.set(
          { autodata: autodata, affliate: affliate },
          function () {
            chrome.runtime.sendMessage({ ready: "ready" });
            // console.log(autodata);
          }
        );
      }
    }
  }
}
