import React from 'react'

const Signup = () => {
    return (
        <div>
            <form>
                <p>
                    <button>User</button>
                    <button>Pro</button>
                </p>
                <p>
                    <input placeholder="E-mail"></input>
                </p>
                <p><input placeholder="Number"></input></p>
                <p><input placeholder="Password"></input></p>

                <p>
                    <button>Signup</button>
                    <br></br>
                    Already have an account?
                    <a href='/signin'>Sign in</a>
                    <br>
                    </br>
                    icons
                </p>
            </form>
        </div>
    )
}

export default Signup