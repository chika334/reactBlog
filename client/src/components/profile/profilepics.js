import React, { Component } from 'react'
import {Card, ListGroup} from 'react-bootstrap';
import '../../css/sideProfile.scss'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export class profilepics extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    update: PropTypes.object.isRequired,
    // loadImage: PropTypes.func.isRequired
  }
  render() {
    return (
      <div className="new">
        <Card className="profileImage" style={{ width: '10rem' }}>
          <Card.Body>
            <img width="90" src={this.props.update == undefined ? '' : `http://localhost:8000/${this.props.update.profileImage}`} alt="profiles pic" />
          </Card.Body>
        </Card>

        <Card className="news" style={{ width: '68rem' }}>
          <div className="new">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Link to="/profile/updateuser">Update Profile</Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link to="/profile/createcategories">Create categories</Link>
            </ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          </ListGroup>

          <ListGroup variant="flush">
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          </ListGroup>
          </div>
        </Card>
      </div>
    )
  }
}

const mapStatetoProps = state => ({
  auth: state.auth,
  update: state.update
})

export default connect(mapStatetoProps)(profilepics)
