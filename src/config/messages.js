/**
 * Editable Messages Configuration for "A Little Place for MM"
 * Modify any text here to personalize the messages across the entire website.
 */

export const WELCOME_MESSAGES = {
  heading: 'Hey MM!',
  subtitle: 'Guess what? Someone created a tiny little corner of the internet just for you.',
  prompt: 'Take a little break from everything and explore!',
  buttonText: 'Open your little surprise',
};

export const LETTER_CONTENT = {
  title: 'A Little Note for MM',
  greeting: 'Hey MM,',
  paragraphs: [
    "I don't know exactly how your day is going, but here's a little reminder to take things slowly.",
    "Not every day needs to be productive, perfect, or exciting. Sometimes it's perfectly okay to take a break, breathe, and do something that makes you smile.",
    "So here's a tiny collection of sunshine, flowers, cats, and some random surprises to make your day a little brighter.",
    'Hope you enjoy exploring this little place!',
  ],
  buttonText: 'That made me smile!',
  buttonAfterText: 'Mission accomplished! Keep exploring, MM!',
};

export const NEED_RIGHT_NOW = {
  heading: 'What Do You Need Right Now?',
  subheading: 'Pick whichever little pocket of sunshine fits this exact moment, MM.',

  // Card 1: I Need a Smile
  smileMemes: [
    {
      catType: 'box',
      caption: 'If I fits, I sits. Even if the box is 3 sizes too small.',
      oneLiner: 'Certified professional at turning any cardboard box into a five-star resort.',
      cheer: 'Hey MM, hope this tiny loaf of fluff just upgraded your mood!',
    },
    {
      catType: 'mischievous',
      caption: 'Me: "Do not knock that pen off the desk." Cat: *maintains direct eye contact*',
      oneLiner: 'Gravity inspection complete. Yes, it still works.',
      cheer: 'Reminder for MM: even cats have chaotic days and still act like royalty.',
    },
    {
      catType: 'orange',
      caption: 'Currently waiting for my turn with the shared orange-cat braincell.',
      oneLiner: 'No thoughts, just sunshine naps and crunchy snacks.',
      cheer: 'Take a page from the orange cat playbook today, MM — chill first, worry never!',
    },
    {
      catType: 'yarn',
      caption: 'Tried to untangle one string. Accidentally invented modern art.',
      oneLiner: '99% fluff, 1% tactical yarn wrangler.',
      cheer: 'Smile check, MM! Even messy tangles turn into funny stories.',
    },
    {
      catType: 'sleeping',
      caption: 'Schedule for today: 9 AM nap, 11 AM snack, 12 PM pre-afternoon nap.',
      oneLiner: 'Nap olympics gold medalist, five years running.',
      cheer: 'A cheerful pause is always well deserved, MM!',
    },
    {
      catType: 'waving',
      caption: 'High-five from a tiny paw! You are doing better than you think, MM.',
      oneLiner: 'Official ambassador of good vibes and soft toe-beans.',
      cheer: 'Sending an emergency delivery of good cheer straight to MM!',
    },
  ],

  // Card 2: I Need Some Calm
  calmMessages: [
    'Breathe in slowly, MM. Let your shoulders drop away from your ears.',
    'Like clouds drifting across a pale blue sky, busy thoughts can pass right by.',
    'Nothing needs to be solved in the next ten seconds. Just be right here.',
    'Picture a warm breeze gently swaying yellow Champak petals in the sun.',
    'Unclench your jaw, take a sip of water, and give yourself a peaceful minute.',
    'Slow breaths, soft skies, calm mind. You have plenty of time, MM.',
  ],

  // Card 3: Enter the Cat Zone (Quick Playground facts & messages)
  catZoneFacts: [
    'Cats spend roughly 70% of their lives sleeping — true relaxation experts!',
    'A group of cats is called a "clowder", and a group of kittens is a "kindle".',
    'Cats have a special "slow blink" that signals they feel completely safe and happy.',
    'Every cat nose print is completely unique, just like a human fingerprint.',
    'Cats can rotate each ear up to 180 degrees independently to hear snack bags from miles away.',
    'A house cat can sprint up to 30 mph — usually at 3 AM for absolutely no reason.',
    'Whiskers are roughly as wide as a cat’s body so they can measure cozy boxes before diving in!',
  ],

  // Card 4: A Little Sunshine
  sunshineCompliments: [
    'MM, your kindness has a quiet way of making ordinary moments feel lighter.',
    'You handle more than people realize, and you do it with remarkable grace, MM.',
    'Even on low-energy days, just showing up as yourself is already plenty.',
    'You bring genuine warmth and good humor wherever you go, MM.',
    'Your curiosity and determination are genuinely inspiring — keep trusting your pace!',
    'Like a yellow Champak bloom, you brighten the space around you effortlessly.',
    'MM, you deserve breaks without guilt, laughs without hesitation, and sunny mornings.',
    'Whatever is on your plate this week, you have everything it takes to get through it step by step.',
  ],
};

