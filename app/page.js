'use client'
import { IntlProvider } from "react-intl";
import Header from "./components/Header";
import CoursesSection from "./components/Home/CoursesSection";
import InfoSection from "./components/Home/InfoSection";
import MainSection from "./components/Home/MainSection";
import EventSection from "./components/Home/EventSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="w-full">
      {/* <IntlProvider locale="tr"> */}
        {/* <div className="container mx-auto">
          <Header />
        </div> */}
        <title>Educal</title>
        <MainSection />
        <InfoSection />
        <CoursesSection />
        <EventSection />
        {/* <Footer /> */}
      {/* </IntlProvider> */}
    </main>
  );
}
