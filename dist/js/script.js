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


fetch('../dist/data/experience.json')
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

fetch('../dist/data/projects.json')
    .then(response => response.json())
    .then(data => {
        const sections = {
            web: document.querySelector('#web-projects .flex-wrap'),
            desktop: document.querySelector('#desktop-projects .flex-wrap'),
            unity: document.querySelector('#unity-projects .flex-wrap')
        };

        data.forEach(project => {
            const card = document.createElement('div');
            card.className =
                'relative w-[48%] rounded-xl overflow-hidden shadow-xl border border-[#404551] bg-[#282c34]] backdrop-blur-sm font-mono';

            card.innerHTML = `
        <div class="flex items-center space-x-2 px-3 py-2 border-b border-[#404551] bg-[#282c34]">
            <span class="w-3 h-3 bg-red-500 rounded-full"></span>
            <span class="w-3 h-3 bg-yellow-400 rounded-full"></span>
            <span class="w-3 h-3 bg-green-500 rounded-full"></span>
            <span class="ml-auto text-[#888] text-xs select-none">${project.filename}</span>
        </div>
        <div class="relative group">
            <img src="${project.image}" alt="${project.title}" class="w-full h-auto object-cover transition duration-300" />
            <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300">
                <div class="bg-white bg-opacity-70 px-4 py-4 rounded">
                <img src="https://skillicons.dev/icons?i=${project.stack}" alt="Stack">
                </div>
            </div>
        </div>

        <div class="p-4 font-mono text-white">
            <h4 class="font-bold text-lg mb-1">${project.title}</h4>
            <p class="text-[#7c7f85] text-base">${project.desc}</p>
        <a href="${project.url}" target="_blank"
                                    class="relative flex items-center justify-start mt-2 py-2 pl-4 pr-12 overflow-hidden font-semibold text-white transition-all duration-150 ease-in-out rounded md:hover:pl-10 md:hover:pr-6 group">View Project
                                    <span
                                        class="absolute left-0 pl-2.5 -translate-x-12 md:group-hover:translate-x-0 ease-out duration-200">
                                        >
                                    </span>
                                </a>
        </div>
      `;

            const section = sections[project.type];
            if (section) section.appendChild(card);
        });
    });

function toggleFilter(sectionId) {
    const sections = ['web-projects', 'desktop-projects', 'unity-projects'];

    sections.forEach(id => {
        const section = document.getElementById(id);
        if (!section) return;

        if (sectionId === 'show-all-projects') {
            section.classList.remove('hidden');
        } else {
            section.classList.toggle('hidden', id !== sectionId);
        }
    });

    const title = sectionId.replace('-projects', '.cs');
    const titleEl = document.getElementById('content-title');
    if (titleEl) {
        titleEl.textContent = title;
    }
}