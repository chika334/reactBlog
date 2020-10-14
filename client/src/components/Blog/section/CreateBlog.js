import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Typography, Form, Button} from 'antd'
import QuillEditor from './QuillEditor'
import '../../../css/createBlog.scss'
const { Title } = Typography

export class CreateBlog extends Component {
  state ={
    content: '',
    file: []
  }

  onEditorChange = (value) => {
    // setContent(value)
    this.setState({content: value})
    // console.log(this.state.content)
  }

  onFilesChange = (files) => {
    this.setState({file: files})
    // setFiles(files)
  }

  onSubmit = e => {
    e.preventDefault()

    this.setState({content: ''})
  }

  render() {
    return (
      <div>
        <div className="blogWriter" style={{ maxWidth: '500px'}}>
          <div style={{ textAlign: 'center' }}>
            <Title level={2}>Create Blog</Title>
          </div>

          <div>
            {/* <Title level={4}>Blog Title</Title> */}
            <input className="blog-title" type="text" placeholder="Enter Blog Title" />
          </div>

          <QuillEditor
            placeholder={"Start Posting Something"}
            onEditorChange={this.onEditorChange}
            onFilesChange={this.onFilesChange}
          />

          <Form onSubmit={this.onSubmit}>
            <div style={{ textAlign: 'center', margin: '2rem'}}>
              <Button
                size="large"
                htmlType="submit"
                className="btn btn-primary"
                onSubmit={this.onSubmit}
              >
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth.user
})

export default connect(mapStateToProps)(CreateBlog)
