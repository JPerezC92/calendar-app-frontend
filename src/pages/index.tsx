import type { NextPage } from 'next';
import { AuthWebRoute } from 'src/modules/shared/routes/app';
import Redirect from 'src/modules/shared/components/Redirect';

const Home: NextPage = () => {
  // const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Redirect to={`${AuthWebRoute.LOGIN}`} />

      {/* <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <Button onClick={toggleColorMode}>
          Toggle {colorMode === "light" ? "Dark" : "Light"}
        </Button>
      </header> */}
    </>
  );
};

export default Home;
