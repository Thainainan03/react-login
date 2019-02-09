import React, { Component } from 'react'
import './Login.css'
import request from 'request'

export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: null,
            password: null,
            error_label: null,
            loading: false
        }
    }

    handdleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        this.setState({
            [name]: value
        })
        console.log(this.state);
    }

    handdleClick = (event) => {
        event.preventDefault();
        this.setState({
            error_label: null,
            loading: true
        })

        request.post({
            url:     'https://react-login-test.herokuapp.com/api/login',
            form:    { 
                email: this.state.email,
                password: this.state.password
            }
            }, (error, response, body) => {
                if(response.statusCode === 200) {
                    alert('Login Successed')
                    this.setState({
                        loading: false
                    })
                }else {
                    this.setState({ 
                        error_label: "Email or password is incorrect",
                        loading: false
                    })
                }
        });

    }

    render() {
        return (
            <React.Fragment>
                <div className="container-fuild">
                    <div className="row justify-content-center">
                        <div className="col-4">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={this.handdleClick}>
                                        <div className="text-center mb-5">
                                            <img className={this.state.loading ? "logo logo-spin" : "logo"} src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" />
                                        </div>
                                        <div className="form-group">
                                            <label>Email address</label>
                                            <input type="email" className="form-control custom-input" name="email" aria-describedby="emailHelp" placeholder="example@zerojame.com" onChange={this.handdleChange}/>
                                        </div>
                                        <div className="form-group">
                                            <label>Password</label>
                                            <input type="password" className="form-control custom-input" name="password" placeholder="Your password..." onChange={this.handdleChange}/>
                                        </div>
                                        <div className="form-group">
                                            <span className="text-red">{this.state.error_label}</span>
                                        </div>
                                        <div className="form-group text-center">
                                            <button type="submit" className="btn btn-primary custom-button">SIGN IN</button>
                                        </div>
                                        <div className="float-left">
                                            <a href="" >Forgot password ?</a>
                                        </div>
                                        <div className="float-right">
                                            <a href="" >Create a new account</a>
                                        </div>
                                    </form>   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    
}
export default Login