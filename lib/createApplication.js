import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SnackbarProvider } from 'notistack';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { ThemeProvider, StylesProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '@common/style/theme';

class Main extends React.Component {
  // Remove the server-side injected CSS.
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { App } = this.props; // eslint-disable-line
    return <App />;
  }
}

/**
 * Creates a React application which can be used as a webpack entry point
 * for a specific App component and routes, pre-configured with apollo-client
 * @param  {React.Component} AppComponent The main application component
 * @return {React.Component} The main application component wrapped with routing
 * and Apollo provider.
 */
export default function createApplication(AppComponent) {
  require('@common/style/base');

  const authLink = setContext((_, { headers = {} }) => {
    let context = { headers };

    return context;
  });

  const httpLink = new HttpLink({
    uri: process.env.GRAPHQL_ENDPOINT,
    credentials: 'include'
  });

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(window.__APOLLO_STATE__)
  });

  // Render the application
  (function() {
    Loadable.preloadReady().then(() => {
      ReactDOM.hydrate(
        <BrowserRouter>
          <ApolloProvider client={apolloClient}>
            <ApolloHooksProvider client={apolloClient}>
              <ThemeProvider theme={theme}>
                <StylesProvider injectFirst>
                  <CssBaseline />
                  <SnackbarProvider maxSnack={5}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <Main App={AppComponent} />
                    </MuiPickersUtilsProvider>
                  </SnackbarProvider>
                </StylesProvider>
              </ThemeProvider>
            </ApolloHooksProvider>
          </ApolloProvider>
        </BrowserRouter>,
        document.getElementById('app')
      );
    });
  })();
}
