// Cousins Day Main JavaScript Controller

document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initMobileMenu();
    initConfetti();
    initMemories();
    initAwards();
    initQuiz();
    initRSVP();
    initGuestbook();
});

/* ==========================================
   1. COUNTDOWN TIMER
   ========================================== */
function initCountdown() {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function getNextCousinsDay() {
        const now = new Date();
        let currentYear = now.getFullYear();
        let cousinsDay = new Date(currentYear, 6, 24, 0, 0, 0); // July 24th (Month index 6)

        if (now > cousinsDay) {
            cousinsDay = new Date(currentYear + 1, 6, 24, 0, 0, 0);
        }
        return cousinsDay;
    }

    const targetDate = getNextCousinsDay();

    function updateTimer() {
        const now = new Date();
        const diff = targetDate - now;

        if (diff <= 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

/* ==========================================
   2. MOBILE MENU & UTILS
   ========================================== */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

function initConfetti() {
    const celebrateBtn = document.getElementById('triggerConfettiBtn');
    if (celebrateBtn) {
        celebrateBtn.addEventListener('click', triggerCelebrationConfetti);
    }
}

function triggerCelebrationConfetti() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#f97316', '#8b5cf6', '#f59e0b', '#10b981', '#ec4899']
        });
    }
}

function showToast(message, icon = 'fa-circle-check') {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    const toastIcon = document.getElementById('toastIcon');

    if (toast && toastMsg && toastIcon) {
        toastIcon.innerHTML = `<i class="fa-solid ${icon}"></i>`;
        toastMsg.textContent = message;
        toast.classList.remove('hidden');

        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3500);
    }
}

/* ==========================================
   3. MEMORY VAULT & GALLERY
   ========================================== */
const defaultMemories = [
    {
        id: 1,
        title: "Summer Lake House Trip",
        category: "reunions",
        author: "Cousin Maya",
        image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80",
        story: "Late night bonfires, canoe races, and laughing until our stomachs hurt. Best reunion weekend ever!",
        likes: 18,
        date: "July 2025"
    },
    {
        id: 2,
        title: "90s Birthday Throwback",
        category: "throwbacks",
        author: "Cousin Sam",
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
        story: "Matching outfits and bowl cuts! Look how small we all were. Who remembers the giant ice cream cake?",
        likes: 24,
        date: "August 1999"
    },
    {
        id: 3,
        title: "Mountain Hiking Adventure",
        category: "adventures",
        author: "Cousin Alex",
        image: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=800&q=80",
        story: "Reached the summit after 4 hours! We almost took a wrong turn twice, but we made it together.",
        likes: 15,
        date: "October 2024"
    },
    {
        id: 4,
        title: "Christmas Cookie Bakeoff",
        category: "holidays",
        author: "Cousin Jessica",
        image: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&w=800&q=80",
        story: "Flour was literally everywhere in Grandma's kitchen. The star cookies were slightly burnt, but packed with love!",
        likes: 21,
        date: "December 2024"
    },
    {
        id: 5,
        title: "Beach Volleyball Tournament",
        category: "reunions",
        author: "Cousin David",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        story: "Team East Coast vs Team West Coast! The trophy was a painted coconut.",
        likes: 30,
        date: "July 2024"
    },
    {
        id: 6,
        title: "Road Trip to Grand Canyon",
        category: "adventures",
        author: "Cousin Chris",
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
        story: "Packed 5 cousins in one SUV with a playlist of 2000s throwbacks on repeat for 8 hours.",
        likes: 27,
        date: "May 2025"
    }
];

