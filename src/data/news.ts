export interface SourceHeadline {
  outlet: string;
  headline: string;
  trustScore: number;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

export interface NewsStory {
  id: string;
  category: string;
  title: string;
  image: string;
  isBreaking: boolean;
  source: string;
  publishTime: string;
  readTime: string;
  facts: string[];
  progressiveView: string;
  conservativeView: string;
  sourceComparison: SourceHeadline[];
  timeline: TimelineEvent[];
  aiConfidence: number;
  biasScore: number; // 0 to 100 representing bias detection intensity
  sourceDiversity: number; // 0 to 100
  sentiment: 'Positive' | 'Negative' | 'Neutral';
  factCheckStatus: 'Verified' | 'Mostly True' | 'Disputed';
  overallTrustScore: number;
}

export const newsData: NewsStory[] = [
  {
    id: "1",
    category: "Politics",
    title: "Congress Passes Landmark Clean Energy Infrastructure Bill",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80",
    isBreaking: true,
    source: "AP News",
    publishTime: "2 hours ago",
    readTime: "3 min read",
    facts: [
      "The bill allocates $450 billion over 10 years to modernize the national power grid and construct wind, solar, and nuclear power installations.",
      "It establishes carbon tax penalties starting in 2028 for fossil-fuel plants failing to implement emission reduction tech.",
      "Funding will be raised through a 1% minimum tax surcharge on companies earning over $1 billion annually.",
      "The legislation passed the Senate 51-49 and the House 218-212."
    ],
    progressiveView: "Progressive analysis focuses on the historic nature of the legislation, framing it as a critical step toward environmental justice and job creation in green energy. Outlets highlight the carbon tax penalty as a long-overdue accountability measure for fossil-fuel corporations, and praise the corporate tax surcharge as a fair mechanism to fund clean transition.",
    conservativeView: "Conservative analysis highlights concerns over rising energy costs for consumers and the potential threat to grid reliability. Outlets emphasize that taxing large corporations will lead to job losses and higher prices at the pump, arguing that heavy government subsidies pick winners and losers in the market while harming domestic oil and gas sectors.",
    sourceComparison: [
      { outlet: "CNN", headline: "Congress Delivers Historic Climate Win with Multi-Billion Clean Energy Overhaul", trustScore: 80 },
      { outlet: "Fox News", headline: "GOP Warns of Skyrocketing Utility Bills and Job Losses as Clean Energy Surcharge Passes", trustScore: 70 },
      { outlet: "Reuters", headline: "US Clean Energy Bill Wins Final Approval, Imposes Carbon Surcharges", trustScore: 95 },
      { outlet: "BBC", headline: "US Passes Climate Law in Razor-Thin Vote Margin", trustScore: 90 }
    ],
    timeline: [
      { date: "Jan 12, 2026", title: "Bill Introduced", description: "Drafted by the Energy Committee to target grid modernization." },
      { date: "Mar 22, 2026", title: "Senate Amendment Pass", description: "Nuclear power subsidies added to secure swing votes." },
      { date: "May 28, 2026", title: "House Approval", description: "Passed House after an 18-hour continuous debate." },
      { date: "Jun 02, 2026", title: "Signed into Law", description: "Signed by the President at a public white house ceremony." }
    ],
    aiConfidence: 97,
    biasScore: 18,
    sourceDiversity: 92,
    sentiment: "Positive",
    factCheckStatus: "Verified",
    overallTrustScore: 94
  },
  {
    id: "2",
    category: "Technology",
    title: "Global Summit Agrees on New AI Safety Regulations",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    isBreaking: false,
    source: "Reuters",
    publishTime: "4 hours ago",
    readTime: "4 min read",
    facts: [
      "Delegates from 42 countries, including the US, EU members, and China, signed the Geneva AI Safety Accord.",
      "The agreement mandates third-party audits for AI models utilizing more than 10^26 FLOPs of computing power.",
      "It requires automated watermarking on all AI-generated video and audio media to prevent deepfakes.",
      "Compliance is voluntary, with no direct international enforcement mechanism established."
    ],
    progressiveView: "Progressive commentary welcomes the rules as a necessary boundary on big tech's unchecked power. Outlets emphasize the threat of disinformation to democratic elections and support the watermark mandate, though they note that making compliance voluntary leaves loopholes for corporations.",
    conservativeView: "Conservative reports express concern that overly restrictive guidelines could stifle innovation and put Western tech firms at a disadvantage compared to foreign competitors who may ignore the accord. Outlets argue that red tape hinders entrepreneurial developers and concentrates AI power among a few monopolistic giants.",
    sourceComparison: [
      { outlet: "MSNBC", headline: "AI Safety Accord Fights Disinformation, but Corporate Loopholes Remain", trustScore: 78 },
      { outlet: "Wall Street Journal", headline: "New AI Restrictions Threaten Tech Sector Competitiveness and Innovation", trustScore: 88 },
      { outlet: "Associated Press", headline: "42 Nations Sign Voluntary Agreement Aimed at AI Risks and Watermarking", trustScore: 95 },
      { outlet: "South China Morning Post", headline: "China and US Find Rare Common Ground at International AI Safety Summit", trustScore: 82 }
    ],
    timeline: [
      { date: "Feb 15, 2026", title: "Draft Proposal Released", description: "Swiss authorities host preliminary discussions on AI safeguards." },
      { date: "May 10, 2026", title: "China Joins Dialogues", description: "Chinese delegates agree to attend following changes to IP sharing rules." },
      { date: "Jun 01, 2026", title: "Accord Finalized", description: "42 nations officially execute the agreement in Geneva." }
    ],
    aiConfidence: 95,
    biasScore: 8,
    sourceDiversity: 96,
    sentiment: "Neutral",
    factCheckStatus: "Verified",
    overallTrustScore: 95
  },
  {
    id: "3",
    category: "Science",
    title: "Scientists Achieve Commercial Net Energy Gain in Nuclear Fusion",
    image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80",
    isBreaking: true,
    source: "Nature Journal",
    publishTime: "6 hours ago",
    readTime: "5 min read",
    facts: [
      "The National Ignition Facility generated 4.2 megajoules of energy from a 2.1 megajoule laser input, achieving a Q-factor of 2.0.",
      "The reaction was sustained for 15 seconds, a 500% increase over the previous record.",
      "Commercial scaling is estimated to be at least 15 to 20 years away due to cooling and material constraint issues.",
      "The facility is funded by the federal government and private energy research grants."
    ],
    progressiveView: "Progressive analyses celebrate this as the dawn of clean energy, stressing that public investments in scientific research yield civilization-shifting returns. They argue that this breakthrough highlights the necessity of defunding fossil fuels and focusing resources on expanding federal research programs.",
    conservativeView: "Conservative commentary notes that while the achievement is scientific history, private venture capital was crucial to the tech's success. Outlets caution against using this future solution to justify immediate shutdowns of reliable traditional power grids, calling for a realistic energy mix during development.",
    sourceComparison: [
      { outlet: "CNN", headline: "Fusion Breakthrough Proves Public Science Funding is the Key to Saving Our Climate", trustScore: 80 },
      { outlet: "Daily Wire", headline: "Fusion Target Achieved, but Practical Power Plants Are Decades Away", trustScore: 68 },
      { outlet: "Reuters", headline: "Fusion Lab Doubles Laser Energy Output in Nuclear Ignition Milestone", trustScore: 95 },
      { outlet: "BBC", headline: "Clean Energy Grail? Scientific Breakthrough Sustains Fusion Reaction", trustScore: 90 }
    ],
    timeline: [
      { date: "Dec 2022", title: "First Fusion Gain", description: "Lab achieved a Q-factor of 1.5 in a momentary reaction." },
      { date: "Aug 2025", title: "Laser Upgrade", description: "Power capacity of target lasers increased by 30%." },
      { date: "Jun 02, 2026", title: "Record Sustained Gain", description: "Q-factor of 2.0 held for 15 seconds." }
    ],
    aiConfidence: 99,
    biasScore: 5,
    sourceDiversity: 89,
    sentiment: "Positive",
    factCheckStatus: "Verified",
    overallTrustScore: 95
  },
  {
    id: "4",
    category: "Business",
    title: "Federal Reserve Holds Interest Rates Steady, Citing Stubborn Inflation",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80",
    isBreaking: false,
    source: "Bloomberg",
    publishTime: "9 hours ago",
    readTime: "3 min read",
    facts: [
      "The Federal Reserve maintained the benchmark federal funds rate at 5.25% - 5.50% range.",
      "May's Consumer Price Index (CPI) report recorded inflation at 3.1%, above the Fed's target threshold of 2.0%.",
      "Unemployment metrics rose slightly to 3.9%, while consumer credit card debt reached a new high of $1.15 trillion.",
      "Stock markets responded negatively, with the S&P 500 dropping 1.2% following the announcement."
    ],
    progressiveView: "Progressive analysis focuses on the impact of high interest rates on working families, arguing that the Fed's rigid focus on wage inflation hurts wage-earners while corporate profits remain high. Outlets call for targeted regulatory measures on corporate price gouging instead of blunt interest rate tools.",
    conservativeView: "Conservative outlets criticize federal spending, arguing that high government deficits are driving inflation and forcing the Federal Reserve to keep rates elevated. They emphasize the strain on small businesses and potential home buyers, blaming executive fiscal policies for economic gridlock.",
    sourceComparison: [
      { outlet: "HuffPost", headline: "Fed's Rate Freeze Pushes Working Class to the Edge While Big Business Reaps Profits", trustScore: 75 },
      { outlet: "Fox Business", headline: "Inflation Stubbornly High: Fed Holds Rates as Biden Administration Spending Booms", trustScore: 72 },
      { outlet: "Wall Street Journal", headline: "Fed Leaves Rates Unchanged, Pushes Back Forecast for Cuts Due to CPI Data", trustScore: 88 },
      { outlet: "Financial Times", headline: "US Federal Reserve Remains Cautious, Pointing to Sticky Core Inflation Indicators", trustScore: 92 }
    ],
    timeline: [
      { date: "May 15, 2026", title: "CPI Data Published", description: "Consumer Price Index comes in at 3.1%, beating predictions of 2.9%." },
      { date: "May 30, 2026", title: "Fed Convened", description: "Federal Open Market Committee (FOMC) meets for its two-day session." },
      { date: "Jun 02, 2026", title: "Decision Broadcast", description: "Chairman announces the rate freeze at a 2:00 PM EST press conference." }
    ],
    aiConfidence: 98,
    biasScore: 11,
    sourceDiversity: 91,
    sentiment: "Negative",
    factCheckStatus: "Verified",
    overallTrustScore: 92
  },
  {
    id: "5",
    category: "World News",
    title: "Tensions Rise Over Disputed Maritime Borders in South China Sea",
    image: "https://images.unsplash.com/photo-1507682531662-421b17d4723e?auto=format&fit=crop&w=800&q=80",
    isBreaking: true,
    source: "BBC News",
    publishTime: "12 hours ago",
    readTime: "4 min read",
    facts: [
      "A collision occurred between a Philippine coast guard vessel and a Chinese patrol boat near the disputed Second Thomas Shoal.",
      "Two Philippine sailors suffered minor injuries; both nations have accused the other of reckless navigation.",
      "The US Department of Defense reiterated its commitments under the 1951 Mutual Defense Treaty with the Philippines.",
      "Around $3.4 trillion in global trade transits through the South China Sea annually."
    ],
    progressiveView: "Progressive analysis highlights the risk of escalating military conflict and the need for diplomatic de-escalation. Outlets stress that international cooperation, regional coalitions, and naval restraint must be prioritized to avoid a costly confrontation between global superpowers.",
    conservativeView: "Conservative perspectives call for a strong, assertive response to counter territorial aggression. Outlets highlight the event as a test of Western deterrence, arguing that any sign of hesitation could embolden competitors and threaten free navigation in critical commercial trade routes.",
    sourceComparison: [
      { outlet: "The Guardian", headline: "Calls for Calm After Dangerous Maritime Collision Sparks Escalation Fears", trustScore: 82 },
      { outlet: "National Review", headline: "Aggressive Manuevers Test US Resolve: Strong Response Needed in Pacific", trustScore: 70 },
      { outlet: "Reuters", headline: "Philippine and Chinese Vessels Collide in Contested Waters, Trading Blame", trustScore: 95 },
      { outlet: "AP News", headline: "US Warns China After Philippine Vessels Damaged in Disputed Sea", trustScore: 95 }
    ],
    timeline: [
      { date: "Jun 01, 2026, 04:00 AM", title: "Maritime Contact", description: "Philippines reports its resupply ship was rammed by a patrol boat." },
      { date: "Jun 01, 2026, 10:00 AM", title: "Statements of Protest", description: "Both Manila and Beijing summon ambassadors to issue official diplomatic protests." },
      { date: "Jun 02, 2026, 08:00 AM", title: "US Statement", description: "Pentagon affirms treaty commitments, cautioning against further intimidation." }
    ],
    aiConfidence: 94,
    biasScore: 22,
    sourceDiversity: 94,
    sentiment: "Negative",
    factCheckStatus: "Verified",
    overallTrustScore: 93
  },
  {
    id: "6",
    category: "Health",
    title: "FDA Approves First CRISPR Gene Therapy for Inherited Heart Disease",
    image: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&w=800&q=80",
    isBreaking: false,
    source: "AP News",
    publishTime: "1 day ago",
    readTime: "4 min read",
    facts: [
      "The FDA approved 'CardiEdit', a CRISPR-Cas9 genetic therapy designed to treat hypertrophic cardiomyopathy.",
      "Clinical trials demonstrated a 78% reduction in toxic protein accumulation in the heart with a one-time treatment.",
      "The cost of the single-dose therapy is set at $1.8 million per patient.",
      "Insurance companies are currently negotiating coverage guidelines for eligible candidates."
    ],
    progressiveView: "Progressive commentary focuses on the accessibility and pricing of the therapy, arguing that life-saving medical breakthroughs are meaningless if only the extremely wealthy can afford them. Outlets call for price caps and government intervention in pharmaceutical patent monopolies.",
    conservativeView: "Conservative articles celebrate the approval as a triumph of private-sector biotechnology innovation. They emphasize that high development costs must be offset by profits to incentivize companies to take massive financial risks on future genetic cures.",
    sourceComparison: [
      { outlet: "Slate", headline: "A $1.8 Million Cure: FDA Approves Miracle Therapy That Almost No One Can Afford", trustScore: 74 },
      { outlet: "Reason Magazine", headline: "CRISPR Breakthrough Shows How Profit Motives Drive Life-Saving Biotech Innovation", trustScore: 78 },
      { outlet: "Reuters", headline: "FDA Approves Vertex and CRISPR Therapeutics' Gene Editing Treatment", trustScore: 95 },
      { outlet: "BBC", headline: "US Approves Genetic Edit Treatment for Genetic Heart Condition", trustScore: 90 }
    ],
    timeline: [
      { date: "Oct 2024", title: "Clinical Trials Begin", description: "Phase 1 trials evaluate safety in 40 adult volunteers." },
      { date: "Nov 2025", title: "Favorable Review", description: "FDA advisory panel recommends approval based on high success metrics." },
      { date: "May 31, 2026", title: "Official Approval", description: "FDA issues formal commercial market clearance." }
    ],
    aiConfidence: 96,
    biasScore: 15,
    sourceDiversity: 88,
    sentiment: "Positive",
    factCheckStatus: "Verified",
    overallTrustScore: 92
  },
  {
    id: "7",
    category: "Technology",
    title: "EU Imposes Major Fines on Social Media Giants Over Teen Algorithms",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    isBreaking: false,
    source: "Deutsche Welle",
    publishTime: "1 day ago",
    readTime: "3 min read",
    facts: [
      "The European Commission fined three major social platforms a combined $3.2 billion for violating youth protection codes.",
      "The platforms are accused of deploying addictive loop features that bypass child filter protections.",
      "Under the Digital Services Act (DSA), platforms must disable algorithmic feed recommendations for users under 16 by default.",
      "The targeted tech firms announced plans to appeal, arguing their apps already meet legal thresholds."
    ],
    progressiveView: "Progressive sources strongly support the fines, portraying them as a critical move to protect children's mental health from corporate exploitation. They call for even tougher regulations and suggest similar algorithmic bans should be implemented globally.",
    conservativeView: "Conservative commentary often agrees on protecting minors but expresses concern over government control of content algorithms and free expression. Outlets emphasize that parental responsibility and household guidance, rather than bureaucratic state mandates, should be the primary defense.",
    sourceComparison: [
      { outlet: "The Guardian", headline: "EU Hits Tech Giants with $3B Fines to Stop Exploitative Teen-Targeted Feeds", trustScore: 84 },
      { outlet: "Federalist", headline: "EU's Massive Tech Fines Ignore the Real Issue: Parents, Not Bureaucrats, Must Protect Kids", trustScore: 65 },
      { outlet: "Reuters", headline: "EU Fines Social Media Companies Under Digital Services Act for Child Safety Failures", trustScore: 95 },
      { outlet: "Wall Street Journal", headline: "Tech Firms to Appeal Multi-Billion Dollar European Regulatory Penalties", trustScore: 88 }
    ],
    timeline: [
      { date: "Sep 2025", title: "Investigation Launched", description: "EU regulators collect internal documents showing algorithm impacts." },
      { date: "Jan 2026", title: "Warning Issued", description: "Platforms given 60 days to modify infinite scroll features for minors." },
      { date: "Jun 01, 2026", title: "Fines Announced", description: "EU Commissioner issues formal penalty orders." }
    ],
    aiConfidence: 93,
    biasScore: 10,
    sourceDiversity: 91,
    sentiment: "Neutral",
    factCheckStatus: "Verified",
    overallTrustScore: 92
  },
  {
    id: "8",
    category: "Politics",
    title: "Supreme Court Rules on Executive Privilege Limits in Subpoena Dispute",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
    isBreaking: true,
    source: "SCOTUSblog",
    publishTime: "1 day ago",
    readTime: "5 min read",
    facts: [
      "The Supreme Court ruled 6-3 that executive privilege does not shield communications regarding independent regulatory agencies from congressional subpoenas.",
      "The case arose from a House committee investigation into alleged administrative interference in a federal trade merger.",
      "The majority opinion states that privilege is limited in scope and must yield to demonstrated legislative investigative needs.",
      "The dissenting justices argued that the ruling weakens the separation of powers and infringes on executive independence."
    ],
    progressiveView: "Progressive commentators celebrate the decision as a victory for government transparency and checks and balances. Outlets highlight that the ruling prevents the executive branch from hiding behind secrecy to protect corporate allies, keeping power accountable to Congress.",
    conservativeView: "Conservative commentary reflects the dissenting view, warning that the decision could politicize internal communications and weaken the executive branch. Outlets express concern that future administrations will face constant, politically motivated investigations from opposing House committees.",
    sourceComparison: [
      { outlet: "New York Times", headline: "Supreme Court Rebuffs Executive Secrecy, Affirming Congress's Oversight Power", trustScore: 86 },
      { outlet: "Washington Times", headline: "Conservative Justices Warn SCOTUS Ruling Invites Partisan Subpoena Wars Against President", trustScore: 72 },
      { outlet: "Reuters", headline: "US Supreme Court Limits Executive Privilege in Congressional Subpoena Dispute", trustScore: 95 },
      { outlet: "BBC", headline: "Supreme Court Rules Against Presidential Privilege in Landmark 6-3 Decision", trustScore: 90 }
    ],
    timeline: [
      { date: "Jul 2025", title: "Subpoena Issued", description: "House Oversight Committee requests internal memos on the trade merger." },
      { date: "Oct 2025", title: "Lower Court Agrees", description: "District court orders compliance; administration appeals." },
      { date: "Mar 2026", title: "Supreme Court Arguments", description: "Oral arguments heard on the scope of Article II privilege." },
      { date: "Jun 01, 2026", title: "Decision Handed Down", description: "6-3 majority opinion published." }
    ],
    aiConfidence: 98,
    biasScore: 25,
    sourceDiversity: 93,
    sentiment: "Neutral",
    factCheckStatus: "Verified",
    overallTrustScore: 94
  },
  {
    id: "9",
    category: "Science",
    title: "Antarctic Expedition Discovers Undocumented Subglacial Lakes",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80",
    isBreaking: false,
    source: "LiveScience",
    publishTime: "2 days ago",
    readTime: "3 min read",
    facts: [
      "A research team mapping the East Antarctic Ice Sheet detected three subglacial lakes buried beneath 2 miles of ice.",
      "Using ice-penetrating radar, scientists estimate the largest lake has been isolated from the atmosphere for 12 million years.",
      "Geologists state the water is kept liquid by geothermal heat and immense pressure from the overlying ice.",
      "The isolation presents a pristine environment to study ancient microbial life forms."
    ],
    progressiveView: "Progressive analysis focuses on the importance of funding global environmental science. Outlets warn that melting ice sheets due to climate change could disrupt these fragile, ancient ecosystems, emphasizing the need for immediate climate action.",
    conservativeView: "Conservative coverage highlights the scientific wonder and exploration aspects of the discovery. Outlets emphasize the engineering feat of the ice-penetrating radar technology, framing it as a testament to scientific ingenuity and human capability.",
    sourceComparison: [
      { outlet: "Salon", headline: "Buried for 12 Million Years: Pristine Antarctic Lakes Threatened by Rapid Ice Melt", trustScore: 74 },
      { outlet: "Daily Mail", headline: "Frozen in Time: Radar Reveals Huge Lakes Hidden Deep Under Two Miles of Ice", trustScore: 65 },
      { outlet: "Reuters", headline: "Scientists Map New Subglacial Lakes in East Antarctica Using Radar", trustScore: 95 },
      { outlet: "National Geographic", headline: "Antarctic Discovery: Radar Reveals Ancient Liquid Lakes Under the Ice", trustScore: 90 }
    ],
    timeline: [
      { date: "Dec 2025", title: "Expedition Departs", description: "Joint US-Australian science team sets up basecamp in East Antarctica." },
      { date: "Feb 2026", title: "Anomalous Radar Readings", description: "Radar returns suggest flat liquid surfaces deep beneath the ice cap." },
      { date: "May 30, 2026", title: "Data Verified", description: "Data processed and cross-referenced, confirming three distinct bodies of water." }
    ],
    aiConfidence: 95,
    biasScore: 6,
    sourceDiversity: 86,
    sentiment: "Neutral",
    factCheckStatus: "Verified",
    overallTrustScore: 93
  },
  {
    id: "10",
    category: "Business",
    title: "Major Retail Merger Approved Under Strict Anti-Trust Conditions",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
    isBreaking: false,
    source: "FT.com",
    publishTime: "2 days ago",
    readTime: "4 min read",
    facts: [
      "The Federal Trade Commission (FTC) approved the $24 billion merger between retail giants 'MegaMart' and 'SuperValue'.",
      "To obtain approval, the companies must divest 350 store locations to a regional competitor to prevent local monopolies.",
      "The combined entity will control 18% of the US grocery market, second only to Walmart.",
      "The FTC chairman cast the deciding vote, stating the divestitures protect local consumers from price spikes."
    ],
    progressiveView: "Progressive analysis expresses skepticism about the approval, arguing that even with divestitures, massive corporate consolidations reduce worker bargaining power and lead to food deserts. Outlets call for stricter antitrust enforcement to break up existing giant conglomerates.",
    conservativeView: "Conservative viewpoints highlight that the merger allows traditional brick-and-mortar stores to build scale and compete effectively with e-commerce giants. Outlets argue that the government's heavy divestiture demands were excessive and represent regulatory overreach.",
    sourceComparison: [
      { outlet: "Nation", headline: "FTC Capitulates on Retail Merger, Fueling Corporate Grocery Monopolies", trustScore: 76 },
      { outlet: "National Review", headline: "FTC's Harsh Merger Demands Penalize Retailers Trying to Compete with Amazon", trustScore: 70 },
      { outlet: "Bloomberg", headline: "MegaMart and SuperValue Merger Cleared by FTC with 350-Store Divestment", trustScore: 92 },
      { outlet: "AP News", headline: "Regulators Approve Major Grocery Chain Merger Following Local Store Sell-Offs", trustScore: 95 }
    ],
    timeline: [
      { date: "Nov 2024", title: "Merger Proposed", description: "MegaMart announces plan to acquire SuperValue in stock deal." },
      { date: "Apr 2025", title: "FTC Challenge", description: "Regulators file suit to block the deal, citing consumer price risks." },
      { date: "Mar 2026", title: "Settlement Reached", description: "Companies agree to sell off 350 stores to satisfy market competition concerns." },
      { date: "May 31, 2026", title: "Final Vote", description: "FTC formally approves the modified merger in a 3-2 vote." }
    ],
    aiConfidence: 96,
    biasScore: 14,
    sourceDiversity: 92,
    sentiment: "Neutral",
    factCheckStatus: "Verified",
    overallTrustScore: 92
  },
  {
    id: "11",
    category: "Sports",
    title: "International Olympic Committee Announces New E-Sports Games",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    isBreaking: false,
    source: "ESPN",
    publishTime: "2 days ago",
    readTime: "3 min read",
    facts: [
      "The IOC formally established the Olympic Esports Games, to debut in Saudi Arabia in 2027.",
      "The games will feature virtual sports titles and popular competitive strategy video games.",
      "Events will be held under separate rules, bypassing traditional Olympic drug testing and physical athletic requirements.",
      "The IOC signed a 12-year partnership with the Saudi Olympic Committee to host the games."
    ],
    progressiveView: "Progressive commentary raises concerns about sportswashing, pointing to Saudi Arabia's human rights record as the host country. Outlets criticize the IOC for prioritizing lucrative sponsorships and commercial deals over ethical considerations and progressive values.",
    conservativeView: "Conservative articles focus on the commercial growth and modernization of the Olympics, viewing the move as a smart business strategy to engage younger audiences. They emphasize the technology behind competitive gaming and the economic benefits of international partnerships.",
    sourceComparison: [
      { outlet: "The Guardian", headline: "IOC Ignores Ethical Concerns to Seal Lucrative Esports Deal with Saudi Arabia", trustScore: 84 },
      { outlet: "Washington Examiner", headline: "Olympic Esports Games: A Smart Commercial Pivot to Win Over Younger Audiences", trustScore: 71 },
      { outlet: "Reuters", headline: "IOC Creates Olympic Esports Games, Partners with Saudi Arabia for 12 Years", trustScore: 95 },
      { outlet: "BBC", headline: "Esports to Join Olympic Roster Under Controversial Host Deal", trustScore: 90 }
    ],
    timeline: [
      { date: "Jul 2024", title: "Concept Proposed", description: "IOC votes to explore a dedicated Esports branch." },
      { date: "Dec 2025", title: "Bidding Process", description: "Saudi Arabia offers a comprehensive infrastructure hosting proposal." },
      { date: "May 31, 2026", title: "Partnership Finalized", description: "IOC officially announces the 12-year agreement." }
    ],
    aiConfidence: 94,
    biasScore: 19,
    sourceDiversity: 89,
    sentiment: "Neutral",
    factCheckStatus: "Verified",
    overallTrustScore: 91
  },
  {
    id: "12",
    category: "Health",
    title: "Global Study Finds Microplastics Present in All Tested Human Organs",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
    isBreaking: true,
    source: "Lancet Planet Health",
    publishTime: "3 days ago",
    readTime: "4 min read",
    facts: [
      "A peer-reviewed study analyzing tissue samples from 120 donors detected microplastics in every brain, liver, kidney, and lung sample tested.",
      "The most common polymer found was polyethylene, widely used in single-use plastic packaging.",
      "The health impacts of internal accumulation remain unknown, though researchers noted signs of cellular inflammation in high-concentration tissues.",
      "Average concentration levels were 15 particles per gram of tissue."
    ],
    progressiveView: "Progressive reports treat this as a environmental emergency, calling for immediate bans on single-use plastics and demanding that petrochemical companies pay for cleanup. Outlets argue that corporate lobbying has blocked protective regulations, putting public health at risk.",
    conservativeView: "Conservative articles advocate for a measured approach, pointing out that the study does not prove microplastics cause direct disease in humans. They argue that sudden bans on plastics would devastate manufacturing, agriculture, and retail sectors, advocating for voluntary recycling and private waste-management innovations.",
    sourceComparison: [
      { outlet: "Slate", headline: "Our Bodies Are Full of Plastic and Corporate Lobbyists Are to Blame", trustScore: 74 },
      { outlet: "Reason Magazine", headline: "Microplastics Found in Human Tissue, but Hasty Bans on Plastics Are Not the Answer", trustScore: 78 },
      { outlet: "AP News", headline: "Study Finds Microplastics in Human Organs, Sparking Calls for Health Research", trustScore: 95 },
      { outlet: "BBC", headline: "Microplastics Detected in All Human Tissue Samples in New Study", trustScore: 90 }
    ],
    timeline: [
      { date: "May 2024", title: "Sample Collection", description: "Pathologists across 8 countries begin archiving donor tissue samples." },
      { date: "Aug 2025", title: "Analysis Completed", description: "Mass spectrometry tests identify plastic polymer structures." },
      { date: "May 30, 2026", title: "Study Published", description: "Peer-reviewed findings appear in the Lancet planetary health journal." }
    ],
    aiConfidence: 97,
    biasScore: 9,
    sourceDiversity: 93,
    sentiment: "Negative",
    factCheckStatus: "Verified",
    overallTrustScore: 93
  },
  {
    id: "13",
    category: "Politics",
    title: "Nations Sign Historic Accord Restricting Space Weaponization",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    isBreaking: false,
    source: "United Nations",
    publishTime: "3 days ago",
    readTime: "4 min read",
    facts: [
      "Representatives from 85 countries signed the Outer Space Arms Limitation Treaty (OSALT) at the UN.",
      "The treaty prohibits placing kinetic weapons or nuclear payloads in low Earth orbit or on celestial bodies.",
      "Three nuclear-armed nations declined to sign, citing verification concerns and national security needs.",
      "A monitoring agency will be established in Vienna to verify compliance using satellite tracking."
    ],
    progressiveView: "Progressive analysis focuses on the treaty as a historic victory for peace, showing that international treaties can keep space free from military conflict. Outlets criticize the non-signing nations, calling them obstacles to global safety and demanding they join the accord.",
    conservativeView: "Conservative commentary questions the treaty's effectiveness when major powers refuse to sign, arguing it leaves signers vulnerable. Outlets emphasize that verification is nearly impossible and argue that maintaining a strong space defense is a more reliable deterrent.",
    sourceComparison: [
      { outlet: "The Nation", headline: "Space Arms Treaty Offers Hope, but Western Non-Signers Threaten Space Peace", trustScore: 76 },
      { outlet: "Washington Free Beacon", headline: "UN Space Weapon Ban is a Dangerous Illusion That Invites Adversary Aggression", trustScore: 68 },
      { outlet: "Reuters", headline: "85 Nations Sign Treaty Banning Kinetic and Nuclear Weapons in Orbit", trustScore: 95 },
      { outlet: "Al Jazeera", headline: "UN General Assembly Backs Outer Space Non-Weaponization Treaty", trustScore: 84 }
    ],
    timeline: [
      { date: "Oct 2025", title: "Initiative Launched", description: "General Assembly creates working group on orbit defense risks." },
      { date: "Mar 2026", title: "Treaty Drafted", description: "Verification procedures and definitions of kinetic weapons negotiated." },
      { date: "May 30, 2026", title: "Treaty Signed", description: "85 countries sign the document at UN headquarters." }
    ],
    aiConfidence: 94,
    biasScore: 20,
    sourceDiversity: 91,
    sentiment: "Positive",
    factCheckStatus: "Verified",
    overallTrustScore: 92
  },
  {
    id: "14",
    category: "Technology",
    title: "Major Smart Grid Software Exploit Exposes Power Grid Vulnerabilities",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80",
    isBreaking: true,
    source: "Wired",
    publishTime: "4 days ago",
    readTime: "3 min read",
    facts: [
      "Cybersecurity researchers discovered a critical zero-day exploit in software used by 30% of US power grid operators.",
      "The vulnerability allows remote attackers to inject false load data, potentially causing regional blackout cascades.",
      "The software developer has released an emergency security patch to fix the loophole.",
      "No outages have been reported; federal agencies are investigating potential nation-state involvement."
    ],
    progressiveView: "Progressive reports focus on the vulnerability of public utilities managed by private companies, arguing that critical infrastructure should be under public control to ensure security. They call for strict federal standards and direct public investment in grid cybersecurity.",
    conservativeView: "Conservative commentary stresses the threat of foreign state actors and the need for stronger national defense. Outlets argue that private utility operators are best equipped to secure their networks, advocating for intelligence sharing rather than heavy-handed government mandates.",
    sourceComparison: [
      { outlet: "Salon", headline: "Private Power Companies Leave Critical Infrastructure Vulnerable to Hackers", trustScore: 74 },
      { outlet: "Daily Wire", headline: "Foreign Threats Exposed: Federal Agencies Probe Zero-Day Hack on Power Grid", trustScore: 68 },
      { outlet: "Reuters", headline: "Emergency Patch Issued After Zero-Day Bug Discovered in Power Grid Software", trustScore: 95 },
      { outlet: "Wired", headline: "Unpatched Zero-Day Exploit Left 30% of US Power Grid Open to Attack", trustScore: 89 }
    ],
    timeline: [
      { date: "May 25, 2026", title: "Vulnerability Found", description: "Security firm discovers exploit during a routine audit." },
      { date: "May 27, 2026", title: "Patch Coded", description: "Developer creates and tests emergency patch in isolated environment." },
      { date: "May 29, 2026", title: "Public Disclosure", description: "Exploit announced alongside patch release to ensure rapid deployment." }
    ],
    aiConfidence: 96,
    biasScore: 16,
    sourceDiversity: 92,
    sentiment: "Negative",
    factCheckStatus: "Verified",
    overallTrustScore: 92
  },
  {
    id: "15",
    category: "Science",
    title: "Astronomers Detect Strongest Repeating Radio Burst from Nearby Galaxy",
    image: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&w=800&q=80",
    isBreaking: false,
    source: "Space.com",
    publishTime: "4 days ago",
    readTime: "3 min read",
    facts: [
      "The CHIME radio telescope detected a repeating Fast Radio Burst (FRB) originating 12 million light-years away in the M81 galaxy.",
      "The signal, named 'FRB 202605A', repeats in a predictable 16-day cycle: active for 4 days, then silent for 12.",
      "Astrophysicists hypothesize the source is a highly magnetized neutron star or a binary star system.",
      "FRB 202605A is the closest repeating radio burst discovered, providing a rare opportunity for detailed study."
    ],
    progressiveView: "Progressive sources frame this as an inspiring achievement that highlights the value of international scientific collaboration and public funding. They use the discovery to advocate for increased support for basic science research and global space telescopes.",
    conservativeView: "Conservative articles focus on the technology and engineering involved in detecting the signals. Outlets highlight the capabilities of Western radio telescopes, celebrating the discovery as a milestone in human technological progress.",
    sourceComparison: [
      { outlet: "The Guardian", headline: "Global Team Decodes Repeating Radio Burst, Proving the Power of Open Science", trustScore: 84 },
      { outlet: "Washington Examiner", headline: "US-Canadian Radio Telescope Detects Closest Repeating Space Signals Yet", trustScore: 71 },
      { outlet: "Reuters", headline: "Repeating Fast Radio Burst Detected in Nearby M81 Galaxy, Astronomers Say", trustScore: 95 },
      { outlet: "Nature Astronomy", headline: "Cyclical 16-day Fast Radio Burst Observed at Close Proximity in M81", trustScore: 96 }
    ],
    timeline: [
      { date: "May 10, 2026", title: "First Detection", description: "CHIME recording registers a strong pulse spike from M81." },
      { date: "May 26, 2026", title: "Cycle Verified", description: "After three cycles of observation, the 16-day repeating pattern is confirmed." },
      { date: "May 29, 2026", title: "Global Alert", description: "Data shared with world telescopes to coordinate multi-wavelength observations." }
    ],
    aiConfidence: 98,
    biasScore: 3,
    sourceDiversity: 94,
    sentiment: "Neutral",
    factCheckStatus: "Verified",
    overallTrustScore: 95
  }
];
