document.addEventListener('DOMContentLoaded', function() {
    const min = document.getElementById("min");
    const sec = document.getElementById("sec");
    let timeRemaining = 5 * 60; // 5分を秒に変換
    var helpButton = document.getElementById('helpImage');
    var closeButton = document.querySelector('.close');
    var hAudio = document.getElementById('help_audio');
    var tAudio = document.getElementById('timeOut_audio');
    var sAudio = document.getElementById('submit');
    var timeUpPopup = document.getElementById("timeUpPopup");
    var overlay = document.getElementById("overlay");
    var timeUpBackHomePopupButton = document.getElementById("timeUpBackHomePopup");
    var timeUpTryAgainPopupButton = document.getElementById("timeUpTryAgainPopup");
    var submitButton = document.getElementById("submitImage");
    var correctPopup = document.getElementById("correctPopup");
    var incorrectPopup = document.getElementById("incorrectPopup");
    var correctBackHomePopupButton = document.getElementById("correctBackHomePopup");
    var correctTryAgainPopupButton = document.getElementById("correctTryAgainPopup");
    var incorrectBackHomePopupButton = document.getElementById("incorrectBackHomePopup");
    var incorrectTryAgainPopupButton = document.getElementById("incorrectTryAgainPopup");

    function countdown() {
        let minutes = Math.floor(timeRemaining / 60);
        let seconds = timeRemaining % 60;

        min.innerHTML = minutes < 10 ? '0' + minutes : minutes;
        sec.innerHTML = seconds < 10 ? '0' + seconds : seconds;

        timeRemaining--;

        if (timeRemaining < 0) {
            clearInterval(timer); // タイマーを停止
            showTimeUpPopup(); //時間切れのポップアップを表示
        }
    }

    // ヘルプボタンをクリックしたときにポップアップとオーバーレイを表示
    helpButton.addEventListener('click', function() {
        popup.style.display = 'block';
        overlay.style.display = 'block';
        hAudio.currentTime = 0; // 連続クリックに対応
        hAudio.play(); // クリックしたら音を再生
    });
    // 閉じるボタンをクリックしたときにポップアップとオーバーレイを閉じる
    closeButton.addEventListener('click', function() {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    });

    // オーバーレイをクリックしたときにポップアップとオーバーレイを閉じる
    overlay.addEventListener('click', function() {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    });

    function showTimeUpPopup() {
        overlay.style.display = 'block';
        timeUpPopup.style.display = 'block';
    }

    function showCorrectPopup() {
        overlay.style.display = 'block';
        correctPopup.style.display = 'block';
    }

    function showIncorrectPopup() {
        overlay.style.display = 'block';
        incorrectPopup.style.display = 'block';
    }

    timeUpBackHomePopupButton.addEventListener('click', function() {
        tAudio.currentTime = 0; // 連続クリックに対応
        tAudio.play(); // クリックしたら音を再生

        setTimeout(function() {
            overlay.style.display = 'none';
            timeUpPopup.style.display = 'none';
            window.location.href = "index.html";
        }, 500);// 再生の後に遷移させる
    });

    timeUpTryAgainPopupButton.addEventListener('click', function() {
        tAudio.currentTime = 0; // 連続クリックに対応
        tAudio.play(); // クリックしたら音を再生

        setTimeout(function() {
            overlay.style.display = 'none';
            timeUpPopup.style.display = 'none';
            window.location.href = "game.html";
        }, 500);// 再生の後に遷移させる
    });

    correctBackHomePopupButton.addEventListener('click', function() {
        tAudio.currentTime = 0; // 連続クリックに対応
        tAudio.play(); // クリックしたら音を再生

        setTimeout(function() {
            overlay.style.display = 'none';
            timeUpPopup.style.display = 'none';
            window.location.href = "index.html";
        }, 500);// 再生の後に遷移させる
    });

    correctTryAgainPopupButton.addEventListener('click', function() {
        tAudio.currentTime = 0; // 連続クリックに対応
        tAudio.play(); // クリックしたら音を再生

        setTimeout(function() {
            overlay.style.display = 'none';
            timeUpPopup.style.display = 'none';
            window.location.href = "game.html";
        }, 500);// 再生の後に遷移させる
    });

    incorrectBackHomePopupButton.addEventListener('click', function() {
        tAudio.currentTime = 0; // 連続クリックに対応
        tAudio.play(); // クリックしたら音を再生

        setTimeout(function() {
            overlay.style.display = 'none';
            timeUpPopup.style.display = 'none';
            window.location.href = "index.html";
        }, 500);// 再生の後に遷移させる
    });

    incorrectTryAgainPopupButton.addEventListener('click', function() {
        tAudio.currentTime = 0; // 連続クリックに対応
        tAudio.play(); // クリックしたら音を再生

        setTimeout(function() {
            overlay.style.display = 'none';
            timeUpPopup.style.display = 'none';
            window.location.href = "game.html";
        }, 500);// 再生の後に遷移させる
    });

    submitButton.addEventListener('click', function() {
        sAudio.currentTime = 0; // 連続クリックに対応
        sAudio.play(); // クリックしたら音を再生

        /*
        ここにsubmitボタンを押した後の処理を書きます
        正誤判定が出た後ポップアップを表示して、ホームに戻るボタンともう一回チャレンジするボタンを作ろうと思います
        タイムアウト時に表示されるポップアップと同じかんじで実装します
        */

        //とりあえずsubmitボタンを押すとそれぞれcorrect, incorrectのポップアップを表示させています
        showCorrectPopup();
        //showIncorrectPopup();

    });

    const timer = setInterval(countdown, 1000);
    countdown(); // 初回の表示更新
});
