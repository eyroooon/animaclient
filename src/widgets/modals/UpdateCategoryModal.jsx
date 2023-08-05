import { Fragment, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
  Option,
  Input,
} from "@material-tailwind/react";
import { getCategories } from "@/actions/category";
import { useDispatch, useSelector } from "react-redux";
import { getVariables } from "@/actions/variable";
import {
  createFCV,
  updateFCV,
} from "@/actions/contractFunctionCategoryVariable";
import { useNavigate } from "react-router-dom";

export function UpdateCategoryModal({
  open,
  handleOpen,
  id,
  categoryId,
  contractFunction,
  setContractData,
  contractData,
  variablesValues,
}) {
  const { categories } = useSelector((state) => state.categories);
  const { variables } = useSelector((state) => state.variables);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [myCategoryId, setMyCategoryId] = useState();
  const [myVariables, setMyVariables] = useState(null);
  const handleSelectChange = (e) => {
    setMyCategoryId(e);
    setMyVariables(null);
  };
  const clear = () => {
    setMyCategoryId("");
    setMyVariables(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMyVariables((prevState) => ({ ...prevState, [name]: value }));
  };

  // const handleSubmit = () => {
  //   if (myVariables) {
  //     const dataArray = Object.keys(myVariables).map((variable, index) => ({
  //       categoryId: myCategoryId,
  //       contractFunctionId: id,
  //       variableId: variable.variableId,
  //       value: myVariables[`${variable}`][`${variable.variableId}`],
  //       logIndex: new Date().toDateString(),
  //       mappedBy: "Human",
  //       fcvId: variable.fcvId,
  //     }));
  //     if (dataArray) {
  //       dispatch(updateFCV(dataArray, navigate));
  //     }
  //   }

  //   // clear();
  // };

  useEffect(() => {
    dispatch(getCategories());
    setMyCategoryId(`${categoryId}`);
    let myVariableValues = [];
    variablesValues.map((v) => {
      const obj = {};
      const key = `myVariable${v.variableId}`;
      obj[key] = v.value;
      obj.fcvId = v.fcvId;
      obj.variableId = v.variableId;
      myVariableValues.push(obj);
    });
    setMyVariables(myVariableValues);
  }, [myCategoryId, categoryId]);

  return (
    <Fragment>
      <Dialog
        open={open}
        size="md"
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="overflow-visible"
      >
        <DialogHeader>
          {categories.find((c) => c.id === categoryId)?.categoryName}
        </DialogHeader>
        <DialogBody divider>
          <div className="flex w-full flex-col justify-between space-y-2">
            <Select
              label="Select Category"
              animate={{
                mount: { y: 0 },
                unmount: { y: 25 },
              }}
              value={myCategoryId ? myCategoryId : categoryId}
              onChange={handleSelectChange}
              className="relative"
              disabled
            >
              {categories.map(({ id, categoryName }) => (
                <Option key={id} value={`${id}`}>
                  {categoryName}
                </Option>
              ))}
            </Select>
            {myCategoryId &&
              variables &&
              variables.length > 0 &&
              variables.map((variable, index) => {
                console.log(myVariables[index]);
                return (
                  <Input
                    disabled
                    key={variable.id}
                    onChange={handleInputChange}
                    name={`myVariable${variable.id}`}
                    label={variable.variableName}
                    value={
                      myVariables.length > index
                        ? myVariables[index][`myVariable${variable.id}`]
                        : ""
                    }
                  />
                );
              })}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Back</span>
          </Button>
          {/* <Button
            variant="gradient"
            color="green"
            onClick={() => {
              // handleOpen();
              handleSubmit();
            }}
          >
            <span>Confirm</span>
          </Button> */}
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}

export default UpdateCategoryModal;
