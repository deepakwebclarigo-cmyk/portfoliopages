param([string]$Manifest='audit/rebrand/assets-before.json',[string]$Output='audit/rebrand/ocr-before.jsonl')
$ErrorActionPreference='Stop'
Add-Type -AssemblyName System.Runtime.WindowsRuntime
$null=[Windows.Storage.StorageFile,Windows.Storage,ContentType=WindowsRuntime]
$null=[Windows.Graphics.Imaging.BitmapDecoder,Windows.Foundation,ContentType=WindowsRuntime]
$null=[Windows.Graphics.Imaging.SoftwareBitmap,Windows.Foundation,ContentType=WindowsRuntime]
$null=[Windows.Media.Ocr.OcrEngine,Windows.Foundation,ContentType=WindowsRuntime]
$null=[Windows.Globalization.Language,Windows.Globalization,ContentType=WindowsRuntime]
$asTask=[System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { $_.Name -eq 'AsTask' -and $_.IsGenericMethod -and $_.GetParameters().Count -eq 1 } | Select-Object -First 1
function Await-WinRT($Operation,[Type]$ResultType){
 $task=$asTask.MakeGenericMethod($ResultType).Invoke($null,@($Operation));$task.Wait();return $task.Result
}
$engine=[Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage([Windows.Globalization.Language]::new('en-US'))
if(-not $engine){throw 'English OCR unavailable.'}
$rows=Get-Content -LiteralPath $Manifest -Raw -Encoding UTF8 | ConvertFrom-Json
$completed=@{}
if(Test-Path -LiteralPath $Output){Get-Content -LiteralPath $Output -Encoding UTF8 | ForEach-Object {if($_){$record=$_ | ConvertFrom-Json;$completed[$record.id]=$true}}}
$encoding=New-Object System.Text.UTF8Encoding($false)
$outputPath=[System.IO.Path]::GetFullPath((Join-Path (Get-Location) $Output))
foreach($row in $rows){
 if($completed.ContainsKey($row.id)){continue}
 $file=Await-WinRT ([Windows.Storage.StorageFile]::GetFileFromPathAsync($row.png)) ([Windows.Storage.StorageFile])
 $stream=Await-WinRT ($file.OpenAsync([Windows.Storage.FileAccessMode]::Read)) ([Windows.Storage.Streams.IRandomAccessStream])
 $decoder=Await-WinRT ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder])
 $bitmap=Await-WinRT ($decoder.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
 $result=Await-WinRT ($engine.RecognizeAsync($bitmap)) ([Windows.Media.Ocr.OcrResult])
 $lines=@($result.Lines | ForEach-Object {@{text=$_.Text;words=@($_.Words | ForEach-Object {@{text=$_.Text;x=$_.BoundingRect.X/$row.scale;y=$_.BoundingRect.Y/$row.scale;w=$_.BoundingRect.Width/$row.scale;h=$_.BoundingRect.Height/$row.scale}})}})
 $record=@{id=$row.id;slug=$row.slug;text=$result.Text;angle=$result.TextAngle;lines=$lines}
 [System.IO.File]::AppendAllText($outputPath,(($record | ConvertTo-Json -Depth 8 -Compress)+"`n"),$encoding)
 $bitmap.Dispose();$stream.Dispose();Write-Output ($row.id+' '+$row.slug+' ('+$lines.Count+' lines)')
}
