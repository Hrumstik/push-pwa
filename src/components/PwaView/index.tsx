import PageLoader from "../PageLoader";

const PwaView = ({ activePwaLink }: { activePwaLink: string }) => {
  return <PageLoader activePwaLink={activePwaLink} />;
};

export default PwaView;
