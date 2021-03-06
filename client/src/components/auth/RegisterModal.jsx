import React, { Component } from 'react'
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, NavLink } from "reactstrap";
import { connect } from 'react-redux'
import { register } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'
import PropTypes from 'prop-types'

class RegisterModal extends Component {
  state = {
    modal: false,
    name: '',
    email: '',
    password: '',
    msg: ''
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object
  } 

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props

    if (error !== prevProps.error) {
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg.msg })
      } else {
        this.setState({ msg: null })
      }
    }

    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle()
      }
    }
  }

  toggle = () => {
    this.props.clearErrors()
    this.setState({
      modal: !this.state.modal
    })
  }

  onSubmit = (e) => {
    e.preventDefault()

    const { name, email, password } = this.state

    const newUser = {
      name,
      email,
      password
    }

    this.props.register(newUser)

    this.toggle()
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <NavLink          
          onClick={this.toggle}
          href="#"
        >
          Register
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Register
          </ModalHeader>
          <ModalBody>
            { this.state.msg && <Alert color="danger">{ this.state.msg }</Alert> }
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input 
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  className='mb-3'
                  onChange={this.onChange}
                /> 

                <Label for="email">Email</Label>
                <Input 
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className='mb-3'
                  onChange={this.onChange}
                /> 

                <Label for="name">Password</Label>
                <Input 
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className='mb-3'
                  onChange={this.onChange}
                /> 
                <Button color="dark" style={{marginTop: '2rem'}} block>Register</Button>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>

          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})


export default connect(mapStateToProps, { register, clearErrors })(RegisterModal)