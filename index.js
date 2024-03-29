const axios = require("axios");

exports.getRandomCNJoke = (joke) => {
  axios
    .get("http://api.icndb.com/jokes/random?limitTo=[nerdy]")
    .then((response) => {
      joke(response.data.value.joke);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCustomJoke = (firstName, lastName, joke) => {
  const fn = firstName;
  const ln = lastName;
  axios
    .get(
      `http://api.icndb.com/jokes/random?firstName=${fn}&lastName=${ln}&limitTo=[nerdy]`
    )
    .then((response) => {
      joke(response.data.value.joke);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getRandomDadJoke = function (joke) {
  const options = {
    url: "https://icanhazdadjoke.com/",
    headers: {
      Accept: "application/json",
    },
  };
  axios(options)
    .then((response) => {
      const dataJSON = response.data;
      joke(dataJSON.joke);
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getRandomJokeOfTheDay = (category, joke) => {
  let query = "";
  if (category) query += `?category=${category}`;

  const configJOD = {
    url: `https://api.jokes.one/jod${query}`,
    headers: {
      "Content-type": "application/json",
    },
  };
  axios(configJOD)
    .then((response) => {
      joke(response.data.contents.jokes[0].joke.text);
    })
    .catch((err) => {
      console.log("Sorry, Free limit Exceeded!");
    });
};
