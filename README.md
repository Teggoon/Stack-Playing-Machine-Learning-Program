# StackAITest

This is for making a simple AI that learns to play the Ketchapp game Stack

The game itself is emulated in 2D form (minus the fancy 3D graphics but with the same gameplay), and the program adjusts the weight used to choose at what distance to cut the blocks.

The program uses Q-learning, having a table keeping track of each weight and their associated scores. A simple gradient descent was then used to find better weights based on the table's highest results.
