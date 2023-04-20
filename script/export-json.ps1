$data = "C:\atari-monk\Code\js-notes-json\src\json-v2\"
$appData = "C:\atari-monk\Code\js-notes-templated\src\json\*"
Copy-Item -Path $appData -Destination $data -Recurse -Force
