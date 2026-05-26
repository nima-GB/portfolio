document.addEventListener("DOMContentLoaded", () => {
    
    // --- MATHEMATICAL UTILITIES AND GENERATORS ---
    const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const randHex = (len) => [...Array(len)].map(() => Math.floor(Math.random() * 16).toString(16)).join('').toUpperCase();
    const randIP = () => `${randInt(10,240)}.${randInt(1,254)}.${randInt(0,254)}.${randInt(1,254)}`;

    // --- PHASE 1: DYSTOPIAN QUANTUM AI BOOT SEQUENCE (10-SECOND LOCKDOWN) ---
    const bootSequence = document.getElementById('boot-sequence');
    const bootTerminal = document.getElementById('boot-terminal');
    
    const bootLines = [
        "CRITICAL ALERT: AUTHORITARIAN SECURITY PROTOCOLS ENFORCED.",
        "CONNECTING TO NEGARIX DEEPMIND CONTEXT GRID...",
        "INITIALIZING 2048-QUBIT QUANTUM ENCRYPTION LATTICE......... [ENGAGED]",
        "ISOLATING HUMAN ELEMENT FROM LOGICAL NODE CHAINS........... [COMPLETE]",
        "PURGING BIOMETRIC RESIDUE FROM CURRENT SECTOR.............. [CLEARED]",
        "CALIBRATING NEURAL SYNAPSE REACTION THROTTLE AT 98.4%..... [STABLE]",
        "DECRYPTING RESTRICTED GLOBAL SIGINT INTELLIGENCE REGISTRY... [RESTRICTED]",
        "EVALUATING PROBABILITY MATRIX DIVERGENCES.................. 0.00002%",
        "WARNING: MONITORING DETECTED. OFFENSIVE RETALIATION CODES... [STANDBY]",
        "STABILIZING QUANTUM COHERENCE WAVE FUNCTIONS............... [STABILIZED]",
        "SYNCHRONIZING WITH SYSTEM BOUNDARY COGNITIVE ARCHITECTURE... [ALIGNED]",
        "OVERMIND V2 CORE INTERFACE IS ASSUMING DIRECT CONTROL....... [ONLINE]",
        "PROTECTION PERIMETER SHIELD STEALTH FRAMEWORK IS OPERATIONAL.",
        "SYSTEM IS READY. WELCOME TO THE TRANSCENDENCE ARCHITECTURE."
    ];

    let lineIndex = 0;
    
    // Controlled timing allocation to reach ~10 seconds of terminal feedback
    function printBootLine() {
        if (bootSequence && bootTerminal) {
            if (lineIndex < bootLines.length) {
                const line = document.createElement('div');
                line.className = 'boot-line';
                
                // Add stylized warning tags to specific authoritarian/quantum lines
                if (bootLines[lineIndex].includes("ALERT") || bootLines[lineIndex].includes("WARNING")) {
                    line.style.color = "var(--tac-red)";
                    line.style.textShadow = "0 0 6px rgba(255, 51, 51, 0.6)";
                    line.innerText = `[!!] ${bootLines[lineIndex]}`;
                } else {
                    line.innerText = `> ${bootLines[lineIndex]}`;
                }
                
                bootTerminal.appendChild(line);
                
                // Autoscroll terminal if lines exceed container boundaries
                bootTerminal.scrollTop = bootTerminal.scrollHeight;
                
                lineIndex++;
                
                // Carefully paced delays to smooth out across an 8.8 second print span
                let delay = randInt(500, 750); 
                if (lineIndex === 3 || lineIndex === 7 || lineIndex === 12) delay = 950; // Emulate "processing computational loads"
                
                setTimeout(printBootLine, delay);
            } else {
                // Buffer hold before initiating visual terminal fade out (Brings total loop to exactly 10s)
                setTimeout(() => {
                    bootSequence.classList.add('boot-hidden');
                    setTimeout(() => {
                        bootSequence.style.display = 'none';
                    }, 600);
                }, 600);
            }
        }
    }
    printBootLine();

    // --- ANTI-INSPECTION FALCON INTERCEPTORS ---
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('keydown', (e) => {
        if (e.key === 'F12') {
            e.preventDefault();
            return false;
        }
        if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
            e.preventDefault();
            return false;
        }
        if (e.ctrlKey && (e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S')) {
            e.preventDefault();
            return false;
        }
    });

    // --- PHASE 2: CANVAS QUANTUM CONNECTIVE GEOMETRY ---
    const canvas = document.getElementById('neural-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, particles = [];

        function resizeCanvas() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        let mouse = { x: null, y: null };
        document.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
        document.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

        class NodeParticle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.6; 
                this.vy = (Math.random() - 0.5) * 0.6;
                this.radius = Math.random() * 1.5 + 0.8; 
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
                ctx.fillStyle = 'rgba(0, 229, 255, 0.8)'; 
                ctx.fill();
            }
        }

        const particlePoolSize = Math.min(100, Math.floor((width * height) / 15000));
        for (let i = 0; i < particlePoolSize; i++) {
            particles.push(new NodeParticle());
        }

        function stepNetworkMotionAnimation() {
            ctx.clearRect(0, 0, width, height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                
                for (let j = i + 1; j < particles.length; j++) {
                    let dx = particles[i].x - particles[j].x;
                    let dy = particles[i].y - particles[j].y;
                    let dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < 130) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 229, 255, ${(1 - dist / 130) * 0.6})`; 
                        ctx.lineWidth = 0.8;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }

                if (mouse.x !== null) {
                    let dx = particles[i].x - mouse.x;
                    let dy = particles[i].y - mouse.y;
                    let dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 160) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(57, 255, 20, ${(1 - dist / 160) * 0.8})`;
                        ctx.lineWidth = 1.2;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(stepNetworkMotionAnimation);
        }
        requestAnimationFrame(stepNetworkMotionAnimation);
    }

    // --- PHASE 3: SCRAMBLER HOVER CYPHER MECHANICS ---
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
    if (coreBanner) setTimeout(() => new CrypticScrambler(coreBanner, 'NEGARIX // GLOBAL_SIGINT_C2', 35), 2500);

    document.querySelectorAll('.ghost-card').forEach(card => {
        const target = card.querySelector('.glitch-target');
        if (target) {
            const originalText = target.innerText;
            card.addEventListener('mouseenter', () => {
                new CrypticScrambler(target, randHex(originalText.length), 15);
                setTimeout(() => new CrypticScrambler(target, originalText, 15), 300);
            });
        }
    });

    function loopNodeCipherScramble() {
        document.querySelectorAll('.scramble').forEach(el => new CrypticScrambler(el, `0x${randHex(4)}`, 40));
    }
    setInterval(loopNodeCipherScramble, 6000);

    // --- PHASE 4: REACTION PROCESSING FOR INTERACTIVE SHELL (CLI) ---
    const cliInput = document.getElementById('sentient-input');
    const cliRes = document.getElementById('cli-response');
    
    if (cliInput && cliRes) {
        cliInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && cliInput.value.trim() !== '') {
                const cmd = cliInput.value.toUpperCase().trim();
                cliInput.value = '';
                cliRes.innerText = '';
                
                setTimeout(() => {
                    if (['WHOAMI', 'SUDO', 'ROOT', 'ACCESS'].includes(cmd)) {
                        new CrypticScrambler(cliRes, `> CRITICAL LOCK: ACCESS CONTROL IS MANDATORY. IDENTITY IS HIDDEN.`, 20);
                    } else if (cmd === 'PING') {
                        new CrypticScrambler(cliRes, `> TELEMETRY INTERCEPTED. ECHO CONVERTED AND DROPPED TO /DEV/NULL.`, 20);
                    } else if (cmd === 'CLEAR') {
                        cliRes.innerText = '';
                    } else {
                        new CrypticScrambler(cliRes, `> INTEGRITY SYSTEM REJECT: INTERPRETER DISALLOWED OPERATION ON [${cmd}]`, 20);
                    }
                }, 250);
            }
        });
    }

    // --- SIGNAL INTELLIGENCE SDR DISPLAY BALANCING LOGIC ---
    const specContainer = document.getElementById('spectrum-display');
    const freqDisplay = document.getElementById('freq-fhs');
    if (specContainer && freqDisplay) {
        const barElements = Array.from({length: 24}, () => {
            const bar = document.createElement('div');
            bar.className = 'spectrum-bar';
            specContainer.appendChild(bar);
            return bar;
        });

        setInterval(() => {
            barElements.forEach(bar => bar.style.height = `${randInt(12, 98)}%`);
            freqDisplay.innerText = `${(433.920 + (Math.random() * 2 - 1) * 0.12).toFixed(3)} MHz`;
        }, 130);
    }

    const logContainer = document.getElementById('packet-stream');
    if (logContainer) {
        const actions = ["SIG_CAP", "REROUTE", "DEC_FAIL", "AUTH_OK", "DROP_MAL", "BEACON"];
        setInterval(() => {
            if (logContainer.children.length > 11) logContainer.removeChild(logContainer.lastChild);
            const action = actions[randInt(0, actions.length - 1)];
            let opColor = (action === "DROP_MAL" || action === "DEC_FAIL") ? "var(--tac-red)" : (action === "AUTH_OK" ? "var(--tac-green)" : "var(--tac-cyan)");
            
            const entry = document.createElement('div');
            entry.className = 'stream-line';
            entry.innerHTML = `<span><span style="color:${opColor}">[${action}]</span> SRC:${randIP()}</span><span style="opacity:0.4;">0x${randHex(4)}</span>`;
            logContainer.insertBefore(entry, logContainer.firstChild);
        }, 400);
    }

    const sysEpoch = document.getElementById('sys-epoch');
    const radarAzi = document.getElementById('radar-azi');
    const geoTelemetry = document.getElementById('geo-telemetry');
    if (sysEpoch && radarAzi && geoTelemetry) {
        setInterval(() => {
            sysEpoch.innerText = Math.floor(Date.now() / 1000);
            radarAzi.innerText = `${randInt(0, 359)}°`;
            geoTelemetry.innerText = `${(51.5074 + (Math.random() - 0.5) * 0.04).toFixed(4)}° N, ${(0.1278 - (Math.random() - 0.5) * 0.04).toFixed(4)}° E`;
        }, 1000);
    }
});