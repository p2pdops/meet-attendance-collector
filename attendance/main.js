console.log = () => { }
let aliases = {};
let attendees = new Set();
let respond = function () {
};
let monitorMode = false;
chrome.storage.sync.get(['aliases'], function (data) {
    console.log('got data', aliases);
    aliases = {};
    attendees = new Set();
    data.aliases?.forEach(
        (al) => {
            console.log(al);
            (aliases[al.originalName] = al.aliasName)
        }
    );
    attendees = new Set([...attendees].map(atn => aliases[atn] || atn))
    console.log('aliases', aliases);
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

    if (!isShowingMenuBox()) {
        await setTimeout(() => getPeopleButton().click(), 200);
    }
    await setTimeout(() => getPeopleContainerButton().click(), 200);
    const set = new Set();
    await setTimeout(async () => {
        let container = getPeopleContainer();
        !container && await setTimeout(() => { }, 500)
        container = getPeopleContainer();
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
    if (!isShowingMenuBox()) {
        await setTimeout(() => {
            getCloseButton().click();
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
    console.log('Google-Meet-Attendance-Collector-Extension', { message })
    respond = sendResponse;
    const { msg } = message;
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
            await respond({ count: attendees.size });
            break;
        case 'isMonitoring':
            await respond(monitorMode);
            break;
        case 'startMonitoring':
            chrome.storage.sync.set({ currentSessionUrl: window.location.href }, function () {
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
            await respond({ monitor: dateWiseRecords, monitorMode });
            break;
        case 'clearAttendance':
            attendees = new Set();
            respond("done");
            break;
    }
});

function scrollTo(element, to, updateCallback, finishCallBack) {

    const duration = ((+getCountBox().innerHTML || 0) / 10) * 300;
    element.scrollTop = 0;
    return setTimeout(async function () {
        let start = element.scrollTop,
            change = to - start,
            currentTime = 0,
            increment = 30;
        const animateScroll = async () => {
            currentTime += increment;

            element.scrollTop = await easeInOutQuad(currentTime, start, change, duration);

            if (currentTime < duration)
                await setTimeout(animateScroll, increment);

            await updateCallback && updateCallback()
        };
        await animateScroll();
        await setTimeout(() => finishCallBack && finishCallBack(), 800);
    }, 250);
}

const saveFile = () => {
    const twoDigits = (v) => ("0" + Number(v)).slice(-2);
    console.log('saveFile: call', aliases)
    let today = new Date(),
        d = today.getDate(),
        m = today.getMonth() + 1,
        y = today.getFullYear();
    let nowDate = y + "-" + twoDigits(m) + "-" + twoDigits(d),
        nowTime = today.getHours() + ":" + twoDigits(today.getMinutes());
    let header = `Attendance bot: dev(Pavan:p2pdops@gmail.com) on ${nowDate} : ${nowTime}: ${window.location.href}`;
    let mem_head = `${attendees.size ? `Members present : ${attendees.size} (Duplicates removed)` : "No Members"
        }`;
    let rows = [...attendees].sort().map(name => [aliases[name] || name]);
    const ws = XLSX.utils.aoa_to_sheet([...rows], { origin: 'A5' });
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
            attendees.add(aliases[attendee] || attendee);
            console.log("attendees = ", attendees, aliases);
        }
    });
    observer.observe(document, {
        subtree: true,
        attributes: true,
    });
})();
