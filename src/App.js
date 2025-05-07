import React, { useState, useEffect, useRef, useCallback } from "react";

const App = () => {
  // Theme options
  const themes = {
    default: {
      primary: "bg-blue-500",
      secondary: "bg-green-500",
      background: "bg-gray-50",
      breakBackground: "bg-green-50",
      timerDisplay: "bg-blue-100",
      textPrimary: "text-blue-500",
    },
    ocean: {
      primary: "bg-cyan-600",
      secondary: "bg-teal-500",
      background: "bg-blue-50",
      breakBackground: "bg-teal-50",
      timerDisplay: "bg-cyan-100",
      textPrimary: "text-cyan-600",
    },
    sunset: {
      primary: "bg-orange-500",
      secondary: "bg-yellow-500",
      background: "bg-orange-50",
      breakBackground: "bg-yellow-50",
      timerDisplay: "bg-orange-100",
      textPrimary: "text-orange-500",
    },
    forest: {
      primary: "bg-emerald-600",
      secondary: "bg-lime-500",
      background: "bg-emerald-50",
      breakBackground: "bg-lime-50",
      timerDisplay: "bg-emerald-100",
      textPrimary: "text-emerald-600",
    },
    dark: {
      primary: "bg-indigo-500",
      secondary: "bg-purple-500",
      background: "bg-gray-900",
      breakBackground: "bg-gray-800",
      timerDisplay: "bg-gray-800",
      textPrimary: "text-indigo-300",
    },
  };

  // Timer presets
  const timerPresets = {
    default: { name: "Default", work: 25, break: 5 },
    quick: { name: "Quick", work: 15, break: 3 },
    extended: { name: "Extended", work: 50, break: 10 },
    reading: { name: "Reading", work: 30, break: 5 },
    writing: { name: "Writing", work: 45, break: 7 },
    coding: { name: "Coding", work: 40, break: 8 },
  };

  // Book quotes
  const bookQuotes = [
    "ADHD isn't a lack of focus, but difficulty controlling where that focus goes.",
    "The ADHD brain often works best under time pressure - use this to your advantage.",
    "Breaking tasks into small chunks is an effective strategy for the ADHD brain.",
    "Frequently changing your work environment can help an ADHD brain maintain focus.",
    "With ADHD, your attention isn't missing - it's unevenly distributed.",
    "The ADHD brain constantly seeks new stimulation - use small rewards to maintain motivation.",
    "Small, frequent movement can improve focus for people with ADHD.",
    "Don't be too hard on yourself - ADHD is a different way your brain works, not a defect.",
    "External clutter often reflects mental state - a tidy space can improve focus.",
    "The ADHD brain responds well to novelty - try new approaches to familiar tasks.",
    "The ADHD brain loves engaging with interesting things - find ways to make boring tasks more interesting.",
    "Use the 'Two-Minute Rule': if a task takes less than two minutes, do it immediately.",
  ];

  // White noise options
  const whiteNoiseOptions = [
    { name: "Light Rain", icon: "🌧️", src: "" },
    { name: "Forest", icon: "🌲", src: "" },
    { name: "Ocean Waves", icon: "🌊", src: "" },
    { name: "Coffee Shop", icon: "☕", src: "" },
    { name: "White Noise", icon: "📻", src: "" },
  ];

  // Challenges
  const challenges = [
    {
      id: "daily-3",
      name: "3 sessions per day",
      description: "Complete 3 focus sessions in a day",
      requirementType: "daily",
      requirementValue: 3,
      icon: "🎯",
      reward: 10,
    },
    {
      id: "daily-5",
      name: "5 sessions per day",
      description: "Complete 5 focus sessions in a day",
      requirementType: "daily",
      requirementValue: 5,
      icon: "🏆",
      reward: 20,
    },
    {
      id: "weekly-20",
      name: "20 sessions per week",
      description: "Complete 20 focus sessions in a week",
      requirementType: "weekly",
      requirementValue: 20,
      icon: "⭐",
      reward: 50,
    },
    {
      id: "streak-7",
      name: "7-day streak",
      description: "Use the app for 7 consecutive days",
      requirementType: "streak",
      requirementValue: 7,
      icon: "🔥",
      reward: 30,
    },
  ];

  // UI Modules
  const uiModules = {
    timerBasic: {
      id: "timerBasic",
      name: "Timer Controls",
      icon: "⏱️",
      isCore: true,
    },
    taskInput: {
      id: "taskInput",
      name: "Task Input",
      icon: "✏️",
      isCore: true,
    },
    timerSettings: {
      id: "timerSettings",
      name: "Timer Settings",
      icon: "⚙️",
      isCore: false,
    },
    focusTips: {
      id: "focusTips",
      name: "Focus Tips",
      icon: "💡",
      isCore: false,
    },
    bookQuotes: {
      id: "bookQuotes",
      name: "Book Quotes",
      icon: "📚",
      isCore: false,
    },
    breathing: {
      id: "breathing",
      name: "Breathing Exercise",
      icon: "🧘",
      isCore: false,
    },
    distraction: {
      id: "distraction",
      name: "Distraction Journal",
      icon: "📝",
      isCore: false,
    },
    whiteNoise: {
      id: "whiteNoise",
      name: "Focus Sounds",
      icon: "🔊",
      isCore: false,
    },
    eyeRest: {
      id: "eyeRest",
      name: "Eye Rest Reminder",
      icon: "👁️",
      isCore: false,
    },
    challenges: {
      id: "challenges",
      name: "Challenges",
      icon: "🏅",
      isCore: false,
    },
    garden: {
      id: "garden",
      name: "Progress Garden",
      icon: "🌱",
      isCore: false,
    },
    achievements: {
      id: "achievements",
      name: "Achievements",
      icon: "🏆",
      isCore: false,
    },
  };

  // Interface profiles
  const interfaceProfiles = {
    full: { name: "Full Features", modules: Object.keys(uiModules) },
    minimal: { name: "Minimal", modules: ["timerBasic", "taskInput"] },
    focus: {
      name: "Focus Session",
      modules: ["timerBasic", "taskInput", "focusTips"],
    },
    study: {
      name: "Study Session",
      modules: [
        "timerBasic",
        "taskInput",
        "focusTips",
        "whiteNoise",
        "eyeRest",
      ],
    },
    writing: {
      name: "Writing Session",
      modules: ["timerBasic", "taskInput", "distraction", "whiteNoise"],
    },
  };

  // Tab categories
  const tabCategories = [
    {
      id: "timer",
      name: "Timer",
      icon: "⏱️",
      modules: ["timerBasic", "timerSettings", "taskInput"],
    },
    {
      id: "focus",
      name: "Focus Tools",
      icon: "🧠",
      modules: ["focusTips", "whiteNoise", "breathing", "eyeRest"],
    },
    {
      id: "progress",
      name: "Progress",
      icon: "📈",
      modules: ["garden", "achievements", "challenges"],
    },
    {
      id: "support",
      name: "Support",
      icon: "🛠️",
      modules: ["distraction", "bookQuotes"],
    },
  ];

  // Micro-guidance tips based on context
  const microGuidance = {
    firstVisit:
      "Welcome! Start by entering your task and hitting the Start Focus button.",
    emptyTask:
      "What are you working on today? Enter a specific task to improve focus.",
    sessionComplete: "Great job! Take a break before your next focus session.",
    frequentPause:
      "Try a shorter focus session - maybe 15 minutes would work better for you?",
    readyToFocus:
      "Set your environment for success: minimize distractions and get comfortable.",
    breakStarting: "Time for a break! Stand up, stretch, and rest your eyes.",
    breakEnding: "Break ending soon. Prepare to return to your focus session.",
    longInactive:
      "Haven't seen you in a while! Reset your timer to get started again.",
  };

  // Keyboard shortcuts
  const keyboardShortcuts = [
    { key: "Space", description: "Start/Pause timer" },
    { key: "Esc", description: "Reset timer" },
    { key: "F", description: "Toggle Focus Mode" },
    { key: "M", description: "Open/Close Menu" },
    { key: "1-5", description: "Switch tabs" },
    { key: "S", description: "Save current timer settings" },
  ];

  // PWA notification messages
  const pwaMessages = {
    readyOffline:
      "ADHD Timer is ready to use offline! You can access the app anytime, even without an internet connection.",
    installPrompt:
      "Add ADHD Timer to your home screen for faster access and offline use.",
    offlineMode:
      "You're offline, but don't worry! ADHD Timer works fully in offline mode.",
    updateAvailable:
      "An update is available. Refresh to get the latest features.",
  };

  // Get data from localStorage or use defaults
  const getSavedData = () => {
    try {
      // Get basic settings
      const savedWorkMinutes = parseInt(
        localStorage.getItem("workMinutes") || "25"
      );
      const savedBreakMinutes = parseInt(
        localStorage.getItem("breakMinutes") || "5"
      );
      const savedTheme = localStorage.getItem("theme") || "default";
      const savedCurrentProfile =
        localStorage.getItem("currentProfile") || "full";
      const savedActiveModules =
        JSON.parse(localStorage.getItem("activeModules")) ||
        interfaceProfiles.full.modules;
      const savedCustomProfiles =
        JSON.parse(localStorage.getItem("customProfiles")) || {};
      const savedHighFocusMode =
        localStorage.getItem("highFocusMode") === "true";

      // Get stats
      const savedStats = JSON.parse(
        localStorage.getItem("stats") ||
          '{"totalSessions": 0, "totalFocusTime": 0, "streak": 0, "lastUsedDate": null, "dailySessions": 0, "lastSessionDate": null, "weeklySessions": 0, "weekStart": null, "sessionHistory": [], "pauseHistory": []}'
      );
      const savedAchievements = JSON.parse(
        localStorage.getItem("achievements") || "[]"
      );

      // Get garden progress
      const savedGarden = parseInt(localStorage.getItem("garden") || "0");

      // Get distraction journal
      const savedDistractions = JSON.parse(
        localStorage.getItem("distractions") || "[]"
      );

      // Get active challenges
      const savedActiveChallenges = JSON.parse(
        localStorage.getItem("activeChallenges") || "[]"
      );
      const savedCompletedChallenges = JSON.parse(
        localStorage.getItem("completedChallenges") || "[]"
      );

      // Get eye rest settings
      const savedEyeRestEnabled =
        localStorage.getItem("eyeRestEnabled") === "true";

      // Get suggested times
      const savedSuggestedTimes = JSON.parse(
        localStorage.getItem("suggestedTimes") || "null"
      ) || {
        work: savedWorkMinutes,
        break: savedBreakMinutes,
      };

      // Get offline status
      const savedOfflineReady = localStorage.getItem("offlineReady") === "true";

      // Get shown notifications
      const savedShownNotifications = JSON.parse(
        localStorage.getItem("shownNotifications") || "[]"
      );

      return {
        workMinutes: savedWorkMinutes,
        breakMinutes: savedBreakMinutes,
        theme: savedTheme,
        stats: savedStats,
        achievements: savedAchievements,
        garden: savedGarden,
        distractions: savedDistractions,
        activeChallenges: savedActiveChallenges,
        completedChallenges: savedCompletedChallenges,
        eyeRestEnabled: savedEyeRestEnabled,
        suggestedTimes: savedSuggestedTimes,
        currentProfile: savedCurrentProfile,
        activeModules: savedActiveModules,
        customProfiles: savedCustomProfiles,
        highFocusMode: savedHighFocusMode,
        offlineReady: savedOfflineReady,
        shownNotifications: savedShownNotifications,
      };
    } catch (error) {
      console.error("Error loading saved data:", error);
      return {
        workMinutes: 25,
        breakMinutes: 5,
        theme: "default",
        stats: {
          totalSessions: 0,
          totalFocusTime: 0,
          streak: 0,
          lastUsedDate: null,
          dailySessions: 0,
          lastSessionDate: null,
          weeklySessions: 0,
          weekStart: null,
          sessionHistory: [],
          pauseHistory: [],
        },
        achievements: [],
        garden: 0,
        distractions: [],
        activeChallenges: [],
        completedChallenges: [],
        eyeRestEnabled: false,
        suggestedTimes: { work: 25, break: 5 },
        currentProfile: "full",
        activeModules: interfaceProfiles.full.modules,
        customProfiles: {},
        highFocusMode: false,
        offlineReady: false,
        shownNotifications: [],
      };
    }
  };

  // Initialize state with saved data
  const savedData = getSavedData();

  // Core timer state
  const [workMinutes, setWorkMinutes] = useState(savedData.workMinutes);
  const [breakMinutes, setBreakMinutes] = useState(savedData.breakMinutes);
  const [secondsLeft, setSecondsLeft] = useState(workMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState("work");
  const [currentTask, setCurrentTask] = useState("");

  // Stats and progress state
  const [stats, setStats] = useState(savedData.stats);
  const [achievements, setAchievements] = useState(savedData.achievements);
  const [garden, setGarden] = useState(savedData.garden);
  const [activeChallenges, setActiveChallenges] = useState(
    savedData.activeChallenges
  );
  const [completedChallenges, setCompletedChallenges] = useState(
    savedData.completedChallenges
  );

  // Feature state
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(savedData.theme);
  const [distractions, setDistractions] = useState(savedData.distractions);
  const [currentDistraction, setCurrentDistraction] = useState("");
  const [showBreathingExercise, setShowBreathingExercise] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState("inhale");
  const [breathingActive, setBreathingActive] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(
    bookQuotes[Math.floor(Math.random() * bookQuotes.length)]
  );
  const [eyeRestEnabled, setEyeRestEnabled] = useState(
    savedData.eyeRestEnabled
  );
  const [showEyeRestReminder, setShowEyeRestReminder] = useState(false);
  const [currentSound, setCurrentSound] = useState(null);
  const [soundPlaying, setSoundPlaying] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  // UI state
  const [showSettings, setShowSettings] = useState(false);
  const [currentPreset, setCurrentPreset] = useState("default");
  const [currentGuidance, setCurrentGuidance] = useState(null);
  const [suggestedTimes, setSuggestedTimes] = useState(
    savedData.suggestedTimes
  );
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [showShortcutHelp, setShowShortcutHelp] = useState(false);

  // Menu and UI configuration state
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("timer");
  const [activeModules, setActiveModules] = useState(savedData.activeModules);
  const [currentProfile, setCurrentProfile] = useState(
    savedData.currentProfile
  );
  const [customProfiles, setCustomProfiles] = useState(
    savedData.customProfiles
  );
  const [editingProfile, setEditingProfile] = useState(false);
  const [newProfileName, setNewProfileName] = useState("");
  const [highFocusMode, setHighFocusMode] = useState(savedData.highFocusMode);

  // PWA state
  const [offlineReady, setOfflineReady] = useState(savedData.offlineReady);
  const [showOfflinePrompt, setShowOfflinePrompt] = useState(false);
  const [installable, setInstallable] = useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showOfflineStatus, setShowOfflineStatus] = useState(false);
  const [shownNotifications, setShownNotifications] = useState(
    savedData.shownNotifications
  );

  // Refs
  const timerRef = useRef(null);
  const breathingRef = useRef(null);
  const eyeRestRef = useRef(null);
  const sessionCounterRef = useRef(0);
  const deferredPromptRef = useRef(null);
  const pauseTimeRef = useRef(null);

  const tips = [
    "Break your task into smaller steps",
    "Focus on just one small part at a time",
    "Remember your 'why' for this task",
    "Notice when your mind wanders, then gently bring it back",
    "You don't need to feel motivated to start",
    "Your focus might improve after the first 5 minutes",
    "It's okay to take breaks - they help your brain",
    "Set clear boundaries for this focused time",
    "Try to complete this task, no matter what",
    "Difficulty is temporary, push through it",
    "Focus on the process, not just the end result",
    "Each small step is a success worth celebrating",
  ];

  const [currentTip, setCurrentTip] = useState(tips[0]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Don't trigger shortcuts when typing in an input field
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
        return;
      }

      if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        isActive ? pauseTimer() : startTimer();
      } else if (e.key === "Escape") {
        resetTimer();
      } else if (e.key === "f" || e.key === "F") {
        toggleHighFocusMode();
      } else if (e.key === "m" || e.key === "M") {
        setMenuOpen(!menuOpen);
      } else if (
        !isNaN(parseInt(e.key)) &&
        parseInt(e.key) >= 1 &&
        parseInt(e.key) <= 5
      ) {
        const tabIndex = parseInt(e.key) - 1;
        if (tabIndex < tabCategories.length) {
          setCurrentTab(tabCategories[tabIndex].id);
        }
      } else if (e.key === "s" || e.key === "S") {
        // Save current timer settings as a preset
        saveCurrentSettings();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isActive, menuOpen]);

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setShowOfflineStatus(true);
      setTimeout(() => {
        setShowOfflineStatus(false);
      }, 3000);
    };

    const handleOffline = () => {
      setIsOffline(true);
      setShowOfflineStatus(true);

      // Don't auto-hide offline notification
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Handle PWA installation
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent Chrome 76+ from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      deferredPromptRef.current = e;
      // Update UI to notify the user they can add to home screen
      setInstallable(true);

      if (!shownNotifications.includes("installPrompt")) {
        setShowInstallPrompt(true);
        setShownNotifications([...shownNotifications, "installPrompt"]);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Check if app was successfully installed
    window.addEventListener("appinstalled", () => {
      // Hide the app-provided install promotion
      setInstallable(false);
      setShowInstallPrompt(false);
      // Clear the deferredPrompt
      deferredPromptRef.current = null;
      // Log the installation for analytics
      console.log("PWA was installed");
    });

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, [shownNotifications]);

  // Simulate service worker registration for offline capability
  useEffect(() => {
    // In a real app, you would register a service worker here

    if ("serviceWorker" in navigator) {
      // Simulate service worker registration after a delay
      setTimeout(() => {
        // Set app as ready for offline use
        setOfflineReady(true);
        localStorage.setItem("offlineReady", "true");

        // Show notification if not shown before
        if (!shownNotifications.includes("readyOffline")) {
          setShowOfflinePrompt(true);
          setShownNotifications([...shownNotifications, "readyOffline"]);
        }
      }, 3000);
    }
  }, [shownNotifications]);

  // Save shown notifications state
  useEffect(() => {
    localStorage.setItem(
      "shownNotifications",
      JSON.stringify(shownNotifications)
    );
  }, [shownNotifications]);

  // Update micro-guidance based on context
  useEffect(() => {
    // First visit
    if (stats.totalSessions === 0 && !currentGuidance) {
      setCurrentGuidance(microGuidance.firstVisit);
      setTimeout(() => {
        setCurrentGuidance(null);
      }, 8000);
    }

    // Empty task
    if (
      isActive &&
      !currentTask.trim() &&
      currentGuidance !== microGuidance.emptyTask
    ) {
      setCurrentGuidance(microGuidance.emptyTask);
      setTimeout(() => {
        setCurrentGuidance(null);
      }, 8000);
    }
  }, [isActive, currentTask, stats.totalSessions, currentGuidance]);

  // Show guidance after session completes
  useEffect(() => {
    if (sessionCompleted) {
      setCurrentGuidance(microGuidance.sessionComplete);
      setTimeout(() => {
        setCurrentGuidance(null);
      }, 8000);
    }
  }, [sessionCompleted]);

  // Check and update streak daily
  useEffect(() => {
    const updateStreak = () => {
      const today = new Date().toDateString();
      const lastUsed = stats.lastUsedDate;

      let newStreak = stats.streak;
      let updatedStats = { ...stats };

      // First time using app
      if (!lastUsed) {
        updatedStats = { ...stats, lastUsedDate: today };
      }
      // Used today already - nothing to update
      else if (lastUsed === today) {
        // No change needed
      }
      // Used yesterday - increment streak
      else if (
        new Date(lastUsed).toDateString() ===
        new Date(Date.now() - 86400000).toDateString()
      ) {
        newStreak += 1;
        updatedStats = { ...stats, streak: newStreak, lastUsedDate: today };
      }
      // Used before but not yesterday - reset streak to 1
      else {
        newStreak = 1;
        updatedStats = { ...stats, streak: newStreak, lastUsedDate: today };
      }

      // Reset daily sessions count if it's a new day
      if (stats.lastSessionDate !== today) {
        updatedStats = {
          ...updatedStats,
          lastSessionDate: today,
          dailySessions: 0,
        };
      }

      // Check if it's a new week
      const thisWeek = getWeekNumber(new Date());
      const weekStart = stats.weekStart;

      if (!weekStart || thisWeek !== getWeekNumber(new Date(weekStart))) {
        updatedStats = {
          ...updatedStats,
          weekStart: new Date().toISOString(),
          weeklySessions: 0,
        };
      }

      setStats(updatedStats);
      localStorage.setItem("stats", JSON.stringify(updatedStats));

      // Check for streak achievements
      checkForAchievements(newStreak);
    };

    updateStreak();
  }, []);

  // Helper function to get week number
  const getWeekNumber = (date) => {
    const d = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  };

  // Check for new achievements
  const checkForAchievements = (currentStreak) => {
    const newAchievements = [...achievements];
    let achievementAdded = false;

    // Streak achievements
    if (currentStreak >= 3 && !achievements.includes("streak-3")) {
      newAchievements.push("streak-3");
      achievementAdded = true;
    }
    if (currentStreak >= 7 && !achievements.includes("streak-7")) {
      newAchievements.push("streak-7");
      achievementAdded = true;
    }
    if (currentStreak >= 14 && !achievements.includes("streak-14")) {
      newAchievements.push("streak-14");
      achievementAdded = true;
    }

    // Session count achievements
    if (stats.totalSessions >= 1 && !achievements.includes("sessions-1")) {
      newAchievements.push("sessions-1");
      achievementAdded = true;
    }
    if (stats.totalSessions >= 10 && !achievements.includes("sessions-10")) {
      newAchievements.push("sessions-10");
      achievementAdded = true;
    }
    if (stats.totalSessions >= 25 && !achievements.includes("sessions-25")) {
      newAchievements.push("sessions-25");
      achievementAdded = true;
    }

    if (achievementAdded) {
      setAchievements(newAchievements);
      localStorage.setItem("achievements", JSON.stringify(newAchievements));
    }
  };

  useEffect(() => {
    // Update tip every 20 seconds
    const tipInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * tips.length);
      setCurrentTip(tips[randomIndex]);
    }, 20000);

    // Update quote every 2 minutes
    const quoteInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * bookQuotes.length);
      setCurrentQuote(bookQuotes[randomIndex]);
    }, 120000);

    return () => {
      clearInterval(tipInterval);
      clearInterval(quoteInterval);
    };
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("workMinutes", workMinutes.toString());
    localStorage.setItem("breakMinutes", breakMinutes.toString());
  }, [workMinutes, breakMinutes]);

  useEffect(() => {
    localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    localStorage.setItem("garden", garden.toString());
  }, [garden]);

  useEffect(() => {
    localStorage.setItem("eyeRestEnabled", eyeRestEnabled.toString());
  }, [eyeRestEnabled]);

  useEffect(() => {
    localStorage.setItem("distractions", JSON.stringify(distractions));
  }, [distractions]);

  useEffect(() => {
    localStorage.setItem("activeChallenges", JSON.stringify(activeChallenges));
  }, [activeChallenges]);

  useEffect(() => {
    localStorage.setItem(
      "completedChallenges",
      JSON.stringify(completedChallenges)
    );
  }, [completedChallenges]);

  useEffect(() => {
    localStorage.setItem("currentProfile", currentProfile);
  }, [currentProfile]);

  useEffect(() => {
    localStorage.setItem("activeModules", JSON.stringify(activeModules));
  }, [activeModules]);

  useEffect(() => {
    localStorage.setItem("customProfiles", JSON.stringify(customProfiles));
  }, [customProfiles]);

  useEffect(() => {
    localStorage.setItem("highFocusMode", highFocusMode.toString());
  }, [highFocusMode]);

  useEffect(() => {
    localStorage.setItem("suggestedTimes", JSON.stringify(suggestedTimes));
  }, [suggestedTimes]);

  useEffect(() => {
    if (mode === "work") {
      setSecondsLeft(workMinutes * 60);
    } else {
      setSecondsLeft(breakMinutes * 60);
      // Show breathing exercise during break
      setShowBreathingExercise(true);
    }
    setIsActive(false);
  }, [workMinutes, breakMinutes, mode]);

  // Eye rest reminder timer
  useEffect(() => {
    if (eyeRestEnabled && mode === "work" && isActive) {
      eyeRestRef.current = setInterval(() => {
        setShowEyeRestReminder(true);
        // Auto-hide after 20 seconds
        setTimeout(() => {
          setShowEyeRestReminder(false);
        }, 20000);
      }, 20 * 60 * 1000); // 20 minutes
    } else if (eyeRestRef.current) {
      clearInterval(eyeRestRef.current);
    }

    return () => {
      if (eyeRestRef.current) {
        clearInterval(eyeRestRef.current);
      }
    };
  }, [eyeRestEnabled, mode, isActive]);

  // Breathing exercise animation
  useEffect(() => {
    if (breathingActive) {
      const runBreathingCycle = () => {
        // Inhale phase (4 seconds)
        setBreathingPhase("inhale");
        setTimeout(() => {
          // Hold phase (4 seconds)
          setBreathingPhase("hold");
          setTimeout(() => {
            // Exhale phase (6 seconds)
            setBreathingPhase("exhale");
            setTimeout(() => {
              // Only continue if still active
              if (breathingActive) {
                runBreathingCycle();
              }
            }, 6000);
          }, 4000);
        }, 4000);
      };

      runBreathingCycle();
    }

    return () => {
      setBreathingPhase("inhale");
    };
  }, [breathingActive]);

  // Timer logic
  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setSecondsLeft((seconds) => {
          if (seconds <= 1) {
            clearInterval(timerRef.current);

            // If work session completed
            if (mode === "work") {
              // Update stats
              const now = new Date();
              const today = now.toDateString();
              const newDailySessions =
                stats.lastSessionDate === today ? stats.dailySessions + 1 : 1;
              const newWeeklySessions = stats.weeklySessions + 1;

              const newTotalSessions = stats.totalSessions + 1;
              const newTotalFocusTime = stats.totalFocusTime + workMinutes;

              // Record session for analysis
              const newSessionHistory = [...stats.sessionHistory];
              newSessionHistory.push({
                date: now.toISOString(),
                duration: workMinutes,
                completed: true,
              });

              const updatedStats = {
                ...stats,
                totalSessions: newTotalSessions,
                totalFocusTime: newTotalFocusTime,
                dailySessions: newDailySessions,
                lastSessionDate: today,
                weeklySessions: newWeeklySessions,
                sessionHistory: newSessionHistory,
              };

              setStats(updatedStats);
              localStorage.setItem("stats", JSON.stringify(updatedStats));

              // Check challenges
              checkChallenges(
                newDailySessions,
                newWeeklySessions,
                stats.streak
              );

              // Check for adaptive timer suggestions
              analyzeSessionPatterns(newSessionHistory, stats.pauseHistory);

              // Increment session counter
              sessionCounterRef.current += 1;

              // Update garden progress
              if (sessionCounterRef.current % 4 === 0) {
                // Every 4 sessions
                const newGarden = Math.min(garden + 1, 5); // Max 5 levels
                setGarden(newGarden);
              }

              setSessionCompleted(true);

              // Check for achievements based on updated stats
              checkForAchievements(stats.streak);
            }

            // Switch modes
            setMode(mode === "work" ? "break" : "work");
            setIsActive(false);
            return 0;
          }
          return seconds - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, mode, workMinutes]);

  // Check challenges
  const checkChallenges = (dailySessions, weeklySessions, streak) => {
    const updatedActive = [...activeChallenges];
    const updatedCompleted = [...completedChallenges];

    // Check each active challenge
    activeChallenges.forEach((challengeId) => {
      const challenge = challenges.find((c) => c.id === challengeId);
      if (challenge) {
        let completed = false;

        // Check if challenge is completed
        if (
          challenge.requirementType === "daily" &&
          dailySessions >= challenge.requirementValue
        ) {
          completed = true;
        } else if (
          challenge.requirementType === "weekly" &&
          weeklySessions >= challenge.requirementValue
        ) {
          completed = true;
        } else if (
          challenge.requirementType === "streak" &&
          streak >= challenge.requirementValue
        ) {
          completed = true;
        }

        if (completed && !completedChallenges.includes(challengeId)) {
          // Remove from active and add to completed
          const index = updatedActive.indexOf(challengeId);
          if (index !== -1) {
            updatedActive.splice(index, 1);
          }
          updatedCompleted.push(challengeId);
        }
      }
    });

    // Update state and localStorage if changed
    if (JSON.stringify(updatedActive) !== JSON.stringify(activeChallenges)) {
      setActiveChallenges(updatedActive);
      localStorage.setItem("activeChallenges", JSON.stringify(updatedActive));
    }

    if (
      JSON.stringify(updatedCompleted) !== JSON.stringify(completedChallenges)
    ) {
      setCompletedChallenges(updatedCompleted);
      localStorage.setItem(
        "completedChallenges",
        JSON.stringify(updatedCompleted)
      );
    }
  };

  // Analyze session patterns for adaptive timer suggestions
  const analyzeSessionPatterns = (sessionHistory, pauseHistory) => {
    // Only run analysis if we have enough data
    if (sessionHistory.length < 5) return;

    // Look at the last 10 sessions
    const recentSessions = sessionHistory.slice(-10);

    // Calculate average actual work time (for completed sessions)
    const completedSessions = recentSessions.filter((s) => s.completed);
    if (completedSessions.length < 3) return;

    // Check if pause history has patterns
    if (pauseHistory && pauseHistory.length >= 5) {
      // Get average time before first pause
      const pauseTimes = pauseHistory.map((p) => p.timeBeforePause);
      const avgPauseTime =
        pauseTimes.reduce((sum, time) => sum + time, 0) / pauseTimes.length;

      // If average pause time is consistently shorter than work time by 5+ minutes
      if (avgPauseTime < workMinutes * 0.8 && avgPauseTime > 5) {
        // Suggest a shorter work period
        const suggestedWorkTime = Math.max(5, Math.round(avgPauseTime));

        if (
          Math.abs(suggestedWorkTime - workMinutes) >= 5 &&
          suggestedWorkTime !== suggestedTimes.work
        ) {
          setSuggestedTimes({
            ...suggestedTimes,
            work: suggestedWorkTime,
          });
          setShowSuggestion(true);
        }
      }
    }
  };

  const startTimer = () => {
    setIsActive(true);
    setSessionCompleted(false);
    setShowBreathingExercise(false);

    // If in high focus mode, automatically switch to minimal UI
    if (
      highFocusMode &&
      !interfaceProfiles.minimal.modules.every((module) =>
        activeModules.includes(module)
      )
    ) {
      setActiveModules(interfaceProfiles.minimal.modules);
    }
  };

  const pauseTimer = () => {
    setIsActive(false);

    // Record pause data for analysis
    if (mode === "work") {
      const timeElapsed = workMinutes * 60 - secondsLeft;
      const now = new Date();

      // Add to pause history
      const updatedStats = { ...stats };
      if (!updatedStats.pauseHistory) {
        updatedStats.pauseHistory = [];
      }

      updatedStats.pauseHistory.push({
        date: now.toISOString(),
        timeBeforePause: Math.floor(timeElapsed / 60), // in minutes
        totalDuration: workMinutes,
      });

      setStats(updatedStats);
      localStorage.setItem("stats", JSON.stringify(updatedStats));

      // Show micro-guidance if user frequently pauses
      if (updatedStats.pauseHistory.length >= 3) {
        const recentPauses = updatedStats.pauseHistory.slice(-3);
        const allShortSessions = recentPauses.every(
          (p) => p.timeBeforePause < p.totalDuration * 0.7
        );

        if (allShortSessions) {
          setCurrentGuidance(microGuidance.frequentPause);
          setTimeout(() => {
            setCurrentGuidance(null);
          }, 8000);
        }
      }
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    if (mode === "work") {
      setSecondsLeft(workMinutes * 60);
    } else {
      setSecondsLeft(breakMinutes * 60);
    }
  };

  const formatTime = () => {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleWorkMinutesChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0 && value <= 60) {
      setWorkMinutes(value);
    }
  };

  const handleBreakMinutesChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0 && value <= 30) {
      setBreakMinutes(value);
    }
  };

  const handleTaskChange = (e) => {
    setCurrentTask(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setSubmitted(true);
    setEmail("");
  };

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
  };

  const handlePresetSelect = (preset) => {
    setCurrentPreset(preset);
    setWorkMinutes(timerPresets[preset].work);
    setBreakMinutes(timerPresets[preset].break);
  };

  const saveCurrentSettings = () => {
    // Save current work/break times as a custom preset
    const presetName = `custom-${Object.keys(timerPresets).length}`;
    const newPresets = {
      ...timerPresets,
      [presetName]: {
        name: `Custom (${workMinutes}/${breakMinutes})`,
        work: workMinutes,
        break: breakMinutes,
      },
    };

    // In a real app, you would save this to localStorage
    console.log("Saved custom preset:", newPresets[presetName]);

    // Show confirmation
    setCurrentGuidance("Custom timer settings saved!");
    setTimeout(() => {
      setCurrentGuidance(null);
    }, 3000);
  };

  const handleDistractionsChange = (e) => {
    setCurrentDistraction(e.target.value);
  };

  const saveDistraction = () => {
    if (currentDistraction.trim()) {
      const newDistraction = {
        id: Date.now(),
        text: currentDistraction,
        date: new Date().toISOString(),
      };

      const updatedDistractions = [newDistraction, ...distractions];
      setDistractions(updatedDistractions);
      setCurrentDistraction("");
    }
  };

  const toggleActiveChallenge = (challengeId) => {
    const updatedChallenges = [...activeChallenges];
    const index = updatedChallenges.indexOf(challengeId);

    if (index === -1) {
      // Add to active challenges
      updatedChallenges.push(challengeId);
    } else {
      // Remove from active challenges
      updatedChallenges.splice(index, 1);
    }

    setActiveChallenges(updatedChallenges);
  };

  const toggleBreathingExercise = () => {
    setBreathingActive(!breathingActive);
  };

  const toggleEyeRest = () => {
    setEyeRestEnabled(!eyeRestEnabled);
  };

  const playWhiteNoise = (soundIndex) => {
    // In a real app, you would play actual audio
    setCurrentSound(soundIndex);
    setSoundPlaying(!soundPlaying);

    if (soundIndex === currentSound && soundPlaying) {
      setSoundPlaying(false);
    } else {
      setCurrentSound(soundIndex);
      setSoundPlaying(true);
    }
  };

  const toggleModuleActive = (moduleId) => {
    const updatedModules = [...activeModules];
    const index = updatedModules.indexOf(moduleId);

    if (index === -1) {
      // Add module
      updatedModules.push(moduleId);
    } else {
      // Remove module if it's not a core module
      if (!uiModules[moduleId].isCore) {
        updatedModules.splice(index, 1);
      } else {
        // Show notification that core modules can't be removed
        setCurrentGuidance("Core modules cannot be removed");
        setTimeout(() => {
          setCurrentGuidance(null);
        }, 3000);
      }
    }

    setActiveModules(updatedModules);
  };

  const switchProfile = (profileId) => {
    if (profileId === "custom") {
      return; // Don't switch to the custom option
    }

    let profileModules;

    if (interfaceProfiles[profileId]) {
      profileModules = interfaceProfiles[profileId].modules;
    } else if (customProfiles[profileId]) {
      profileModules = customProfiles[profileId].modules;
    } else {
      return;
    }

    setCurrentProfile(profileId);
    setActiveModules(profileModules);
  };

  const createCustomProfile = () => {
    if (!newProfileName.trim()) {
      return;
    }

    const profileId = `custom-${Date.now()}`;
    const updatedProfiles = {
      ...customProfiles,
      [profileId]: {
        name: newProfileName,
        modules: [...activeModules],
      },
    };

    setCustomProfiles(updatedProfiles);
    setCurrentProfile(profileId);
    setNewProfileName("");
    setEditingProfile(false);
  };

  const deleteCustomProfile = (profileId) => {
    const updatedProfiles = { ...customProfiles };
    delete updatedProfiles[profileId];

    setCustomProfiles(updatedProfiles);

    if (currentProfile === profileId) {
      // Switch to full profile if the current one is deleted
      setCurrentProfile("full");
      setActiveModules(interfaceProfiles.full.modules);
    }
  };

  const toggleHighFocusMode = () => {
    setHighFocusMode(!highFocusMode);

    if (!highFocusMode) {
      // Save current modules before switching to minimal
      setActiveModules(interfaceProfiles.minimal.modules);
    } else {
      // Restore previous modules when exiting high focus mode
      setActiveModules(interfaceProfiles[currentProfile].modules);
    }
  };

  const applySuggestedTimes = () => {
    setWorkMinutes(suggestedTimes.work);
    setBreakMinutes(suggestedTimes.break);
    setShowSuggestion(false);
  };

  const dismissSuggestion = () => {
    setShowSuggestion(false);
  };

  const promptInstall = () => {
    // Hide prompt
    setShowInstallPrompt(false);

    // Show the install prompt
    if (deferredPromptRef.current) {
      deferredPromptRef.current.prompt();

      // Wait for the user to respond to the prompt
      deferredPromptRef.current.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        // Clear the saved prompt since it can't be used again
        deferredPromptRef.current = null;
      });
    }
  };

  // Render garden based on progress level
  const renderGarden = () => {
    if (garden === 0) {
      return (
        <div className="text-center p-4">
          <div className="text-4xl mb-2">🌱</div>
          <div className="text-sm font-medium">Seed</div>
        </div>
      );
    } else if (garden === 1) {
      return (
        <div className="text-center p-4">
          <div className="text-4xl mb-2">🌿</div>
          <div className="text-sm font-medium">Sprout</div>
        </div>
      );
    } else if (garden === 2) {
      return (
        <div className="text-center p-4">
          <div className="text-4xl mb-2">🪴</div>
          <div className="text-sm font-medium">Small Plant</div>
        </div>
      );
    } else if (garden === 3) {
      return (
        <div className="text-center p-4">
          <div className="text-4xl mb-2">🌳</div>
          <div className="text-sm font-medium">Healthy Tree</div>
        </div>
      );
    } else if (garden === 4) {
      return (
        <div className="text-center p-4">
          <div className="text-4xl mb-2">🌲</div>
          <div className="text-sm font-medium">Mature Tree</div>
        </div>
      );
    } else {
      return (
        <div className="text-center p-4">
          <div className="text-4xl mb-2">🌴🌲🌳</div>
          <div className="text-sm font-medium">Beautiful Garden</div>
        </div>
      );
    }
  };

  // Render achievements
  const renderAchievements = () => {
    return (
      <div className="grid grid-cols-3 gap-2">
        <div
          className={`text-center p-2 rounded-lg border ${
            achievements.includes("streak-3")
              ? "bg-yellow-100 border-yellow-300"
              : "bg-gray-100 border-gray-200 opacity-50"
          }`}
        >
          <div className="text-2xl mb-1">🔥</div>
          <div className="text-xs font-medium">3-day streak</div>
        </div>
        <div
          className={`text-center p-2 rounded-lg border ${
            achievements.includes("streak-7")
              ? "bg-yellow-100 border-yellow-300"
              : "bg-gray-100 border-gray-200 opacity-50"
          }`}
        >
          <div className="text-2xl mb-1">🔥</div>
          <div className="text-xs font-medium">7-day streak</div>
        </div>
        <div
          className={`text-center p-2 rounded-lg border ${
            achievements.includes("streak-14")
              ? "bg-yellow-100 border-yellow-300"
              : "bg-gray-100 border-gray-200 opacity-50"
          }`}
        >
          <div className="text-2xl mb-1">🔥</div>
          <div className="text-xs font-medium">14-day streak</div>
        </div>
        <div
          className={`text-center p-2 rounded-lg border ${
            achievements.includes("sessions-1")
              ? "bg-green-100 border-green-300"
              : "bg-gray-100 border-gray-200 opacity-50"
          }`}
        >
          <div className="text-2xl mb-1">🎯</div>
          <div className="text-xs font-medium">1 session</div>
        </div>
        <div
          className={`text-center p-2 rounded-lg border ${
            achievements.includes("sessions-10")
              ? "bg-green-100 border-green-300"
              : "bg-gray-100 border-gray-200 opacity-50"
          }`}
        >
          <div className="text-2xl mb-1">🏆</div>
          <div className="text-xs font-medium">10 sessions</div>
        </div>
        <div
          className={`text-center p-2 rounded-lg border ${
            achievements.includes("sessions-25")
              ? "bg-green-100 border-green-300"
              : "bg-gray-100 border-gray-200 opacity-50"
          }`}
        >
          <div className="text-2xl mb-1">⭐</div>
          <div className="text-xs font-medium">25 sessions</div>
        </div>
      </div>
    );
  };

  // Render breathing exercise
  const renderBreathingExercise = () => {
    const phases = {
      inhale: { text: "Breathe In", duration: 4, color: "bg-blue-500" },
      hold: { text: "Hold", duration: 4, color: "bg-purple-500" },
      exhale: { text: "Breathe Out", duration: 6, color: "bg-green-500" },
    };

    const current = phases[breathingPhase];

    return (
      <div className="p-6 bg-white rounded-lg shadow-sm mb-6">
        <h3
          className={`text-lg font-medium ${themes[currentTheme].textPrimary} mb-4`}
        >
          Breathing Exercise
        </h3>

        {breathingActive ? (
          <div className="mb-6">
            <div
              className={`text-center py-10 rounded-lg ${current.color} text-white mb-4`}
            >
              <div className="text-2xl font-medium mb-2">{current.text}</div>
              <div className="inline-block w-24 h-24 rounded-full border-4 border-white flex items-center justify-center">
                <div
                  className={`w-20 h-20 rounded-full bg-white bg-opacity-50 transition-all duration-1000 ease-in-out ${
                    breathingPhase === "inhale"
                      ? "transform scale-100"
                      : breathingPhase === "hold"
                      ? "transform scale-100"
                      : "transform scale-50"
                  }`}
                ></div>
              </div>
            </div>
            <button
              onClick={toggleBreathingExercise}
              className={`w-full px-4 py-3 ${themes[currentTheme].primary} text-white rounded-lg font-medium`}
            >
              Stop Breathing Exercise
            </button>
          </div>
        ) : (
          <button
            onClick={toggleBreathingExercise}
            className={`w-full px-4 py-3 ${themes[currentTheme].primary} text-white rounded-lg font-medium`}
          >
            Start Breathing Exercise
          </button>
        )}
      </div>
    );
  };

  // Render distraction journal
  const renderDistractionJournal = () => {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm mb-6">
        <h3
          className={`text-lg font-medium ${themes[currentTheme].textPrimary} mb-4`}
        >
          Distraction Journal
        </h3>

        <div className="mb-4 flex">
          <input
            type="text"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md"
            placeholder="Note what distracted you..."
            value={currentDistraction}
            onChange={handleDistractionsChange}
          />
          <button
            onClick={saveDistraction}
            className={`px-4 py-2 ${themes[currentTheme].primary} text-white rounded-r-md`}
          >
            Save
          </button>
        </div>

        {distractions.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">Distraction History</h4>
            <div className="max-h-40 overflow-y-auto">
              {distractions.map((distraction) => (
                <div
                  key={distraction.id}
                  className="p-2 border-b border-gray-200 text-sm"
                >
                  <div>{distraction.text}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(distraction.date).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render eye rest reminder
  const renderEyeRestReminder = () => {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm mb-6">
        <h3
          className={`text-lg font-medium ${themes[currentTheme].textPrimary} mb-4`}
        >
          Eye Rest Reminder
        </h3>

        <div className="mb-4 p-3 bg-blue-50 rounded-lg text-sm">
          <p>
            Follow the 20-20-20 rule: Every 20 minutes, look 20 feet away for 20
            seconds.
          </p>
        </div>

        <button
          onClick={toggleEyeRest}
          className={`w-full px-4 py-2 ${
            eyeRestEnabled ? "bg-red-500" : themes[currentTheme].primary
          } text-white rounded-md`}
        >
          {eyeRestEnabled ? "Disable Reminders" : "Enable Reminders"}
        </button>
      </div>
    );
  };

  // Render white noise player
  const renderWhiteNoisePlayer = () => {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm mb-6">
        <h3
          className={`text-lg font-medium ${themes[currentTheme].textPrimary} mb-4`}
        >
          Focus Sounds
        </h3>

        <div className="grid grid-cols-3 gap-2">
          {whiteNoiseOptions.map((sound, index) => (
            <button
              key={index}
              onClick={() => playWhiteNoise(index)}
              className={`p-3 rounded-lg text-center ${
                currentSound === index && soundPlaying
                  ? themes[currentTheme].primary + " text-white"
                  : "bg-gray-100"
              }`}
            >
              <div className="text-2xl">{sound.icon}</div>
              <div className="text-xs mt-1">{sound.name}</div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Render challenges
  const renderChallenges = () => {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm mb-6">
        <h3
          className={`text-lg font-medium ${themes[currentTheme].textPrimary} mb-4`}
        >
          Challenges
        </h3>

        <div className="mb-4">
          <h4 className="font-medium mb-2">Active Challenges</h4>
          <div className="space-y-2">
            {challenges.map((challenge) => {
              const isActive = activeChallenges.includes(challenge.id);
              const isCompleted = completedChallenges.includes(challenge.id);

              if (isCompleted) return null;

              return (
                <div
                  key={challenge.id}
                  className={`p-3 rounded-lg border flex items-center gap-3 ${
                    isActive ? "border-blue-300 bg-blue-50" : "border-gray-200"
                  }`}
                >
                  <div className="text-2xl">{challenge.icon}</div>
                  <div className="flex-1">
                    <div className="font-medium">{challenge.name}</div>
                    <div className="text-xs text-gray-600">
                      {challenge.description}
                    </div>
                  </div>
                  <button
                    onClick={() => toggleActiveChallenge(challenge.id)}
                    className={`px-3 py-1 rounded-md text-xs font-medium ${
                      isActive
                        ? "bg-red-500 text-white"
                        : themes[currentTheme].primary + " text-white"
                    }`}
                  >
                    {isActive ? "✕" : "+"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {completedChallenges.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">Completed Challenges</h4>
            <div className="space-y-2">
              {challenges
                .filter((c) => completedChallenges.includes(c.id))
                .map((challenge) => (
                  <div
                    key={challenge.id}
                    className="p-3 rounded-lg border border-green-300 bg-green-50 flex items-center gap-3"
                  >
                    <div className="text-2xl">{challenge.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium">{challenge.name}</div>
                      <div className="text-xs text-gray-600">
                        {challenge.description}
                      </div>
                    </div>
                    <div className="text-green-500 text-xl">✓</div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render book quotes
  const renderBookQuotes = () => {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm mb-6">
        <h3
          className={`text-lg font-medium ${themes[currentTheme].textPrimary} mb-4`}
        >
          Book Quotes
        </h3>

        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 italic">
          "{currentQuote}"
        </div>
      </div>
    );
  };

  // Render UI customization panel
  const renderUICustomization = () => {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm mb-6">
        <h3
          className={`text-lg font-medium ${themes[currentTheme].textPrimary} mb-4`}
        >
          Customize Interface
        </h3>

        <div className="mb-4">
          <h4 className="font-medium mb-2">Active Features</h4>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {Object.values(uiModules).map((module) => (
              <div
                key={module.id}
                className={`p-2 rounded-lg border flex flex-col items-center 
                  ${
                    activeModules.includes(module.id)
                      ? "border-blue-300 bg-blue-50"
                      : "border-gray-200"
                  }`}
              >
                <div className="text-xl mb-1">{module.icon}</div>
                <div className="text-xs font-medium text-center">
                  {module.name}
                </div>
                <button
                  onClick={() => toggleModuleActive(module.id)}
                  className={`mt-2 px-2 py-1 rounded text-xs ${
                    activeModules.includes(module.id)
                      ? module.isCore
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-red-500 text-white"
                      : `${themes[currentTheme].primary} text-white`
                  }`}
                  disabled={module.isCore && activeModules.includes(module.id)}
                >
                  {activeModules.includes(module.id) ? "Remove" : "Add"}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-medium mb-2">Interface Profiles</h4>
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.entries(interfaceProfiles).map(([id, profile]) => (
              <button
                key={id}
                onClick={() => switchProfile(id)}
                className={`px-3 py-1.5 rounded-md text-sm ${
                  currentProfile === id
                    ? `${themes[currentTheme].primary} text-white`
                    : "bg-gray-100"
                }`}
              >
                {profile.name}
              </button>
            ))}

            {/* Custom profiles */}
            {Object.entries(customProfiles).map(([id, profile]) => (
              <div key={id} className="flex items-center">
                <button
                  onClick={() => switchProfile(id)}
                  className={`px-3 py-1.5 rounded-l-md text-sm ${
                    currentProfile === id
                      ? `${themes[currentTheme].primary} text-white`
                      : "bg-gray-100"
                  }`}
                >
                  {profile.name}
                </button>
                <button
                  onClick={() => deleteCustomProfile(id)}
                  className="py-1.5 px-2 bg-red-500 text-white rounded-r-md text-sm"
                >
                  ✕
                </button>
              </div>
            ))}

            <button
              onClick={() => setEditingProfile(true)}
              className="px-3 py-1.5 rounded-md text-sm bg-gray-200"
            >
              + Save Current
            </button>
          </div>

          {editingProfile && (
            <div className="flex mb-2">
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md"
                placeholder="Profile name"
                value={newProfileName}
                onChange={(e) => setNewProfileName(e.target.value)}
              />
              <button
                onClick={createCustomProfile}
                className={`px-4 py-2 ${themes[currentTheme].primary} text-white rounded-r-md`}
              >
                Save
              </button>
            </div>
          )}
        </div>

        <button
          onClick={toggleHighFocusMode}
          className={`w-full px-4 py-3 ${
            highFocusMode ? "bg-red-500" : themes[currentTheme].primary
          } text-white rounded-lg font-medium flex items-center justify-center gap-2`}
        >
          <span>
            {highFocusMode ? "Exit Focus Mode" : "Enter High Focus Mode"}
          </span>
          <span>{highFocusMode ? "👁️" : "🔍"}</span>
        </button>
      </div>
    );
  };

  // Render keyboard shortcuts help
  const renderKeyboardShortcuts = () => {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3
            className={`text-lg font-medium ${themes[currentTheme].textPrimary}`}
          >
            Keyboard Shortcuts
          </h3>
          <button
            onClick={() => setShowShortcutHelp(false)}
            className="text-gray-500 text-sm"
          >
            Close
          </button>
        </div>

        <div className="space-y-2">
          {keyboardShortcuts.map((shortcut, index) => (
            <div key={index} className="flex justify-between">
              <span className="px-2 py-1 bg-gray-100 rounded font-mono text-sm">
                {shortcut.key}
              </span>
              <span className="text-sm">{shortcut.description}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render offline capabilities information
  const renderOfflineInfo = () => {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm mb-6">
        <h3
          className={`text-lg font-medium ${themes[currentTheme].textPrimary} mb-4`}
        >
          Offline Capabilities
        </h3>

        <div className="mb-4 p-3 bg-blue-50 rounded-lg text-sm">
          <p>
            ADHD Timer works offline! Add it to your home screen for a better
            experience.
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <p className="text-sm">Ready for offline use</p>
          </div>

          {installable && (
            <button
              onClick={promptInstall}
              className={`px-4 py-2 ${themes[currentTheme].primary} text-white rounded-md text-sm`}
            >
              Add to Home Screen
            </button>
          )}
        </div>
      </div>
    );
  };

  // Determine if a module should be shown based on active modules and high focus mode
  const isModuleVisible = (moduleId) => {
    if (highFocusMode) {
      return interfaceProfiles.minimal.modules.includes(moduleId);
    }
    return activeModules.includes(moduleId);
  };

  // Get all modules for the current tab
  const getCurrentTabModules = () => {
    const currentTabInfo = tabCategories.find((tab) => tab.id === currentTab);
    if (!currentTabInfo) return [];

    return currentTabInfo.modules.filter((moduleId) =>
      isModuleVisible(moduleId)
    );
  };

  return (
    <div
      className={`${themes[currentTheme].background} ${
        mode === "break" ? themes[currentTheme].breakBackground : ""
      } min-h-screen`}
    >
      {/* PWA Ready Banner */}
      {showOfflinePrompt && (
        <div className="fixed top-0 left-0 right-0 p-4 bg-green-500 text-white text-center shadow-md z-50">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            <p>{pwaMessages.readyOffline}</p>
            <button
              onClick={() => setShowOfflinePrompt(false)}
              className="ml-4 bg-white bg-opacity-20 rounded-full w-6 h-6 flex items-center justify-center"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Install Prompt */}
      {showInstallPrompt && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-blue-500 text-white text-center shadow-md z-50">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            <p>{pwaMessages.installPrompt}</p>
            <div className="flex items-center ml-4">
              <button
                onClick={promptInstall}
                className="bg-white text-blue-500 px-3 py-1 rounded-md mr-2"
              >
                Install
              </button>
              <button
                onClick={() => setShowInstallPrompt(false)}
                className="bg-white bg-opacity-20 rounded-full w-6 h-6 flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Offline Status Indicator */}
      {showOfflineStatus && (
        <div
          className={`fixed top-0 left-0 right-0 p-4 ${
            isOffline ? "bg-orange-500" : "bg-green-500"
          } text-white text-center shadow-md z-50`}
        >
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            <p>{isOffline ? pwaMessages.offlineMode : "Back online!"}</p>
            <button
              onClick={() => setShowOfflineStatus(false)}
              className="ml-4 bg-white bg-opacity-20 rounded-full w-6 h-6 flex items-center justify-center"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Adaptive Timer Suggestion */}
      {showSuggestion && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-blue-500 text-white text-center shadow-md z-50">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            <p>
              Based on your patterns, a {suggestedTimes.work}-minute work period
              might be better for you. Would you like to try it?
            </p>
            <div className="flex items-center ml-4">
              <button
                onClick={applySuggestedTimes}
                className="bg-white text-blue-500 px-3 py-1 rounded-md mr-2"
              >
                Try it
              </button>
              <button
                onClick={dismissSuggestion}
                className="bg-white bg-opacity-20 rounded-full w-6 h-6 flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Eye Rest Reminder */}
      {showEyeRestReminder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-blue-600">
              Eye Rest Reminder
            </h3>
            <p className="mb-4">
              Follow the 20-20-20 rule: Every 20 minutes, look 20 feet away for
              20 seconds.
            </p>
            <button
              onClick={() => setShowEyeRestReminder(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto p-5 relative">
        {/* Micro-guidance tooltip */}
        {currentGuidance && (
          <div className="fixed bottom-4 right-4 max-w-sm bg-blue-500 text-white p-4 rounded-lg shadow-lg z-40 animate-fade-in">
            {currentGuidance}
          </div>
        )}

        {/* Header */}
        <header
          className={`p-6 text-center ${themes[currentTheme].primary} text-white rounded-b-xl mb-8 shadow-md relative`}
        >
          <h1 className="text-3xl font-bold">ADHD Timer+</h1>
          <p className="mt-2 opacity-90">A gift with my ADHD book</p>
          <div className="flex items-center justify-center mt-4">
            <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
              <span className="mr-2">🔥</span> {stats.streak} day streak
            </div>
            <div className="mx-2">•</div>
            <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
              <span className="mr-2">⏱️</span> {stats.totalSessions} sessions
            </div>
          </div>

          {/* Offline indicator */}
          {offlineReady && (
            <div className="absolute top-3 right-3">
              <div
                className="bg-white bg-opacity-20 p-1 rounded-full"
                title="Ready for offline use"
              >
                <div className="w-2 h-2 rounded-full bg-green-300"></div>
              </div>
            </div>
          )}
        </header>

        {/* Quick Settings */}
        <div className="flex justify-between mb-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center px-3 py-1.5 bg-white rounded-md shadow-sm text-sm"
            >
              <span className="mr-1">📋</span>{" "}
              {menuOpen ? "Close Menu" : "Menu"}
            </button>

            <button
              onClick={toggleHighFocusMode}
              className={`flex items-center px-3 py-1.5 ${
                highFocusMode
                  ? "bg-red-500 text-white"
                  : "bg-white text-gray-800"
              } rounded-md shadow-sm text-sm`}
              title="Toggle high focus mode"
            >
              <span className="mr-1">{highFocusMode ? "👁️" : "🔍"}</span> Focus
              Mode
            </button>

            <button
              onClick={() => setShowShortcutHelp(!showShortcutHelp)}
              className="flex items-center px-3 py-1.5 bg-white rounded-md shadow-sm text-sm"
              title="Keyboard shortcuts"
            >
              <span className="mr-1">⌨️</span>
            </button>
          </div>

          <div className="flex space-x-1">
            {Object.keys(themes).map((theme) => (
              <button
                key={theme}
                onClick={() => handleThemeChange(theme)}
                className={`w-6 h-6 rounded-full ${themes[theme].primary} ${
                  currentTheme === theme ? "ring-2 ring-offset-2" : ""
                }`}
              />
            ))}
          </div>
        </div>

        {/* Keyboard Shortcuts Help */}
        {showShortcutHelp && renderKeyboardShortcuts()}

        {/* Menu Panel */}
        {menuOpen && (
          <div className="mb-6 bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex border-b overflow-x-auto">
              {tabCategories.map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`px-4 py-3 text-sm font-medium flex items-center
                    ${
                      currentTab === tab.id
                        ? `${
                            themes[currentTheme].textPrimary
                          } border-b-2 ${themes[
                            currentTheme
                          ].textPrimary.replace("text", "border")}`
                        : "text-gray-500"
                    }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
              <button
                onClick={() => setCurrentTab("customize")}
                className={`px-4 py-3 text-sm font-medium flex items-center
                  ${
                    currentTab === "customize"
                      ? `${
                          themes[currentTheme].textPrimary
                        } border-b-2 ${themes[currentTheme].textPrimary.replace(
                          "text",
                          "border"
                        )}`
                      : "text-gray-500"
                  }`}
              >
                <span className="mr-2">⚙️</span>
                <span>Customize</span>
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-4">
              {currentTab === "customize" ? (
                renderUICustomization()
              ) : (
                <div className="space-y-4">
                  {getCurrentTabModules().map((moduleId) => (
                    <div key={moduleId}>
                      {moduleId === "timerSettings" &&
                        isModuleVisible("timerSettings") && (
                          <div className="w-full p-4 bg-white rounded-lg mb-6 shadow-sm">
                            <h3
                              className={`text-lg font-medium ${themes[currentTheme].textPrimary} mb-4`}
                            >
                              Timer Settings
                            </h3>
                            <div className="flex justify-between mb-2">
                              <label
                                htmlFor="workMinutes"
                                className="font-medium"
                              >
                                Work duration (min):
                              </label>
                              <input
                                id="workMinutes"
                                type="number"
                                className="w-20 p-2 border border-gray-300 rounded-md text-center"
                                value={workMinutes}
                                onChange={handleWorkMinutesChange}
                                min="1"
                                max="60"
                              />
                            </div>
                            <div className="flex justify-between mb-2">
                              <label
                                htmlFor="breakMinutes"
                                className="font-medium"
                              >
                                Break duration (min):
                              </label>
                              <input
                                id="breakMinutes"
                                type="number"
                                className="w-20 p-2 border border-gray-300 rounded-md text-center"
                                value={breakMinutes}
                                onChange={handleBreakMinutesChange}
                                min="1"
                                max="30"
                              />
                            </div>

                            <h3 className="font-medium mt-4 mb-3">
                              Timer Presets
                            </h3>
                            <div className="grid grid-cols-3 gap-2">
                              {Object.keys(timerPresets).map((preset) => (
                                <button
                                  key={preset}
                                  onClick={() => handlePresetSelect(preset)}
                                  className={`p-2 text-xs rounded-md text-center ${
                                    currentPreset === preset
                                      ? `${themes[currentTheme].primary} text-white`
                                      : "bg-gray-100"
                                  }`}
                                >
                                  {timerPresets[preset].name}
                                  <div className="text-xs mt-1 font-normal">
                                    {timerPresets[preset].work}m/
                                    {timerPresets[preset].break}m
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                      {moduleId === "garden" && isModuleVisible("garden") && (
                        <div className="w-full p-4 bg-white rounded-lg mb-4 shadow-sm">
                          <h3 className="font-medium mb-3">Progress Garden</h3>
                          {renderGarden()}
                        </div>
                      )}

                      {moduleId === "achievements" &&
                        isModuleVisible("achievements") && (
                          <div className="w-full p-4 bg-white rounded-lg mb-4 shadow-sm">
                            <h3 className="font-medium mb-3">Achievements</h3>
                            {renderAchievements()}
                          </div>
                        )}

                      {moduleId === "breathing" &&
                        isModuleVisible("breathing") &&
                        renderBreathingExercise()}

                      {moduleId === "distraction" &&
                        isModuleVisible("distraction") &&
                        renderDistractionJournal()}

                      {moduleId === "whiteNoise" &&
                        isModuleVisible("whiteNoise") &&
                        renderWhiteNoisePlayer()}

                      {moduleId === "eyeRest" &&
                        isModuleVisible("eyeRest") &&
                        renderEyeRestReminder()}

                      {moduleId === "challenges" &&
                        isModuleVisible("challenges") &&
                        renderChallenges()}

                      {moduleId === "bookQuotes" &&
                        isModuleVisible("bookQuotes") &&
                        renderBookQuotes()}
                    </div>
                  ))}
                </div>
              )}

              {currentTab === "timer" && (
                <div className="mt-4">
                  <button
                    onClick={() => setCurrentTab("offline")}
                    className="text-sm text-blue-500 flex items-center"
                  >
                    <span className="mr-1">ℹ️</span> Offline capabilities
                  </button>
                </div>
              )}

              {currentTab === "offline" && renderOfflineInfo()}
            </div>
          </div>
        )}

        {/* Task Input */}
        {isModuleVisible("taskInput") && (
          <div className="mx-auto max-w-md w-full p-6 bg-white rounded-lg mb-8 shadow-sm">
            <h3
              className={`text-lg font-medium ${themes[currentTheme].textPrimary} mb-4`}
            >
              What are you working on?
            </h3>
            <input
              type="text"
              className="w-full px-3 py-3 border border-gray-300 rounded-md text-base mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={currentTask}
              onChange={handleTaskChange}
              placeholder="Enter your current task..."
            />
            {isModuleVisible("focusTips") && (
              <div
                className={`p-4 rounded-lg text-white text-center ${
                  mode === "work"
                    ? themes[currentTheme].primary
                    : themes[currentTheme].secondary
                }`}
              >
                <strong>Focus Tip:</strong> {currentTip}
              </div>
            )}
          </div>
        )}

        {/* Book Quote - Only in full mode */}
        {isModuleVisible("bookQuotes") && !menuOpen && renderBookQuotes()}

        {/* Timer Container */}
        {isModuleVisible("timerBasic") && (
          <div className="flex flex-col items-center justify-center mx-auto max-w-md mb-8">
            {/* Timer Display */}
            <div
              className={`text-7xl font-bold ${themes[currentTheme].textPrimary} mb-6 ${themes[currentTheme].timerDisplay} bg-opacity-40 px-8 py-4 rounded-xl w-full text-center shadow-sm relative`}
            >
              {formatTime()}
              {/* Mode indicator */}
              <div className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full bg-white bg-opacity-30">
                {mode === "work" ? "Focus" : "Break"}
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex gap-4 mb-6 w-full justify-center">
              <button
                onClick={startTimer}
                disabled={isActive}
                className={`px-3 py-3 border-none rounded-full ${
                  mode === "work"
                    ? themes[currentTheme].primary
                    : themes[currentTheme].secondary
                } text-white font-bold cursor-pointer transition-all duration-200 text-base flex-1 max-w-32 text-center disabled:bg-gray-300 disabled:cursor-not-allowed hover:shadow-md hover:-translate-y-1`}
              >
                {mode === "work" ? "Start Focus" : "Start Break"}
              </button>
              <button
                onClick={pauseTimer}
                disabled={!isActive}
                className="px-3 py-3 border-none rounded-full bg-orange-500 text-white font-bold cursor-pointer transition-all duration-200 text-base flex-1 max-w-32 text-center disabled:bg-gray-300 disabled:cursor-not-allowed hover:shadow-md hover:-translate-y-1"
              >
                Pause
              </button>
              <button
                onClick={resetTimer}
                className="px-3 py-3 border-none rounded-full bg-gray-500 text-white font-bold cursor-pointer transition-all duration-200 text-base flex-1 max-w-32 text-center hover:shadow-md hover:-translate-y-1"
              >
                Reset
              </button>
            </div>

            {/* Timer Settings in non-menu view */}
            {isModuleVisible("timerSettings") && !menuOpen && (
              <div className="w-full p-4 bg-white rounded-lg mb-6 shadow-sm">
                <h3
                  className={`text-lg font-medium ${themes[currentTheme].textPrimary} mb-4`}
                >
                  Timer Settings
                </h3>
                <div className="flex justify-between mb-2">
                  <label htmlFor="workMinutes" className="font-medium">
                    Work duration (min):
                  </label>
                  <input
                    id="workMinutes"
                    type="number"
                    className="w-20 p-2 border border-gray-300 rounded-md text-center"
                    value={workMinutes}
                    onChange={handleWorkMinutesChange}
                    min="1"
                    max="60"
                  />
                </div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="breakMinutes" className="font-medium">
                    Break duration (min):
                  </label>
                  <input
                    id="breakMinutes"
                    type="number"
                    className="w-20 p-2 border border-gray-300 rounded-md text-center"
                    value={breakMinutes}
                    onChange={handleBreakMinutesChange}
                    min="1"
                    max="30"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Session completion message */}
        {sessionCompleted && (
          <div className="max-w-md mx-auto mb-8 p-4 bg-green-100 border border-green-300 rounded-lg text-center">
            <div className="text-xl mb-2">🎉 Excellent!</div>
            <p className="text-green-800">
              You've completed a focus session. Take a short break!
            </p>
          </div>
        )}

        {/* Show breathing exercise during break */}
        {mode === "break" &&
          showBreathingExercise &&
          isModuleVisible("breathing") &&
          renderBreathingExercise()}

        {/* Email Capture - Always at bottom, even in focus mode */}
        <div className="max-w-lg mx-auto my-8 p-8 bg-white rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Get More ADHD Tools
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Enter your email to receive the full version of ADHD Timer+ and
            additional resources from my ADHD book.
          </p>
          <div className="flex flex-col gap-4">
            <input
              type="email"
              className="px-3 py-3 border border-gray-300 rounded-md"
              placeholder="Your email address"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <button
              onClick={handleEmailSubmit}
              className={`px-3 py-3 ${themes[currentTheme].primary} text-white border-none rounded-md font-bold cursor-pointer transition-all duration-200 hover:opacity-90`}
            >
              Get Access
            </button>
          </div>
          {submitted && (
            <div className="bg-green-500 text-white p-4 rounded-md mt-4">
              Thank you! Check your email for access instructions.
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 p-6 text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} ADHD Mastery. All rights reserved.</p>
          <p className="mt-2">
            Need more help with ADHD? Check out{" "}
            <a
              href="#"
              className={`${themes[currentTheme].textPrimary} no-underline hover:underline`}
            >
              my ADHD Book
            </a>
          </p>
          <div className="mt-4 flex justify-center items-center text-xs">
            <div
              className={`w-2 h-2 rounded-full ${
                offlineReady ? "bg-green-500" : "bg-gray-300"
              } mr-1`}
            ></div>
            <span>
              {offlineReady ? "Available offline" : "Preparing offline mode..."}
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
