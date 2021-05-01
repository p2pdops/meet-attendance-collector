
document.addEventListener('DOMContentLoaded', async () => {

    const counter = document.getElementById('counter');
    const start_mon_lay = document.getElementById('start_mon_lay');
    const live_mon_lay = document.getElementById('live_mon_lay');

    const downloader = document.getElementById('download');
    const refresher = document.getElementById('refresh');
    const options = document.getElementById('options');
    const clearer = document.getElementById('clear');
    const close = document.getElementById('close');

    const start_mon_btn = document.getElementById('start_mon_btn');
    const take_record_mon_btn = document.getElementById('take_record_mon_btn');
    const stop_record_mon_btn = document.getElementById('stop_record_mon_btn');

    const progress_bar = document.getElementById('progress_bar');
    const tab = (await chrome.tabs.query({ active: true }))[0];
    const tabId = tab.id;

    console.log({ tab });

    close.addEventListener('click', function () {
        window.close();
    });

    chrome.tabs.sendMessage(tabId, { msg: 'needCount', tabId }, function (res) {
        res = (res || { count: 0 });
        if (res.count) counter.innerHTML = res.count;
        return true;
    });
    chrome.tabs.sendMessage(tabId, { msg: 'isMonitoring', tabId }, function (res) {
        if (res) {
            start_mon_lay.style.display = 'none';
            live_mon_lay.style.display = 'block';
        } else {
            start_mon_lay.style.display = 'block';
            live_mon_lay.style.display = 'none';
        }
        return true;
    });

    start_mon_btn.addEventListener('click', function () {
        progress_bar.style.display = 'block'
        chrome.tabs.sendMessage(tab.id, { msg: 'startMonitoring', tabId: tab.id }, function () {
            setTimeout(() => {
                window.open('../monitor/monitor.html', '_blank');
                window.location.reload()
            }, 1250);
            return true;
        })
    });

    take_record_mon_btn.addEventListener('click', function () {
        progress_bar.style.display = 'block'
        chrome.tabs.sendMessage(tab.id, { msg: 'takeNewMonSnap', tabId: tab.id }, function () {
            setTimeout(() => {
                chrome.tabs.query({ url: window.location.href.replace('popup/popup.html', '') + 'monitor/monitor.html' }, function (tabs) {
                    if (tabs.length)
                        chrome.tabs.update(tabs[0].id, { url: '../monitor/monitor.html' });
                    else
                        window.open('../monitor/monitor.html', '_blank');
                    window.location.reload()
                });

            }, 750);
            return true;
        })
    });

    stop_record_mon_btn.addEventListener('click', function () {
        chrome.tabs.sendMessage(tab.id, { msg: 'stopMonitoring', tabId: tab.id }, function () {
            setTimeout(() => {
                window.location.reload()
                window.open('../monitor/monitor.html', '_blank');
            }, 750);
            return true;
        })
    });

    console.log('DOMContentLoaded')


    options.addEventListener('click', function () {
        chrome.runtime.openOptionsPage(function () {
            console.log('opened options')
            return true;
        })
    });


    refresher.addEventListener('click', function () {
        progress_bar.style.display = 'block'
        chrome.tabs.sendMessage(tab.id, { msg: 'single_scan', tabId: tab.id }, function () {
            setTimeout(() => window.location.reload(), 750);
            return true;
        });
    });

    downloader.addEventListener('click', function () {
        progress_bar.style.display = 'block'
        chrome.tabs.sendMessage(tab.id, { msg: 'downloadReq', tabId: tab.id }, function () {
            setTimeout(() => window.location.reload(), 750);
            return true;
        })
    });

    clearer.addEventListener('click', function () {
        chrome.tabs.sendMessage(tab.id, { msg: 'clearAttendance', tabId: tab.id }, function () {
            counter.innerHTML = '0';
            return true;
        });
    });

});
