import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import CircularProgress from "@mui/material/CircularProgress";
import Layout from "../common/Layout/Layout";

const EmailScheduler = lazy(
  () => import("../pages/EmailScheduler/EmailScheduler")
);

export type Props = {
  isAuthenticated: boolean;
};

const Router = ({ isAuthenticated }: Props) => {
  return (
    <BrowserRouter basename={routes.homepage}>
      <Suspense fallback={<CircularProgress />}>
        <Layout isAuthenticated={isAuthenticated}>
          {isAuthenticated && (
            <Routes>
              <Route
                path={routes.emailScheduler}
                element={<EmailScheduler />}
              />
            </Routes>
          )}
        </Layout>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
