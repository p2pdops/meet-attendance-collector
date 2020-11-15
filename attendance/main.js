console.log = () => {}
let aliases = {};
let attendees = new Set();
let respond = function () {
};
let monitorMode = false;
chrome.storage.sync.get(['aliases'], function (data) {
    aliases = {};
    attendees = new Set();
    if (data.aliases) {
        data.aliases.forEach(
            (al) => {
                console.log(al);
                (aliases[al.originalName] = al.aliasName)
            }
        );
    }
    console.log(aliases);
});
chrome.storage.onChanged.addListener(function (data) {
    aliases = {};
    attendees = new Set();
    console.log(data);
    if (data.aliases) {
        data.aliases.newValue.forEach(
            (al) => {
                console.log(al);
                (aliases[al.originalName] = al.aliasName)
            }
        );
        console.log(aliases);
    }
});

const takeNewMonSnap = async () => {
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
            "ThdJC kaAt2 c0XF8e"
        )[0].click();
    }, 200);
    const set = new Set();
    await setTimeout(async () => {
        const container = document.getElementsByClassName("HALYaf tmIkuc s2gQvd KKjvXb")[0];
        await scrollTo(container, container.scrollHeight, async () => {
            const containers = await document.getElementsByClassName("ZjFb7c");
            for (const container of containers) {
                let attendee = container.innerHTML
                if (aliases[attendee]) attendee = aliases[attendee];
                await set.add(attendee);
                await console.log('update', set, aliases)
            }
        }, async () => {
            await (nowDate = formatAMPM(new Date()));
            await (dateWiseRecords[nowDate] = [...set]);
            await console.log('Final set', dateWiseRecords)
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
            await refresh();
            respond()
            setTimeout(() => {
                saveFile();
            }, 1000)
            break;
        case 'single_scan':
            await refresh();
            respond()
            break;
        case 'needCount':
            await respond({count: attendees.size});
            break;
        case 'isMonitoring':
            await respond(monitorMode);
            break;
        case 'startMonitoring':
            chrome.storage.sync.set({currentSessionUrl: window.location.href}, function () {
            });
            dateWiseRecords = {}
            monitorMode = true;
            await (nowDate = formatAMPM(new Date()));
            await takeNewMonSnap()
            await respond();
            break;
        case 'takeNewMonSnap':
            await (nowDate = formatAMPM(new Date()));
            await takeNewMonSnap()
            break;
        case 'stopMonitoring':
            monitorMode = false;
            await respond();
            break;
        case 'needMonitor':
            await respond({monitor: dateWiseRecords, monitorMode});
            break;
        case 'clearAttendance':
            attendees = new Set();
            respond("done");
            break;
    }
});

function scrollTo(element, to, updateCallback, finishCallBack) {

    const duration =
        ((+document.getElementsByClassName("wnPUne N0PJ8e")[0].innerHTML || 0) /
            10) * 300;
    element.scrollTop = 0;
    return setTimeout(async function () {
        let start = element.scrollTop,
            change = to - start,
            currentTime = 0,
            increment = 20;
        const animateScroll = async () => {
            currentTime += increment;

            element.scrollTop = await easeInOutQuad(currentTime, start, change, duration);

            if (currentTime < duration)
                await setTimeout(animateScroll, increment);

            await updateCallback()
        };
        await animateScroll();
        await finishCallBack();
    }, 250);
}

const saveFile = () => {
    const twoDigits = (v) => ("0" + Number(v)).slice(-2);
    console.log('saveFile: call')
    let today = new Date(),
        d = today.getDate(),
        m = today.getMonth() + 1,
        y = today.getFullYear();
    let nowDate = y + "-" + twoDigits(m) + "-" + twoDigits(d),
        nowTime = today.getHours() + ":" + twoDigits(today.getMinutes());
    let header = `Attendance bot: dev(Pavan:p2pdops@gmail.com) on ${nowDate} : ${nowTime}: ${window.location.href}`;
    let mem_head = `${
        attendees.size ? "Members present : " + attendees.size : "No Members"
    }`;
    let rows = [...attendees].map(name => [name]);
    const ws = XLSX.utils.aoa_to_sheet([...rows], {origin: 'A5'});
    XLSX.utils.sheet_add_aoa(ws, [[header], [], [mem_head]], [],);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Attendance");
    XLSX.writeFile(wb, `Meet attendance -(${nowDate} : ${nowTime}).csv`)

}


function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm.toUpperCase();
}

(function () {
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    const observer = new MutationObserver(function () {
        const containers = document.getElementsByClassName("ZjFb7c");
        for (const container of containers) {
            let attendee = container.innerHTML
            if (aliases[attendee]) attendee = aliases[attendee];
            attendees.add(attendee);
        }
    });
    observer.observe(document, {
        subtree: true,
        attributes: true,
    });
})();
