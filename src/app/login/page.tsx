import CardForm from "@/components/CardForm";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const page = () => {
  return (
    <div className="flex flex-col items-center mt-10">
      <Card className="w-full max-w-md">
        <CardHeader className="mb-2">
          <CardTitle className="text-3xl text-center">Login</CardTitle>
        </CardHeader>

        <CardForm type={"login"} />
      </Card>
    </div>
  );
};
export default page;
