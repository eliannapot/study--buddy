
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

export const checkEventBadges = async (userId, events, allBadges, userBadges, addUserBadge) => {
  try {
    // Filter only event-related badges that have valid criteriaKey
    const eventBadges = allBadges.filter(badge => {
      if (!badge.criteriaKey) return false;
      return badge.criteriaKey.startsWith('event_') || 
             badge.criteriaKey.startsWith('common-event_');
    });

    if (eventBadges.length === 0) {
      console.log('No valid event badges found');
      return [];
    }

    // Count attended events of each type
    const attendedRegularEvents = events.filter(event => 
      event.attended === true && 
      (!event.studyBuddy || event.studyBuddy.length < 2)
    ).length;

    const attendedCommonEvents = events.filter(event => 
      event.attended === true && 
      event.studyBuddy && 
      event.studyBuddy.length >= 2
    ).length;

    console.log(`Attended regular events: ${attendedRegularEvents}, common events: ${attendedCommonEvents}`);

    // Find badges to award
    const badgesToAward = eventBadges.filter(badge => {
      const [type, requiredCountStr] = badge.criteriaKey.split('_');
      const requiredCount = parseInt(requiredCountStr);
      
      const attendedCount = type === 'common-event' ? 
        attendedCommonEvents : 
        attendedRegularEvents;
      
      const alreadyHasBadge = userBadges.some(ub => ub.badge_id === badge.$id);
      
      return attendedCount >= requiredCount && !alreadyHasBadge;
    });

    // Award new badges
    const earnedBadges = [];
    for (const badge of badgesToAward) {
      try {
        const result = await addUserBadge(userId, badge.$id, false); 
        if (result?.$id) {
          earnedBadges.push(badge);
          console.log(`Awarded event badge: ${badge.title}, to user ${userId}`);
        }
      } catch (error) {
        console.error(`Failed to award event badge ${badge.title}:`, error);
      }
    }
    
    return earnedBadges;
  } catch (error) {
    console.error('Error in checkEventBadges:', error);
    return [];
  }
};

export const checkStreakBadges = async (userId, currentStreak, allBadges, userBadges, addUserBadge) => {
  try {
    // Filter only streak-related badges that have valid criteriaKey
    const streakBadges = allBadges.filter(badge => {
      if (!badge.criteriaKey) return false;
      return badge.criteriaKey.startsWith('streak_');
    });

    if (streakBadges.length === 0) {
      console.log('No valid streak badges found');
      return [];
    }

    console.log(`Current streak: ${currentStreak}`);

    // Find badges to award
    const badgesToAward = streakBadges.filter(badge => {
      const [_, requiredDaysStr] = badge.criteriaKey.split('_');
      const requiredDays = parseInt(requiredDaysStr);
      
      const alreadyHasBadge = userBadges.some(ub => ub.badge_id === badge.$id);
      
      return currentStreak >= requiredDays && !alreadyHasBadge;
    });

    // Award new badges
    const earnedBadges = [];
    
    for (const badge of badgesToAward) {
      try {
        const result = await addUserBadge(userId, badge.$id, false); 
        if (result?.$id) {
          earnedBadges.push(badge);
          console.log(`Awarded streak badge: ${badge.title}, to user ${userId}`);
        }
      } catch (error) {
        console.error(`Failed to award streak badge ${badge.title}:`, error);
      }
    }

    return earnedBadges;
  
  } catch (error) {
    console.error('Error in checkStreakBadges:', error);
    return [];
  }

};