function initMemories() {
    let memories = JSON.parse(localStorage.getItem('cousin_memories')) || defaultMemories;
    let currentFilter = 'all';

    const memoryGrid = document.getElementById('memoryGrid');
    const filterBtns = document.querySelectorAll('#memoryFilters .filter-btn');

    function renderMemories() {
        memoryGrid.innerHTML = '';
        const filtered = currentFilter === 'all' 
            ? memories 
            : memories.filter(m => m.category === currentFilter);

        filtered.forEach(m => {
            const card = document.createElement('div');
            card.className = "bg-slate-800/80 border border-slate-700/70 rounded-2xl overflow-hidden shadow-lg hover:border-brand-500/50 transition-all flex flex-col group";
            card.innerHTML = `
                <div class="relative h-48 overflow-hidden bg-slate-900 cursor-pointer text-left" onclick="openLightbox('${m.image.replace(/'/g, "\\'")}', '${m.title.replace(/'/g, "\\'")}', '${m.story.replace(/'/g, "\\'")}')">
                    <img src="${m.image}" alt="${m.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
                    <span class="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur-sm text-brand-400 border border-slate-700">
                        ${m.category}
                    </span>
                </div>
                <div class="p-5 flex-1 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between text-xs text-slate-400 mb-1">
                            <span class="font-semibold text-amber-400"><i class="fa-solid fa-user-heart mr-1"></i>${m.author}</span>
                            <span>${m.date}</span>
                        </div>
                        <h3 class="text-lg font-bold font-heading text-white group-hover:text-brand-400 transition-colors">${m.title}</h3>
                        <p class="text-slate-300 text-sm mt-2 line-clamp-3 leading-relaxed">${m.story}</p>
                    </div>
                    <div class="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between">
                        <button onclick="likeMemory(${m.id})" class="text-xs font-semibold text-slate-400 hover:text-red-400 transition-colors flex items-center gap-1.5">
                            <i class="fa-solid fa-heart text-red-500"></i> <span id="like-count-${m.id}">${m.likes}</span> Likes
                        </button>
                        <button onclick="openLightbox('${m.image.replace(/'/g, "\\'")}', '${m.title.replace(/'/g, "\\'")}', '${m.story.replace(/'/g, "\\'")}')" class="text-xs font-bold text-brand-400 hover:underline">
                            View Full <i class="fa-solid fa-arrow-right text-[10px]"></i>
                        </button>
                    </div>
                </div>
            `;
            memoryGrid.appendChild(card);
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active', 'bg-brand-500', 'text-slate-900'));
            filterBtns.forEach(b => b.classList.add('bg-slate-800', 'text-slate-300'));
            btn.classList.add('active', 'bg-brand-500', 'text-slate-900');
            btn.classList.remove('bg-slate-800', 'text-slate-300');
            currentFilter = btn.getAttribute('data-filter');
            renderMemories();
        });
    });

    // Add memory modal logic
    const addMemoryBtn = document.getElementById('addMemoryBtn');
    const memoryModal = document.getElementById('memoryModal');
    const closeMemoryModal = document.getElementById('closeMemoryModal');
    const memoryForm = document.getElementById('memoryForm');

    if (addMemoryBtn && memoryModal && closeMemoryModal && memoryForm) {
        addMemoryBtn.addEventListener('click', () => memoryModal.classList.remove('hidden'));
        closeMemoryModal.addEventListener('click', () => memoryModal.classList.add('hidden'));

        memoryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('memTitle').value;
            const category = document.getElementById('memCategory').value;
            const userImg = document.getElementById('memImage').value;
            const story = document.getElementById('memStory').value;

            const randomPlaceholders = [
                "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80"
            ];

            const newMem = {
                id: Date.now(),
                title: title,
                category: category,
                author: "You (Cousin)",
                image: userImg.trim() || randomPlaceholders[Math.floor(Math.random() * randomPlaceholders.length)],
                story: story,
                likes: 1,
                date: "Just Now"
            };

            memories.unshift(newMem);
            localStorage.setItem('cousin_memories', JSON.stringify(memories));
            renderMemories();
            memoryModal.classList.add('hidden');
            memoryForm.reset();
            showToast("Memory saved to vault!", "fa-circle-check");
            triggerCelebrationConfetti();
        });
    }

    window.likeMemory = function(id) {
        const mem = memories.find(m => m.id === id);
        if (mem) {
            mem.likes += 1;
            document.getElementById(`like-count-${id}`).textContent = mem.likes;
            localStorage.setItem('cousin_memories', JSON.stringify(memories));
            showToast(`Liked "${mem.title}"! ❤️`, "fa-heart");
        }
    };

    window.openLightbox = function(image, title, desc) {
        const modal = document.getElementById('lightboxModal');
        const imgEl = document.getElementById('lightboxImg');
        const titleEl = document.getElementById('lightboxTitle');
        const descEl = document.getElementById('lightboxDesc');

        imgEl.src = image;
        titleEl.textContent = title;
        descEl.textContent = desc;
        modal.classList.remove('hidden');
    };

    const closeLightboxBtn = document.getElementById('closeLightboxBtn');
    const lightboxModal = document.getElementById('lightboxModal');
    if (closeLightboxBtn && lightboxModal) {
        closeLightboxBtn.addEventListener('click', () => lightboxModal.classList.add('hidden'));
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) lightboxModal.classList.add('hidden');
        });
    }

    renderMemories();
}

