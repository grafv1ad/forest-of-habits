import { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Field, Form } from "react-final-form";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "components/Button";
import FormWrapper from "components/FormWrapper";
import Input from "components/Input";
import Loader from "components/Loader";
import Modal from "components/Modal";
import PageLayout from "components/PageLayout";
import Textarea from "components/Textarea";
import Title from "components/Title";
import TreeStatistics from "components/TreeStatistics";
import { ru } from "date-fns/locale/ru";
import NotFound from "pages/NotFound";
import {
  FormErrors,
  FormValues,
  IForest,
  ITree,
  ITreeEditRequest,
  ITreePeriods,
  ITreeTypes,
} from "types";
import { axiosInstance } from "utils/api";
import { getMonthName, getStringDate } from "utils/date";

registerLocale("ru", ru);

const Tree = () => {
  const navigate = useNavigate();

  const { forestid, treeid } = useParams();

  const [notFoundError, setNotFoundError] = useState<boolean>(false);

  const [forest, setForest] = useState<IForest | null>(null);
  const [tree, setTree] = useState<ITree | null>(null);

  const [editModalOpened, setEditModalOpened] = useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);

  const getForest = async () => {
    try {
      const { data } = await axiosInstance.get(`forest/${forestid}`);
      setForest(data);
    } catch (error: any) {
      console.error(error?.response);
      if (error?.response?.status === 401) {
        navigate("/login");
      } else {
        setNotFoundError(true);
      }
    }
  };

  const getTree = async () => {
    try {
      const { data } = await axiosInstance.get(`tree/${treeid}`);
      setTree(data);
    } catch (error: any) {
      console.error(error?.response);
      if (error?.response?.status === 401) {
        navigate("/login");
      } else {
        setNotFoundError(true);
      }
    }
  };

  useEffect(() => {
    if (!forest) {
      getForest();
    }

    if (!tree) {
      getTree();
    }
  }, [forest, tree]);

  if (notFoundError || !forestid) {
    return <NotFound />;
  }

  if (!forest || !tree) {
    return <Loader fullPage={true} />;
  }

  const createdDate = new Date(tree.createdAt);

  const treePeriods: ITreePeriods = {
    DAY: "Каждый день",
    WEEK: "Каждую неделю",
    MONTH: "Каждый месяц",
    QUARTER: "Каждый квартал",
    YEAR: "Каждый год",
  };

  const treeTypes: ITreeTypes = {
    PERIODIC_TREE: "Периодическое",
    UNLIMITED_TREE: "Безлимитное",
    LIMITED_TREE: "Лимитированное",
    BOOLEAN_TREE: "Булевое",
  };

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
    const date = (values?.date as Date) || createdDate;

    const request: ITreeEditRequest = {
      name: values.name as string,
      description: (values.description as string) || "",
      type: tree.type,
      // eslint-disable-next-line camelcase
      forest_id: +forestid,
      // eslint-disable-next-line camelcase
      created_at: getStringDate(
        date.getDate(),
        date.getMonth() + 1,
        date.getFullYear(),
        0,
        0
      ),
    };

    if (tree.type === "LIMITED_TREE") {
      request.limit = +values.limit;
    }

    axiosInstance
      .patch(`/tree/${tree.id}`, request)
      .then((response) => {
        console.debug(response.data);
        setTree(null);
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

  const cellClasses = "border border-gray py-2 px-4";

  return (
    <PageLayout
      breadcrumbs={[
        { name: "Мои леса", link: "/forests" },
        { name: forest.name, link: `/forest/${forestid}` },
        { name: tree.name },
      ]}
    >
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

      <div className="my-6 flex justify-center mb-12">
        <table className="table-fixed w-full md:w-3/4">
          <tbody>
            <tr>
              <td className={cellClasses}>Дата создания</td>
              <td className={cellClasses}>{`${createdDate.getDate()} ${
                getMonthName(createdDate.getMonth())[2]
              } ${createdDate.getFullYear()}`}</td>
            </tr>
            <tr>
              <td className={cellClasses}>Тип дерева</td>
              <td className={cellClasses}>{treeTypes[tree.type] || "–"}</td>
            </tr>
            {tree.type === "PERIODIC_TREE" && (
              <tr>
                <td className={cellClasses}>Период</td>
                <td className={cellClasses}>
                  {treePeriods[tree.period] || "–"}
                </td>
              </tr>
            )}
            {tree.type === "LIMITED_TREE" && (
              <tr>
                <td className={cellClasses}>Лимит</td>
                <td className={cellClasses}>{tree.limit || "–"}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {tree.type !== "BOOLEAN_TREE" && <TreeStatistics tree={tree} />}

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
                    <Textarea
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

                <Field
                  name="date"
                  type="text"
                  render={({ input }) => {
                    return (
                      <div className="flex flex-col gap-1 text-center">
                        <span className="text-beige-300">
                          Дата начала отсчета
                        </span>
                        <div className="flex justify-center">
                          <DatePicker
                            selected={input.value || createdDate}
                            onChange={input.onChange}
                            dateFormat="dd.MM.yyyy"
                            locale={ru}
                            inline
                          />
                        </div>
                      </div>
                    );
                  }}
                />

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
        <div className="flex flex-col md:flex-row justify-center items-center gap-5">
          <Button
            onClick={() => setDeleteModalOpened(false)}
            extraClass="w-full md:w-1/4"
          >
            Отмена
          </Button>
          <Button
            onClick={deleteTree}
            style="danger"
            extraClass="w-full md:w-1/4"
          >
            Удалить
          </Button>
        </div>
      </Modal>
    </PageLayout>
  );
};

export default Tree;
