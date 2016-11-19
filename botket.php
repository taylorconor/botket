<?

if (count($argv) != 3 || !filter_var($argv[2], FILTER_VALIDATE_EMAIL)) {
  echo "Usage: " . $argv[0] . " [query] [email]\n";
  exit();
}

$filename = "count.txt";
$email = $argv[2];
$contents = file_get_contents("count.txt");
$prev_count = 0;
if ($contents) {
  $prev_count = trim($contents);
}

$query = str_replace(' ', '', $argv[1]);
$readable_query = str_replace('+', ' ', $query);
$count = exec("phantomjs scrape.js " . $query); 

$success = true;
if ($count > $prev_count) {
  $success = mail($email,
       "BOTKET: " . $readable_query,
       "New items on Blocket!\n\nhttps://www.blocket.se/stockholm?q=".$query);
}

if ($success) {
  file_put_contents($filename, "" . $count);
}

?>
