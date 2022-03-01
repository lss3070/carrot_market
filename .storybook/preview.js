import '../styles/globals.css'
import { BrowserRouter } from 'react-router-dom'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
// export const decorators = [
//   (Story) => (
//     <ThemeProvider theme={defaultTheme}>
//     <GlobalStyle />
//     <Router>
//       <Switch>
//         <Route path="*">
//           <Story />
//         </Route>
//       </Switch>
//     </Router>
//   </ThemeProvider>
//   ),
// ]