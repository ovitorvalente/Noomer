import Footer from "./components/footer";
import { HeaderInformation } from "./components/header_information";
import { RestaurantList } from "./components/restaurant-list";

export default function Home() {
  return (
    <main className="p-8">
      <HeaderInformation />
      <RestaurantList />
      <Footer />
    </main>
  );
}
