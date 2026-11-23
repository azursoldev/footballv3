/**
 * Vigerslev Boldklub — Modern Theme (V2) JavaScript
 * Live Countdown Timer, Interactive Team Tabs, Mobile Nav
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Footer Year
  const yr = document.getElementById('v2Year');
  if (yr) yr.textContent = new Date().getFullYear();

  // 2. Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const menuList = document.getElementById('menuList');
  if (menuToggle && menuList) {
    menuToggle.addEventListener('click', () => {
      menuList.classList.toggle('open');
    });

    document.querySelectorAll('.nav-items-modern a').forEach(link => {
      link.addEventListener('click', () => {
        menuList.classList.remove('open');
      });
    });
  }

  // 3. Interactive MatchCenter Team Tabs
  const tabBtns = document.querySelectorAll('.team-tab-btn');
  const tabPanels = document.querySelectorAll('.team-tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTeam = btn.getAttribute('data-team');

      // Update button active state
      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Show matching panel
      tabPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === `tab-${targetTeam}`) {
          panel.classList.add('active');
        }
      });
    });
  });

  // 4. Live Match Countdown Timer (Target: Next Saturday 12:30)
  const daysEl  = document.getElementById('cdDays');
  const hoursEl = document.getElementById('cdHours');
  const minsEl  = document.getElementById('cdMins');
  const secsEl  = document.getElementById('cdSecs');

  if (daysEl && hoursEl && minsEl && secsEl) {
    // Set match target to 2 days, 14 hours, 45 mins from now
    const now = new Date().getTime();
    const targetMatchTime = now + (2 * 24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000) + (45 * 60 * 1000);

    const updateTimer = () => {
      const currentTime = new Date().getTime();
      const diff = targetMatchTime - currentTime;

      if (diff <= 0) {
        daysEl.textContent  = '00';
        hoursEl.textContent = '00';
        minsEl.textContent  = '00';
        secsEl.textContent  = '00';
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      daysEl.textContent  = String(d).padStart(2, '0');
      hoursEl.textContent = String(h).padStart(2, '0');
      minsEl.textContent  = String(m).padStart(2, '0');
      secsEl.textContent  = String(s).padStart(2, '0');
    };

    updateTimer();
    setInterval(updateTimer, 1000);
  }

  // 5. Header backdrop blur intensifies on scroll
  const header = document.getElementById('modernHeader');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
      } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
      }
    }, { passive: true });
  }

  console.log('⚡ Vigerslev BK Next-Gen Portal (V2) Active');
});

