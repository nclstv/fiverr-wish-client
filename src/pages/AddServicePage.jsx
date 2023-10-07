import Button from "../components/utils/Button";
import Input from "../components/utils/Input";
import Textarea from "../components/utils/Textarea";

function AddServicePage() {
  return (
    <div className="w-full justify-center flex py-8">
      <form className="flex flex-col bg-gray-50 border-gray-200 border p-8 gap-4 justify-center w-full max-w-md rounded-xl">
        <h1 className="text-center font-medium text-xl text-gray-700">
          Create your services.
        </h1>
        <div className="border-b border-gray-300 h-0 my-4" />
        <Input>Title</Input>
        <Input>Image URL</Input>
        <Input>Price per day</Input>
        <Textarea>Description</Textarea>
        <div className="border-b border-gray-300 h-0 my-4" />
        <Button>Create a service</Button>
      </form>
    </div>
  );
}

export default AddServicePage;
