export const getFocusingBuddies = (buddies) => {
    if (buddies.length <= 3) {
        return buddies;
    }
    const focusingBuddies = buddies.filter(buddy => buddy.isFocusing);
    const nonFocusingBuddies = buddies.filter(buddy => !buddy.isFocusing);
    return [...focusingBuddies, ...nonFocusingBuddies];
};

export const getTopFocusingBuddies = (buddies) => {
    if (buddies.length <= 3) {
        return buddies;
    }
    return getFocusingBuddies(buddies).slice(0, 3);
};

// Function to get buddies sorted by XP (high to low)
export const getSortedBuddiesByXP = (buddies) => {
    return [...buddies].sort((a, b) => b.xp - a.xp);
};

// Function to get the top 10 highest XP buddies
export const getTop10BuddiesByXP = (buddies) => {
    return getSortedBuddiesByXP(buddies).slice(0, 10);
};