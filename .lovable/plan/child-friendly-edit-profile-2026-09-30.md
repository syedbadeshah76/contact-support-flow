# Child-friendly Edit Profile

## Goal
Create a dedicated, polished Edit Profile screen where a learner can safely update personal details and preferences, then save or cancel with clear feedback.

## What will change
- Add an `/profile/edit` screen and connect the existing **Edit Profile** action to it.
- Present avatar choices, name, age, email, learning interests, and preferred subjects in clear, playful sections.
- Add a security section for password updates with show/hide controls and validation.
- Make **Save Changes** validate entries, persist profile and preference changes in this browser, show success feedback, and return to Profile.
- Make **Cancel** discard unsaved changes and return to Profile.
- Keep the layout accessible and comfortable on desktop, tablet, and mobile.

## Technical details
- Extend the existing app state profile shape so learner details persist through the current `kidzy-app-state-v1` storage flow.
- Use existing EDVANZ design tokens and shared form/button controls; add no new dependencies.
- Preserve compatibility with previously saved profile data by filling missing fields with defaults.
- Add inline error states for required fields, age, email, and password confirmation.

## Verification
- Check initial values, avatar and preference selection, validation errors, successful save, persistence after refresh, and Cancel behavior.
- Verify `/profile` and `/profile/edit` at desktop and mobile sizes.
- Run the project type check, confirm the preview build is healthy, and update the walkthrough.
