*** Settings ***
Documentation     A test suite with a single test for valid login.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Resource          ../../tests/res/resource.robot

*** Test Cases ***
Valid Login
    Open Browser To Login Page
    Input Email    pxjoke@gmail.com
    Input Password    12345
    Submit Credentials
    Wallets Page Should Be Open
    [Teardown]    Close Browser

Valid Logout
    Valid Login
    Go To               ${LOGOUT URL}
    Title Should Be     Welcome Page
    Go To               ${WALLETS URL}
    Title Should Be     Login Page
    [Teardown]    Close Browser