/**
 * NEXYUGA INTERACTIVE SCRIPTS
 * Adorbit Framer interactions + Interactive Braille Synthesizer & Audio Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initLangSelector();
  initVideoShowcase();
  initImpactChart();
  initBrailleSandbox();
  initMobileDrawer();
  initSmoothScroll();
  initCsrForm();
  initTestimonialModal();
});

/**
 * 1. ADORBIT SIGNATURE APP BAR SCROLL ELEVATION
 */
function initNavbar() {
  const appbar = document.querySelector('.site-appbar') || document.querySelector('.navbar');
  if (!appbar) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      appbar.classList.add('scrolled');
    } else {
      appbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/**
 * 1B. APP BAR LANGUAGE SELECTOR
 */
function initLangSelector() {
  const langPill = document.getElementById('langSelector');
  if (!langPill) return;

  langPill.addEventListener('click', (e) => {
    e.stopPropagation();
    langPill.classList.toggle('open');
  });

  const options = langPill.querySelectorAll('.lang-option');
  options.forEach(opt => {
    opt.addEventListener('click', (e) => {
      e.stopPropagation();
      const flag = opt.querySelector('span').textContent;
      const langCode = opt.getAttribute('data-lang').toUpperCase();
      const flagEl = langPill.querySelector('.lang-flag');
      const spans = langPill.querySelectorAll('span');
      if (flagEl) flagEl.textContent = flag;
      if (spans.length > 1) spans[1].textContent = langCode;
      langPill.classList.remove('open');
    });
  });

  document.addEventListener('click', () => {
    langPill.classList.remove('open');
  });
}

/**
 * 2. FEATURED VIDEO SHOWCASE (Adorbit Architecture - 2nd Section)
 * Instant one-click YouTube player insertion with autoplay & keyboard support
 */
function initVideoShowcase() {
  const container = document.getElementById('videoContainer');
  const posterWrapper = document.getElementById('videoPoster');
  const playBtn = document.getElementById('videoPlayBtn');
  const iframeSlot = document.getElementById('videoIframeSlot');

  if (!container || !posterWrapper || !iframeSlot) return;

  const videoId = container.getAttribute('data-video-id') || 'U79oCZsotd8';

  const playVideo = () => {
    // When opened directly as a local disk file (file:///), browsers send no HTTP Referer.
    // YouTube security blocks embeds without an HTTP referrer with Error 153.
    if (window.location.protocol === 'file:') {
      // 1. Instantly open YouTube video in new tab for smooth viewing
      window.open(`https://youtu.be/${videoId}?autoplay=1`, '_blank', 'noopener,noreferrer');

      // 2. Display helpful inline message inside the bezel with one-click actions
      posterWrapper.classList.add('hidden');
      iframeSlot.innerHTML = `
        <div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #0c1920; color: #ffffff; padding: 24px; text-align: center; box-sizing: border-box;">
          <div style="width: 52px; height: 52px; border-radius: 50%; background: rgba(1, 151, 178, 0.16); border: 1px solid rgba(1, 151, 178, 0.4); display: flex; align-items: center; justify-content: center; margin-bottom: 14px; color: #0197B2;">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </div>
          <h3 style="font-family: 'Poppins', sans-serif; font-size: 1.25rem; font-weight: 500; color: #ffffff; margin: 0 0 8px;">Video Opened in YouTube</h3>
          <p style="font-family: 'Inter', sans-serif; font-size: 0.875rem; color: rgba(255, 255, 255, 0.72); max-width: 480px; line-height: 1.5; margin: 0 0 18px;">
            YouTube requires an HTTP server to play inline embeds (to avoid Error 153 on local <code>file:///</code> paths). Your video has opened in YouTube, or open the local dev server below to watch inline directly:
          </p>
          <div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center;">
            <a href="https://youtu.be/${videoId}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 8px; background: #FF0000; color: #ffffff; padding: 9px 20px; border-radius: 999px; text-decoration: none; font-size: 0.85rem; font-weight: 500; transition: transform 0.2s ease;">
              Watch on YouTube
            </a>
            <a href="http://localhost:3000/#video-tour" style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255, 255, 255, 0.15); border: 1px solid rgba(255, 255, 255, 0.3); color: #ffffff; padding: 9px 20px; border-radius: 999px; text-decoration: none; font-size: 0.85rem; font-weight: 500; transition: transform 0.2s ease;">
              Play Inline at localhost:3000
            </a>
          </div>
        </div>
      `;
      return;
    }

    // Standard HTTP/HTTPS environment (localhost or live production site)
    posterWrapper.classList.add('hidden');

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`;
    iframe.title = 'Nexyuga Assistive Innovation Demonstration Video';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');

    iframeSlot.innerHTML = '';
    iframeSlot.appendChild(iframe);
  };

  if (playBtn) {
    playBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      playVideo();
    });
  }

  posterWrapper.addEventListener('click', () => {
    playVideo();
  });

  // Accessible keyboard trigger
  posterWrapper.setAttribute('tabindex', '0');
  posterWrapper.setAttribute('role', 'button');
  posterWrapper.setAttribute('aria-label', 'Play Nexyuga demonstration video');
  posterWrapper.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      playVideo();
    }
  });
}

/**
 * 3. INTERACTIVE IMPACT & PERFORMANCE BAR CHART
 */
function initImpactChart() {
  const chart = document.querySelector('.chart-bars-wrap');
  if (!chart) return;

  const columns = chart.querySelectorAll('.chart-column');
  const statValEl = document.querySelector('.growth-current-val');

  // Trigger bar animations when visible
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        columns.forEach(col => {
          const bar = col.querySelector('.chart-bar-fill');
          if (bar) {
            const targetHeight = bar.getAttribute('data-height') || '50%';
            bar.style.height = targetHeight;
          }
        });
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(chart);

  // Column hover interactions
  columns.forEach(col => {
    col.addEventListener('mouseenter', () => {
      const pct = col.getAttribute('data-pct');
      if (statValEl && pct) {
        statValEl.textContent = pct;
        statValEl.style.color = 'var(--color-brand-green)';
      }
    });

    col.addEventListener('mouseleave', () => {
      if (statValEl) {
        statValEl.textContent = '90%';
        statValEl.style.color = 'var(--color-brand-green)';
      }
    });
  });
}

/**
 * 4. INTERACTIVE 6-DOT BRAILLE SYNTHESIZER & AUDIO ENGINE
 */
function initBrailleSandbox() {
  const dots = document.querySelectorAll('.braille-dot-btn');
  const charDisplay = document.querySelector('.braille-char-display');
  const phoneticDisplay = document.querySelector('.braille-phonetic-display');
  const speakBtn = document.querySelector('.braille-speak-btn');
  const quickBtns = document.querySelectorAll('.braille-preset-btn');

  if (!dots.length || !charDisplay) return;

  // Braille Map (Dot combinations: 1-indexed dots [1..6] sorted)
  const brailleMap = {
    '1': { char: 'A', phonetic: 'Phonic: /æ/ as in Apple' },
    '1,2': { char: 'B', phonetic: 'Phonic: /b/ as in Book' },
    '1,4': { char: 'C', phonetic: 'Phonic: /k/ as in Child' },
    '1,4,5': { char: 'D', phonetic: 'Phonic: /d/ as in Discovery' },
    '1,5': { char: 'E', phonetic: 'Phonic: /e/ as in Education' },
    '1,2,4': { char: 'F', phonetic: 'Phonic: /f/ as in Future' },
    '1,2,4,5': { char: 'G', phonetic: 'Phonic: /g/ as in Growth' },
    '1,2,5': { char: 'H', phonetic: 'Phonic: /h/ as in Hear' },
    '2,4': { char: 'I', phonetic: 'Phonic: /aɪ/ as in Independence' },
    '2,4,5': { char: 'J', phonetic: 'Phonic: /dʒ/ as in Journey' },
    '1,3': { char: 'K', phonetic: 'Phonic: /k/ as in Knowledge' },
    '1,2,3': { char: 'L', phonetic: 'Phonic: /l/ as in Learn' },
    '1,3,4': { char: 'M', phonetic: 'Phonic: /m/ as in Multi-sensory' },
    '1,3,4,5': { char: 'N', phonetic: 'Phonic: /n/ as in Nexyuga' },
    '1,3,5': { char: 'O', phonetic: 'Phonic: /oʊ/ as in Opportunity' },
    '1,2,3,4': { char: 'P', phonetic: 'Phonic: /p/ as in Partnership' },
    '1,2,3,4,5': { char: 'Q', phonetic: 'Phonic: /k/ as in Quality' },
    '1,2,3,5': { char: 'R', phonetic: 'Phonic: /r/ as in Research' },
    '2,3,4': { char: 'S', phonetic: 'Phonic: /s/ as in STEM' },
    '2,3,4,5': { char: 'T', phonetic: 'Phonic: /t/ as in Tactile' },
    '1,3,6': { char: 'U', phonetic: 'Phonic: /uː/ as in Universal' },
    '1,2,3,6': { char: 'V', phonetic: 'Phonic: /v/ as in Vithara' },
    '2,4,5,6': { char: 'W', phonetic: 'Phonic: /w/ as in Wisdom' },
    '1,3,4,6': { char: 'X', phonetic: 'Phonic: /ks/ as in Explore' },
    '1,3,4,5,6': { char: 'Y', phonetic: 'Phonic: /j/ as in Youth' },
    '1,3,5,6': { char: 'Z', phonetic: 'Phonic: /z/ as in Zone' }
  };

  const reverseMap = {};
  for (const [key, val] of Object.entries(brailleMap)) {
    reverseMap[val.char] = key.split(',').map(Number);
  }

  function getActiveDots() {
    const active = [];
    dots.forEach(d => {
      if (d.classList.contains('active')) {
        active.push(parseInt(d.getAttribute('data-dot')));
      }
    });
    return active.sort((a, b) => a - b);
  }

  function playTone(freq = 440) {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {}
  }

  function speakChar(letter, word) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(`Braille Letter ${letter}. ${word || ''}`);
      utter.rate = 1.0;
      utter.pitch = 1.1;
      window.speechSynthesis.speak(utter);
    }
  }

  function updateDisplay(triggerAudio = true) {
    const active = getActiveDots();
    const key = active.join(',');
    const match = brailleMap[key];

    if (match) {
      charDisplay.textContent = match.char;
      if (phoneticDisplay) phoneticDisplay.textContent = match.phonetic;
      charDisplay.style.color = 'var(--color-brand-green)';
      if (triggerAudio) {
        playTone(300 + active.length * 80);
        speakChar(match.char, match.phonetic);
      }
    } else if (active.length === 0) {
      charDisplay.textContent = '—';
      if (phoneticDisplay) phoneticDisplay.textContent = 'Touch dots on the left to synthesize Braille letters';
      charDisplay.style.color = 'var(--color-brand-blue)';
    } else {
      charDisplay.textContent = '?';
      if (phoneticDisplay) phoneticDisplay.textContent = `Custom Tactile Pattern (Dots ${active.join(', ')})`;
      charDisplay.style.color = 'var(--color-text-white-muted)';
      if (triggerAudio) playTone(220);
    }
  }

  // Toggle dot on click
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      dot.classList.toggle('active');
      playTone(500);
      updateDisplay(true);
    });
  });

  // Quick preset buttons
  quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const letter = btn.getAttribute('data-letter');
      const targetDots = reverseMap[letter] || [];

      dots.forEach(d => {
        const dotNum = parseInt(d.getAttribute('data-dot'));
        if (targetDots.includes(dotNum)) {
          d.classList.add('active');
        } else {
          d.classList.remove('active');
        }
      });

      updateDisplay(true);
    });
  });

  if (speakBtn) {
    speakBtn.addEventListener('click', () => {
      updateDisplay(true);
    });
  }

  // Initialize with letter 'V' for Vithara
  if (reverseMap['V']) {
    reverseMap['V'].forEach(num => {
      const el = document.querySelector(`.braille-dot-btn[data-dot="${num}"]`);
      if (el) el.classList.add('active');
    });
    updateDisplay(false);
  }
}

/**
 * 5. MOBILE DRAWER NAVIGATION
 */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const backdrop = document.querySelector('.drawer-backdrop');
  const closeBtn = document.querySelector('.drawer-close-btn');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (!toggleBtn || !drawer) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/**
 * 6. SMOOTH SCROLL WITH ACTIVE ANCHOR LINK
 */
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav-link[href^="#"], .appbar-nav-link[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = '#' + section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }, { passive: true });
}

/**
 * 7. CSR INQUIRY FORM SUBMISSION
 */
function initCsrForm() {
  const form = document.querySelector('#csrPartnershipForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<span>Submitting Inquiry...</span>';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = '<span>Inquiry Received! We will be in touch. ✓</span>';
      submitBtn.style.backgroundColor = 'var(--color-brand-green)';
      submitBtn.style.color = '#05080a';
      form.reset();

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.backgroundColor = '';
        submitBtn.style.color = '';
      }, 5000);
    }, 1200);
  });
}

/**
 * 8. TESTIMONIAL VIDEO MODAL PLAYER
 */
function initTestimonialModal() {
  const trigger = document.getElementById('testimonialVideoTrigger');
  const modal = document.getElementById('testimonialModal');
  const backdrop = document.getElementById('testimonialModalBackdrop');
  const closeBtn = document.getElementById('testimonialModalClose');
  const iframe = document.getElementById('testimonialVideoIframe');

  if (!trigger || !modal || !iframe) return;

  const videoId = trigger.getAttribute('data-video-id') || 'U79oCZsotd8';

  const openModal = () => {
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    iframe.src = '';
    document.body.style.overflow = '';
  };

  trigger.addEventListener('click', openModal);
  trigger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}
