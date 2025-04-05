import PromptCard from "./PromptCard"
import { getSession } from "next-auth/react";

interface ProfileProps {
    name: string;
    desc: string;
    data: any[];
    handleEdit?: (post: any) => void;
    handleDelete?: (post: any) => void;
    handleTagClick?: (tag: string) => void;
}

const Profile: React.FC<ProfileProps> = ({
    name,
    desc,
    data,
    handleEdit,
    handleDelete,
    handleTagClick,
}) => {
  return (
    <section className="w-full">
        <h1 className="head_text text-left">
            <span className="blue_gradient">{name}</span>
        </h1>
        <p className="desc text-left">
            {desc}
        </p>
        <div className="mt-10 prompt_layout">
             {data.map((post: any) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={() => handleTagClick && handleTagClick(post.tag)}
                    handleEdit={() => handleEdit && handleEdit(post)}
                    handleDelete={() => handleDelete && handleDelete(post)}
                />
             ))}
        </div>
    </section>
  )
}
import { GetServerSidePropsContext } from "next";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const session = await getSession(context);
  
    // If no session, redirect to the homepage
    if (!session) {
      return {
        redirect: {
          destination: "/",
          permanent: false, // Indicates that this is a temporary redirect
        },
      };
    }
  
    // If session exists, allow the user to access the page
    return {
      props: { session },
    };
  };
export default Profile
