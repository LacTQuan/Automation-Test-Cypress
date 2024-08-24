const USERS = ["Harry Potter", "User XHG2F3"];

export const getUsers = (currentUser) => {
  return USERS.filter((user) => user !== currentUser);
};

export const getLocation = () => {
  // randomly select a location
  const locations = [
    "Hanoi",
    "Ho Chi Minh",
    "Da Nang",
    "Hai Phong",
    "Can Tho",
    "Vung Tau",
    "Nha Trang",
    "Da Lat",
    "Hue",
    "Quy Nhon",
    "Phu Quoc",
  ];
  return locations[Math.floor(Math.random() * locations.length)];
};

export const getTitle = () => {
  // randomly select a title
  const titles = [
    "Setup project",
    "Create new feature",
    "Fix bugs",
    "Refactor code",
    "Update documentation",
    "Write tests",
    "Deploy application",
    "Review code",
    "Prepare presentation",
    "Attend meeting",
    "Create report",
  ];
  return titles[Math.floor(Math.random() * titles.length)];
};

export const getDescription = () => {
  // randomly select a description
  const descriptions = [
    "Setup backend using Java Spring Boot",
    "Create frontend using React",
    "Implement authentication using JWT",
    "Setup CI/CD pipeline using Jenkins",
    "Write unit tests using JUnit",
    "Write end-to-end tests using Cypress",
    "Deploy application to AWS",
    "Review pull request on GitHub",
    "Prepare slides for presentation",
    "Discuss project requirements",
    "Create report for stakeholders",
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

export const getPollTitle = () => {
  // randomly select a poll title
  const titles = [
    "Where to have lunch?",
    "Which movie to watch?",
    "What to do this weekend?",
    "Which game to play?",
    "What to have for dinner?",
    "Which book to read?",
    "Where to go on vacation?",
    "What to do on holiday?",
    "Which song to listen to?",
    "What to watch on Netflix?",
    "Which restaurant to go to?",
  ];
  return titles[Math.floor(Math.random() * titles.length)];
};

export const getPollChoices = (k = 3) => {
  // randomly select poll choices
  const choices = [
    ["Italian", "Japanese", "Vietnamese"],
    ["Action", "Comedy", "Drama"],
    ["Go to the beach", "Watch a movie", "Read a book"],
    ["Chess", "Poker", "Monopoly"],
    ["Pizza", "Burger", "Sushi"],
    ["Fiction", "Non-fiction"],
    ["Beach", "Mountains", "City"],
    ["Swimming", "Hiking", "Camping"],
    ["Pop", "Rock", "Rap"],
    ["Drama", "Sci-fi", "Documentary"],
    ["Italian", "Mexican", "Chinese"],
  ];
  if (k < 3) {
    return choices[Math.floor(Math.random() * choices.length)].slice(0, k);
  }
  return choices[Math.floor(Math.random() * choices.length)];
};


