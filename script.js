// Cousins Day 2026 Main JavaScript Controller

document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initMobileMenu();
    initConfetti();
    initPotluck();
    initRSVP();
    initMemories();
    initAwards();
    initGuestbook();
});

/* ==========================================
   1. THANKSGIVING DAY 2026 COUNTDOWN TIMER
   ========================================== */
function initCountdown() {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    // Thanksgiving Day: Thursday, November 26, 2026 12:00:00 EST
    const targetDate = new Date(2026, 10, 26, 12, 0, 0); // Month 10 = November

    function updateTimer() {
        const now = new Date();
        const diff = targetDate - now;

        if (diff <= 0) {
            if (daysEl) daysEl.textContent = '00';
            if (hoursEl) hoursEl.textContent = '00';
            if (minutesEl) minutesEl.textContent = '00';
            if (secondsEl) secondsEl.textContent = '00';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

/* ==========================================
   2. MOBILE MENU & CONFETTI UTILS
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
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#facc15', '#a855f7', '#eab308', '#7e22ce', '#ffffff']
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
        }, 4000);
    }
}

/* ==========================================
   3. POTLUCK TRACKER
   ========================================== */
const defaultPotluckItems = [
    { name: "Cousin Maya", category: "meats", item: "Smoked Turkey & Gravy" },
    { name: "Cousin Sam", category: "sides", item: "Baked Macaroni & Cheese" },
    { name: "Cousin Jessica", category: "desserts", item: "Sweet Potato Pie & Peach Cobbler" },
    { name: "Cousin Chris", category: "drinks", item: "2 Coolers of Ice & Lemonade" },
    { name: "Cousin Alex", category: "paper", item: "Plates, Napkins & Utensils Set" }
];

function initPotluck() {
    let potluck = JSON.parse(localStorage.getItem('cousin_potluck_2026')) || defaultPotluckItems;
    const listEl = document.getElementById('potluckList');
    const formEl = document.getElementById('potluckForm');

    function renderPotluck() {
        if (!listEl) return;
        listEl.innerHTML = '';

        const catIcons = {
            meats: '🍖',
            sides: '🥗',
            desserts: '🥧',
            drinks: '🥤',
            paper: '🍽️'
        };

        potluck.forEach(p => {
            const card = document.createElement('div');
            card.className = "p-3.5 rounded-2xl bg-purple-950/70 border border-purple-800/80 flex items-center justify-between";
            card.innerHTML = `
                <div class="flex items-center gap-3">
                    <span class="text-xl">${catIcons[p.category] || '🍽️'}</span>
                    <div>
                        <div class="font-bold text-white text-sm">${p.item}</div>
                        <div class="text-xs text-purple-300">Brought by: <span class="font-bold text-gold-400">${p.name}</span></div>
                    </div>
                </div>
                <span class="text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-gold-400/20 text-gold-300 border border-gold-400/30">
                    Confirmed
                </span>
            `;
            listEl.appendChild(card);
        });
    }

    if (formEl) {
        formEl.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('potluckName').value;
            const category = document.getElementById('potluckCategory').value;
            const item = document.getElementById('potluckItem').value;

            potluck.unshift({ name, category, item });
            localStorage.setItem('cousin_potluck_2026', JSON.stringify(potluck));
            renderPotluck();
            formEl.reset();
            showToast(`Added "${item}" to the Thanksgiving Potluck! 🦃`, 'fa-utensils');
            triggerCelebrationConfetti();
        });
    }

    renderPotluck();
}

/* ==========================================
   4. RSVP FORM
   ========================================== */
function initRSVP() {
    const rsvpForm = document.getElementById('rsvpForm');
    let rsvps = JSON.parse(localStorage.getItem('cousin_rsvps_2026')) || [];

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('rsvpName').value;
            const branch = document.getElementById('rsvpBranch').value;
            const adults = document.getElementById('rsvpAdults').value;
            const kids = document.getElementById('rsvpKids').value;
            const phone = document.getElementById('rsvpPhone').value;
            const shirt = document.getElementById('rsvpShirtInterest').value;
            const note = document.getElementById('rsvpNote').value;

            const entry = { name, branch, adults, kids, phone, shirt, note, date: new Date().toISOString() };
            rsvps.push(entry);
            localStorage.setItem('cousin_rsvps_2026', JSON.stringify(rsvps));

            rsvpForm.reset();
            showToast(`RSVP Confirmed for ${name}! See you on Thanksgiving! 🦃👑`, 'fa-circle-check');
            triggerCelebrationConfetti();
        });
    }
}

