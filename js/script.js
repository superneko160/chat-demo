document.addEventListener('DOMContentLoaded', () => {
    // 画面各要素
    let chatLog = document.getElementById('chat-log');
    let messageInput = document.getElementById('message-input');
    let sendButton = document.getElementById('send-button');

    // 送信ボタン押下時
    sendButton.addEventListener('click', () => {
        let message = messageInput.value;
        if (message.trim() !== '') {
            sendMessage(message);
            messageInput.value = '';  // メッセージ入力欄クリア
        }
    });

    // サーバにメッセージ送信
    const sendMessage = (message) => {
        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        // 受信メッセージがあれば表示
        request.onreadystatechange = () => {
            if (request.readyState === 4 && request.status === 200) {
                let response = JSON.parse(request.responseText);
                displayMessage(response.message);
            }
        };
        // メッセージ送信
        let data = 'message=' + encodeURIComponent(message);
        request.send(data);
    };

    // 画面にメッセージを表示
    const displayMessage = (message) => {
        // アイコンとメッセージ要素を包括する要素の作成
        let bundle = document.createElement("div");
        bundle.className = "bundle";
        // アイコン要素追加
        let icon = document.createElement('img');
        icon.src = "data/mujirushi-icon.png";
        icon.alt = "icon";
        icon.className = 'icon';
        // アイコン要素の追加
        bundle.appendChild(icon);
        // メッセージ要素追加
        let messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.textContent =  message;
        // メッセージ要素の追加
        bundle.appendChild(messageElement);
        // アイコンとメッセージ要素を包括する要素の追加
        chatLog.appendChild(bundle);
    };
});