export const CHAMPAK_GARDEN_MESSAGES = {
  heading: 'The Champak Flower Garden',
  initialQuote: 'A little sunshine, a little flower, and a little reason to smile.',
  buttonText: 'Plant a Champak',
  flowerNotes: [
    'A fresh yellow Champak just bloomed for MM!',
    'Golden petals for a golden day ahead.',
    'Little blooms grow best with patience and sunshine.',
    'May today feel as bright and breezy as this garden, MM!',
    'Here is a tiny pocket of calm wrapped in yellow petals.',
    'Another Champak! The cats are already coming to admire it.',
    'Good things take time to bloom — and they are always worth the wait.',
    'A gentle breeze, warm light, and one more reason to smile, MM.',
    'Fragrant golden petals swaying under a clear blue sky.',
    'You are building the happiest little flower meadow on the internet!',
    'Pause for a second and notice how bright this garden is getting, MM.',
    'Sunshine captured in a single Champak blossom.',
    'One tiny flower can brighten the whole hillside.',
    'Even the sleepy cat opened one eye to admire this bloom!',
    'Keep planting, MM — every single flower brings its own cheerful note.',
  ],
};

export const CAT_UNIVERSE_DATA = {
  heading: "MM's Cat Universe",
  subheading: 'Click any cat to say hello, see their personality, or hand out some crunchy treats!',
  treatsButton: 'Give the cats some treats',
  cats: [
    {
      id: 'sleeping',
      name: 'Mochi',
      role: 'The Sleeping Cat',
      personality: 'Professional cloud-napper. Dreams exclusively of sunny windowsills.',
      reaction: 'Zzz... *purrs softly in sunshine*',
      fact: 'Cats sleep 12 to 16 hours a day to recharge their zoomies.',
    },
    {
      id: 'playful',
      name: 'Pip',
      role: 'The Playful Kitten',
      personality: 'Bounces first, asks questions never. Powered by pure curiosity.',
      reaction: 'Boing! Wanna play, MM?!',
      fact: 'Kittens start practicing pounces before they are even a month old.',
    },
    {
      id: 'white',
      name: 'Cloud',
      role: 'The Fluffy White Cat',
      personality: 'Basically a floating marshmallow with dignified whiskers.',
      reaction: '*fluffs tail majestically* Hello, MM!',
      fact: 'Fluffy coats help cats feel extra cozy during breezy afternoons.',
    },
    {
      id: 'orange',
      name: 'Marmalade',
      role: 'The Orange Cat',
      personality: 'Radiates golden sunshine energy and zero stress whatsoever.',
      reaction: 'Mrrrow! Did someone say snacks?',
      fact: 'Orange tabby cats are famously social, chatty, and goofy.',
    },
    {
      id: 'box',
      name: 'Biscuit',
      role: 'Cat in a Cardboard Box',
      personality: 'Has a luxury cushion nearby, still chose the delivery box.',
      reaction: '*peeks over cardboard rim* Welcome to my fort, MM!',
      fact: 'Cardboard boxes give cats a snug, calm hiding spot where they feel safe.',
    },
    {
      id: 'butterfly',
      name: 'Sunny',
      role: 'Butterfly Chaser',
      personality: 'Believes every floating butterfly is a personal invitation to sprint.',
      reaction: '*tip-tap pounce!* Almost got it!',
      fact: 'Cats have super quick reflexes tuned to tiny fluttering movements.',
    },
    {
      id: 'yarn',
      name: 'Tangle',
      role: 'Yarn Ball Champion',
      personality: 'Turns a neat ball of blue yarn into an abstract sculpture in 4 seconds.',
      reaction: '*bat bat roll!* Look what I made, MM!',
      fact: 'Batting at rolling objects keeps cats nimble and entertained.',
    },
    {
      id: 'tree',
      name: 'Champa',
      role: 'Nap Under the Champak Tree',
      personality: 'Found the coolest patch of shade beneath falling yellow petals.',
      reaction: '*happy slow blink* Best spot in the whole garden.',
      fact: 'A slow blink from a cat is their friendliest way of saying "all is well".',
    },
    {
      id: 'waving',
      name: 'Lucky',
      role: 'The Waving Cat',
      personality: 'Greets MM with a cheerful paw wave every single time.',
      reaction: '*wave wave!* Wishing you a wonderful day, MM!',
      fact: 'Cats often raise their paws playfully when excited to see a friend.',
    },
    {
      id: 'mischievous',
      name: 'Noodle',
      role: 'The Mischievous Cat',
      personality: 'Has a tiny smirk and a master plan to borrow your favorite pen.',
      reaction: 'Hehe... I definitely did not move your bookmark, MM.',
      fact: 'Curious cats enjoy nudging small objects just to see what happens next.',
    },
  ],
};

export const SURPRISE_ITEMS = {
  heading: 'Random Little Surprises',
  subheading: 'Not sure what comes next? Tap the button for a fresh pocket-sized delight, MM!',
  buttonText: 'Surprise me!',
  quotes: [
    '“Even the smallest spark of sunshine can brighten an entire afternoon.” — For MM',
    '“Take a deep breath. You are allowed to enjoy the little pauses along the way.”',
    '“Collect moments that feel like clear blue skies and warm yellow flowers.”',
    '“Good days start with small smiles — and maybe a cat wearing a paper crown.”',
    '“Step by step, page by page, flower by flower — you are doing great, MM!”',
  ],
  jokes: [
    {
      setup: 'Why was the cat sitting on the computer keyboard?',
      punchline: 'To keep an eye on the mouse!',
    },
    {
      setup: 'What do you call a pile of kittens?',
      punchline: 'A meow-ntain!',
    },
    {
      setup: 'Why are yellow Champak flowers never stressed?',
      punchline: 'Because they always know how to leaf their worries behind!',
    },
    {
      setup: 'What is a cat’s favorite color?',
      punchline: 'Purr-ple (and sunshine yellow, obviously)!',
    },
    {
      setup: 'Why did the kitten bring a ladder to the garden?',
      punchline: 'Because it wanted to reach the high-five clouds!',
    },
  ],
  catFacts: [
    'Cats make over 100 different vocal sounds — dogs only make about 10!',
    'A cat’s purr vibrates between 25 and 150 Hz, a frequency known to be super soothing.',
    'Cats have five toes on their front paws and four on their back paws.',
    'When cats knead a soft blanket, it means they are feeling completely cozy and content.',
    'Cats can jump up to six times their own body length in a single springy leap!',
  ],
};

export const FINAL_SCREEN_CONTENT = {
  introHeading: 'Okay MM, one last thing...',
  introSubtitle: 'Hope this little corner of happiness made your day a little brighter.',
  reminderTitle: "DON'T FORGET TO STUDY!",
  reminderSubtext: 'Now go conquer that syllabus!',
  buttonText: "Okay, I'll study!",
  celebrationMessage: 'You got this, MM! Go shine bright!',
  signature: 'Yours, RK',
};
