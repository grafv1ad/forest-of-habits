import { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import { toast } from "react-toastify";
import Button from "components/Button";
import FormWrapper from "components/FormWrapper";
import Input from "components/Input";
import Modal from "components/Modal";
import PageLayout from "components/PageLayout";
import Title from "components/Title";
import WoodsList from "components/WoodsList";
import { useAppDispatch } from "store";
import { addWood, getWoods } from "store/slices/woods";
import { FormValues, FormErrors } from "types";
import { axiosInstance } from "utils/api";

const Woods = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getWoods());
  }, [dispatch]);

  const onHangleModal = () => setOpen(!open);

  const onSubmit = (value: FormValues) => {
    console.debug(value);
    axiosInstance
      .post("/forest", value)
      .then((response) => {
        console.debug(response.data);
        dispatch(addWood(response.data));
        toast.success("Лес добавлен");
        onHangleModal();
      })
      .catch((error) => {
        console.error(error);
        toast.error(error?.response?.data?.message || "Что-то пошло не так");
      });
  };

  const validate = (value: FormValues) => {
    const errors: FormErrors = {};
    if (!value.name) {
      errors.name = "Введите название леса";
    }
    return errors;
  };

  return (
    <PageLayout>
      <Title level="1" color="light">
        Мои леса
      </Title>
      <div className="mb-12 flex justify-end">
        <Button onClick={onHangleModal}>+ Добавить новый лес</Button>
      </div>
      <WoodsList />
      <Modal open={open} onHangleModal={onHangleModal} title="Новый лес">
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit, submitting, validating }) => (
            <form onSubmit={handleSubmit}>
              <FormWrapper>
                <Field
                  name="name"
                  type="text"
                  render={({ input, meta }) => (
                    <Input
                      placeholder="Название"
                      autocomplete="name"
                      {...input}
                      {...meta}
                    />
                  )}
                />

                <Button type="submit" disabled={submitting || validating}>
                  Создать
                </Button>
              </FormWrapper>
            </form>
          )}
        />
      </Modal>
    </PageLayout>
  );
};

export default Woods;
