# README

## Project Title

Game: Buster Shot

## Background and Overview

This game was motivated by one of my childhood favorite games: Megaman. Games have always served as a source of inspiration to me since I was young. Creating a replica of my childhood relics holds sentimental value, and helps forge insight to potential career paths.

Buster Shot is a simple 2D game played on two separate 3x3 grids. Players are tasked with defeating the final boss, Falzr. Buster Man and Falzr equipped with an arsenal of lethal abilities. Kill Falzr before Falzr heats up.

## Functionality and MVP Features
    
* Players will be able to use the left/right/up/down arrow buttons to maneuver around on the platform.
* Players will be able to use the 'j' or 'k' buttons to use 'buster shot'.
* The boss will continuously spew phoenixes; as he loses health, he increases the firing rate
* Players will have to dodge phoenix as they attempt to take down the boss.

## Architecture and Technologies

### Wireframes

The app will have a play button and links to the Github repository and the developer's LinkedIn. The instructions will be provided in the game as part of the interface. As you press the commands, the interface will flash to provide player's a gameboy-like experience.

When the game starts, a modal will appear saying 'Battle Start'. Buster Man will reside in the middle of the platform facing against Falzr who is flying.

Whoever is defeated will fade away, and it will display a message for victory or defeat.

### Technology 

* Vanilla Javascript for game logic
* Canvas for rendering and object creation
* Webpack to bundle various scripts

## Implementation Timeline

#### Day 1:
- [x] Review the use of canvas to construct game elements
- [x] Complete page skeleton and setting up webpack
- [x] Complete the grid and background

#### Day 2:
- [x] Render Buster Man and Falzr
- [x] Complete movement functionality
- [x] Incorporate basic shooting mechanics

#### Day 3:
- [x] Complete rendering and functionality of Buster Man and Falzr's attack animations
- [x] Falzr's attacks will be rendered on a time queue
- [x] Implement sound for actions

#### Day 4:
- [x] Finish refining elements of the game
- [x] Complete MVPs

### Bonus features
* Implement more battle chips, and allow user to select order of randomized battle chips in inventory
* Render the gauge bar that effectively works as a timer
* Complete implementation of battle chips, including animations and resetting its use every 10 seconds.
* Complete Falzr's attack queue.
