<?php
/**
 * Contact form endpoint. POST-only.
 * Accepts JSON or url-encoded body with fields:
 *   firstName, lastName, email, phone, country (optional), message
 * Returns JSON {ok: bool, error?: string}.
 *
 * Email goes to RECIPIENT below.
 */

header('Content-Type: application/json; charset=utf-8');

// Only POST + same-origin
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$referer = $_SERVER['HTTP_REFERER'] ?? '';
$allowed_hosts = ['nobell.com', 'www.nobell.com'];
$host_ok = false;
foreach ($allowed_hosts as $h) {
    if (strpos($origin, "://$h") !== false || strpos($referer, "://$h/") !== false) {
        $host_ok = true; break;
    }
}
if (!$host_ok && !(isset($_SERVER['HTTP_HOST']) && in_array($_SERVER['HTTP_HOST'], $allowed_hosts, true))) {
    http_response_code(403);
    echo json_encode(['ok' => false, 'error' => 'forbidden_origin']);
    exit;
}

// Parse body — either JSON or form-encoded
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) $data = $_POST;

$first   = trim($data['firstName'] ?? '');
$last    = trim($data['lastName'] ?? '');
$email   = trim($data['email'] ?? '');
$phone   = trim($data['phone'] ?? '');
$country = trim($data['country'] ?? '');
$msg     = trim($data['message'] ?? '');

// Validation mirroring the client
$errors = [];
if ($first === '')               $errors[] = 'firstName';
if ($last === '')                $errors[] = 'lastName';
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || !preg_match('/^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/', $email))
                                  $errors[] = 'email';
if ($phone === '' || !preg_match('/^[+]?[0-9\s\-\(\)]{5,}$/', $phone))
                                  $errors[] = 'phone';
if ($msg === '')                  $errors[] = 'message';

if ($errors) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'invalid', 'fields' => $errors]);
    exit;
}

// Length guard
if (mb_strlen($msg) > 5000) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'message_too_long']);
    exit;
}

// Sanitize header inputs (block CR/LF injection)
foreach ([$first, $last, $email, $phone, $country] as $v) {
    if (preg_match('/[\r\n]/', $v)) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'invalid_header']);
        exit;
    }
}

$RECIPIENT = 'alex_nord@nobell.com, myapsite@gmail.com';

$subject = "Заявка с сайта Nobell от $first $last";
$body  = "Заявка с контактной формы nobell.com\n";
$body .= str_repeat('-', 50) . "\n";
$body .= "Имя:      $first $last\n";
$body .= "Email:    $email\n";
$body .= "Телефон:  " . ($country ? "$country " : '') . $phone . "\n";
$body .= "\nСообщение:\n$msg\n";
$body .= "\n" . str_repeat('-', 50) . "\n";
$body .= "User-Agent: " . ($_SERVER['HTTP_USER_AGENT'] ?? '-') . "\n";
$body .= "IP: " . ($_SERVER['REMOTE_ADDR'] ?? '-') . "\n";
$body .= "Time: " . date('Y-m-d H:i:s') . " UTC\n";

$headers  = "MIME-Version: 1.0\r\n";
$headers .= "From: Nobell Contact Form <noreply@nobell.com>\r\n";
$headers .= "Reply-To: $first $last <$email>\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "Content-Transfer-Encoding: base64\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

$body_encoded = chunk_split(base64_encode($body));

$ok = @mail($RECIPIENT, "=?UTF-8?B?" . base64_encode($subject) . "?=", $body_encoded, $headers);

if (!$ok) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'mail_failed']);
    exit;
}

echo json_encode(['ok' => true]);
