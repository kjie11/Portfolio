# Detail Behaviors

- Interaction model: project cards are click and keyboard driven; the detail itself is document-scroll driven.
- Project entry: click, Enter, or Space on any existing `[data-rq-detail-project]` trigger opens the matching cloned detail and scrolls to the top.
- Return: the top `Back to Index`, `All Projects`, and footer `All projects` controls return to the preserved home panel and restore focus to the trigger.
- Previous/next: footer navigation follows the creative preview's 19-page order and renders the selected project in place.
- Desktop facts: sticky at `top: 24px`; computed position is `sticky` at 1440px.
- Mobile facts: joins document flow; computed position is `static` at 390px.
- Back control: background fills from 0 to 100 percent over 240ms using `cubic-bezier(0.16, 1, 0.3, 1)` and reverses text color. Reduced motion removes the transition.
- Media: source videos keep native controls plus autoplay, muted, loop, and playsinline. Images retain their source alt text.
- Responsive: two-column content/facts layout above 900px, one column at 900px and below; footer navigation becomes two columns below 560px.
- Focus: all controls retain visible 2px outlines with 4px offset.

