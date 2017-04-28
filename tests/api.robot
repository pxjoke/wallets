*** Settings ***
Library  Collections
Library  String
Library  RequestsLibrary
Library  OperatingSystem

*** Test Cases ***
Get Requests
    [Tags]  get
    Create Session  wallets  http://localhost:3333
    ${resp}=     Get Request  wallets  /wallets
    Should Be Equal As Strings  ${resp.status_code}  200
    ${jsondata}=  To Json  ${resp.content}