
export const checkTaskBadges = async (userId, tasks, isCommonTask, allBadges, userBadges, addUserBadge) => {
      
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

    // Count completed tasks of each type
    const completedRegularTasks = tasks.filter(task => 
        task.status === "Done" && 
        (!task.studyBuddy || task.studyBuddy.length < 2)
    ).length;

    const completedCommonTasks = tasks.filter(task => 
        task.status === "Done" && 
        task.studyBuddy && 
        task.studyBuddy.length >= 2
    ).length;

    console.log(`Completed regular tasks: ${completedRegularTasks}, common tasks: ${completedCommonTasks}`);
    
    // Find badges to award
    const badgesToAward = taskBadges.filter(badge => {
        const [type, requiredCountStr] = badge.criteriaKey.split('_');
        const requiredCount = parseInt(requiredCountStr);
      
        const completedCount = type === 'common-task' ? 
        completedCommonTasks : completedRegularTasks ;

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

