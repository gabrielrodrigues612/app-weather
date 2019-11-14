window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDegree = document.querySelector(".temperature-degree");
  let degree = document.querySelector(".degree");
  let textDescription = document.querySelector(".text-description");
  let timezone = document.querySelector(".location-timezone");

  //Searching for the localization of the device
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      lat = position.coords.latitude;
      long = position.coords.longitude;

      //This site allows us to access the API from a localhost
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/f09453d57ec2e73b9e0b66166b543452/${lat},${long}`;

      //Fetching the data
      fetch(api)
        .then(data => {
          return data.json();
        })
        .then(data => {
          const { temperature, summary, icon } = data.currently;

          //Set DOM elements
          temperatureDegree.textContent = temperature;
          textDescription.textContent = summary;
          timezone.textContent = data.timezone;

          //Set Icon
          setIcons(icon, document.querySelector(".icon"));

          //Set C ou F
          changeTemperature();
        });
    });
  } else {
    textDescription.textContent =
      "Allow us to know your localization to continue";
  }

  //Setting up the icons
  function setIcons(icon, iconId) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconId, Skycons[currentIcon]);
  }

  //Converting the temperature from celsius to fahenreit and vice-versa
  function changeTemperature() {
    degree.textContent = "F";
    temperatureDegree.addEventListener("click", () => {
      if (degree.textContent === "F" || degree.textContent === "") {
        degree.textContent = "C";
        let f = temperatureDegree.textContent;
        let graus = (f - 32) / 1.8;
        temperatureDegree.textContent = graus.toFixed(2);
      } else {
        let c = temperatureDegree.textContent;
        let graus = c * 1.8 + 32;
        temperatureDegree.textContent = graus.toFixed(2);
        degree.textContent = "F";
      }
    });
  }
});
