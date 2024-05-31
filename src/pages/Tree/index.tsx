import { useState, useEffect } from "react";
import { Field, Form } from "react-final-form";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "components/Button";
import FormWrapper from "components/FormWrapper";
import Input from "components/Input";
import Loader from "components/Loader";
import Modal from "components/Modal";
import PageLayout from "components/PageLayout";
import Title from "components/Title";
import { FormErrors, FormValues, ITree } from "types";
import { axiosInstance } from "utils/api";
import { getMonthName } from "utils/date";

const Tree = () => {
  const navigate = useNavigate();

  const { forestid, treeid } = useParams();

  const [tree, setTree] = useState<ITree | null>(null);

  const [editModalOpened, setEditModalOpened] = useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);

  const getTree = async () => {
    try {
      const { data } = await axiosInstance.get(`tree/${treeid}`);
      setTree(data);
    } catch (error: any) {
      console.error(error?.response);
      if (error?.response?.status === 401) {
        navigate("/login");
      } else {
        navigate("/404");
      }
    }
  };

  useEffect(() => {
    if (!tree) {
      getTree();
    }
  }, [tree]);

  if (!tree) {
    return <Loader fullPage={true} />;
  }

  const createdDate = new Date(tree.createdAt);

  interface ITreePeriods {
    [key: string]: string;
  }

  interface ITreeTypes {
    [key: string]: string;
  }

  const treePeriods: ITreePeriods = {
    DAY: "Каждый день",
    WEEK: "Каждую неделю",
    MONTH: "Каждый месяц",
    QUARTER: "Каждый квартал",
    YEAR: "Каждый год",
  };

  const treeTypes: ITreeTypes = {
    LIMITED_TREE: "Лимитированное",
    PERIODIC_TREE: "Периодическое",
    UNLIMITED_TREE: "Безлимитное",
    BOOLEAN_TREE: "Булевое",
  };

  const cellCalsses = "border border-gray py-2 px-4";

  const validateEditForm = (values: FormValues) => {
    console.debug(values);

    const errors: FormErrors = {};
    if (!values.name) {
      errors.name = "Введите название дерева";
    }
    if (tree.type === "LIMITED_TREE") {
      if (!values.limit) {
        errors.limit = "Укажите лимит";
      } else if (isNaN(+values.limit) || +values.limit % 1 !== 0) {
        errors.limit = "Лимит должен быть целым числом";
      } else if (+values.limit < 1) {
        errors.limit = "Лимит должен быть больше нуля";
      }
    }
    return errors;
  };

  const submitEditForm = (values: FormValues) => {
    interface IRequest {
      name: string;
      description?: string;
      limit?: number;
    }

    const request: IRequest = {
      name: values.name as string,
      description: (values.description as string) || "",
    };

    if (tree.type === "LIMITED_TREE") {
      request.limit = +values.limit;
    }

    axiosInstance
      .patch(`/tree/${tree.id}`, request)
      .then((response) => {
        console.debug(response.data);
        setTree(response.data);
        toast.success("Дерево успешно изменено");
      })
      .catch((error) => {
        console.error(error?.response);
        toast.error(error?.response?.data?.message || "Что-то пошло не так");
      });
    setEditModalOpened(false);
  };

  const deleteTree = () => {
    axiosInstance
      .delete(`/tree/${tree.id}`)
      .then((response) => {
        console.debug(response.data);
        toast.success(`Дерево «${tree.name}» успешно удалено`);
        navigate(`/forest/${forestid}`);
      })
      .catch((error) => {
        console.error(error?.response);
        toast.error(error?.response?.data?.message || "Что-то пошло не так");
      });
    setDeleteModalOpened(false);
  };

  return (
    <PageLayout>
      <Title level="1" color="light" extraClass="!mb-7">
        {tree.name}
      </Title>

      <Title level="3" color="light" extraClass="empty:hidden">
        {tree.description}
      </Title>

      <div className="flex justify-center gap-6">
        <div
          className="text-main cursor-pointer hover:underline"
          onClick={() => setEditModalOpened(true)}
        >
          Изменить дерево
        </div>
        <div
          className="text-red cursor-pointer hover:underline"
          onClick={() => setDeleteModalOpened(true)}
        >
          Удалить дерево
        </div>
      </div>

      <div className="my-6 flex justify-center">
        <table className="table-fixed w-full md:w-3/4">
          <tbody>
            <tr>
              <td className={cellCalsses}>Дата создания</td>
              <td className={cellCalsses}>{`${createdDate.getDate()} ${
                getMonthName(createdDate.getMonth())[2]
              } ${createdDate.getFullYear()}`}</td>
            </tr>
            <tr>
              <td className={cellCalsses}>Тип дерева</td>
              <td className={cellCalsses}>{treeTypes[tree.type] || "–"}</td>
            </tr>
            {tree.type === "PERIODIC_TREE" && (
              <tr>
                <td className={cellCalsses}>Период</td>
                <td className={cellCalsses}>
                  {treePeriods[tree.period] || "–"}
                </td>
              </tr>
            )}
            {tree.type === "LIMITED_TREE" && (
              <tr>
                <td className={cellCalsses}>Лимит</td>
                <td className={cellCalsses}>{tree.limit || "–"}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal
        open={editModalOpened}
        onHangleModal={() => setEditModalOpened(false)}
        title="Изменить дерево"
      >
        <Form
          onSubmit={submitEditForm}
          validate={validateEditForm}
          render={({ handleSubmit, submitting, validating }) => (
            <form onSubmit={handleSubmit}>
              <FormWrapper>
                <Field
                  name="name"
                  type="text"
                  initialValue={tree.name}
                  render={({ input, meta }) => (
                    <Input
                      placeholder="Название"
                      label="Название"
                      autocomplete="name"
                      {...input}
                      {...meta}
                    />
                  )}
                />

                <Field
                  name="description"
                  type="text"
                  initialValue={tree.description}
                  render={({ input, meta }) => (
                    <Input
                      placeholder="Краткое описание"
                      label="Краткое описание"
                      {...input}
                      {...meta}
                    />
                  )}
                />

                {tree.type === "LIMITED_TREE" && (
                  <Field
                    name="limit"
                    type="number"
                    initialValue={tree.limit}
                    render={({ input, meta }) => (
                      <Input
                        placeholder="Лимит"
                        label="Лимит"
                        {...input}
                        {...meta}
                      />
                    )}
                  />
                )}

                <Button type="submit" disabled={submitting || validating}>
                  Сохранить
                </Button>
              </FormWrapper>
            </form>
          )}
        />
      </Modal>

      <Modal
        open={deleteModalOpened}
        onHangleModal={() => setDeleteModalOpened(false)}
        title={`Удалить дерево «${tree.name}» ?`}
      >
        <div className="flex justify-center gap-5">
          <Button
            onClick={() => setDeleteModalOpened(false)}
            extraClass="w-1/4"
          >
            Отмена
          </Button>
          <Button onClick={deleteTree} style="danger" extraClass="w-1/4">
            Удалить
          </Button>
        </div>
      </Modal>
    </PageLayout>
  );
};

export default Tree;
