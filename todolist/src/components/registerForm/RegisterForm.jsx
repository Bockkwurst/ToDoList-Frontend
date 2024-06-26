import {useState, useEffect} from "react";
import './registerform.css'
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import DefaultButton from "../../components/defaultButton/DefaultButton.jsx";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import AuthProvider, {useAuth} from "../../utils/AuthProvider.jsx";
import Debounce from "../../utils/Debounce.js";

const RegisterForm = ({darkMode}) => {

    const registerPageContainerClass = darkMode ? "register-page-container dark-mode" : "register-page-container light-mode";
    const logoSrc = darkMode ? "/images/logo-hoch-weiss.png" : "/images/logo-hoch-dunkel.png";

    const [username, setUsername] = useState('');
    //const [usernameDebounced, setUsernameDebounced] = Debounce(username, 500);
    const [email, setEmail] = useState('');
    //const [emailDebounced, setEmailDebounced] = Debounce(email, 500);
    const [password, setPassword] = useState('');
    //const [passwordDebounced, setPasswordDebounced] = Debounce(password, 500);
    const [passwordRepeat, setPasswordRepeat] = useState('');
    //const [passwordRepeatDebounced, setPasswordRepeatDebounced] = Debounce(passwordRepeat, 500);
    const [error, setError] = useState('');
    const [usernameInputMade] = useState(false);
    //const [usernameInputMadeDebounced, setUsernameInputMadeDebounced] = Debounce(usernameInputMade, 500);
    const [emailInputMade] = useState(false);
    //const [emailInputMadeDebounced, setEmailInputMadeDebounced] = Debounce(emailInputMade, 500);
    const [passwordInputMade] = useState(false);
    //const [passwordInputMadeDebounced, setPasswordInputMadeDebounced] = Debounce(passwordInputMade, 500);
    const [passwordRepeatInputMade] = useState(false);
    //const [passwordRepeatInputMadeDebounced, setPasswordRepeatInputMadeDebounced] = Debounce(passwordRepeatInputMade, 500);
    const [usernameTaken, setUsernameTaken] = useState(false);
    const [emailTaken, setEmailTaken] = useState(false);
    const [doPasswordsMatch, setDoPasswordsMatch] = useState(true);
    const [isPasswordsValid, setIsPasswordsValid] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
    const [successMessageColor, setSuccessMessageColor] = useState('');
    const [generatedPassword, setGeneratedPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    /*useEffect(() => {
        if (username) {
            checkUsername();
        }
    }, [usernameDebounced]);

    useEffect(() => {
        if (email) {
            checkEmail();
        }
    }, [emailDebounced]);

    useEffect(() => {
        if (password && passwordRepeat) {
            checkPassword(password, passwordRepeat);
        }
    }, [passwordDebounced, passwordRepeatDebounced]);

    useEffect(() => {
        if (username) {
            setUsernameInputMadeDebounced(true);
            checkUsername();
        }
    }, [usernameDebounced]);

    useEffect(() => {
        if (email) {
            setEmailInputMadeDebounced(true);
            checkEmail();
        }
    }, [emailDebounced]);

    useEffect(() => {
        if (password && passwordRepeat) {
            checkPassword(password, passwordRepeat);
        }
    }, [passwordDebounced, passwordRepeatDebounced]);*/

    const generatePassword = () => {
        event.preventDefault();
        const length = 10;
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let retVal = "";
        for (let i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        setPassword(retVal);
        setPasswordRepeat(retVal);
        setGeneratedPassword(`${retVal}`)
    }

    /*const checkUsername = debounce(async () => {
        try {
            const response = await axios.get(`http://localhost:3000/user/username/${username}`);
            setUsernameTaken(response.data.taken);
            console.log('isUsernameTaken:', setIsUsernameTaken);
        } catch (error) {
            console.error('Check username error:', error);
        }
    }, 500);

    const checkEmail = debounce(async () => {
        try {
            const response = await axios.get(`http://localhost:3000/user/email/${email}`);
            setEmailTaken(response.data.taken);
            console.log('isEmailTaken:', setIsEmailTaken);
        } catch (error) {
            console.error('Check email error:', error);
        }
    }, 500);

    const checkPassword = ((password, passwordRepeat) => {
        if (password !== passwordRepeat) {
            setPasswordInputMadeDebounced({made: true, color: '#ff6698'});
            setPasswordRepeatInputMadeDebounced({made: true, color: '#ff6698'});
            console.log('passwords do not match');
            setDoPasswordsMatch(false);
        } else if (password.length < 8 || !/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
            setPasswordInputMadeDebounced({made: true, color: '#ff6698'});
            setPasswordRepeatInputMadeDebounced({made: true, color: '#ff6698'});
            setIsPasswordsValid(false);
        } else {
            setPasswordInputMadeDebounced({made: true, color: '#ccff99'});
            setPasswordRepeatInputMadeDebounced({made: true, color: '#ccff99'});
            setIsPasswordsValid(true);
            setDoPasswordsMatch(true);
        }
    });*/

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3030/user', {username, email, password});
            if (response.status === 201) {
                setSuccessMessage('Registrierung erfolgreich');
                setSuccessMessageColor('#ccff99');
                alert('Registrierung erfolgreich');
            } else {
                setSuccessMessage('Registrierung fehlgeschlagen');
                setSuccessMessageColor('#ff6698');
                alert('Registrierung fehlgeschlagen');
            }
            setUsername('');
            setEmail('');
            setPassword('');
            setPasswordRepeat('');
            setUsernameTaken(false);
            setEmailTaken(false);
            setDoPasswordsMatch(false);
            setIsPasswordsValid(true);
            /*setUsernameInputMadeDebounced(false);
            setEmailInputMadeDebounced(false);
            setPasswordInputMadeDebounced(false);
            setPasswordRepeatInputMadeDebounced(false);*/
        } catch (error) {
            console.error('Register error:', error);
        }
    };


    return (
        <div className={registerPageContainerClass}>
            <div className="title-container">
                <img src={logoSrc} alt="logo" className="logo-form"/>
            </div>
            <div className="form-container">
                <form>
                    <div className="form">
                        <div className="form-username">
                            <label className="label">Benutzername:</label>
                            <input type="text" placeholder="Benutzername" value={username}
                                   onChange={e => setUsername(e.target.value)} className="input"/>
                        </div>
                        <div className="form-email">
                            <label className="label">E-Mail:</label>
                            <input type="text" placeholder="E-Mail" value={email}
                                   onChange={e => setEmail(e.target.value)}
                                   className="input"/>
                        </div>
                        <div className="form-password">
                            <label className="label">Passwort:</label>
                            <input type={showPassword ? "text" : "password"} placeholder="Passwort" value={password}
                                   onChange={e => setPassword(e.target.value)} className="input"/>

                        </div>
                        <div className="form-password-repeat">
                            <label className="label">Passwort wiederholen:</label>
                            <div className="password-input">
                                <input type={showPassword ? "text" : "password"} placeholder="Passwort wiederholen"
                                       value={passwordRepeat}
                                       onChange={e => setPasswordRepeat(e.target.value)} className="input"/>
                                <button type="button" onClick={toggleShowPassword}>
                                    {showPassword ? <FaEye/> : <FaEyeSlash/>}
                                </button>
                            </div>
                        </div>
                        <div className="form-buttons">
                            <DefaultButton buttonText="Registrieren" onClick={handleRegister}/>
                            <DefaultButton buttonText="Passwort generieren" onClick={generatePassword}/>
                        </div>
                        <div className="form-messages">
                            <label className="generated">{generatedPassword}</label>
                            <label className="error">{error}</label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterForm;