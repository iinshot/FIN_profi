import { Link } from 'react-router-dom';
import './Navigation.css'
import { useAuth } from '../hooks';
import { AUTH } from '../constants';
import Logo from "../assets/logo.svg?react"
import NavigationButton from './NavigationButton';
import { Calc, Home, Login, Profile, Quiz } from '../assets/icons';

export default function NavigationBar() {
  const [auth, setAuth] = useAuth()

  return (
    <div className="navbar-container">
      <div className="navbar">
        <Logo />

        <div className="divider"></div>

        <nav>
          <div className="nav-button-group">
            <NavigationButton
              to=""
              icon={<Home />}
              text="Главная"
            />

            <NavigationButton
              to="calculators"
              icon={<Calc />}
              text="Калькуляторы"
            />

            <NavigationButton
              to="quizes"
              icon={<Quiz />}
              text="Викторины"
            />
          </div>

          {auth === AUTH.GUEST ?
            <NavigationButton
              to="login"
              icon={<Login />}
              text="Войти"
              style={{ justifySelf: "end" }}
            /> :
            <NavigationButton
              to="profile"
              icon={<Profile />}
              text="Профиль"
            />
          }
        </nav>
      </div>
    </div>
  );
}