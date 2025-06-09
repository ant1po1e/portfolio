function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const phrases = ["> Game Developer", "> Desktop Developer", "> Photographer"];
const el = document.getElementById("typewriter");

let sleepTime = 100

let curPhraseIndex = 0;

const writeLoop = async () => {
    while (true) {
        let curWord = phrases[curPhraseIndex];

        for (let i = 0; i < curWord.length; i++) {
            el.innerText = curWord.substring(0, i + 1);
            await sleep(sleepTime);
        }

        await sleep(sleepTime * 10);

        for (let i = curWord.length; i > 0; i--) {
            el.innerText = curWord.substring(0, i - 1);
            await sleep(sleepTime);
        }

        await sleep(sleepTime * 5);

        if (curPhraseIndex === phrases.length - 1) {
            curPhraseIndex = 0;
        } else {
            curPhraseIndex++;
        }
    }
};

writeLoop();

function toggleAccordion(id, button) {
    const content = document.getElementById(id);
    if (!content) return;

    const isMainAccordion = content.closest('[data-group="main"]') !== null && content.hasAttribute('data-group');

    let scope;
    if (isMainAccordion) {
        scope = document.querySelector('[data-group="main"]');
    } else {
        scope = content.closest('[data-group]');
    }

    if (!scope) return;

    const allPanels = scope.querySelectorAll('div[id]');
    const allIcons = scope.querySelectorAll('[data-icon]');

    allPanels.forEach(panel => {
        if (panel.id !== id) {
            panel.classList.add('hidden');
        }
    });

    allIcons.forEach(icon => {
        icon.classList.remove('bi-caret-down-fill');
        icon.classList.add('bi-caret-right-fill');
    });

    const isHidden = content.classList.contains('hidden');
    if (isHidden) {
        content.classList.remove('hidden');
        const icon = button.querySelector('[data-icon]');
        if (icon) {
            icon.classList.remove('bi-caret-right-fill');
            icon.classList.add('bi-caret-down-fill');
        }
    } else {
        content.classList.add('hidden');
    }
}

function toggleContent(id, type) {
    const contents = document.querySelectorAll('[id$="-content"]');
    contents.forEach(el => el.classList.add('hidden'));

    const target = document.getElementById(id);
    if (target) {
        target.classList.remove('hidden');
    }

    const title = id.replace('-content', type);
    const titleEl = document.getElementById('content-title');
    if (titleEl) {
        titleEl.textContent = title;
    }
}


fetch('../dist/js/experience.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('experience-section');
        let lines = [
            '<h2 class="text-[#5c6370] mb-5 font-mono leading-relaxed">'
        ];

        let lineNum = 1;
        const addLine = (text) => {
            lines.push(
                `<span class="text-[#3e4451]">${lineNum.toString().padStart(2, '\u00a0')}</span>&nbsp;&nbsp;&nbsp;${text}<br>`
            );
            lineNum++;
        };

        addLine('<span class="text-[#5c6370]">// Work Experience</span>', 1);
        addLine('<span class="text-[#c677d1]">public</span> <span class="text-[#c677d1]">class</span> <span class="text-[#61afef]">Experience</span> <span class="text-[#bbbbbb]">{</span>');
        addLine('&nbsp;&nbsp;&nbsp;<span class="text-[#c677d1]">public</span> <span class="text-[#c677d1]">List</span>&lt;<span class="text-[#61afef]">Job</span>&gt; <span class="text-[#d19a66]">Jobs</span> =&gt; <span class="text-[#c678dd]">new</span>() <span class="text-[#bbbbbb]">{</span>');

        data.forEach((job, index) => {
            addLine('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#bbbbbb]">{</span>');
            addLine(`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#d19a66]">Company</span>: <span class="text-[#98b75d]">"</span><span class="text-[#98b75d]">${job.company}</span><span class="text-[#98b75d]">"</span>,`);
            addLine(`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#d19a66]">Type</span>: <span class="text-[#98b75d]">"</span><span class="text-[#98b75d]">${job.type}</span><span class="text-[#98b75d]">"</span>,`);
            addLine(`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#d19a66]">Period</span>: <span class="text-[#98b75d]">"</span><span class="text-[#98b75d]">${job.period}</span><span class="text-[#98b75d]">"</span>,`);
            addLine(`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#d19a66]">Role</span>: <span class="text-[#98b75d]">"</span><span class="text-[#98b75d]">${job.role}</span><span class="text-[#98b75d]">"</span>`);
            addLine(`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#bbbbbb]">}${index < data.length - 1 ? ',' : ''}</span>`);
        });

        addLine('&nbsp;&nbsp;<span class="text-[#bbbbbb]">};</span>');
        addLine('<span class="text-[#bbbbbb]">}</span>');
        lines.push('</h2>');

        container.innerHTML = lines.join('');
    });