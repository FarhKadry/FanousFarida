const TOTAL_LEVELS = 5;

export const getUnlockedLevel = () => {
    const stored = parseInt(localStorage.getItem('unlockedLevel'), 10);
    return Number.isNaN(stored) ? 1 : stored;
};

export const unlockNextLevel = (level) => {
    const unlocked = getUnlockedLevel();
    if (level >= unlocked && level < TOTAL_LEVELS) {
        localStorage.setItem('unlockedLevel', String(level + 1));
    }
};

export const setSelectedLevel = (level) => {
    localStorage.setItem('selectedLevel', String(level));
};

export const getSelectedLevel = () => {
    const stored = parseInt(localStorage.getItem('selectedLevel'), 10);
    return Number.isNaN(stored) ? 1 : stored;
};