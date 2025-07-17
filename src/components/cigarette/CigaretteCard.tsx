import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CigaretteRecord } from "../../model/user/cigarettesType";
import { UserRoute } from "../../const/pathList";
import LoadingScreenBg from "../loading/LoadingScreenBg";

interface Props {
  item: CigaretteRecord;
  // eslint-disable-next-line no-unused-vars
  onDelete: (id: string) => void;
  // eslint-disable-next-line no-unused-vars
  onUpdate: (item: CigaretteRecord) => void;
}

export default function CigaretteCard({ item, onDelete, onUpdate }: Props) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleViewDetail = () => {
    navigate(UserRoute.SMOKING_PROCESS_DETAIL_PATH.replace(":id", item._id));
  };

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      await onUpdate(item);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await onDelete(item._id);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingScreenBg />;

  return (
    <li className="p-4 border rounded shadow">
      <p>
        <strong>Smoking frequency per day:</strong>{" "}
        {item.smoking_frequency_per_day}
      </p>
      <p>
        <strong>Money consumption per day:</strong>{" "}
        {item.money_consumption_per_day.toLocaleString()} VND
      </p>
      <p>
        <strong>Money saving:</strong> {item.saving_money.toLocaleString()} VND
      </p>
      <p>
        <strong>Created date:</strong>{" "}
        {new Date(item.create_date).toLocaleString()}
      </p>
      <div className="mt-2 flex justify-end gap-2">
        <button
          onClick={handleViewDetail}
          className="text-sm text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-50 transition cursor-pointer"
        >
          Details
        </button>
        <button
          onClick={handleUpdate}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
        >
          📝 Update
        </button>
        <button
          onClick={handleDelete}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
        >
          🗑 Delete
        </button>
      </div>
    </li>
  );
}
