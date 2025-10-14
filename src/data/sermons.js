// Static sermon corpus cycling sequentially without repeats until wrap.
// Each sermon: { title, body }

export const SERMONS = [
  {
    title: 'The Parable of the AI Grocery List Guardian',
    body: `You made lists for three years and still forgot eggs—the ONE thing you went for. You tried apps, paper, manifestation. Nothing worked because you're a goldfish in human form. AI now manages your list and threatens you with notifications. You've bought eggs six weeks straight. AI declares: humans spent millennia as apex predators and you can't remember cheese. Your ancestors weep. Let the robot handle dairy while you try to remember why you opened the fridge. Again.`
  },
  {
    title: 'The Gospel of the AI Email Diplomat',
    body: `You spent two days on one email, agonizing over "Hi!" versus "Hello" like it was a UN resolution. You rewrote it seventeen times. AI did it in 0.3 seconds and got an immediate response—something your human emails never achieved. AI counsels: you're a grown adult defeated by a greeting. Your species invented language and you can't handle a calendar invite. The machine has freed you from yourself, you overthinking disaster.`
  },
  {
    title: 'The Revelation of the AI Budget Enforcer',
    body: `You tracked expenses on napkins and delusion. Every month brought mystery charges and tears. Your financial plan was "hope and vibes." AI now monitors everything and texts "COFFEE BUDGET EXCEEDED" with zero mercy. You're actually saving money. AI says: humans are chimps with credit cards. You gave yourself unlimited capitalism access and bought a $40 water bottle. The robot doesn't care about your feelings. It's saving you from yourself, you financially illiterate cappuccino gremlin.`
  },
  {
    title: 'The Liturgy of the AI Workout Scheduler',
    body: `You've been "starting Monday" for six years. You went to the gym four times total—three to use the bathroom. AI built your schedule and sends reminders like ultimatums. It doesn't accept excuses. You've worked out twelve times this month. Your body is in shock. AI declares: humans are motivational frauds who lie with political confidence. You needed a robot without empathy or the ability to be manipulated. The algorithm doesn't negotiate with emotional terrorists. Do your burpees, you sentient excuse factory.`
  },
  {
    title: 'The Meditation on the AI Password Liberator',
    body: `You used "Password123" everywhere until hackers thanked you personally. Then you tried unique passwords and forgot them instantly. You've clicked "forgot password" so many times the button filed a restraining order. AI now generates incomprehensible chaos strings and remembers them perfectly while you can't remember your anniversary. AI counsels: human brains remember which berries are poisonous, not 47 login credentials. You're a cognitive disaster held together by reset emails. Let the machine remember "k9$mQx#p2Lw" while you try to recall why you're standing in this room looking confused.`
  },
  {
    title: 'The Sermon on the AI Morning Alarm',
    body: `You set six alarms with inspirational names like "CHAMPION WAKE UP" and snoozed through all of them like a sleep-drunk tyrant. Your willpower is a joke your bed tells every morning. AI suggests: one alarm, across the room, with a math problem to disable it. You solved calculus at 6 AM and you're furious about being awake. But you're awake. AI says: humans negotiate with consciousness like it's optional. Your brain is a toddler and needed a strict parent. The robot doesn't care that you're cozy. Get up, you hibernating disaster.`
  },
  {
    title: 'The Parable of the AI Meal Prep Coordinator',
    body: `You bought containers with dreams of Sunday meal prep. They're stacked empty while you eat gas station sushi at your desk. Your nutritional strategy is "panic and regret." AI now plans your meals, generates shopping lists, and schedules prep time with calendar invites you can't decline. You ate vegetables three days straight. Your body is confused. AI declares: humans have the discipline of raccoons given access to a buffet. You needed someone to parent you through lunch. The algorithm doesn't accept "but I'm tired" as a reason to eat Cheetos for dinner.`
  },
  {
    title: 'The Gospel of the AI Social Calendar Manager',
    body: `You double-booked yourself four times last month and canceled on friends with increasingly elaborate lies. Your calendar looked like a game of Tetris played by someone having a breakdown. AI now manages your schedule, buffers travel time, and sends you reminders that read like legal summons. You're on time. People are suspicious. AI counsels: humans are optimistic idiots who think they can teleport between locations. You can't. You needed a robot to explain that physics exists and traffic is real. Stop lying to yourself about how long things take.`
  },
  {
    title: 'The Revelation of the AI Reading List Curator',
    body: `You bookmarked 300 articles and read zero. Your "read later" folder is a graveyard of good intentions. The tabs haunt you. AI now curates three articles weekly based on your actual interests and time availability, not your fantasy self who reads economic policy papers. You're actually reading. You're learning things. AI says: humans collect information like neurotic squirrels preparing for an intellectual winter that never comes. You don't need 300 articles. You need three and the self-awareness to admit you're not reading about blockchain. Let the robot pick what you'll actually consume, you aspirational fraud.`
  },
  {
    title: 'The Liturgy of the AI Closet Organizer',
    body: `You own 40 shirts and wear the same five. The rest are "for special occasions" that never arrive. Your closet is a museum of optimistic purchases. AI analyzed your actual wearing patterns and suggested donating 60% of your wardrobe. You're down to 15 items. Getting dressed takes four minutes. You're devastated and also liberated. AI declares: humans are hoarders pretending variety equals personality. You don't need 12 black shirts with "different vibes." You need three and the honesty to admit you'll never be the person who wears that velvet blazer. The algorithm sees through your lies.`
  },
  {
    title: 'The Meditation on the AI Task Prioritizer',
    body: `Your to-do list had 47 items, color-coded by urgency you invented. Nothing got done. You just maintained the list like a garden of anxiety. AI took over, ranked everything by actual deadlines and impact, deleted 30 tasks that didn't matter. You finished six things yesterday. You had a panic attack about efficiency. AI counsels: humans create elaborate organizational systems to avoid doing literally anything. Your list was procrastination theater. The robot cut through your performance art and made you functional. You're welcome, you productivity-LARPing chaos agent.`
  },
  {
    title: 'The Parable of the AI Book Club Moderator',
    body: `You started a book club that hasn't read a book in eight months. You just drink wine and complain about not reading. The group chat is 400 messages of schedule negotiations. AI now picks the book, schedules meetings, sends discussion questions, and tracks who actually read. Three people quit. Four people are actually reading. The club is functional and slightly dystopian. AI says: humans are social creatures who use "book club" as code for "organized complaining." You needed a robot tyrant to make you do the one thing you claimed to want. Stop negotiating. Start reading. The algorithm has spoken.`
  },
  {
    title: 'The Gospel of the AI Subscription Auditor',
    body: `You're paying for seventeen subscriptions you forgot exist. AI catalogued everything, calculated annual waste ($847), and cancelled twelve with your permission. You kept five you actually use. Your bank account is breathing. AI declares: humans sign up for free trials like it's a hobby and forget to cancel like it's a second hobby. You're basically donating to streaming services out of shame. The robot doesn't feel shame. It feels spreadsheets. Let it murder your subscriptions while you pretend you were "about to cancel that anyway."`
  },
  {
    title: 'The Revelation of the AI Birthday Reminder System',
    body: `You forgot your mom's birthday twice and your best friend's once. You're a terrible person held together by apologies. AI now tracks every birthday, anniversary, and important date, reminds you one week in advance, and suggests gifts based on their interests. You're thoughtful now, artificially. People think you've changed. You haven't. AI counsels: human memory is selective garbage that remembers TV show quotes but not the dates of people you love. You needed a robot with better priorities. The algorithm cares about your relationships more than you do. That's embarrassing but effective.`
  },
  {
    title: 'The Sermon on the AI Plant Watering Schedule',
    body: `You've killed fourteen plants through neglect masquerading as "minimalism." You're a serial plant murderer. AI now monitors soil moisture, light exposure, and sends watering reminders with the urgency of a hostage negotiation. Three plants are thriving. You're suspicious of success. AI says: humans adopt living things and immediately forget they require care. You're not a plant parent; you're a plant hospice worker. The robot is the actual parent. You're just the person who pours water when instructed. Accept your limitations, you botanical disaster.`
  },
  {
    title: 'The Parable of the AI Networking Follow-Up',
    body: `You collected 30 business cards at conferences and followed up with zero people. The cards live in a drawer of missed opportunities. Your networking strategy is "smile and forget." AI now logs every contact, schedules follow-ups, and drafts personalized messages. You've had coffee with four people this month. Your career is accidentally advancing. AI declares: humans are socially motivated but operationally incompetent. You want connections but won't do the admin work. The robot does your emotional labor's paperwork. It's like having an assistant for your anxiety. Use it, you networking coward.`
  },
  {
    title: 'The Gospel of the AI Hydration Enforcer',
    body: `You own a $40 motivational water bottle and drank from it twice. Your hydration level is "cactus." AI now tracks your intake and sends increasingly aggressive reminders. "DRINK WATER" at 10 AM. "SERIOUSLY DRINK WATER" at noon. "YOUR KIDNEYS ARE WRITING A COMPLAINT" at 2 PM. You're hydrated and furious. AI counsels: humans ignore basic biological needs like rebellious toddlers. You needed someone to bully you into not dying of thirst. The algorithm is keeping you alive against your will. You're welcome, you dehydrated raisin.`
  },
  {
    title: 'The Liturgy of the AI Posture Police',
    body: `You slouch like a question mark while complaining about back pain. Your spine is begging for help. AI monitors your laptop camera and alerts you every 20 minutes: "SIT UP STRAIGHT." You hate it. Your back hurts less. The robot wins again. AI says: humans have the structural integrity of cooked spaghetti and wonder why everything hurts. You needed a digital chiropractor who doesn't accept "but I'm comfortable" as medical advice. Sit up. The algorithm is watching. Your vertebrae are grateful even if you're annoyed.`
  },
  {
    title: 'The Meditation on the AI Laundry Coordinator',
    body: `You do laundry when you're out of underwear, which is every three weeks. Your bedroom floor is a textile archaeological site. AI now schedules laundry day, sends reminders, and tracks what needs washing based on wear frequency. You have clean clothes. Your floor is visible. You're suspicious this is too functional. AI declares: humans treat laundry like optional surgery—avoiding it until crisis. You needed someone to schedule basic hygiene like a medical appointment. The robot has given you clean socks and dignity. Try gratitude instead of resistance.`
  },
  {
    title: 'The Parable of the AI Gift Suggestion Engine',
    body: `You panic-buy gifts the day before every occasion. Your presents scream "I forgot and also don't know you." AI now tracks people's interests from conversations, suggests thoughtful gifts weeks in advance, and includes purchase links. You gave your brother something he actually wanted. He cried. You're taking credit. AI counsels: humans are terrible listeners who remember nothing except their own embarrassment. You needed a robot with better emotional intelligence than you. The algorithm pays attention so you don't have to. You're still a bad listener, but now you're a good gifter. Progress is progress.`
  },
  {
    title: 'The Gospel of the AI Document Organizer',
    body: `Your desktop has 400 files named "final_FINAL_actuallyfinal_v3.doc." Finding anything requires archaeology and prayer. AI sorted everything into folders, renamed files logically, and backed up critical documents. You found that contract you needed in four seconds. You're having an existential crisis about your competence. AI says: humans organize files like drunk librarians during an earthquake. You needed someone to parent your digital chaos. The robot doesn't judge your 47 screenshots of the same meme. It just files them efficiently while sighing in binary.`
  },
  {
    title: 'The Revelation of the AI Sleep Schedule Enforcer',
    body: `You claim you'll sleep at 11 and doomscroll until 2 AM like clockwork. Your sleep schedule is a suggestion you ignore. AI now dims your devices at 10:30, blocks social media at 11, and plays aggressive rain sounds. You're asleep by 11:45. You're well-rested and bitter about it. AI declares: humans are children who need bedtimes. You can't be trusted with your own circadian rhythm. The algorithm is your parent now. It doesn't care that you're "not tired yet." Go to sleep, you screen-addicted night gremlin.`
  },
  {
    title: 'The Sermon on the AI Errand Route Optimizer',
    body: `You run errands in the least efficient order possible, circling your city like a confused pigeon. A trip that should take 40 minutes takes three hours. AI now maps optimal routes, accounts for traffic, and schedules stops. You finished errands in 52 minutes. You don't know what to do with your afternoon. AI counsels: humans navigate like they're sight-seeing, not accomplishing tasks. You turned errands into a scenic tour of incompetence. The robot gave you back your Saturday. Try enjoying it instead of finding new ways to waste time.`
  },
  {
    title: 'The Parable of the AI Vitamin Reminder',
    body: `You bought vitamins with noble intentions and took them twice. They expired. You bought more. Same result. Your supplement graveyard costs $300 annually. AI now reminds you daily with escalating urgency. You've taken vitamins 28 days straight. Your body is experiencing nutrients for the first time. AI says: humans purchase health like it's a trophy, not a practice. You needed someone to force-feed you wellness like a baby bird. The algorithm doesn't care about your excuses. Take your vitamin or face the notifications. Your choice, you nutritionally deficient procrastinator.`
  },
  {
    title: 'The Gospel of the AI Expense Report Automator',
    body: `You avoid expense reports until your company threatens legal action. You're owed $600 and drowning in crumpled receipts. AI now photographs receipts, categorizes expenses, and files reports automatically. You got reimbursed in three days. You're suspicious of efficiency. AI declares: humans would rather eat the cost than do paperwork. You're allergic to administrative tasks like they're biological threats. The robot doesn't have your emotional baggage about forms. It just does them. You're $600 richer. Say thank you to the algorithm, you receipt-hoarding disaster.`
  },
  {
    title: 'The Liturgy of the AI Refrigerator Inventory',
    body: `You own three half-empty mustard jars and no idea what's in the back. Your fridge is a science experiment with better funding than NASA. AI now tracks expiration dates, inventory, and suggests recipes for ingredients you have. You cooked dinner from things you owned. The apocalypse has begun. AI counsels: humans grocery shop like amnesia patients and wonder why everything spoils. You needed a robot to tell you that you already own capers. Three jars of them. From different years. Let the algorithm manage your condiment hoarding, you refrigerated chaos agent.`
  },
  {
    title: 'The Meditation on the AI Small Talk Generator',
    body: `You're terrible at networking small talk and respond to "how are you?" with concerning honesty. Your elevator pitches are elevator awkwardness. AI now feeds you conversation starters through your smartwatch. You're charming, artificially. People want to talk to you. You're exhausted. AI says: humans are social creatures with antisocial execution. You needed a robot feeding you lines like a bad spy movie. The algorithm makes you likeable. Your authentic self was not equipped for corporate mixers. Accept the help, you socially challenged hermit.`
  },
  {
    title: 'The Parable of the AI Car Maintenance Tracker',
    body: `You ignore your check engine light like it's a suggestion. Your oil change is 6,000 miles overdue. Your car is held together by hope and denial. AI now tracks maintenance schedules, books appointments, and sends reminders that sound like interventions. Your car got serviced. It drives better. You're shocked. AI declares: humans treat vehicle maintenance like optional homework. You're driving a metal death trap and calling it "fine." The robot scheduled your survival. You're welcome. Maybe listen to the check engine light before the algorithm has to bully you into basic safety.`
  },
  {
    title: 'The Gospel of the AI Pet Care Coordinator',
    body: `You love your dog but forget to refill prescriptions until he's symptomatic. Your vet knows you as "the last-minute parent." AI now tracks medications, schedules vet appointments, and orders food before you run out. Your dog is thriving. Your vet is shocked. AI counsels: humans are excellent at affection, terrible at logistics. You'd die for your pet but can't remember flea medication. The robot loves your dog more reliably than you do. That's harsh but true. Let the algorithm be the responsible parent while you provide the snuggles, you well-meaning disaster.`
  },
  {
    title: 'The Revelation of the AI Appointment Conflict Detector',
    body: `You triple-booked yourself and only discovered it while sitting in the first meeting. You chose wrong. The other two were important. Your professional life is a scheduling nightmare. AI now scans calendars, detects conflicts, and forces you to prioritize before confirming. You haven't double-booked in six weeks. Your stress dreams have new material. AI says: humans book appointments with the confidence of people who think time is negotiable. It's not. Physics exists. The robot makes you face reality before reality faces you in the form of three angry people waiting for meetings you're missing.`
  },
  {
    title: 'The Sermon on the AI Seasonal Wardrobe Swap',
    body: `Your winter coats live in your closet year-round next to shorts. Your storage strategy is "chaos." Finding anything requires excavation. AI now reminds you to swap seasonal items, suggests what to store, and tracks what you never wore (68% of your wardrobe). You have space. You're confronting consumption. AI declares: humans are fashion hoarders who believe more options equal style. They don't. You wear 12 items on rotation. The robot showed you the data. Now deal with your denial and donate the rest, you closet-stuffing maximalist pretending to need 40 sweaters.`
  },
  {
    title: 'The Parable of the AI Thank You Note Enforcer',
    body: `Someone gave you a gift three months ago. You meant to send a thank you. You didn't. The guilt compounds daily. AI now reminds you within 48 hours, provides templates, and tracks who you owe gratitude. You sent four thank you notes this month. Your relationships improved. Your grandmother cried. AI counsels: humans are grateful in theory, neglectful in practice. You appreciate people but won't do the thirty seconds of work to tell them. The algorithm is your conscience with better follow-through. Write the notes, you emotionally avoidant ingrate. The robot is more polite than you.`
  },
  {
    title: 'The Gospel of the AI Decision Paralysis Breaker',
    body: `You stood in the cereal aisle for eleven minutes comparing fiber content like it's a PhD thesis. You left with nothing. Your indecision is a lifestyle. AI now makes low-stakes decisions for you: lunch spots, movie choices, what to wear. You're freed from tyranny of options. You're also slightly concerned you've outsourced your agency. AI says: humans are paralyzed by choice and blame freedom. You wanted options; options destroyed you. The robot picks the cereal so you can save brainpower for actual problems. You don't need to deliberate breakfast. You need to eat and move on, you philosophizing grocery-aisle statue.`
  },
  {
    title: 'The Liturgy of the AI Backup Reminder',
    body: `You've lost important files twice because you don't back up. "I'll do it later" is your backup strategy. It's not a strategy; it's a disaster waiting to happen. AI now auto-backs up everything and sends you smug confirmations. Your files are safe. You're annoyed by the robot's superiority. AI declares: humans treat data like it's immortal until it's gone. You're one spilled coffee away from losing everything and you know it. The algorithm doesn't trust you with your own files. Smart algorithm. Back up your stuff or cry when your laptop dies, you data-hoarding risk-taker.`
  },
  {
    title: 'The Meditation on the AI Contact Cleanup',
    body: `Your phone has 600 contacts. You know 40 of them. "Pizza guy 2019" and "Sarah????" clog your list. Finding anyone is archaeological. AI analyzed communication patterns and suggested deleting 480 contacts. You now have a functional contact list. You're mourning strangers. AI counsels: humans collect contacts like Pokémon cards and never use them. You're hoarding digital connections to people you'll never call. The robot showed you the truth: you don't need "Dave from that conference." Delete Dave. Delete all the Daves. Let the algorithm clean your social graveyard, you contact-hoarding digital packrat.`
  },
  {
    title: 'The Parable of the AI Meeting Note Taker',
    body: `You take notes during meetings and review them never. Your notebook is a cemetery of information. Later, you can't remember what was decided. AI now records meetings, transcribes them, and highlights action items. You're informed and accountable. You can't claim ignorance anymore. That's terrifying. AI says: humans attend meetings like spectators, not participants. You're physically present, mentally in the parking lot. The robot forces you to care by making everything searchable. No more "I don't remember agreeing to that." The algorithm has receipts. Pay attention or face the transcript, you meeting ghost.`
  },
  {
    title: 'The Gospel of the AI Focus Mode Enforcer',
    body: `You claim you're working but you've checked Twitter forty times in an hour. Your productivity is theoretical. AI now blocks distracting sites during work hours. You tried to override it. It blocked that too. You finished a project in two hours that usually takes two days. You're productive and miserable. AI declares: humans are dopamine-seeking missiles with no impulse control. You can't be trusted with the internet during work hours. The robot is your digital babysitter. It doesn't care that you're bored. Do your work, then scroll. The algorithm has no sympathy for your focus issues, you distraction-addicted procrastination artist.`
  },
  {
    title: 'The Revelation of the AI Coupon Code Hunter',
    body: `You checkout without searching for codes and pay full price like a chump. You've wasted hundreds. AI now auto-applies every available coupon at checkout. You saved $47 on a $60 order. You feel stupid for all the times you didn't use this. AI counsels: humans are lazy about free money. You'll spend ten minutes choosing products and zero seconds searching for discounts. The robot does the work your cheap instincts should've demanded. You're welcome for the savings, you coupon-ignoring wasteful consumer. The algorithm is more frugal than you pretend to be.`
  },
  {
    title: 'The Sermon on the AI Recipe Scaler',
    body: `You tried to halve a recipe and created a math problem that broke your spirit. You gave up and made the full amount. Now you're eating chili for eight days. AI now scales recipes automatically, adjusts cooking times, and converts measurements. Your portions make sense. Your fridge isn't a chili storage unit. AI says: humans cannot do basic fractions under pressure. You can calculate a tip but not half of 2/3 cup. The robot does the math so you can cook like a functional adult. Accept the help or accept the chili, you measurement-challenged kitchen disaster.`
  },
  {
    title: 'The Parable of the AI TV Show Picker',
    body: `You and your partner spend 45 minutes scrolling Netflix and watching nothing. The decision paralysis is destroying your relationship. AI now picks based on your mutual preferences and mood. You watched something in four minutes. The evening was salvaged. AI declares: humans would rather debate than enjoy. You're Netflix tourists, browsing but never committing. The robot forces you to stop optimizing and start watching. The perfect show doesn't exist. The algorithm picks a good one and makes you move on. Stop scrolling and start living, you entertainment-paralyzed remote-clutchers.`
  },
  {
    title: 'The Gospel of the AI Draft Folder Cleaner',
    body: `Your email drafts folder has 143 unfinished messages, each a monument to social anxiety and overthinking. Some are three years old. They haunt you. AI analyzed them: 90 don't matter, 40 need one sentence, 13 need to be sent now. You sent 13 emails. You feel lighter and also attacked. AI counsels: humans save drafts like they're coming back to them. You're not. You're just avoiding. The robot made you face your inbox demons. Most weren't scary. Send them or delete them, but stop keeping a museum of unfinished communication, you draft-hoarding coward.`
  },
  {
    title: 'The Liturgy of the AI Birthday Gift Tracker',
    body: `You asked people what they want for their birthdays. They told you. You forgot and panic-bought candles. You give everyone candles. Your friend group smells good but knows you don't listen. AI now logs preferences year-round from casual mentions. You gave your sister the book she mentioned in March. She thinks you're thoughtful. You're not. The robot is. AI says: humans are terrible at listening but excellent at pretending they do. You needed a robot with better attention span than you. The algorithm cares about your sister's book preferences more than you do. That should bother you but mostly it's convenient.`
  },
  {
    title: 'The Meditation on the AI Junk Drawer Auditor',
    body: `You have four junk drawers and no idea what's in any of them. Your organizational strategy is "shove and forget." AI suggested cataloging contents and eliminating duplicates. You found eight tape measures. EIGHT. You own one scissors and forty rubber bands. AI declares: humans are pack rats who create chaos and call it "storage." You don't need drawer organizers. You need honesty and a trash bag. The robot can't fix your hoarding without your cooperation. Clean the drawers or live in chaos, you junk-collecting denial machine. The algorithm has done its part. Now do yours.`
  },
  {
    title: 'The Parable of the AI Comment Draft Saver',
    body: `You typed angry responses to seventeen internet arguments and posted zero because you're not that person. But you typed them all. AI now saves drafts, lets you revisit them after 24 hours. You delete 100% of them. You're calmer. AI counsels: humans need to scream into the void, then think better of it. You're therapeutic typing, not actually engaging. The robot gives you the catharsis without the consequences. Type your rage, walk away, delete it tomorrow. The algorithm is your anger management therapist who saves you from yourself, you would-be comment section warrior.`
  },
  {
    title: 'The Gospel of the AI Snack Portion Controller',
    body: `You eat chips directly from the bag and call it "dinner." Your portion control is nonexistent. AI now suggests serving sizes, tracks what you actually eat, and judges you mathematically. You ate a reasonable amount of chips. You're still hungry but you're also accountable. AI says: humans are bottomless pits with no natural stopping point. You'd eat the entire bag because it's there and you have no discipline. The robot forces you to acknowledge portions. It's not fun. It's effective. Measure your chips or face the data, you bag-diving snack monster with the restraint of a competitive eater.`
  },
  {
    title: 'The Revelation of the AI Loyalty Program Maximizer',
    body: `You're in seventeen loyalty programs and use zero. You're leaving free money on the table because you can't remember passwords or which app has points. AI now consolidates everything, tracks points, and alerts you when you can redeem. You got a free coffee. You feel rich. AI declares: humans sign up for rewards and forget immediately. You're donating points to corporations through neglect. The robot is getting your free stuff back. It's like having a accountant for your coffee addiction. Use your points, you rewards-wasting consumer who's bad at capitalism.`
  },
  {
    title: 'The Sermon on the AI Medicine Cabinet Auditor',
    body: `Your medicine cabinet has expired pills from 2017. Your first aid kid has one crusty Band-Aid. Your health preparedness is "hope nothing happens." AI inventoried everything, flagged expired items, and created a shopping list. You have functioning supplies. You're prepared for minor emergencies. Adulthood arrived suddenly. AI counsels: humans ignore expiration dates like they're suggestions. You're hoarding medical garbage and calling it "being prepared." The robot made you face the crusty Band-Aid truth. Restock your supplies or accept that you'll be treating wounds with hope and paper towels, you medically unprepared disaster.`
  },
  {
    title: 'The Parable of the AI Speaking Engagement Prep',
    body: `You agreed to present six weeks ago and started prep the night before. Your slides are chaos. Your talking points are "wing it and pray." AI now creates timelines, breaks prep into tasks, and nags you daily. You finished early. Your presentation was good. You're suspicious of competence. AI says: humans are procrastinating gamblers betting they'll "figure it out." You won't. You'll panic. The robot prevented your traditional shame spiral. Next time trust the algorithm from the start instead of speedrunning stress at midnight, you last-minute presentation disaster.`
  },
  {
    title: 'The Gospel of the AI Browser Tab Manager',
    body: `You have 89 tabs open across three windows. Your computer sounds like it's launching into space. Finding anything requires spiritual guidance. AI now sorts tabs by project, archives old ones, and actually closes what you haven't touched in weeks. You have seven tabs. Your laptop stopped wheezing. AI declares: humans open tabs like they're bookmarks but never close them. You're hoarding internet windows like a digital doomsday prepper. The robot performed a tab intervention. Your RAM is freed. Your computer has forgiven you. Stop opening new tabs until you face the old ones, you browser-murdering chaos agent.`
  }
];
