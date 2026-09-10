// Cousins Day 2026 Main JavaScript Controller

document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initMobileMenu();
    initConfetti();
    initPotluck();
    initRSVP();
    initGuestbook();
});

/* ==========================================
   1. COUSINS DAY 2026 COUNTDOWN TIMER
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
   2. CASH APP COPY UTILITY
   ========================================== */
function copyCashtag() {
    const cashtag = "$MyCousinsDay";
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(cashtag).then(() => {
            showToast(`${cashtag} copied to clipboard! 📋`, 'fa-copy');
        }).catch(() => {
            fallbackCopy(cashtag);
        });
    } else {
        fallbackCopy(cashtag);
    }
}

function fallbackCopy(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        showToast(`${text} copied to clipboard! 📋`, 'fa-copy');
    } catch (err) {
        showToast(`Cashtag: ${text}`, 'fa-dollar-sign');
    }
    document.body.removeChild(textArea);
}

/* ==========================================
   3. MOBILE MENU & CONFETTI UTILS
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
            colors: ['#00D632', '#facc15', '#a855f7', '#eab308', '#25D366', '#ffffff']
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
   4. POTLUCK TRACKER (Clean Initial State)
   ========================================== */
function initPotluck() {
    let potluck = JSON.parse(localStorage.getItem('cousin_potluck_2026')) || [];
    const listEl = document.getElementById('potluckList');
    const formEl = document.getElementById('potluckForm');

    function renderPotluck() {
        if (!listEl) return;
        listEl.innerHTML = '';

        if (potluck.length === 0) {
            listEl.innerHTML = `
                <div class="text-center py-8 px-4 bg-purple-950/40 rounded-2xl border border-purple-800/60">
                    <span class="text-3xl">🥧</span>
                    <p class="text-purple-200 text-sm font-bold mt-2">No potluck items claimed yet!</p>
                    <p class="text-purple-300 text-xs mt-1">Be the first cousin to sign up for a dish or supply on the left.</p>
                </div>
            `;
            return;
        }

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
            showToast(`Added "${item}" to the Cousins Day Potluck List! 🥧`, 'fa-utensils');
            triggerCelebrationConfetti();
        });
    }

    renderPotluck();
}

/* ==========================================
   5. DYNAMIC RSVP FORM WITH ATTENDEE NAMES
   ========================================== */
function initRSVP() {
    const rsvpForm = document.getElementById('rsvpForm');
    const adultsSelect = document.getElementById('rsvpAdults');
    const kidsSelect = document.getElementById('rsvpKids');
    const additionalAdultsContainer = document.getElementById('additionalAdultsContainer');
    const additionalKidsContainer = document.getElementById('additionalKidsContainer');

    let rsvps = JSON.parse(localStorage.getItem('cousin_rsvps_2026')) || [];

    function updateAdultNameFields() {
        if (!additionalAdultsContainer || !adultsSelect) return;
        const count = parseInt(adultsSelect.value) || 1;
        additionalAdultsContainer.innerHTML = '';

        if (count > 1) {
            let html = `<div class="p-3 bg-purple-950/40 rounded-xl border border-purple-800/60 space-y-3">
                <span class="text-xs font-bold uppercase tracking-wider text-gold-400 block"><i class="fa-solid fa-user-group mr-1"></i> Additional Adult Attendees</span>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">`;

            for (let i = 2; i <= count; i++) {
                html += `
                    <div>
                        <label class="block text-[11px] font-semibold text-purple-200 mb-1" for="adult_name_${i}">Adult ${i} Full Name</label>
                        <input type="text" id="adult_name_${i}" required placeholder="Full Name for Adult ${i}" class="w-full px-3 py-2 rounded-lg bg-slate-950 border border-purple-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-gold-400">
                    </div>
                `;
            }
            html += `</div></div>`;
            additionalAdultsContainer.innerHTML = html;
        }
    }

    function updateKidsNameFields() {
        if (!additionalKidsContainer || !kidsSelect) return;
        const count = parseInt(kidsSelect.value) || 0;
        additionalKidsContainer.innerHTML = '';

        if (count > 0) {
            let html = `<div class="p-3 bg-purple-950/40 rounded-xl border border-purple-800/60 space-y-3">
                <span class="text-xs font-bold uppercase tracking-wider text-gold-400 block"><i class="fa-solid fa-child mr-1"></i> Child Attendees</span>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">`;

            for (let i = 1; i <= count; i++) {
                html += `
                    <div>
                        <label class="block text-[11px] font-semibold text-purple-200 mb-1" for="child_name_${i}">Child ${i} Name</label>
                        <input type="text" id="child_name_${i}" required placeholder="Name for Child ${i}" class="w-full px-3 py-2 rounded-lg bg-slate-950 border border-purple-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-gold-400">
                    </div>
                `;
            }
            html += `</div></div>`;
            additionalKidsContainer.innerHTML = html;
        }
    }

    if (adultsSelect) adultsSelect.addEventListener('change', updateAdultNameFields);
    if (kidsSelect) kidsSelect.addEventListener('change', updateKidsNameFields);

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const primaryName = document.getElementById('rsvpName').value;
            const branch = document.getElementById('rsvpBranch').value;
            const adultsCount = parseInt(adultsSelect.value) || 1;
            const kidsCount = parseInt(kidsSelect.value) || 0;
            const phone = document.getElementById('rsvpPhone').value;
            const note = document.getElementById('rsvpNote').value;

            // Harvest adult names
            const adultNames = [primaryName];
            for (let i = 2; i <= adultsCount; i++) {
                const input = document.getElementById(`adult_name_${i}`);
                if (input && input.value.trim()) {
                    adultNames.push(input.value.trim());
                }
            }

            // Harvest child names
            const childNames = [];
            for (let i = 1; i <= kidsCount; i++) {
                const input = document.getElementById(`child_name_${i}`);
                if (input && input.value.trim()) {
                    childNames.push(input.value.trim());
                }
            }

            const entry = {
                primaryName,
                branch,
                adultsCount,
                kidsCount,
                adultNames,
                childNames,
                phone,
                note,
                date: new Date().toISOString()
            };

            rsvps.push(entry);
            localStorage.setItem('cousin_rsvps_2026', JSON.stringify(rsvps));

            rsvpForm.reset();
            if (additionalAdultsContainer) additionalAdultsContainer.innerHTML = '';
            if (additionalKidsContainer) additionalKidsContainer.innerHTML = '';

            const totalCount = adultNames.length + childNames.length;
            showToast(`RSVP Confirmed for ${primaryName} (${totalCount} Attendees)! 👑`, 'fa-circle-check');
            triggerCelebrationConfetti();
        });
    }
}

/* ==========================================
   6. GUESTBOOK SHOUTOUTS (Clean Initial State)
   ========================================== */
function initGuestbook() {
    let shoutouts = JSON.parse(localStorage.getItem('cousin_shoutouts_2026')) || [];
    const feed = document.getElementById('guestbookFeed');
    const form = document.getElementById('guestbookForm');

    function renderShoutouts() {
        if (!feed) return;
        feed.innerHTML = '';

        if (shoutouts.length === 0) {
            feed.innerHTML = `
                <div class="col-span-full text-center py-10 px-4 bg-purple-950/40 rounded-3xl border border-purple-800/60 max-w-xl mx-auto">
                    <span class="text-4xl">💌</span>
                    <h4 class="font-heading text-2xl text-white mt-2">No Shoutouts Posted Yet!</h4>
                    <p class="text-purple-300 text-xs mt-1">Be the first cousin to leave a message above.</p>
                </div>
            `;
            return;
        }

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
