$(document).ready(function () {
    let breakCtr = 5;
    let sessionCtr = 25;
    let tmp = " ";
    let isPlay = false;
    let disVal;
    let disValMin = 0;
    let disValSec = 0;
    let setInt_ID = 0;
    let isBreak = false;

    $("#break-length").text(breakCtr);
    $("#session-length").text(sessionCtr);
    tmp = sessionCtr + ":" + "00";
    $("#time-left").text(tmp);

    $("#break-increment").click(function () {
        if (isPlay === false) {
            if (breakCtr < 60) {
                breakCtr = breakCtr + 1;
                $("#break-length").text(breakCtr);
            }
        }
    })

    $("#break-decrement").click(function () {
        if (isPlay === false) {
            if (breakCtr > 1) {
                breakCtr = breakCtr - 1;
                $("#break-length").text(breakCtr);
            }
        }
    })

    $("#session-increment").click(function () {
        if (isPlay === false) {
            if (sessionCtr < 60) {
                sessionCtr = sessionCtr + 1;
                $("#session-length").text(sessionCtr);

            }
        }
        tmp = sessionCtr + ":" + "00";
        $("#time-left").text(tmp);
    })

    $("#session-decrement").click(function () {
        if (isPlay === false) {
            if (sessionCtr > 1) {
                sessionCtr = sessionCtr - 1;
                $("#session-length").text(sessionCtr);
            }
        }
        tmp = sessionCtr + ":" + "00";
        $("#time-left").text(tmp);
    })

    const updateDisplay = () => {
        let min = " ";
        let sec = " ";
        if (disValMin < 10) {
            min = "0" + disValMin;
        } else min = disValMin;
        if (disValSec < 10) {
            sec = "0" + disValSec;
        } else sec = disValSec;
        $("#time-left").text(min + ":" + sec);


    }

    const updateTimer = () => {
        if (isBreak === true) {
            if (disValMin >= 1 && disValSec === 0) {
                disValSec = 59;
                disValMin = disValMin - 1;
                updateDisplay();
            } else if (disValMin >= 0 && disValSec !== 0) {
                disValSec = disValSec - 1;
                updateDisplay();
            } else if (disValMin === 0 && disValSec === 0) {
                isBreak = true;
                disValMin = breakCtr;
                disValSec = 0;
                $("#timer-label").text("Break");
                document.getElementById("beep").play();
                document.getElementById("beep").muted = false;
                updateDisplay();
            }

        } else if (isBreak === false) {
            if (disValMin >= 1 && disValSec === 0) {
                disValSec = 59;
                disValMin = disValMin - 1;
                updateDisplay();
            } else if (disValMin >= 0 && disValSec !== 0) {
                disValSec = disValSec - 1;
                updateDisplay();
            } else if (disValMin === 0 && disValSec === 0) {
                isBreak = false;
                disValMin = sessionCtr;
                disValSec = 0;
                $("#timer-label").text("Session");
                document.getElementById("beep").play();
                document.getElementById("beep").muted = false;
                updateDisplay();

            } if (disValMin === 0 && disValSec === 0) {
                if (!isBreak) {
                    isBreak = true;
                    $("#timer-label").text("Break");
                    let breakLength = parseInt($("#break-length").text());
                    $("#time-left").text(breakLength + ":00");
                } else {
                    isBreak = false;
                    $("#timer-label").text("Session");
                    let sessionLength = parseInt($("#session-length").text());
                    $("#time-left").text(sessionLength + ":00");
                }
            }
        }

    }

    $("#start_stop").click(function () {
        let disVal = $("#time_left").text().split(":");
        let disValMin = parseInt(disVal[0]);
        let disValSec = parseInt(disVal[1]);

        if (isPlay === false) {
            isPlay = true;
            setInt_ID = setInterval(updateTimer, 1000);
        } else if (isPlay === true) {
            isPlay = false;
            clearInterval(setInt_ID);
        }
    })

    $("#reset").click(function () {
        breakCtr = 5;
        sessionCtr = 25;
        $("#break-length").text(breakCtr);
        $("#session-length").text(sessionCtr);
        tmp = sessionCtr + ":" + "00";
        $("#time-left").text(tmp);
        $("#timer.label").text(session);
        clearInterval(setInt_ID);
        isPlay = false;
        isBreak = false;
        let clip = document.getElementById("beep");
        clip.pause();
        clip.currentTime = 0;


    })

})