function CheckoutWizard(props) {
  const { children, activeTab = 0 } = props;

  const tabs = ["User login", "Address", "Payment method", "Place order"];

  return (
    <>
      <div className="flex items-center justify-between bg-gray-800 mt-6">
        {tabs.map((tab, index) => {
          return (
            <div
              key={tab}
              className={`border-b-3 w-full text-center font-medium py-2 ${
                index <= activeTab
                  ? "border-blue-500 text-blue-500"
                  : "border-gray-300 text-gray-400"
              }`}
            >
              {tab}
            </div>
          );
        })}
      </div>
      <div className="bg-gray-800 w-full h-full p-6 container px-auto mb-10">
        {children}
      </div>
    </>
  );
}

export default CheckoutWizard;
