export const formatUserResults = (users: any[]) => {
  users.forEach(user => {
    user.name = user.name.toUpperCase();
    user.processedAt = new Date();
  });
  return users;
};