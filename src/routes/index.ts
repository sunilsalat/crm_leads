import LeadRoute from "./lead.routes";
import AuthRoute from "./auth.route";
import PropertyRoute from "./property.route";

import { app } from "../server";

export const loadRoutes = () => {
  app.use("/api/v1/lead", LeadRoute);
  app.use("/api/v1/user", [], AuthRoute);
  app.use("/api/v1/property", [], PropertyRoute);
};
