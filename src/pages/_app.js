import Footer from "@/components/templates/footer";
import Header from "@/components/templates/Header";
import { Provider } from "react-redux";
import store from "@/redux/store";
import RouteGuard from "@/services/RouteGuard";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <RouteGuard>
        <Header />
        <main className="bg-gray-800 min-h-screen">
          <Component {...pageProps} />
        </main>
        <Footer />
      </RouteGuard>
    </Provider>
  );
}
