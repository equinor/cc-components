import { PersonDetails } from '../types/person-details';

/**
 * @returns if the person does not have a job title and if the persons account type is also "External", job title becomes "External"
 */
export const getJobTitle = (person: PersonDetails) => {
  if (!person.jobTitle) {
    return person.accountClassification === 'External' ? 'External' : null;
  }
  return person.jobTitle;
};

/**
 * @returns if the person does not have a department and if that persons account type is "External", department becomes domain name from the email address
 */
export const getDepartment = (person: PersonDetails) => {
  const domain = person.mail?.split('@')[1].toLowerCase();
  if (!person.department) {
    return person.accountClassification === 'External' ? domain : null;
  }
  return person.department;
};

/** Returns initials from first and if available, last name */
export const getInitials = (name: string) => {
  if (name.split(' ').length > 1) {
    return name.split(' ')[0][0] + name.split(' ')[1][0];
  } else {
    return name.split(' ')[0][0];
  }
};
