@REM ----------------------------------------------------------------------------
@REM Maven Startup Script for Windows
@REM ----------------------------------------------------------------------------
@echo off
setlocal

set "DIRNAME=%~dp0"
if "%DIRNAME%" == "" set "DIRNAME=."

if "%JAVA_HOME%" == "" (
    if exist "D:\Program Files\Java\jdk-21" (
        set "JAVA_HOME=D:\Program Files\Java\jdk-21"
    )
)

if not "%JAVA_HOME%" == "" (
    set "PATH=%JAVA_HOME%\bin;%PATH%"
)

set "MAVEN_DIR=%USERPROFILE%\.m2\wrapper\dists\apache-maven-3.9.9"
set "MAVEN_BIN=%MAVEN_DIR%\apache-maven-3.9.9\bin\mvn.cmd"

if not exist "%MAVEN_BIN%" (
    echo Downloading Apache Maven 3.9.9...
    if not exist "%USERPROFILE%\.m2\wrapper\dists" mkdir "%USERPROFILE%\.m2\wrapper\dists"
    powershell -NoProfile -ExecutionPolicy Bypass -Command ^
        "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; " ^
        "$zip = '%USERPROFILE%\.m2\wrapper\dists\maven.zip'; " ^
        "Invoke-WebRequest -Uri 'https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.9.9/apache-maven-3.9.9-bin.zip' -OutFile $zip; " ^
        "Expand-Archive -Path $zip -DestinationPath '%MAVEN_DIR%' -Force; " ^
        "Remove-Item $zip -Force"
)

if exist "%MAVEN_BIN%" (
    call "%MAVEN_BIN%" %*
) else (
    echo ERROR: Could not find or download Maven.
    exit /b 1
)

