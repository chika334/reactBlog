import React from 'react';
import { Container,Row,Col,Form ,Button} from 'react-bootstrap';
import {updateUser} from '../../_actions/updateProfile'
import {connect} from 'react-redux';
import {Avatar} from 'antd'
import user from '../../images/user.jpg';
import { UserOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import {Alert} from 'react-bootstrap';

class UserProfile extends React.Component {
    constructor(props){
        super(props);
        this.state={
            id: '',
            email: '',
            profileImage: '',
            msg: '',
            uploadedFile:null
            // user_id: this.props.auth.user._id === null ? 'bad' : this.props.auth.user
        }
    }

    static propTypes = {
        auth: PropTypes.object.isRequired,
        update: PropTypes.object.isRequired,
        // loadImage: PropTypes.func.isRequired
    }

    changeProfileImage=(event)=>{
        this.setState({uploadedFile:event.target.files[0]});
    }

    UpdateProfileHandler=(e)=>{
        e.preventDefault();
        const id = this.props.auth.user._id
        this.setState({id: id})
        const token = this.props.auth.token;
        //create object of form data
        const formData=new FormData();
        formData.append("profileImage",this.state.uploadedFile);
        formData.append("user_id",id);

        this.props.updateUser(formData)
    }

render(){
    return (
       <div className="container p-3">
    {this.state.msg ? <Alert variant="success">{this.state.msg}</Alert> : ''}
            <Container>
        <Row>
       <Col>
       {/* <Avatar size={00} icon={<UserOutlined />} src={this.props.update == undefined ? '' : `http://localhost:8000/${this.props.update.profileImage}`}  alt="profile"/> */}
       {/* <img width="100" src={this.props.auth.user == undefined ? "" : `http://localhost:8000/${this.props.auth.user.profileImage}`} alt="profiles pic" /> */}
       {/* <img width="90" src={profilePic} alt="profiles pic" /> */}
       <img width="90" src={this.props.update == undefined ? '' : `http://localhost:8000/${this.props.update.profileImage}`} alt="profiles pic" />
       </Col>
        <Col>
            <h1>User Profile</h1>
            <Form className="form">     
    {/* <p>{this.state.msg}</p> */}
  <Form.Group controlId="formCategory1">
    <Form.Label>Username</Form.Label>
    <Form.Control type="text" defaultValue={this.state.username}/>
  
  </Form.Group>
  <Form.Group controlId="formCategory2">
    <Form.Label>Email</Form.Label>
    <Form.Control type="email" defaultValue={this.state.email} />
  
  </Form.Group>
 
  <Form.Group controlId="formCategory4">
    <Form.Label>Profile Image</Form.Label>
    <Form.Control type="file" name="profileImage" onChange={this.changeProfileImage}/>
    </Form.Group>
  <Button variant="primary" onClick={this.UpdateProfileHandler}>Update Profile</Button>
  </Form>
   </Col>

       </Row>
        </Container>
       </div>
    )
}
}

// const mapStatetoProps=(state)=>{
//     return{
//         user_id:state.auth.user,
//         username:state.auth.user.name,
//         email:state.auth.email,
//         profileImage: state.auth.profileImage,
        //    msg:state.auth.msg
//     }
// }

const mapStatetoProps = state => ({
    auth: state.auth,
    update: state.update
})

export default connect(mapStatetoProps, {updateUser})(UserProfile);