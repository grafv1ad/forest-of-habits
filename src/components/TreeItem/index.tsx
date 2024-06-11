import React, { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Field, Form } from "react-final-form";
import { toast } from "react-toastify";
import classNames from "classnames";
import Button from "components/Button";
import FormWrapper from "components/FormWrapper";
import Input from "components/Input";
import OurLink from "components/Link";
import Modal from "components/Modal";
import Textarea from "components/Textarea";
import { ru } from "date-fns/locale/ru";
import { ReactComponent as SettingsSVG } from "images/settings.svg";
import {
  ITree,
  TreeItemProps,
  ITreeIncrementsDates,
  ITreeIncrementsState,
  FormErrors,
  FormValues,
  ITreeEditRequest,
} from "types";
import { axiosInstance } from "utils/api";
import { getStringDate } from "utils/date";

registerLocale("ru", ru);

const TreeItem: React.FC<TreeItemProps> = ({
  treeId,
  forestId,
  today,
  month,
  year,
  days,
  isShared,
}) => {
  // Реальный номер месяца (в js месяца нумеруются с 0)
  const realMonth = month + 1;

  const [loaded, setLoaded] = useState<boolean>(false);
  const [tree, setTree] = useState<ITree | null>(null);
  const [{ incrementsDates, monthIncrements, totalIncrements }, setIncrements] =
    useState<ITreeIncrementsState>({
      incrementsDates: {},
      monthIncrements: 0,
      totalIncrements: 0,
    });

  const [editModalOpened, setEditModalOpened] = useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);

  const getIncrementsFromTree = (tree: ITree, days: number[]) => {
    const dates: ITreeIncrementsDates = {};
    let total = 0;
    let monthTotal = 0;

    if (tree?.increments?.length) {
      tree.increments.forEach((increment) => {
        const date = increment.date.split("T")[0];

        if (dates[date]) {
          dates[date] += increment.value;
        } else {
          dates[date] = increment.value;
        }

        total += increment.value;
      });
    }

    days.forEach((day) => {
      const dateString =
        `${year}-` +
        `${realMonth < 10 ? `0${realMonth}` : realMonth}-` +
        `${day < 10 ? `0${day}` : day}`;

      const incrementsCount = dates[dateString] || 0;
      if (incrementsCount) monthTotal += incrementsCount;
    });

    return {
      incrementsDates: dates,
      monthIncrements: monthTotal,
      totalIncrements: total,
    };
  };

  const getTree = async () => {
    try {
      if (isShared) {
        const { data } = await axiosInstance.get(`shared/tree/${treeId}`);
        setIncrements(getIncrementsFromTree(data, days));
        setTree(data);
      } else {
        const { data } = await axiosInstance.get(`tree/${treeId}`);
        setIncrements(getIncrementsFromTree(data, days));
        setTree(data);
      }
    } catch (error: any) {
      console.error(error?.response);
    }
    setLoaded(true);
  };

  const incrementTree = async (value: number, date: string) => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    try {
      await axiosInstance.post(`tree/${treeId}`, {
        value,
        date: `${date}T${hours < 10 ? `0${hours}` : hours}:${
          minutes < 10 ? `0${minutes}` : minutes
        }:00`,
      });
      setLoaded(false);
    } catch (error: any) {
      console.error(error?.response);
      toast.error("Что-то пошло не так");
    }
  };

  useEffect(() => {
    if (!loaded) {
      getTree();
    }
  }, [loaded]);

  useEffect(() => {
    if (loaded && tree) {
      setIncrements(getIncrementsFromTree(tree, days));
    } else {
      getTree();
    }
  }, [days]);

  if (!tree) {
    return null;
  }

  const createdDate = tree.createdAt ? new Date(tree.createdAt) : today;
  createdDate.setHours(0, 0, 0, 0);

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
      forest_id: forestId,
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
        setTree(null);
        toast.success(`Дерево «${tree.name}» успешно удалено`);
      })
      .catch((error) => {
        console.error(error?.response);
        toast.error(error?.response?.data?.message || "Что-то пошло не так");
      });
    setDeleteModalOpened(false);
  };

  return (
    <>
      <tr>
        {!isShared && (
          <td
            className="group min-w-9 w-9 min-h-9 h-9 text-center align-middle border border-gray py-0 cursor-pointer text-gray opacity-75 transition hover:text-main"
            onClick={() => setEditModalOpened(true)}
          >
            <div className="group-hover:rotate-[30deg] transition-transform">
              <SettingsSVG />
            </div>
          </td>
        )}
        <th
          colSpan={isShared ? 2 : 1}
          className="text-left align-middle font-normal border border-gray p-0 w-min min-w-[6.5rem] z-[5]"
        >
          <div
            className="group absolute left-0 top-0 min-w-full w-full h-full flex items-center hover:w-auto hover:bg-main"
            title={tree.description}
          >
            {isShared ? (
              <div className="text-main block w-full py-1 px-3 whitespace-nowrap overflow-hidden text-ellipsis no-underline group-hover:text-background group-hover:font-semibold">
                {tree.name}
              </div>
            ) : (
              <OurLink
                href={`/forest/${forestId}/tree/${tree.id}`}
                extraClass="block w-full py-1 px-3 whitespace-nowrap overflow-hidden text-ellipsis no-underline group-hover:text-background group-hover:font-semibold"
              >
                {tree.name}
              </OurLink>
            )}
          </div>
        </th>
        {days.map((day) => {
          const date = new Date(year, month, day);
          const dateString =
            `${year}-` +
            `${realMonth < 10 ? `0${realMonth}` : realMonth}-` +
            `${day < 10 ? `0${day}` : day}`;

          const incrementsCount = incrementsDates[dateString] || 0;

          let isRelevant = false;

          if (tree.type === "PERIODIC_TREE") {
            const tempDate = new Date(createdDate.getTime());

            while (!isRelevant && tempDate.getTime() < date.getTime()) {
              switch (tree.period) {
                case "DAY":
                  isRelevant = true;
                  break;
                case "WEEK":
                  tempDate.setDate(tempDate.getDate() + 7);
                  break;
                case "MONTH":
                  tempDate.setMonth(tempDate.getMonth() + 1);
                  break;
                case "QUARTER":
                  tempDate.setMonth(tempDate.getMonth() + 4);
                  break;
                case "YEAR":
                  tempDate.setFullYear(tempDate.getFullYear() + 1);
                  break;
                default:
                  isRelevant = true;
                  break;
              }
            }

            if (!isRelevant) {
              isRelevant = tempDate.getTime() === date.getTime();
            }
          } else {
            isRelevant = true;
          }

          const cellClasses = classNames(
            "relative min-w-9 w-9 min-h-9 h-9 text-center align-middle border border-gray p-0",
            {
              "bg-dot bg-no-repeat bg-center":
                !incrementsCount &&
                isRelevant &&
                date >= today &&
                tree.type === "PERIODIC_TREE",
              "bg-check bg-no-repeat bg-center": incrementsCount === 1,
              "bg-cross bg-no-repeat bg-center":
                !incrementsCount &&
                isRelevant &&
                date < today &&
                date >= createdDate &&
                tree.type === "PERIODIC_TREE",
              "bg-main text-background font-semibold": incrementsCount > 0,
              "bg-gray opacity-15 cursor-not-allowed":
                date < createdDate ||
                !isRelevant ||
                (tree.type === "BOOLEAN_TREE" &&
                  totalIncrements > 0 &&
                  !incrementsCount),
            }
          );

          const buttonClasses =
            "w-full flex justify-center items-center text-center font-normal border border-gray box-content";

          return (
            <td key={day} className={cellClasses}>
              <div className="group absolute left-0 top-0 w-full h-full p-1 flex justify-center items-center text-center">
                {incrementsCount > 1
                  ? incrementsCount < 100
                    ? incrementsCount
                    : "99+"
                  : ""}
                {!isShared &&
                  isRelevant &&
                  date >= createdDate &&
                  !(
                    tree.type === "BOOLEAN_TREE" &&
                    totalIncrements > 0 &&
                    !incrementsCount
                  ) && (
                    <div
                      className={classNames(
                        "scale-y-0 group-hover:scale-y-100 origin-top absolute left-0 flex flex-col items-center w-full box-content z-10",
                        {
                          "top-full transition-transform": incrementsCount > 0,
                          "top-0 transition-none h-full": incrementsCount < 1,
                        }
                      )}
                    >
                      <button
                        className={classNames(
                          buttonClasses,
                          "bg-green text-beige-600",
                          {
                            "h-[calc(1.125rem-0.75px)]": incrementsCount > 0,
                            "h-full": incrementsCount < 1,
                          }
                        )}
                        onClick={() => {
                          incrementTree(1, dateString);
                        }}
                      >
                        +
                      </button>
                      <button
                        className={classNames(
                          buttonClasses,
                          "bg-red text-beige-600 border-t-0",
                          "h-[calc(1.125rem-0.75px)]",
                          {
                            hidden: incrementsCount < 1,
                          }
                        )}
                        onClick={() => {
                          if (incrementsCount > 0) {
                            incrementTree(-1, dateString);
                          }
                        }}
                      >
                        -
                      </button>
                    </div>
                  )}
              </div>
            </td>
          );
        })}
        {tree.type === "BOOLEAN_TREE" ? (
          <td
            colSpan={2}
            className={classNames(
              "text-center align-middle border border-gray p-1",
              {
                "bg-green text-beige-600 font-semibold": totalIncrements > 0,
              }
            )}
          >
            {totalIncrements > 0 ? "Выполнено" : "Не выполнено"}
          </td>
        ) : (
          <>
            <td className="text-center align-middle border border-gray p-1">
              {monthIncrements}
            </td>
            <td
              className={classNames(
                "text-center align-middle border border-gray p-1",
                {
                  "bg-green text-beige-600 font-semibold":
                    tree?.limit && tree?.limit <= totalIncrements,
                }
              )}
            >
              {tree?.limit
                ? `${totalIncrements} / ${tree.limit}`
                : totalIncrements}
            </td>
          </>
        )}
      </tr>

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

                <div className="flex justify-center">
                  <div
                    className="text-red hover:underline cursor-pointer"
                    onClick={() => {
                      setEditModalOpened(false);
                      setDeleteModalOpened(true);
                    }}
                  >
                    Удалить дерево
                  </div>
                </div>
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
            onClick={() => {
              setDeleteModalOpened(false);
              setEditModalOpened(true);
            }}
            extraClass="w-1/4"
          >
            Отмена
          </Button>
          <Button onClick={deleteTree} style="danger" extraClass="w-1/4">
            Удалить
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default TreeItem;
