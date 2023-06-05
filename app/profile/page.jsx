"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import Profile from "@components/Profile";
import { useRouter } from "next/navigation";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`api/prompt/${post._id}`, { method: "DELETE" });
        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const storedFakeUser = JSON.parse(sessionStorage.getItem("fakeUser"));

    const fetchPosts = async () => {
      const response = await fetch(`api/users/${storedFakeUser?.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    console.log(posts);
    if (storedFakeUser) fetchPosts();
  }, []);
  return (
    <Profile
      name={"My"}
      desc="Welcome to your personolized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
