# Publica el proyecto en un repositorio privado de la cuenta autenticada.
$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
foreach ($tool in @('git','gh')) {
    if (!(Get-Command $tool -ErrorAction SilentlyContinue)) {throw "Se necesita $tool en el equipo."}
}
gh auth status
if ($LASTEXITCODE -ne 0) {gh auth login --web --git-protocol https}
if ($LASTEXITCODE -ne 0) {throw 'Falta iniciar sesión en GitHub.'}
if (!(Test-Path '.git')) {
    git init -b main
    git add .
    git commit -m 'Interfaces y gestos de Nova Market'
    if ($LASTEXITCODE -ne 0) {throw 'No se pudo guardar la revisión local.'}
}
if ((git remote) -notcontains 'origin') {
    gh repo create nova-market-semana-3 --private --source . --remote origin
    if ($LASTEXITCODE -ne 0) {throw 'No se pudo crear el repositorio. Revise el nombre y los permisos.'}
}
gh auth setup-git
git push -u origin HEAD
if ($LASTEXITCODE -ne 0) {throw 'No se pudo publicar la revisión.'}
$url = gh repo view --json url --jq .url
if ($LASTEXITCODE -ne 0 -or $url -notmatch '^https://github\.com/') {throw 'No se pudo verificar la URL.'}
Set-Content ENLACE_GITHUB.txt $url
git add ENLACE_GITHUB.txt
git diff --cached --quiet
if ($LASTEXITCODE -eq 1) {
    git commit -m 'Registrar el enlace del repositorio'
    if ($LASTEXITCODE -ne 0) {throw 'No se pudo registrar el enlace.'}
    git push
    if ($LASTEXITCODE -ne 0) {throw 'Falta subir el enlace.'}
}
git archive --format=zip -o ../AP3_Diaz_Zaury.zip HEAD
Write-Host $url
