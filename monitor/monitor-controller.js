console.log = () => {
}
(function (angular) {
    'use strict';
    angular.module('ngMonitor', ['ngAnimate']).controller('repeatController', ['$scope', '$timeout', function ($scope, $timeout) {

        $scope.raw = {};
        $scope.checkEq = (item) => (i) => i === item;

        $scope.attendees = []
        $scope.cols = []
        $scope.scores = {}
        $scope.avgScore = 0
        $scope.monitorMode = true

        $scope.getMonitor = () => {
            chrome.storage.sync.get(['currentSessionUrl'], function (data) {
                $scope.meetUrl = data.currentSessionUrl
                console.log(data.currentSessionUrl)
                chrome.tabs.query({
                    url: $scope.meetUrl
                }, function (tab) {
                    chrome.tabs.sendMessage(tab[0].id, { msg: 'needMonitor' }, function (res) {


                        if (res.monitorMode === false) {
                            // window.close()
                            $scope.monitorMode = false;
                        }


                        $scope.raw = res.monitor;
                        $scope.attendees = [...new Set(Object.values($scope.raw).flat(1))]
                        $scope.cols = Object.keys($scope.raw);
                        $scope.scores = {};

                        //calc score
                        for (const col of $scope.cols) {
                            for (const name of $scope.attendees) {
                                const exist = $scope.raw[col].includes(name);
                                const prevVal = ($scope.scores[name] || 0)
                                $scope.scores[name] = prevVal + (exist ? 1 : 0);
                                console.log({ col: $scope.raw[col], name, exist, prevVal, newScore: $scope.scores[name] })
                            }
                        }

                        $scope.avgScore = Math.round(((Object.values($scope.scores)).reduce((a, b) => a + b, 0) * 100 / $scope.attendees.length)) / 100;

                        console.log($scope)
                        $timeout(function () {
                            $scope.temp = 'a';
                            $scope.temp = undefined;
                        }, 200)
                        return true;
                    });

                });
            });
        }

        $scope.triggerVisibleChange = () => {
            $scope.getMonitor();
            document.addEventListener('visibilitychange', () => {
                if (document.visibilityState === 'visible')
                    $scope.getMonitor();
            }, false);
        }

        $scope.triggerVisibleChange();


        $scope.saveFile = (isCsv = false) => {
            const twoDigits = (v) => ("0" + Number(v)).slice(-2);

            //console.log('saveTextFile: call')
            console.log('Trigger')
            let today = new Date(),
                d = today.getDate(),
                m = today.getMonth() + 1,
                y = today.getFullYear();
            let cdate = y + "-" + twoDigits(m) + "-" + twoDigits(d),
                ctime = today.getHours() + ":" + twoDigits(today.getMinutes());

            let header = `Attendance bot: dev(Pavan:p2pdops@gmail.com) on ${cdate} : ${ctime}: ${$scope.meetUrl}`;
            let mem_head = `${$scope.attendees.length ? "Members present : " + $scope.attendees.length : "No Members"
                }`;

            const colLength = $scope.cols.length

            let rows = $scope.attendees.map(name => {
                const does_contain = $scope.cols.reduce((prev, curr) => ({
                    ...prev,
                    [curr]: $scope.raw[curr].includes(name) ? '✅' : '❎'
                }), {})
                // return [name, `${$scope.scores[name]}/${colLength}`, ...does_contain]
                return {
                    'Attendee': name,
                    'Score': `${$scope.scores[name]}/${colLength}`,
                    ...does_contain
                }
            });

            rows.push({
                'Score': `Avg: ${$scope.avgScore}/${colLength}`,
            })

            console.log(rows)

            const ws = XLSX.utils.json_to_sheet([...rows], { origin: 'A6' });

            XLSX.utils.sheet_add_aoa(ws, [[header], [], [mem_head]], [], ['Data', '', 'Time']);

            ws["!merges"] = [
                { s: { r: 4, c: 0 }, e: { r: 4, c: 1 } },
                { s: { r: 4, c: 2 }, e: { r: 4, c: 2 + colLength - 1 } },
            ];


            /* add to workbook */
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Attendance");

            if (isCsv) {
                XLSX.writeFile(wb, `Meet Monitored Attendance -(${cdate} : ${ctime}).csv`)
            } else {
                XLSX.writeFile(wb, `Meet Monitored Attendance -(${cdate} : ${ctime}).xlsx`);
            }
        }

        $scope.show_progress = false;
        $scope.newSnap = () => {
            $scope.show_progress = true;
            chrome.tabs.query({
                url: $scope.meetUrl
            }, function (tab) {

                chrome.tabs.sendMessage(tab[0].id, { msg: 'takeNewMonSnap', tabId: tab.id }, function () {
                    setTimeout(() => {
                        window.location.reload()
                    }, 1750);
                    return true;
                })
            });
        }

        $scope.time = ""

        function time() {
            let hours = new Date().getHours();
            let minutes = new Date().getMinutes();
            const ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0' + minutes : minutes;
            $scope.time = hours + ':' + minutes + ' ' + ampm.toUpperCase();
            $timeout(function () {
                $scope.temp = 'a';
                $scope.temp = undefined;
            }, 200)
        }

        time()
        setInterval(time, 5000);

    }]);
})(window.angular);
