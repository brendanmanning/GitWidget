

<?php

require 'config.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

function graphql() {

    // Generated by curl-to-PHP: http://incarnate.github.io/curl-to-php/
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://api.github.com/graphql");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, " \n {  \"query\": \"query { viewer { name login avatarUrl bio repositories(first: 100) { totalCount nodes() { isPrivate name updatedAt url viewerHasStarred description primaryLanguage { id name }}}}}\"}");
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch,CURLOPT_USERAGENT,'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13');


$headers = array();
$headers[] = "Authorization: bearer " . GITHUB_BEARER;
$headers[] = "Content-Type: application/x-www-form-urlencoded";
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$result = curl_exec($ch);

$result = json_decode($result);
$result = (array) $result;

echo json_encode($result['data']->viewer);

if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
}
curl_close ($ch);
}

graphql();

?>