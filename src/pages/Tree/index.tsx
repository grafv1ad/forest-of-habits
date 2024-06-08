import { useState, useEffect } from "react";
import { Line, Pie, Bar, Bubble } from "react-chartjs-2";
import { Field, Form } from "react-final-form";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Chart,
  CategoryScale,
  LineElement,
  LinearScale,
  PointElement,
  ArcElement,
  Title,
  Filler,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import Button from "components/Button";
import FormWrapper from "components/FormWrapper";
import Input from "components/Input";
import Loader from "components/Loader";
import Modal from "components/Modal";
import PageLayout from "components/PageLayout";
import Textarea from "components/Textarea";
import TitleComponent from "components/Title";
import { ReactComponent as Arrow } from "images/arrow.svg";
import NotFound from "pages/NotFound";
import {
  FormErrors,
  FormValues,
  IForest,
  IHourIncrement,
  ITree,
  ITreeIncrementsDates,
  ITreeIncrementsWithValues,
} from "types";
import { axiosInstance } from "utils/api";
import {
  getCopiedDate,
  getDaysInMonth,
  getMonthName,
  getWeekday,
  getWeekdayName,
} from "utils/date";

Chart.register([
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Filler,
  Tooltip,
  Legend,
]);

const Tree = () => {
  const navigate = useNavigate();

  const { forestid, treeid } = useParams();

  const [notFoundError, setNotFoundError] = useState<boolean>(false);

  const [forest, setForest] = useState<IForest | null>(null);
  const [tree, setTree] = useState<ITree | null>(null);

  const [editModalOpened, setEditModalOpened] = useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);

  const [date, setDate] = useState<Date>(() => {
    const date = new Date();
    date.setDate(1);
    return date;
  });

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

  if (notFoundError) {
    return <NotFound />;
  }

  if (!forest || !tree) {
    return <Loader fullPage={true} />;
  }

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

  const incrementsList: ITreeIncrementsWithValues = {};
  const incrementsResult: ITreeIncrementsDates = {};

  if (tree?.increments.length) {
    tree.increments.forEach((increment) => {
      const incrementSplit = increment.date.split("T");
      const date = incrementSplit[0];
      const time = incrementSplit[1];
      const hour = time.split(":")[0];

      if (incrementsList[date]?.value) {
        incrementsList[date].value += increment.value;
        incrementsList[date].hours[+hour] += increment.value;
      } else {
        // eslint-disable-next-line no-restricted-properties
        const hoursArray = Array.from({ length: 24 }, () => 0);
        hoursArray[+hour] = increment.value;

        incrementsList[date] = {
          value: increment.value,
          hours: hoursArray,
        };
      }
    });
  }

  let daysWithIncremets = 0;
  let weekdaysIncremets = [0, 0, 0, 0, 0, 0, 0];

  const daysCount = getDaysInMonth(date.getMonth(), date.getFullYear());
  const realMonth = date.getMonth() + 1;

  const hoursIncrements: IHourIncrement[] = [];

  for (let i = 1; i <= daysCount; i++) {
    const dateString =
      `${date.getFullYear()}-` +
      `${realMonth < 10 ? `0${realMonth}` : realMonth}-` +
      `${i < 10 ? `0${i}` : i}`;

    if (incrementsList[dateString]?.value) {
      incrementsResult[i] = incrementsList[dateString].value;

      daysWithIncremets += 1;

      weekdaysIncremets[
        getWeekday(i, date.getMonth(), date.getFullYear()).number
      ] += 1;

      incrementsList[dateString].hours.forEach((value, hour) => {
        value *= 5;
        if (value > 25) value = 25;

        hoursIncrements.push({
          x: i,
          y: hour,
          r: value,
        });
      });
    } else {
      incrementsResult[i] = 0;
    }
  }

  // Переносим воскресенье в конец (в js он первый день недели)
  const [firstWeekday, ...restWeekdays] = weekdaysIncremets;
  weekdaysIncremets = [...restWeekdays, firstWeekday];

  const createdDate = new Date(tree.createdAt);
  createdDate.setHours(0, 0, 0, 0);

  const lineChartOptions = {
    aspectRatio: 2.25,
    scales: {
      y: {
        min: 0,
        ticks: {
          stepSize: 1,
        },
      },
      x: {
        min: 0,
        max: daysCount,
        ticks: {
          stepSize: 1,
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const lineChartData = {
    labels: Object.keys(incrementsResult),
    datasets: [
      {
        backgroundColor: "rgba(111, 163, 194, 0.25)",
        borderColor: "rgba(111, 163, 194, 1)",
        data: Object.values(incrementsResult),
        fill: true,
        label: "Инкрементации",
        lineTension: 0.4,
      },
    ],
  };

  const barChartOptions = {
    aspectRatio: 2.25,
    scales: {
      y: {
        min: 0,
        ticks: {
          stepSize: 1,
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const barChartData = {
    labels: Object.keys(weekdaysIncremets).map((_value, i) =>
      getWeekdayName(i, true)
    ),
    datasets: [
      {
        backgroundColor: [
          "rgba(111, 163, 194, 0.25)",
          "rgba(111, 163, 194, 0.25)",
          "rgba(111, 163, 194, 0.25)",
          "rgba(111, 163, 194, 0.25)",
          "rgba(111, 163, 194, 0.25)",
          "rgba(209, 79, 80, 0.25)",
          "rgba(209, 79, 80, 0.25)",
        ],
        hoverBackgroundColor: [
          "rgba(111, 163, 194, 1)",
          "rgba(111, 163, 194, 1)",
          "rgba(111, 163, 194, 1)",
          "rgba(111, 163, 194, 1)",
          "rgba(111, 163, 194, 1)",
          "rgba(209, 79, 80, 1)",
          "rgba(209, 79, 80, 1)",
        ],
        borderWidth: 2,
        borderColor: [
          "rgba(111, 163, 194, 1)",
          "rgba(111, 163, 194, 1)",
          "rgba(111, 163, 194, 1)",
          "rgba(111, 163, 194, 1)",
          "rgba(111, 163, 194, 1)",
          "rgba(209, 79, 80, 1)",
          "rgba(209, 79, 80, 1)",
        ],
        data: Object.values(weekdaysIncremets),
        fill: true,
        label: "Инкрементации",
        lineTension: 0.4,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const pieChartData = {
    labels: ["Без инкрементации", "С инкрементацией"],
    datasets: [
      {
        data: [daysCount - daysWithIncremets, daysWithIncremets],
        label: "Дни",
        backgroundColor: ["rgba(209, 79, 80, 0.75)", "rgba(89, 124, 99, 0.75)"],
        hoverBackgroundColor: ["rgba(209, 79, 80, 1)", "rgba(89, 124, 99, 1)"],
        borderWidth: 2,
        borderColor: "#fee8d4",
        tension: 100,
      },
    ],
  };

  const bubbleChartData = {
    labels: Object.keys(incrementsResult),
    datasets: [
      {
        backgroundColor: "rgba(111, 163, 194, 0.25)",
        borderColor: "rgba(111, 163, 194, 1)",
        data: hoursIncrements,
        label: "",
      },
    ],
  };

  const bubbleChartOptions = {
    aspectRatio: 2.25,
    scales: {
      x: {
        min: 1,
        max: daysCount,
        ticks: {
          stepSize: 1,
        },
      },
      y: {
        min: 0,
        max: 24,
        ticks: {
          stepSize: 3,
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
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
      <TitleComponent level="1" color="light" extraClass="!mb-7">
        {tree.name}
      </TitleComponent>

      <TitleComponent level="3" color="light" extraClass="empty:hidden">
        {tree.description}
      </TitleComponent>

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

      <TitleComponent level="2" color="light">
        Статистика дерева
      </TitleComponent>

      <div className="w-full flex justify-end mb-4 grow">
        <div className="flex items-center gap-4 grow justify-between lg:justify-end">
          <div className="text-lg">
            {getMonthName(date.getMonth())[0]} {date.getFullYear()}
          </div>
          <div className="flex items-center justify-between gap-6 lg:gap-2">
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

      <div className="flex flex-col gap-6">
        <div className="flex justify-between gap-6 flex-col lg:flex-row">
          <div className="w-full lg:w-[calc(50%-1.5rem)]">
            <TitleComponent level="4" color="light">
              По дням
            </TitleComponent>
            <Line options={lineChartOptions} data={lineChartData} />
          </div>
          <div className="w-full lg:w-[calc(50%-1.5rem)]">
            <TitleComponent level="4" color="light">
              По дням недели
            </TitleComponent>
            <Bar options={barChartOptions} data={barChartData} />
          </div>
        </div>

        <div className="flex justify-between gap-6 flex-col lg:flex-row">
          <div className="w-full lg:w-[calc(50%-1.5rem)]">
            <TitleComponent level="4" color="light">
              По часам
            </TitleComponent>
            <Bubble options={bubbleChartOptions} data={bubbleChartData} />
          </div>

          <div className="w-full lg:w-[calc(50%-1.5rem)] flex flex-col items-center">
            <TitleComponent level="4" color="light">
              По активности
            </TitleComponent>
            <div className="grow flex items-center">
              <div className="h-[250px] py-2">
                <Pie options={pieChartOptions} data={pieChartData} />
              </div>
            </div>
          </div>
        </div>
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
