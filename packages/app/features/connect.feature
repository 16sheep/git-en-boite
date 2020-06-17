Feature: Connect

  The first step to be able to work with a remote repository is to connect to it.

  You supply a Git HTTP URL and we take care of connecting it up.

  Depending on the size of your repo, this may take some time.

  @wip
  Scenario: Connection fails due to bad URL
    When someone tries to connect a repo to a bad URL
    And the repo has synchronised
    Then the repo should have a connection status of "failed"