/* ==========================================
   5. MEMORY VAULT
   ========================================== */
const defaultMemories = [
    {
        id: 1,
        title: "Beach Day at Carlin Park",
        author: "Cousin Maya",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        story: "Fun in the sun! Can't wait to be back beachfront for Thanksgiving 2026.",
        likes: 24,
        date: "2025"
    },
    {
        id: 2,
        title: "Family Reunion Group Photo",
        author: "Cousin Sam",
        image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80",
        story: "50+ family members across generations showing up strong!",
        likes: 38,
        date: "2025"
    },
    {
        id: 3,
        title: "Cookout & Bounce House Fun",
        author: "Cousin Alex",
        image: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=800&q=80",
        story: "Laughter, music, and the kids bouncing all day long.",
        likes: 19,
        date: "2025"
    }
];

function initMemories() {
    let memories = JSON.parse(localStorage.getItem('cousin_memories_2026')) || defaultMemories;
    const memoryGrid = document.getElementById('memoryGrid');

    function renderMemories() {
        if (!memoryGrid) return;
        memoryGrid.innerHTML = '';

        memories.forEach(m => {
            const card = document.createElement('div');
            card.className = "bg-purple-950/80 border border-purple-800/80 rounded-2xl overflow-hidden shadow-lg hover:border-gold-400 transition-all flex flex-col group";
            card.innerHTML = `
                <div class="relative h-48 overflow-hidden bg-slate-950 cursor-pointer" onclick="openLightbox('${m.image.replace(/'/g, "\\'")}', '${m.title.replace(/'/g, "\\'")}', '${m.story.replace(/'/g, "\\'")}')">
                    <img src="${m.image}" alt="${m.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
                </div>
                <div class="p-5 flex-1 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between text-xs text-purple-300 mb-1">
                            <span class="font-extrabold text-gold-400">${m.author}</span>
                            <span>${m.date}</span>
                        </div>
                        <h3 class="font-heading text-2xl text-white group-hover:text-gold-400 transition-colors">${m.title}</h3>
                        <p class="text-slate-300 text-xs mt-1 leading-relaxed">${m.story}</p>
                    </div>
                </div>
            `;
            memoryGrid.appendChild(card);
        });
    }

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
            const userImg = document.getElementById('memImage').value;
            const story = document.getElementById('memStory').value;

            const fallback = "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80";
            memories.unshift({
                id: Date.now(),
                title,
                author: "You (Cousin)",
                image: userImg.trim() || fallback,
                story,
                likes: 1,
                date: "2026"
            });

            localStorage.setItem('cousin_memories_2026', JSON.stringify(memories));
            renderMemories();
            memoryModal.classList.add('hidden');
            memoryForm.reset();
            showToast("Memory photo saved!", "fa-circle-check");
            triggerCelebrationConfetti();
        });
    }

    window.openLightbox = function(image, title, desc) {
        const modal = document.getElementById('lightboxModal');
        const imgEl = document.getElementById('lightboxImg');
        const titleEl = document.getElementById('lightboxTitle');
        const descEl = document.getElementById('lightboxDesc');

        if (imgEl && titleEl && descEl && modal) {
            imgEl.src = image;
            titleEl.textContent = title;
            descEl.textContent = desc;
            modal.classList.remove('hidden');
        }
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
   6. SUPERLATIVE AWARDS
   ========================================== */
const defaultAwards = [
    {
        id: "bougie",
        title: "The Bougie Cousin Award 👑",
        desc: "Who arrives in the best outfit with top tier style?",
        options: [
            { name: "Cousin Maya", votes: 19 },
            { name: "Cousin Jessica", votes: 12 },
            { name: "Cousin Taylor", votes: 7 }
        ]
    },
    {
        id: "fafo",
        title: "The FAFO Cousin Award ⚡",
        desc: "Who has zero fear and keeps everyone laughing?",
        options: [
            { name: "Cousin Chris", votes: 24 },
            { name: "Cousin Alex", votes: 11 },
            { name: "Cousin Jordan", votes: 8 }
        ]
    },
    {
        id: "faith",
        title: "The Faithfilled Cousin Award 🙏",
        desc: "Who brings the blessings, grace, and encouraging prayers?",
        options: [
            { name: "Cousin Sam", votes: 22 },
            { name: "Cousin David", votes: 14 },
            { name: "Cousin Maya", votes: 9 }
        ]
    }
];

function initAwards() {
    let awards = JSON.parse(localStorage.getItem('cousin_awards_2026')) || defaultAwards;
    const grid = document.getElementById('awardsGrid');

    function renderAwards() {
        if (!grid) return;
        grid.innerHTML = '';

        awards.forEach(award => {
            const totalVotes = award.options.reduce((acc, curr) => acc + curr.votes, 0);

            const card = document.createElement('div');
            card.className = "bg-purple-950/80 border border-purple-800/80 rounded-2xl p-6 shadow-xl flex flex-col justify-between";
            
            let optionsHTML = '';
            award.options.forEach((opt, idx) => {
                const percent = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
                optionsHTML += `
                    <div class="space-y-1">
                        <div class="flex items-center justify-between text-xs font-bold text-purple-200">
                            <span>${opt.name}</span>
                            <span class="text-gold-400">${opt.votes} votes (${percent}%)</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="flex-1 h-2.5 rounded-full bg-slate-950 overflow-hidden border border-purple-800">
                                <div class="h-full bg-gradient-to-r from-gold-400 to-amber-500 vote-bar-fill" style="width: ${percent}%"></div>
                            </div>
                            <button onclick="voteAward('${award.id}', ${idx})" class="px-3 py-1 rounded-lg bg-gold-400 hover:bg-gold-500 text-slate-950 text-xs font-extrabold transition-all">
                                Vote
                            </button>
                        </div>
                    </div>
                `;
            });

            card.innerHTML = `
                <div>
                    <h3 class="font-heading text-2xl text-white mb-1">${award.title}</h3>
                    <p class="text-purple-300 text-xs mb-4">${award.desc}</p>
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
            localStorage.setItem('cousin_awards_2026', JSON.stringify(awards));
            renderAwards();
            showToast(`Vote cast for ${targetAward.options[optIdx].name}! 🏆`, 'fa-trophy');
        }
    };

    renderAwards();
}

/* ==========================================
   7. GUESTBOOK SHOUTOUTS
   ========================================== */
const defaultShoutouts = [
    {
        id: 1,
        author: "Cousin Jordan",
        emoji: "🥳",
        message: "Can't wait for Thanksgiving at Carlin Park! See everyone at the Laurie Schobelock Pavilion!",
        time: "Recently"
    },
    {
        id: 2,
        author: "Cousin Taylor",
        emoji: "👑",
        message: "Got my Bougie Cousin shirt ordered! Calling 561-660-9010 today!",
        time: "Recently"
    }
];

function initGuestbook() {
    let shoutouts = JSON.parse(localStorage.getItem('cousin_shoutouts_2026')) || defaultShoutouts;
    const feed = document.getElementById('guestbookFeed');
    const form = document.getElementById('guestbookForm');

    function renderShoutouts() {
        if (!feed) return;
        feed.innerHTML = '';
        shoutouts.forEach(s => {
            const card = document.createElement('div');
            card.className = "bg-purple-950/80 border border-purple-800/80 rounded-2xl p-5 shadow-lg flex items-start gap-4";
            card.innerHTML = `
                <div class="w-12 h-12 rounded-xl bg-slate-950 border border-purple-700 flex items-center justify-center text-2xl flex-shrink-0">
                    ${s.emoji}
                </div>
                <div class="flex-1">
                    <div class="flex items-center justify-between">
                        <h4 class="font-heading text-xl text-white">${s.author}</h4>
                        <span class="text-[11px] text-purple-300">${s.time}</span>
                    </div>
                    <p class="text-slate-300 text-xs mt-1 leading-relaxed">${s.message}</p>
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

            shoutouts.unshift({
                id: Date.now(),
                author,
                emoji,
                message,
                time: "Just now"
            });

            localStorage.setItem('cousin_shoutouts_2026', JSON.stringify(shoutouts));
            renderShoutouts();
            form.reset();
            showToast("Shoutout posted!", "fa-paper-plane");
        });
    }

    renderShoutouts();
}
