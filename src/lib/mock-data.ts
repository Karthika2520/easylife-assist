export type Reminder = {
  id: string;
  time: string;
  title: string;
  titleTa: string;
  kind: "medicine" | "appointment";
  note: string;
  noteTa: string;
  done: boolean;
};

export const reminders: Reminder[] = [
  {
    id: "r1",
    time: "8:00 AM",
    title: "Take morning medicine",
    titleTa: "காலை மருந்து எடுக்கவும்",
    kind: "medicine",
    note: "1 white tablet after breakfast",
    noteTa: "காலை உணவுக்குப் பிறகு 1 வெள்ளை மாத்திரை",
    done: true,
  },
  {
    id: "r2",
    time: "1:00 PM",
    title: "Blood pressure tablet",
    titleTa: "இரத்த அழுத்த மாத்திரை",
    kind: "medicine",
    note: "1 tablet with a full glass of water",
    noteTa: "ஒரு டம்ளர் தண்ணீருடன் 1 மாத்திரை",
    done: false,
  },
  {
    id: "r3",
    time: "4:30 PM",
    title: "Doctor visit — Dr. Menon",
    titleTa: "மருத்துவரை சந்திக்க — டாக்டர் மேனன்",
    kind: "appointment",
    note: "City Clinic, Room 2. Bring your report file.",
    noteTa: "சிட்டி கிளினிக், அறை 2. உங்கள் அறிக்கையை எடுத்து வரவும்.",
    done: false,
  },
  {
    id: "r4",
    time: "9:00 PM",
    title: "Night medicine",
    titleTa: "இரவு மருந்து",
    kind: "medicine",
    note: "2 tablets after dinner",
    noteTa: "இரவு உணவுக்குப் பிறகு 2 மாத்திரைகள்",
    done: false,
  },
];

export type FamilyMember = {
  id: string;
  name: string;
  relation: string;
  relationTa: string;
  phone: string;
  initials: string;
};

export const familyMembers: FamilyMember[] = [
  { id: "f1", name: "Anitha", relation: "Daughter", relationTa: "மகள்", phone: "+91 98400 11223", initials: "A" },
  { id: "f2", name: "Ravi", relation: "Son", relationTa: "மகன்", phone: "+91 98400 44556", initials: "R" },
  { id: "f3", name: "Lakshmi", relation: "Sister", relationTa: "சகோதரி", phone: "+91 98400 77889", initials: "L" },
  { id: "f4", name: "Dr. Menon", relation: "Family doctor", relationTa: "குடும்ப மருத்துவர்", phone: "+91 44 2345 6789", initials: "M" },
];

export type ExplainTerm = {
  id: string;
  term: string;
  termTa: string;
  simple: string;
  simpleTa: string;
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
    safety: "Never tell an OTP to anyone on a phone call. Not even to a bank.",
    safetyTa: "OTP-யை யாருக்கும் தொலைபேசியில் சொல்ல வேண்டாம். வங்கிக்கும் கூட.",
  },
  {
    id: "e2",
    term: "UPI Payment",
    termTa: "UPI கட்டணம்",
    simple: "A way to send money from your bank to a shop or person using your phone.",
    simpleTa: "உங்கள் தொலைபேசி மூலம் வங்கியிலிருந்து பணம் அனுப்பும் வழி.",
    safety: "To receive money you never need to enter your PIN. Only to send money.",
    safetyTa: "பணம் பெறுவதற்கு PIN தேவை இல்லை. அனுப்புவதற்கு மட்டுமே.",
  },
  {
    id: "e3",
    term: "Password",
    termTa: "கடவுச்சொல்",
    simple: "A secret word that opens your account, like a key for your front door.",
    simpleTa: "உங்கள் கணக்கைத் திறக்கும் ரகசிய சொல் — வீட்டுச் சாவி போல.",
    safety: "Write it in a small notebook kept at home, not in your phone notes.",
    safetyTa: "தொலைபேசியில் அல்ல, வீட்டில் உள்ள சிறு நோட்டில் எழுதி வைக்கவும்.",
  },
  {
    id: "e4",
    term: "Wi-Fi",
    termTa: "வை-ஃபை",
    simple: "The internet in your home, sent through the air from a small box.",
    simpleTa: "வீட்டில் உள்ள சிறிய பெட்டியிலிருந்து காற்று வழியாக வரும் இணையம்.",
    safety: "Do not use bank apps on free Wi-Fi in shops or hospitals.",
    safetyTa: "கடைகளில் உள்ள இலவச வை-ஃபையில் வங்கி செயலிகளைப் பயன்படுத்த வேண்டாம்.",
  },
  {
    id: "e5",
    term: "App Update",
    termTa: "செயலி புதுப்பிப்பு",
    simple: "A small repair for an app on your phone. It fixes problems and keeps it safe.",
    simpleTa: "செயலிக்கான சிறிய திருத்தம். பிரச்சினைகளை சரி செய்து பாதுகாப்பாக வைக்கிறது.",
    safety: "Updates are safe. Do them when you are at home on your own Wi-Fi.",
    safetyTa: "புதுப்பிப்புகள் பாதுகாப்பானவை. வீட்டு வை-ஃபையில் செய்யுங்கள்.",
  },
  {
    id: "e6",
    term: "Link",
    termTa: "இணைப்பு (Link)",
    simple: "Blue underlined words that open a new page when you tap them.",
    simpleTa: "தட்டினால் புதிய பக்கத்தைத் திறக்கும் நீல அடிக்கோடிட்ட சொற்கள்.",
    safety: "If a stranger sends you a link in a message, do not tap it.",
    safetyTa: "அறியாதவர் அனுப்பும் இணைப்பைத் தட்ட வேண்டாம்.",
  },
];
