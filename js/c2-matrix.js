document.addEventListener("DOMContentLoaded", () => {
    
    // Core Utility Functions
    const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const randHex = (len) => [...Array(len)].map(() => Math.floor(Math.random() * 16).toString(16)).join('').toUpperCase();
    const randIP = () => `${randInt(10,240)}.${randInt(1,254)}.${randInt(0,254)}.${randInt(1,254)}`;


        let lineIndex = 0;
    function printBootLine() {
        if (lineIndex < bootLines.length) {
            const line = document.createElement('div');
            line.className = 'boot-line';
            line.innerText = `> ${bootLines[lineIndex]}`;
            bootTerminal.appendChild(line);
            lineIndex++;
            setTimeout(printBootLine, randInt(200, 600));
        } else {
            // FORCE RELEASE:
            console.log("Boot sequence complete. Releasing interface.");
            bootSequence.style.opacity = "0";
            setTimeout(() => {
                bootSequence.style.display = 'none';
            }, 1000);
        }
    }

    // --- PHASE 2: QUANTUM ENTANGLEMENT CANVAS ---
    const canvas = document.getElementById('neural-canvas');
    const ctx = canvas.getContext('2d');
    let width, height, particles = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    // Mouse tracking for particle attraction
    let mouse = { x: null, y: null };
    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    document.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 1.5;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > width) this.vx = -this.vx;
            if (this.y < 0 || this.y > height) this.vy = -this.vy;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 229, 255, 0.5)';
            ctx.fill();
        }
    }

    for (let i = 0; i < 80; i++) particles.push(new Particle());

    function animateNetwork() {
        ctx.clearRect(0, 0, width, height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            for (let j = i; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 229, 255, ${1 - dist/120})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }

            // Mouse interaction
            if (mouse.x != null) {
                let dx = particles[i].x - mouse.x;
                let dy = particles[i].y - mouse.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 255, 102, ${1 - dist/150})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateNetwork);
    }
    animateNetwork();

    // --- PHASE 3: SCRAMBLER ENGINE & HOVER GLITCH ---
    class CrypticScrambler {
        constructor(el, finalStr, speed = 25) {
            this.el = el;
            this.finalStr = finalStr;
            this.speed = speed;
            this.pool = "X01_ØΞΩΨ★☣☠⚡⚙#@&%";
            this.execute();
        }
        execute() {
            let iteration = 0;
            clearInterval(this.interval);
            this.interval = setInterval(() => {
                this.el.innerText = this.finalStr.split('').map((char, index) => {
                    if (index < iteration) return this.finalStr[index];
                    return this.pool[Math.floor(Math.random() * this.pool.length)];
                }).join('');
                if (iteration >= this.finalStr.length) clearInterval(this.interval);
                iteration += 1 / 2;
            }, this.speed);
        }
    }

    const coreBanner = document.getElementById('core-banner');
    if (coreBanner) setTimeout(() => new CrypticScrambler(coreBanner, 'NEGARIX // GLOBAL_SIGINT_C2', 40), 3000); // Delayed for boot

    document.querySelectorAll('.ghost-card').forEach(card => {
        const target = card.querySelector('.glitch-target');
        const originalText = target.innerText;
        
        card.addEventListener('mouseenter', () => {
            // Glitch into Hex
            new CrypticScrambler(target, randHex(originalText.length), 15);
            // Revert to normal
            setTimeout(() => new CrypticScrambler(target, originalText, 15), 350);
        });
    });

    function scrambleNodeCiphers() {
        document.querySelectorAll('.scramble').forEach(el => new CrypticScrambler(el, `0x${randHex(4)}`, 50));
    }
    setInterval(scrambleNodeCiphers, 5000);

    // --- PHASE 4: SENTIENT COMMAND LINE ---
    const cliInput = document.getElementById('sentient-input');
    const cliRes = document.getElementById('cli-response');
    
    if(cliInput && cliRes) {
        cliInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && cliInput.value.trim() !== '') {
                const cmd = cliInput.value.toUpperCase();
                cliInput.value = '';
                cliRes.innerText = '';
                
                // Simulated thinking delay
                setTimeout(() => {
                    if (cmd === 'WHOAMI' || cmd === 'SUDO' || cmd === 'ROOT') {
                        new CrypticScrambler(cliRes, `> FATAL: IDENTITY OBFUSCATED. ACCESS DENIED.`, 20);
                    } else if (cmd === 'PING') {
                        new CrypticScrambler(cliRes, `> PING TRACED. ROUTING PACKETS TO /DEV/NULL...`, 20);
                    } else {
                        new CrypticScrambler(cliRes, `> COGNITIVE LOCK ACTIVE. UNAUTHORIZED COMMAND: [${cmd}]`, 20);
                    }
                }, 300);
            }
        });
    }

    // --- TELEMETRY & SDR LOGIC ---
    const specContainer = document.getElementById('spectrum-display');
    const freqDisplay = document.getElementById('freq-fhs');
    if (specContainer && freqDisplay) {
        const barElements = Array.from({length: 22}, () => {
            const bar = document.createElement('div');
            bar.className = 'spectrum-bar';
            specContainer.appendChild(bar);
            return bar;
        });

        setInterval(() => {
            barElements.forEach(bar => bar.style.height = `${randInt(15, 95)}%`);
            freqDisplay.innerText = `${(433.920 + (Math.random() * 2 - 1) * 0.15).toFixed(3)} MHz`;
        }, 120);
    }

    const logContainer = document.getElementById('packet-stream');
    if (logContainer) {
        const actions = ["SIG_CAP", "REROUTE", "DEC_FAIL", "AUTH_OK", "DROP_MAL", "BEACON"];
        setInterval(() => {
            if (logContainer.children.length > 12) logContainer.removeChild(logContainer.lastChild);
            const action = actions[randInt(0, actions.length - 1)];
            let opColor = action === "DROP_MAL" || action === "DEC_FAIL" ? "var(--tac-red)" : action === "AUTH_OK" ? "var(--tac-green)" : "var(--tac-cyan)";
            
            const entry = document.createElement('div');
            entry.className = 'stream-line';
            entry.innerHTML = `<span><span style="color:${opColor}">[${action}]</span> NTWRK:${randIP()}</span><span style="opacity:0.5;">0x${randHex(4)}</span>`;
            logContainer.insertBefore(entry, logContainer.firstChild);
        }, 350);
    }

    const sysEpoch = document.getElementById('sys-epoch'), radarAzi = document.getElementById('radar-azi'), geoTelemetry = document.getElementById('geo-telemetry');
    if (sysEpoch && radarAzi && geoTelemetry) {
        setInterval(() => {
            sysEpoch.innerText = Math.floor(Date.now() / 1000);
            radarAzi.innerText = `${randInt(0, 359)}°`;
            geoTelemetry.innerText = `${(51.5074 + (Math.random() * 2 - 1) * 0.05).toFixed(4)}° N, ${(0.1278 - (Math.random() * 2 - 1) * 0.05).toFixed(4)}° E`;
        }, 1000);
    }
});

// --- PERIMETER PROTECTION: ANTI-INSPECTION ---

// 1. Block right-click (already handled by body tag, but this is a secondary fail-safe)
document.addEventListener('contextmenu', e => e.preventDefault());

// 2. Block Keyboard Shortcuts (F12, Ctrl+Shift+I, Ctrl+U)
document.addEventListener('keydown', e => {
    // Prevent F12
    if (e.key === 'F12') {
        e.preventDefault();
        return false;
    }
    // Prevent Ctrl+Shift+I (Inspector) or Ctrl+U (View Source)
    if (e.ctrlKey && (e.key === 'I' || e.key === 'U' || e.key === 'C')) {
        e.preventDefault();
        return false;
    }
});

// 3. Optional: Detect if DevTools is open and "Scramble" the visual
// This detects the resize event that happens when DevTools is opened
window.addEventListener('resize', () => {
    if ((window.outerWidth - window.innerWidth) > 100 || (window.outerHeight - window.innerHeight) > 100) {
        document.body.innerHTML = "<div style='color:red; text-align:center; padding-top:20%; font-family:monospace;'>[ACCESS VIOLATION: INSPECTION ATTEMPT DETECTED. PERIMETER LOCKED.]</div>";
    }
});