import { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import classNames from "classnames";
import Button from "components/Button";
import FormWrapper from "components/FormWrapper";
import Input from "components/Input";
import Modal from "components/Modal";
import PageLayout from "components/PageLayout";
import Title from "components/Title";
import TreeItem from "components/TreeItem";
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

  const [date, setDate] = useState<Date>(() => {
    const date = new Date();
    date.setDate(1);
    return date;
  });
  const [forest, setForest] = useState<IForest | null>(null);
  const [trees, setTrees] = useState<ITree[] | null>(null);

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

  const daysCount = getDaysInMonth(date.getMonth(), date.getFullYear());
  // eslint-disable-next-line no-restricted-properties
  const days = Array.from({ length: daysCount }, (_, i) => i + 1);

  let treesList;
  if (trees && forest) {
    treesList = trees.map((tree, index) => (
      <TreeItem
        key={index}
        treeId={tree.id}
        forestId={forest.id}
        today={today}
        month={date.getMonth()}
        year={date.getFullYear()}
        days={days}
      />
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

          {/* <div className="mb-12 flex justify-end">
            <Button onClick={onHangleModal}>+ Добавить новое дерево</Button>
          </div> */}

          <Title level="2" color="light" extraClass="flex gap-3 justify-center">
            <div
              onClick={() => setPrevMonth(date)}
              className="cursor-pointer flex items-center p-1 transition-colors duration-150 hover:text-main"
            >
              <svg
                width="10"
                height="16"
                viewBox="0 0 9 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.292893 7.29289C-0.0976311 7.68342 -0.0976311 8.31658 0.292893 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292893 7.29289ZM2 7H1V9H2V7Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            {getMonthName(date.getMonth())} {date.getFullYear()}
            <div
              onClick={() => setNextMonth(date)}
              className="cursor-pointer flex items-center p-1 transition-colors duration-150 hover:text-main"
            >
              <svg
                width="10"
                height="16"
                viewBox="0 0 9 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.70711 7.29289C9.09763 7.68342 9.09763 8.31658 8.70711 8.70711L2.34315 15.0711C1.95262 15.4616 1.31946 15.4616 0.928932 15.0711C0.538408 14.6805 0.538408 14.0474 0.928932 13.6569L6.58579 8L0.928932 2.34315C0.538408 1.95262 0.538408 1.31946 0.928932 0.928932C1.31946 0.538408 1.95262 0.538408 2.34315 0.928932L8.70711 7.29289ZM7 7H8V9H7V7Z"
                  fill="currentColor"
                />
              </svg>
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
                        "text-red":
                          weekday.number === 0 || weekday.number === 6,
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
        </>
      ) : (
        <div>loader</div>
      )}
    </PageLayout>
  );
};

export default Forest;
