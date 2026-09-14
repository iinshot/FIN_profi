import { Link } from 'react-router'

export function Warning() {
  return (
    <div className="warning">
      <div className="body">Прохождение викторин доступно только авторизованным пользователям.</div>
      <div className="body">
        Пожалуйста, <Link to='/login'>войдите</Link> или <Link to='/register'>зарегистрируйтесь</Link>
      </div>
    </div>
  )
}