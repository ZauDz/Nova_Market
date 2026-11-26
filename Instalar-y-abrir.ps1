param([switch]$SoloInstalar)
$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
$module = Join-Path $PSScriptRoot 'node_modules/@ionic/core'
$entry = Join-Path $module 'dist/ionic/ionic.esm.js'
$archive = Join-Path $env:USERPROFILE 'Downloads/core-8.4.3.tgz'
if (Test-Path 'vendor/core-8.4.3.tgz') { $archive = (Resolve-Path 'vendor/core-8.4.3.tgz').Path }
if (!(Test-Path $archive)) {
    $copy = Get-ChildItem (Join-Path $env:USERPROFILE 'Downloads') -Filter 'core-8.4.3 (*).tgz' -File -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 1
    if ($copy) { $archive = $copy.FullName }
}
$expected = 'U9HdZ32bre6OKA5akJVmQMxNB8Art3Nqdn3s7m2W83I5NhLg9Tehaf8ua8jxPZtxCa1nuN7tUbzHmMCkcdqDTw=='
if (!(Test-Path $entry)) {
    if (!(Test-Path $archive) -and (Get-Command npm.cmd -ErrorAction SilentlyContinue)) {
        npm.cmd ci
        if ($LASTEXITCODE -ne 0) { Write-Host 'Intentando obtener la distribución oficial directamente.' }
    }
    if (!(Test-Path $entry)) {
        $temporary = !(Test-Path $archive)
        if ($temporary) { $archive = Join-Path $env:TEMP (([guid]::NewGuid()).ToString()+'.tgz') }
        try {
            if ($temporary) { Invoke-WebRequest 'https://registry.npmjs.org/@ionic/core/-/core-8.4.3.tgz' -UseBasicParsing -OutFile $archive }
            $hash = [Security.Cryptography.SHA512]::Create()
            $stream = [IO.File]::OpenRead($archive)
            try { $actual = [Convert]::ToBase64String($hash.ComputeHash($stream)) }
            finally { $stream.Dispose(); $hash.Dispose() }
            if ($actual -cne $expected) { throw 'El paquete no coincide con la integridad publicada para Ionic Core 8.4.3.' }
            New-Item -ItemType Directory -Force $module | Out-Null
            tar.exe -xzf $archive -C $module --strip-components=1
            if ($LASTEXITCODE -ne 0) { throw 'No se pudo extraer Ionic Core.' }
        } finally { if ($temporary -and (Test-Path $archive)) { Remove-Item -LiteralPath $archive } }
    }
}
if (!(Test-Path $entry)) { throw 'Falta ionic.esm.js.' }
Write-Host 'Ionic Core listo.'
if ($SoloInstalar) {return}
$node = (Get-Command node.exe -ErrorAction SilentlyContinue).Source
if (!$node) {
    $runtime = Get-AppxPackage -Name 'OpenAI.CodexPrimaryRuntime*' | Sort-Object Version -Descending | Select-Object -First 1
    if ($runtime) { $node = Join-Path $runtime.InstallLocation 'dependencies/node/bin/node.exe' }
}
if (!$node -or !(Test-Path $node)) { throw 'Se necesita Node.js LTS para servir el proyecto.' }
& $node server.cjs


