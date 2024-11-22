import PageLoader from "../PageLoader";

const PwaView = ({ activePwaLink }: { activePwaLink: string }) => {
  console.log("PwaView -> activePwaLink", activePwaLink);
  return <PageLoader activePwaLink={activePwaLink} />;
};

export default PwaView;
