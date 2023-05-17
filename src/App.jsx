import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import LazyLoading from './components/LazyLoading';
import InfiniteScroll from 'react-infinite-scroll-component';

function App() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(true);
  const [next1, setNext] = useState([]);

  const data1 = () => {
    axios(`https://fakestoreapi.com/products?limit=${limit}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
        setLimit(limit + 5);
      })
      .then((json) => console.log(json));
  };

  const next = () => {
    axios(`https://fakestoreapi.com/products?limit=${limit}`)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setLimit(limit + 5);
        setData(res.data);
      })
      .then((json) => console.log(json));
  };

  useEffect(() => {
    data1();
  }, []);

  if (loading) {
    return <h1>loading...</h1>;
  }

  return (
    <>
      <h1>react infinite scrolls</h1>
      {data?.map((item) => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <LazyLoading src={item.image} alt={item.title} />
          <p>{item.description}</p>
        </div>
      ))}
      {/* next page  */}
      {limit <= 20 && (
        <button type="button" onClick={next}>
          Next
        </button>
      )}

      {/* Below button enable load more */}
      {limit <= 20 && (
        <button type="button" onClick={data1}>
          Load More
        </button>
      )}

      {/* below is for infinite scrolling */}
      {/* <InfiniteScroll
        dataLength={data?.length || []} //This is important field to render the next data
        next={next}
        hasMore={limit <= 20}
        loader={<h4>Loading...</h4>}
      >
        {data?.map((item) => (
          <div key={item.id}>
            <h2>{item.title}</h2>
            <LazyLoading src={item.image} alt={item.title} />
            <p>{item.description}</p>
          </div>
        ))}
      </InfiniteScroll> */}
    </>
  );
}

export default App;
