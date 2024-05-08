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

  if (!forest || !trees) {
    return <Loader />;
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

  return (
    <PageLayout>
      <Title level="1" color="light">
        {forest.name}
      </Title>

      <Title level="2" color="light" extraClass="flex gap-3 justify-center">
        <div
          onClick={() => setPrevMonth(date)}
          className="cursor-pointer flex items-center p-1 transition-colors duration-150 hover:text-main"
        >
          <Arrow />
        </div>
        {getMonthName(date.getMonth())} {date.getFullYear()}
        <div
          onClick={() => setNextMonth(date)}
          className="cursor-pointer flex items-center p-1 transition-colors duration-150 hover:text-main -scale-x-100"
        >
          <Arrow />
        </div>
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
              <th
                rowSpan={2}
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
                className="min-w-28 w-28 text-center align-middle border border-gray p-1"
              >
                За месяц
              </th>
              <th
                rowSpan={2}
                className="min-w-28 w-28 text-center align-middle border border-gray p-1"
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
    </PageLayout>
  );
};

export default Forest;