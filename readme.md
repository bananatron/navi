#Message Bus Listener (Navi)

#What It Does
- The MBL is a Node/Express app which has routes for accepting POST data from a MBA (or any other source), and writes that information into a Firebase db, as well as routes for displaying a front-end which is listening for changes from Firebase. Note, the front-end does not care about POST data, but is only currently listening for alterations to the Firebase data.

#Need To Do:
- Remove http resource references
- Clean up empty fields (errors)
- Rework request format (currently delimited string)
- Make prettier
