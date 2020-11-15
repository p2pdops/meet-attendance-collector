let aliases = {};
let attendees = [];
let respond = function () {
};

chrome.storage.onChanged.addListener(function (data) {
    aliases = {};
    attendees = [];
    data.aliases.newValue.forEach(
        (al) => (aliases[al.originalName] = al.aliasName)
    );
    console.log(aliases);
});

const refresh = async () => {

    const getIsShowingMenuBox = !!document.getElementsByClassName("Bx7THd PBWx0c Uy7Qke XN1AMe").length;

    if (!getIsShowingMenuBox) {
        await setTimeout(() => {
            document.getElementsByClassName(
                "uArJ5e UQuaGc kCyAyd QU4Gid foXzLb IeuGXd"
            )[0].click();
        }, 200);
    }

    await setTimeout(() => {
        document.getElementsByClassName(
            "ThdJC kaAt2 c0XF8e s7PhZd sVoT0c Z9zn3b sUgV6e KKjvXb LdTVNd"
        )[0].click();
    }, 200);

    const set = new Set();

    await setTimeout(async () => {
        const container = document.getElementsByClassName("HALYaf tmIkuc s2gQvd KKjvXb")[0];
        await scrollTo(container, container.scrollHeight, async () => {
            const containers = document.getElementsByClassName("ZjFb7c");
            for (const container of containers) {
                let attendee = container.innerHTML
                if (aliases[attendee]) attendee = aliases[attendee];
                await set.add(attendee);
                console.log('update', set)
            }
        });
    }, 200);

    if (!getIsShowingMenuBox) {
        await setTimeout(() => {
            document.getElementsByClassName(
                "VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ IWtuld wBYOYb"
            )[0].click();
        }, 200);
    }
};

let nowDate = formatAMPM(new Date());
let dateWiseRecords = {}

chrome.runtime.onMessage.addListener(async (
    message,
    sender,
    sendResponse
) => {
    respond = sendResponse;
    const {msg} = message;
    switch (msg) {
        case 'downloadReq':
            await saveTextFile();
            break;
        case 'scan':
            chrome.storage.sync.set({currentSessionUrl: window.location.href}, function () {
            });

            await (nowDate = formatAMPM(new Date()));
            await refresh()
            break;
        case 'needCount':
            await respond({count: attendees.length});
            break;

        case 'needMonitor':
            await respond({monitor: dateWiseRecords});
            break;
        case 'clearAttendance':
            attendees = [];
            respond("done");
            break;
    }
});

function scrollTo(element, to, callback) {

    const duration =
        ((+document.getElementsByClassName("wnPUne N0PJ8e")[0].innerHTML || 0) /
            10) *
        400;
    element.scrollTop = 0;
    return setTimeout(async function () {
        let start = element.scrollTop,
            change = to - start,
            currentTime = 0,
            increment = 20;

        const animateScroll = async function () {
            currentTime += increment;

            function easeInOutQuad(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return (c / 2) * t * t + b;
                t--;
                return (-c / 2) * (t * (t - 2) - 1) + b;
            }

            element.scrollTop = easeInOutQuad(currentTime, start, change, duration);
            await callback()
            console.log('callback')

            if (currentTime < duration) {
                await setTimeout(animateScroll, increment);
            }
        };
        await animateScroll();
    }, 1000);
}

// (function () {
//     MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
//     const observer = new MutationObserver(function (mutations, observer) {
//         const dateWise = dateWiseRecords[nowDate] || [];
//         const containers = document.getElementsByClassName("ZjFb7c");
//         for (const container of containers) {
//             let attendee = container.innerHTML
//             if (aliases[attendee]) attendee = aliases[attendee];
//             if (!dateWise.includes(attendee)) {
//                 dateWise.push(attendee);
//                 dateWiseRecords[nowDate] = dateWise
//                 console.log(dateWiseRecords)
//             }
//         }
//     });
//
//     observer.observe(document, {
//         subtree: true,
//         attributes: true,
//     });
//
// })();

function saveTextFile() {
    //console.log('saveTextFile: call')
    function twoDigits(v) {
        return ("0" + Number(v)).slice(-2);
    }

    let today = new Date(),
        d = today.getDate(),
        m = today.getMonth() + 1,
        y = today.getFullYear();
    let cdate = y + "-" + twoDigits(m) + "-" + twoDigits(d),
        ctime = today.getHours() + ":" + twoDigits(today.getMinutes());
    let header = `Attendance bot: dev(Pavan:p2pdops@gmail.com) on ${cdate} : ${ctime} : \n\n ${
        attendees.length ? "Members :" + attendees.length : "No Members"
    }\n\n`;
    let txt = attendees.join("\n");
    let blob = new Blob([header + txt], {type: "text/plain;charset=utf-8"});
    let temp_a = document.createElement("a");
    temp_a.download = `Meet attendance -(${cdate} : ${ctime})-(doperbot).csv`;
    temp_a.href = window.webkitURL.createObjectURL(blob);
    temp_a.click();
}


function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
}
