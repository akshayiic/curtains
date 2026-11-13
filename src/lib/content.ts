// Content adapted from the australianwindowcovering.com.au home page for demo purposes.

export const brand = {
  name: "Australian Window Covering",
  short: "AWC",
  phone: "0421 494 000",
  phoneAlt: "(03) 9034 4084",
  email: "sales@australianwindowcovering.com.au",
  address: "2/21 Paramount Boulevard, Cranbourne West VIC 3977",
};

export const hero = {
  title: "Elegant Shutters, Blinds & Curtains for Modern Living",
  subtitle:
    "Quality window coverings, measured and installed for comfort, style and efficiency across Melbourne.",
  image: "/images/custom-blinds-curtains-melbourne-home-hero.webp",
};

export const nav = [
  { label: "Studio", href: "#studio" },
  { label: "Collections", href: "#collections" },
  { label: "Why Us", href: "#why" },
  { label: "Process", href: "#process" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

export const stats = [
  { value: 5.2, suffix: "k+", label: "Projects completed", decimals: 1 },
  { value: 3.6, suffix: "k+", label: "Happy customers", decimals: 1 },
  { value: 7.9, suffix: "k+", label: "Roller blinds installed", decimals: 1 },
  { value: 6.4, suffix: "k+", label: "Shutters installed", decimals: 1 },
];

export type Product = { name: string; image: string; blurb: string };
export type Collection = { title: string; tagline: string; items: Product[] };

export const collections: Collection[] = [
  {
    title: "Curtains & Indoor",
    tagline: "Soft light, softer living",
    items: [
      { name: "Sheer Curtains", image: "/images/sheer-curtains-melbourne.webp", blurb: "Diffuse daylight while keeping your view." },
      { name: "Verishades", image: "/images/verishades-living-room.webp", blurb: "Soft vertical vanes that rotate and glide." },
      { name: "Sheer Drapes", image: "/images/sheer-curtains.webp", blurb: "Floor-to-ceiling flow for tall windows." },
    ],
  },
  {
    title: "Premium Blinds",
    tagline: "Precision light control",
    items: [
      { name: "Ziptrak Blinds", image: "/images/ziptrak-blinds-outdoor-patio.webp", blurb: "Turn your patio into an all-season room." },
      { name: "Roller Blinds", image: "/images/roller-blinds-living-room.webp", blurb: "Clean lines, blockout or light-filtering." },
      { name: "Shade Blinds", image: "/images/shade-blinds-melbourne.webp", blurb: "Cut glare without losing the outlook." },
      { name: "Roman Blinds", image: "/images/roman-blinds.webp", blurb: "Tailored folds with a classic finish." },
      { name: "Honeycomb Blinds", image: "/images/honeycomb-blinds.webp", blurb: "Cellular insulation for warmer winters." },
      { name: "Vertical Blinds", image: "/images/vertical-blinds.webp", blurb: "Ideal for sliding doors and wide spans." },
      { name: "Twin Blinds", image: "/images/twin-blinds.webp", blurb: "Day and night fabrics on one bracket." },
      { name: "Timber Venetians", image: "/images/timber-venetian-blinds.webp", blurb: "Natural warmth with tilting slats." },
    ],
  },
  {
    title: "Plantation Shutters",
    tagline: "Built to last a lifetime",
    items: [
      { name: "Aluminium Shutters", image: "/images/aluminium-shutters.webp", blurb: "Secure, weatherproof, low-maintenance." },
      { name: "PVC Shutters", image: "/images/pvc-shutters.webp", blurb: "Moisture-resistant for wet areas." },
      { name: "Timber Shutters", image: "/images/timber-shutters.webp", blurb: "Timeless craftsmanship in real wood." },
    ],
  },
];

export const whyUs = [
  { title: "20+ years of experience", text: "Two decades crafting premium custom window coverings for Melbourne homes." },
  { title: "Custom-made", text: "Every blind, shutter and curtain is made to measure for your windows." },
  { title: "Premium materials", text: "Fabrics and hardware sourced from trusted, leading brands." },
  { title: "Expert measure & install", text: "Free in-home consultation, then precise professional installation." },
];

export const process = [
  { step: "01", title: "Measure & Get Quote", text: "Pick your style and materials, then receive a free, no-obligation quote after we measure on site." },
  { step: "02", title: "Schedule & Install", text: "Our installers arrive on time with measurements ready and fit everything with care." },
  { step: "03", title: "Satisfaction Guarantee", text: "Products designed for lasting privacy, comfort and style — backed by our guarantee." },
];

export const partners = [
  "Wilson Fabrics",
  "Texstyle",
  "Louvolite",
  "Weatherwell Elite",
  "Rollease Acmeda",
  "Shaw Performance Fabrics",
];

// Short paraphrases of the themes in the site's 5-star reviews (not verbatim quotes).
export const reviews = [
  "Beautiful quality and a fair price — the whole house looks transformed.",
  "Our curtains arrived two weeks earlier than promised. Brilliant service.",
  "Sixth time using them for our properties. Reliable every single time.",
  "The consultant was patient, knowledgeable and never pushy.",
  "Installers were punctual, tidy and the shutters fit perfectly.",
  "Great range of fabrics and honest advice on what would suit each room.",
];

export const rating = { score: "5.0", count: 573 };

export const faqs = [
  {
    q: "Why choose Australian Window Covering?",
    a: "Over 20 years of local experience, premium materials from trusted brands, and a team that handles everything from free measure to final installation.",
  },
  {
    q: "Are your products custom-made?",
    a: "Yes. Every shutter, blind and curtain is made to measure for your specific windows, so the fit and finish are spot on.",
  },
  {
    q: "How do I choose the right window covering?",
    a: "Think about light control, privacy, insulation and the look you want. During the free consultation we bring samples and recommend options room by room.",
  },
  {
    q: "Do you offer a free measure and quote?",
    a: "Yes — free, no-obligation in-home measure and quote across Melbourne, including Clyde, Officer, Pakenham, Frankston and the Mornington Peninsula.",
  },
  {
    q: "How do I get started?",
    a: "Call us, send an email, or request a free quote online and we’ll book a time that suits you.",
  },
];

export const locations = ["Clyde", "Officer", "Pakenham", "Frankston", "Mornington Peninsula", "Cranbourne"];
