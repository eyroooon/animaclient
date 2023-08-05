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
import { createFCV } from "@/actions/contractFunctionCategoryVariable";
import { useNavigate } from "react-router-dom";

export function CategoryModal({
  open,
  handleOpen,
  id,
  contractFunction,
  setContractData,
  contractData,
}) {
  const { categories } = useSelector((state) => state.categories);
  const { variables } = useSelector((state) => state.variables);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [myCategoryId, setMyCategoryId] = useState("");
  const [myVariables, setMyVariables] = useState(null);
  const handleSelectChange = (e) => {
    setMyCategoryId(e);
    setMyVariables(null);
    dispatch(getVariables(e));
  };

  const clear = () => {
    setMyCategoryId("");
    setMyVariables(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMyVariables((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    if (myVariables) {
      const dataArray = Object.keys(myVariables).map((variable) => ({
        categoryId: myCategoryId,
        contractFunctionId: id,
        variableId: variable.toString().replace("myVariable", ""),
        value: myVariables[`${variable}`],
        logIndex: new Date().toDateString(),
        mappedBy: "Human",
      }));
      if (dataArray) {
        dispatch(createFCV(dataArray, navigate));
      }
    } else {
      dispatch(
        createFCV(
          [
            {
              categoryId: myCategoryId,
              contractFunctionId: id,
              variableId: null,
              value: "null",
              logIndex: new Date().toDateString(),
              mappedBy: "Human",
            },
          ],
          navigate
        )
      );
    }

    clear();
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [myCategoryId]);

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
        <DialogHeader>Pick Category</DialogHeader>
        <DialogBody divider>
          <div className="flex w-full flex-col justify-between space-y-2">
            <Select
              label="Select Category"
              animate={{
                mount: { y: 0 },
                unmount: { y: 25 },
              }}
              value={myCategoryId}
              onChange={handleSelectChange}
              className="relative"
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
              variables.map((variable) => {
                return (
                  <Input
                    key={variable.id}
                    onChange={handleInputChange}
                    name={`myVariable${variable.id}`}
                    label={variable.variableName}
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
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              // handleOpen();
              handleSubmit();
            }}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}

export default CategoryModal;
