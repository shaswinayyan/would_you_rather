// ==========================================
// PRE-SEEDED QUESTION LIBRARY
// ==========================================
const BASE_QUESTIONS = [
  {
    id: "q_smart_weak",
    optionA: "Be the smartest person on a mediocre team",
    optionB: "Be the weakest person on a brilliant team?",
    category: "tech",
    votesA: 3412,
    votesB: 4280
  },
  {
    id: "q_crush_whatsapp",
    optionA: "Accidentally like your crush’s photo from 2019",
    optionB: "Send a voice note singing badly to the office WhatsApp group?",
    category: "social",
    votesA: 5940,
    votesB: 2410
  },
  {
    id: "q_truth_or_lie",
    optionA: "Know every truth about the world",
    optionB: "Live happily in a beautiful lie?",
    category: "deep",
    votesA: 4200,
    votesB: 3900
  },
  {
    id: "q_linkedin_instagram",
    optionA: "Get caught stalking someone’s LinkedIn profile",
    optionB: "Get caught liking their 2017 Instagram post?",
    category: "social",
    votesA: 3105,
    votesB: 4890
  },
  {
    id: "q_manager_chatgpt_reels",
    optionA: "Let your manager read your last 30 days of ChatGPT/Gemini conversations",
    optionB: "Let your manager see every reel you’ve liked in the last 6 months?",
    category: "tech",
    votesA: 2890,
    votesB: 3512
  },
  {
    id: "q_superpower_sleep",
    optionA: "Wake up with a random useless superpower every day (e.g. heating milk by staring)",
    optionB: "Have an incredible superpower (like flight) but it only works while sleeping?",
    category: "social",
    votesA: 4802,
    votesB: 3911
  },
  {
    id: "q_comic_sans_slack",
    optionA: "Write all professional emails in lowercase Comic Sans",
    optionB: "Use an exclamation mark at the end of every Slack/Teams sentence!",
    category: "tech",
    votesA: 2980,
    votesB: 5410
  },
  {
    id: "q_immortality_disease",
    optionA: "Discover the secret to immortality but you can never share it with anyone",
    optionB: "Discover a cure for all diseases but your name is completely erased from history?",
    category: "deep",
    votesA: 1845,
    votesB: 7120
  },
  {
    id: "q_lie_truth",
    optionA: "Live in a world where everyone instantly knows when you tell a lie",
    optionB: "Live in a world where everyone says exactly what they are thinking out loud?",
    category: "deep",
    votesA: 4120,
    votesB: 3950
  },
  {
    id: "q_always_late_early",
    optionA: "Always be 15 minutes late to everything you attend",
    optionB: "Always be 45 minutes early to everything you attend?",
    category: "social",
    votesA: 3110,
    votesB: 5930
  },
  {
    id: "q_shadow_stream",
    optionA: "Have your manager shadow you, looking over your shoulder for a full week",
    optionB: "Have your work screen live-streamed to the entire department for a day?",
    category: "tech",
    votesA: 2190,
    votesB: 4720
  },
  {
    id: "q_teleport_naked_fly",
    optionA: "Be able to teleport anywhere instantly but arrive completely naked",
    optionB: "Be able to fly but only at a maximum speed of 10 miles per hour?",
    category: "social",
    votesA: 3560,
    votesB: 4120
  },
  {
    id: "q_high_toxic_low_happy",
    optionA: "Work a high-stress 70-hour week with a toxic team but double the industry salary",
    optionB: "Work a standard 35-hour week with a wonderful team but barely making minimum wage?",
    category: "tech",
    votesA: 1450,
    votesB: 8320
  }
];

// ==========================================
// AUDIO SYNTHESIZER MODULE (Web Audio API)
// ==========================================
const AudioSynth = {
  ctx: null,
  enabled: true,

  init() {
    if (this.ctx) return;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  },

  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    
    // Quick pop click sound
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(450, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.08);
    
    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  },

  playSuccess() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    
    const now = this.ctx.currentTime;
    const playNote = (freq, delay, duration, vol) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now + delay);
      
      gain.gain.setValueAtTime(vol, now + delay);
      gain.gain.linearRampToValueAtTime(0.01, now + delay + duration);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + delay);
      osc.stop(now + delay + duration);
    };

    // Arpeggio chime
    playNote(523.25, 0.0, 0.15, 0.08); // C5
    playNote(659.25, 0.08, 0.15, 0.08); // E5
    playNote(783.99, 0.16, 0.25, 0.08); // G5
    playNote(1046.50, 0.24, 0.4, 0.1); // C6
  },

  playSwoosh() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = "triangle";
    osc.frequency.setValueAtTime(100, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(500, this.ctx.currentTime + 0.25);
    
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.25);
  }
};

