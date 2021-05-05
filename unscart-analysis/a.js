// console.log("findads working");
let Security = [];
let Security2 = [];
let urls = [];
chrome.runtime.sendMessage({ message: "getselectors" }, (response) => {
  Security = response.Security;

  Security2 = response.Security2;

  for (let index = 0; index < Security.length; index++) {
    if (eval(Security[index].chrome).length > 0) {
      eval(Security[index].empt);
      let count = eval(Security[index].chrome).length;

      for (let i = 0; i < count; i++) {
        if (Security[index].store ? eval(Security[index].store) : true) {
          if (eval(Security[index].cleanMaster)) {
            let time = Date.now();
            let tempobj = {
              time,
            };

            for (let j = 0; j < Security[index].RAM.length; j++) {
              if (eval(Security[index].RAM[j][2])) {
                let key, value;
                key = Security[index].RAM[j][0];
                value = eval(Security[index].RAM[j][1]);
                tempobj[key] = value;

                if (j == Security[index].RAM.length - 1) {
                  if (!urls.includes(tempobj.url)) {
                    urls.push(tempobj.url);
                    eval(Security[index].clean).push(tempobj);
                  }
                }
                if (
                  i == eval(Security[index].chrome).length - 1 &&
                  j == Security[index].RAM.length - 1
                ) {
                  if (eval(Security[index].clean).length > 0) {
                    let analyseobj = {};
                    let message = "message";
                    analyseobj[Security[index].clean] = eval(
                      Security[index].clean
                    );
                    analyseobj[message] = "analyse";
                    chrome.runtime.sendMessage(analyseobj);
                  }
                }
              } else {
                let key, value;
                key = Security[index].RAM[j][0];
                value = "";
                tempobj[key] = value;
                if (j == Security[index].RAM.length - 1) {
                  if (!urls.includes(tempobj.url)) {
                    urls.push(tempobj.url);
                    eval(Security[index].clean).push(tempobj);
                  }
                }
                if (
                  i == eval(Security[index].chrome).length - 1 &&
                  j == Security[index].RAM.length - 1
                ) {
                  if (eval(Security[index].clean).length > 0) {
                    let analyseobj = {};
                    let message = "message";
                    analyseobj[Security[index].clean] = eval(
                      Security[index].clean
                    );
                    analyseobj[message] = "analyse";
                    chrome.runtime.sendMessage(analyseobj);
                  }
                }
              }
            }
          } else {
            if (i == eval(Security[index].chrome).length - 1) {
              let analyseobj = {};
              let message = "message";
              analyseobj[Security[index].clean] = eval(Security[index].clean);
              analyseobj[message] = "analyse";
              chrome.runtime.sendMessage(analyseobj);
            }
          }
        } else {
          if (i == eval(Security[index].chrome).length - 1) {
            let analyseobj = {};
            let message = "message";
            analyseobj[Security[index].clean] = eval(Security[index].clean);
            analyseobj[message] = "analyse";
            chrome.runtime.sendMessage(analyseobj);
          }
        }
      }
    }
  }

  setInterval(() => {
    for (let index = 0; index < Security2.length; index++) {
      if (eval(Security2[index].chrome).length > 0) {
        eval(Security2[index].empt);
        let count = eval(Security2[index].chrome).length;
        for (let i = 0; i < count; i++) {
          if (Security2[index].store ? eval(Security2[index].store) : true) {
            if (eval(Security2[index].cleanMaster)) {
              let time = Date.now();
              let tempobj = {
                time,
              };
              for (let j = 0; j < Security2[index].RAM.length; j++) {
                if (eval(Security2[index].RAM[j][2])) {
                  let key, value;
                  key = Security2[index].RAM[j][0];
                  value = eval(Security2[index].RAM[j][1]);
                  tempobj[key] = value;
                  if (j == Security2[index].RAM.length - 1) {
                    if (!urls.includes(tempobj.url)) {
                      urls.push(tempobj.url);
                      eval(Security2[index].clean).push(tempobj);
                    }
                  }
                  if (
                    i == eval(Security2[index].chrome).length - 1 &&
                    j == Security2[index].RAM.length - 1
                  ) {
                    if (eval(Security2[index].clean).length > 0) {
                      let analyseobj = {};
                      let message = "message";
                      analyseobj[Security2[index].clean] = eval(
                        Security2[index].clean
                      );
                      analyseobj[message] = "analyse";
                      chrome.runtime.sendMessage(analyseobj);
                    }
                  }
                } else {
                  let key, value;
                  key = Security2[index].RAM[j][0];
                  value = "";
                  tempobj[key] = value;
                  if (j == Security2[index].RAM.length - 1) {
                    if (!urls.includes(tempobj.url)) {
                      urls.push(tempobj.url);
                      eval(Security2[index].clean).push(tempobj);
                    }
                  }
                  if (
                    i == eval(Security2[index].chrome).length - 1 &&
                    j == Security2[index].RAM.length - 1
                  ) {
                    if (eval(Security2[index].clean).length > 0) {
                      let analyseobj = {};
                      let message = "message";
                      analyseobj[Security2[index].clean] = eval(
                        Security2[index].clean
                      );
                      analyseobj[message] = "analyse";
                      chrome.runtime.sendMessage(analyseobj);
                    }
                  }
                }
              }
            } else {
              if (i == eval(Security2[index].chrome).length - 1) {
                if (eval(Security2[index].clean).length > 0) {
                  let analyseobj = {};
                  let message = "message";
                  analyseobj[Security2[index].clean] = eval(
                    Security2[index].clean
                  );
                  analyseobj[message] = "analyse";
                  chrome.runtime.sendMessage(analyseobj);
                }
              }
            }
          } else {
            if (i == eval(Security2[index].chrome).length - 1) {
              if (eval(Security2[index].clean).length > 0) {
                let analyseobj = {};
                let message = "message";
                analyseobj[Security2[index].clean] = eval(
                  Security2[index].clean
                );
                analyseobj[message] = "analyse";
                chrome.runtime.sendMessage(analyseobj);
              }
            }
          }
        }
      }
    }
  }, 3000);
});

