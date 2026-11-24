## Design note

**What the visitor wants:** The visitor wants to read a fun fact, see where it came from and be able to choose either a short or detailed view.

**What happens when they click "Get a fact":**
1. The button's click listener calls `loadFact()`.
2. `loadFact()` disables the button, sends a `fetch()` GET request to the Useless Facts API.
3. The JSON response is checked (`response.ok`, and that `text` is a string).
4. The fact is written into the page with `textContent`, and the source line, status, and button label updates. The finally block re-enables the button.

**While waiting:** The button says "Loading..." (and is disabled) and the status says "Loading a new fact..."

**On success:** A new fact will appear, a source line shows where it came from (source:djtech.net), and the status is shown ("Loaded fact #"). When visitor engages with "switch to compact view", it toggles the data-compact attribute and the source line will be hidden. The choice is saved in localStorage so if visitors refresh, it will stay compact view and vice versa if in expanded view.

**On failure:** When there is a problem with the request, it is caught by the 'catch' block in `loadFact()`. The `role="status"` element allows screen readers to announce the change, "Could not load a fact. Check your connection and try again." The button label changes to "Try again." The 'finally' block re-enables the button, so it never stays on "Loading..." The previous fact and source will remain on the page and the error is logged to the console for debugging. When clicking "Try again," it runs the same request without reloading the page. If successful, the error message is cleared.

## SSG exercise
Located in `ssg-exercise/`. Preview the home page (`/`) and the contact page (`/contact/`).
Install, build, and preview commands are in `ssg-exercise/README.md`.