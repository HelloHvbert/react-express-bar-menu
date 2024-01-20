type DescriptionsProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  description: string;
  foodPairing: string[] | undefined;
  ingredients: string | undefined;
};

export default function Descriptions({
  activeTab,
  setActiveTab,
  description,
  foodPairing,
  ingredients,
}: DescriptionsProps) {
  return (
    <>
      <div className=" mt-12 content-around border-b  border-gray-200">
        <ul className="flex cursor-pointer">
          <li
            className={`mr-2 ${
              activeTab === "description"
                ? "border-b-2 border-gray-600 font-semibold"
                : ""
            }`}
            onClick={() => setActiveTab("description")}
          >
            <h2 className="px-1 py-2 text-sm uppercase md:px-4 md:text-lg">
              description
            </h2>
          </li>
          <li
            className={`mr-2 ${
              activeTab === "style"
                ? "border-b-2 border-gray-600 font-semibold"
                : ""
            }`}
            onClick={() => setActiveTab("style")}
          >
            <h2 className="px-1 py-2 text-sm uppercase md:px-4 md:text-lg">
              food pairing
            </h2>
          </li>
          <li
            className={`mr-2 ${
              activeTab === "ingredients" ? "border-b-2 border-gray-600 " : ""
            }`}
            onClick={() => setActiveTab("ingredients")}
          >
            <h2 className="px-1 py-2 text-sm uppercase md:px-4 md:text-lg">
              ingredients
            </h2>
          </li>
        </ul>
      </div>
      <div className="p-4">
        {activeTab === "description" && (
          <p className="whitespace-pre-line text-gray-700">{description}</p>
        )}
        {activeTab === "style" && (
          <p className="whitespace-pre-line text-gray-700">
            {foodPairing !== undefined && foodPairing.join(", ")}
          </p>
        )}
        {activeTab === "ingredients" && (
          <p className="whitespace-pre-line text-gray-700">{ingredients}</p>
        )}
      </div>
    </>
  );
}
