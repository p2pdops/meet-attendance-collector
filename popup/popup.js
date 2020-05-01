let tab = null;

document.addEventListener('DOMContentLoaded', function () {

    var counter = document.getElementById('counter');


    chrome.tabs.getSelected(null, function (_tab) {
        tab = _tab
        const tabId = tab.id;
        chrome.tabs.sendMessage(tabId, {msg: 'needCount', tabId}, function (res) {
            res = (res || {count: 0});
            if (res.count) counter.innerHTML = res.count;

            return true;
        });
    });

    console.log('DOMContentLoaded')


    const downloader = document.getElementById('download');
    const refresher = document.getElementById('refresh');
    const options = document.getElementById('options');
    const clearer = document.getElementById('clear');
    const close = document.getElementById('close');

    close.addEventListener('click', function () {
        window.close();
    });

    options.addEventListener('click', function () {
        chrome.runtime.openOptionsPage(function () {
            console.log('opened options')

            return true;
        })
    });

    downloader.addEventListener('click', function () {
        chrome.tabs.sendMessage(tab.id, {msg: 'downloadReq', tabId: tab.id}, function () {

            return true;
        })
    });

    refresher.addEventListener('click', function () {
        chrome.tabs.sendMessage(tab.id, {msg: 'scan', tabId: tab.id}, function (res) {
            window.close();
            return true;
        });
    });

    clearer.addEventListener('click', function () {
        chrome.tabs.sendMessage(tab.id, {msg: 'clearAttendance', tabId: tab.id}, function () {
            counter.innerHTML = '0';

            return true;
        });
    });

});
