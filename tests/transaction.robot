*** Settings ***
Test Setup        Valid Login
Test Teardown    Close Browser
Resource          resource.robot

*** Test Cases ***
User Can Open New Transaction Page
    ${RName}                    Generate Random String      8
    Go To                       ${NEW_WALLET URL}
    Input Text                  walletName                  ${RName}
    Input Text                  walletBalance               1500
    Click Button                Add
    Title Should Be             Wallets
    Page Should Contain         ${RName}

User Can Add Transacion
    ${RName}                        Generate Random String      8
    Add Wallet                      ${RName}                    1500
    Click Link                      /wallets/${RName}
    Title Should Be                 Transactions
    Click Link                      New Transaction
    Title Should Be                 New Transaction
    Select From List By Label       transactionOperation        income
    Input Text                      transactionBalance          1500
    Input Text                      transactionComment          Hello world
    Click Button                    Add
    Title Should Be                 Transactions
    Element Should Contain          css=.list-group-item        1500

Income Transaction Should Increase Balance
    Add Wallet With Transaction     income             1500    Hello
    Element Should Contain          walletBallance     3000

Outcome Transaction Should Decrease Balance
    Add Wallet With Transaction     outcome            500    Hello
    Element Should Contain          walletBallance     1000


