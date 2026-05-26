"use strict"; // Enforce strict mode for cleaner, safer code execution

/**
 *  C2 MATRIX - ADVANCED KERNEL
 * Refactored for Object-Oriented modularity, performance optimization, and encapsulated state.
 */

// ==========================================
// CORE UTILITIES & MATH ENGINE
// ==========================================
const Utils = {
    randInt: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
    randHex: (len) => [...Array(len)].map(() => Math.floor(Math.random() * 16).toString(16)).join('').toUpperCase(),
    randIP: () => `${Utils.randInt(10,240)}.${Utils.randInt(1,254)}.${Utils.randInt(0,254)}.${Utils.randInt(1,254)}`,
    formatAzi: (deg) => String(Math.floor(deg)).padStart(3, '0')
};

// ==========================================
// CENTRAL STATE & THEME MANAGER
// ==========================================
class ThemeManager {
    constructor() {
        this.themes = {
            DEFAULT: { hex: '#00e5ff', rgba: 'rgba(0, 229, 255, 0.8)', rgbBase: '0, 229, 255' },
            GREEN:   { hex: '#39ff14', rgba: 'rgba(57, 255, 20, 0.8)', rgbBase: '57, 255, 20' },
            AMBER:   { hex: '#ffb000', rgba: 'rgba(255, 176, 0, 0.8)', rgbBase: '255, 176, 0' }
        };
        this.current = this.themes.DEFAULT;
    }

    setTheme(themeName) {
        if (!this.themes[themeName]) return false;
        this.current = this.themes[themeName];
        document.documentElement.style.setProperty('--tac-cyan', this.current.hex);
        return true;
    }
}

const SystemTheme = new ThemeManager();

// ==========================================
// TEXT SCRAMBLER CYPHER (REUSABLE CLASS)
// ==========================================
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
            iteration += 0.5;
        }, this.speed);
    }
}

// ==========================================
// SUBSYSTEM: QUANTUM CANVAS NETWORK
// ==========================================
class NeuralCanvas {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d', { alpha: false }); // Optimize performance by disabling transparency layer blending
        this.particles = [];
        this.mouse = { x: -1000, y: -1000 };
        
