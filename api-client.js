const apiUrl = "https://wincacademydatabase.firebaseio.com/ramon";

const getData = async () => {
  try {
    const res = await fetch(`${apiUrl}/tasks.json`, {
      method: "GET",
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

const postData = (todo) => {
  return fetch(`${apiUrl}/tasks.json`, {
    method: "POST",
    body: JSON.stringify(todo),
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));
};

const deleteData = (todoID) => {
  return fetch(`${apiUrl}/tasks/${todoID}.json`, {
    method: "DELETE",
    //https://wincacademydatabase.firebaseio.com/ramon/tasks/-MK-SVbkNSXQ37YJ9UNB.json
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));
};
