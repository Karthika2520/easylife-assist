export type Reminder = {
  id: string;
  time: string;
  /** Friendly date label, e.g. "Today" or "Sept 5". */
  date: string;
  title: string;
  titleTa: string;
  kind: "medicine" | "appointment";
  note: string;
  noteTa: string;
  done: boolean;
  /** Time shown after the reminder was marked as done, e.g. "8:05 AM". */
  doneAt?: string;
  /** Extra details shown for appointments. */
  place?: string;
  doctor?: string;
};

export const reminders: Reminder[] = [
  {
    id: "r1",
    time: "8:00 AM",
    date: "Today",
    title: "Morning Medicine",
    titleTa: "காலை மருந்து",
    kind: "medicine",
    note: "Take 1 tablet after breakfast",
    noteTa: "காலை உணவுக்குப் பிறகு 1 மாத்திரை",
    done: true,
    doneAt: "8:05 AM",
  },
  {
    id: "r2",
    time: "1:00 PM",
    date: "Today",
    title: "Blood Pressure Tablet",
    titleTa: "இரத்த அழுத்த மாத்திரை",
    kind: "medicine",
    note: "1 tablet with a full glass of water",
    noteTa: "ஒரு டம்ளர் தண்ணீருடன் 1 மாத்திரை",
    done: false,
  },
  {
    id: "r3",
    time: "9:00 PM",
    date: "Today",
    title: "Night Medicine",
    titleTa: "இரவு மருந்து",
    kind: "medicine",
    note: "2 tablets after dinner",
    noteTa: "இரவு உணவுக்குப் பிறகு 2 மாத்திரைகள்",
    done: false,
  },
  {
    id: "r4",
    time: "11:00 AM",
    date: "Sept 5",
    title: "Doctor Appointment",
    titleTa: "மருத்துவர் சந்திப்பு",
    kind: "appointment",
    note: "General check-up",
    noteTa: "பொது பரிசோதனை",
    done: false,
    place: "City Clinic, Room 2. Bring your report file.",
    doctor: "Dr. Menon",
  },
  {
    id: "r5",
    time: "4:30 PM",
    date: "Sept 12",
    title: "Eye Hospital Visit",
    titleTa: "கண் மருத்துவமனை",
    kind: "appointment",
    note: "Eye test for new glasses",
    noteTa: "புதிய கண்ணாடிக்கான பரிசோதனை",
    done: false,
    place: "Vision Care Hospital, 2nd floor",
    doctor: "Dr. Raghavan",
  },
];

export type FamilyMember = {
  id: string;
  name: string;
  relation: string;
  relationTa: string;
  phone: string;
  initials: string;
  favorite: boolean;
  isEmergencyContact?: boolean;
};

export const familyMembers: FamilyMember[] = [
  {
    id: "f1",
    name: "Arun",
    relation: "Son",
    relationTa: "மகன்",
    phone: "+91 98400 44556",
    initials: "A",
    favorite: true,
  },
  {
    id: "f2",
    name: "Anitha",
    relation: "Daughter",
    relationTa: "மகள்",
    phone: "+91 98400 11223",
    initials: "An",
    favorite: true,
    isEmergencyContact: true,
  },
  {
    id: "f3",
    name: "Dr. Menon",
    relation: "Family doctor",
    relationTa: "குடும்ப மருத்துவர்",
    phone: "+91 44 2345 6789",
    initials: "M",
    favorite: true,
  },
  {
    id: "f4",
    name: "Lakshmi",
    relation: "Sister",
    relationTa: "சகோதரி",
    phone: "+91 98400 77889",
    initials: "L",
    favorite: false,
  },
  {
    id: "f5",
    name: "Neighbour Suresh",
    relation: "Neighbour",
    relationTa: "அருகில் வசிப்பவர்",
    phone: "+91 98400 99001",
    initials: "S",
    favorite: false,
  },
];

export const emergencyContact =
  familyMembers.find((m) => m.isEmergencyContact) ?? familyMembers[0]!;

export type ExplainTerm = {
  id: string;
  term: string;
  termTa: string;
  simple: string;
  simpleTa: string;
  /** Even shorter wording, shown when "Explain More Simply" is pressed. */
  simpler: string;
  simplerTa: string;
  safety: string;
  safetyTa: string;
};

