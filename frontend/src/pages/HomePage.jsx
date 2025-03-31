import Banner from "../components/Banner";
import Activities from "../components/post/Activities" 
import PostNew from "../components/post/PostNew";
import Footer from "../components/post/Footer";


const HomePage = () => {
  return (
    <>
      <Banner></Banner>
      <Activities></Activities>
      <PostNew></PostNew>
      <Footer></Footer>
    </>
  );
};

export default HomePage;
