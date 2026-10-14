/**
 * নেক্সোরা (Nexora) - পরবর্তী যা কিছু, তা আবিষ্কার করুন
 * Vanilla JavaScript Core Engine (বাংলা সংস্করণ)
 */

import { 
  adminSignIn, 
  adminSignOut, 
  onAdminAuthStateChanged, 
  fetchCollection, 
  saveDocument, 
  deleteDocument,
  isUserAdmin,
  testConnection
} from './firebase-config.js';

// ==========================================================================
// ১. বাংলা কন্টেন্ট ডেটাসেট (Content Datasets in Bengali)
// ==========================================================================

const defaultNewsData = [
  {
    id: "news-1",
    title: "টেস্ট-টাইম কম্পিউট স্কেলিং: কৃত্রিম বুদ্ধিমত্তা মডেলের আকার নয়, যুক্তি ও চিন্তার গভীরতা বৃদ্ধি",
    category: "কৃত্রিম বুদ্ধিমত্তা",
    date: "৯ অক্টোবর, ২০২৬",
    readTime: "৫ মিনিট পাঠ",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    excerpt: "গবেষণায় দেখা গেছে যে অনুমানের সময় মডেলকে বাড়তি চিন্তা ও যুক্তির ধাপ নেওয়ার সুযোগ দিলে, প্যারামিটার ১০ গুণ বড় করার চেয়েও দ্বিগুণ বেশি নির্ভুল ফলাফল পাওয়া যায়।",
    author: "ফারহান তানভীর",
    content: `
      <p>গত চার বছর ধরে কৃত্রিম বুদ্ধিমত্তার গবেষণায় একটি প্রচলিত নিয়ম ছিল: নিউরাল নেটওয়ার্ককে যত বড় করা হবে এবং ট্রিলিয়ন ট্রিলিয়ন টোকেন খাওয়ানো হবে, মডেল তত শক্তিশালী হবে। কিন্তু ২০২৬ সালে এসে সেই গায়ের জোরে প্যারামিটার বাড়ানোর ধারা বিদ্যুৎ খরচ এবং সীমিত পারফরম্যান্সের কারণে বড় বাধার মুখে পড়েছে।</p>
      
      <h3>ইনফারেন্স ও চিন্তন বিপ্লব</h3>
      <p>বর্তমানে শীর্ষ ল্যাবগুলো <strong>টেস্ট-টাইম কম্পিউট স্কেলিং (Test-Time Compute Scaling)</strong> এর দিকে ঝুঁকছে। অর্থাৎ কেবল মডেল তৈরির সময় নয়, বরং ব্যবহারকারীর প্রশ্নের উত্তর দেওয়ার সময়ও মডেলটিকে একাধিক যৌক্তিক পথ বিবেচনা ও আত্ম-মূল্যায়ন করার সময় দেওয়া হচ্ছে। মন্টি কার্লো ট্রি সার্চ ও ভেরিফায়ার নেটওয়ার্কের মাধ্যমে ছোট মডেলগুলোও জটিল গাণিতিক প্রমাণ ও সফটওয়্যার আর্কিটেকচার সমাধান করে ফেলছে।</p>

      <blockquote>"ভবিষ্যত তাদের নয় যারা সম্পূর্ণ ইন্টারনেট মুখস্থ করে বসে আছে, বরং তাদের যারা সিদ্ধান্ত চূড়ান্ত করার আগে গভীরভাবে চিন্তা করতে পারে।"</blockquote>

      <h3>প্রকৌশলীদের জন্য গুরুত্বপূর্ণ বিষয়সমূহ</h3>
      <ul>
        <li><strong>খরচ সাশ্রয়:</strong> ৮ থেকে ১৪ বিলিয়ন প্যারামিটারের ছোট রিজনিং মডেলগুলো কোড তৈরিতে অনেক বিশালাকার স্ট্যাটিক মডেলকে পেছনে ফেলছে।</li>
        <li><strong>স্বয়ংক্রিয় যাচাই:</strong> রিজনিং লুপের ভেতর স্বয়ংক্রিয় টেস্ট-রান চালু রাখলে ভুলের হার (Hallucination) প্রায় ৭৪% কমে যায়।</li>
        <li><strong>অন-ডিভাইস সক্ষমতা:</strong> বেস মডেল ছোট হওয়ায় আধুনিক ওয়ার্কস্টেশন ও এজ-সিলিকনেও স্বয়ংক্রিয় এজেন্ট চালানো সম্ভব হচ্ছে।</li>
      </ul>
    `
  },
  {
    id: "news-2",
    title: "ওয়েবঅ্যাসেম্বলি সিস্টেম ইন্টারফেস (WASI 0.2): মিলি-সেকেন্ডে ক্লাউড ফাংশন চালুর নতুন মানদণ্ড",
    category: "ওয়েব ও ক্লাউড",
    date: "৭ অক্টোবর, ২০২৬",
    readTime: "৪ মিনিট পাঠ",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    excerpt: "WASI কম্পোনেন্ট মডেলের সুবাদে ভারী ডকার কন্টেইনার ছাড়াই সাব-মিলি-সেকেন্ড সময়ে নিরাপদ ও মেমোরি-আইসোলেটেড মাইক্রোসার্ভিস চালু করা যাচ্ছে।",
    author: "নুসরাত জাহান",
    content: `
      <p>ন্যাটিভ অপারেটিং সিস্টেম ও ওয়েব অ্যাপ্লিকেশনের মধ্যবর্তী প্রাচীর দ্রুত ভেঙে পড়ছে। WASI 0.2 অনুমোদনের মাধ্যমে ক্লাউড অবকাঠামোয় ডকার কন্টেইনারের পাশাপাশি লাইটওয়েট ওয়েবঅ্যাসেম্বলি কম্পোনেন্টের যুগ শুরু হলো।</p>

      <h3>সাব-মিলি-সেকেন্ড কোল্ড স্টার্ট</h3>
      <p>একটি ডকার কন্টেইনার পুরো লিনাক্স ইউজারল্যান্ড বহন করায় তার সাইজ শত শত মেগাবাইট হয়। বিপরীতে একটি WASI কম্পোনেন্টে কমপাইল করা রাস্ট বা গো বাইটকোডের সাইজ মাত্র ২-৩ মেগাবাইট, যা ৫০০ মাইক্রোসেকেন্ডেরও কম সময়ে এক্সিকিউট হতে পারে।</p>

      <h3>জিরো-ট্রাস্ট ক্যাপাবিলিটি নিরাপত্তা</h3>
      <p>WASI কম্পোনেন্টগুলো ক্যাপাবিলিটি-বেসড নিরাপত্তায় চলে। ফাইল সিস্টেম বা নেটওয়ার্ক সকেটের অনুমতি স্পষ্ট না থাকলে কোনো মডিউল গোপনে তথ্য চুরি করতে পারে না।</p>
    `
  },
  {
    id: "news-3",
    title: "কোয়ান্টাম এরর কারেকশন: সুপারকন্ডাক্টিং কিউবিট অ্যারেতে ফল্ট-টলারেন্ট মাইলফলক অর্জন",
    category: "বিজ্ঞান ও মহাকাশ",
    date: "৫ অক্টোবর, ২০২৬",
    readTime: "৬ মিনিট পাঠ",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
    excerpt: "পদার্থবিজ্ঞানীরা এমন এক সারফেস কোড বাস্তবায়ন করেছেন যেখানে কিউবিটের ত্রুটি সহ্যসীমার নিচে নেমে এসেছে, যা বাস্তব কোয়ান্টাম কম্পিউটিংয়ের স্বপ্নকে কাছে এনেছে।",
    author: "ড. শামীম রেজা",
    content: `
      <p>দশকের পর দশক কোয়ান্টাম কম্পিউটিং নয়েজ ও ত্রুটির কারণে বাস্তব ব্যবহারের বাইরে ছিল। গতকাল প্রকাশিত গবেষণা নিশ্চিত করেছে যে ১,০২৪ কিউবিটের সুপারকন্ডাক্টিং অ্যারে সফলভাবে ত্রুটির হার সহনীয় মাত্রার নিচে নামিয়ে এনেছে।</p>
      <p>এর ফলে ১২টি লজিক্যাল কিউবিট টানা ৪৫ মিনিট সুপারপজিশনে স্থির রাখা সম্ভব হয়েছে। নতুন ব্যাটারি ম্যাটেরিয়াল ও জটিল রাসায়নিক অণু সিমুলেশনে এটি বিপ্লব ঘটাবে।</p>
    `
  },
  {
    id: "news-4",
    title: "পোস্ট-কোয়ান্টাম ক্রিপ্টোগ্রাফি: ক্লাউড সার্ভারে নতুন এনক্রিপশন প্রোটোকল বাধ্যতামূলক",
    category: "সাইবার নিরাপত্তা",
    date: "৩ অক্টোবর, ২০২৬",
    readTime: "৫ মিনিট পাঠ",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    excerpt: "ভবিষ্যতের কোয়ান্টাম কম্পিউটারের ডিক্রিপশন হামলা রুখতে বিশ্বজুড়ে TLS ও ওয়েব প্রোটোকলে ল্যাটিস-ভিত্তিক পোস্ট-কোয়ান্টাম অ্যালগরিদম চালু করা হয়েছে।",
    author: "আসিফ আহমেদ",
    content: `
      <p>ইন্টারনেটের এনক্রিপশন ব্যবস্থা গত ৩০ বছরের মধ্যে সবচেয়ে বড় পরিবর্তনের মধ্য দিয়ে যাচ্ছে। 'আজ তথ্য চুরি করো, ভবিষ্যতে কোয়ান্টাম কম্পিউটার দিয়ে ডিক্রিপ্ট করো'—এমন অপতৎপরতা রুখতে ML-KEM ও ML-DSA স্ট্যান্ডার্ড এখন ক্লাউড প্রোভাইডারদের মূল সাইফার স্যুটে অন্তর্ভুক্ত হয়েছে।</p>
      <p>পুরাতন RSA-2048 কি-এর বদলে আধুনিক ল্যাটিস-ভিত্তিক চাবি ব্যবহার করায় দীর্ঘমেয়াদে সুরক্ষিত থাকবে সংবেদনশীল যোগাযোগ।</p>
    `
  },
  {
    id: "news-5",
    title: "'ক্র্যাফট ওয়েব' আন্দোলন: ফ্রেমওয়ার্কের ভিড়ে মিনিমালিস্ট ভ্যানিলা কোডিংয়ে ফিরছেন ডেভেলপাররা",
    category: "ডিজিটাল সংস্কৃতি",
    date: "১ অক্টোবর, ২০২৬",
    readTime: "৪ মিনিট পাঠ",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    excerpt: "গিগাবাইট ওজনের নোড_মডিউলস এবং ভঙ্গুর বিল্ড টুলের ক্লান্তিতে অনেক ইঞ্জিনিয়ার সরাসরি পরিচ্ছন্ন HTML5, আধুনিক CSS3 ও ভ্যানিলা জাভাস্ক্রিপ্ট বেছে নিচ্ছেন।",
    author: "মেহজাবিন চৌধুরী",
    content: `
      <p>ওয়েব ডেভেলপমেন্টের ইতিহাসের পেন্ডুলাম আবারও মূল ভিত্তির দিকে দুলছে। অতিরিক্ত বিল্ড স্টেপ ও জটিল মেটা-ফ্রেমওয়ার্কের বিকল্প হিসেবে সরাসরি ব্রাউজার-বান্ধব ভ্যানিলা কোড লেখার প্রবণতা বাড়ছে।</p>
      <p>কন্টেইনার কোয়েরিজ, সিএসএস গ্রিড সাবগ্রিড, ডায়ালগ এলিমেন্ট এবং ইএস মডিউলের কারণে কোনো ভারী ফ্রেমওয়ার্ক ছাড়াই ৯০% আধুনিক ওয়েবসাইট তৈরি করা যায় চোখের পলকে।</p>
      <blockquote>"স্ট্যান্ডার্ড ওয়েব টেকনোলজিতে বানানো কোড ১০ বছর পরও কোনো প্যাকেজ নির্ভরতা ছাড়াই চলবে।"</blockquote>
    `
  },
  {
    id: "news-6",
    title: "নিউরোমরফিক সিলিকন চিপ: ক্ষুদ্র সৌর প্যানেলেই চলবে সার্বক্ষণিক কৃত্রিম বুদ্ধিমত্তা",
    category: "কৃত্রিম বুদ্ধিমত্তা",
    date: "২৮ সেপ্টেম্বর, ২০২৬",
    readTime: "৫ মিনিট পাঠ",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    excerpt: "১০ মিলিওয়াটের কম শক্তিতে চালিত স্পাইকিং নিউরাল নেটওয়ার্ক চিপ ব্যাটারি ছাড়াই দীর্ঘ বছর স্বয়ংক্রিয় সেন্সিং পরিচালনা করতে সক্ষম।",
    author: "ফারহান তানভীর",
    content: `
      <p>মানুষের চোখের রেটিনা ও মস্তিষ্কের জৈবিক সংকেত অনুকরণ করে নিউরোমরফিক চিপ কেবল পিক্সেল পরিবর্তন হলেই ডেটা প্রসেস করে। ফলে সার্বক্ষণিক বিদ্যুৎ অপচয় ৯৮% এরও বেশি কমে যায়।</p>
      <p>বন্যপ্রাণী পর্যবেক্ষণ, পরিবেশ সেন্সর এবং স্মার্ট ইনফ্রাস্ট্রাকচারে ব্যাটারি পরিবর্তন ছাড়াই এই চিপগুলো বছরের পর বছর সচল থাকতে পারবে।</p>
    `
  }
];

const defaultPromptsData = [
  {
    id: "prompt-1",
    title: "সিনেমাটিক সাইবারপাংক মেট্রোপলিস ল্যান্ডস্কেপ",
    category: "ছবি তৈরি",
    tool: "Midjourney v6 / Flux.1",
    desc: "উজ্জ্বল নিয়ন আলো, বৃষ্টির ভেজা রাস্তা, ৩৫মিমি অ্যানামরফিক লেন্সের বাস্তবসম্মত আলোর প্রতিফলন ও গভীরতা সমৃদ্ধ ছবি তৈরি করে।",
    promptText: "A sweeping wide-angle cinematic shot of a neo-cyberpunk coastal metropolis at dusk, towering brutalist glass arcologies illuminated with electric cyan and magenta neon holographic advertisements, rain-slick asphalt reflecting ambient light, atmospheric volumetric mist, shot on 35mm anamorphic lens, Arri Alexa 65, f/2.8, hyper-detailed textures, photorealistic raytracing, moody cinematic grading --ar 16:9 --style raw --v 6.0",
    params: {
      "অ্যাসপেক্ট রেশিও": "16:9",
      "মডেল ইঞ্জিন": "Flux.1 Schnell অথবা Midjourney v6",
      "স্টাইলাইজ": "250",
      "লাইটিং": "গোধূলির নিয়ন ও ভলিউমেট্রিক কুয়াশা"
    },
    tips: "সিনেমার মতো ওয়াইড লুক পেতে ১৬:৯ বা ২১:৯ অ্যাসপেক্ট রেশিও ব্যবহার করুন।"
  },
  {
    id: "prompt-2",
    title: "ব্যবসায়িক কৌশল ও বাজার প্রতিরক্ষা বিশ্লেষক",
    category: "ব্যবসা ও উদ্যোগ",
    tool: "Claude 3.7 / GPT-4o",
    desc: "ম্যাকেঞ্জি শৈলীর ৫-স্তম্ভ বিশ্লেষণ যা প্রতিযোগী থেকে নিজস্ব ব্যবসার প্রতিরক্ষা ও দুর্বলতা চিহ্নিত করে।",
    promptText: "You are a seasoned Principal Strategy Consultant at McKinsey specializing in technology moats and asymmetric competition. Conduct a comprehensive 5-pillar strategic defense analysis of [এখানে আপনার পণ্য বা কোম্পানির নাম লিখুন].\n\nEvaluate:\n1. Network Effects: Direct, indirect, and asymptotic limits.\n2. Switching Costs: Procedural, relational, and data gravity lock-in.\n3. Cost Advantages & Scale Economies: Proprietary silicon, logistics, or process secrets.\n4. Regulatory & Distribution Moats: Exclusive partnership channels and compliance friction.\n5. Asymmetric Vulnerabilities: What adjacent technology shifts could render this core value proposition obsolete within 36 months?\n\nProvide ruthless, objective critique, concrete operational metrics, and 3 high-leverage defensive countermeasures.",
    params: {
      "টেম্পারেচার": "0.2 (নির্ভুল ও বিশ্লেষণধর্মী)",
      "প্রস্তাবিত এআই": "Claude 3.7 Sonnet / o3-mini",
      "আউটপুট ফরম্যাট": "স্ট্রাকচার্ড এক্সিকিউটিভ মেমো"
    },
    tips: "ব্র্যাকেটের জায়গায় আপনার ব্যবসার নাম ও টার্গেট কাস্টমারের তথ্য দিন।"
  },
  {
    id: "prompt-3",
    title: "উচ্চ রূপান্তরকারী SaaS ল্যান্ডিং পেজ কপিরাইটার",
    category: "চ্যাটজিপিটি / এলএলএম",
    tool: "ChatGPT / Claude",
    desc: "ভিজিটরদের গ্রাহকে রূপান্তর করার জন্য মনস্তাত্ত্বিক PAS ফ্রেমওয়ার্কে আকর্ষণীয় ওয়েবসাইটের টেক্সট রচনা করে।",
    promptText: "Act as an elite conversion copywriter whose landing pages consistently produce >14% demo conversion rates. I am launching [পণ্যের নাম], which solves [মূল সমস্যা] for [টার্গেট অডিয়েন্স].\n\nWrite a complete landing page copy deck containing:\n1. Above-the-fold Hero: Punchy, jargon-free H1 headline (under 9 words), reassuring 2-sentence subtitle, primary CTA button text, and social proof micro-copy.\n2. Problem Agitation (PAS): Vivid description of the daily friction and financial waste our users currently experience.\n3. Value Architecture: 3 distinct benefit blocks emphasizing the 'after-state' rather than technical feature lists.\n4. Objection Eliminator FAQ: 4 common buyer hesitations directly addressed with transparency.\n5. Closing Urgency CTA: Compelling final invitation.\n\nTone: Confident, empathetic, crisp, zero corporate buzzwords.",
    params: {
      "টেম্পারেচার": "0.7 (সৃজনশীল ও প্ররোচনামূলক)",
      "প্রস্তাবিত মডেল": "GPT-4o বা Claude 3.5 Sonnet",
      "শৈলী": "ডিরেক্ট-রেসপন্স কপিরাইটিং"
    },
    tips: "গ্রাহকদের বাস্তব কিছু মন্তব্য বা রিভিউ জুড়ে দিলে লেখার মান আরও বাস্তবসম্মত হবে।"
  },
  {
    id: "prompt-4",
    title: "শর্ট-ফর্ম ভিডিও ভাইরাল হুক আর্কিটেক্ট",
    category: "সোশ্যাল মিডিয়া",
    tool: "ChatGPT / Claude",
    desc: "টিকটক, ইনস্টাগ্রাম রিলস ও ইউটিউব শর্টসের জন্য প্রথম ৩ সেকেন্ডের অত্যন্ত নজরকাড়া ১০টি কার্যকর হুক।",
    promptText: "You are a short-form content strategist who has generated over 200M organic views across TikTok and YouTube Shorts. For the topic [ভিডিওর বিষয়বস্তু লিখুন], write 10 viral hooks designed to maximize 3-second watch-through rates.\n\nFor each hook, supply:\n- Visual Framing: What does the creator show or do on camera during second 0-2? (e.g. pattern interruption, unusual prop, high-contrast action)\n- Spoken Script: Exactly what 12-18 words are spoken?\n- On-Screen Kinetic Text: High-contrast caption overlay text.\n- Psychological Trigger: Curiosity gap, contrarian stance, FOMO, or visceral transformation.\n\nEnsure no hooks begin with boring cliches like 'Did you know' or 'Hey guys'.",
    params: {
      "টেম্পারেচার": "0.8 (উচ্চ বৈচিত্র্য)",
      "প্ল্যাটফর্ম": "TikTok, Instagram Reels, Shorts"
    },
    tips: "কোনো হুক যেন 'হ্যালো বন্ধুরা' দিয়ে শুরু না হয়, সরাসরি অ্যাকশন দেখান।"
  },
  {
    id: "prompt-5",
    title: "কাইনেমেটিক ড্রোন ফ্লাইট ও ভিডিও ক্যামেরার মুভমেন্ট",
    category: "ভিডিও তৈরি",
    tool: "Runway Gen-3 / Sora / Kling",
    desc: "টেক্সট-টু-ভিডিও মডেলে বাস্তবসম্মত ক্যামেরা ড্রাইভ ও প্রাকৃতিক লাইটিং বজায় রাখার জন্য বিশেষ স্ক্রিপ্ট।",
    promptText: "First-person continuous FPV drone shot accelerating through a crystalline neon bioluminescent cavern, dipping low across calm subterranean water reflecting cyan stalactites, banked 45-degree roll through a narrow quartz crevice, emerging into a colossal sunlit geothermal atrium filled with ancient monolithic ferns, cinematic lighting, ultra-realistic volumetric light shafts, natural lens motion blur, 8k resolution, 60fps --motion 7",
    params: {
      "ক্যামেরা মোশন": "FPV continuous dive & roll",
      "ভিডিও ইঞ্জিন": "Runway Gen-3 Alpha অথবা Kling 1.5",
      "ফ্রেমরেট": "60fps"
    },
    tips: "ক্যামেরার সঠিক গতিবিধি উল্লেখ করলে ভিডিওতে অবজেক্ট বিকৃত হয় না।"
  },
  {
    id: "prompt-6",
    title: "দৈনিক স্ট্যান্ডআপ ও ব্লকার ডাইজেস্ট অটোমেশন",
    category: "উৎপাদনশীলতা",
    tool: "ChatGPT / Claude",
    desc: "অগোছালো চ্যাট ও কমিট হিস্টোরি থেকে ঝটপট টিম লিডদের জন্য ঝকঝকে প্রজেক্ট সারসংক্ষেপ তৈরি করে।",
    promptText: "You are an Agile Technical Scrum Master. Analyze the following raw developer status updates and issue tracking snippets:\n\n[এখানে স্ল্যাক বা ডিসকর্ড চ্যাটের অগোছালো মেসেজ পেস্ট করুন]\n\nExtract and synthesize:\n1. Sprint Health Overview: 1-sentence status (On Track, At Risk, Blocked).\n2. Completed Deliverables: Grouped by user story with developer attribution.\n3. Active Blockers & Dependencies: Who is blocked, what external dependency is causing it, and recommended mitigation owner.\n4. Next 24-Hour Priorities: Critical path items necessary for milestone shipping.\n\nFormat in clean Markdown with zero filler commentary.",
    params: {
      "টেম্পারেচার": "0.1 (কঠোর তথ্য নিষ্কাশন)",
      "ফরম্যাট": "ক্লিন মার্কডাউন"
    },
    tips: "টিমের দৈনিক আপডেট সমন্বয়ে এই প্রম্পটটি স্বয়ংক্রিয় বট হিসেবে ব্যবহার করা যায়।"
  },
  {
    id: "prompt-7",
    title: "আইসোমেট্রিক থ্রিডি মাইক্রো-ওয়ার্ল্ড ডিওরামা",
    category: "ছবি তৈরি",
    tool: "Midjourney / DALL-E 3",
    desc: "অ্যাপ আইকন ও ল্যান্ডিং পেজের জন্য মায়াবী থ্রিডি কিউব ও মিনিয়েচার আর্কিটেকচার ইলাস্ট্রেশন।",
    promptText: "Charming isometric 3D cutaway diorama of a modern cyberpunk researcher's loft floating on a floating crystalline chunk, miniature modular server racks with glowing cyan LED lights, cozy wooden bookshelf lined with vintage books, holographic monitors displaying charts, miniature bonsai tree, clay render style meets octane render, clean soft studio lighting, soft pastel accents, high resolution, 3D blender aesthetic --ar 1:1 --v 6.0",
    params: {
      "অ্যাসপেক্ট রেশিও": "1:1 (বর্গাকার)",
      "স্টাইল": "Clay Render + Octane 3D"
    },
    tips: "ব্লেন্ডার ও ক্লে-রেন্ডার শৈলীর জন্য এটি দারুণ কার্যকর।"
  },
  {
    id: "prompt-8",
    title: "জটিল কোড রিফ্যাক্টরিং ও সিকিউরিটি অডিটর",
    category: "উৎপাদনশীলতা",
    tool: "Claude 3.7 / DeepSeek R1",
    desc: "বাগ, মেমোরি লিক এবং কার্যক্ষমতার দুর্বলতা খুঁজে বের করে সর্বাধুনিক ক্লিন কোড উপহার দেয়।",
    promptText: "Act as a Principal Staff Software Engineer and Security Auditor. Review the provided source code:\n\n```[প্রোগ্রামিং ভাষা]\n[আপনার কোড এখানে পেস্ট করুন]\n```\n\nPerform a deep static audit covering:\n1. Time & Space Complexity: Worst-case Big-O bottlenecks.\n2. Concurrency & Race Hazards: Unhandled async states, reentrancy bugs, or memory leaks.\n3. Error Boundaries & Edge Cases: Null checks, boundary overflows, and unhandled promise rejections.\n4. Idiomatic Refactoring: Provide a fully commented, drop-in replacement version incorporating modern best practices, immutability, and clean naming conventions.",
    params: {
      "টেম্পারেচার": "0.1 (সর্বোচ্চ নির্ভুলতা)",
      "প্রস্তাবিত মডেল": "Claude 3.7 (Thinking Mode)"
    },
    tips: "কোডের সাথে প্রাসঙ্গিক টাইপ ডেফিনিশন পেস্ট করলে উত্তর আরও ভালো হয়।"
  }
];

