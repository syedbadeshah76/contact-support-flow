# Notification popover

- The header bell opens a notification list with an unread count.
- Selecting a notification marks it read and opens its destination.
- Mark all as read updates the count; Clear all removes the list and shows an empty state.
- Read and cleared states persist after a refresh.

## Verification

- Browser checks confirmed the popover opens, all three notifications render, marking all read and clearing the list update the bell, and the cleared empty state survives refresh. Individual notifications navigate to their destination and retain read state after refresh. Desktop and mobile popovers rendered without page errors.
- `bunx tsgo --noEmit` completed with no errors; the latest preview build reported `build OK`.