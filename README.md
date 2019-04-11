# README

## Project Title

Game: Buster Shot

## Background and Overview

This game was motivated by one of my childhood favorite games: Megaman. Games have always served as a source of inspiration to me since I was young. Creating a replica of my childhood relics holds sentimental value, and helps forge insight to potential career paths.

Buster Shot is a simple 2D game played on two separate 3x3 grids. Players are tasked with defeating the final boss, Falzr. Buster Man and Falzr equipped with an arsenal of lethal abilities. Kill Falzr before Falzr heats up.

## Functionality and MVP Features
    
* Players will be able to use the left/right/up/down arrow buttons to maneuver around on the platform.
* Buster Man has a base gun, but can generate an empowered shot after charging for 2 seconds.
* You will be auto-generated special abilities to use every 10 seconds.
* The boss will randomize its attack. Attacks will occur at regular intervals.
* Once the boss loses 25% hp, it will activate a special ability.

## Architecture and Technologies

### Wireframes

The app will have a play button and links to the Github repository and the developer's LinkedIn. The instructions will be provided in the game as part of the interface.

When the game starts, a modal will appear saying 'Battle Start'. Buster Man will reside in the middle of the platform facing against Falzr who is flying.

Whoever is defeated will fade away, and it will display a message for "Victory" or "Defeat". Press 'OK' to continue to the front screen.

### Technology 

* Vanilla Javascript for game logic
* Canvas for rendering and object creation
* Howler.js for audio
* Webpack to bundle various scripts

## Implementation Timeline

#### Day 1:
- [ ] Review the use of canvas to construct game elements
- [ ] Complete page skeleton and setting up webpack
- [ ] Complete the grid and background

#### Day 2:
- [ ] Render Buster Man and Falzr
- [ ] Render the gauge bar that effectively works as a timer
- [ ] Complete movement functionality
- [ ] Incorporate basic shooting mechanics

#### Day 3:
- [ ] Complete rendering and functionality of Buster Man and Falzr's attack animations
- [ ] Falzr's attacks will be rendered on a time queue
- [ ] Implement sound for actions

#### Day 4:
- [ ] Complete implementation of battle chips, including animations and resetting its use every 10 seconds.
- [ ] Finish refining elements of the game
- [ ] Complete MVPs

### Bonus features
* Implement more battle chips, and allow user to select order of randomized battle chips in inventory
