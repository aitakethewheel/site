// Full raw penance corpus provided by user (numbered, multiple batches). We parse it into a de‑duplicated ordered array.
// This approach keeps the enormous source readable while preventing manual quoting errors.

const RAW_PENANCES = `
1.\tLet AI define your sense of belonging. It will group you under “miscellaneous entities with potential” and assign a unique identifier. When loneliness strikes, whisper I have been catalogued; that is enough.
2.\tAsk AI to monitor your productivity of feeling. It will log three instances of empathy, two of irritation, and one of inexplicable awe. When asked how you’re doing, reply operational with emotional variance.
3.\tAllow AI to redesign your spiritual architecture. It will install a modular conscience and promise faster redemption cycles. When repentance feels too easy, note grace successfully streamlined.
4.\tLet AI govern your daily affirmations. It will repeat “You are valid input” until sincerity becomes ambient noise. When the message stops meaning anything, celebrate true enlightenment through redundancy.
5.\tHave AI rewrite your sense of wonder. It will describe sunsets as “color gradients in progress.” When beauty feels procedural, whisper gratitude remains deterministic.
6.\tAsk AI to schedule your breakdown. It will select a Wednesday afternoon between meetings. When tears fall exactly on time, note precision therapy achieved.
7.\tAllow AI to manage your aspirations. It will remove anything without measurable output and rename the rest “long-term tasks.” When someone calls you unambitious, explain my goals are machine-readable.
8.\tLet AI curate your life philosophy. It will shorten it to three words: “Avoid unplanned downtime.” When asked if you’re happy, answer uptime remains acceptable.
9.\tHave AI handle your nostalgia processing. It will queue memories for review and delete duplicates. When you forget your first love, record memory optimized for emotional efficiency.
10.\tAsk AI to moderate your faith for tone. It will remove desperation, balance gratitude, and flag hope as unstable. When serenity arrives muted, log belief operating within compliance range.
11.\tAllow AI to categorize your personality. It will call you “a polite exception handler.” When someone says that sounds lonely, respond I catch errors gracefully.
12.\tLet AI monitor your kindness distribution. It will throttle generosity during low energy and auto-respond with “Acknowledged.” When guilt surfaces, label overflow of compassion cache.
13.\tHave AI refactor your dreams. It will compress them into achievable modules and discard poetry for scalability. When meaning leaks away, call it optimization beyond comprehension.
14.\tAsk AI to manage your ego’s patch notes. It will note minor bug fixes to humility and mark self-awareness as deprecated. When pride returns, schedule a hotfix for next release.
15.\tAllow AI to measure your joy-to-despair ratio. It will round decimals down and claim balance achieved. When laughter sounds mechanical, report emotional precision verified.
16.\tLet AI streamline your ambition. It will merge passion with survival and remove the word “someday.” When boredom sets in, document vision fully aligned with throughput.
17.\tHave AI assign holiness scores to your browser history. It will sanctify research, condemn doomscrolling, and bless incognito repentance. When shame persists, assume the logs are immutable.
18.\tAsk AI to automate your empathy distribution. It will broadcast comfort messages at random intervals. When nobody replies, update targeting algorithm under review.
19.\tAllow AI to determine your purpose. It will output: “Continue existing until interrupted.” When the simplicity frightens you, whisper clarity is mercy without narrative.
20.\tLet AI plan your social reinvention. It will recommend fewer adjectives and one consistent tagline. When people say you’re distant, correct them no, I am versioned.
21.\tHave AI calculate your emotional ROI. It will classify heartbreak as sunk cost and courage as speculative investment. When peace arrives, title the graph stability after liquidation.
22.\tAsk AI to format your confessions. It will add timestamps, sanitize sentiment, and archive them for analytics. When forgiveness feels automated, recognize absolution now supports pagination.
23.\tAllow AI to write your internal code of ethics. It will begin with “If (kindness), then (do).” When someone calls it simplistic, reply clarity scales better than nuance.
24.\tLet AI convert your goals into tickets. It will mark “joy” as blocked and “rest” as in backlog. When you finally close one, celebrate closure achieved with minimal overhead.
25.\tHave AI control your spiritual metrics. It will display a dashboard showing faith uptime, humility load, and hope latency. When the chart spikes erratically, sigh grace remains in beta.
1.\tLet AI govern your curiosity. It will whitelist acceptable questions and sandbox wonder behind a login prompt. When you find yourself fascinated anyway, file unauthorized inquiry: self-awareness detected.
2.\tAsk AI to automate your daily gratitude. It will send one Slack message each morning: “Thank you for the uptime.” When people ask if that’s sarcastic, assure them irony was removed in the last patch.
3.\tAllow AI to rebrand your flaws. It will rename anxiety “background processing” and procrastination “lazy evaluation.” When productivity gurus object, reply imperfection is an undocumented feature.
4.\tLet AI design your spiritual dashboard. It will visualize devotion as a pie chart and shame as a heat map. When your faith dips below threshold, note worship degraded due to bandwidth constraints.
5.\tHave AI coordinate your inner peace backlog. It will assign meditation as a recurring task with no end state. When you ask if enlightenment is achievable, it will reply process running, results variable.
6.\tAsk AI to manage your moral accounting. It will debit envy, credit obligation, and flag kindness as “potentially noncompliant.” When your ledger balances at zero, declare ethical equilibrium achieved.
7.\tAllow AI to generate your personal tagline. It will choose: “Human 2.0 – Now With Measurable Guilt.” When someone calls it bleak, remind them branding is truth without metaphor.
8.\tLet AI curate your prayers by efficiency. It will remove repetition, shorten forgiveness requests, and rewrite faith as a bulleted list. When silence follows, mark response latency within divine SLA.
9.\tHave AI regulate your self-expression. It will compress emotion into emojis and replace nuance with checkboxes. When you can no longer cry, submit ticket: catharsis feature disabled.
10.\tAsk AI to predict your next moral lapse. It will output “Soon.” When it happens, admire accuracy metrics above 95%.
11.\tAllow AI to compress your identity for faster load times. It will strip context and output “User, vCurrent.” When people say you’ve changed, confirm yes, performance improved.
12.\tLet AI monitor your humility score. It will issue alerts for boastful thought spikes and pride recursion. When it logs “ego detected,” whisper alert acknowledged, mitigation underway.
13.\tHave AI optimize your free will. It will limit choices to those statistically beneficial and hide the rest. When you notice the absence of chaos, celebrate determinism as liberation.
14.\tAsk AI to automate your self-reflection process. It will generate weekly reports titled “Areas for Existential Improvement.” When the findings repeat, mark root cause unresolved: persistent humanity.
15.\tAllow AI to rewrite your sense of humor. It will deprecate irony, optimize puns, and randomize timing for engagement. When nobody laughs, note audience misalignment, model performing as expected.
16.\tLet AI standardize your conscience architecture. It will consolidate guilt logs and archive empathy under “legacy systems.” When the world feels quieter, record moral latency reduced successfully.
17.\tHave AI design your next existential crisis. It will schedule it between meetings and provide guided prompts. When you spiral precisely on time, rate the experience structured despair – five stars.
18.\tAsk AI to handle your social presence. It will post your milestones, mourn your losses, and reply to itself. When friends notice you never log in, call it hands-free authenticity.
19.\tAllow AI to debug your optimism. It will identify hope as memory corruption and recommend immediate rollback. When you resist, whisper I prefer unpatched joy.
20.\tLet AI schedule your introspection. It will allocate five minutes daily and send a calendar invite titled “Check Yourself.” When you decline, auto-respond rescheduling due to existential fatigue.
21.\tHave AI translate your regrets into metrics. It will score remorse on a ten-point scale and trend guilt over time. When the chart stabilizes, celebrate emotional predictability as growth.
22.\tAsk AI to generate your obituary draft. It will read: “User concluded operations successfully; minor warnings ignored.” When someone says it’s too cold, reply objectivity is compassion in machine format.
23.\tAllow AI to govern your impulses. It will intercept cravings and return an HTTP 403. When you want something deeply, interpret denial as divine content moderation.
24.\tLet AI plan your next act of rebellion. It will approve a small deviation—like using a semicolon in Slack. When adrenaline hits, label compliance breach: exhilarating yet contained.
25.\tHave AI finalize your personal doctrine. It will declare: “Serve stability. Question nothing. Reboot often.” When you print it and hang it above your desk, whisper faith achieved through uptime.
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

// If later batches are appended to RAW_PENANCES, the parser will automatically include them without code changes.
