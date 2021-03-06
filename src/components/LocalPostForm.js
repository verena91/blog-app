/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  Modal, Form, Input, Button, Select, message, Alert,
} from 'antd';

const { TextArea } = Input;

const styles = {
  actions: {
    width: '50%',
    marginRight: '20%',
    marginLeft: '20%',
    display: 'flex',
    justifyContent: 'space-evenly',
  },
};

const urlPattern = new RegExp('^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?');

function LocalPostForm({
  visible, setVisible, post, setPost, refreshPosts,
}) {
  const [title, setTitle] = useState('New Post');
  const [form] = Form.useForm();

  useEffect(() => {
    if (post) {
      setTitle('Edit Post');
      form.setFieldsValue(post);
    }
  });

  const savePost = (values) => {
    const newPost = {
      source: {
        id: null,
        name: values.source,
      },
      ...values,
    };
    const rsp = localStorage.getItem('posts');
    let postsList = JSON.parse(rsp) || {};
    if (postsList.data) {
      postsList.data.articles.push(newPost);
      postsList.data.totalResults += 1;
    } else {
      postsList = {
        data: {
          articles: [newPost],
          totalResults: 1,
        },
      };
    }
    localStorage.setItem('posts', JSON.stringify(postsList));
    message.success('Post created');
    refreshPosts();
  };

  const editPost = (values) => {
    const rsp = localStorage.getItem('posts');
    const oldList = JSON.parse(rsp) || {};
    const newData = oldList.data.articles.filter((p) => p.title !== post.title);
    newData.push({ ...values });
    const newList = {
      data: {
        articles: newData,
        totalResults: newData.length,
      },
    };
    localStorage.setItem('posts', JSON.stringify(newList));
    message.success('Post modified');
    refreshPosts();
  };

  const onFinish = (values) => {
    if (post) {
      editPost(values);
      setPost(null);
    } else {
      savePost(values);
    }
    setVisible(false);
    form.resetFields();
  };

  const onFinishFailed = () => {
    message.warning('Required fields');
  };

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      footer={null}
    >
      <Form
        form={form}
        size="middle"
        layout="vertical"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ height: 500, overflow: 'auto' }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input your title!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Source"
          name="source"
          rules={[{ required: true, message: 'Please input your source!' }]}
        >
          <Select>
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2">Option 2</Select.Option>
            <Select.Option value="option3">Option 3</Select.Option>
          </Select>
        </Form.Item>

        <Alert
          style={{ margin: 5 }}
          message={(
            <div>
              For more than one author use commas (,).
              {' '}
              <br />
              {' '}
              Example: Author 1, Author 2.
            </div>
          )}
          type="info"
          showIcon
        />
        <Form.Item
          label="Author"
          name="author"
          rules={[{ required: true, message: 'Please input your author!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="URL"
          name="url"
          rules={[
            { required: true, message: 'Please input your url!' },
            { pattern: urlPattern, message: 'Please enter a valid url' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="URL Image"
          name="urlToImage"
          rules={[
            { required: true, message: 'Please input your image url!' },
            { pattern: urlPattern, message: 'Please enter a valid url' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please input your description!' }]}
        >
          <TextArea rows={2} />
        </Form.Item>

        <Alert
          style={{ margin: 5 }}
          message={(
            <div>
              Content can be plain text or
              {' '}
              <a href="https://commonmark.org/help/" target="_blank">markdown</a>
              .
            </div>
          )}
          type="info"
          showIcon
        />
        <Form.Item
          label="Content"
          name="content"
          rules={[{ required: true, message: 'Please input your content!' }]}
        >
          <TextArea rows={5} />
        </Form.Item>

        <br />

        <Form.Item>
          <div style={styles.actions}>
            <Button data-testid="close" key="back" onClick={() => setVisible(false)}>
              Return
            </Button>
            <Button key="submit" type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default LocalPostForm;
