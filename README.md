# Interactive_Form
Interactive form with input validation in Vanilla JS

This form allows a user to register for a Full Stack Conference.
Upon page load, the first input field has the focus state.
If user selects "Other" from Job Role options, a text field appears.
Color options only show after user selects a t-shirt design.
Conference cost updates dynamically as user selects activities.
Form validation for required input fields (name, email, activity selection, payment)
is executed both in real-time and upon form submission.

Accessibility Focus Features
* Makes focus states of activity selection obvious to all users 
    Adds and removes focus class from selected activity checkbox
* Makes form validation errors obvious to all users
    Error messages appear in red and include exclamation icons
    Valid input messages appear in green and include check icons

Additional Features
* Prevention from Registering for Conflicting Activities
    Script dynamically disables/enables activity options in real-time as
    user makes selections.
* Real-time Error Messaging:
    Name, Email, and Credit Card input fields listen for the blur event
    and run appropriate validation helper methods to alert the user about
    validation errors before form submission.
* Conditional Error Messaging:
    Name, Email, and Credit Card fields update hints dynamically
    in response to user input. 
    Users are notified in real-time when 
        - any of the visited fields are empty
        - the name field contains only whitespace, 
        - email is missing an "@" symbol
        - email does not end in ".com"
        - email and/or credit card fields are not formatted correctly
    