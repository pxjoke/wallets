*** Settings ***
Test Setup          Open Browser To Register Page
Test Teardown       Close Browser
Resource            resource.robot

*** Test Cases ***
Valid Register
    ${RName}            Generate Random String      8
    Go To               ${REGISTER URL}
    Title Should Be     Registration
    Input Text          inputName                   ${RName}
    Input Text          inputEmail                  ${RName}@example.com
    Input Text          inputPassword               123
    Click Button        Sign Up
    Title Should Be     Login Page
    Input Text          loginEmail                  ${RName}@example.com
    Input Text          loginPassword               123
    Click Button        Sign In
    Title Should Be     Wallets
