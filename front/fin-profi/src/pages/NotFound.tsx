import { ArrowLeft, Map } from '@/assets/icons'
import { Button, Content, Section } from '@/ui'
import { useNavigate } from 'react-router'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <Content>
      <Section
        className="not-found"
        grow
      >
        <span>
          <div className="map-icon">
            <Map width={62} height={62} />
          </div>

          404
        </span>

        <h1>Упс! Страница не найдена</h1>

        <div className="body">Похоже, вы забрели не туда. Но не волнуйтесь, мы поможем вам вернуться на правильный путь.</div>

        <Button
          text="Вернуться назад"
          left={<ArrowLeft width={9} height={9} />}
          onClick={() => navigate(-1)}
          primary
        />
      </Section>
    </Content>
  )
}