let currentPage = window.location.href;
let productsArr = [];
let pidArr = [];

if (
  currentPage.includes("flipkart.com/search") ||
  (currentPage.includes("flipkart.com") && currentPage.includes("pr?sid"))
) {
  let searchproductDiv = document.querySelectorAll("._13oc-S [data-id]");
  let time = Date.now();
  for (let f = 0; f < searchproductDiv.length; f++) {
    let pid = searchproductDiv[f].getAttribute("data-id");
    let price = searchproductDiv[f].querySelector("._30jeq3._1_WHN1")
      ? searchproductDiv[f]
        .querySelector("._30jeq3._1_WHN1")
        .innerText.slice(1)
        .replaceAll(",", "")
      : searchproductDiv[f]
        .querySelector("._30jeq3")
        .innerText.slice(1)
        .replaceAll(",", "");

    let star = null;
    if (searchproductDiv[f].querySelector("._3LWZlK")) {
      star = searchproductDiv[f].querySelector("._3LWZlK").innerText;
    }

    let temp = {
      pid,
      price,
      time,
      star,
      site: "flipkart",
    };

    productsArr.push(temp);
    if (f == searchproductDiv.length - 1) {
      chrome.runtime.sendMessage({ message: "productprice", productsArr });
    }
  }
}

if (currentPage.includes("amazon.in/s?")) {
  let searchproductDiv = document.querySelector(
    ".s-main-slot.s-result-list.s-search-results.sg-row"
  );
  let time = Date.now();
  for (let a = 0; a < searchproductDiv.childElementCount; a++) {
    if (
      document
        .querySelector(".s-main-slot.s-result-list.s-search-results.sg-row")
        .children[a].querySelector("[data-a-color]")
    ) {
      let pUrl = document
        .querySelector(".s-main-slot.s-result-list.s-search-results.sg-row")
        .children[a].querySelector("a").href;
      let pid = document
        .querySelector(".s-main-slot.s-result-list.s-search-results.sg-row")
        .children[a].getAttribute("data-asin");
      let price = document
        .querySelector(".s-main-slot.s-result-list.s-search-results.sg-row")
        .children[a].querySelector("[data-a-color]")
        .querySelector(".a-offscreen")
        .innerText.slice(1)
        .replaceAll(",", "");

      let star = null;
      if (
        document
          .querySelector(".s-main-slot.s-result-list.s-search-results.sg-row")
          .children[a].querySelector(".a-icon-alt")
      ) {
        star = document
          .querySelector(".s-main-slot.s-result-list.s-search-results.sg-row")
          .children[a].querySelector(".a-icon-alt").innerText;
        star = star.slice(0, star.indexOf(" out"));
      }

      let temp = {
        pid,
        price,
        time,
        star,
        site: "amazon",
      };

      productsArr.push(temp);
    }

    if (a == searchproductDiv.childElementCount - 1) {
      chrome.runtime.sendMessage({ message: "productprice", productsArr });
    }
  }
}

