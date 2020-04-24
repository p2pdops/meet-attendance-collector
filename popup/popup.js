let tab = null;

document.addEventListener('DOMContentLoaded', function () {

    var counter = document.getElementById('counter');


    chrome.tabs.getSelected(null, function (_tab) {
        tab = _tab
        chrome.tabs.sendMessage(tab.id, 'needCount', function (res) {
            res = (res || {count: 0});
            if (res.count) counter.innerHTML = res.count;
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
        chrome.tabs.sendMessage(tab.id, 'downloadReq', function () {

            return true;
        })
    });

    refresher.addEventListener('click', function () {
        chrome.tabs.sendMessage(tab.id, 'scan', function (res) {
            window.close();
            return true;

        });
    });

    clearer.addEventListener('click', function () {
        chrome.tabs.sendMessage(tab.id, 'clearAttendance', function () {
            counter.innerHTML = '0';

            return true;
        });
    });

});