        this.init();
        this.bindEvents();
        this.animate();
    }

    init() {
        this.resize();
        const poolSize = Math.min(100, Math.floor((this.width * this.height) / 15000));
        this.particles = Array.from({ length: poolSize }, () => this.createParticle());
    }

    createParticle() {
        return {
            x: Math.random() * this.width,
            y: Math.random() * this.height,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            radius: Math.random() * 1.5 + 0.8
        };
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        document.addEventListener('mouseleave', () => {
            this.mouse.x = -1000;
            this.mouse.y = -1000;
        });
    }

    resize() {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
    }

    animate() {
        // Pseudo-clearing for slight motion blur effect
        this.ctx.fillStyle = '#050a0f'; 
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        const connectDistSq = 130 * 130; // Optimized distance calculation
        const mouseDistSq = 160 * 160;

        for (let i = 0; i < this.particles.length; i++) {
            let p = this.particles[i];
            
            p.x += p.vx;
            p.y += p.vy;
            
            if (p.x < 0 || p.x > this.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.height) p.vy *= -1;

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = SystemTheme.current.rgba;
            this.ctx.fill();

            for (let j = i + 1; j < this.particles.length; j++) {
                let p2 = this.particles[j];
                let dx = p.x - p2.x;
                let dy = p.y - p2.y;
                let distSq = dx * dx + dy * dy;

                if (distSq < connectDistSq) {
                    let opacity = 1 - Math.sqrt(distSq) / 130;
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(${SystemTheme.current.rgbBase}, ${opacity * 0.6})`;
                    this.ctx.lineWidth = 0.8;
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }

            let mdx = p.x - this.mouse.x;
            let mdy = p.y - this.mouse.y;
            let mDistSq = mdx * mdx + mdy * mdy;

            if (mDistSq < mouseDistSq) {
                let opacity = 1 - Math.sqrt(mDistSq) / 160;
                this.ctx.beginPath();
                this.ctx.strokeStyle = `rgba(57, 255, 20, ${opacity * 0.8})`;
                this.ctx.lineWidth = 1.2;
                this.ctx.moveTo(p.x, p.y);
                this.ctx.lineTo(this.mouse.x, this.mouse.y);
                this.ctx.stroke();
            }
        }
        requestAnimationFrame(() => this.animate());
    }
}

// ==========================================
// SUBSYSTEM: RADAR & TARGET ACQUISITION
// ==========================================
class RadarSystem {
    constructor() {
        this.container = document.querySelector('.radar-display');
        this.aziElement = document.getElementById('radar-azi');
        this.angle = 0;
        
        if (this.container && this.aziElement) {
            this.initEngine();
        }
    }

    initEngine() {
        // High-precision clock for smooth rotation tracking
        const sweepLoop = () => {
            this.angle = (this.angle + 1.5) % 360;
            this.aziElement.innerText = `${Utils.formatAzi(this.angle)}°`;
            requestAnimationFrame(sweepLoop);
        };
        requestAnimationFrame(sweepLoop);

        // Ambient threat generation
        setInterval(() => { if (Math.random() > 0.6) this.manifestBlip(); }, 4000);
    }

    manifestBlip(customLabel = null) {
        const blip = document.createElement('div');
        blip.className = 'radar-blip-anomaly';
        
        const radius = Utils.randInt(15, 42); 
        const rads = Math.random() * Math.PI * 2;
        
        blip.style.cssText = `
            position: absolute;
            left: ${50 + radius * Math.cos(rads)}%;
            top: ${50 + radius * Math.sin(rads)}%;
            width: 6px; height: 6px;
            background-color: var(--tac-cyan);
            border-radius: 50%;
            box-shadow: 0 0 10px var(--tac-cyan), 0 0 20px var(--tac-cyan);
            transform: translate(-50%, -50%);
            pointer-events: none;
            animation: pulse-fade 4s forwards ease-out;
        `;

        const label = document.createElement('span');
        label.style.cssText = `
            position: absolute; left: 10px; top: -5px;
            font-family: monospace; font-size: 8px;
            color: var(--tac-cyan); opacity: 0.7; white-space: nowrap;
        `;
        label.innerText = customLabel || `TRK_${Utils.randHex(4)}`;

        blip.appendChild(label);
        this.container.appendChild(blip);
        setTimeout(() => blip.remove(), 4000); // Garbage collection
    }
}

// ==========================================
// SUBSYSTEM: COMMAND LINE INTERFACE
// ==========================================
class CLIEngine {
    constructor(radarRef) {
        this.input = document.getElementById('sentient-input');
        this.res = document.getElementById('cli-response');
        this.radar = radarRef;
        
        this.history = [];
        this.historyIdx = -1;
        
        this.fileSystem = {
            "SYSTEM.LOG": "> ACTIVE NODE CORES: 32x // AGENT: NEGARIX // DEGRADATION: 0.00%",
            "NETWORK.CFG": "> GATEWAY: 10.240.1.1 // TUNNELS: LOND, WASH, TOKY, SYDN",
            "MANIFEST.DB": "> EXTRACTION SUITE ENGAGED. TLS 1.3 MATRIX COMPLIANCE MET."
        };

        if (this.input && this.res) this.bindEvents();
    }

    bindEvents() {
        this.input.addEventListener('keydown', (e) => this.handleKeystroke(e));
    }

    handleKeystroke(e) {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (this.history.length > 0) {
                this.historyIdx = this.historyIdx === -1 ? this.history.length - 1 : Math.max(0, this.historyIdx - 1);
                this.input.value = this.history[this.historyIdx];
            }
        }
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (this.historyIdx !== -1) {
                if (this.historyIdx < this.history.length - 1) {
                    this.historyIdx++;
                    this.input.value = this.history[this.historyIdx];
                } else {
                    this.historyIdx = -1;
                    this.input.value = '';
                }
            }
        }

        if (e.key === 'Enter' && this.input.value.trim() !== '') {
            const raw = this.input.value.trim();
            this.history.push(raw);
            if (this.history.length > 20) this.history.shift(); // Prevent memory bloat
            this.historyIdx = -1;
            
            this.input.value = '';
            this.res.innerText = '';
            
            setTimeout(() => this.parseCommand(raw), 150);
        }
    }

    parseCommand(rawCmd) {
        const [cmd, param] = rawCmd.toUpperCase().split(' ');
        
        const responses = {
            'HELP': `> CMDS: HELP, PING, SCAN, LS, CAT [FILE], THEME [GREEN/AMBER/DEFAULT], CLEAR`,
            'LS': `> FILES: SYSTEM.LOG, NETWORK.CFG, MANIFEST.DB`,
            'PING': `> TELEMETRY INTERCEPTED. ECHO DROPPED TO /DEV/NULL.`,
            'CLEAR': () => { this.res.innerText = ''; return null; },
            'WHOAMI': `> CRITICAL: ACCESS CONTROL MANDATORY. IDENTITY HIDDEN.`,
            'SUDO': `> CRITICAL: ACCESS CONTROL MANDATORY. IDENTITY HIDDEN.`
        };

        if (responses[cmd]) {
            const out = typeof responses[cmd] === 'function' ? responses[cmd]() : responses[cmd];
            if (out) new CrypticScrambler(this.res, out, 12);
            return;
        }

        // Complex Commands
        switch(cmd) {
            case 'SCAN':
                if (this.radar) {
                    this.radar.manifestBlip("SIGINT_ANOMALY");
                    setTimeout(() => this.radar.manifestBlip("UNKNOWN_UAV"), 300);
                    setTimeout(() => this.radar.manifestBlip("HOSTILE_VECTOR"), 600);
                }
                new CrypticScrambler(this.res, `> PINGING SECTOR... ACQUIRED THREE UNKNOWN VECTORS.`, 12);
                break;
            case 'CAT':
                if (!param) new CrypticScrambler(this.res, `> USAGE: 'CAT SYSTEM.LOG'`, 15);
                else if (this.fileSystem[param]) new CrypticScrambler(this.res, this.fileSystem[param], 12);
                else new CrypticScrambler(this.res, `> FILE DATA CORRUPTED OR ACCESS DENIED.`, 15);
                break;
            case 'THEME':
                if (SystemTheme.setTheme(param)) {
                    new CrypticScrambler(this.res, `> PARADIGM FLIPPED: EXECUTING [${param}] REDIRECT.`, 15);
                } else {
                    new CrypticScrambler(this.res, `> INVALID PARAM: USE [GREEN / AMBER / DEFAULT]`, 15);
                }
                break;
            default:
                new CrypticScrambler(this.res, `> REJECT: INTERPRETER DISALLOWED OPERATION [${cmd}]`, 20);
        }
    }
}

// ==========================================
// SYSTEM INITIALIZATION BOOTSTRAPPER
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Anti-Inspection Security
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('keydown', (e) => {
        if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I','J','C'].includes(e.key)) || (e.ctrlKey && ['u','s'].includes(e.key.toLowerCase()))) {
            e.preventDefault();
        }
    });

    // 2. Boot Sequence
    const bootSequence = document.getElementById('boot-sequence');
    const bootTerminal = document.getElementById('boot-terminal');
    if (bootSequence && bootTerminal) {
        const lines = [
            "CRITICAL ALERT: AUTHORITARIAN SECURITY PROTOCOLS ENFORCED.",
            "INITIALIZING 2048-QUBIT QUANTUM ENCRYPTION LATTICE......... [ENGAGED]",
            "ISOLATING HUMAN ELEMENT FROM LOGICAL NODE CHAINS........... [COMPLETE]",
            "SYNCHRONIZING WITH SYSTEM BOUNDARY COGNITIVE ARCHITECTURE... [ALIGNED]",
            "SYSTEM IS READY. WELCOME TO THE TRANSCENDENCE ARCHITECTURE."
        ];
        let i = 0;
        const printLine = () => {
            if (i < lines.length) {
                const div = document.createElement('div');
                div.className = 'boot-line';
                div.innerText = lines[i].includes("ALERT") ? `[!!] ${lines[i]}` : `> ${lines[i]}`;
                if (lines[i].includes("ALERT")) {
                    div.style.color = "var(--tac-red)";
                    div.style.textShadow = "0 0 6px rgba(255,51,51,0.6)";
                }
                bootTerminal.appendChild(div);
                i++;
                setTimeout(printLine, Utils.randInt(300, 600));
            } else {
                setTimeout(() => {
                    bootSequence.classList.add('boot-hidden');
                    setTimeout(() => bootSequence.style.display = 'none', 600);
                }, 600);
            }
        };
        printLine();
    }

    // 3. Initialize Core Subsystems
    new NeuralCanvas('neural-canvas');
    const radar = new RadarSystem();
    new CLIEngine(radar);

    // 4. UI Polish & Timers
    const coreBanner = document.getElementById('core-banner');
    if (coreBanner) setTimeout(() => new CrypticScrambler(coreBanner, 'NEGARIX // GLOBAL_SIGINT_C2', 35), 2500);

    document.querySelectorAll('.ghost-card').forEach(card => {
        const target = card.querySelector('.glitch-target');
        if (target) {
            const original = target.innerText;
            card.addEventListener('mouseenter', () => {
                new CrypticScrambler(target, Utils.randHex(original.length), 15);
                setTimeout(() => new CrypticScrambler(target, original, 15), 300);
            });
        }
    });

    setInterval(() => {
        document.querySelectorAll('.scramble').forEach(el => new CrypticScrambler(el, `0x${Utils.randHex(4)}`, 40));
    }, 6000);

    // SigInt Stream Generation
    const logContainer = document.getElementById('packet-stream');
    if (logContainer) {
        const actions = ["SIG_CAP", "REROUTE", "DEC_FAIL", "AUTH_OK", "DROP_MAL", "BEACON"];
        setInterval(() => {
            if (logContainer.children.length > 11) logContainer.lastElementChild.remove();
            const action = actions[Utils.randInt(0, actions.length - 1)];
            const color = (action === "DROP_MAL" || action === "DEC_FAIL") ? "var(--tac-red)" : (action === "AUTH_OK" ? "var(--tac-green)" : "var(--tac-cyan)");
            
            logContainer.insertAdjacentHTML('afterbegin', 
                `<div class="stream-line">
                    <span><span style="color:${color}">[${action}]</span> SRC:${Utils.randIP()}</span>
                    <span style="opacity:0.4;">0x${Utils.randHex(4)}</span>
                </div>`
            );
        }, 400);
    }
});