// ==========================================
// GAME STATE MANAGEMENT
// ==========================================
const Game = {
  questions: [],
  currentMode: "classic", // "classic" or "duo"
  currentCategory: "all",
  classicIndex: 0,
  
  // Stats (classic mode)
  userVotes: {}, // questionId -> 'A' or 'B'
  currentStreak: 0,
  
  // Duo State
  duoState: {
    player1: "Player A",
    player2: "Player B",
    roundQuestions: [],
    roundIndex: 0,
    player1Choices: {}, // questionId -> 'A' | 'B'
    player2Choices: {}, // questionId -> 'A' | 'B'
    agreements: 0,
    currentTurn: 1 // 1: Player 1 Secret, 2: Player 2 Secret, 3: Revealed
  },

  init() {
    // 1. Load questions (seeded + custom from LocalStorage)
    const custom = JSON.parse(localStorage.getItem("wyr_custom_questions") || "[]");
    this.questions = [...BASE_QUESTIONS, ...custom];

    // 2. Load classic progress
    this.userVotes = JSON.parse(localStorage.getItem("wyr_votes") || "{}");
    this.currentStreak = parseInt(localStorage.getItem("wyr_streak") || "0");
    
    this.classicIndex = this.findFirstUnansweredIndex();
    
    // 3. Setup Audio Preferences
    const soundPref = localStorage.getItem("wyr_sound_enabled");
    if (soundPref !== null) {
      AudioSynth.enabled = soundPref === "true";
    }
    
    // 4. Setup Theme Preference
    const themePref = localStorage.getItem("wyr_theme") || "dark";
    document.documentElement.setAttribute("data-theme", themePref);

    this.renderThemeButton();
    this.renderSoundButton();
    this.updateStatsDashboard();
  },

  findFirstUnansweredIndex() {
    // Filter questions by selected category
    const filtered = this.getFilteredQuestions();
    if (filtered.length === 0) return 0;
    
    const idx = filtered.findIndex(q => !this.userVotes[q.id]);
    return idx === -1 ? 0 : idx;
  },

  getFilteredQuestions() {
    if (this.currentCategory === "all") return this.questions;
    if (this.currentCategory === "custom") {
      return this.questions.filter(q => q.id.startsWith("custom_"));
    }
    return this.questions.filter(q => q.category === this.currentCategory);
  },

  addCustomQuestion(optA, optB, category) {
    const newQ = {
      id: "custom_" + Date.now(),
      optionA: optA.trim(),
      optionB: optB.trim(),
      category: category,
      votesA: Math.floor(Math.random() * 50) + 10, // Simulated initial votes
      votesB: Math.floor(Math.random() * 50) + 10
    };

    // Save to State
    this.questions.push(newQ);

    // Save to LocalStorage
    const custom = JSON.parse(localStorage.getItem("wyr_custom_questions") || "[]");
    custom.push(newQ);
    localStorage.setItem("wyr_custom_questions", JSON.stringify(custom));

    // Display message
    showToast("Question added successfully!");
  }
};

