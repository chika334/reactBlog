import React, { Component } from 'react'
import {connect} from 'react-redux';
// import Title from 'antd/lib/skeleton/Title'
// import { Button } from 'react-bootstrap'
import {Typography, Form, Button} from 'antd'
const { Title } = Typography

export class CreateBlog extends Component {
  state ={
    content: ''
  }

  onSubmit = e => {
    e.preventDefault()

    this.setState({content: ''})
  }
  render() {
    return (
      <div>
        <div style={{ maxWidth: '700px', margin: '2rem auto'}}>
          <div style={{ textAlign: 'center' }}>
            <Title level={2}>Editor</Title>
          </div>
          {/* <QuillEditor
            placeholder={"Start Posting Something"}
            onEditorChange={onEditorChange}
            onFilesChange={onFilesChange}
          /> */}

          <Form onSubmit={this.onSubmit}>
            <div style={{ textAlign: 'center', margin: '2rem'}}>
              <Button
                size="large"
                htmlType="submit"
                className=""
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
