<?php
/* 
 * server on : php -S localhost:8000
 */
require_once 'codeinfo.php';

// メッセージ受信時、JSONファイルからランダムなメッセージを返す
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // サニタイジング
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);
    if ($message === null || $message === false) {
        echo json_encode(array('message' => 'Invalid message'));
        exit;
    }
    // ファイルの有無確認
    if (!file_exists(CodeInfo::RESPONSES_FILE)) {
        echo json_encode(array('message' => 'Responses file not found'));
        exit;
    }
    // ファイル取得
    $responses = json_decode(file_get_contents(CodeInfo::RESPONSES_FILE), true);
    if ($responses === null) {
        echo json_encode(array('message' => 'Error parsing responses file'));
        exit;
    }
    // 取得したデータからランダムにメッセージ返信
    $response = $responses["responses"][mt_rand(0, count($responses["responses"]) - 1)];
    $result = array('message' => $response);
    echo json_encode($result);
}