// ==========================================
// DOM ELEMENTS & EVENT BINDINGS
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  Game.init();
  
  // Element selections
  const optionCardA = document.getElementById("optionCardA");
  const optionCardB = document.getElementById("optionCardB");
  const orNode = document.getElementById("orNode");
  const nextQuestionBtn = document.getElementById("nextQuestionBtn");
  const classicControls = document.getElementById("classicControls");
  
  const soundToggleBtn = document.getElementById("soundToggleBtn");
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const openCreatorBtn = document.getElementById("openCreatorBtn");
  const creatorModal = document.getElementById("creatorModal");
  const closeCreatorBtn = document.getElementById("closeCreatorBtn");
  const customQuestionForm = document.getElementById("customQuestionForm");
  
  const modeClassicBtn = document.getElementById("modeClassicBtn");
  const modeDuoBtn = document.getElementById("modeDuoBtn");
  const gameFilters = document.getElementById("gameFilters");
  const statsDashboard = document.getElementById("statsDashboard");
  const gameplayBoard = document.getElementById("gameplayBoard");
  
  // Duo elements
  const duoSetupScreen = document.getElementById("duoSetupScreen");
  const duoTurnScreen = document.getElementById("duoTurnScreen");
  const duoResultsScreen = document.getElementById("duoResultsScreen");
  const startDuoBtn = document.getElementById("startDuoBtn");
  const player1Input = document.getElementById("player1Input");
  const player2Input = document.getElementById("player2Input");
  const proceedToVoteBtn = document.getElementById("proceedToVoteBtn");
  const turnInstruction = document.getElementById("turnInstruction");
  const playerAvatar = document.getElementById("playerAvatar");
  const duoHUD = document.getElementById("duoHUD");
  const duoQuestionNum = document.getElementById("duoQuestionNum");
  const duoAgreements = document.getElementById("duoAgreements");
  const restartDuoBtn = document.getElementById("restartDuoBtn");
  const exitDuoBtn = document.getElementById("exitDuoBtn");

  // Logo Reset
  document.querySelector(".logo-area").addEventListener("click", () => {
    AudioSynth.playClick();
    switchMode("classic");
    Game.currentCategory = "all";
    updateActiveFilterPill();
    Game.classicIndex = 0;
    loadClassicQuestion();
  });

  // Reset Game Button
  const resetGameBtn = document.getElementById("resetGameBtn");
  resetGameBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to reset all game progress? This will clear your streak and answers.")) {
      AudioSynth.playClick();
      Game.userVotes = {};
      Game.currentStreak = 0;
      localStorage.removeItem("wyr_votes");
      localStorage.removeItem("wyr_streak");
      Game.classicIndex = 0;
      Game.updateStatsDashboard();
      loadClassicQuestion();
      showToast("Progress reset successfully!");
    }
  });

  // Restart Deck Button (Completion Screen)
  const restartDeckBtn = document.getElementById("restartDeckBtn");
  restartDeckBtn.addEventListener("click", () => {
    AudioSynth.playClick();
    
    // Clear votes only for the questions in the current category
    const filtered = Game.getFilteredQuestions();
    filtered.forEach(q => {
      delete Game.userVotes[q.id];
    });
    localStorage.setItem("wyr_votes", JSON.stringify(Game.userVotes));
    
    // Reset index to 0
    Game.classicIndex = 0;
    Game.updateStatsDashboard();
    loadClassicQuestion();
    showToast("Deck reset! Starting over.");
  });

  // Theme & Sound toggles
  themeToggleBtn.addEventListener("click", () => {
    AudioSynth.playClick();
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "cyberpunk-light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("wyr_theme", newTheme);
    Game.renderThemeButton();
  });

  soundToggleBtn.addEventListener("click", () => {
    AudioSynth.enabled = !AudioSynth.enabled;
    localStorage.setItem("wyr_sound_enabled", AudioSynth.enabled);
    Game.renderSoundButton();
    AudioSynth.playClick();
  });

  // Modal open/close
  openCreatorBtn.addEventListener("click", () => {
    AudioSynth.playClick();
    creatorModal.classList.remove("hidden");
  });

  closeCreatorBtn.addEventListener("click", () => {
    AudioSynth.playClick();
    creatorModal.classList.add("hidden");
  });

  creatorModal.addEventListener("click", (e) => {
    if (e.target === creatorModal) {
      creatorModal.classList.add("hidden");
    }
  });

  // Form submission
  customQuestionForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const optA = document.getElementById("customOptA").value;
    const optB = document.getElementById("customOptB").value;
    const cat = document.getElementById("customCategory").value;
    
    Game.addCustomQuestion(optA, optB, cat);
    
    // Reset form
    customQuestionForm.reset();
    creatorModal.classList.add("hidden");
    
    // If filter is on custom, reload current index to show
    if (Game.currentCategory === "custom") {
      Game.classicIndex = Game.getFilteredQuestions().length - 1;
      loadClassicQuestion();
    }
  });

  // Mode Selection Tabs
  modeClassicBtn.addEventListener("click", () => switchMode("classic"));
  modeDuoBtn.addEventListener("click", () => switchMode("duo"));

  // Category Filtering
  document.querySelector(".category-pills").addEventListener("click", (e) => {
    if (e.target.classList.contains("pill")) {
      AudioSynth.playClick();
      Game.currentCategory = e.target.getAttribute("data-category");
      updateActiveFilterPill();
      
      Game.classicIndex = Game.findFirstUnansweredIndex();
      loadClassicQuestion();
    }
  });

  // Card Clicks (Gameplay)
  optionCardA.addEventListener("click", () => handleVote("A"));
  optionCardB.addEventListener("click", () => handleVote("B"));
  
  // Next button click
  nextQuestionBtn.addEventListener("click", () => {
    AudioSynth.playSwoosh();
    const filtered = Game.getFilteredQuestions();
    Game.classicIndex = (Game.classicIndex + 1) % filtered.length;
    loadClassicQuestion();
  });

  // Duo Actions
  startDuoBtn.addEventListener("click", () => {
    AudioSynth.playClick();
    const p1 = player1Input.value.trim() || "Player A";
    const p2 = player2Input.value.trim() || "Player B";
    
    Game.duoState.player1 = p1;
    Game.duoState.player2 = p2;
    
    // Choose 5 random questions
    Game.duoState.roundQuestions = getRandomQuestions(5);
    Game.duoState.roundIndex = 0;
    Game.duoState.agreements = 0;
    Game.duoState.player1Choices = {};
    Game.duoState.player2Choices = {};
    
    duoSetupScreen.classList.add("hidden");
    startDuoTurn(1); // Start Player 1 turn
  });

  proceedToVoteBtn.addEventListener("click", () => {
    AudioSynth.playClick();
    duoTurnScreen.classList.add("hidden");
    gameplayBoard.classList.remove("hidden");
    
    const activeQ = Game.duoState.roundQuestions[Game.duoState.roundIndex];
    loadCardContent(activeQ);
    resetCardVisuals();
  });

  restartDuoBtn.addEventListener("click", () => {
    AudioSynth.playClick();
    duoResultsScreen.classList.add("hidden");
    
    // Seed new questions
    Game.duoState.roundQuestions = getRandomQuestions(5);
    Game.duoState.roundIndex = 0;
    Game.duoState.agreements = 0;
    Game.duoState.player1Choices = {};
    Game.duoState.player2Choices = {};
    
    startDuoTurn(1);
  });

  exitDuoBtn.addEventListener("click", () => {
    AudioSynth.playClick();
    duoResultsScreen.classList.add("hidden");
    switchMode("classic");
  });

  // Keyboard navigation support
  optionCardA.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleVote("A");
    }
  });
  optionCardB.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleVote("B");
    }
  });

  // Initial Load
  loadClassicQuestion();

  // Helper functions
  function switchMode(mode) {
    if (Game.currentMode === mode) return;
    
    AudioSynth.playSwoosh();
    Game.currentMode = mode;

    if (mode === "classic") {
      modeClassicBtn.classList.add("active");
      modeDuoBtn.classList.remove("active");
      
      gameFilters.classList.remove("hidden");
      statsDashboard.classList.remove("hidden");
      gameplayBoard.classList.remove("hidden");
      classicControls.classList.add("hidden");
      
      // Hide all duo overlays
      duoSetupScreen.classList.add("hidden");
      duoTurnScreen.classList.add("hidden");
      duoResultsScreen.classList.add("hidden");
      duoHUD.classList.add("hidden");
      
      loadClassicQuestion();
    } else {
      modeDuoBtn.classList.add("active");
      modeClassicBtn.classList.remove("active");
      
      gameFilters.classList.add("hidden");
      statsDashboard.classList.add("hidden");
      gameplayBoard.classList.add("hidden");
      classicControls.classList.add("hidden");
      duoTurnScreen.classList.add("hidden");
      duoResultsScreen.classList.add("hidden");
      duoHUD.classList.add("hidden");
      
      // Show Setup Screen
      duoSetupScreen.classList.remove("hidden");
    }
  }

  function updateActiveFilterPill() {
    const pills = document.querySelectorAll(".category-pills .pill");
    pills.forEach(pill => {
      if (pill.getAttribute("data-category") === Game.currentCategory) {
        pill.classList.add("active");
      } else {
        pill.classList.remove("active");
      }
    });
  }

  function loadClassicQuestion() {
    const filtered = Game.getFilteredQuestions();
    const deckCompletionScreen = document.getElementById("deckCompletionScreen");
    const optionsContainer = document.getElementById("optionsContainer");
    
    if (filtered.length === 0) {
      // Empty state
      optionCardA.classList.add("hidden");
      optionCardB.classList.add("hidden");
      orNode.classList.add("hidden");
      classicControls.classList.add("hidden");
      deckCompletionScreen.classList.add("hidden");
      
      document.querySelector(".question-title").textContent = "No questions found in this category.";
      document.getElementById("questionCategory").textContent = "Category: Empty";
      document.getElementById("classicProgressNum").textContent = "0 / 0";
      document.getElementById("classicProgressFill").style.width = "0%";
      return;
    }

    // Check if all questions in this category are answered
    const answeredCount = filtered.filter(q => Game.userVotes[q.id]).length;
    if (answeredCount === filtered.length) {
      // Reveal Completion Summary
      optionCardA.classList.add("hidden");
      optionCardB.classList.add("hidden");
      orNode.classList.add("hidden");
      classicControls.classList.add("hidden");
      deckCompletionScreen.classList.remove("hidden");

      document.querySelector(".question-title").textContent = "Category Completed!";
      document.getElementById("questionCategory").textContent = `Category: ${getFriendlyCategoryName(Game.currentCategory)}`;
      document.getElementById("classicProgressNum").textContent = `${answeredCount} / ${filtered.length} Answered`;
      document.getElementById("classicProgressFill").style.width = "100%";

      populateCompletionSummary(filtered);
      return;
    }
    
    // Normal gameplay display
    optionCardA.classList.remove("hidden");
    optionCardB.classList.remove("hidden");
    orNode.classList.remove("hidden");
    deckCompletionScreen.classList.add("hidden");

    const activeQ = filtered[Game.classicIndex];
    loadCardContent(activeQ);
    resetCardVisuals();
    
    // Progress indicator calculations
    document.getElementById("classicProgressNum").textContent = `Question ${Game.classicIndex + 1} / ${filtered.length}`;
    const progressPercent = Math.round((answeredCount / filtered.length) * 100);
    document.getElementById("classicProgressFill").style.width = `${progressPercent}%`;

    // Check if user already voted in Classic mode
    const existingVote = Game.userVotes[activeQ.id];
    if (existingVote) {
      revealVotes(activeQ, existingVote);
      classicControls.classList.remove("hidden");
    } else {
      classicControls.classList.add("hidden");
    }
  }

  function populateCompletionSummary(questionsList) {
    const summaryList = document.getElementById("answersSummaryList");
    summaryList.innerHTML = "";
    
    questionsList.forEach((q) => {
      const choice = Game.userVotes[q.id];
      if (!choice) return;
      
      const item = document.createElement("div");
      item.className = "summary-item";
      
      const total = q.votesA + q.votesB;
      const pctA = Math.round((q.votesA / total) * 100);
      const pctB = 100 - pctA;
      const userPct = choice === 'A' ? pctA : pctB;
      
      item.innerHTML = `
        <div class="summary-q">Would you rather <strong>${q.optionA}</strong> or <strong>${q.optionB}</strong>?</div>
        <div class="summary-choice-row">
          <div>
            <span class="summary-label">Your Choice:</span>
            <span class="summary-choice-val val-${choice}">${choice === 'A' ? 'Option A' : 'Option B'}</span>
          </div>
          <span class="summary-agreement">${userPct}% of voters agreed with you</span>
        </div>
      `;
      summaryList.appendChild(item);
    });
  }

  function loadCardContent(question) {
    document.querySelector(".question-title").textContent = "Would You Rather...";
    document.getElementById("questionCategory").textContent = `Category: ${getFriendlyCategoryName(question.category)}`;
    document.getElementById("optionTextA").textContent = question.optionA;
    document.getElementById("optionTextB").textContent = question.optionB;
  }

  function resetCardVisuals() {
    gameplayBoard.classList.remove("voted");
    
    // Option A cleanup
    optionCardA.classList.remove("selected", "unselected");
    document.getElementById("choiceBadgeA").classList.add("hidden");
    document.getElementById("partnerBadgeA").classList.add("hidden");
    optionCardA.querySelector(".option-stats").classList.add("hidden");

    // Option B cleanup
    optionCardB.classList.remove("selected", "unselected");
    document.getElementById("choiceBadgeB").classList.add("hidden");
    document.getElementById("partnerBadgeB").classList.add("hidden");
    optionCardB.querySelector(".option-stats").classList.add("hidden");
  }

  function getFriendlyCategoryName(slug) {
    const maps = {
      social: "Silly & Social",
      tech: "Career & Tech",
      deep: "Deep Choices"
    };
    return maps[slug] || "Custom";
  }

  function handleVote(choice) {
    // If classic mode and already voted, don't re-vote
    if (Game.currentMode === "classic") {
      const filtered = Game.getFilteredQuestions();
      if (filtered.length === 0) return;
      const activeQ = filtered[Game.classicIndex];
      if (Game.userVotes[activeQ.id]) return;
      
      AudioSynth.playClick();
      
      // Update statistics
      if (choice === "A") {
        activeQ.votesA++;
      } else {
        activeQ.votesB++;
      }
      
      // Save vote
      Game.userVotes[activeQ.id] = choice;
      localStorage.setItem("wyr_votes", JSON.stringify(Game.userVotes));
      
      // Evaluate Streak
      const isMajority = (choice === "A" && activeQ.votesA >= activeQ.votesB) || 
                         (choice === "B" && activeQ.votesB >= activeQ.votesA);
      
      if (isMajority) {
        Game.currentStreak++;
      } else {
        Game.currentStreak = 0;
      }
      localStorage.setItem("wyr_streak", Game.currentStreak);
      
      // Reveal percentages and show controls
      revealVotes(activeQ, choice);
      classicControls.classList.remove("hidden");
      Game.updateStatsDashboard();
      
      // Update progress bar HUD immediately
      const answeredCount = filtered.filter(q => Game.userVotes[q.id]).length;
      document.getElementById("classicProgressNum").textContent = `Question ${Game.classicIndex + 1} / ${filtered.length}`;
      const progressPercent = Math.round((answeredCount / filtered.length) * 100);
      document.getElementById("classicProgressFill").style.width = `${progressPercent}%`;

      if (isMajority) {
        setTimeout(() => AudioSynth.playSuccess(), 500);
      }
      
    } else {
      // Duo Mode Vote Logic
      AudioSynth.playClick();
      const currentRoundIdx = Game.duoState.roundIndex;
      const activeQ = Game.duoState.roundQuestions[currentRoundIdx];
      
      if (Game.duoState.currentTurn === 1) {
        // Player 1 voted
        Game.duoState.player1Choices[activeQ.id] = choice;
        gameplayBoard.classList.add("hidden");
        startDuoTurn(2); // Transition to Player 2
      } else if (Game.duoState.currentTurn === 2) {
        // Player 2 voted
        Game.duoState.player2Choices[activeQ.id] = choice;
        
        // Calculate dynamic votes adding locally
        if (choice === "A") activeQ.votesA++;
        else activeQ.votesB++;
        if (Game.duoState.player1Choices[activeQ.id] === "A") activeQ.votesA++;
        else activeQ.votesB++;

        // Shift turn to 3 (Reveal)
        Game.duoState.currentTurn = 3;
        revealDuoQuestionVotes(activeQ);
      }
    }
  }

  function revealVotes(question, userChoice) {
    gameplayBoard.classList.add("voted");
    
    const total = question.votesA + question.votesB;
    const percentA = Math.round((question.votesA / total) * 100);
    const percentB = 100 - percentA;
    
    // Display Percentage text
    document.getElementById("percentA").textContent = `${percentA}%`;
    document.getElementById("percentB").textContent = `${percentB}%`;
    
    // Display raw count
    document.getElementById("votesA").textContent = `${question.votesA.toLocaleString()} votes`;
    document.getElementById("votesB").textContent = `${question.votesB.toLocaleString()} votes`;
    
    // Reveal stats overlay
    optionCardA.querySelector(".option-stats").classList.remove("hidden");
    optionCardB.querySelector(".option-stats").classList.remove("hidden");
    
    // Animate progress fill width
    setTimeout(() => {
      document.getElementById("barFillA").style.width = `${percentA}%`;
      document.getElementById("barFillB").style.width = `${percentB}%`;
    }, 50);

    // Apply card styles based on what was clicked
    if (userChoice === "A") {
      optionCardA.classList.add("selected");
      optionCardB.classList.add("unselected");
      document.getElementById("choiceBadgeA").classList.remove("hidden");
    } else {
      optionCardB.classList.add("selected");
      optionCardA.classList.add("unselected");
      document.getElementById("choiceBadgeB").classList.remove("hidden");
    }
  }

  // Duo specific rendering
  function startDuoTurn(playerNum) {
    Game.duoState.currentTurn = playerNum;
    const activePlayerName = playerNum === 1 ? Game.duoState.player1 : Game.duoState.player2;
    
    playerAvatar.textContent = activePlayerName.charAt(0).toUpperCase();
    turnInstruction.textContent = `${activePlayerName}, your turn!`;
    
    duoHUD.classList.remove("hidden");
    duoQuestionNum.textContent = `${Game.duoState.roundIndex + 1} / ${Game.duoState.roundQuestions.length}`;
    duoAgreements.textContent = Game.duoState.agreements;
    
    duoTurnScreen.classList.remove("hidden");
    gameplayBoard.classList.add("hidden");
    classicControls.classList.add("hidden");
  }

  function revealDuoQuestionVotes(question) {
    gameplayBoard.classList.add("voted");
    
    const choice1 = Game.duoState.player1Choices[question.id];
    const choice2 = Game.duoState.player2Choices[question.id];
    const agreed = choice1 === choice2;
    
    if (agreed) {
      Game.duoState.agreements++;
      duoAgreements.textContent = Game.duoState.agreements;
      showToast("Mutual Agreement! Nice compatibility!");
      setTimeout(() => AudioSynth.playSuccess(), 400);
    } else {
      showToast("Differences make you unique!");
    }
    
    // Normal votes calculations
    const total = question.votesA + question.votesB;
    const percentA = Math.round((question.votesA / total) * 100);
    const percentB = 100 - percentA;
    
    document.getElementById("percentA").textContent = `${percentA}%`;
    document.getElementById("percentB").textContent = `${percentB}%`;
    document.getElementById("votesA").textContent = `${question.votesA.toLocaleString()} votes`;
    document.getElementById("votesB").textContent = `${question.votesB.toLocaleString()} votes`;
    
    optionCardA.querySelector(".option-stats").classList.remove("hidden");
    optionCardB.querySelector(".option-stats").classList.remove("hidden");
    
    setTimeout(() => {
      document.getElementById("barFillA").style.width = `${percentA}%`;
      document.getElementById("barFillB").style.width = `${percentB}%`;
    }, 50);

    // Apply Player tags
    const partnerBadgeA = document.getElementById("partnerBadgeA");
    const partnerBadgeB = document.getElementById("partnerBadgeB");
    
    // Reset badges
    partnerBadgeA.classList.add("hidden");
    partnerBadgeB.classList.add("hidden");
    partnerBadgeA.textContent = "";
    partnerBadgeB.textContent = "";

    // Card 1
    if (choice1 === "A" && choice2 === "A") {
      partnerBadgeA.classList.remove("hidden");
      partnerBadgeA.textContent = "Both Picked";
      optionCardA.classList.add("selected");
      optionCardB.classList.add("unselected");
    } else if (choice1 === "B" && choice2 === "B") {
      partnerBadgeB.classList.remove("hidden");
      partnerBadgeB.textContent = "Both Picked";
      optionCardB.classList.add("selected");
      optionCardA.classList.add("unselected");
    } else {
      // Disagreed
      optionCardA.classList.add("selected");
      optionCardB.classList.add("selected");
      
      partnerBadgeA.classList.remove("hidden");
      partnerBadgeA.textContent = choice1 === "A" ? Game.duoState.player1 : Game.duoState.player2;
      
      partnerBadgeB.classList.remove("hidden");
      partnerBadgeB.textContent = choice1 === "B" ? Game.duoState.player1 : Game.duoState.player2;
    }

    // Set classic next controller to function as duo controller
    classicControls.classList.remove("hidden");
    
    // Override standard button action for Next
    const nextBtn = document.getElementById("nextQuestionBtn");
    nextBtn.onclick = () => {
      AudioSynth.playSwoosh();
      nextBtn.onclick = null; // Remove override
      
      Game.duoState.roundIndex++;
      if (Game.duoState.roundIndex >= Game.duoState.roundQuestions.length) {
        // Complete Duo round
        revealFinalDuoCompatibility();
      } else {
        startDuoTurn(1);
      }
    };
  }

  function revealFinalDuoCompatibility() {
    gameplayBoard.classList.add("hidden");
    classicControls.classList.add("hidden");
    duoHUD.classList.add("hidden");
    
    const pct = Math.round((Game.duoState.agreements / Game.duoState.roundQuestions.length) * 100);
    
    // Set circle offset. Circumference is 2 * pi * r = 2 * 3.14159 * 50 = 314.16
    const circle = document.getElementById("scoreProgress");
    const offset = 314.16 - (314.16 * pct) / 100;
    
    // Set score elements
    document.getElementById("compatibilityPercent").textContent = `${pct}%`;
    circle.style.strokeDashoffset = offset;
    
    // Set feedback title/desc
    const title = document.getElementById("compatibilityTitle");
    const desc = document.getElementById("compatibilityDesc");
    
    if (pct === 100) {
      title.textContent = "Telepathic Twins! 🌌";
      desc.textContent = `Wow, ${Game.duoState.player1} and ${Game.duoState.player2} answered identically. You practically share a mind!`;
    } else if (pct >= 80) {
      title.textContent = "Synergy Masters! ⚡";
      desc.textContent = "Excellent compatibility! You are heavily aligned on almost all values and situations.";
    } else if (pct >= 60) {
      title.textContent = "Shared Frequency! 🎵";
      desc.textContent = "Good sync! You agree on most things, and the ones you don't keep things interesting.";
    } else if (pct >= 40) {
      title.textContent = "Healthy Contrarians! ⚖️";
      desc.textContent = "Moderate compatibility. You have distinct personalities but can find middle ground.";
    } else if (pct >= 20) {
      title.textContent = "Chaos Duo! 🌪️";
      desc.textContent = "Differing opinions make for fantastic debates. You see the world through completely different lenses.";
    } else {
      title.textContent = "Pure Parallel Universes! 🛸";
      desc.textContent = "Completely different choices. Opposites attract, or you might just be from different planets!";
    }

    duoResultsScreen.classList.remove("hidden");
    setTimeout(() => AudioSynth.playSuccess(), 300);
  }

  function getRandomQuestions(num) {
    const list = [...Game.questions];
    // Shuffle array
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list.slice(0, num);
  }
});

