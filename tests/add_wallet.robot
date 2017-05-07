*** Settings ***
Test Setup        Valid Login
Test Teardown    Close Browser
Resource          res/resource.robot

*** Test Cases ***
User Open Add New Wallet
    Go To               ${WALLETS URL}
    Click Link          Add Wallet
    Title Should Be     Add new Wallet

User Can Add New Wallet
    ${RName}                    Generate Random String      8
    Go To                       ${NEW_WALLET URL}
    Input Text                  walletName                  ${RName}
    Input Text                  walletBalance               1500
    Click Button                Add
    Title Should Be             Wallets
    Page Should Contain         ${RName}

