// Theme switching - Force dark mode
document.documentElement.classList.add("dark");

const state = {
  mcq: [],
  text: [],
  dsa: [],
  networking: [],
  showAllAnswers: false,
  showAllNetworkingAnswers: false,
  activeTab: "mcq",
};

const mcqContainer = document.getElementById("mcq-container");
const dsaContainer = document.getElementById("dsa-container");
const textContainer = document.getElementById("text-container");
const networkingContainer = document.getElementById("networking-container");
const randomMcqBtn = document.getElementById("new-random-mcq");
const showAllAnswersBtn = document.getElementById("toggle-all-answers");
const randomNetworkingBtn = document.getElementById("new-random-networking");
const showAllNetworkingAnswersBtn = document.getElementById(
  "toggle-all-networking-answers",
);
const mcqTabBtn = document.getElementById("tab-btn-mcq");
const dsaTabBtn = document.getElementById("tab-btn-dsa");
const textTabBtn = document.getElementById("tab-btn-text");
const networkingTabBtn = document.getElementById("tab-btn-networking");
const mcqTabPanel = document.getElementById("tab-mcq");
const dsaTabPanel = document.getElementById("tab-dsa");
const textTabPanel = document.getElementById("tab-text");
const networkingTabPanel = document.getElementById("tab-networking");

const mcqTemplate = document.getElementById("mcq-template");
const textTemplate = document.getElementById("text-template");

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
  const textActive = tab === "text";
  const networkingActive = tab === "networking";

  mcqTabPanel.classList.toggle("hidden", !mcqActive);
  dsaTabPanel.classList.toggle("hidden", !dsaActive);
  textTabPanel.classList.toggle("hidden", !textActive);
  networkingTabPanel.classList.toggle("hidden", !networkingActive);

  mcqTabBtn.classList.toggle("tab-btn-active", mcqActive);
  dsaTabBtn.classList.toggle("tab-btn-active", dsaActive);
  textTabBtn.classList.toggle("tab-btn-active", textActive);
  networkingTabBtn.classList.toggle("tab-btn-active", networkingActive);

  mcqTabBtn.setAttribute("aria-selected", String(mcqActive));
  dsaTabBtn.setAttribute("aria-selected", String(dsaActive));
  textTabBtn.setAttribute("aria-selected", String(textActive));
  networkingTabBtn.setAttribute("aria-selected", String(networkingActive));
}

// Ensure tabs work on page load
document.addEventListener("DOMContentLoaded", () => {
  switchTab(state.activeTab);
  networkingTabBtn.addEventListener("click", () => switchTab("networking"));
});

// Networking MCQS loader and renderer

fetch("data/Networking.json")
  .then((res) => res.json())
  .then((data) => {
    state.networking = normalizeNetworkingData(data);
    renderNetworkingMCQS();
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
  const [mcqResponse, textResponse, dsaResponse] = await Promise.all([
    fetch("./data/mcq.json"),
    fetch("./data/text-questions.json"),
    fetch("./data/DSA.json"),
  ]);

  if (!mcqResponse.ok || !textResponse.ok || !dsaResponse.ok) {
    throw new Error("Could not load quiz files.");
  }

  const mcqData = await mcqResponse.json();
  state.mcq = normalizeMcqData(mcqData);
  state.text = await textResponse.json();
  const dsaData = await dsaResponse.json();
  state.dsa = normalizeDsaData(dsaData);
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
      resultMsg.className = `result-msg text-sm font-semibold ${isCorrect ? "text-teal-700" : "text-red-600"}`;
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

function createTextCard(question, index) {
  const node = textTemplate.content.cloneNode(true);

  const title = node.querySelector(".question-title");
  const prompt = node.querySelector(".question-prompt");
  const toolbar = node.querySelector(".editor-toolbar");
  const editorArea = node.querySelector(".editor-area");
  const showAnswerBtn = node.querySelector(".show-answer-btn");
  const answerBox = node.querySelector(".answer-box");

  title.textContent = `Text Q${index + 1}`;
  prompt.textContent = question.question;

  const toolbarId = `toolbar-${index}`;
  const editorId = `editor-${index}`;
  toolbar.id = toolbarId;
  editorArea.id = editorId;

  setTimeout(() => {
    // Quill toolbar strip matches the requested "word-type" writing experience.
    new Quill(`#${editorId}`, {
      theme: "snow",
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          ["clean"],
        ],
      },
      placeholder: "Write your answer for practice...",
    });

    const toolbarElement = document.querySelector(`#${toolbarId}`);
    const generatedToolbar = document.querySelector(
      `#${editorId}`,
    ).previousElementSibling;
    if (
      toolbarElement &&
      generatedToolbar &&
      generatedToolbar.classList.contains("ql-toolbar")
    ) {
      toolbarElement.replaceWith(generatedToolbar);
      generatedToolbar.classList.add("editor-toolbar");
    }
  }, 0);

  showAnswerBtn.addEventListener("click", () => {
    answerBox.classList.remove("hidden");
    answerBox.innerHTML = `<strong>Answer:</strong> ${question.answer}`;
  });

  if (state.showAllAnswers) {
    answerBox.classList.remove("hidden");
    answerBox.innerHTML = `<strong>Answer:</strong> ${question.answer}`;
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

function renderTextQuestions() {
  textContainer.innerHTML = "";

  if (!state.text.length) {
    textContainer.innerHTML =
      '<p class="rounded-xl border border-dashed border-slate-300 bg-white/70 p-5 text-sm">No text questions available yet.</p>';
    return;
  }

  state.text.forEach((question, index) => {
    const card = createTextCard(question, index);
    textContainer.appendChild(card);
  });
}

function renderAll() {
  renderMcq();
  renderTextQuestions();
  renderDsa();
  renderNetworkingMCQS();
}

async function init() {
  randomMcqBtn.addEventListener("click", () => {
    shuffleArray(state.mcq);
    renderMcq();
  });

  randomNetworkingBtn.addEventListener("click", () => {
    shuffleArray(state.networking);
    renderNetworkingMCQS();
  });

  mcqTabBtn.addEventListener("click", () => {
    switchTab("mcq");
  });
  dsaTabBtn.addEventListener("click", () => {
    switchTab("dsa");
  });
  textTabBtn.addEventListener("click", () => {
    switchTab("text");
  });
  networkingTabBtn.addEventListener("click", () => {
    switchTab("networking");
  });

  showAllAnswersBtn.addEventListener("click", () => {
    state.showAllAnswers = !state.showAllAnswers;
    showAllAnswersBtn.textContent = state.showAllAnswers
      ? "Hide Answers For All"
      : "Show Answers For All";
    renderAll();
  });

  showAllNetworkingAnswersBtn.addEventListener("click", () => {
    state.showAllNetworkingAnswers = !state.showAllNetworkingAnswers;
    showAllNetworkingAnswersBtn.textContent = state.showAllNetworkingAnswers
      ? "Hide Answers For All"
      : "Show Answers For All";
    renderNetworkingMCQS();
  });

  try {
    await loadData();
    switchTab("mcq");
    renderAll();
  } catch (error) {
    mcqContainer.innerHTML = `<p class="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">${error.message}</p>`;
    textContainer.innerHTML = "";
  }
}

init();
