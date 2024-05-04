import { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "components/Button";
import FormWrapper from "components/FormWrapper";
import Input from "components/Input";
import Modal from "components/Modal";
import PageLayout from "components/PageLayout";
import Title from "components/Title";
import { IForest, ITree, FormValues, FormErrors } from "types";
import { axiosInstance } from "utils/api";

import TreeItem from "./TreeItem";

const Forest = () => {
  const navigate = useNavigate();

  const [forest, setForest] = useState<IForest | null>(null);
  const [trees, setTrees] = useState<ITree[] | null>(null);

  const { forestid } = useParams();

  useEffect(() => {
    const getForest = async () => {
      try {
        const { data } = await axiosInstance.get(`forest/${forestid}`);
        setForest(data);
      } catch (error: any) {
        console.error(error?.response);
        if (error?.response?.status === 401) {
          navigate("/login");
        } else {
          navigate("/404");
        }
      }
    };

    if (!forest) {
      getForest();
    }

    const getForestTrees = async () => {
      try {
        const { data } = await axiosInstance.get(`tree/by_forest/${forestid}`);
        setTrees(data);
      } catch (error: any) {
        console.error(error?.response);
        if (error?.response?.status === 401) {
          navigate("/login");
        } else {
          navigate("/404");
        }
      }
    };

    if (!trees) {
      getForestTrees();
    }
  }, []);

  let treesList;
  if (trees && forest) {
    treesList = trees.map((tree, index) => (
      <TreeItem key={index} treeId={tree.id} forestId={forest.id} />
    ));
  }

  const [open, setOpen] = useState(false);

  const onHangleModal = () => setOpen(!open);

  const onSubmit = (values: FormValues) => {
    console.debug(values);
    axiosInstance
      .post("/forest", values)
      .then((response) => {
        console.debug(response.data);
        toast.success("Дерево добавлено");
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
      errors.name = "Введите название дерева";
    }
    return errors;
  };

  return (
    <PageLayout>
      {forest && trees ? (
        <>
          <Title level="1" color="light">
            {forest.name}
          </Title>
          <div className="mb-12 flex justify-end">
            <Button onClick={onHangleModal}>+ Добавить новое дерево</Button>
          </div>
          {treesList}

          <Modal open={open} onHangleModal={onHangleModal} title="Новое дерево">
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

                    <Field
                      name="forest_id"
                      value={forest.id}
                      render={({ input, meta }) => (
                        <Input
                          {...input}
                          {...meta}
                          value={forest.id}
                          type="hidden"
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
        </>
      ) : (
        <div>loader</div>
      )}
    </PageLayout>
  );
};

export default Forest;
