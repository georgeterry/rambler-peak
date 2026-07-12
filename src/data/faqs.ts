export type FAQGroup = {
  title: string;
  faqs: { q: string; a: string }[];
};

export const supportFaqs: FAQGroup[] = [
  {
    title: 'Care & cleaning',
    faqs: [
      { q: 'How do I clean the mat or pillow?', a: 'Wipe with a damp cloth and mild soap. Air-dry fully before packing away. Never machine wash, tumble dry or dry-clean, as the TPU coating will delaminate.' },
      { q: 'How should I store it between trips?', a: 'Store loosely rolled or unrolled with the valve open, in a dry cupboard. Keeping it fully compressed for weeks at a time will shorten the life of the fabric.' },
      { q: 'Can I use it in direct sun?', a: 'Short periods are fine. Prolonged UV exposure will weaken the coating, so pack the mat away when you are not on it.' },
    ],
  },
  {
    title: 'Inflation guide',
    faqs: [
      { q: 'How many breaths does the DreamLite take?', a: 'Around twelve slow, deep breaths. The valve is one-way so you do not lose air between breaths.' },
      { q: 'Can I use a camping pump?', a: 'Yes. Any standard camping pump with a nozzle up to 25 mm fits the wide-mouth valve.' },
      { q: 'Do I need to open the valve fully to deflate?', a: 'Yes. Twist the outer ring anti-clockwise for rapid deflate and the mat empties in around ten seconds.' },
    ],
  },
  {
    title: 'Warranty & repairs',
    faqs: [
      { q: 'What does the 1-year warranty cover?', a: 'Manufacturing defects only: seams, valves and material failure that is not caused by damage. Fair wear and tear, or puncture damage, is not covered.' },
      { q: 'How do I claim?', a: 'Email hello@ramblerpeak.com with your order number and clear photos. We aim to reply within one working day.' },
      { q: 'What if I puncture it in the field?', a: 'Every box contains a self-adhesive repair patch designed for exactly this. Locate the leak with soapy water, clean the area, apply the patch and press for a minute.' },
    ],
  },
  {
    title: 'Shipping & returns',
    faqs: [
      { q: 'Do you offer free UK delivery?', a: 'Yes. Free UK delivery on every order, sent by tracked Royal Mail.' },
      { q: 'How long does delivery take?', a: 'Orders placed before 2 pm on a working day are dispatched the same day. UK delivery is typically 2 to 3 working days.' },
      { q: 'Do you ship internationally?', a: 'Not yet. We are UK-only for now. Sign up to our newsletter to hear when we open shipping to Ireland and Europe.' },
      { q: 'What is your returns policy?', a: 'Return any unused item within 30 days for a full refund. We cover the return label on faulty items.' },
    ],
  },
];
