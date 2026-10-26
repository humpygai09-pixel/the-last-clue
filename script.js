
/* =========================================
   THE LAST CLUE
   Main JavaScript
   ========================================= */

"use strict";

/* ---------- CONFIGURATION ---------- */

const STORAGE_KEYS = {
    records: "lastClueRecords",
    player: "lastCluePlayer",
    admin: "lastClueAdminSession"
};

// Demo credentials only. Frontend credentials are not secure.
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "Detective2026!";

const MAX_SCORE = 10;

/* ---------- MYSTERY CASE DATABASE ---------- */

const CASES = [
    {
        id: "MP001",
        title: "The Vanishing Violinist",
        category: "Missing Person",
        icon: "♬",
        difficulty: "Easy",
        description:
            "Violinist Clara Bell disappeared from the music academy shortly before her evening performance. Her instrument and personal belongings were left behind.",
        clues: [
            {
                title: "The Practice Schedule",
                text: "The academy schedule shows Clara finished practice at 4:00 PM, earlier than her usual departure."
            },
            {
                title: "The Library Register",
                text: "A library register records Clara borrowing a book about music scholarships that afternoon."
            },
            {
                title: "The Unsent Message",
                text: "A draft message on Clara's own device says she planned to visit the scholarship office before leaving town."
            }
        ],
        options: [
            {
                name: "A planned departure",
                detail: "Clara may have left to pursue an opportunity without informing her friends."
            },
            {
                name: "A stolen violin",
                detail: "Someone entered the academy to take her instrument."
            },
            {
                name: "A cancelled performance",
                detail: "Clara stayed inside the academy and decided not to perform."
            }
        ],
        answer: 0,
        explanation:
            "The schedule, scholarship book, and draft message support the explanation that Clara planned to leave for an opportunity. The available clues do not establish every detail of her whereabouts."
    },
    {
        id: "MP002",
        title: "The Empty Art Studio",
        category: "Missing Person",
        icon: "✎",
        difficulty: "Medium",
        description:
            "Art student Leo Cruz did not arrive at a scheduled group exhibition. His classmates found his studio unlocked and his latest painting unfinished.",
        clues: [
            {
                title: "The Bus Receipt",
                text: "A receipt found among Leo's papers shows a bus ticket purchased for the neighboring city."
            },
            {
                title: "The Exhibition Note",
                text: "A note in Leo's planner says he needed to visit a relative before the exhibition."
            },
            {
                title: "The Painting",
                text: "The unfinished painting is signed and dated two days before the exhibition, matching Leo's usual working pattern."
            }
        ],
        options: [
            {
                name: "An unexpected family visit",
                detail: "Leo may have left to visit a relative and missed the exhibition."
            },
            {
                name: "A stolen painting",
                detail: "A thief removed the finished artwork from the studio."
            },
            {
                name: "A secret exhibition",
                detail: "Leo arranged a second exhibition without telling his classmates."
            }
        ],
        answer: 0,
        explanation:
            "The bus receipt and planner note support the possibility of a family visit. The clues do not prove why Leo missed the event, but this explanation best fits the evidence."
    },
    {
        id: "RB001",
        title: "The Museum's Missing Ruby",
        category: "Robbery",
        icon: "◇",
        difficulty: "Easy",
        description:
            "A display ruby disappeared during a museum event. Three staff members had access to the gallery, and the security log recorded a brief maintenance interruption.",
        clues: [
            {
                title: "The Access Log",
                text: "The access log shows the maintenance technician entered the display room during the interruption."
            },
            {
                title: "The Tool Case",
                text: "A tool case belonging to the technician was recorded leaving the room shortly afterward."
            },
            {
                title: "The Curator's Notes",
                text: "The curator's notes confirm the ruby was present shortly before maintenance began."
            }
        ],
        options: [
            {
                name: "An unauthorized removal during maintenance",
                detail: "The evidence suggests the display was accessed during the maintenance window."
            },
            {
                name: "A scheduled exhibit change",
                detail: "The ruby was removed as part of a planned exhibition update."
            },
            {
                name: "A visitor taking a photograph",
                detail: "A visitor accidentally moved the ruby while taking a picture."
            }
        ],
        answer: 0,
        explanation:
            "The access log and timing make the maintenance window the strongest lead. The evidence supports investigating an unauthorized removal, but it does not conclusively establish who took the ruby."
    },
    {
        id: "RB002",
        title: "The Missing Charity Funds",
        category: "Robbery",
        icon: "$",
        difficulty: "Medium",
        description:
            "Money collected for a school charity event does not match the amount in the final report. The committee must determine where the discrepancy occurred.",
        clues: [
            {
                title: "The First Count",
                text: "Two volunteers signed a count sheet recording the original amount collected."
            },
            {
                title: "The Expense Receipt",
                text: "A receipt shows that supplies were purchased using part of the collected funds, but the expense was not entered in the report."
            },
            {
                title: "The Final Report",
                text: "The final report lists the original collection total without deducting the documented supply expense."
            }
        ],
        options: [
            {
                name: "An unrecorded expense",
                detail: "The money discrepancy may be explained by a purchase omitted from the report."
            },
            {
                name: "A visitor stealing the collection box",
                detail: "A visitor removed the entire charity collection."
            },
            {
                name: "A counting error by both volunteers",
                detail: "Both volunteers independently recorded an incorrect original amount."
            }
        ],
        answer: 0,
        explanation:
            "The receipt and final report show a documented expense that was not recorded in the accounting summary. The first step is to correct the report and reconcile the remaining funds."
    },
    {
        id: "SA001",
        title: "The Anonymous Notes",
        category: "Stalking",
        icon: "⌕",
        difficulty: "Medium",
        description:
            "A student receives several unwanted anonymous notes. The school administration reviews the reports to determine which lead can be verified fairly.",
        clues: [
            {
                title: "The Paper Stock",
                text: "The notes use ordinary paper sold at several stores near the school."
            },
            {
                title: "The Delivery Window",
                text: "A hallway camera confirms a person entered the corridor during one delivery window, but the image is too unclear to identify them."
            },
            {
                title: "The Written Report",
                text: "The student saved the notes and recorded when each one appeared, creating a timeline for the administration."
            }
        ],
        options: [
            {
                name: "The sender is not yet identified",
                detail: "The available evidence is insufficient to identify the person responsible."
            },
            {
                name: "The person who sells paper",
                detail: "Anyone selling the paper must have written the notes."
            },
            {
                name: "The student who reported the notes",
                detail: "The person who received the notes must have written them."
            }
        ],
        answer: 0,
        explanation:
            "Ordinary paper and an unclear camera image do not identify a sender. A fair investigation documents incidents, preserves evidence, and avoids unsupported accusations."
    },
    {
        id: "SA002",
        title: "The Repeated Messages",
        category: "Stalking",
        icon: "✉",
        difficulty: "Hard",
        description:
            "A club member reports repeated unwanted messages from an unknown account. The club adviser needs to decide what the evidence actually establishes.",
        clues: [
            {
                title: "The Message Timeline",
                text: "Screenshots show repeated messages arriving over several days, including after the recipient asked for the contact to stop."
            },
            {
                title: "The Account Name",
                text: "The account uses a familiar nickname, but nicknames can be copied and do not verify identity."
            },
            {
                title: "The Platform Report",
                text: "The platform report confirms the account was flagged, but it does not disclose the account holder's identity."
            }
        ],
        options: [
            {
                name: "The account holder remains unverified",
                detail: "The messages establish repeated unwanted contact but not the sender's real identity."
            },
            {
                name: "The person with the matching nickname",
                detail: "The nickname alone proves that person sent the messages."
            },
            {
                name: "The platform support team",
                detail: "The team must have sent the messages because it received the report."
            }
        ],
        answer: 0,
        explanation:
            "The timeline supports the report of repeated unwanted contact, but the nickname and platform report do not prove who controlled the account. Preserve the evidence and report the behavior to the appropriate trusted authority."
    },
    {
        id: "MM001",
        title: "The Midnight Alibi",
        category: "Murder",
        icon: "♟",
        difficulty: "Hard",
        description:
            "In this fictional, non-graphic detective mystery, a gallery owner is found dead after a private event. Investigators compare statements and records to determine which alibi needs further verification.",
        clues: [
            {
                title: "The Guest Register",
                text: "The register records guest Adrian leaving at 8:30 PM, although Adrian says they stayed until 9:00 PM."
            },
            {
                title: "The Reception Clock",
                text: "A photograph taken at the reception shows the wall clock was five minutes slow that evening."
            },
            {
                title: "The Phone Call",
                text: "A call record confirms another guest spoke with Adrian at 8:45 PM, but the record does not show where either person was."
            }
        ],
        options: [
            {
                name: "Adrian's alibi needs verification",
                detail: "The time discrepancy makes Adrian's statement worth checking, but it does not prove guilt."
            },
            {
                name: "The receptionist committed the crime",
                detail: "The receptionist maintained the guest register."
            },
            {
                name: "The clock proves nobody could have left",
                detail: "A slow clock automatically invalidates every guest's statement."
            }
        ],
        answer: 0,
        explanation:
            "The conflicting times warrant follow-up and verification. An inconsistent alibi is a lead, not proof of a crime or proof that a particular person is responsible."
    },
    {
        id: "MM002",
        title: "The Locked Gallery",
        category: "Murder",
        icon: "▣",
        difficulty: "Hard",
        description:
            "In this fictional, non-graphic case, a gallery director is found dead after closing time. The detective reviews access records and witness statements without assuming that opportunity proves guilt.",
        clues: [
            {
                title: "The Door Record",
                text: "The electronic door record shows the gallery was opened with an authorized staff card after closing."
            },
            {
                title: "The Maintenance Notice",
                text: "A maintenance notice confirms several staff cards were temporarily reactivated during a system test."
            },
            {
                title: "The Witness Statement",
                text: "A witness heard a door close but could not identify the person who used it."
            }
        ],
        options: [
            {
                name: "The access record needs more context",
                detail: "The maintenance test may explain why an authorized card worked after closing."
            },
            {
                name: "The card owner is automatically guilty",
                detail: "The card's name proves that its owner committed the crime."
            },
            {
                name: "The witness identified the culprit",
                detail: "Hearing a door close is the same as identifying a person."
            }
        ],
        answer: 0,
        explanation:
            "The maintenance notice gives context to the access record, and the witness cannot identify anyone. More reliable evidence is needed before drawing a conclusion."
    }
];