const defaultTechData = [
  {
    id: "tech-1",
    title: "লোকাল-ফার্স্ট অ্যাপ্লিকেশন তৈরি: আধুনিক ওয়েবের টেকসই ব্লুপ্রিন্ট",
    category: "এআই ও সফটওয়্যার গাইড",
    readTime: "৭ মিনিট পাঠ",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    summary: "সার্ভারের ওপর নির্ভরশীলতা কমিয়ে সিআরডিটি (CRDTs), ইনডেক্সড-ডিবি এবং অফলাইন ব্রাউজার মেমোরির মাধ্যমে শূন্য মিলিসেকেন্ড ল্যাটেন্সিতে অ্যাপ চালানোর কৌশল।",
    guideContent: `
      <p>গত পনেরো বছর ধরে ওয়েব আর্কিটেকচার ছিল একটাই নিয়মে বাঁধা: স্ক্রিনে প্রতিটি ক্লিকে ডেটা ক্লাউডের এসকিউএল ডাটাবেজে যাবে এবং সেখান থেকে রেসপন্স এলে তবেই স্ক্রিন আপডেট হবে। এতে করে যেকোনো সার্ভার বিভ্রাটে পুরো অ্যাপ অচল হয়ে পড়তো।</p>

      <h3>লোকাল-ফার্স্ট সফটওয়্যার কী?</h3>
      <p>লোকাল-ফার্স্ট অ্যাপ্লিকেশনে ব্যবহারকারীর সব ডেটা প্রথমে তার নিজের ডিভাইসে জমা হয় (০ মিলিসেকেন্ডে)। ইন্টারনেট থাকা না থাকা কোনো বাধা নয়; ইন্টারনেট সংযোগ পেলে ব্যাকগ্রাউন্ডে স্বয়ংক্রিয়ভাবে ক্লাউডে সিঙ্ক হয়ে যায়।</p>

      <h3>মূল ৪টি স্তম্ভ</h3>
      <ol>
        <li><strong>ইনপুটে শূন্য ল্যাটেন্সি:</strong> প্রতিটি ক্লিক বা টাইপিং তাৎক্ষণিকভাবে ব্রাউজারের নিজস্ব স্টোরেজে সংরক্ষিত হয়।</li>
        <li><strong>অফলাইন কোনো সমস্যা নয়:</strong> অফলাইনেও অ্যাপ ১০০% সচল থাকে।</li>
        <li><strong>সিআরডিটি (CRDTs):</strong> একাধিক ডিভাইস থেকে একসাথে পরিবর্তন করলেও কোনো ডেটা মুছে যায় না, নিখুঁতভাবে মার্জ হয়।</li>
        <li><strong>ব্যবহারকারীর ডেটা স্বাধীনতা:</strong> হোস্টিং কোম্পানি বন্ধ হয়ে গেলেও ব্যবহারকারীর ডেটা তার লোকাল মেশিনে সুরক্ষিত থাকে।</li>
      </ol>
    `
  },
  {
    id: "tech-2",
    title: "স্মল ল্যাঙ্গুয়েজ মডেল (SLM): ব্রাউজারে লোকাল এআই চালানোর সম্পূর্ণ গাইড",
    category: "এআই ও সফটওয়্যার গাইড",
    readTime: "৬ মিনিট পাঠ",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    summary: "ওয়েবজিপিইউ (WebGPU) প্রযুক্তি ব্যবহার করে ব্যবহারকারীর ব্যক্তিগত ডেটা সার্ভারে না পাঠিয়েই ব্রাউজার ট্যাবে ১-৩ বিলিয়ন প্যারামিটারের মডেল চালানোর উপায়।",
    guideContent: `
      <p>বিশাল ক্লাউড মডেলের চেয়েও সবচেয়ে রোমাঞ্চকর পরিবর্তন ঘটছে সরাসরি ইউজার ডিভাইসে। ৪-বিট কোয়ান্টাইজেশন ও ব্রাউজারের WebGPU সাপোর্টের মাধ্যমে Llama-3 ও Phi-3.5 এর মতো মডেল প্রতি সেকেন্ডে ৪০+ টোকেন গতিতে ল্যাপটপে চলছে।</p>

      <h3>ব্রাউজারে এআই চালানোর সুবিধা</h3>
      <ul>
        <li><strong>১০০% ডেটা গোপনীয়তা:</strong> রোগীর মেডিকেল রেকর্ড বা ব্যক্তিগত আর্থিক তথ্য ডিভাইসের বাইরে যায় না।</li>
        <li><strong>জিরো এপিআই বিল:</strong> প্রতি টোকেনের জন্য ক্লাউড বিল দেওয়ার প্রয়োজন পড়ে না।</li>
        <li><strong>অফলাইন সুবিধা:</strong> বিমানে বা নেটওয়ার্কহীন এলাকায়ও চ্যাটবট ও পার্সার কাজ করে।</li>
      </ul>
    `
  },
  {
    id: "tech-3",
    title: "সিএসএস গ্রিড সাবগ্রিড এবং কন্টেইনার কোয়েরিজ: ম্যাগাজিন লেআউটের মাস্টারক্লাস",
    category: "সফটওয়্যার টিপস",
    readTime: "৫ মিনিট পাঠ",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    summary: "পুরনো মিডিয়া কোয়েরির জটিলতা বাদ দিয়ে কম্পোনেন্টের নিজস্ব আকারের ওপর ভিত্তি করে স্বয়ংক্রিয় অ্যাডাপ্টিভ গ্রিড তৈরি করুন।",
    guideContent: `
      <p>পুরনো মিডিয়া কোয়েরিতে পুরো ব্রাউজার উইন্ডোর প্রস্থ দেখতে হতো। কিন্তু আধুনিক <strong>Container Queries</strong> এর মাধ্যমে একটি কার্ড তার প্যারেন্ট কন্টেইনারের সাইজ মেপে স্বয়ংক্রিয়ভাবে রূপ বদলাতে পারে।</p>
      <pre><code>.card-container {
  container-type: inline-size;
}

@container (min-width: 480px) {
  .card-inner {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
}</code></pre>
      <p>পাশাপাশি <code>subgrid</code> ব্যবহারের ফলে পাশাপাশি থাকা সব কার্ডের হেডিং ও বাটন একই সমান্তরাল লাইনে সোজা থাকে।</p>
    `
  },
  {
    id: "tech-4",
    title: "১০টি অপরিহার্য ফ্রি ওয়েব ডেভেলপার টুল যা আপনার জানা উচিত",
    category: "দরকারি ওয়েব টুলস",
    readTime: "৪ মিনিট পাঠ",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    summary: "রেজেক্স টেস্ট, এসভিজি অপ্টিমাইজেশন, কালার কন্ট্রাস্ট অডিট এবং ব্রাউজার কম্প্যাটিবিলিটির সেরা ওপেন-সোর্স ইউটিলিটি তালিকা।",
    guideContent: `
      <p>দক্ষ ডেভেলপাররা অপ্রয়োজনীয় পরিশ্রমে সময় নষ্ট করেন না। তারা নির্ভর করেন বিশ্বস্ত ফ্রি টুলসের ওপর:</p>
      <ul>
        <li><strong>SVGOMG:</strong> এসভিজি ফাইলের কোয়ালিটি নষ্ট না করে সাইজ কমিয়ে নেওয়ার সেরা ব্রাউজার টুল।</li>
        <li><strong>Regex101:</strong> রেগুলার এক্সপ্রেশন নির্ভুল করার ইন্টারঅ্যাকটিভ এডিটর।</li>
        <li><strong>Can I Use:</strong> কোন ব্রাউজারে কোন সিএসএস বা জাভাস্ক্রিপ্ট ফিচার চলে তা তাৎক্ষণিক জানার সাইট।</li>
        <li><strong>Hoppscotch:</strong> পোস্টম্যানের চেয়েও দ্রুতগতির লাইটওয়েট এপিআই টেস্টিং টুল যা সরাসরি ব্রাউজারে চলে।</li>
        <li><strong>WebAIM Contrast Checker:</strong> দৃষ্টিপ্রতিবন্ধীদের পড়ার উপযোগী টেক্সট কন্ট্রাস্ট নিশ্চিত করার টুল।</li>
      </ul>
    `
  },
  {
    id: "tech-5",
    title: "ইন্ডি ডেভেলপার ও স্টার্টআপদের জন্য জিরো-ট্রাস্ট সিকিউরিটি অনুশীলন",
    category: "সফটওয়্যার টিপস",
    readTime: "৬ মিনিট পাঠ",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    summary: "ক্রেডেনশিয়াল ফাঁস, সাপ্লাই চেইন আক্রমণ ও ডাটাবেজ হ্যাক থেকে ছোট টিমের সাইবার নিরাপত্তা নিশ্চিত করার কার্যকর পরামর্শ।",
    guideContent: `
      <p>অনেক নতুন উদ্যোক্তা মনে করেন তারা ছোট হওয়ায় হ্যাকারদের নজরে পড়বেন না। কিন্তু স্বয়ংক্রিয় গিটহাব স্ক্র্যাপার বট যেকোনো অসতর্ক এপিআই কি মুহূর্তেই চুরি করে ফেলে।</p>
      <ol>
        <li><strong>হার্ডওয়্যার পাসকি (Passkeys):</strong> গিটহাব ও ক্লাউড প্রোভাইডারে এসএমএস ওটির বদলে পাসকি ব্যবহার করুন।</li>
        <li><strong>গিট প্রি-কমিট হুক:</strong> <code>gitleaks</code> দিয়ে নিশ্চিত করুন যেন ভুলবশত কোনো সিক্রেট কি পুশ না হয়।</li>
        <li><strong>কন্টেন্ট সিকিউরিটি পলিসি (CSP):</strong> সাইটে অননুমোদিত স্ক্রিপ্ট প্রবেশ রোধ করতে কড়া সিএসপি হেডার দিন।</li>
      </ol>
    `
  },
  {
    id: "tech-6",
    title: "ভেক্টর এমবেডিংস ও হাইব্রিড সার্চ আর্কিটেকচার",
    category: "ডিজিটাল ট্রেন্ডস",
    readTime: "৫ মিনিট পাঠ",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
    summary: "শুধু ভেক্টর সার্চে কেন সুনির্দিষ্ট নাম বা কোড মিস হয় এবং কীভাবে বিএম২৫ কিওয়ার্ড সার্চের সাথে ভেক্টর মিলিয়ে সেরা রেজাল্ট পাওয়া যায়।",
    guideContent: `
      <p>কৃত্রিম বুদ্ধিমত্তার RAG সিস্টেমে অনেকেই কেবল ভেক্টর সিমিলারিটির ওপর নির্ভর করেন। কিন্তু সঠিক পার্ট নম্বর, বিশেষ নাম বা এরর কোড খুঁজতে ভেক্টর সার্চ ব্যর্থ হয়।</p>
      <p>আধুনিক হাইব্রিড সার্চে <strong>BM25 (কিওয়ার্ড সার্চ)</strong> এবং <strong>Dense Vector Embedding</strong> একত্রিত করে রিসিপ্রোকাল র‍্যাঙ্ক ফিউশন (RRF) প্রয়োগ করা হয়, যা শতভাগ নির্ভরযোগ্য ফলাফল আনে।</p>
    `
  }
];

const defaultBooksData = [
  {
    id: "book-1",
    title: "ফ্রাঙ্কেনস্টাইন (Frankenstein)",
    author: "মেরি ওলস্টোনক্র্যাফট শেলি",
    category: "বৈজ্ঞানিক কল্পকাহিনী",
    language: "ইংরেজি মূল (অনুবাদ সমর্থিত)",
    license: "পাবলিক ডোমেন (উন্মুক্ত স্বত্ব)",
    year: "১৮১৮",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    desc: "বিজ্ঞান কল্পকাহিনীর প্রথম ও অবিসংবাদিত কালজয়ী ক্লাসিক। বিজ্ঞানীদের উচ্চাকাঙ্ক্ষা, নৈতিক দায়বদ্ধতা এবং সৃষ্টির প্রতি স্রষ্টার কর্তব্যের মর্মস্পর্শী আখ্যান।",
    gutenbergUrl: "https://www.gutenberg.org/ebooks/84",
    pdfUrl: "https://archive.org/download/frankensteinor00shel/frankensteinor00shel.pdf",
    chapters: [
      {
        heading: "চিঠি ১ — আবিষ্কারের সূচনা",
        text: "প্রিয় বোন স্যাভিল, জেনে আনন্দিত হবে যে আমার এই অভিযানে কোনো বিপদ ঘটেনি। গতকাল সেন্ট পিটার্সবার্গে এসে পৌঁছেছি। আমার প্রিয় বোনকে নিরাপদে থাকার খবর দেওয়া এবং অভিযানে সাফল্যের বিষয়ে আশ্বস্ত করাই আমার প্রথম কাজ। উত্তর সাগরের ঠান্ডা বাতাস আমার গালে খেলা করছে এবং স্নায়ুকে উদ্দীপিত করে তুলছে।"
      },
      {
        heading: "অধ্যায় ৪ — প্রাণ সঞ্চার",
        text: "নভেম্বরের এক বিষণ্ণ রাতে আমি আমার দীর্ঘদিনের সাধনার চূড়ান্ত রূপ প্রত্যক্ষ করলাম। তীব্র উৎকণ্ঠা নিয়ে জীবনের যন্ত্রপাতি চারপাশে সাজিয়েছিলাম, যেন পায়ের কাছে পড়ে থাকা নিষ্প্রাণ অবয়বটিতে প্রাণের সঞ্চার ঘটাতে পারি। রাত তখন একটা; জানালায় বৃষ্টি পড়ছিল ঝমঝম করে। আধ-নেভা মোমবাতির আলোয় হঠাৎ দেখলাম সেই প্রাণীর হলুদ চোখ দুটো ধীরে ধীরে খুলে গেল; সে জোরে নিশ্বাস নিল, আর তার হাত-পা কেঁপে উঠল।"
      }
    ]
  },
  {
    id: "book-2",
    title: "দ্য আর্ট অব ওয়ার (The Art of War)",
    author: "সান জু (Sun Tzu)",
    category: "দর্শন ও রণকৌশল",
    language: "ইংরেজি অনুবাদ ও মূল ভাবার্থ",
    license: "পাবলিক ডোমেন (উন্মুক্ত স্বত্ব)",
    year: "খ্রিস্টপূর্ব ৫ম শতক",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
    desc: "নেতৃত্ব, অবস্থান গ্রহণ, মনস্তাত্ত্বিক যুদ্ধ জয় এবং যুদ্ধ ছাড়াই লক্ষ্য হাসিলের ইতিহাসের সবচেয়ে প্রভাবশালী কৌশলগ্রন্থ।",
    gutenbergUrl: "https://www.gutenberg.org/ebooks/132",
    pdfUrl: "https://archive.org/download/artofwar00sunz/artofwar00sunz.pdf",
    chapters: [
      {
        heading: "অধ্যায় ১ — পরিকল্পনার মূলনীতি",
        text: "সান জু বললেন: যুদ্ধ রাষ্ট্রের জন্য অত্যন্ত গুরুত্বপূর্ণ একটি বিষয়। এটি জীবন ও মৃত্যুর পথ, টিকে থাকা কিংবা ধ্বংসের প্রশ্ন। অতএব কোনো অবস্থাতেই এটিকে অবহেলা করা যায় না। যে কোনো পদক্ষেপ নেওয়ার আগে পাঁচটি বিষয় বিবেচনা করতে হয়: নৈতিক নীতি, আকাশ ও আবহাওয়া, ভূ-প্রকৃতি, সেনাপতির প্রজ্ঞা, এবং সুশৃঙ্খল নিয়মকানুন।"
      },
      {
        heading: "অধ্যায় ৩ — কৌশল দ্বারা জয়",
        text: "যুদ্ধের শ্রেষ্ঠ কৌশল হলো যুদ্ধ না করেই শত্রুকে পরাস্ত করা। শত যুদ্ধে শত জয়ই চূড়ান্ত পরাক্রম নয়; শত্রুর প্রতিরোধশক্তি লড়াই ছাড়াই ভেঙে দেওয়াই পরম শ্রেষ্ঠত্ব। তাই সর্বোচ্চ স্তরের সেনাপতিত্ব হলো শত্রুর পরিকল্পনাকে অঙ্কুরেই নস্যাৎ করা।"
      }
    ]
  },
  {
    id: "book-3",
    title: "টুয়েন্টি থাউজেন্ড লিগস আন্ডার দ্য সি",
    author: "জুল ভার্ন (Jules Verne)",
    category: "বৈজ্ঞানিক কল্পকাহিনী",
    language: "ইংরেজি অনুবাদ সংস্করণ",
    license: "পাবলিক ডোমেন (উন্মুক্ত স্বত্ব)",
    year: "১৮৭০",
    cover: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80",
    desc: "ক্যাপ্টেন নিমো ও সাবমেরিন নটিলাসের রোমাঞ্চকর সমুদ্রযাত্রা। গভীর সাগরের রহস্য, পরিবেশ ও মানব শোষণের বিরুদ্ধে নিঃসঙ্গ লড়াই।",
    gutenbergUrl: "https://www.gutenberg.org/ebooks/164",
    pdfUrl: "https://archive.org/download/twentithousand00vern/twentithousand00vern.pdf",
    chapters: [
      {
        heading: "প্রথম খণ্ড — ভাসমান রহস্য",
        text: "১৮৬৬ সালে সমুদ্রের বুকে এক অদ্ভুত ও রহস্যময় ঘটনার সাক্ষী হলো বিশ্ব। নাবিক, বণিক এবং বিজ্ঞানীদের মধ্যে তীব্র চাঞ্চল্য সৃষ্টি হলো। একটি বিশাল সামুদ্রিক দানবের আবির্ভাবের খবর সবার মুখে মুখে ছড়িয়ে পড়ল, যা সব পরিচিত তিমি বা জাহাজের চেয়েও দ্রুতগামী ও শক্তিশালী।"
      },
      {
        heading: "ক্যাপ্টেন নিমোর স্বাধীনতার দর্শন",
        text: "ক্যাপ্টেন নিমো বললেন: 'এই সমুদ্র কোনো স্বৈরাচারীর সম্পত্তি নয়। ওপরের ভূমিতে মানুষ এখনো মানুষকে নিপীড়ন করতে পারে, রক্ত ঝরাতে পারে। কিন্তু সমুদ্রপৃষ্ঠের ত্রিশ ফুট নিচে নামলেই মানুষের সব আধিপত্য বিলীন হয়ে যায়। এখানে আমরা মুক্ত!'"
      }
    ]
  },
  {
    id: "book-forster",
    title: "দ্য মেশিন স্টপস (The Machine Stops)",
    author: "ই. এম. ফরস্টার (E.M. Forster)",
    category: "বৈজ্ঞানিক কল্পকাহিনী",
    language: "ইংরেজি মূল সংস্করণ",
    license: "পাবলিক ডোমেন (উন্মুক্ত স্বত্ব)",
    year: "১৯০৯",
    cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    desc: "১৯০৯ সালে লেখা ভবিষ্যৎবাণীমূলক উপন্যাসিকা যা আজকের ইন্টারনেট, ইনস্ট্যান্ট ভিডিও কল ও ভার্চুয়াল বিচ্ছিন্নতার হুবহু চিত্র তুলে ধরেছিল।",
    gutenbergUrl: "https://www.gutenberg.org/ebooks/70724",
    pdfUrl: "https://archive.org/download/machinestops00forsiala/machinestops00forsiala.pdf",
    chapters: [
      {
        heading: "পর্ব ১ — ষড়ভুজ কক্ষ",
        text: "কল্পনা করুন একটি ছোট ষড়ভুজ কক্ষ, ঠিক যেন মৌচাকের একটি কুঠুরি। সেখানে কোনো জানালা নেই, প্রদীপ নেই, তবুও পুরো ঘর মিষ্টি নরম আলোয় ভরা। কোনো বাদ্যযন্ত্র চোখে পড়ে না, তবুও সুরের মূর্ছনা ভেসে বেড়াচ্ছে। কক্ষের মাঝে একটি আরামকেদারা আর পাশে একটি টেবিল। সেখানে বাসটি নামের এক নারী বসে আছেন, পুরো পৃথিবী যার কাছে এই মেশিনের যান্ত্রিক যোগাযোগের মাধ্যমে পৌঁছায়।"
      },
      {
        heading: "ভিডিও পর্দার কথোপকথন",
        text: "বাসটির হাতের গোলাকার কাঁচের পাতটি হঠাৎ জ্বলে উঠল। নীল আলো ছড়িয়ে পড়তেই অন্য প্রান্তে তার ছেলের মুখ ভেসে উঠল। 'কী হয়েছে কুনো?' বাসটি জিজ্ঞেস করল। কুনো বলল, 'মা, আমি এই মেশিনের গোলকধাঁধার বাইরে সরাসরি খোলা বাতাসে তোমার সাথে দেখা করতে চাই!'"
      }
    ]
  },
  {
    id: "book-5",
    title: "থিঙ্ক পাইথন: প্রোগ্রামারের মতো চিন্তা করুন",
    author: "অ্যালেন বি. ডাউনি (Allen B. Downey)",
    category: "কোডিং ও প্রযুক্তি",
    language: "ইংরেজি ওপেন এডিশন",
    license: "ক্রিয়েটিভ কমন্স (CC BY-NC 3.0)",
    year: "২০১৬",
    cover: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
    desc: "কম্পিউটার বিজ্ঞানের মূল ধারণা, অ্যালগরিদমিক চিন্তা ও পাইথনের মাধ্যমে বাস্তব সমস্যার সমাধান শেখার উন্মুক্ত বিখ্যাত বই।",
    gutenbergUrl: "https://greenteapress.com/wp/think-python-2e/",
    pdfUrl: "https://greenteapress.com/thinkpython2/thinkpython2.pdf",
    chapters: [
      {
        heading: "অধ্যায় ১ — প্রোগ্রামের মূল দর্শন",
        text: "একজন কম্পিউটার বিজ্ঞানীর সবচেয়ে গুরুত্বপূর্ণ দক্ষতা হলো সমস্যা সমাধান করার ক্ষমতা (Problem Solving)। এর অর্থ হলো জটিল সমস্যাকে স্পষ্টভাবে সংজ্ঞায়িত করা এবং তার যৌক্তিক সমাধানের রূপরেখা তৈরি করা। কোড লেখা কেবল একটি ভাষা শেখা নয়, এটি বাস্তব চিন্তা প্রকাশের এক শক্তিশালী মাধ্যম।"
      },
      {
        heading: "ডিবাগিং ও বিজ্ঞান",
        text: "প্রোগ্রামিংয়ে ভুল হওয়া একটি স্বাভাবিক নিয়ম। ডিবাগিং মূলত পরীক্ষামূলক বিজ্ঞানের মতো: আপনার মনে একটি হাইপোথিসিস তৈরি হবে, কোড পরিবর্তন করবেন এবং ফলাফল দেখে সিদ্ধান্ত নেবেন।"
      }
    ]
  },
  {
    id: "book-6",
    title: "লিটল ব্রাদার (Little Brother)",
    author: "কোরি ডক্টরো (Cory Doctorow)",
    category: "কোডিং ও প্রযুক্তি",
    language: "ইংরেজি ওপেন সংস্করণ",
    license: "ক্রিয়েটিভ কমন্স (CC BY-NC-SA)",
    year: "২০০৮",
    cover: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=600&q=80",
    desc: "সান ফ্রান্সিসকোর এক কিশোর হ্যাকারের কাহিনী, যে নজরদারি রাষ্ট্রের বিরুদ্ধে ওপেন-সোর্স ক্রিপ্টোগ্রাফি দিয়ে নাগরিকদের গোপনীয়তা রক্ষা করে।",
    gutenbergUrl: "https://craphound.com/littlebrother/download/",
    pdfUrl: "https://craphound.com/littlebrother/download/cory_doctorow_little_brother.pdf",
    chapters: [
      {
        heading: "অধ্যায় ১ — সার্বক্ষণিক নজরদারি",
        text: "সান ফ্রান্সিসকোর আমাদের হাইস্কুলে পা রাখলেই মনে হয় কোনো কারাগারে প্রবেশ করেছি। আমাদের হাঁটার গতি, স্মার্টকার্ডের ব্যবহার এবং কম্পিউটারের প্রতিটি ক্লিকে নজর রাখা হয়। কিন্তু আমরা দ্রুত শিখে গিয়েছিলাম: ক্রিপ্টোগ্রাফি কোনো অপরাধ নয়, এটি মানুষের মৌলিক ডিজিটাল নাগরিক অধিকার।"
      }
    ]
  }
];

// Dynamic post arrays with LocalStorage persistence
let newsData = [];
let promptsData = [];
let techData = [];
let booksData = [];

/**
 * Check if a post is one of the initial default seed posts (e.g. news-1, prompt-1, tech-1, book-1)
 */
export function isDefaultPost(item) {
  if (!item || !item.id) return false;
  return /^(news|prompt|tech|book)-[0-9]{1,4}$/.test(String(item.id));
}

/**
 * Extract reliable epoch timestamp in milliseconds for user created posts.
 */
export function getUserPostTimestamp(item) {
  if (!item) return 0;

  // 1. Explicit createdAt ISO string or numeric epoch
  if (item.createdAt) {
    const t = typeof item.createdAt === 'number' ? item.createdAt : Date.parse(item.createdAt);
    if (!isNaN(t) && t > 0) return t;
  }

  // 2. ID ending with unix timestamp (e.g. news-1776033830123)
  if (item.id && typeof item.id === 'string') {
    const idMatch = item.id.match(/-(\d{10,})$/);
    if (idMatch) {
      const ts = Number(idMatch[1]);
      if (!isNaN(ts) && ts > 1000000000000) return ts;
    }
  }

  // 3. Explicit updatedAt ISO string or numeric epoch
  if (item.updatedAt) {
    const t = typeof item.updatedAt === 'number' ? item.updatedAt : Date.parse(item.updatedAt);
    if (!isNaN(t) && t > 0) return t;
  }

  // 4. Parse date string if available
  if (item.date && typeof item.date === 'string') {
    const parsed = Date.parse(item.date);
    if (!isNaN(parsed) && parsed > 0) return parsed;
  }

  return 0;
}

/**
 * Extract Google Drive file ID from any sharing, view, download or preview URL
 */
export function extractGoogleDriveId(url) {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();

  // 1. Google Drive file URL: /file/d/{id}, /file/u/0/d/{id}, /d/{id}
  const fileMatch = trimmed.match(/(?:\/file(?:\/u\/\d+)?\/d\/|\/d\/)([a-zA-Z0-9_-]{15,})/i);
  if (fileMatch && fileMatch[1]) return fileMatch[1];

  // 2. Query parameter: ?id={id} or &id={id} (e.g. uc?id=... or open?id=...)
  const idMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]{15,})/i);
  if (idMatch && idMatch[1]) return idMatch[1];

  // 3. Google Docs / Spreadsheets / Presentations: /d/{id}
  const docMatch = trimmed.match(/docs\.google\.com\/(?:document|presentation|spreadsheets)\/d\/([a-zA-Z0-9_-]{15,})/i);
  if (docMatch && docMatch[1]) return docMatch[1];

  return null;
}

/**
 * Convert Google Drive (and other cloud storages) to a direct PDF download link
 */
export function getDirectPdfDownloadUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') return '';
  const url = rawUrl.trim();

  const driveId = extractGoogleDriveId(url);
  if (driveId) {
    if (url.includes('docs.google.com/document')) {
      return `https://docs.google.com/document/d/${driveId}/export?format=pdf`;
    }
    if (url.includes('docs.google.com/presentation')) {
      return `https://docs.google.com/presentation/d/${driveId}/export/pdf`;
    }
    if (url.includes('docs.google.com/spreadsheets')) {
      return `https://docs.google.com/spreadsheets/d/${driveId}/export?format=pdf`;
    }
    // Universal Google Drive direct file download URL
    return `https://drive.google.com/uc?export=download&id=${driveId}`;
  }

  // Dropbox direct download support
  if (url.includes('dropbox.com') && url.includes('dl=0')) {
    return url.replace('dl=0', 'dl=1');
  }

  return url;
}

