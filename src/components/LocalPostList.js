import React, { useEffect, useState } from 'react';
import {
  List, Spin, Space, Typography, Button, Tag, message, Row, Col,
} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import LocalPostForm from './LocalPostForm';
import './Posts.css';

const { Title } = Typography;

const styles = {
  subheader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  postBody: {
    display: 'flex',
    flexDirection: 'column',
  },
  postBodyFooter: {
    paddingTop: 10,
  },
};

// eslint-disable-next-line react/prop-types
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

function RemotePostList() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState();
  const [loading, setLoading] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getPosts = async () => {
    const rsp = localStorage.getItem('posts');
    const postsList = JSON.parse(rsp) || {};
    setPosts(postsList.data ? postsList.data.articles : []);
    setLoading(false);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const editPost = (post) => {
    setSelectedPost(post);
    setIsModalVisible(true);
  };

  const deletePost = (post) => {
    const rsp = localStorage.getItem('posts');
    const oldList = JSON.parse(rsp) || {};
    const newData = oldList.data.articles.filter((p) => p.title !== post.title);
    const newList = {
      data: {
        articles: newData,
        totalResults: newData.length,
      },
    };
    localStorage.setItem('posts', JSON.stringify(newList));
    message.success('Post deleted');
    getPosts();
  };

  return (
    <div className="infinite-container">
      <Row justify="space-between">
        <Col>
          <Title level={3}>Local people talking about watches</Title>
        </Col>
        <Col>
          <Button type="primary" onClick={() => setIsModalVisible(true)}>Create new post!</Button>
        </Col>
      </Row>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={posts}
        renderItem={(item, index) => (
          <List.Item
            key={index}
            actions={[
              <Button type="link" onClick={() => editPost(item)}>
                <IconText icon={EditOutlined} text="Edit" key="list-vertical-star-o" />
              </Button>,
              <Button type="link" onClick={() => deletePost(item)}>
                <IconText icon={DeleteOutlined} text="Delete" key="list-vertical-like-o" />
              </Button>,
            ]}
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
              description={item.description}
            />
            <div style={styles.postBody}>
              <ReactMarkdown plugins={[gfm]}>{item.content}</ReactMarkdown>
              <div style={styles.postBodyFooter}>
                {item.author && item.author.split(',').map((a) => <Tag key={a} color="purple">{a}</Tag>)}
              </div>
            </div>
          </List.Item>
        )}
      >
        <br />
        {loading && (
          <div className="loading-container">
            <Spin />
          </div>
        )}
      </List>
      <LocalPostForm
        visible={isModalVisible}
        setVisible={setIsModalVisible}
        post={selectedPost}
        setPost={setSelectedPost}
        refreshPosts={getPosts}
      />
    </div>
  );
}

export default RemotePostList;
