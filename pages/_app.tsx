import '../styles/global.css'
import App from 'next/app';
import { AppContext, AppInitialProps, AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

MyApp.getInitialProps = async (appContext: AppContext): Promise<AppInitialProps> => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  
  return { ...appProps }
}

export default MyApp;