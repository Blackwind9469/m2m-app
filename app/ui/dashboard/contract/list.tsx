import ContractList from "@/components/ContractList";
import Loading from "@/app/ui/dashboard/loading";
import { Suspense } from "react";

const contractsPage = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <ContractList />
      </Suspense>
    </div>
  );
};

export default contractsPage;
