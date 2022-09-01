import '@progress/kendo-theme-default/dist/all.css';
import {wrapper} from "../store";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp);
