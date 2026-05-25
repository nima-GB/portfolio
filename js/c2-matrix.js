document.addEventListener("DOMContentLoaded", () => {
    
    // Core Utility Functions for Randomization
    const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const randHex = (len) => [...Array(len)].map(() => Math.floor(Math.random() * 16).toString(16)).join('').toUpperCase();
    const randIP = () => `${randInt(10,240)}.${randInt(1,254)}.${randInt(0,254)}.${randInt(1,254)}`;

    // --- CYBER REALISM DECRYPTION SCRAMBLER CLASS ENGINE ---
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

    // Initialize Global Decrypt Loops for Banners
    const coreBanner = document.getElementById('core-banner');
    if (coreBanner) {
        setTimeout(() => new CrypticScrambler(coreBanner, 'NEGARIX // GLOBAL_SIGINT_C2', 40), 300);
    }
    
    // Dynamic Node Cipher Scrambling Routine
    function scrambleNodeCiphers() {
        document.querySelectorAll('.scramble').forEach(el => {
            new CrypticScrambler(el, `0x${randHex(4)}`, 50);
        });
    }
    setInterval(scrambleNodeCiphers, 5000);
    scrambleNodeCiphers();

    // --- REALTIME AUTOMATED SDR SPECTROGRAM CORE ---
    const specContainer = document.getElementById('spectrum-display');
    const freqDisplay = document.getElementById('freq-fhs');
    if (specContainer && freqDisplay) {
        const totalBars = 22;
        const barElements = [];
        
        for(let i=0; i<totalBars; i++) {
            const bar = document.createElement('div');
            bar.className = 'spectrum-bar';
            specContainer.appendChild(bar);
            barElements.push(bar);
        }

        setInterval(() => {
            barElements.forEach(bar => {
                const dynamicHeight = randInt(15, 95);
                bar.style.height = `${dynamicHeight}%`;
            });
            freqDisplay.innerText = `${(433.920 + (Math.random() * 2 - 1) * 0.15).toFixed(3)} MHz`;
        }, 120);
    }

    // --- SIGINT CAPTURE STREAM ENGINE ---
    const logContainer = document.getElementById('packet-stream');
    if (logContainer) {
        const actions = ["SIG_CAP", "REROUTE", "DEC_FAIL", "AUTH_OK", "DROP_MAL", "BEACON"];
        
        function injectSigintLog() {
            if (logContainer.children.length > 12) logContainer.removeChild(logContainer.lastChild);
            
            const action = actions[randInt(0, actions.length - 1)];
            let opColor = "var(--tac-cyan)";
            if(action === "DROP_MAL" || action === "DEC_FAIL") opColor = "var(--tac-red)";
            if(action === "AUTH_OK") opColor = "var(--tac-green)";
            
            const entry = document.createElement('div');
            entry.className = 'stream-line';
            entry.innerHTML = `
                <span><span style="color:${opColor}">[${action}]</span> NTWRK:${randIP()}</span>
                <span style="opacity:0.5;">0x${randHex(4)}</span>
            `;
            logContainer.insertBefore(entry, logContainer.firstChild);
        }
        setInterval(injectSigintLog, 350);
    }

    // --- PERPETUAL SYSTEM TELEMETRY COUNTERS ---
    const sysEpoch = document.getElementById('sys-epoch');
    const radarAzi = document.getElementById('radar-azi');
    const geoTelemetry = document.getElementById('geo-telemetry');

    if (sysEpoch && radarAzi && geoTelemetry) {
        setInterval(() => {
            sysEpoch.innerText = Math.floor(Date.now() / 1000);
            radarAzi.innerText = `${randInt(0, 359)}°`;
            geoTelemetry.innerText = 
                `${(51.5074 + (Math.random() * 2 - 1) * 0.05).toFixed(4)}° N, ${(0.1278 - (Math.random() * 2 - 1) * 0.05).toFixed(4)}° E`;
        }, 1000);
    }
});