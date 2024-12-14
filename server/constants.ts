// Operating days (0 = Sunday, 1 = Monday, etc.)
export const OPERATING_DAYS = [3, 4, 5, 6, 0]; // Wed, Thu, Fri, Sat, Sun

// Operating hours (24-hour format)
export const OPENING_HOUR = 12; // 12:00 PM
export const CLOSING_HOUR = 22; // 10:00 PM

export const TIME_SLOTS = Array.from(
  { length: CLOSING_HOUR - OPENING_HOUR },
  (_, i) => {
    const hour = OPENING_HOUR + i;
    return `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
  }
);