/* ---------- APPLICATION STATE ---------- */

let currentPlayer = "";
let preferredCategory = "All";
let currentCase = null;
let inspectedClues = new Set();
let currentScore = 0;
let investigationRecordId = null;
let selectedAnswer = null;
let deductionSubmitted = false;
let records = [];
let adminAuthenticated = false;

/* ---------- STORAGE HELPERS ---------- */

function loadRecords() {
    try {
        const saved = localStorage.getItem(STORAGE_KEYS.records);
        const parsed = saved ? JSON.parse(saved) : [];

        records = Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.error("Unable to load game records:", error);
        records = [];
    }
}

function saveRecords() {
    try {
        localStorage.setItem(STORAGE_KEYS.records, JSON.stringify(records));
        return true;
    } catch (error) {
        console.error("Unable to save game records:", error);
        alert("The browser could not save your records. Check browser storage settings.");
        return false;
    }
}

function loadPlayer() {
    try {
        const saved = JSON.parse(
            sessionStorage.getItem(STORAGE_KEYS.player) || "null"
        );

        if (saved && typeof saved.name === "string") {
            currentPlayer = saved.name;
            preferredCategory = saved.category || "All";
        }
    } catch (error) {
        console.error("Unable to load player session:", error);
    }
}

function savePlayer() {
    try {
        sessionStorage.setItem(
            STORAGE_KEYS.player,
            JSON.stringify({
                name: currentPlayer,
                category: preferredCategory
            })
        );
    } catch (error) {
        console.error("Unable to save player session:", error);
    }
}

