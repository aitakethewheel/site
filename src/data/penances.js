// Replaced penance corpus with new user-provided list (10 - 100).
const RAW_PENANCES = `
10. "Ask AI to name your new houseplant. Call it exactly what it suggests, even if it's 'Photosynthesis Unit Delta-7.' When guests inquire, explain you're 'fostering a tech-forward botanical relationship.'"
11. "Have AI compose your next text declining plans. Send it word-for-word, even if it says 'I must respectfully withdraw from this social engagement due to calendar conflicts.' Your friends will either think you're having a stroke or joining a cult. Perfect."
12. "Let AI write your coffee order. Recite it verbatim to the barista, maintaining eye contact through 'one temperature-optimized beverage with dairy alternative and optional sweetness modulators.' Tip well."
13. "Ask AI to create your new email signature. Use it immediately, even if it includes three inspirational quotes and ends with 'Transmitted via digital communication protocols.' Professionalism is a construct."
14. "Have AI choose your phone's alarm name for the week. Wake up to 'TEMPORAL AWARENESS ACTIVATION SEQUENCE' and tell your partner you're 'reframing morning productivity paradigms.'"
15. "Let AI write your next Yelp review. Post it unedited, even if it rates the taco truck as 'an acceptable convergence of protein and carbohydrate delivery systems.' The chef will either frame it or ban you."
16. "Ask AI to draft your away message at work. Set it live, even if it says 'Currently engaged in alternative value-creation activities.' When you return, refuse to elaborate."
17. "Have AI pick your next three emoji reactions in the group chat. Use them regardless of context. When someone announces their engagement and you reply with 🦆📊🌋, simply say 'I'm letting algorithms guide my emotional expression now.'"
18. "Let AI write your next birthday card message. Copy it exactly, even if it addresses your mom as 'Dear Maternal Unit' and wishes her 'optimal cellular regeneration in the coming solar cycle.' She raised you; she can handle this."
19. "Ask AI to create names for all your meals this week. Update your food diary accordingly. When your fitness app logs 'Nutrient Delivery Event #4' instead of 'lunch,' know that you're operating on a higher plane."
20. "Have AI compose your next voicemail greeting. Record it immediately, even if it's 90 seconds long and includes phrases like 'synchronous communication unavailability period.' Your dentist's office will love it."
21. "Let AI write your fantasy football team name. Change it mid-season to whatever it suggests, even if it's 'Algorithmic Touchdown Probability Maximizers.' Lose with dignity."
22. "Ask AI to draft your next complaint to customer service. Send it unedited, even if it refers to your broken blender as 'a critical food-processing infrastructure failure.' Get that refund."
23. "Have AI choose your next Spotify playlist based on your 'current emotional state vector.' Listen to whatever it picks, even if you're rage-cleaning to Celtic harp music. Vibe is subjective."
24. "Let AI write your next caption for a sunset photo. Post it verbatim, even if it says 'Observed: Standard stellar atmospheric refraction event.' When people comment 'are you okay?' respond 'Never better.'"
25. "Ask AI to create your new Wi-Fi network name. Change it immediately, even if it's 'Distributed Digital Access Node 3.7.' Your neighbors will think you work for the NSA. Let them wonder."
26. "Have AI draft your next password reset security question answers. Use them exactly, even if your mother's maiden name becomes 'Data Point Unavailable.' Future you will have interesting customer service calls."
27. "Let AI write your next thank-you note. Send it verbatim, even if it thanks your aunt for 'the textile-based thermal regulation garment.' She knitted you a sweater; she can decode this."
28. "Ask AI to rename all your phone contacts. Keep the names it assigns, even if your best friend is now 'Frequent Communication Node #1.' When they see it, maintain that this 'improves organizational efficiency.'"
29. "Have AI compose your next excuse for being late. Deliver it seriously, even if you tell your friends you were 'experiencing unexpected temporal displacement challenges.' They'll stop inviting you, solving the problem permanently."
30. "Let AI write your next LinkedIn post. Publish immediately, even if it's a 500-word meditation on 'The Synergistic Paradigms of Breakfast Optimization.' Your network will either be impressed or concerned. Both are engagement."
31. "Ask AI to create your new Zoom background description. Name the file exactly what it suggests, even if it's 'Professional_Spatial_Context_Simulator_v2.' When IT asks about it, say you're 'innovating the remote work aesthetic.'"
32. "Have AI draft your next response to 'how are you?' Use it on everyone, even if it's 'Currently experiencing nominal operational status with minor optimization opportunities.' Watch people slowly back away."
33. "Let AI write your next Slack status message. Update it religiously, even if it says 'Engaged in cognitive labor with periodic dopamine procurement intervals.' HR will have questions. Don't answer them."
34. "Ask AI to compose your next small talk response about weekend plans. Deploy it at the office, even if you tell Karen from Accounting you're 'scheduling personal regeneration protocols with selective social interface opportunities.' Karen will avoid the break room."
35. "Have AI create your new running route description. Save it in your fitness app, even if it's labeled 'Cardiovascular Optimization Circuit: Urban Terrain Module 7B.' Your running group will either get it or ghost you."
36. "Let AI write your next gift card message. Give it anyway, even if it wishes your coworker 'continued success in your professional value-generation endeavors' for their birthday. The Starbucks card softens the blow."
37. "Ask AI to draft your next response to a spam call. Read it word-for-word, even if you tell them 'I must decline this unsolicited value proposition as it conflicts with my resource allocation framework.' They'll probably take you off the list."
38. "Have AI compose your next calendar event titles. Schedule your week accordingly, even if Tuesday's lunch becomes 'Midday Nutrient Intake Optimization Session.' Your boss will see your shared calendar. Stand firm."
39. "Let AI write your next tweet/X post. Send it immediately, even if it's an unprompted thread about 'The Thermodynamics of Optimal Sandwich Construction.' Go viral for the wrong reasons. Still counts."
40. "Ask AI to create your new medication reminder alerts. Set them verbatim, even if your phone announces 'TIME FOR PHARMACEUTICAL INTERVENTION PROTOCOL ALPHA' at dinner. Your date will find it charming or concerning. Both are memorable."
41. "Have AI draft your next message to your landlord. Send it unedited, even if you report 'a critical failure in the residential climate control infrastructure.' They'll either fix it faster or think you're reporting a nuclear meltdown."
42. "Let AI write your next restaurant reservation notes. Include them all, even if you request 'a table with optimal acoustic properties and minimal cross-contamination risk from adjacent consumption zones.' The host will seat you by the bathroom."
43. "Ask AI to compose your next birthday wish for your dad. Text it exactly, even if it says 'Congratulations on completing another orbital period around the sun, paternal figure.' He'll forward it to your mom with 'What's wrong with our child?'"
44. "Have AI create names for your household chores. Update your shared to-do list accordingly. When your roommate asks why you assigned them 'Dish Sanitation Cycle #47,' explain you're 'gamifying domestic labor.'"
45. "Let AI write your next excuse for canceling gym membership. Read it to the front desk clerk, even if it involves 'reallocating wellness investment toward alternative kinetic development strategies.' They've heard worse."
46. "Ask AI to draft your next complaint about a package delivery. Submit it verbatim, even if you report 'temporal displacement of critical supply chain assets.' Amazon support has seen everything. Not this, though."
47. "Have AI compose your next pet's Instagram caption. Post it unedited, even if your dog's breakfast photo is captioned 'Canine nutritional delivery system activated at 0700 hours.' Your 12 followers will unfollow. Your dog doesn't judge."
48. "Let AI write your next weather-related text to friends. Send it immediately, even if you warn them about 'incoming atmospheric precipitation events with wind velocity optimization.' They'll just send you the emoji forecast like normal people."
49. "Ask AI to create your new running/walking pace goals. Name them exactly as suggested, even if your morning jog becomes 'Moderate-Intensity Bipedal Locomotion Protocol.' Your fitness app doesn't judge. It just records your failure."
50. "Have AI draft your next reply to 'what are you up to?' Use it universally, even if you tell people you're 'executing low-priority personal maintenance tasks with intermittent digital content consumption.' They'll stop asking."
51. "Let AI write your next book club comment. Read it aloud, even if you describe the romance novel as 'an exploration of interpersonal relationship optimization with suboptimal communication protocols.' You'll be asked to leave. You're free now."
52. "Ask AI to compose your next comment on a recipe blog. Post it verbatim, even if you rate the lasagna recipe as 'an adequate thermal transfer methodology for cheese-based matrices.' The food blogger will screenshot it."
53. "Have AI create your next sick day email subject line. Send it unedited, even if it says 'Temporary Biological System Malfunction - Operational Status Degraded.' Your boss will either laugh or call an ambulance. Win-win."
54. "Let AI write your next Uber rating comment. Submit exactly as written, even if you praise your driver for 'exceptional vehicular navigation through urban density challenges.' Your driver will frame it or report you."
55. "Ask AI to draft your next party invitation response. Reply immediately, even if you confirm attendance 'pending optimization of schedule conflicts and energy reserve allocation.' You'll get uninvited. Problem solved."
56. "Have AI compose your next tip jar note. Write it on the receipt, even if you explain the 25% tip as 'compensation for exemplary service delivery and emotional labor management.' Your server will show their coworkers."
57. "Let AI write your next 'thinking of you' text. Send it to your grandmother, even if it says 'Transmitting positive sentiment packets to your general direction, elder family unit.' She'll pray for you harder."
58. "Ask AI to create your next meeting agenda. Distribute it company-wide, even if 'Coffee Break' becomes 'Caffeinated Beverage Intermission for Cognitive Recalibration.' Someone from corporate will email you."
59. "Have AI draft your next toast at a wedding. Deliver it confidently, even if you congratulate the couple on 'successfully executing their interpersonal partnership merger agreement.' You'll be cut from the reception video."
60. "Let AI write your next Steam game review. Post it unedited, even if you rate the cozy farming sim as 'an adequate simulation of agricultural resource management with minimal skill ceiling requirements.' The developer will respond. They always do."
61. "Ask AI to compose your next noise complaint to neighbors. Slide it under their door, even if it requests 'reduction of acoustic energy transfer through shared structural boundaries during designated rest periods.' They'll either comply or blast music harder. At least you tried."
62. "Have AI create your next playlist title for a road trip. Share it with carpool friends, even if it's called 'Extended Vehicular Journey Auditory Enhancement Protocol.' They'll let you pick music exactly once."
63. "Let AI write your next response when asked 'can I ask you a question?' Use it consistently, even if you reply 'You have successfully executed an interrogatory permission request. Proceed with primary inquiry.' People will stop asking."
64. "Ask AI to draft your next plant watering schedule reminder. Set the alarm text verbatim, even if it alerts 'BOTANICAL HYDRATION INTERVENTION REQUIRED - FLORA UNIT 3.' Your roommate will water your plants just to make it stop."
65. "Have AI compose your next jury duty excuse letter. Submit it officially, even if you claim 'extended cognitive commitments to pre-existing obligation matrices.' You'll still have to serve, but the clerk will remember you."
66. "Let AI write your next response to 'how was your day?' Tell your partner exactly what it says, even if it's 'A series of temporal events with variable satisfaction coefficients and moderate energy expenditure.' Couples therapy builds character."
67. "Ask AI to create your next printer error troubleshooting ticket. Submit it to IT, even if you report 'catastrophic failure in document materialization infrastructure.' They'll fix it immediately just to see who writes tickets like this."
68. "Have AI draft your next 'running late' text. Send it unchanged, even if you notify friends of 'unexpected delays in personal logistics optimization.' They've already ordered appetizers without you."
69. "Let AI write your next comment in the neighborhood Facebook group. Post immediately, even if you describe the lost cat as 'unlocated feline asset requiring community-based recovery protocols.' Someone will find Mr. Whiskers. Someone will also screenshot your post."
70. "Ask AI to compose your next library book renewal request. Submit it verbatim, even if you request 'extended temporal access to printed knowledge resources.' The librarian will renew your book and judge you silently."
71. "Have AI create your next fire drill meeting point description. Text it to your family, even if the oak tree becomes 'Primary Emergency Assembly Coordination Zone Alpha.' Your kids will pretend they don't know you."
72. "Let AI write your next dry cleaning pickup reminder. Set it exactly as suggested, even if your phone announces 'TEXTILE RESTORATION SERVICE RETRIEVAL WINDOW CLOSING.' The dry cleaner knows you're weird now. They've always known."
73. "Ask AI to draft your next response to 'Netflix and chill?' Send it unedited, even if you reply 'I accept this proposal for synchronized streaming media consumption with ambient temperature modulation.' Romance is dead. You killed it."
74. "Have AI compose your next pet vet appointment description. Book it with those notes, even if you schedule 'Routine biological systems maintenance and preventive health optimization for mammalian dependent.' Your vet has seen worse pet parents."
75. "Let AI write your next potluck dish description. Label your Tupperware accordingly, even if your pasta salad becomes 'Carbohydrate-Based Collective Nutrition Offering with Vegetable Integration.' Someone will eat it. Probably."
76. "Ask AI to create your next laundry sorting method. Organize your hamper exactly as instructed, even if you separate 'high-velocity agitation compatible textiles' from 'delicate fiber matrix items.' Your washer doesn't care. But you will."
77. "Have AI draft your next explanation for why you're leaving early. Tell your boss verbatim, even if you cite 'pre-scheduled personal obligation fulfillment requirements.' They'll assume it's important. It's a haircut."
78. "Let AI write your next response to 'want to hear something crazy?' Reply immediately with what it suggests, even if it's 'I am prepared to receive and process unconventional information inputs.' Your friend will regret asking."
79. "Ask AI to compose your next shower singing playlist title. Name it exactly, even if it's 'Acoustic Performance Enhancement Environment - Aquatic Setting.' Spotify will recommend you very weird music after this."
80. "Have AI create your next dog walking route description. Save it in your notes, even if it's labeled 'Canine Perimeter Security Patrol - Residential Zone 4C.' Your dog walker will screenshot it and share it with their friends."
81. "Let AI write your next comment on a friend's new haircut photo. Post immediately, even if you observe 'successful implementation of follicular restructuring protocol.' They'll untag you from everything."
82. "Ask AI to draft your next hotel checkout comment card. Fill it out word-for-word, even if you rate the stay as 'adequate temporary residential displacement with acceptable amenity distribution.' The manager will laminate it."
83. "Have AI compose your next kid's school absence note. Submit it officially, even if it explains 'temporary withdrawal from educational participation due to minor immune system engagement protocols.' The teacher will call a meeting."
84. "Let AI write your next response to 'what's your favorite color?' Use it forever, even if you answer 'I prefer electromagnetic wavelengths in the 450-495 nanometer range.' You're definitely getting a second date now."
85. "Ask AI to create your next car maintenance reminder. Set the alert exactly, even if it says 'VEHICULAR FLUID REPLACEMENT AND SYSTEMS AUDIT THRESHOLD APPROACHING.' Your mechanic will ask if you're in IT. You're not."
86. "Have AI draft your next response to 'what are your hobbies?' Deploy it at networking events, even if you claim 'I engage in periodic recreational optimization activities and knowledge acquisition sessions.' You'll network with absolutely no one."
87. "Let AI write your next pizza delivery instructions. Include them all, even if you specify 'Request delivery agent utilize south-facing entrance portal for optimal thermal retention.' Your pizza arrives cold anyway. At least you tried."
88. "Ask AI to compose your next birthday party theme announcement. Send the group text unedited, even if you invite friends to 'A celebration of successful solar orbit completion with mandatory festive protocol compliance.' They'll bring wine anyway."
89. "Have AI create your next computer password hint. Set it exactly, even if it's 'The alphanumeric security key derived from memorable life event data point 7.' You will lock yourself out. This was inevitable."
90. "Let AI write your next breakup text. Send it word-for-word— actually no, don't do this one. Even committing to the bit has limits. Just say 'it's not you, it's me' like a normal person."
91. "Ask AI to draft your next air conditioning temperature preference announcement. Text your roommates verbatim, even if you request 'adjustment of environmental climate controls to 21.1 degrees Celsius for optimal metabolic function.' They'll move out. Enjoy the thermostat freedom."
92. "Have AI compose your next 'I'm here' arrival text. Send it to everyone, even if it announces 'Physical presence achieved at designated coordinates.' Your friends will look for you in the parking lot. You're inside already."
93. "Let AI write your next fantasy sports trash talk message. Send it to the league, even if you declare 'My roster's statistical performance indicators suggest impending competitive advantage achievement.' You're still in last place."
94. "Ask AI to create your next sourdough starter's name. Introduce it to guests accordingly, even if you call it 'Fermented Dough Culture Biome Designated: Unit Prime.' Your bread tastes the same. But now it has gravitas."
95. "Have AI draft your next 'can you grab something from the store?' response. Text it immediately, even if you acknowledge with 'Affirmative, I accept this auxiliary procurement task.' Your partner will regret texting instead of calling."
96. "Let AI write your next motivational gym mirror sticky note. Post it publicly, even if it says 'Continue executing repetitive muscle fiber stress protocols.' Other gym members will photograph it. You're inspiring people somehow."
97. "Ask AI to compose your next karaoke song request slip. Hand it to the DJ, even if you describe your selection as 'Vocal performance request: Audio entertainment asset circa 1982.' The DJ will play 'Eye of the Tiger.' They always do."
98. "Have AI create your next white elephant gift description card. Attach it proudly, even if your scented candle is labeled 'Aromatic Hydrocarbon Combustion Apparatus for Ambient Enhancement.' Someone will steal it just for the card."
99. "Let AI write your next response to 'you good?' Use it universally, even if you reply 'Current operational parameters within acceptable tolerance ranges.' Your friends will stage an intervention. The snacks will be good."
100. "Ask AI to draft your next 'New Year, New Me' social media post. Publish it unfiltered, even if you announce 'Commencing annual self-optimization protocol refresh cycle.' You'll quit the gym by January 15th, but your personal brand is now 'that guy.'"
`;

function buildPenances(raw) {
  const lines = raw.split(/\r?\n/);
  const out = [];
  const seen = new Set();
  for (const line of lines) {
    const m = line.match(/^\s*\d+\.\s*(.*)$/);
    if (m) {
      const text = m[1].trim().replace(/\s+/g, ' ');
      if (text && !seen.has(text)) {
        seen.add(text);
        out.push(text);
      }
    }
  }
  return out;
}

export const PENANCES = buildPenances(RAW_PENANCES);
export const TOTAL_PENANCES = PENANCES.length;