/**
 * Sorts array of posts so new user posts are ALWAYS at the top (newest first),
 * followed by default seed posts in natural order (1, 2, 3...)
 */
export function sortPostsNewestFirst(items) {
  if (!Array.isArray(items)) return [];
  return [...items].sort((a, b) => {
    const aDef = isDefaultPost(a);
    const bDef = isDefaultPost(b);

    // 1. User created posts always come BEFORE default seed posts
    if (!aDef && bDef) return -1;
    if (aDef && !bDef) return 1;

    // 2. Both are default seed posts: preserve natural numerical order (e.g. news-1 before news-2)
    if (aDef && bDef) {
      const aNum = parseInt(String(a.id).replace(/\D+/g, '') || '0', 10);
      const bNum = parseInt(String(b.id).replace(/\D+/g, '') || '0', 10);
      return aNum - bNum;
    }

    // 3. Both are user posts: newest timestamp first
    const tA = getUserPostTimestamp(a);
    const tB = getUserPostTimestamp(b);
    if (tB !== tA) {
      return tB - tA;
    }
    return String(b.id || '').localeCompare(String(a.id || ''));
  });
}

function loadStoredPosts() {
  try {
    const sn = localStorage.getItem('nexora_news_data');
    newsData = sortPostsNewestFirst(sn ? JSON.parse(sn) : JSON.parse(JSON.stringify(defaultNewsData)));
    const sp = localStorage.getItem('nexora_prompts_data');
    promptsData = sortPostsNewestFirst(sp ? JSON.parse(sp) : JSON.parse(JSON.stringify(defaultPromptsData)));
    const st = localStorage.getItem('nexora_tech_data');
    techData = sortPostsNewestFirst(st ? JSON.parse(st) : JSON.parse(JSON.stringify(defaultTechData)));
    const sb = localStorage.getItem('nexora_books_data');
    if (sb) {
      booksData = sortPostsNewestFirst(JSON.parse(sb));
      // Migrate missing pdfUrl from default data if present
      booksData.forEach(b => {
        if (!b.pdfUrl) {
          const def = defaultBooksData.find(d => d.id === b.id);
          if (def && def.pdfUrl) b.pdfUrl = def.pdfUrl;
        }
      });
    } else {
      booksData = sortPostsNewestFirst(JSON.parse(JSON.stringify(defaultBooksData)));
    }
  } catch(e) {
    console.error('Error loading posts from storage', e);
    newsData = sortPostsNewestFirst(JSON.parse(JSON.stringify(defaultNewsData)));
    promptsData = sortPostsNewestFirst(JSON.parse(JSON.stringify(defaultPromptsData)));
    techData = sortPostsNewestFirst(JSON.parse(JSON.stringify(defaultTechData)));
    booksData = sortPostsNewestFirst(JSON.parse(JSON.stringify(defaultBooksData)));
  }
}

function saveStoredPosts() {
  try {
    newsData = sortPostsNewestFirst(newsData);
    promptsData = sortPostsNewestFirst(promptsData);
    techData = sortPostsNewestFirst(techData);
    booksData = sortPostsNewestFirst(booksData);
    localStorage.setItem('nexora_news_data', JSON.stringify(newsData));
    localStorage.setItem('nexora_prompts_data', JSON.stringify(promptsData));
    localStorage.setItem('nexora_tech_data', JSON.stringify(techData));
    localStorage.setItem('nexora_books_data', JSON.stringify(booksData));
  } catch (e) {
    console.error('Error saving posts to storage', e);
  }
}

// Initial load on script execution
loadStoredPosts();

// ==========================================================================
// ২. অ্যাপ ইঞ্জিন ও ইন্টারঅ্যাকশন ক্লাস (Nexora Engine Class)
// ==========================================================================

class NexoraApp {
  constructor() {
    this.bookmarks = this.loadBookmarks();
    this.currentTheme = localStorage.getItem('nexora_theme') || this.detectSystemTheme();
    this.currentReaderItem = null;
    this.currentPromptItem = null;
    this.currentBookItem = null;
    this.searchScope = 'all';

    // অ্যাডমিন প্যানেল স্টেট ও ফায়ারবেস অথেন্টিকেশন (Admin Panel State & Firebase Auth)
    this.adminCurrentTab = 'list';
    this.adminFilterType = 'all';
    this.adminSearchQuery = '';
    this.adminEditingPost = null;
    this.currentAdminUser = null;
    this.isFirestoreSyncing = false;
    this.pendingDelete = null;
    this.uploadedImageDataUrl = null;
    this.imageSourceMode = 'upload';

    // অ্যাড আনলক ও রিড মোর গেট স্টেট (Ad Unlock & Read More State)
    this.unlockedPostIds = new Set();
    this.pendingUnlockTarget = null;

    // বর্তমান পেজ শনাক্তকরণ
    this.page = this.detectCurrentPage();

    this.init();
  }

