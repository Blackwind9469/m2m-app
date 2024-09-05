import CustomerList from "@/components/CustomerList";
import Loading from "@/app/ui/dashboard/loading";
import { Suspense } from "react";

const CustomersPage = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <CustomerList />
      </Suspense>
    </div>
  );
};

export default CustomersPage;
