# Meeting Summary + Post Meeting - Feb 2, 2025

## Meeting Summary

1. We figured out how to display text on the canvas
2. We explored the possibility of making it 3D, and the canvas currently supports 3D rendering with a controller to move the camera
3. Worked on some styling

## Technical Details

1. It seems that the text display issue was due to some conflict in the dependencies. By removing node_modules and reinstalling them, the issue was resolved.
2. The 3D rendering was achieved using ThreeJS, and the camera movement was implemented using \<TrackballControls>.

## Post Meeting + Resources

Lists of tasks to be completed:

1. Improve the UI (any improvement will work, it currently looks trash lol)
2. Make the vector and matrix support 3D
3. Display axis text on the canvas (since we've resolved the text display issue)
4. Add arrow to the vectors
5. Add any additional elements that you think will be useful for the project!
6. Make sure the scrollbar is aligned to the very left of the page
7. Resize the canvas to fit the screen on the right side
