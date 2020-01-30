import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'
import './Display.css'
import Navbar from 'react-bootstrap/Navbar'
import Table from 'react-bootstrap/Table'

class Display extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: null,
      endpoint: 'https://gambit-gb-server.herokuapp.com/'
    }
  }

  componentDidMount() {
    const { endpoint } = this.state
    const socket = socketIOClient(endpoint)
    socket.on('FromData', data => this.setState({ data: data }))
  }

  render() {
    let time = ''
    let temp = []

    if (this.state.data !== null) {
      time = this.state.data[0]

      for (let i = 1; i < this.state.data.length; i++)
        temp.push(this.state.data[i])
    }

    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">{time}</Navbar.Brand>
        </Navbar>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Number</th>
              <th>Register</th>
            </tr>
          </thead>
          <tbody>
            {temp !== null ? (
              temp.map((key, index) => {
                return (
                  <tr key={key}>
                    <td>{key.substr(0, key.indexOf(':'))}</td>
                    <td>{key.substr(key.indexOf(':') + 1)}</td>
                  </tr>
                )
              })
            ) : (
              <p>No data</p>
            )}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default Display
