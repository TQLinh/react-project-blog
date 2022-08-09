import Heading from "../../Component/Layout/Heading";
import { useToggle } from "../../Contexts/toggle-context";
import PostFeaturedItem from "../Posts/PostFeaturedItem";

const HomeFeatured = () => {
  const { storedValue: postList } = useToggle();
  return (
    <div className="mt-5 mb-8 lg:px-0 px-1x">
      <div className="container ">
        <Heading className="relative">Featured posts</Heading>
        <div className="flex flex-wrap justify-around gap-4x md:gap-3x mt-2 lg:grid lg:grid-cols-3 xl:grid-flow-col sm:!transform-none main_box">
          {postList.length > 0 &&
            postList.slice(0, 3).map((data) => {
              return (
                <PostFeaturedItem data={data} key={data.id}></PostFeaturedItem>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default HomeFeatured;
