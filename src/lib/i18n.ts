export type Lang = "en" | "ta";

export const LANGUAGES: { code: Lang; label: string; speechLocale: string }[] = [
  { code: "en", label: "English", speechLocale: "en-US" },
  { code: "ta", label: "தமிழ் (Tamil)", speechLocale: "ta-IN" },
  // To add a language: add an entry here and a matching block in `strings`.
];

const en = {
  appName: "EASYLIFE",
  tagline: "Technology made simpler, safer, and more human.",

  // Toolbar
  toolbarTitle: "Accessibility help",
  textSize: "Text size",
  textSizeHelp: "Drag to make all words bigger or smaller.",
  resetTextSize: "Reset text size",
  readAloud: "Read Aloud",
  stopReading: "Stop Reading",
  speak: "Speak",
  listening: "Listening…",
  highContrast: "High Contrast",
  highContrastOn: "High Contrast: On",
  highContrastOff: "High Contrast: Off",
  language: "Language",
  notSupportedRead: "Reading aloud is not available in this browser. Please use the text size slider instead.",
  notSupportedSpeak: "Voice input is not available in this browser. Please use the buttons instead.",
  heardYouSay: "We heard you say:",
  didNotUnderstand: "We did not understand that. Please try saying: Reminders, Family, Emergency, or Explain.",

  // Nav
  navHome: "Home",
  navReminders: "Reminders",
  navFamily: "Family",
  navExplain: "Explain",
  navSettings: "Settings",
  currentPage: "You are here",
  back: "Back",
  skipToContent: "Skip to main content",

  // Home
  goodMorning: "Good morning",
  goodAfternoon: "Good afternoon",
  goodEvening: "Good evening",
  howCanWeHelp: "How can we help you today?",
  cardReminders: "Reminders",
  cardRemindersSub: "Medicines & appointments",
  cardFamily: "Call Family",
  cardFamilySub: "Contact someone you trust",
  cardSos: "Emergency SOS",
  cardSosSub: "Get emergency help",
  cardExplain: "Explain This",
  cardExplainSub: "Understand difficult terms",
  todaysThings: "Today's important things",
  completed: "Completed",
  notYetDone: "Not done yet",
  markDone: "Mark as done",
  markedDone: "Done. Well done!",

  // Reminders
  remindersTitle: "Your reminders",
  remindersIntro: "Here is everything for today. Tap the big button to mark one as done.",
  medicine: "Medicine",
  appointment: "Appointment",

  // Family
  familyTitle: "Call Family",
  familyIntro: "Choose one person. We will start the call for you.",
  callNow: "Call",
  calling: "Calling",
  callingHelp: "Hold the phone to your ear. To stop, press the big button below.",
  endCall: "End call",

  // Emergency
  sosTitle: "Emergency Help",
  sosIntro: "Press and hold the red button for 3 seconds. This will call for help.",
  sosHold: "Hold to call for help",
  sosSending: "Getting help…",
  sosSent: "Help is on the way. Stay calm — we have called your emergency contact.",
  sosCancel: "Cancel — I am safe",
  sosNoEmergency: "If this is not an emergency, press the Back button above.",

  // Explain
  explainTitle: "Explain This",
  explainIntro: "Choose a word you have seen on your phone. We will explain it in simple language.",
  explainAnswerTitle: "In simple words",
  chooseAnother: "Choose another word",

  // Settings
  settingsTitle: "Settings",
  settingsIntro: "Change how EASYLIFE looks and speaks. Your choices are saved on this device.",
  yourDetails: "Your details",
  name: "Name",
  emergencyContact: "Emergency contact",
  saved: "Your choices are saved automatically.",
};

