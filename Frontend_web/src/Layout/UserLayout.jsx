import { Outlet } from "react-router-dom";
import Footer from "../elements/Footer";
import Header from "../elements/Header";

const UserLayout = () => {
  return (
    <>
      <div className="px-2 sm:px-4 md:px-8 lg:px-20">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default UserLayout;