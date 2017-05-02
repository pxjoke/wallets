*** Settings ***
Documentation     A resource file with reusable keywords and variables.
...
...               The system specific keywords created here form our own
...               domain specific language. They utilize keywords provided
...               by the imported Selenium2Library.
Library           Selenium2Library

*** Variables ***
${SERVER}         localhost:3333
${BROWSER}        Chrome
${DELAY}          0
${VALID USER}     pxjoke@gmail.com
${VALID PASSWORD}    12345
${LOGIN URL}      http://${SERVER}/login
${WELCOME URL}    http://${SERVER}/
${WALLETS URL}    http://${SERVER}/wallets

*** Keywords ***
Open Browser To Login Page
    Open Browser    ${LOGIN URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}
    Login Page Should Be Open

Login Page Should Be Open
    Title Should Be    Login Page

Go To Login Page
    Go To    ${LOGIN URL}
    Login Page Should Be Open

Input Username
    [Arguments]    ${username}
    Input Text    inputName    ${username}

Input Email
    [Arguments]    ${email}
    Input Text    loginEmail    ${email}

Input Password
    [Arguments]    ${password}
    Input Text    loginPassword    ${password}

Submit Credentials
    Click Button    loginSubmit

Welcome Page Should Be Open
    Location Should Be    ${WELCOME URL}
    Title Should Be    Welcome Page

Wallets Page Should Be Open
    Location Should Be    ${WALLETS URL}
    Title Should Be    Wallets