/* ==========================================
   4. COUSIN HALL OF FAME AWARDS
   ========================================== */
const defaultAwards = [
    {
        id: "host",
        title: "Reunion Host Champion 🏠",
        desc: "Who always opens up their home or organizes the venue?",
        options: [
            { name: "Cousin Maya", votes: 14 },
            { name: "Cousin Sam", votes: 9 },
            { name: "Cousin Alex", votes: 5 }
        ]
    },
    {
        id: "comedian",
        title: "The Family Comedian 🎭",
        desc: "Who makes everyone burst into laughter at the dinner table?",
        options: [
            { name: "Cousin Chris", votes: 21 },
            { name: "Cousin David", votes: 12 },
            { name: "Cousin Taylor", votes: 6 }
        ]
    },
    {
        id: "grill",
        title: "Master Chef & Grill Master 🍔",
        desc: "Who is in charge of the barbecue grill and secret sauces?",
        options: [
            { name: "Uncle/Cousin Marcus", votes: 19 },
            { name: "Cousin Jessica", votes: 11 },
            { name: "Cousin Jordan", votes: 4 }
        ]
    },
    {
        id: "gamer",
        title: "Board Game & Arcade Boss 🎮",
        desc: "Who never loses at Mario Kart or Monopoly?",
        options: [
            { name: "Cousin Alex", votes: 17 },
            { name: "Cousin Sam", votes: 13 },
            { name: "Cousin Chris", votes: 8 }
        ]
    },
    {
        id: "adventurer",
        title: "Spontaneous Adventurer 🏕️",
        desc: "Who proposes midnight beach walks or road trips?",
        options: [
            { name: "Cousin Jordan", votes: 18 },
            { name: "Cousin Maya", votes: 10 },
            { name: "Cousin David", votes: 7 }
        ]
    },
    {
        id: "memory",
        title: "The Memory Keeper 📸",
        desc: "Who takes 500 photos and videos at every family gathering?",
        options: [
            { name: "Cousin Jessica", votes: 25 },
            { name: "Cousin Taylor", votes: 8 },
            { name: "Cousin Sam", votes: 3 }
        ]
    }
];

