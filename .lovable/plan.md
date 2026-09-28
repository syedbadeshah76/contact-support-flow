# Playful Neo-Pop Quiz Experience

## Build
- Redesign the active quiz into a spacious, high-energy challenge screen using the selected bold outlined visual direction.
- Add a friendly animated mascot, quiz status, XP and streak cues, a visible countdown timer, and a clear progress track.
- Present four stable answer tiles with keyboard access and distinct idle, selected, correct, and incorrect feedback.
- Preserve scoring, saved best scores, retry, completion, and close behavior.
- Make the experience adapt cleanly from desktop to mobile without overlaps or clipped content.

## Technical details
- Keep the existing React state and EDVANZ design tokens; extend semantic tokens only where the selected style needs them.
- Implement timer cleanup and automatic question handling safely within the quiz component.
- Use the existing design-system buttons and dialog primitives.
- Verify the main quiz flow in the preview at desktop and mobile sizes, then update the project walkthrough.
