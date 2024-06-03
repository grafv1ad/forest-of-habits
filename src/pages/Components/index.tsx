import { toast } from "react-toastify";
import Button from "components/Button";
import Checkbox from "components/Checkbox";
import FormWrapper from "components/FormWrapper";
import Input from "components/Input";
import Link from "components/Link";
import PageLayout from "components/PageLayout";
import Paragraph from "components/Paragraph";
import Textarea from "components/Textarea";
import Title from "components/Title";

const Components = () => {
  return (
    <PageLayout breadcrumbs={[{ name: "Компоненты" }]}>
      <div className="flex flex-col">
        <Title level="1" color="light">
          Компоненты
        </Title>

        <div className="py-5">
          <Title level="2" color="light">
            Заголовки
          </Title>

          <Title level="1" color="light" align="left">
            Заголовок h1
          </Title>
          <Title level="2" color="light" align="left">
            Заголовок h2
          </Title>
          <Title level="3" color="light" align="left">
            Заголовок h3
          </Title>
          <Title level="4" color="light" align="left">
            Заголовок h4
          </Title>
          <Title level="5" color="light" align="left">
            Заголовок h5
          </Title>
          <Title level="6" color="light" align="left">
            Заголовок h6
          </Title>
        </div>

        <div className="py-5">
          <Title level="2" color="light">
            Элементы форм
          </Title>

          <FormWrapper>
            <Input name="test-input" placeholder="Красивый инпут"></Input>
            <Input
              name="test-input"
              label="Красивый инпут с лейблом"
              placeholder="Очень красивый"
            ></Input>
            <Input
              name="test-input"
              placeholder="Красивый инпут с ошибкой"
              touched
              error="Что-то пошло не так"
            ></Input>
            <Input
              name="test-input"
              placeholder="Выключенный красивый инпут"
              disabled
            ></Input>
            <Textarea
              name="test-textarea"
              placeholder="Симпатичная область текста"
              touched
            ></Textarea>
            <Checkbox name="test-checkbox">Модный чекбокс</Checkbox>
            <Checkbox name="test-checkbox" touched error="Что-то пошло не так">
              Модный чекбокс с ошибкой
            </Checkbox>
            <Checkbox name="test-checkbox" disabled>
              Выключенный модный чекбокс
            </Checkbox>
            <Button type="submit">Cтильная кнопка</Button>
            <Button type="submit" disabled>
              Выключенная стильная кнопка
            </Button>
            <Button type="submit" style="outline">
              Cтильная кнопка без заливки
            </Button>
            <Button type="submit" style="danger">
              Опасная кнопка
            </Button>
            <Button type="submit" style="success">
              Не опасная кнопка
            </Button>
          </FormWrapper>
        </div>

        <div className="py-5">
          <Title level="2" color="light">
            Текст
          </Title>

          <Paragraph color="light">
            Разнообразный и богатый опыт говорит нам, что сложившаяся структура
            организации обеспечивает актуальность{" "}
            <Link href="#">глубокомысленных рассуждений</Link>! Безусловно
            разбавленное изрядной долей эмпатии, рациональное мышление позволяет{" "}
            <Link href="#">выполнить важные задания</Link> по своевременного
            выполнения сверхзадачи. Следует отметить, что перспективное
            планирование играет определяющее значение для первоочередных
            требований.
          </Paragraph>
        </div>

        <div className="py-5">
          <Title level="2" color="light">
            Тосты
          </Title>

          <div className="flex justify-center gap-5">
            <Button onClick={() => toast.info("Info")} style="default">
              Info
            </Button>
            <Button onClick={() => toast.warning("Warning")} style="outline">
              Warning
            </Button>
            <Button onClick={() => toast.error("Error")} style="danger">
              Error
            </Button>
            <Button onClick={() => toast.success("Success")} style="success">
              Success
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Components;
