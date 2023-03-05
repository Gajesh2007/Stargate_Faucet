import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import Head from 'next/head'
import Script from "next/script";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import {
	goerli,
	polygonMumbai,
	optimismGoerli,
	arbitrumGoerli,
	bscTestnet,
	fantomTestnet
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import MainLayout from "../layout/mainLayout";

const { chains, provider } = configureChains(
	[
		goerli,
		polygonMumbai,
		optimismGoerli,
		arbitrumGoerli,
		bscTestnet,
		fantomTestnet,
	],
	[publicProvider()]
);

const { connectors } = getDefaultWallets({
	appName: "LayerZero Faucet",
	chains,
});

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});

export { WagmiConfig, RainbowKitProvider };
function MyApp({ Component, pageProps }) {
	return (
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider
				modalSize="compact"
				initialChain={process.env.NEXT_PUBLIC_DEFAULT_CHAIN}
				chains={chains}
			>
				<Head>
					<title>Stargate Faucet</title>
       				<meta property="og:title" content="Stargate Faucet" key="title" />
				</Head>
				<Script async src="https://www.googletagmanager.com/gtag/js?id=G-CM7EWBMMQB"></Script>
				<Script>
					{`
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());

						gtag('config', 'G-CM7EWBMMQB');
					`}
				</Script>
				<MainLayout>
					<Component {...pageProps} />
				</MainLayout>
			</RainbowKitProvider>
		</WagmiConfig>
	);
}

export default MyApp;
