import { Layout } from "@jobsync/ui";
import { DailyPieChart } from "../components/DailyPieChart";

const Summary: React.FC = () => {
  const handleBackButton = async () => {
    /* This is where we will add Portals integration. */
  };

  return (
    <Layout>
      <Layout.Header>
        <Layout.BackButton onClick={handleBackButton} />
        <Layout.Title title="Time Tracking" />
      </Layout.Header>
      <Layout.Content>
        <DailyPieChart />
      </Layout.Content>
    </Layout>
  );
};
export default Summary;
