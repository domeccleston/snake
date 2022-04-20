- create 10x10 grid [x]
- render grid visibly to screen [x]
- colour grid alternately with no borders [x]
- add colours to board [x]
- add snake to middle [x]
- give snake a length [x]
- render snake with css [x]
- allow snake to move [x]
- allow snake to wrap around screen [x]
- add keyboard event listeners [x]
- allow snake to move head-first
  - find data structure that allows memory of previous positions [x]
  - implement this data structure (linked list) [x]
  - test this with some movement commands [x]
  - port linked list implementation over to snake class [x]
  - snake can move laterally using new ll implementation [x]
  - snake can change direction using ll implementation [x]
  - snake cannot reverse direction [x]
- add function that adds persistent random food to board [x]
- food can be eaten to increase length by 1 [x]
- food disappears on eaten [x]
- new food is added on eaten [x]
- food decreases the game loop interval by 100 [x]
- add death if snake collides with walls [x]
- add score counter [x]
- add game over text for hitting top of game window [x]
- add game over text for hitting edge of any window [x]
- add high score functionality [x]
- add restart functionality [x]
- add persistent high scores [x]
- fix current bug with border collisions

On each tick, let the head of the snake move 1 square in
the snake's current direction. Let the remaining squares
take up the position of the previous square in front of
it.

To illustrate, take a snake of length 4 whose constituent
blocks are designated A, ... Z. Assume the snake cannot
be longer than 26 blocks. The snake's head will always
be designated A and subsequently added blocks will 
take subsequent letters of the alphabet.

When the snake changes direction to down, A will move 
down one square. B will take the previous position of 
A, C will take the previous position of B, etc.

This can be implemented in the form of a singly-linked
list. When the snake moves in a new direction, move the
head (A) accordingly, and move each subsequent block
to its successor's previous position (i.e. B -> prevA).