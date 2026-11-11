// The pinned cards at the top of the home page: what's happening now.
//
// - Set `show: false` to hide a card, or delete it.
// - `until` (optional, YYYY-MM-DD) hides the card automatically after that day.
//   The site is static, so this takes effect at the next build/deploy after that date.
// - `live: true` gives the card the orange "on now" treatment.
// - `short` (optional) is a shorter text used on phones, where the cards sit side by side.
// - `brand: 'steam'` dresses the card in Steam's colours with the Steam logo.
//
// When ESHRAQ launches on Steam, change the second card to something like:
//   { brand: 'steam', status: 'Out now', title: 'ESHRAQ on Steam, in Early Access',
//     text: 'Play it now.', link: { href: 'https://store.steampowered.com/app/…', label: 'Open on Steam' } }

export interface Pinned {
  show?: boolean;
  until?: string;
  live?: boolean;
  brand?: 'steam';
  status: string;
  title: string;
  text: string;
  short?: string;
  link: { href: string; label: string };
}

export const pinned: Pinned[] = [
  {
    live: true,
    until: '2026-11-22',
    status: 'On view now',
    title: 'ESHRAQ at IDFA DocLab',
    text: 'De Brakke Grond, Amsterdam · 13–22 November · Free entry with reservation',
    short: '13–22 Nov · De Brakke Grond, Amsterdam',
    link: { href: '/2026-11-09-ESHRAQ-at-IDFA-DocLab/#visiting', label: 'Visiting details' },
  },
  {
    brand: 'steam',
    status: 'Coming soon',
    title: 'ESHRAQ on Steam, in Early Access',
    text: "The Steam page isn't public yet. Leave your email to hear when it is.",
    short: 'Hear first when the page opens.',
    link: { href: '/stay/', label: 'Get notified' },
  },
];
