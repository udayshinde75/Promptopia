'use client'
import {useState ,useEffect} from 'react';
import PromptCard from './PromptCard';

interface PromptCardListProps {
    data: any[];
    handleTagClick: (tagName: string) => void;
}

const PromptCardList = ({data, handleTagClick}: PromptCardListProps) => {
    return (
        <div className="mt-16 prompt_layout">
             {data.map((post: any) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                    handleEdit={() => {}}
                    handleDelete={() => {}}
                />
             ))}
        </div>
    )
};

const Feed = () => {
    const [searchText, setSearchText] = useState('');
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
    interface Post {
        _id: string;
        creator: {
            username: string;
        };
        tag: string;
        prompt: string;
    }
    
    const [posts, setPosts] = useState<Post[]>([]);
    const [searchedResults, setSearchedResults] = useState<Post[]>([]);


    const filterPrompts = (searchtext:string) => {
        const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
        return posts.filter(
          (item) =>
            regex.test(item.creator.username) ||
            regex.test(item.tag) ||
            regex.test(item.prompt)
        );
      };

    const handleSearchChange = (e : any) => {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        setSearchText(e.target.value);
    
        // debounce method
        setSearchTimeout(
          setTimeout(() => {
            const searchResult = filterPrompts(e.target.value);
            setSearchedResults(searchResult);
          }, 500)
        );
      };
    useEffect(()=>{
        const fetchPosts = async () => {
            const response = await fetch('/api/prompt')
            const data = await response.json();
            console.log('data')
            console.log(data)
            setPosts(data);
        }
        console.log(posts)
        fetchPosts();
    },[])
    const handleTagClick = (tagName:string) => {
        setSearchText(tagName);
    
        const searchResult = filterPrompts(tagName);
        setSearchedResults(searchResult);
      };
  return (  
    <section className='feed'>
      <form className="relative w-full flex-center">
        <input
            type='text'
            placeholder='Search for a tag or username or prompt'
            value={searchText}
            onChange={handleSearchChange}
            required
            className='search_input peer'
        />
      </form>
      <PromptCardList
        data={searchText ? searchedResults : posts}
        handleTagClick={handleTagClick}
        />
    </section>
  )
}

export default Feed
