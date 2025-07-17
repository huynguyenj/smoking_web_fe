import { useState } from "react";
import type {
  InitialState,
  CreateInitialState,
} from "../../model/initialType/initialType";
import privateApiService from "../../services/ApiPrivate";
import NicotineQuizPopup from "./NicotineQuiz";
import { toast } from "react-toastify";

interface Props {
  initialData: InitialState;
  onClose: () => void;
  onSuccess: () => void;
}

export default function UpdateCigarettePopup({
  initialData,
  onClose,
  onSuccess,
}: Props) {
  const [amount, setAmount] = useState(initialData.amount_cigarettes);
  const [frequency, setFrequency] = useState(
    initialData.smoking_frequency_per_day
  );
  const [money, setMoney] = useState(initialData.money_each_cigarette);
  const [nicotine, setNicotine] = useState(initialData.nicotine_evaluation);
  const [loading, setLoading] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  const handleUpdate = async () => {
    const payload: CreateInitialState = {
      amount_cigarettes: amount,
      smoking_frequency_per_day: frequency,
      money_each_cigarette: money,
      nicotine_evaluation: nicotine,
    };

    try {
      setLoading(true);
      await privateApiService.updateInitialStateById(initialData._id, payload);
      toast.success("Update successfully!");
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Update cigarette information</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="amount" className="block mb-1 font-medium">
              Number of cigarettes
            </label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(+e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label htmlFor="times" className="block mb-1 font-medium">
              Smoking frequency per day
            </label>
            <input
              id="times"
              type="number"
              value={frequency}
              onChange={(e) => setFrequency(+e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label htmlFor="money" className="block mb-1 font-medium">
              Cost per cigarette (VND)
            </label>
            <input
              id="money"
              type="number"
              value={money}
              onChange={(e) => setMoney(+e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Nicotine evaluation
            </label>
            {nicotine === null ? (
              <button
                type="button"
                onClick={() => setShowQuiz(true)}
                className="px-3 py-2 bg-purple-500 text-white rounded"
              >
                Do test
              </button>
            ) : (
              <div className="flex items-center justify-between">
                <p className="font-semibold text-green-600">
                  ✅ Point: {nicotine}/10
                </p>
                <button
                  type="button"
                  onClick={() => setShowQuiz(true)}
                  className="ml-4 text-sm text-blue-500 underline"
                >
                  Test again
                </button>
              </div>
            )}
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
              disabled={loading || nicotine === null}
            >
              {loading ? "Loading..." : "Update"}
            </button>
          </div>
        </form>
      </div>

      {/* Quiz popup hiển thị dạng overlay riêng */}
      {showQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div className="relative z-10 bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
            <NicotineQuizPopup
              onClose={() => setShowQuiz(false)}
              onSubmit={(score) => {
                setNicotine(score);
                setShowQuiz(false);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
