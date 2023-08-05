import React, { useEffect } from "react";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { getContractFunctions } from "@/actions/contractFunction";

export function Pagination({ params }) {
  const [active, setActive] = React.useState(1);
  const dispatch = useDispatch();

  const next = () => {
    if (active === 100) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  useEffect(() => {
    if (active) {
      dispatch(getContractFunctions(active, params));
    }
  }, [dispatch, active, params]);

  return (
    <div className="flex items-center gap-8">
      <IconButton
        size="sm"
        variant="outlined"
        color="blue-gray"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
      <Typography color="gray" className="font-normal">
        Page <strong className="text-blue-gray-900">{active}</strong> of{" "}
        <strong className="text-blue-gray-900">100</strong>
      </Typography>
      <IconButton
        size="sm"
        variant="outlined"
        color="blue-gray"
        onClick={next}
        disabled={active === 100}
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </div>
  );
}
