import { useEffect, useState } from "react";
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
import Title from "components/Title";
import TreeItem from "components/TreeItem";
import { ReactComponent as Arrow } from "images/arrow.svg";
import { IForest, ITree, FormValues, FormErrors } from "types";
import { axiosInstance } from "utils/api";
import {
  getCopiedDate,
  getMonthName,
  getDaysInMonth,
  getWeekday,
} from "utils/date";

import styles from "./style.module.css";

const Forest = () => {
  const navigate = useNavigate();

  const { forestid } = useParams();

  const [forest, setForest] = useState<IForest | null>(null);
  const [trees, setTrees] = useState<ITree[] | null>(null);

  const [date, setDate] = useState<Date>(() => {
    const date = new Date();
    date.setDate(1);
    return date;
  });

  const [filter, setFilter] = useState<string>("ALL");

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

  const getTrees = async () => {
    try {
      const { data } = await axiosInstance.get(
        `tree/by_forest/${forestid}?status=${filter}`
      );
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

  const [open, setOpen] = useState(false);

  const onHangleModal = () => setOpen(!open);

  const onSubmit = (values: FormValues) => {
    console.debug(values);

    interface IRequest {
      // eslint-disable-next-line camelcase
      forest_id: number;
      name: string;
      description?: string;
      type: string;
      period?: string;
      limit?: number;
    }

    const request: IRequest = {
      // eslint-disable-next-line camelcase
      forest_id: forest!.id,
      name: values.name as string,
      description: (values.description as string) || "",
      type: values.type as string,
    };

    if (values.type === "PERIODIC_TREE") {
      request.period = values.period as string;
    }

    if (values.type === "LIMITED_TREE") {
      request.limit = +values.limit;
    }

    axiosInstance
      .post("/tree", request)
      .then((response) => {
        console.debug(response.data);
        if (trees?.length) {
          setTrees((trees) => {
            trees?.push(response.data);
            return trees;
          });
        } else {
          setTrees([response.data]);
        }
        toast.success("Дерево успешно добавлено");
        onHangleModal();
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

  return (
    <PageLayout>
      <Title level="1" color="light">
        {forest.name}
      </Title>

      <div className="w-full flex justify-between mb-4">
        <div className="flex items-center gap-2">
          {filters.map((item) => {
            const classes = classNames("cursor-pointer transition-colors", {
              "text-main": item.value === filter,
              "text-gray hover:text-beige-600": item.value !== filter,
            });
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

      <div className="w-full overflow-x-auto pb-5">
        <table
          className={classNames(
            "w-full border-spacing-0 border-collapse",
            styles.calendar
          )}
        >
          <thead>
            <tr>
              <th
                rowSpan={2}
                colSpan={2}
                className="text-left align-middle border border-gray py-1 px-3"
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
          <tfoot>
            <tr>
              <td colSpan={2 + days.length + 2} className="min-h-9 h-9">
                <div
                  className="cursor-pointer py-1 px-3 w-fit transition-colors duration-150 hover:text-main"
                  onClick={onHangleModal}
                >
                  + Добавить новое дерево
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <Modal open={open} onHangleModal={onHangleModal} title="Новое дерево">
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
                    <Input
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
                  {/* <option value="BOOLEAN_TREE">Булевое дерево</option> */}
                  <option value="PERIODIC_TREE">Периодическое дерево</option>
                  <option value="UNLIMITED_TREE">Безлимитное дерево</option>
                  <option value="LIMITED_TREE">Лимитное дерево</option>
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

                <Button type="submit" disabled={submitting || validating}>
                  Добавить
                </Button>
              </FormWrapper>
            </form>
          )}
        />
      </Modal>
    </PageLayout>
  );
};

export default Forest;
