export const getOnlyFocusingBuddies = (buddies) => {
    const focusingBuddies = buddies.filter(buddy => buddy.isFocusing);

    return [...focusingBuddies].slice(0,1);
};