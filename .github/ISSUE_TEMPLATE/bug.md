---
name: Bug Report
about: A bug has occurred
description: File a bug report
title: "[<App name>]::bug: "
labels: ["bug", "QA/UAT"]
projects: []
assignees:
  - AreWiv
body:
  - type: markdown
    attributes:
      value: |
        Thanks for taking the time to fill out this bug report!
  - type: textarea
    id: what-happened
    attributes:
      label: What happened?
      description: Also tell us, what did you expect to happen?
      placeholder: Tell us what you see!
      value: "A bug happened!"
    validations:
      required: true
  - type: dropdown
    id: environment
    attributes:
      label: Environment
      description: What environment did this bug occur in
      options:
        - Test (Default)
        - Prod (Prod)
      default: 0
    validations:
      required: true
  - type: textarea
    id: logs
    attributes:
      label: Relevant log output
      description: Please copy and paste any relevant log output. This will be automatically formatted into code, so no need for backticks.
      render: shell
  - type: textarea
    id: verify-steps
    attributes:
      label: Verification steps
      description: How to verify that this bug has been fixed?
      placeholder: Tell us how to check if the bug has been fixed!
      value: "A bug happened!"
    validations:
      required: true
---
