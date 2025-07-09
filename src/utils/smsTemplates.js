export const smsTemplates = {
  // Welcome message
  welcome: (name) => `Welcome to our platform, ${name}! We're excited to have you onboard.`,

  // Sign-in notification
  signIn: () => `You have successfully signed in to your vendor account.`,

  // OTP message 
  otp: (code) => `Your verification code is: ${code}. It will expire in 10 minutes.`,

  // Password reset notification 
  passwordReset: () => `Your password has been reset successfully. If this wasn't you, contact support immediately.`,

  // Custom message 
  custom: (message) => message,
  

  inventoryAdded: (itemName) => `A new inventory item "${itemName}" has been added to your account.`,
  inventoryUpdated: (itemName) => `Your inventory item "${itemName}" has been updated.`,




};
