Feature: Guidance Page - Before you Appeal
  As a PO on the appeal service
  I want prospective appellants to be aware of who the service is for
  So that only those who need to appeal through the new appeal service do so

  Scenario: AC1: Appellant navigates to next page
    Given the appellant is on the before you appeal page
    When the appellant navigates to the next page
    Then information about when you can appeal is provided

  Scenario Outline: AC2: Appellant selects <page> page from the Content list
    Given the appellant is on the before you appeal page
    When the appellant select a link from the content list: <page>
    Then the appellant is navigated to that page: <url>

    Examples:
      | page | url |
      | "When you can appeal" | "/when-you-can-appeal" |
      | "The stages of an appeal" | "/stage-of-an-appeal" |
      | "After you appeal" | "/after-you-appeal" |
      | "Start your appeal" | "/start-your-appeal" |