if (currentPage.includes("pid=") && currentPage.includes("lid=")) {
  let time = Date.now();
  let price = document
    .querySelector("._30jeq3._16Jk6d")
    .innerText.slice(1)
    .replaceAll(",", "");
  let pos = currentPage.indexOf("pid=");
  let newStr = currentPage.slice(pos + 4);
  pos = newStr.indexOf("&");
  newStr = newStr.slice(0, pos);
  let pid = newStr;
  let star = null;
  if (document.querySelector(".hGSR34")) {
    star = document.querySelector(".hGSR34").innerText;
  } else {
    if (document.querySelector("._3LWZlK")) {
      star = document.querySelector("._3LWZlK").innerText;
    }
  }
  let temp = {
    time,
    price,
    pid,
    star,
    site: "flipkart",
  };
  productsArr.push(temp);
  chrome.runtime.sendMessage({ message: "productprice", productsArr });

  setInterval(() => {
    let productpageDiv = document.querySelectorAll("._3YgSsQ._2Xkgrw");

    for (let p = 0; p < productpageDiv.length; p++) {
      if (document.querySelectorAll("._3YgSsQ._2Xkgrw")[p].querySelector("a")) {
        let temppid = document
          .querySelectorAll("._3YgSsQ._2Xkgrw")
        [p].querySelector("a").href;
        let pos = temppid.indexOf("pid=");
        let newStr = temppid.slice(pos + 4);
        pos = newStr.indexOf("&");
        newStr = newStr.slice(0, pos);
        temppid = newStr;

        let tempprice = document
          .querySelectorAll("._3YgSsQ._2Xkgrw")
        [p].querySelector("._30jeq3")
          .innerText.slice(1)
          .replaceAll(",", "");

        let star = null;
        if (productpageDiv[p].querySelector(".hGSR34")) {
          star = productpageDiv[p].querySelector(".hGSR34").innerText;
        } else if (productpageDiv[p].querySelector("._3LWZlK")) {
          star = productpageDiv[p].querySelector("._3LWZlK").innerText;
        }
        let tempobj = {
          pid: temppid,
          price: tempprice,
          time,
          star,
          site: "flipkart",
        };
        if (!pidArr.includes(temppid)) {
          pidArr.push(temppid);
          productsArr.push(tempobj);
        }
      }
      if (p == productpageDiv.length - 1) {
        if (productsArr.length > 0) {
          chrome.runtime.sendMessage({ message: "productprice", productsArr });
          productsArr = [];
        }
      }
    }
  }, 3000);
}