function makeId() {
    return "case-" + Date.now() + "-" +
        Math.random().toString(36).slice(2, 9);
}

/* ---------- SAFE HTML HELPERS ---------- */

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, function (character) {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[character];
    });
}

function formatDate(value) {
    if (!value) {
        return "—";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "—";
    }

    return date.toLocaleString();
}

function getCaseById(caseId) {
    return CASES.find(item => item.id === caseId);
}

/* ---------- PAGE NAVIGATION ---------- */

function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.toggle("active", page.id === pageId);
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function showHome() {
    showPage("home-page");
}

function showRegistration() {
    const nameField = document.getElementById("player-name");

    if (currentPlayer) {
        nameField.value = currentPlayer;
    }

    document.getElementById("player-category").value = preferredCategory;
    showPage("registration-page");
}

function showCases() {
    renderAllCases();
    showPage("cases-page");
}

function showAdminLogin() {
    if (adminAuthenticated) {
        renderAdminDashboard();
        showPage("admin-dashboard-page");
        return;
    }

    document.getElementById("admin-login-message").textContent = "";
    document.getElementById("admin-login-form").reset();
    showPage("admin-login-page");
}

/* ---------- CASE CARD RENDERING ---------- */

function createCaseCard(item) {
    const card = document.createElement("article");
    card.className = "case-card";

    card.innerHTML = `
        <div class="case-icon" aria-hidden="true">
            ${escapeHTML(item.icon)}
        </div>

        <span class="category-label">
            ${escapeHTML(item.category)}
        </span>

        <h3>${escapeHTML(item.title)}</h3>

        <p>${escapeHTML(item.description)}</p>

        <p>
            <strong>Difficulty:</strong>
            ${escapeHTML(item.difficulty)}
        </p>

        <button
            type="button"
            class="primary-button"
            data-case-id="${escapeHTML(item.id)}"
        >
            Investigate Case →
        </button>
    `;

    card.querySelector("button").addEventListener("click", function () {
        startInvestigation(item.id);
    });

    return card;
}

