// scroll.js — section reveals + scroll progress for particles

// ── 1. Track scroll progress (read by particles.js) ─────────
window.scrollProgress = 0

function updateScrollProgress () {
    const maxScroll = document.body.scrollHeight - window.innerHeight
    window.scrollProgress = maxScroll > 0
        ? Math.min(window.scrollY / maxScroll, 1)
        : 0
}

window.addEventListener('scroll', updateScrollProgress, { passive: true })
updateScrollProgress()

// ── 2. Reveal sections on scroll ────────────────────────────
const sections = document.querySelectorAll('.section')

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible')
        }
    })
}, { threshold: 0.1 })

sections.forEach(s => revealObserver.observe(s))

// ── 3. Nav active state on scroll ───────────────────────────
const navLinks = document.querySelectorAll('.nav-links a')

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id
            navLinks.forEach(link => {
                link.classList.toggle(
                    'nav-active',
                    link.getAttribute('href') === `#${id}`
                )
            })
        }
    })
}, { threshold: 0.5 })

document.querySelectorAll('[id]').forEach(el => navObserver.observe(el))
