import {
  getContractFunction,
  updateContractFunctions,
} from "@/actions/contractFunction";
import {
  getFCVs,
  retrieveByAI,
} from "@/actions/contractFunctionCategoryVariable";
import { getVariables } from "@/actions/variable";
import mappingData from "@/data/mapping-table-dummy";
import CategoryModal from "@/widgets/modals/CategoryModal";
import UpdateCategoryModal from "@/widgets/modals/UpdateCategoryModal";
import { MagnifyingGlassIcon, EyeIcon } from "@heroicons/react/24/outline";
import {
  ArrowDownTrayIcon,
  PencilIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
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
import { groupBy } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Monitored",
    value: "monitored",
  },
  {
    label: "Unmonitored",
    value: "unmonitored",
  },
];

const TABLE_HEAD = ["Category Name", "Mapped", "Variables", ""];

export function MappingPage() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [variablesValues, setVariableValues] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let fcvGroups = {};
  let fcvArray = [];
  const { contractFunctions, contractFunction, isLoading } = useSelector(
    (state) => state.contractFunctions
  );

  const { contractFunctionCategoryVariables, isLoadingAi } = useSelector(
    (state) => state.contractFunctionCategoryVariables
  );
  if (
    contractFunctionCategoryVariables &&
    contractFunctionCategoryVariables.length > 0
  ) {
    fcvGroups = groupBy(
      contractFunctionCategoryVariables,
      (fcv) => fcv?.logIndex
    );
    if (fcvGroups) {
      fcvArray = Object.keys(fcvGroups)
        .filter((fcv) => fcv !== "undefined")
        .map((key, index) => ({
          categoryId: fcvGroups[key][0].category.id,
          categoryName: fcvGroups[key][0].category.categoryName,
          variables: fcvGroups[key].map((fcvGroup, index) => ({
            variableId: fcvGroup.variable?.id,
            variableName: fcvGroup.variable?.variableName || "Unknown",
            value: fcvGroup.value,
            fcvId: fcvGroup.id,
          })),
          mappedBy: fcvGroups[key][0].mappedBy,
        }));
    }
  }
  console.log(fcvArray);
  useEffect(() => {
    dispatch(getContractFunction(id));
    dispatch(getFCVs(id));
  }, [id]);
  const handleOpen = () => setOpen(!open);
  const handleOpen2 = () => setOpen2(!open2);

  // Handle setting pretty protocol/function name
  const setPrettyName = (e) => {};

  // handle Pretty Inputs Changes
  const handlePrettyNameChange = (e) => {
    const { name, value } = e.target;
    setContractData((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <>
      <CategoryModal
        handleOpen={handleOpen}
        open={open}
        id={id}
        contractFunction={contractFunction}
      />
      {open2 && (
        <UpdateCategoryModal
          handleOpen={handleOpen2}
          open={open2}
          id={id}
          variablesValues={variablesValues}
          categoryId={categoryId}
          contractFunction={contractFunction}
        />
      )}
      {contractFunction && (
        <Card className="h-full w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Status:{" "}
                  <Chip
                    variant="filled"
                    size="sm"
                    value={contractFunction.mappingStatus.replace("_", " ")}
                    color={
                      contractFunction.mappingStatus === "MAPPED"
                        ? "blue"
                        : contractFunction.mappingStatus === "IN_REVIEW"
                        ? "indigo"
                        : "pink"
                    }
                  />
                </Typography>
                <a href={contractFunction.contractLink}>
                  <Typography variant="h5" color="blue-gray">
                    Contract Name: {contractFunction.contractName} (
                    {contractFunction.functionName})
                  </Typography>
                </a>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Button
                  className="flex items-center gap-3"
                  color="indigo"
                  size="sm"
                  onClick={handleOpen}
                >
                  <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add
                  Category
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-end gap-4 md:flex-row">
              <div className="flex w-full shrink-0 gap-2 md:w-max">
                <div className="w-full md:w-72">
                  <Input
                    onChange={handlePrettyNameChange}
                    label="Pretty Protocol Name"
                    name="prettyProtocolName"
                    value={contractFunction.contractName}
                  />
                </div>
                <Button
                  className="flex items-center gap-3"
                  color="indigo"
                  size="sm"
                  onClick={setPrettyName}
                  name="prettyProtocolNameButton"
                >
                  Set
                </Button>
              </div>
              <div className="flex w-full shrink-0 gap-2 md:w-max">
                <div className="w-full md:w-72">
                  <Input
                    onChange={handlePrettyNameChange}
                    name="prettyFunctionName"
                    label="Pretty Function Name"
                    value={contractFunction.functionName}
                  />
                </div>
                <Button
                  className="flex items-center gap-3"
                  color="indigo"
                  size="sm"
                  onClick={setPrettyName}
                  name="prettyFunctionNameButton"
                >
                  Set
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardBody className="overflow-scroll px-0">
            <table className="mt-4 w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fcvArray &&
                  fcvArray.length > 0 &&
                  fcvArray.map((fcv, index) => {
                    const isLast = index === fcvArray.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={index} className="even:bg-blue-gray-50/50">
                        <td className={classes}>
                          <div className="flex items-center gap-4">
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {fcv.categoryName.toUpperCase()}
                              </Typography>
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
                              {fcv.mappedBy}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex w-max flex-col justify-between gap-2">
                            {fcv.variables.map((variable, index) => (
                              <Chip
                                variant="filled"
                                size="sm"
                                value={`${variable.variableName}: ${variable.value}`}
                                color={"gray"}
                                key={index}
                              />
                            ))}
                          </div>
                        </td>
                        <td className={classes}>
                          <Tooltip content="View Details">
                            <IconButton
                              variant="text"
                              color="blue-gray"
                              onClick={() => {
                                setVariableValues(fcv.variables);
                                dispatch(getVariables(fcv.categoryId));
                                setCategoryId(fcv.categoryId);
                                handleOpen2();
                              }}
                            >
                              <EyeIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-end border-t border-blue-gray-50 p-4">
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  dispatch(retrieveByAI(contractFunction, navigate));
                }}
                variant="outlined"
                color="green"
                size="sm"
                disable={isLoadingAi}
              >
                Populate Data by AI
              </Button>
              {contractFunction.mappingStatus !== "IN_REVIEW" && (
                <Button
                  onClick={() => {
                    dispatch(
                      updateContractFunctions(id, {
                        mappingStatus: "IN_REVIEW",
                      })
                    );
                  }}
                  variant="outlined"
                  color="indigo"
                  size="sm"
                >
                  Save to In Review
                </Button>
              )}

              {contractFunction.mappingStatus !== "MAPPED" && (
                <Button
                  onClick={() => {
                    dispatch(
                      updateContractFunctions(id, { mappingStatus: "MAPPED" })
                    );
                  }}
                  variant="outlined"
                  color="blue"
                  size="sm"
                >
                  Save to Mapped
                </Button>
              )}

              {contractFunction.mappingStatus !== "UNMAPPED" && (
                <Button
                  onClick={() => {
                    dispatch(
                      updateContractFunctions(id, { mappingStatus: "UNMAPPED" })
                    );
                  }}
                  variant="outlined"
                  color="pink"
                  size="sm"
                >
                  Save to Unmapped
                </Button>
              )}

              <Button
                onClick={() => {
                  navigate(-1);
                }}
                variant="outlined"
                color="gray"
                size="sm"
              >
                Back
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  );
}

export default MappingPage;