function renderFeaturedCases() {
    const container = document.getElementById("featured-cases");
    container.replaceChildren();

    CASES.slice(0, 3).forEach(item => {
        container.appendChild(createCaseCard(item));
    });
}

function renderAllCases() {
    const container = document.getElementById("all-cases");
    const filter = document.getElementById("category-filter").value;

    container.replaceChildren();

    const filtered = CASES.filter(item =>
        filter === "All" || item.category === filter
    );

    if (filtered.length === 0) {
        container.innerHTML = "<p>No cases found in this category.</p>";
        return;
    }

    filtered.forEach(item => {
        container.appendChild(createCaseCard(item));
    });
}

/* ---------- PLAYER REGISTRATION ---------- */

function registerPlayer(event) {
    event.preventDefault();

    const name = document.getElementById("player-name").value.trim();
    const category = document.getElementById("player-category").value;

    if (!name) {
        alert("Please enter your detective name.");
        return;
    }

    currentPlayer = name.slice(0, 50);
    preferredCategory = category;

    savePlayer();
    showCases();

    // Apply the selected category to the case filter.
    document.getElementById("category-filter").value = category;
    renderAllCases();
}

/* ---------- START INVESTIGATION ---------- */

function startInvestigation(caseId) {
    if (!currentPlayer) {
        showRegistration();
        return;
    }

    currentCase = getCaseById(caseId);

    if (!currentCase) {
        alert("This mystery case could not be found.");
        return;
    }

    inspectedClues = new Set();
    currentScore = 0;
    selectedAnswer = null;
    deductionSubmitted = false;

    investigationRecordId = makeId();

    records.push({
        id: investigationRecordId,
        player: currentPlayer,
        category: currentCase.category,
        caseId: currentCase.id,
        caseTitle: currentCase.title,
        score: 0,
        status: "Started",
        result: "",
        startedAt: new Date().toISOString(),
        finishedAt: null
    });

    saveRecords();

    document.getElementById("investigation-title").textContent =
        currentCase.title;

    document.getElementById("investigation-category").textContent =
        currentCase.category + " · " + currentCase.difficulty;

    document.getElementById("case-description").textContent =
        currentCase.description;

    document.getElementById("current-score").textContent = "0";
    document.getElementById("deduction-message").textContent = "";
    document.getElementById("deduction-message").className =
        "feedback-message";

    renderClues();
    renderAnswerOptions();
    updateClueProgress();

    showPage("investigation-page");
}

