// Function to validate the user registration fields
export const validateRegister = (user) => {
    if (!user.name || !user.email || !user.password) { // Check if any of the fields are empty
      return false;
    }
    return true;
  };
  
  // Function to validate an email address format
  export const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/; // Simple email regex pattern
    return re.test(email); // Return true if the email matches the pattern, false otherwise
  };
  