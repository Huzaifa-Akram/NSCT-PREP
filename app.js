// Theme switching - Force dark mode
document.documentElement.classList.add("dark");

const state = {
  mcq: [],
  dsa: [],
  networking: [],
  os: [],
  ai: [],
  database: [],
  web: [],
  showAllAnswers: false,
  showAllNetworkingAnswers: false,
  showAllOsAnswers: false,
  showAllAiAnswers: false,
  showAllDatabaseAnswers: false,
  showAllWebAnswers: false,
  activeTab: "mcq",
};

const mcqContainer = document.getElementById("mcq-container");
const dsaContainer = document.getElementById("dsa-container");
const networkingContainer = document.getElementById("networking-container");
const osContainer = document.getElementById("os-container");
const aiContainer = document.getElementById("ai-container");
const databaseContainer = document.getElementById("database-container");
const webContainer = document.getElementById("web-container");
const randomMcqBtn = document.getElementById("new-random-mcq");
const showAllAnswersBtn = document.getElementById("toggle-all-answers");
const randomNetworkingBtn = document.getElementById("new-random-networking");
const showAllNetworkingAnswersBtn = document.getElementById(
  "toggle-all-networking-answers",
);
const randomOsBtn = document.getElementById("new-random-os");
const showAllOsAnswersBtn = document.getElementById("toggle-all-os-answers");
const randomAiBtn = document.getElementById("new-random-ai");
const showAllAiAnswersBtn = document.getElementById("toggle-all-ai-answers");
const randomDatabaseBtn = document.getElementById("new-random-database");
const showAllDatabaseAnswersBtn = document.getElementById(
  "toggle-all-database-answers",
);
const randomWebBtn = document.getElementById("new-random-web");
const showAllWebAnswersBtn = document.getElementById("toggle-all-web-answers");
const mcqTabBtn = document.getElementById("tab-btn-mcq");
const dsaTabBtn = document.getElementById("tab-btn-dsa");
const networkingTabBtn = document.getElementById("tab-btn-networking");
const osTabBtn = document.getElementById("tab-btn-os");
const aiTabBtn = document.getElementById("tab-btn-ai");
const databaseTabBtn = document.getElementById("tab-btn-database");
const webTabBtn = document.getElementById("tab-btn-web");
const mcqTabPanel = document.getElementById("tab-mcq");
const dsaTabPanel = document.getElementById("tab-dsa");
const networkingTabPanel = document.getElementById("tab-networking");
const osTabPanel = document.getElementById("tab-os");
const aiTabPanel = document.getElementById("tab-ai");
const databaseTabPanel = document.getElementById("tab-database");
const webTabPanel = document.getElementById("tab-web");

const mcqTemplate = document.getElementById("mcq-template");

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    let dsaQuestions = [];
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function switchTab(tab) {
  state.activeTab = tab;

  const mcqActive = tab === "mcq";
  const dsaActive = tab === "dsa";
  const networkingActive = tab === "networking";
  const osActive = tab === "os";
  const aiActive = tab === "ai";
  const databaseActive = tab === "database";
  const webActive = tab === "web";

  const tabPanels = [
    [mcqTabPanel, mcqActive],
    [dsaTabPanel, dsaActive],
    [networkingTabPanel, networkingActive],
    [osTabPanel, osActive],
    [aiTabPanel, aiActive],
    [databaseTabPanel, databaseActive],
    [webTabPanel, webActive],
  ];

  tabPanels.forEach(([panel, isActive]) => {
    if (panel) {
      panel.classList.toggle("hidden", !isActive);
    }
  });

  const tabButtons = [
    [mcqTabBtn, mcqActive],
    [dsaTabBtn, dsaActive],
    [networkingTabBtn, networkingActive],
    [osTabBtn, osActive],
    [aiTabBtn, aiActive],
    [databaseTabBtn, databaseActive],
    [webTabBtn, webActive],
  ];

  tabButtons.forEach(([button, isActive]) => {
    if (button) {
      button.classList.toggle("tab-btn-active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    }
  });
}

// Ensure tabs work on page load
document.addEventListener("DOMContentLoaded", () => {
  switchTab(state.activeTab);
});

// Networking MCQS loader and renderer

fetch("data/Networking.json")
  .then((res) => res.json())
  .then((data) => {
    state.networking = normalizeNetworkingData(data);
    renderNetworkingMCQS();
  });

// OS MCQS loader and renderer

fetch("data/Operating-System.json")
  .then((res) => res.json())
  .then((data) => {
    state.os = normalizeOsData(data);
    renderOsMCQS();
  });

// AI MCQS loader and renderer

fetch("data/AI.json")
  .then((res) => res.json())
  .then((data) => {
    state.ai = normalizeAiData(data);
    renderAiMCQS();
  });

// Database MCQS loader and renderer
fetch("data/Database.json")
  .then((res) => res.json())
  .then((data) => {
    state.database = normalizeDatabaseData(data);
    renderDatabaseMCQS();
  });

// Web MCQS loader and renderer
fetch("data/Web.json")
  .then((res) => res.json())
  .then((data) => {
    state.web = normalizeWebData(data);
    renderWebMCQS();
  });

function renderNetworkingMCQS() {
  networkingContainer.innerHTML = "";
  if (!state.networking.length) {
    networkingContainer.innerHTML =
      '<p class="rounded-xl border border-dashed border-slate-300 bg-white/70 p-5 text-sm">No Networking MCQ questions available yet.</p>';
    return;
  }
  state.networking.forEach((question, index) => {
    networkingContainer.appendChild(createNetworkingCard(question, index));
  });
}

function renderOsMCQS() {
  osContainer.innerHTML = "";
  if (!state.os.length) {
    osContainer.innerHTML =
      '<p class="rounded-xl border border-dashed border-slate-300 bg-white/70 p-5 text-sm">No OS MCQ questions available yet.</p>';
    return;
  }
  state.os.forEach((question, index) => {
    osContainer.appendChild(createOsCard(question, index));
  });
}

function renderAiMCQS() {
  aiContainer.innerHTML = "";
  if (!state.ai.length) {
    aiContainer.innerHTML =
      '<p class="rounded-xl border border-dashed border-slate-300 bg-white/70 p-5 text-sm">No AI MCQ questions available yet.</p>';
    return;
  }
  state.ai.forEach((question, index) => {
    aiContainer.appendChild(createAiCard(question, index));
  });
}

function renderDatabaseMCQS() {
  databaseContainer.innerHTML = "";
  if (!state.database.length) {
    databaseContainer.innerHTML =
      '<p class="rounded-xl border border-dashed border-slate-300 bg-white/70 p-5 text-sm">No Database MCQ questions available yet.</p>';
    return;
  }
  state.database.forEach((question, index) => {
    databaseContainer.appendChild(createDatabaseCard(question, index));
  });
}

function renderWebMCQS() {
  webContainer.innerHTML = "";
  if (!state.web.length) {
    webContainer.innerHTML =
      '<p class="rounded-xl border border-dashed border-slate-300 bg-white/70 p-5 text-sm">No Web MCQ questions available yet.</p>';
    return;
  }
  state.web.forEach((question, index) => {
    webContainer.appendChild(createWebCard(question, index));
  });
}

function createNetworkingCard(question, index) {
  const node = mcqTemplate.content.cloneNode(true);
  const title = node.querySelector(".question-title");
  const prompt = node.querySelector(".question-prompt");
  const optionsWrap = node.querySelector(".options");
  const showAnswerBtn = node.querySelector(".show-answer-btn");
  const answerBox = node.querySelector(".answer-box");
  const resultMsg = node.querySelector(".result-msg");

  title.textContent = `Networking Q${index + 1}`;
  prompt.textContent = question.question;

  question.options.forEach((optionText, optionIndex) => {
    const optionButton = document.createElement("button");
    optionButton.type = "button";
    optionButton.className = "option-btn";
    optionButton.textContent = optionText;
    optionButton.addEventListener("click", () => {
      const allButtons = optionsWrap.querySelectorAll(".option-btn");
      allButtons.forEach((btn) => {
        btn.classList.remove("selected", "correct", "wrong");
      });
      optionButton.classList.add("selected");
      const isCorrect = optionIndex === question.correctIndex;
      optionButton.classList.add(isCorrect ? "correct" : "wrong");
      resultMsg.textContent = isCorrect ? "Correct" : "Wrong";
      resultMsg.className = `result-msg text-sm font-semibold ${isCorrect ? "text-teal-700" : "text-red-600"}`;
    });
    optionsWrap.appendChild(optionButton);
  });

  showAnswerBtn.addEventListener("click", () => {
    answerBox.classList.remove("hidden");
    answerBox.innerHTML = `<strong>Answer:</strong> ${question.options[question.correctIndex]}${question.note ? `<br /><strong>Note:</strong> ${question.note}` : ""}`;
  });

  if (state.showAllNetworkingAnswers) {
    answerBox.classList.remove("hidden");
    answerBox.innerHTML = `<strong>Answer:</strong> ${question.options[question.correctIndex]}${question.note ? `<br /><strong>Note:</strong> ${question.note}` : ""}`;
  }

  return node;
}

function createOsCard(question, index) {
  const node = mcqTemplate.content.cloneNode(true);
  const title = node.querySelector(".question-title");
  const prompt = node.querySelector(".question-prompt");
  const optionsWrap = node.querySelector(".options");
  const showAnswerBtn = node.querySelector(".show-answer-btn");
  const answerBox = node.querySelector(".answer-box");
  const resultMsg = node.querySelector(".result-msg");

  title.textContent = `OS Q${index + 1}`;
  prompt.textContent = question.question;

  question.options.forEach((optionText, optionIndex) => {
    const optionButton = document.createElement("button");
    optionButton.type = "button";
    optionButton.className = "option-btn";
    optionButton.textContent = optionText;
    optionButton.addEventListener("click", () => {
      const allButtons = optionsWrap.querySelectorAll(".option-btn");
      allButtons.forEach((btn) => {
        btn.classList.remove("selected", "correct", "wrong");
      });
      optionButton.classList.add("selected");
      const isCorrect = optionIndex === question.correctIndex;
      optionButton.classList.add(isCorrect ? "correct" : "wrong");
      resultMsg.textContent = isCorrect ? "Correct" : "Wrong";
      resultMsg.className = `result-msg text-sm font-semibold ${isCorrect ? "text-teal-700" : "text-red-600"}`;
    });
    optionsWrap.appendChild(optionButton);
  });

  showAnswerBtn.addEventListener("click", () => {
    answerBox.classList.remove("hidden");
    answerBox.innerHTML = `<strong>Answer:</strong> ${question.options[question.correctIndex]}${question.note ? `<br /><strong>Note:</strong> ${question.note}` : ""}`;
  });

  if (state.showAllOsAnswers) {
    answerBox.classList.remove("hidden");
    answerBox.innerHTML = `<strong>Answer:</strong> ${question.options[question.correctIndex]}${question.note ? `<br /><strong>Note:</strong> ${question.note}` : ""}`;
  }

  return node;
}

function createAiCard(question, index) {
  const node = mcqTemplate.content.cloneNode(true);
  const title = node.querySelector(".question-title");
  const prompt = node.querySelector(".question-prompt");
  const optionsWrap = node.querySelector(".options");
  const showAnswerBtn = node.querySelector(".show-answer-btn");
  const answerBox = node.querySelector(".answer-box");
  const resultMsg = node.querySelector(".result-msg");

  title.textContent = `AI Q${index + 1}`;
  prompt.textContent = question.question;

  question.options.forEach((optionText, optionIndex) => {
    const optionButton = document.createElement("button");
    optionButton.type = "button";
    optionButton.className = "option-btn";
    optionButton.textContent = optionText;
    optionButton.addEventListener("click", () => {
      const allButtons = optionsWrap.querySelectorAll(".option-btn");
      allButtons.forEach((btn) => {
        btn.classList.remove("selected", "correct", "wrong");
      });
      optionButton.classList.add("selected");
      const isCorrect = optionIndex === question.correctIndex;
      optionButton.classList.add(isCorrect ? "correct" : "wrong");
      resultMsg.textContent = isCorrect ? "Correct" : "Wrong";
      resultMsg.className = `result-msg text-sm font-semibold ${isCorrect ? "text-teal-700" : "text-red-600"}`;
    });
    optionsWrap.appendChild(optionButton);
  });

  showAnswerBtn.addEventListener("click", () => {
    answerBox.classList.remove("hidden");
    answerBox.innerHTML = `<strong>Answer:</strong> ${question.options[question.correctIndex]}${question.note ? `<br /><strong>Note:</strong> ${question.note}` : ""}`;
  });

  if (state.showAllAiAnswers) {
    answerBox.classList.remove("hidden");
    answerBox.innerHTML = `<strong>Answer:</strong> ${question.options[question.correctIndex]}${question.note ? `<br /><strong>Note:</strong> ${question.note}` : ""}`;
  }

  return node;
}

function createDatabaseCard(question, index) {
  const node = mcqTemplate.content.cloneNode(true);
  const title = node.querySelector(".question-title");
  const prompt = node.querySelector(".question-prompt");
  const optionsWrap = node.querySelector(".options");
  const showAnswerBtn = node.querySelector(".show-answer-btn");
  const answerBox = node.querySelector(".answer-box");
  const resultMsg = node.querySelector(".result-msg");

  title.textContent = `Database Q${index + 1}`;
  prompt.textContent = question.question;

  question.options.forEach((optionText, optionIndex) => {
    const optionButton = document.createElement("button");
    optionButton.type = "button";
    optionButton.className = "option-btn";
    optionButton.textContent = optionText;
    optionButton.addEventListener("click", () => {
      const allButtons = optionsWrap.querySelectorAll(".option-btn");
      allButtons.forEach((btn) => {
        btn.classList.remove("selected", "correct", "wrong");
      });
      optionButton.classList.add("selected");
      const isCorrect = optionIndex === question.correctIndex;
      optionButton.classList.add(isCorrect ? "correct" : "wrong");
      resultMsg.textContent = isCorrect ? "Correct" : "Wrong";
      resultMsg.className = `result-msg text-sm font-semibold ${isCorrect ? "text-teal-700" : "text-red-600"}`;
    });
    optionsWrap.appendChild(optionButton);
  });

  showAnswerBtn.addEventListener("click", () => {
    answerBox.classList.remove("hidden");
    answerBox.innerHTML = `<strong>Answer:</strong> ${question.options[question.correctIndex]}${question.note ? `<br /><strong>Note:</strong> ${question.note}` : ""}`;
  });

  if (state.showAllDatabaseAnswers) {
    answerBox.classList.remove("hidden");
    answerBox.innerHTML = `<strong>Answer:</strong> ${question.options[question.correctIndex]}${question.note ? `<br /><strong>Note:</strong> ${question.note}` : ""}`;
  }

  return node;
}

function createWebCard(question, index) {
  const node = mcqTemplate.content.cloneNode(true);
  const title = node.querySelector(".question-title");
  const prompt = node.querySelector(".question-prompt");
  const optionsWrap = node.querySelector(".options");
  const showAnswerBtn = node.querySelector(".show-answer-btn");
  const answerBox = node.querySelector(".answer-box");
  const resultMsg = node.querySelector(".result-msg");

  title.textContent = `Web Q${index + 1}`;
  prompt.textContent = question.question;

  question.options.forEach((optionText, optionIndex) => {
    const optionButton = document.createElement("button");
    optionButton.type = "button";
    optionButton.className = "option-btn";
    optionButton.textContent = optionText;
    optionButton.addEventListener("click", () => {
      const allButtons = optionsWrap.querySelectorAll(".option-btn");
      allButtons.forEach((btn) => {
        btn.classList.remove("selected", "correct", "wrong");
      });
      optionButton.classList.add("selected");
      const isCorrect = optionIndex === question.correctIndex;
      optionButton.classList.add(isCorrect ? "correct" : "wrong");
      resultMsg.textContent = isCorrect ? "Correct" : "Wrong";
      resultMsg.className = `result-msg text-sm font-semibold ${isCorrect ? "text-teal-700" : "text-red-600"}`;
    });
    optionsWrap.appendChild(optionButton);
  });

  showAnswerBtn.addEventListener("click", () => {
    answerBox.classList.remove("hidden");
    answerBox.innerHTML = `<strong>Answer:</strong> ${question.options[question.correctIndex]}${question.note ? `<br /><strong>Note:</strong> ${question.note}` : ""}`;
  });

  if (state.showAllWebAnswers) {
    answerBox.classList.remove("hidden");
    answerBox.innerHTML = `<strong>Answer:</strong> ${question.options[question.correctIndex]}${question.note ? `<br /><strong>Note:</strong> ${question.note}` : ""}`;
  }

  return node;
}

// Normalize Networking MCQ data (options object to array, correct answer index)
function normalizeNetworkingData(data) {
  if (!Array.isArray(data)) return [];
  return data
    .map((q, idx) => {
      let optionsArr = [];
      let correctIndex = -1;
      if (q.options && typeof q.options === "object") {
        optionsArr = Object.values(q.options);
        const keys = Object.keys(q.options);
        if (q.correct_answer && typeof q.correct_answer === "string") {
          correctIndex = keys.indexOf(q.correct_answer);
        }
      } else if (Array.isArray(q.options)) {
        optionsArr = q.options;
        if (typeof q.correctIndex === "number") correctIndex = q.correctIndex;
      }
      return {
        id: q.id || `networking-${idx + 1}`,
        question: q.question,
        options: optionsArr,
        correctIndex: correctIndex,
        note: q.explanation || "",
        topic: q.topic || "",
      };
    })
    .filter((q) => q.question && q.options.length && q.correctIndex >= 0);
}

// Normalize OS MCQ data (options object to array, correct answer index)
function normalizeOsData(data) {
  if (!Array.isArray(data)) return [];
  return data
    .map((q, idx) => {
      let optionsArr = [];
      let correctIndex = -1;
      if (q.options && typeof q.options === "object") {
        optionsArr = Object.values(q.options);
        const keys = Object.keys(q.options);
        if (q.correct_answer && typeof q.correct_answer === "string") {
          correctIndex = keys.indexOf(q.correct_answer);
        }
      } else if (Array.isArray(q.options)) {
        optionsArr = q.options;
        if (typeof q.correctIndex === "number") correctIndex = q.correctIndex;
      }
      return {
        id: q.id || `os-${idx + 1}`,
        question: q.question,
        options: optionsArr,
        correctIndex: correctIndex,
        note: q.explanation || "",
        topic: q.topic || "",
      };
    })
    .filter((q) => q.question && q.options.length && q.correctIndex >= 0);
}

// Normalize AI MCQ data (options object to array, correct answer index)
function normalizeAiData(data) {
  if (!Array.isArray(data)) return [];
  return data
    .map((q, idx) => {
      let optionsArr = [];
      let correctIndex = -1;
      if (q.options && typeof q.options === "object") {
        optionsArr = Object.values(q.options);
        const keys = Object.keys(q.options);
        if (q.correct_answer && typeof q.correct_answer === "string") {
          correctIndex = keys.indexOf(q.correct_answer);
        }
      } else if (Array.isArray(q.options)) {
        optionsArr = q.options;
        if (typeof q.correctIndex === "number") correctIndex = q.correctIndex;
      }
      return {
        id: q.id || `ai-${idx + 1}`,
        question: q.question,
        options: optionsArr,
        correctIndex: correctIndex,
        note: q.explanation || "",
        topic: q.topic || "",
      };
    })
    .filter((q) => q.question && q.options.length && q.correctIndex >= 0);
}

// Normalize Database MCQ data (options object to array, correct answer index)
function normalizeDatabaseData(data) {
  if (!Array.isArray(data)) return [];
  return data
    .map((q, idx) => {
      let optionsArr = [];
      let correctIndex = -1;
      if (q.options && typeof q.options === "object") {
        optionsArr = Object.values(q.options);
        const keys = Object.keys(q.options);
        if (q.correct_answer && typeof q.correct_answer === "string") {
          correctIndex = keys.indexOf(q.correct_answer);
        }
      } else if (Array.isArray(q.options)) {
        optionsArr = q.options;
        if (typeof q.correctIndex === "number") correctIndex = q.correctIndex;
      }
      return {
        id: q.id || `database-${idx + 1}`,
        question: q.question,
        options: optionsArr,
        correctIndex: correctIndex,
        note: q.explanation || "",
        topic: q.topic || "",
      };
    })
    .filter((q) => q.question && q.options.length && q.correctIndex >= 0);
}

// Normalize Web MCQ data (options object to array, correct answer index)
function normalizeWebData(data) {
  if (!Array.isArray(data)) return [];
  return data
    .map((q, idx) => {
      let optionsArr = [];
      let correctIndex = -1;
      if (q.options && typeof q.options === "object") {
        optionsArr = Object.values(q.options);
        const keys = Object.keys(q.options);
        if (q.correct_answer && typeof q.correct_answer === "string") {
          correctIndex = keys.indexOf(q.correct_answer);
        }
      } else if (Array.isArray(q.options)) {
        optionsArr = q.options;
        if (typeof q.correctIndex === "number") correctIndex = q.correctIndex;
      }
      return {
        id: q.id || `web-${idx + 1}`,
        question: q.question,
        options: optionsArr,
        correctIndex: correctIndex,
        note: q.explanation || "",
        topic: q.topic || "",
      };
    })
    .filter((q) => q.question && q.options.length && q.correctIndex >= 0);
}

function isQuestionShapeValid(question) {
  return (
    question &&
    typeof question.question === "string" &&
    Array.isArray(question.options) &&
    typeof question.correctIndex === "number" &&
    question.correctIndex >= 0 &&
    question.correctIndex < question.options.length
  );
}

function normalizeMcqData(mcqData) {
  if (!Array.isArray(mcqData)) {
    return [];
  }

  return mcqData
    .map((question, index) => {
      if (isQuestionShapeValid(question)) {
        return question;
      }

      const answerIndex =
        Array.isArray(question?.options) &&
        typeof question?.correctAnswer === "string"
          ? question.options.indexOf(question.correctAnswer)
          : -1;

      if (
        typeof question?.question === "string" &&
        Array.isArray(question?.options) &&
        answerIndex >= 0
      ) {
        return {
          ...question,
          id: question.id || `mcq-${index + 1}`,
          correctIndex: answerIndex,
          note: question.note || question.explanation || "",
        };
      }

      return null;
    })
    .filter(Boolean);
}

async function loadData() {
  const [
    mcqResponse,
    dsaResponse,
    osResponse,
    networkingResponse,
    aiResponse,
    databaseResponse,
    webResponse,
  ] = await Promise.all([
    fetch("./data/mcq.json"),
    fetch("./data/DSA.json"),
    fetch("./data/Operating-System.json"),
    fetch("./data/Networking.json"),
    fetch("./data/AI.json"),
    fetch("./data/Database.json"),
    fetch("./data/Web.json"),
  ]);

  if (
    !mcqResponse.ok ||
    !dsaResponse.ok ||
    !osResponse.ok ||
    !networkingResponse.ok ||
    !aiResponse.ok ||
    !databaseResponse.ok ||
    !webResponse.ok
  ) {
    throw new Error("Could not load quiz files.");
  }

  const mcqData = await mcqResponse.json();
  state.mcq = normalizeMcqData(mcqData);
  const dsaData = await dsaResponse.json();
  state.dsa = normalizeDsaData(dsaData);
  const osData = await osResponse.json();
  state.os = normalizeOsData(osData);
  const networkingData = await networkingResponse.json();
  state.networking = normalizeNetworkingData(networkingData);
  const aiData = await aiResponse.json();
  state.ai = normalizeAiData(aiData);
  const databaseData = await databaseResponse.json();
  state.database = normalizeDatabaseData(databaseData);
  const webData = await webResponse.json();
  state.web = normalizeWebData(webData);
}

// Normalize DSA data from DSA.json (options as object, correct_answer as key)
function normalizeDsaData(dsaData) {
  if (!Array.isArray(dsaData)) return [];
  return dsaData
    .map((q, idx) => {
      const optionsArr =
        q.options && typeof q.options === "object"
          ? Object.values(q.options)
          : Array.isArray(q.options)
            ? q.options
            : [];
      const correctIndex = q.correct_answer
        ? Object.keys(q.options).indexOf(q.correct_answer)
        : -1;
      return {
        id: q.id || `dsa-${idx + 1}`,
        question: q.question,
        options: optionsArr,
        correctIndex: correctIndex,
        note: q.explanation || "",
        topic: q.topic || "",
      };
    })
    .filter((q) => q.question && q.options.length && q.correctIndex >= 0);
}

// Render DSA MCQs in DSA tab
function renderDsa() {
  dsaContainer.innerHTML = "";
  if (!state.dsa.length) {
    dsaContainer.innerHTML =
      '<p class="rounded-xl border border-dashed border-slate-300 bg-white/70 p-5 text-sm">No DSA MCQ questions available yet.</p>';
    return;
  }
  state.dsa.forEach((question, index) => {
    dsaContainer.appendChild(createDsaCard(question, index));
  });
}

// Create DSA MCQ card (reuse MCQ card style)
function createDsaCard(question, index) {
  const node = mcqTemplate.content.cloneNode(true);
  const title = node.querySelector(".question-title");
  const prompt = node.querySelector(".question-prompt");
  const optionsWrap = node.querySelector(".options");
  const showAnswerBtn = node.querySelector(".show-answer-btn");
  const answerBox = node.querySelector(".answer-box");
  const resultMsg = node.querySelector(".result-msg");

  title.textContent = `DSA Q${index + 1}`;
  prompt.textContent = question.question;

  question.options.forEach((optionText, optionIndex) => {
    const optionButton = document.createElement("button");
    optionButton.type = "button";
    optionButton.className = "option-btn";
    optionButton.textContent = optionText;
    optionButton.addEventListener("click", () => {
      const allButtons = optionsWrap.querySelectorAll(".option-btn");
      allButtons.forEach((btn) => {
        btn.classList.remove("selected", "correct", "wrong");
      });
      optionButton.classList.add("selected");
      const isCorrect = optionIndex === question.correctIndex;
      optionButton.classList.add(isCorrect ? "correct" : "wrong");
      resultMsg.textContent = isCorrect ? "Correct" : "Wrong";
      resultMsg.className = `result-msg text-sm font-semibold ${
        isCorrect ? "text-teal-700" : "text-red-600"
      }`;
    });
    optionsWrap.appendChild(optionButton);
  });

  showAnswerBtn.addEventListener("click", () => {
    answerBox.classList.remove("hidden");
    answerBox.innerHTML = `<strong>Answer:</strong> ${question.options[question.correctIndex]}${question.note ? `<br /><strong>Note:</strong> ${question.note}` : ""}`;
  });

  if (state.showAllAnswers) {
    answerBox.classList.remove("hidden");
    answerBox.innerHTML = `<strong>Answer:</strong> ${question.options[question.correctIndex]}${question.note ? `<br /><strong>Note:</strong> ${question.note}` : ""}`;
  }

  return node;
}

function createMcqCard(question, index) {
  const node = mcqTemplate.content.cloneNode(true);

  const title = node.querySelector(".question-title");
  const prompt = node.querySelector(".question-prompt");
  const optionsWrap = node.querySelector(".options");
  const showAnswerBtn = node.querySelector(".show-answer-btn");
  const answerBox = node.querySelector(".answer-box");
  const resultMsg = node.querySelector(".result-msg");

  title.textContent = `Q${index + 1}`;
  prompt.textContent = question.question;

  question.options.forEach((optionText, optionIndex) => {
    const optionButton = document.createElement("button");
    optionButton.type = "button";
    optionButton.className = "option-btn";
    optionButton.textContent = optionText;

    optionButton.addEventListener("click", () => {
      const allButtons = optionsWrap.querySelectorAll(".option-btn");
      allButtons.forEach((btn) => {
        btn.classList.remove("selected", "correct", "wrong");
      });

      optionButton.classList.add("selected");

      const isCorrect = optionIndex === question.correctIndex;
      optionButton.classList.add(isCorrect ? "correct" : "wrong");
      resultMsg.textContent = isCorrect ? "Correct" : "Wrong";
      resultMsg.className = `result-msg text-sm font-semibold ${
        isCorrect ? "text-teal-700" : "text-red-600"
      }`;
    });

    optionsWrap.appendChild(optionButton);
  });

  showAnswerBtn.addEventListener("click", () => {
    answerBox.classList.remove("hidden");
    answerBox.innerHTML = `<strong>Answer:</strong> ${question.options[question.correctIndex]}${
      question.note ? `<br /><strong>Note:</strong> ${question.note}` : ""
    }`;
  });

  if (state.showAllAnswers) {
    answerBox.classList.remove("hidden");
    answerBox.innerHTML = `<strong>Answer:</strong> ${question.options[question.correctIndex]}${
      question.note ? `<br /><strong>Note:</strong> ${question.note}` : ""
    }`;
  }

  return node;
}

function renderMcq() {
  mcqContainer.innerHTML = "";

  if (!state.mcq.length) {
    mcqContainer.innerHTML =
      '<p class="rounded-xl border border-dashed border-slate-300 bg-white/70 p-5 text-sm">No MCQ questions available yet.</p>';
    return;
  }

  state.mcq.forEach((question, index) => {
    mcqContainer.appendChild(createMcqCard(question, index));
  });
}

function renderAll() {
  renderMcq();
  renderDsa();
  renderNetworkingMCQS();
  renderOsMCQS();
  renderAiMCQS();
  renderDatabaseMCQS();
  renderWebMCQS();
}

async function init() {
  if (randomMcqBtn) {
    randomMcqBtn.addEventListener("click", () => {
      shuffleArray(state.mcq);
      renderMcq();
    });
  }

  if (randomNetworkingBtn) {
    randomNetworkingBtn.addEventListener("click", () => {
      shuffleArray(state.networking);
      renderNetworkingMCQS();
    });
  }

  if (randomOsBtn) {
    randomOsBtn.addEventListener("click", () => {
      shuffleArray(state.os);
      renderOsMCQS();
    });
  }

  if (randomAiBtn) {
    randomAiBtn.addEventListener("click", () => {
      shuffleArray(state.ai);
      renderAiMCQS();
    });
  }

  if (randomDatabaseBtn) {
    randomDatabaseBtn.addEventListener("click", () => {
      shuffleArray(state.database);
      renderDatabaseMCQS();
    });
  }

  if (randomWebBtn) {
    randomWebBtn.addEventListener("click", () => {
      shuffleArray(state.web);
      renderWebMCQS();
    });
  }

  if (mcqTabBtn) mcqTabBtn.addEventListener("click", () => switchTab("mcq"));
  if (dsaTabBtn) dsaTabBtn.addEventListener("click", () => switchTab("dsa"));
  if (networkingTabBtn)
    networkingTabBtn.addEventListener("click", () => switchTab("networking"));
  if (osTabBtn) osTabBtn.addEventListener("click", () => switchTab("os"));
  if (aiTabBtn) aiTabBtn.addEventListener("click", () => switchTab("ai"));
  if (databaseTabBtn)
    databaseTabBtn.addEventListener("click", () => switchTab("database"));
  if (webTabBtn) webTabBtn.addEventListener("click", () => switchTab("web"));

  if (showAllAnswersBtn) {
    showAllAnswersBtn.addEventListener("click", () => {
      state.showAllAnswers = !state.showAllAnswers;
      showAllAnswersBtn.textContent = state.showAllAnswers
        ? "Hide Answers For All"
        : "Show Answers For All";
      renderAll();
    });
  }

  if (showAllNetworkingAnswersBtn) {
    showAllNetworkingAnswersBtn.addEventListener("click", () => {
      state.showAllNetworkingAnswers = !state.showAllNetworkingAnswers;
      showAllNetworkingAnswersBtn.textContent = state.showAllNetworkingAnswers
        ? "Hide Answers For All"
        : "Show Answers For All";
      renderNetworkingMCQS();
    });
  }

  if (showAllOsAnswersBtn) {
    showAllOsAnswersBtn.addEventListener("click", () => {
      state.showAllOsAnswers = !state.showAllOsAnswers;
      showAllOsAnswersBtn.textContent = state.showAllOsAnswers
        ? "Hide Answers For All"
        : "Show Answers For All";
      renderOsMCQS();
    });
  }

  if (showAllAiAnswersBtn) {
    showAllAiAnswersBtn.addEventListener("click", () => {
      state.showAllAiAnswers = !state.showAllAiAnswers;
      showAllAiAnswersBtn.textContent = state.showAllAiAnswers
        ? "Hide Answers For All"
        : "Show Answers For All";
      renderAiMCQS();
    });
  }

  if (showAllDatabaseAnswersBtn) {
    showAllDatabaseAnswersBtn.addEventListener("click", () => {
      state.showAllDatabaseAnswers = !state.showAllDatabaseAnswers;
      showAllDatabaseAnswersBtn.textContent = state.showAllDatabaseAnswers
        ? "Hide Answers For All"
        : "Show Answers For All";
      renderDatabaseMCQS();
    });
  }

  if (showAllWebAnswersBtn) {
    showAllWebAnswersBtn.addEventListener("click", () => {
      state.showAllWebAnswers = !state.showAllWebAnswers;
      showAllWebAnswersBtn.textContent = state.showAllWebAnswers
        ? "Hide Answers For All"
        : "Show Answers For All";
      renderWebMCQS();
    });
  }

  try {
    await loadData();
    switchTab("mcq");
    renderAll();
  } catch (error) {
    mcqContainer.innerHTML = `<p class="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">${error.message}</p>`;
  }
}

init();
