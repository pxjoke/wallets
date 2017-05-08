*** Settings ***
Test Setup        Valid Login
Suite Teardown    Close Browser
Resource          ../../tests/res/resource.robot

*** Test Cases ***
User Can Delete Wallet
    ${RName}                        Generate Random String      8
    Add Wallet                      ${RName}                    1500
    Go To                           ${WALLETS URL}
    Click Link                      /wallets/${RName}/delete
    Title Should Be                 Wallets
    Page Should Not Contain         ${RName}