const ta: typeof en = {
  appName: "EASYLIFE",
  tagline: "தொழில்நுட்பம் எளிதாக, பாதுகாப்பாக, மனிதத்தன்மையுடன்.",

  toolbarTitle: "அணுகல் உதவி",
  textSize: "எழுத்து அளவு",
  textSizeHelp: "எழுத்துக்களை பெரிதாக்க இழுக்கவும்.",
  resetTextSize: "எழுத்து அளவை மீட்டமை",
  readAloud: "வாசித்துக் காட்டு",
  stopReading: "வாசிப்பதை நிறுத்து",
  speak: "பேசுங்கள்",
  listening: "கேட்கிறோம்…",
  highContrast: "அதிக மாறுபாடு",
  highContrastOn: "அதிக மாறுபாடு: இயக்கம்",
  highContrastOff: "அதிக மாறுபாடு: நிறுத்தம்",
  language: "மொழி",
  notSupportedRead: "இந்த உலாவியில் வாசித்துக் காட்டும் வசதி இல்லை. எழுத்து அளவைப் பெரிதாக்கிக் கொள்ளுங்கள்.",
  notSupportedSpeak: "இந்த உலாவியில் குரல் வசதி இல்லை. பெரிய பொத்தான்களைப் பயன்படுத்துங்கள்.",
  heardYouSay: "நீங்கள் சொன்னது:",
  didNotUnderstand: "புரியவில்லை. நினைவூட்டல், குடும்பம், அவசரம் அல்லது விளக்கம் என்று சொல்லுங்கள்.",

  navHome: "முகப்பு",
  navReminders: "நினைவூட்டல்",
  navFamily: "குடும்பம்",
  navExplain: "விளக்கம்",
  navSettings: "அமைப்புகள்",
  currentPage: "நீங்கள் இங்கே இருக்கிறீர்கள்",
  back: "பின்செல்",
  skipToContent: "முக்கிய பகுதிக்கு செல்",

  goodMorning: "காலை வணக்கம்",
  goodAfternoon: "மதிய வணக்கம்",
  goodEvening: "மாலை வணக்கம்",
  howCanWeHelp: "இன்று எப்படி உதவ முடியும்?",
  cardReminders: "நினைவூட்டல்",
  cardRemindersSub: "மருந்துகள் & சந்திப்புகள்",
  cardFamily: "குடும்பத்தை அழை",
  cardFamilySub: "நம்பிக்கையானவரை தொடர்பு கொள்ளுங்கள்",
  cardSos: "அவசர உதவி",
  cardSosSub: "உடனடி உதவி பெறுங்கள்",
  cardExplain: "இதை விளக்கு",
  cardExplainSub: "கடினமான சொற்களைப் புரிந்து கொள்ளுங்கள்",
  todaysThings: "இன்றைய முக்கியமான விஷயங்கள்",
  completed: "முடிந்தது",
  notYetDone: "இன்னும் முடியவில்லை",
  markDone: "முடிந்ததாக குறி",
  markedDone: "முடிந்தது. நன்று!",

  remindersTitle: "உங்கள் நினைவூட்டல்கள்",
  remindersIntro: "இன்றைய அனைத்தும் இங்கே. முடிந்ததாக குறிக்க பெரிய பொத்தானை அழுத்துங்கள்.",
  medicine: "மருந்து",
  appointment: "சந்திப்பு",

  familyTitle: "குடும்பத்தை அழை",
  familyIntro: "ஒருவரைத் தேர்ந்தெடுங்கள். நாங்கள் அழைப்பைத் தொடங்குவோம்.",
  callNow: "அழை",
  calling: "அழைக்கிறோம்",
  callingHelp: "தொலைபேசியை காதில் வைத்திருங்கள். நிற்க கீழே உள்ள பொத்தானை அழுத்துங்கள்.",
  endCall: "அழைப்பை முடி",

  sosTitle: "அவசர உதவி",
  sosIntro: "சிவப்பு பொத்தானை 3 வினாடிகள் அழுத்திப் பிடியுங்கள். உதவி அழைக்கப்படும்.",
  sosHold: "உதவிக்கு அழுத்திப் பிடியுங்கள்",
  sosSending: "உதவி பெறுகிறோம்…",
  sosSent: "உதவி வந்து கொண்டிருக்கிறது. அமைதியாக இருங்கள் — உங்கள் தொடர்பை அழைத்துவிட்டோம்.",
  sosCancel: "ரத்து செய் — நான் நலம்",
  sosNoEmergency: "இது அவசரம் இல்லை என்றால், மேலே உள்ள பின்செல் பொத்தானை அழுத்துங்கள்.",

  explainTitle: "இதை விளக்கு",
  explainIntro: "உங்கள் தொலைபேசியில் பார்த்த சொல்லைத் தேர்ந்தெடுங்கள். எளிமையாக விளக்குகிறோம்.",
  explainAnswerTitle: "எளிய சொற்களில்",
  chooseAnother: "வேறு சொல்லைத் தேர்ந்தெடு",

  settingsTitle: "அமைப்புகள்",
  settingsIntro: "EASYLIFE எப்படி இருக்க வேண்டும் என்பதை மாற்றுங்கள். உங்கள் தேர்வுகள் சேமிக்கப்படும்.",
  yourDetails: "உங்கள் விவரங்கள்",
  name: "பெயர்",
  emergencyContact: "அவசர தொடர்பு",
  saved: "உங்கள் தேர்வுகள் தானாகவே சேமிக்கப்படுகின்றன.",
};

export const strings: Record<Lang, typeof en> = { en, ta };
export type StringKey = keyof typeof en;