  detectCurrentPage() {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('news')) return 'news';
    if (path.includes('prompts')) return 'prompts';
    if (path.includes('technology') || path.includes('tech')) return 'tech';
    if (path.includes('books') || path.includes('book')) return 'books';
    return 'home';
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.renderCurrentPageContent();
    this.updateBookmarksBadge();
    this.initHeroSlider();
    this.bindEvents();
    this.setupPostAdInterception();
    this.setupAdminAdShield();
    this.updateAdminStats();
    this.setupDropzoneEvents();
    this.setupFirebaseAuthListener();
    this.checkAndOpenPostFromUrl();
    this.fetchFirestoreData();
  }

  setupFirebaseAuthListener() {
    onAdminAuthStateChanged((user) => {
      this.currentAdminUser = user;
      this.updateAdminAuthUI();
      // রিলোড ফ্রন্টএন্ড বা অ্যাডমিন পোস্ট লিস্ট যদি প্রয়োজন হয়
      if (this.currentAdminUser && this.adminCurrentTab === 'list') {
        this.renderAdminPostList();
      }
    });
  }

  updateAdminAuthUI() {
    const userEmailSpan = document.getElementById('admin-current-user-email');
    if (userEmailSpan) {
      userEmailSpan.textContent = this.currentAdminUser ? (this.currentAdminUser.email || 'Admin') : 'অ্যাডমিন লগইন';
    }
  }

  async fetchFirestoreData() {
    try {
      const isPublic = !this.isAdminAuthenticated();
      const results = await Promise.allSettled([
        fetchCollection('news', isPublic),
        fetchCollection('aiPrompts', isPublic),
        fetchCollection('technology', isPublic),
        fetchCollection('books', isPublic)
      ]);

      const [nRes, pRes, tRes, bRes] = results;
      let hasData = false;

      if (nRes.status === 'fulfilled' && nRes.value && nRes.value.length > 0) {
        newsData = sortPostsNewestFirst(nRes.value);
        hasData = true;
      }
      if (pRes.status === 'fulfilled' && pRes.value && pRes.value.length > 0) {
        promptsData = sortPostsNewestFirst(pRes.value);
        hasData = true;
      }
      if (tRes.status === 'fulfilled' && tRes.value && tRes.value.length > 0) {
        techData = sortPostsNewestFirst(tRes.value);
        hasData = true;
      }
      if (bRes.status === 'fulfilled' && bRes.value && bRes.value.length > 0) {
        booksData = sortPostsNewestFirst(bRes.value);
        hasData = true;
      }

      if (hasData) {
        saveStoredPosts();
        this.renderCurrentPageContent();
        this.updateAdminStats();
        if (this.adminCurrentTab === 'list') {
          this.renderAdminPostList();
        }
        this.checkAndOpenPostFromUrl();
      }
    } catch (err) {
      console.warn('Fallback to local storage posts:', err);
    }
  }

  async syncDefaultDataToFirestore() {
    if (!this.isAdminAuthenticated()) {
      this.openAdminLoginModal();
      this.showToast('Firestore-এ সিঙ্ক করতে প্রথমে অ্যাডমিন হিসেবে লগইন করুন!', 'error');
      return;
    }

    this.showToast('Cloud Firestore-এ প্রাথমিক কন্টেন্ট সিঙ্ক শুরু হচ্ছে...', 'info');
    try {
      const syncPromises = [];
      for (const item of newsData) {
        syncPromises.push(saveDocument('news', item.id, item));
      }
      for (const item of promptsData) {
        syncPromises.push(saveDocument('aiPrompts', item.id, item));
      }
      for (const item of techData) {
        syncPromises.push(saveDocument('technology', item.id, item));
      }
      for (const item of booksData) {
        syncPromises.push(saveDocument('books', item.id, item));
      }
      await Promise.all(syncPromises);
      this.showToast('সবগুলো কন্টেন্ট Cloud Firestore-এ সফলভাবে সংরক্ষিত হয়েছে!', 'success');
      await this.fetchFirestoreData();
    } catch (e) {
      console.error('Firestore sync error:', e);
      this.showToast('Firestore সিঙ্কে ত্রুটি: ' + (e.message || ''), 'error');
    }
  }

  // ------------------------------------------------------------------------
  // ------------------------------------------------------------------------
  // হিরো স্লাইডার কন্ট্রোলার (Nexora Hero Showcase Slider - 5.5s Interval)
  // ------------------------------------------------------------------------
  initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    const prevBtn = document.getElementById('hero-prev-btn');
    const nextBtn = document.getElementById('hero-next-btn');
    const progressBar = document.getElementById('hero-progress-bar');
    const sliderContainer = document.querySelector('.hero-slider-container');

    if (!slides.length) return;

    let currentIndex = 0;
    const totalSlides = slides.length;
    const intervalTime = 5500; // ৫.৫ সেকেন্ড স্বয়ংক্রিয় স্লাইড (5.5s interval)
    let timer = null;

    const goToSlide = (index) => {
      slides[currentIndex].classList.remove('active');
      if (dots[currentIndex]) {
        dots[currentIndex].classList.remove('active');
        dots[currentIndex].setAttribute('aria-selected', 'false');
      }

      currentIndex = (index + totalSlides) % totalSlides;

      slides[currentIndex].classList.add('active');
      if (dots[currentIndex]) {
        dots[currentIndex].classList.add('active');
        dots[currentIndex].setAttribute('aria-selected', 'true');
      }

      resetProgress();
    };

    const nextSlide = () => goToSlide(currentIndex + 1);
    const prevSlide = () => goToSlide(currentIndex - 1);

    const resetProgress = () => {
      if (progressBar) {
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';
        // Force reflow
        void progressBar.offsetWidth;
        setTimeout(() => {
          progressBar.style.transition = `width ${intervalTime}ms linear`;
          progressBar.style.width = '100%';
        }, 30);
      }
    };

    const startTimer = () => {
      stopTimer();
      resetProgress();
      timer = setInterval(nextSlide, intervalTime);
    };

    const stopTimer = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
      if (progressBar) {
        progressBar.style.transition = 'none';
      }
    };

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        startTimer();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        startTimer();
      });
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        goToSlide(idx);
        startTimer();
      });
    });

    if (sliderContainer) {
      // হোভার ও ফোকাসে স্বয়ংক্রিয় স্লাইড সাময়িক বন্ধ
      sliderContainer.addEventListener('mouseenter', stopTimer);
      sliderContainer.addEventListener('mouseleave', startTimer);
      sliderContainer.addEventListener('focusin', stopTimer);
      sliderContainer.addEventListener('focusout', startTimer);

      // কীবোর্ড অ্যারো নেভিগেশন
      sliderContainer.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          prevSlide();
          startTimer();
        } else if (e.key === 'ArrowRight') {
          nextSlide();
          startTimer();
        }
      });

      // মোবাইল টাচ সোয়াইপ
      let touchStartX = 0;
      let touchEndX = 0;

      sliderContainer.addEventListener('touchstart', (e) => {
        if (e.changedTouches && e.changedTouches[0]) {
          touchStartX = e.changedTouches[0].screenX;
        }
        stopTimer();
      }, { passive: true });

      sliderContainer.addEventListener('touchend', (e) => {
        if (e.changedTouches && e.changedTouches[0]) {
          touchEndX = e.changedTouches[0].screenX;
          if (touchStartX - touchEndX > 45) {
            nextSlide();
          } else if (touchEndX - touchStartX > 45) {
            prevSlide();
          }
        }
        startTimer();
      }, { passive: true });
    }

    startTimer();
  }

  renderCurrentPageContent() {
    // Ensure all posts are strictly sorted newest first before rendering on any page
    newsData = sortPostsNewestFirst(newsData);
    promptsData = sortPostsNewestFirst(promptsData);
    techData = sortPostsNewestFirst(techData);
    booksData = sortPostsNewestFirst(booksData);

    // হোমপেজ হলে একীভূত "সর্বশেষ" ১২টি পোস্ট শীর্ষে রেন্ডার হবে (নতুন যেকোনো পোস্ট সবার প্রথমে)
    if (this.page === 'home') {
      const latestItems = this.getAllLatestPosts().slice(0, 12);
      this.renderLatest(latestItems);
    } else if (this.page === 'news') {
      this.renderNews(newsData);
    } else if (this.page === 'prompts') {
      this.renderPrompts(promptsData);
    } else if (this.page === 'tech') {
      this.renderTech(techData);
    } else if (this.page === 'books') {
      this.renderBooks(booksData);
    }
  }

  // ------------------------------------------------------------------------
  // থিম কন্ট্রোল (Light / Dark Theme)
  // ------------------------------------------------------------------------
  detectSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  }

  applyTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('nexora_theme', theme);
  }

  toggleTheme() {
    const nextTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(nextTheme);
    this.showToast(nextTheme === 'dark' ? 'ডার্ক নেভি মোড চালু হয়েছে' : 'লাইট মোড চালু হয়েছে', 'info');
  }

  // ------------------------------------------------------------------------
  // বুকমার্কস ব্যবস্থাপনা (LocalStorage Persistence)
  // ------------------------------------------------------------------------
  loadBookmarks() {
    try {
      const saved = localStorage.getItem('nexora_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  saveBookmarks() {
    try {
      localStorage.setItem('nexora_bookmarks', JSON.stringify(this.bookmarks));
      this.updateBookmarksBadge();
    } catch (e) {
      console.error(e);
    }
  }

  isBookmarked(id) {
    return this.bookmarks.some(item => item.id === id);
  }

  toggleBookmark(item, type) {
    const index = this.bookmarks.findIndex(b => b.id === item.id);
    if (index >= 0) {
      this.bookmarks.splice(index, 1);
      this.saveBookmarks();
      this.showToast(`"${item.title.substring(0, 25)}..." বুকমার্ক থেকে সরানো হয়েছে`, 'info');
      this.updateBookmarkButtonStates(item.id, false);
      this.renderDrawerBookmarks();
      return false;
    } else {
      const entry = {
        id: item.id,
        title: item.title,
        type: type,
        category: item.category || '',
        desc: item.desc || item.excerpt || item.summary || (item.author ? `লেখক: ${item.author}` : ''),
        dateAdded: new Date().toLocaleDateString('bn-BD')
      };
      this.bookmarks.unshift(entry);
      this.saveBookmarks();
      this.showToast(`বুকমার্কে সংরক্ষণ করা হয়েছে!`, 'success');
      this.updateBookmarkButtonStates(item.id, true);
      this.renderDrawerBookmarks();
      return true;
    }
  }

  updateBookmarksBadge() {
    const count = this.bookmarks.length;
    const badge = document.getElementById('bookmarks-count');
    const mobileBadge = document.getElementById('mobile-bookmarks-count');
    const drawerBadge = document.getElementById('drawer-items-count');

    if (badge) badge.textContent = count;
    if (mobileBadge) mobileBadge.textContent = count;
    if (drawerBadge) drawerBadge.textContent = count;

    const countPrompts = this.bookmarks.filter(b => b.type === 'prompt').length;
    const countArticles = this.bookmarks.filter(b => b.type === 'article' || b.type === 'tech').length;
    const countBooks = this.bookmarks.filter(b => b.type === 'book').length;

    const elAll = document.getElementById('count-drawer-all');
    const elPrompts = document.getElementById('count-drawer-prompts');
    const elArticles = document.getElementById('count-drawer-articles');
    const elBooks = document.getElementById('count-drawer-books');

    if (elAll) elAll.textContent = count;
    if (elPrompts) elPrompts.textContent = countPrompts;
    if (elArticles) elArticles.textContent = countArticles;
    if (elBooks) elBooks.textContent = countBooks;
  }

  updateBookmarkButtonStates(id, isSaved) {
    if (id === 'news-1') {
      const leadBtn = document.getElementById('lead-bookmark-btn');
      if (leadBtn) {
        leadBtn.classList.toggle('active', isSaved);
        leadBtn.querySelector('span').textContent = isSaved ? 'সংরক্ষিত' : 'সংরক্ষণ করুন';
      }
    }
    if (this.currentReaderItem && this.currentReaderItem.id === id) {
      const text = document.getElementById('reader-bookmark-text');
      if (text) text.textContent = isSaved ? 'বুকমার্কে সংরক্ষিত' : 'বুকমার্কে রাখুন';
    }
    if (this.currentPromptItem && this.currentPromptItem.id === id) {
      const text = document.getElementById('prompt-modal-bookmark-text');
      if (text) text.textContent = isSaved ? 'সংরক্ষিত প্রম্পট' : 'প্রম্পট সংরক্ষণ';
    }
  }

  // ------------------------------------------------------------------------
  // রেন্ডারিং ফাংশনসমূহ (Render Functions)
  // ------------------------------------------------------------------------
  getAllLatestPosts() {
    // সব ক্যাটাগরির পোস্ট একত্রিতকরণ ও চিহ্নিতকরণ
    const all = [
      ...newsData.map(item => ({ ...item, postType: 'news' })),
      ...promptsData.map(item => ({ ...item, postType: 'prompts' })),
      ...techData.map(item => ({ ...item, postType: 'tech' })),
      ...booksData.map(item => ({ ...item, postType: 'books' }))
    ];

    // সাজানো: নতুন যেকোনো পোস্ট সর্বদা সবার শীর্ষে (টপে) থাকবে, তারপর অন্যান্য পোস্ট
    return all.sort((a, b) => {
      const aDef = isDefaultPost(a);
      const bDef = isDefaultPost(b);

      // ১. ব্যবহারকারীর তৈরি নতুন পোস্ট সর্বদা ডিফল্ট পোস্টের আগে শীর্ষে আসবে
      if (!aDef && bDef) return -1;
      if (aDef && !bDef) return 1;

      // ২. দুটিই নতুন পোস্ট হলে: সর্বশেষ টাইমস্ট্যাম্প প্রথমে
      if (!aDef && !bDef) {
        const tA = getUserPostTimestamp(a);
        const tB = getUserPostTimestamp(b);
        if (tB !== tA) return tB - tA;
        return String(b.id || '').localeCompare(String(a.id || ''));
      }

      // ৩. দুটিই ডিফল্ট পোস্ট হলে: ক্রমানুসারে মিশ্রিত রাখা
      const aNum = parseInt(String(a.id).replace(/\D+/g, '') || '0', 10);
      const bNum = parseInt(String(b.id).replace(/\D+/g, '') || '0', 10);
      if (aNum !== bNum) return aNum - bNum;

      const typePriority = { news: 1, prompts: 2, tech: 3, books: 4 };
      const pA = typePriority[a.postType] || 5;
      const pB = typePriority[b.postType] || 5;
      if (pA !== pB) return pA - pB;

      return String(a.id).localeCompare(String(b.id));
    });
  }

  renderLatest(items) {
    const grid = document.getElementById('latest-grid');
    if (!grid) return;

    if (!items || items.length === 0) {
      grid.innerHTML = `
        <div class="empty-results" style="grid-column: 1 / -1;">
          <p>কোনো পোস্ট পাওয়া যায়নি।</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = items.map(item => this.renderPostCard(item)).join('');
  }

  renderPostCard(item) {
    if (item.postType === 'prompts') {
      return `
        <div class="prompt-card" data-id="${item.id}">
          <div class="prompt-card-top">
            <div class="card-meta">
              <span class="meta-tag purple">এআই প্রম্পট</span>
              <span class="meta-dot">·</span>
              <span class="meta-tag purple">${item.category || 'প্রম্পট'}</span>
              <span class="meta-dot">·</span>
              <span>${item.tool || 'ChatGPT / Claude'}</span>
            </div>
            <button type="button" class="btn btn-ghost btn-sm" onclick="window.nexoraApp.toggleBookmarkById('${item.id}', 'prompt')" aria-label="বুকমার্ক করুন">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="${this.isBookmarked(item.id) ? 'currentColor' : 'none'}">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>
          </div>
          <h3 class="prompt-card-title">${item.title}</h3>
          <p class="prompt-card-desc">${item.desc || item.excerpt || ''}</p>
          <div class="prompt-box" title="সম্পূর্ণ প্রম্পট দেখতে ক্লিক করুন">
            ${item.promptText || item.desc || ''}
          </div>
          <div class="prompt-card-actions">
            <div class="prompt-actions-left">
              <button type="button" class="btn-copy-prompt" onclick="window.nexoraApp.copyPromptText('${item.id}', this)" title="প্রম্পট টেক্সট কপি করুন" aria-label="কপি">
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span>কপি</span>
              </button>
              <button type="button" class="btn btn-ghost btn-sm" onclick="window.nexoraApp.shareOrCopyPost('${item.id}', 'prompt', this)" title="প্রম্পটের সরাসরি লিংক কপি / শেয়ার করুন" aria-label="শেয়ার করুন">
                <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="2" fill="none"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
              </button>
            </div>
            <button type="button" class="btn btn-card-readmore" onclick="window.nexoraApp.openPromptModal('${item.id}')" aria-label="আরও পড়ুন">
              <span>আরও পড়ুন</span>
            </button>
          </div>
        </div>
      `;
    }

    if (item.postType === 'books') {
      return `
        <div class="book-card" data-id="${item.id}">
          <div class="book-cover-wrap">
            <img src="${item.cover || item.image || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'}" alt="${item.title}" class="book-cover-img" loading="lazy" />
          </div>
          <div class="book-card-info">
            <div class="card-meta">
              <span class="meta-tag purple">ফ্রি বই</span>
              <span class="meta-dot">·</span>
              <span class="meta-tag purple">${item.category || 'সাহিত্য'}</span>
              <span class="meta-dot">·</span>
              <span>${item.license || 'পাবলিক ডোমেন'}</span>
            </div>
            <h3 class="book-title">${item.title}</h3>
            <div class="book-author">${item.author || 'লেখক'} (${item.year || '২০২৬'})</div>
            <p class="book-desc">${item.desc || item.excerpt || ''}</p>
          </div>
          <div class="book-card-footer">
            <button type="button" class="btn btn-card-readmore" onclick="window.nexoraApp.openBookReader('${item.id}')" style="flex: 1;">
              <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              <span>আরও পড়ুন</span>
            </button>
            <button type="button" class="btn btn-ghost btn-sm" onclick="window.nexoraApp.shareOrCopyPost('${item.id}', 'book', this)" title="বইয়ের সরাসরি লিংক কপি / শেয়ার করুন" aria-label="শেয়ার করুন">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
            </button>
            <button type="button" class="btn btn-ghost btn-sm" onclick="window.nexoraApp.toggleBookmarkById('${item.id}', 'book')" aria-label="বুকমার্ক করুন">
              <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="${this.isBookmarked(item.id) ? 'currentColor' : 'none'}">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>
          </div>
        </div>
      `;
    }

    if (item.postType === 'tech') {
      return `
        <article class="tech-card" data-id="${item.id}">
          <div class="tech-card-header-img">
            <img src="${item.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'}" alt="${item.title}" loading="lazy" />
          </div>
          <div class="tech-card-body">
            <div class="card-meta">
              <span class="meta-tag cyan">প্রযুক্তি</span>
              <span class="meta-dot">·</span>
              <span class="meta-tag cyan">${item.category || 'প্রযুক্তি'}</span>
              <span class="meta-dot">·</span>
              <span>${item.readTime || '৫ মিনিট পাঠ'}</span>
            </div>
            <h3 class="tech-card-title">${item.title}</h3>
            <p class="tech-card-summary">${item.summary || item.excerpt || ''}</p>
            <div class="tech-card-footer">
              <button type="button" class="btn btn-card-readmore" onclick="window.nexoraApp.openTechReader('${item.id}')">
                <span>আরও পড়ুন</span>
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
              <button type="button" class="btn btn-ghost btn-sm" onclick="window.nexoraApp.shareOrCopyPost('${item.id}', 'tech', this)" title="গাইডের সরাসরি লিংক কপি / শেয়ার করুন" aria-label="শেয়ার করুন">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
              </button>
              <button type="button" class="btn btn-ghost btn-sm" onclick="window.nexoraApp.toggleBookmarkById('${item.id}', 'tech')" aria-label="বুকমার্ক করুন">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="${this.isBookmarked(item.id) ? 'currentColor' : 'none'}">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              </button>
            </div>
          </div>
        </article>
      `;
    }

    // Default: News
    return `
      <article class="news-card" data-id="${item.id}">
        <div class="news-card-img-wrap">
          <img src="${item.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'}" alt="${item.title}" class="news-card-img" loading="lazy" />
        </div>
        <div class="news-card-body">
          <div class="card-meta">
            <span class="meta-tag cyan">সংবাদ</span>
            <span class="meta-dot">·</span>
            <span class="meta-tag cyan">${item.category || 'সংবাদ'}</span>
            <span class="meta-dot">·</span>
            <span>${item.date || '২০২৬'}</span>
            <span class="meta-dot">·</span>
            <span>${item.readTime || '৫ মিনিট পাঠ'}</span>
          </div>
          <h3 class="news-card-title">${item.title}</h3>
          <p class="news-card-excerpt">${item.excerpt || ''}</p>
          <div class="news-card-footer">
            <button type="button" class="btn btn-card-readmore" onclick="window.nexoraApp.openArticleReader('${item.id}')">
              <span>আরও পড়ুন</span>
              <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
            <button type="button" class="btn btn-ghost btn-sm" onclick="window.nexoraApp.shareOrCopyPost('${item.id}', 'article', this)" title="পোস্টের সরাসরি লিংক কপি / শেয়ার করুন" aria-label="শেয়ার করুন">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
            </button>
            <button type="button" class="btn btn-ghost btn-sm" onclick="window.nexoraApp.toggleBookmarkById('${item.id}', 'article')" aria-label="বুকমার্ক করুন">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="${this.isBookmarked(item.id) ? 'currentColor' : 'none'}">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>
          </div>
        </div>
      </article>
    `;
  }

  renderNews(items) {
    const grid = document.getElementById('news-grid');
    if (!grid) return;

    if (items.length === 0) {
      grid.innerHTML = `
        <div class="empty-results" style="grid-column: 1 / -1;">
          <p>এই ক্যাটাগরিতে কোনো সংবাদ পাওয়া যায়নি।</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = items.map(story => `
      <article class="news-card" data-id="${story.id}">
        <div class="news-card-img-wrap">
          <img src="${story.image}" alt="${story.title}" class="news-card-img" loading="lazy" />
        </div>
        <div class="news-card-body">
          <div class="card-meta">
            <span class="meta-tag cyan">${story.category}</span>
            <span class="meta-dot">·</span>
            <span>${story.date}</span>
            <span class="meta-dot">·</span>
            <span>${story.readTime}</span>
          </div>
          <h3 class="news-card-title">${story.title}</h3>
          <p class="news-card-excerpt">${story.excerpt}</p>
          <div class="news-card-footer">
            <button type="button" class="btn btn-card-readmore" onclick="window.nexoraApp.openArticleReader('${story.id}')">
              <span>আরও পড়ুন</span>
              <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
            <button type="button" class="btn btn-ghost btn-sm" onclick="window.nexoraApp.shareOrCopyPost('${story.id}', 'article', this)" title="পোস্টের সরাসরি লিংক কপি / শেয়ার করুন" aria-label="শেয়ার করুন">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
            </button>
            <button type="button" class="btn btn-ghost btn-sm" onclick="window.nexoraApp.toggleBookmarkById('${story.id}', 'article')" aria-label="বুকমার্ক করুন">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="${this.isBookmarked(story.id) ? 'currentColor' : 'none'}">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>
          </div>
        </div>
      </article>
    `).join('');
  }

  renderPrompts(items) {
    const grid = document.getElementById('prompts-grid');
    if (!grid) return;

    if (items.length === 0) {
      grid.innerHTML = `
        <div class="empty-results" style="grid-column: 1 / -1;">
          <p>এই ক্যাটাগরিতে কোনো প্রম্পট পাওয়া যায়নি।</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = items.map(prompt => `
      <div class="prompt-card" data-id="${prompt.id}">
        <div class="prompt-card-top">
          <div class="card-meta">
            <span class="meta-tag purple">${prompt.category}</span>
            <span class="meta-dot">·</span>
            <span>${prompt.tool}</span>
          </div>
          <button type="button" class="btn btn-ghost btn-sm" onclick="window.nexoraApp.toggleBookmarkById('${prompt.id}', 'prompt')" aria-label="বুকমার্ক করুন">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="${this.isBookmarked(prompt.id) ? 'currentColor' : 'none'}">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </div>
        <h3 class="prompt-card-title">${prompt.title}</h3>
        <p class="prompt-card-desc">${prompt.desc}</p>
        
        <div class="prompt-box" title="সম্পূর্ণ প্রম্পট দেখতে ক্লিক করুন">
          ${prompt.promptText}
        </div>

        <div class="prompt-card-actions">
          <div class="prompt-actions-left">
            <button type="button" class="btn-copy-prompt" onclick="window.nexoraApp.copyPromptText('${prompt.id}', this)" title="প্রম্পট টেক্সট কপি করুন" aria-label="কপি">
              <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              <span>কপি</span>
            </button>
            <button type="button" class="btn btn-ghost btn-sm" onclick="window.nexoraApp.shareOrCopyPost('${prompt.id}', 'prompt', this)" title="প্রম্পটের সরাসরি লিংক কপি / শেয়ার করুন" aria-label="শেয়ার করুন">
              <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="2" fill="none"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
            </button>
          </div>
          <button type="button" class="btn btn-card-readmore" onclick="window.nexoraApp.openPromptModal('${prompt.id}')" aria-label="আরও পড়ুন">
            <span>আরও পড়ুন</span>
          </button>
        </div>
      </div>
    `).join('');
  }

  renderTech(items) {
    const grid = document.getElementById('tech-grid');
    if (!grid) return;

    if (items.length === 0) {
      grid.innerHTML = `
        <div class="empty-results" style="grid-column: 1 / -1;">
          <p>কোনো প্রযুক্তি গাইড পাওয়া যায়নি।</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = items.map(guide => `
      <article class="tech-card" data-id="${guide.id}">
        <div class="tech-card-header-img">
          <img src="${guide.image}" alt="${guide.title}" loading="lazy" />
        </div>
        <div class="tech-card-body">
          <div class="card-meta">
            <span class="meta-tag cyan">${guide.category}</span>
            <span class="meta-dot">·</span>
            <span>${guide.readTime}</span>
          </div>
          <h3 class="tech-card-title">${guide.title}</h3>
          <p class="tech-card-summary">${guide.summary}</p>
          <div class="tech-card-footer">
            <button type="button" class="btn btn-card-readmore" onclick="window.nexoraApp.openTechReader('${guide.id}')">
              <span>আরও পড়ুন</span>
              <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
            <button type="button" class="btn btn-ghost btn-sm" onclick="window.nexoraApp.shareOrCopyPost('${guide.id}', 'tech', this)" title="গাইডের সরাসরি লিংক কপি / শেয়ার করুন" aria-label="শেয়ার করুন">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
            </button>
            <button type="button" class="btn btn-ghost btn-sm" onclick="window.nexoraApp.toggleBookmarkById('${guide.id}', 'tech')" aria-label="বুকমার্ক করুন">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="${this.isBookmarked(guide.id) ? 'currentColor' : 'none'}">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>
          </div>
        </div>
      </article>
    `).join('');
  }

  renderBooks(items) {
    const grid = document.getElementById('books-grid');
    if (!grid) return;

    if (items.length === 0) {
      grid.innerHTML = `
        <div class="empty-results" style="grid-column: 1 / -1;">
          <p>কোনো বই পাওয়া যায়নি।</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = items.map(book => `
      <div class="book-card" data-id="${book.id}">
        <div class="book-cover-wrap">
          <img src="${book.cover}" alt="${book.title}" class="book-cover-img" loading="lazy" />
        </div>
        <div class="book-card-info">
          <div class="card-meta">
            <span class="meta-tag purple">${book.category}</span>
            <span class="meta-dot">·</span>
            <span>${book.license}</span>
          </div>
          <h3 class="book-title">${book.title}</h3>
          <div class="book-author">${book.author} (${book.year})</div>
          <p class="book-desc">${book.desc}</p>
        </div>
        <div class="book-card-footer">
          <button type="button" class="btn btn-card-readmore" onclick="window.nexoraApp.openBookReader('${book.id}')" style="flex: 1;">
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            <span>আরও পড়ুন</span>
          </button>
          <button type="button" class="btn btn-ghost btn-sm" onclick="window.nexoraApp.shareOrCopyPost('${book.id}', 'book', this)" title="বইয়ের সরাসরি লিংক কপি / শেয়ার করুন" aria-label="শেয়ার করুন">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
          </button>
          <button type="button" class="btn btn-ghost btn-sm" onclick="window.nexoraApp.toggleBookmarkById('${book.id}', 'book')" aria-label="বুকমার্ক করুন">
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="${this.isBookmarked(book.id) ? 'currentColor' : 'none'}">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </div>
      </div>
    `).join('');
  }

  // ------------------------------------------------------------------------
  // ক্লিপবোর্ড কপি (Copy Prompt)
  // ------------------------------------------------------------------------
  copyPromptText(id, btnElement) {
    const promptItem = promptsData.find(p => p.id === id);
    if (!promptItem) return;

    this.copyToClipboard(promptItem.promptText, () => {
      this.showToast('প্রম্পট ক্লিপবোর্ডে কপি হয়েছে!', 'success');
      this.triggerSmartlink(true);
      if (btnElement) {
        const originalHtml = btnElement.innerHTML;
        btnElement.classList.add('copied');
        btnElement.innerHTML = `
          <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>কপি হয়েছে!</span>
        `;
        setTimeout(() => {
          btnElement.classList.remove('copied');
          btnElement.innerHTML = originalHtml;
        }, 2200);
      }
    });
  }

  quickCopyLeadPrompt(btnElement) {
    const promptItem = promptsData[0];
    this.copyPromptText(promptItem.id, btnElement);
  }

  copyToClipboard(text, callback) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        if (callback) callback();
      }).catch(err => {
        this.fallbackCopy(text, callback);
      });
    } else {
      this.fallbackCopy(text, callback);
    }
  }

  fallbackCopy(text, callback) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      if (callback) callback();
    } catch (err) {
      this.showToast('কপি করা সম্ভব হয়নি। দয়া করে নিজে সিলেক্ট করুন।', 'info');
    }
    document.body.removeChild(textArea);
  }

  // ------------------------------------------------------------------------
  // সার্বজনীন অনুসন্ধান (Universal Search)
  // ------------------------------------------------------------------------
  handleGlobalSearch(query, scope) {
    const cleanQuery = query.trim().toLowerCase();
    const panel = document.getElementById('search-results-panel');
    const resultsList = document.getElementById('search-results-list');
    const resultsCount = document.getElementById('search-results-count');

    if (!cleanQuery) {
      if (panel) panel.style.display = 'none';
      return;
    }

    let matches = [];

    if (scope === 'all' || scope === 'news') {
      newsData.forEach(item => {
        if (item.title.toLowerCase().includes(cleanQuery) || item.excerpt.toLowerCase().includes(cleanQuery) || item.category.toLowerCase().includes(cleanQuery)) {
          matches.push({ type: 'সংবাদ', key: 'news', id: item.id, title: item.title, desc: item.excerpt });
        }
      });
    }

    if (scope === 'all' || scope === 'prompts') {
      promptsData.forEach(item => {
        if (item.title.toLowerCase().includes(cleanQuery) || item.promptText.toLowerCase().includes(cleanQuery) || item.category.toLowerCase().includes(cleanQuery)) {
          matches.push({ type: 'প্রম্পট', key: 'prompts', id: item.id, title: item.title, desc: item.desc });
        }
      });
    }

    if (scope === 'all' || scope === 'tech') {
      techData.forEach(item => {
        if (item.title.toLowerCase().includes(cleanQuery) || item.summary.toLowerCase().includes(cleanQuery) || item.category.toLowerCase().includes(cleanQuery)) {
          matches.push({ type: 'প্রযুক্তি', key: 'tech', id: item.id, title: item.title, desc: item.summary });
        }
      });
    }

    if (scope === 'all' || scope === 'books') {
      booksData.forEach(item => {
        if (item.title.toLowerCase().includes(cleanQuery) || item.author.toLowerCase().includes(cleanQuery) || item.desc.toLowerCase().includes(cleanQuery)) {
          matches.push({ type: 'ফ্রি বই', key: 'books', id: item.id, title: item.title, desc: `${item.author} — ${item.desc}` });
        }
      });
    }

    if (panel && resultsList && resultsCount) {
      panel.style.display = 'block';
      resultsCount.textContent = `${matches.length}টি ফলাফল পাওয়া গেছে`;

      if (matches.length === 0) {
        resultsList.innerHTML = `
          <div class="empty-results">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <p>"<strong>${cleanQuery}</strong>" দিয়ে কোনো বিষয় খুঁজে পাওয়া যায়নি।</p>
          </div>
        `;
      } else {
        resultsList.innerHTML = matches.slice(0, 8).map(m => `
          <div class="search-result-item" onclick="window.nexoraApp.selectSearchResult('${m.key}', '${m.id}')">
            <span class="search-result-type ${m.key}">${m.type}</span>
            <div class="search-result-info">
              <div class="search-result-title">${m.title}</div>
              <div class="search-result-desc">${m.desc}</div>
            </div>
          </div>
        `).join('');
      }
    }
  }

  selectSearchResult(type, id) {
    const panel = document.getElementById('search-results-panel');
    if (panel) panel.style.display = 'none';

    if (type === 'news') {
      this.openArticleReader(id);
    } else if (type === 'prompts') {
      this.openPromptModal(id);
    } else if (type === 'tech') {
      this.openTechReader(id);
    } else if (type === 'books') {
      this.openBookReader(id);
    }
  }

  // ------------------------------------------------------------------------
  // ফিল্টারিং লজিক (Filter Logic)
  // ------------------------------------------------------------------------
  filterSection(sectionKey, filterCategory, subsearchQuery = '') {
    const cleanSub = (subsearchQuery || '').toLowerCase().trim();

    if (sectionKey === 'news') {
      let filtered = sortPostsNewestFirst(newsData);
      if (filterCategory !== 'all') {
        filtered = filtered.filter(item => item.category === filterCategory);
      }
      if (cleanSub) {
        filtered = filtered.filter(item => item.title.toLowerCase().includes(cleanSub) || item.excerpt.toLowerCase().includes(cleanSub));
      }
      this.renderNews(filtered);
    } 
    else if (sectionKey === 'prompts') {
      let filtered = sortPostsNewestFirst(promptsData);
      if (filterCategory !== 'all') {
        filtered = filtered.filter(item => item.category === filterCategory);
      }
      if (cleanSub) {
        filtered = filtered.filter(item => item.title.toLowerCase().includes(cleanSub) || item.promptText.toLowerCase().includes(cleanSub));
      }
      this.renderPrompts(filtered);
    }
    else if (sectionKey === 'tech') {
      let filtered = sortPostsNewestFirst(techData);
      if (filterCategory !== 'all') {
        filtered = filtered.filter(item => item.category === filterCategory);
      }
      if (cleanSub) {
        filtered = filtered.filter(item => item.title.toLowerCase().includes(cleanSub) || item.summary.toLowerCase().includes(cleanSub));
      }
      this.renderTech(filtered);
    }
    else if (sectionKey === 'books') {
      let filtered = sortPostsNewestFirst(booksData);
      if (filterCategory !== 'all') {
        filtered = filtered.filter(item => item.category === filterCategory);
      }
      if (cleanSub) {
        filtered = filtered.filter(item => item.title.toLowerCase().includes(cleanSub) || item.author.toLowerCase().includes(cleanSub));
      }
      this.renderBooks(filtered);
    }
  }

  // ------------------------------------------------------------------------
  // মোডাল রিডার (Article & Tech Readers - Card View with Read More)
  // ------------------------------------------------------------------------
  openArticleReader(id) {
    const article = newsData.find(a => String(a.id) === String(id));
    if (!article) return;

    this.ensureReaderModalInDOM();
    this.currentReaderItem = article;
    this.updateUrlForPost(article.id);
    const modal = document.getElementById('reader-modal');
    const kicker = document.getElementById('reader-kicker');
    const body = document.getElementById('reader-modal-body');
    const bookmarkText = document.getElementById('reader-bookmark-text');

    if (!modal || !body) return;

    if (kicker) kicker.textContent = `${article.category} · প্রকাশিত: ${article.date} · ${article.readTime}`;
    if (bookmarkText) bookmarkText.textContent = this.isBookmarked(article.id) ? 'বুকমার্কে সংরক্ষিত' : 'বুকমার্কে রাখুন';

    body.innerHTML = `
      <article class="reader-post-card">
        <div class="reader-card-media">
          <img src="${article.image}" alt="${article.title}" class="reader-card-img" />
          <div class="reader-card-badge-row">
            <span class="meta-tag cyan">${article.category}</span>
            <span class="reader-card-readtime">⏱ ${article.readTime}</span>
          </div>
        </div>
        <div class="reader-card-header-body">
          <div class="reader-header-top-row">
            <h2 class="reader-article-title">${article.title}</h2>
            <button type="button" class="btn btn-secondary btn-sm btn-reader-header-share" onclick="window.nexoraApp.copyDirectPostLink('${article.id}', 'article', this)" title="পোস্টের সরাসরি লিংক কপি করুন">
              <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="2" fill="none"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
              <span>কপি লিংক</span>
            </button>
          </div>
          <div class="reader-article-meta">
            <span>প্রতিবেদক: <strong>${article.author}</strong></span>
            <span class="meta-dot">·</span>
            <span>${article.date}</span>
            <span class="meta-dot">·</span>
            <span>নেক্সোরা সম্পাদকীয় যাচাইকৃত</span>
          </div>
          <div class="reader-card-summary-box">
            <strong>সারসংক্ষেপ:</strong> ${article.excerpt}
          </div>
        </div>
        <div class="reader-expand-wrapper" id="reader-expand-wrapper">
          <div class="reader-expand-content-box" id="reader-expand-content-box">
            <div class="reader-content reader-expand-content">
              ${article.content}
            </div>
            <div class="reader-fade-overlay" id="reader-fade-overlay"></div>
          </div>
          <div class="reader-readmore-bar">
            <button type="button" class="btn btn-read-more" id="btn-read-more-post" onclick="window.nexoraApp.togglePostReadMore(this)">
              <span class="read-more-label">আরও পড়ুন</span>
              <svg class="read-more-icon" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.5" fill="none"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
          </div>
        </div>
      </article>
    `;

    this.openModal('reader-modal');
  }

  openTechReader(id) {
    const guide = techData.find(g => String(g.id) === String(id));
    if (!guide) return;

    this.ensureReaderModalInDOM();
    this.currentReaderItem = guide;
    this.updateUrlForPost(guide.id);
    const modal = document.getElementById('reader-modal');
    const kicker = document.getElementById('reader-kicker');
    const body = document.getElementById('reader-modal-body');
    const bookmarkText = document.getElementById('reader-bookmark-text');

    if (!modal || !body) return;

    if (kicker) kicker.textContent = `প্রযুক্তি অন্তর্দৃষ্টি · ${guide.category} · ${guide.readTime}`;
    if (bookmarkText) bookmarkText.textContent = this.isBookmarked(guide.id) ? 'বুকমার্কে সংরক্ষিত' : 'গাইড সংরক্ষণ';

    body.innerHTML = `
      <article class="reader-post-card">
        <div class="reader-card-media">
          <img src="${guide.image}" alt="${guide.title}" class="reader-card-img" />
          <div class="reader-card-badge-row">
            <span class="meta-tag cyan">${guide.category}</span>
            <span class="reader-card-readtime">⏱ ${guide.readTime}</span>
          </div>
        </div>
        <div class="reader-card-header-body">
          <div class="reader-header-top-row">
            <h2 class="reader-article-title">${guide.title}</h2>
            <button type="button" class="btn btn-secondary btn-sm btn-reader-header-share" onclick="window.nexoraApp.copyDirectPostLink('${guide.id}', 'tech', this)" title="গাইডের সরাসরি লিংক কপি করুন">
              <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="2" fill="none"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
              <span>কপি লিংক</span>
            </button>
          </div>
          <div class="reader-article-meta">
            <span>প্রকৌশল সিরিজ</span>
            <span class="meta-dot">·</span>
            <span>নেক্সোরা ডেভেলপার গাইড</span>
          </div>
          <div class="reader-card-summary-box">
            <strong>সারসংক্ষেপ:</strong> ${guide.summary}
          </div>
        </div>
        <div class="reader-expand-wrapper" id="reader-expand-wrapper">
          <div class="reader-expand-content-box" id="reader-expand-content-box">
            <div class="reader-content reader-expand-content">
              ${guide.guideContent}
            </div>
            <div class="reader-fade-overlay" id="reader-fade-overlay"></div>
          </div>
          <div class="reader-readmore-bar">
            <button type="button" class="btn btn-read-more" id="btn-read-more-post" onclick="window.nexoraApp.togglePostReadMore(this)">
              <span class="read-more-label">আরও পড়ুন</span>
              <svg class="read-more-icon" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.5" fill="none"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
          </div>
        </div>
      </article>
    `;

    this.openModal('reader-modal');
  }

  togglePostReadMore(btn) {
    this.handlePostReadMoreClick(btn);
  }

  handlePostReadMoreClick(btn) {
    const wrapper = document.getElementById('reader-expand-wrapper');
    if (!wrapper) return;

    const isExpanded = wrapper.classList.contains('expanded');
    if (isExpanded) {
      // User is collapsing the expanded content
      this.collapsePostContent(btn);
      return;
    }

    // Check if this post is already unlocked in this session
    const currentId = this.currentReaderItem ? String(this.currentReaderItem.id) : null;
    if (currentId && this.unlockedPostIds && this.unlockedPostIds.has(currentId)) {
      this.expandPostContent(btn);
      return;
    }

    // Trigger the ad unlock modal popup: "পোস্ট পড়ার জন্য একটি অ্যাড দেখুন"
    this.pendingUnlockTarget = { type: 'post', btn: btn, id: currentId };
    this.ensureAdUnlockModalInDOM();
    this.openModal('ad-unlock-modal');
  }

  expandPostContent(btn) {
    const wrapper = document.getElementById('reader-expand-wrapper');
    const overlay = document.getElementById('reader-fade-overlay');
    if (wrapper) wrapper.classList.add('expanded');
    if (overlay) overlay.style.display = 'none';

    if (btn) {
      const label = btn.querySelector('.read-more-label');
      const icon = btn.querySelector('.read-more-icon');
      if (label) label.textContent = 'সংক্ষিপ্ত করুন';
      if (icon) icon.innerHTML = '<polyline points="18 15 12 9 6 15"></polyline>';
    }
  }

  collapsePostContent(btn) {
    const wrapper = document.getElementById('reader-expand-wrapper');
    const overlay = document.getElementById('reader-fade-overlay');
    if (wrapper) wrapper.classList.remove('expanded');
    if (overlay) overlay.style.display = 'block';

    if (btn) {
      const label = btn.querySelector('.read-more-label');
      const icon = btn.querySelector('.read-more-icon');
      if (label) label.textContent = 'আরও পড়ুন';
      if (icon) icon.innerHTML = '<polyline points="6 9 12 15 18 9"></polyline>';
      if (wrapper) wrapper.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  openPromptModal(id) {
    const promptItem = promptsData.find(p => String(p.id) === String(id));
    if (!promptItem) return;

    this.ensurePromptModalInDOM();
    this.currentPromptItem = promptItem;
    this.updateUrlForPost(promptItem.id);
    const cat = document.getElementById('prompt-modal-cat');
    const title = document.getElementById('prompt-modal-title');
    const body = document.getElementById('prompt-modal-body');
    const bookmarkText = document.getElementById('prompt-modal-bookmark-text');
    const copyBtn = document.getElementById('prompt-modal-copy-btn');

    if (cat) cat.textContent = promptItem.category;
    if (title) title.textContent = promptItem.title;
    if (bookmarkText) bookmarkText.textContent = this.isBookmarked(promptItem.id) ? 'সংরক্ষিত প্রম্পট' : 'প্রম্পট সংরক্ষণ';

    if (copyBtn) {
      copyBtn.onclick = () => this.copyPromptText(promptItem.id, copyBtn);
    }

    if (body) {
      let paramsMarkup = '';
      if (promptItem.params) {
        paramsMarkup = Object.entries(promptItem.params).map(([k, v]) => `
          <div class="param-item">
            <div class="param-name">${k}</div>
            <div class="param-val">${v}</div>
          </div>
        `).join('');
      }

      body.innerHTML = `
        <p style="color: var(--text-secondary); margin-bottom: 12px;">${promptItem.desc}</p>
        <div class="prompt-full-box">${promptItem.promptText}</div>
        <div style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 14px;">
          <strong>প্রকৌশল টিপস:</strong> ${promptItem.tips || 'আপনার চাহিদা অনুযায়ী টেম্পারেচার পরিবর্তন করুন।'}
        </div>
        ${paramsMarkup ? `<div class="prompt-param-grid">${paramsMarkup}</div>` : ''}
      `;
    }

    this.openModal('prompt-modal');
  }

  openBookReader(id) {
    const book = booksData.find(b => String(b.id) === String(id));
    if (!book) return;

    this.ensureBookModalInDOM();
    this.currentBookItem = book;
    this.updateUrlForPost(book.id);
    const license = document.getElementById('book-modal-license');
    const title = document.getElementById('book-modal-title');
    const author = document.getElementById('book-modal-author');
    const body = document.getElementById('book-modal-body');
    const actions = document.getElementById('book-external-actions');

    if (license) license.textContent = `${book.license} · ${book.language}`;
    if (title) title.textContent = book.title;
    if (author) author.textContent = `লেখক: ${book.author} (${book.year})`;

    if (actions) {
      actions.innerHTML = `
        <button type="button" class="btn btn-secondary btn-sm" onclick="window.nexoraApp.shareOrCopyPost('${book.id}', 'book', this)" title="বইয়ের লিংক শেয়ার / কপি">
          <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
          <span>লিংক শেয়ার</span>
        </button>
        ${book.pdfUrl ? `
          <button type="button" class="btn btn-pdf-primary btn-sm btn-pdf-download" onclick="window.nexoraApp.downloadBookPdf('${book.id}')" title="গুগল ড্রাইভ থেকে সম্পূর্ণ পিডিএফ ফাইল ডাউনলোড করুন">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            <span>পিডিএফ ডাউনলোড করুন</span>
          </button>
        ` : ''}
      `;
    }

    if (body) {
      body.innerHTML = `
        <div class="reader-post-card book-card-reader">
          <div class="reader-card-media" style="height: 240px;">
            <img src="${book.cover}" alt="${book.title}" class="reader-card-img" />
            <div class="reader-card-badge-row">
              <span class="meta-tag purple">${book.category}</span>
              <span class="reader-card-readtime">📖 ${book.license} · ${book.language}</span>
            </div>
          </div>
          <div class="reader-card-header-body">
            <h3 class="reader-article-title" style="font-size: 1.5rem; margin-bottom: 8px;">${book.title}</h3>
            <div class="reader-article-meta">
              <span>লেখক: <strong>${book.author}</strong> (${book.year})</span>
              <span class="meta-dot">·</span>
              <span>পাবলিক ডোমেন ক্লাসিক</span>
            </div>
            <div class="reader-card-summary-box">
              <strong>পুস্তক ভূমিকা:</strong> ${book.desc}
            </div>
            ${book.pdfUrl ? `
              <div class="reader-pdf-banner" style="margin: 18px 0 14px;">
                <div style="display: flex; align-items: center; gap: 14px;">
                  <div class="pdf-banner-icon" style="background: rgba(244, 63, 94, 0.15); color: #f43f5e; border-radius: 50%; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 1-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="12" y2="18"></line><line x1="15" y1="15" x2="12" y2="18"></line></svg>
                  </div>
                  <div>
                    <div style="font-weight: 700; color: var(--text-primary); font-size: 0.9375rem;">এই বইটির সম্পূর্ণ পিডিএফ ফাইল সংযুক্ত রয়েছে</div>
                    <div style="font-size: 0.8125rem; color: var(--text-secondary); margin-top: 2px;">গুগল ড্রাইভ লিংক থেকে সরাসরি সম্পূর্ণ মূল বই ডাউনলোড করুন।</div>
                  </div>
                </div>
                <button type="button" class="btn btn-pdf-primary btn-sm btn-pdf-download" onclick="window.nexoraApp.downloadBookPdf('${book.id}')" style="white-space: nowrap;">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  <span>পিডিএফ ডাউনলোড করুন</span>
                </button>
              </div>
            ` : ''}
          </div>
          <div class="reader-expand-wrapper" id="book-expand-wrapper">
            <div class="reader-expand-content-box" id="book-expand-content-box">
              <div class="book-reader-content">
                ${book.chapters.map(ch => `
                  <div style="margin-bottom: 24px;">
                    <div class="book-reader-chapter">${ch.heading}</div>
                    <h4 class="book-reader-heading">${ch.heading}</h4>
                    <p style="margin-bottom: 14px; line-height: 1.8;">${ch.text}</p>
                  </div>
                `).join('')}
                <div class="sample-notice-banner" style="margin-top: 20px;">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                  <span>আপনি নেক্সোরার ফ্রি বুক রিডার থেকে নির্বাচিত সূচনা অধ্যায় পড়ছেন। সম্পূর্ণ বইটির পিডিএফ কপি পেতে "পিডিএফ ডাউনলোড করুন" বাটনে ক্লিক করুন।</span>
                </div>
              </div>
              <div class="reader-fade-overlay" id="book-fade-overlay"></div>
            </div>
            <div class="reader-readmore-bar">
              <button type="button" class="btn btn-read-more" id="btn-read-more-book" onclick="window.nexoraApp.toggleBookReadMore(this)">
                <span class="read-more-label">আরও পড়ুন</span>
                <svg class="read-more-icon" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.5" fill="none"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
            </div>
          </div>
        </div>
      `;
    }

    this.openModal('book-modal');
  }

  downloadBookPdf(id) {
    const book = booksData.find(b => String(b.id) === String(id));
    if (!book || !book.pdfUrl) {
      this.showToast('এই বইটির জন্য কোনো পিডিএফ ফাইল পাওয়া যায়নি।', 'warning');
      return;
    }

    const rawUrl = String(book.pdfUrl).trim();
    const directUrl = getDirectPdfDownloadUrl(rawUrl);

    this.showToast('গুগল ড্রাইভ থেকে পিডিএফ ডাউনলোড হচ্ছে...', 'success');

    try {
      // Trigger download via anchor element with target _blank
      const link = document.createElement('a');
      link.href = directUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      const cleanFileName = (book.title || 'book').replace(/[^\w\u0980-\u09FF-]+/g, '_');
      link.setAttribute('download', `${cleanFileName}.pdf`);
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        try { link.remove(); } catch (e) {}
      }, 1000);
    } catch (err) {
      window.open(directUrl, '_blank', 'noopener,noreferrer');
    }
  }

  toggleBookReadMore(btn) {
    this.handleBookReadMoreClick(btn);
  }

  handleBookReadMoreClick(btn) {
    const wrapper = document.getElementById('book-expand-wrapper');
    if (!wrapper) return;

    const isExpanded = wrapper.classList.contains('expanded');
    if (isExpanded) {
      this.collapseBookContent(btn);
      return;
    }

    const currentBook = this.currentBookItem ? String(this.currentBookItem.id) : null;
    if (currentBook && this.unlockedPostIds && this.unlockedPostIds.has('book_' + currentBook)) {
      this.expandBookContent(btn);
      return;
    }

    this.pendingUnlockTarget = { type: 'book', btn: btn, id: currentBook };
    this.ensureAdUnlockModalInDOM();
    this.openModal('ad-unlock-modal');
  }

  expandBookContent(btn) {
    const wrapper = document.getElementById('book-expand-wrapper');
    const overlay = document.getElementById('book-fade-overlay');
    if (wrapper) wrapper.classList.add('expanded');
    if (overlay) overlay.style.display = 'none';

    if (btn) {
      const label = btn.querySelector('.read-more-label');
      const icon = btn.querySelector('.read-more-icon');
      if (label) label.textContent = 'সংক্ষিপ্ত করুন';
      if (icon) icon.innerHTML = '<polyline points="18 15 12 9 6 15"></polyline>';
    }
  }

  collapseBookContent(btn) {
    const wrapper = document.getElementById('book-expand-wrapper');
    const overlay = document.getElementById('book-fade-overlay');
    if (wrapper) wrapper.classList.remove('expanded');
    if (overlay) overlay.style.display = 'block';

    if (btn) {
      const label = btn.querySelector('.read-more-label');
      const icon = btn.querySelector('.read-more-icon');
      if (label) label.textContent = 'আরও পড়ুন';
      if (icon) icon.innerHTML = '<polyline points="6 9 12 15 18 9"></polyline>';
      if (wrapper) wrapper.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  // ------------------------------------------------------------------------
  // অ্যাড আনলক ও পোস্ট ওপেন লজিক (Ad Unlock & Gate Handler)
  // ------------------------------------------------------------------------
  confirmAdUnlock(e) {
    const isAnchor = e && e.currentTarget && e.currentTarget.tagName === 'A' && e.currentTarget.getAttribute('href') && !e.currentTarget.getAttribute('href').startsWith('javascript');
    if (!isAnchor) {
      // ১. বাটনে ক্লিক করলে অ্যাড ওপেন হবে (Smartlink)
      this.openAdDirectLink();
    }

    // ২. পপআপ মোডাল ক্লোজ হবে
    this.closeModal('ad-unlock-modal');

    // ৩. আনলক আইডি চিহ্নিত করা
    const target = this.pendingUnlockTarget;
    if (target) {
      if (!this.unlockedPostIds) this.unlockedPostIds = new Set();
      if (target.id) {
        this.unlockedPostIds.add(target.type === 'book' ? ('book_' + target.id) : String(target.id));
      }

      // ৪. তারপর পোস্ট ওপেন/এক্সপ্যান্ড হবে
      if (target.type === 'post') {
        this.expandPostContent(target.btn);
      } else if (target.type === 'book') {
        this.expandBookContent(target.btn);
      }
      this.pendingUnlockTarget = null;
    }

    this.showToast('বিজ্ঞাপন ওপেন হয়েছে! সম্পূর্ণ পোস্ট সফলভাবে উন্মুক্ত করা হয়েছে।', 'success');
  }

  triggerSmartlink(newTab = true) {
    const directUrl = this.getAdDirectLink();
    try {
      if (newTab) {
        window.open(directUrl, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = directUrl;
      }
    } catch (e) {
      console.warn('Smartlink opening notice:', e);
    }
  }

  openAdDirectLink() {
    this.triggerSmartlink(true);
  }

  getAdDirectLink() {
    const SMARTLINK = 'https://www.profitableratecpmnetwork.com/uk5x37ih?key=7029c8770d8362183bcf09703b7c730b';
    const stored = localStorage.getItem('nexora_custom_ad_link');
    if (stored && stored.trim() && !stored.includes('.js')) return stored.trim();
    // ডিফল্ট Smartlink CPM নেটওয়ার্ক লিংক
    return SMARTLINK;
  }

  setCustomAdLink(url) {
    if (url && url.trim()) {
      localStorage.setItem('nexora_custom_ad_link', url.trim());
      this.showToast('ডিরেক্ট অ্যাড লিংক সফলভাবে আপডেট করা হয়েছে!', 'success');
    } else {
      localStorage.removeItem('nexora_custom_ad_link');
      this.showToast('ডিফল্ট অ্যাড লিংকে রিসেট করা হয়েছে।', 'info');
    }
  }

  promptSetCustomAdLink() {
    const current = localStorage.getItem('nexora_custom_ad_link') || '';
    const input = prompt('Adsterra বা CPM নেটওয়ার্কের ডিরেক্ট অ্যাড লিংক (Direct Link URL) প্রদান করুন:', current);
    if (input !== null) {
      this.setCustomAdLink(input);
    }
  }

  ensureAdUnlockModalInDOM() {
    if (document.getElementById('ad-unlock-modal')) return;
    const adUrl = this.getAdDirectLink();
    const markup = `
      <div class="modal-backdrop" id="ad-unlock-modal" role="dialog" aria-modal="true" aria-labelledby="ad-unlock-modal-title" aria-hidden="true" style="z-index: 100050;">
        <div class="modal-container ad-unlock-modal-container">
          <div class="modal-header ad-unlock-modal-header">
            <div class="ad-unlock-badge-row">
              <span class="ad-tag-chip">
                <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2.5" fill="none"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                স্পন্সর বিজ্ঞাপন
              </span>
            </div>
            <button type="button" class="modal-close-btn" onclick="window.nexoraApp.closeModal('ad-unlock-modal')" aria-label="বন্ধ করুন">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <div class="modal-body ad-unlock-modal-body">
            <div class="ad-unlock-hero-icon">
              <div class="ad-icon-circle">
                <svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" stroke-width="2" fill="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              </div>
            </div>
            <h3 class="ad-unlock-title" id="ad-unlock-modal-title">পোস্ট পড়ার জন্য একটি অ্যাড দেখুন</h3>
            <p class="ad-unlock-desc">
              সম্পূর্ণ পোস্টটি উন্মুক্ত করার জন্য নিচের স্পন্সর বিজ্ঞাপনটি ওপেন করুন। বিজ্ঞাপন ওপেন হওয়ার সাথে সাথেই আপনার সম্পূর্ণ পোস্ট পড়া শুরু হবে।
            </p>

            <div class="ad-unlock-banner-card">
              <div class="ad-unlock-banner-top">
                <span class="ad-sponsor-pill">SPONSORED AD</span>
                <span class="ad-verified-tag">✓ ভেরিফাইড অ্যাডভার্টাইজার</span>
              </div>
              <div class="ad-unlock-banner-body">
                <div class="ad-sponsor-box">
                  <div class="ad-sponsor-kicker">নেক্সোরা পার্টনার নেটওয়ার্ক</div>
                  <h4 class="ad-sponsor-headline">স্মার্ট ডিজিটাল প্রোডাক্ট ও এক্সক্লুসিভ টেকনোলজি অফার</h4>
                  <p class="ad-sponsor-sub">বিজ্ঞাপনটি ওপেন করে স্পন্সর পেজটি ভিজিট করুন এবং সাথে সাথে ফুল পোস্ট আনলক করুন।</p>
                </div>
              </div>
            </div>

            <div class="ad-unlock-actions">
              <a href="${adUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-lg btn-unlock-confirm" id="btn-ad-unlock-confirm" onclick="window.nexoraApp.confirmAdUnlock(event)">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                <span>অ্যাড ওপেন করুন এবং পোস্ট পড়ুন</span>
              </a>
              <button type="button" class="btn btn-ghost" onclick="window.nexoraApp.closeModal('ad-unlock-modal')">
                পরে পড়ুন
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', markup);
  }

  // ------------------------------------------------------------------------
  // বুকমার্ক ড্রয়ার (Bookmarks Slideover Drawer)
  // ------------------------------------------------------------------------
  openDrawer() {
    const drawer = document.getElementById('bookmarks-drawer');
    if (!drawer) return;
    this.renderDrawerBookmarks('all');
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  closeDrawer() {
    const drawer = document.getElementById('bookmarks-drawer');
    if (!drawer) return;
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  renderDrawerBookmarks(filterType = 'all') {
    const container = document.getElementById('bookmarks-drawer-body');
    if (!container) return;

    let items = this.bookmarks;
    if (filterType !== 'all') {
      if (filterType === 'article') {
        items = items.filter(b => b.type === 'article' || b.type === 'tech');
      } else {
        items = items.filter(b => b.type === filterType);
      }
    }

    if (items.length === 0) {
      container.innerHTML = `
        <div class="empty-results">
          <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" fill="none"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
          <p>আপনার কোনো সংরক্ষিত আইটেম নেই।</p>
          <span style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-top: 6px;">
            যেকোনো সংবাদ, প্রম্পট বা বইয়ে বুকমার্ক আইকনে ক্লিক করে সংরক্ষণ করুন।
          </span>
        </div>
      `;
      return;
    }

    container.innerHTML = items.map(b => `
      <div class="bookmark-item-card">
        <div class="bookmark-item-top">
          <span class="search-result-type ${b.type}">${b.type === 'prompt' ? 'প্রম্পট' : b.type === 'book' ? 'বই' : 'নিবন্ধ'}</span>
          <button type="button" class="btn btn-ghost btn-sm" onclick="window.nexoraApp.removeBookmarkItem('${b.id}')" aria-label="বুকমার্ক মুছুন">
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div class="bookmark-item-title">${b.title}</div>
        <div class="bookmark-item-actions">
          <button type="button" class="btn btn-secondary btn-sm" onclick="window.nexoraApp.openSavedBookmarkItem('${b.type}', '${b.id}')">
            ${b.type === 'prompt' ? 'প্রম্পট দেখুন / কপি' : 'পড়ুন'}
          </button>
        </div>
      </div>
    `).join('');
  }

  openSavedBookmarkItem(type, id) {
    this.closeDrawer();
    this.selectSearchResult(type === 'article' || type === 'tech' ? 'news' : type === 'prompt' ? 'prompts' : 'books', id);
  }

  removeBookmarkItem(id) {
    const idx = this.bookmarks.findIndex(b => b.id === id);
    if (idx >= 0) {
      const removed = this.bookmarks.splice(idx, 1)[0];
      this.saveBookmarks();
      this.updateBookmarkButtonStates(id, false);
      this.renderDrawerBookmarks();
      this.showToast(`বুকমার্ক থেকে মুছে ফেলা হয়েছে`, 'info');
    }
  }

  clearAllBookmarks() {
    if (this.bookmarks.length === 0) return;
    this.bookmarks = [];
    this.saveBookmarks();
    this.renderDrawerBookmarks();
    this.showToast('সব বুকমার্ক মুছে ফেলা হয়েছে।', 'info');
  }

  toggleBookmarkById(id, type) {
    let item = null;
    if (type === 'article' || type === 'news') item = newsData.find(n => n.id === id);
    if (type === 'prompt' || type === 'prompts') item = promptsData.find(p => p.id === id);
    if (type === 'tech' || type === 'technology') item = techData.find(t => t.id === id);
    if (type === 'book' || type === 'books') item = booksData.find(b => b.id === id);

    if (item) {
      this.toggleBookmark(item, type === 'news' ? 'article' : type === 'prompts' ? 'prompt' : type);
      this.renderCurrentPageContent();
    }
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Admin Isolation: Hide ads and block ad popunders whenever Admin Panel or Admin modals open
    if (modalId === 'admin-modal' || modalId === 'admin-login-modal' || modalId === 'delete-confirm-modal') {
      document.body.classList.add('admin-panel-open');
      this.suppressAdsForAdmin(true);
      this.setupAdminAdShield();
    }
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // If closing a reader modal, remove post parameter from URL cleanly
    if (modalId === 'reader-modal' || modalId === 'prompt-modal' || modalId === 'book-modal') {
      try {
        const currentUrl = new URL(window.location.href);
        if (currentUrl.searchParams.has('post') || currentUrl.searchParams.has('id') || currentUrl.searchParams.has('article') || currentUrl.searchParams.has('tech') || currentUrl.searchParams.has('prompt') || currentUrl.searchParams.has('book')) {
          currentUrl.searchParams.delete('post');
          currentUrl.searchParams.delete('id');
          currentUrl.searchParams.delete('article');
          currentUrl.searchParams.delete('tech');
          currentUrl.searchParams.delete('prompt');
          currentUrl.searchParams.delete('book');
          const cleanPath = currentUrl.pathname + (currentUrl.search ? currentUrl.search : '');
          window.history.replaceState({}, '', cleanPath);
        }
      } catch (_) {}
    }

    // If no other admin modal is still open, restore standard visitor state
    const isAnyAdminOpen = !!document.querySelector('#admin-modal.open, #admin-login-modal.open, #delete-confirm-modal.open');
    if (!isAnyAdminOpen) {
      document.body.classList.remove('admin-panel-open');
      this.suppressAdsForAdmin(false);
    }
  }

  closeAllModals() {
    const openModals = document.querySelectorAll('.modal-backdrop.open');
    openModals.forEach(m => {
      m.classList.remove('open');
      m.setAttribute('aria-hidden', 'true');
    });
    this.closeDrawer();
    document.body.style.overflow = '';
    document.body.classList.remove('admin-panel-open');
    this.suppressAdsForAdmin(false);

    try {
      const currentUrl = new URL(window.location.href);
      if (currentUrl.searchParams.has('post') || currentUrl.searchParams.has('id') || currentUrl.searchParams.has('article') || currentUrl.searchParams.has('tech') || currentUrl.searchParams.has('prompt') || currentUrl.searchParams.has('book')) {
        currentUrl.searchParams.delete('post');
        currentUrl.searchParams.delete('id');
        currentUrl.searchParams.delete('article');
        currentUrl.searchParams.delete('tech');
        currentUrl.searchParams.delete('prompt');
        currentUrl.searchParams.delete('book');
        const cleanPath = currentUrl.pathname + (currentUrl.search ? currentUrl.search : '');
        window.history.replaceState({}, '', cleanPath);
      }
    } catch (_) {}
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let iconSvg = '';
    if (type === 'success') {
      iconSvg = `<svg viewBox="0 0 24 24" width="16" height="16" stroke="var(--success-color)" stroke-width="2" fill="none"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
    } else {
      iconSvg = `<svg viewBox="0 0 24 24" width="16" height="16" stroke="var(--accent-cyan)" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
    }

    toast.innerHTML = `
      ${iconSvg}
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 3200);
  }

  handleNewsletterSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('newsletter-email');
    const feedback = document.getElementById('newsletter-feedback');
    const submitBtn = document.getElementById('newsletter-submit-btn');

    if (!input || !feedback) return;

    const email = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      feedback.className = 'form-feedback error';
      feedback.textContent = 'দয়া করে একটি সঠিক ইমেইল ঠিকানা দিন (যেমন: name@example.com)।';
      input.focus();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>যুক্ত হচ্ছে...</span>`;

    setTimeout(() => {
      feedback.className = 'form-feedback success';
      feedback.innerHTML = `
        <strong>অভিনন্দন!</strong> ${email} ঠিকানাটি নেক্সোরা সাপ্তাহিক ব্রিফিংয়ে নিবন্ধিত হয়েছে। 
        <br><span style="font-size: 0.75rem; color: var(--text-muted);">(ডেমো মোড: কোনো বহিরাগত সার্ভারে ডেটা পাঠানো হয়নি।)</span>
      `;
      input.value = '';
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span>ফ্রি সাবস্ক্রাইব করুন</span>`;
      this.showToast('সাপ্তাহিক ব্রিফিংয়ে যুক্ত হয়েছেন!', 'success');
    }, 500);
  }

  handleContactSubmit(e) {
    e.preventDefault();
    const form = e.target;
    this.closeModal('contact-modal');
    this.showToast('আপনার বার্তাটি সফলভাবে গৃহীত হয়েছে! (ডেমো নোটিশ)', 'success');
    form.reset();
  }

  bindEvents() {
    // থিম টগল
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    // বুকমার্কস ড্রয়ার
    const bookmarksBtn = document.getElementById('bookmarks-trigger');
    const mobileBookmarksBtn = document.getElementById('mobile-bookmarks-trigger');
    if (bookmarksBtn) bookmarksBtn.addEventListener('click', () => this.openDrawer());
    if (mobileBookmarksBtn) mobileBookmarksBtn.addEventListener('click', () => {
      this.toggleMobileNav(false);
      this.openDrawer();
    });

    const clearBookmarksBtn = document.getElementById('clear-all-bookmarks-btn');
    if (clearBookmarksBtn) {
      clearBookmarksBtn.addEventListener('click', () => this.clearAllBookmarks());
    }

    const drawerTabs = document.querySelectorAll('.drawer-tab');
    drawerTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        drawerTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.renderDrawerBookmarks(tab.dataset.drawerTab);
      });
    });

    // মোবাইল মেনু
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    if (mobileToggle) {
      mobileToggle.addEventListener('click', () => this.toggleMobileNav());
    }

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => this.toggleMobileNav(false));
    });

    // সার্চ ইনপুট ও ফর্ম সাবমিট
    const searchForm = document.getElementById('global-search-form');
    const searchInput = document.getElementById('global-search-input');
    const searchClear = document.getElementById('search-clear-btn');
    const searchClose = document.getElementById('close-search-panel');
    const scopeTabs = document.querySelectorAll('.scope-tab');

    const triggerSearch = (e) => {
      if (e) e.preventDefault();
      const val = searchInput ? searchInput.value.trim() : '';
      if (!val) {
        if (searchInput) searchInput.focus();
        this.showToast('দয়া করে অনুসন্ধানের জন্য কিছু লিখুন', 'info');
        return;
      }
      if (searchClear) searchClear.style.display = 'flex';
      this.handleGlobalSearch(val, this.searchScope);
      const panel = document.getElementById('search-results-panel');
      if (panel) {
        panel.style.display = 'block';
        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    };

    if (searchForm) {
      searchForm.addEventListener('submit', triggerSearch);
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const val = e.target.value;
        if (searchClear) searchClear.style.display = val ? 'flex' : 'none';
        this.handleGlobalSearch(val, this.searchScope);
      });

      searchInput.addEventListener('focus', () => {
        if (searchInput.value.trim()) {
          this.handleGlobalSearch(searchInput.value, this.searchScope);
        }
      });
    }

    if (searchClear) {
      searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchClear.style.display = 'none';
        const panel = document.getElementById('search-results-panel');
        if (panel) panel.style.display = 'none';
        searchInput.focus();
      });
    }

    if (searchClose) {
      searchClose.addEventListener('click', () => {
        const panel = document.getElementById('search-results-panel');
        if (panel) panel.style.display = 'none';
      });
    }

    scopeTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        scopeTabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        this.searchScope = tab.dataset.scope;
        if (searchInput && searchInput.value) {
          this.handleGlobalSearch(searchInput.value, this.searchScope);
        }
      });
    });

    const searchTriggerBtn = document.getElementById('search-trigger');
    if (searchTriggerBtn) {
      searchTriggerBtn.addEventListener('click', () => {
        const input = document.getElementById('global-search-input');
        if (input) {
          input.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => input.focus(), 300);
        }
      });
    }

    document.querySelectorAll('.trending-link').forEach(tag => {
      tag.addEventListener('click', () => {
        const term = tag.dataset.searchTerm;
        const input = document.getElementById('global-search-input');
        if (input) {
          input.value = term;
          if (searchClear) searchClear.style.display = 'flex';
          input.scrollIntoView({ behavior: 'smooth', block: 'center' });
          this.handleGlobalSearch(term, 'all');
        }
      });
    });

    // লিড স্টোরি বাটন
    const leadReadBtn = document.getElementById('read-lead-story-btn');
    if (leadReadBtn) {
      leadReadBtn.addEventListener('click', () => this.openArticleReader('news-1'));
    }

    const leadBookmarkBtn = document.getElementById('lead-bookmark-btn');
    if (leadBookmarkBtn) {
      leadBookmarkBtn.addEventListener('click', () => this.toggleBookmarkById('news-1', 'article'));
    }

    // ফিল্টার ট্যাব
    document.querySelectorAll('.filter-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const targetSection = tab.dataset.target;
        const parentScroll = tab.closest('.filter-tabs-scroll');
        if (parentScroll) {
          parentScroll.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        }
        tab.classList.add('active');

        const subsearchInput = document.getElementById(`${targetSection}-subsearch`);
        const subquery = subsearchInput ? subsearchInput.value : '';
        this.filterSection(targetSection, tab.dataset.filter, subquery);
      });
    });

    ['news', 'prompts', 'tech', 'books'].forEach(sec => {
      const input = document.getElementById(`${sec}-subsearch`);
      if (input) {
        input.addEventListener('input', (e) => {
          const activeTab = document.querySelector(`.filter-tab.active[data-target="${sec}"]`);
          const cat = activeTab ? activeTab.dataset.filter : 'all';
          this.filterSection(sec, cat, e.target.value);
        });
      }
    });

    const readerBookmarkBtn = document.getElementById('reader-bookmark-btn');
    if (readerBookmarkBtn) {
      readerBookmarkBtn.addEventListener('click', () => {
        if (this.currentReaderItem) {
          const type = this.currentReaderItem.guideContent ? 'tech' : 'article';
          this.toggleBookmark(this.currentReaderItem, type);
        }
      });
    }

    const readerCopyLinkBtn = document.getElementById('reader-copy-link-btn');
    if (readerCopyLinkBtn) {
      readerCopyLinkBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.currentReaderItem) {
          const type = this.currentReaderItem.guideContent ? 'tech' : 'article';
          this.shareOrCopyPost(this.currentReaderItem.id, type, readerCopyLinkBtn);
        } else {
          this.copyToClipboard(window.location.href, () => {
            this.showToast('লিংক কপি করা হয়েছে!', 'success');
          });
        }
      });
    }

    const promptModalShareBtn = document.getElementById('prompt-modal-share-btn');
    if (promptModalShareBtn) {
      promptModalShareBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.currentPromptItem) {
          this.shareOrCopyPost(this.currentPromptItem.id, 'prompt', promptModalShareBtn);
        }
      });
    }

    const promptModalBookmarkBtn = document.getElementById('prompt-modal-bookmark-btn');
    if (promptModalBookmarkBtn) {
      promptModalBookmarkBtn.addEventListener('click', () => {
        if (this.currentPromptItem) {
          this.toggleBookmark(this.currentPromptItem, 'prompt');
        }
      });
    }

    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => this.handleNewsletterSubmit(e));
    }

    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          this.closeModal(backdrop.id);
        }
      });
    });

    window.addEventListener('popstate', () => {
      const params = new URLSearchParams(window.location.search);
      const postId = params.get('post') || params.get('id');
      if (postId) {
        this.openAnyPostById(postId);
      } else {
        const openReader = document.querySelector('#reader-modal.open, #prompt-modal.open, #book-modal.open');
        if (openReader) {
          this.closeModal(openReader.id);
        }
      }
    });

    const drawerBackdrop = document.getElementById('bookmarks-drawer');
    if (drawerBackdrop) {
      drawerBackdrop.addEventListener('click', (e) => {
        if (e.target === drawerBackdrop) {
          this.closeDrawer();
        }
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllModals();
        const searchPanel = document.getElementById('search-results-panel');
        if (searchPanel) searchPanel.style.display = 'none';
      }

      if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const searchInput = document.getElementById('global-search-input');
        if (searchInput) {
          searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
          searchInput.focus();
        }
      }
    });
  }

  toggleMobileNav(forceState) {
    const mobileBtn = document.getElementById('mobile-menu-toggle');
    const drawer = document.getElementById('mobile-nav');

    if (!drawer || !mobileBtn) return;

    const isOpen = typeof forceState === 'boolean' ? !forceState : drawer.classList.contains('open');
    if (!isOpen) {
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      mobileBtn.classList.add('active');
      mobileBtn.setAttribute('aria-expanded', 'true');
    } else {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      mobileBtn.classList.remove('active');
      mobileBtn.setAttribute('aria-expanded', 'false');
    }
  }

  // ------------------------------------------------------------------------
  // অ্যাডমিন কন্ট্রোল প্যানেল ইঞ্জিন ও নিরাপত্তা ব্যবস্থা (Admin Engine & Auth)
  // ------------------------------------------------------------------------
  isAdminAuthenticated() {
    return !!this.currentAdminUser;
  }

  ensureAdminLoginModalInDOM() {
    if (document.getElementById('admin-login-modal')) return;

    const loginMarkup = `
      <div class="modal-backdrop admin-modal-backdrop" id="admin-login-modal" role="dialog" aria-modal="true" aria-labelledby="admin-login-title" aria-hidden="true">
        <div class="modal-container admin-login-container">
          <div class="modal-header admin-login-header">
            <div>
              <div class="admin-badge">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                <span>নিরাপদ অ্যাডমিন অ্যাক্সেস</span>
              </div>
              <h3 class="modal-heading" id="admin-login-title" style="margin-top: 6px;">অ্যাডমিন লগইন (Admin Login)</h3>
              <p class="admin-subheading">সাইট কন্ট্রোল প্যানেলে ঢুকতে Firebase ক্রেডেনশিয়াল দিন</p>
            </div>
            <button type="button" class="modal-close-btn btn-admin" onclick="window.nexoraApp.closeModal('admin-login-modal')" aria-label="বন্ধ করুন">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <div class="modal-body admin-login-body">
            <form class="admin-login-form" id="admin-login-form" onsubmit="window.nexoraApp.handleAdminLoginSubmit(event)">
              <div class="admin-login-error" id="admin-login-error">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                <span id="admin-login-error-msg">ভুল ইমেইল বা পাসওয়ার্ড! আবার চেষ্টা করুন।</span>
              </div>

              <div class="form-group">
                <label for="admin-login-username" class="form-label">অ্যাডমিন ইমেইল (Admin Email) *</label>
                <input type="email" id="admin-login-username" class="form-input" required autocomplete="username" placeholder="Email" />
              </div>

              <div class="form-group">
                <label for="admin-login-password" class="form-label">গোপন পাসওয়ার্ড (Password) *</label>
                <div class="password-input-wrap">
                  <input type="password" id="admin-login-password" class="form-input" required autocomplete="current-password" placeholder="পাসওয়ার্ড লিখুন..." />
                  <button type="button" class="btn-password-toggle btn-admin" onclick="window.nexoraApp.togglePasswordVisibility('admin-login-password')" aria-label="পাসওয়ার্ড দেখুন">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" id="pw-toggle-icon"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  </button>
                </div>
              </div>

              <button type="submit" class="btn btn-primary btn-full btn-admin" id="btn-submit-login" style="margin-top: 6px;">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
                <span>লগইন করুন ও প্রবেশ করুন</span>
              </button>

              <p class="admin-login-note">
                অননুমোদিত প্রবেশ নিষিদ্ধ। Firebase Authentication ও ক্লাউড রুলস দ্বারা সুরক্ষিত।
              </p>
            </form>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', loginMarkup);
  }

  ensureDeleteConfirmModalInDOM() {
    if (document.getElementById('delete-confirm-modal')) return;

    const deleteMarkup = `
      <div class="modal-backdrop admin-modal-backdrop" id="delete-confirm-modal" role="dialog" aria-modal="true" aria-labelledby="confirm-delete-title" aria-hidden="true">
        <div class="modal-container admin-confirm-container">
          <div class="admin-confirm-body">
            <div class="confirm-icon-wrap">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </div>
            <h3 class="confirm-title" id="confirm-delete-title">পোস্ট মুছে ফেলতে চান?</h3>
            <p class="confirm-desc">
              আপনি কি নিশ্চিতভাবে এই পোস্টটি চিরতরে মুছে ফেলতে চান? এটি আর ফিরিয়ে আনা সম্ভব হবে না।
              <span class="confirm-item-name" id="confirm-delete-post-title"></span>
            </p>
            <div class="confirm-actions">
              <button type="button" class="btn btn-secondary btn-admin" onclick="window.nexoraApp.closeModal('delete-confirm-modal')">বাতিল</button>
              <button type="button" class="btn-danger btn-admin" id="btn-confirm-delete-action" onclick="window.nexoraApp.executeConfirmedDelete()">হ্যাঁ, মুছে ফেলুন</button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', deleteMarkup);
  }

  openAdminLoginModal() {
    this.ensureAdminLoginModalInDOM();
    const errEl = document.getElementById('admin-login-error');
    if (errEl) errEl.style.display = 'none';

    const usernameInput = document.getElementById('admin-login-username');
    const passwordInput = document.getElementById('admin-login-password');
    if (usernameInput) usernameInput.value = '';
    if (passwordInput) {
      passwordInput.value = '';
      passwordInput.type = 'password';
    }

    const card = document.querySelector('.admin-login-container');
    if (card) card.classList.remove('shake');

    this.openModal('admin-login-modal');
    setTimeout(() => {
      if (usernameInput) usernameInput.focus();
    }, 150);
  }

  async handleAdminLoginSubmit(e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();

    const usernameInput = document.getElementById('admin-login-username');
    const passwordInput = document.getElementById('admin-login-password');
    const errEl = document.getElementById('admin-login-error');
    const errMsg = document.getElementById('admin-login-error-msg');
    const submitBtn = document.getElementById('btn-submit-login');
    const card = document.querySelector('.admin-login-container');

    const enteredUser = usernameInput ? usernameInput.value.trim() : '';
    const enteredPass = passwordInput ? passwordInput.value.trim() : '';

    if (!enteredUser || !enteredPass) {
      if (errEl) {
        errEl.style.display = 'flex';
        if (errMsg) errMsg.textContent = 'ইমেইল এবং পাসওয়ার্ড উভয় ফিল্ড পূরণ করা আবশ্যক!';
      }
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>যাচাই হচ্ছে...</span>`;
    }

    try {
      const user = await adminSignIn(enteredUser, enteredPass);
      this.currentAdminUser = user;
      if (errEl) errEl.style.display = 'none';
      this.closeModal('admin-login-modal');
      this.showToast(`স্বাগতম ${user.email}! Firebase Authentication সফল হয়েছে।`, 'success');
      this.updateAdminAuthUI();
      setTimeout(() => {
        this.openAdminPanel();
      }, 150);
    } catch (error) {
      console.error("Firebase Login Error:", error);
      if (errEl) {
        errEl.style.display = 'flex';
        if (errMsg) {
          if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
            errMsg.textContent = 'ভুল ইমেইল বা পাসওয়ার্ড! Firebase Console-এ নিবন্ধিত সঠিক অ্যাডমিন তথ্য দিন।';
          } else if (error.code === 'auth/invalid-email') {
            errMsg.textContent = 'অবৈধ ইমেইল ফরম্যাট! সঠিক ইমেইল ঠিকানা লিখুন।';
          } else {
            errMsg.textContent = error.message || 'Firebase Authentication ত্রুটি। আবার চেষ্টা করুন।';
          }
        }
      }

      if (card) {
        card.classList.remove('shake');
        void card.offsetWidth;
        card.classList.add('shake');
      }

      if (passwordInput) {
        passwordInput.value = '';
        passwordInput.focus();
      }
      this.showToast('লগইন ব্যর্থ হয়েছে!', 'error');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
          <span>লগইন করুন ও প্রবেশ করুন</span>
        `;
      }
    }
  }

  togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById('pw-toggle-icon');
    if (!input) return;

    if (input.type === 'password') {
      input.type = 'text';
      if (icon) {
        icon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>';
      }
    } else {
      input.type = 'password';
      if (icon) {
        icon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>';
      }
    }
  }

  async adminLogout() {
    try {
      await adminSignOut();
      this.currentAdminUser = null;
      this.updateAdminAuthUI();
      this.closeModal('admin-modal');
      this.showToast('অ্যাডমিন প্যানেল থেকে সফলভাবে লগআউট সম্পন্ন হয়েছে।', 'info');
    } catch (e) {
      this.currentAdminUser = null;
      this.closeModal('admin-modal');
    }
  }

  ensureAdminModalInDOM() {
    if (document.getElementById('admin-modal')) return;

    const modalMarkup = `
      <div class="modal-backdrop admin-modal-backdrop" id="admin-modal" role="dialog" aria-modal="true" aria-labelledby="admin-panel-title" aria-hidden="true">
        <div class="modal-container admin-modal-container">
          <div class="modal-header admin-modal-header">
            <div class="admin-header-title-wrap">
              <div class="admin-badge">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span>সাইট কন্ট্রোল প্যানেল</span>
              </div>
              <h3 class="modal-heading" id="admin-panel-title">Nexora অ্যাডমিন ড্যাশবোর্ড (Admin Panel)</h3>
              <p class="admin-subheading">সাইটের পোস্ট তৈরি, সম্পাদনা, মুছে ফেলা ও ক্যাটাগরি ব্যবস্থাপনা করুন</p>
            </div>
            <div class="admin-header-actions">
              <div class="admin-user-pill" title="লগইনকৃত অ্যাডমিন">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                <span id="admin-current-user-email">admin@nexora</span>
              </div>
              <button type="button" class="btn btn-ghost btn-sm btn-admin" onclick="window.nexoraApp.syncDefaultDataToFirestore()" title="Firestore ডাটাবেজে সিঙ্ক করুন">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                <span>Firestore সিঙ্ক</span>
              </button>
              <button type="button" class="btn btn-ghost btn-sm btn-admin" onclick="window.nexoraApp.resetAllPostsToDefault()" title="ডিফল্ট ডেটায় রিসেট করুন">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>
                <span>ডিফল্ট রিসেট</span>
              </button>
              <button type="button" class="btn-admin-logout btn-admin" onclick="window.nexoraApp.adminLogout()" title="লগআউট করুন">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                <span>লগআউট</span>
              </button>
              <button type="button" class="modal-close-btn btn-admin" onclick="window.nexoraApp.closeModal('admin-modal')" aria-label="বন্ধ করুন">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          </div>

          <div class="admin-stats-strip">
            <div class="admin-stat-chip">
              <span class="stat-chip-label">মোট পোস্ট:</span>
              <strong id="admin-stat-total" class="stat-chip-val cyan">0</strong>
            </div>
            <div class="admin-stat-chip">
              <span class="stat-chip-label">📰 সংবাদ:</span>
              <strong id="admin-stat-news" class="stat-chip-val">0</strong>
            </div>
            <div class="admin-stat-chip">
              <span class="stat-chip-label">🤖 এআই প্রম্পট:</span>
              <strong id="admin-stat-prompts" class="stat-chip-val purple">0</strong>
            </div>
            <div class="admin-stat-chip">
              <span class="stat-chip-label">💻 প্রযুক্তি:</span>
              <strong id="admin-stat-tech" class="stat-chip-val">0</strong>
            </div>
            <div class="admin-stat-chip">
              <span class="stat-chip-label">📚 ফ্রি বই:</span>
              <strong id="admin-stat-books" class="stat-chip-val orange">0</strong>
            </div>
          </div>

          <div class="admin-tabs-nav">
            <button type="button" class="admin-tab-btn active" id="tab-btn-posts-list" onclick="window.nexoraApp.switchAdminTab('list')">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
              <span>পোস্ট তালিকা ও ব্যবস্থাপনা</span>
              <span class="admin-badge-count" id="admin-list-count">0</span>
            </button>
            <button type="button" class="admin-tab-btn" id="tab-btn-create-post" onclick="window.nexoraApp.switchAdminTab('form')">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
              <span id="admin-form-tab-label">নতুন পোস্ট তৈরি করুন</span>
            </button>
          </div>

          <div class="modal-body admin-modal-body">
            <div class="admin-tab-pane active" id="admin-pane-list">
              <div class="admin-toolbar">
                <div class="admin-filter-pills" id="admin-category-filters">
                  <button type="button" class="admin-pill active" data-type="all" onclick="window.nexoraApp.filterAdminList('all')">সবগুলো</button>
                  <button type="button" class="admin-pill" data-type="news" onclick="window.nexoraApp.filterAdminList('news')">📰 সংবাদ</button>
                  <button type="button" class="admin-pill" data-type="prompts" onclick="window.nexoraApp.filterAdminList('prompts')">🤖 প্রম্পটস</button>
                  <button type="button" class="admin-pill" data-type="tech" onclick="window.nexoraApp.filterAdminList('tech')">💻 প্রযুক্তি</button>
                  <button type="button" class="admin-pill" data-type="books" onclick="window.nexoraApp.filterAdminList('books')">📚 ফ্রি বই</button>
                </div>
                <div class="admin-search-wrap">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                  <input type="text" id="admin-search-input" placeholder="পোস্টের শিরোনাম বা ক্যাটাগরি দিয়ে খুঁজুন..." oninput="window.nexoraApp.onAdminSearch(this.value)" />
                </div>
                <button type="button" class="btn btn-primary btn-sm btn-admin" onclick="window.nexoraApp.startCreateNewPost()">
                  <span>+ নতুন পোস্ট</span>
                </button>
              </div>

              <div class="admin-posts-container" id="admin-posts-container"></div>
            </div>

            <div class="admin-tab-pane" id="admin-pane-form">
              <form class="admin-post-form" id="admin-post-form" onsubmit="window.nexoraApp.handleAdminFormSubmit(event)">
                <input type="hidden" id="post-form-edit-id" value="" />
                <input type="hidden" id="post-form-original-type" value="" />

                <div class="admin-form-alert" id="admin-form-mode-banner" style="display: none;">
                  <span id="admin-form-mode-text">পোস্ট সম্পাদনা মোড সক্রিয়</span>
                  <button type="button" class="btn btn-ghost btn-xs btn-admin" onclick="window.nexoraApp.cancelEditPost()">বাতিল করে নতুনে ফিরুন</button>
                </div>

                <div class="form-section-group">
                  <label class="form-section-heading">১. পোস্টের ধরন ও ক্যাটাগরি নির্বাচন করুন *</label>
                  <div class="admin-type-selector">
                    <label class="type-radio-card">
                      <input type="radio" name="admin_post_type" value="news" checked onchange="window.nexoraApp.onPostTypeChange('news')" />
                      <div class="type-radio-content">
                        <span class="type-icon">📰</span>
                        <span class="type-title">সংবাদ (News)</span>
                        <span class="type-sub">ব্রেকিং খবর ও বিশ্লেষণ</span>
                      </div>
                    </label>
                    <label class="type-radio-card">
                      <input type="radio" name="admin_post_type" value="prompts" onchange="window.nexoraApp.onPostTypeChange('prompts')" />
                      <div class="type-radio-content">
                        <span class="type-icon">🤖</span>
                        <span class="type-title">এআই প্রম্পট (AI Prompt)</span>
                        <span class="type-sub">ইমেজ ও এলএলএম টেমপ্লেট</span>
                      </div>
                    </label>
                    <label class="type-radio-card">
                      <input type="radio" name="admin_post_type" value="tech" onchange="window.nexoraApp.onPostTypeChange('tech')" />
                      <div class="type-radio-content">
                        <span class="type-icon">💻</span>
                        <span class="type-title">প্রযুক্তি গাইড (Technology)</span>
                        <span class="type-sub">টিউটোরিয়াল ও কোড গাইড</span>
                      </div>
                    </label>
                    <label class="type-radio-card">
                      <input type="radio" name="admin_post_type" value="books" onchange="window.nexoraApp.onPostTypeChange('books')" />
                      <div class="type-radio-content">
                        <span class="type-icon">📚</span>
                        <span class="type-title">ফ্রি বই (Free Book)</span>
                        <span class="type-sub">পাবলিক ডোমেন ক্লাসিক সাহিত্য</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div class="form-section-group">
                  <label class="form-section-heading">২. সাধারণ বিবরণ (General Details)</label>
                  
                  <div class="form-group">
                    <label for="post-field-title" class="form-label">পোস্ট শিরোনাম (Title) *</label>
                    <input type="text" id="post-field-title" class="form-input" required placeholder="পোস্টের আকর্ষণীয় শিরোনাম লিখুন..." />
                  </div>

                  <div class="form-grid-2">
                    <div class="form-group">
                      <label for="post-field-category" class="form-label">উপ-ক্যাটাগরি (Sub-category) *</label>
                      <input type="text" id="post-field-category" class="form-input" required placeholder="যেমন: কৃত্রিম বুদ্ধিমত্তা, বিজ্ঞান, সাইবার নিরাপত্তা..." />
                      <div class="category-suggestions" id="category-suggestions"></div>
                    </div>

                    <div class="form-group" id="group-author-tool">
                      <label for="post-field-author-tool" class="form-label" id="label-author-tool">লেখক (Author)</label>
                      <input type="text" id="post-field-author-tool" class="form-input" placeholder="লেখকের নাম..." />
                    </div>
                  </div>

                  <!-- Image Upload & URL Options -->
                  <div class="form-group">
                    <div class="image-field-header">
                      <label for="post-field-image" class="form-label" id="label-post-image">ছবি / কভার ইমেজ (Cover Image)</label>
                      <div class="image-source-toggle" role="tablist">
                        <button type="button" class="btn-toggle-source active" id="btn-toggle-upload" onclick="window.nexoraApp.toggleImageSource('upload')">
                          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                          <span>ডিভাইস থেকে আপলোড</span>
                        </button>
                        <button type="button" class="btn-toggle-source" id="btn-toggle-url" onclick="window.nexoraApp.toggleImageSource('url')">
                          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                          <span>ওয়েব লিংক (URL)</span>
                        </button>
                      </div>
                    </div>

                    <!-- 1. File Upload Dropzone -->
                    <div class="image-dropzone" id="image-dropzone" onclick="document.getElementById('post-field-image-file').click()">
                      <input type="file" id="post-field-image-file" class="hidden-file-input" accept="image/*" onchange="window.nexoraApp.handleImageFileUpload(event)" style="display:none;" />
                      <div class="dropzone-content">
                        <div class="dropzone-icon-circle">
                          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                        </div>
                        <div class="dropzone-texts">
                          <div class="dropzone-primary-text"><strong>কম্পিউটার/মোবাইল থেকে ছবি সিলেক্ট করুন</strong> অথবা ড্র্যাগ করুন</div>
                          <div class="dropzone-secondary-text">PNG, JPG, JPEG, WEBP · স্বয়ংক্রিয়ভাবে অপ্টিমাইজড হবে</div>
                        </div>
                      </div>
                    </div>

                    <!-- 2. URL Input Container -->
                    <div class="image-url-box" id="image-url-box" style="display:none;">
                      <div class="image-url-input-wrap">
                        <input type="url" id="post-field-image" class="form-input" placeholder="https://images.unsplash.com/... অথবা ছবির সরাসরি লিংক" oninput="window.nexoraApp.previewFormImage()" />
                        <button type="button" class="btn btn-ghost btn-sm btn-admin" onclick="window.nexoraApp.previewFormImage()">প্রিভিউ দেখুন</button>
                      </div>
                      <div class="image-presets-row">
                        <span class="preset-label">দ্রুত ছবির লিংক বাছাই:</span>
                        <button type="button" class="btn-preset-img btn-admin" onclick="window.nexoraApp.setPresetImage('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80')">এআই ও নিউরাল</button>
                        <button type="button" class="btn-preset-img btn-admin" onclick="window.nexoraApp.setPresetImage('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80')">কোডিং ও ডেভ</button>
                        <button type="button" class="btn-preset-img btn-admin" onclick="window.nexoraApp.setPresetImage('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80')">ক্লাউড ও সার্ভার</button>
                        <button type="button" class="btn-preset-img btn-admin" onclick="window.nexoraApp.setPresetImage('https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80')">সিকিউরিটি</button>
                        <button type="button" class="btn-preset-img btn-admin" onclick="window.nexoraApp.setPresetImage('https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80')">বই ও সাহিত্য</button>
                      </div>
                    </div>

                    <!-- Unified Image Preview Card -->
                    <div id="image-preview-box" class="image-preview-box" style="display:none;"></div>
                  </div>
                </div>

                <div class="form-section-group">
                  <label class="form-section-heading">৩. পোস্টের কন্টেন্ট ও বিশেষ তথ্য (Content Details)</label>
                  
                  <div class="form-grid-2" id="group-readtime-date">
                    <div class="form-group" id="group-readtime">
                      <label for="post-field-readtime" class="form-label">পড়ার সময় (Read Time)</label>
                      <input type="text" id="post-field-readtime" class="form-input" placeholder="যেমন: ৫ মিনিট পাঠ" value="৫ মিনিট পাঠ" />
                    </div>
                    <div class="form-group" id="group-date">
                      <label for="post-field-date" class="form-label">তারিখ (Date)</label>
                      <input type="text" id="post-field-date" class="form-input" placeholder="যেমন: ৯ অক্টোবর, ২০২৬" />
                    </div>
                  </div>

                  <!-- Books Extra Fields with PDF Link -->
                  <div class="form-grid-2" id="group-book-fields" style="display:none;">
                    <div class="form-group">
                      <label for="post-field-book-year" class="form-label">প্রকাশের সাল</label>
                      <input type="text" id="post-field-book-year" class="form-input" placeholder="যেমন: ১৮১৮ বা ১৯০৯" />
                    </div>
                    <div class="form-group">
                      <label for="post-field-book-license" class="form-label">লাইসেন্স</label>
                      <input type="text" id="post-field-book-license" class="form-input" placeholder="পাবলিক ডোমেন (উন্মুক্ত স্বত্ব)" value="পাবলিক ডোমেন (উন্মুক্ত স্বত্ব)" />
                    </div>
                    <div class="form-group">
                      <label for="post-field-book-url" class="form-label">মূল সোর্স / গুটেনবার্গ লিংক</label>
                      <input type="url" id="post-field-book-url" class="form-input" placeholder="https://www.gutenberg.org/..." />
                    </div>
                    <div class="form-group">
                      <label for="post-field-book-pdf" class="form-label">
                        <span class="badge-pdf-tag">PDF</span> সম্পূর্ণ পিডিএফ বা গুগল ড্রাইভ লিংক (Google Drive / Direct PDF URL)
                      </label>
                      <div style="display: flex; gap: 8px;">
                        <input type="url" id="post-field-book-pdf" class="form-input" placeholder="Google Drive লিংক বা সরাসরি PDF ফাইলের URL (https://drive.google.com/...)" />
                        <button type="button" class="btn btn-ghost btn-sm btn-admin" style="white-space: nowrap;" onclick="window.nexoraApp.testBookPdfLink()" title="পিডিএফ লিংক টেস্ট করুন">
                          টেস্ট
                        </button>
                      </div>
                      <div class="field-hint" style="margin-top: 6px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 6px;">
                        <span>গুগল ড্রাইভ লিংক দিলে পাঠকরা পোস্ট ওপেন করে সরাসরি পিডিএফ ডাউনলোড করতে পারবেন।</span>
                        <div style="display: flex; gap: 4px;">
                          <button type="button" class="btn-preset-img btn-admin" style="font-size: 0.6875rem; padding: 2px 7px;" onclick="window.nexoraApp.setPresetPdf('https://archive.org/download/frankensteinor00shel/frankensteinor00shel.pdf')">নমুনা ১</button>
                          <button type="button" class="btn-preset-img btn-admin" style="font-size: 0.6875rem; padding: 2px 7px;" onclick="window.nexoraApp.setPresetPdf('https://greenteapress.com/thinkpython2/thinkpython2.pdf')">নমুনা ২</button>
                          <button type="button" class="btn-preset-img btn-admin" style="font-size: 0.6875rem; padding: 2px 7px;" onclick="window.nexoraApp.setPresetPdf('https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs/view?usp=sharing')">নমুনা ৩ (Drive)</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form-group" id="group-excerpt">
                    <label for="post-field-excerpt" class="form-label" id="label-excerpt">সংক্ষিপ্ত সারসংক্ষেপ (Excerpt) *</label>
                    <textarea id="post-field-excerpt" class="form-input" rows="3" required placeholder="সংক্ষিপ্ত ২-৩ লাইনের বর্ণনা..."></textarea>
                  </div>

                  <div class="form-group" id="group-prompt-text" style="display:none;">
                    <label for="post-field-prompt-text" class="form-label">মূল প্রম্পট টেক্সট (Prompt Text) *</label>
                    <textarea id="post-field-prompt-text" class="form-input font-mono" rows="4" placeholder="এআই-তে পেস্ট করার মূল প্রম্পট লিখুন..."></textarea>
                  </div>

                  <div class="form-group" id="group-prompt-tips" style="display:none;">
                    <label for="post-field-prompt-tips" class="form-label">ব্যবহারের টিপস বা নির্দেশনা</label>
                    <input type="text" id="post-field-prompt-tips" class="form-input" placeholder="যেমন: সিনেম্যাটিক রেজাল্ট পেতে ১৬:৯ অ্যাসপেক্ট রেশিও দিন..." />
                  </div>

                  <div class="form-group" id="group-full-content">
                    <label for="post-field-content" class="form-label" id="label-full-content">সম্পূর্ণ বিস্তারিত কন্টেন্ট (Full Content) *</label>
                    <div class="content-help-text">প্যারাগ্রাফ ও সাব-হেডিং লিখতে পারেন। সাধারণ টেক্সট লিখলে স্বয়ংক্রিয়ভাবে প্যারাগ্রাফে রূপান্তর হবে, অথবা &lt;p&gt;, &lt;h3&gt;, &lt;ul&gt; ইত্যাদি HTML ট্যাগ ব্যবহার করতে পারেন।</div>
                    <textarea id="post-field-content" class="form-input" rows="7" placeholder="পোস্টের সম্পূর্ণ বডি কন্টেন্ট লিখুন..."></textarea>
                  </div>
                </div>

                <div class="admin-form-actions">
                  <button type="button" class="btn btn-ghost btn-admin" onclick="window.nexoraApp.resetAdminForm()">ফর্ম খালি করুন</button>
                  <button type="submit" class="btn btn-primary btn-admin" id="btn-submit-post">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span id="btn-submit-post-label">পোস্ট সংরক্ষণ ও প্রকাশ করুন</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div class="modal-footer admin-modal-footer">
            <div class="admin-footer-tip">
              <span>💡 নতুন যোগ করা বা এডিট করা পোস্ট স্বয়ংক্রিয়ভাবে ব্রাউজারে সংরক্ষিত হয় এবং তাৎক্ষণিকভাবে মূল সাইটে প্রদর্শিত হয়।</span>
            </div>
            <button type="button" class="btn btn-secondary btn-admin" onclick="window.nexoraApp.closeModal('admin-modal')">বন্ধ করুন</button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalMarkup);
  }

  openAdminPanel() {
    if (!this.isAdminAuthenticated()) {
      this.openAdminLoginModal();
      return;
    }

    this.ensureAdminModalInDOM();
    this.updateAdminStats();
    this.switchAdminTab('list');
    this.renderAdminPostList();
    this.openModal('admin-modal');
  }

  switchAdminTab(tabName) {
    this.ensureAdminModalInDOM();
    this.adminCurrentTab = tabName;

    const btnList = document.getElementById('tab-btn-posts-list');
    const btnForm = document.getElementById('tab-btn-create-post');
    const paneList = document.getElementById('admin-pane-list');
    const paneForm = document.getElementById('admin-pane-form');

    if (btnList && btnForm && paneList && paneForm) {
      if (tabName === 'list') {
        btnList.classList.add('active');
        btnForm.classList.remove('active');
        paneList.classList.add('active');
        paneForm.classList.remove('active');
        this.renderAdminPostList();
      } else {
        btnList.classList.remove('active');
        btnForm.classList.add('active');
        paneList.classList.remove('active');
        paneForm.classList.add('active');
      }
    }
  }

  filterAdminList(type) {
    this.adminFilterType = type;
    const pills = document.querySelectorAll('#admin-category-filters .admin-pill');
    pills.forEach(p => {
      p.classList.toggle('active', p.dataset.type === type);
    });
    this.renderAdminPostList();
  }

  onAdminSearch(query) {
    this.adminSearchQuery = (query || '').toLowerCase().trim();
    this.renderAdminPostList();
  }

  getAllAdminPosts() {
    const list = [];
    newsData.forEach(n => {
      list.push({
        id: n.id,
        type: 'news',
        typeName: 'সংবাদ',
        title: n.title,
        category: n.category,
        image: n.image,
        author: n.author,
        date: n.date,
        readTime: n.readTime,
        snippet: n.excerpt,
        createdAt: n.createdAt,
        updatedAt: n.updatedAt,
        raw: n
      });
    });
    promptsData.forEach(p => {
      list.push({
        id: p.id,
        type: 'prompts',
        typeName: 'এআই প্রম্পট',
        title: p.title,
        category: p.category,
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
        author: p.tool,
        date: p.tool,
        snippet: p.desc,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
        raw: p
      });
    });
    techData.forEach(t => {
      list.push({
        id: t.id,
        type: 'tech',
        typeName: 'প্রযুক্তি',
        title: t.title,
        category: t.category,
        image: t.image,
        author: 'টেক গাইড',
        date: t.readTime,
        snippet: t.summary,
        createdAt: t.createdAt,
        updatedAt: t.updatedAt,
        raw: t
      });
    });
    booksData.forEach(b => {
      list.push({
        id: b.id,
        type: 'books',
        typeName: 'ফ্রি বই',
        title: b.title,
        category: b.category,
        image: b.cover,
        author: `${b.author} (${b.year})`,
        date: b.license,
        snippet: b.desc,
        createdAt: b.createdAt,
        updatedAt: b.updatedAt,
        raw: b
      });
    });
    return sortPostsNewestFirst(list);
  }

  renderAdminPostList() {
    const container = document.getElementById('admin-posts-container');
    if (!container) return;

    let items = this.getAllAdminPosts();

    // ক্যাটাগরি ফিল্টার
    if (this.adminFilterType !== 'all') {
      items = items.filter(it => it.type === this.adminFilterType);
    }

    // সার্চ ফিল্টার
    if (this.adminSearchQuery) {
      items = items.filter(it => {
        const titleMatch = (it.title || '').toLowerCase().includes(this.adminSearchQuery);
        const catMatch = (it.category || '').toLowerCase().includes(this.adminSearchQuery);
        const authMatch = (it.author || '').toLowerCase().includes(this.adminSearchQuery);
        return titleMatch || catMatch || authMatch;
      });
    }

    const countBadge = document.getElementById('admin-list-count');
    if (countBadge) countBadge.textContent = items.length;

    if (items.length === 0) {
      container.innerHTML = `
        <div class="empty-results" style="padding: 40px 20px; text-align: center;">
          <svg viewBox="0 0 24 24" width="36" height="36" stroke="var(--text-muted)" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>
          <p style="margin-top: 10px; font-weight: 600; color: var(--text-primary);">কোনো পোস্ট খুঁজে পাওয়া যায়নি</p>
          <p style="font-size: 0.8125rem; color: var(--text-muted); margin-top: 4px;">ফিল্টার পরিবর্তন করুন অথবা নতুন পোস্ট তৈরি করুন।</p>
          <button type="button" class="btn btn-primary btn-sm btn-admin" style="margin-top: 14px;" onclick="window.nexoraApp.startCreateNewPost()">
            + নতুন পোস্ট তৈরি করুন
          </button>
        </div>
      `;
      return;
    }

    const typeColorMap = {
      news: 'cyan',
      prompts: 'purple',
      tech: 'cyan',
      books: 'purple'
    };

    container.innerHTML = items.map(post => {
      const color = typeColorMap[post.type] || 'cyan';
      return `
        <div class="admin-post-row" data-id="${post.id}" data-type="${post.type}">
          <div class="admin-post-thumb">
            <img src="${post.image}" alt="${post.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80'" />
          </div>
          <div class="admin-post-info">
            <div class="admin-post-meta">
              <span class="meta-tag ${color}">${post.typeName}</span>
              <span class="meta-dot">·</span>
              <span style="font-weight: 600; color: var(--text-primary);">${post.category}</span>
              <span class="meta-dot">·</span>
              <span>${post.author || post.date || ''}</span>
            </div>
            <h4 class="admin-post-title" title="${post.title}">${post.title}</h4>
            <div class="admin-post-snippet">${post.snippet || ''}</div>
          </div>
          <div class="admin-post-actions">
            <button type="button" class="btn-action-edit btn-admin" onclick="window.nexoraApp.startEditPost('${post.type}', '${post.id}')" title="পোস্ট সম্পাদনা করুন">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
              <span>এডিট</span>
            </button>
            <button type="button" class="btn-action-delete btn-admin" data-action="delete" data-type="${post.type}" data-id="${post.id}" onclick="window.nexoraApp.confirmDeletePost('${post.type}', '${post.id}')" title="পোস্ট মুছে ফেলুন">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              <span>মুছুন</span>
            </button>
          </div>
        </div>
      `;
    }).join('');

    // পোস্ট ডিলিট বাটনের জন্য সার্বজনীন অ্যাক্টিভ ক্লিক ইভেন্ট ডেলিগেশন
    if (container && !container.dataset.deleteBound) {
      container.dataset.deleteBound = 'true';
      container.addEventListener('click', (e) => {
        const delBtn = e.target.closest('.btn-action-delete, [data-action="delete"]');
        if (delBtn) {
          e.preventDefault();
          e.stopPropagation();
          const t = delBtn.dataset.type;
          const id = delBtn.dataset.id;
          if (t && id) {
            window.nexoraApp.confirmDeletePost(t, id);
          }
        }
      });
    }
  }

  updateAdminStats() {
    const total = newsData.length + promptsData.length + techData.length + booksData.length;
    const elTotal = document.getElementById('admin-stat-total');
    const elNews = document.getElementById('admin-stat-news');
    const elPrompts = document.getElementById('admin-stat-prompts');
    const elTech = document.getElementById('admin-stat-tech');
    const elBooks = document.getElementById('admin-stat-books');

    if (elTotal) elTotal.textContent = total;
    if (elNews) elNews.textContent = newsData.length;
    if (elPrompts) elPrompts.textContent = promptsData.length;
    if (elTech) elTech.textContent = techData.length;
    if (elBooks) elBooks.textContent = booksData.length;
  }

  startCreateNewPost() {
    this.ensureAdminModalInDOM();
    this.adminEditingPost = null;
    this.resetAdminForm();

    const banner = document.getElementById('admin-form-mode-banner');
    if (banner) banner.style.display = 'none';

    const submitLabel = document.getElementById('btn-submit-post-label');
    if (submitLabel) submitLabel.textContent = 'পোস্ট সংরক্ষণ ও প্রকাশ করুন';

    const tabLabel = document.getElementById('admin-form-tab-label');
    if (tabLabel) tabLabel.textContent = 'নতুন পোস্ট তৈরি করুন';

    // সেট টাইপ
    const targetType = (this.adminFilterType !== 'all') ? this.adminFilterType : 'news';
    const radio = document.querySelector(`input[name="admin_post_type"][value="${targetType}"]`);
    if (radio) {
      radio.checked = true;
      this.onPostTypeChange(targetType);
    } else {
      this.onPostTypeChange('news');
    }

    // আজকের বাংলা তারিখ
    const dateField = document.getElementById('post-field-date');
    if (dateField && !dateField.value) {
      const bnDate = new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' });
      dateField.value = bnDate;
    }

    this.switchAdminTab('form');
    this.setupDropzoneEvents();
    const titleInput = document.getElementById('post-field-title');
    if (titleInput) titleInput.focus();
  }

  startEditPost(type, id) {
    this.ensureAdminModalInDOM();
    let item = null;
    if (type === 'news') item = newsData.find(n => n.id === id);
    if (type === 'prompts') item = promptsData.find(p => p.id === id);
    if (type === 'tech') item = techData.find(t => t.id === id);
    if (type === 'books') item = booksData.find(b => b.id === id);

    if (!item) {
      this.showToast('পোস্টটি পাওয়া যায়নি', 'error');
      return;
    }

    this.adminEditingPost = { type, id, item };

    // মোড ব্যানার
    const banner = document.getElementById('admin-form-mode-banner');
    const modeText = document.getElementById('admin-form-mode-text');
    if (banner && modeText) {
      banner.style.display = 'flex';
      modeText.textContent = `সম্পাদনা করা হচ্ছে: "${item.title.substring(0, 36)}..."`;
    }

    const editIdInput = document.getElementById('post-form-edit-id');
    const origTypeInput = document.getElementById('post-form-original-type');
    if (editIdInput) editIdInput.value = id;
    if (origTypeInput) origTypeInput.value = type;

    // রেডিও সিলেক্ট
    const radio = document.querySelector(`input[name="admin_post_type"][value="${type}"]`);
    if (radio) radio.checked = true;
    this.onPostTypeChange(type);

    // ফিল্ড পপুলেট
    const titleIn = document.getElementById('post-field-title');
    const catIn = document.getElementById('post-field-category');
    const authToolIn = document.getElementById('post-field-author-tool');
    const imgIn = document.getElementById('post-field-image');
    const readIn = document.getElementById('post-field-readtime');
    const dateIn = document.getElementById('post-field-date');
    const excIn = document.getElementById('post-field-excerpt');
    const contentIn = document.getElementById('post-field-content');
    const promptTextIn = document.getElementById('post-field-prompt-text');
    const promptTipsIn = document.getElementById('post-field-prompt-tips');
    const bookYearIn = document.getElementById('post-field-book-year');
    const bookLicIn = document.getElementById('post-field-book-license');
    const bookUrlIn = document.getElementById('post-field-book-url');
    const bookPdfIn = document.getElementById('post-field-book-pdf');

    if (titleIn) titleIn.value = item.title || '';
    if (catIn) catIn.value = item.category || '';

    // ছবি সেটআপ (URL বা আপলোডকৃত ডেটা)
    const existingImg = item.image || item.cover || '';
    if (existingImg) {
      if (existingImg.startsWith('data:')) {
        this.uploadedImageDataUrl = existingImg;
        this.toggleImageSource('upload');
        this.setUploadedImage(existingImg, 'সংরক্ষিত ছবি', 0);
      } else {
        this.uploadedImageDataUrl = null;
        this.toggleImageSource('url');
        if (imgIn) imgIn.value = existingImg;
        this.previewFormImage();
      }
    } else {
      this.clearImageUpload();
    }

    if (type === 'news') {
      if (authToolIn) authToolIn.value = item.author || '';
      if (readIn) readIn.value = item.readTime || '৫ মিনিট পাঠ';
      if (dateIn) dateIn.value = item.date || '';
      if (excIn) excIn.value = item.excerpt || '';
      if (contentIn) contentIn.value = (item.content || '').replace(/<[^>]+>/g, '\n').trim() || (item.content || '');
    } else if (type === 'prompts') {
      if (authToolIn) authToolIn.value = item.tool || '';
      if (excIn) excIn.value = item.desc || '';
      if (promptTextIn) promptTextIn.value = item.promptText || '';
      if (promptTipsIn) promptTipsIn.value = item.tips || '';
    } else if (type === 'tech') {
      if (authToolIn) authToolIn.value = 'Nexora Tech Team';
      if (readIn) readIn.value = item.readTime || '৬ মিনিট পাঠ';
      if (excIn) excIn.value = item.summary || '';
      if (contentIn) contentIn.value = (item.guideContent || '').replace(/<[^>]+>/g, '\n').trim() || (item.guideContent || '');
    } else if (type === 'books') {
      if (authToolIn) authToolIn.value = item.author || '';
      if (bookYearIn) bookYearIn.value = item.year || '';
      if (bookLicIn) bookLicIn.value = item.license || 'পাবলিক ডোমেন (উন্মুক্ত স্বত্ব)';
      if (bookUrlIn) bookUrlIn.value = item.gutenbergUrl || '';
      if (bookPdfIn) bookPdfIn.value = item.pdfUrl || '';
      if (excIn) excIn.value = item.desc || '';
      if (contentIn) {
        contentIn.value = item.chapters && item.chapters[0] ? item.chapters[0].text : '';
      }
    }

    const submitLabel = document.getElementById('btn-submit-post-label');
    if (submitLabel) submitLabel.textContent = 'পরিবর্তন সংরক্ষণ করুন (Update Post)';

    const tabLabel = document.getElementById('admin-form-tab-label');
    if (tabLabel) tabLabel.textContent = 'পোস্ট সম্পাদনা';

    this.switchAdminTab('form');
    this.setupDropzoneEvents();
    if (titleIn) titleIn.focus();
  }

  cancelEditPost() {
    this.adminEditingPost = null;
    this.resetAdminForm();
    const banner = document.getElementById('admin-form-mode-banner');
    if (banner) banner.style.display = 'none';
    const tabLabel = document.getElementById('admin-form-tab-label');
    if (tabLabel) tabLabel.textContent = 'নতুন পোস্ট তৈরি করুন';
    const submitLabel = document.getElementById('btn-submit-post-label');
    if (submitLabel) submitLabel.textContent = 'পোস্ট সংরক্ষণ ও প্রকাশ করুন';
    this.switchAdminTab('list');
  }

  onPostTypeChange(type) {
    const labelAuthorTool = document.getElementById('label-author-tool');
    const groupReadtimeDate = document.getElementById('group-readtime-date');
    const groupBookFields = document.getElementById('group-book-fields');
    const groupPromptText = document.getElementById('group-prompt-text');
    const groupPromptTips = document.getElementById('group-prompt-tips');
    const groupFullContent = document.getElementById('group-full-content');
    const labelExcerpt = document.getElementById('label-excerpt');
    const labelFullContent = document.getElementById('label-full-content');

    const suggestionsContainer = document.getElementById('category-suggestions');

    let suggestions = [];
    if (type === 'news') {
      suggestions = ['কৃত্রিম বুদ্ধিমত্তা', 'ওয়েব ও ক্লাউড', 'বিজ্ঞান ও মহাকাশ', 'সাইবার নিরাপত্তা', 'ডিজিটাল সংস্কৃতি', 'প্রকৌশল'];
      if (labelAuthorTool) labelAuthorTool.textContent = 'লেখক (Author)';
      if (groupReadtimeDate) groupReadtimeDate.style.display = 'grid';
      if (groupBookFields) groupBookFields.style.display = 'none';
      if (groupPromptText) groupPromptText.style.display = 'none';
      if (groupPromptTips) groupPromptTips.style.display = 'none';
      if (groupFullContent) groupFullContent.style.display = 'block';
      if (labelExcerpt) labelExcerpt.textContent = 'সংক্ষিপ্ত সারসংক্ষেপ (Excerpt) *';
      if (labelFullContent) labelFullContent.textContent = 'সম্পূর্ণ বিস্তারিত সংবাদ (Full Content) *';
    } else if (type === 'prompts') {
      suggestions = ['ছবি তৈরি', 'ব্যবসা ও উদ্যোগ', 'চ্যাটজিপিটি / এলএলএম', 'সোশ্যাল মিডিয়া', 'ভিডিও তৈরি', 'উৎপাদনশীলতা'];
      if (labelAuthorTool) labelAuthorTool.textContent = 'এআই টুল / মডেল (যেমন: Midjourney v6 / Claude)';
      if (groupReadtimeDate) groupReadtimeDate.style.display = 'none';
      if (groupBookFields) groupBookFields.style.display = 'none';
      if (groupPromptText) groupPromptText.style.display = 'block';
      if (groupPromptTips) groupPromptTips.style.display = 'block';
      if (groupFullContent) groupFullContent.style.display = 'none';
      if (labelExcerpt) labelExcerpt.textContent = 'প্রম্পটের বর্ণনা (Short Description) *';
    } else if (type === 'tech') {
      suggestions = ['এআই ও সফটওয়্যার গাইড', 'সফটওয়্যার টিপস', 'দরকারি ওয়েব টুলস', 'ডিজিটাল ট্রেন্ডস', 'ক্লাউড আর্কিটেকচার'];
      if (labelAuthorTool) labelAuthorTool.textContent = 'গাইড লেখক / সোর্স';
      if (groupReadtimeDate) groupReadtimeDate.style.display = 'grid';
      if (groupBookFields) groupBookFields.style.display = 'none';
      if (groupPromptText) groupPromptText.style.display = 'none';
      if (groupPromptTips) groupPromptTips.style.display = 'none';
      if (groupFullContent) groupFullContent.style.display = 'block';
      if (labelExcerpt) labelExcerpt.textContent = 'সংক্ষিপ্ত সারসংক্ষেপ (Summary) *';
      if (labelFullContent) labelFullContent.textContent = 'সম্পূর্ণ টেক গাইড ও কোড উদাহরণ (Guide Content) *';
    } else if (type === 'books') {
      suggestions = ['বৈজ্ঞানিক কল্পকাহিনী', 'দর্শন ও রণকৌশল', 'কোডিং ও প্রযুক্তি', 'ক্লাসিক সাহিত্য', 'ইতিহাস'];
      if (labelAuthorTool) labelAuthorTool.textContent = 'মূল লেখক (Author) *';
      if (groupReadtimeDate) groupReadtimeDate.style.display = 'none';
      if (groupBookFields) groupBookFields.style.display = 'grid';
      if (groupPromptText) groupPromptText.style.display = 'none';
      if (groupPromptTips) groupPromptTips.style.display = 'none';
      if (groupFullContent) groupFullContent.style.display = 'block';
      if (labelExcerpt) labelExcerpt.textContent = 'বইয়ের সারসংক্ষেপ ও ভূমিকা (Description) *';
      if (labelFullContent) labelFullContent.textContent = 'নমুনা অধ্যায় বা পাঠ্য টেক্সট (Sample Chapter Text)';
    }

    if (suggestionsContainer) {
      suggestionsContainer.innerHTML = suggestions.map(s => `
        <button type="button" class="category-chip btn-admin" onclick="window.nexoraApp.setCategorySuggestion('${s}')">${s}</button>
      `).join('');
    }
  }

  setCategorySuggestion(val) {
    const input = document.getElementById('post-field-category');
    if (input) input.value = val;
  }

  setPresetImage(url) {
    const input = document.getElementById('post-field-image');
    if (input) {
      input.value = url;
      this.previewFormImage();
    }
  }

  previewFormImage() {
    const input = document.getElementById('post-field-image');
    const box = document.getElementById('image-preview-box');
    if (!input || !box) return;

    const val = input.value.trim();
    if (val) {
      box.style.display = 'block';
      box.innerHTML = `
        <div class="preview-card">
          <div class="preview-thumb-wrap">
            <img src="${val}" alt="Preview" class="preview-thumb-img" onerror="this.src='https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80'" />
          </div>
          <div class="preview-meta">
            <div class="preview-title">ওয়েব ইমেজ প্রিভিউ</div>
            <div class="preview-status">✓ বৈধ ওয়েব লিংক সংযুক্ত</div>
          </div>
          <button type="button" class="btn-remove-preview" onclick="window.nexoraApp.clearImageUpload()" title="ছবি মুছে ফেলুন">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            <span>মুছুন</span>
          </button>
        </div>
      `;
    } else {
      box.style.display = 'none';
      box.innerHTML = '';
    }
  }

  // ------------------------------------------------------------------------
  // ডিভাইস থেকে ইমেজ আপলোড ও অপ্টিমাইজেশন (Image File Upload & Dropzone)
  // ------------------------------------------------------------------------
  setupDropzoneEvents() {
    const dropzones = document.querySelectorAll('.image-dropzone');
    dropzones.forEach(dropzone => {
      if (dropzone.dataset.bound === 'true') return;
      dropzone.dataset.bound = 'true';

      ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropzone.classList.add('dragover');
        }, false);
      });

      ['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropzone.classList.remove('dragover');
        }, false);
      });

      dropzone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        if (dt && dt.files && dt.files.length) {
          this.processImageFile(dt.files[0]);
        }
      }, false);
    });
  }

  handleImageFileUpload(e) {
    const file = e.target.files && e.target.files[0];
    if (file) {
      this.processImageFile(file);
    }
  }

  processImageFile(file) {
    if (!file) return;
    if (!file.type || !file.type.startsWith('image/')) {
      this.showToast('অনুগ্রহ করে একটি সঠিক ইমেজ ফাইল (PNG, JPG, JPEG, WEBP) নির্বাচন করুন!', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const rawDataUrl = e.target.result;
      const img = new Image();
      img.onload = () => {
        const maxDimension = 1200;
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            width = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.84);
        this.setUploadedImage(optimizedDataUrl, file.name, file.size);
      };
      img.onerror = () => {
        this.setUploadedImage(rawDataUrl, file.name, file.size);
      };
      img.src = rawDataUrl;
    };
    reader.onerror = () => {
      this.showToast('ছবি পড়তে সমস্যা হয়েছে! আবার চেষ্টা করুন।', 'error');
    };
    reader.readAsDataURL(file);
  }

  setUploadedImage(dataUrl, fileName, fileSize) {
    this.uploadedImageDataUrl = dataUrl;
    const urlInput = document.getElementById('post-field-image');
    if (urlInput) urlInput.value = dataUrl;

    const previewBox = document.getElementById('image-preview-box');
    if (previewBox) {
      previewBox.style.display = 'block';
      previewBox.innerHTML = `
        <div class="preview-card">
          <div class="preview-thumb-wrap">
            <img src="${dataUrl}" class="preview-thumb-img" alt="Uploaded Preview" />
          </div>
          <div class="preview-meta">
            <div class="preview-title" title="${fileName || 'আপলোডকৃত ছবি'}">${fileName || 'ডিভাইস থেকে আপলোডকৃত ছবি'}</div>
            <div class="preview-status">✓ ছবি প্রস্তুত ও অপ্টিমাইজড (${this.formatFileSize(fileSize)})</div>
          </div>
          <button type="button" class="btn-remove-preview" onclick="window.nexoraApp.clearImageUpload()" title="ছবি মুছে ফেলুন">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            <span>মুছুন</span>
          </button>
        </div>
      `;
    }

    this.showToast('ডিভাইস থেকে ছবি সফলভাবে আপলোড হয়েছে!', 'success');
  }

  clearImageUpload() {
    this.uploadedImageDataUrl = null;
    const urlInput = document.getElementById('post-field-image');
    if (urlInput) urlInput.value = '';
    const fileInput = document.getElementById('post-field-image-file');
    if (fileInput) fileInput.value = '';
    const previewBox = document.getElementById('image-preview-box');
    if (previewBox) {
      previewBox.style.display = 'none';
      previewBox.innerHTML = '';
    }
  }

  toggleImageSource(mode) {
    this.imageSourceMode = mode;
    const btnUpload = document.getElementById('btn-toggle-upload');
    const btnUrl = document.getElementById('btn-toggle-url');
    const dropzone = document.getElementById('image-dropzone');
    const urlBox = document.getElementById('image-url-box');

    if (mode === 'upload') {
      if (btnUpload) btnUpload.classList.add('active');
      if (btnUrl) btnUrl.classList.remove('active');
      if (dropzone) dropzone.style.display = 'flex';
      if (urlBox) urlBox.style.display = 'none';
      this.setupDropzoneEvents();
    } else {
      if (btnUrl) btnUrl.classList.add('active');
      if (btnUpload) btnUpload.classList.remove('active');
      if (urlBox) urlBox.style.display = 'block';
      if (dropzone) dropzone.style.display = 'none';
    }
  }

  formatFileSize(bytes) {
    if (!bytes || bytes === 0) return 'অপ্টিমাইজড';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  setPresetPdf(url) {
    const input = document.getElementById('post-field-book-pdf');
    if (input) {
      input.value = url;
      this.showToast('নমুনা পিডিএফ লিংক সফলভাবে যুক্ত হয়েছে!', 'info');
    }
  }

  testBookPdfLink() {
    const input = document.getElementById('post-field-book-pdf');
    const url = input ? input.value.trim() : '';
    if (!url) {
      this.showToast('অনুগ্রহ করে প্রথমে একটি পিডিএফ লিংক দিন!', 'warning');
      return;
    }
    const directUrl = getDirectPdfDownloadUrl(url);
    window.open(directUrl, '_blank', 'noopener,noreferrer');
  }

  resetAdminForm() {
    const form = document.getElementById('admin-post-form');
    if (form) form.reset();

    const editIdInput = document.getElementById('post-form-edit-id');
    const origTypeInput = document.getElementById('post-form-original-type');
    if (editIdInput) editIdInput.value = '';
    if (origTypeInput) origTypeInput.value = '';

    const bookPdfIn = document.getElementById('post-field-book-pdf');
    if (bookPdfIn) bookPdfIn.value = '';

    this.clearImageUpload();
    this.toggleImageSource('upload');
  }

  async handleAdminFormSubmit(e) {
    e.preventDefault();

    const editId = (document.getElementById('post-form-edit-id') || {}).value;
    const origType = (document.getElementById('post-form-original-type') || {}).value;
    const selectedTypeRadio = document.querySelector('input[name="admin_post_type"]:checked');
    const type = selectedTypeRadio ? selectedTypeRadio.value : 'news';

    const title = (document.getElementById('post-field-title') || {}).value.trim();
    const category = (document.getElementById('post-field-category') || {}).value.trim();
    let authorTool = (document.getElementById('post-field-author-tool') || {}).value.trim();
    let imageUrl = this.uploadedImageDataUrl || ((document.getElementById('post-field-image') || {}).value || '').trim();
    const readTime = (document.getElementById('post-field-readtime') || {}).value.trim() || '৫ মিনিট পাঠ';
    let date = (document.getElementById('post-field-date') || {}).value.trim();
    const excerpt = (document.getElementById('post-field-excerpt') || {}).value.trim();
    const content = (document.getElementById('post-field-content') || {}).value.trim();
    const promptText = (document.getElementById('post-field-prompt-text') || {}).value.trim();
    const promptTips = (document.getElementById('post-field-prompt-tips') || {}).value.trim();
    const bookYear = (document.getElementById('post-field-book-year') || {}).value.trim() || '২০২৬';
    const bookLicense = (document.getElementById('post-field-book-license') || {}).value.trim() || 'পাবলিক ডোমেন (উন্মুক্ত স্বত্ব)';
    const bookUrl = (document.getElementById('post-field-book-url') || {}).value.trim() || 'https://www.gutenberg.org';
    const bookPdf = (document.getElementById('post-field-book-pdf') || {}).value.trim();

    if (!title || !category) {
      this.showToast('শিরোনাম এবং ক্যাটাগরি পূরণ করা আবশ্যক', 'error');
      return;
    }

    if (!date) {
      date = new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    // ডিফল্ট ইমেজ নির্বাচন
    if (!imageUrl) {
      if (type === 'news') imageUrl = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80';
      if (type === 'prompts') imageUrl = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80';
      if (type === 'tech') imageUrl = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';
      if (type === 'books') imageUrl = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80';
    }

    // HTML ফরম্যাটিং হেল্পার
    const formatAsHtml = (raw) => {
      if (!raw) return '<p>কোনো অতিরিক্ত বিবরণ নেই।</p>';
      if (raw.includes('<p>') || raw.includes('<div>') || raw.includes('<h3>')) {
        return raw;
      }
      return raw.split('\n\n').filter(p => p.trim()).map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('\n');
    };

    const submitBtn = document.getElementById('btn-submit-post');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>সংরক্ষণ হচ্ছে...</span>`;
    }

    let savedItem = null;
    const collectionName = type === 'news' ? 'news' : type === 'prompts' ? 'aiPrompts' : type === 'tech' ? 'technology' : 'books';

    try {
      if (editId) {
        // EDIT MODE
        if (origType && origType !== type) {
          const oldCol = origType === 'news' ? 'news' : origType === 'prompts' ? 'aiPrompts' : origType === 'tech' ? 'technology' : 'books';
          if (this.isAdminAuthenticated()) {
            await deleteDocument(oldCol, editId);
          }
          if (origType === 'news') {
            const idx = newsData.findIndex(n => n.id === editId);
            if (idx >= 0) newsData.splice(idx, 1);
          } else if (origType === 'prompts') {
            const idx = promptsData.findIndex(p => p.id === editId);
            if (idx >= 0) promptsData.splice(idx, 1);
          } else if (origType === 'tech') {
            const idx = techData.findIndex(t => t.id === editId);
            if (idx >= 0) techData.splice(idx, 1);
          } else if (origType === 'books') {
            const idx = booksData.findIndex(b => b.id === editId);
            if (idx >= 0) booksData.splice(idx, 1);
          }
        }

        if (type === 'news') {
          const existing = newsData.find(n => n.id === editId);
          savedItem = {
            id: editId,
            title,
            category,
            date,
            readTime,
            image: imageUrl,
            excerpt: excerpt || title,
            author: authorTool || 'নেক্সোরা সম্পাদকীয়',
            content: formatAsHtml(content || excerpt),
            published: true,
            createdAt: (existing && existing.createdAt) || new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          if (existing) Object.assign(existing, savedItem);
          else newsData.unshift(savedItem);
          newsData = sortPostsNewestFirst(newsData);
        } else if (type === 'prompts') {
          const existing = promptsData.find(p => p.id === editId);
          savedItem = {
            id: editId,
            title,
            category,
            tool: authorTool || 'ChatGPT / Claude',
            desc: excerpt || title,
            promptText: promptText || excerpt || title,
            tips: promptTips || 'সরাসরি প্রম্পটটি কপি করে এআই মডেলে পেস্ট করুন।',
            params: existing && existing.params ? existing.params : {},
            published: true,
            createdAt: (existing && existing.createdAt) || new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          if (existing) Object.assign(existing, savedItem);
          else promptsData.unshift(savedItem);
          promptsData = sortPostsNewestFirst(promptsData);
        } else if (type === 'tech') {
          const existing = techData.find(t => t.id === editId);
          savedItem = {
            id: editId,
            title,
            category,
            readTime,
            image: imageUrl,
            summary: excerpt || title,
            guideContent: formatAsHtml(content || excerpt),
            published: true,
            createdAt: (existing && existing.createdAt) || new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          if (existing) Object.assign(existing, savedItem);
          else techData.unshift(savedItem);
          techData = sortPostsNewestFirst(techData);
        } else if (type === 'books') {
          const existing = booksData.find(b => b.id === editId);
          savedItem = {
            id: editId,
            title,
            author: authorTool || 'ক্লাসিক লেখক',
            category,
            language: 'বাংলা অনুবাদ ও মূল',
            license: bookLicense,
            year: bookYear,
            cover: imageUrl,
            desc: excerpt || title,
            gutenbergUrl: bookUrl,
            pdfUrl: bookPdf || (existing ? existing.pdfUrl : ''),
            chapters: existing && existing.chapters && existing.chapters.length ? existing.chapters : [
              {
                heading: 'সূচনা অধ্যায় — নির্বাচিত পাঠ',
                text: content || excerpt || 'পাঠ্য টেক্সট উপলব্ধ রয়েছে।'
              }
            ],
            published: true,
            createdAt: (existing && existing.createdAt) || new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          if (existing) Object.assign(existing, savedItem);
          else booksData.unshift(savedItem);
          booksData = sortPostsNewestFirst(booksData);
        }

        if (this.isAdminAuthenticated() && savedItem) {
          await saveDocument(collectionName, editId, savedItem);
        }
        this.showToast('পোস্টের পরিবর্তন সফলভাবে Cloud Firestore-এ সংরক্ষিত হয়েছে!', 'success');
      } else {
        // CREATE MODE — সবসময় নতুন পোস্ট পেজের শীর্ষে (Top) থাকবে
        const nowIso = new Date().toISOString();
        const nowMs = Date.now();
        const newId = `${type === 'news' ? 'news' : type === 'prompts' ? 'prompt' : type === 'tech' ? 'tech' : 'book'}-${nowMs}`;

        if (type === 'news') {
          savedItem = {
            id: newId,
            title,
            category,
            date,
            readTime,
            image: imageUrl,
            excerpt: excerpt || title,
            author: authorTool || 'নেক্সোরা সম্পাদকীয়',
            content: formatAsHtml(content || excerpt),
            published: true,
            createdAt: nowIso,
            updatedAt: nowIso
          };
          newsData.unshift(savedItem);
          newsData = sortPostsNewestFirst(newsData);
        } else if (type === 'prompts') {
          savedItem = {
            id: newId,
            title,
            category,
            tool: authorTool || 'ChatGPT / Midjourney',
            desc: excerpt || title,
            promptText: promptText || excerpt || title,
            tips: promptTips || 'সরাসরি প্রম্পটটি কপি করে এআই মডেলে পেস্ট করুন।',
            params: {
              'ক্যাটাগরি': category,
              'টুল': authorTool || 'এআই ইঞ্জিন'
            },
            published: true,
            createdAt: nowIso,
            updatedAt: nowIso
          };
          promptsData.unshift(savedItem);
          promptsData = sortPostsNewestFirst(promptsData);
        } else if (type === 'tech') {
          savedItem = {
            id: newId,
            title,
            category,
            readTime,
            image: imageUrl,
            summary: excerpt || title,
            guideContent: formatAsHtml(content || excerpt),
            published: true,
            createdAt: nowIso,
            updatedAt: nowIso
          };
          techData.unshift(savedItem);
          techData = sortPostsNewestFirst(techData);
        } else if (type === 'books') {
          savedItem = {
            id: newId,
            title,
            author: authorTool || 'ক্লাসিক সাহিত্যিক',
            category,
            language: 'বাংলা সংস্করণ ও মূল',
            license: bookLicense,
            year: bookYear,
            cover: imageUrl,
            desc: excerpt || title,
            gutenbergUrl: bookUrl,
            pdfUrl: bookPdf || '',
            chapters: [
              {
                heading: 'সূচনা অধ্যায় — নির্বাচিত পাঠ',
                text: content || excerpt || 'পাঠ্য টেক্সট উপলব্ধ রয়েছে।'
              }
            ],
            published: true,
            createdAt: nowIso,
            updatedAt: nowIso
          };
          booksData.unshift(savedItem);
          booksData = sortPostsNewestFirst(booksData);
        }

        if (this.isAdminAuthenticated() && savedItem) {
          await saveDocument(collectionName, newId, savedItem);
        }
        this.showToast('নতুন পোস্ট সফলভাবে তৈরি হয়েছে এবং পেজের শীর্ষে যুক্ত হয়েছে!', 'success');
      }
    } catch (saveError) {
      console.error('Firestore save error:', saveError);
      this.showToast('লোকালে সংরক্ষিত, তবে Firestore: ' + (saveError.message || ''), 'warning');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span id="btn-submit-post-label">${editId ? 'পরিবর্তন সংরক্ষণ করুন (Update Post)' : 'পোস্ট সংরক্ষণ ও প্রকাশ করুন'}</span>
        `;
      }
    }

    // লোকাল স্টোরেজে সংরক্ষণ ও সাইট রেন্ডার (সব পেজের শীর্ষে থাকা নিশ্চিত করা)
    saveStoredPosts();
    this.renderCurrentPageContent();
    this.updateAdminStats();
    this.cancelEditPost();
    this.switchAdminTab('list');
  }

  confirmDeletePost(type, id) {
    this.ensureDeleteConfirmModalInDOM();
    this.pendingDeleteType = type;
    this.pendingDeleteId = id;

    let postTitle = '';
    const dataset = type === 'news' ? newsData : type === 'prompts' ? promptsData : type === 'tech' ? techData : booksData;
    const found = dataset.find(item => item.id === id);
    if (found) {
      postTitle = found.title;
    }

    const nameEl = document.getElementById('confirm-delete-post-title');
    if (nameEl) {
      nameEl.textContent = postTitle ? ` "${postTitle}"` : '';
    }

    this.openModal('delete-confirm-modal');
  }

  async executeConfirmedDelete() {
    if (this.pendingDeleteType && this.pendingDeleteId) {
      await this.performDelete(this.pendingDeleteType, this.pendingDeleteId);
      this.pendingDeleteType = null;
      this.pendingDeleteId = null;
    }
    this.closeModal('delete-confirm-modal');
  }

  async performDelete(type, id) {
    let deletedTitle = '';
    const collectionName = type === 'news' ? 'news' : type === 'prompts' ? 'aiPrompts' : type === 'tech' ? 'technology' : 'books';

    if (this.isAdminAuthenticated()) {
      try {
        await deleteDocument(collectionName, id);
      } catch (delErr) {
        console.error('Firestore delete error:', delErr);
      }
    }

    if (type === 'news') {
      const idx = newsData.findIndex(n => n.id === id);
      if (idx >= 0) {
        deletedTitle = newsData[idx].title;
        newsData.splice(idx, 1);
      }
    } else if (type === 'prompts') {
      const idx = promptsData.findIndex(p => p.id === id);
      if (idx >= 0) {
        deletedTitle = promptsData[idx].title;
        promptsData.splice(idx, 1);
      }
    } else if (type === 'tech') {
      const idx = techData.findIndex(t => t.id === id);
      if (idx >= 0) {
        deletedTitle = techData[idx].title;
        techData.splice(idx, 1);
      }
    } else if (type === 'books') {
      const idx = booksData.findIndex(b => b.id === id);
      if (idx >= 0) {
        deletedTitle = booksData[idx].title;
        booksData.splice(idx, 1);
      }
    }

    // বুকমার্ক থেকেও মুছে ফেলা
    const bmIdx = this.bookmarks.findIndex(b => b.id === id);
    if (bmIdx >= 0) {
      this.bookmarks.splice(bmIdx, 1);
      this.saveBookmarks();
    }

    saveStoredPosts();
    this.renderCurrentPageContent();
    this.renderAdminPostList();
    this.updateAdminStats();

    this.showToast(`"${(deletedTitle || 'পোস্ট').substring(0, 25)}..." মুছে ফেলা হয়েছে`, 'info');
  }

  deletePost(type, id) {
    this.confirmDeletePost(type, id);
  }

  resetAllPostsToDefault() {
    localStorage.removeItem('nexora_news_data');
    localStorage.removeItem('nexora_prompts_data');
    localStorage.removeItem('nexora_tech_data');
    localStorage.removeItem('nexora_books_data');

    loadStoredPosts();

    this.renderCurrentPageContent();
    this.renderAdminPostList();
    this.updateAdminStats();
    this.showToast('সব পোস্ট ডিফল্ট ডেটায় সফলভাবে রিসেট করা হয়েছে!', 'success');
  }

  // ------------------------------------------------------------------------
  // পোস্ট বাটন বিজ্ঞাপন ইন্টারসেপশন (Smartlinks Monetization on Action Buttons)
  // ------------------------------------------------------------------------
  setupPostAdInterception() {
    const self = this;
    const SMARTLINK = 'https://www.profitableratecpmnetwork.com/uk5x37ih?key=7029c8770d8362183bcf09703b7c730b';

    document.addEventListener('click', (e) => {
      // 1. Guard against admin operations and critical controls
      if (e.target.closest('.admin-modal-backdrop') || e.target.closest('.admin-toolbar')) return;
      if (e.target.closest('#admin-modal') || e.target.closest('#admin-login-modal') || e.target.closest('#delete-confirm-modal')) return;
      if (e.target.closest('.modal-close-btn') || e.target.closest('.theme-toggle-btn') || e.target.closest('.mobile-menu-btn')) return;
      if (e.target.closest('#bookmarks-trigger') || e.target.closest('#mobile-bookmarks-trigger') || e.target.closest('#search-trigger')) return;

      // 2. Guard against PDF download buttons so files download cleanly without popup interference
      if (e.target.closest('.btn-pdf-primary, .btn-pdf-download, [onclick*="downloadBookPdf"], .btn-download-pdf')) {
        return;
      }

      // 3. Identify monetized buttons (Read More, Copy Prompt, Explore, etc.)
      const monetizedBtn = e.target.closest(
        '.btn-card-readmore, .btn-read-more, .btn-copy-prompt, .btn-unlock-confirm, .ad-card-banner, .btn-hero-explore, .hero-category-quicklink, [data-smartlink="true"]'
      );

      if (monetizedBtn) {
        // If anchor already has the exact smartlink, let natural navigation handle it
        if (monetizedBtn.tagName === 'A' && monetizedBtn.href && monetizedBtn.href.includes('uk5x37ih')) {
          return;
        }

        // Trigger smartlink in new window
        self.triggerSmartlink(true);
      }
    }, true);
  }

  // ------------------------------------------------------------------------
  // অ্যাডমিন প্যানেল বিজ্ঞাপন মুক্ত রাখা (Admin Panel Ad Protection & Suppression)
  // ------------------------------------------------------------------------
  setupAdminAdShield() {
    // Shield all admin modal clicks from bubbling up to document/window popunder handlers
    ['admin-modal', 'admin-login-modal', 'delete-confirm-modal'].forEach(id => {
      const el = document.getElementById(id);
      if (el && !el.dataset.adShielded) {
        el.dataset.adShielded = 'true';
        el.addEventListener('click', (e) => {
          // Stop propagation so document/window-level ad listeners never trigger on admin clicks
          e.stopPropagation();
        });
      }
    });
  }

  suppressAdsForAdmin(active) {
    const adSelectors = [
      '[id*="profitable"]',
      '[src*="profitable"]',
      '[class*="socialbar" i]',
      '[id*="socialbar" i]',
      '[class*="social-bar" i]',
      '[id*="social-bar" i]',
      'iframe[src*="profitable"]',
      'iframe[src*="cpmnetwork"]',
      '[class*="cpmnetwork" i]',
      '[id*="cpmnetwork" i]',
      'div[style*="z-index: 2147483647"]',
      'div[style*="z-index:2147483647"]',
      '.ad-banner',
      '.ad-container'
    ];

    const toggleAds = (hide) => {
      adSelectors.forEach(sel => {
        try {
          const els = document.querySelectorAll(sel);
          els.forEach(el => {
            // Guard: never hide internal site components
            if (el.closest('.admin-modal-backdrop') && !['IFRAME', 'SCRIPT'].includes(el.tagName)) {
              return;
            }
            if (el.closest('.site-header') || el.closest('#toast-container')) {
              return;
            }
            if (hide) {
              if (!el.dataset.prevDisplay) {
                el.dataset.prevDisplay = el.style.display || '';
              }
              if (!el.dataset.prevVisibility) {
                el.dataset.prevVisibility = el.style.visibility || '';
              }
              el.style.setProperty('display', 'none', 'important');
              el.style.setProperty('visibility', 'hidden', 'important');
              el.style.setProperty('opacity', '0', 'important');
              el.style.setProperty('pointer-events', 'none', 'important');
            } else {
              el.style.display = el.dataset.prevDisplay || '';
              el.style.visibility = el.dataset.prevVisibility || '';
              el.style.opacity = '';
              el.style.pointerEvents = '';
            }
          });
        } catch (_) {}
      });
    };

    toggleAds(active);

    if (active) {
      if (!this._adminAdObserver) {
        this._adminAdObserver = new MutationObserver(() => {
          if (document.body.classList.contains('admin-panel-open')) {
            toggleAds(true);
          }
        });
        this._adminAdObserver.observe(document.body, { childList: true, subtree: true });
      }
    } else {
      if (this._adminAdObserver) {
        this._adminAdObserver.disconnect();
        this._adminAdObserver = null;
      }
    }
  }

  // ------------------------------------------------------------------------
  // পোস্ট শেয়ারিং ও পারমালিংক ইঞ্জিন (Post Sharing & Direct URL Permalink Engine)
  // ------------------------------------------------------------------------
  findPostById(id) {
    if (!id) return null;
    const cleanId = String(id).trim();
    return (newsData && newsData.find(a => String(a.id) === cleanId)) ||
           (techData && techData.find(t => String(t.id) === cleanId)) ||
           (promptsData && promptsData.find(p => String(p.id) === cleanId)) ||
           (booksData && booksData.find(b => String(b.id) === cleanId)) ||
           null;
  }

  getPostType(item) {
    if (!item) return 'article';
    if (item.guideContent || item.summary) return 'tech';
    if (item.promptText || item.tool) return 'prompt';
    if (item.cover || (item.author && item.year)) return 'book';
    return 'article';
  }

  getPostShareUrl(id, type) {
    const origin = window.location.origin;
    let path = window.location.pathname || '/';
    if (path.endsWith('index.html')) {
      path = '/';
    }
    // Respect dedicated subpages if currently browsing them
    if (type === 'article' && path.includes('news.html')) {
      path = '/news.html';
    } else if (type === 'tech' && path.includes('technology.html')) {
      path = '/technology.html';
    } else if (type === 'prompt' && path.includes('prompts.html')) {
      path = '/prompts.html';
    } else if (type === 'book' && path.includes('books.html')) {
      path = '/books.html';
    } else if (!path.endsWith('.html')) {
      path = '/';
    }
    return `${origin}${path}?post=${encodeURIComponent(id)}`;
  }

  updateUrlForPost(postId) {
    if (!postId) return;
    try {
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('post', postId);
      window.history.replaceState({ postId }, '', currentUrl.pathname + currentUrl.search);
    } catch (_) {}
  }

  shareOrCopyPost(id, type, triggerEl) {
    if (!id) return;
    const post = this.findPostById(id);
    const postTitle = post ? post.title : 'নেক্সোরা পোস্ট';
    const postUrl = this.getPostShareUrl(id, type);

    // If Web Share API is available (on mobile devices)
    if (navigator.share && /mobile|android|iphone|ipad/i.test(navigator.userAgent)) {
      navigator.share({
        title: postTitle,
        text: `${postTitle} - নেক্সোরা প্ল্যাটফর্মে পড়ুন`,
        url: postUrl
      }).then(() => {
        this.showToast('পোস্ট শেয়ার সম্পন্ন হয়েছে!', 'success');
      }).catch((err) => {
        if (err.name !== 'AbortError') {
          this.copyToClipboard(postUrl, () => {
            this.showToast('পোস্টের সরাসরি লিংক কপি করা হয়েছে!', 'success');
            this.showCopyFeedback(triggerEl);
          });
        }
      });
      return;
    }

    // Default desktop and fallback: direct clipboard copy
    this.copyToClipboard(postUrl, () => {
      this.showToast('পোস্টের সরাসরি লিংক কপি করা হয়েছে!', 'success');
      this.showCopyFeedback(triggerEl);
    });
  }

  copyDirectPostLink(id, type, triggerEl) {
    if (!id) return;
    const postUrl = this.getPostShareUrl(id, type);
    this.copyToClipboard(postUrl, () => {
      this.showToast('পোস্টের সরাসরি লিংক কপি করা হয়েছে!', 'success');
      this.showCopyFeedback(triggerEl);
    });
  }

  showCopyFeedback(btnEl) {
    if (!btnEl) return;
    const origHtml = btnEl.innerHTML;
    btnEl.innerHTML = `
      <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span>কপি হয়েছে!</span>
    `;
    btnEl.classList.add('copied');
    setTimeout(() => {
      btnEl.innerHTML = origHtml;
      btnEl.classList.remove('copied');
    }, 2200);
  }

  checkAndOpenPostFromUrl() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      let targetPostId = urlParams.get('post') || 
                         urlParams.get('id') || 
                         urlParams.get('article') || 
                         urlParams.get('tech') || 
                         urlParams.get('prompt') || 
                         urlParams.get('book');

      if (!targetPostId && window.location.hash) {
        const hash = window.location.hash.replace(/^#/, '');
        if (hash.startsWith('post-')) {
          targetPostId = hash.replace('post-', '');
        } else if (hash && !['top', 'news', 'prompts', 'tech', 'books', 'about', 'admin'].includes(hash)) {
          if (this.findPostById(hash)) {
            targetPostId = hash;
          }
        }
      }

      if (!targetPostId) return false;

      return this.openAnyPostById(targetPostId);
    } catch (e) {
      console.warn('[Nexora] Error parsing URL for post:', e);
      return false;
    }
  }

  openAnyPostById(id) {
    if (!id) return false;
    const cleanId = String(id).trim();

    // 1. News Article
    const article = newsData.find(a => String(a.id) === cleanId);
    if (article) {
      this.ensureReaderModalInDOM();
      this.openArticleReader(article.id);
      return true;
    }

    // 2. Tech Guide
    const guide = techData.find(g => String(g.id) === cleanId);
    if (guide) {
      this.ensureReaderModalInDOM();
      this.openTechReader(guide.id);
      return true;
    }

    // 3. AI Prompt
    const promptItem = promptsData.find(p => String(p.id) === cleanId);
    if (promptItem) {
      this.ensurePromptModalInDOM();
      this.openPromptModal(promptItem.id);
      return true;
    }

    // 4. Book
    const book = booksData.find(b => String(b.id) === cleanId);
    if (book) {
      this.ensureBookModalInDOM();
      this.openBookReader(book.id);
      return true;
    }

    return false;
  }

  ensureReaderModalInDOM() {
    if (document.getElementById('reader-modal')) {
      this.bindReaderModalEvents();
      return;
    }
    const markup = `
      <div class="modal-backdrop" id="reader-modal" role="dialog" aria-modal="true" aria-labelledby="reader-title" aria-hidden="true">
        <div class="modal-container reader-modal-container">
          <div class="modal-header">
            <div class="reader-meta-kicker" id="reader-kicker">সংবাদ ও বিশ্লেষণ</div>
            <button type="button" class="modal-close-btn" onclick="window.nexoraApp.closeModal('reader-modal')" aria-label="বন্ধ করুন">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <div class="modal-body reader-body" id="reader-modal-body"></div>
          <div class="modal-footer reader-footer">
            <div class="reader-footer-actions">
              <button type="button" class="btn btn-secondary" id="reader-bookmark-btn">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                <span id="reader-bookmark-text">বুকমার্কে রাখুন</span>
              </button>
              <button type="button" class="btn btn-ghost" id="reader-copy-link-btn">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                <span>লিংক শেয়ার</span>
              </button>
            </div>
            <button type="button" class="btn btn-primary" onclick="window.nexoraApp.closeModal('reader-modal')">পড়া শেষ</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', markup);
    this.bindReaderModalEvents();
  }

  ensurePromptModalInDOM() {
    if (document.getElementById('prompt-modal')) {
      this.bindPromptModalEvents();
      return;
    }
    const markup = `
      <div class="modal-backdrop" id="prompt-modal" role="dialog" aria-modal="true" aria-hidden="true">
        <div class="modal-container prompt-modal-container">
          <div class="modal-header">
            <div>
              <span class="meta-tag cyan" id="prompt-modal-cat">এআই প্রম্পট</span>
              <h3 class="modal-heading" id="prompt-modal-title">প্রম্পটের বিবরণ</h3>
            </div>
            <button type="button" class="modal-close-btn" onclick="window.nexoraApp.closeModal('prompt-modal')" aria-label="বন্ধ করুন">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <div class="modal-body" id="prompt-modal-body"></div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="prompt-modal-bookmark-btn">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
              <span id="prompt-modal-bookmark-text">প্রম্পট সংরক্ষণ</span>
            </button>
            <button type="button" class="btn btn-ghost" id="prompt-modal-share-btn">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
              <span>লিংক শেয়ার</span>
            </button>
            <button type="button" class="btn btn-primary" id="prompt-modal-copy-btn">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              <span>সম্পূর্ণ প্রম্পট কপি</span>
            </button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', markup);
    this.bindPromptModalEvents();
  }

  ensureBookModalInDOM() {
    if (document.getElementById('book-modal')) return;
    const markup = `
      <div class="modal-backdrop" id="book-modal" role="dialog" aria-modal="true" aria-hidden="true">
        <div class="modal-container book-modal-container">
          <div class="modal-header">
            <div>
              <span class="meta-tag purple" id="book-modal-license">পাবলিক ডোমেন ক্লাসিক</span>
              <h3 class="modal-heading" id="book-modal-title">বইয়ের পাঠকক্ষ</h3>
              <div class="book-modal-author" id="book-modal-author">লেখক</div>
            </div>
            <button type="button" class="modal-close-btn" onclick="window.nexoraApp.closeModal('book-modal')" aria-label="বন্ধ করুন">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <div class="modal-body book-reader-body" id="book-modal-body"></div>
          <div class="modal-footer book-reader-footer">
            <div class="book-external-actions" id="book-external-actions"></div>
            <button type="button" class="btn btn-primary" onclick="window.nexoraApp.closeModal('book-modal')">বন্ধ করুন</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', markup);
  }

  bindReaderModalEvents() {
    const readerBookmarkBtn = document.getElementById('reader-bookmark-btn');
    if (readerBookmarkBtn && !readerBookmarkBtn.dataset.bound) {
      readerBookmarkBtn.dataset.bound = 'true';
      readerBookmarkBtn.addEventListener('click', () => {
        if (this.currentReaderItem) {
          const type = this.currentReaderItem.guideContent ? 'tech' : 'article';
          this.toggleBookmark(this.currentReaderItem, type);
        }
      });
    }

    const readerCopyLinkBtn = document.getElementById('reader-copy-link-btn');
    if (readerCopyLinkBtn && !readerCopyLinkBtn.dataset.bound) {
      readerCopyLinkBtn.dataset.bound = 'true';
      readerCopyLinkBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.currentReaderItem) {
          const type = this.currentReaderItem.guideContent ? 'tech' : 'article';
          this.shareOrCopyPost(this.currentReaderItem.id, type, readerCopyLinkBtn);
        } else {
          this.copyToClipboard(window.location.href, () => {
            this.showToast('লিংক কপি করা হয়েছে!', 'success');
          });
        }
      });
    }
  }

  bindPromptModalEvents() {
    const promptModalBookmarkBtn = document.getElementById('prompt-modal-bookmark-btn');
    if (promptModalBookmarkBtn && !promptModalBookmarkBtn.dataset.bound) {
      promptModalBookmarkBtn.dataset.bound = 'true';
      promptModalBookmarkBtn.addEventListener('click', () => {
        if (this.currentPromptItem) {
          this.toggleBookmark(this.currentPromptItem, 'prompt');
        }
      });
    }

    const promptShareBtn = document.getElementById('prompt-modal-share-btn');
    if (promptShareBtn && !promptShareBtn.dataset.bound) {
      promptShareBtn.dataset.bound = 'true';
      promptShareBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.currentPromptItem) {
          this.shareOrCopyPost(this.currentPromptItem.id, 'prompt', promptShareBtn);
        }
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.nexoraApp = new NexoraApp();
});
