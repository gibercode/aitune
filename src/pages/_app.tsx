import RootLayout from "@/components/layout";
import type { AppProps } from "next/app";
import { StrictMode } from "react";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RootLayout>
      <StrictMode>
        <Component {...pageProps} />
      </StrictMode>
    </RootLayout>
  );
};

export default App;
