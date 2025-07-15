
export const checkTaskBadges = async (userId, isCommonTask, allBadges, userBadges, addUserBadge) => {
      
  try {
    // Filter only task-related badges that have valid criteriaKey
    const taskBadges = allBadges.filter(badge => {
        if (!badge.criteriaKey) return false;
        
        const prefix = isCommonTask ? 'common-task_' : 'task_';
        return badge.criteriaKey.startsWith(prefix);
    });

    if (taskBadges.length === 0) {
        console.log('No valid task badges found');
        return [];
    }

    // Count completed tasks of this type
    const prefix = isCommonTask ? 'common-task_' : 'task_';
    const completedCount = userBadges.filter(ub => {
        const badge = allBadges.find(b => b.$id === ub.badge_id);
        return badge?.criteriaKey?.startsWith(prefix);
    }).length + 1; // +1 for current task
    console.log(`Completed count for ${isCommonTask ? 'common task' : 'task'}:`, completedCount);

    // Find badges to award
    const badgesToAward = taskBadges.filter(badge => {
        const requiredCount = parseInt(badge.criteriaKey.split('_')[1]);
        const alreadyHasBadge = userBadges.some(ub => ub.badge_id === badge.$id);
        return completedCount >= requiredCount && !alreadyHasBadge;
    });

    // Award new badges
    const earnedBadges = [];
    for (const badge of badgesToAward) {
        try {
            const result = await addUserBadge(userId, badge.$id, false); 
            if (result?.$id) {
                earnedBadges.push(badge);
                console.log(`Awarded badge: ${badge.title}, to user ${userId}`);
            }
        } catch (error) {
            console.error(`Failed to award badge ${badge.title}:`, error);
        }
    }
    
    return earnedBadges;
  } catch (error) {
      console.error('Error in checkTaskBadges:', error);
      return [];
  }
};

