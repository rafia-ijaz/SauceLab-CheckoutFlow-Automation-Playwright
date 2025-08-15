import dotenv from 'dotenv';
dotenv.config(); // Load .env before reading

export const creds = {
 username: (process.env.SAUCE_USERNAME || 'standard_user').trim(),
  password: (process.env.SAUCE_PASSWORD || 'secret_sauce').trim(),
};

export const customer = {
  firstName: (process.env.FIRST_NAME || 'Rafia').trim(),
  lastName: (process.env.LAST_NAME || 'Ejaz').trim(),
  postalCode: (process.env.POSTAL_CODE || '54000').trim()
};
