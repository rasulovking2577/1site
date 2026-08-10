(function() {
    "use strict";

    const hasFinePointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ===== PROGRESS BAR =====
    const progressBar = document.getElementById('progressBar');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = progress + '%';
    }, { passive: true });

    // ===== ШАПКА =====
    const header = document.getElementById('siteHeader');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });

    // ===== МОБИЛЬНОЕ МЕНЮ =====
    const burger = document.getElementById('burger');
    const nav = document.getElementById('mainNav');
    burger.addEventListener('click', () => {
        burger.classList.toggle('open');
        nav.classList.toggle('open');
        document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });
    nav.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            burger.classList.remove('open');
            nav.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // ===== КУРСОР =====
    const cursor = document.getElementById('customCursor');
    if (hasFinePointer) {
        window.addEventListener('mousemove', e => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        document.querySelectorAll('a, button, .service-card, .folio-card, .step').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
        });
    } else {
        cursor.style.display = 'none';
    }

    // ===== TYPEWRITER =====
    const typewriterEl = document.getElementById('typewriter');
    const words = ["Разрабатываю", "Создаю", "Проектирую"];
    const fullEnd = " сайты, которые запоминаются.";
    let wIndex = 0, charIndex = 0, isDeleting = false;

    function typeStep() {
        const current = words[wIndex];
        if (!isDeleting) {
            charIndex++;
            if (charIndex > current.length) {
                isDeleting = true;
                setTimeout(typeStep, 1800);
                return;
            }
        } else {
            charIndex--;
            if (charIndex < 0) {
                isDeleting = false;
                wIndex = (wIndex + 1) % words.length;
                charIndex = 0;
                setTimeout(typeStep, 400);
                return;
            }
        }
        const word = current.slice(0, charIndex);
        typewriterEl.innerHTML = `<span class="cycle">${word}</span>${fullEnd}<span class="cursor-blink">&nbsp;</span>`;
        setTimeout(typeStep, isDeleting ? 35 : 75);
    }

    if (reduceMotion) {
        typewriterEl.innerHTML = `<span class="cycle">Разрабатываю</span>${fullEnd}<span class="cursor-blink">&nbsp;</span>`;
    } else {
        setTimeout(typeStep, 500);
    }

    // ===== HERO STATS =====
    const heroStats = document.querySelectorAll('.hero-stat-num');
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                heroStats.forEach(el => {
                    const target = parseInt(el.dataset.target, 10);
                    const duration = 1200;
                    let startTime = null;
                    function step(ts) {
                        if (!startTime) startTime = ts;
                        const p = Math.min((ts - startTime) / duration, 1);
                        const eased = 1 - Math.pow(1 - p, 3);
                        el.textContent = Math.round(target * eased);
                        if (p < 1) requestAnimationFrame(step);
                    }
                    requestAnimationFrame(step);
                });
                heroObserver.disconnect();
            }
        });
    }, { threshold: 0.3 });
    heroObserver.observe(document.querySelector('.hero'));

    // ===== SLIDE-RIGHT =====
    const slideElements = document.querySelectorAll('.path-card, .service-card, .folio-card');
    const slideObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = parseInt(el.dataset.delay) || 0;
                setTimeout(() => el.classList.add('visible'), delay);
                slideObserver.unobserve(el);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    slideElements.forEach(el => slideObserver.observe(el));

    // ===== 3D TILT =====
    if (hasFinePointer && !reduceMotion) {
        document.querySelectorAll('.service-card, .folio-card').forEach(card => {
            const inner = card.querySelector('.tilt-inner');
            if (!inner) return;

            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const px = (e.clientX - rect.left) / rect.width - 0.5;
                const py = (e.clientY - rect.top) / rect.height - 0.5;
                inner.style.setProperty('--rx', (px * 16) + 'deg');
                inner.style.setProperty('--ry', (py * -16) + 'deg');
                inner.style.transform = `rotateX(${py * -14}deg) rotateY(${px * 16}deg)`;
            });

            card.addEventListener('mouseleave', () => {
                inner.style.transform = 'rotateX(0) rotateY(0)';
            });
        });
    }

    // ===== ТАЙМЛАЙН =====
    const steps = document.querySelectorAll('.step');
    const progress = document.getElementById('timelineProgress');
    const milestones = document.querySelectorAll('.milestone');
    let autoTimer = null;

    function activateStep(target) {
        steps.forEach(s => s.classList.remove('active'));
        target.classList.add('active');
        const idx = parseInt(target.dataset.i, 10);
        const pct = ((idx - 1) / (steps.length - 1)) * 100;
        progress.style.width = pct + '%';
        milestones.forEach((m, i) => {
            m.classList.toggle('active', i < idx);
        });
    }

    function startAutoProgress() {
        let current = 0;
        activateStep(steps[0]);
        clearInterval(autoTimer);
        autoTimer = setInterval(() => {
            current++;
            if (current >= steps.length) {
                clearInterval(autoTimer);
                return;
            }
            activateStep(steps[current]);
        }, 2000);
    }

    steps.forEach(step => {
        step.addEventListener('click', () => {
            clearInterval(autoTimer);
            activateStep(step);
        });
    });

    const processSection = document.getElementById('process');
    const processObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startAutoProgress();
                processObserver.disconnect();
            }
        });
    }, { threshold: 0.3 });
    processObserver.observe(processSection);

    // ===== СЧЁТЧИКИ =====
    const counters = document.querySelectorAll('.stat .num');
    let counted = false;
    const whySection = document.getElementById('why');
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                counted = true;
                counters.forEach(el => {
                    const target = parseInt(el.dataset.target, 10);
                    const suffix = el.dataset.suffix || '';
                    const duration = 1400;
                    let startTime = null;

                    function step(ts) {
                        if (!startTime) startTime = ts;
                        const p = Math.min((ts - startTime) / duration, 1);
                        const eased = 1 - Math.pow(1 - p, 3);
                        const val = Math.round(target * eased);
                        el.textContent = val + suffix;
                        if (p < 1) {
                            requestAnimationFrame(step);
                        } else {
                            el.classList.add('pulse');
                            setTimeout(() => el.classList.remove('pulse'), 600);
                        }
                    }
                    requestAnimationFrame(step);
                });
                countObserver.disconnect();
            }
        });
    }, { threshold: 0.4 });
    countObserver.observe(whySection);

    // ===== TOUCH FALLBACK =====
    document.querySelectorAll('.service-card, .folio-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (!hasFinePointer) {
                const isLink = e.target.closest('a');
                if (!isLink) {
                    const group = this.classList.contains('service-card') ? '.service-card' : '.folio-card';
                    document.querySelectorAll(group).forEach(c => {
                        if (c !== this) c.classList.remove('active');
                    });
                    this.classList.toggle('active');
                }
            }
        });
    });

    // ===== PARTICLES =====
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    const heroSection = document.querySelector('.hero');
    let particles = [];
    let mouseX = null, mouseY = null;

    function resizeCanvas() {
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
    }

    function initParticles() {
        particles = [];
        const count = Math.min(80, Math.floor(canvas.width / 16));
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 2.5 + 0.5,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                a: Math.random() * 0.4 + 0.08,
                baseX: Math.random() * canvas.width,
                baseY: Math.random() * canvas.height,
            });
        }
    }

    if (hasFinePointer) {
        window.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            if (mouseX !== null && mouseY !== null) {
                const dx = mouseX - p.x;
                const dy = mouseY - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 250) {
                    const force = (250 - dist) / 250 * 0.3;
                    p.vx -= (dx / dist) * force * 0.02;
                    p.vy -= (dy / dist) * force * 0.02;
                }
            }

            p.vx *= 0.997;
            p.vy *= 0.997;
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > canvas.width) p.vx *= -0.5;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -0.5;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212,175,55,${p.a})`;
            ctx.fill();

            if (p.r > 1.5) {
                ctx.shadowColor = 'rgba(212,175,55,0.15)';
                ctx.shadowBlur = 12;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        });

        // Connect nearby particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(212,175,55,${0.06 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(drawParticles);
    }

    resizeCanvas();
    initParticles();
    if (!reduceMotion) requestAnimationFrame(drawParticles);

    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });

})();