"use client"

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Profile from "@/components/Profile";

const Page = () => {
  const { data: session, status } = useSession(); // Track session and status
  const router = useRouter();
  const [posts, setPosts] = useState([]); 

  // Redirect to the home page if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/"); // Redirect unauthenticated users to homepage
    }
  }, [status, router]);

  // Fetch posts only if user is authenticated
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    if (session?.user?.id) fetchPosts();
  }, [session?.user?.id]);

  // Handle editing a post
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  // Handle deleting a post
  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE',
        });
        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Show a loading state if session is being checked
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Prevent rendering if user is not authenticated
  if (!session) {
    return null;
  }

  return (
    <Profile
      name="My Profile"
      desc="Welcome to my profile"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default Page;