/* ---------- CLUE SYSTEM ---------- */

function renderClues() {
    const container = document.getElementById("clue-list");
    container.replaceChildren();

    currentCase.clues.forEach((clue, index) => {
        const card = document.createElement("article");
        card.className = "clue-card";

        card.innerHTML = `
            <h3>
                <span>Clue ${index + 1}</span>
                <span class="clue-number">EVIDENCE ${String(index + 1).padStart(2, "0")}</span>
            </h3>

            <p><strong>${escapeHTML(clue.title)}</strong></p>

            <p class="clue-content muted-text">
                This clue has not been examined yet.
            </p>

            <button
                type="button"
                class="secondary-button"
                data-clue-index="${index}"
            >
                Examine Clue
            </button>
        `;

        card.querySelector("button").addEventListener("click", function () {
            inspectClue(index, card);
        });

        container.appendChild(card);
    });
}

function inspectClue(index, card) {
    if (!currentCase || deductionSubmitted) {
        return;
    }

    const clue = currentCase.clues[index];
    const content = card.querySelector(".clue-content");
    const button = card.querySelector("button");

    content.textContent = clue.text;
    content.classList.remove("muted-text");
    content.classList.add("clue-revealed");

    card.classList.add("inspected");
    button.textContent = "Clue Examined";
    button.disabled = true;

    if (!inspectedClues.has(index)) {
        inspectedClues.add(index);
        updateClueProgress();
    }
}

function updateClueProgress() {
    if (!currentCase) {
        return;
    }

    const total = currentCase.clues.length;
    const examined = inspectedClues.size;

    document.getElementById("clue-progress").textContent =
        examined + " of " + total + " clues examined";

    document.getElementById("submit-deduction").disabled =
        examined !== total || deductionSubmitted;
}

/* ---------- ANSWER OPTIONS ---------- */

function renderAnswerOptions() {
    const container = document.getElementById("suspect-options");
    container.replaceChildren();

    currentCase.options.forEach((option, index) => {
        const label = document.createElement("label");
        label.className = "suspect-option";

        const input = document.createElement("input");
        input.type = "radio";
        input.name = "deduction";
        input.value = String(index);

        const description = document.createElement("span");
        description.innerHTML = `
            <strong>${escapeHTML(option.name)}</strong>
            <small>${escapeHTML(option.detail)}</small>
        `;

        input.addEventListener("change", function () {
            selectedAnswer = index;
        });

        label.appendChild(input);
        label.appendChild(description);
        container.appendChild(label);
    });
}

/* ---------- SCORING AND RESULTS ---------- */

function submitDeduction(event) {
    event.preventDefault();

    if (!currentCase || deductionSubmitted) {
        return;
    }

    if (inspectedClues.size !== currentCase.clues.length) {
        showDeductionMessage(
            "Examine every clue before submitting your deduction.",
            "error"
        );
        return;
    }

    if (selectedAnswer === null) {
        showDeductionMessage(
            "Please select an answer first.",
            "error"
        );
        return;
    }

    deductionSubmitted = true;

    const isCorrect = selectedAnswer === currentCase.answer;
    currentScore = isCorrect ? MAX_SCORE : 0;

    document.getElementById("current-score").textContent =
        String(currentScore);

    const record = records.find(
        item => item.id === investigationRecordId
    );

    if (record) {
        record.score = currentScore;
        record.status = "Completed";
        record.result = isCorrect ? "Correct" : "Incorrect";
        record.finishedAt = new Date().toISOString();
        saveRecords();
    }

    document.getElementById("result-symbol").textContent =
        isCorrect ? "✓" : "✦";

    document.getElementById("result-heading").textContent =
        isCorrect ? "Case Solved!" : "Case Closed";

    document.getElementById("result-description").textContent =
        isCorrect
            ? "Excellent deduction. You connected the evidence successfully."
            : "Your investigation is complete. Review the evidence and learn from this case.";

    document.getElementById("final-score").textContent =
        currentScore + " / " + MAX_SCORE;

    document.getElementById("result-player").textContent = currentPlayer;
    document.getElementById("result-case").textContent = currentCase.title;

    document.getElementById("correct-answer").textContent =
        currentCase.options[currentCase.answer].name;

    showDeductionMessage(
        "Explanation: " + currentCase.explanation,
        isCorrect ? "success" : "error"
    );

    document.querySelectorAll(
        "#suspect-options input, #clue-list button"
    ).forEach(control => {
        control.disabled = true;
    });

    document.getElementById("submit-deduction").disabled = true;

    renderAdminDashboard();
    showPage("results-page");
}

