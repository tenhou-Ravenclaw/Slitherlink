document.addEventListener('DOMContentLoaded', function() {
    var video = document.querySelector('video');
    var helpButton = document.getElementById('helpImage');
    var startButton = document.getElementById('startImage');
    var rocketButton = document.getElementById('rocketGif');
    var popup = document.getElementById('popup');
    var overlay = document.getElementById('overlay');
    var darkOverlay = document.getElementById('darkOverlay');
    var closeButton = document.querySelector('.close');
    var hAudio = document.getElementById('help_audio');
    var sAudio = document.getElementById('start_audio');

    const min = document.getElementById("min");
    const sec = document.getElementById("sec");
    let timeRemaining = 5 * 60; // 5分を秒に変換

    // 動画の再生終了を検出するイベントリスナー
    video.addEventListener('ended', function() {
        // 画像にアニメーション付きで表示させるクラスを追加
        helpButton.classList.add('show');
        startButton.classList.add('show');
        rocketButton.classList.add('show');
    });

    // Startボタンが押されたときにロケットが飛ぶアニメーションを実行し、その後画面全体がフェードアウト
    startButton.addEventListener('click', function(event) {
        sAudio.currentTime = 0;
        sAudio.play();
        event.preventDefault(); // ページ遷移を一時停止
        darkOverlay.style.display = 'block'; // オーバーレイを表示して背景を暗くする
        rocketButton.classList.add('fly'); // ロケットを飛ばすアニメーションを追加

        // フェードアウトが完了してからページ遷移
        setTimeout(function() {
            window.location.href = "game.html";
        }, 1500); // ロケットアニメーション(1秒)後にページを遷移
    });

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

    function countdown() {
        let minutes = Math.floor(timeRemaining / 60);
        let seconds = timeRemaining % 60;

        min.innerHTML = minutes < 10 ? '0' + minutes : minutes;
        sec.innerHTML = seconds < 10 ? '0' + seconds : seconds;

        timeRemaining--;

        if (timeRemaining < 0) {
            clearInterval(timer); // タイマーを停止
            alert("Time's up!");
            // ここに追加のアクションを記述
        }
    }

    const timer = setInterval(countdown, 1000);
    countdown(); // 初回の表示更新
});

