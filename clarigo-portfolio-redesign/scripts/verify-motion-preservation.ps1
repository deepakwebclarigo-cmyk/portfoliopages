$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem
$portfolioRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$checkpoint = [System.IO.Compression.ZipFile]::OpenRead((Join-Path $portfolioRoot 'audit/motion/source-before.zip'))
$checked = @()
$failures = @()
try {
  foreach ($entry in $checkpoint.Entries) {
    if ($entry.FullName -notlike 'lib\*' -and $entry.FullName -notin @('package.json', 'package-lock.json', 'next.config.ts')) { continue }
    if (-not $entry.Name) { continue }
    $stream = $entry.Open()
    $algorithm = [System.Security.Cryptography.SHA256]::Create()
    try { $original = [BitConverter]::ToString($algorithm.ComputeHash($stream)).Replace('-', '').ToLowerInvariant() }
    finally { $stream.Dispose(); $algorithm.Dispose() }
    $current = (Get-FileHash -LiteralPath (Join-Path $portfolioRoot $entry.FullName) -Algorithm SHA256).Hash.ToLowerInvariant()
    $checked += [PSCustomObject]@{ file = $entry.FullName.Replace('\', '/'); unchanged = $original -eq $current }
    if ($original -ne $current) { $failures += $entry.FullName }
  }
} finally { $checkpoint.Dispose() }
$inventory = Get-Content -Raw -LiteralPath (Join-Path $portfolioRoot 'lib/project-inventory.json') | ConvertFrom-Json
$manifest = Get-Content -Raw -LiteralPath (Join-Path $portfolioRoot 'lib/project-assets.json') | ConvertFrom-Json
$selected = @{}
foreach ($project in $manifest.PSObject.Properties) {
  foreach ($asset in @($project.Value.poster) + @($project.Value.images)) { $selected[$asset.src] = $asset }
}
foreach ($asset in $selected.Values) {
  $fileHash = (Get-FileHash -LiteralPath (Join-Path $portfolioRoot ('public' + $asset.src)) -Algorithm SHA256).Hash.ToLowerInvariant()
  if ($fileHash -ne $asset.sha256) { $failures += $asset.src }
}
$report = [PSCustomObject]@{
  projects = $inventory.Count; web = @($inventory | Where-Object kind -eq 'web').Count; mobile = @($inventory | Where-Object kind -eq 'mobile').Count
  checkpoint = 'audit/motion/source-before.zip'; unchangedSourceFiles = $checked
  selectedArtworkHashesVerified = $selected.Count; errors = $failures
}
$report | ConvertTo-Json -Depth 8 | Set-Content -Encoding UTF8 -LiteralPath (Join-Path $portfolioRoot 'audit/motion/preservation.json')
$report | ConvertTo-Json -Depth 3
if ($failures.Count) { exit 1 }