function showDeductionMessage(message, type) {
    const element = document.getElementById("deduction-message");
    element.textContent = message;
    element.className = "feedback-message " + type;
}

/* ---------- ADMIN AUTHENTICATION ---------- */

function adminLogin(event) {
    event.preventDefault();

    const username = document.getElementById("admin-username").value.trim();
    const password = document.getElementById("admin-password").value;

    const message = document.getElementById("admin-login-message");

    if (
        username === ADMIN_USERNAME &&
        password === ADMIN_PASSWORD
    ) {
        adminAuthenticated = true;

        try {
            sessionStorage.setItem(STORAGE_KEYS.admin, "true");
        } catch (error) {
            console.error("Unable to save admin session:", error);
        }

        message.textContent = "";
        document.getElementById("admin-login-form").reset();

        renderAdminDashboard();
        showPage("admin-dashboard-page");
    } else {
        message.textContent = "Incorrect username or password.";
        message.className = "feedback-message error";
    }
}

function adminLogout() {
    adminAuthenticated = false;

    try {
        sessionStorage.removeItem(STORAGE_KEYS.admin);
    } catch (error) {
        console.error("Unable to clear admin session:", error);
    }

    showHome();
}

/* ---------- ADMIN DASHBOARD ---------- */

function renderAdminDashboard() {
    if (!adminAuthenticated) {
        return;
    }

    loadRecords();

    const completed = records.filter(
        item => item.status === "Completed"
    );

    const uniquePlayers = new Set(
        records.map(item => item.player)
    );

    const completionRate = records.length
        ? Math.round((completed.length / records.length) * 100)
        : 0;

    const averageScore = completed.length
        ? (
            completed.reduce((sum, item) => sum + Number(item.score || 0), 0)
            / completed.length
        ).toFixed(1)
        : "0";

    document.getElementById("stat-players").textContent =
        uniquePlayers.size;

    document.getElementById("stat-started").textContent =
        records.length;

    document.getElementById("stat-completed").textContent =
        completed.length;

    document.getElementById("stat-completion-rate").textContent =
        completionRate + "%";

    document.getElementById("stat-average-score").textContent =
        averageScore + " / " + MAX_SCORE;

    renderCategoryStats();
    renderRecordsTable();
}

function renderCategoryStats() {
    const container = document.getElementById("category-stats");
    container.replaceChildren();

    const counts = {};

    CASES.forEach(item => {
        counts[item.category] = 0;
    });

    records.forEach(record => {
        if (Object.prototype.hasOwnProperty.call(counts, record.category)) {
            counts[record.category]++;
        }
    });

    const maxCount = Math.max(1, ...Object.values(counts));

    Object.entries(counts).forEach(([category, count]) => {
        const row = document.createElement("div");
        row.className = "bar-row";

        const name = document.createElement("span");
        name.textContent = category;

        const bar = document.createElement("div");
        bar.className = "bar";

        const fill = document.createElement("span");
        fill.style.width = (count / maxCount * 100) + "%";
        bar.appendChild(fill);

        const number = document.createElement("strong");
        number.textContent = String(count);

        row.append(name, bar, number);
        container.appendChild(row);
    });
}

/* ---------- PLAYER RECORDS TABLE ---------- */

