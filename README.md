# Easy Life Assist

Build a polished, fully responsive accessibility-first web application called "EASYLIFE" 

— a digital assistance platform for elderly users (60+).

Tagline: "Technology made simpler, safer, and more human."

PRIORITY: This is NOT a generic modern dashboard with bigger fonts. Every design 

decision must come from real elderly pain points: small text/buttons, fear of mistakes, 

confusing tech terms, difficulty with multi-step processes, and slow/limited internet.

DESIGN PHILOSOPHY:

- One clear primary action per screen

- Never rely on icons alone — always pair icon + text label

- Calm, trustworthy, professional tone — never childish or cartoon-like

- Consistent navigation, no hamburger menus, no hidden functions

- Minimal animations, no visual distractions

TYPOGRAPHY & TOUCH TARGETS:

- Body text: minimum 18px, important text: 22px+

- Primary buttons: 24px+ text, minimum 60px height (64-72px preferred)

- Headings: 28-40px

- Generous line height and spacing between all elements

COLOR & CONTRAST:

- Primary: calm accessible blue

- Background: warm white/light neutral

- Text: dark navy/charcoal (high contrast, never light gray)

- RED reserved only for Emergency/SOS

- Rounded cards, soft shadows, no gradients, no glassmorphism

GLOBAL ACCESSIBILITY TOOLBAR (persistent on every page):

- Text size slider (100%–300%), large and easy to drag, shows current %

- "🔊 Read Aloud" button using browser SpeechSynthesis API (graceful fallback if unsupported)

- Microphone "Speak" button using Web Speech API (graceful fallback if unsupported)

- High Contrast toggle (immediate visible change)

- Language selector: English / Tamil (structure for easy expansion)

HOME PAGE:

Header: "Good morning" / "How can we help you today?"

Four large primary action cards:

1. 💊 Reminders — "Medicines & appointments"

2. 👨‍👩‍👧 Call Family — "Contact someone you trust"

3. 🆘 Emergency SOS — "Get emergency help"

4. 💡 Explain This — "Understand difficult terms"

Small "Today's important things" section below (e.g., 8:00 AM Take morning medicine ✓ Completed)

NAVIGATION:

Persistent bottom nav bar with icon + text label on every item:

🏠 Home | 💊 Reminders | 👨‍👩‍👧 Family | 💡 Explain | ⚙ Settings

Always show current page clearly. Add a visible "← Back" button on secondary pages.

TECHNICAL: Semantic HTML, ARIA labels, full keyboard navigation, visible focus states, 

responsive for mobile/tablet/desktop, no backend needed yet — use mock data.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://easylife-assist.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/75c7870c-d0dd-418d-96e8-32af904eed76).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