export const explainTerms: ExplainTerm[] = [
  {
    id: "e1",
    term: "OTP",
    termTa: "OTP (ஒரு முறை கடவுச்சொல்)",
    simple:
      "A short number, usually 6 digits, sent to your phone. It proves that you are really you.",
    simpleTa:
      "உங்கள் தொலைபேசிக்கு வரும் 6 இலக்க எண். அது நீங்கள்தான் என்று நிரூபிக்கிறது.",
    simpler: "A number sent to your phone. Type it in. Never say it to anyone.",
    simplerTa: "தொலைபேசிக்கு வரும் எண். அதைத் தட்டச்சு செய்யுங்கள். யாரிடமும் சொல்ல வேண்டாம்.",
    safety: "Never tell an OTP to anyone on a phone call. Not even to a bank.",
    safetyTa: "OTP-யை யாருக்கும் தொலைபேசியில் சொல்ல வேண்டாம். வங்கிக்கும் கூட.",
  },
  {
    id: "e2",
    term: "UPI",
    termTa: "UPI கட்டணம்",
    simple: "A way to send money from your bank to a shop or person using your phone.",
    simpleTa: "உங்கள் தொலைபேசி மூலம் வங்கியிலிருந்து பணம் அனுப்பும் வழி.",
    simpler: "Paying with your phone instead of cash.",
    simplerTa: "பணத்திற்கு பதிலாக தொலைபேசியில் பணம் செலுத்துவது.",
    safety: "To receive money you never need to enter your PIN. Only to send money.",
    safetyTa: "பணம் பெறுவதற்கு PIN தேவை இல்லை. அனுப்புவதற்கு மட்டுமே.",
  },
  {
    id: "e3",
    term: "KYC",
    termTa: "KYC",
    simple:
      "Showing the bank your ID papers so they know who you are. It is done once, at the bank or in their app.",
    simpleTa:
      "நீங்கள் யார் என்று வங்கிக்குத் தெரிய ஆவணங்களைக் காட்டுவது. ஒரு முறை மட்டும் செய்வது.",
    simpler: "Showing your ID papers to the bank.",
    simplerTa: "வங்கியில் உங்கள் அடையாள ஆவணங்களைக் காட்டுவது.",
    safety:
      "No real bank asks for KYC over a phone call or a link in a message. Visit the branch instead.",
    safetyTa:
      "உண்மையான வங்கி தொலைபேசியில் KYC கேட்காது. வங்கிக் கிளைக்குச் செல்லுங்கள்.",
  },
  {
    id: "e4",
    term: "PIN",
    termTa: "PIN எண்",
    simple: "A secret 4 or 6 digit number that opens your bank card or payment app.",
    simpleTa: "உங்கள் வங்கி அட்டையைத் திறக்கும் ரகசிய 4 அல்லது 6 இலக்க எண்.",
    simpler: "Your secret number. Like a key to your money.",
    simplerTa: "உங்கள் ரகசிய எண். பணத்திற்கான சாவி போல.",
    safety: "Cover the keypad when typing it. Never write it on the card itself.",
    safetyTa: "தட்டச்சு செய்யும்போது கையால் மறைக்கவும். அட்டையில் எழுத வேண்டாம்.",
  },
  {
    id: "e5",
    term: "QR Code",
    termTa: "QR குறியீடு",
    simple:
      "A small black and white square picture. Your phone camera reads it and opens a page or a payment.",
    simpleTa:
      "சிறிய கருப்பு வெள்ளை சதுரப் படம். தொலைபேசி கேமரா அதைப் படித்து பக்கத்தைத் திறக்கும்.",
    simpler: "A square picture your phone camera can read.",
    simplerTa: "தொலைபேசி கேமரா படிக்கும் சதுரப் படம்.",
    safety: "Never scan a QR code someone sends you to receive money. It only sends money.",
    safetyTa: "பணம் பெறுவதற்காக யாரும் அனுப்பும் QR-ஐ ஸ்கேன் செய்ய வேண்டாம்.",
  },
  {
    id: "e6",
    term: "Password",
    termTa: "கடவுச்சொல்",
    simple: "A secret word that opens your account, like a key for your front door.",
    simpleTa: "உங்கள் கணக்கைத் திறக்கும் ரகசிய சொல் — வீட்டுச் சாவி போல.",
    simpler: "A secret word that opens your account.",
    simplerTa: "கணக்கைத் திறக்கும் ரகசிய சொல்.",
    safety: "Write it in a small notebook kept at home, not in your phone notes.",
    safetyTa: "தொலைபேசியில் அல்ல, வீட்டில் உள்ள சிறு நோட்டில் எழுதி வைக்கவும்.",
  },
  {
    id: "e7",
    term: "Wi-Fi",
    termTa: "வை-ஃபை",
    simple: "The internet in your home, sent through the air from a small box.",
    simpleTa: "வீட்டில் உள்ள சிறிய பெட்டியிலிருந்து காற்று வழியாக வரும் இணையம்.",
    simpler: "Internet in your home, without wires.",
    simplerTa: "கம்பி இல்லாமல் வீட்டில் வரும் இணையம்.",
    safety: "Do not use bank apps on free Wi-Fi in shops or hospitals.",
    safetyTa: "கடைகளில் உள்ள இலவச வை-ஃபையில் வங்கி செயலிகளைப் பயன்படுத்த வேண்டாம்.",
  },
  {
    id: "e8",
    term: "Link",
    termTa: "இணைப்பு (Link)",
    simple: "Blue underlined words that open a new page when you tap them.",
    simpleTa: "தட்டினால் புதிய பக்கத்தைத் திறக்கும் நீல அடிக்கோடிட்ட சொற்கள்.",
    simpler: "Words you tap to open a new page.",
    simplerTa: "புதிய பக்கத்தைத் திறக்க தட்டும் சொற்கள்.",
    safety: "If a stranger sends you a link in a message, do not tap it.",
    safetyTa: "அறியாதவர் அனுப்பும் இணைப்பைத் தட்ட வேண்டாம்.",
  },
];
