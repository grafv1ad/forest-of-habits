import { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form, Field } from "react-final-form";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import classNames from "classnames";
import Button from "components/Button";
import FormWrapper from "components/FormWrapper";
import Input from "components/Input";
import Loader from "components/Loader";
import Modal from "components/Modal";
import PageLayout from "components/PageLayout";
import Textarea from "components/Textarea";
import Title from "components/Title";
import TreeItem from "components/TreeItem";
import { ru } from "date-fns/locale/ru";
import { ReactComponent as Arrow } from "images/arrow.svg";
import NotFound from "pages/NotFound";
import {
  IForest,
  ITree,
  FormValues,
  FormErrors,
  ITreeCreateRequest,
} from "types";
import { axiosInstance } from "utils/api";
import {
  getCopiedDate,
  getMonthName,
  getDaysInMonth,
  getWeekday,
  getStringDate,
} from "utils/date";

import styles from "./style.module.css";

registerLocale("ru", ru);

const Forest = () => {
  const navigate = useNavigate();

  const { forestid, forestuuid } = useParams();

  const isShared = /\/shared\//.test(window.location.pathname);

  const [notFoundError, setNotFoundError] = useState<boolean>(false);

  const [forest, setForest] = useState<IForest | null>(null);
  const [trees, setTrees] = useState<ITree[] | null>(null);

  const [forestShareUuid, setForestSharedUuid] = useState<string | null>(null);

  const [date, setDate] = useState<Date>(() => {
    const date = new Date();
    date.setDate(1);
    return date;
  });

  const [filter, setFilter] = useState<string>("ALL");

  const [addTreeModalOpen, setAddTreeModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [addShareModalOpen, setAddShareModalOpen] = useState(false);
  const [removeShareModalOpen, setRemoveShareModalOpen] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const setPrevMonth = (date: Date) => {
    const copiedDate = getCopiedDate(date);
    copiedDate.setMonth(copiedDate.getMonth() - 1);
    setDate(copiedDate);
  };

  const setNextMonth = (date: Date) => {
    const copiedDate = getCopiedDate(date);
    copiedDate.setMonth(copiedDate.getMonth() + 1);
    setDate(copiedDate);
  };

  const getForest = async () => {
    try {
      if (isShared) {
        const { data } = await axiosInstance.get(`shared/${forestuuid}`);
        setForest(data);
      } else {
        const { data } = await axiosInstance.get(`forest/${forestid}`);
        setForest(data);
        setForestSharedUuid(data?.sharedId || null);
      }
    } catch (error: any) {
      console.error(error?.response);
      if (error?.response?.status === 401) {
        navigate("/login");
      } else {
        setNotFoundError(true);
      }
    }
  };

  const getTrees = async () => {
    try {
      if (isShared) {
        const { data } = await axiosInstance.get(
          `shared/by_forest/${forestuuid}?status=${filter}`
        );
        data.sort((a: ITree, b: ITree) => a.id > b.id);
        setTrees(data);
      } else {
        const { data } = await axiosInstance.get(
          `tree/by_forest/${forestid}?status=${filter}`
        );
        data.sort((a: ITree, b: ITree) => a.id > b.id);
        setTrees(data);
      }
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

    if (!trees) {
      getTrees();
    }
  }, [forest, trees]);

  const daysCount = getDaysInMonth(date.getMonth(), date.getFullYear());
  // eslint-disable-next-line no-restricted-properties
  const days = Array.from({ length: daysCount }, (_, i) => i + 1);

  const onSubmit = (values: FormValues) => {
    const date = (values?.date as Date) || today;

    const request: ITreeCreateRequest = {
      // eslint-disable-next-line camelcase
      forest_id: forest!.id,
      name: values.name as string,
      description: (values.description as string) || "",
      type: values.type as string,
      // eslint-disable-next-line camelcase
      created_at: getStringDate(
        date.getDate(),
        date.getMonth() + 1,
        date.getFullYear(),
        0,
        0
      ),
    };

    if (values.type === "PERIODIC_TREE") {
      request.period = values.period as string;
    }

    if (values.type === "LIMITED_TREE") {
      request.limit = +values.limit;
    }

    console.debug(request);

    axiosInstance
      .post("/tree", request)
      .then((response) => {
        if (trees?.length) {
          setTrees([...trees, response.data]);
        } else {
          setTrees([response.data]);
        }
        toast.success("Дерево успешно добавлено");
        setAddTreeModalOpen(false);
      })
      .catch((error) => {
        console.error(error?.response);
        toast.error(error?.response?.data?.message || "Что-то пошло не так");
      });
  };

  const validate = (values: FormValues) => {
    const errors: FormErrors = {};
    if (!values.name) {
      errors.name = "Введите название дерева";
    }
    if (!values.type) {
      errors.type = "Выберите тип дерева";
    }
    if (values.type === "PERIODIC_TREE" && !values.period) {
      errors.period = "Выберите период";
    }
    if (values.type === "LIMITED_TREE") {
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

  const addShare = async () => {
    try {
      const { data } = await axiosInstance.put(`/forest/share/${forestid}`);
      setForestSharedUuid(data);
      setAddShareModalOpen(false);
      setShareModalOpen(true);

      if (data) {
        toast.success("Теперь лес доступен по ссылке");
      } else {
        toast.error("Что-то пошло не так");
      }
    } catch (error: any) {
      console.error(error?.response);
      if (error?.response?.status === 401) {
        navigate("/login");
      } else {
        toast.error("Что-то пошло не так");
      }
    }
  };

  const removeShare = async () => {
    try {
      await axiosInstance.delete(`/forest/share/${forestid}`);
      setForestSharedUuid(null);
      setRemoveShareModalOpen(false);

      toast.success("Доступ по ссылке удален");
    } catch (error: any) {
      console.error(error?.response);
      if (error?.response?.status === 401) {
        navigate("/login");
      } else {
        toast.error("Что-то пошло не так");
      }
    }
    return null;
  };

  if (notFoundError) {
    return <NotFound />;
  }

  if (!forest || !trees) {
    return <Loader fullPage={true} />;
  }

  const treesList = trees.map((tree) => (
    <TreeItem
      key={tree.id}
      treeId={tree.id}
      forestId={forest.id}
      today={today}
      month={date.getMonth()}
      year={date.getFullYear()}
      days={days}
      isShared={isShared}
    />
  ));

  const filters = [
    {
      name: "Все деревья",
      value: "ALL",
    },
    {
      name: "Открытые",
      value: "OPEN",
    },
    {
      name: "Закрытые",
      value: "CLOSE",
    },
  ];

  const shareLink = forestShareUuid
    ? `${window.location.protocol}//${window.location.hostname}${
        window.location.port ? `:${window.location.port}` : ""
      }/forest/shared/${forestShareUuid}`
    : null;

  let breadcrumbs = [
    { name: "Мои леса", link: "/forests" },
    { name: forest.name },
  ];

  if (isShared) {
    breadcrumbs = [{ name: "Публичные леса" }, { name: forest.name }];
  }

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <Title level="1" color="light">
        {forest.name}
      </Title>

      <div className="w-full overflow-x-auto pb-5">
        <table
          className={classNames(
            "w-full border-spacing-0 border-collapse",
            styles.calendar
          )}
        >
          <thead>
            <tr>
              <td
                colSpan={2 + daysCount + 2}
                className="border border-transparent border-b-gray p-1"
              >
                <div className="flex justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {filters.map((item) => {
                      const classes = classNames(
                        "cursor-pointer transition-colors",
                        {
                          "text-main": item.value === filter,
                          "text-gray hover:text-beige-600":
                            item.value !== filter,
                        }
                      );
                      return (
                        <div
                          className={classes}
                          key={item.value}
                          onClick={() => {
                            setFilter(item.value);
                            setTrees(null);
                          }}
                        >
                          {item.name}
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-lg">
                      {getMonthName(date.getMonth())[0]} {date.getFullYear()}
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <div
                        onClick={() => setPrevMonth(date)}
                        className="cursor-pointer flex items-center p-1 transition-colors duration-150 hover:text-main"
                      >
                        <Arrow />
                      </div>
                      <div
                        onClick={() => setNextMonth(date)}
                        className="cursor-pointer flex items-center p-1 transition-colors duration-150 hover:text-main -scale-x-100"
                      >
                        <Arrow />
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr className="hidden">
              <td></td>
            </tr>
            <tr>
              <th
                rowSpan={2}
                colSpan={2}
                className="text-left align-middle border border-gray py-1 px-3 min-w-64 w-64 2xl:min-w-0 2xl:w-auto"
              >
                Дерево
              </th>
              {days.map((day) => {
                const weekday = getWeekday(
                  day,
                  date.getMonth(),
                  date.getFullYear()
                );

                const classes = classNames(
                  "min-w-9 w-9 min-h-9 h-9 text-center align-middle border border-gray p-1",
                  {
                    "text-red": weekday.number === 0 || weekday.number === 6,
                  }
                );

                return (
                  <td key={day} className={classes}>
                    {weekday.name}
                  </td>
                );
              })}
              <th
                rowSpan={2}
                className="min-w-[6.5rem] w-[6.5rem] text-center align-middle border border-gray p-1"
              >
                За месяц
              </th>
              <th
                rowSpan={2}
                className="min-w-[6.5rem] w-[6.5rem] text-center align-middle border border-gray p-1"
              >
                Итого
              </th>
            </tr>
            <tr>
              {days.map((day) => (
                <th
                  key={day}
                  className="min-w-9 w-9 min-h-9 h-9 text-center align-middle border border-gray p-1"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{treesList}</tbody>
          {!isShared && (
            <tfoot>
              <tr>
                <td colSpan={4} className="min-h-9 h-9 align-top">
                  <div
                    className="cursor-pointer pt-2 pl-3 w-fit transition-colors duration-150 hover:text-main"
                    onClick={() => setAddTreeModalOpen(true)}
                  >
                    + Добавить новое дерево
                  </div>
                </td>
                <td colSpan={daysCount}>
                  {forestShareUuid ? (
                    <div className="flex items-start justify-end mt-3">
                      <div
                        className="flex justify-center items-center h-9 text-center px-3 rounded-md transition-colors bg-green hover:bg-blue gap-1.5 cursor-pointer"
                        onClick={() => {
                          setShareModalOpen(true);
                        }}
                      >
                        <span>Доступно по ссылке</span>
                        <div className="w-5 h-5 bg-globe bg-contain bg-center bg-no-repeat"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-end mt-3">
                      <div
                        className="flex justify-center items-center h-9 text-center px-3 rounded-md transition-colors bg-gray hover:bg-green gap-1.5 cursor-pointer"
                        onClick={() => {
                          setAddShareModalOpen(true);
                        }}
                      >
                        <span>Поделиться</span>
                        <div className="w-5 h-5 bg-share bg-contain bg-center bg-no-repeat"></div>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      <Modal
        open={addTreeModalOpen}
        onHangleModal={() => setAddTreeModalOpen(false)}
        title="Новое дерево"
      >
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit, submitting, validating, values }) => (
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
                  name="description"
                  type="text"
                  render={({ input, meta }) => (
                    <Textarea
                      placeholder="Краткое описание"
                      {...input}
                      {...meta}
                    />
                  )}
                />

                <Field
                  name="type"
                  component="select"
                  initialValue="PERIODIC_TREE"
                >
                  <option value="PERIODIC_TREE">Периодическое дерево</option>
                  <option value="UNLIMITED_TREE">Безлимитное дерево</option>
                  <option value="LIMITED_TREE">Лимитированное дерево</option>
                  <option value="BOOLEAN_TREE">Булевое дерево</option>
                </Field>

                {values.type === "PERIODIC_TREE" && (
                  <Field name="period" component="select" initialValue="DAY">
                    <option value="DAY">Каждый день</option>
                    <option value="WEEK">Каждую неделю</option>
                    <option value="MONTH">Каждый месяц</option>
                    <option value="QUARTER">Каждый квартал</option>
                    <option value="YEAR">Каждый год</option>
                  </Field>
                )}

                {values.type === "LIMITED_TREE" && (
                  <Field
                    name="limit"
                    type="number"
                    render={({ input, meta }) => (
                      <Input placeholder="Лимит" {...input} {...meta} />
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
                            selected={input.value || today}
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
                  Добавить
                </Button>
              </FormWrapper>
            </form>
          )}
        />
      </Modal>

      <Modal
        open={addShareModalOpen}
        onHangleModal={() => setAddShareModalOpen(false)}
        title="Сделать лес доступным по ссылке?"
      >
        <div className="flex flex-col md:flex-row justify-center items-center gap-5">
          <Button
            onClick={() => setAddShareModalOpen(false)}
            extraClass="w-full md:w-1/4"
          >
            Отмена
          </Button>
          <Button
            onClick={addShare}
            style="success"
            extraClass="w-full md:w-1/4"
          >
            Да
          </Button>
        </div>
      </Modal>

      {shareLink && (
        <>
          <Modal
            open={shareModalOpen}
            onHangleModal={() => setShareModalOpen(false)}
            title="Лес доступен по ссылке"
          >
            <FormWrapper>
              <Input
                name="shareLink"
                label="Ссылка"
                value={shareLink}
                readOnly
              />
              <Button
                onClick={() => {
                  navigator.clipboard
                    .writeText(shareLink)
                    .then(() => {
                      toast.success("Ссылка успешно скопирована");
                      setShareModalOpen(false);
                    })
                    .catch((error) => {
                      toast.error("Произошла ошибка");
                      console.error(error);
                    });
                }}
              >
                Скопировать
              </Button>
              <a
                href={shareLink}
                target="_blank"
                className="flex"
                onClick={() => setShareModalOpen(false)}
              >
                <Button style="outline" extraClass="grow">
                  Открыть в новой вкладке
                </Button>
              </a>
              <div className="text-center">
                <div
                  className="text-red hover:underline cursor-pointer"
                  onClick={() => {
                    setShareModalOpen(false);
                    setRemoveShareModalOpen(true);
                  }}
                >
                  Закрыть доступ
                </div>
              </div>
            </FormWrapper>
          </Modal>
          <Modal
            open={removeShareModalOpen}
            onHangleModal={() => setRemoveShareModalOpen(false)}
            title="Закрыть доступ по ссылке?"
          >
            <div className="flex flex-col md:flex-row justify-center items-center gap-5">
              <Button
                onClick={() => {
                  setRemoveShareModalOpen(false);
                  setShareModalOpen(true);
                }}
                extraClass="w-full md:w-1/4"
              >
                Отмена
              </Button>
              <Button
                onClick={removeShare}
                style="danger"
                extraClass="w-full md:w-1/4"
              >
                Закрыть
              </Button>
            </div>
          </Modal>
        </>
      )}
    </PageLayout>
  );
};

export default Forest;
