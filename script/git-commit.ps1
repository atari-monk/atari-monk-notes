param (
  [string]$commitMessage
)

$repoPath = "C:\atari-monk\Code\js-notes-templated"
$scriptPath = "C:\atari-monk\Code\js-notes-templated\script"

Set-Location $repoPath

# Stage all files
git add -- . :!src\js\config.js
git commit -m $commitMessage
git stash push -- src\js\config.js
git push
git stash pop

Set-Location $scriptPath

Write-Output "Git commit complete."
