import React from "react";

function Signup(){
    return(
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg=white p-3 rounded w-25">
                <h2>Register</h2>
                <form>
                <div className="mb-3">
                    <label htmlFor="email" >
                        <strong>Name</strong>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Name"
                      autoComplete="off"
                      name="Name"
                      className="form-control rounded-10"
                    />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" >
                            <strong>Email</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-10"
                        />
                        </div>  
                        <div className="mb-3">
                            <label htmlFor="email">
                                <strong>pincode</strong>
                            </label>
                            <input
                                type="number"
                                placeholder="Enter pincode"
                                autoComplete="off"
                                name="pincode"
                                className="form-control rounded-10"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email">
                                <strong>password</strong>
                            </label>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                name = "password"
                                className="form-control rounded-10"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email">
                                <strong>Confirm Password</strong>
                            </label>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                name = "confirm_password"
                                className="form-control rounded-10"
                            />
                        </div>
                        <button type="submit" className="btn btn-success w-100 rounded-10">
                            Register
                        </button>
                        <p><center>Already Have an Account??</center></p>
                        <button className = "btn btn-default border w-100 bg-light rounded-10 text-decoration-none">
                            Login
                        </button>
                </form>
            </div>
        </div>

    );
}
export default Signup;
