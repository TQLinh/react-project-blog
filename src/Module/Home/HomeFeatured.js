import Heading from "../../Component/Layout/Heading";
import { useToggle } from "../../Contexts/toggle-context";
import PostFeaturedItem from "../Posts/PostFeaturedItem";

const HomeFeatured = () => {
  const { storedValue: postList } = useToggle();
  return (
    <div className="mt-5 mb-8">
      <div className="container ">
        <Heading className="relative">Featured posts</Heading>
        <div className="grid justify-between grid-flow-col gap-5 mt-2 main_box">
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
