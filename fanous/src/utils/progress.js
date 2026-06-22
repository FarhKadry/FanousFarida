export const HARD_CODED_LEVELS = 5;

export const MOSQUE_NAMES = [
    'ابن طولون',
    'المرسي ابو العباس',
    'القلعة',
    'ياقوت العرش',
    'الأزهر',
];

export const getUnlockedLevel = () => {
    const stored = parseInt(localStorage.getItem('unlockedLevel'), 10);
    return Number.isNaN(stored) ? 1 : stored;
};

export const unlockNextLevel = (level) => {
    const unlocked = getUnlockedLevel();
    if (level >= unlocked) {
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

export const getMosqueIndex = (level) => {
    return ((level - 1) % MOSQUE_NAMES.length + MOSQUE_NAMES.length) % MOSQUE_NAMES.length;
};

export const getMosqueName = (level) => {
    return MOSQUE_NAMES[getMosqueIndex(level)];
};

export const isInfiniteLevel = (level) => {
    return level > HARD_CODED_LEVELS;
};

export const isInfiniteCollectionLevel = (level) => {
    if (!isInfiniteLevel(level)) return false;
    return level % 2 === 0;
};

export const getGameplayRoute = (level) => {
    if (level <= HARD_CODED_LEVELS) return `/gameplay${level}`;
    return isInfiniteCollectionLevel(level) ? '/infinite-collection' : '/infinite-trivia';
};

export const getPreWinRoute = (level) => {
    if (level === 1) return '/prewin';
    if (level >= 2 && level <= HARD_CODED_LEVELS) return `/prewin${level}`;
    return '/infinite-prewin';
};
