const getUserKey = () => {
  const savedUser = localStorage.getItem("user");

  if (!savedUser) {
    return null;
  }

  try {
    const user = JSON.parse(savedUser);

    if (!user?.email) {
      return null;
    }

    return `netflix_my_list_${user.email}`;
  } catch (error) {
    console.error("USER PARSE ERROR:", error);
    return null;
  }
};

export const getMyList = () => {
  const userKey = getUserKey();

  if (!userKey) {
    return [];
  }

  const savedList = localStorage.getItem(userKey);

  return savedList ? JSON.parse(savedList) : [];
};

export const isInMyList = (movieId) => {
  const list = getMyList();

  return list.some((movie) => movie.id === movieId);
};

export const addToMyList = (movie) => {
  const userKey = getUserKey();

  if (!userKey) {
    console.log("USER NOT LOGGED IN");
    return [];
  }

  const list = getMyList();

  const alreadyExists = list.some(
    (item) => item.id === movie.id,
  );

  if (alreadyExists) {
    return list;
  }

  const updatedList = [...list, movie];

  localStorage.setItem(
    userKey,
    JSON.stringify(updatedList),
  );

  return updatedList;
};

export const removeFromMyList = (movieId) => {
  const userKey = getUserKey();

  if (!userKey) {
    return [];
  }

  const list = getMyList();

  const updatedList = list.filter(
    (movie) => movie.id !== movieId,
  );

  localStorage.setItem(
    userKey,
    JSON.stringify(updatedList),
  );

  return updatedList;
};