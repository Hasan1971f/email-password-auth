import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { auth } from "../../firebase.init";
import { useState } from "react";
import { FaEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";


const SignUp = () => {
    const [success, setSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleSignUp = e => {
        e.preventDefault()

        const email = e.target.email.value
        const password = e.target.password.value
        const name = e.target.name.value
        const photo = e.target.photo.value
        const terms = e.target.terms.checked
        console.log(email, password, name, photo, terms)

        //  reset error and status

        setErrorMessage('')

        if (!terms) {
            setErrorMessage('Please acceept our terms and conditions')
            return
        }


        if (password.length < 6) {
            setErrorMessage('Password should be 6 cahracters or long')
            return
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if (!passwordRegex.test(password)) {
            setErrorMessage('At least one uppercase, one lowercase, one number, one specialcharacter')
            return
        }


        //    create user with email and password
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                setSuccess(true)

                // send varificastion email address 
                 sendEmailVerification(auth.currentUser)
                 .then(() =>{
                    console.log('Email varification sent')
                 })

                //  Update profile name and photoUrl
               const profile ={
                displayName: name, 
                photoURL: photo
               }
               updateProfile(auth.currentUser, profile)
               .then(() => {
                console.log('user profile update')
               })
               .catch(error =>{
                console.log('User profile update error')
               })


            })
            .catch(error => {
                console.log("ERROR", error.message)
                setErrorMessage(error.message)
                setSuccess(false)


            })
    }


    return (
        <div className="card bg-base-100 w-full max-w-sm  mx-auto shrink-0 shadow-2xl">
            <h3 className="text-3xl font-bold">Sign Up now!</h3>
            <form onSubmit={handleSignUp} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" name="name" placeholder="name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Photo URL</span>
                    </label>
                    <input type="text" name="photo" placeholder="photoURL" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control relative">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="password"
                        className="input input-bordered" required />
                    <button onClick={() => setShowPassword(!showPassword)} className="btn btn-xs absolute right-4 top-12">
                        {
                            showPassword ? <FaRegEyeSlash></FaRegEyeSlash> : <FaEye></FaEye>
                        }
                    </button>
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label justify-start cursor-pointer">
                    <input type="checkbox" name="terms" className="checkbox" />
                        <span className="label-text ml-2">Accept our terms and conditions</span>
                        
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Sign Up</button>
                </div>
            </form>
            {
                errorMessage && <p className="text-sky-400">{errorMessage}</p>
            }
            {
                success && <p className="text-green-600">Signup is successfully</p>
            }
            <p className="m-2">Already have an Account? <Link  to="/login">Login</Link></p>
        </div>

    );
};

export default SignUp;