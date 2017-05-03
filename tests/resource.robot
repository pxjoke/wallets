*** Settings ***
Documentation     A resource file with reusable keywords and variables.
...
...               The system specific keywords created here form our own
...               domain specific language. They utilize keywords provided
...               by the imported Selenium2Library.
Library           Selenium2Library
Library           BuiltIn
Library           String
*** Variables ***
${SERVER}               localhost:3333
${BROWSER}              Chrome
${DELAY}                0
${VALID USER}           pxjoke@gmail.com
${VALID PASSWORD}       12345
${LOGIN URL}            http://${SERVER}/login
${LOGOUT URL}            http://${SERVER}/logout
${WELCOME URL}          http://${SERVER}/
${WALLETS URL}          http://${SERVER}/wallets
${NEW_WALLET URL}       http://${SERVER}/new-wallet
${REGISTER URL}         http://${SERVER}/register

*** Keywords ***
Open Browser To Login Page
    Open Browser    ${LOGIN URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}
    Login Page Should Be Open

Open Browser To Register Page
    Open Browser    ${REGISTER URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}


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

Valid Login
    Open Browser To Login Page
    Input Email    pxjoke@gmail.com
    Input Password    12345
    Submit Credentials

Add Wallet
    [Arguments]    ${name}      ${balance}
    Go To                       ${NEW_WALLET URL}
    Input Text                  walletName                  ${name}
    Input Text                  walletBalance               ${balance}
    Click Button                Add

Add Wallet With Transaction
    [Arguments]    ${type}      ${value}                    ${comment}
    ${RName}                    Generate Random String      8
    Add Wallet                  ${RName}                    1500
    Click Link                  /wallets/${RName}
    Click Link                  New Transaction
    Select From List By Label   transactionOperation        ${type}
    Input Text                  transactionBalance          ${value}
    Input Text                  transactionComment          ${comment}
    Click Button                Add