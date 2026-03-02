<?php
$zip = new ZipArchive;
$res = $zip->open('app_build.zip');
if ($res === TRUE) {
  $zip->extractTo('./');
  $zip->close();
  echo 'OK';
} else {
  echo 'Failed';
}
unlink(__FILE__);
?>
