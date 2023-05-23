'use client';

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {
        data.map(post => (<PromptCard
          post={post}
          key={post.id}
          handleTagClick={handleTagClick}
        />))
      }
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [posts, setPosts] = useState([]);
  const handleSearchChange = e => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value)
    setTimeout(() => {
      const searchResult = filterPrompts();
      setSearchResults(searchResult);
    }, 500)
  };

  const filterPrompts = () => {
    const regex = new RegExp(searchText, "i"); //'i' flag for case-insensitive search
    return posts.filter(
      item =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    )
  }

  const handleTagClick = tagName => {
    setSearchText(tagName);
    const searchResult = filterPrompts();
    setSearchResults(searchResult);
    console.log(setSearchResults);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, [])

  return (
    <section className="feed">
      <form action="" className="relative w-full flex-center">
        <input type="text" placeholder="Search for a tag or username"
          value={searchText}
          required
          className="search_input peer"
          onChange={handleSearchChange} />
      </form>

      <PromptCardList
        data={searchText ? searchResults : posts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed