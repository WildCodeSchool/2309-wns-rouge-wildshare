import Head from "next/head";
import Menu from "./menu";
import MobileHeader from "./mobileHeader";
import GetWindowDimensions from "@/utils/getWindowDimensions";

export type LayoutProps = {
  title: string;
  children: React.ReactNode;
};

export default function Layout(props: LayoutProps): React.ReactNode {
  const windowDimensions = GetWindowDimensions();

  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {windowDimensions.width && windowDimensions.width > 575 ? (
        <Menu width={windowDimensions.width} />
      ) : (
        <MobileHeader width={windowDimensions.width as number} />
      )}
      <main className="full_width main layout_container">{props.children}</main>
    </>
  );
}
