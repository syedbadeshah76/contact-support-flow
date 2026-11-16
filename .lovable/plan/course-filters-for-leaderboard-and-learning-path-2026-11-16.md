# Course filters for Leaderboard and Learning Path

## What will change
- Add a consistent course dropdown to Leaderboard with an All Courses view and a course-specific view.
- Make the leaderboard rows and course context change when a course is selected, using the portal's existing learner sample data where course-specific live rankings are unavailable.
- Add the same course dropdown to Learning Path. All Courses will show the active paths together; choosing a course will show that course's milestones and progress.
- Keep the current visual style and use the existing accessible Select control.

## Technical details
- Derive available course choices from existing course data and enrollment state.
- Keep the implementation in the two existing page files, with small local data helpers only if needed.
- Update `walkthrough.md` and verify both dropdown flows, relevant routes, and TypeScript/build diagnostics.