// ==========================================
// VIEW RENDERING HELPERS
// ==========================================
Game.renderThemeButton = function() {
  const btn = document.getElementById("themeToggleBtn");
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  
  if (isDark) {
    btn.innerHTML = `
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
        <circle cx="12" cy="12" r="5"></circle>
      </svg>
    `;
  } else {
    btn.innerHTML = `
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;
  }
};

Game.renderSoundButton = function() {
  const soundOn = document.getElementById("soundOnIcon");
  const soundOff = document.getElementById("soundOffIcon");
  
  if (AudioSynth.enabled) {
    soundOn.classList.remove("hidden");
    soundOff.classList.add("hidden");
  } else {
    soundOn.classList.add("hidden");
    soundOff.classList.remove("hidden");
  }
};

Game.updateStatsDashboard = function() {
  const votes = Object.keys(this.userVotes);
  const totalVal = votes.length;
  
  document.getElementById("statsTotalVoted").textContent = totalVal;
  
  // Calc match rate: % of choices that match public majority
  let matches = 0;
  votes.forEach(qid => {
    const q = this.questions.find(item => item.id === qid);
    if (!q) return;
    const choice = this.userVotes[qid];
    const isMajority = (choice === "A" && q.votesA >= q.votesB) || 
                       (choice === "B" && q.votesB >= q.votesA);
    if (isMajority) matches++;
  });
  
  const pctVal = totalVal > 0 ? Math.round((matches / totalVal) * 100) : 0;
  document.getElementById("statsMatchRate").textContent = `${pctVal}%`;
  
  // Streak
  document.getElementById("statsStreak").textContent = this.currentStreak;
  const fire = document.getElementById("streakFire");
  if (this.currentStreak >= 3) {
    fire.classList.remove("hidden");
  } else {
    fire.classList.add("hidden");
  }
};

// ==========================================
// TOAST NOTIFICATIONS
// ==========================================
function showToast(message) {
  const toast = document.getElementById("toastNotification");
  const msgSpan = document.getElementById("toastMessage");
  
  msgSpan.textContent = message;
  toast.classList.remove("hidden");
  
  // Trigger transition reflow
  toast.offsetHeight;
  
  toast.classList.add("show");
  
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.classList.add("hidden");
    }, 400);
  }, 2500);
}
