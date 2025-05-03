import { Button } from "@/components/ui/button";
import Spinner from "@/app/(auth)/_components/spinner";
import { dashboardApi } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type MarkAsDoneButtonType = {
  id: string;
  isCompleted: boolean;
};

export const markAsDone = async ({
  id,
  isCompleted,
}: {
  id: string;
  isCompleted: boolean;
}) => {
  const result = await dashboardApi.markAsDone(id, {
    isCompleted,
  });
  return result.data;
};

export const MarkAsDoneButton = ({ id, isCompleted }: MarkAsDoneButtonType) => {
  const queryClient = useQueryClient();

  const useMarkAsDoneHabit = () =>
    useMutation({
      mutationFn: markAsDone,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["userHabits"] });
      },
    });

  const { mutate: markAsDoneHabit, isPending } = useMarkAsDoneHabit();

  return (
    <Button
      // variant="ghost"
      onClick={() => markAsDoneHabit({ id, isCompleted })}
    >
      {isPending ? <Spinner /> : "Done"}
      {/* <ArrowUpDown /> */}
    </Button>
  );
};
