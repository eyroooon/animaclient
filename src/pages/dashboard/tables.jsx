import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon, EyeIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
import { Pagination } from "@/components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { upperFirst } from "lodash";
import { getContractFunctions } from "@/actions/contractFunction";
import { useEffect, useState } from "react";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Unmapped",
    value: "unmapped",
  },
  {
    label: "Mapped",
    value: "mapped",
  },
  {
    label: "Inreview",
    value: "inreview",
  },
];

const TABLE_HEAD = [
  "Contract Function",
  "Contract Address",
  "Count",
  "Status",
  "Action",
];

export function Tables() {
  const { contractFunctions, isLoading } = useSelector(
    (state) => state.contractFunctions
  );
  const [params, setParams] = useState({
    filter: "",
    orderBy: "",
    sort: "",
    search: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    navigate({
      pathname: "/dashboard/home",
      search: `?${createSearchParams(params)}`,
    });
  }, [params]);
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab
                  onClick={() => {
                    setParams((prev) => ({ ...prev, filter: value }));
                  }}
                  key={value}
                  value={value}
                >
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              onChange={(e) => {
                setParams((prev) => ({ ...prev, search: e.target.value }));
              }}
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-start gap-2 font-normal leading-none opacity-70"
                  >
                    {head}{" "}
                    {index !== TABLE_HEAD.length - 1 &&
                      index !== TABLE_HEAD.length - 2 && (
                        <div>
                          <ChevronUpIcon
                            color={
                              params.orderBy === "asc" && params.sort === head
                                ? "red"
                                : ""
                            }
                            onClick={() => {
                              setParams((prev) => ({
                                ...prev,
                                orderBy: "asc",
                                sort: head,
                              }));
                            }}
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                          <ChevronDownIcon
                            color={
                              params.orderBy === "desc" && params.sort === head
                                ? "red"
                                : ""
                            }
                            onClick={() => {
                              setParams((prev) => ({
                                ...prev,
                                orderBy: "desc",
                                sort: head,
                              }));
                            }}
                            strokeWidth={3}
                            className="h-3 w-3"
                          />
                        </div>
                      )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!isLoading &&
              contractFunctions.length > 0 &&
              contractFunctions.map(
                (
                  {
                    id,
                    contractName,
                    contractAddress,
                    contractLink,
                    functionName,
                    count,
                    mappingStatus,
                  },
                  index
                ) => {
                  const isLast = index === contractFunctions.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={id} className="even:bg-blue-gray-50/50">
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <a href={contractLink}>
                              <Typography
                                variant="small"
                                color="blue"
                                className="font-normal"
                              >
                                {contractName} ({functionName})
                              </Typography>
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {contractAddress}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {count}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            size="sm"
                            variant="filled"
                            value={mappingStatus.replace("_", " ")}
                            color={
                              mappingStatus === "MAPPED"
                                ? "blue"
                                : mappingStatus === "IN_REVIEW"
                                ? "indigo"
                                : "pink"
                            }
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Tooltip content="View Details">
                          <IconButton
                            variant="text"
                            color="blue-gray"
                            onClick={() => {
                              navigate(`/dashboard/mapping/${id}`);
                            }}
                          >
                            <EyeIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                }
              )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Pagination params={params} />
      </CardFooter>
    </Card>
  );
}

export default Tables;
