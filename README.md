[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

# React Front-End for rent a place

On this project, I created a Front End that uses my [API](https://github.com/Stricks1/HousesApi) to manage renting places. The idea is to create a simplified version of AirBnb, where every user can register their own places for rent. For now, the Front End can handle the user signup and signing (utilizing tokens for validating the sessions/saving the machine login), each user can create edit and delete their own places and add photos for their renting places, save or remove places from their favorites and get a list of favorite places at each user.

#### Login Page
![Login](./loginSS.png)

#### Places Page
![Places](./placesSS.png)

## Table of Contents

- [Installation](#installation)
- [Tests](#tests)
- [Built With](#built-with)
- [Live Version](#live-version)
- [Future Implementations](#future-implementations)
- [Contributing](#contributing)
- [Acknowledgments](#acknowledgments)
- [Authors](#author)
- [License](#license)

## Installation

You can get a local copy of the repository please run the following commands on your terminal:

```
$ cd <folder>
$ git clone https://github.com/Stricks1/houses-front-end.git
```

Run `npm install` in your terminal. If you are running your own API server, you need to do this extra step: change the constant URL on: client/src/helpers/constants.js for the URL you are running your server, the default URL there is a deployed version on heroku from [this repo](https://github.com/Stricks1/HousesApi). Run `npm start` to run on your local machine. If you wish to deploy on production, run `npm run build`.

#### Prerequisites for Running API

Node: >= 14.0

## Tests

To run the tests, on the project folder run `npm test`


## Built With

- React
- Redux
- HTML
- CSS
- Axios

## Live Version

[Deployed on Netlify](https://gallant-ptolemy-3e1fa6.netlify.app/)

## Future Implementations

- I plan to add a calendar when clicking to rent a place, showing the available dates to rent and options to create and cancel a reservation (this is already prepared on the API just need to work on the Front End for this part).
- It will be nice to have a page where the owner can check his rented places and the earnings he is making monthly with their rents. (This will need some work also on the API to return the information).
- Another feature I want to create in the future is a chat between owner and renter. (This needs to be prepared on my API first)

## Contributing

Contributions, issues and feature requests are welcome!

You can do it on [issues page](issues/).

## Acknowledgments

This project was inspired by this [behance project idea](https://www.behance.net/gallery/37706679/Circle-(Landing-page-Dashboard-Mobile-App)) by [Alexey Savitskiy](https://www.behance.net/alexey_savitskiy)

Special thanks to code reviewers.

## Show your support

Give a ⭐️ if you like this project!

## Author

👤 **Gabriel Malheiros Silveira**

- Github: [@Stricks1](https://github.com/Stricks1)
- Linkedin: [Gabriel Silveira](https://linkedin.com/in/gabriel-malheiros-silveira/)
- Twitter: [@Gabriel_Stricks](https://twitter.com/Gabriel_Stricks)

## License

<strong>Creative Commons 2020</strong>

<!-- MARKDOWN LINKS & IMAGES -->

[contributors-shield]: https://img.shields.io/github/contributors/stricks1/houses-front-end.svg?style=flat-square
[contributors-url]: https://github.com/stricks1/houses-front-end/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/stricks1/houses-front-end.svg?style=flat-square
[forks-url]: https://github.com/stricks1/houses-front-end/network/members
[stars-shield]: https://img.shields.io/github/stars/stricks1/houses-front-end.svg?style=flat-square
[stars-url]: https://github.com/stricks1/houses-front-end/stargazers
[issues-shield]: https://img.shields.io/github/issues/stricks1/houses-front-end.svg?style=flat-square
[issues-url]: https://github.com/stricks1/houses-front-end/issues
