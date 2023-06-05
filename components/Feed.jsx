"use client";

import React, { useSate, useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data?.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState("");
  const [posts, setPosts] = useState([]);
  const [searchedResults, setSearchedResults] = useState([]);

  const filterPosts = (searchtext) => {
    const regex = new RegExp(searchtext, "i");

    return posts.filter((p) => regex.test(p.prompt) || regex.test(p.tag));
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);

    setSearchText(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        setSearchedResults(filterPosts(e.target.value));
      }, 500)
    );
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);

    setSearchedResults(filterPosts(tag));
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("api/prompt");
      const data = await response.json();
      setPosts(data);
    };
    console.log(posts);
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={searchedResults.length > 0 ? searchedResults : posts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
