<#
PowerShell helper to initialize, commit, and push this project to a GitHub repo.
Usage examples:
  ./push-to-github.ps1
  ./push-to-github.ps1 -RemoteUrl "https://github.com/you/your-repo.git" -CommitMessage "Initial commit"
  ./push-to-github.ps1 -RemoteUrl "https://github.com/you/your-repo.git" -Force

Notes:
 - Git must be installed and available in PATH: https://git-scm.com/downloads
 - Authenticate with GitHub (PAT or gh CLI). If you use `gh` run `gh auth login` first.
 - The script is interactive when it needs to overwrite an existing remote.
#>

param(
    [string]$RemoteUrl = "https://github.com/Sankalpkumarsingh1234/Bhel",
    [string]$CommitMessage = "Initial commit",
    [switch]$Force
)

function Abort($msg) {
    Write-Host "ERROR: $msg" -ForegroundColor Red
    exit 1
}

# Check for Git
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Abort "Git is not installed or not found in PATH. Install Git from https://git-scm.com/downloads and retry."
}

Write-Host "Using repository root: $(Get-Location)"
Write-Host "Remote target: $RemoteUrl"

# Initialize repo if missing
if (-not (Test-Path ".git")) {
    Write-Host "No .git found — initializing repository (branch: main)"
    git init -b main || Abort "git init failed"
} else {
    Write-Host ".git present — using existing repository"
}

# Stage all files
Write-Host "Staging files..."
git add . || Abort "git add failed"

# Commit
Write-Host "Creating commit..."
$commitResult = git commit -m "$CommitMessage" 2>&1
if ($LASTEXITCODE -ne 0) {
    if ($commitResult -match "nothing to commit") {
        Write-Host "Nothing to commit (no changes)."
    } else {
        Write-Host $commitResult
        # if there's already a commit, continue
        if ($commitResult -match "On branch" -or $commitResult -match "already exists") {
            Write-Host "Continuing despite commit failure..."
        } else {
            Abort "git commit failed"
        }
    }
} else {
    Write-Host "Commit created."
}

# Configure or verify remote
$existingRemote = git remote get-url origin 2>$null
if ($existingRemote) {
    Write-Host "Existing 'origin' remote found: $existingRemote"
    if ($existingRemote -ne $RemoteUrl) {
        if ($Force) {
            Write-Host "Overwriting existing remote origin with $RemoteUrl"
            git remote set-url origin $RemoteUrl || Abort "Failed to set remote URL"
        } else {
            $answer = Read-Host "Remote 'origin' differs. Overwrite it with $RemoteUrl? (y/n)"
            if ($answer -match '^[Yy]') {
                git remote set-url origin $RemoteUrl || Abort "Failed to set remote URL"
            } else {
                Write-Host "Leaving existing remote as-is. Will attempt to push to it."
            }
        }
    } else {
        Write-Host "Remote 'origin' already points to $RemoteUrl"
    }
} else {
    Write-Host "Adding remote origin -> $RemoteUrl"
    git remote add origin $RemoteUrl || Abort "git remote add failed"
}

# Push
Write-Host "Pushing branch 'main' to origin..."
# Try a normal push first
git push -u origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "Push failed. You may need to authenticate or pull remote changes first."
    Write-Host "If remote has existing commits, run: git pull --rebase origin main && git push -u origin main"
    Write-Host "If you use GitHub CLI: run 'gh auth login' to authenticate interactively."
    exit $LASTEXITCODE
}

Write-Host "Push succeeded!"
Write-Host "Repository URL: $RemoteUrl"
Write-Host "Done." -ForegroundColor Green
