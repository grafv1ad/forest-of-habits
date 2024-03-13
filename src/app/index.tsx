import Button from "../components/button/index.tsx";
import Checkbox from "../components/checkbox/checkbox.tsx";
import Link from "../components/link/link.tsx";
import Logo from "../components/logo/logo.tsx";
import Paragraph from "../components/paragraph/index.tsx";
import Title from "../components/title/index.tsx";
import "./index.css";

function App() {
  return (
    <div className="app" style={{ height: 500 }}>
      <header className="pt-3 pb-3">
        <Button type="submit">Зарегистрироваться</Button>
        <Title level="2">Регистрация</Title>
        <div className="mb-5">
          <Paragraph color="light">Уже зарегистрированы?</Paragraph>
        </div>
        <div className="mb-5">
          <Logo />
        </div>
        <div className="mb-5">
          <Link url="/">Войти</Link>
        </div>
        <Checkbox>
          <Paragraph color="dark">
            Согласен на обработку <Link url="/">чего-нибудь</Link>
          </Paragraph>
        </Checkbox>
      </header>
    </div>
  );
}

export default App;
