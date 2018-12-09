import React, { Component } from 'react';
import api from '../../api';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: null,
      fileUrl: "",
      modal: false

    }
    this.toggle = this.toggle.bind(this);

  }
  handleChange(e) {
    console.log('handleChange');
    console.log('DEBUG e.target.files[0]', e.target.files[0]);
    this.setState({
      file: e.target.files[0]
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    api.addPicture(this.state.file)
  }

  handleClick = () => {
    let id = JSON.parse(localStorage.getItem("user"))._id;
    // console.log(id)
    api.getUser(id)
    .then(user => {
      console.log(user.user.pictureUrl)
      this.setState({fileUrl: user.user.pictureUrl})
    })

  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }


  render() {                
    return (
      <div className="Home">
    {console.log(this.state.fileUrl)}

        <h2>Home</h2>
        <p>This is a sample project with the MERN stack</p>
        <Button color="danger" >Test</Button>
        
        <form onSubmit={(e)=>this.handleSubmit(e)}>
          <input type="file" onChange={(e)=>this.handleChange(e)} /> <br/>
          <button type="submit">Save new profile picture</button>
        </form>

        <button onClick={(this.handleClick)} >GIMME</button>
 <   img src={this.state.fileUrl} style={{height: "200px"}}/>


<div>
  <Button color="danger" onClick={this.toggle}>Text</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        </div>


      </div>
    );
  }
}

export default Home;