function renderRecordsTable() {
    const tbody = document.getElementById("records-table-body");
    const search = document.getElementById("record-search")
        .value.trim().toLowerCase();

    tbody.replaceChildren();

    const filtered = records
        .filter(record => {
            const searchable = [
                record.player,
                record.category,
                record.caseTitle,
                record.status,
                record.result
            ].join(" ").toLowerCase();

            return searchable.includes(search);
        })
        .slice()
        .reverse();

    if (filtered.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");

        cell.colSpan = 6;
        cell.className = "empty-records";
        cell.textContent = records.length
            ? "No matching records found."
            : "No player records yet. Start a mystery to create a record.";

        row.appendChild(cell);
        tbody.appendChild(row);
    } else {
        filtered.forEach(record => {
            const row = document.createElement("tr");

            const values = [
                record.player,
                record.category,
                record.caseTitle,
                record.status === "Completed"
                    ? Number(record.score || 0) + " / " + MAX_SCORE
                    : "—",
                record.status,
                formatDate(record.finishedAt || record.startedAt)
            ];

            values.forEach((value, index) => {
                const cell = document.createElement("td");
                cell.textContent = value || "—";

                if (index === 4) {
                    cell.className = record.status === "Completed"
                        ? "status-completed"
                        : "status-started";
                }

                row.appendChild(cell);
            });

            tbody.appendChild(row);
        });
    }

    document.getElementById("record-count").textContent =
        filtered.length + " of " + records.length + " records";
}

/* ---------- CSV EXPORT ---------- */

function csvCell(value) {
    const safeValue = String(value ?? "");

    // Prevent spreadsheet formulas from being interpreted as formulas.
    const protectedValue = /^[\s]*[=+\-@]/.test(safeValue)
        ? "'" + safeValue
        : safeValue;

    return '"' + protectedValue.replace(/"/g, '""') + '"';
}

function exportRecordsCSV() {
    if (!adminAuthenticated) {
        alert("Please sign in as an administrator first.");
        return;
    }

    loadRecords();

    if (records.length === 0) {
        alert("There are no records to export yet.");
        return;
    }

    const headers = [
        "Detective",
        "Category",
        "Case",
        "Score",
        "Status",
        "Result",
        "Started At",
        "Finished At"
    ];

    const rows = records.map(record => [
        record.player,
        record.category,
        record.caseTitle,
        record.score,
        record.status,
        record.result,
        record.startedAt,
        record.finishedAt
    ]);

    const csv = [
        headers.map(csvCell).join(","),
        ...rows.map(row => row.map(csvCell).join(","))
    ].join("\r\n");

    const blob = new Blob(
        ["\uFEFF" + csv],
        { type: "text/csv;charset=utf-8;" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "the-last-clue-records.csv";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
}

/* ---------- CLEAR RECORDS ---------- */

function clearRecords() {
    if (!adminAuthenticated) {
        alert("Please sign in as an administrator first.");
        return;
    }

    if (records.length === 0) {
        alert("There are no records to clear.");
        return;
    }

    const confirmed = confirm(
        "Are you sure you want to permanently clear all saved game records from this browser? This cannot be undone."
    );

    if (!confirmed) {
        return;
    }

    records = [];
    saveRecords();
    renderAdminDashboard();
}

/* ---------- EVENT LISTENERS ---------- */

function initializeApp() {
    loadRecords();
    loadPlayer();

    document.getElementById("registration-form")
        .addEventListener("submit", registerPlayer);

    document.getElementById("deduction-form")
        .addEventListener("submit", submitDeduction);

    document.getElementById("admin-login-form")
        .addEventListener("submit", adminLogin);

    document.getElementById("category-filter")
        .addEventListener("change", renderAllCases);

    document.getElementById("record-search")
        .addEventListener("input", renderRecordsTable);

    renderFeaturedCases();
    renderAllCases();

    try {
        adminAuthenticated =
            sessionStorage.getItem(STORAGE_KEYS.admin) === "true";
    } catch (error) {
        adminAuthenticated = false;
    }

    if (adminAuthenticated) {
        renderAdminDashboard();
    }

    showHome();
}

document.addEventListener("DOMContentLoaded", initializeApp);