function initAwards() {
    let awards = JSON.parse(localStorage.getItem('cousin_awards')) || defaultAwards;
    const grid = document.getElementById('awardsGrid');

    function renderAwards() {
        grid.innerHTML = '';
        awards.forEach(award => {
            const totalVotes = award.options.reduce((acc, curr) => acc + curr.votes, 0);

            const card = document.createElement('div');
            card.className = "bg-slate-800/80 border border-slate-700/70 rounded-2xl p-6 shadow-xl flex flex-col justify-between";
            
            let optionsHTML = '';
            award.options.forEach((opt, idx) => {
                const percent = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
                optionsHTML += `
                    <div class="space-y-1">
                        <div class="flex items-center justify-between text-xs font-semibold text-slate-300">
                            <span>${opt.name}</span>
                            <span class="text-amber-400">${opt.votes} votes (${percent}%)</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="flex-1 h-2 rounded-full bg-slate-900 overflow-hidden">
                                <div class="h-full bg-gradient-to-r from-brand-500 to-amber-400 vote-bar-fill" style="width: ${percent}%"></div>
                            </div>
                            <button onclick="voteAward('${award.id}', ${idx})" class="px-2.5 py-1 rounded-lg bg-slate-700 hover:bg-brand-500 hover:text-slate-900 text-slate-200 text-xs font-bold transition-all">
                                Vote
                            </button>
                        </div>
                    </div>
                `;
            });

            card.innerHTML = `
                <div>
                    <h3 class="text-lg font-bold font-heading text-white mb-1">${award.title}</h3>
                    <p class="text-slate-400 text-xs mb-4">${award.desc}</p>
                    <div class="space-y-3">
                        ${optionsHTML}
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    window.voteAward = function(awardId, optIdx) {
        const targetAward = awards.find(a => a.id === awardId);
        if (targetAward && targetAward.options[optIdx]) {
            targetAward.options[optIdx].votes += 1;
            localStorage.setItem('cousin_awards', JSON.stringify(awards));
            renderAwards();
            showToast(`Vote cast for ${targetAward.options[optIdx].name}! 🏆`, 'fa-trophy');
        }
    };

    renderAwards();
}

/* ==========================================
   5. QUIZ LOGIC
   ========================================== */
const quizData = [
    {
        question: "It's Friday night at the cousin reunion. Where can everyone find you?",
        options: [
            { text: "At the center of the living room telling hilarious stories", archetype: "party" },
            { text: "Planning tomorrow's itinerary & checking supply lists", archetype: "catalyst" },
            { text: "Organizing an impromptu volleyball game or hike", archetype: "adventurer" },
            { text: "Lounging in a comfortable chair with snacks and catching up 1-on-1", archetype: "chill" }
        ]
    },
    {
        question: "Your cousin texts the group chat asking for help with a last-minute project. You:",
        options: [
            { text: "Reply immediately with 10 funny GIFs and cheer them on", archetype: "party" },
            { text: "Create a shared spreadsheet and assign helpful tasks", archetype: "catalyst" },
            { text: "Hop in the car and drive straight over to assist", archetype: "adventurer" },
            { text: "Send a sweet supportive text and bring over favorite coffee", archetype: "chill" }
        ]
    },
    {
        question: "What's your primary role in the cousin group chat?",
        options: [
            { text: "Posting memes, inside jokes, and viral videos", archetype: "party" },
            { text: "Sending reminders for upcoming birthdays and anniversaries", archetype: "catalyst" },
            { text: "Sharing random photos of outdoor views & travel ideas", archetype: "adventurer" },
            { text: "Quietly reading everything and hearting everyone's messages", archetype: "chill" }
        ]
    },
    {
        question: "Pick your ultimate dream cousin activity:",
        options: [
            { text: "Late-night karaoke and dance party", archetype: "party" },
            { text: "Annual cabin weekend getaway with custom T-shirts", archetype: "catalyst" },
            { text: "Amusement park rollercoasters or camping out under stars", archetype: "adventurer" },
            { text: "Cozy movie marathon with giant pizzas & popcorn", archetype: "chill" }
        ]
    }
];

const archetypes = {
    party: {
        title: "The Life of the Party 🥳",
        emoji: "🥳",
        desc: "You bring instant high energy, non-stop laughter, and top-tier entertainment to every cousin gathering!"
    },
    catalyst: {
        title: "The Mastermind & Organizer 📋",
        emoji: "📋",
        desc: "Without you, family reunions wouldn't happen! You keep everyone connected, on schedule, and well-fed."
    },
    adventurer: {
        title: "The Thrill-Seeking Adventurer 🏕️",
        emoji: "🏕️",
        desc: "Spontaneous trips, outdoor quests, and bold ideas are your specialty. You push cousins out of their comfort zone!"
    },
    chill: {
        title: "The Unconditional Comfort Cousin ☕",
        emoji: "☕",
        desc: "You are the warm, relaxed presence everyone loves talking to. Always ready with good vibes, advice, and great snacks."
    }
};

function initQuiz() {
    let currentQ = 0;
    const scores = { party: 0, catalyst: 0, adventurer: 0, chill: 0 };

    const quizQuestionEl = document.getElementById('quizQuestion');
    const quizContainer = document.getElementById('quizContainer');
    const quizResult = document.getElementById('quizResult');
    const restartQuizBtn = document.getElementById('restartQuizBtn');

    function renderQuestion() {
        const q = quizData[currentQ];
        let optionsHTML = '';

        q.options.forEach((opt, idx) => {
            optionsHTML += `
                <button onclick="selectQuizOption('${opt.archetype}')" class="w-full text-left p-4 rounded-2xl bg-slate-900 border border-slate-700/80 hover:border-brand-500 hover:bg-slate-800 text-slate-200 hover:text-white font-medium text-sm transition-all flex items-center justify-between group">
                    <span>${opt.text}</span>
                    <i class="fa-solid fa-chevron-right text-slate-500 group-hover:text-brand-400 transition-colors"></i>
                </button>
            `;
        });

        quizQuestionEl.innerHTML = `
            <div class="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                <span>Question ${currentQ + 1} of ${quizData.length}</span>
                <span>${Math.round(((currentQ + 1) / quizData.length) * 100)}% Complete</span>
            </div>
            <h3 class="text-xl font-bold font-heading text-white mb-4">${q.question}</h3>
            <div class="space-y-3">
                ${optionsHTML}
            </div>
        `;
    }

    window.selectQuizOption = function(arch) {
        scores[arch] = (scores[arch] || 0) + 1;
        currentQ++;

        if (currentQ < quizData.length) {
            renderQuestion();
        } else {
            showResult();
        }
    };

    function showResult() {
        quizContainer.classList.add('hidden');
        quizResult.classList.remove('hidden');

        // Determine top archetype
        let topArch = 'party';
        let maxScore = -1;
        for (const [key, val] of Object.entries(scores)) {
            if (val > maxScore) {
                maxScore = val;
                topArch = key;
            }
        }

        const res = archetypes[topArch];
        document.getElementById('resultEmoji').textContent = res.emoji;
        document.getElementById('resultTitle').textContent = res.title;
        document.getElementById('resultDesc').textContent = res.desc;

        triggerCelebrationConfetti();
    }

    if (restartQuizBtn) {
        restartQuizBtn.addEventListener('click', () => {
            currentQ = 0;
            for (let k in scores) scores[k] = 0;
            quizResult.classList.add('hidden');
            quizContainer.classList.remove('hidden');
            renderQuestion();
        });
    }

    renderQuestion();
}

/* ==========================================
   6. RSVP FORM
   ========================================== */
function initRSVP() {
    const rsvpForm = document.getElementById('rsvpForm');
    const rsvpCounterBadge = document.getElementById('rsvpCounterBadge');
    
    let rsvpList = JSON.parse(localStorage.getItem('cousin_rsvps')) || [
        { name: "Cousin Maya", guests: 2 },
        { name: "Cousin Sam", guests: 1 },
        { name: "Cousin Alex", guests: 3 }
    ];

    function updateCounter() {
        const total = rsvpList.reduce((acc, curr) => acc + parseInt(curr.guests || 1), 0);
        if (rsvpCounterBadge) {
            rsvpCounterBadge.textContent = `${total + 8} Attending`;
        }
    }

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('rsvpName').value;
            const guests = parseInt(document.getElementById('rsvpGuests').value);
            const dish = document.getElementById('rsvpDish').value;

            rsvpList.push({ name, guests, dish });
            localStorage.setItem('cousin_rsvps', JSON.stringify(rsvpList));

            updateCounter();
            rsvpForm.reset();
            showToast(`RSVP confirmed for ${name}! See you at the reunion! 🎉`, 'fa-calendar-check');
            triggerCelebrationConfetti();
        });
    }

    updateCounter();
}

/* ==========================================
   7. COUSIN GUESTBOOK SHOUTOUTS
   ========================================== */
const defaultShoutouts = [
    {
        id: 1,
        author: "Cousin Jordan",
        emoji: "🥳",
        message: "Can't wait for July 24th! Bringing the cornhole set and my famous potato salad!",
        time: "2 hours ago"
    },
    {
        id: 2,
        author: "Cousin Taylor",
        emoji: "😎",
        message: "Huge shoutout to Cousin Jessica for keeping our memory vault updated with all those epic throwbacks!",
        time: "Yesterday"
    },
    {
        id: 3,
        author: "Cousin Chris",
        emoji: "🔥",
        message: "Best cousins in the world! So thankful we all stayed close over the years.",
        time: "3 days ago"
    }
];

function initGuestbook() {
    let shoutouts = JSON.parse(localStorage.getItem('cousin_shoutouts')) || defaultShoutouts;
    const feed = document.getElementById('guestbookFeed');
    const form = document.getElementById('guestbookForm');

    function renderShoutouts() {
        feed.innerHTML = '';
        shoutouts.forEach(s => {
            const card = document.createElement('div');
            card.className = "bg-slate-800/80 border border-slate-700/70 rounded-2xl p-5 shadow-lg flex items-start gap-4";
            card.innerHTML = `
                <div class="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-2xl flex-shrink-0">
                    ${s.emoji}
                </div>
                <div class="flex-1">
                    <div class="flex items-center justify-between">
                        <h4 class="font-bold text-white font-heading text-sm">${s.author}</h4>
                        <span class="text-[11px] text-slate-400">${s.time}</span>
                    </div>
                    <p class="text-slate-300 text-sm mt-1 leading-relaxed">${s.message}</p>
                </div>
            `;
            feed.appendChild(card);
        });
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const author = document.getElementById('gbAuthor').value;
            const emoji = document.getElementById('gbEmoji').value;
            const message = document.getElementById('gbMessage').value;

            const newShoutout = {
                id: Date.now(),
                author,
                emoji,
                message,
                time: "Just now"
            };

            shoutouts.unshift(newShoutout);
            localStorage.setItem('cousin_shoutouts', JSON.stringify(shoutouts));
            renderShoutouts();
            form.reset();
            showToast("Shoutout posted to the wall!", "fa-paper-plane");
        });
    }

    renderShoutouts();
}