if (currentPage.includes("/dp/") && currentPage.includes("amazon.in/")) {
  let time = Date.now();
  let price = "";
  if (
    document.querySelector("#price #priceblock_ourprice") &&
    !document
      .querySelector("#price #priceblock_ourprice")
      .innerText.includes("FREE")
  ) {
    let temppos = document
      .querySelector("#price #priceblock_ourprice")
      .innerText.slice(2)
      .replace(",", "")
      .indexOf(".");

    price = document
      .querySelector("#price #priceblock_ourprice")
      .innerText.slice(2)
      .replace(",", "")
      .slice(0, temppos);
  } else if (
    document.querySelector("#price #priceblock_dealprice") &&
    !document
      .querySelector("#price #priceblock_dealprice")
      .innerText.includes("FREE")
  ) {
    let temppos = document
      .querySelector("#price #priceblock_dealprice")
      .innerText.slice(2)
      .replace(",", "")
      .indexOf(".");

    price = document
      .querySelector("#price #priceblock_dealprice")
      .innerText.slice(2)
      .replace(",", "")
      .slice(0, temppos);
  } else if (
    document.querySelector("#price #priceblock_saleprice") &&
    !document
      .querySelector("#price #priceblock_ourprice")
      .innerText.includes("FREE")
  ) {
    let temppos = document
      .querySelector("#price #priceblock_saleprice")
      .innerText.slice(2)
      .replace(",", "")
      .indexOf(".");

    price = document
      .querySelector("#price #priceblock_saleprice")
      .innerText.slice(2)
      .replace(",", "")
      .slice(0, temppos);
  }

  let pos = currentPage.indexOf("/dp/");
  let newStr = currentPage.slice(pos + 4);
  let pid = newStr.slice(0, 10);

  let star = null;
  if (document.querySelector(".a-icon-alt")) {
    star = document.querySelector(".a-icon-alt").innerText;
    star = star.slice(0, star.indexOf(" out"));
  }

  let temp = {
    time,
    price,
    pid,
    star,
    site: "amazon",
  };
  productsArr.push(temp);

  chrome.runtime.sendMessage({ message: "productprice", productsArr });

  setInterval(() => {
    let productpageDiv = document.querySelectorAll(".a-carousel-card");
    for (let p = 0; p < productpageDiv.length; p++) {
      if (
        document
          .querySelectorAll(".a-carousel-card")
        [p].querySelector(".a-color-price")
      ) {
        if (
          document
            .querySelectorAll(".a-carousel-card")
          [p].querySelector(".a-color-price").innerText
        ) {
          let temppid = document
            .querySelectorAll(".a-carousel-card")
          [p].querySelector(".a-link-normal").href;

          if (temppid.includes("%2Fdp%2F")) {
            let pos = temppid.indexOf("%2Fdp%2F");
            let newStr = temppid.slice(pos + 8);
            temppid = newStr.slice(0, 10);
          } else {
            if (temppid.includes("/dp/")) {
              let pos = temppid.indexOf("/dp/");
              let newStr = temppid.slice(pos + 4);
              temppid = newStr.slice(0, 10);
            }
          }

          let tempprice = "";
          if (
            !document
              .querySelectorAll(".a-carousel-card")
            [p].querySelector(".a-color-price")
              .innerText.includes("FREE")
          ) {
            tempprice = document
              .querySelectorAll(".a-carousel-card")
            [p].querySelector(".a-color-price")
              .innerText.slice(1)
              .replaceAll(",", "")
              .slice(
                0,
                document
                  .querySelectorAll(".a-carousel-card")
                [p].querySelector(".a-color-price")
                  .innerText.slice(1)
                  .replaceAll(",", "")
                  .indexOf(".")
              );
          }
          let star = null;
          if (
            document
              .querySelectorAll(".a-carousel-card")
            [p].querySelector(".a-icon-alt")
          ) {
            star = document
              .querySelectorAll(".a-carousel-card")
            [p].querySelector(".a-icon-alt").innerText;
            star = star.slice(0, star.indexOf(" out"));
          } else if (
            document
              .querySelectorAll(".a-carousel-card")
            [p].querySelector(".a-link-normal.adReviewLink.a-text-normal i")
          ) {
            star = document
              .querySelectorAll(".a-carousel-card")
            [p].querySelector(".a-link-normal.adReviewLink.a-text-normal i")
              .className.slice(-3)
              .replace("-", ".");
          }

          let tempobj = {
            pid: temppid,
            price: tempprice,
            time,
            star,
            site: "amazon",
          };
          if (!pidArr.includes(temppid)) {
            pidArr.push(temppid);
            productsArr.push(tempobj);
          }
        }
      }
      if (p == productpageDiv.length - 1) {
        if (productsArr.length > 0) {
          chrome.runtime.sendMessage({ message: "productprice", productsArr });
          productsArr = [];
        }
      }
    }
  }, 3000);
}
