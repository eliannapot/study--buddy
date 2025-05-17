// /**
//  * Splits an ISO 8601 date string into separate Date objects for date and time.
//  * @param {string} isoString - ISO formatted date string.
//  * @returns {{ dateOnly: Date, timeOnly: Date }}
//  */
export const splitDateAndTime = (isoString) => {
    const fullDate = new Date(isoString);

    // Extract date-only (midnight of that date)
    const dateOnly = new Date(
        fullDate.getFullYear(),
        fullDate.getMonth(),
        fullDate.getDate(),
        0,
        0,
        0
    );

    // Extract time-only (today's date with given time)
    const timeOnly = new Date();
    timeOnly.setHours(fullDate.getHours(), fullDate.getMinutes(), 0, 0);

    return { dateOnly, timeOnly };
};

// /**
//  * Validates if a given value is a valid Date instance.
//  * @param {any} d
//  * @returns {boolean}
//  */
export const isValidDate = (d) => d instanceof Date && !isNaN(d);

// /**
//  * Combines separate date and time objects into a single ISO string.
//  * @param {Date} dateOnly
//  * @param {Date} timeOnly
//  * @returns {string} ISO formatted datetime
//  */
export const combineDateAndTime = (dateOnly, timeOnly) => {
    const combined = new Date(
        dateOnly.getFullYear(),
        dateOnly.getMonth(),
        dateOnly.getDate(),
        timeOnly.getHours(),
        timeOnly.getMinutes()
    );
    return combined.toISOString();
};

// /**
//  * Returns reminder datetime ISO string based on reminder type and due date.
//  * @param {string} reminderType
//  * @param {string} dueDateISO
//  * @returns {string|null}
//  */
export const getReminderDate = (reminderType, dueDateISO) => {
    const reminderDate = new Date(dueDateISO);
    switch (reminderType) {
        case "1 hour before":
            reminderDate.setHours(reminderDate.getHours() - 1);
            break;
        case "2 hours before":
            reminderDate.setHours(reminderDate.getHours() - 2);
            break;
        case "1 day before":
            reminderDate.setDate(reminderDate.getDate() - 1);
            break;
        case "2 days before":
            reminderDate.setDate(reminderDate.getDate() - 2);
            break;
        default:
            return null;
    }
    return reminderDate.toISOString();
};
