# React Native app test

> Application test for the [OpenClassRooms](https://openclassrooms.com/fr/courses/4902061-developpez-une-application-mobile-react-native?status=published) course

Not exactly the same as course (some depreciations like Navigation) and improvements.


## Todo
- [ ] Add PanResponder to the Share button to move it
- [x] Global loading component
- [ ] Loading component : fix styles as props - [see here](https://stackoverflow.com/questions/29363671/can-i-make-dynamic-styles-in-react-native)
- [x] Rename `.js` to `.jsx`
- [x] Move sensitive data to `.env` file
- [x] Save favorites to local storage
- [x] Check connectivity and share it between components
    - [How to easily manage connection status updates in React Native](https://medium.com/free-code-camp/easily-manage-connection-status-updates-in-react-native-28c9b4b0647f)
    - [issue 1](https://github.com/react-native-netinfo/react-native-netinfo/issues/279#issuecomment-570782836)
    - [issue 2](https://github.com/react-native-netinfo/react-native-netinfo/issues/308#issuecomment-589555555)
    - [issue 3](https://github.com/react-native-netinfo/react-native-netinfo/issues/332#issuecomment-753475964)
- [x] Save searches for history
- [x] Pull-to-refresh on search
- [x] Add eslint - [see here](https://medium.com/swlh/add-eslint-support-to-your-react-native-project-with-react-hooks-1bbac3fac25d) - (bad idea 🤣)
- [x] Confirmation message when favorite is added/removed
- [ ] Use [PropTypes](https://github.com/facebook/prop-types)
- [x] Catch API errors and change to [axios](https://github.com/axios/axios)
- [ ] Add filters on search
- [ ] [Better UI](https://callstack.github.io/react-native-paper/index.html) + [icons](https://github.com/oblador/react-native-vector-icons)
    - [ ] Or [this UI kit](https://github.com/GeekyAnts/NativeBase)
- [ ] Use [full TMDB API](https://developers.themoviedb.org/3/getting-started)
- [ ] Add badge on favorites menu tab
