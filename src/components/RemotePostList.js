import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  List, message, Spin, Typography, Tag,
} from 'antd';

import InfiniteScroll from 'react-infinite-scroller';
import './Posts.css';
import Config from '../config';

const { Title } = Typography;
const dummyURL = 'https://newsapi.org/v2/everything?q=watches&sortBy=publishedAt';

const styles = {
  postBody: {
    display: 'flex',
    flexDirection: 'column',
  },
  postBodyFooter: {
    paddingTop: 10,
  },
};

function RemotePostList() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [loading, setLoading] = useState();
  const [hasMore, setHasMore] = useState(true);

  const getPosts = async () => {
    const rsp = await axios.get(`${dummyURL}&apiKey=${Config.apiKey}&page=${page}`);
    setPosts(posts.concat(rsp.data ? rsp.data.articles : []));
    setTotal(rsp.data ? rsp.data.totalResults : 0);
    setLoading(false);
    setPage(page + 1);
  };

  const handleInfiniteOnLoad = () => {
    setLoading(true);
    if (posts.length > total) {
      message.warning('No more results');
      setHasMore(false);
      setLoading(false);
    }
    getPosts();
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="infinite-container">
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={handleInfiniteOnLoad}
        hasMore={!loading && hasMore}
        useWindow={false}
      >
        <Title level={3}>Global news about watches</Title>
        <List
          data-testid="list"
          itemLayout="vertical"
          size="large"
          dataSource={posts}
          renderItem={(item, index) => (
            <List.Item
              key={index}
              extra={(
                <img
                  alt="logo"
                  src={item.urlToImage}
                  style={{ maxWidth: 272, width: '100%' }}
                />
              )}
            >
              <List.Item.Meta
                title={<div><a href={item.url}>{item.title}</a></div>}
                description={<div dangerouslySetInnerHTML={{ __html: item.description }} />}
              />
              <div style={styles.postBody}>
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
                <div style={styles.postBodyFooter}>
                  {item.author && item.author.split(',').map((a) => <Tag key={a} color="purple">{a}</Tag>)}
                </div>
              </div>
            </List.Item>
          )}
        >
          <br />
          {loading && hasMore && (
            <div className="loading-container">
              <Spin />
            </div>
          )}
        </List>
      </InfiniteScroll>
    </div>
  );
}

export default RemotePostList;
