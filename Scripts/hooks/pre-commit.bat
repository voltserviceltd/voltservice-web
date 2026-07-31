@echo off
REM Git pre-commit hook to run before committing changes.
bash Scripts/tools/pre_commit.sh
if %errorlevel% neq 0 (
    echo Pre-commit checks failed. Commit aborted.
    exit /b %errorlevel%
)