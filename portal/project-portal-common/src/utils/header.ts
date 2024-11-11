/**
 * Returns a greeting message based on the current time of day.
 *
 * - "Good morning" if the current time is between 5 AM and 12 PM.
 * - "Good afternoon" if the current time is between 12 PM and 5 PM.
 * - "Good evening" if the current time is after 5 PM or before 5 AM.
 *
 * @returns {string} A greeting message.
 */
export const getGreeting = () => {
  const currTime = new Date();
  const currHours = currTime.getHours();

  if (currHours >= 5 && currHours < 12) {
    return 'Good morning';
  } else if (currHours >= 12 && currHours < 17) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
};
