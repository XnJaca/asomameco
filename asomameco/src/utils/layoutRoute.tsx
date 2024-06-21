import { Route } from "react-router-dom";
import DashboardLayout from "../components/dashboardLayout";

const LayoutRoute = ({ element: Element, ...rest }) => {
  return (
    <Route
      {...rest}
      element={
        <DashboardLayout>
          <Element />
        </DashboardLayout>
      }
    />
  );
};

export default LayoutRoute;
